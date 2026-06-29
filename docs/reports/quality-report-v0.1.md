# Dataset Quality Report v0.1

This advisory report summarizes dataset quality signals for maintainers. Warning counts are discovery signals, not CI failures.

## Summary

| Metric | Value |
| --- | --- |
| Generated at | 2026-06-29T15:51:29+00:00 |
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
| Total advisory warnings | 153 |

### Warning Count by Category

| Category | Warnings |
| --- | --- |
| accessibility | 28 |
| narrative | 28 |
| camera | 26 |
| ui_ux | 24 |
| platforming | 21 |
| combat | 15 |
| economy | 8 |
| procedural_generation | 3 |
| ai | 0 |
| crafting | 0 |
| horror | 0 |
| meta | 0 |
| movement | 0 |
| multiplayer | 0 |
| physics | 0 |
| progression | 0 |
| puzzle | 0 |
| rhythm | 0 |
| roguelike | 0 |
| simulation | 0 |
| stealth | 0 |
| strategy | 0 |
| survival | 0 |
| time | 0 |
| traversal | 0 |
| vehicles | 0 |

### Top 20 Mechanics by Warning Count

| Mechanic | Warnings |
| --- | --- |
| combat.invincibility_frames | 11 |
| camera.cinematic_camera | 8 |
| camera.split_screen | 8 |
| camera.top_down_camera | 8 |
| ui_ux.accessibility_remap_controls | 8 |
| ui_ux.checkpoint_notification | 8 |
| accessibility.adjustable_difficulty | 7 |
| accessibility.assist_mode | 7 |
| accessibility.colorblind_modes | 7 |
| accessibility.text_scaling | 7 |
| narrative.branching_dialogue | 7 |
| narrative.codex_journal | 7 |
| narrative.environmental_storytelling | 7 |
| narrative.reputation_choice | 7 |
| platforming.ledge_climb | 7 |
| platforming.ledge_grab | 7 |
| platforming.variable_jump_height | 7 |
| economy.idle_income | 4 |
| ui_ux.cooldown_indicator | 3 |
| economy.trading | 2 |

### Top Repeated Weak or Generic Terms

| Term | Count |
| --- | --- |
| clear player promise | 17 |
| engine-agnostic state first | 17 |
| high-priority state | 17 |
| predictable result | 17 |
| readable trigger | 17 |
| scene transition, pause, respawn | 17 |
| strong enough to justify attention | 17 |
| time | 10 |
| cooldown | 6 |
| speed | 6 |
| value | 5 |
| amount | 3 |
| duration | 3 |
| feedback | 1 |

## Field Completeness

| Check | Count |
| --- | --- |
| Mechanics with empty example_games | 22 |
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
| accessibility | 5 | 28 | 5.60 | 4 | 4 | 0 | 0 | 0 |
| narrative | 5 | 28 | 5.60 | 4 | 4 | 0 | 0 | 0 |
| camera | 10 | 26 | 2.60 | 3 | 3 | 0 | 0 | 0 |
| platforming | 9 | 21 | 2.33 | 4 | 3 | 0 | 0 | 0 |
| ui_ux | 12 | 24 | 2.00 | 2 | 2 | 0 | 0 | 0 |
| economy | 10 | 8 | 0.80 | 0 | 0 | 0 | 0 | 0 |
| combat | 19 | 15 | 0.79 | 2 | 1 | 0 | 0 | 0 |
| procedural_generation | 9 | 3 | 0.33 | 0 | 0 | 0 | 0 | 0 |
| ai | 11 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| crafting | 4 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| horror | 8 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| meta | 4 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| movement | 12 | 0 | 0.00 | 3 | 0 | 0 | 0 | 0 |
| multiplayer | 10 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| physics | 11 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| progression | 11 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| puzzle | 10 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| rhythm | 4 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| roguelike | 9 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| simulation | 4 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| stealth | 6 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| strategy | 4 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| survival | 10 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| time | 7 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| traversal | 11 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |
| vehicles | 8 | 0 | 0.00 | 0 | 0 | 0 | 0 | 0 |

## Subcategory Distribution

### Generic Subcategory Flags

| Category | Subcategory | Mechanics |
| --- | --- | --- |
| economy | economy | 9 |
| progression | progression | 9 |
| accessibility | accessibility | 4 |
| narrative | narrative | 4 |
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
| audio_lure | 1 |
| hiding_state | 1 |
| illumination_resource | 1 |
| monster_ai | 1 |
| sanctuary_space | 1 |
| sanity_pressure | 1 |
| scare_trigger | 1 |
| visibility_pressure | 1 |

### `meta`

| Subcategory | Mechanics |
| --- | --- |
| account_collection | 1 |
| profile_records | 1 |
| repeat_playthrough | 1 |
| rotating_challenge | 1 |

### `movement`

| Subcategory | Mechanics |
| --- | --- |
| burst_movement | 3 |
| ground_locomotion | 2 |
| stance | 2 |
| air_mobility | 1 |
| endurance_locomotion | 1 |
| environmental_locomotion | 1 |
| locomotion_modifier | 1 |
| vertical_locomotion | 1 |

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
| beat_timing | 1 |
| chart_lane | 1 |
| streak_scoring | 1 |
| timing_judgment | 1 |

### `roguelike`

| Subcategory | Mechanics |
| --- | --- |
| failure_persistence | 1 |
| floor_generation | 1 |
| inter_floor_shop | 1 |
| relic_interaction | 1 |
| reward_generation | 1 |
| room_risk_choice | 1 |
| run_modifier | 1 |
| run_reward_choice | 1 |
| run_state_progression | 1 |

### `simulation`

| Subcategory | Mechanics |
| --- | --- |
| agent_needs | 1 |
| population_dynamics | 1 |
| traffic_network | 1 |
| weather_state | 1 |

### `stealth`

| Subcategory | Mechanics |
| --- | --- |
| acoustic_visibility | 1 |
| ai_alertness | 1 |
| ai_search | 1 |
| light_visibility | 1 |
| player_readability | 1 |
| sound_lure | 1 |

### `strategy`

| Subcategory | Mechanics |
| --- | --- |
| map_visibility | 1 |
| region_ownership | 1 |
| research_unlocks | 1 |
| unit_matchups | 1 |

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
| locomotion | 3 |
| aerial_traversal | 1 |
| anchor_traversal | 1 |
| ledge_traversal | 1 |
| obstacle_traversal | 1 |
| powered_flight | 1 |
| vehicle_access | 1 |
| vertical_mobility | 1 |
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
| Total directed links | 1748 |
| Broken internal references | 0 |
| Mechanics with zero outgoing links | 0 |
| Mechanics with zero incoming links | 1 |

### Top 20 Most-Linked Mechanics

| Mechanic | Incoming Links |
| --- | --- |
| progression.achievement_system | 27 |
| economy.loot_table | 26 |
| ui_ux.cooldown_indicator | 25 |
| ui_ux.hit_marker | 24 |
| camera.screen_shake | 23 |
| ui_ux.damage_numbers | 23 |
| camera.dynamic_fov | 21 |
| camera.smooth_follow_camera | 21 |
| economy.shop | 21 |
| movement.run | 21 |
| ui_ux.interaction_prompt | 21 |
| ui_ux.minimap | 21 |
| combat.lock_on_targeting | 20 |
| progression.skill_tree | 20 |
| survival.base_building | 18 |
| ui_ux.inventory_grid | 18 |
| combat.ranged_attack | 17 |
| economy.crafting_materials | 17 |
| platforming.coyote_time | 17 |
| progression.unlockable_abilities | 17 |

### Categories with Lowest Average Outgoing Links

| Category | Average Outgoing Links | Mechanics |
| --- | --- | --- |
| accessibility | 6.80 | 5 |
| narrative | 6.80 | 5 |
| platforming | 7.22 | 9 |
| ui_ux | 7.25 | 12 |
| combat | 7.37 | 19 |
| physics | 7.82 | 11 |
| traversal | 7.82 | 11 |
| ai | 8.00 | 11 |
| camera | 8.00 | 10 |
| crafting | 8.00 | 4 |
| horror | 8.00 | 8 |
| meta | 8.00 | 4 |
| movement | 8.00 | 12 |
| multiplayer | 8.00 | 10 |
| procedural_generation | 8.00 | 9 |
| puzzle | 8.00 | 10 |
| rhythm | 8.00 | 4 |
| roguelike | 8.00 | 9 |
| simulation | 8.00 | 4 |
| stealth | 8.00 | 6 |
| strategy | 8.00 | 4 |
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

## Example Game Usage

| Metric | Value |
| --- | --- |
| Mechanics with no example games | 22 |

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
| movement.crouch |
| movement.sprint |
| movement.swimming |
| narrative.branching_dialogue |
| narrative.codex_journal |
| narrative.environmental_storytelling |
| narrative.reputation_choice |
| platforming.ledge_climb |
| platforming.ledge_grab |
| platforming.variable_jump_height |
| platforming.wall_slide |
| ui_ux.accessibility_remap_controls |
| ui_ux.checkpoint_notification |

### Most Frequently Referenced Example Game Titles

| Title | Count |
| --- | --- |
| Hades | 15 |
| The Legend of Zelda: Breath of the Wild | 15 |
| Minecraft | 13 |
| Celeste | 10 |
| Dark Souls | 8 |
| Slay the Spire | 7 |
| The Legend of Zelda: Ocarina of Time | 7 |
| World of Warcraft | 7 |
| Apex Legends | 6 |
| Half-Life 2 | 6 |
| Spelunky | 6 |
| Alien: Isolation | 5 |
| Portal | 5 |
| Portal 2 | 5 |
| Subnautica | 5 |
| The Elder Scrolls V: Skyrim | 5 |
| Dead Cells | 4 |
| Diablo III | 4 |
| Hollow Knight | 4 |
| Left 4 Dead | 4 |
| Mario Kart 8 | 4 |
| Overwatch | 4 |
| Resident Evil 4 | 4 |
| The Binding of Isaac | 4 |
| The Last of Us | 4 |
| Titanfall 2 | 4 |
| Amnesia: The Dark Descent | 3 |
| Borderlands | 3 |
| Civilization VI | 3 |
| Deep Rock Galactic | 3 |

### Categories with Many Missing Examples

| Category | Missing Examples |
| --- | --- |
| accessibility | 4 |
| narrative | 4 |
| platforming | 4 |
| camera | 3 |
| movement | 3 |
| combat | 2 |
| ui_ux | 2 |

## Recommended Next Passes

- Run a wording pass on `accessibility`; it has the highest average advisory warning rate (5.60 per mechanic).
- Review implementation notes in `accessibility`; 4 mechanics have missing or weak notes.
- Plan a focused subcategory cleanup for `accessibility`; 1 generic subcategory bucket(s) are present.
- Hand-review `combat.invincibility_frames` first among individual entries; it has 11 warning(s) and 7 incoming link(s).
- Improve relationship coverage in `accessibility`; it averages 6.80 outgoing link(s) per mechanic.
