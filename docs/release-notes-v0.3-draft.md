# v0.3 Release Notes Draft

This is a draft for future v0.3 communication. It does not mark v0.3 as released.

## Summary

v0.3 preparation focuses on making the project easier to understand, try, review, and use for practical planning. The dataset remains a v0.2.0 schema foundation, but the public experience now includes stronger docs, game-based discovery, playable examples, clearer trust guidance, and more conservative review workflows.

## What Changed Since v0.2

- Added trust and review documentation.
- Added taxonomy, mechanic-boundary, and relationship-direction criteria.
- Hardened selected mechanic entries for prerequisites, assumptions, edge cases, and common bugs.
- Added game-example coverage tooling and generated reports.
- Added a derived game-to-mechanics index.
- Added a static browser Games view.
- Added original playable mechanic examples for five lower-risk mechanics.
- Added a game-anchor title policy, quality audit, targeted cleanup, and small policy-guided enrichment passes.
- Added reviewed-core confidence workflow planning.

## New Browser Features

- Mechanics browser remains static and dependency-free.
- Games view lets readers search game anchors, categories, and associated mechanics derived from `example_games`.
- Game cards can add associated mechanics to the Mixer.
- Supported mechanic detail panels link to playable examples.

## Games View

The Games view reverses mechanic-level examples into game-to-mechanics groups. It helps users find study anchors such as "which mechanics can I study in this game?"

It is not a full game database, a self-reported tagging layer, or proof of exact implementation details.

## Playable Examples

The playable examples MVP includes original simple-shape demos for:

- `movement.dash`
- `platforming.coyote_time`
- `platforming.jump_buffering`
- `combat.reload`
- `ui_ux.cooldown_indicator`

These demos are meant to clarify timing, input, state, cooldowns, and UI feedback. They are not commercial game footage or production-ready engine templates.

## Mechanic Mixer

The Mixer remains a deterministic planning aid based on selected mechanics, typed relationships, required systems, and scope metadata.

It helps surface dependencies, support suggestions, conflicts, scope pressure, MVP trim suggestions, and AI planning prompts. It is not a balance simulator or proof that mechanics combine well.

## Game-Anchor Enrichment, Audit, And Policy

Game examples now have stronger support:

- 223/223 mechanics include `example_games`.
- The game examples index derives game-to-mechanics groups.
- A title and note policy defines exact-title and visible-behavior expectations.
- Quality audit tooling identifies title clusters, saturated anchors, broad mappings, and risky note terms.
- Small enrichment passes improved underdeveloped anchors without adding a separate game database.

## Data Coverage Summary

- 223 schema-valid mechanic JSON files.
- `schema_version: "0.2.0"`.
- 178 mechanics with typed relationships and scope profiles.
- 534 typed relationships.
- 658 example-game references.
- 192 unique game titles.
- 35 games with 5+ associated mechanics.
- 0 advisory quality warnings.
- 10/10 Mixer scenario QA tests passing.

## Known Limitations

- Most mechanics remain `draft`.
- `source_confidence` has not been upgraded as part of v0.3 preparation.
- The schema has not yet added structured review rationale fields.
- The Games view is derived from mechanic examples, not a curated game database.
- Some example titles and broad mappings still need future review.
- Playable examples cover only five mechanics.
- The taxonomy remains practical and subjective, not complete or objective.

## Suggested Feedback Questions

- Can a new visitor understand how to use the project within a few minutes?
- Are the Games view and example-game notes useful without overclaiming?
- Which mechanic entries still lack practical prerequisites, assumptions, edge cases, or failure modes?
- Which playable examples would be most useful next?
- Which Mixer suggestions feel noisy or misleading?
- Would a future curated `games/` or `game_tags/` layer be useful enough to justify the maintenance cost?
