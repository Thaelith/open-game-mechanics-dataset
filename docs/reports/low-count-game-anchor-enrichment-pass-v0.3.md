# Low-Count Game Anchor Enrichment Pass v0.3

This pass applies the low-count triage recommendation to a tiny set of recognizable, underdeveloped game anchors. It follows the v0.3 game-anchor policy: exact titles, visible behavior only, no implementation claims, and no attempt to create a complete game database.

## Exact Low-Count Distribution Before Enrichment

| Band | Games |
| --- | --- |
| Exactly 1 mechanic | 98 |
| Exactly 2 mechanics | 30 |
| Exactly 3 mechanics | 19 |
| Exactly 4 mechanics | 10 |
| 5+ mechanics | 35 |

## Chosen Games And Why

| Game | Before | After | Reason |
| --- | --- | --- | --- |
| Doom | 1 | 6 | Strong recognizable FPS anchor with several clear, visible mechanics already represented in the dataset. |
| Metal Gear Solid | 1 | 6 | Strong stealth anchor where patrol, sight, alert, search, camera, and radar examples are visible and useful. |
| Age of Empires II | 2 | 5 | Strong RTS anchor that can use existing top-down, fog-of-war, minimap, tech-tree, and unit-counter boundaries. |

## Added Examples

### Doom

| Mechanic | Note |
| --- | --- |
| `camera.first_person_camera` | Uses a first-person viewpoint for movement, aiming, and combat spaces. |
| `combat.area_of_effect_attack` | Uses rockets and explosive barrels as visible area-damage threats. |
| `movement.run` | Uses fast sustained running as baseline combat and navigation movement. |
| `puzzle.key_and_lock` | Uses colored keycards and locked doors as progression gates. |
| `survival.health` | Uses health pickups and damage state as visible combat survival pressure. |

Existing retained example:

- `combat.ranged_attack`: Uses varied ranged weapons with distinct projectile and hitscan behavior.

### Metal Gear Solid

| Mechanic | Note |
| --- | --- |
| `ai.line_of_sight_detection` | Uses guard sightlines as readable stealth detection pressure. |
| `camera.third_person_camera` | Uses character-visible camera framing for stealth navigation and guard observation. |
| `stealth.alert_state` | Uses enemy alert escalation from suspicion and search into combat. |
| `stealth.last_known_position_search` | Uses guard searches after losing direct contact with Snake. |
| `ui_ux.minimap` | Uses radar-style map information for nearby guards and stealth awareness. |

Existing retained example:

- `ai.patrol`: Uses readable guard patrols as a stealth planning element.

### Age of Empires II

| Mechanic | Note |
| --- | --- |
| `camera.top_down_camera` | Uses a top-down strategy view for unit control and battlefield readability. |
| `strategy.fog_of_war` | Uses fog of war and scouting to hide enemy activity and unexplored areas. |
| `ui_ux.minimap` | Uses a minimap for scouting, terrain, and army positioning. |

Existing retained examples:

- `strategy.tech_tree`: Uses research unlocks to advance units, buildings, and strategies.
- `strategy.unit_counter_system`: Uses unit classes and bonuses to create strategic counters.

## Rejected Candidate Games

| Game | Reason |
| --- | --- |
| The Binding of Isaac | Already has 4 mechanics and a coherent roguelike/procedural anchor; not a 1-3 count target. |
| StarCraft II | Good candidate, but similar to Age of Empires II; skipped to preserve genre balance and pass size. |
| FTL: Faster Than Light | Not currently present in the derived index; needs a separate careful review before adding. |
| Animal Crossing | Needs title/version decisions before adding time, crafting, inventory, or catalog examples. |
| The Sims | Needs title/version handling and likely missing mechanic boundaries such as schedules or build mode. |
| Mark of the Ninja | Good future stealth candidate, but skipped because Metal Gear Solid was chosen for this pass. |
| Thief: The Dark Project | Already useful as a focused stealth visibility/noise anchor; further enrichment can wait. |

## Skipped Candidate Mechanics

- `combat.reload` for `Doom`: skipped because classic Doom does not use reload timing in the same visible sense as the current mechanic boundary.
- `combat.melee_attack` for `Doom`: skipped because it was not needed to make the anchor useful and would add less discovery value than camera, health, keys, running, and area attacks.
- `ui_ux.minimap` for `Doom`: skipped because the classic automap does not cleanly match the persistent minimap boundary.
- `movement.crouch` and `movement.prone` for `Metal Gear Solid`: skipped to avoid title/version ambiguity and because the current low-count issue is better solved through AI/stealth/readability mechanics.
- `combat.stealth_kill` for `Metal Gear Solid`: skipped because the current boundary is clearer for later Metal Gear titles than for this exact title.
- `ui_ux.interaction_prompt` for `Metal Gear Solid`: skipped as too generic for this tiny pass.
- `economy.resource_conversion` for `Age of Empires II`: skipped because the existing mechanic is about controlled exchange/conversion, not general RTS gathering and spending.
- Multiplayer/team examples for `Age of Empires II`: skipped because mode context would need a more explicit note and a separate multiplayer/strategy review.

## Title Consistency Notes

- Used exact titles: `Doom`, `Metal Gear Solid`, and `Age of Empires II`.
- Did not merge `Metal Gear Solid` with `Metal Gear Solid V: The Phantom Pain`.
- Did not add aliases or browser-side title merging.

## Saturation Notes

- No saturated anchors were touched.
- No game was pushed above 6 mechanics.
- The pass changed only three underdeveloped anchors.

## Exact Low-Count Distribution After Enrichment

| Band | Games |
| --- | --- |
| Exactly 1 mechanic | 96 |
| Exactly 2 mechanics | 29 |
| Exactly 3 mechanics | 19 |
| Exactly 4 mechanics | 10 |
| 5+ mechanics | 38 |

Combined 2-4 mechanic games: 58.

## Known Limitations

- This is still a derived game-to-mechanics view, not a curated game database.
- Some low-count recognizable games intentionally remain low-count.
- Further enrichment should be driven by user feedback or a fresh audit, not by count targets alone.

## Recommendation

Stop enrichment before broader sharing. The exact low-count distribution is now visible, and three high-value underdeveloped anchors were improved without broad tagging or saturated-anchor inflation.
