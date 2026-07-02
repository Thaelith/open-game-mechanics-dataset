# Example Games Coverage Report v0.3

This advisory report tracks how many mechanics include lightweight `example_games` study references.

Example games are not exhaustive and do not prove exact implementation details. They are meant to help readers find recognizable games to study for mechanic behavior.

## Summary

| Metric | Value |
| --- | --- |
| Total mechanics | 223 |
| Mechanics with example_games | 218 |
| Mechanics missing example_games | 5 |
| Example-game coverage | 97.76% |
| Total example-game references | 430 |
| Unique game titles | 193 |

## Top Referenced Game Titles

| Game title | References |
| --- | --- |
| Hades | 18 |
| The Legend of Zelda: Breath of the Wild | 15 |
| Celeste | 13 |
| Minecraft | 13 |
| Dark Souls | 9 |
| Slay the Spire | 7 |
| The Legend of Zelda: Ocarina of Time | 7 |
| World of Warcraft | 7 |
| Apex Legends | 6 |
| Half-Life 2 | 6 |
| Hollow Knight | 6 |
| Spelunky | 6 |
| Alien: Isolation | 5 |
| Portal | 5 |
| Portal 2 | 5 |
| Resident Evil 4 | 5 |
| Subnautica | 5 |
| The Elder Scrolls V: Skyrim | 5 |
| Dead Cells | 4 |
| Diablo III | 4 |
| Left 4 Dead | 4 |
| Mario Kart 8 | 4 |
| Overwatch | 4 |
| Prince of Persia: The Sands of Time | 4 |
| Super Mario Bros. | 4 |

## Category Coverage

| Category | Mechanics | With examples | Missing examples | Coverage | References |
| --- | --- | --- | --- | --- | --- |
| accessibility | 5 | 5 | 0 | 100.00% | 10 |
| ai | 11 | 11 | 0 | 100.00% | 22 |
| camera | 10 | 10 | 0 | 100.00% | 20 |
| combat | 19 | 18 | 1 | 94.74% | 34 |
| crafting | 4 | 4 | 0 | 100.00% | 8 |
| economy | 10 | 10 | 0 | 100.00% | 20 |
| horror | 8 | 8 | 0 | 100.00% | 16 |
| meta | 4 | 4 | 0 | 100.00% | 8 |
| movement | 12 | 9 | 3 | 75.00% | 18 |
| multiplayer | 10 | 10 | 0 | 100.00% | 20 |
| narrative | 5 | 5 | 0 | 100.00% | 10 |
| physics | 11 | 11 | 0 | 100.00% | 22 |
| platforming | 9 | 8 | 1 | 88.89% | 13 |
| procedural_generation | 9 | 9 | 0 | 100.00% | 18 |
| progression | 11 | 11 | 0 | 100.00% | 22 |
| puzzle | 10 | 10 | 0 | 100.00% | 20 |
| rhythm | 4 | 4 | 0 | 100.00% | 8 |
| roguelike | 9 | 9 | 0 | 100.00% | 18 |
| simulation | 4 | 4 | 0 | 100.00% | 8 |
| stealth | 6 | 6 | 0 | 100.00% | 12 |
| strategy | 4 | 4 | 0 | 100.00% | 8 |
| survival | 10 | 10 | 0 | 100.00% | 20 |
| time | 7 | 7 | 0 | 100.00% | 14 |
| traversal | 11 | 11 | 0 | 100.00% | 22 |
| ui_ux | 12 | 12 | 0 | 100.00% | 23 |
| vehicles | 8 | 8 | 0 | 100.00% | 16 |

## Mechanics Missing Example Games

| Mechanic | Category | Path |
| --- | --- | --- |
| combat.stealth_kill | combat | data/combat/stealth_kill.json |
| movement.crouch | movement | data/movement/crouch.json |
| movement.sprint | movement | data/movement/sprint.json |
| movement.swimming | movement | data/movement/swimming.json |
| platforming.wall_slide | platforming | data/platforming/wall_slide.json |

## Interpretation Notes

- Missing examples are advisory coverage gaps, not validation failures.
- Repeated game titles can indicate useful study anchors, but also reveal where examples may be over-concentrated.
- Future game-tagging work should prefer consistent, reviewable examples over large noisy tag lists.
