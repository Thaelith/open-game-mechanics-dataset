const state = {
  index: null,
  mechanics: [],
  filtered: [],
  selectedId: null,
  hydrationDone: false
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
  detailPanel: document.querySelector("#detailPanel")
};

const DATASET_URL = new URL("../dataset.json", window.location.href);
const CONCURRENT_DETAIL_REQUESTS = 16;

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

function renderPills(values, className = "") {
  return asArray(values)
    .map((value) => `<span class="pill ${className}">${escapeHtml(value)}</span>`)
    .join("");
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
    return "<p>None listed.</p>";
  }
  return `
    <div class="pill-list">
      ${items
        .map((id) => `<button class="pill related-button" type="button" data-related-id="${escapeHtml(id)}">${escapeHtml(id)}</button>`)
        .join("")}
    </div>
  `;
}

function renderDetail(mechanic) {
  if (!mechanic) {
    elements.detailPanel.innerHTML = `
      <h2>Select a mechanic</h2>
      <p>Choose a result to inspect difficulty, related mechanics, combinations, and the source JSON path.</p>
    `;
    return;
  }

  const pathHref = mechanicUrl(mechanic.path).href;
  elements.detailPanel.innerHTML = `
    <h2>${escapeHtml(mechanic.name)}</h2>
    <code class="id-line">${escapeHtml(mechanic.id)}</code>
    <p>${escapeHtml(mechanic.description || "Description loading from source JSON.")}</p>

    <h3>Difficulty</h3>
    ${difficultyMarkup(mechanic.difficulty)}

    <h3>Related Mechanics</h3>
    ${relatedMarkup(mechanic.related_mechanics)}

    <h3>Combines Well With</h3>
    ${relatedMarkup(mechanic.combines_well_with)}

    <h3>JSON Path</h3>
    <p><a class="path-link" href="${escapeHtml(pathHref)}">${escapeHtml(mechanic.path)}</a></p>
  `;
}

function selectMechanic(id) {
  state.selectedId = id;
  const mechanic = state.mechanics.find((item) => item.id === id);
  renderResults();
  renderDetail(mechanic);
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
      selectMechanic(card.dataset.id);
    }
  });

  elements.detailPanel.addEventListener("click", (event) => {
    const button = event.target.closest("[data-related-id]");
    if (!button) {
      return;
    }
    const relatedId = button.dataset.relatedId;
    if (state.mechanics.some((mechanic) => mechanic.id === relatedId)) {
      elements.searchInput.value = relatedId;
      applyFilters();
      selectMechanic(relatedId);
    }
  });
}

async function init() {
  attachEvents();

  try {
    state.index = await fetchJson(DATASET_URL);
    state.mechanics = state.index.mechanics.map((mechanic) => ({ ...mechanic }));
    state.filtered = [...state.mechanics];
    populateFilters();
    applyFilters();

    state.mechanics = await hydrateMechanics(state.mechanics);
    state.hydrationDone = true;
    populateFilters();
    applyFilters();

    if (state.selectedId) {
      renderDetail(state.mechanics.find((mechanic) => mechanic.id === state.selectedId));
    }
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
