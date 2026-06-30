# Reports

This directory contains generated reports that help maintainers and reviewers evaluate dataset quality, graph coverage, and Mechanic Mixer behavior.

## Quality Report

[`quality-report-v0.1.md`](quality-report-v0.1.md)

Checks dataset quality signals such as advisory generic-lint warnings, field completeness, weak implementation notes, generic subcategories, link graph health, and example-game usage.

Why it matters: this is the quickest way to verify whether a quality pass introduced vague wording, missing implementation notes, or broad structural gaps.

Regenerate with:

```bash
python tools/quality_report.py --output docs/reports/quality-report-v0.1.md
```

## Mechanic Graph Report

[`mechanic-graph-report-v0.2.md`](mechanic-graph-report-v0.2.md)

Summarizes typed relationship and `scope_profile` coverage, common relationship types, mechanics with no incoming or outgoing typed relationships, and category-level graph coverage.

Why it matters: future tools such as the Mechanic Mixer, MVP trimmer, and dependency recommender depend on graph coverage and valid typed relationships.

Regenerate with:

```bash
python tools/mechanic_graph_report.py --output docs/reports/mechanic-graph-report-v0.2.md
```

## Mechanic Mixer Scenario QA Report

[`mechanic-mixer-scenario-qa-v0.2.md`](mechanic-mixer-scenario-qa-v0.2.md)

Runs realistic concept mixes through the deterministic Mixer analysis module and records selected mechanics, scope pressure, required systems, conflict warnings, missing dependency/support suggestions, related additions, and MVP trim suggestions.

Why it matters: scenario QA helps maintainers catch misleading scoring, over-aggressive trim wording, missing conflict warnings, or unrelated suggestions before changing Mixer logic or relationship data.

Regenerate with:

```bash
node tools/test_mixer_scenarios.mjs --report docs/reports/mechanic-mixer-scenario-qa-v0.2.md
```

## Reviewed Core Gap Report

[`reviewed-core-gap-report-v0.3.md`](reviewed-core-gap-report-v0.3.md)

Summarizes the proposed v0.3 reviewed core subset candidates, with special attention to `edge_cases`, `common_bugs`, relationship coverage, scope profile coverage, and source-confidence gaps.

Why it matters: reviewed status should depend on practical prototype-breaking detail, not only schema validity or broad coverage.

## Reviewed Core Batch 1 Report

[`reviewed-core-batch-1-v0.3.md`](reviewed-core-batch-1-v0.3.md)

Documents the first v0.3 reviewed-core improvement pass for `movement.dash`, `platforming.jump_buffering`, `combat.reload`, `ui_ux.cooldown_indicator`, and `time.time_rewind`.

Why it matters: this report records exactly what changed, which edge cases and common bugs improved, and what still blocks reviewed status.

## Reviewed Core Batch 1 Maintainer Review

[`reviewed-core-batch-1-maintainer-review-v0.3.md`](reviewed-core-batch-1-maintainer-review-v0.3.md)

Records maintainer recommendations, conservative source-confidence rationale, relationship-direction notes, and reviewed-status readiness for the five Batch 1 mechanics.

## Time Rewind Architecture Review

[`time-rewind-architecture-review-v0.3.md`](time-rewind-architecture-review-v0.3.md)

Lists the architecture questions that must be resolved before `time.time_rewind` can be considered for reviewed status or higher confidence.

## Taxonomy Review v0.3

[`taxonomy-review-v0.3.md`](taxonomy-review-v0.3.md)

Reviews borderline or important entries against the mechanic, variant, and parameter criteria documented in [`../taxonomy-and-categorization-criteria.md`](../taxonomy-and-categorization-criteria.md).

Why it matters: taxonomy choices affect mechanic IDs, relationship quality, Mixer suggestions, contribution review, and whether entries are useful checklists or just duplicated tuning values.

## Locomotion Taxonomy Review v0.3

[`locomotion-taxonomy-review-v0.3.md`](locomotion-taxonomy-review-v0.3.md)

Applies the taxonomy criteria to locomotion entries, especially `movement.walk`, `movement.run`, `movement.sprint`, `movement.stamina_movement`, `movement.dash`, `movement.air_dash`, and `movement.dodge_roll`.

Why it matters: locomotion entries are common enough that over-splitting, under-splitting, or treating speed values as separate mechanics would affect contributor expectations and future data migration.

## When To Regenerate

- After changing mechanic JSON files.
- After changing graph relationships or scope profiles.
- After changing `tools/quality_report.py`, `tools/mechanic_graph_report.py`, or `site/mixer-analysis.js`.
- Before tagging a public release.
