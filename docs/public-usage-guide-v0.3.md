# Public Usage Guide v0.3

This guide explains how to try the Open Game Mechanics Dataset as a public reader. It focuses on practical workflows rather than release process.

The dataset is a structured study and planning resource. It is not a complete game database, a code library, a production estimate system, or proof of proprietary implementation details.

## Who This Is For

- Game developers planning prototypes or features.
- Students learning how mechanics connect to systems, inputs, UI, bugs, and accessibility.
- Designers and researchers who need a shared mechanic vocabulary.
- Contributors reviewing mechanic boundaries, examples, and failure modes.
- AI-assisted design or coding workflows that need structured mechanic context.

## 5-Minute Quickstart

1. Open the [static browser](https://thaelith.github.io/open-game-mechanics-dataset/site/).
2. Search for a mechanic such as `dash`, `reload`, `cooldown`, or `stamina`.
3. Open a mechanic and scan its prerequisites, parameters, edge cases, common bugs, relationships, scope profile, and example games.
4. Try the [playable examples](https://thaelith.github.io/open-game-mechanics-dataset/site/playable-examples.html) for supported mechanics.
5. Add 3-6 mechanics to the Mixer to inspect dependencies, conflicts, scope pressure, and planning prompts.

## Workflow 1: Mechanic-First Browsing

Use mechanic-first browsing when you already know the feature you want to prototype.

Good questions:

- What systems does this mechanic need?
- What state does it own or depend on?
- What parameters matter first?
- What breaks during prototyping?
- What relationships or conflicts should I check before combining it with other mechanics?

Start with a mechanic entry, then inspect related mechanics and typed relationships. Treat `scope_profile` as relative planning pressure, not a production-hour estimate.

## Workflow 2: Game-First Discovery

Use the Games view when you want a recognizable study anchor.

The browser derives game-to-mechanics groups from mechanic-level `example_games`. This helps answer:

- Which mechanics can I study in a specific game?
- Which categories are represented by a game anchor?
- Which mechanic IDs describe visible behavior in that game?
- Which game-associated mechanics should I add to the Mixer for planning?

Game examples are lightweight study references. They are not exhaustive, they are not complete game profiles, and they do not prove exact implementation details.

## Workflow 3: Playable Examples

Playable examples are original canvas demos for a small MVP set of mechanics:

- `movement.dash`
- `platforming.coyote_time`
- `platforming.jump_buffering`
- `combat.reload`
- `ui_ux.cooldown_indicator`

Use them to feel timing, input, cooldown, state, and UI feedback assumptions. They are not recreations of commercial games, engine-specific templates, or production-ready implementations.

## Workflow 4: Mixer

The Mixer analyzes selected mechanics using dataset fields. It can surface:

- required systems,
- missing dependencies or support mechanics,
- typed relationship warnings,
- hard and soft conflicts,
- scope pressure,
- MVP trim suggestions,
- related additions,
- AI planning prompts.

The Mixer is deterministic and useful for planning. It is not a balance simulator, fun predictor, production estimator, or proof that selected mechanics will combine cleanly.

## How To Interpret Example Games Safely

Use example games as study anchors:

- "This mechanic is visibly present enough to study."
- "This game may help me understand the player-facing behavior."
- "This title can help me compare variants or context."

Do not treat example games as:

- citations for proprietary implementation details,
- a full list of mechanics in that game,
- evidence that two games implement a mechanic the same way,
- proof that a mechanic will fit your project.

Title and note rules are documented in [`game-anchor-policy-v0.3.md`](game-anchor-policy-v0.3.md). Current game-index coverage is tracked in [`reports/game-examples-index-report-v0.3.md`](reports/game-examples-index-report-v0.3.md).

## How To Contribute Feedback

Useful feedback is specific and reviewable:

- A mechanic is missing a practical edge case or common bug.
- A mechanic reads like a variant or parameter rather than a distinct entry.
- A relationship direction or type seems misleading.
- An example game note is too broad, ambiguous, or title-inconsistent.
- A playable example fails to demonstrate the intended state or timing risk.

When possible, mention the mechanic ID, file path, game title, and the exact wording or behavior that should be reviewed.

## Known Limitations

- Most mechanics remain `draft`.
- `source_confidence` is a practical signal, not a formal citation system.
- Example games are manually curated and still lightweight.
- The Games view is derived from mechanic entries, not a separate game database.
- The taxonomy is practical and reviewable, not objective or complete.
- Playable examples currently cover only five mechanics.
- The Mixer depends on relationship quality and can still produce noisy suggestions.
