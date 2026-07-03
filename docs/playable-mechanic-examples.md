# Playable Mechanic Examples

Playable examples are small original browser demos that help users feel a mechanic and inspect the state assumptions behind it.

They use simple canvas shapes instead of commercial game footage, screenshots, GIFs, or assets. The goal is to teach timing, state, input, cooldowns, and common failure modes without copying any game.

## Current MVP Demos

- `movement.dash`
- `platforming.coyote_time`
- `platforming.jump_buffering`
- `combat.reload`
- `ui_ux.cooldown_indicator`

Open the demos from [`../site/playable-examples.html`](../site/playable-examples.html), or from the Playable Example link shown in the browser detail panel for supported mechanics.

## What These Demos Are For

- Showing the mechanic as an interactive state machine.
- Making prerequisites and timing assumptions easier to understand.
- Demonstrating common implementation risks such as stale input, cooldown desync, or reload state bugs.
- Giving developers and AI agents a small original reference before implementation planning.

## What These Demos Are Not

- They are not production-ready implementations.
- They are not engine-specific templates.
- They are not proof that a mechanic will be fun.
- They are not recreations of commercial games.
- They do not replace mechanic JSON review, playtesting, accessibility review, or technical design.

## How Future Demos Should Be Added

1. Choose mechanics where interaction clarifies a real timing, state, input, or UI risk.
2. Keep the demo original and use simple shapes or generated original assets only.
3. Add metadata in `site/playable-examples-data.js`.
4. Add demo behavior in `site/playable-examples.js`.
5. Link from the main browser only through the external metadata file, not mechanic JSON.
6. Keep controls keyboard-accessible where practical and provide simple touch controls.
7. Run site syntax checks, dataset validation, Mixer tests, and browser smoke tests.

## Relationship To `example_games`

`example_games` point users toward recognizable study references. Playable examples are different: they are original, simplified demonstrations maintained in this repository.

Both are study aids. Neither should be treated as proof of exact implementation details in commercial games.
