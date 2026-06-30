# Reviewed Core Batch 1 Maintainer Review v0.3

Date: 2026-06-30

This report records a maintainer-style review trail for Reviewed Core Batch 1. It does not change mechanic status, source confidence, schema, or dataset scope.

The review goal is conservative: identify whether the five Batch 1 mechanics are ready for later reviewed-status consideration, while keeping `status: "draft"` and `source_confidence: "medium"` until the project has a formal rationale field or review workflow.

## Summary

| Mechanic | Recommendation |
| --- | --- |
| `movement.dash` | `ready_for_later_reviewed_status` |
| `platforming.jump_buffering` | `ready_for_later_reviewed_status` |
| `combat.reload` | `ready_for_later_reviewed_status` |
| `ui_ux.cooldown_indicator` | `ready_for_later_reviewed_status` |
| `time.time_rewind` | `needs_architecture_review` |

No mechanic is marked reviewed by this report.

## Review Table

| Mechanic | Status | Confidence | Edge Cases | Common Bugs | Implementation Notes | Relationships | Scope Profile | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `movement.dash` | draft | medium | Strong enough for later reviewed-status consideration. They cover collision, thin-wall skips, buffered landing, direction stability, checkpoint/load restore, and cancel paths. | Strong enough for later reviewed-status consideration. They cover transform movement, cooldown activation, UI mismatch, i-frame clearing, slope/wall correction, and prediction drift. | Concrete enough. Notes name dash state, timestamps, direction, charge count, i-frame end, collision sweeps, cancellation, respawn, load, prediction, and rollback. | Reasonable. `time.cooldown_time`, `ui_ux.cooldown_indicator`, `movement.air_dash`, and `combat.invincibility_frames` are useful planning edges. `camera.screen_shake` remains a weak enhancement. | Plausible. Core role with medium implementation/design and higher tuning risk fits dash as a central movement verb. | `ready_for_later_reviewed_status` after final relationship direction check. |
| `platforming.jump_buffering` | draft | medium | Strong enough for later reviewed-status consideration. They cover animation locks, UI focus/cutscene clearing, simultaneous jump eligibility, drop-through conflict, assist settings, and action priority. | Strong enough for later reviewed-status consideration. They cover stale buffers, hold repeat, variable jump release, cutscene/menu stale input, wrong jump consumption, and coyote/buffer double consumption. | Concrete enough. Notes name press timestamps, eligibility resolution, focus/cutscene clearing, control mode, prediction, input sequence, and checkpoint restore. | Reasonable. Relationships to coyote time, variable jump height, double jump, toggle/hold accessibility, and dash are useful, but direction semantics should be reviewed later. | Plausible. Support role, low implementation cost, and medium tuning cost fit an input-forgiveness mechanic. | `ready_for_later_reviewed_status` after final priority-order review. |
| `combat.reload` | draft | medium | Strong enough for later reviewed-status consideration. They cover interruption, save/load, reconnect, rollback, staged reload, prediction, input conflict, and death/stun/equipment removal. | Strong enough for later reviewed-status consideration. They cover animation-start duplication, stuck weapon state, negative reserves, cancel-to-fire, save/load progress loss, and predicted UI rejection. | Concrete enough. Notes name reload state, timestamps, commit frames, cancel policy, magazine/reserve counts, transaction id, server authority, replication, reconnect, and buffered fire input. | Reasonable. Relationships to `time.cooldown_time`, `ui_ux.cooldown_indicator`, and `combat.ranged_attack` describe timing, UI, and ammo authority dependencies. | Plausible. Support role with high networking risk and moderate save/load risk fits reload in networked ranged combat. | `ready_for_later_reviewed_status` after non-magazine ammo variant review. |
| `ui_ux.cooldown_indicator` | draft | medium | Strong enough for later reviewed-status consideration. They cover timer correction, shared groups, charges, input glyphs, disabled-ready mismatch, and reconnect/rollback authority jumps. | Strong enough for later reviewed-status consideration. They cover local-time drift, server acceptance mismatch, stale ready flash, color-only state, partial charge display, and recycled widget subscriptions. | Concrete enough. Notes name ability ids, cooldown groups, remaining time, charges, signals/view models, replicated ability tags, prediction correction, and rejected-use pulses. | Reasonable. Relationships to `time.cooldown_time`, `movement.dash`, `combat.reload`, and `combat.charged_attack` are useful, though some support direction should be reviewed in a later semantics pass. | Plausible. Support role with high UI risk matches a cross-mechanic HUD/readability feature. | `ready_for_later_reviewed_status` after accessibility layout/color review. |
| `time.time_rewind` | draft | medium | Strong but not sufficient for reviewed status. They cover destroyed/unloaded objects, random events, collision restore, rewards/quests/narrative state, projectiles/status/AI restore order, save/checkpoint/streaming, and audio/camera mismatch. | Strong but not sufficient for reviewed status. They cover missing state channels, unbounded buffers, stale contacts, duplicate rewards, projectile ownership, stale AI targets, and RNG divergence. | Concrete, but the mechanic is too architectural for normal entry review alone. Notes name entity ids, state channels, sampling, physics body state, network rollback separation, typed arrays, pooling, and RNG restoration. | Reasonable and intentionally cautionary. Conflicts/soft conflicts with cooldowns, grappling, moving platforms, and online co-op are appropriate planning warnings. | Plausible. Optional role and maximum implementation/design/tuning/network/save-load risk are appropriate. | `needs_architecture_review`; not ready for reviewed status. |

## Source Confidence Rationale

The schema does not currently support a `source_confidence_rationale` field, so the rationale remains in this report only.

### `movement.dash`

The entry is useful and plausible. Edge cases and common bugs are concrete, and they cover the main prototype-breaking areas for a dash: collision, input buffering, cooldowns, i-frames, state reset, and prediction. Relationships and `scope_profile` have been checked for obvious issues. It should remain `medium` until a maintainer performs final relationship-direction review and the dataset has a formal place to store confidence rationale.

### `platforming.jump_buffering`

The entry is useful and plausible. Edge cases and common bugs now cover stale input, animation locks, UI focus, coyote time, double jump, variable jump height, and accessibility timing options. Relationships and `scope_profile` have been checked for obvious issues. It should remain `medium` until final priority-order review confirms how buffering interacts with adjacent platforming assists.

### `combat.reload`

The entry is useful and plausible. Edge cases and common bugs now cover ammo transactions, commit/cancel timing, save/load, reconnect, rollback, UI prediction, weapon swapping, and staged reloads. Relationships and `scope_profile` have been checked for obvious issues. It should remain `medium` until non-magazine and arcade reload variants are reviewed so the entry does not overfit magazine-based shooters.

### `ui_ux.cooldown_indicator`

The entry is useful and plausible. Edge cases and common bugs now cover authoritative timer drift, shared cooldown groups, charges, remapping, disabled states, reconnect/rollback corrections, color-only feedback, and widget reuse. Relationships and `scope_profile` have been checked for obvious issues. It should remain `medium` until accessibility layout, color-independent feedback, reduced motion, and scaling behavior are reviewed.

### `time.time_rewind`

The entry is useful and plausible, but it remains high-risk and context-dependent. Edge cases and common bugs are concrete, and relationships and `scope_profile` have been checked for obvious issues. It should remain `medium` until a dedicated architecture review resolves snapshot completeness, restore order, persistence, multiplayer authority, memory/performance, and UX clarity concerns.

## Relationship Direction Notes

Some Batch 1 relationships are useful but should be reviewed later for direction semantics.

Examples:

- `movement.dash` supports `ui_ux.cooldown_indicator` in the sense that dash benefits from visible availability, while the reverse direction can also be useful because cooldown indicators depend on cooldown-bearing actions for context.
- `ui_ux.cooldown_indicator` supports `combat.reload`, but reload also depends on UI if the game needs visible reload progress. The current edge is acceptable as a planning hint, not a universal dependency.
- `platforming.jump_buffering` supports `accessibility.toggle_hold_option`, but accessibility settings can also support the input-buffer mechanic by changing timing assumptions.
- `combat.reload` supports `combat.ranged_attack`, while ranged attack is also the gameplay context that makes reload meaningful.

This is not a blocker for Batch 1. It should feed a later relationship semantics pass focused on direction, reciprocal edges, and whether UI/accessibility support mechanics should point from the consumer, the provider, or both.

## Final Maintainer Recommendation

- `movement.dash`: ready for later reviewed-status consideration, but do not change status yet.
- `platforming.jump_buffering`: ready for later reviewed-status consideration, but do not change status yet.
- `combat.reload`: ready for later reviewed-status consideration, but do not change status yet.
- `ui_ux.cooldown_indicator`: ready for later reviewed-status consideration, but do not change status yet.
- `time.time_rewind`: needs architecture review before reviewed-status consideration.

All five should keep `source_confidence: "medium"` until the project has a formal source-confidence rationale workflow.
