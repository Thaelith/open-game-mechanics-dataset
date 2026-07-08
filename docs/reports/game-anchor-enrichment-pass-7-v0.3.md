# Game Anchor Enrichment Pass 7 v0.3

Date: 2026-07-08

## Purpose

This pass continues game-anchor enrichment as a tiny, policy-guided underdeveloped-anchor batch. It enriches only `Dishonored` and `Stardew Valley`.

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
| Dishonored | 4 | 11 | `ai.patrol`, `camera.first_person_camera`, `combat.melee_attack`, `combat.ranged_attack`, `movement.crouch`, `stealth.last_known_position_search`, `ui_ux.interaction_prompt` | Underdeveloped stealth/action anchor; added seven clear camera, stealth, AI, combat, movement, and UI examples. |
| Stardew Valley | 2 | 8 | `crafting.recipe_crafting`, `economy.crafting_materials`, `economy.shop`, `progression.level_up`, `survival.inventory_limit`, `time.day_night_schedule` | Underdeveloped farming/life-sim anchor; added six clear economy, crafting, progression, inventory, and scheduling examples. |

## Added Example Notes

### Dishonored

- `ai.patrol`: uses guard patrol routes as stealth observation and timing pressure.
- `camera.first_person_camera`: uses first-person camera framing for stealth, traversal, and combat readability.
- `combat.melee_attack`: uses sword attacks as visible close-range combat options.
- `combat.ranged_attack`: uses crossbow and pistol tools as visible ranged combat options.
- `movement.crouch`: uses crouched movement for stealth approach, lower profile, and cover use.
- `stealth.last_known_position_search`: uses guard search behavior after the player breaks direct sight.
- `ui_ux.interaction_prompt`: uses contextual prompts for doors, loot, bodies, and mission interactions.

Existing retained examples:

- `ai.line_of_sight_detection`: uses guard sightlines and alert states for stealth play.
- `combat.stealth_kill`: supports stealth takedowns when the player reaches enemies without direct detection.
- `stealth.alert_state`: uses guard alertness states to move from suspicion to combat.
- `traversal.teleport_blink`: uses Blink as a short-range teleport for stealth and traversal.

### Stardew Valley

- `crafting.recipe_crafting`: uses recipes to craft equipment, machines, consumables, and farm items from gathered materials.
- `economy.crafting_materials`: uses crops, ore, wood, and gathered goods as crafting and upgrade inputs.
- `economy.shop`: uses vendors for buying seeds, supplies, tools, and services.
- `progression.level_up`: uses skill level-ups to unlock recipes, perks, and improved farming capabilities.
- `survival.inventory_limit`: uses limited backpack space to constrain gathering, mining, fishing, and farming trips.
- `time.day_night_schedule`: uses a daily clock to structure farming, shop hours, NPC routines, and deadlines.

Existing retained examples:

- `economy.coins`: uses money as the main farming and upgrade currency.
- `economy.resource_conversion`: uses machines that transform raw goods into higher-value outputs.

## Skipped Candidates

### Dishonored

- `movement.sprint`: skipped because the current anchor already gained stronger stealth, camera, AI, combat, and interaction examples; sprint would add less study value in this tiny pass.
- `movement.dash`: skipped because Blink is already represented more exactly by `traversal.teleport_blink`, and mapping it to dash would stretch the current dash boundary.
- `stealth.visibility_meter`: skipped because the current mechanic is about explicit detectability meters; Dishonored examples are better represented by alert state, sightline, and search behavior in this pass.
- `combat.non_lethal_takedown`: skipped because this mechanic ID does not currently exist.
- `combat.damage_over_time`: skipped because poison/plague/effect behavior was not a clear enough core study example for this target.
- `ui_ux.quest_marker`: skipped because objective guidance is plausible but less precise than interaction prompts for this small pass.
- Horror or narrative examples: skipped because the reviewed candidate boundaries were not exact enough for a policy-guided enrichment pass.

### Stardew Valley

- `crafting.workbench`: skipped because Stardew Valley's crafting behavior is better represented by recipe crafting and material inputs than by the current placed/discovered workbench boundary.
- `progression.experience_points`: skipped because skill experience is less directly visible than level-up outcomes; `progression.level_up` is the clearer study anchor.
- `progression.relationship_system`: skipped because this mechanic ID does not currently exist.
- `simulation.crop_growth`: skipped because this mechanic ID does not currently exist.
- `simulation.schedule_system`: skipped because this mechanic ID does not currently exist; `time.day_night_schedule` is the closest current boundary for daily timing.
- `survival.day_night_cycle`: skipped because Stardew Valley's daily clock is not primarily a survival pressure cycle in the current mechanic sense.
- `ui_ux.quest_marker`: skipped because quest board/journal behavior was too broad for this small pass.
- `ui_ux.interaction_prompt`: skipped because the clearer additions already covered economy, crafting, time, progression, and inventory.
- `narrative.branching_dialogue`: skipped because heart events and dialogue choices would need a more careful narrative-boundary review.
- `multiplayer.online_coop`: skipped because co-op farm play is mode-sensitive and not needed for this underdeveloped-anchor pass.

## Title Consistency Notes

- Exact titles used: `Dishonored` and `Stardew Valley`.
- No abbreviations, aliases, franchise-level titles, remake/remaster merges, or edition merges were added.
- No alias merging was added to code or generated reports.

## Saturation Notes

Neither target was saturated before this pass:

- `Dishonored` moved from 4 to 11 mechanics.
- `Stardew Valley` moved from 2 to 8 mechanics.

This pass did not touch saturated anchors such as `Hades`, `The Legend of Zelda: Breath of the Wild`, `Minecraft`, `Celeste`, `Dark Souls`, or `The Elder Scrolls V: Skyrim`.

## Known Limitations

- This pass reviewed only two games.
- It does not claim these games contain only the listed mechanics.
- It does not prove exact implementation details.
- Some plausible examples were skipped because the current mechanic boundary was too broad, too narrow, missing, or less useful than clearer additions.
- Stardew Valley still lacks a direct crop-growth or relationship-system mechanic boundary in the current dataset.

## Recommendation

Another tiny enrichment pass is safe if it follows the same policy:

- choose one or two underdeveloped games,
- avoid saturated anchors,
- add only clear visible-behavior examples,
- document skipped candidates,
- regenerate reports and validation.

Good future candidates include `Doom`, `The Binding of Isaac`, and another single underdeveloped genre anchor, but each should be handled in a separate small pass.
