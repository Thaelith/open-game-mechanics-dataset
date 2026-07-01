# Taxonomy And Categorization Criteria

## Purpose

This dataset is not trying to be a complete objective list of all possible game mechanics. That list is not finite in practice, and any taxonomy reflects maintainer and community categorization choices.

The goal is a practical, engine-agnostic, community-reviewable dataset and checklist for:

- Prototyping.
- Design planning.
- AI-agent context.
- Edge case review.
- Common bug discovery.
- "What could go wrong?" thinking.

Categories, mechanic IDs, relationships, and scope profiles are meant to make entries easier to browse, validate, compare, and review. They are not a universal ontology of game design.

## What Counts As A Mechanic?

A mechanic should generally have at least some of these properties:

- Distinct player-facing behavior.
- Distinct rules or state.
- Distinct implementation concerns.
- Distinct tuning parameters.
- Distinct edge cases or common bugs.
- Distinct relationships with other systems.
- Meaningful design purpose beyond a simple number change.

For example, `movement.dash` can be a mechanic because it has movement state, collision handling, cooldowns, input rules, possible invulnerability frames, recovery behavior, and edge cases around state reset and prediction.

`ui_ux.cooldown_indicator` can also be a mechanic-style dataset entry because it owns UI state, display timing, authoritative timer synchronization, accessibility concerns, stale widget bugs, and relationships to cooldown-based actions.

## What Should Be A Variant?

A variant is usually a named form of a mechanic where:

- The core state machine is similar.
- Most required systems are shared.
- Differences are mostly constraints, direction, cost, allowed context, presentation, or tuning.
- Edge cases overlap heavily.

Examples:

- Ground dash, air dash, omnidirectional dash, and stamina dash may be variants unless they introduce substantially different systems or edge cases.
- Full-magazine reload and per-shell reload may be reload variants unless they require separate transaction models, UI behavior, interruption rules, or save/load handling.

Variants can be documented in `common_variants`, `parameters`, `relationships`, or implementation notes. They should become separate mechanic files only when the difference is useful enough for review, testing, or tooling.

## What Should Be A Parameter?

A parameter is usually:

- A tunable value.
- A threshold.
- A duration.
- A cost.
- A range.
- A multiplier.
- A boolean option.
- A mode flag.

Examples:

- Sprint speed multiplier.
- Dash distance.
- Jump buffer duration.
- Reload duration.
- Cooldown duration.
- Number of charges.

A parameter should not become a separate mechanic unless it creates significantly different behavior, implementation risk, edge cases, common bugs, design purpose, or relationship behavior.

## Prerequisites And Failure Modes

Boundary decisions should be supported by practical prerequisites and failure modes, not only by familiar names.

When deciding whether an entry is a mechanic, variant, parameter, or overbroad system, reviewers should ask what the entry needs to work, what state and input assumptions it owns, what timing/resource/save/load/network assumptions matter, and what usually breaks during prototyping.

If two entries share nearly identical prerequisites, state assumptions, edge cases, and common bugs, they may be variants or parameters even if their names are familiar. If a separate entry exposes distinct failure modes that help developers write better tests, the split is easier to justify.

## When To Split Entries

Split a mechanic into a separate entry when:

- It has a different state machine.
- It creates unique edge cases or common bugs.
- It requires different systems.
- It is commonly discussed as a separate design concept.
- It has different relationship behavior.
- It significantly changes design purpose or player behavior.
- Splitting it helps developers write better tests or prototype checks.

Splitting should make the dataset clearer and more useful. It should not create duplicate entries that differ only by a number.

## When To Merge Or Reframe Entries

Merge or reframe entries when:

- Two entries mostly duplicate each other.
- The difference is only a numeric tuning value.
- The edge cases and common bugs are nearly identical.
- One entry is better represented as a variant or parameter of another.
- The split makes the dataset harder to understand.
- The relationship graph becomes noisy because separate IDs are standing in for minor tuning options.

Merging does not always mean deleting useful information. A mechanic can absorb another entry as a variant, parameter, common variant, or design note.

## Context Dependence

Mechanics do not exist in isolation.

The same mechanic can behave differently depending on genre, camera, control scheme, level design, multiplayer model, save/load model, progression, accessibility settings, and surrounding systems.

The dataset should not imply that mechanics combine linearly or automatically. A movement mechanic that works well in a single-player 2D platformer may create different risks in a networked 3D game with physics traversal and inventory persistence.

The Mechanic Mixer is a planning aid, not proof that mechanics will combine well. It surfaces selected relationships, dependencies, conflicts, scope pressure, and missing support mechanics so a human can review them.

Typed relationships are review hints, not objective laws. A relationship can be useful in one project and irrelevant in another.

## Bias And Coverage Limitations

The dataset reflects maintainer and community categorization choices.

The list is not complete and never can be complete. Missing mechanics do not imply those mechanics are unimportant. Categories are practical navigation aids, not a universal theory of game design.

Community feedback should improve the criteria over time. When contributors disagree about whether something is a mechanic, variant, or parameter, the useful question is: which representation makes the entry easier to review, test, implement, and use in tools?

## Practical Review Questions

Use these questions when adding, reviewing, splitting, merging, or reframing entries:

- Is this really a mechanic, or is it a variant?
- Is this really a mechanic, or is it a parameter?
- Does it have unique edge cases?
- Does it have unique common bugs?
- Does it need different required systems?
- Does it create different design decisions?
- Does it have meaningful relationships with other mechanics?
- Would merging it make the dataset clearer?
- Would splitting it make review or testing clearer?
- Is context-dependence clearly documented?
- Does the entry help a developer ask "what could go wrong?" before prototyping?

## Applied Reviews

Current v0.3 review summary applying these criteria:

- [`reports/v0.3-review-summary.md`](reports/v0.3-review-summary.md)
