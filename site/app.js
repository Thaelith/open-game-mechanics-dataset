const state = {
  index: null,
  mechanics: [],
  filtered: [],
  selectedId: null,
  hydrationDone: false,
  mixer: {
    selectedIds: []
  },
  games: {
    byKey: new Map(),
    list: [],
    filtered: []
  }
};

const elements = {
  searchInput: document.querySelector("#searchInput"),
  categoryFilter: document.querySelector("#categoryFilter"),
  dimensionFilter: document.querySelector("#dimensionFilter"),
  genreFilter: document.querySelector("#genreFilter"),
  difficultyFilter: document.querySelector("#difficultyFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  resetFilters: document.querySelector("#resetFilters"),
  statusText: document.querySelector("#statusText"),
  results: document.querySelector("#results"),
  detailPanel: document.querySelector("#detailPanel"),
  mixerPanel: document.querySelector("#mixerPanel"),
  mixerSelected: document.querySelector("#mixerSelected"),
  mixerAnalysis: document.querySelector("#mixerAnalysis"),
  mixerStatus: document.querySelector("#mixerStatus"),
  mixerExportOutput: document.querySelector("#mixerExportOutput"),
  copyConceptJson: document.querySelector("#copyConceptJson"),
  clearMixer: document.querySelector("#clearMixer"),
  mixerImportInput: document.querySelector("#mixerImportInput"),
  importConceptJson: document.querySelector("#importConceptJson"),
  mixerImportStatus: document.querySelector("#mixerImportStatus"),
  gamesPanel: document.querySelector("#gamesPanel"),
  gameSearchInput: document.querySelector("#gameSearchInput"),
  gameCategoryFilter: document.querySelector("#gameCategoryFilter"),
  gameSort: document.querySelector("#gameSort"),
  gameStatus: document.querySelector("#gameStatus"),
  gameSummary: document.querySelector("#gameSummary"),
  gamesResults: document.querySelector("#gamesResults")
};

const DATASET_URL = new URL("../dataset.json", window.location.href);
const CONCURRENT_DETAIL_REQUESTS = 16;
const MIXER_STORAGE_KEY = "ogmd.mechanicMixer.selectedIds";
const MAX_GAME_RESULTS = 60;
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
const MixerAnalysis = window.MixerAnalysis;

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

function mechanicUrl(path) {
  return new URL(`../${path}`, window.location.href);
}

function mechanicHref(path) {
  return `../${path}`;
}

function requestedMechanicId() {
  return new URL(window.location.href).searchParams.get("id")?.trim() || "";
}

function requestedMixerIds() {
  const value = new URL(window.location.href).searchParams.get("mix") || "";
  return value
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

function updateSelectedUrl(id) {
  const url = new URL(window.location.href);
  if (id) {
    url.searchParams.set("id", id);
  } else {
    url.searchParams.delete("id");
  }
  window.history.replaceState({ selectedId: id || null }, "", url);
}

function updateMixerUrl() {
  const url = new URL(window.location.href);
  if (state.mixer.selectedIds.length) {
    url.searchParams.set("mix", state.mixer.selectedIds.join(","));
  } else {
    url.searchParams.delete("mix");
  }
  window.history.replaceState(
    {
      selectedId: state.selectedId || null,
      mixerIds: [...state.mixer.selectedIds]
    },
    "",
    url
  );
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function titleCase(value) {
  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function normalizedTitle(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function gameTitleKey(value) {
  return normalizedTitle(value).toLowerCase();
}

function mechanicById(id) {
  return state.mechanics.find((mechanic) => mechanic.id === id);
}

function mechanicExists(id) {
  return Boolean(mechanicById(id));
}

function isExternalReference(id) {
  return String(id).startsWith("external.") || String(id).startsWith("future.");
}

function isInMixer(id) {
  return state.mixer.selectedIds.includes(id);
}

function selectedMechanics() {
  return state.mixer.selectedIds.map((id) => mechanicById(id)).filter(Boolean);
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

function mechanicLabel(id) {
  const mechanic = mechanicById(id);
  return mechanic ? `${mechanic.name} (${mechanic.id})` : id;
}

function roleLabel(role) {
  return role ? titleCase(role) : "No scope";
}

function strongestLabel(strength) {
  return strength === "strong" ? "Strong" : strength === "medium" ? "Medium" : "Weak";
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

function getDifficultyValues() {
  const fromMechanics = state.mechanics.flatMap((mechanic) => Object.values(mechanic.difficulty || {}));
  const fromGroups = Object.values(state.index?.groups?.difficulty || {}).flatMap((group) => Object.keys(group));
  return uniqueSorted([...fromGroups, ...fromMechanics]);
}

function fillSelect(select, values, emptyLabel) {
  const current = select.value;
  select.innerHTML = `<option value="">${escapeHtml(emptyLabel)}</option>`;
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = titleCase(value);
    select.appendChild(option);
  }
  if (values.includes(current)) {
    select.value = current;
  }
}

function saveMixerSelection() {
  try {
    localStorage.setItem(MIXER_STORAGE_KEY, JSON.stringify(state.mixer.selectedIds));
  } catch (error) {
    // Local persistence is optional; analysis should still work if storage is blocked.
  }
}

function storedMixerSelection() {
  try {
    const value = localStorage.getItem(MIXER_STORAGE_KEY);
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch (error) {
    return [];
  }
}

function restoreMixerSelection(ids, options = {}) {
  const validIds = uniqueIds(ids).filter((id) => mechanicExists(id));
  state.mixer.selectedIds = validIds;
  saveMixerSelection();
  if (options.updateUrl) {
    updateMixerUrl();
  }
  renderResults();
  if (state.selectedId) {
    renderDetail(mechanicById(state.selectedId));
  }
  renderMixer();
}

function addToMixer(id, options = {}) {
  if (!mechanicExists(id) || isInMixer(id)) {
    return;
  }
  state.mixer.selectedIds = [...state.mixer.selectedIds, id].sort((a, b) => a.localeCompare(b));
  saveMixerSelection();
  if (options.updateUrl !== false) {
    updateMixerUrl();
  }
  renderResults();
  if (state.selectedId) {
    renderDetail(mechanicById(state.selectedId));
  }
  renderMixer();
}

function removeFromMixer(id, options = {}) {
  state.mixer.selectedIds = state.mixer.selectedIds.filter((selectedId) => selectedId !== id);
  saveMixerSelection();
  if (options.updateUrl !== false) {
    updateMixerUrl();
  }
  renderResults();
  if (state.selectedId) {
    renderDetail(mechanicById(state.selectedId));
  }
  renderMixer();
}

function toggleMixerMechanic(id) {
  if (isInMixer(id)) {
    removeFromMixer(id);
  } else {
    addToMixer(id);
  }
}

function clearMixerSelection() {
  state.mixer.selectedIds = [];
  saveMixerSelection();
  updateMixerUrl();
  renderResults();
  if (state.selectedId) {
    renderDetail(mechanicById(state.selectedId));
  }
  renderMixer();
  elements.mixerStatus.textContent = "Mixer selection cleared.";
}

function populateFilters() {
  fillSelect(
    elements.categoryFilter,
    uniqueSorted(state.mechanics.map((mechanic) => mechanic.category)),
    "All categories"
  );
  fillSelect(
    elements.dimensionFilter,
    uniqueSorted(state.mechanics.flatMap((mechanic) => asArray(mechanic.dimensions))),
    "All dimensions"
  );
  fillSelect(
    elements.genreFilter,
    uniqueSorted(state.mechanics.flatMap((mechanic) => asArray(mechanic.genres))),
    "All genres"
  );
  fillSelect(elements.difficultyFilter, getDifficultyValues(), "Any difficulty");
  fillSelect(
    elements.statusFilter,
    uniqueSorted(state.mechanics.map((mechanic) => mechanic.status)),
    "All statuses"
  );
}

function currentFilters() {
  return {
    query: elements.searchInput.value.trim().toLowerCase(),
    category: elements.categoryFilter.value,
    dimension: elements.dimensionFilter.value,
    genre: elements.genreFilter.value,
    difficulty: elements.difficultyFilter.value,
    status: elements.statusFilter.value
  };
}

function matchesQuery(mechanic, query) {
  if (!query) {
    return true;
  }
  const haystack = [
    mechanic.id,
    mechanic.name,
    mechanic.description,
    mechanic.category,
    mechanic.subcategory,
    ...asArray(mechanic.tags),
    ...asArray(mechanic.genres)
  ]
    .join(" ")
    .toLowerCase();
  return query.split(/\s+/).every((term) => haystack.includes(term));
}

function matchesFilters(mechanic, filters) {
  const difficultyValues = Object.values(mechanic.difficulty || {});
  return (
    matchesQuery(mechanic, filters.query) &&
    (!filters.category || mechanic.category === filters.category) &&
    (!filters.dimension || asArray(mechanic.dimensions).includes(filters.dimension)) &&
    (!filters.genre || asArray(mechanic.genres).includes(filters.genre)) &&
    (!filters.difficulty || difficultyValues.includes(filters.difficulty)) &&
    (!filters.status || mechanic.status === filters.status)
  );
}

function applyFilters() {
  const filters = currentFilters();
  state.filtered = state.mechanics
    .filter((mechanic) => matchesFilters(mechanic, filters))
    .sort((a, b) => a.id.localeCompare(b.id));
  renderResults();
  updateStatus();
}

function updateStatus(prefix = "") {
  const total = state.index?.total_mechanics ?? state.mechanics.length;
  const shown = state.filtered.length;
  const loading = state.hydrationDone ? "" : " Loading descriptions and detail fields...";
  elements.statusText.textContent = `${prefix}${shown} of ${total} mechanics shown.${loading}`;
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

function collectMissingRelationshipTargets(records) {
  const selectedIds = new Set(records.map((mechanic) => mechanic.id));
  const missing = [];
  const external = [];

  for (const mechanic of records) {
    for (const relationship of asArray(mechanic.relationships)) {
      if (!RELATIONSHIP_SUGGESTION_TYPES.has(relationship.type) || selectedIds.has(relationship.target)) {
        continue;
      }

      const target = mechanicById(relationship.target);
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

function collectConflictWarnings(records) {
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
      const target = mechanicById(relationship.target);
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

function addCandidate(candidates, id, score, reason) {
  if (!mechanicExists(id) || isInMixer(id)) {
    return;
  }
  const mechanic = mechanicById(id);
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

function generateRelatedAdditions(records, missingRelationshipTargets) {
  const selectedIds = new Set(records.map((mechanic) => mechanic.id));
  const candidates = new Map();

  for (const suggestion of missingRelationshipTargets.missing) {
    addCandidate(
      candidates,
      suggestion.targetId,
      suggestion.priority,
      `${suggestion.priorityLabel}: ${suggestion.sourceId} ${suggestion.type} ${suggestion.targetId}.`
    );
  }

  for (const mechanic of state.mechanics) {
    if (selectedIds.has(mechanic.id)) {
      continue;
    }
    for (const relationship of asArray(mechanic.relationships)) {
      if (selectedIds.has(relationship.target) && !CONFLICT_TYPES.has(relationship.type)) {
        addCandidate(
          candidates,
          mechanic.id,
          24 + relationshipStrengthScore(relationship.strength) * 4,
          `${mechanic.id} ${relationship.type} selected ${relationship.target}.`
        );
      }
    }
  }

  for (const mechanic of records) {
    for (const id of asArray(mechanic.combines_well_with)) {
      addCandidate(candidates, id, 16, `${mechanic.id} lists it in combines_well_with.`);
    }
    for (const id of asArray(mechanic.related_mechanics)) {
      addCandidate(candidates, id, 8, `${mechanic.id} lists it in related_mechanics.`);
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

function analyzeMixerSelection(records) {
  return MixerAnalysis.analyzeMixerSelection(records, { allMechanics: state.mechanics });
}

function buildGameIndex(mechanics) {
  const byKey = new Map();
  const sortedMechanics = [...mechanics].sort((a, b) => a.id.localeCompare(b.id));

  for (const mechanic of sortedMechanics) {
    const seenGameKeys = new Set();
    for (const example of asArray(mechanic.example_games)) {
      const title = normalizedTitle(example?.title);
      if (!title) {
        continue;
      }

      const key = gameTitleKey(title);
      if (seenGameKeys.has(key)) {
        continue;
      }
      seenGameKeys.add(key);

      const game = byKey.get(key) || {
        key,
        title,
        mechanics: [],
        categoryCounts: new Map(),
        tags: new Set()
      };
      const note = normalizedTitle(example?.note);
      game.mechanics.push({
        id: mechanic.id,
        name: mechanic.name || titleCase(mechanic.id.split(".").at(-1) || mechanic.id),
        category: mechanic.category || "unknown",
        subcategory: mechanic.subcategory || "",
        path: mechanic.path || "",
        note
      });
      game.categoryCounts.set(mechanic.category, (game.categoryCounts.get(mechanic.category) || 0) + 1);
      for (const tag of asArray(mechanic.tags)) {
        if (tag) {
          game.tags.add(tag);
        }
      }
      byKey.set(key, game);
    }
  }

  const list = [...byKey.values()]
    .map((game) => {
      const mechanicsList = game.mechanics.sort((a, b) => a.id.localeCompare(b.id));
      const categories = [...game.categoryCounts.entries()]
        .filter(([category]) => category)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
      return {
        key: game.key,
        title: game.title,
        mechanic_count: mechanicsList.length,
        category_count: categories.length,
        categories,
        mechanics: mechanicsList,
        representative_mechanics: mechanicsList.slice(0, 10).map((mechanic) => mechanic.id),
        tags: [...game.tags].sort((a, b) => a.localeCompare(b))
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  state.games.byKey = new Map(list.map((game) => [game.key, game]));
  state.games.list = list;
  state.games.filtered = [...list];
}

function populateGameFilters() {
  fillSelect(
    elements.gameCategoryFilter,
    uniqueSorted(state.games.list.flatMap((game) => game.categories.map((item) => item.category))),
    "All categories"
  );
}

function currentGameFilters() {
  return {
    query: elements.gameSearchInput.value.trim().toLowerCase(),
    category: elements.gameCategoryFilter.value,
    sort: elements.gameSort.value || "count"
  };
}

function matchesGameQuery(game, query) {
  if (!query) {
    return true;
  }

  const haystack = [
    game.title,
    ...game.categories.map((item) => item.category),
    ...game.tags,
    ...game.mechanics.flatMap((mechanic) => [
      mechanic.id,
      mechanic.name,
      mechanic.category,
      mechanic.subcategory,
      mechanic.note
    ])
  ]
    .join(" ")
    .toLowerCase();

  return query.split(/\s+/).every((term) => haystack.includes(term));
}

function applyGameFilters() {
  const filters = currentGameFilters();
  state.games.filtered = state.games.list.filter(
    (game) =>
      matchesGameQuery(game, filters.query) &&
      (!filters.category || game.categories.some((item) => item.category === filters.category))
  );

  state.games.filtered.sort((a, b) => {
    if (filters.sort === "title") {
      return a.title.localeCompare(b.title);
    }
    return b.mechanic_count - a.mechanic_count || a.title.localeCompare(b.title);
  });

  renderGames();
}

function gameSummaryStats() {
  const totalReferences = state.games.list.reduce((sum, game) => sum + game.mechanic_count, 0);
  return {
    uniqueGames: state.games.list.length,
    totalReferences,
    gamesWithFivePlus: state.games.list.filter((game) => game.mechanic_count >= 5).length
  };
}

function renderGameSummary() {
  const stats = gameSummaryStats();
  return `
    <div class="game-summary-grid">
      <div class="detail-metric"><span>Unique games</span><strong>${stats.uniqueGames}</strong></div>
      <div class="detail-metric"><span>Example references</span><strong>${stats.totalReferences}</strong></div>
      <div class="detail-metric"><span>Games with 5+ mechanics</span><strong>${stats.gamesWithFivePlus}</strong></div>
    </div>
  `;
}

function gameCategoryPills(game) {
  const visible = game.categories.slice(0, 7);
  const hidden = game.categories.length - visible.length;
  const pills = visible
    .map((item) => `<span class="pill category">${escapeHtml(item.category)} ${item.count}</span>`)
    .join("");
  return `${pills}${hidden > 0 ? `<span class="pill">+${hidden} more</span>` : ""}`;
}

function representativeMechanicsMarkup(game) {
  return game.representative_mechanics
    .slice(0, 8)
    .map((id) => `<button class="pill related-button" type="button" data-game-mechanic-id="${escapeHtml(id)}">${escapeHtml(id)}</button>`)
    .join("");
}

function gameMechanicsListMarkup(game) {
  return `
    <div class="game-mechanics-list">
      ${game.mechanics
        .map(
          (mechanic) => `
            <article class="game-mechanic-row">
              <div>
                <button class="inline-link" type="button" data-game-mechanic-id="${escapeHtml(mechanic.id)}">${escapeHtml(mechanic.name)}</button>
                <code>${escapeHtml(mechanic.id)}</code>
              </div>
              <span class="pill category">${escapeHtml(mechanic.category)}</span>
              <p>${escapeHtml(mechanic.note || "Example note not provided.")}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderGames() {
  if (!state.hydrationDone) {
    elements.gameSummary.innerHTML = "";
    elements.gamesResults.innerHTML = '<div class="empty-state">Loading full mechanic example_games from source JSON files...</div>';
    return;
  }

  elements.gameSummary.innerHTML = renderGameSummary();

  if (!state.games.list.length) {
    elements.gameStatus.textContent = "No example games are available in the loaded mechanics.";
    elements.gamesResults.innerHTML = "";
    return;
  }

  const visibleGames = state.games.filtered.slice(0, MAX_GAME_RESULTS);
  const hiddenCount = state.games.filtered.length - visibleGames.length;
  elements.gameStatus.textContent = `Showing ${visibleGames.length} of ${state.games.filtered.length} matched games.${hiddenCount > 0 ? " Refine the search to see more." : ""}`;

  if (!visibleGames.length) {
    elements.gamesResults.innerHTML = '<div class="empty-state">No games match the current game search and filters.</div>';
    return;
  }

  elements.gamesResults.innerHTML = visibleGames
    .map(
      (game) => `
        <article class="game-card">
          <div class="game-card-heading">
            <div>
              <h3>${escapeHtml(game.title)}</h3>
              <p>${game.mechanic_count} mechanic reference(s) across ${game.category_count} categor${game.category_count === 1 ? "y" : "ies"}.</p>
            </div>
            <button type="button" data-game-add-key="${escapeHtml(game.key)}">Add game mechanics to Mixer</button>
          </div>
          <div class="pill-list" aria-label="Categories">${gameCategoryPills(game)}</div>
          <div class="pill-list" aria-label="Representative mechanics">${representativeMechanicsMarkup(game)}</div>
          <details class="game-details">
            <summary>View mechanics and example notes</summary>
            ${gameMechanicsListMarkup(game)}
          </details>
        </article>
      `
    )
    .join("");
}

function addGameMechanicsToMixer(gameKey) {
  const game = state.games.byKey.get(gameKey);
  if (!game) {
    return;
  }

  const existingIds = new Set(state.mixer.selectedIds);
  const gameIds = game.mechanics.map((mechanic) => mechanic.id).filter((id) => mechanicExists(id));
  const mergedIds = uniqueIds([...state.mixer.selectedIds, ...gameIds]).sort((a, b) => a.localeCompare(b));
  const addedCount = mergedIds.filter((id) => !existingIds.has(id)).length;
  const duplicateCount = gameIds.length - addedCount;

  state.mixer.selectedIds = mergedIds;
  saveMixerSelection();
  updateMixerUrl();
  renderResults();
  if (state.selectedId) {
    renderDetail(mechanicById(state.selectedId));
  }
  renderMixer();

  elements.gameStatus.textContent = addedCount
    ? `Added ${addedCount} mechanic(s) from ${game.title} to Mixer.${duplicateCount ? ` ${duplicateCount} already selected.` : ""}`
    : `All ${gameIds.length} mechanic(s) from ${game.title} were already selected in Mixer.`;
}

function renderPills(values, className = "") {
  return asArray(values)
    .map((value) => `<span class="pill ${className}">${escapeHtml(value)}</span>`)
    .join("");
}

function sectionMarkup(title, body, className = "") {
  if (!body) {
    return "";
  }
  return `
    <section class="detail-section ${className}">
      <h3>${escapeHtml(title)}</h3>
      ${body}
    </section>
  `;
}

function listMarkup(values) {
  const items = asArray(values).filter(Boolean);
  if (!items.length) {
    return "";
  }
  return `
    <ul class="detail-list">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function parameterMarkup(parameters) {
  const items = asArray(parameters).filter((parameter) => parameter && parameter.name);
  if (!items.length) {
    return "";
  }
  return `
    <div class="parameter-grid">
      ${items
        .map((parameter) => `
          <article class="parameter-card">
            <h4>${escapeHtml(parameter.name)}</h4>
            <dl class="parameter-meta">
              <div>
                <dt>Type</dt>
                <dd>${escapeHtml(parameter.type || "unspecified")}</dd>
              </div>
              <div>
                <dt>Typical range</dt>
                <dd>${escapeHtml(parameter.typical_range || "not documented")}</dd>
              </div>
            </dl>
            <p>${escapeHtml(parameter.description || "No description available.")}</p>
          </article>
        `)
        .join("")}
    </div>
  `;
}

function implementationMarkup(notes) {
  const engines = [
    ["unity", "Unity"],
    ["godot", "Godot"],
    ["unreal", "Unreal"],
    ["web", "Web"]
  ];
  const cards = engines
    .filter(([key]) => notes?.[key])
    .map(([key, label]) => `
      <article class="implementation-card">
        <h4>${label}</h4>
        <p>${escapeHtml(notes[key])}</p>
      </article>
    `);

  if (!cards.length) {
    return '<p class="muted-text">No implementation notes available.</p>';
  }

  return `<div class="implementation-grid">${cards.join("")}</div>`;
}

function renderResults() {
  if (!state.filtered.length) {
    elements.results.innerHTML = '<div class="empty-state">No mechanics match the current search and filters.</div>';
    return;
  }

  elements.results.innerHTML = state.filtered
    .map((mechanic) => {
      const selectedClass = mechanic.id === state.selectedId ? " is-selected" : "";
      const description = mechanic.description || "Description loading from source JSON.";
      return `
        <article class="result-card${selectedClass}" data-id="${escapeHtml(mechanic.id)}" tabindex="0" role="button" aria-label="Open ${escapeHtml(mechanic.name)} details">
          <h2>${escapeHtml(mechanic.name)}</h2>
          <code class="id-line">${escapeHtml(mechanic.id)}</code>
          <div class="meta-row">
            <span class="pill category">${escapeHtml(mechanic.category)}</span>
            ${renderPills(mechanic.dimensions)}
          </div>
          <p class="description">${escapeHtml(description)}</p>
          <div class="pill-list" aria-label="Genres">${renderPills(mechanic.genres)}</div>
          <div class="pill-list" aria-label="Tags">${renderPills(mechanic.tags)}</div>
          <div class="result-actions">
            ${mixerToggleButton(mechanic.id)}
          </div>
        </article>
      `;
    })
    .join("");
}

function difficultyMarkup(difficulty) {
  if (!difficulty) {
    return '<p>Difficulty data is loading from the source JSON.</p>';
  }
  return `
    <div class="detail-grid">
      <div class="detail-metric"><span>Design</span><strong>${escapeHtml(difficulty.design)}</strong></div>
      <div class="detail-metric"><span>Implementation</span><strong>${escapeHtml(difficulty.implementation)}</strong></div>
      <div class="detail-metric"><span>Tuning</span><strong>${escapeHtml(difficulty.tuning)}</strong></div>
    </div>
  `;
}

function relatedMarkup(values) {
  const items = asArray(values);
  if (!items.length) {
    return "";
  }
  return `
    <div class="pill-list">
      ${items
        .map((id) => {
          if (!mechanicExists(id)) {
            return `<span class="pill muted-pill" title="Not in the loaded dataset">${escapeHtml(id)}</span>`;
          }
          return `<button class="pill related-button" type="button" data-related-id="${escapeHtml(id)}">${escapeHtml(id)}</button>`;
        })
        .join("")}
    </div>
  `;
}

function relationshipGroupLabel(type) {
  if (type === "requires" || type === "supports" || type === "balances") {
    return "Dependency / support";
  }
  if (type === "conflicts_with" || type === "soft_conflicts_with") {
    return "Conflict / risk";
  }
  if (type === "feeds" || type === "consumes" || type === "unlocks") {
    return "Flow / progression";
  }
  return "Context";
}

function typedRelationshipsMarkup(relationships) {
  const items = asArray(relationships);
  if (!items.length) {
    return "";
  }

  return `
    <div class="relationship-grid">
      ${items
        .map((relationship) => {
          const target = mechanicById(relationship.target);
          const targetControl = target
            ? `<button class="inline-link relationship-target" type="button" data-related-id="${escapeHtml(relationship.target)}">${escapeHtml(target.name)} (${escapeHtml(relationship.target)})</button>`
            : `<span class="muted-pill relationship-target">${escapeHtml(relationship.target)}</span>`;
          const externalLabel = isExternalReference(relationship.target) ? '<span class="pill muted-pill">External/future</span>' : "";
          return `
            <article class="relationship-card ${relationship.type === "conflicts_with" ? "is-hard-conflict" : ""}">
              <div class="analysis-card-heading">
                <strong>${escapeHtml(relationshipGroupLabel(relationship.type))}</strong>
                <span>${escapeHtml(relationship.type)} / ${escapeHtml(strongestLabel(relationship.strength))}</span>
              </div>
              <p>${targetControl} ${externalLabel}</p>
              <p>${escapeHtml(relationship.reason || "No reason provided.")}</p>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function scopeProfileMarkup(scope) {
  if (!scope) {
    return "";
  }
  const maxRisk = Math.max(scope.networking_risk, scope.save_load_risk, scope.ui_risk);
  const metrics = [
    ["MVP role", roleLabel(scope.mvp_role)],
    ["Implementation", `${scope.implementation_cost} / ${pressureLabel(scope.implementation_cost)}`],
    ["Design", `${scope.design_cost} / ${pressureLabel(scope.design_cost)}`],
    ["Tuning", `${scope.tuning_cost} / ${pressureLabel(scope.tuning_cost)}`],
    ["Content", `${scope.content_cost} / ${pressureLabel(scope.content_cost)}`],
    ["Networking risk", `${scope.networking_risk} / ${pressureLabel(scope.networking_risk)}`],
    ["Save/load risk", `${scope.save_load_risk} / ${pressureLabel(scope.save_load_risk)}`],
    ["UI risk", `${scope.ui_risk} / ${pressureLabel(scope.ui_risk)}`],
    ["Max risk", `${maxRisk} / ${pressureLabel(maxRisk)}`]
  ];

  return `
    <div class="detail-grid">
      ${metrics
        .map(([label, value]) => `
          <div class="detail-metric">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
          </div>
        `)
        .join("")}
    </div>
    <p class="muted-text">Relative planning signal, not an hour estimate.</p>
  `;
}

function mixerToggleButton(id, className = "") {
  const added = isInMixer(id);
  return `
    <button
      class="mixer-toggle ${added ? "is-added" : ""} ${className}"
      type="button"
      data-mixer-toggle="${escapeHtml(id)}"
      aria-pressed="${String(added)}"
    >${added ? "Added" : "Add to Mixer"}</button>
  `;
}

function renderSelectedMixerCards(records) {
  if (!records.length) {
    return `
      <div class="mixer-empty">
        <h3>Start with 3-6 mechanics</h3>
        <p>Select mechanics from the browser to analyze systems, typed relationship gaps, conflicts, scope pressure, and an AI planning prompt. The Mixer is deterministic and based on dataset fields; it does not generate a full game automatically.</p>
      </div>
    `;
  }

  return records
    .map((mechanic) => {
      const scope = mechanic.scope_profile;
      const maxRisk = scope ? Math.max(scope.networking_risk, scope.save_load_risk, scope.ui_risk) : null;
      const scopeText = scope
        ? `Role ${roleLabel(scope.mvp_role)} · Impl ${scope.implementation_cost} · Tune ${scope.tuning_cost} · Risk ${maxRisk}`
        : "No scope_profile yet";
      return `
        <article class="mixer-chip">
          <div>
            <h3>${escapeHtml(mechanic.name)}</h3>
            <code>${escapeHtml(mechanic.id)}</code>
            <p>${escapeHtml(mechanic.category)} · ${escapeHtml(scopeText)}</p>
          </div>
          <button type="button" data-mixer-remove="${escapeHtml(mechanic.id)}">Remove</button>
        </article>
      `;
    })
    .join("");
}

function renderConceptSummary(records, analysis) {
  const roles = analysis.summary.roleCounts;
  return `
    <div class="mixer-summary-grid">
      <div class="detail-metric"><span>Selected</span><strong>${analysis.summary.selectedCount}</strong></div>
      <div class="detail-metric"><span>Categories</span><strong>${escapeHtml(analysis.summary.categories.join(", ") || "none")}</strong></div>
      <div class="detail-metric"><span>Roles</span><strong>core ${roles.core}, support ${roles.support}, optional ${roles.optional}, polish ${roles.polish}</strong></div>
      <div class="detail-metric"><span>Graph Coverage</span><strong>${analysis.summary.graphCount}/${records.length}</strong></div>
    </div>
    ${
      analysis.summary.missingScopeCount
        ? `<p class="muted-text">Mechanics without scope_profile: ${analysis.summary.missingScopeCount}</p>`
        : ""
    }
    ${
      analysis.summary.noGraphIds.length
        ? `<p class="muted-text">Mechanics without typed relationships: ${escapeHtml(analysis.summary.noGraphIds.join(", "))}</p>`
        : ""
    }
  `;
}

function renderRequiredSystems(systems) {
  if (!systems.length) {
    return '<p class="muted-text">No required systems listed for the selected mechanics.</p>';
  }
  return `
    <div class="mixer-table">
      ${systems
        .map((item) => `
          <div class="mixer-row">
            <strong>${escapeHtml(item.system)}</strong>
            <span>${item.count}</span>
            <p>${escapeHtml(item.mechanicIds.join(", "))}</p>
          </div>
        `)
        .join("")}
    </div>
  `;
}

function renderRelationshipSuggestions(suggestions, externalSuggestions) {
  const suggestionMarkup = suggestions.length
    ? suggestions
        .map((suggestion) => `
          <article class="analysis-card ${suggestion.priorityLabel === "Critical dependency" ? "is-critical" : ""}">
            <div class="analysis-card-heading">
              <strong>${escapeHtml(suggestion.priorityLabel)}</strong>
              <span>${escapeHtml(suggestion.type)} · ${escapeHtml(strongestLabel(suggestion.strength))}</span>
            </div>
            <h4>${escapeHtml(suggestion.targetName)}</h4>
            <code>${escapeHtml(suggestion.targetId)}</code>
            <p>From <button type="button" class="inline-link" data-mixer-focus-id="${escapeHtml(suggestion.sourceId)}">${escapeHtml(suggestion.sourceId)}</button>: ${escapeHtml(suggestion.reason)}</p>
            <button type="button" data-mixer-add-id="${escapeHtml(suggestion.targetId)}">Add to Mixer</button>
          </article>
        `)
        .join("")
    : '<p class="muted-text">No missing typed relationship targets from the current selection.</p>';

  const externalMarkup = externalSuggestions.length
    ? sectionMarkup(
        "External/Future Suggestions",
        `<div class="analysis-list">${externalSuggestions
          .map((suggestion) => `
            <article class="analysis-card">
              <strong>${escapeHtml(suggestion.targetId)}</strong>
              <p>${escapeHtml(suggestion.sourceId)} ${escapeHtml(suggestion.type)} this target: ${escapeHtml(suggestion.reason)}</p>
            </article>
          `)
          .join("")}</div>`,
        "mixer-subsection"
      )
    : "";

  return `<div class="analysis-list">${suggestionMarkup}</div>${externalMarkup}`;
}

function renderConflictWarnings(warnings) {
  if (!warnings.length) {
    return '<p class="muted-text">No hard or soft conflicts are present among the selected mechanics.</p>';
  }
  return `
    <div class="analysis-list">
      ${warnings
        .map((warning) => `
          <article class="analysis-card ${warning.type === "conflicts_with" ? "is-hard-conflict" : "is-soft-conflict"}">
            <div class="analysis-card-heading">
              <strong>${escapeHtml(warning.severity)}</strong>
              <span>${escapeHtml(strongestLabel(warning.strength))}</span>
            </div>
            <p><code>${escapeHtml(warning.sourceId)}</code> -> <code>${escapeHtml(warning.targetId)}</code></p>
            <p>${escapeHtml(warning.reason)}</p>
          </article>
        `)
        .join("")}
    </div>
  `;
}

function renderScopePressure(scope) {
  if (!scope.hasScope) {
    return '<p class="muted-text">No selected mechanics currently include scope_profile data.</p>';
  }
  const metrics = [
    ["Implementation", scope.implementation],
    ["Design", scope.design],
    ["Tuning", scope.tuning],
    ["Content", scope.content],
    ["Networking", scope.networking],
    ["Save/Load", scope.saveLoad],
    ["UI", scope.ui],
    ["Overall", scope.overall]
  ];
  return `
    <div class="detail-grid">
      ${metrics
        .map(([label, value]) => `
          <div class="detail-metric">
            <span>${escapeHtml(label)}</span>
            <strong>${formatScore(value)} · ${escapeHtml(pressureLabel(value))}</strong>
          </div>
        `)
        .join("")}
    </div>
    <p class="muted-text">Missing scope data: ${scope.missingCount} selected mechanic(s). Scores are rough relative planning signals, not production estimates.</p>
  `;
}

function renderTrimSuggestions(suggestions) {
  if (!suggestions.length) {
    return '<p class="muted-text">No obvious trim candidates from scope_profile and typed conflicts. Keep validating the selected concept with a small prototype.</p>';
  }
  return `
    <div class="analysis-list">
      ${suggestions
        .map((suggestion) => `
          <article class="analysis-card">
            <h4>${escapeHtml(suggestion.name)}</h4>
            <code>${escapeHtml(suggestion.id)}</code>
            <p>Consider trimming or deferring because: ${escapeHtml(suggestion.reasons.join(", "))}.</p>
          </article>
        `)
        .join("")}
    </div>
  `;
}

function renderRelatedAdditions(additions) {
  if (!additions.length) {
    return '<p class="muted-text">No related additions to suggest from current relationship data.</p>';
  }
  return `
    <div class="analysis-list">
      ${additions
        .map((addition) => `
          <article class="analysis-card">
            <h4>${escapeHtml(addition.name)}</h4>
            <code>${escapeHtml(addition.id)}</code>
            <p>${escapeHtml(addition.reasons.slice(0, 2).join(" "))}</p>
            <button type="button" data-mixer-add-id="${escapeHtml(addition.id)}">Add to Mixer</button>
          </article>
        `)
        .join("")}
    </div>
  `;
}

function renderAiPrompt(prompt) {
  return `
    <div class="prompt-box">
      <textarea readonly rows="12">${escapeHtml(prompt)}</textarea>
      <button type="button" data-mixer-copy-prompt>Copy AI Planning Prompt</button>
    </div>
  `;
}

function renderMixer() {
  const records = selectedMechanics();
  elements.mixerSelected.innerHTML = renderSelectedMixerCards(records);
  elements.copyConceptJson.disabled = !records.length || !state.hydrationDone;
  elements.clearMixer.disabled = !records.length;

  if (!records.length) {
    elements.mixerAnalysis.innerHTML = "";
    return;
  }

  if (!state.hydrationDone) {
    elements.mixerAnalysis.innerHTML = `
      <section class="analysis-section">
        <h3>Loading analysis</h3>
        <p class="muted-text">Source mechanic JSON files are still loading. Analysis will update automatically.</p>
      </section>
    `;
    return;
  }

  const analysis = analyzeMixerSelection(records);
  elements.mixerAnalysis.innerHTML = `
    ${sectionMarkup("Concept Summary", renderConceptSummary(records, analysis), "analysis-section")}
    ${sectionMarkup("Required Systems", renderRequiredSystems(analysis.requiredSystems), "analysis-section")}
    ${sectionMarkup(
      "Missing Dependencies / Suggested Support Mechanics",
      renderRelationshipSuggestions(analysis.missingRelationshipTargets.missing, analysis.missingRelationshipTargets.external),
      "analysis-section"
    )}
    ${sectionMarkup("Conflict / Risk Warnings", renderConflictWarnings(analysis.conflictWarnings), "analysis-section")}
    ${sectionMarkup("Scope Pressure", renderScopePressure(analysis.scopePressure), "analysis-section")}
    ${sectionMarkup("MVP Trim Suggestions", renderTrimSuggestions(analysis.trimSuggestions), "analysis-section")}
    ${sectionMarkup("Related Additions", renderRelatedAdditions(analysis.relatedAdditions), "analysis-section")}
    ${sectionMarkup("AI Planning Prompt", renderAiPrompt(analysis.aiPlanningPrompt), "analysis-section")}
  `;
}

function buildMixerExport() {
  const records = selectedMechanics();
  return MixerAnalysis.buildMixerExport(records, { allMechanics: state.mechanics });
}

async function copyMixerConceptJson() {
  const records = selectedMechanics();
  if (!records.length) {
    return;
  }
  const exportJson = JSON.stringify(buildMixerExport(), null, 2);
  elements.mixerExportOutput.hidden = false;
  elements.mixerExportOutput.value = exportJson;
  try {
    await copyText(exportJson);
    elements.mixerStatus.textContent = "Copied concept JSON. The export is also shown below.";
  } catch (error) {
    elements.mixerStatus.textContent = "Export JSON generated below. Clipboard copy was unavailable.";
    elements.mixerExportOutput.focus();
    elements.mixerExportOutput.select();
  }
}

async function copyMixerPrompt() {
  const records = selectedMechanics();
  if (!records.length) {
    return;
  }
  try {
    await copyText(analyzeMixerSelection(records).aiPlanningPrompt);
    elements.mixerStatus.textContent = "Copied AI planning prompt.";
  } catch (error) {
    elements.mixerStatus.textContent = "Could not copy AI planning prompt.";
  }
}

function mechanicIdsFromImport(value) {
  return MixerAnalysis.parseImportedMechanicIds(value);
}

function importMixerConcept() {
  const value = elements.mixerImportInput.value.trim();
  if (!value) {
    elements.mixerImportStatus.textContent = "Paste exported concept JSON first.";
    return;
  }

  try {
    const ids = mechanicIdsFromImport(value);
    const uniqueImportedIds = uniqueIds(ids);
    const validIds = uniqueImportedIds.filter((id) => mechanicExists(id));
    const invalidCount = uniqueImportedIds.length - validIds.length;
    if (!validIds.length) {
      elements.mixerImportStatus.textContent = "No valid mechanic IDs were found in that JSON.";
      return;
    }
    restoreMixerSelection(validIds, { updateUrl: true });
    elements.mixerImportStatus.textContent = `Imported ${validIds.length} mechanic(s). ${invalidCount ? `${invalidCount} unknown ID(s) ignored.` : ""}`;
  } catch (error) {
    elements.mixerImportStatus.textContent = "Import failed: JSON could not be parsed.";
  }
}

function renderDetail(mechanic) {
  if (!mechanic) {
    elements.detailPanel.innerHTML = `
      <h2>Select a mechanic</h2>
      <p>Choose a result to inspect parameters, implementation notes, related mechanics, and the source JSON path.</p>
    `;
    return;
  }

  const pathHref = mechanicHref(mechanic.path);
  elements.detailPanel.innerHTML = `
    <div class="detail-heading">
      <div>
        <h2>${escapeHtml(mechanic.name)}</h2>
        <code class="id-line">${escapeHtml(mechanic.id)}</code>
      </div>
      <div class="detail-actions" aria-label="Mechanic actions">
        <button type="button" data-copy-kind="id" data-copy-value="${escapeHtml(mechanic.id)}">Copy ID</button>
        <button type="button" data-copy-kind="JSON path" data-copy-value="${escapeHtml(mechanic.path)}">Copy JSON path</button>
        ${mixerToggleButton(mechanic.id, "detail-action")}
        <a class="detail-action" href="${escapeHtml(pathHref)}" target="_blank" rel="noopener">Open JSON</a>
      </div>
    </div>
    <p class="copy-feedback" aria-live="polite"></p>
    <p>${escapeHtml(mechanic.description || "Description loading from source JSON.")}</p>

    ${sectionMarkup("Difficulty", difficultyMarkup(mechanic.difficulty), "difficulty-section")}
    ${sectionMarkup("Parameters", parameterMarkup(mechanic.parameters))}
    ${sectionMarkup("Design Purpose", listMarkup(mechanic.design_purpose))}
    ${sectionMarkup("Edge Cases", listMarkup(mechanic.edge_cases))}
    ${sectionMarkup("Common Bugs", listMarkup(mechanic.common_bugs))}
    ${sectionMarkup("Balancing Notes", listMarkup(mechanic.balancing_notes))}
    ${sectionMarkup("Accessibility Notes", listMarkup(mechanic.accessibility_notes))}
    ${sectionMarkup("Implementation Notes", implementationMarkup(mechanic.implementation_notes), "implementation-section")}
    ${sectionMarkup("Typed Relationships", typedRelationshipsMarkup(mechanic.relationships))}
    ${sectionMarkup("Scope Profile", scopeProfileMarkup(mechanic.scope_profile))}
    ${sectionMarkup("Related Mechanics", relatedMarkup(mechanic.related_mechanics))}
    ${sectionMarkup("Combines Well With", relatedMarkup(mechanic.combines_well_with))}
    ${sectionMarkup("JSON Path", `<p><a class="path-link" href="${escapeHtml(pathHref)}">${escapeHtml(mechanic.path)}</a></p>`)}
  `;
}

function focusDetailPanel(scrollIntoView = false) {
  if (scrollIntoView) {
    elements.detailPanel.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  elements.detailPanel.focus({ preventScroll: scrollIntoView });
}

function selectMechanic(id, options = {}) {
  const mechanic = mechanicById(id);
  if (!mechanic) {
    return false;
  }
  state.selectedId = id;
  if (options.updateUrl !== false) {
    updateSelectedUrl(id);
  }
  renderResults();
  renderDetail(mechanic);
  if (options.focusDetail) {
    focusDetailPanel(options.scrollDetail);
  }
  return true;
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch (error) {
      // Fall back to the older selection API below.
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  if (!copied) {
    throw new Error("Copy command was rejected.");
  }
}

async function handleCopyButton(button) {
  const value = button.dataset.copyValue || "";
  const kind = button.dataset.copyKind || "value";
  const feedback = elements.detailPanel.querySelector(".copy-feedback");
  const originalText = button.textContent;

  try {
    await copyText(value);
    button.textContent = "Copied";
    feedback.textContent = `Copied ${kind}.`;
  } catch (error) {
    button.textContent = "Copy failed";
    feedback.textContent = `Could not copy ${kind}.`;
  }

  window.setTimeout(() => {
    button.textContent = originalText;
  }, 1400);
}

async function mapWithConcurrency(items, limit, mapper, onProgress) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
      onProgress?.(currentIndex + 1, items.length);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  await Promise.all(workers);
  return results;
}

async function hydrateMechanics(summaries) {
  let completed = 0;
  return mapWithConcurrency(
    summaries,
    CONCURRENT_DETAIL_REQUESTS,
    async (summary) => {
      try {
        const detail = await fetchJson(mechanicUrl(summary.path));
        return { ...summary, ...detail, path: summary.path };
      } catch (error) {
        return {
          ...summary,
          description: `Unable to load ${summary.path}: ${error.message}`,
          load_error: error.message
        };
      }
    },
    () => {
      completed += 1;
      if (completed % 20 === 0 || completed === summaries.length) {
        updateStatus(`Loaded ${completed}/${summaries.length} source files. `);
      }
    }
  );
}

function attachEvents() {
  elements.detailPanel.tabIndex = -1;

  const filterControls = [
    elements.searchInput,
    elements.categoryFilter,
    elements.dimensionFilter,
    elements.genreFilter,
    elements.difficultyFilter,
    elements.statusFilter
  ];

  for (const control of filterControls) {
    control.addEventListener("input", applyFilters);
  }

  for (const control of [elements.gameSearchInput, elements.gameCategoryFilter, elements.gameSort]) {
    control.addEventListener("input", applyGameFilters);
  }

  elements.resetFilters.addEventListener("click", () => {
    elements.searchInput.value = "";
    elements.categoryFilter.value = "";
    elements.dimensionFilter.value = "";
    elements.genreFilter.value = "";
    elements.difficultyFilter.value = "";
    elements.statusFilter.value = "";
    applyFilters();
  });

  elements.results.addEventListener("click", (event) => {
    const mixerButton = event.target.closest("[data-mixer-toggle]");
    if (mixerButton) {
      event.preventDefault();
      event.stopPropagation();
      toggleMixerMechanic(mixerButton.dataset.mixerToggle);
      return;
    }

    const card = event.target.closest("[data-id]");
    if (card) {
      selectMechanic(card.dataset.id);
    }
  });

  elements.results.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    const card = event.target.closest("[data-id]");
    if (card) {
      event.preventDefault();
      selectMechanic(card.dataset.id, { focusDetail: true, scrollDetail: true });
    }
  });

  elements.detailPanel.addEventListener("click", async (event) => {
    const copyButton = event.target.closest("[data-copy-value]");
    if (copyButton) {
      await handleCopyButton(copyButton);
      return;
    }

    const mixerButton = event.target.closest("[data-mixer-toggle]");
    if (mixerButton) {
      toggleMixerMechanic(mixerButton.dataset.mixerToggle);
      return;
    }

    const button = event.target.closest("[data-related-id]");
    if (!button) {
      return;
    }
    const relatedId = button.dataset.relatedId;
    selectMechanic(relatedId, { focusDetail: true, scrollDetail: true });
  });

  elements.mixerPanel.addEventListener("click", async (event) => {
    const removeButton = event.target.closest("[data-mixer-remove]");
    if (removeButton) {
      removeFromMixer(removeButton.dataset.mixerRemove);
      return;
    }

    const addButton = event.target.closest("[data-mixer-add-id]");
    if (addButton) {
      addToMixer(addButton.dataset.mixerAddId);
      return;
    }

    const focusButton = event.target.closest("[data-mixer-focus-id]");
    if (focusButton) {
      selectMechanic(focusButton.dataset.mixerFocusId, { focusDetail: true, scrollDetail: true });
      return;
    }

    if (event.target.closest("[data-mixer-copy-prompt]")) {
      await copyMixerPrompt();
    }
  });

  elements.gamesPanel.addEventListener("click", (event) => {
    const addGameButton = event.target.closest("[data-game-add-key]");
    if (addGameButton) {
      addGameMechanicsToMixer(addGameButton.dataset.gameAddKey);
      return;
    }

    const mechanicButton = event.target.closest("[data-game-mechanic-id]");
    if (mechanicButton) {
      selectMechanic(mechanicButton.dataset.gameMechanicId, { focusDetail: true, scrollDetail: true });
    }
  });

  elements.copyConceptJson.addEventListener("click", copyMixerConceptJson);
  elements.clearMixer.addEventListener("click", clearMixerSelection);
  elements.importConceptJson.addEventListener("click", importMixerConcept);
}

async function init() {
  attachEvents();

  try {
    const initialId = requestedMechanicId();
    const initialMixIds = requestedMixerIds();
    state.index = await fetchJson(DATASET_URL);
    state.mechanics = state.index.mechanics.map((mechanic) => ({ ...mechanic }));
    state.filtered = [...state.mechanics];
    populateFilters();
    applyFilters();
    restoreMixerSelection(initialMixIds.length ? initialMixIds : storedMixerSelection(), {
      updateUrl: Boolean(initialMixIds.length)
    });
    renderGames();
    if (initialId && mechanicExists(initialId)) {
      selectMechanic(initialId, { updateUrl: false });
    }

    state.mechanics = await hydrateMechanics(state.mechanics);
    state.hydrationDone = true;
    buildGameIndex(state.mechanics);
    populateGameFilters();
    applyGameFilters();
    populateFilters();
    applyFilters();

    if (state.selectedId) {
      selectMechanic(state.selectedId, { updateUrl: false });
    }
    renderMixer();
  } catch (error) {
    elements.statusText.textContent = "Dataset failed to load.";
    elements.results.innerHTML = `
      <div class="error-state">
        <strong>Unable to load dataset.json.</strong>
        <p>${escapeHtml(error.message)}</p>
        <p>Serve the repository with a local HTTP server, such as <code>python -m http.server 8000</code>, then open <code>http://localhost:8000/site/</code>.</p>
      </div>
    `;
  }
}

init();
