(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.MixerAnalysis = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const RELATIONSHIP_SUGGESTION_TYPES = new Set([
    "requires",
    "supports",
    "enhances",
    "balances",
    "feeds",
    "consumes",
    "unlocks",
    "extends",
    "is_variant_of"
  ]);
  const CONFLICT_TYPES = new Set(["conflicts_with", "soft_conflicts_with"]);

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function uniqueSorted(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
  }

  function uniqueIds(values) {
    const ids = [];
    for (const value of values) {
      if (value && !ids.includes(value)) {
        ids.push(value);
      }
    }
    return ids;
  }

  function createLookup(allMechanics) {
    return new Map(asArray(allMechanics).map((mechanic) => [mechanic.id, mechanic]));
  }

  function mechanicById(id, context) {
    const lookup = context.lookup || createLookup(context.allMechanics);
    return lookup.get(id);
  }

  function mechanicExists(id, context) {
    return Boolean(mechanicById(id, context));
  }

  function isExternalReference(id) {
    return String(id).startsWith("external.") || String(id).startsWith("future.");
  }

  function pressureLabel(value) {
    if (value < 2) {
      return "Low";
    }
    if (value <= 3.2) {
      return "Medium";
    }
    if (value <= 4.1) {
      return "High";
    }
    return "Very High";
  }

  function formatScore(value) {
    return Number.isFinite(value) ? value.toFixed(1) : "n/a";
  }

  function relationshipStrengthScore(strength) {
    if (strength === "strong") {
      return 3;
    }
    if (strength === "medium") {
      return 2;
    }
    return 1;
  }

  function relationshipPriority(relationship) {
    const strength = relationshipStrengthScore(relationship.strength);
    if (relationship.type === "requires") {
      return relationship.strength === "strong" ? 100 : 82 + strength;
    }
    if ((relationship.type === "supports" || relationship.type === "balances") && relationship.strength === "strong") {
      return 76;
    }
    if (relationship.type === "supports" || relationship.type === "balances") {
      return 60 + strength;
    }
    if (relationship.type === "extends" || relationship.type === "is_variant_of") {
      return 58 + strength;
    }
    if (relationship.type === "feeds" || relationship.type === "consumes" || relationship.type === "unlocks") {
      return 52 + strength;
    }
    if (relationship.type === "enhances") {
      return 42 + strength;
    }
    return strength;
  }

  function relationshipPriorityLabel(relationship) {
    if (relationship.type === "requires" && relationship.strength === "strong") {
      return "Critical dependency";
    }
    if (relationship.type === "requires") {
      return "Important dependency";
    }
    if ((relationship.type === "supports" || relationship.type === "balances") && relationship.strength === "strong") {
      return "Useful support";
    }
    if (relationship.type === "supports" || relationship.type === "balances") {
      return "Support option";
    }
    return "Contextual link";
  }

  function collectRequiredSystems(records) {
    const systems = new Map();
    for (const mechanic of records) {
      for (const system of asArray(mechanic.required_systems)) {
        if (!systems.has(system)) {
          systems.set(system, new Set());
        }
        systems.get(system).add(mechanic.id);
      }
    }
    return [...systems.entries()]
      .map(([system, mechanicIds]) => ({
        system,
        count: mechanicIds.size,
        mechanicIds: [...mechanicIds].sort((a, b) => a.localeCompare(b))
      }))
      .sort((a, b) => b.count - a.count || a.system.localeCompare(b.system));
  }

  function collectMissingRelationshipTargets(records, context) {
    const selectedIds = new Set(records.map((mechanic) => mechanic.id));
    const missing = [];
    const external = [];

    for (const mechanic of records) {
      for (const relationship of asArray(mechanic.relationships)) {
        if (!RELATIONSHIP_SUGGESTION_TYPES.has(relationship.type) || selectedIds.has(relationship.target)) {
          continue;
        }

        const target = mechanicById(relationship.target, context);
        const item = {
          targetId: relationship.target,
          targetName: target?.name || relationship.target,
          targetCategory: target?.category || "",
          sourceId: mechanic.id,
          sourceName: mechanic.name,
          type: relationship.type,
          strength: relationship.strength,
          reason: relationship.reason,
          priority: relationshipPriority(relationship),
          priorityLabel: relationshipPriorityLabel(relationship)
        };

        if (isExternalReference(relationship.target) || !target) {
          external.push(item);
        } else {
          missing.push(item);
        }
      }
    }

    const sortItems = (a, b) =>
      b.priority - a.priority ||
      a.targetId.localeCompare(b.targetId) ||
      a.sourceId.localeCompare(b.sourceId) ||
      a.type.localeCompare(b.type);

    return {
      missing: missing.sort(sortItems),
      external: external.sort(sortItems)
    };
  }

  function collectConflictWarnings(records, context) {
    const selectedIds = new Set(records.map((mechanic) => mechanic.id));
    const warnings = [];
    const seen = new Set();

    for (const mechanic of records) {
      for (const relationship of asArray(mechanic.relationships)) {
        if (!CONFLICT_TYPES.has(relationship.type) || !selectedIds.has(relationship.target)) {
          continue;
        }
        const key = `${mechanic.id}|${relationship.type}|${relationship.target}`;
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        const target = mechanicById(relationship.target, context);
        warnings.push({
          sourceId: mechanic.id,
          sourceName: mechanic.name,
          targetId: relationship.target,
          targetName: target?.name || relationship.target,
          type: relationship.type,
          strength: relationship.strength,
          reason: relationship.reason,
          severity: relationship.type === "conflicts_with" ? "Hard conflict" : "Soft conflict"
        });
      }
    }

    return warnings.sort(
      (a, b) =>
        Number(b.type === "conflicts_with") - Number(a.type === "conflicts_with") ||
        relationshipStrengthScore(b.strength) - relationshipStrengthScore(a.strength) ||
        a.sourceId.localeCompare(b.sourceId) ||
        a.targetId.localeCompare(b.targetId)
    );
  }

  function average(records, field) {
    if (!records.length) {
      return 0;
    }
    return records.reduce((sum, record) => sum + record.scope_profile[field], 0) / records.length;
  }

  function maxRisk(records, field) {
    return records.reduce((max, record) => Math.max(max, record.scope_profile[field]), 0);
  }

  function calculateScopePressure(records) {
    const scoped = records.filter((mechanic) => mechanic.scope_profile);
    const missingCount = records.length - scoped.length;

    if (!scoped.length) {
      return {
        hasScope: false,
        missingCount
      };
    }

    const implementation = average(scoped, "implementation_cost");
    const design = average(scoped, "design_cost");
    const tuning = average(scoped, "tuning_cost");
    const content = average(scoped, "content_cost");
    const networking = maxRisk(scoped, "networking_risk");
    const saveLoad = maxRisk(scoped, "save_load_risk");
    const ui = maxRisk(scoped, "ui_risk");
    const riskAverage = (networking + saveLoad + ui) / 3;
    const overall = implementation * 0.25 + design * 0.2 + tuning * 0.25 + content * 0.15 + riskAverage * 0.15;

    return {
      hasScope: true,
      scopedCount: scoped.length,
      missingCount,
      implementation,
      design,
      tuning,
      content,
      networking,
      saveLoad,
      ui,
      overall,
      label: pressureLabel(overall)
    };
  }

  function generateTrimSuggestions(records, missingRelationshipTargets, conflictWarnings) {
    const hardConflictIds = new Set(
      conflictWarnings
        .filter((warning) => warning.type === "conflicts_with")
        .flatMap((warning) => [warning.sourceId, warning.targetId])
    );
    const missingRequiresBySource = new Map();

    for (const suggestion of missingRelationshipTargets.missing) {
      if (suggestion.type === "requires") {
        missingRequiresBySource.set(suggestion.sourceId, (missingRequiresBySource.get(suggestion.sourceId) || 0) + 1);
      }
    }

    return records
      .map((mechanic) => {
        const scope = mechanic.scope_profile;
        const role = scope?.mvp_role || "unknown";
        const reasons = [];
        let score = 0;

        if (hardConflictIds.has(mechanic.id)) {
          reasons.push("selected hard conflict");
          score += 100;
        }

        if (role === "polish") {
          reasons.push("polish role");
          score += 70;
        } else if (role === "optional") {
          reasons.push("optional role");
          score += 55;
        }

        if (missingRequiresBySource.has(mechanic.id)) {
          reasons.push(`${missingRequiresBySource.get(mechanic.id)} missing required relationship(s)`);
          score += 25;
        }

        if (scope) {
          if (scope.tuning_cost >= 5) {
            reasons.push("very high tuning cost");
            score += 16;
          }
          if (scope.implementation_cost >= 5) {
            reasons.push("very high implementation cost");
            score += 16;
          }
          if (Math.max(scope.networking_risk, scope.save_load_risk, scope.ui_risk) >= 5) {
            reasons.push("very high implementation risk");
            score += 16;
          }
        }

        if (role === "core" && !hardConflictIds.has(mechanic.id)) {
          return null;
        }
        if (!reasons.length) {
          return null;
        }

        return {
          id: mechanic.id,
          name: mechanic.name,
          role,
          reasons,
          score
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
      .slice(0, 8);
  }

  function addCandidate(candidates, id, score, reason, context, selectedIds) {
    if (!mechanicExists(id, context) || selectedIds.has(id)) {
      return;
    }
    const mechanic = mechanicById(id, context);
    const candidate = candidates.get(id) || {
      id,
      name: mechanic.name,
      category: mechanic.category,
      score: 0,
      reasons: []
    };
    candidate.score += score + (mechanic.scope_profile ? 5 : 0);
    if (reason && !candidate.reasons.includes(reason)) {
      candidate.reasons.push(reason);
    }
    candidates.set(id, candidate);
  }

  function generateRelatedAdditions(records, missingRelationshipTargets, context) {
    const selectedIds = new Set(records.map((mechanic) => mechanic.id));
    const candidates = new Map();

    for (const suggestion of missingRelationshipTargets.missing) {
      addCandidate(
        candidates,
        suggestion.targetId,
        suggestion.priority,
        `${suggestion.priorityLabel}: ${suggestion.sourceId} ${suggestion.type} ${suggestion.targetId}.`,
        context,
        selectedIds
      );
    }

    for (const mechanic of asArray(context.allMechanics)) {
      if (selectedIds.has(mechanic.id)) {
        continue;
      }
      for (const relationship of asArray(mechanic.relationships)) {
        if (selectedIds.has(relationship.target) && !CONFLICT_TYPES.has(relationship.type)) {
          addCandidate(
            candidates,
            mechanic.id,
            24 + relationshipStrengthScore(relationship.strength) * 4,
            `${mechanic.id} ${relationship.type} selected ${relationship.target}.`,
            context,
            selectedIds
          );
        }
      }
    }

    for (const mechanic of records) {
      for (const id of asArray(mechanic.combines_well_with)) {
        addCandidate(candidates, id, 16, `${mechanic.id} lists it in combines_well_with.`, context, selectedIds);
      }
      for (const id of asArray(mechanic.related_mechanics)) {
        addCandidate(candidates, id, 8, `${mechanic.id} lists it in related_mechanics.`, context, selectedIds);
      }
    }

    return [...candidates.values()]
      .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
      .slice(0, 8);
  }

  function generateAiPlanningPrompt(records, analysis) {
    const requiredSystems = analysis.requiredSystems
      .slice(0, 12)
      .map((item) => `- ${item.system}: ${item.mechanicIds.join(", ")}`)
      .join("\n");
    const conflicts = analysis.conflictWarnings.length
      ? analysis.conflictWarnings
          .slice(0, 6)
          .map((warning) => `- ${warning.severity}: ${warning.sourceId} -> ${warning.targetId} (${warning.reason})`)
          .join("\n")
      : "- None from typed relationships in the selected set.";
    const missing = analysis.missingRelationshipTargets.missing.length
      ? analysis.missingRelationshipTargets.missing
          .slice(0, 8)
          .map((suggestion) => `- ${suggestion.priorityLabel}: add or account for ${suggestion.targetId}; ${suggestion.sourceId} ${suggestion.type} it because ${suggestion.reason}`)
          .join("\n")
      : "- None from outgoing typed relationships.";
    const scope = analysis.scopePressure.hasScope
      ? `Overall ${analysis.scopePressure.label} (${formatScore(analysis.scopePressure.overall)}). Implementation ${formatScore(analysis.scopePressure.implementation)}, design ${formatScore(analysis.scopePressure.design)}, tuning ${formatScore(analysis.scopePressure.tuning)}, content ${formatScore(analysis.scopePressure.content)}, max networking/save/UI risk ${analysis.scopePressure.networking}/${analysis.scopePressure.saveLoad}/${analysis.scopePressure.ui}.`
      : "No scope_profile data is available for the selected mechanics.";

    return [
      "You are helping plan a small game prototype. Use the Open Game Mechanics Dataset records below for implementation planning, not final code.",
      "",
      "Selected mechanics:",
      ...records.map((mechanic) => `- ${mechanic.id}: ${mechanic.name} (${mechanic.category})`),
      "",
      "Required systems to account for:",
      requiredSystems || "- None listed.",
      "",
      "Typed relationship dependency/support suggestions:",
      missing,
      "",
      "Typed conflict warnings:",
      conflicts,
      "",
      "Scope pressure:",
      scope,
      "",
      "Instructions:",
      "- Inspect the relevant mechanic JSON files before coding.",
      "- Build a small prototype/MVP first.",
      "- Keep selected core mechanics unless a hard conflict requires a redesign.",
      "- Avoid adding unrelated mechanics or unsupported claims.",
      "- Treat scope scores as relative planning signals, not production estimates."
    ].join("\n");
  }

  function normalizeContext(context) {
    const allMechanics = asArray(context?.allMechanics);
    return {
      allMechanics,
      lookup: context?.lookup || createLookup(allMechanics)
    };
  }

  function analyzeMixerSelection(records, context = {}) {
    const normalizedContext = normalizeContext(context);
    const selectedRecords = asArray(records);
    const categories = uniqueSorted(selectedRecords.map((mechanic) => mechanic.category));
    const roleCounts = {
      core: 0,
      support: 0,
      optional: 0,
      polish: 0,
      unknown: 0
    };
    let missingScopeCount = 0;
    let graphCount = 0;

    for (const mechanic of selectedRecords) {
      if (asArray(mechanic.relationships).length) {
        graphCount += 1;
      }
      if (!mechanic.scope_profile) {
        missingScopeCount += 1;
        continue;
      }
      const role = mechanic.scope_profile.mvp_role || "unknown";
      roleCounts[role] = (roleCounts[role] || 0) + 1;
    }

    const requiredSystems = collectRequiredSystems(selectedRecords);
    const missingRelationshipTargets = collectMissingRelationshipTargets(selectedRecords, normalizedContext);
    const conflictWarnings = collectConflictWarnings(selectedRecords, normalizedContext);
    const scopePressure = calculateScopePressure(selectedRecords);
    const trimSuggestions = generateTrimSuggestions(selectedRecords, missingRelationshipTargets, conflictWarnings);
    const relatedAdditions = generateRelatedAdditions(selectedRecords, missingRelationshipTargets, normalizedContext);
    const analysis = {
      summary: {
        selectedCount: selectedRecords.length,
        categories,
        roleCounts,
        missingScopeCount,
        graphCount,
        noGraphIds: selectedRecords.filter((mechanic) => !asArray(mechanic.relationships).length).map((mechanic) => mechanic.id)
      },
      requiredSystems,
      missingRelationshipTargets,
      conflictWarnings,
      scopePressure,
      trimSuggestions,
      relatedAdditions
    };
    analysis.aiPlanningPrompt = generateAiPlanningPrompt(selectedRecords, analysis);
    return analysis;
  }

  function buildMixerExport(records, context = {}) {
    const selectedRecords = asArray(records);
    const analysis = analyzeMixerSelection(selectedRecords, context);
    return {
      version: "ogmd-mechanic-mixer-mvp-0.1",
      selected_mechanic_ids: selectedRecords.map((mechanic) => mechanic.id),
      selected_mechanics: selectedRecords.map((mechanic) => ({
        id: mechanic.id,
        name: mechanic.name,
        category: mechanic.category,
        mvp_role: mechanic.scope_profile?.mvp_role || null
      })),
      categories: analysis.summary.categories,
      required_systems: analysis.requiredSystems,
      missing_dependency_support_suggestions: analysis.missingRelationshipTargets.missing,
      external_future_suggestions: analysis.missingRelationshipTargets.external,
      conflict_warnings: analysis.conflictWarnings,
      scope_summary: analysis.scopePressure,
      mvp_trim_suggestions: analysis.trimSuggestions,
      related_additions: analysis.relatedAdditions,
      ai_planning_prompt: analysis.aiPlanningPrompt
    };
  }

  function parseImportedMechanicIds(value) {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    if (Array.isArray(parsed)) {
      return parsed.map((item) => (typeof item === "string" ? item : item?.id)).filter(Boolean);
    }
    if (Array.isArray(parsed?.selected_mechanic_ids)) {
      return parsed.selected_mechanic_ids;
    }
    if (Array.isArray(parsed?.selectedMechanicIds)) {
      return parsed.selectedMechanicIds;
    }
    if (Array.isArray(parsed?.selected_mechanics)) {
      return parsed.selected_mechanics.map((item) => (typeof item === "string" ? item : item?.id)).filter(Boolean);
    }
    if (Array.isArray(parsed?.selectedMechanics)) {
      return parsed.selectedMechanics.map((item) => (typeof item === "string" ? item : item?.id)).filter(Boolean);
    }
    return [];
  }

  function filterKnownMechanicIds(ids, allMechanics) {
    const known = new Set(asArray(allMechanics).map((mechanic) => mechanic.id));
    return uniqueIds(asArray(ids)).filter((id) => known.has(id));
  }

  return {
    RELATIONSHIP_SUGGESTION_TYPES,
    CONFLICT_TYPES,
    asArray,
    uniqueIds,
    uniqueSorted,
    createLookup,
    isExternalReference,
    pressureLabel,
    formatScore,
    relationshipStrengthScore,
    relationshipPriority,
    relationshipPriorityLabel,
    collectRequiredSystems,
    collectMissingRelationshipTargets,
    collectConflictWarnings,
    calculateScopePressure,
    generateTrimSuggestions,
    generateRelatedAdditions,
    generateAiPlanningPrompt,
    analyzeMixerSelection,
    buildMixerExport,
    parseImportedMechanicIds,
    filterKnownMechanicIds
  };
});
