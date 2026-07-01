# Reviewed Core Batch 1 v0.3

Date: 2026-06-30

## Summary

Batch 1 improved five reviewed-core candidate mechanics without changing schema, IDs, status, or source confidence.

The pass focused on prototype-breaking details: input/state priority, collision, save/load restoration, UI authority drift, rollback/prediction, animation events, and irreversible state during rewind.

No mechanic is marked `reviewed` by this report.

Maintainer review: [`reviewed-core-batch-1-maintainer-review-v0.3.md`](reviewed-core-batch-1-maintainer-review-v0.3.md)

Time rewind architecture checklist: [`time-rewind-architecture-review-v0.3.md`](time-rewind-architecture-review-v0.3.md)

## Mechanics Reviewed

- `movement.dash`
- `platforming.jump_buffering`
- `combat.reload`
- `ui_ux.cooldown_indicator`
- `time.time_rewind`

## Files Changed

- `data/movement/dash.json`
- `data/platforming/jump_buffering.json`
- `data/combat/reload.json`
- `data/ui_ux/cooldown_indicator.json`
- `data/time/time_rewind.json`
- `docs/reviewed-core-subset-v0.3.md`
- `docs/reports/reviewed-core-gap-report-v0.3.md`
- `docs/reports/reviewed-core-batch-1-v0.3.md`
- `docs/reports/README.md`
- `docs/roadmap-v0.3.md`
- `README.md`

## What Improved

- Edge cases now mention more concrete timing, state reset, collision, save/load, rollback, UI, and authority failures.
- Common bugs now describe more reproducible implementation failures rather than broad failure descriptions.
- Implementation notes for `movement.dash`, `platforming.jump_buffering`, and `combat.reload` now name more concrete state fields and transaction boundaries.
- A small relationship pass added only high-signal relationships and clarified one overbroad dash/i-frame reason.
- `scope_profile` values were reviewed and left unchanged.

## Review Table

The `Confidence Rationale Status` column records the state at the end of the Batch 1 rewrite. A later maintainer review added report-level rationale in [`reviewed-core-batch-1-maintainer-review-v0.3.md`](reviewed-core-batch-1-maintainer-review-v0.3.md), while all five mechanic JSON files remained `source_confidence: "medium"`.

| Mechanic | Edge Cases Before/After | Common Bugs Before/After | Relationship Review | Scope Review | Confidence Rationale Status | ready_for_review | Remaining Gaps |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `movement.dash` | 4 to 6; added thin-wall sweep/sub-step and respawn/checkpoint/load restoration. | 4 to 6; added cooldown/UI reload mismatch and network correction state drift. | Added `ui_ux.cooldown_indicator`; later Cleanup Pass 1 removed that dash-side support edge because the reverse UI support edge covers the planning need. Clarified i-frame soft-conflict reason. | No change; values remain plausible for core movement with moderate network/UI risk. | Report-level rationale added later; JSON remains `medium`. | yes | Needs final relationship-direction review before any status change. |
| `platforming.jump_buffering` | 3 to 6; added animation locks, UI focus/cutscene clearing, simultaneous eligibility, and assist-setting boundaries. | 3 to 6; added cutscene stale input, landing/double-jump mis-consumption, and coyote-buffer double-consumption. | Added `platforming.double_jump`; later Cleanup Pass 1 reversed the accessibility toggle/hold edge to the clearer support direction. | No change; low implementation and low risk still plausible. | Report-level rationale added later; JSON remains `medium`. | yes | Needs final review of priority ordering across coyote time, double jump, wall jump, and dash. |
| `combat.reload` | 3 to 6; added save/load, reconnect, rollback, staged reload, buffered firing, and death/stun/equipment removal cases. | 3 to 6; added cancel-to-fire, save/load progress loss, and predicted UI rejection bugs. | Existing relationships remained appropriate; later Cleanup Pass 1 removed one backwards reload-to-cooldown-UI support edge. | No change; networking risk remains high, save/load risk remains moderate. | Report-level rationale added later; JSON remains `medium`. | yes | Needs review across non-magazine ammo models and active reload variants. |
| `ui_ux.cooldown_indicator` | 4 to 6; added disabled-ready mismatch and authority correction jumps. | 4 to 6; added charge-pip readiness and recycled-widget subscription bugs. | Added `combat.reload` support edge; this remains the preferred direction after Cleanup Pass 1. | No change; high UI risk remains plausible. | Report-level rationale added later; JSON remains `medium`. | yes | Needs accessibility review for reduced motion, color-independent states, and scaled layouts. |
| `time.time_rewind` | 4 to 7; added inventory/reward/quest/narrative state, projectile/status/AI restore order, and save/checkpoint/streaming during rewind. | 4 to 7; added projectile ownership, stale AI target, and RNG divergence bugs. | Added `physics.moving_platform` soft-conflict edge. | No change; expert/high-risk profile remains appropriate. | Report-level rationale added later; JSON remains `medium`. | no | Needs dedicated architecture review before reviewed status because rewind affects persistence, rewards, physics, AI, and multiplayer authority. |

## Edge Cases Summary

- `movement.dash`: stronger collision and restoration coverage.
- `platforming.jump_buffering`: stronger stale-input, focus, assist-setting, and priority coverage.
- `combat.reload`: stronger ammo transaction and persistence coverage.
- `ui_ux.cooldown_indicator`: stronger authority, disabled-state, and remapping coverage.
- `time.time_rewind`: stronger irreversible-state, projectile, AI, and save/checkpoint coverage.

## Common Bugs Summary

- `movement.dash`: added UI/cooldown mismatch and prediction state drift.
- `platforming.jump_buffering`: added stale input after UI/cutscene and wrong jump-state consumption.
- `combat.reload`: added firing/cancel race, save/load progress loss, and predicted ammo UI rejection.
- `ui_ux.cooldown_indicator`: added charge-readiness and recycled-widget bugs.
- `time.time_rewind`: added projectile ownership, stale AI state, and RNG stream divergence.

## Relationship Changes Summary

- `movement.dash`: added `supports` edge to `ui_ux.cooldown_indicator`; Cleanup Pass 1 later removed that dash-side edge because `ui_ux.cooldown_indicator -> movement.dash` is the clearer direction. Clarified `soft_conflicts_with` edge to `combat.invincibility_frames`.
- `platforming.jump_buffering`: added `supports` edges to `platforming.double_jump` and `accessibility.toggle_hold_option`; Cleanup Pass 1 later reversed the accessibility edge to `accessibility.toggle_hold_option -> platforming.jump_buffering`.
- `combat.reload`: no relationship changes.
- `ui_ux.cooldown_indicator`: added `supports` edge to `combat.reload`.
- `time.time_rewind`: added `soft_conflicts_with` edge to `physics.moving_platform`.

## Scope Profile Changes Summary

No `scope_profile` values changed.

The existing profiles still look plausible for this pass:

- `time.time_rewind` remains high risk across implementation, design, tuning, networking, and save/load.
- `combat.reload` remains moderate implementation/design with high networking risk.
- `ui_ux.cooldown_indicator` remains high UI risk.
- `movement.dash` remains core with moderate implementation/network risk.
- `platforming.jump_buffering` remains support with low implementation risk and medium tuning risk.

## Remaining Review Gaps

- Batch 1 initially lacked written source-confidence rationale. A later maintainer review added report-level rationale, but rationale is not schema-enforced or stored in mechanic JSON yet.
- All five mechanics remain `draft`.
- `time.time_rewind` still needs a separate architecture-focused review before any reviewed-status consideration.
- Relationship direction semantics should be reviewed across the broader dataset before v0.3 finalization.
- Example games were not changed in this pass.

## Status And Confidence

- `status` changed: no.
- `source_confidence` changed: no.
- `dataset.json` update required: no indexed fields were intentionally changed.
