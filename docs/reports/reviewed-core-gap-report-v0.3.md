# Reviewed Core Gap Report v0.3

Generated manually for the proposed v0.3 reviewed core subset. This report is a planning artifact, not a status change.

No mechanics are marked reviewed by this report.

## Summary

- Candidate mechanics: 30
- Categories covered: 14
- Current status values: all `draft`
- Current `source_confidence` values: all `medium`
- Relationship coverage: 30/30
- Scope profile coverage: 30/30
- Edge case quality: 25 strong, 5 medium, 0 weak
- Common bug quality: 26 strong, 4 medium, 0 weak

The set is strong enough to begin reviewed-core work, but every candidate still needs explicit source-confidence rationale before any `status` or `source_confidence` change.

## Gap Table

| Mechanic | Category | Status | Confidence | Relationships | Scope | Edge Cases | Common Bugs | Potential Issues To Review | Recommended Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `movement.dash` | movement | draft | medium | yes | yes | strong | strong | Batch 1 improved collision, restoration, UI cooldown, and network correction detail. Source-confidence rationale still missing. | Ready for a later maintainer review pass; do not mark reviewed yet. |
| `movement.air_dash` | movement | draft | medium | yes | yes | medium | medium | Edge cases cover priority/collision but could add rollback/save or assist-mode implications; common bugs are concrete but narrow. | Strengthen edge cases around network prediction or checkpoint restore before review. |
| `movement.dodge_roll` | movement | draft | medium | yes | yes | strong | strong | Needs explicit damage-resolver review for i-frame boundaries and authority. | Verify i-frame timing, capsule restoration, and relationship strengths. |
| `platforming.coyote_time` | platforming | draft | medium | yes | yes | medium | strong | Edge cases are practical but could add respawn/load or animation-lock interactions. | Add one concrete state-reset or input-priority edge case before review. |
| `platforming.jump_buffering` | platforming | draft | medium | yes | yes | strong | strong | Batch 1 added animation-lock, cutscene/menu focus, assist-setting, and jump-priority coverage. Source-confidence rationale still missing. | Ready for a later maintainer review pass; do not mark reviewed yet. |
| `platforming.double_jump` | platforming | draft | medium | yes | yes | strong | strong | Needs source-confidence rationale and scope calibration for networked games. | Review jump-count reset rules and relationship targets. |
| `platforming.wall_jump` | platforming | draft | medium | yes | yes | strong | strong | Strong collision-normal coverage; relationship QA should check overlap with wall slide and coyote time. | Review related edge ordering and scope values. |
| `combat.reload` | combat | draft | medium | yes | yes | strong | strong | Batch 1 added save/load, reconnect, rollback, staged reload, and predicted UI rejection coverage. Source-confidence rationale still missing. | Ready for a later maintainer review pass; do not mark reviewed yet. |
| `combat.ranged_attack` | combat | draft | medium | yes | yes | strong | strong | Needs review of projectile ownership and spread determinism relationships. | Validate scope and relationship strength against reload, hit marker, and reflection. |
| `combat.parry` | combat | draft | medium | yes | yes | strong | strong | Needs careful source-confidence rationale because timing windows vary by genre. | Review resolver ordering, rollback clock, and projectile ownership. |
| `combat.block` | combat | draft | medium | yes | yes | strong | strong | Needs guard-angle and stamina rules checked against shield/parry relationships. | Review damage resolver assumptions and scope profile. |
| `ui_ux.cooldown_indicator` | ui_ux | draft | medium | yes | yes | strong | strong | Batch 1 added disabled-ready mismatch, authority correction, charge-pip, and recycled-widget coverage. Source-confidence rationale still missing. | Ready for a later maintainer review pass; do not mark reviewed yet. |
| `ui_ux.interaction_prompt` | ui_ux | draft | medium | yes | yes | strong | strong | Needs review for localization and screen-reader/nonvisual prompt alternatives. | Confirm stale target, remapping, and prompt priority rules. |
| `ui_ux.minimap` | ui_ux | draft | medium | yes | yes | strong | strong | Good edge cases; relationship targets should be checked for over-suggesting unrelated strategy mechanics. | Review marker filtering, save-state, and fog links. |
| `progression.skill_tree` | progression | draft | medium | yes | yes | strong | strong | Strong graph/save/UI coverage; source-confidence rationale and migration policy review still missing. | Review prerequisite graph, respec, and unlock relationships. |
| `progression.unlockable_abilities` | progression | draft | medium | yes | yes | strong | strong | Needs review for traversal soft-locks and equipment-granted ability revocation. | Check relationship targets and save migration assumptions. |
| `economy.coins` | economy | draft | medium | yes | yes | strong | strong | Needs confidence rationale and overflow/rounding review for different economy scales. | Review transaction idempotency and wallet authority assumptions. |
| `economy.shop` | economy | draft | medium | yes | yes | strong | strong | Strong transaction coverage; relationship and scope should be checked against multiplayer shops. | Review stock, stale UI, and capacity rollback cases. |
| `camera.smooth_follow_camera` | camera | draft | medium | yes | yes | strong | strong | Good camera state coverage; accessibility comfort and motion sickness review could be deeper. | Review bounds/lookahead/camera comfort notes before review status. |
| `ai.patrol` | ai | draft | medium | yes | yes | strong | strong | Strong state/debug coverage; needs source-confidence rationale and review of navmesh failure wording. | Review resume rules after chase/investigation and save/load state. |
| `ai.line_of_sight_detection` | ai | draft | medium | yes | yes | strong | strong | Strong occlusion/update-order coverage; needs accessibility/debug expectations for designers. | Review material rules, tick order, and debug outputs. |
| `multiplayer.online_coop` | multiplayer | draft | medium | yes | yes | strong | strong | High-risk broad system; scope profile and relationships need careful calibration. | Review authority boundaries, reconnect, host migration, and save semantics. |
| `survival.hunger` | survival | draft | medium | yes | yes | strong | strong | Strong survival-clock coverage; source-confidence rationale and offline policy review needed. | Review recovery transactions, warning bands, and multiplayer authority. |
| `survival.temperature` | survival | draft | medium | yes | yes | strong | strong | Strong environmental coverage; could use more accessibility review for readable warnings. | Review wetness/shelter persistence and UI thresholds. |
| `crafting.recipe_crafting` | crafting | draft | medium | yes | yes | strong | strong | Strong transaction coverage; recipe migration and duplicate output review needed. | Review capacity rollback, server validation, and item metadata. |
| `crafting.crafting_queue` | crafting | draft | medium | yes | yes | strong | strong | Strong queue coverage; needs offline-progress trust and clock-source review. | Review cancellation/completion race and multiplayer reordering. |
| `time.cooldown_time` | time | draft | medium | yes | yes | strong | strong | Strong cross-system coverage; relationship count is central enough to need extra QA. | Review cooldown group, charge recovery, prediction, and save/load semantics. |
| `time.time_rewind` | time | draft | medium | yes | yes | strong | strong | Batch 1 added reward/quest/narrative, projectile, AI, RNG, and save/checkpoint coverage. Still high-risk and needs dedicated architecture review. | Not ready for reviewed status; perform separate architecture-focused review. |
| `physics.physics_push_pull` | physics | draft | medium | yes | yes | strong | strong | Strong manipulation coverage; needs review for deterministic physics and multiplayer authority limits. | Review save/load mid-constraint and prediction rejection cases. |
| `puzzle.pressure_plate` | puzzle | draft | medium | yes | yes | strong | strong | Strong trigger/physics coverage; needs level-authoring validation review. | Review stacked-object, destroyed-body, and persistence rules. |

## Mechanics Needing Stronger Edge Cases Before Review

- `movement.air_dash`: add rollback, checkpoint, or assist-mode timing edge cases.
- `platforming.coyote_time`: add state reset or animation-lock interaction.
- `platforming.jump_buffering`: Batch 1 improved this area; keep on final review list for priority-order validation.
- `combat.reload`: Batch 1 improved this area; keep on final review list for non-magazine ammo variants.

## Mechanics Needing Stronger Common Bugs Before Review

- `movement.air_dash`: add a bug tied to prediction correction, checkpoint restore, or stale dash charge state.
- `platforming.jump_buffering`: Batch 1 improved this area; verify against coyote time, double jump, and wall jump in playtest.
- `combat.reload`: Batch 1 improved this area; verify save/load and prediction behavior during implementation review.

## Cross-Cutting Review Gaps

- No selected mechanic has a written `source_confidence` rationale yet.
- All selected mechanics are still `draft`.
- Relationship coverage is present, but relationship quality still needs human review.
- `scope_profile` values exist, but high-risk mechanics need calibration against scenario QA.
- Edge cases and common bugs are generally concrete, but reviewed status should require at least one maintainer pass focused only on prototype-breaking details.

## Recommended Batch 1

Start with five mechanics that exercise different failure modes:

- `movement.dash`
- `platforming.jump_buffering`
- `combat.reload`
- `ui_ux.cooldown_indicator`
- `time.time_rewind`

Batch 1 should improve edge cases and common bugs first, then review implementation notes, relationships, scope profile, example games, and confidence rationale.

Batch 1 report: [`reviewed-core-batch-1-v0.3.md`](reviewed-core-batch-1-v0.3.md)
