# Low-Count Game Anchor Triage v0.3

This report reviews recognizable games that have only a few associated mechanics in the derived Games view. It is a triage document, not a plan to make the project a complete game database.

The goal is to find a small number of high-value anchors that can be improved with clear, visible, policy-compliant examples. It should also identify games that should stay low-count until the dataset has better mechanic boundaries or a future curated game-tagging layer.

## Exact Low-Count Distribution Before Enrichment

| Band | Games |
| --- | --- |
| Exactly 1 mechanic | 98 |
| Exactly 2 mechanics | 30 |
| Exactly 3 mechanics | 19 |
| Exactly 4 mechanics | 10 |
| 5+ mechanics | 35 |

Combined 2-4 mechanic games: 59.

## Sample Recognizable 1-Mechanic Anchors

| Game | Current mechanic | Triage note |
| --- | --- | --- |
| Doom | `combat.ranged_attack` | Strong candidate; several existing FPS/action mechanics are visibly present without stretching boundaries. |
| Metal Gear Solid | `ai.patrol` | Strong candidate; stealth AI, alertness, sightlines, and radar are visible study references. |
| BioShock | `narrative.environmental_storytelling` | Recognizable, but enrichment should wait for a narrow pass around immersive-sim/combat/resource boundaries. |
| Diablo II | `progression.skill_tree` | Recognizable, but Diablo examples already appear under other titles; needs title/version care. |
| Braid | `time.time_rewind` | Should stay low-count; useful as a focused anchor for one high-risk mechanic. |
| Beat Saber | `rhythm.beat_matching` | Should stay low-count unless the rhythm category is expanded. |

## Sample Recognizable 2-Mechanic Anchors

| Game | Current mechanics | Triage note |
| --- | --- | --- |
| Age of Empires II | `strategy.tech_tree`, `strategy.unit_counter_system` | Strong candidate; current strategy/UI mechanics can support a small enrichment. |
| StarCraft II | `strategy.fog_of_war`, `strategy.unit_counter_system` | Good candidate, but similar to Age of Empires II; avoid enriching both in one tiny pass. |
| Animal Crossing | `economy.dynamic_pricing`, `economy.trading` | Needs title/version care before enrichment because mechanics differ across entries. |
| Mark of the Ninja | `stealth.noise_meter`, `stealth.visibility_meter` | Good future stealth candidate; skip this pass because Metal Gear Solid gives broader underdeveloped stealth coverage. |
| Counter-Strike 2 | `combat.ranged_attack`, `combat.reload` | Already clear as a focused shooter anchor; enrichment should wait for a multiplayer/combat audit. |
| XCOM | `ai.cover_seeking`, `ai.utility_scoring` | Good future tactics candidate, but current strategy/tactics boundaries are still thin. |

## Sample Recognizable 3-Mechanic Anchors

| Game | Current mechanics | Triage note |
| --- | --- | --- |
| The Sims | `ai.flee`, `ai.utility_scoring`, `simulation.needs_simulation` | Recognizable, but title/version and missing schedule/build-mode boundaries make enrichment risky. |
| Thief: The Dark Project | `stealth.noise_meter`, `stealth.shadow_cover`, `stealth.visibility_meter` | Good future stealth anchor; already useful as a focused visibility/noise study reference. |
| Mirror's Edge | `camera.first_person_camera`, `movement.run`, `traversal.parkour_vault` | Already clear and focused; no immediate enrichment needed. |
| Don't Starve | `crafting.crafting_queue`, `survival.day_night_cycle`, `survival.hunger` | Good future survival/crafting candidate, but not needed for this tiny pass. |
| Civilization VI | `strategy.fog_of_war`, `strategy.tech_tree`, `strategy.territory_control` | Already strong enough as a focused strategy anchor. |

## Games That Should Stay Low-Count For Now

- `Braid`: useful as a focused `time.time_rewind` study anchor; broad enrichment would risk overclaiming.
- `Beat Saber`: current rhythm coverage is narrow, so one strong rhythm example is acceptable.
- `Bionic Commando` and `Cut the Rope`: focused physics anchors; more examples would require a physics taxonomy pass.
- `Journey`: strong focused example for wind force; broader mapping would likely be too interpretive.
- `Company of Heroes`: useful for `strategy.territory_control`; future enrichment should wait for more RTS-specific mechanic boundaries.

## Good Enrichment Candidates

- `Doom`: first-person camera, fast running, health pickups, area damage, and key doors are visible and match existing mechanic boundaries.
- `Metal Gear Solid`: guard patrols, sightlines, alert escalation, last-known-position search, and radar are visible and useful for stealth study.
- `Age of Empires II`: top-down camera, fog of war, minimap, tech tree, and unit counters are visible and useful for RTS planning vocabulary.
- `StarCraft II`: similar strategy candidate, but should wait so the pass remains small and does not over-focus on RTS.
- `Mark of the Ninja` and `Thief: The Dark Project`: good stealth candidates, but should wait because the pass already includes one stealth anchor.

## Do Not Enrich Without Future Review

- `Animal Crossing`: needs title/version decisions before adding crafting, time, catalog, or inventory examples.
- `The Sims`: needs clearer title/version handling and likely missing boundaries such as schedule systems or build mode.
- `FTL: Faster Than Light`: currently absent from the derived index; adding it would require a separate careful candidate review.
- Broad franchise or genre anchors should not be added just because they are recognizable.

## Tiny Enrichment Batch Recommendation

Choose exactly three anchors:

1. `Doom`: starts at 1 mechanic and can safely reach a useful 5+ range.
2. `Metal Gear Solid`: starts at 1 mechanic and can safely become a stronger stealth study anchor.
3. `Age of Empires II`: starts at 2 mechanics and can become a clearer RTS anchor without touching saturated games.

Do not enrich every low-count recognizable game. After this tiny batch, stop and share publicly unless user feedback identifies a specific weak game anchor.
