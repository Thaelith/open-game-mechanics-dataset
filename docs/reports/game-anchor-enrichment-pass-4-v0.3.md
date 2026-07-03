# Game Anchor Enrichment Pass 4 v0.3

Date: 2026-07-03

## Purpose

This pass deepens a small set of mature and recognizable game anchors in the derived game-to-mechanics index. The goal is to improve the Games view for study and discovery without inflating anchors with weak or speculative associations.

This is not a full game database, a citation system, or proof of exact implementation details.

## Saturation Rule

- Games with 15+ mechanics were treated as audit/deepening targets with only 0-3 very clear additions.
- Games with 8-14 mechanics received up to 3-6 clear additions.
- Games with fewer than 8 mechanics received up to 5-8 clear additions.
- No target game was forced to 20 mechanics.

## Reviewed Anchor Games

| Game | Before | After | Added mechanics | Saturation decision |
| --- | ---: | ---: | --- | --- |
| Minecraft | 14 | 17 | `movement.swimming`, `survival.health`, `survival.inventory_limit` | Near-saturated; added only three clear survival/traversal examples. |
| Dark Souls | 9 | 15 | `camera.third_person_camera`, `combat.damage_over_time`, `combat.melee_attack`, `progression.experience_points`, `progression.upgrade_shop`, `survival.health` | Mid-range; added six core combat/progression examples. |
| Apex Legends | 6 | 14 | `camera.first_person_camera`, `combat.area_of_effect_attack`, `combat.ranged_attack`, `combat.reload`, `movement.sprint`, `ui_ux.cooldown_indicator`, `ui_ux.damage_numbers`, `ui_ux.minimap` | Sparse; added eight visible combat, movement, and HUD examples. |
| Subnautica | 6 | 12 | `camera.first_person_camera`, `survival.day_night_cycle`, `survival.health`, `survival.inventory_limit`, `ui_ux.interaction_prompt`, `ui_ux.quest_marker` | Sparse; added six exploration/survival/UI examples. |
| Hades | 18 | 19 | `combat.ranged_attack` | Saturated; added one clear missing combat example. |
| Left 4 Dead | 4 | 11 | `camera.first_person_camera`, `combat.area_of_effect_attack`, `combat.ranged_attack`, `combat.reload`, `multiplayer.friendly_fire`, `survival.health`, `ui_ux.interaction_prompt` | Sparse; added seven co-op survival combat examples. |
| Diablo III | 4 | 12 | `camera.top_down_camera`, `combat.area_of_effect_attack`, `combat.damage_over_time`, `combat.melee_attack`, `combat.ranged_attack`, `economy.shop`, `ui_ux.cooldown_indicator`, `ui_ux.quest_marker` | Sparse; added eight combat, camera, economy, and UI examples. |

## Added Example Notes

### Minecraft

- `movement.swimming`: uses swimming and underwater movement with visible breath pressure.
- `survival.health`: uses health hearts, damage, and recovery as visible survival state.
- `survival.inventory_limit`: uses limited inventory slots to constrain gathering, crafting, and travel.

### Dark Souls

- `camera.third_person_camera`: uses third-person camera framing for traversal, lock-on combat, and boss encounters.
- `combat.damage_over_time`: uses poison and toxic states as visible delayed damage pressure.
- `combat.melee_attack`: uses melee weapon attacks with timing, stamina pressure, and recovery windows.
- `progression.experience_points`: uses earned souls as a visible progression resource for leveling decisions.
- `progression.upgrade_shop`: uses weapon upgrade services to convert resources into stronger equipment.
- `survival.health`: uses health state, healing windows, and death recovery pressure in combat.

### Apex Legends

- `camera.first_person_camera`: uses first-person camera framing for movement, aiming, and combat readability.
- `combat.area_of_effect_attack`: uses grenades and area abilities to pressure cover and squads.
- `combat.ranged_attack`: uses firearms and abilities as core ranged combat interactions.
- `combat.reload`: uses reload timing and magazine limits during squad firefights.
- `movement.sprint`: uses sprinting as a high-output traversal option during squad rotations.
- `ui_ux.cooldown_indicator`: uses ability cooldown indicators to show tactical and ultimate availability.
- `ui_ux.damage_numbers`: uses damage numbers to show shield and health damage during firefights.
- `ui_ux.minimap`: uses a minimap for ring, squad, and nearby navigation awareness.

### Subnautica

- `camera.first_person_camera`: uses a first-person camera for underwater exploration and close object interaction.
- `survival.day_night_cycle`: uses day and night lighting changes during underwater exploration.
- `survival.health`: uses health loss and recovery alongside oxygen, food, water, and hazards.
- `survival.inventory_limit`: uses limited inventory space to constrain long exploration and resource trips.
- `ui_ux.interaction_prompt`: uses contextual prompts for scanning, collecting, entering vehicles, and using objects.
- `ui_ux.quest_marker`: uses beacon and signal markers to guide exploration targets.

### Hades

- `combat.ranged_attack`: uses ranged weapons and cast-like attacks as visible combat options.

### Left 4 Dead

- `camera.first_person_camera`: uses first-person camera framing for co-op survival combat and navigation.
- `combat.area_of_effect_attack`: uses explosives and fire to control hordes and revive routes.
- `combat.ranged_attack`: uses firearms as the primary ranged combat interaction against infected hordes.
- `combat.reload`: uses reload timing and ammunition pressure during horde encounters.
- `multiplayer.friendly_fire`: uses friendly fire rules to make co-op positioning and firing lanes matter.
- `survival.health`: uses health, incapacitation, and recovery pressure during co-op survival encounters.
- `ui_ux.interaction_prompt`: uses contextual prompts for revives, pickups, doors, and objective interactions.

### Diablo III

- `camera.top_down_camera`: uses top-down camera framing for combat readability and enemy positioning.
- `combat.area_of_effect_attack`: uses area attacks and ground effects during dense combat encounters.
- `combat.damage_over_time`: uses poison, burning, and other lingering effects as visible combat pressure.
- `combat.melee_attack`: uses close-range class attacks as visible combat options.
- `combat.ranged_attack`: uses ranged class skills and projectiles as visible combat options.
- `economy.shop`: uses vendors for buying, selling, repairing, and service transactions.
- `ui_ux.cooldown_indicator`: uses action bar cooldown indicators for combat skills.
- `ui_ux.quest_marker`: uses objective markers and map guidance for quests and dungeon goals.

## Skipped Candidates

- Minecraft `camera.third_person_camera`: skipped because the anchor was already near-saturated and survival/traversal examples were stronger study links.
- Minecraft `physics.breakable_object`: skipped because the current entry fits breakable props better than block mining and world editing.
- Minecraft `ui_ux.minimap`: skipped because vanilla map items do not cleanly match the current minimap/radar boundary.
- Dark Souls `economy.shop`: skipped because progression and upgrade services were stronger additions for this pass.
- Dark Souls `movement.run`: skipped because stamina movement and dodge/lock-on combat already capture the clearer locomotion pressure.
- Dark Souls `ui_ux.checkpoint_notification`: skipped because bonfire behavior would need a narrower checkpoint/save-feedback review.
- Apex Legends `combat.hit_stun`: skipped because hit confirmation, damage numbers, and ranged combat were clearer player-facing anchors.
- Apex Legends `multiplayer.online_competition`: skipped because that mechanic ID does not currently exist.
- Subnautica `survival.temperature`: skipped because the current target was the original anchor and temperature pressure is not as broadly visible as oxygen, water, health, inventory, and day/night.
- Subnautica `vehicles.vehicle_mount`: skipped because vehicle entry and piloting need a narrower review against the current vehicle-mount boundary.
- Hades `ui_ux.damage_numbers`, `combat.damage_over_time`, and additional progression examples: skipped because Hades was already saturated and only one very clear missing combat example was added.
- Left 4 Dead `combat.melee_attack`: skipped because the safest study anchors were firearms, reload pressure, co-op recovery, and area control.
- Left 4 Dead `horror.horde_pressure`: skipped because that mechanic ID does not currently exist.
- Left 4 Dead `horror.sound_lure`: skipped because the current entry is better suited to explicit sound-lure tools than broad horde noise pressure.
- Diablo III `progression.experience_points` and `progression.level_up`: skipped to keep the anchor within the saturation rule after adding camera, combat, UI, and economy examples.
- Diablo III `economy.loot_table`: skipped because the current existing example uses `Diablo`; title consistency and alias handling should be reviewed before adding a second closely related title string.
- Diablo III `multiplayer.online_coop`: skipped because combat, UI, camera, and economy examples were clearer additions for this pass.

## Title Consistency Notes

- Existing exact titles were reused: `Minecraft`, `Dark Souls`, `Apex Legends`, `Subnautica`, `Hades`, `Left 4 Dead`, and `Diablo III`.
- No aliases, edition merges, remaster merges, or manual title normalization rules were added.
- The `Diablo` vs `Diablo III` title distinction remains a future title-consistency review item.
- The generated game index still derives titles directly from mechanic-level `example_games`.

## Known Limitations

- This pass reviewed only seven anchor games.
- It does not claim these games contain only the listed mechanics.
- It does not prove exact implementation details.
- It does not add a separate `games/` database or self-reported tagging workflow.
- Some visible mechanics were skipped when the current dataset boundary was too broad, too narrow, missing, title-sensitive, or mismatched.

## Recommended Next Anchor Batch

Good next candidates for careful enrichment:

- Half-Life 2
- World of Warcraft
- The Legend of Zelda: Ocarina of Time
- Slay the Spire
- Spelunky
- Alien: Isolation
- Dead Cells
