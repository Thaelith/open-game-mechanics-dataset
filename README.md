# Open Game Mechanics Dataset

An engine-agnostic, machine-readable dataset of game mechanics for developers, students, researchers, technical designers, and AI coding or design agents.

The v0.2 release adds typed mechanic relationships, rough scope metadata, graph validation, a static browser, and the first client-side Mechanic Mixer MVP.

## Start Here

- Browse the dataset on GitHub Pages: [thaelith.github.io/open-game-mechanics-dataset/site/](https://thaelith.github.io/open-game-mechanics-dataset/site/)
- Browse locally: [`site/index.html`](site/index.html)
- Learn the Mixer: [`docs/how-to-use-the-mixer.md`](docs/how-to-use-the-mixer.md)
- Try playable examples: [`site/playable-examples.html`](site/playable-examples.html)
- Try demo mixes: [`docs/demo-mixes.md`](docs/demo-mixes.md)
- Use with AI agents: [`docs/ai-agent-usage.md`](docs/ai-agent-usage.md)
- Read v0.2 release notes: [`docs/releases/v0.2.0.md`](docs/releases/v0.2.0.md)
- Inspect reports: [`docs/reports/README.md`](docs/reports/README.md)
- Validate locally: see [Validate Locally](#validate-locally)

## Why This Exists

Game mechanics knowledge is often scattered across tutorials, design talks, source code, wikis, and personal notes. This project turns that knowledge into a structured open dataset where each mechanic has consistent metadata, implementation hints, design notes, edge cases, tuning parameters, accessibility notes, and short factual game references.

This is not a claim to contain every mechanic ever made. The current state is a v0.2 open dataset with a strong seed set, typed graph metadata for many core mechanics, and tooling designed to support community review and contributions.

## Current Status

| Signal | Status |
| --- | --- |
| Version | v0.2.0 dataset foundation |
| Mechanics | 223 schema-valid JSON files |
| Schema | `schema_version: "0.2.0"` |
| License | CC0 dataset, MIT tooling |
| Browser | Static, dependency-free GitHub Pages browser |
| Mixer | Deterministic client-side MVP |
| Quality report | 0 advisory warnings |
| Graph coverage | 178 mechanics with typed relationships and scope profiles |
| Typed relationships | 534 |
| Scenario QA | 10/10 Mixer scenarios passing |

The repository also includes a strict JSON Schema, generated `dataset.json` index, graph validation/reporting tools, advisory quality lint, and engine-agnostic implementation notes for Unity, Godot, Unreal, Web/JavaScript, and other engines where practical.

Recommended GitHub topics: `game-design`, `game-development`, `dataset`, `json-schema`, `unity`, `godot`, `unreal`, `ai-agents`, `mechanics`.

## Trust & Review Status

This is a v0.2 structured seed dataset, not an authoritative encyclopedia. Entries are schema-valid and quality-checked, but many are still draft-level and open to review.

Use it for mechanic discovery, planning, AI-agent context, and prototype checklists. Do not treat scope scores as production estimates or example games as proprietary implementation evidence.

This project is:

- A structured dataset for planning, browsing, contribution review, and tool context.
- A practical reference for prototypes, checklists, and early concept analysis.
- A deterministic source for the static Mechanic Mixer MVP.

This project is not:

- A drop-in code library.
- A complete or authoritative encyclopedia.
- A substitute for playtesting, accessibility review, technical review, or human design judgment.

See [`docs/trust-and-review-status.md`](docs/trust-and-review-status.md) for details on `status`, `source_confidence`, `example_games`, `relationships`, and `scope_profile`.

## How This Can Be Used

- Developers can browse mechanics to find prerequisites, edge cases, common bugs, and implementation risks before prototyping.
- Designers can use mechanics as a shared vocabulary for discussing features and comparing similar systems.
- AI coding or design agents can use entries as structured context for implementation planning.
- Example games can help users find real games to study for a mechanic, but examples are not exhaustive or proof of exact implementation.
- The Mixer helps explore combinations, dependencies, conflicts, and scope pressure. It is a planning aid, not proof that mechanics combine cleanly.

## Public Review Links

- [v0.2.0 release notes](docs/releases/v0.2.0.md)
- [Mechanic Mixer documentation](docs/mechanic-mixer.md)
- [How to use the Mixer](docs/how-to-use-the-mixer.md)
- [Demo mixes](docs/demo-mixes.md)
- [Playable mechanic examples](docs/playable-mechanic-examples.md)
- [AI-agent usage](docs/ai-agent-usage.md)
- [Example games and tagging](docs/example-games-and-tagging.md)
- [Trust and review status](docs/trust-and-review-status.md)
- [Taxonomy and categorization criteria](docs/taxonomy-and-categorization-criteria.md)
- [Relationship semantics and direction](docs/relationship-semantics-and-direction.md)
- [v0.3 review summary](docs/reports/v0.3-review-summary.md)
- [Quality report](docs/reports/quality-report-v0.1.md)
- [Graph coverage report](docs/reports/mechanic-graph-report-v0.2.md)
- [v0.3 trust roadmap](docs/roadmap-v0.3.md)

## Dataset Format

Each mechanic is a JSON file under `data/<category>/<mechanic>.json`. IDs are dot-separated lowercase identifiers such as `movement.dash`, `platforming.wall_jump`, or `progression.skill_tree`.

Example snippet:

```json
{
  "id": "movement.air_dash",
  "name": "Air Dash",
  "category": "movement",
  "subcategory": "burst_movement",
  "dimensions": ["2D", "2.5D", "3D"],
  "parameters": [
    {
      "name": "air_dash_travel_ms",
      "type": "integer",
      "typical_range": "80-220",
      "description": "Time window for the committed airborne dash movement."
    }
  ],
  "relationships": [
    {
      "target": "movement.dash",
      "type": "extends",
      "reason": "Air dash reuses dash displacement and cooldown rules while applying them during airborne movement state.",
      "strength": "strong"
    }
  ],
  "scope_profile": {
    "mvp_role": "core",
    "implementation_cost": 3,
    "design_cost": 3,
    "tuning_cost": 5,
    "content_cost": 2,
    "networking_risk": 3,
    "save_load_risk": 1,
    "ui_risk": 1
  }
}
```

Actual mechanic files include the full required schema fields: descriptions, design purpose, required systems, edge cases, common bugs, balancing notes, accessibility notes, implementation notes, related mechanics, example games, tags, status, source confidence, and update metadata.

The canonical schema is `schema/mechanic.schema.json`. The generated search index is `dataset.json`.

## Browse the Dataset

A dependency-free static browser is available on GitHub Pages at [thaelith.github.io/open-game-mechanics-dataset/site/](https://thaelith.github.io/open-game-mechanics-dataset/site/) and in the repo at [site/index.html](site/index.html). It loads `dataset.json`, searches and filters mechanics, and fetches individual mechanic JSON files for expanded details including typed relationships and scope profiles. It also includes a lightweight Games view derived from `example_games` so readers can see which mechanics are associated with a recognizable study reference.

The browser also includes a client-side [Mechanic Mixer](docs/mechanic-mixer.md) for deterministic concept planning from selected mechanics, typed relationships, required systems, and scope metadata. See [How to use the Mixer](docs/how-to-use-the-mixer.md) for examples and limitations.

The site now includes a small set of original [playable mechanic examples](docs/playable-mechanic-examples.md) for five lower-risk mechanics. These demos use simple shapes and are meant to clarify timing, state, and UI feedback; they are not commercial game footage or production-ready templates.

To test locally, serve the repository root over HTTP:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/site/`.

## Folder Structure

```text
data/      Mechanic JSON files grouped by category
schema/    JSON Schema files
tools/     Python validation, indexing, and helper scripts
docs/      Contributor and user documentation
examples/  Example mechanic and query prompts
site/      Static GitHub Pages browser
.github/   CI workflow and issue/PR templates
```

## Validate Locally

Requires Python 3.11+.

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python tools/validate_dataset.py
python tools/generate_index.py --check
python tools/check_links.py
python tools/generic_lint.py --limit 50
python tools/check_mechanic_graph.py
node --check site/mixer-analysis.js
node --check site/app.js
node tools/test_mixer_analysis.mjs
node tools/test_mixer_scenarios.mjs
```

On Windows PowerShell:

```powershell
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python tools\validate_dataset.py
python tools\generate_index.py --check
python tools\check_links.py
python tools\generic_lint.py --limit 50
python tools\check_mechanic_graph.py
node --check site\mixer-analysis.js
node --check site\app.js
node tools\test_mixer_analysis.mjs
node tools\test_mixer_scenarios.mjs
```

## Add a New Mechanic

1. Pick a category from `docs/taxonomy.md`.
2. Choose an ID like `combat.parry` or `procedural_generation.seeded_generation`.
3. Generate a starter file:

```bash
python tools/mechanic_template_generator.py traversal.wall_run --output data/traversal/wall_run.json
```

4. Fill every field with original writing.
5. Run validation and regenerate the index:

```bash
python tools/validate_dataset.py
python tools/generate_index.py
```

## Use Cases

- Plan features for Unity, Godot, Unreal, Phaser, Three.js, custom C++, or other engines.
- Search mechanics by genre, tag, difficulty, dimension, or category.
- Teach design students how mechanics connect to systems, parameters, bugs, and accessibility.
- Help AI agents produce grounded implementation plans that cite mechanic IDs.
- Compare mechanics when building prototypes or design documents.
- Explore deterministic concept mixes with dependency, conflict, scope, and MVP trim signals in the static Mechanic Mixer.
- Run scenario QA against realistic Mechanic Mixer concept mixes before changing scoring or relationship data.

## Scope and Non-Goals

This project stores structured design and implementation knowledge. It does not include copyrighted art, audio, level files, sprites, game scripts, proprietary design documents, or copied wiki text. It is not engine-specific and should not become a Unity-only, Godot-only, or Unreal-only repository.

## Roadmap

See `ROADMAP.md`, `docs/roadmap.md`, and `docs/reports/mechanic-graph-report-v0.2.md` for planned review passes, graph coverage gaps, category expansion, examples, and richer query tooling.

## License

Dataset content is dedicated under `CC0-1.0` so it can be used broadly in open, academic, commercial, and AI-assisted workflows with minimal friction. Python scripts and tooling use `MIT`, marked with SPDX headers. Contributions must be original writing or facts that can be safely represented without copying protected expression.

Example game titles are short factual references only. The project does not contain copyrighted assets, copied game text, proprietary design documents, or long quoted explanations from existing sources.
