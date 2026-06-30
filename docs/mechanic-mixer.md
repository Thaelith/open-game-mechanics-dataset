# Mechanic Mixer

The Mechanic Mixer is a static, client-side planning tool in `site/index.html`. It helps users combine selected mechanics into a small concept analysis using existing dataset fields.

It does not call an AI backend, generate random game ideas, estimate production hours, or decide whether a concept will be fun. Every suggestion is traceable to selected mechanic IDs, typed `relationships`, legacy browse links, `required_systems`, or `scope_profile`.

## What It Does

- Tracks a selected set of mechanics in the browser.
- Aggregates required systems across selected mechanics.
- Finds missing typed relationship targets such as required dependencies, support mechanics, balancing mechanics, and parent mechanics.
- Shows hard and soft conflicts only when `relationships` explicitly contains `conflicts_with` or `soft_conflicts_with`.
- Computes rough scope pressure from `scope_profile`.
- Suggests deterministic MVP trim candidates.
- Generates a copyable implementation-planning prompt for another AI coding or design agent.
- Exports and imports concept JSON.
- Uses shared deterministic analysis helpers covered by `tools/test_mixer_analysis.mjs`.

## Scoring

Scope pressure uses selected mechanics with `scope_profile`:

- implementation average: 25%
- design average: 20%
- tuning average: 25%
- content average: 15%
- average of max networking, save/load, and UI risk: 15%

Labels:

- `0-1.9`: Low
- `2.0-3.2`: Medium
- `3.3-4.1`: High
- `4.2-5.0`: Very High

These are rough relative planning signals, not production estimates.

## Dependency Suggestions

The Mixer reads outgoing typed relationships from selected mechanics.

Suggestion priority is highest for:

- `requires` with `strength: "strong"`
- `requires` with lower strength
- strong `supports` or `balances`
- contextual links such as `enhances`, `feeds`, `consumes`, `unlocks`, `extends`, and `is_variant_of`

External and `future.*` targets are kept separate from normal dataset mechanics.

## Conflict Warnings

The Mixer only shows conflicts that are already present in typed relationship data:

- `conflicts_with`: hard warning
- `soft_conflicts_with`: caution warning

It does not invent conflicts from category similarity or mechanic names.

## MVP Trim Suggestions

Trim suggestions are deterministic. They consider:

- `mvp_role`, preferring to defer `polish` before `optional`
- hard conflicts in the selected set
- missing required relationship targets
- very high tuning, implementation, networking, save/load, or UI risk

The tool says "consider trimming or deferring," not "must remove." Core mechanics are preserved unless they are part of a hard conflict.

## QA

The core analysis logic lives in `site/mixer-analysis.js` so it can be used by both the static browser and the Node test harness. Run:

```bash
node tools/test_mixer_analysis.mjs
```

The tests cover conflict detection, missing dependency suggestions, required-system aggregation, scope pressure, export/import shape, and empty selections.

## Limitations

- The first MVP uses full mechanic JSON loaded by the existing static browser.
- Incoming relationship suggestions are lightweight and are not a full graph optimizer.
- Legacy `related_mechanics` and `combines_well_with` are lower-priority suggestion sources.
- The exported prompt is intended for planning and prototyping, not final code generation.
- The Mixer does not replace design review, playtesting, accessibility review, or technical validation.
- Scope labels and trim suggestions should be calibrated through real-world concept QA before they are treated as stable product guidance.

## Future Improvements

- Dedicated graph visualization.
- More nuanced dependency grouping.
- Better concept templates for common genres.
- Explicit "must have / nice to have" user intent.
- Saved share links with compact encoded selections.
- More test fixtures for scoring edge cases and larger concept mixes.
