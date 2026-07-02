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

## Curated Vs Self-Reported Tags

Curated tags are cleaner, slower, and more consistent. They fit the current dataset better because mechanic boundaries and confidence signals are still being reviewed.

Self-reported tags scale better, but they can introduce duplicates, marketing labels, inconsistent mechanic names, and weak evidence. A future workflow may combine both approaches: curated core examples first, then self-reported additions with moderation and review.

## Future Direction

1. Improve coverage and consistency of mechanic-level `example_games`.
2. Generate a report showing example-game coverage.
3. Add a simple game-example index derived from mechanic JSON.
4. Later consider a separate `games/` or `game_tags/` layer if demand exists.
5. Only then consider browser search or filtering for "show mechanics in this game" or "show games using this mechanic."

The immediate goal is better study references, not a complete game database.
