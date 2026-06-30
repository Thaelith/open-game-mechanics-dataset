import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const MixerAnalysis = require("../site/mixer-analysis.js");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

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

const mechanics = await loadMechanics();
const byId = new Map(mechanics.map((mechanic) => [mechanic.id, mechanic]));

function select(ids) {
  const uniqueIds = MixerAnalysis.uniqueIds(ids);
  assert.equal(uniqueIds.length, ids.length, "selected test IDs should not include duplicates");
  return uniqueIds.map((id) => {
    const mechanic = byId.get(id);
    assert.ok(mechanic, `missing test mechanic ${id}`);
    return mechanic;
  });
}

function analyze(ids) {
  return MixerAnalysis.analyzeMixerSelection(select(ids), { allMechanics: mechanics });
}

function hasSuggestion(analysis, targetId, type, sourceId = null) {
  return analysis.missingRelationshipTargets.missing.some(
    (suggestion) =>
      suggestion.targetId === targetId &&
      suggestion.type === type &&
      (!sourceId || suggestion.sourceId === sourceId)
  );
}

function hasConflict(analysis, sourceId, targetId, type) {
  return analysis.conflictWarnings.some(
    (warning) =>
      warning.sourceId === sourceId &&
      warning.targetId === targetId &&
      warning.type === type &&
      warning.severity === "Hard conflict"
  );
}

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

test("detects hard conflict between time rewind and online co-op", () => {
  const analysis = analyze(["time.time_rewind", "multiplayer.online_coop"]);
  assert.ok(
    hasConflict(analysis, "time.time_rewind", "multiplayer.online_coop", "conflicts_with") ||
      hasConflict(analysis, "multiplayer.online_coop", "time.time_rewind", "conflicts_with"),
    "expected a hard conflict edge between time rewind and online co-op"
  );
  assert.ok(["High", "Very High"].includes(analysis.scopePressure.label));
  assert.match(analysis.aiPlanningPrompt, /time\.time_rewind/);
  assert.match(analysis.aiPlanningPrompt, /multiplayer\.online_coop/);
});

test("suggests base/support mechanics for air dash", () => {
  const analysis = analyze(["movement.air_dash"]);
  assert.ok(hasSuggestion(analysis, "movement.dash", "extends", "movement.air_dash"));
  assert.ok(
    hasSuggestion(analysis, "platforming.double_jump", "supports", "movement.air_dash") ||
      hasSuggestion(analysis, "platforming.coyote_time", "supports", "movement.air_dash")
  );
  assert.equal(analysis.scopePressure.hasScope, true);
  assert.equal(new Set(select(["movement.air_dash"]).map((mechanic) => mechanic.id)).size, 1);
});

test("keeps cooldown timing dependency for reload and ranged attack", () => {
  const analysis = analyze(["combat.reload", "combat.ranged_attack"]);
  assert.ok(hasSuggestion(analysis, "time.cooldown_time", "requires", "combat.reload"));
  assert.equal(hasSuggestion(analysis, "ui_ux.cooldown_indicator", "supports", "combat.reload"), false);
  assert.equal(analysis.conflictWarnings.filter((warning) => warning.type === "conflicts_with").length, 0);
});

test("analyzes survival resource mix without instability", () => {
  const ids = [
    "survival.hunger",
    "survival.thirst",
    "survival.temperature",
    "time.day_night_schedule",
    "ui_ux.cooldown_indicator"
  ];
  const analysis = analyze(ids);
  assert.ok(analysis.requiredSystems.length > 0);
  assert.equal(analysis.scopePressure.hasScope, true);
  assert.ok(analysis.scopePressure.saveLoad > 0);
  assert.ok(analysis.scopePressure.ui > 0);
  assert.deepEqual(analysis.trimSuggestions, analyze(ids).trimSuggestions);
});

test("exports and imports stable concept shapes", () => {
  const records = select(["movement.air_dash", "combat.reload", "ui_ux.cooldown_indicator"]);
  const exported = MixerAnalysis.buildMixerExport(records, { allMechanics: mechanics });
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
    assert.ok(Object.hasOwn(exported, key), `export missing ${key}`);
  }
  assert.deepEqual(MixerAnalysis.parseImportedMechanicIds(exported), exported.selected_mechanic_ids);
  assert.deepEqual(MixerAnalysis.parseImportedMechanicIds(["movement.air_dash"]), ["movement.air_dash"]);
  assert.deepEqual(MixerAnalysis.parseImportedMechanicIds([{ id: "combat.reload" }]), ["combat.reload"]);
  assert.deepEqual(MixerAnalysis.parseImportedMechanicIds({ selected_mechanics: ["ui_ux.cooldown_indicator"] }), [
    "ui_ux.cooldown_indicator"
  ]);
  assert.deepEqual(
    MixerAnalysis.filterKnownMechanicIds(["combat.reload", "unknown.missing"], mechanics),
    ["combat.reload"]
  );
});

test("handles empty selection safely", () => {
  const analysis = MixerAnalysis.analyzeMixerSelection([], { allMechanics: mechanics });
  assert.equal(analysis.summary.selectedCount, 0);
  assert.equal(analysis.scopePressure.hasScope, false);
  const exported = MixerAnalysis.buildMixerExport([], { allMechanics: mechanics });
  assert.deepEqual(exported.selected_mechanic_ids, []);
  assert.ok(Array.isArray(exported.required_systems));
});

let passed = 0;
for (const { name, fn } of tests) {
  try {
    fn();
    passed += 1;
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

console.log(`Mixer analysis tests passed: ${passed}/${tests.length}`);
