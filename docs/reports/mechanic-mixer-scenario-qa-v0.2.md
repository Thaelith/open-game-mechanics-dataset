# Mechanic Mixer Scenario QA v0.2

This report captures realistic concept mixes run through the deterministic Mechanic Mixer analysis module. It is intended to catch misleading scope, dependency, conflict, and trim output before public-facing release polish.

## Summary

| Metric | Value |
| --- | --- |
| Scenarios | 10 |
| Passed expectations | 10/10 |
| Failed expectations | 0 |

## Calibration Notes

- No production hours are inferred by the scenario runner.
- Expectations are intentionally flexible: they check useful signals without locking exact sort order.
- Trim suggestions are treated as prototype-risk notes, not removal commands.
- Accessibility mechanics are expected to remain valid support mechanics when selected intentionally.
- No scoring or wording calibration was required for this run; observed outputs matched the scenario expectations.

## Mobility Combat Platformer

**Scenario ID:** `mobility_combat_platformer`

**Intent:** A small action-platformer prototype focused on aerial movement, ranged combat, reload pacing, and readable cooldown feedback.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| movement.air_dash - Air Dash | movement |
| platforming.double_jump - Double Jump | platforming |
| combat.ranged_attack - Ranged Attack | combat |
| combat.reload - Reload | combat |
| ui_ux.cooldown_indicator - Cooldown Indicator | ui_ux |

### Scope Pressure

Medium overall (3.0); implementation 2.6, design 2.8, tuning 3.8, content 2.2, risks network/save/UI 4/2/4.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| input_buffer | 3 | combat.reload, movement.air_dash, platforming.double_jump |
| air_action_counter | 2 | movement.air_dash, platforming.double_jump |
| ammo_system | 2 | combat.ranged_attack, combat.reload |
| accessibility_settings | 1 | ui_ux.cooldown_indicator |
| aiming_system | 1 | combat.ranged_attack |
| animation_events | 1 | combat.reload |
| animation_state_machine | 1 | platforming.double_jump |
| character_controller | 1 | movement.air_dash |
| collision_detection | 1 | movement.air_dash |
| cooldown_system | 1 | ui_ux.cooldown_indicator |

### Conflict Warnings

_None._

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Critical dependency | time.cooldown_time | requires | strong | combat.reload | Reload needs a reliable timing window before the next valid firing action is accepted. |
| Critical dependency | time.cooldown_time | requires | strong | ui_ux.cooldown_indicator | Cooldown indicators need remaining duration, charge count, and authoritative ready state from cooldown timers. |
| Support option | movement.dash | supports | medium | ui_ux.cooldown_indicator | Dash availability is easier to read when cooldown or charge state is visible near the action prompt. |
| Support option | ui_ux.hit_marker | supports | medium | combat.ranged_attack | Ranged impacts benefit from hit confirmation when targets are distant, occluded, or partly outside the camera focus. |
| Contextual link | movement.dash | extends | strong | movement.air_dash | Air dash reuses dash displacement and cooldown rules while applying them during airborne movement state. |
| Contextual link | platforming.variable_jump_height | extends | strong | platforming.double_jump | Double jump extends the base jump state by adding an airborne jump charge and reset rule. |
| Contextual link | progression.unlockable_abilities | unlocks | medium | platforming.double_jump | Double jump is often granted as a progression ability that changes reachable routes. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| time.cooldown_time | time | Critical dependency: combat.reload requires time.cooldown_time.; Critical dependency: ui_ux.cooldown_indicator requires time.cooldown_time.; time.cooldown_time supports selected ui_ux.cooldown_indicator. |
| movement.dash | movement | Support option: ui_ux.cooldown_indicator supports movement.dash.; Contextual link: movement.air_dash extends movement.dash.; movement.dash supports selected ui_ux.cooldown_indicator. |
| platforming.variable_jump_height | platforming | Contextual link: platforming.double_jump extends platforming.variable_jump_height.; platforming.variable_jump_height enhances selected platforming.double_jump.; platforming.double_jump lists it in related_mechanics. |
| progression.unlockable_abilities | progression | Contextual link: platforming.double_jump unlocks progression.unlockable_abilities.; progression.unlockable_abilities unlocks selected platforming.double_jump.; platforming.double_jump lists it in combines_well_with. |
| ui_ux.hit_marker | ui_ux | Support option: combat.ranged_attack supports ui_ux.hit_marker.; combat.ranged_attack lists it in related_mechanics.; combat.reload lists it in combines_well_with. |
| combat.aim_down_sights | combat | combat.aim_down_sights extends selected combat.ranged_attack.; combat.ranged_attack lists it in related_mechanics.; combat.reload lists it in related_mechanics. |
| combat.damage_over_time | combat | combat.ranged_attack lists it in combines_well_with.; combat.reload lists it in combines_well_with.; ui_ux.cooldown_indicator lists it in combines_well_with. |
| traversal.gliding | traversal | traversal.gliding enhances selected platforming.double_jump.; platforming.double_jump lists it in combines_well_with. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| combat.reload | support | 1 missing required relationship(s) |
| ui_ux.cooldown_indicator | support | 1 missing required relationship(s) |

### QA Notes

Should produce useful support and dependency suggestions without treating the concept as impossible.

## Online Co-op Time Rewind Risk

**Scenario ID:** `online_coop_time_rewind_risk`

**Intent:** A risky co-op prototype exploring rewind with shared traversal state and physics-heavy movement.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| time.time_rewind - Time Rewind | time |
| multiplayer.online_coop - Online Coop | multiplayer |
| physics.moving_platform - Moving Platform | physics |
| traversal.grappling_hook - Grappling Hook | traversal |

### Scope Pressure

Very High overall (4.4); implementation 4.8, design 4.3, tuning 5.0, content 3.0, risks network/save/UI 5/5/4.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| aiming_system | 1 | traversal.grappling_hook |
| anchor_query | 1 | traversal.grappling_hook |
| attachment_state | 1 | traversal.grappling_hook |
| collision_detection | 1 | traversal.grappling_hook |
| contact_solver | 1 | physics.moving_platform |
| desync_detection | 1 | multiplayer.online_coop |
| deterministic_replay | 1 | time.time_rewind |
| input_history | 1 | time.time_rewind |
| kinematic_body_controller | 1 | physics.moving_platform |
| network_transport | 1 | multiplayer.online_coop |

### Conflict Warnings

| Severity | Source | Target | Reason |
| --- | --- | --- | --- |
| Hard conflict | multiplayer.online_coop | time.time_rewind | Authoritative online co-op is structurally hard to combine with player-controlled rewinds without rollback architecture. |
| Hard conflict | time.time_rewind | multiplayer.online_coop | Player-controlled rewind conflicts with ordinary online co-op authority unless rollback and shared timeline rules are designed first. |
| Soft conflict | time.time_rewind | physics.moving_platform | Rewind restore order must handle platform position, carried passengers, contact state, and velocity transfer together. |
| Soft conflict | physics.moving_platform | time.time_rewind | Rewind snapshots must capture platform phase, passenger carry state, and velocity transfer to replay correctly. |
| Soft conflict | time.time_rewind | traversal.grappling_hook | Rewind snapshots must include grapple attachment, rope length, velocity, and collision state to replay traversal safely. |
| Soft conflict | traversal.grappling_hook | time.time_rewind | Grapple state is difficult to rewind unless attachment, rope length, velocity, and collision state are sampled. |

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Critical dependency | multiplayer.matchmaking_lobby | requires | strong | multiplayer.online_coop | Online co-op usually needs a lobby or session flow for party formation, readiness, and reconnect state. |
| Critical dependency | physics.pendulum_swing | requires | strong | traversal.grappling_hook | Swinging grapples depend on pendulum constraints, rope length, and release velocity from physics state. |
| Contextual link | multiplayer.revive_teammate | enhances | medium | multiplayer.online_coop | Revive mechanics add cooperative recovery pressure and reasons to protect teammates. |
| Contextual link | platforming.ledge_grab | enhances | medium | traversal.grappling_hook | Ledge grab gives failed or partial grapples a recoverable state near anchor endpoints. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| multiplayer.matchmaking_lobby | multiplayer | Critical dependency: multiplayer.online_coop requires multiplayer.matchmaking_lobby.; multiplayer.matchmaking_lobby supports selected multiplayer.online_coop.; multiplayer.online_coop lists it in related_mechanics. |
| physics.pendulum_swing | physics | Critical dependency: traversal.grappling_hook requires physics.pendulum_swing.; physics.pendulum_swing supports selected traversal.grappling_hook. |
| multiplayer.revive_teammate | multiplayer | Contextual link: multiplayer.online_coop enhances multiplayer.revive_teammate.; multiplayer.revive_teammate enhances selected multiplayer.online_coop.; multiplayer.online_coop lists it in related_mechanics. |
| platforming.ledge_grab | platforming | Contextual link: traversal.grappling_hook enhances platforming.ledge_grab.; traversal.grappling_hook lists it in combines_well_with.; traversal.grappling_hook lists it in related_mechanics. |
| puzzle.pressure_plate | puzzle | puzzle.pressure_plate enhances selected multiplayer.online_coop.; physics.moving_platform lists it in related_mechanics. |
| economy.trading | economy | economy.trading requires selected multiplayer.online_coop. |
| multiplayer.local_coop | multiplayer | multiplayer.local_coop is_variant_of selected multiplayer.online_coop. |
| puzzle.sliding_block | puzzle | puzzle.sliding_block enhances selected time.time_rewind. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| multiplayer.online_coop | optional | selected hard conflict, optional role, 1 missing required relationship(s), very high tuning cost, very high implementation cost, very high implementation risk |
| time.time_rewind | optional | selected hard conflict, optional role, very high tuning cost, very high implementation cost, very high implementation risk |
| physics.moving_platform | support | very high tuning cost |

### QA Notes

Should surface the explicit time-rewind and online co-op conflict, plus high scope pressure from rewind/network state.

## Survival Resource Loop

**Scenario ID:** `survival_resource_loop`

**Intent:** A survival loop built around hunger, thirst, temperature, day-night pressure, and readable meter feedback.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| survival.hunger - Hunger | survival |
| survival.thirst - Thirst | survival |
| survival.temperature - Temperature | survival |
| survival.day_night_cycle - Day Night Cycle | survival |
| time.day_night_schedule - Day Night Schedule | time |
| ui_ux.cooldown_indicator - Cooldown Indicator | ui_ux |

### Scope Pressure

High overall (3.6); implementation 3.0, design 3.7, tuning 4.5, content 3.2, risks network/save/UI 2/4/4.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| ui_warning_bands | 4 | survival.day_night_cycle, survival.hunger, survival.temperature, survival.thirst |
| consumable_items | 2 | survival.hunger, survival.thirst |
| lighting_controller | 2 | survival.day_night_cycle, time.day_night_schedule |
| save_load_state | 2 | survival.hunger, time.day_night_schedule |
| status_effects | 2 | survival.hunger, survival.thirst |
| survival_stat_system | 2 | survival.hunger, survival.thirst |
| world_schedule_clock | 2 | survival.day_night_cycle, time.day_night_schedule |
| accessibility_settings | 1 | ui_ux.cooldown_indicator |
| ai_spawn_director | 1 | survival.day_night_cycle |
| cooldown_system | 1 | ui_ux.cooldown_indicator |

### Conflict Warnings

_None._

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Critical dependency | time.cooldown_time | requires | strong | ui_ux.cooldown_indicator | Cooldown indicators need remaining duration, charge count, and authoritative ready state from cooldown timers. |
| Support option | combat.reload | supports | medium | ui_ux.cooldown_indicator | Long reloads and staged reloads benefit from visible progress, cancellation, and ready-state feedback. |
| Support option | movement.dash | supports | medium | ui_ux.cooldown_indicator | Dash availability is easier to read when cooldown or charge state is visible near the action prompt. |
| Support option | survival.base_building | supports | medium | survival.temperature | Shelter volumes and base structures can provide insulation, safe zones, or recovery sources. |
| Support option | survival.stamina | balances | medium | survival.hunger | Low hunger can cap stamina recovery so long-term resource planning affects moment-to-moment exertion. |
| Contextual link | survival.health | feeds | medium | survival.hunger | Hunger depletion can produce health penalties after warning thresholds are crossed. |
| Contextual link | survival.health | feeds | medium | survival.temperature | Extreme exposure can apply health penalties after cold or heat thresholds persist. |
| Contextual link | survival.health | feeds | medium | survival.thirst | Thirst depletion can trigger health loss or impairment after hydration thresholds expire. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| survival.health | survival | Contextual link: survival.hunger feeds survival.health.; Contextual link: survival.temperature feeds survival.health.; Contextual link: survival.thirst feeds survival.health. |
| time.cooldown_time | time | Critical dependency: ui_ux.cooldown_indicator requires time.cooldown_time.; time.cooldown_time supports selected ui_ux.cooldown_indicator.; time.day_night_schedule lists it in combines_well_with. |
| survival.base_building | survival | Support option: survival.temperature supports survival.base_building.; survival.thirst lists it in combines_well_with.; survival.temperature lists it in related_mechanics. |
| survival.stamina | survival | Support option: survival.hunger balances survival.stamina.; survival.stamina supports selected ui_ux.cooldown_indicator.; survival.hunger lists it in related_mechanics. |
| combat.reload | combat | Support option: ui_ux.cooldown_indicator supports combat.reload.; combat.reload supports selected ui_ux.cooldown_indicator.; ui_ux.cooldown_indicator lists it in related_mechanics. |
| movement.dash | movement | Support option: ui_ux.cooldown_indicator supports movement.dash.; movement.dash supports selected ui_ux.cooldown_indicator.; ui_ux.cooldown_indicator lists it in related_mechanics. |
| procedural_generation.random_encounters | procedural_generation | Contextual link: survival.day_night_cycle enhances procedural_generation.random_encounters.; procedural_generation.random_encounters enhances selected survival.day_night_cycle. |
| simulation.systemic_weather | simulation | simulation.systemic_weather feeds selected survival.temperature.; survival.temperature lists it in combines_well_with.; time.day_night_schedule lists it in related_mechanics. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| survival.temperature | optional | optional role, very high tuning cost |
| ui_ux.cooldown_indicator | support | 1 missing required relationship(s) |

### QA Notes

Should show save/load and UI risk while keeping the survival core intact.

## Roguelike Run Builder

**Scenario ID:** `roguelike_run_builder`

**Intent:** A run-based roguelike concept with procedural floors, upgrade choices, relic synergy, shops, and meta progression.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| roguelike.procedural_floor - Procedural Floor | roguelike |
| roguelike.random_powerups - Random Powerups | roguelike |
| roguelike.pick_one_upgrade_choice - Pick-One Upgrade Choice | roguelike |
| roguelike.relic_synergy - Relic Synergy | roguelike |
| economy.shop - Shop | economy |
| progression.meta_progression - Meta Progression | progression |

### Scope Pressure

Very High overall (4.2); implementation 3.7, design 4.2, tuning 4.8, content 4.2, risks network/save/UI 3/5/4.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| run_state_manager | 3 | roguelike.pick_one_upgrade_choice, roguelike.random_powerups, roguelike.relic_synergy |
| reward_generation | 2 | roguelike.pick_one_upgrade_choice, roguelike.random_powerups |
| seeded_rng | 2 | roguelike.pick_one_upgrade_choice, roguelike.random_powerups |
| account_progression_state | 1 | progression.meta_progression |
| currency_wallet | 1 | economy.shop |
| debug_seed_logging | 1 | roguelike.procedural_floor |
| encounter_tables | 1 | roguelike.procedural_floor |
| event_bus | 1 | roguelike.relic_synergy |
| item_grants | 1 | economy.shop |
| layout_validation | 1 | roguelike.procedural_floor |

### Conflict Warnings

_None._

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Critical dependency | procedural_generation.loot_generation | requires | strong | roguelike.pick_one_upgrade_choice | Upgrade choices need deterministic reward pools, rarity weighting, and duplicate prevention. |
| Critical dependency | procedural_generation.loot_generation | requires | strong | roguelike.random_powerups | Powerup selection needs reward pools, rarity weights, duplicate rules, and deterministic grant records. |
| Critical dependency | procedural_generation.procedural_level_rooms | requires | strong | roguelike.procedural_floor | Procedural floors depend on room templates, connection rules, and path validation. |
| Critical dependency | procedural_generation.room_connection_graph | requires | strong | roguelike.procedural_floor | Floor layouts need graph nodes, doors, critical path checks, and branch validation. |
| Important dependency | ui_ux.inventory_grid | requires | medium | economy.shop | Shops need inventory presentation, capacity checks, and item comparison for reliable buy and sell flows. |
| Useful support | roguelike.run_based_progression | supports | strong | progression.meta_progression | Meta progression defines what survives between runs and what resets with each run state. |
| Support option | roguelike.curse_modifier | balances | medium | roguelike.relic_synergy | Curses can counterbalance strong relic combinations with constraints that affect build decisions. |
| Support option | ui_ux.dialogue_choice | supports | medium | roguelike.pick_one_upgrade_choice | Choice UI needs readable option focus, comparison text, and commit/cancel behavior. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| procedural_generation.loot_generation | procedural_generation | Critical dependency: roguelike.pick_one_upgrade_choice requires procedural_generation.loot_generation.; Critical dependency: roguelike.random_powerups requires procedural_generation.loot_generation.; procedural_generation.loot_generation feeds selected roguelike.random_powerups. |
| ui_ux.inventory_grid | ui_ux | Important dependency: economy.shop requires ui_ux.inventory_grid.; ui_ux.inventory_grid supports selected economy.shop.; economy.shop lists it in related_mechanics. |
| procedural_generation.procedural_level_rooms | procedural_generation | Critical dependency: roguelike.procedural_floor requires procedural_generation.procedural_level_rooms.; procedural_generation.procedural_level_rooms supports selected roguelike.procedural_floor. |
| roguelike.run_based_progression | roguelike | Useful support: progression.meta_progression supports roguelike.run_based_progression.; roguelike.run_based_progression enhances selected roguelike.pick_one_upgrade_choice.; progression.meta_progression lists it in related_mechanics. |
| procedural_generation.room_connection_graph | procedural_generation | Critical dependency: roguelike.procedural_floor requires procedural_generation.room_connection_graph.; roguelike.procedural_floor lists it in related_mechanics. |
| economy.coins | economy | Contextual link: economy.shop consumes economy.coins.; economy.coins feeds selected economy.shop.; economy.shop lists it in related_mechanics. |
| roguelike.risk_reward_room | roguelike | roguelike.risk_reward_room requires selected roguelike.procedural_floor.; roguelike.risk_reward_room feeds selected roguelike.random_powerups.; roguelike.procedural_floor lists it in related_mechanics. |
| economy.dynamic_pricing | economy | Contextual link: economy.shop enhances economy.dynamic_pricing.; economy.dynamic_pricing supports selected economy.shop.; economy.shop lists it in related_mechanics. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| progression.meta_progression | optional | optional role, very high tuning cost, very high implementation risk |
| economy.shop | support | 1 missing required relationship(s) |

### QA Notes

Should identify procedural and reward-pool dependencies and flag tuning-heavy progression/synergy risk.

## Strategy Fog/Tech Concept

**Scenario ID:** `strategy_fog_tech_concept`

**Intent:** A small strategy prototype combining fog of war, tech progression, unit counters, minimap readability, and unlockable abilities.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| strategy.fog_of_war - Fog of War | strategy |
| strategy.tech_tree - Tech Tree | strategy |
| strategy.unit_counter_system - Unit Counter System | strategy |
| ui_ux.minimap - Minimap | ui_ux |
| progression.unlockable_abilities - Unlockable Abilities | progression |

### Scope Pressure

Very High overall (4.1); implementation 3.4, design 4.4, tuning 4.6, content 3.6, risks network/save/UI 4/5/5.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| ability_database | 1 | progression.unlockable_abilities |
| ability_grants | 1 | progression.unlockable_abilities |
| accessibility_settings | 1 | ui_ux.minimap |
| balance_testing | 1 | strategy.unit_counter_system |
| combat_resolution | 1 | strategy.unit_counter_system |
| damage_modifiers | 1 | strategy.unit_counter_system |
| fog_of_war_or_reveal_state | 1 | ui_ux.minimap |
| icon_filtering | 1 | ui_ux.minimap |
| map_data | 1 | ui_ux.minimap |
| map_grid | 1 | strategy.fog_of_war |

### Conflict Warnings

_None._

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Support option | camera.top_down_camera | supports | medium | strategy.fog_of_war | Top-down cameras use fog cells to constrain visible tactical information. |
| Support option | progression.skill_tree | supports | medium | progression.unlockable_abilities | Unlockable abilities often need prerequisite graphs, refund rules, and migration-safe save data similar to skill trees. |
| Support option | ui_ux.damage_numbers | supports | medium | strategy.unit_counter_system | Readable damage feedback helps players learn unit counter relationships from combat outcomes. |
| Support option | ui_ux.quest_marker | supports | medium | ui_ux.minimap | Quest markers can project onto the minimap with distance, filtering, and stale-state rules. |
| Support option | ui_ux.tutorial_prompt | supports | weak | strategy.tech_tree | Tutorial prompts can explain prerequisite chains and unlock consequences without overwhelming new players. |
| Contextual link | economy.resource_conversion | consumes | medium | strategy.tech_tree | Research often spends converted resources or strategic materials through committed transactions. |
| Contextual link | platforming.double_jump | unlocks | weak | progression.unlockable_abilities | Movement abilities such as double jump can be granted through progression gates. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| ui_ux.quest_marker | ui_ux | Support option: ui_ux.minimap supports ui_ux.quest_marker.; ui_ux.quest_marker enhances selected ui_ux.minimap.; ui_ux.minimap lists it in related_mechanics. |
| platforming.double_jump | platforming | Contextual link: progression.unlockable_abilities unlocks platforming.double_jump.; platforming.double_jump unlocks selected progression.unlockable_abilities.; progression.unlockable_abilities lists it in combines_well_with. |
| camera.top_down_camera | camera | Support option: strategy.fog_of_war supports camera.top_down_camera.; camera.top_down_camera supports selected strategy.fog_of_war. |
| progression.skill_tree | progression | Support option: progression.unlockable_abilities supports progression.skill_tree.; strategy.tech_tree lists it in related_mechanics.; progression.unlockable_abilities lists it in related_mechanics. |
| ui_ux.tutorial_prompt | ui_ux | Support option: strategy.tech_tree supports ui_ux.tutorial_prompt.; progression.unlockable_abilities lists it in combines_well_with. |
| economy.resource_conversion | economy | Contextual link: strategy.tech_tree consumes economy.resource_conversion.; strategy.tech_tree lists it in related_mechanics. |
| ui_ux.damage_numbers | ui_ux | Support option: strategy.unit_counter_system supports ui_ux.damage_numbers. |
| strategy.territory_control | strategy | strategy.fog_of_war lists it in combines_well_with.; strategy.tech_tree lists it in related_mechanics.; strategy.unit_counter_system lists it in combines_well_with. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| strategy.unit_counter_system | support | very high tuning cost |
| ui_ux.minimap | support | very high implementation risk |

### QA Notes

Should connect visibility, progression, UI, and counter-system support without inventing conflicts.

## Horror Stealth Loop

**Scenario ID:** `horror_stealth_loop`

**Intent:** A stealth-horror loop with sanity, limited light, hiding, AI patrol, line-of-sight detection, and safe-room relief.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| horror.sanity_meter - Sanity Meter | horror |
| horror.light_resource - Light Resource | horror |
| horror.hiding - Hiding | horror |
| ai.patrol - Patrol | ai |
| ai.line_of_sight_detection - Line-of-Sight Detection | ai |
| horror.safe_room - Safe Room | horror |

### Scope Pressure

High overall (3.9); implementation 3.2, design 4.3, tuning 4.7, content 3.0, risks network/save/UI 3/5/4.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| ai_perception | 2 | horror.hiding, horror.light_resource |
| debug_visualization | 2 | ai.line_of_sight_detection, ai.patrol |
| perception_system | 2 | ai.line_of_sight_detection, ai.patrol |
| ai_blackboard | 1 | ai.line_of_sight_detection |
| ai_boundary_rules | 1 | horror.safe_room |
| ai_state_machine | 1 | ai.patrol |
| animation_state | 1 | horror.hiding |
| audio_lighting_state | 1 | horror.safe_room |
| audio_visual_effects | 1 | horror.sanity_meter |
| camera_controller | 1 | horror.hiding |

### Conflict Warnings

_None._

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Critical dependency | horror.limited_visibility | requires | strong | horror.light_resource | Light resource rules control visibility radius, readable space, and player risk in darkness. |
| Critical dependency | horror.monster_patrol | requires | strong | horror.hiding | Hiding depends on monster patrol and search states that decide whether the spot is inspected. |
| Useful support | stealth.visibility_meter | supports | strong | ai.line_of_sight_detection | Visibility values can weight sight detection by light level, stance, distance, and motion. |
| Support option | accessibility.assist_mode | supports | medium | horror.sanity_meter | Intensity settings can limit sanity effects that distort perception or readability. |
| Support option | ai.investigate_noise | supports | medium | ai.patrol | Noise investigation gives patrol agents a believable interruption and return path after hearing events. |
| Support option | stealth.visibility_meter | supports | medium | horror.hiding | Visibility state can determine whether entering or leaving a hiding spot is detected. |
| Support option | survival.inventory_limit | balances | medium | horror.light_resource | Inventory limits can make spare batteries or fuel a meaningful resource choice. |
| Support option | ui_ux.checkpoint_notification | supports | medium | horror.safe_room | Safe rooms often pair with save or checkpoint feedback so players understand recovery state. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| stealth.visibility_meter | stealth | Useful support: ai.line_of_sight_detection supports stealth.visibility_meter.; Support option: horror.hiding supports stealth.visibility_meter.; stealth.visibility_meter supports selected ai.line_of_sight_detection. |
| horror.monster_patrol | horror | Critical dependency: horror.hiding requires horror.monster_patrol.; horror.monster_patrol extends selected ai.patrol.; horror.sanity_meter lists it in combines_well_with. |
| horror.limited_visibility | horror | Critical dependency: horror.light_resource requires horror.limited_visibility.; Contextual link: horror.sanity_meter enhances horror.limited_visibility.; horror.sanity_meter lists it in related_mechanics. |
| ai.chase | ai | Contextual link: ai.line_of_sight_detection feeds ai.chase.; ai.chase requires selected ai.line_of_sight_detection.; ai.chase extends selected ai.patrol. |
| ai.investigate_noise | ai | Support option: ai.patrol supports ai.investigate_noise.; ai.investigate_noise enhances selected ai.patrol.; horror.hiding lists it in combines_well_with. |
| stealth.alert_state | stealth | Contextual link: ai.patrol feeds stealth.alert_state.; stealth.alert_state requires selected ai.line_of_sight_detection. |
| ui_ux.checkpoint_notification | ui_ux | Support option: horror.safe_room supports ui_ux.checkpoint_notification.; horror.safe_room lists it in related_mechanics. |
| survival.inventory_limit | survival | Support option: horror.light_resource balances survival.inventory_limit.; horror.light_resource lists it in related_mechanics.; horror.safe_room lists it in related_mechanics. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| ai.line_of_sight_detection | support | very high tuning cost |
| horror.safe_room | support | very high implementation risk |

### QA Notes

Should keep suggestions focused on horror, AI, and stealth readability rather than unrelated economy/progression systems.

## Crafting Economy Progression

**Scenario ID:** `crafting_economy_progression`

**Intent:** A crafting-heavy loop with recipes, queued production, material wallets, shop access, crafting unlocks, and inventory grid UX.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| crafting.recipe_crafting - Recipe Crafting | crafting |
| crafting.crafting_queue - Crafting Queue | crafting |
| economy.crafting_materials - Crafting Materials | economy |
| economy.shop - Shop | economy |
| progression.crafting_unlocks - Crafting Unlocks | progression |
| ui_ux.inventory_grid - Inventory Grid | ui_ux |

### Scope Pressure

High overall (4.0); implementation 3.6, design 3.4, tuning 4.4, content 3.8, risks network/save/UI 4/5/5.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| inventory_system | 3 | crafting.crafting_queue, crafting.recipe_crafting, ui_ux.inventory_grid |
| recipe_database | 3 | crafting.recipe_crafting, economy.crafting_materials, progression.crafting_unlocks |
| crafting_station_registry | 1 | crafting.crafting_queue |
| crafting_station_state | 1 | progression.crafting_unlocks |
| crafting_transactions | 1 | economy.crafting_materials |
| currency_wallet | 1 | economy.shop |
| input_navigation | 1 | ui_ux.inventory_grid |
| item_database | 1 | ui_ux.inventory_grid |
| item_grants | 1 | economy.shop |
| item_instance_registry | 1 | crafting.recipe_crafting |

### Conflict Warnings

_None._

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Useful support | economy.trading | supports | strong | ui_ux.inventory_grid | Trading uses inventory selection, item locks, and stack splitting before escrow commits. |
| Support option | crafting.workbench | supports | medium | crafting.crafting_queue | Workbench stations can provide queue slots, station tier requirements, and completion access rules. |
| Support option | crafting.workbench | supports | medium | progression.crafting_unlocks | Workbench tiers can gate which unlocked recipes are currently craftable at a station. |
| Contextual link | economy.coins | consumes | strong | economy.shop | Shop purchase transactions spend wallet currency before granting stock or item instances. |
| Contextual link | progression.experience_points | consumes | weak | progression.crafting_unlocks | Experience or level milestones can provide the progression state that unlocks new recipes. |
| Contextual link | economy.dynamic_pricing | enhances | medium | economy.shop | Dynamic pricing lets shop offers react to stock, reputation, scarcity, or market region rules. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| crafting.workbench | crafting | Support option: crafting.crafting_queue supports crafting.workbench.; Support option: progression.crafting_unlocks supports crafting.workbench.; crafting.workbench supports selected crafting.recipe_crafting. |
| economy.resource_conversion | economy | economy.resource_conversion consumes selected economy.crafting_materials.; economy.resource_conversion supports selected crafting.recipe_crafting.; economy.crafting_materials lists it in related_mechanics. |
| economy.coins | economy | Contextual link: economy.shop consumes economy.coins.; economy.coins feeds selected economy.shop.; economy.shop lists it in related_mechanics. |
| economy.dynamic_pricing | economy | Contextual link: economy.shop enhances economy.dynamic_pricing.; economy.dynamic_pricing supports selected economy.shop.; economy.shop lists it in related_mechanics. |
| economy.trading | economy | Useful support: ui_ux.inventory_grid supports economy.trading.; economy.shop lists it in related_mechanics. |
| progression.experience_points | progression | Contextual link: progression.crafting_unlocks consumes progression.experience_points. |
| survival.durability | survival | survival.durability supports selected ui_ux.inventory_grid.; economy.crafting_materials lists it in combines_well_with. |
| crafting.ingredient_quality | crafting | crafting.ingredient_quality enhances selected crafting.recipe_crafting.; crafting.recipe_crafting lists it in related_mechanics. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| crafting.recipe_crafting | support | very high tuning cost, very high implementation risk |
| ui_ux.inventory_grid | support | very high tuning cost, very high implementation risk |
| crafting.crafting_queue | support | very high implementation risk |
| progression.crafting_unlocks | support | very high implementation risk |

### QA Notes

Should show inventory, material transaction, UI, and save-load pressure without presenting the concept as conflict-heavy.

## Physics Puzzle Room

**Scenario ID:** `physics_puzzle_room`

**Intent:** A small puzzle room using pressure plates, keys, push-pull physics, one-way platforms, and interaction prompts.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| puzzle.pressure_plate - Pressure Plate | puzzle |
| puzzle.key_and_lock - Key And Lock | puzzle |
| physics.physics_push_pull - Physics Push Pull | physics |
| physics.one_way_platform - One-Way Platform | physics |
| ui_ux.interaction_prompt - Interaction Prompt | ui_ux |

### Scope Pressure

High overall (3.7); implementation 3.2, design 3.4, tuning 4.2, content 2.8, risks network/save/UI 5/4/5.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| character_controller | 2 | physics.one_way_platform, physics.physics_push_pull |
| interaction_system | 2 | physics.physics_push_pull, puzzle.key_and_lock |
| puzzle_state_store | 2 | puzzle.key_and_lock, puzzle.pressure_plate |
| candidate_priority | 1 | ui_ux.interaction_prompt |
| collision_detection | 1 | physics.physics_push_pull |
| collision_filtering | 1 | physics.one_way_platform |
| constraint_solver | 1 | physics.physics_push_pull |
| debug_visualization | 1 | puzzle.pressure_plate |
| input_buffer | 1 | physics.one_way_platform |
| input_glyphs | 1 | ui_ux.interaction_prompt |

### Conflict Warnings

_None._

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Critical dependency | platforming.drop_through_platform | requires | strong | physics.one_way_platform | Drop-through platforms depend on one-way collision policies and temporary collision-layer overrides. |
| Critical dependency | procedural_generation.room_connection_graph | requires | strong | puzzle.key_and_lock | Procedural key-lock layouts need graph validation so keys appear before required locks. |
| Critical dependency | ui_ux.accessibility_remap_controls | requires | strong | ui_ux.interaction_prompt | Prompts need remapped input glyphs so displayed actions match the active binding profile. |
| Useful support | puzzle.sliding_block | supports | strong | physics.physics_push_pull | Push and pull physics gives sliding-block puzzles stable object movement and blocked-path resolution. |
| Useful support | traversal.vehicle_mount | supports | strong | ui_ux.interaction_prompt | Interaction prompts identify the selected vehicle, seat, and input action before mounting begins. |
| Support option | platforming.coyote_time | supports | weak | physics.one_way_platform | Coyote windows can smooth jumps after leaving one-way platform contact without changing collision rules. |
| Contextual link | puzzle.timed_door | feeds | medium | puzzle.pressure_plate | A pressure plate can open or power a timed door while weight or presence remains valid. |
| Contextual link | multiplayer.online_coop | enhances | weak | puzzle.pressure_plate | Co-op players can split roles by holding plates while teammates move through opened paths. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| puzzle.sliding_block | puzzle | Useful support: physics.physics_push_pull supports puzzle.sliding_block.; puzzle.sliding_block requires selected physics.physics_push_pull.; puzzle.sliding_block enhances selected puzzle.pressure_plate. |
| ui_ux.accessibility_remap_controls | ui_ux | Critical dependency: ui_ux.interaction_prompt requires ui_ux.accessibility_remap_controls.; ui_ux.accessibility_remap_controls supports selected ui_ux.interaction_prompt. |
| procedural_generation.room_connection_graph | procedural_generation | Critical dependency: puzzle.key_and_lock requires procedural_generation.room_connection_graph.; procedural_generation.room_connection_graph supports selected puzzle.key_and_lock. |
| puzzle.timed_door | puzzle | Contextual link: puzzle.pressure_plate feeds puzzle.timed_door.; puzzle.timed_door supports selected puzzle.pressure_plate.; puzzle.pressure_plate lists it in combines_well_with. |
| traversal.vehicle_mount | traversal | Useful support: ui_ux.interaction_prompt supports traversal.vehicle_mount.; traversal.vehicle_mount requires selected ui_ux.interaction_prompt. |
| platforming.drop_through_platform | platforming | Critical dependency: physics.one_way_platform requires platforming.drop_through_platform.; physics.one_way_platform lists it in related_mechanics. |
| platforming.coyote_time | platforming | Support option: physics.one_way_platform supports platforming.coyote_time.; physics.one_way_platform lists it in related_mechanics. |
| crafting.workbench | crafting | crafting.workbench requires selected ui_ux.interaction_prompt.; ui_ux.interaction_prompt lists it in combines_well_with. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| ui_ux.interaction_prompt | support | 1 missing required relationship(s), very high implementation risk |
| physics.one_way_platform | support | 1 missing required relationship(s) |
| physics.physics_push_pull | support | very high implementation risk |

### QA Notes

Should treat the room as a medium-to-high puzzle/physics implementation, not as a hard-conflict concept.

## Vehicle Upgrade Arcade

**Scenario ID:** `vehicle_upgrade_arcade`

**Intent:** An arcade vehicle concept with boost, upgradeable parts, suspension handling, coins, an upgrade shop, and readable damage feedback.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| vehicles.vehicle_boost - Vehicle Boost | vehicles |
| vehicles.upgradeable_vehicle - Upgradeable Vehicle | vehicles |
| vehicles.suspension_physics - Suspension Physics | vehicles |
| economy.coins - Coins | economy |
| progression.upgrade_shop - Upgrade Shop | progression |
| ui_ux.damage_numbers - Damage Numbers | ui_ux |

### Scope Pressure

High overall (3.4); implementation 2.5, design 3.5, tuning 4.5, content 2.5, risks network/save/UI 3/5/4.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| camera_controller | 2 | vehicles.suspension_physics, vehicles.vehicle_boost |
| currency_wallet | 2 | economy.coins, progression.upgrade_shop |
| purchase_transactions | 2 | economy.coins, progression.upgrade_shop |
| save_state | 2 | economy.coins, progression.upgrade_shop |
| vehicle_controller | 2 | vehicles.suspension_physics, vehicles.vehicle_boost |
| accessibility_settings | 1 | ui_ux.damage_numbers |
| audio_system | 1 | vehicles.vehicle_boost |
| boost_meter_system | 1 | vehicles.vehicle_boost |
| combat_metadata | 1 | ui_ux.damage_numbers |
| damage_events | 1 | ui_ux.damage_numbers |

### Conflict Warnings

_None._

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Useful support | economy.idle_income | balances | strong | progression.upgrade_shop | Upgrade costs can absorb recurring idle income so passive earnings do not inflate without sinks. |
| Support option | economy.dynamic_pricing | supports | medium | economy.coins | Stable currency units make price modifiers and sellback ratios easier to audit and display. |
| Contextual link | economy.shop | feeds | strong | economy.coins | Coins provide the wallet balance spent by shop purchase transactions. |
| Contextual link | progression.unlockable_abilities | unlocks | medium | progression.upgrade_shop | Upgrade shops can grant abilities through purchase rather than level or story gates. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| economy.idle_income | economy | Useful support: progression.upgrade_shop balances economy.idle_income.; economy.idle_income feeds selected economy.coins.; economy.idle_income feeds selected progression.upgrade_shop. |
| economy.shop | economy | Contextual link: economy.coins feeds economy.shop.; economy.shop consumes selected economy.coins.; vehicles.upgradeable_vehicle lists it in combines_well_with. |
| economy.dynamic_pricing | economy | Support option: economy.coins supports economy.dynamic_pricing.; economy.coins lists it in related_mechanics.; progression.upgrade_shop lists it in related_mechanics. |
| vehicles.vehicle_damage | vehicles | vehicles.vehicle_damage supports selected ui_ux.damage_numbers.; vehicles.vehicle_boost lists it in combines_well_with.; vehicles.upgradeable_vehicle lists it in related_mechanics. |
| progression.unlockable_abilities | progression | Contextual link: progression.upgrade_shop unlocks progression.unlockable_abilities.; progression.upgrade_shop lists it in related_mechanics. |
| progression.respec | progression | progression.respec consumes selected economy.coins.; economy.coins lists it in combines_well_with. |
| combat.area_of_effect_attack | combat | combat.area_of_effect_attack supports selected ui_ux.damage_numbers.; ui_ux.damage_numbers lists it in related_mechanics. |
| ui_ux.inventory_grid | ui_ux | vehicles.upgradeable_vehicle lists it in combines_well_with.; economy.coins lists it in combines_well_with. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| progression.upgrade_shop | support | very high tuning cost, very high implementation risk |

### QA Notes

Should connect vehicle tuning with economy/progression support and not surface unrelated hard conflicts.

## Accessibility-heavy Platformer

**Scenario ID:** `accessibility_heavy_platformer`

**Intent:** A precision-platformer prototype that deliberately includes input forgiveness and player-facing accessibility settings.

**Expectation result:** Passed

### Selected Mechanics

| Mechanic | Category |
| --- | --- |
| platforming.coyote_time - Coyote Time | platforming |
| platforming.jump_buffering - Jump Buffering | platforming |
| accessibility.assist_mode - Assist Mode | accessibility |
| accessibility.toggle_hold_option - Toggle/Hold Option | accessibility |
| accessibility.adjustable_difficulty - Adjustable Difficulty | accessibility |
| movement.air_dash - Air Dash | movement |

### Scope Pressure

Medium overall (3.0); implementation 2.5, design 3.0, tuning 3.8, content 1.5, risks network/save/UI 3/4/5.

### Required Systems Top 10

| System | Count | Mechanics |
| --- | --- | --- |
| input_buffer | 3 | movement.air_dash, platforming.coyote_time, platforming.jump_buffering |
| profile_persistence | 3 | accessibility.adjustable_difficulty, accessibility.assist_mode, accessibility.toggle_hold_option |
| settings_menu | 3 | accessibility.adjustable_difficulty, accessibility.assist_mode, accessibility.toggle_hold_option |
| accessibility_profile | 2 | accessibility.adjustable_difficulty, accessibility.assist_mode |
| ground_detection | 2 | platforming.coyote_time, platforming.jump_buffering |
| jump_state | 2 | platforming.coyote_time, platforming.jump_buffering |
| air_action_counter | 1 | movement.air_dash |
| assist_feature_registry | 1 | accessibility.assist_mode |
| character_controller | 1 | movement.air_dash |
| collision_detection | 1 | movement.air_dash |

### Conflict Warnings

| Severity | Source | Target | Reason |
| --- | --- | --- | --- |
| Soft conflict | movement.air_dash | platforming.coyote_time | High-speed air dash can make ground-leave grace windows feel inconsistent unless input priority is explicit. |

### Missing Dependency / Support Suggestions

| Priority | Target | Type | Strength | Source | Reason |
| --- | --- | --- | --- | --- | --- |
| Useful support | platforming.variable_jump_height | supports | strong | platforming.coyote_time | Coyote time makes variable jumps feel fair by accepting jump input shortly after ground contact is lost. |
| Useful support | platforming.variable_jump_height | supports | strong | platforming.jump_buffering | Buffered jump starts must feed the same press and release timestamps used by variable jump height. |
| Useful support | ui_ux.accessibility_remap_controls | supports | strong | accessibility.toggle_hold_option | Toggle and hold preferences should live beside remapping so each input action has a consistent control profile. |
| Support option | platforming.double_jump | supports | medium | movement.air_dash | Air dash pairs with double jump when aerial verbs need separate counters and reset rules. |
| Support option | platforming.double_jump | supports | medium | platforming.jump_buffering | Buffered jumps need shared jump-consumption priority so landing, air-jump, and wall-jump states do not spend the wrong jump. |
| Support option | traversal.vehicle_mount | supports | medium | accessibility.toggle_hold_option | Mount, interact, and channel actions need toggle or hold options for players who cannot sustain long presses. |
| Support option | ui_ux.tutorial_prompt | supports | medium | accessibility.adjustable_difficulty | Tutorial and settings prompts can explain difficulty changes without forcing players to infer hidden rule changes. |
| Contextual link | movement.dash | extends | strong | movement.air_dash | Air dash reuses dash displacement and cooldown rules while applying them during airborne movement state. |

### Related Additions

| Mechanic | Category | Reasons |
| --- | --- | --- |
| platforming.variable_jump_height | platforming | Useful support: platforming.coyote_time supports platforming.variable_jump_height.; Useful support: platforming.jump_buffering supports platforming.variable_jump_height.; platforming.variable_jump_height supports selected platforming.coyote_time. |
| ui_ux.tutorial_prompt | ui_ux | Support option: accessibility.adjustable_difficulty supports ui_ux.tutorial_prompt.; Support option: platforming.coyote_time supports ui_ux.tutorial_prompt.; ui_ux.tutorial_prompt supports selected platforming.coyote_time. |
| platforming.double_jump | platforming | Support option: movement.air_dash supports platforming.double_jump.; Support option: platforming.jump_buffering supports platforming.double_jump.; platforming.coyote_time lists it in related_mechanics. |
| movement.dash | movement | Contextual link: movement.air_dash extends movement.dash.; movement.dash unlocks selected movement.air_dash.; platforming.coyote_time lists it in combines_well_with. |
| ui_ux.accessibility_remap_controls | ui_ux | Useful support: accessibility.toggle_hold_option supports ui_ux.accessibility_remap_controls.; ui_ux.accessibility_remap_controls supports selected accessibility.toggle_hold_option.; accessibility.toggle_hold_option lists it in related_mechanics. |
| combat.aim_down_sights | combat | Contextual link: accessibility.toggle_hold_option enhances combat.aim_down_sights.; combat.aim_down_sights supports selected accessibility.toggle_hold_option.; accessibility.toggle_hold_option lists it in related_mechanics. |
| platforming.wall_jump | platforming | platforming.wall_jump supports selected platforming.coyote_time.; platforming.coyote_time lists it in combines_well_with.; platforming.jump_buffering lists it in related_mechanics. |
| traversal.vehicle_mount | traversal | Support option: accessibility.toggle_hold_option supports traversal.vehicle_mount. |

### MVP Trim Suggestions

| Mechanic | Role | Reasons |
| --- | --- | --- |
| accessibility.assist_mode | support | very high tuning cost, very high implementation risk |
| accessibility.adjustable_difficulty | support | very high implementation risk |

### QA Notes

Should recognize accessibility mechanics as intentional support, not disposable filler.

