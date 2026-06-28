# Contributing

Thank you for helping improve the Open Game Mechanics Dataset. The goal is a practical, structured, original dataset that game developers, students, researchers, and AI agents can trust.

## Before You Contribute

Search `dataset.json` and `data/` for the mechanic first. If a mechanic already exists, improve the existing file instead of adding a duplicate. Keep entries engine-agnostic and avoid framing a mechanic as belonging to one tool or genre unless that limitation is inherent.

## How to Add a New Mechanic

1. Pick the most specific category from `docs/taxonomy.md`.
2. Choose a stable ID using dot-separated lowercase and snake_case, for example `movement.dash`.
3. Create `data/<category>/<final_id_segment>.json`.
4. Fill every required schema field using original wording.
5. Add useful `related_mechanics` and `combines_well_with` references.
6. Run:

```bash
python tools/validate_dataset.py
python tools/generate_index.py
```

## ID Conventions

IDs use `<category>.<mechanic_name>`. Use lowercase letters, numbers, and underscores only. Do not use spaces, slashes, marketing names, or game-specific names. Prefer `traversal.grappling_hook` over `zelda_hookshot` and `combat.projectile_reflection` over `genji_deflect`.

## Category Rules

Put the mechanic where a developer would expect to find its primary design purpose. If a mechanic crosses categories, use one primary category and link related mechanics. For example, `platforming.wall_jump` can relate to `movement.dash` and `camera.smooth_follow_camera`.

## Writing Style

Use direct, original, practical writing. The short description should explain the mechanic in one sentence. Put why it matters in `design_notes` and `design_purpose`. Put engine hints in `implementation_notes`. Avoid vague phrases like "makes it better" or "adds fun" unless you explain the exact player-facing effect.

Include at least three tunable parameters, three edge cases, three common bugs, two balancing notes, one accessibility note, tags, and implementation notes for at least two engines or platforms.

## What Not to Include

Do not copy text from wikis, tutorials, books, articles, store pages, game scripts, or proprietary design documents. Do not include copyrighted images, sprites, audio, code, level data, or long quotes. Do not add personal opinions about a game as if they are factual design analysis.

## Useful Examples

Example games should be short factual references: a title and a brief note about the visible mechanic. Good: "Celeste uses dash as a core precision-platforming action." Avoid copying explanations, ranking games, or describing hidden implementation details unless you can support them.

## Pull Request Checklist

- The mechanic ID is unique and follows the naming convention.
- The file path matches the category and final ID segment.
- All required schema fields are present.
- Related mechanic IDs exist or use `future.` / `external.` prefixes.
- Writing is original and engine-agnostic.
- Examples are short factual references.
- `python tools/validate_dataset.py` passes.
- `python tools/generate_index.py` has been run.

## Review Criteria

Maintainers review for schema validity, practical usefulness, category fit, originality, clarity, balanced engine coverage, and whether the entry improves the dataset without duplicating existing mechanics.
