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

## Mechanic, Variant, Or Parameter

Before adding a new mechanic, check whether it should instead be a variant or parameter of an existing entry. A separate mechanic should usually have distinct behavior, state, implementation concerns, edge cases, common bugs, relationships, or design purpose beyond a simple number change.

See [`docs/taxonomy-and-categorization-criteria.md`](docs/taxonomy-and-categorization-criteria.md) for the current criteria. If the boundary is unclear, explain the tradeoff in the pull request instead of assuming the taxonomy is objective.

## Writing Style

Use direct, original, practical writing. The short description should explain the mechanic in one sentence. Put why it matters in `design_notes` and `design_purpose`. Put engine hints in `implementation_notes`. Avoid vague phrases like "makes it better" or "adds fun" unless you explain the exact player-facing effect.

Include at least three tunable parameters, three edge cases, three common bugs, two balancing notes, one accessibility note, tags, and implementation notes for at least two engines or platforms.

Treat `edge_cases` and `common_bugs` as first-class quality fields. They should describe concrete prototype-breaking situations such as stale input buffers, bad state reset, collision tunneling, save/load restoration errors, UI desync, network authority mismatch, or animation/state priority bugs.

## What Not to Include

Do not copy text from wikis, tutorials, books, articles, store pages, game scripts, or proprietary design documents. Do not include copyrighted images, sprites, audio, code, level data, or long quotes. Do not add personal opinions about a game as if they are factual design analysis.

## Useful Examples

Example games should be short factual references: a title and a brief note about the visible mechanic. Good: "Celeste uses dash as a core precision-platforming action." Avoid copying explanations, ranking games, or describing hidden implementation details unless you can support them.

## Review and Trust Expectations

When contributing or revising a mechanic, please explain:

- Why the mechanic entry is useful.
- Whether it is based on observable game behavior, common design knowledge, implementation experience, or community review.
- Why typed relationships use their chosen type and strength.
- Why `source_confidence` should be `low`, `medium`, or `high`.
- Whether example games are brief factual examples only.

Keep relationship reasons concrete. A reviewer should be able to understand what dependency, support, conflict, resource flow, unlock, or planning risk the relationship is meant to express.

Check relationship type and direction against [`docs/relationship-semantics-and-direction.md`](docs/relationship-semantics-and-direction.md) before adding or changing typed `relationships`.

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
