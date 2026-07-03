# Game Anchor Enrichment Pass 3 v0.3

Date: 2026-07-03

## Purpose

This pass enriches a small, genre-balanced set of recognizable game anchors in the derived game-to-mechanics index. The goal is to make the Games view more useful for study and discovery while keeping `example_games` concise, factual, and based on visible player-facing behavior.

This is not a full game database, a citation system, or proof of exact implementation details.

## Reviewed Anchor Games

| Game | Before | After | Added mechanics |
| --- | ---: | ---: | --- |
| The Elder Scrolls V: Skyrim | 6 | 15 | `camera.first_person_camera`, `camera.third_person_camera`, `combat.block`, `combat.damage_over_time`, `combat.melee_attack`, `combat.ranged_attack`, `crafting.recipe_crafting`, `economy.shop`, `progression.skill_tree` |
| Resident Evil 4 | 5 | 14 | `camera.third_person_camera`, `combat.hit_stun`, `combat.melee_attack`, `combat.ranged_attack`, `economy.shop`, `horror.limited_visibility`, `horror.safe_room`, `progression.upgrade_shop`, `ui_ux.interaction_prompt` |
| Fortnite | 2 | 12 | `combat.area_of_effect_attack`, `combat.ranged_attack`, `combat.reload`, `movement.sprint`, `multiplayer.ping_system`, `traversal.gliding`, `ui_ux.damage_numbers`, `ui_ux.hit_marker`, `ui_ux.minimap`, `ui_ux.quest_marker` |
| Overwatch | 4 | 11 | `camera.first_person_camera`, `combat.area_of_effect_attack`, `combat.damage_over_time`, `combat.reload`, `multiplayer.ping_system`, `ui_ux.cooldown_indicator`, `ui_ux.hit_marker` |
| Hollow Knight | 6 | 12 | `combat.melee_attack`, `economy.shop`, `movement.dash`, `platforming.wall_slide`, `progression.upgrade_shop`, `survival.health` |
| Portal 2 | 5 | 11 | `camera.first_person_camera`, `multiplayer.online_coop`, `physics.physics_push_pull`, `puzzle.physics_weight_puzzle`, `puzzle.pressure_plate`, `ui_ux.interaction_prompt` |
| Super Mario Odyssey | 1 | 6 | `camera.smooth_follow_camera`, `camera.third_person_camera`, `platforming.ledge_climb`, `platforming.wall_jump`, `ui_ux.quest_marker` |

## Added Example Notes

### The Elder Scrolls V: Skyrim

- `camera.first_person_camera`: offers first-person camera framing for exploration and combat.
- `camera.third_person_camera`: offers third-person camera framing for exploration, traversal, and combat.
- `combat.block`: uses shield and weapon blocking to reduce incoming combat pressure.
- `combat.damage_over_time`: uses poison, burning, and lingering magic effects as visible delayed damage.
- `combat.melee_attack`: uses melee weapon attacks across first-person and third-person combat.
- `combat.ranged_attack`: uses bows, spells, and projectiles as visible ranged combat options.
- `crafting.recipe_crafting`: uses ingredient and material recipes for alchemy, smithing, and cooking.
- `economy.shop`: uses vendors for buying, selling, and restocking equipment and supplies.
- `progression.skill_tree`: uses perk trees tied to skill progression and build choices.

### Resident Evil 4

- `camera.third_person_camera`: uses an over-the-shoulder third-person camera for movement and ranged combat.
- `combat.hit_stun`: uses hit reactions and stagger states that open follow-up actions.
- `combat.melee_attack`: uses contextual melee attacks after enemy stagger opportunities.
- `combat.ranged_attack`: uses firearms as the primary ranged combat interaction.
- `economy.shop`: uses the merchant for buying, selling, and preparing equipment.
- `horror.limited_visibility`: uses dark interiors and constrained visibility to increase encounter tension.
- `horror.safe_room`: uses calmer save and merchant spaces as recovery and planning breaks.
- `progression.upgrade_shop`: uses merchant upgrades to improve weapons and equipment over time.
- `ui_ux.interaction_prompt`: uses contextual prompts for doors, pickups, ladders, and action commands.

### Fortnite

- `combat.area_of_effect_attack`: uses explosive and area attacks to pressure cover and grouped players.
- `combat.ranged_attack`: uses firearms and projectile weapons as core combat interactions.
- `combat.reload`: uses reload timing and magazine limits during ranged combat.
- `movement.sprint`: uses sprinting as a high-output traversal option during combat and rotation.
- `multiplayer.ping_system`: uses map and world pings for squad communication.
- `traversal.gliding`: uses glider deployment for descent and match-entry traversal.
- `ui_ux.damage_numbers`: uses damage numbers to show hit results, shield damage, and eliminations.
- `ui_ux.hit_marker`: uses hit confirmation feedback during ranged combat.
- `ui_ux.minimap`: uses a minimap for safe-zone, teammate, and nearby activity awareness.
- `ui_ux.quest_marker`: uses quest and map markers to guide objectives and points of interest.

### Overwatch

- `camera.first_person_camera`: uses first-person camera framing for hero movement, aiming, and ability use.
- `combat.area_of_effect_attack`: uses area abilities and explosives for team-fight pressure.
- `combat.damage_over_time`: uses lingering ability damage as visible team-fight pressure.
- `combat.reload`: uses reload timing for many ranged heroes and weapons.
- `multiplayer.ping_system`: uses contextual pings to communicate threats, locations, and team intent.
- `ui_ux.cooldown_indicator`: uses ability cooldown indicators to show hero action availability.
- `ui_ux.hit_marker`: uses hit confirmation feedback for successful weapon and ability impacts.

### Hollow Knight

- `combat.melee_attack`: uses close-range nail attacks as the main combat interaction.
- `economy.shop`: uses shops for maps, charms, keys, and traversal-related items.
- `movement.dash`: uses dash as a movement upgrade for combat spacing and traversal.
- `platforming.wall_slide`: uses wall sliding after a traversal upgrade to support wall-jump routes.
- `progression.upgrade_shop`: uses shop and upgrade services for persistent combat and traversal options.
- `survival.health`: uses health masks and recovery windows as a visible survival resource.

### Portal 2

- `camera.first_person_camera`: uses a first-person camera for spatial puzzle navigation and portal aiming.
- `multiplayer.online_coop`: uses an online co-op campaign with shared puzzle state and partner coordination.
- `physics.physics_push_pull`: uses carried and moved physical objects as part of puzzle setup.
- `puzzle.physics_weight_puzzle`: uses weighted cubes and object placement as repeated puzzle elements.
- `puzzle.pressure_plate`: uses floor buttons and cubes as core puzzle-state triggers.
- `ui_ux.interaction_prompt`: uses interaction prompts and contextual cues for puzzle objects and co-op actions.

### Super Mario Odyssey

- `camera.smooth_follow_camera`: uses smooth camera following and framing to support 3D platforming readability.
- `camera.third_person_camera`: uses a third-person camera for 3D platforming, exploration, and combat framing.
- `platforming.ledge_climb`: uses ledge grabs and climb-up recovery in 3D traversal spaces.
- `platforming.wall_jump`: uses wall jumps as a visible 3D platforming traversal move.
- `ui_ux.quest_marker`: uses map markers and destination hints to guide kingdom objectives.

## Skipped Candidates

- The Elder Scrolls V: Skyrim `ui_ux.minimap`: skipped because the current minimap entry fits persistent minimap/radar behavior better than Skyrim's compass and map presentation.
- Resident Evil 4 `ui_ux.quest_marker`: skipped because the safer visible study anchors are interaction prompts, inventory, saving, health, merchant, and combat feedback.
- Resident Evil 4 `ui_ux.damage_numbers`: skipped because the game does not expose damage numbers as a normal player-facing combat display.
- Fortnite `traversal.vehicle_mount`: skipped to keep this pass focused on core combat, map, traversal, and squad-communication examples.
- Fortnite `ui_ux.cooldown_indicator`: skipped because item and equipment cooldown behavior would need a narrower review before using the current cooldown-indicator entry.
- Fortnite `progression.battle_pass` and `multiplayer.online_competition`: skipped because those mechanic IDs do not currently exist.
- Overwatch `ui_ux.damage_numbers`: skipped because the normal player-facing feedback is better captured by hit markers and cooldown indicators.
- Overwatch `movement.dash`: skipped because dash-like behavior is hero-specific and would be a broader hero-ability mapping than needed for this pass.
- Overwatch `multiplayer.team_roles`: skipped because that mechanic ID does not currently exist.
- Hollow Knight `combat.damage_over_time`: skipped because hazards and status-like damage did not add a cleaner study anchor than health, dash, melee, and upgrade/shop examples.
- Portal 2 `physics.buoyancy`, `time.cooldown_time`, and `ui_ux.quest_marker`: skipped because they do not cleanly fit the visible puzzle responsibilities targeted in this pass.
- Portal 2 `physics.rigidbody_object`: skipped because that mechanic ID does not currently exist.
- Super Mario Odyssey `platforming.double_jump`: skipped because the current double-jump entry is closer to air-mobility upgrades than consecutive ground-jump chains.
- Super Mario Odyssey `platforming.coyote_time`, `platforming.jump_buffering`, `movement.dash`, and `traversal.gliding`: skipped because the current entries would need narrower review before using them as confident study anchors here.
- Super Mario Odyssey `progression.collectibles`: skipped because that mechanic ID does not currently exist.

## Title Consistency Notes

- Existing exact titles were reused: `The Elder Scrolls V: Skyrim`, `Resident Evil 4`, `Fortnite`, `Overwatch`, `Hollow Knight`, `Portal 2`, and `Super Mario Odyssey`.
- No aliases, edition merges, remaster merges, or manual title normalization rules were added.
- The generated game index still derives titles directly from mechanic-level `example_games`.

## Known Limitations

- This pass reviewed only seven anchor games.
- It does not claim these games contain only the listed mechanics.
- It does not prove exact implementation details.
- It does not add a separate `games/` database or self-reported tagging workflow.
- Some visible mechanics were skipped when the current dataset boundary was too broad, too narrow, missing, or mismatched.

## Recommended Next Anchor Batch

Good next candidates for careful enrichment:

- Minecraft
- Dark Souls
- Apex Legends
- Subnautica
- Hades
- Left 4 Dead
- Diablo III
