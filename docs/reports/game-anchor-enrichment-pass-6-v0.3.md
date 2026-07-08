# Game Anchor Enrichment Pass 6 v0.3

Date: 2026-07-08

## Purpose

This pass resumes game-anchor enrichment as a tiny, policy-guided underdeveloped-anchor batch after the v0.3 quality audit and title cleanup. It enriches only `Super Metroid` and `Terraria`.

This is not a broad enrichment pass, a full game database, a citation layer, or proof of exact implementation details.

## Policy Used

This pass follows `docs/game-anchor-policy-v0.3.md`:

- Use exact specific game titles.
- Add only visible player-facing mechanic examples.
- Avoid broad franchise names and abbreviations.
- Do not touch saturated anchors.
- Prefer fewer clear examples over inflated counts.
- Do not add alias merging or a separate games database.

## Reviewed Anchor Games

| Game | Before | After | Added mechanics | Decision |
| --- | ---: | ---: | --- | --- |
| Super Metroid | 1 | 6 | `combat.ranged_attack`, `movement.run`, `movement.swimming`, `platforming.wall_jump`, `survival.health` | Underdeveloped; added five clear exploration, combat, movement, and survival examples. |
| Terraria | 3 | 12 | `combat.melee_attack`, `combat.ranged_attack`, `crafting.recipe_crafting`, `economy.crafting_materials`, `procedural_generation.procedural_terrain`, `procedural_generation.seeded_generation`, `survival.day_night_cycle`, `survival.health`, `survival.inventory_limit` | Underdeveloped; added nine clear sandbox, crafting, survival, procedural, and combat examples. |

## Added Example Notes

### Super Metroid

- `combat.ranged_attack`: uses beam and missile attacks as visible ranged combat tools.
- `movement.run`: uses sustained running as a baseline for exploration and platforming routes.
- `movement.swimming`: uses underwater movement as a distinct traversal condition in exploration spaces.
- `platforming.wall_jump`: uses wall jumps as a visible traversal technique for vertical routes.
- `survival.health`: uses energy tanks and health pickups as visible survival state.

Existing retained example:

- `platforming.double_jump`: uses movement upgrades to expand reachable spaces.

### Terraria

- `combat.melee_attack`: uses swords and other close-range weapons as visible combat options.
- `combat.ranged_attack`: uses bows, guns, magic, and thrown weapons as visible ranged combat options.
- `crafting.recipe_crafting`: uses recipe crafting to convert gathered materials into equipment, tools, and blocks.
- `economy.crafting_materials`: uses mined, gathered, and enemy-dropped materials as crafting inputs.
- `procedural_generation.procedural_terrain`: uses generated terrain, caves, and surfaces for sandbox exploration.
- `procedural_generation.seeded_generation`: uses world seeds to reproduce generated sandbox worlds.
- `survival.day_night_cycle`: uses day and night phases to change enemy activity and exploration pressure.
- `survival.health`: uses health hearts and healing items during exploration and combat.
- `survival.inventory_limit`: uses limited inventory slots to constrain mining, crafting, and exploration trips.

Existing retained examples:

- `crafting.workbench`: uses crafting stations to unlock different recipe sets.
- `procedural_generation.biome_generation`: uses biome regions with specific enemies and materials.
- `progression.crafting_unlocks`: progressively exposes crafting options through materials and stations.

## Skipped Candidates

### Super Metroid

- `movement.dash`: skipped because speed booster behavior may not cleanly match the current dash boundary.
- `platforming.double_jump`: already present.
- `traversal.ladder_climb`: skipped because it is not a strong central study anchor for this target.
- `combat.area_of_effect_attack`: skipped because bombs and missiles could stretch the current area-attack boundary.
- `progression.crafting_unlocks`: skipped because the current boundary is crafting-specific rather than ability-gated exploration.
- `ui_ux.minimap`: skipped because the current minimap boundary may not match Super Metroid's map behavior closely enough for this tiny pass.
- `ui_ux.interaction_prompt`: skipped because it is not clearly represented as a prompt system.

### Terraria

- `camera.side_view_camera`: skipped because that mechanic ID does not currently exist.
- `camera.smooth_follow_camera`: skipped because the side-view camera relationship is still a future taxonomy review concern.
- `combat.area_of_effect_attack`: skipped because explosives and magic could fit, but ranged/melee combat examples were clearer.
- `progression.crafting_unlocks`: already present.
- `ui_ux.interaction_prompt`: skipped because the current boundary is too broad for this pass.
- `multiplayer.online_coop`: skipped because the pass prioritized core sandbox/crafting/survival examples and avoided mode-sensitive multiplayer claims.

## Title Consistency Notes

- Exact titles used: `Super Metroid` and `Terraria`.
- No abbreviations, aliases, franchise-level titles, remake/remaster merges, or edition merges were added.
- No alias merging was added to code or generated reports.

## Saturation Notes

Neither target was saturated before this pass:

- `Super Metroid` moved from 1 to 6 mechanics.
- `Terraria` moved from 3 to 12 mechanics.

This pass did not touch saturated anchors such as `Hades`, `The Legend of Zelda: Breath of the Wild`, `Minecraft`, `Celeste`, `Dark Souls`, or `The Elder Scrolls V: Skyrim`.

## Known Limitations

- This pass reviewed only two games.
- It does not claim these games contain only the listed mechanics.
- It does not prove exact implementation details.
- Some plausible examples were skipped because the current mechanic boundary was too broad, too narrow, missing, or not central enough for this tiny pass.
- `Terraria` is now near the audit-driven enrichment range, so future additions should be conservative.

## Recommendation

Another tiny enrichment pass is safe if it follows the same policy:

- choose one or two underdeveloped games,
- avoid saturated anchors,
- add only clear visible-behavior examples,
- document skipped candidates,
- regenerate reports and validation.

Good future candidates remain `Doom`, `Dishonored`, `Stardew Valley`, and `The Binding of Isaac`, but each should be handled in a separate small pass.
