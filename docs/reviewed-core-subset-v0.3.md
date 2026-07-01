# Reviewed Core Subset v0.3 Plan

This plan proposes a small reviewed core subset for v0.3. It does not mark any mechanics as reviewed yet.

The purpose is to create a trustworthy review target before adding more mechanics. The reviewed subset should prove that the dataset can support practical prototypes, AI-agent planning, relationship QA, and Mechanic Mixer analysis with strong edge cases and common bugs.

## Candidate Selection Criteria

Core review candidates should be:

- Common enough that many game developers understand them.
- Useful for indie prototypes.
- Useful for AI-agent planning.
- Important for the Mechanic Mixer.
- Good candidates for relationship and scope review.
- Likely to contain prototype-breaking edge cases or common bugs.
- Not too obscure or overly genre-specific.

## Proposed Core Candidates

| Mechanic | Category | Why It Belongs | Status | Confidence | Relationships | Scope | Edge Cases | Common Bugs | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `movement.dash` | movement | Common traversal/combat verb with collision, cooldown, input, and invulnerability risks. | draft | medium | yes | yes | strong | strong | high |
| `movement.air_dash` | movement | Important platforming extension that tests airborne state priority and assist interactions. | draft | medium | yes | yes | medium | medium | high |
| `movement.dodge_roll` | movement | Common evasive action with i-frame, collision capsule, recovery, and authority concerns. | draft | medium | yes | yes | strong | strong | high |
| `platforming.coyote_time` | platforming | Small input-forgiveness mechanic where timing and state details matter heavily. | draft | medium | yes | yes | medium | strong | high |
| `platforming.jump_buffering` | platforming | Core feel mechanic that often breaks through stale input, priority, and action consumption. | draft | medium | yes | yes | medium | medium | high |
| `platforming.double_jump` | platforming | Common prototype feature with jump-count, landing, wall, and prediction bugs. | draft | medium | yes | yes | strong | strong | high |
| `platforming.wall_jump` | platforming | Tests collision normals, wall contact persistence, moving walls, and root-motion boundaries. | draft | medium | yes | yes | strong | strong | high |
| `combat.reload` | combat | Common ranged pacing mechanic with commit/cancel, ammo transaction, and prediction risks. | draft | medium | yes | yes | medium | medium | high |
| `combat.ranged_attack` | combat | Core combat verb with projectile origin, ammo, collision, deterministic spread, and ownership issues. | draft | medium | yes | yes | strong | strong | high |
| `combat.parry` | combat | High-risk timing mechanic with resolver order, projectiles, rollback, and hit validation concerns. | draft | medium | yes | yes | strong | strong | high |
| `combat.block` | combat | Common defensive mechanic with guard angle, stamina, state priority, and server disagreement risks. | draft | medium | yes | yes | strong | strong | high |
| `ui_ux.cooldown_indicator` | ui_ux | Directly tests UI trust against authoritative timing and accessibility display requirements. | draft | medium | yes | yes | strong | strong | high |
| `ui_ux.interaction_prompt` | ui_ux | Common UX surface with stale targets, remapping, hold progress, and focus flicker bugs. | draft | medium | yes | yes | strong | strong | high |
| `ui_ux.minimap` | ui_ux | Common navigation tool with fog, marker, layout, save, and icon clutter failure modes. | draft | medium | yes | yes | strong | strong | medium |
| `progression.skill_tree` | progression | Central progression graph with save migration, prerequisite, refund, and UI navigation issues. | draft | medium | yes | yes | strong | strong | high |
| `progression.unlockable_abilities` | progression | Tests unlock transactions, traversal gates, migration, UI activation, and multiplayer authority. | draft | medium | yes | yes | strong | strong | high |
| `economy.coins` | economy | Basic wallet mechanic that must handle transaction ordering, duplicate grants, overflow, and UI correction. | draft | medium | yes | yes | strong | strong | high |
| `economy.shop` | economy | Common economy surface with offer IDs, stock, capacity, stale UI, and atomic purchase risks. | draft | medium | yes | yes | strong | strong | high |
| `camera.smooth_follow_camera` | camera | Common camera primitive with interpolation, bounds, teleport, platform, and split-screen edge cases. | draft | medium | yes | yes | strong | strong | medium |
| `ai.patrol` | ai | Common AI baseline with nav failure, resumption state, save/load, and debug trace needs. | draft | medium | yes | yes | strong | strong | high |
| `ai.line_of_sight_detection` | ai | Foundational perception mechanic with occlusion, update-order, FOV, and visibility-stack issues. | draft | medium | yes | yes | strong | strong | high |
| `multiplayer.online_coop` | multiplayer | Mixer-critical system with authority, reconnect, host migration, saves, and prediction state risks. | draft | medium | yes | yes | strong | strong | high |
| `survival.hunger` | survival | Common survival loop with stat decay, recovery transactions, offline rules, and warning bands. | draft | medium | yes | yes | strong | strong | high |
| `survival.temperature` | survival | Environmental pressure mechanic with zones, wetness, shelter, multiplayer bases, and UI thresholds. | draft | medium | yes | yes | strong | strong | high |
| `crafting.recipe_crafting` | crafting | Core crafting transaction with ingredient reservation, capacity, migration, and duplicate output concerns. | draft | medium | yes | yes | strong | strong | high |
| `crafting.crafting_queue` | crafting | Tests queue persistence, offline progress, cancellation, multiplayer reordering, and duplicate claims. | draft | medium | yes | yes | strong | strong | high |
| `time.cooldown_time` | time | Cross-cutting timing primitive that affects combat, UI, networking, save/load, and rollback. | draft | medium | yes | yes | strong | strong | high |
| `time.time_rewind` | time | High-risk mechanic that tests snapshots, determinism, physics, rewards, and network conflicts. | draft | medium | yes | yes | strong | strong | high |
| `physics.physics_push_pull` | physics | Common physics/puzzle primitive with collision locks, ownership, prediction, and save-state failure modes. | draft | medium | yes | yes | strong | strong | high |
| `puzzle.pressure_plate` | puzzle | Common puzzle trigger with physics tick ordering, mass filtering, persistence, and server authority risks. | draft | medium | yes | yes | strong | strong | high |

## Reviewed Status Criteria

A mechanic can be marked `reviewed` only when:

- It passes schema validation.
- It has a clear, non-generic description.
- It has a clear design purpose.
- Parameters are specific, useful, and not generic filler.
- Required systems are concrete.
- Edge cases are practical and likely to matter during prototyping.
- Common bugs describe real implementation or design failure modes.
- Balancing notes explain trade-offs.
- Accessibility notes are meaningful.
- Implementation notes cover at least two practical engine/platform perspectives where applicable.
- Example games are short, factual, and non-copyright-infringing.
- Typed relationships are valid, justified, and not overbroad.
- `scope_profile` values are plausible relative planning signals.
- `source_confidence` has a short rationale.
- The entry has been reviewed by the maintainer or a contributor.

Do not change the schema yet. This is a documentation and planning pass.

## Edge Case Quality Criteria

High-quality edge cases should:

- Describe concrete situations that can break a prototype.
- Mention timing, state, collision, input, UI, save/load, networking, or accessibility issues where relevant.
- Be specific to the mechanic, not generic to all games.
- Help a developer write tests or prototype checks.
- Expose non-obvious design or implementation risks.

Weak edge cases usually:

- Are too vague.
- Could apply to almost any mechanic.
- Only describe player preference.
- Do not mention the underlying system issue.
- Do not help with testing or implementation planning.

Examples of strong edge case categories:

- Input buffering overlaps with animation locks.
- State reset fails after respawn, checkpoint, or load.
- Collision causes tunneling or stuck states.
- Cooldown UI desyncs from an authoritative timer.
- Save/load restores partial mechanic state incorrectly.
- Multiplayer authority or rollback conflicts with local state.
- Accessibility settings change timing, hold/toggle, or feedback assumptions.
- Camera or UI feedback hides important mechanic state.

## Common Bug Quality Criteria

High-quality common bugs should:

- Describe realistic prototype or implementation failures.
- Explain what system likely causes the bug.
- Be concrete enough for a developer to reproduce or test.
- Avoid generic advice such as "may feel bad" unless it explains why.
- Highlight small details that often break mechanics.

Examples:

- Jump count is not reset when landing on moving platforms.
- Dash cooldown resets during scene reload but UI still shows unavailable.
- Parry accepts input during hitstun because state priority is wrong.
- Reload can be cancelled into firing without consuming ammo correctly.
- Online co-op desyncs because client prediction does not include mechanic state.
- Save/load restores inventory but not crafting queue progress.
- Interaction prompt remains visible after target object is destroyed.

## Source Confidence Guidance

`source_confidence` is not a formal citation system.

`low`:

- Candidate data.
- Plausible but weakly reviewed.
- Needs examples, relationship review, stronger edge cases, or better implementation notes.

`medium`:

- Useful and plausible.
- Aligned with common design knowledge or observable game behavior.
- Edge cases and common bugs are present but may still need review.

`high`:

- Reviewed carefully.
- Has strong observable basis, implementation experience, or maintainer/community agreement.
- Edge cases and common bugs are concrete.
- Relationships and `scope_profile` were checked for obvious issues.

## Review Process For v0.3

1. Pick 5 mechanics from this candidate set.
2. Review edge cases and common bugs first.
3. Check parameters, required systems, implementation notes, example games, relationships, and scope profile.
4. Add a short confidence rationale before raising `source_confidence`.
5. Only then consider changing `status` from `draft` to `reviewed`.

Recommended Batch 1 candidates:

- `movement.dash`
- `platforming.jump_buffering`
- `combat.reload`
- `ui_ux.cooldown_indicator`
- `time.time_rewind`

## Batch 1 Progress

Reviewed Core Batch 1 has started with the five recommended mechanics. The pass strengthened `edge_cases`, `common_bugs`, and selected implementation/relationship details while keeping all five mechanics in `draft` with `source_confidence: "medium"`.

Batch 1 report: [`reports/reviewed-core-batch-1-v0.3.md`](reports/reviewed-core-batch-1-v0.3.md)

Consolidated v0.3 review summary: [`reports/v0.3-review-summary.md`](reports/v0.3-review-summary.md)

Current reviewed-core gap table: [`reports/reviewed-core-gap-report-v0.3.md`](reports/reviewed-core-gap-report-v0.3.md)
