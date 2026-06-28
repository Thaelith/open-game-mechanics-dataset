# Difficulty Scale

Difficulty values are `easy`, `medium`, `hard`, and `expert`. They describe the expected challenge for a competent developer or designer, not whether the mechanic is good or bad.

## Design Difficulty

- `easy`: The player promise is familiar, the mechanic has few strategic consequences, and failure states are obvious.
- `medium`: The mechanic affects pacing, level design, enemy design, or player choice in several places.
- `hard`: The mechanic changes how multiple systems are designed and requires careful counterplay, progression, or encounter planning.
- `expert`: The mechanic shapes the whole game economy, run structure, simulation, or competitive meta.

## Implementation Difficulty

- `easy`: Can be implemented with common state, input, movement, UI, or data patterns.
- `medium`: Requires coordination between several systems, careful state transitions, or robust save/load behavior.
- `hard`: Requires physics, networking, procedural generation, advanced AI, rollback/history, or complex tool support.
- `expert`: Requires deterministic simulation, high-scale networking, extensive content validation, or deep engine integration.

## Tuning Difficulty

- `easy`: A small number of parameters can be adjusted independently.
- `medium`: Tuning affects feel, pacing, readability, or several adjacent mechanics.
- `hard`: Small changes can invalidate encounters, level layouts, economy loops, or progression curves.
- `expert`: Balance depends on long-term player behavior, emergent combinations, multiplayer meta, or large content sets.
