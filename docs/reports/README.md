# Reports

This directory contains generated status reports, scenario QA output, and the current v0.3 review-tracking artifacts.

## Generated / Status Reports

[`quality-report-v0.1.md`](quality-report-v0.1.md)

Checks dataset quality signals such as advisory generic-lint warnings, field completeness, weak implementation notes, generic subcategories, link graph health, and example-game usage.

[`mechanic-graph-report-v0.2.md`](mechanic-graph-report-v0.2.md)

Summarizes typed relationship and `scope_profile` coverage, common relationship types, mechanics with no incoming or outgoing typed relationships, and category-level graph coverage.

[`mechanic-mixer-scenario-qa-v0.2.md`](mechanic-mixer-scenario-qa-v0.2.md)

Runs realistic concept mixes through the deterministic Mixer analysis module and records selected mechanics, scope pressure, required systems, conflict warnings, missing dependency/support suggestions, related additions, and MVP trim suggestions.

[`example-games-coverage-report-v0.3.md`](example-games-coverage-report-v0.3.md)

Tracks how well mechanics are connected to lightweight game examples for study references, including category coverage, missing examples, and the most repeated game titles.

[`game-examples-index-report-v0.3.md`](game-examples-index-report-v0.3.md)

Reverses mechanic-level `example_games` into a derived game-to-mechanics view so readers can see which mechanics are currently associated with a recognizable game title.

[`game-anchor-enrichment-pass-1-v0.3.md`](game-anchor-enrichment-pass-1-v0.3.md)

Documents the first curated pass that strengthened sparse game anchors in the derived game-to-mechanics index without creating a separate game database.

[`game-anchor-enrichment-pass-2-v0.3.md`](game-anchor-enrichment-pass-2-v0.3.md)

Documents the second curated pass focused on high-value recognizable anchor games in the derived game-to-mechanics index.

[`game-anchor-enrichment-pass-3-v0.3.md`](game-anchor-enrichment-pass-3-v0.3.md)

Documents the third curated pass focused on genre-balanced recognizable anchor games in the derived game-to-mechanics index.

[`game-anchor-enrichment-pass-4-v0.3.md`](game-anchor-enrichment-pass-4-v0.3.md)

Documents the fourth curated pass focused on mature anchor deepening and quality-preserving expansion in the derived game-to-mechanics index.

[`game-anchor-enrichment-pass-5-v0.3.md`](game-anchor-enrichment-pass-5-v0.3.md)

Documents the fifth curated pass focused on classic high-value anchor games in the derived game-to-mechanics index.

[`game-anchor-quality-audit-v0.3.md`](game-anchor-quality-audit-v0.3.md)

Reviews the accumulated game-anchor enrichment work for title consistency risks, saturated anchors, broad mappings, and recommended fixes before further enrichment.

## v0.3 Review Tracking

[`v0.3-review-summary.md`](v0.3-review-summary.md)

Consolidates the v0.3 reviewed-core, taxonomy, boundary hardening, relationship-semantics, and failure-mode review decisions into one public summary.

[`../reviewed-core-confidence-workflow-v0.3.md`](../reviewed-core-confidence-workflow-v0.3.md)

Defines the proposed workflow for future reviewed-status and source-confidence changes. It is a planning document, not a schema change or status change.

[`reviewed-core-gap-report-v0.3.md`](reviewed-core-gap-report-v0.3.md)

Tracks the proposed v0.3 reviewed core subset candidates, with special attention to `edge_cases`, `common_bugs`, relationship coverage, scope profile coverage, and source-confidence gaps.

[`reviewed-core-batch-1-v0.3.md`](reviewed-core-batch-1-v0.3.md)

Documents the first v0.3 reviewed-core improvement pass for `movement.dash`, `platforming.jump_buffering`, `combat.reload`, `ui_ux.cooldown_indicator`, and `time.time_rewind`.

## Consolidated Intermediate Reports

The following process-heavy intermediate reports were consolidated into [`v0.3-review-summary.md`](v0.3-review-summary.md) and removed:

- `v0.3-docs-snapshot-review.md`
- `taxonomy-review-v0.3.md`
- `locomotion-taxonomy-review-v0.3.md`
- `relationship-semantics-review-v0.3.md`
- `mechanic-boundary-prerequisite-failure-mode-audit-v0.3.md`
- `reviewed-core-batch-1-maintainer-review-v0.3.md`
- `time-rewind-architecture-review-v0.3.md`

## When To Regenerate

Regenerate reports after data or tooling changes, not after unrelated documentation edits.

```bash
python tools/quality_report.py --output docs/reports/quality-report-v0.1.md
python tools/mechanic_graph_report.py --output docs/reports/mechanic-graph-report-v0.2.md
node tools/test_mixer_scenarios.mjs --report docs/reports/mechanic-mixer-scenario-qa-v0.2.md
python tools/example_games_report.py
python tools/game_examples_index.py
python tools/game_anchor_audit.py
```
