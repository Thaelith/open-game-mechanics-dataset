# Relationship Semantics And Direction

## Purpose

Typed `relationships` are machine-readable planning hints used for:

- Dependency review.
- Support mechanic discovery.
- Conflict warnings.
- Scope planning.
- Mechanic Mixer suggestions.
- Future graph tooling.

They are not universal design laws. A relationship can be useful in one genre, engine, camera model, networking model, or project context and irrelevant in another.

Relationship quality matters more than relationship count. A useful edge should help a maintainer, designer, developer, or tool ask a better review question.

Current v0.3 relationship-semantics cleanup decisions are summarized in [`reports/v0.3-review-summary.md`](reports/v0.3-review-summary.md).

## Relationship Direction Principle

A relationship entry lives on the source mechanic: the mechanic currently being described.

The target mechanic is the related concept that helps explain the source mechanic's requirements, support role, conflict risk, resource flow, upgrade path, variant relationship, or planning risk.

Each relationship type has its own direction rule. Do not assume every type means "target helps source" or "source helps target."

Examples:

- In `movement.dash`, `requires -> time.cooldown_time` means dash usually requires a cooldown or charge timing rule.
- In `ui_ux.cooldown_indicator`, `requires -> time.cooldown_time` means cooldown indicators need a cooldown timing source to display.
- In `ui_ux.cooldown_indicator`, `supports -> movement.dash` means the indicator supports dash readability.

If the phrase produced by the type sounds backwards, the edge is probably direction-questionable and should be reviewed before future data cleanup.

## Relationship Type Semantics

### `requires`

Meaning: the source mechanic usually cannot function as described without the target mechanic or system.

Direction rule: source requires target.

Use when:

- The source needs the target's state, timing, authority, data, UI, or resource model.
- Removing the target would force a different implementation or design.

Avoid when:

- The target is optional polish.
- The target is only a common pairing.
- The dependency exists only in a narrow genre-specific version.

Example:

`movement.dash requires time.cooldown_time` if dash availability is gated by cooldown or charges.

### `supports`

Meaning: the source mechanic helps the target work more clearly, reliably, accessibly, or ergonomically, but the target can usually exist without it.

Direction rule: source supports target. The target is the thing being helped.

Use when:

- A UI, accessibility, timing, input, or feedback mechanic makes another mechanic easier to understand or operate.
- A resource, state, or service mechanic provides useful support without being a strict dependency.

Avoid when:

- The current source is actually the mechanic receiving support from the target.
- The intended meaning is "the source benefits from the target." In that case consider a reverse `supports` edge, `requires`, `enhances`, or no typed edge.
- The reason would only say "works well together."

Example:

`ui_ux.cooldown_indicator supports movement.dash` is clearer than `movement.dash supports ui_ux.cooldown_indicator` when the intended meaning is "cooldown indicators help dash readability."

### `enhances`

Meaning: the source mechanic becomes more expressive, readable, satisfying, or useful because of the target, but the target is optional.

Direction rule: source is enhanced by target.

Use when:

- The target improves feel, readability, pacing, fantasy, or presentation.
- The source still works without the target.

Avoid when:

- The target is required for the source to function.
- The source is the thing providing support to the target; use `supports` instead.

Example:

`movement.dash enhances camera.screen_shake` means dash can be improved by a short shake or camera impulse. The edge should not imply dash is required for all screen shake systems.

### `soft_conflicts_with`

Meaning: the source and target can work together, but require careful rules, ordering, tuning, or architecture.

Direction rule: source points to target as a caution from the current entry.

Use when:

- The combination is plausible but risky.
- The edge should warn a reviewer or Mixer user to inspect rules before combining mechanics.

Avoid when:

- The issue is an ordinary balancing tradeoff.
- The conflict is speculative or only applies to one narrow project.

Example:

`time.time_rewind soft_conflicts_with physics.moving_platform` because rewind restore order must handle platform position, carried passengers, contact state, and velocity together.

### `conflicts_with`

Meaning: the source and target are usually incompatible without a major architecture or design decision.

Direction rule: source points to target as a strong warning.

Use when:

- The combination creates a structural design, technical, or authority conflict.
- A future tool should flag the pair prominently.

Avoid when:

- The mechanics only need tuning.
- The problem is a mild UX issue.
- You cannot explain the conflict concretely.

Example:

`time.time_rewind conflicts_with multiplayer.online_coop` unless shared timeline, authority, and rollback rules are explicitly designed.

### `feeds`

Meaning: the source produces state, resources, signals, events, content, or pressure consumed by the target.

Direction rule: producer feeds consumer.

Use when:

- The source creates input for another mechanic.
- A future tool should understand the flow from source to target.

Avoid when:

- The two mechanics merely coexist.
- The target does not actually consume or respond to the source output.

Example:

A quest completion mechanic may feed an unlockable ability system when quest outcomes grant ability access.

### `consumes`

Meaning: the source spends, uses, or depends on a resource or state produced or owned elsewhere.

Direction rule: consumer consumes resource/source.

Use when:

- The source spends stamina, currency, ammo, charges, materials, time, or other tracked state.
- The resource matters for balance or implementation.

Avoid when:

- The source only visually references the target.
- The target is not a resource or owned state.

Example:

`movement.sprint consumes movement.stamina_movement` if sprint spends stamina or depends on stamina gating.

### `unlocks`

Meaning: the source opens access to the target.

Direction rule: unlock source unlocks target.

Use when:

- The source grants, gates, reveals, or enables the target.
- A future tool should see a progression path.

Avoid when:

- The source and target are merely related.
- The unlock is only an example from one specific game.

Example:

`movement.dash unlocks movement.air_dash` if the design treats air dash as an upgraded action that becomes available after base dash.

### `extends`

Meaning: the source builds directly on the target or is a more specialized form.

Direction rule: specialized mechanic extends base mechanic.

Use when:

- The source inherits major state, timing, input, or implementation rules from the target.
- The target is the simpler or more general base.

Avoid when:

- The two mechanics are only thematically similar.
- The source is merely enhanced by the target.

Example:

`movement.sprint extends movement.run`.

### `is_variant_of`

Meaning: the source is a variant of the target and likely shares many review concerns.

Direction rule: variant is_variant_of base.

Use when:

- The source should inherit most edge cases and common bugs from the target.
- The difference is context, constraint, cost, direction, or mode rather than a new state machine.

Avoid when:

- The source introduces enough unique systems or edge cases to be better modeled as `extends`.
- The relation is an upgrade path; use `unlocks` when access is the important meaning.

Example:

`movement.air_dash is_variant_of movement.dash` could be used if future review decides air dash is primarily a dash variant rather than a separate extension.

### `balances`

Meaning: the source helps regulate, limit, or counterbalance the target.

Direction rule: balancing mechanic balances the thing being constrained.

Use when:

- The source limits repetition, counters runaway power, creates tradeoffs, or stabilizes pacing.
- The target would be harder to tune without the source.

Avoid when:

- The source is simply required by the target.
- The relationship is only a loose design pairing.

Example:

`movement.stamina_movement balances movement.sprint` if stamina limits repeated or sustained sprinting.

## UI And Accessibility Direction

UI and accessibility relationships are common sources of direction ambiguity.

Preferred conventions:

- A UI feedback mechanic usually `supports` the gameplay mechanic it makes readable.
- An accessibility setting usually `supports` the input, timing, visual, audio, or difficulty mechanic it adapts.
- A gameplay mechanic should not usually `support` a UI or accessibility mechanic unless it provides state or events the UI/accessibility mechanic needs.
- If a gameplay mechanic needs a UI surface to function as designed, use `requires` only when that UI is truly required; otherwise use a reverse `supports` edge from the UI entry.

Example:

- `ui_ux.cooldown_indicator supports movement.dash`: useful.
- `movement.dash supports ui_ux.cooldown_indicator`: direction-questionable if the reason means dash benefits from cooldown display.

## Reciprocal Relationships

Reciprocal edges should not be automatic.

Use reciprocal edges only when each entry independently benefits from seeing the relationship. Avoid adding both directions just to increase graph density.

Reciprocal relationships should have different reasons when the planning value differs by direction.

Examples:

- `ui_ux.cooldown_indicator supports movement.dash` can be useful from the UI side because it says the indicator improves dash readability.
- `movement.dash requires time.cooldown_time` can be useful from the dash side because it says dash needs an availability clock.
- Both can coexist because they answer different review questions.
- But `movement.dash supports ui_ux.cooldown_indicator` may be misleading if the intended meaning is only that dash benefits from the indicator.

## When Not To Add A Relationship

Do not add a typed relationship when:

- The connection is only a vague association.
- The target is merely common in the same genre.
- The relationship does not help review, planning, testing, or tooling.
- The reason would be generic.
- The connection is true only in a narrow project-specific implementation.
- The edge would make Mixer suggestions noisier.
- The relationship duplicates another clearer edge.
- A legacy `related_mechanics` or `combines_well_with` reference is enough.

## Future Cleanup Rule

Before changing existing relationship data, review the edge against:

- The relationship type definition.
- The direction rule.
- The reason text.
- Whether the edge helps the Mechanic Mixer.
- Whether the edge would still make sense outside one specific game.

Prefer small, reviewable cleanup batches over broad graph rewrites.
