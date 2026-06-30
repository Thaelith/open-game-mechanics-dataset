# Demo Mixes

These examples show how the deterministic Mechanic Mixer surfaces required systems, missing dependencies, conflict warnings, scope pressure, trim suggestions, and related additions.

The Mixer does not generate a complete game design. It explains what the selected mechanics imply according to the current dataset.

## Mobility Combat Prototype

Mix:

```text
movement.air_dash,combat.reload,ui_ux.cooldown_indicator
```

URL:

[https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=movement.air_dash,combat.reload,ui_ux.cooldown_indicator](https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=movement.air_dash,combat.reload,ui_ux.cooldown_indicator)

What to look for:

- Cooldown-related dependencies.
- `movement.dash` support.
- Scope pressure.
- Readable UI requirements.

## Online Co-op + Time Rewind Risk

Mix:

```text
time.time_rewind,multiplayer.online_coop
```

URL:

[https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=time.time_rewind,multiplayer.online_coop](https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=time.time_rewind,multiplayer.online_coop)

What to look for:

- Hard conflict warning.
- Rollback, timeline, and authority risk.
- High or very high scope pressure.

## Survival Pressure Loop

Mix:

```text
survival.hunger,survival.thirst,survival.temperature,time.day_night_schedule
```

URL:

[https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=survival.hunger,survival.thirst,survival.temperature,time.day_night_schedule](https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=survival.hunger,survival.thirst,survival.temperature,time.day_night_schedule)

What to look for:

- Survival stat systems.
- UI warning bands.
- Save/load pressure.
- Related additions.

## Accessibility-heavy Platformer

Mix:

```text
platforming.coyote_time,platforming.jump_buffering,accessibility.assist_mode,accessibility.toggle_hold_option,movement.air_dash
```

URL:

[https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=platforming.coyote_time,platforming.jump_buffering,accessibility.assist_mode,accessibility.toggle_hold_option,movement.air_dash](https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=platforming.coyote_time,platforming.jump_buffering,accessibility.assist_mode,accessibility.toggle_hold_option,movement.air_dash)

What to look for:

- Accessibility, input, and tuning support.
- Movement support dependencies.
- Whether accessibility mechanics remain intentional support rather than disposable filler.

## Crafting Economy Loop

Mix:

```text
crafting.recipe_crafting,crafting.crafting_queue,economy.crafting_materials,economy.shop,ui_ux.inventory_grid
```

URL:

[https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=crafting.recipe_crafting,crafting.crafting_queue,economy.crafting_materials,economy.shop,ui_ux.inventory_grid](https://thaelith.github.io/open-game-mechanics-dataset/site/?mix=crafting.recipe_crafting,crafting.crafting_queue,economy.crafting_materials,economy.shop,ui_ux.inventory_grid)

What to look for:

- Inventory, wallet, and transaction requirements.
- Save/load and UI risk.
- Workbench, progression, or resource-flow suggestions if relevant.
