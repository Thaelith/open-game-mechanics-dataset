# Taxonomy Positioning Notes

This note records current thinking for the Open Game Mechanics Dataset taxonomy. It is not a migration plan and does not remove any existing root category.

## Current Position

The project currently uses stable root categories such as `movement`, `platforming`, `combat`, `camera`, `physics`, `puzzle`, `ai`, `ui_ux`, `accessibility`, `procedural_generation`, `roguelike`, `strategy`, and `simulation`. These roots are useful because they map cleanly to how developers search for mechanics and how contributors organize files.

The tradeoff is that some mechanics naturally cross category boundaries. `wall_jump` is movement, platforming, collision, camera, animation, and level design at the same time. The current dataset handles this by choosing one primary category and using `related_mechanics`, `combines_well_with`, tags, genres, and required systems to represent cross-category context.

## Near-Term Guidance

Keep root categories stable until there is evidence from contributions and search behavior that a migration is worth the cost. Improve quality first by:

- making entries more specific within their current category
- using stronger subcategories
- linking adjacent mechanics
- adding better tags
- adding search and coverage tooling

This avoids churn while still making the dataset more discoverable.

## Category Boundaries

`movement` should cover general avatar locomotion such as walk, sprint, crouch, slide, dash, prone, and swimming.

`platforming` should cover precision spatial mechanics that depend heavily on jumps, ledges, walls, platforms, and collision affordances.

`traversal` should cover tools or routes that move the player through world structure, such as grappling hooks, wall runs, ziplines, ladders, mantling, and teleport movement.

`physics` should cover simulated world behavior and collision affordances that are not primarily avatar verbs.

`ui_ux` should cover interface mechanics that communicate state or accept player choices.

`accessibility` should cover player-facing options that adapt input, timing, perception, difficulty, or presentation.

## Potential Future Work

The dataset may eventually need a separate concept of `domain`, `system_family`, or `interaction_model` in addition to root category. For now, that should be explored in examples and reports rather than pushed into a schema migration.

Possible future dimensions:

- player verb vs. world rule vs. interface affordance
- moment-to-moment, encounter, run, campaign, or account scope
- deterministic, probabilistic, authored, or generated behavior
- input timing, spatial reasoning, resource management, social coordination, or information management

## Migration Bar

A taxonomy migration should only happen when it improves real usage. Before changing root categories, maintainers should be able to point to repeated contributor confusion, search failures, duplicate entries, or analysis needs that cannot be solved by subcategory, tags, or documentation.
