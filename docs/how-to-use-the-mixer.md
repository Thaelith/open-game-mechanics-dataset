# How To Use The Mechanic Mixer

The Mechanic Mixer is a deterministic planning helper inside the static browser. It uses selected mechanic IDs, required systems, typed relationships, and scope profiles to summarize dependencies, conflicts, and rough MVP pressure.

It is not an AI designer, not a random idea generator, and not a production estimate.

## Open The Browser

GitHub Pages:

[https://thaelith.github.io/open-game-mechanics-dataset/site/](https://thaelith.github.io/open-game-mechanics-dataset/site/)

Demo mixes:

[`docs/demo-mixes.md`](demo-mixes.md)

Local path:

[`site/index.html`](../site/index.html)

For local HTTP testing:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/site/
```

## Build A Mix

1. Search or filter mechanics in the browser.
2. Open mechanic details if you want to inspect the full JSON-backed notes.
3. Click `Add to Mixer`.
4. Select around 3-6 mechanics for a first pass.
5. Remove mechanics from the selected chips if the concept is too broad.
6. Use `Copy Concept JSON` to save or share the deterministic analysis.

The Mixer selection is stored locally in the browser and can also be shared with a `?mix=` URL.

For AI-agent planning workflows, see [`docs/ai-agent-usage.md`](ai-agent-usage.md).

## Read The Analysis

### Concept Summary

Shows selected mechanic count, selected categories, MVP role counts, and whether selected mechanics have typed relationship coverage.

### Required Systems

Aggregates `required_systems` across selected mechanics and shows which mechanics require each system.

### Missing Dependencies / Suggested Support Mechanics

Uses outgoing typed relationships from the selected mechanics. Strong `requires` edges are treated as highest-priority missing dependencies. `supports`, `balances`, `enhances`, `feeds`, `consumes`, `unlocks`, `extends`, and `is_variant_of` edges are shown as support or context.

### Conflict / Risk Warnings

Shows only explicit typed conflicts from the data:

- `conflicts_with`: hard warning
- `soft_conflicts_with`: caution warning

The Mixer does not invent conflicts from category similarity.

### Scope Pressure

Uses `scope_profile` to compute rough relative pressure across implementation, design, tuning, content, networking, save/load, and UI risk.

Labels are planning signals only:

- Low
- Medium
- High
- Very High

They are not hour estimates.

### MVP Trim Suggestions

Suggests mechanics to consider trimming or deferring. The wording is intentionally cautious: a selected mechanic may still be right for the concept if it is central to the intended experience.

### Related Additions

Suggests up to eight mechanics from typed relationships, incoming graph links, and lower-priority legacy browse fields.

### AI Planning Prompt

Generates a compact prompt for implementation planning. It asks the receiving agent to inspect the relevant mechanic JSON files, build a small prototype first, and avoid adding unrelated mechanics.

## Example Mixes

Mobility combat prototype:

```text
movement.air_dash,combat.reload,ui_ux.cooldown_indicator
```

High-risk networking/time concept:

```text
time.time_rewind,multiplayer.online_coop
```

Survival pressure loop:

```text
survival.hunger,survival.thirst,survival.temperature,time.day_night_schedule
```

Shareable URL format:

```text
https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=movement.air_dash,combat.reload,ui_ux.cooldown_indicator
```

## Limitations

- The output depends on the current relationship data.
- Not every mechanic has typed relationship coverage yet.
- Scope scores are approximate and relative.
- The Mixer does not know your team, engine, schedule, or content budget.
- Always prototype, playtest, and review accessibility and technical risk before committing to a design.
