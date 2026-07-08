# Game Anchor Quality Audit v0.3

Date: 2026-07-08

## Purpose

This audit reviews the accumulated game-anchor enrichment work before adding more `example_games`. It checks whether the derived game-to-mechanics index is becoming more useful without drifting into weak tagging, title inconsistency, or inflated game associations.

This is a review artifact only. It does not add or remove examples, change mechanic JSON, change the schema, change status, change `source_confidence`, or create a separate game database.

## Method

The audit used:

- `docs/reports/game-examples-index-report-v0.3.md`
- `docs/reports/game-anchor-enrichment-pass-1-v0.3.md`
- `docs/reports/game-anchor-enrichment-pass-2-v0.3.md`
- `docs/reports/game-anchor-enrichment-pass-3-v0.3.md`
- `docs/reports/game-anchor-enrichment-pass-4-v0.3.md`
- `docs/reports/game-anchor-enrichment-pass-5-v0.3.md`
- `tools/game_examples_index.py`
- `tools/game_anchor_audit.py`
- mechanic-level `example_games`

The helper tool checks quantitative signals such as saturated anchors, possible title clusters, category concentration, broad mechanics with many game examples, and risky note terms. Manual review then checks whether those signals are likely to matter for public use.

## Current Summary

| Metric | Current value |
| --- | ---: |
| Total mechanics | 223 |
| Total example-game references | 631 |
| Unique game titles | 194 |
| Games with 1 mechanic | 101 |
| Games with 2-4 mechanics | 62 |
| Games with 5+ mechanics | 31 |
| Max mechanics on one game | 19 |

The index is now more useful than the initial sparse state, but it is still a lightweight study/discovery layer. It should not be presented as a complete game database, a citation system, or proof of exact implementation details.

## What Looks Strong

Several anchors are now useful study entry points without depending on proprietary details:

| Game | Mechanic count | Assessment |
| --- | ---: | --- |
| Hades | 19 | Strong action roguelike anchor across combat, run progression, economy, UI, and camera. Treat as saturated. |
| The Legend of Zelda: Breath of the Wild | 18 | Strong open-world systems anchor across stamina, traversal, weather, physics, UI, and time. Treat as saturated. |
| Minecraft | 17 | Strong survival/crafting/procedural anchor with clear visible systems. Treat as saturated. |
| Celeste | 15 | Strong precision platforming and accessibility anchor. Treat as saturated. |
| Dark Souls | 15 | Strong combat/stamina/progression anchor. Further additions should be rare and very clear. |
| The Elder Scrolls V: Skyrim | 15 | Strong RPG anchor, but version/mod/platform assumptions should be avoided. |
| Half-Life 2 | 14 | Strong physics/FPS anchor after Pass 5, with clear first-person combat and physics examples. |
| Resident Evil 4 | 14 | Strong survival-action anchor across reload, inventory, merchant, health, and interaction pressure. |

## Potential Quality Risks

The audit found no example note terms such as "probably", "proprietary", or "exact implementation" in the derived index output. The main quality risks are subtler:

| Area | Risk | Recommended handling |
| --- | --- | --- |
| Broad combat examples | `combat.ranged_attack`, `combat.melee_attack`, and `combat.area_of_effect_attack` are used across many games. | Keep notes specific to visible behavior. Avoid adding more broad combat examples unless they teach a distinct study angle. |
| Broad UI examples | `ui_ux.quest_marker`, `ui_ux.interaction_prompt`, and `ui_ux.minimap` can become generic UI tags. | Review whether each note identifies source state, target, or player-facing feedback rather than just "has UI". |
| Broad economy examples | `economy.shop` can cover vendors, repair services, car dealerships, merchants, and run shops. | Consider future variants or clearer note conventions before adding many more shop examples. |
| Camera examples | `camera.first_person_camera`, `camera.third_person_camera`, and `camera.smooth_follow_camera` are useful but broad. | Use them as study anchors only when camera framing affects play, readability, or control assumptions. |
| Hybrid resources | Examples such as souls-style progression/currency can fit `progression.experience_points`, but they are hybrid systems. | Keep notes explicit that the visible behavior is progression resource spending or leveling, not a claim about internal implementation. |
| Objective markers | Some games use beacons, trackers, authored route guidance, or map pins rather than strict quest markers. | Review borderline `ui_ux.quest_marker` examples before adding more. |

## Specific Mapping Review Candidates

These are not confirmed errors. They are candidates for later note review or future taxonomy refinement.

| Example | Current concern | Suggested future action |
| --- | --- | --- |
| `camera.smooth_follow_camera` -> `Dead Cells` | The note describes side-view camera framing. The current mechanic may be the closest available anchor, but a side-view camera boundary may be clearer later. | Review if a future camera taxonomy pass should add or reframe side-view camera coverage. |
| `ui_ux.quest_marker` -> `Alien: Isolation` | Objective guidance and tracker cues may be broader than quest-marker semantics. | Check whether the note should use objective guidance wording or wait for a narrower objective tracker mechanic. |
| `ui_ux.quest_marker` -> `Subnautica` | Beacon and signal markers may overlap with waypoint or objective marker semantics. | Keep as a study reference for now, but review if waypoint/objective marker boundaries split later. |
| `physics.breakable_object` -> `Spelunky` | The note mentions breakable pots and destructible level objects. Terrain destruction may be broader than breakable-object semantics. | Consider narrowing the note to breakable pots/crates or adding a future destructible-terrain boundary. |
| `multiplayer.online_coop` -> `World of Warcraft` | MMO group play is visible co-operative online play, but it is broader than a small co-op campaign model. | Keep conservative wording and avoid treating it as the same shape as local co-op or fixed-party campaign co-op. |
| `progression.experience_points` -> `Dark Souls` | Souls are a visible leveling resource and currency-like loss/recovery system. | Keep the note explicit about visible leveling decisions; review if hybrid currency/progression taxonomy expands. |
| `economy.shop` -> `Gran Turismo 7` | Vehicle purchase and upgrade screens fit broad shop behavior, but the mechanic can become too generic. | Avoid adding more economy examples unless the transaction behavior is the visible study point. |
| `ui_ux.cooldown_indicator` -> `Hades` | Some action readiness cues may not be classic cooldown UI. | Review before adding more cooldown-indicator examples to games with ambiguous availability feedback. |

## Title Consistency Issues

The index currently groups exact title strings only. That is intentional for now, but the audit found title clusters that need policy before more enrichment:

| Cluster | Examples | Risk |
| --- | --- | --- |
| Specific subtitle vs shorter title | `The Witcher 3`, `The Witcher 3: Wild Hunt` | Same game may split into separate anchors. |
| Series title vs numbered entry | `Diablo`, `Diablo III` | Broad series references can compete with specific game anchors. |
| Abbreviated sequel title | `Metal Gear Solid V`, `Metal Gear Solid V: The Phantom Pain` | Same game may be represented under two titles. |
| Edition split | `Mario Kart 8`, `Mario Kart 8 Deluxe` | Different releases may or may not deserve separate anchors. |
| Numbered series anchors | `Grand Theft Auto IV`, `Grand Theft Auto V`; `Portal`, `Portal 2`; `Resident Evil 2`, `Resident Evil 4`, `Resident Evil 7: Biohazard` | These are probably intentionally separate, but the browser should not imply a merged franchise database. |
| Broad franchise title | `The Legend of Zelda`, multiple specific Zelda games | Broad franchise examples should be avoided unless the mechanic note truly applies to the named entry. |

Recommended next step before more enrichment: define title policy for exact game title, subtitle, edition, remake/remaster, franchise-level title, and expansion-specific title. Do not add alias merging until the policy is written.

## Overused Or Saturated Anchors

Games with 15 or more mechanics should be treated as saturated:

| Game | Count | Decision |
| --- | ---: | --- |
| Hades | 19 | No more additions unless a very clear missing study mechanic appears. |
| The Legend of Zelda: Breath of the Wild | 18 | No more additions until title and boundary policy is reviewed. |
| Minecraft | 17 | No more additions unless a missing mechanic is more useful than an existing example. |
| Celeste | 15 | Keep stable as a focused platforming/accessibility anchor. |
| Dark Souls | 15 | Keep stable; review hybrid progression/currency wording before adding more. |
| The Elder Scrolls V: Skyrim | 15 | Keep stable; avoid version or mod-dependent assumptions. |

Near-saturated games with 12-14 mechanics should receive only audit-driven additions:

- Apex Legends
- Half-Life 2
- Resident Evil 4
- World of Warcraft
- Alien: Isolation
- Spelunky
- The Legend of Zelda: Ocarina of Time
- The Witcher 3: Wild Hunt
- Dead Cells
- Diablo III
- Fortnite
- Hollow Knight
- Subnautica

## Underdeveloped But Promising Anchors

The index still has 101 one-mechanic games and 62 games with 2-4 mechanics. That is not automatically bad: a one-mechanic game can still be a useful study reference. Future enrichment should prioritize recognizable anchors only when several existing mechanics clearly fit.

Potential future candidates after title policy and mapping review:

| Game | Current count band | Reason to consider later |
| --- | --- | --- |
| Super Metroid | 1 mechanic | Recognizable exploration/platforming anchor if existing mechanics fit clearly. |
| Terraria | 2-4 mechanics | Could support crafting, survival, procedural, and exploration examples if notes stay visible-behavior based. |
| Doom | 1 mechanic | Recognizable FPS anchor, but avoid vague "has shooting" inflation. |
| Metal Gear Solid | 1 mechanic | Strong stealth anchor, but title consistency with MGS V must be handled first. |
| Dishonored | 2-4 mechanics | Strong stealth/traversal/combat candidate if current mechanics match precisely. |
| Stardew Valley | 2-4 mechanics | Strong economy/crafting/social/planning candidate if existing boundaries fit. |
| The Binding of Isaac | 2-4 mechanics | Strong roguelike anchor, but avoid duplicating Hades/Slay the Spire examples without a distinct study purpose. |

## Category Imbalance Notes

Some categories are naturally concentrated because the dataset has few entries in that category, but the concentration should be watched:

- Strategy has 8 references across 4 games; top three games account for most examples.
- Roguelike has useful anchors, but Slay the Spire, Hades, and Dead Cells dominate.
- Platforming is heavily represented by Celeste and Hollow Knight.
- Horror is led by Alien: Isolation and Amnesia examples.
- UI/UX has broad coverage, but the broadest widgets risk becoming generic tags.

This does not require immediate data changes. It should inform future anchor selection and prevent the Games view from becoming a list of a few overused games.

## What Belongs In A Future Games Layer

The current `example_games` field is still mechanic-local and lightweight. The following concerns probably belong in a future curated `games/` or `game_tags/` layer rather than in more mechanic JSON fields:

- Title aliases and canonical display titles.
- Release year, edition, remake, remaster, or expansion distinctions.
- Platform/version caveats.
- Curated per-game mechanic profiles.
- Confidence/reviewer metadata for game tags.
- Game-to-game similarity based on curated tags rather than only mechanic examples.

Do not add those fields to the mechanic schema during v0.3 preparation unless a separate schema proposal is accepted.

## Recommended Fixes Before More Enrichment

1. Define title consistency policy for exact titles, subtitles, editions, remakes/remasters, and franchise-level names.
2. Review the specific mapping candidates listed above and decide whether any notes should be narrowed.
3. Add a lightweight rule that saturated anchors should not receive more examples unless a maintainer records why the new example is more useful than existing anchors.
4. Review broad mechanics with many game examples, especially `combat.ranged_attack`, `combat.melee_attack`, `ui_ux.quest_marker`, `economy.shop`, and camera entries.
5. Keep future enrichment batches smaller and more audit-driven, with explicit skipped-candidate notes.

## Go/No-Go Decision

Go for public use as a study/discovery aid.

No-go for another broad enrichment pass until title consistency and the listed mapping review candidates are addressed. The current Games view is useful enough to demonstrate the direction, but more volume without policy would increase noise.

Recommended next work: create a title consistency and game-anchor policy note, then run a small mapping cleanup pass for the specific candidates above. After that, pick one or two underdeveloped anchors for conservative enrichment.

## No-Change Confirmation

- No examples were added.
- No examples were removed.
- No mechanic JSON was changed.
- No schema fields were added.
- No status or `source_confidence` values were changed.
- No site UI or Mixer logic was changed.
