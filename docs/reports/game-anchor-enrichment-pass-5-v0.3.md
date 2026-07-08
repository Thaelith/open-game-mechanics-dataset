# Game Anchor Enrichment Pass 5 v0.3

Date: 2026-07-08

## Purpose

This pass enriches a small set of classic and high-value game anchors in the derived game-to-mechanics index. The goal is to make the Games view more useful for study and discovery while keeping `example_games` concise, factual, and based on visible player-facing behavior.

This is not a full game database, a citation system, or proof of exact implementation details.

## Saturation Rule

- Games with 15+ mechanics are audit/deepening targets with only 0-3 very clear additions.
- Games with 8-14 mechanics can receive up to 3-6 clear additions.
- Games with fewer than 8 mechanics can receive up to 5-8 clear additions.
- No target game should be forced to 20 mechanics.

All Pass 5 targets started below 8 mechanics, so this pass allowed stronger enrichment while still skipping weak or stretched mappings.

## Reviewed Anchor Games

| Game | Before | After | Added mechanics | Saturation decision |
| --- | ---: | ---: | --- | --- |
| Half-Life 2 | 7 | 14 | `combat.area_of_effect_attack`, `combat.melee_attack`, `combat.ranged_attack`, `combat.reload`, `physics.breakable_object`, `survival.health`, `ui_ux.interaction_prompt` | Sparse; added seven visible first-person combat, physics, health, and interaction examples. |
| World of Warcraft | 7 | 14 | `combat.melee_attack`, `combat.ranged_attack`, `economy.shop`, `multiplayer.online_coop`, `progression.experience_points`, `ui_ux.minimap`, `ui_ux.quest_marker` | Sparse; added seven clear MMO combat, progression, group-play, and UI examples. |
| The Legend of Zelda: Ocarina of Time | 7 | 13 | `combat.block`, `combat.melee_attack`, `puzzle.pressure_plate`, `survival.health`, `traversal.ladder_climb`, `ui_ux.interaction_prompt` | Sparse; added six dungeon, combat, health, traversal, and prompt examples. |
| Slay the Spire | 7 | 11 | `economy.shop`, `progression.meta_progression`, `roguelike.random_powerups`, `roguelike.run_based_progression` | Sparse but already focused; added four run-building and persistent-unlock examples. |
| Spelunky | 6 | 13 | `combat.melee_attack`, `combat.ranged_attack`, `economy.shop`, `physics.breakable_object`, `roguelike.run_based_progression`, `survival.health`, `ui_ux.interaction_prompt` | Sparse; added seven run-survival, shop, combat, object, and interaction examples. |
| Alien: Isolation | 5 | 13 | `ai.line_of_sight_detection`, `camera.first_person_camera`, `crafting.recipe_crafting`, `horror.jump_scare_trigger`, `horror.limited_visibility`, `survival.health`, `ui_ux.interaction_prompt`, `ui_ux.quest_marker` | Sparse; added eight stealth, horror, crafting, health, and objective examples. |
| Dead Cells | 4 | 12 | `camera.smooth_follow_camera`, `combat.damage_over_time`, `combat.invincibility_frames`, `combat.melee_attack`, `combat.ranged_attack`, `movement.dash`, `platforming.double_jump`, `roguelike.random_powerups` | Sparse; added eight clear combat, movement, camera, and run-build examples. |

## Added Example Notes

### Half-Life 2

- `combat.area_of_effect_attack`: uses grenades and explosives for area pressure in combat spaces.
- `combat.melee_attack`: uses the crowbar as a visible close-range combat and object-breaking tool.
- `combat.ranged_attack`: uses firearms and projectile weapons as visible first-person combat options.
- `combat.reload`: uses reload timing and ammunition pressure during first-person firefights.
- `physics.breakable_object`: uses breakable crates, boards, and props as visible world interactions.
- `survival.health`: uses health pickups and damage state as visible first-person survival pressure.
- `ui_ux.interaction_prompt`: uses contextual interaction cues for doors, vehicles, pickups, and physics objects.

### World of Warcraft

- `combat.melee_attack`: uses melee weapon attacks and close-range abilities across combat roles.
- `combat.ranged_attack`: uses ranged spells, weapons, and abilities across combat roles.
- `economy.shop`: uses vendors for buying, selling, repairs, and utility services.
- `multiplayer.online_coop`: uses online group play for dungeons, raids, quests, and shared objectives.
- `progression.experience_points`: uses experience rewards from quests and combat to advance character levels.
- `ui_ux.minimap`: uses minimap tracking for nearby locations, quest context, and navigation.
- `ui_ux.quest_marker`: uses quest markers and tracked objectives to guide world and dungeon tasks.

### The Legend of Zelda: Ocarina of Time

- `combat.block`: uses shield blocking to reduce or deflect incoming attacks.
- `combat.melee_attack`: uses sword attacks as a primary close-range combat interaction.
- `puzzle.pressure_plate`: uses switches and pressure plates as readable dungeon puzzle triggers.
- `survival.health`: uses heart containers and health recovery as visible adventure survival state.
- `traversal.ladder_climb`: uses ladders as constrained vertical routes in dungeon and village spaces.
- `ui_ux.interaction_prompt`: uses contextual action prompts for talking, opening, climbing, and interacting.

### Slay the Spire

- `economy.shop`: uses shops for cards, relics, removals, and potions during a run.
- `progression.meta_progression`: unlocks additional cards and relics across repeated runs.
- `roguelike.random_powerups`: uses randomized card, relic, and reward offers to shape each run.
- `roguelike.run_based_progression`: builds deck strength and relic power over the course of a run.

### Spelunky

- `combat.melee_attack`: uses the whip as a close-range combat and interaction tool.
- `combat.ranged_attack`: uses thrown objects and ranged weapons as visible combat options.
- `economy.shop`: uses shops as high-risk purchase and theft spaces during runs.
- `physics.breakable_object`: uses breakable pots and destructible level objects as part of run exploration.
- `roguelike.run_based_progression`: builds run state through items, money, health, shortcuts, and route decisions.
- `survival.health`: uses limited health to make traps, falls, and enemy hits persistent run pressure.
- `ui_ux.interaction_prompt`: uses contextual prompts for pickups, doors, shops, and rescues.

### Alien: Isolation

- `ai.line_of_sight_detection`: uses line-of-sight detection as a major monster and android stealth risk.
- `camera.first_person_camera`: uses first-person camera framing for stealth, exploration, and horror tension.
- `crafting.recipe_crafting`: uses crafted tools and consumables from gathered materials during survival play.
- `horror.jump_scare_trigger`: uses sudden monster appearances and failure moments as authored scare beats.
- `horror.limited_visibility`: uses darkness, occlusion, and constrained visibility to heighten stealth risk.
- `survival.health`: uses health loss and recovery items as visible survival pressure.
- `ui_ux.interaction_prompt`: uses contextual prompts for doors, terminals, crafting, hiding, and tools.
- `ui_ux.quest_marker`: uses objective guidance and tracker cues to direct survival routes.

### Dead Cells

- `camera.smooth_follow_camera`: uses smooth side-view camera framing for fast combat and platforming routes.
- `combat.damage_over_time`: uses poison, burning, and bleeding effects as visible delayed damage pressure.
- `combat.invincibility_frames`: uses dodge-roll invulnerability windows during fast combat encounters.
- `combat.melee_attack`: uses close-range weapons as visible combat options.
- `combat.ranged_attack`: uses bows, traps, and ranged weapons as visible combat options.
- `movement.dash`: uses dodge-style dash movement for combat evasion and repositioning.
- `platforming.double_jump`: uses double jump as a recurring traversal and combat-positioning action.
- `roguelike.random_powerups`: uses randomized weapons, skills, and rewards to shape each run.

## Skipped Candidates

- Half-Life 2 `ui_ux.quest_marker`: skipped because the current quest-marker boundary fits explicit objective/map guidance better than Half-Life 2's mostly authored route guidance.
- Half-Life 2 additional physics entries: skipped because `physics.physics_push_pull`, `physics.ragdoll`, `physics.buoyancy`, and `puzzle.physics_weight_puzzle` were already present.
- World of Warcraft `progression.skill_tree`: skipped because talent/build systems vary across versions and need a title/version-sensitive review.
- World of Warcraft `multiplayer.team_roles`: skipped because that mechanic ID does not currently exist.
- The Legend of Zelda: Ocarina of Time `ui_ux.quest_marker`: skipped because the current quest-marker boundary is too explicit for its guidance style.
- The Legend of Zelda: Ocarina of Time `progression.collectibles`: skipped because that mechanic ID does not currently exist.
- The Legend of Zelda: Ocarina of Time `time.time_travel`: skipped because that mechanic ID does not currently exist.
- Slay the Spire `ui_ux.cooldown_indicator`: skipped because card/action availability would stretch the current cooldown-indicator boundary.
- Slay the Spire additional roguelike entries: skipped because the anchor already had strong run-choice, relic, curse, risk, shop, and daily examples after this pass.
- Spelunky `physics.rigidbody_object`: skipped because that mechanic ID does not currently exist.
- Spelunky additional procedural entries: skipped because `procedural_level_rooms` and `seeded_generation` were already present.
- Alien: Isolation `ai.hearing_detection`: skipped because that mechanic ID does not currently exist.
- Alien: Isolation `stealth.visibility_meter`: skipped because the game does not expose a visibility meter in the same way as the current mechanic boundary.
- Dead Cells `camera.side_view_camera`: skipped because that mechanic ID does not currently exist; `camera.smooth_follow_camera` was used as the closest existing readable camera anchor.
- Dead Cells `platforming.wall_jump`: skipped because the current target additions already covered the clearer movement/combat/run-building examples.
- Dead Cells `ui_ux.cooldown_indicator`, `survival.health`, and `economy.shop`: skipped to keep the anchor within the saturation-rule cap for this pass.

## Title Consistency Notes

- Existing exact titles were reused: `Half-Life 2`, `World of Warcraft`, `The Legend of Zelda: Ocarina of Time`, `Slay the Spire`, `Spelunky`, `Alien: Isolation`, and `Dead Cells`.
- No aliases, edition merges, remaster merges, expansion-specific titles, or manual title normalization rules were added.
- Version-sensitive titles such as `World of Warcraft` remain future title-consistency review candidates.
- The generated game index still derives titles directly from mechanic-level `example_games`.

## Known Limitations

- This pass reviewed only seven anchor games.
- It does not claim these games contain only the listed mechanics.
- It does not prove exact implementation details.
- It does not add a separate `games/` database or self-reported tagging workflow.
- Some visible mechanics were skipped when the current dataset boundary was too broad, too narrow, missing, title-sensitive, or mismatched.

## Recommended Next Anchor Batch

Good next candidates for careful enrichment:

- Super Metroid
- The Binding of Isaac
- Terraria
- Doom
- Metal Gear Solid
- Dishonored
- Stardew Valley

## Future Quality Audit

A future Game Anchor Quality Audit is recommended before continuing many more enrichment passes. It should review accumulated examples for weak mappings, title alias issues, overused anchors, genre imbalance, and examples that should be moved to a future curated `games/` or `game_tags/` layer.
