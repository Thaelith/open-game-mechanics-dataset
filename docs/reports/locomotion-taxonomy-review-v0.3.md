# Locomotion Taxonomy Review v0.3

This report applies the v0.3 taxonomy criteria to locomotion-related movement entries.

It is a documentation and review-planning artifact only. It does not change mechanic JSON, IDs, schema, status, or source confidence.

## Summary

- Expected entries found: all requested movement files exist.
- Main question: whether `movement.walk`, `movement.run`, and `movement.sprint` are distinct mechanics or speed-mode variants.
- Conservative v0.3 recommendation: use Model C, keep separate but reframe boundaries.
- Immediate data changes: none.
- Future data pass: improve or verify walk/run/sprint boundaries before any merge, rename, or migration.

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

## Final Recommendation

Do not change mechanic JSON, IDs, schema, or Mixer behavior yet.

For v0.3, keep `movement.walk`, `movement.run`, and `movement.sprint` as linked entries, but treat their boundaries as review-sensitive. The next data pass should improve their descriptions, edge cases, common bugs, and relationships so each entry clearly earns its separate ID. If that pass cannot make the differences concrete, plan a migration toward locomotion speed modes or variants.

