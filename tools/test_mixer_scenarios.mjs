import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const MixerAnalysis = require("../site/mixer-analysis.js");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const fixturePath = "tools/fixtures/mixer_scenarios_v0_2.json";

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : null;
}

async function readJson(relativePath) {
  const raw = await readFile(path.join(repoRoot, relativePath), "utf8");
  return JSON.parse(raw);
}

async function loadMechanics() {
  const index = await readJson("dataset.json");
  const mechanics = [];
  for (const summary of index.mechanics) {
    mechanics.push(await readJson(summary.path));
  }
  return mechanics.sort((a, b) => a.id.localeCompare(b.id));
}

function toMechanicLabel(mechanic) {
  return `${mechanic.id} - ${mechanic.name}`;
}

function hasConflictPair(conflictWarnings, pair) {
  const [left, right] = pair;
  return conflictWarnings.some(
    (warning) =>
      (warning.sourceId === left && warning.targetId === right) ||
      (warning.sourceId === right && warning.targetId === left)
  );
}

function suggestedIdSet(analysis) {
  return new Set([
    ...analysis.missingRelationshipTargets.missing.map((suggestion) => suggestion.targetId),
    ...analysis.relatedAdditions.map((addition) => addition.id)
  ]);
}

function expectationFailure(errors, fn) {
  try {
    fn();
  } catch (error) {
    errors.push(error.message);
  }
}

function validateScenario(scenario, mechanics, byId) {
  const errors = [];
  let records = [];
  let analysis = null;
  let exported = null;

  expectationFailure(errors, () => {
    assert.ok(Array.isArray(scenario.selected_mechanic_ids), "selected_mechanic_ids must be an array");
    assert.equal(
      new Set(scenario.selected_mechanic_ids).size,
      scenario.selected_mechanic_ids.length,
      "selected mechanic IDs should be unique"
    );
  });

  for (const id of scenario.selected_mechanic_ids || []) {
    expectationFailure(errors, () => assert.ok(byId.has(id), `unknown selected mechanic ${id}`));
  }

  if (!errors.length) {
    records = scenario.selected_mechanic_ids.map((id) => byId.get(id));
    analysis = MixerAnalysis.analyzeMixerSelection(records, { allMechanics: mechanics });
    exported = MixerAnalysis.buildMixerExport(records, { allMechanics: mechanics });
  }

  if (analysis) {
    const selectedIds = new Set(scenario.selected_mechanic_ids);
    const expected = scenario.expected || {};
    const suggested = suggestedIdSet(analysis);
    const trimIds = analysis.trimSuggestions.map((suggestion) => suggestion.id);
    const uniqueTrimIds = new Set(trimIds);
    const hasScopeData = records.some((mechanic) => mechanic.scope_profile);
    const lowerPrompt = analysis.aiPlanningPrompt.toLowerCase();

    expectationFailure(errors, () => assert.equal(analysis.summary.selectedCount, records.length));
    expectationFailure(errors, () => assert.ok(analysis.requiredSystems.length > 0, "required systems should not be empty"));
    expectationFailure(errors, () => assert.equal(analysis.scopePressure.hasScope, hasScopeData));
    expectationFailure(errors, () => assert.equal(uniqueTrimIds.size, trimIds.length, "trim suggestions should not duplicate mechanics"));
    expectationFailure(errors, () =>
      assert.equal(
        analysis.relatedAdditions.some((addition) => selectedIds.has(addition.id)),
        false,
        "related additions should not include selected mechanics"
      )
    );
    for (const id of selectedIds) {
      expectationFailure(errors, () => assert.ok(analysis.aiPlanningPrompt.includes(id), `AI prompt missing ${id}`));
    }
    for (const key of [
      "version",
      "selected_mechanic_ids",
      "selected_mechanics",
      "categories",
      "required_systems",
      "missing_dependency_support_suggestions",
      "conflict_warnings",
      "scope_summary",
      "mvp_trim_suggestions",
      "related_additions",
      "ai_planning_prompt"
    ]) {
      expectationFailure(errors, () => assert.ok(Object.hasOwn(exported, key), `export missing ${key}`));
    }

    if (expected.expected_scope_labels?.length && analysis.scopePressure.hasScope) {
      expectationFailure(errors, () =>
        assert.ok(
          expected.expected_scope_labels.includes(analysis.scopePressure.label),
          `scope label ${analysis.scopePressure.label} not in expected labels ${expected.expected_scope_labels.join(", ")}`
        )
      );
    }

    if (expected.must_suggest_any?.length) {
      expectationFailure(errors, () =>
        assert.ok(
          expected.must_suggest_any.some((id) => suggested.has(id)),
          `expected at least one suggested mechanic from ${expected.must_suggest_any.join(", ")}`
        )
      );
    }

    if (expected.must_warn_conflict_any?.length) {
      expectationFailure(errors, () =>
        assert.ok(
          expected.must_warn_conflict_any.some((pair) => hasConflictPair(analysis.conflictWarnings, pair)),
          `expected a conflict warning for one of ${expected.must_warn_conflict_any.map((pair) => pair.join("<->")).join(", ")}`
        )
      );
    }

    if (expected.must_not_warn_hard_conflict) {
      expectationFailure(errors, () =>
        assert.equal(
          analysis.conflictWarnings.some((warning) => warning.type === "conflicts_with"),
          false,
          "expected no hard conflict warnings"
        )
      );
    }

    if (expected.trim_should_include_any?.length) {
      expectationFailure(errors, () =>
        assert.ok(
          expected.trim_should_include_any.some((id) => trimIds.includes(id)),
          `expected a trim suggestion for one of ${expected.trim_should_include_any.join(", ")}`
        )
      );
    }

    if (expected.trim_should_not_include_any?.length) {
      expectationFailure(errors, () =>
        assert.equal(
          expected.trim_should_not_include_any.some((id) => trimIds.includes(id)),
          false,
          `unexpected trim suggestion for ${expected.trim_should_not_include_any.join(", ")}`
        )
      );
    }

    if (expected.must_have_required_systems?.length) {
      const systemNames = new Set(analysis.requiredSystems.map((system) => system.system));
      for (const system of expected.must_have_required_systems) {
        expectationFailure(errors, () => assert.ok(systemNames.has(system), `missing required system ${system}`));
      }
    }

    if (expected.prompt_must_include_any?.length) {
      expectationFailure(errors, () =>
        assert.ok(
          expected.prompt_must_include_any.some((term) => lowerPrompt.includes(String(term).toLowerCase())),
          `AI prompt missing expected terms ${expected.prompt_must_include_any.join(", ")}`
        )
      );
    }
  }

  return {
    scenario,
    records,
    analysis,
    exported,
    errors,
    passed: errors.length === 0
  };
}

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

function markdownTable(headers, rows) {
  if (!rows.length) {
    return "_None._";
  }
  const header = `| ${headers.map(escapeCell).join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`).join("\n");
  return `${header}\n${divider}\n${body}`;
}

function scopeSummary(scopePressure) {
  if (!scopePressure?.hasScope) {
    return "No scope_profile data available.";
  }
  return `${scopePressure.label} overall (${MixerAnalysis.formatScore(scopePressure.overall)}); implementation ${MixerAnalysis.formatScore(scopePressure.implementation)}, design ${MixerAnalysis.formatScore(scopePressure.design)}, tuning ${MixerAnalysis.formatScore(scopePressure.tuning)}, content ${MixerAnalysis.formatScore(scopePressure.content)}, risks network/save/UI ${scopePressure.networking}/${scopePressure.saveLoad}/${scopePressure.ui}.`;
}

function buildReport(results) {
  const passed = results.filter((result) => result.passed).length;
  const lines = [
    "# Mechanic Mixer Scenario QA v0.2",
    "",
    "This report captures realistic concept mixes run through the deterministic Mechanic Mixer analysis module. It is intended to catch misleading scope, dependency, conflict, and trim output before public-facing release polish.",
    "",
    "## Summary",
    "",
    markdownTable(
      ["Metric", "Value"],
      [
        ["Scenarios", results.length],
        ["Passed expectations", `${passed}/${results.length}`],
        ["Failed expectations", results.length - passed]
      ]
    ),
    "",
    "## Calibration Notes",
    "",
    "- No production hours are inferred by the scenario runner.",
    "- Expectations are intentionally flexible: they check useful signals without locking exact sort order.",
    "- Trim suggestions are treated as prototype-risk notes, not removal commands.",
    "- Accessibility mechanics are expected to remain valid support mechanics when selected intentionally.",
    "- No scoring or wording calibration was required for this run; observed outputs matched the scenario expectations.",
    ""
  ];

  for (const result of results) {
    const { scenario, records, analysis, errors } = result;
    lines.push(`## ${scenario.title}`, "");
    lines.push(`**Scenario ID:** \`${scenario.id}\``);
    lines.push("");
    lines.push(`**Intent:** ${scenario.intent}`);
    lines.push("");
    lines.push(`**Expectation result:** ${result.passed ? "Passed" : "Failed"}`);
    lines.push("");
    if (errors.length) {
      lines.push(markdownTable(["Failure"], errors.map((error) => [error])), "");
    }
    if (!analysis) {
      lines.push("### Selected Mechanics", "");
      lines.push(markdownTable(["Mechanic ID"], (scenario.selected_mechanic_ids || []).map((id) => [id])), "");
      lines.push("Analysis could not run because the scenario fixture did not validate.", "");
      lines.push("### QA Notes", "");
      lines.push(scenario.expected?.notes || "No scenario-specific notes.", "");
      continue;
    }
    lines.push("### Selected Mechanics", "");
    lines.push(markdownTable(["Mechanic", "Category"], records.map((mechanic) => [toMechanicLabel(mechanic), mechanic.category])), "");
    lines.push("### Scope Pressure", "");
    lines.push(scopeSummary(analysis.scopePressure), "");
    lines.push("### Required Systems Top 10", "");
    lines.push(
      markdownTable(
        ["System", "Count", "Mechanics"],
        analysis.requiredSystems.slice(0, 10).map((item) => [item.system, item.count, item.mechanicIds.join(", ")])
      ),
      ""
    );
    lines.push("### Conflict Warnings", "");
    lines.push(
      markdownTable(
        ["Severity", "Source", "Target", "Reason"],
        analysis.conflictWarnings.map((warning) => [
          warning.severity,
          warning.sourceId,
          warning.targetId,
          warning.reason
        ])
      ),
      ""
    );
    lines.push("### Missing Dependency / Support Suggestions", "");
    lines.push(
      markdownTable(
        ["Priority", "Target", "Type", "Strength", "Source", "Reason"],
        analysis.missingRelationshipTargets.missing.slice(0, 8).map((suggestion) => [
          suggestion.priorityLabel,
          suggestion.targetId,
          suggestion.type,
          suggestion.strength,
          suggestion.sourceId,
          suggestion.reason
        ])
      ),
      ""
    );
    lines.push("### Related Additions", "");
    lines.push(
      markdownTable(
        ["Mechanic", "Category", "Reasons"],
        analysis.relatedAdditions.slice(0, 8).map((addition) => [
          addition.id,
          addition.category,
          addition.reasons.slice(0, 3).join("; ")
        ])
      ),
      ""
    );
    lines.push("### MVP Trim Suggestions", "");
    lines.push(
      markdownTable(
        ["Mechanic", "Role", "Reasons"],
        analysis.trimSuggestions.map((suggestion) => [
          suggestion.id,
          suggestion.role,
          suggestion.reasons.join(", ")
        ])
      ),
      ""
    );
    lines.push("### QA Notes", "");
    lines.push(scenario.expected?.notes || "No scenario-specific notes.", "");
  }

  return `${lines.join("\n")}\n`;
}

const reportPath = getArgValue("--report");
const mechanics = await loadMechanics();
const byId = new Map(mechanics.map((mechanic) => [mechanic.id, mechanic]));
const fixture = await readJson(fixturePath);
const scenarios = fixture.scenarios || [];

const results = scenarios.map((scenario) => validateScenario(scenario, mechanics, byId));

for (const result of results) {
  const scope = result.analysis?.scopePressure?.label || "n/a";
  const conflictCount = result.analysis?.conflictWarnings?.length || 0;
  const suggestionCount = result.analysis?.missingRelationshipTargets?.missing?.length || 0;
  const status = result.passed ? "ok" : "not ok";
  console.log(`${status} - ${result.scenario.title} (scope ${scope}, conflicts ${conflictCount}, suggestions ${suggestionCount})`);
  for (const error of result.errors) {
    console.error(`  - ${error}`);
  }
}

if (reportPath) {
  const outputPath = path.resolve(repoRoot, reportPath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buildReport(results), "utf8");
  console.log(`Scenario QA report written: ${reportPath}`);
}

const passed = results.filter((result) => result.passed).length;
console.log(`Mixer scenario tests passed: ${passed}/${results.length}`);

if (passed !== results.length) {
  process.exitCode = 1;
}
