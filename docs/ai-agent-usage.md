# AI Agent Usage

The dataset can be used as structured context for AI coding and design agents. It does not automatically produce correct game code, final designs, or production estimates.

Agents should cite mechanic IDs, inspect the relevant JSON files, and treat Mixer output as planning context rather than design truth.

## Use One Mechanic As Context

Example workflow:

1. Open a mechanic JSON file, such as [`data/movement/air_dash.json`](../data/movement/air_dash.json).
2. Paste it into an AI coding agent.
3. Ask the agent to create an implementation plan for a specific engine.
4. Require the agent to account for parameters, required systems, edge cases, common bugs, balancing notes, accessibility notes, and implementation notes.

Example prompt:

```text
You are implementing movement.air_dash in Unity/Godot/Web.
Use the provided Open Game Mechanics Dataset JSON as planning context.
Do not invent unrelated mechanics.
First summarize required systems, parameters, edge cases, and common bugs.
Then propose a minimal prototype implementation plan.
Do not write final production code until the plan is reviewed.
```

## Use A Mixer Export As Planning Input

Example workflow:

1. Open the static browser.
2. Add 3-6 mechanics to the Mechanic Mixer.
3. Copy Concept JSON.
4. Paste it into an AI coding or design agent.
5. Ask the agent to inspect the relevant mechanic JSON files before implementation.

Mixer output is deterministic. Suggestions are traceable to selected mechanic IDs, typed `relationships`, legacy browse fields, `required_systems`, and `scope_profile`. Treat the output as planning context, not final design authority.

Example prompt:

```text
Use this Mechanic Mixer export as planning input.
Inspect the relevant Open Game Mechanics Dataset JSON files before proposing implementation details.
Identify required systems, missing dependencies, explicit conflicts, scope risks, and a minimal prototype slice.
Do not add unrelated mechanics unless they are justified by typed relationships or required systems.
Do not estimate production hours.
```

## Use The Dataset For Tool Building

Tooling can:

- Parse `dataset.json` for category, tag, genre, difficulty, and path discovery.
- Load full mechanic JSON files from `data/`.
- Use `relationships` as dependency, support, conflict, flow, unlock, and variant graph edges.
- Use `scope_profile` as relative planning pressure.
- Use `required_systems` for implementation checklist generation.
- Use `edge_cases` and `common_bugs` to generate test-plan prompts.

Keep generated suggestions explainable. If a tool suggests a dependency or conflict, show the source mechanic ID, target mechanic ID, relationship type, strength, and reason.

## Avoid Hallucination

Do not claim a mechanic exists in this dataset unless its ID is present.

If a desired mechanic is absent, say it is not currently in the dataset and propose a `future.<id>` reference or a new contribution.

Do not treat example games as evidence of hidden implementation details.
