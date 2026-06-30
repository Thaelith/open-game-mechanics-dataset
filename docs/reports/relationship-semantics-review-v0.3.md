# Relationship Semantics Review v0.3

This report applies the v0.3 relationship direction criteria to Batch 1 and nearby relationship concerns.

It is a planning report only. It does not change mechanic JSON, schema, site behavior, Mixer logic, mechanic status, or source confidence.

## Summary

- Reviewed relationship groups: dash/cooldown UI/time, reload/ranged/cooldown UI/time, jump buffering/accessibility, and time rewind conflicts.
- Cleanup Pass 1 applied targeted low-risk changes to the four cleanup candidates only.
- Main finding: `requires`, `conflicts_with`, `soft_conflicts_with`, `extends`, `consumes`, `unlocks`, and `balances` are generally easier to read directionally than `supports`.
- Primary future cleanup target: `supports` edges where the source is the mechanic receiving support rather than the support provider.

## movement.dash / ui_ux.cooldown_indicator / time.cooldown_time

| Relationship | Assessment | Notes |
| --- | --- | --- |
| `movement.dash -> time.cooldown_time` as `requires` | clearly correct | Dash availability is gated by cooldown or charge timing, so `source requires target` is readable and useful. |
| `movement.dash -> ui_ux.cooldown_indicator` as `supports` | direction-questionable | The reason says dash charges and cooldowns need readable availability feedback. Under the preferred v0.3 convention, this is better represented by `ui_ux.cooldown_indicator supports movement.dash`, or by a dash-side `enhances`/`requires` edge only if the UI is essential to the design. |
| `ui_ux.cooldown_indicator -> movement.dash` as `supports` | clearly correct | The indicator provides readability support to dash. This is the cleaner direction for Mixer suggestions. |
| `time.cooldown_time -> ui_ux.cooldown_indicator` as `supports` | clearly correct | Cooldown timing state supports a UI indicator by providing remaining-time and ready-state data. |
| `time.cooldown_time -> movement.dash` as `balances` | clearly correct | Cooldown timing limits repeated burst movement and creates recovery windows. |

Future review: consider removing or retyping `movement.dash -> ui_ux.cooldown_indicator` after confirming whether the reverse support edge already covers the planning need.

## combat.reload / combat.ranged_attack / ui_ux.cooldown_indicator / time.cooldown_time

| Relationship | Assessment | Notes |
| --- | --- | --- |
| `combat.reload -> time.cooldown_time` as `requires` | clearly correct | Reload needs a timing window or commit period before firing can be valid again. |
| `combat.reload -> ui_ux.cooldown_indicator` as `supports` | direction-questionable | The reason says reload benefits from visible progress and ready feedback. Under the preferred convention, `ui_ux.cooldown_indicator supports combat.reload` is clearer. |
| `ui_ux.cooldown_indicator -> combat.reload` as `supports` | clearly correct | The indicator supports reload by making progress, cancellation, and ready state readable. |
| `combat.reload -> combat.ranged_attack` as `supports` | mostly correct | Reload restores firing availability and shares ammo authority with ranged attack validation, so reload can support ranged attack loops. The reason should continue to avoid implying every ranged attack requires magazines. |
| `combat.ranged_attack -> combat.reload` as `supports` | type-questionable | The reason says ranged attacks need reload or ammo recovery when shots are limited. If the data means a dependency, this may be `requires`; if it is only common context, it may belong in `related_mechanics` or `combines_well_with`. |

Ammo/reload clarity: current reload edges are useful, but a future pass should clarify whether reload is a support mechanic, a required ammo transaction, or a variant-specific pacing rule for each ranged attack style.

## platforming.jump_buffering / accessibility.toggle_hold_option

| Relationship | Assessment | Notes |
| --- | --- | --- |
| `platforming.jump_buffering -> accessibility.toggle_hold_option` as `supports` | direction-questionable | The reason says hold, toggle, and assisted input settings can change how long jump intent remains buffered. That reads as accessibility settings supporting or modifying jump buffering, not jump buffering supporting the accessibility setting. |

Possible future directions:

- Add or use `accessibility.toggle_hold_option supports platforming.jump_buffering` if the accessibility entry should suggest input-buffer interactions.
- Retype the jump-buffer edge as `soft_conflicts_with` if the intended meaning is that hold/toggle options complicate buffer timing.
- Omit the typed edge if the relationship is too contextual and keep it as a legacy browse association.

No JSON change is recommended in this report; it only flags the edge for a later cleanup batch.

## time.time_rewind Relationships

| Relationship | Assessment | Notes |
| --- | --- | --- |
| `time.time_rewind -> time.cooldown_time` as `soft_conflicts_with` | clearly correct | The edge warns that cooldown elapsed time, remaining duration, and consumed charges need rewind rules. |
| `time.time_rewind -> traversal.grappling_hook` as `soft_conflicts_with` | clearly correct | Grapple attachment, rope length, velocity, and collision state are rewind snapshot risks. |
| `time.time_rewind -> physics.moving_platform` as `soft_conflicts_with` | clearly correct | Moving platform restore order and passenger/contact state are high-risk rewind concerns. |
| `time.time_rewind -> multiplayer.online_coop` as `conflicts_with` | clearly correct | Player-controlled rewind conflicts with ordinary online co-op authority unless shared timeline and rollback rules are designed first. |

Future review: these cautionary edges should stay source-to-target from `time.time_rewind` unless the target entries independently need reciprocal warnings.

## Future Relationship Cleanup Checklist

Before rewriting relationships:

- Check whether the relationship reason matches the type.
- Check whether the direction matches the source/target meaning.
- Check whether reciprocal edges are actually useful.
- Check whether the relationship helps Mixer suggestions.
- Check whether the relationship creates noisy or generic recommendations.
- Check whether UI/accessibility relationships need special conventions.
- Check whether conflict edges are too strong or too broad.
- Check whether support edges should become `enhances`, `requires`, `balances`, or reverse `supports` instead.
- Check whether edge reasons are specific enough for review.
- Prefer small batches with before/after graph checks over broad graph rewrites.

## Cleanup Pass 1 Result

| Old edge | Action taken | Reason | Relationship count impact | Mixer behavior impact |
| --- | --- | --- | --- | --- |
| `movement.dash -> ui_ux.cooldown_indicator` as `supports` | removed | The reverse `ui_ux.cooldown_indicator -> movement.dash` support edge already captures the useful planning meaning that cooldown UI supports dash readability. | -1 | Dash no longer suggests cooldown indicator through this typed edge; the reverse UI support edge remains available when the indicator is selected. |
| `combat.reload -> ui_ux.cooldown_indicator` as `supports` | removed | The reverse `ui_ux.cooldown_indicator -> combat.reload` support edge already captures the useful planning meaning that cooldown/progress UI supports reload readability. | -1 | Reload no longer suggests cooldown indicator through this typed edge; the reverse UI support edge remains available when the indicator is selected. |
| `combat.ranged_attack -> combat.reload` as `supports` | removed | The edge overgeneralized reload/ammo recovery for all ranged attacks. `combat.reload` remains in `related_mechanics` for browsing, and `combat.reload -> combat.ranged_attack` remains as the clearer support edge. | -1 | Ranged attack no longer treats reload as a typed support suggestion; browse context remains through `related_mechanics`. |
| `platforming.jump_buffering -> accessibility.toggle_hold_option` as `supports` | reversed | The original direction read as if jump buffering supported the accessibility setting. The new `accessibility.toggle_hold_option -> platforming.jump_buffering` edge says toggle/hold settings support jump buffering by changing assisted input timing assumptions. | 0 net for this candidate | Accessibility toggle/hold now suggests jump buffering as an affected input mechanic; jump buffering no longer points at toggle/hold as a support target. |

Total typed relationships changed from 531 to 528. Relationship coverage remained 175 mechanics with typed relationships.

## Remaining Relationship Cleanup Candidates

No additional cleanup candidates from this review should be changed without a new focused pass. Future work should re-run this process on another small group of edges rather than broad-rewriting the graph.
