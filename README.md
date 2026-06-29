# Open Game Mechanics Dataset

One-sentence pitch: an engine-agnostic, machine-readable dataset of game mechanics for developers, students, researchers, and AI coding or design agents.

## Why This Exists

Game mechanics knowledge is often scattered across tutorials, design talks, source code, wikis, and personal notes. This project turns that knowledge into a structured open dataset where each mechanic has consistent metadata, implementation hints, design notes, edge cases, tuning parameters, accessibility notes, and short factual game references.

This is not a claim to contain every mechanic ever made. The current state is an early MVP with a strong seed set that is designed to grow through community review and contributions.

## Current Status

Early MVP / v0.1 release candidate. The repository currently includes:

- 223 schema-valid mechanic files
- A strict JSON Schema in `schema/mechanic.schema.json`
- A generated `dataset.json` index for search and tooling
- Validation tooling plus advisory quality lint
- Engine-agnostic implementation notes for Unity, Godot, Unreal, Web/JavaScript, and other engines where practical

Recommended GitHub topics: `game-design`, `game-development`, `dataset`, `json-schema`, `unity`, `godot`, `unreal`, `ai-agents`, `mechanics`.

## Dataset Format

Each mechanic is a JSON file under `data/<category>/<mechanic>.json`. IDs are dot-separated lowercase identifiers such as `movement.dash`, `platforming.wall_jump`, or `progression.skill_tree`.

Example snippet:

```json
{
  "id": "movement.dash",
  "name": "Dash",
  "category": "movement",
  "dimensions": ["2D", "2.5D", "3D"],
  "difficulty": {
    "design": "easy",
    "implementation": "easy",
    "tuning": "medium"
  },
  "description": "A short burst of movement in a chosen direction.",
  "related_mechanics": ["camera.smooth_follow_camera", "movement.run", "movement.walk", "ui_ux.cooldown_indicator"],
  "tags": ["burst_movement", "controls", "dash", "mobility"]
}
```

The canonical schema is `schema/mechanic.schema.json`. The generated search index is `dataset.json`.

## Folder Structure

```text
data/      Mechanic JSON files grouped by category
schema/    JSON Schema files
tools/     Python validation, indexing, and helper scripts
docs/      Contributor and user documentation
examples/  Example mechanic and query prompts
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
```

On Windows PowerShell:

```powershell
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python tools\validate_dataset.py
python tools\generate_index.py --check
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

## Scope and Non-Goals

This project stores structured design and implementation knowledge. It does not include copyrighted art, audio, level files, sprites, game scripts, proprietary design documents, or copied wiki text. It is not engine-specific and should not become a Unity-only, Godot-only, or Unreal-only repository.

## Roadmap

See `ROADMAP.md` and `docs/roadmap.md` for planned review passes, category expansion, examples, and richer query tooling.

## License

Dataset content is dedicated under `CC0-1.0` so it can be used broadly in open, academic, commercial, and AI-assisted workflows with minimal friction. Python scripts and tooling use `MIT`, marked with SPDX headers. Contributions must be original writing or facts that can be safely represented without copying protected expression.

Example game titles are short factual references only. The project does not contain copyrighted assets, copied game text, proprietary design documents, or long quoted explanations from existing sources.
