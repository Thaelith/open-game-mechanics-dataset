# Game Anchor Enrichment Pass 1 v0.3

Date: 2026-07-03

## Purpose

This pass improves the derived game-to-mechanics index by adding a small number of curated `example_games` references to existing mechanics. The goal is better study/discovery anchors, not a complete game database.

Game examples remain lightweight study references. They describe visible player-facing behavior only and do not claim proprietary implementation details or exact internal systems.

## Reviewed Anchor Games

| Game | Before | After | Added mechanics |
| --- | ---: | ---: | --- |
| Grand Theft Auto IV | 1 | 8 | `camera.third_person_camera`, `traversal.vehicle_mount`, `ui_ux.minimap`, `ui_ux.quest_marker`, `vehicles.vehicle_acceleration`, `vehicles.vehicle_braking`, `vehicles.vehicle_damage` |
| Red Dead Redemption 2 | 1 | 4 | `camera.third_person_camera`, `ui_ux.minimap`, `ui_ux.quest_marker` |
| Mirror's Edge | 1 | 3 | `camera.first_person_camera`, `movement.run` |
| Gears of War | 1 | 4 | `camera.third_person_camera`, `combat.ranged_attack`, `combat.reload` |
| Rocket League | 2 | 5 | `vehicles.drifting`, `vehicles.vehicle_acceleration`, `vehicles.vehicle_braking` |
| Counter-Strike 2 | 1 | 2 | `combat.ranged_attack` |

## Grand Theft Auto IV Additions

Grand Theft Auto IV was reviewed first because it previously appeared only through `physics.ragdoll`.

- `camera.third_person_camera`: uses a third-person camera for on-foot movement, driving, and combat framing.
- `traversal.vehicle_mount`: uses vehicle entry and exit as a core traversal interaction.
- `ui_ux.minimap`: uses a minimap/GPS-style route display for city navigation.
- `ui_ux.quest_marker`: uses mission markers and map destinations to guide city objectives.
- `vehicles.vehicle_acceleration`: uses vehicle acceleration and throttle response across city driving.
- `vehicles.vehicle_braking`: uses braking and handbrake behavior during street driving and vehicle control.
- `vehicles.vehicle_damage`: shows visible vehicle damage from collisions and impacts.

`physics.ragdoll` already had a Grand Theft Auto IV example and was not duplicated.

## Additional Anchor Notes

Red Dead Redemption 2 received navigation and camera examples only. Horse mounting was skipped because the current `traversal.vehicle_mount` entry is framed around vehicle seats and authority transfer, so using it for horse mounts would need a separate boundary review.

Mirror's Edge received first-person camera and run examples. The existing `traversal.parkour_vault` example was left unchanged. `data/traversal/ledge_grab.json` does not currently exist, and wall-related traversal examples were skipped to avoid stretching the current mechanic boundaries.

Gears of War received third-person camera, ranged attack, and reload examples because those behaviors are visible and central. `combat.cover_system` was not used because that mechanic file does not currently exist.

Rocket League received vehicle acceleration, braking, and drifting examples. Vehicle damage was skipped because demolitions and impacts do not map cleanly to the current vehicle damage entry's durability/repair framing.

Counter-Strike 2 received a ranged attack example. Hit marker or damage-number examples were skipped because they would be less clear as visible UI mechanics in the current dataset vocabulary.

## Skipped Grand Theft Auto IV Candidates

- `combat.cover_system`: skipped because the file does not exist.
- `combat.lock_on_targeting`: skipped because the visible behavior is context-specific and less clear than the navigation, camera, vehicle, and ragdoll anchors.
- `physics.ragdoll`: already present; not duplicated.

## Title Consistency Notes

- `Grand Theft Auto IV` was used exactly for all new GTA IV references.
- Existing `Grand Theft Auto V` references were left unchanged.
- No alias merging or edition normalization was introduced in this pass.
- The derived game index still groups titles only by lightweight normalization, not by manually curated aliases.

## Known Limitations

- This pass enriched only six anchor games.
- It does not validate every possible game/mechanic association.
- It does not add a `games/` database or self-reported tagging workflow.
- Some mechanics that may be present in a game were skipped when the visible behavior did not cleanly match the current mechanic boundary.

## Next Suggested Anchor Games

Good next candidates are recognizable games that currently have sparse coverage but likely map to multiple existing mechanics:

- Need for Speed: Hot Pursuit
- Gran Turismo 7
- Grand Theft Auto V
- The Legend of Zelda: Breath of the Wild
- The Witcher 3: Wild Hunt
- Celeste, if future work wants a deeper platforming-focused anchor review
