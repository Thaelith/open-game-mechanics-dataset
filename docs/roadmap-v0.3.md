# v0.3 Roadmap

This roadmap focuses on trust, review quality, relationship quality, and Mixer usefulness rather than simply adding more mechanics.

It does not promise timelines.

The initial reviewed-core planning artifact is [`reviewed-core-subset-v0.3.md`](reviewed-core-subset-v0.3.md). Current candidate gaps are tracked in [`reports/reviewed-core-gap-report-v0.3.md`](reports/reviewed-core-gap-report-v0.3.md).

Reviewed Core Batch 1 has started and is documented in [`reports/reviewed-core-batch-1-v0.3.md`](reports/reviewed-core-batch-1-v0.3.md). It focuses on stronger `edge_cases`, `common_bugs`, implementation notes, and relationship review for five core mechanics.

Batch 1 maintainer rationale and the dedicated time-rewind architecture checklist are tracked in reports so source-confidence decisions remain reviewable without adding schema fields prematurely.

Taxonomy and categorization criteria are now tracked in [`taxonomy-and-categorization-criteria.md`](taxonomy-and-categorization-criteria.md), with current borderline cases reviewed in [`reports/taxonomy-review-v0.3.md`](reports/taxonomy-review-v0.3.md).

Locomotion-specific taxonomy follow-up is tracked in [`reports/locomotion-taxonomy-review-v0.3.md`](reports/locomotion-taxonomy-review-v0.3.md), focused on walk/run/sprint boundaries and nearby movement mechanics.

## Must Do

- Create a reviewed core subset of 20-30 high-value mechanics. See [`reviewed-core-subset-v0.3.md`](reviewed-core-subset-v0.3.md).
- Define a trust, provenance, and review workflow.
- Use the taxonomy and categorization criteria to review mechanic vs variant vs parameter boundaries.
- Clarify confidence rationale for `source_confidence`.
- Treat `edge_cases` and `common_bugs` as first-class review signals, not secondary cleanup fields.
- Improve parameter structure for future tooling.
- Reduce Mixer suggestion noise with intent filters or domain filters.
- Review relationship quality in lower-coverage or high-risk categories.

## Should Do

- Add a visual relationship graph.
- Add more public demo examples.
- Expand AI-agent usage examples.
- Improve contribution workflow for mechanic review.
- Add relationship QA checks for suspicious cross-domain suggestions.
- Track reviewed-core gaps in [`reports/reviewed-core-gap-report-v0.3.md`](reports/reviewed-core-gap-report-v0.3.md).

## Nice To Have

- CLI mechanic scaffolder.
- Package or API wrapper.
- Screenshot or short GIF for README.
- Engine-specific export helpers.
- More scenario fixtures after relationship quality improves.
