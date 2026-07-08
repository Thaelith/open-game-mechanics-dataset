# Example Games And Tagging

This document explains how `example_games` should be interpreted today and how mechanic-to-game tagging could evolve later.

## Current Role

`example_games` are lightweight study references. They name recognizable games where a mechanic can be observed, usually with a short note about the visible behavior.

They are not exhaustive. They do not prove exact implementation details. They should help users find games to study, not serve as legal evidence, source citations, or claims about proprietary internals.

## Why Example Games Matter

Mechanic-to-game examples help developers and designers connect abstract mechanic entries to real play experiences. They can make it easier to study implementation trade-offs, compare variants, and use a shared vocabulary when describing game features.

Over time, a reliable game-to-mechanics layer could also help users find games with similar mechanics or discover design references for a prototype. That requires careful review because game tagging can become noisy quickly.

## Current Limitations

- Example coverage may be uneven across categories.
- Examples are manually curated and may be broad or imperfect.
- Some mechanics may need more specific variants as tagging improves.
- There is no full game database yet.
- There is no self-reporting workflow yet.
- Example games should not be treated as proof of exact implementation details.

Current coverage is tracked in [`reports/example-games-coverage-report-v0.3.md`](reports/example-games-coverage-report-v0.3.md).

## Derived Game Index

Mechanic entries contain `example_games` in the mechanic-to-game direction. The generated game examples index reverses that data into a game-to-mechanics view.

This supports study and discovery questions such as "which mechanics can I study in this game?" or "which games share similar mechanic references?" It is still derived from lightweight examples, so it should not be treated as a full game database, citation system, or self-reported tag layer.

The current generated index is [`reports/game-examples-index-report-v0.3.md`](reports/game-examples-index-report-v0.3.md).

The static browser also includes a lightweight Games view derived from the same mechanic `example_games` fields. It lets readers search by game title, mechanic, or category and add a game's associated mechanics to the Mixer for planning analysis. This remains a study/discovery aid, not evidence of exact implementation details.

Playable examples are separate from `example_games`: they are original repository-maintained canvas demos for selected mechanics. See [`playable-mechanic-examples.md`](playable-mechanic-examples.md).

Game-anchor quality is tracked through periodic review reports, including [`reports/game-anchor-quality-audit-v0.3.md`](reports/game-anchor-quality-audit-v0.3.md) and [`reports/game-anchor-policy-and-cleanup-v0.3.md`](reports/game-anchor-policy-and-cleanup-v0.3.md). Title and note rules are documented in [`game-anchor-policy-v0.3.md`](game-anchor-policy-v0.3.md). These audits help catch title consistency risks, overused anchors, broad mappings, and examples that may need a future curated game-tagging layer.

## Curated Vs Self-Reported Tags

Curated tags are cleaner, slower, and more consistent. They fit the current dataset better because mechanic boundaries and confidence signals are still being reviewed.

Self-reported tags scale better, but they can introduce duplicates, marketing labels, inconsistent mechanic names, and weak evidence. A future workflow may combine both approaches: curated core examples first, then self-reported additions with moderation and review.

## Current Capabilities And Future Direction

Current capabilities:

- Mechanic JSON entries include `example_games`.
- The generated [`reports/example-games-coverage-report-v0.3.md`](reports/example-games-coverage-report-v0.3.md) tracks example-game coverage.
- The generated [`reports/game-examples-index-report-v0.3.md`](reports/game-examples-index-report-v0.3.md) derives a game-to-mechanics index from mechanic examples.
- The static browser includes a Games view for searching game references and adding associated mechanics to the Mixer.

Future work should focus on:

- Applying the title consistency policy before adding more examples.
- Reviewing broad or saturated game anchors before adding more examples.
- Considering a curated `games/` or `game_tags/` layer if demand exists.
- Defining review expectations for any self-reported game tags before accepting them.
- Adding deeper browser filtering only after the derived view proves useful and title consistency is reviewed.

The immediate goal is better study references, not a complete game database.
