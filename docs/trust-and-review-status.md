# Trust & Review Status

## What This Dataset Is

Open Game Mechanics Dataset is a structured, engine-agnostic, machine-readable seed dataset.

It is designed for browsing, planning, contribution review, AI-agent context, and tool experiments. It is useful for prototypes, design checklists, mechanic dependency exploration, early concept planning, and comparing implementation risks across mechanics.

## What This Dataset Is Not

This project is not an authoritative encyclopedia of all game mechanics.

It is also not:

- A drop-in code library.
- A production estimate system.
- A substitute for playtesting, technical review, accessibility review, or human design judgment.
- A claim about proprietary implementation details of example games.
- A guarantee that every relationship or scope score applies to every game.

## Review Status

Each mechanic has a `status` field. The current schema allows:

- `draft`
- `reviewed`
- `needs_examples`
- `deprecated`

At v0.2, the mechanic entries use draft-level status. `draft` means an entry is schema-valid, quality-checked, and useful as structured planning data, but still open to review and refinement.

The next maturity step is a reviewed core subset: a smaller group of high-value mechanics with stronger review notes, confidence rationale, and relationship QA.

The v0.3 planning target is documented in [`reviewed-core-subset-v0.3.md`](reviewed-core-subset-v0.3.md), with current gaps tracked in [`reports/reviewed-core-gap-report-v0.3.md`](reports/reviewed-core-gap-report-v0.3.md). The proposed workflow for future status and confidence changes is documented in [`reviewed-core-confidence-workflow-v0.3.md`](reviewed-core-confidence-workflow-v0.3.md).

## Source Confidence

Each mechanic has a `source_confidence` field:

- `low`
- `medium`
- `high`

`source_confidence` is a practical confidence signal, not a formal citation system.

`low` means the entry should be treated as candidate data that needs review.

`medium` means the entry is plausible, useful, and aligned with common design knowledge or observable mechanic behavior, but still open to review.

`high` should require stronger review, a clear observable design basis, implementation experience, or community/maintainer agreement. It should not be used casually just because an entry sounds convincing.

## Example Games

`example_games` are short factual references for recognizable mechanic usage. They help readers understand where a mechanic can be observed.

They are not copied text. They are not citations for proprietary implementation details. They should remain brief and factual, usually naming a title and the visible mechanic behavior.

Example games should help readers recognize the mechanic, not prove exact implementation.

## Relationships

Typed `relationships` are machine-readable planning edges. They are used by the Mechanic Mixer and future tools to reason about dependencies, support mechanics, conflicts, resource flow, unlocks, variants, and scope pressure.

They are not universal design laws. A relationship can be useful in one genre or engine context and less important in another.

Relationship quality matters more than relationship count. Each relationship should stay reviewable and explainable through its `reason` field.

## Scope Profile

`scope_profile` values are relative planning signals. They are not hour estimates, staffing estimates, budget estimates, or production guarantees.

They help tools and reviewers detect likely pressure in implementation, design, tuning, content, networking, save/load, and UI. They should be calibrated through scenario QA, real user feedback, and review of concrete projects.

## Current v0.2 Trust Level

v0.2 is a strong structured seed dataset. It is useful for exploration, tool experiments, AI-agent context, and planning checklists.

It is not yet a fully reviewed authoritative reference. The next maturity step is a reviewed core subset and the confidence workflow described in [`reviewed-core-confidence-workflow-v0.3.md`](reviewed-core-confidence-workflow-v0.3.md).

## Taxonomy Choices

Mechanic categories and entry boundaries are practical choices, not objective laws. The dataset now tracks the current mechanic, variant, and parameter criteria in [`taxonomy-and-categorization-criteria.md`](taxonomy-and-categorization-criteria.md), with current v0.3 review decisions summarized in [`reports/v0.3-review-summary.md`](reports/v0.3-review-summary.md).

These criteria should help reviewers discuss cases such as walk/run/sprint without implying that the dataset is complete or universally authoritative.
