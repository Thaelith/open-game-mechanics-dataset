# Dataset Quality Report v0.1

This advisory report summarizes dataset quality signals for maintainers. Warning counts are discovery signals, not CI failures.

## Summary

| Metric | Value |
| --- | --- |
| Generated at | 2026-06-29T10:29:15+00:00 |
| Schema version | 0.1.0 |
| Total mechanics | 223 |
| Total categories | 26 |

### Mechanics by Category

| Category | Mechanics |
| --- | --- |
| combat | 19 |
| movement | 12 |
| ui_ux | 12 |
| ai | 11 |
| physics | 11 |
| progression | 11 |
| traversal | 11 |
| camera | 10 |
| economy | 10 |
| multiplayer | 10 |
| puzzle | 10 |
| survival | 10 |
| platforming | 9 |
| procedural_generation | 9 |
| roguelike | 9 |
| horror | 8 |
| vehicles | 8 |
| time | 7 |
| stealth | 6 |
| accessibility | 5 |
| narrative | 5 |
| crafting | 4 |
| meta | 4 |
| rhythm | 4 |
| simulation | 4 |
| strategy | 4 |

## Generic Lint Summary

| Metric | Value |
| --- | --- |
| Total advisory warnings | 1067 |

### Warning Count by Category

| Category | Warnings |
| --- | --- |
| physics | 110 |
| puzzle | 81 |
| multiplayer | 80 |
| survival | 80 |
| time | 77 |
| movement | 70 |
| roguelike | 64 |
| vehicles | 64 |
| horror | 56 |
| traversal | 48 |
| crafting | 36 |
| stealth | 36 |
| accessibility | 28 |
| meta | 28 |
| narrative | 28 |
| rhythm | 28 |
| simulation | 28 |
| strategy | 28 |
| camera | 26 |
| ui_ux | 24 |
| platforming | 21 |
| combat | 15 |
| economy | 8 |
| procedural_generation | 3 |
| ai | 0 |
| progression | 0 |

### Top 20 Mechanics by Warning Count

| Mechanic | Warnings |
| --- | --- |
| combat.invincibility_frames | 11 |
| physics.breakable_object | 11 |
| physics.buoyancy | 11 |
| physics.destructible_environment | 11 |
| physics.gravity | 11 |
| physics.low_gravity_zone | 11 |
| physics.moving_platform | 11 |
| physics.pendulum_swing | 11 |
| physics.physics_push_pull | 11 |
| physics.ragdoll | 11 |
| physics.wind_force | 11 |
| time.cooldown_time | 11 |
| time.day_night_schedule | 11 |
| time.rhythm_timing | 11 |
| time.slow_motion | 11 |
| time.time_freeze | 11 |
| time.time_rewind | 11 |
| time.timed_challenge | 11 |
| traversal.jetpack | 11 |
| traversal.ladder_climb | 11 |

### Top Repeated Weak or Generic Terms

| Term | Count |
| --- | --- |
| clear player promise | 122 |
| engine-agnostic state first | 122 |
| high-priority state | 122 |
| predictable result | 122 |
| readable trigger | 122 |
| scene transition, pause, respawn | 122 |
| strong enough to justify attention | 122 |
| time | 66 |
| speed | 45 |
| force | 30 |
| amount | 15 |
| value | 15 |
| feedback | 14 |
| cooldown | 13 |
| duration | 11 |
| range | 4 |

## Field Completeness

| Check | Count |
| --- | --- |
| Mechanics with empty example_games | 117 |
| Mechanics with empty related_mechanics | 0 |
| Mechanics with empty combines_well_with | 0 |
| Mechanics with fewer than 3 parameters | 0 |
| Mechanics with fewer than 2 edge cases | 0 |
| Mechanics with fewer than 2 common bugs | 0 |
| Mechanics with fewer than 2 balancing notes | 0 |
| Mechanics with fewer than 1 accessibility note | 0 |

### Missing Implementation Notes by Engine

| Engine | Missing or Empty |
| --- | --- |
| Unity | 0 |
| Godot | 0 |
| Unreal | 0 |
| Web | 0 |

## Category Quality Table

| Category | Mechanics | Generic Warnings | Avg Warnings | Missing Examples | Weak Impl Notes | Low Params | Low Edge Cases | Low Bugs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| time | 7 | 77 | 11.00 | 6 | 7 | 0 | 0 | 0 |
| physics | 11 | 110 | 10.00 | 9 | 10 | 0 | 0 | 0 |
| crafting | 4 | 36 | 9.00 | 4 | 4 | 0 | 0 | 0 |
| puzzle | 10 | 81 | 8.10 | 9 | 9 | 0 | 0 | 0 |
| multiplayer | 10 | 80 | 8.00 | 9 | 10 | 0 | 0 | 0 |
| survival | 10 | 80 | 8.00 | 9 | 10 | 0 | 0 | 0 |
| vehicles | 8 | 64 | 8.00 | 7 | 8 | 0 | 0 | 0 |
| roguelike | 9 | 64 | 7.11 | 7 | 8 | 0 | 0 | 0 |
| horror | 8 | 56 | 7.00 | 7 | 8 | 0 | 0 | 0 |
| meta | 4 | 28 | 7.00 | 4 | 4 | 0 | 0 | 0 |
| rhythm | 4 | 28 | 7.00 | 3 | 4 | 0 | 0 | 0 |
| simulation | 4 | 28 | 7.00 | 3 | 4 | 0 | 0 | 0 |
| strategy | 4 | 28 | 7.00 | 3 | 4 | 0 | 0 | 0 |
| stealth | 6 | 36 | 6.00 | 4 | 4 | 0 | 0 | 0 |
| movement | 12 | 70 | 5.83 | 10 | 7 | 0 | 0 | 0 |
| accessibility | 5 | 28 | 5.60 | 4 | 4 | 0 | 0 | 0 |
| narrative | 5 | 28 | 5.60 | 4 | 4 | 0 | 0 | 0 |
| traversal | 11 | 48 | 4.36 | 4 | 4 | 0 | 0 | 0 |
| camera | 10 | 26 | 2.60 | 3 | 3 | 0 | 0 | 0 |
| platforming | 9 | 21 | 2.33 | 4 | 3 | 0 | 0 | 0 |
| ui_ux | 12 | 24 | 2.00 | 2 | 2 | 0 | 0 | 0 |
| economy | 10 | 8 | 0.80 | 0 | 0 | 0 | 0 | 0 |
| combat | 19 | 15 | 0.79 | 2 | 1 | 0 | 0 | 0 |
| procedural_generation | 9 | 3 | 0.33 | 0 | 0 | 0 | 0 | 0 |
| ai | 11 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| progression | 11 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |

## Subcategory Distribution

### Generic Subcategory Flags

| Category | Subcategory | Mechanics |
| --- | --- | --- |
| survival | survival | 10 |
| economy | economy | 9 |
| progression | progression | 9 |
| horror | horror | 8 |
| roguelike | roguelike | 8 |
| vehicles | vehicles | 8 |
| time | time | 7 |
| accessibility | accessibility | 4 |
| crafting | crafting | 4 |
| meta | meta | 4 |
| narrative | narrative | 4 |
| rhythm | rhythm | 4 |
| simulation | simulation | 4 |
| stealth | stealth | 4 |
| strategy | strategy | 4 |
| ui_ux | ui_ux | 2 |

### `accessibility`

| Subcategory | Mechanics |
| --- | --- |
| accessibility | 4 |
| input_preference | 1 |

### `ai`

| Subcategory | Mechanics |
| --- | --- |
| agent_behavior | 9 |
| decision_model | 1 |
| navigation_behavior | 1 |

### `camera`

| Subcategory | Mechanics |
| --- | --- |
| view_control | 9 |
| impact_feedback | 1 |

### `combat`

| Subcategory | Mechanics |
| --- | --- |
| hit_reaction | 2 |
| aiming | 1 |
| area_offense | 1 |
| attack_sequence | 1 |
| close_range_offense | 1 |
| commitment_offense | 1 |
| damage_modifier | 1 |
| defense | 1 |
| defense_counter | 1 |
| defensive_resource | 1 |
| projectile_defense | 1 |
| ranged_offense | 1 |
| ranged_resource | 1 |
| status_effect | 1 |
| stealth_attack | 1 |
| sustained_defense | 1 |
| targeting | 1 |
| timed_defense | 1 |

### `crafting`

| Subcategory | Mechanics |
| --- | --- |
| crafting | 4 |

### `economy`

| Subcategory | Mechanics |
| --- | --- |
| economy | 9 |
| reward_distribution | 1 |

### `horror`

| Subcategory | Mechanics |
| --- | --- |
| horror | 8 |

### `meta`

| Subcategory | Mechanics |
| --- | --- |
| meta | 4 |

### `movement`

| Subcategory | Mechanics |
| --- | --- |
| locomotion | 4 |
| burst_movement | 3 |
| air_mobility | 1 |
| environmental_locomotion | 1 |
| locomotion_modifier | 1 |
| stance | 1 |
| vertical_mobility | 1 |

### `multiplayer`

| Subcategory | Mechanics |
| --- | --- |
| player_coordination | 10 |

### `narrative`

| Subcategory | Mechanics |
| --- | --- |
| narrative | 4 |
| state_gating | 1 |

### `physics`

| Subcategory | Mechanics |
| --- | --- |
| simulation_force | 10 |
| collision_affordance | 1 |

### `platforming`

| Subcategory | Mechanics |
| --- | --- |
| vertical_mobility | 3 |
| jump_assist | 2 |
| wall_interaction | 2 |
| air_control | 1 |
| platform_interaction | 1 |

### `procedural_generation`

| Subcategory | Mechanics |
| --- | --- |
| content_generation | 7 |
| level_topology | 1 |
| terrain_generation | 1 |

### `progression`

| Subcategory | Mechanics |
| --- | --- |
| progression | 9 |
| ability_graph | 1 |
| build_management | 1 |

### `puzzle`

| Subcategory | Mechanics |
| --- | --- |
| state_puzzle | 9 |
| physical_trigger | 1 |

### `rhythm`

| Subcategory | Mechanics |
| --- | --- |
| rhythm | 4 |

### `roguelike`

| Subcategory | Mechanics |
| --- | --- |
| roguelike | 8 |
| run_reward_choice | 1 |

### `simulation`

| Subcategory | Mechanics |
| --- | --- |
| simulation | 4 |

### `stealth`

| Subcategory | Mechanics |
| --- | --- |
| stealth | 4 |
| ai_search | 1 |
| player_readability | 1 |

### `strategy`

| Subcategory | Mechanics |
| --- | --- |
| strategy | 4 |

### `survival`

| Subcategory | Mechanics |
| --- | --- |
| survival | 10 |

### `time`

| Subcategory | Mechanics |
| --- | --- |
| time | 7 |

### `traversal`

| Subcategory | Mechanics |
| --- | --- |
| locomotion | 8 |
| vertical_mobility | 2 |
| wall_traversal | 1 |

### `ui_ux`

| Subcategory | Mechanics |
| --- | --- |
| combat_feedback | 3 |
| navigation_interface | 2 |
| ui_ux | 2 |
| contextual_prompt | 1 |
| inventory_interface | 1 |
| narrative_interface | 1 |
| onboarding_interface | 1 |
| selection_interface | 1 |

### `vehicles`

| Subcategory | Mechanics |
| --- | --- |
| vehicles | 8 |

## Link Graph Health

| Metric | Value |
| --- | --- |
| Total directed links | 1717 |
| Broken internal references | 0 |
| Mechanics with zero outgoing links | 0 |
| Mechanics with zero incoming links | 27 |

### Top 20 Most-Linked Mechanics

| Mechanic | Incoming Links |
| --- | --- |
| ui_ux.cooldown_indicator | 78 |
| camera.dynamic_fov | 39 |
| progression.achievement_system | 38 |
| camera.smooth_follow_camera | 32 |
| economy.shop | 31 |
| crafting.recipe_crafting | 25 |
| physics.gravity | 25 |
| procedural_generation.seeded_generation | 25 |
| ui_ux.quest_marker | 25 |
| movement.run | 24 |
| stealth.shadow_cover | 24 |
| platforming.ledge_grab | 23 |
| simulation.systemic_weather | 23 |
| puzzle.physics_weight_puzzle | 22 |
| time.timed_challenge | 22 |
| ui_ux.damage_numbers | 21 |
| ui_ux.minimap | 21 |
| combat.lock_on_targeting | 20 |
| economy.loot_table | 19 |
| physics.wind_force | 19 |

### Categories with Lowest Average Outgoing Links

| Category | Average Outgoing Links | Mechanics |
| --- | --- | --- |
| stealth | 6.67 | 6 |
| accessibility | 6.80 | 5 |
| narrative | 6.80 | 5 |
| crafting | 7.00 | 4 |
| meta | 7.00 | 4 |
| rhythm | 7.00 | 4 |
| simulation | 7.00 | 4 |
| strategy | 7.00 | 4 |
| platforming | 7.22 | 9 |
| ui_ux | 7.25 | 12 |
| combat | 7.37 | 19 |
| roguelike | 7.78 | 9 |
| physics | 7.82 | 11 |
| traversal | 7.82 | 11 |
| horror | 7.88 | 8 |
| ai | 8.00 | 11 |
| camera | 8.00 | 10 |
| movement | 8.00 | 12 |
| multiplayer | 8.00 | 10 |
| procedural_generation | 8.00 | 9 |
| puzzle | 8.00 | 10 |
| survival | 8.00 | 10 |
| time | 8.00 | 7 |
| vehicles | 8.00 | 8 |
| progression | 8.18 | 11 |
| economy | 8.60 | 10 |

### Broken Internal References

_None._

### Mechanics with Zero Outgoing Links

_None._

### Mechanics with Zero Incoming Links

| Mechanic |
| --- |
| ai.boss_phase_transition |
| ai.flocking |
| camera.split_screen |
| horror.jump_scare_trigger |
| horror.safe_room |
| movement.climbing |
| movement.prone |
| movement.swimming |
| multiplayer.asymmetric_roles |
| multiplayer.friendly_fire |
| multiplayer.matchmaking_lobby |
| physics.destructible_environment |
| physics.pendulum_swing |
| physics.physics_push_pull |
| platforming.ledge_climb |
| puzzle.color_matching |
| puzzle.portal_pair |
| puzzle.sequence_memory |
| roguelike.curse_modifier |
| roguelike.shop_between_levels |

## Example Game Usage

| Metric | Value |
| --- | --- |
| Mechanics with no example games | 117 |

### Mechanics with No Example Games

| Mechanic |
| --- |
| accessibility.adjustable_difficulty |
| accessibility.assist_mode |
| accessibility.colorblind_modes |
| accessibility.text_scaling |
| camera.cinematic_camera |
| camera.split_screen |
| camera.top_down_camera |
| combat.invincibility_frames |
| combat.stealth_kill |
| crafting.crafting_queue |
| crafting.ingredient_quality |
| crafting.recipe_crafting |
| crafting.workbench |
| horror.hiding |
| horror.jump_scare_trigger |
| horror.light_resource |
| horror.monster_patrol |
| horror.safe_room |
| horror.sanity_meter |
| horror.sound_lure |
| meta.collection_log |
| meta.daily_challenge |
| meta.new_game_plus |
| meta.player_profile_stats |
| movement.climbing |
| movement.crouch |
| movement.dodge_roll |
| movement.prone |
| movement.run |
| movement.slide |

### Most Frequently Referenced Example Game Titles

| Title | Count |
| --- | --- |
| Hades | 10 |
| Celeste | 8 |
| Minecraft | 8 |
| The Legend of Zelda: Breath of the Wild | 5 |
| World of Warcraft | 5 |
| Dark Souls | 4 |
| Apex Legends | 3 |
| Borderlands | 3 |
| Diablo | 3 |
| Diablo III | 3 |
| Hollow Knight | 3 |
| Overwatch | 3 |
| Portal | 3 |
| Spelunky | 3 |
| The Elder Scrolls V: Skyrim | 3 |
| The Legend of Zelda: Ocarina of Time | 3 |
| Titanfall 2 | 3 |
| Animal Crossing | 2 |
| Call of Duty 4: Modern Warfare | 2 |
| Cookie Clicker | 2 |
| Dead Cells | 2 |
| Devil May Cry 5 | 2 |
| Dishonored | 2 |
| Left 4 Dead | 2 |
| Monster Hunter: World | 2 |
| No Man's Sky | 2 |
| Prince of Persia: The Sands of Time | 2 |
| Resident Evil 4 | 2 |
| Sekiro: Shadows Die Twice | 2 |
| Slay the Spire | 2 |

### Categories with Many Missing Examples

| Category | Missing Examples |
| --- | --- |
| movement | 10 |
| multiplayer | 9 |
| physics | 9 |
| puzzle | 9 |
| survival | 9 |
| horror | 7 |
| roguelike | 7 |
| vehicles | 7 |
| time | 6 |
| accessibility | 4 |
| crafting | 4 |
| meta | 4 |
| narrative | 4 |
| platforming | 4 |
| stealth | 4 |
| traversal | 4 |
| camera | 3 |
| rhythm | 3 |
| simulation | 3 |
| strategy | 3 |
| combat | 2 |
| ui_ux | 2 |

## Recommended Next Passes

- Run a wording pass on `time`; it has the highest average advisory warning rate (11.00 per mechanic).
- Review implementation notes in `multiplayer`; 10 mechanics have missing or weak notes.
- Plan a focused subcategory cleanup for `accessibility`; 1 generic subcategory bucket(s) are present.
- Hand-review `physics.gravity` first among individual entries; it has 11 warning(s) and 25 incoming link(s).
- Improve relationship coverage in `stealth`; it averages 6.67 outgoing link(s) per mechanic.
