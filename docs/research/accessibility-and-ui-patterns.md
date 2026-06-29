# Accessibility and UI Pattern Notes

This note captures practical patterns that should influence mechanic entries, especially `accessibility_notes`, `implementation_notes`, and UI/UX mechanics. It is guidance, not a schema change.

## Accessibility Is Not Only a Category

The `accessibility` category contains explicit support mechanics such as remappable controls, toggle/hold options, text scaling, assist modes, and colorblind modes. Other mechanics still need accessibility notes because timing, visibility, audio cues, input strain, cognitive load, and failure recovery affect whether players can use them.

Every mechanic should answer at least one accessibility question:

- How does the player know it is available?
- How does the player know it succeeded or failed?
- Does it require narrow timing, repeated inputs, color distinction, audio-only cues, or camera motion?
- Can the player remap, buffer, toggle, slow, resize, repeat, or clarify the interaction?

## Common UI Support Patterns

Cooldown-driven mechanics benefit from a `ui_ux.cooldown_indicator`, clear ready-state feedback, and consistent unavailable-state feedback.

Targeting mechanics benefit from lock indicators, line-of-sight feedback, target priority rules, and graceful behavior when the target disappears.

Resource mechanics benefit from thresholds, warnings before failure, and readable recovery information.

Rhythm and precision mechanics benefit from calibration, input buffering, adjustable timing windows, and multimodal cues.

Stealth mechanics benefit from suspicion meters, visibility meters, last-known-position indicators, and explicit enemy state changes.

## Toggle and Hold Choices

Mechanics that require sustained input should document whether they support hold, toggle, or both. Crouch, aim-down-sights, sprint, block, lock-on, interaction prompts, and accessibility options are common candidates.

Toggle modes need careful state reset rules:

- reset on death or respawn when appropriate
- reset when control context changes
- preserve user preference across sessions
- avoid trapping the player in an unsafe state after menus or cutscenes

## Motion and Camera Comfort

Camera mechanics such as screen shake, dynamic field of view, zoom, and lock-on should mention intensity limits and user controls. Good accessibility notes identify how to reduce motion without hiding critical gameplay information.

## Writing Better Accessibility Notes

Weak note: "Provide clear feedback."

Better note: "Expose a screen-shake intensity slider and pair impacts with non-motion cues such as hit flash, audio, and controller vibration."

Weak note: "Allow remapping."

Better note: "Support both hold and toggle for crouch, and store the preference separately from key binding."

The dataset should prefer notes that name the player problem and the implementation affordance.
