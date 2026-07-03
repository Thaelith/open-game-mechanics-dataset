# v0.3 Roadmap

This roadmap focuses on trust, review quality, relationship quality, and Mixer usefulness rather than simply adding more mechanics.

It does not promise timelines.

The initial reviewed-core planning artifact is [`reviewed-core-subset-v0.3.md`](reviewed-core-subset-v0.3.md). Current candidate gaps are tracked in [`reports/reviewed-core-gap-report-v0.3.md`](reports/reviewed-core-gap-report-v0.3.md). Future status and confidence changes should follow [`reviewed-core-confidence-workflow-v0.3.md`](reviewed-core-confidence-workflow-v0.3.md).

The current v0.3 preparation decisions are consolidated in [`reports/v0.3-review-summary.md`](reports/v0.3-review-summary.md). That summary covers Reviewed Core Batch 1, the time rewind architecture gate, taxonomy/boundary criteria, locomotion Batch A, survival-meter Batch B, UI feedback Batch C, procedural generation Batch D, relationship semantics cleanup, and the dataset-wide boundary/prerequisite/failure-mode audit.

Detailed criteria remain in [`taxonomy-and-categorization-criteria.md`](taxonomy-and-categorization-criteria.md) and [`relationship-semantics-and-direction.md`](relationship-semantics-and-direction.md). Explicit prerequisites, state/input assumptions, and prototype-breaking failure modes are now first-class v0.3 review priorities.

Example-game discovery preparation now includes full mechanic-level example coverage, a generated [`game-examples-index-report-v0.3.md`](reports/game-examples-index-report-v0.3.md), and a static browser Games view derived from existing `example_games`. This is still a study/discovery aid, not a full game database.

Playable example preparation now includes an MVP set of original browser demos for five lower-risk mechanics. These examples use simple shapes and are tracked in [`playable-mechanic-examples.md`](playable-mechanic-examples.md); they are not commercial game footage or production templates.

## Must Do

- Create a reviewed core subset of 20-30 high-value mechanics. See [`reviewed-core-subset-v0.3.md`](reviewed-core-subset-v0.3.md).
- Define a trust, provenance, and review workflow.
- Use the taxonomy and categorization criteria to review mechanic vs variant vs parameter boundaries.
- Apply the reviewed-core confidence workflow before changing `status` or `source_confidence`.
- Treat `edge_cases` and `common_bugs` as first-class review signals, not secondary cleanup fields.
- Require future boundary decisions to be justified by explicit prerequisites, state/input assumptions, and concrete failure modes.
- Improve parameter structure for future tooling.
- Reduce Mixer suggestion noise with intent filters or domain filters.
- Review relationship quality in lower-coverage or high-risk categories.
- Apply relationship direction criteria before rewriting typed relationship data.
- Continue targeted hardening where future audits show weak prerequisites, state assumptions, or failure modes.

## Should Do

- Add a visual relationship graph.
- Add more public demo examples.
- Maintain example-game coverage and improve title consistency. See [`example-games-and-tagging.md`](example-games-and-tagging.md), [`reports/example-games-coverage-report-v0.3.md`](reports/example-games-coverage-report-v0.3.md), and [`reports/game-examples-index-report-v0.3.md`](reports/game-examples-index-report-v0.3.md).
- Validate the existing static browser Games view with real users before adding any broader tagging layer.
- Validate the playable examples MVP with users before expanding beyond the first five mechanics.
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
- Deeper browser filtering for comparing games with similar mechanic sets.
- More playable examples after criteria, scope, and maintenance expectations are clear.
- Separate `games/` or `game_tags/` layer after example coverage, taxonomy boundaries, and moderation expectations are clearer.
