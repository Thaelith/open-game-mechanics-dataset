# Game Anchor Enrichment Pass 2 v0.3

Date: 2026-07-03

## Purpose

This pass enriches a small set of high-value recognizable game anchors in the derived game-to-mechanics index. The goal is to make the Games view more useful for study and discovery while keeping `example_games` concise, factual, and based on visible player-facing behavior.

This is not a full game database, a citation system, or proof of exact implementation details.

## Reviewed Anchor Games

| Game | Before | After | Added mechanics |
| --- | ---: | ---: | --- |
| Grand Theft Auto V | 3 | 11 | `camera.third_person_camera`, `combat.ranged_attack`, `combat.reload`, `physics.ragdoll`, `ui_ux.quest_marker`, `vehicles.drifting`, `vehicles.vehicle_acceleration`, `vehicles.vehicle_braking` |
| The Legend of Zelda: Breath of the Wild | 16 | 18 | `physics.buoyancy`, `ui_ux.quest_marker` |
| Celeste | 14 | 15 | `platforming.wall_jump` |
| The Witcher 3: Wild Hunt | 2 | 13 | `camera.third_person_camera`, `combat.block`, `combat.damage_over_time`, `combat.melee_attack`, `combat.ranged_attack`, `crafting.recipe_crafting`, `economy.shop`, `narrative.branching_dialogue`, `progression.experience_points`, `progression.skill_tree`, `ui_ux.minimap` |
| Gran Turismo 7 | 1 | 8 | `camera.first_person_camera`, `camera.third_person_camera`, `economy.shop`, `vehicles.drifting`, `vehicles.fuel`, `vehicles.suspension_physics`, `vehicles.vehicle_acceleration` |
| Need for Speed: Hot Pursuit | 1 | 6 | `camera.third_person_camera`, `vehicles.vehicle_acceleration`, `vehicles.vehicle_boost`, `vehicles.vehicle_braking`, `vehicles.vehicle_damage` |

## Added Example Notes

### Grand Theft Auto V

- `camera.third_person_camera`: uses a third-person camera for on-foot movement, driving, and combat framing.
- `combat.ranged_attack`: uses firearms and other ranged weapons as common combat interactions.
- `combat.reload`: uses reload timing and ammunition pressure in firefights.
- `physics.ragdoll`: shows ragdoll-like body reactions during impacts and collisions.
- `ui_ux.quest_marker`: uses mission markers and map destinations for open-world activities.
- `vehicles.drifting`: uses handbrake turns and controlled slides during driving and chases.
- `vehicles.vehicle_acceleration`: uses vehicle acceleration and traction feel across city driving and races.
- `vehicles.vehicle_braking`: uses braking and handbrake behavior during street driving, races, and pursuits.

### The Legend of Zelda: Breath of the Wild

- `physics.buoyancy`: uses floating objects and water interactions in environmental traversal and puzzles.
- `ui_ux.quest_marker`: uses quest markers and map pins to guide selected objectives and destinations.

### Celeste

- `platforming.wall_jump`: uses wall jumps and wall contact as part of precision climbing routes.

### The Witcher 3: Wild Hunt

- `camera.third_person_camera`: uses a third-person camera for exploration, horseback travel, and combat framing.
- `combat.block`: uses guarding and blocking during sword combat.
- `combat.damage_over_time`: uses burning and poison-like damage over time effects in combat.
- `combat.melee_attack`: uses sword melee attacks as a primary combat interaction.
- `combat.ranged_attack`: uses crossbow shots as a visible ranged combat option.
- `crafting.recipe_crafting`: uses recipes to craft alchemy items, gear, and consumables from gathered materials.
- `economy.shop`: uses vendors for buying, selling, and repairing equipment and supplies.
- `narrative.branching_dialogue`: uses dialogue choices that can change quest and story outcomes.
- `progression.experience_points`: uses XP rewards from quests and encounters toward level progression.
- `progression.skill_tree`: uses skill investment menus to shape Geralt's combat and utility abilities.
- `ui_ux.minimap`: uses minimap routing and nearby objective context during exploration.

### Gran Turismo 7

- `camera.first_person_camera`: uses cockpit and driver-view camera options for racing.
- `camera.third_person_camera`: uses chase-camera views for vehicle framing during races.
- `economy.shop`: uses dealership and parts purchase screens as vehicle acquisition transactions.
- `vehicles.drifting`: includes drift-focused handling and challenges as a visible driving skill.
- `vehicles.fuel`: uses fuel consumption in race settings and pit strategy contexts.
- `vehicles.suspension_physics`: uses suspension behavior and tuning as part of car handling.
- `vehicles.vehicle_acceleration`: uses vehicle acceleration and throttle control as major racing skill factors.

### Need for Speed: Hot Pursuit

- `camera.third_person_camera`: uses chase-camera framing for high-speed pursuit driving.
- `vehicles.vehicle_acceleration`: uses strong arcade acceleration for racing, pursuit, and escape pacing.
- `vehicles.vehicle_boost`: uses nitrous-style boosts for short bursts during races and pursuits.
- `vehicles.vehicle_braking`: uses braking and handbrake turns for cornering during races and pursuits.
- `vehicles.vehicle_damage`: shows visible vehicle damage and takedown pressure during pursuits.

## Skipped Candidates

- Grand Theft Auto V `multiplayer.online_coop`: skipped because GTA Online-style modes are too broad for a clean co-op example in this pass.
- Grand Theft Auto V `economy.shop` and `progression.achievement_system`: skipped as lower-value broad associations once core navigation, vehicle, combat, and camera examples were added.
- The Legend of Zelda: Breath of the Wild extra camera/progression examples: skipped because the anchor was already strong and the added quest-marker and buoyancy references were the clearest missing study links.
- Celeste `platforming.double_jump`: skipped because the current mechanic boundary does not cleanly match Celeste's dash and stamina/refill behavior.
- Celeste `ui_ux.checkpoint_notification`: skipped because the current entry is about explicit save/progress notification, not simply room respawn behavior.
- Celeste `progression.achievement_system`: skipped because it would be a broad platform/meta association rather than a mechanic study anchor.
- The Witcher 3: Wild Hunt `traversal.vehicle_mount`: skipped because the current entry is framed around vehicle seats and authority transfer; horse mounting needs separate boundary review.
- The Witcher 3: Wild Hunt `combat.reload`: skipped because it does not fit the visible combat loop.
- The Witcher 3: Wild Hunt `combat.parry`: skipped because `combat.block` captured the clearer visible defensive behavior for this pass.
- Gran Turismo 7 `vehicles.vehicle_damage`: skipped because the current vehicle damage entry emphasizes durability/repair consequences more strongly than the safest visible GT7 study link.
- Gran Turismo 7 `ui_ux.cooldown_indicator`: skipped because it would not fit the current cooldown indicator boundary.
- Need for Speed: Hot Pursuit `combat.ranged_attack`: skipped because pursuit equipment does not cleanly map to the current ranged-attack mechanic entry.
- Need for Speed: Hot Pursuit `ui_ux.cooldown_indicator`: skipped because equipment cooldowns would need a more specific UI/equipment review before adding.

## Title Consistency Notes

- Existing exact titles were reused: `Grand Theft Auto V`, `The Legend of Zelda: Breath of the Wild`, `Celeste`, `The Witcher 3: Wild Hunt`, `Gran Turismo 7`, and `Need for Speed: Hot Pursuit`.
- No aliases, edition merges, or manual title normalization rules were added.
- The generated game index still derives titles directly from mechanic-level `example_games`.

## Known Limitations

- This pass reviewed only six anchor games.
- It does not claim these games contain only the listed mechanics.
- It does not prove exact implementation details.
- It does not add a separate `games/` database or self-reported tagging workflow.
- Some visible mechanics were skipped when the current dataset boundary was too broad, too narrow, or mismatched.

## Recommended Next Anchor Batch

Good next candidates for careful enrichment:

- The Elder Scrolls V: Skyrim
- Resident Evil 4
- Fortnite
- Overwatch
- Hollow Knight
- Portal 2
- Super Mario Odyssey
