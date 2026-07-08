# Game Anchor Policy And Cleanup v0.3

Date: 2026-07-08

## Purpose

This pass follows up on `game-anchor-quality-audit-v0.3.md` by creating a title consistency policy and applying only small, targeted cleanup to audit-identified title and mapping candidates.

It does not add broad enrichment, add mechanics, remove mechanics, change schema, add schema fields, change status, change `source_confidence`, change site UI, change Mixer logic, or create a separate game database.

## Policy Doc Created

Created `docs/game-anchor-policy-v0.3.md`.

The policy says to prefer exact specific titles, use subtitles when they disambiguate, keep numbered sequels separate, treat remakes/remasters/deluxe editions carefully, avoid abbreviations, avoid ambiguous franchise-level titles where possible, and keep example notes focused on visible player-facing behavior.

## Title Clusters Reviewed

| Cluster | Action | Reason |
| --- | --- | --- |
| `The Witcher 3` / `The Witcher 3: Wild Hunt` | Normalized one `The Witcher 3` entry to `The Witcher 3: Wild Hunt`. | The shorter title clearly referred to the same specific game already represented by the fuller title. |
| `Metal Gear Solid V` / `Metal Gear Solid V: The Phantom Pain` | Normalized three `Metal Gear Solid V` entries to `Metal Gear Solid V: The Phantom Pain`. | The examples referred to the same specific game already represented by the fuller title. |
| `Diablo` / `Diablo III` | Left unchanged. | The broad `Diablo` examples may intentionally represent franchise/series-level loot and rarity references. They should not be silently reassigned to `Diablo III`. |
| `Mario Kart 8` / `Mario Kart 8 Deluxe` | Left unchanged. | These are distinct releases; the current examples use exact titles and should not be merged without an edition policy decision. |

## Title Changes Made

| File | Mechanic | Old title | New title |
| --- | --- | --- | --- |
| `data/economy/repair_cost.json` | `economy.repair_cost` | `The Witcher 3` | `The Witcher 3: Wild Hunt` |
| `data/movement/prone.json` | `movement.prone` | `Metal Gear Solid V` | `Metal Gear Solid V: The Phantom Pain` |
| `data/stealth/alert_state.json` | `stealth.alert_state` | `Metal Gear Solid V` | `Metal Gear Solid V: The Phantom Pain` |
| `data/stealth/last_known_position_search.json` | `stealth.last_known_position_search` | `Metal Gear Solid V` | `Metal Gear Solid V: The Phantom Pain` |

## Mapping Candidates Reviewed

| Candidate | Action | Reason |
| --- | --- | --- |
| `camera.smooth_follow_camera` -> `Dead Cells` | Rewrote note. | Kept the example, but made the note focus on tuned camera follow rather than implying a broader side-view camera taxonomy. |
| `ui_ux.quest_marker` -> `Alien: Isolation` | Rewrote note. | Kept the example as objective guidance, but narrowed wording to objective tracker cues. |
| `ui_ux.quest_marker` -> `Subnautica` | Rewrote note. | Kept the example and made the beacon/signal wording more explicitly tied to exploration targets. |
| `physics.breakable_object` -> `Spelunky` | Rewrote note. | Kept the example and removed broader "destructible level objects" wording. |
| `multiplayer.online_coop` -> `World of Warcraft` | Rewrote note. | Kept the example and clarified party/raid group play rather than implying a fixed small co-op campaign model. |
| `progression.experience_points` -> `Dark Souls` | Rewrote note. | Kept the example and clarified that souls are a visible resource spent on leveling decisions. |
| `economy.shop` -> `Gran Turismo 7` | Rewrote note. | Kept the example and made the transaction behavior clearer. |
| `ui_ux.cooldown_indicator` -> `Hades` | Left unchanged. | The example remains plausible but should be revisited in a future cooldown/readiness UI taxonomy review. |

## Example Notes Rewritten

| Mechanic | Game | New note |
| --- | --- | --- |
| `camera.smooth_follow_camera` | `Dead Cells` | Uses tuned camera follow for fast side-view combat and platforming routes. |
| `ui_ux.quest_marker` | `Subnautica` | Uses beacon and signal markers tied to exploration targets. |
| `ui_ux.quest_marker` | `Alien: Isolation` | Uses objective tracker cues to direct current survival routes. |
| `physics.breakable_object` | `Spelunky` | Uses breakable pots and other fragile props as part of run exploration. |
| `multiplayer.online_coop` | `World of Warcraft` | Uses online party and raid group play for dungeons, quests, and shared objectives. |
| `progression.experience_points` | `Dark Souls` | Uses earned souls as a visible resource spent on leveling decisions. |
| `economy.shop` | `Gran Turismo 7` | Uses dealership and parts purchase screens for vehicle acquisition and upgrades. |

## Examples Removed

None.

## Future Taxonomy Issues

- `ui_ux.cooldown_indicator` may need clearer boundaries around action readiness, charge state, and non-cooldown availability feedback.
- `camera.smooth_follow_camera` may eventually need a cleaner relationship to side-view or room-framed cameras.
- `ui_ux.quest_marker` may eventually split or cross-link with waypoint, beacon, tracker, or objective guidance variants.
- `economy.shop` examples may need subtyping for vendors, dealerships, run shops, service vendors, and upgrade/service transactions.
- Broad franchise-level examples such as `Diablo`, `The Legend of Zelda`, and `Final Fantasy` should be reviewed before more title enrichment.

## Updated Game Index Summary

After cleanup and regeneration:

| Metric | Value |
| --- | ---: |
| Total mechanics | 223 |
| Total example-game references | 631 |
| Unique game titles | 192 |
| Games with 1 mechanic | 99 |
| Games with 2-4 mechanics | 62 |
| Games with 5+ mechanics | 31 |
| Max mechanics on one game | 19 |

The total reference count did not change. Unique titles dropped because two split anchors were normalized.

## Validation Result

Validation passed after regeneration:

- Local Markdown links valid.
- 223 mechanics validated.
- `dataset.json` up to date.
- Generic lint found 0 warnings.
- Quality report advisory warnings remain 0.
- Game example coverage remains 223/223 mechanics.
- Graph checker has 0 hard errors.
- JavaScript syntax checks passed.
- Mixer unit tests passed 6/6.
- Mixer scenario tests passed 10/10.

## Enrichment Resume Decision

Small, policy-guided enrichment can resume after this cleanup, but broad multi-game enrichment should stay paused. The safest next step is a small anchor batch focused on one or two underdeveloped games, with explicit skipped-candidate notes and no additions to saturated anchors unless the study value is unusually clear.
