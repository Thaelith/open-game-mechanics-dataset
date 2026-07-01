# Mechanic Boundary, Prerequisite, And Failure Mode Audit v0.3

Date: 2026-07-01

This is an audit and review-planning report. It does not change mechanic JSON, IDs, schema, site behavior, Mixer logic, status, or source confidence.

## Summary

- Mechanics scanned: 223.
- Source scanned: `data/**/*.json`.
- Candidate boundary groups found: 22.
- High-priority groups: 4.
- Medium-priority groups: 12.
- Low-priority groups: 6.
- Mechanic JSON changed in this pass: no.

The dataset is not merely a list of mechanic names: every scanned mechanic currently has required systems, parameters, edge cases, and common bugs. The remaining risk is different: some groups can still look like duplicated mechanics, presentation variants, resource variants, or broad genre labels unless their prerequisites, state assumptions, and failure modes stay explicit.

Severity in this report means review priority and public-perception risk. It does not mean the entries are invalid.

## Why This Audit Exists

Public feedback correctly pointed out that entries such as `movement.run` and `movement.sprint` can look like the same mechanic if the dataset does not clearly explain why each entry deserves its own ID.

Mechanic names alone are not the dataset's value.

The useful value is:

- What the mechanic needs to work.
- What state it owns or depends on.
- What input, timing, resource, save/load, networking, and UI assumptions it makes.
- What breaks during prototyping.
- Which edge cases and common bugs developers should test.
- Why the entry is a mechanic rather than a variant or parameter.

Entries that differ only by a number, speed multiplier, resource name, or presentation style should usually be variants or parameters unless they have distinct implementation risks, design purpose, edge cases, common bugs, or relationship behavior.

This audit responds to that criticism directly. It does not defend every current boundary as final; it identifies where future v0.3 hardening should prove or revise those boundaries.

## Candidate Group Table

| Group | Mechanics Involved | Issue Type | Severity | Recommended Action | Reason |
| --- | --- | --- | --- | --- | --- |
| Locomotion speed modes | `movement.walk`, `movement.run`, `movement.sprint` | possible parameter, possible variant, unclear boundary | high | keep separate but clarify; data hardening | These can look like speed values unless walk, run, and sprint each document unique control, stamina, animation, AI noise, accessibility, and failure-mode concerns. |
| Survival needs and resource meters | `survival.health`, `survival.stamina`, `survival.hunger`, `survival.thirst`, `survival.temperature`, `survival.oxygen`, `survival.day_night_cycle` | possible resource variant, weak boundary risk | high | keep separate but clarify; data hardening | These can look like meter-name variants unless each entry clearly owns different decay sources, recovery rules, UI warnings, save/load behavior, and failure states. |
| Procedural level and run generation | `procedural_generation.procedural_level_rooms`, `procedural_generation.room_connection_graph`, `procedural_generation.biome_generation`, `roguelike.procedural_floor` | possible duplicate, possible overbroad mechanic | high | keep separate but clarify; relationship and prerequisite review | Room layout, graph topology, biome placement, and roguelike floor generation overlap. The boundary should stay tied to seed ownership, validation passes, critical path rules, and run-state integration. |
| UI feedback widgets | `ui_ux.cooldown_indicator`, `ui_ux.hit_marker`, `ui_ux.damage_numbers`, `ui_ux.checkpoint_notification`, `ui_ux.interaction_prompt`, `ui_ux.quest_marker` | UI presentation variant, weak boundary risk | high | keep separate but clarify; data hardening | These can look like visual skins unless each entry names authoritative state, stale UI failure modes, accessibility constraints, localization, input focus, and gameplay-state projection. |
| Burst and commitment movement | `movement.dash`, `movement.air_dash`, `movement.dodge_roll`, `movement.slide` | possible variant family | medium | keep separate but clarify | These are related displacement mechanics, but current entries have different state, collision, recovery, i-frame, stamina, and airborne rules. Future review should prevent duplicated edge cases. |
| Stance and collision-profile movement | `movement.crouch`, `movement.prone` | possible variant | medium | keep separate but clarify | Both are stance/capsule changes. Separate entries are justified only if prone keeps distinct camera, collision, aiming, stealth, and recovery failure modes. |
| Ranged combat loop | `combat.ranged_attack`, `combat.reload`, `combat.charged_attack`, `combat.aim_down_sights` | possible variant, unclear dependency | medium | data hardening; relationship review | Reload and charge can look like parameters of ranged attack unless transaction timing, commit/cancel, input holds, ammo authority, and UI prediction are explicit. |
| Defensive combat states | `combat.block`, `combat.parry`, `combat.shield`, `combat.guard_break`, `combat.invincibility_frames`, `movement.dodge_roll` | possible variant, relationship ambiguity | medium | keep separate but clarify; relationship cleanup later | These share damage-resolution concerns but differ by timing, guard resources, i-frames, state priority, and resolver ownership. |
| Currency, shops, and upgrades | `economy.coins`, `economy.shop`, `economy.dynamic_pricing`, `economy.trading`, `progression.upgrade_shop`, `roguelike.shop_between_levels` | resource variant, possible overbroad mechanic | medium | data hardening; relationship review | These entries should stay grounded in ledger ownership, transaction idempotency, stock/restock rules, pricing, and progression gates rather than generic purchase flow. |
| Crafting and inventory production | `crafting.recipe_crafting`, `crafting.crafting_queue`, `crafting.workbench`, `crafting.ingredient_quality`, `economy.crafting_materials`, `survival.inventory_limit` | possible variant, unclear prerequisite | medium | keep separate but clarify | Recipe, queue, station, material, quality, and capacity concerns overlap but can justify separate entries through transaction, reservation, refund, timing, station, and storage failure modes. |
| Progression unlock structures | `progression.experience_points`, `progression.level_up`, `progression.skill_tree`, `progression.unlockable_abilities`, `progression.achievement_system`, `progression.meta_progression`, `progression.prestige_reset` | possible overbroad mechanic, possible variant | medium | data hardening | These should make clear whether they own numeric accumulation, unlock graph, account persistence, reward grants, reset policy, or achievement telemetry. |
| Camera modes and presentation | `camera.first_person_camera`, `camera.third_person_camera`, `camera.top_down_camera`, `camera.smooth_follow_camera`, `camera.camera_zoom`, `camera.camera_lock_on` | UI/presentation variant, unclear boundary | medium | keep separate but clarify | Camera entries can look like viewpoint variants unless each names target ownership, occlusion/collision, input mapping, comfort settings, and multiplayer/spectator assumptions. |
| Time-state mechanics | `time.cooldown_time`, `time.slow_motion`, `time.time_freeze`, `time.time_rewind`, `time.day_night_schedule`, `time.timed_challenge`, `time.rhythm_timing` | possible overbroad mechanic, timing-model overlap | medium | keep separate; architecture review for high-risk entries | These share clocks and pause behavior but differ sharply in state ownership, rollback, save/load, restore order, and UX. |
| Physics and traversal environment movement | `physics.moving_platform`, `physics.physics_push_pull`, `physics.low_gravity_zone`, `physics.wind_force`, `physics.gravity`, `physics.one_way_platform`, `traversal.grappling_hook`, `traversal.rope_swing`, `platforming.ledge_grab`, `platforming.ledge_climb` | possible variant family, weak relationship coverage for some entries | medium | data hardening; relationship review | These share collision/velocity/contact issues. Separate entries remain useful only if each keeps distinct constraints, authority, and restore/failure modes. |
| AI and stealth perception loop | `ai.patrol`, `ai.chase`, `ai.line_of_sight_detection`, `ai.investigate_noise`, `stealth.alert_state`, `stealth.noise_meter`, `stealth.visibility_meter`, `stealth.last_known_position_search` | possible overbroad mechanic, relationship coverage gap | medium | keep separate but clarify | These are closely linked perception-state mechanics. Boundaries should be defined by who owns blackboard state, event priority, search state, debug reason traces, and player feedback. |
| Vehicle movement controls | `vehicles.vehicle_acceleration`, `vehicles.vehicle_braking`, `vehicles.vehicle_boost`, `vehicles.drifting`, `vehicles.suspension_physics`, `vehicles.fuel`, `vehicles.vehicle_damage`, `vehicles.upgradeable_vehicle` | possible parameter or variant family | medium | data hardening | Acceleration, braking, boost, and drifting can look like input/physics parameters unless they name different traction, fuel, damage, upgrade, and handling failure modes. |
| Puzzle triggers and locks | `puzzle.key_and_lock`, `puzzle.lever_switch`, `puzzle.pressure_plate`, `puzzle.timed_door`, `puzzle.physics_weight_puzzle`, `puzzle.sliding_block`, `puzzle.color_matching` | possible genre variant | low | no immediate change; future taxonomy sampling | These are common puzzle primitives. Current separation is reasonable when each owns unique object state, activation rules, reset behavior, and authoring failure modes. |
| Roguelike run modifiers and rewards | `roguelike.random_powerups`, `roguelike.pick_one_upgrade_choice`, `roguelike.relic_synergy`, `roguelike.curse_modifier`, `roguelike.risk_reward_room`, `roguelike.permadeath`, `roguelike.run_based_progression` | possible genre variant | low | no immediate change; future scenario QA | These are genre-specific but distinct in run-state, reward selection, failure persistence, and synergy tuning. |
| Horror pressure mechanics | `horror.sanity_meter`, `horror.light_resource`, `horror.limited_visibility`, `horror.hiding`, `horror.sound_lure`, `horror.monster_patrol`, `horror.jump_scare_trigger`, `horror.safe_room` | possible overlap with stealth/survival | low | no immediate change; relationship review later | Horror entries overlap with stealth and survival but are currently justified by fear pacing, sanctuary spaces, visibility pressure, and authored scare triggers. |
| Narrative state and choice | `narrative.branching_dialogue`, `narrative.reputation_choice`, `narrative.reputation_gating`, `narrative.codex_journal`, `narrative.environmental_storytelling` | possible overbroad mechanic | low | no immediate change | These are broad narrative structures, but current boundaries map to dialogue graph, faction threshold, journal persistence, and world clue state. |
| Strategy and simulation systems | `strategy.fog_of_war`, `strategy.tech_tree`, `strategy.territory_control`, `strategy.unit_counter_system`, `simulation.needs_simulation`, `simulation.population_model`, `simulation.systemic_weather`, `simulation.traffic_flow` | possible broad-system entries | low | no immediate change; future reviewed-core sampling | These are broad systems rather than micro-mechanics, but they have distinct state and modeling concerns. |
| Accessibility settings | `accessibility.assist_mode`, `accessibility.adjustable_difficulty`, `accessibility.toggle_hold_option`, `accessibility.colorblind_modes`, `accessibility.text_scaling` | settings variant, possible parameter | low | keep separate; do not demote to polish | These can look like settings rather than mechanics, but they are important support entries with profile persistence, preview, conflict, platform, and fairness boundaries. |

## High-Priority Groups

### Locomotion Speed Modes

Mechanics: `movement.walk`, `movement.run`, `movement.sprint`.

What makes the group look weak or duplicate-like:

- The names can read like slow, normal, and fast speed values.
- `run` and `sprint` can collapse into the same mechanic in projects where sprint is only a speed multiplier.
- Current relationships such as `run consumes movement.stamina_movement` may be too broad if only sprint or high-output movement spends stamina in many games.

What would justify keeping them separate:

- `walk` documents precision input, dead-zone handling, interaction alignment, stealth/noise, camera stability, and baseline animation blend concerns.
- `run` documents default traversal, higher-speed collision, camera-relative input, slope handling, animation blend, and prediction concerns.
- `sprint` documents stamina drain, exhaustion, AI noise/perception, hold/toggle accessibility, camera/FOV effects, and level-design pacing.

Fields to harden:

- Edge cases and common bugs should be compared side by side to reduce duplication.
- Relationships should clarify whether stamina applies to run broadly or sprint specifically.
- Design notes should avoid implying these modes are universal across games.

Do not overclaim:

- Do not claim every game needs walk, run, and sprint as separate mechanics.
- Do not imply that speed modes combine linearly with every movement system.

Future migration risk:

- If future review cannot keep the failure modes distinct, consider reframing run and sprint as variants or parameters of a broader locomotion speed mode.

### Survival Needs And Resource Meters

Mechanics: `survival.health`, `survival.stamina`, `survival.hunger`, `survival.thirst`, `survival.temperature`, `survival.oxygen`, `survival.day_night_cycle`.

What makes the group look weak or duplicate-like:

- Many entries are meters with decay, warning thresholds, recovery, and failure states.
- Hunger, thirst, oxygen, and temperature can look like renamed resource bars if their sources, timers, and consequences are not explicit.

What would justify keeping them separate:

- `health` owns damage/death/recovery and combat/survival resolver state.
- `stamina` owns exertion costs, exhaustion, recovery delay, and action gating.
- `hunger` and `thirst` can differ by decay source, recovery item transactions, debuff thresholds, and pacing role.
- `temperature` depends on environment sampling, shelter, wetness, clothing, weather, and warning UI.
- `oxygen` depends on volume state, breath timers, submerged/altitude zones, and death/recovery ordering.
- `day_night_cycle` can drive survival schedules rather than act as a meter.

Fields to harden:

- Prerequisites should state clock source, decay driver, UI warning model, save/load persistence, and multiplayer authority.
- Common bugs should emphasize duplicate drain, stale warnings, wrong recovery transactions, offline progression, and checkpoint restore.

Do not overclaim:

- Do not imply every survival game needs all need meters.
- Do not treat resource names alone as separate mechanics.

Future migration risk:

- Low for core survival meters, but individual entries should continue proving distinct failure modes.

### Procedural Level And Run Generation

Mechanics: `procedural_generation.procedural_level_rooms`, `procedural_generation.room_connection_graph`, `procedural_generation.biome_generation`, `roguelike.procedural_floor`.

What makes the group look weak or duplicate-like:

- "Procedural rooms," "room graph," and "procedural floor" can sound like different names for the same generator.
- Cross-category entries can hide whether the boundary is technical generation, topology validation, biome/content placement, or roguelike run structure.

What would justify keeping them separate:

- `room_connection_graph` owns graph topology, locks, critical path, and reachability.
- `procedural_level_rooms` owns room selection, placement rules, sockets, and validation.
- `biome_generation` owns region theming, content pools, and transition rules.
- `roguelike.procedural_floor` owns run-scoped floor generation, reward pacing, shops, exits, and persistence.

Fields to harden:

- Each entry should name seed ownership, RNG stream, validation passes, retry behavior, content versioning, failure fallback, and soft-lock checks.
- Relationships should avoid making every generator suggest every other generator.

Do not overclaim:

- Do not present procedural generation as a single reusable black box.

Future migration risk:

- Medium. Some entries may eventually need clearer parent/child relationships or variant framing.

### UI Feedback Widgets

Mechanics: `ui_ux.cooldown_indicator`, `ui_ux.hit_marker`, `ui_ux.damage_numbers`, `ui_ux.checkpoint_notification`, `ui_ux.interaction_prompt`, `ui_ux.quest_marker`.

What makes the group look weak or duplicate-like:

- These can look like visual presentation elements rather than mechanics.
- Some differences are visual style unless the entry documents state ownership and desync failure modes.

What would justify keeping them separate:

- `cooldown_indicator` owns timer binding, charges, disabled state, prediction correction, and accessibility alternatives.
- `hit_marker` owns hit confirmation and authority/prediction feedback.
- `damage_numbers` owns damage event aggregation, clutter rules, critical/block/immunity flags, and display priority.
- `checkpoint_notification` owns save confirmation timing, duplicate suppression, and failure state.
- `interaction_prompt` owns target priority, input glyphs, remapping, visibility rules, and stale target clearing.
- `quest_marker` owns objective projection, fog/spoiler gating, stale markers, and localization.

Fields to harden:

- Required systems should name authoritative gameplay state source, UI binding, localization, accessibility, and platform input assumptions.
- Common bugs should emphasize stale widgets, wrong target, incorrect source-of-truth, color-only state, and delayed network correction.

Do not overclaim:

- Do not imply every UI feedback element is a mechanic. The separate ID is justified only when state sync and failure modes matter.

Future migration risk:

- Low if entries keep state and failure-mode specificity.

## Entry Quality Checklist

For every mechanic entry, future hardening should answer:

- What does this mechanic need to work?
- What state does it own or depend on?
- What input assumptions does it make?
- What gets buffered, consumed, reset, or persisted?
- What timing, resource, cooldown, or clock assumptions does it make?
- What authority owns the state in multiplayer or prediction contexts?
- What breaks if state is reset incorrectly?
- What breaks during save/load?
- What breaks during pause, cutscene, respawn, checkpoint restore, or scene transition?
- What breaks in multiplayer, prediction, rollback, or reconnect flows when relevant?
- What UI feedback can desync from authoritative state?
- What accessibility, remapping, hold/toggle, color, motion, audio, or control-mode assumptions matter?
- Why is this a mechanic and not just a variant or parameter?

## Recommended Hardening Order

### Batch A - Locomotion Speed Modes

- `movement.walk`
- `movement.run`
- `movement.sprint`

Goal: decide whether the current separate entries can clearly earn their IDs through distinct prerequisites, assumptions, edge cases, and failure modes.

### Batch B - Survival Meters

- `survival.health`
- `survival.stamina`
- `survival.hunger`
- `survival.thirst`
- `survival.temperature`
- `survival.oxygen`

Goal: keep each resource entry distinct through different clocks, recovery transactions, UI warnings, persistence, failure states, and multiplayer authority.

### Batch C - UI Feedback Widgets

- `ui_ux.cooldown_indicator`
- `ui_ux.hit_marker`
- `ui_ux.damage_numbers`
- `ui_ux.interaction_prompt`
- `ui_ux.quest_marker`

Goal: prove each UI entry is stateful planning data, not just a presentation variant.

### Batch D - Procedural Generation Boundaries

- `procedural_generation.procedural_level_rooms`
- `procedural_generation.room_connection_graph`
- `procedural_generation.biome_generation`
- `roguelike.procedural_floor`

Goal: clarify seed ownership, validation responsibilities, fallback behavior, and run-vs-generator boundaries.

### Batch E - Movement Commitment Family

- `movement.dash`
- `movement.air_dash`
- `movement.dodge_roll`
- `movement.slide`
- `movement.crouch`
- `movement.prone`

Goal: reduce duplicated movement edge cases while preserving true differences in collision, animation, stamina, invulnerability, and stance state.

## Final Assessment

`movement.walk` / `movement.run` / `movement.sprint` remains the top boundary issue because it is the easiest public example of a mechanic/variant/parameter ambiguity.

It is not the only issue. The broader dataset should now treat boundary clarity, prerequisites, state/input assumptions, and failure modes as core v0.3 review signals. A mechanic entry should not earn trust because it has a familiar name; it should earn trust because it helps a developer understand what needs to exist, what can break, and why the entry is not just a number, variant, or UI skin.
