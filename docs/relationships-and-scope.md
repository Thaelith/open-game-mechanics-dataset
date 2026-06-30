# Relationships And Scope

This project supports optional typed mechanic relationships and rough scope metadata. These fields are the v0.2 foundation used by the static Mechanic Mixer MVP and future planning tools such as an MVP trimmer, dependency checker, conflict detector, and missing-mechanic recommender.

The fields are optional. Existing mechanics remain valid without them.

## Field Roles

`related_mechanics` remains a simple browse and discovery field. Use it when another mechanic is useful context, but the exact relationship does not need to be machine interpreted.

`combines_well_with` remains a simple positive association field. Use it when two mechanics commonly work well together from a design perspective.

`relationships` is the machine-readable graph. Use it when a tool should be able to infer dependency, support, extension, conflict, economy flow, or unlock structure.

`scope_profile` is rough relative planning metadata. It is not an hour estimate, production guarantee, or statement that every game will pay the same cost.

## Relationship Object

```json
{
  "target": "movement.dash",
  "type": "requires",
  "reason": "Air dash depends on the base dash action and airborne movement state.",
  "strength": "strong"
}
```

`target` must be an existing mechanic id, `external.*`, or `future.*`.

`reason` should explain the relationship in concrete design or implementation terms. Avoid filler such as "works well together."

## Relationship Types

| Type | Meaning |
| --- | --- |
| `requires` | The source mechanic depends on the target to function or make sense. |
| `supports` | The target helps the source work reliably, readably, or ergonomically. |
| `enhances` | The target makes the source more expressive, satisfying, or useful, but is not required. |
| `extends` | The source builds a larger mechanic from the target. |
| `is_variant_of` | The source is a specialized form of the target. |
| `conflicts_with` | The mechanics create a hard design, technical, or rule conflict when combined. |
| `soft_conflicts_with` | The mechanics can work together, but need extra constraints or careful tuning. |
| `balances` | The target limits, counterweights, or stabilizes the source. |
| `feeds` | The source produces resources, state, pressure, or content consumed by the target. |
| `consumes` | The source spends or uses state/resources provided by the target. |
| `unlocks` | The source grants access to the target through progression or state. |

## Relationship Strength

| Strength | Meaning |
| --- | --- |
| `weak` | Useful context, but many games can ignore the edge. |
| `medium` | Commonly important, but not universally required. |
| `strong` | A future tool should treat this as a major planning signal. |

## Good Examples

```json
{
  "target": "movement.stamina_movement",
  "type": "consumes",
  "reason": "Dodge roll often spends stamina to limit repeated evasive actions and create recovery pressure.",
  "strength": "strong"
}
```

```json
{
  "target": "progression.upgrade_shop",
  "type": "feeds",
  "reason": "Idle income creates recurring currency that can fund long-term upgrade purchases.",
  "strength": "strong"
}
```

```json
{
  "target": "time.time_rewind",
  "type": "soft_conflicts_with",
  "reason": "Physics-heavy traversal can be difficult to replay deterministically when rewind snapshots omit velocity, attachment, or collision state.",
  "strength": "medium"
}
```

## Bad Examples

```json
{
  "target": "movement.stamina_movement",
  "type": "enhances",
  "reason": "Works well together.",
  "strength": "medium"
}
```

This is too vague. It does not explain what state, cost, pressure, dependency, or conflict a tool should infer.

```json
{
  "target": "combat.parry",
  "type": "requires",
  "reason": "Both are combat.",
  "strength": "strong"
}
```

This overstates the edge. Shared category membership is not a dependency.

## Scope Profile

```json
{
  "mvp_role": "core",
  "implementation_cost": 3,
  "design_cost": 2,
  "tuning_cost": 4,
  "content_cost": 1,
  "networking_risk": 2,
  "save_load_risk": 2,
  "ui_risk": 1
}
```

Scores are relative signals:

| Score | Meaning |
| --- | --- |
| `0` | Risk only: not meaningfully applicable. |
| `1` | Low effort or risk. |
| `3` | Medium effort or risk. |
| `5` | High effort or risk. |

Cost fields use `1-5`:

| Field | What To Consider |
| --- | --- |
| `implementation_cost` | Runtime systems, data model, engine work, platform constraints, and debugging complexity. |
| `design_cost` | Rule clarity, player comprehension, pacing, counterplay, and system interactions. |
| `tuning_cost` | Amount of iteration needed to feel fair, readable, and balanced. |
| `content_cost` | Required authored levels, animations, items, UI assets, encounters, or data tables. |

Risk fields use `0-5`:

| Field | What To Consider |
| --- | --- |
| `networking_risk` | Authority, prediction, rollback, anti-cheat, synchronization, and reconnect concerns. |
| `save_load_risk` | Persistence, migration, checkpoint restoration, and replay determinism. |
| `ui_risk` | HUD, prompts, menus, readability, input devices, localization, and accessibility presentation. |

## MVP Roles

| Role | Meaning |
| --- | --- |
| `core` | Usually central to the experience or genre promise. |
| `support` | Helps core mechanics work, but is rarely the headline feature by itself. |
| `optional` | Useful for depth or variation, but removable from many MVPs. |
| `polish` | Mostly improves feel, readability, comfort, or presentation. |
| `unknown` | Use sparingly when the mechanic is too context-dependent to classify. |

## How Future Tools Should Use This

The Mechanic Mixer can use `requires` and `supports` edges to suggest missing prerequisites, `conflicts_with` and `soft_conflicts_with` edges to warn about risky combinations, and `scope_profile` to estimate MVP pressure.

A Game Concept Builder can cite mechanic ids and relationship reasons instead of inventing unsupported dependencies.

An MVP trimmer can preserve `core` mechanics, remove `optional` and `polish` mechanics first, and flag high-risk systems when networking, save/load, or UI complexity exceeds the project target.

## What Not To Do

Do not copy every `related_mechanics` item into `relationships`. Typed relationships should add a reason and a useful inference.

Do not use `requires` for loose thematic similarity.

Do not use `conflicts_with` for ordinary tuning tradeoffs. Use it for combinations that are structurally incompatible or likely to break the design without major constraints.

Do not treat `scope_profile` as a contract. It is only a rough planning signal for comparison within this dataset.
