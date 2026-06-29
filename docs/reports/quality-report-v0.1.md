# Dataset Quality Report v0.1

This advisory report summarizes dataset quality signals for maintainers. Warning counts are discovery signals, not CI failures.

## Summary

| Metric | Value |
| --- | --- |
| Generated at | 2026-06-29T14:27:30+00:00 |
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
| Total advisory warnings | 539 |

### Warning Count by Category

| Category | Warnings |
| --- | --- |
| movement | 70 |
| roguelike | 64 |
| horror | 56 |
| traversal | 48 |
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
| crafting | 0 |
| multiplayer | 0 |
| physics | 0 |
| progression | 0 |
| puzzle | 0 |
| survival | 0 |
| time | 0 |
| vehicles | 0 |

### Top 20 Mechanics by Warning Count

| Mechanic | Warnings |
| --- | --- |
| combat.invincibility_frames | 11 |
| traversal.jetpack | 11 |
| traversal.ladder_climb | 11 |
| traversal.parkour_vault | 11 |
| traversal.vehicle_mount | 11 |
| movement.climbing | 10 |
| movement.dodge_roll | 10 |
| movement.prone | 10 |
| movement.run | 10 |
| movement.slide | 10 |
| movement.stamina_movement | 10 |
| movement.walk | 10 |
| stealth.alert_state | 9 |
| stealth.distraction_throw | 9 |
| stealth.noise_meter | 9 |
| stealth.shadow_cover | 9 |
| camera.cinematic_camera | 8 |
| camera.split_screen | 8 |
| camera.top_down_camera | 8 |
| roguelike.curse_modifier | 8 |

### Top Repeated Weak or Generic Terms

| Term | Count |
| --- | --- |
| clear player promise | 64 |
| engine-agnostic state first | 64 |
| high-priority state | 64 |
| predictable result | 64 |
| readable trigger | 64 |
| scene transition, pause, respawn | 64 |
| strong enough to justify attention | 64 |
| speed | 37 |
| amount | 15 |
| time | 15 |
| cooldown | 6 |
| feedback | 5 |
| value | 5 |
| duration | 4 |
| range | 4 |

## Field Completeness

| Check | Count |
| --- | --- |
| Mechanics with empty example_games | 64 |
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
| crafting | 4 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| multiplayer | 10 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| physics | 11 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| progression | 11 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| puzzle | 10 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| survival | 10 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| time | 7 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| vehicles | 8 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |

## Subcategory Distribution

### Generic Subcategory Flags

| Category | Subcategory | Mechanics |
| --- | --- | --- |
| economy | economy | 9 |
| progression | progression | 9 |
| horror | horror | 8 |
| roguelike | roguelike | 8 |
| accessibility | accessibility | 4 |
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
| crafting_station | 1 |
| ingredient_grading | 1 |
| queue_processing | 1 |
| recipe_transaction | 1 |

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
| communication_ping | 1 |
| downed_recovery | 1 |
| local_session | 1 |
| networked_coop | 1 |
| role_authority | 1 |
| role_transfer | 1 |
| session_lobby | 1 |
| shared_economy | 1 |
| team_damage_rules | 1 |
| team_goal | 1 |

### `narrative`

| Subcategory | Mechanics |
| --- | --- |
| narrative | 4 |
| state_gating | 1 |

### `physics`

| Subcategory | Mechanics |
| --- | --- |
| breakable_object | 1 |
| collision_affordance | 1 |
| constraint_swing | 1 |
| environmental_acceleration | 1 |
| fluid_physics | 1 |
| gravity_field | 1 |
| gravity_modifier | 1 |
| object_manipulation | 1 |
| passenger_motion | 1 |
| persistent_destruction | 1 |
| skeletal_physics | 1 |

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
| grid_object_puzzle | 1 |
| ordered_input | 1 |
| physical_mass_logic | 1 |
| physical_trigger | 1 |
| progression_gate | 1 |
| ray_routing | 1 |
| spatial_mapping | 1 |
| switch_state | 1 |
| symbol_matching | 1 |
| timed_gate | 1 |

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
| breathing_supply | 1 |
| carrying_capacity | 1 |
| environmental_exposure | 1 |
| exertion_pool | 1 |
| hydration_need | 1 |
| item_wear | 1 |
| metabolic_need | 1 |
| shelter_construction | 1 |
| survival_schedule | 1 |
| vital_state | 1 |

### `time`

| Subcategory | Mechanics |
| --- | --- |
| action_recharge | 1 |
| countdown_objective | 1 |
| rhythm_window | 1 |
| schedule_cycle | 1 |
| state_rewind | 1 |
| state_suspension | 1 |
| time_scale | 1 |

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
| deceleration_control | 1 |
| drivetrain_input | 1 |
| resource_tank | 1 |
| temporary_power | 1 |
| traction_slide | 1 |
| upgrade_installation | 1 |
| vehicle_health | 1 |
| wheel_contact | 1 |

## Link Graph Health

| Metric | Value |
| --- | --- |
| Total directed links | 1721 |
| Broken internal references | 0 |
| Mechanics with zero outgoing links | 0 |
| Mechanics with zero incoming links | 8 |

### Top 20 Most-Linked Mechanics

| Mechanic | Incoming Links |
| --- | --- |
| economy.shop | 34 |
| camera.smooth_follow_camera | 33 |
| ui_ux.cooldown_indicator | 32 |
| camera.dynamic_fov | 28 |
| ui_ux.damage_numbers | 26 |
| procedural_generation.seeded_generation | 25 |
| movement.run | 24 |
| stealth.shadow_cover | 24 |
| platforming.ledge_grab | 23 |
| economy.loot_table | 22 |
| ui_ux.minimap | 22 |
| combat.lock_on_targeting | 20 |
| progression.achievement_system | 20 |
| ui_ux.hit_marker | 20 |
| horror.limited_visibility | 18 |
| progression.skill_tree | 18 |
| camera.screen_shake | 17 |
| roguelike.run_based_progression | 17 |
| survival.base_building | 17 |
| ai.line_of_sight_detection | 16 |

### Categories with Lowest Average Outgoing Links

| Category | Average Outgoing Links | Mechanics |
| --- | --- | --- |
| stealth | 6.67 | 6 |
| accessibility | 6.80 | 5 |
| narrative | 6.80 | 5 |
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
| crafting | 8.00 | 4 |
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
| horror.safe_room |
| movement.prone |
| platforming.ledge_climb |
| roguelike.curse_modifier |
| roguelike.shop_between_levels |
| traversal.parkour_vault |

## Example Game Usage

| Metric | Value |
| --- | --- |
| Mechanics with no example games | 64 |

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
| movement.sprint |
| movement.stamina_movement |
| movement.swimming |
| movement.walk |

### Most Frequently Referenced Example Game Titles

| Title | Count |
| --- | --- |
| Minecraft | 13 |
| The Legend of Zelda: Breath of the Wild | 13 |
| Hades | 11 |
| Celeste | 10 |
| The Legend of Zelda: Ocarina of Time | 7 |
| World of Warcraft | 6 |
| Dark Souls | 5 |
| Half-Life 2 | 5 |
| Portal | 5 |
| Portal 2 | 5 |
| Subnautica | 5 |
| The Elder Scrolls V: Skyrim | 5 |
| Apex Legends | 4 |
| Diablo III | 4 |
| Left 4 Dead | 4 |
| Mario Kart 8 | 4 |
| Overwatch | 4 |
| Resident Evil 4 | 4 |
| Spelunky | 4 |
| Borderlands | 3 |
| Deep Rock Galactic | 3 |
| Diablo | 3 |
| Don't Starve | 3 |
| Forza Horizon 5 | 3 |
| Hollow Knight | 3 |
| Monster Hunter: World | 3 |
| Prince of Persia: The Sands of Time | 3 |
| Super Mario Bros. | 3 |
| Terraria | 3 |
| The Long Dark | 3 |

### Categories with Many Missing Examples

| Category | Missing Examples |
| --- | --- |
| movement | 10 |
| horror | 7 |
| roguelike | 7 |
| accessibility | 4 |
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

- Run a wording pass on `roguelike`; it has the highest average advisory warning rate (7.11 per mechanic).
- Review implementation notes in `horror`; 8 mechanics have missing or weak notes.
- Plan a focused subcategory cleanup for `accessibility`; 1 generic subcategory bucket(s) are present.
- Hand-review `combat.invincibility_frames` first among individual entries; it has 11 warning(s) and 6 incoming link(s).
- Improve relationship coverage in `stealth`; it averages 6.67 outgoing link(s) per mechanic.
