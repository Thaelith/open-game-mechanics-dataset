# Locomotion Taxonomy Review v0.3

This report applies the v0.3 taxonomy criteria to locomotion-related movement entries.

It is a documentation and review-planning artifact only. It does not change mechanic JSON, IDs, schema, status, or source confidence.

## Summary

- Expected entries found: all requested movement files exist.
- Main question: whether `movement.walk`, `movement.run`, and `movement.sprint` are distinct mechanics or speed-mode variants.
- Conservative v0.3 recommendation: use Model C, keep separate but reframe boundaries.
- Batch A data hardening completed on 2026-07-01 for `movement.walk`, `movement.run`, and `movement.sprint`.
- No merge, rename, schema, status, or source-confidence change was made.

## movement.walk

Current representation: separate `movement` mechanic with subcategory `ground_locomotion`.

Current signals:

- Player-facing behavior: low-commitment ground positioning for precision, exploration, stealth setup, and interaction alignment.
- State/rules: uses input processing, ground detection, animation blend tree, camera follow, slope handling, and dead-zone policy.
- Parameters: walk pace, acceleration/deceleration curves, turn rate, slope limit, camera profile.
- Edge cases/common bugs: analog stick drift, slope transition ground state, input priority with aim/dialogue/prompts, fixed-step movement, analog magnitude normalization, foot skating.
- Relationships: supports `movement.run`, balances `movement.stamina_movement`, supports `camera.smooth_follow_camera`.

Assessment: mechanic, but close to baseline locomotion mode.

Recommendation: keep for now. It is justified if reviewed as the baseline precision/control state rather than simply "slow speed." Future writing should emphasize dead-zone handling, interaction alignment, stealth/noise implications, camera stability, and animation blend thresholds.

Immediate data change: none.

Future follow-up: compare its edge cases against `movement.run`; if most unique precision, interaction, and dead-zone concerns are not useful enough, consider reframing it as a locomotion-speed-mode variant.

## movement.run

Current representation: separate `movement` mechanic with subcategory `ground_locomotion`.

Current signals:

- Player-facing behavior: default faster ground movement for ordinary navigation through arenas, hubs, and exploration spaces.
- State/rules: adds network prediction concerns and higher-speed collision/camera behavior compared with walk.
- Parameters: run pace, acceleration/deceleration curves, turn rate, slope limit, prediction window.
- Edge cases/common bugs: traversal-state transitions, reversal near thin collision, camera-relative input changes, collision sweep bypass, slope animation mismatch, surface modifier stacking.
- Relationships: extends `movement.walk`, consumes `movement.stamina_movement`, enhances `camera.dynamic_fov`.

Assessment: mechanic or strong variant depending on project context.

Recommendation: keep for now. The current entry is more defensible when run is treated as the default high-readability locomotion state with collision, camera-relative input, and prediction concerns. It would be weak as a separate mechanic if it only meant "walk with a larger speed value."

Immediate data change: none.

Future follow-up: review whether the `consumes: movement.stamina_movement` relationship is broadly true for run, or whether stamina consumption belongs mainly to sprint and high-output movement. Also compare run-specific common bugs against walk and sprint for duplication.

## movement.sprint

Current representation: separate `movement` mechanic with subcategory `locomotion_modifier`.

Current signals:

- Player-facing behavior: faster locomotion mode with cost, commitment, or noise tradeoff.
- State/rules: depends on movement state, stamina, input abstraction, camera controller, and footstep audio.
- Parameters: velocity multiplier, acceleration window, stamina drain per meter, footstep noise radius.
- Edge cases/common bugs: priority with reload/crouch/ladder/swimming/aiming, exhaustion transition loops, camera blend-out, wall-blocked stamina drain, toggle sprint after exhaustion, stride mismatch.
- Relationships: extends `movement.run`, consumes `movement.stamina_movement`, enhances `camera.dynamic_fov`.

Assessment: mechanic, if cost/noise/exhaustion/input behavior remains central.

Recommendation: keep separate for v0.3. Sprint has stronger justification than run as a separate entry because it introduces resource drain, toggle/hold accessibility choices, AI noise/perception concerns, exhaustion, and camera effects.

Immediate data change: none.

Future follow-up: strengthen future reviewed-core criteria around sprint-specific accessibility and AI/perception concerns. If a game treats sprint as only a speed multiplier with no cost, it should be documented as a parameter or variant, not assumed to match this entry.

## Possible Taxonomy Models

### Model A - Keep Walk / Run / Sprint Separate

Pros:

- Clearer for search and navigation.
- Can document unique edge cases for precision movement, default traversal, and high-output movement.
- Useful if each entry has different animation, networking, accessibility, AI, or level-design concerns.
- Preserves existing IDs, links, graph relationships, and user references.

Cons:

- May over-split basic locomotion.
- May duplicate common bugs and parameters.
- Can imply artificial separation if entries are interpreted as speed values.
- Relationship graph may overstate dependencies between baseline movement modes.

### Model B - Merge Into Locomotion Speed Modes

Pros:

- More compact taxonomy.
- Speed differences become parameters or modes.
- Avoids walk/run/sprint duplication.
- Makes it clearer that many games treat movement speed as a continuum or control curve.

Cons:

- Loses search granularity.
- Harder to attach sprint-specific stamina, footstep noise, exhaustion, input toggle, and camera concerns.
- Might require migration notes for IDs, links, reports, and Mixer scenarios.
- Could hide baseline walk precision and run prediction issues inside a broad entry.

### Model C - Keep Separate But Reframe Boundaries

Pros:

- No breaking ID changes.
- Clarifies why each entry exists.
- Allows future merging if evidence is weak.
- Preserves current links and dataset stability.
- Lets reviewers improve edge cases before making taxonomy changes.

Cons:

- Still requires careful rewriting.
- Some duplication may remain.
- The dataset must keep saying these are context-dependent planning entries, not universal categories.

Recommended model for v0.3: Model C.

The current representation is reasonable enough to preserve, but the boundaries need clearer review language. Walk should be framed as precision baseline locomotion, run as default faster ground locomotion with prediction/collision/camera concerns, and sprint as high-output locomotion with cost, noise, exhaustion, and accessibility implications.

## Nearby Movement Mechanics

### movement.stamina_movement

Assessment: clearly separate support mechanic.

`movement.stamina_movement` is not just a movement-speed parameter. It owns stamina resource drain, recovery delay, exhaustion lockout, UI warning thresholds, save restoration, and action gating across sprinting, climbing, swimming, dodging, and other high-output movement.

Recommendation: keep separate. It helps explain why sprint and dodge roll are not only speed or displacement parameters.

### movement.dash

Assessment: clearly separate mechanic.

`movement.dash` has committed burst displacement, cooldown, collision sweeps, input buffering, possible invulnerability, state restoration, UI cooldown, and prediction concerns. Those are distinct enough from walk/run/sprint.

Recommendation: keep separate.

### movement.air_dash

Assessment: borderline variant, currently justified as a separate entry.

`movement.air_dash` extends dash, but airborne state, air action counters, landing reset rules, coyote time interaction, double jump interaction, and one-way platform behavior create distinct edge cases.

Recommendation: keep separate for now, but treat it as a dash variant family member in future reviews.

### movement.dodge_roll

Assessment: clearly separate mechanic.

`movement.dodge_roll` combines displacement, invulnerability frames, recovery, animation events, stamina cost, hurtbox state, and combat resolver priority. It is not just a movement direction or speed variant.

Recommendation: keep separate.

### Other Nearby Movement Entries

`movement.slide`, `movement.crouch`, `movement.prone`, `movement.climbing`, and `movement.swimming` all show distinct state, collision-shape, environment, or resource concerns. They do not appear to be immediate merge candidates for the walk/run/sprint question.

## What Would Justify Keeping Walk / Run / Sprint Separate?

Keeping separate entries is justified if future review confirms:

- Walk owns precision, dead-zone, interaction alignment, stealth/noise, or camera-stability concerns.
- Run owns default traversal, higher-speed collision, camera-relative input, animation blend, or prediction concerns.
- Sprint owns stamina, exhaustion, noise, detection, camera effects, hold/toggle input, or recovery concerns.
- Common bugs are not mostly duplicated.
- Edge cases help developers write different tests for each entry.
- Relationships differ in useful ways.
- Separate entries improve search and Mixer planning more than they add confusion.

## What Would Justify Merging Or Reframing Later?

Merging or reframing should be considered if future review finds:

- Walk, run, and sprint mostly differ by `move_speed_units_per_second` or multiplier values.
- Edge cases and common bugs remain nearly identical after cleanup.
- Relationships mostly duplicate each other.
- Sprint does not meaningfully use stamina, noise, detection, input accessibility, or camera concerns.
- A broader locomotion-speed-mode entry would give users clearer guidance.
- Maintaining separate IDs creates more confusion than review value.

## Future Data Pass Checklist

Before changing walk/run/sprint data, answer:

- Would changing IDs break links or user references?
- Can current entries be improved without merging?
- Are common bugs actually duplicated?
- Are edge cases unique enough?
- Are relationships unique enough?
- Would a broader `movement.locomotion_speed_modes` entry be clearer?
- Should sprint remain separate because of stamina, noise, detection, animation, or accessibility?
- Should walk/run become variants or parameters?
- Would the site/browser need migration notes?
- Would `related_mechanics`, `combines_well_with`, and typed `relationships` need redirect or migration handling?
- Would the Mixer need compatibility handling for old `?mix=` URLs?

## Batch A Data Hardening Result

Batch A updated the three locomotion-speed entries in mechanic JSON while keeping the existing IDs and draft/medium review state.

### movement.walk

Changes:

- Reframed walk as baseline precision/control locomotion rather than simply slow movement.
- Added explicit prerequisites for dead-zone policy and interaction focus.
- Added parameters for `walk_dead_zone_threshold` and `walk_step_offset_units`.
- Strengthened edge cases around digital input fallback, slope/step contact, prompt/dialogue/menu input priority, prompt alignment, and network reconciliation.
- Strengthened common bugs around camera-relative dead-zone drift and prompt flicker from pre-collision targeting.
- Updated implementation notes to name dead-zone filtering, interaction focus, step/slope handling, post-collision velocity, and prompt alignment.

Relationship changes:

- Kept `movement.walk -> movement.run` as `supports`.
- Kept `movement.walk -> movement.stamina_movement` as `balances`.
- Kept `movement.walk -> camera.smooth_follow_camera` as `supports`.
- Reworded relationship reasons to emphasize baseline locomotion, input filtering, and camera stability.

Assessment after hardening: keep separate for now. Walk is now more clearly a baseline precision/control checklist entry, not just a lower speed value.

### movement.run

Changes:

- Reframed run as default higher-speed ground traversal, not stamina sprint.
- Added explicit prerequisites for collision sweeps, surface materials, and camera-relative input.
- Added parameters for `run_collision_sweep_margin_units` and `run_surface_modifier_policy_id`.
- Strengthened edge cases around traversal-state transitions, camera orientation changes, surface modifier policy, input ownership, and deterministic prediction.
- Strengthened common bugs around one-frame camera snaps and animation phase mismatch after server correction.
- Updated implementation notes to explicitly avoid applying stamina costs in the run state itself.

Relationship changes:

- Removed `movement.run -> movement.stamina_movement` as `consumes` because the edge was too broad for default run locomotion. Stamina consumption belongs more clearly to sprint or other high-output movement states unless a game explicitly defines run as stamina-gated.
- Kept `movement.run -> movement.walk` as `extends`.
- Kept `movement.run -> camera.dynamic_fov` as `enhances`.

Assessment after hardening: keep separate for now. Run now reads as default traversal locomotion with collision, camera, animation, and prediction concerns, not as sprint without stamina.

### movement.sprint

Changes:

- Reframed sprint as a high-output locomotion modifier that earns a separate ID only when it adds cost, exhaustion, noise, input, camera, or recovery rules beyond speed.
- Replaced the broad stamina system prerequisite with explicit `stamina_resource`, `exhaustion_state`, `sprint_input_policy`, `ai_perception_events`, and `network_prediction`.
- Added parameters for `sprint_min_stamina_to_start`, `sprint_regen_delay_ms`, and `sprint_cancel_policy_id`.
- Strengthened edge cases around hold/toggle/auto-sprint, exhaustion, camera ownership, AI hearing, save/load, respawn, and reconnect.
- Strengthened common bugs around regeneration delay and server correction of sprint state.
- Updated implementation notes to name sprint_state_id, stamina_resource, exhaustion_state, footstep noise events, authority validation, and save/load or reconnect restore behavior.

Relationship changes:

- Kept `movement.sprint -> movement.run` as `extends`.
- Kept `movement.sprint -> movement.stamina_movement` as `consumes`.
- Kept `movement.sprint -> camera.dynamic_fov` as `enhances`.
- Added `movement.sprint -> stealth.noise_meter` as `feeds` because sprint can emit louder footstep noise events consumed by stealth meters and AI hearing.

Assessment after hardening: keep separate for now. Sprint now has a stronger boundary as costed, noisy, input-sensitive, camera-sensitive high-output locomotion rather than faster run.

### Relationship Count

The total typed relationship count remained stable at 528:

- Removed one broad `consumes` edge from `movement.run` to `movement.stamina_movement`.
- Added one `feeds` edge from `movement.sprint` to `stealth.noise_meter`.

### Remaining Risk

Walk, run, and sprint are still draft entries. This pass hardens their boundaries but does not prove they should remain separate forever. Future review should compare their edge cases and common bugs again after real contributor feedback, especially in games where run and sprint are both optional speed modes.

## Final Recommendation

Do not rename IDs, change schema, or change Mixer behavior yet.

For v0.3, keep `movement.walk`, `movement.run`, and `movement.sprint` as linked entries, but treat their boundaries as review-sensitive. Batch A made the differences more concrete; if future review still finds the failure modes too similar, plan a migration toward locomotion speed modes or variants.
