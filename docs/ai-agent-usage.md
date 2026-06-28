# AI Agent Usage

AI agents should treat this repository as a bounded dataset, not as permission to invent unsupported mechanics.

## Retrieve by ID

Use exact IDs such as `movement.dash`, `combat.parry`, or `progression.skill_tree`. For broad searches, use `dataset.json` groups by category, genre, difficulty, dimension, or tag, then open full mechanic files for details.

## Search by Genre

Read `dataset.json.groups.genre`. For example, an action game plan can start with IDs in `groups.genre.action`, then filter by implementation difficulty or tags.

## Combine Mechanics

Prefer explicit graph fields:

- `related_mechanics` for nearby concepts.
- `combines_well_with` for mechanics that commonly support each other.

If an agent recommends a combination, cite the mechanic IDs it used.

## Generate Implementation Plans

When writing code plans, use:

- `required_systems` to identify architecture dependencies.
- `parameters` for tunable values.
- `edge_cases` and `common_bugs` for test cases.
- `implementation_notes` for engine-specific hints.

## Avoid Hallucination

Do not claim a mechanic exists in this dataset unless its ID is present. If a desired mechanic is absent, say it is not currently in the dataset and propose a `future.<id>` reference or a new contribution.

## Cite IDs

Generated design docs, implementation plans, and feature suggestions should cite mechanic IDs inline, for example: "Use `movement.dash` with `camera.screen_shake` and `ui_ux.cooldown_indicator`."
