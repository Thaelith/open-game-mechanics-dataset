# Time Rewind Architecture Review v0.3

Target mechanic: `data/time/time_rewind.json`

This checklist documents why `time.time_rewind` remains high-risk. It does not solve time rewind, mark it reviewed, or raise source confidence.

## Review Position

`time.time_rewind` should stay `draft`.

`source_confidence` should stay `medium`.

It should not be considered ready for reviewed status until this architecture review is resolved.

## 1. Snapshot Completeness

Review whether the rewind system records enough state to restore or replay the selected history window.

- Transform state: position, rotation, scale, parent/attachment state, and scene/level ownership.
- Velocity state: linear velocity, angular velocity, acceleration, gravity scale, and movement-mode state.
- Animation state: animation clip/state id, normalized time, root-motion offsets, blend state, and animation speed.
- Physics body state: rigidbody mass, sleep/wake state, constraints, contact pairs, collision layers, material state, and solver-relevant flags.
- Cooldowns: cooldown_started_at, cooldown_remaining_ms, charges, cooldown groups, and authority timestamp.
- Health/damage state: health value, pending damage events, i-frame windows, hit stun, armor/shield state, and death/downed flags.
- Projectiles: projectile id, owner id, team/source attribution, lifetime, velocity, collision state, reflected state, and hit history.
- Status effects: effect id, source id, remaining duration, tick schedule, stack count, and already-applied tick history.
- AI blackboard/state: ai_state_id, behavior tree node, target id, last known position, perception memory, alert state, and path request state.
- Inventory/reward/quest state: item instance ids, currency transactions, reward claim ids, quest flags, objective progress, and irreversible choices.
- RNG stream: rng_stream_id, generation seed, stream cursor, consumed random events, and content version.
- Spawned/despawned object state: object id, prefab/content id, active flag, pool generation, owner, and whether the object existed at each snapshot.

## 2. Restore Order

Review whether restoring state happens in an order that avoids impossible intermediate states.

- Physics restore before gameplay queries that depend on contact state.
- Collision restore with overlap resolution, blocked destinations, and safe-pose fallback.
- Carried objects and attachments restored with their carrier, parent, and constraint state.
- Moving platforms restored with passenger contact state, platform velocity, and carry-velocity rules.
- Projectiles restored before hit detection resumes, with owner and already-hit target sets intact.
- Enemy targets restored after actor identities and positions are valid.
- UI state corrected after authority gameplay state is restored, not before.
- Camera/audio rewind aligned with gameplay restore so presentation does not imply a different timeline.

## 3. Persistence And Rewards

Review which events can be rewound and which are deliberately irreversible.

- Save/load during rewind: define whether saves are blocked, delayed, or stored from the pre-rewind authority state.
- Checkpoint during rewind: define whether checkpoint state captures current, original, or restored timeline state.
- Reward duplication: protect rewards with transaction ids, claim ids, or irreversible grant logs.
- Quest flag rollback: define which quest flags can roll back and which are permanent.
- Achievement unlock handling: avoid granting achievements multiple times or removing platform achievements after unlock.
- Narrative irreversible choices: document which choices are excluded from rewind and how the player is told.

## 4. Multiplayer And Authority

Review whether time rewind is compatible with the selected networking model.

- Online co-op conflict: player-controlled rewind conflicts with ordinary shared-world authority unless the whole session timeline is designed around it.
- Server authority: define whether the server approves restore points and owns the rewind buffer.
- Client prediction: keep local visual rewind separate from authority state unless rollback is fully deterministic.
- Rollback window separation: do not confuse netcode rollback for input correction with player-facing rewind.
- Shared timeline rules: define whether one player rewinds everyone, only themselves, or only local presentation.
- Reconnect behavior: define what a reconnecting client receives if rewind happened while disconnected.

## 5. Performance And Memory

Review whether the system fits real-time memory and CPU budgets.

- Snapshot rate: choose per-channel sample rates rather than one global rate for all data.
- Buffer length: define max rewind seconds and what happens when memory budget is exceeded.
- Number of tracked actors: decide which actors are recorded, approximated, or excluded.
- Object pooling: record pool generation ids so restored objects do not alias reused instances.
- Garbage collection: use ring buffers, pooled snapshots, or typed arrays where high-frequency allocation would stutter.
- Streaming/unloaded chunks: define restore failure behavior for entities whose owning scene or chunk is no longer loaded.

## 6. UX Clarity

Review whether the player can understand what rewind will and will not affect.

- What rewinds: player position, physics objects, projectiles, enemies, cooldowns, health, or puzzle state.
- What does not rewind: achievements, narrative choices, online messages, certain rewards, or account state.
- History remaining: show rewind availability, remaining history, or buffer exhaustion clearly.
- Reduced motion: provide lower-motion camera and visual rewind options.
- Audio scrub options: provide reduced audio-scrub or non-scrub alternatives.
- Failure feedback: explain when rewind cannot restore because a target is blocked, unloaded, irreversible, or outside the buffer.

## 7. Review Decision

`time.time_rewind` remains a useful but high-risk draft mechanic.

It should not move to `reviewed` until:

- Snapshot completeness is defined for the intended scope.
- Restore order is tested with physics, projectiles, AI, and UI.
- Persistence and reward duplication rules are explicit.
- Multiplayer and authority boundaries are either supported or explicitly excluded.
- Memory and performance budgets are measured in a prototype.
- UX clearly communicates what rewinds and what remains irreversible.

Until then, keep:

- `status: "draft"`
- `source_confidence: "medium"`
