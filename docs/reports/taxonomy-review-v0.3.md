# Taxonomy Review v0.3

This report reviews a small set of borderline or important mechanics against the v0.3 taxonomy criteria.

It is a planning report only. It does not rename, split, merge, delete, or mark any mechanic as reviewed.

## Summary

- Reviewed mechanics and groups: 11 existing mechanics across movement, platforming, combat, UI/UX, and time.
- Immediate data changes recommended: none.
- Main follow-up: review whether some locomotion entries should stay separate mechanics or be reframed as speed-mode variants after stronger edge-case comparison.
- Key principle: mechanics should remain separate only when the distinction improves review, testing, implementation planning, or graph usefulness.

## Walk / Run / Sprint

| Item | Current Representation |
| --- | --- |
| `movement.walk` | Separate movement mechanic, `ground_locomotion`, supports `movement.run`. |
| `movement.run` | Separate movement mechanic, `ground_locomotion`, extends `movement.walk`. |
| `movement.sprint` | Separate movement mechanic, `locomotion_modifier`, extends `movement.run`. |

Possible issue: these can look like three speed values rather than three separate mechanics. If the only difference is movement speed, they should probably be parameters or variants of a broader locomotion-speed-mode mechanic.

Mechanic vs variant vs parameter assessment:

- `walk` is often the baseline locomotion mode rather than an optional mechanic.
- `run` can be a distinct mechanic when it changes acceleration, animation state, input prediction, camera behavior, noise, or control feel beyond a speed number.
- `sprint` can be a distinct mechanic when it introduces stamina drain, exhaustion, input hold/toggle behavior, camera/FOV effects, AI noise/perception, or level-design constraints.
- If future review finds that edge cases and common bugs are mostly identical, `run` and `sprint` may be better represented as variants or parameters of a locomotion-speed-mode entry.

Evidence that would justify keeping them separate:

- Unique stamina or exhaustion rules.
- Unique animation, blend tree, or network prediction issues.
- Unique accessibility implications for hold, toggle, fatigue, or camera motion.
- Unique AI perception or footstep-noise implications.
- Unique level-design consequences such as gap timing, patrol avoidance, or chase pacing.
- Unique common bugs and edge cases that are not only speed tuning.

Recommendation: keep the current representation for now. Do not change IDs during this pass. Add walk/run/sprint to a future locomotion taxonomy review and compare their edge cases side by side.

Immediate data change needed: no.

## Dash / Air Dash

| Item | Current Representation |
| --- | --- |
| `movement.dash` | Separate burst movement mechanic with cooldown, collision, input buffer, and possible invulnerability concerns. |
| `movement.air_dash` | Separate air mobility mechanic that extends `movement.dash`. |

Possible issue: `air_dash` could be treated as a dash variant rather than a separate mechanic.

Mechanic vs variant vs parameter assessment:

- `movement.dash` is clearly a mechanic because it introduces committed displacement, cooldown state, collision checks, input buffering, and recovery rules.
- `movement.air_dash` is a borderline variant, but it can justify a separate entry when it interacts with airborne state, air action counters, double jump, coyote time, landing reset rules, camera framing, and assist settings.

Recommendation: keep both entries for now. The separate `air_dash` entry is useful because its edge cases are not limited to dash distance or duration; they involve airborne state ordering and platforming interactions.

Immediate data change needed: no.

## Double Jump / Wall Jump

| Item | Current Representation |
| --- | --- |
| `platforming.double_jump` | Separate platforming mechanic for extra airborne jump actions. |
| `platforming.wall_jump` | Separate platforming mechanic for jumping from wall contact or wall-facing state. |

Possible issue: both are jump variants, but they have different state dependencies.

Mechanic vs variant vs parameter assessment:

- `double_jump` is more than an extra jump count when it affects air action counters, landing resets, momentum reset rules, animation, and unlock/progression relationships.
- `wall_jump` depends on wall detection, surface normals, same-wall lockouts, contact grace, and collision resolution. Those concerns are different from ordinary jump parameters.

Recommendation: keep both as separate mechanics. They should stay linked to jump-control and coyote-time mechanics, but their state machines justify separate review.

Immediate data change needed: no.

## Ranged Attack / Reload

| Item | Current Representation |
| --- | --- |
| `combat.ranged_attack` | Separate ranged offense mechanic with aiming, projectile or trace logic, ammo, hit detection, and damage model requirements. |
| `combat.reload` | Separate ranged resource mechanic requiring ammo state, weapon state, animation events, and input buffer. |

Possible issue: reload can be seen as a parameterized delay or ammo option inside ranged attack.

Mechanic vs variant vs parameter assessment:

- `ranged_attack` is clearly a mechanic because it owns target acquisition, projectile or trace creation, hit confirmation, ammo consumption, and damage authority concerns.
- `reload` justifies a separate entry when it has commit frames, cancel rules, partial inserts, staged ammo transactions, UI desync risks, save/load concerns, and network prediction concerns.
- Reload variants such as full-magazine, per-shell, heat vent, or charge recharge should usually remain variants unless their transaction model is distinct enough to need separate review.

Recommendation: keep `combat.reload` separate, but future review should explicitly compare magazine, staged, and ammo-less recharge variants before raising confidence.

Immediate data change needed: no.

## Cooldown Indicator

| Item | Current Representation |
| --- | --- |
| `ui_ux.cooldown_indicator` | Separate UI/UX mechanic for readable cooldown state, authoritative timing, charge display, remapping, and accessibility presentation. |

Possible issue: an indicator can look like presentation rather than a mechanic.

Mechanic vs variant vs parameter assessment:

- It is useful as a separate dataset entry because it has state ownership, timing synchronization, stale UI bugs, charge/radial display variants, color and motion accessibility concerns, and many relationships to timed mechanics.
- It should not be treated as a simple visual skin. If a UI element can desync from authoritative gameplay state or change player decision-making, it deserves review.

Recommendation: keep as a separate `ui_ux` entry. Future review should check accessibility layout and color-independent readiness states.

Immediate data change needed: no.

## Time Rewind

| Item | Current Representation |
| --- | --- |
| `time.time_rewind` | Separate high-risk temporal mechanic with snapshot buffers, deterministic replay, physics state cache, input history, and save/load state requirements. |

Possible issue: none as a mechanic boundary. The main issue is risk and architecture depth, not whether it should be a parameter or variant.

Mechanic vs variant vs parameter assessment:

- `time.time_rewind` is clearly a separate mechanic because it affects global state ownership, object lifecycle, physics restore, AI state, projectiles, rewards, save/load, performance, and multiplayer authority.
- It should not be presented as a simple time-scale parameter. It is a system-level mechanic with strong context dependence.

Recommendation: keep as a separate mechanic and keep it draft. It should not be considered for reviewed status until the dedicated architecture checklist is resolved.

Immediate data change needed: no.

## Cross-Cutting Recommendations

- Do not rename or merge entries during v0.3 planning.
- Add a future locomotion review focused on `movement.walk`, `movement.run`, `movement.sprint`, `movement.stamina_movement`, and related animation/noise/accessibility concerns.
- Add a future variant-pattern review for dash variants, reload variants, and jump variants.
- Add contribution guidance asking authors to justify why a new entry is not just a parameter or variant.
- Keep context dependence visible in Mixer and review docs so selected mechanics are treated as planning prompts, not linear building blocks.

