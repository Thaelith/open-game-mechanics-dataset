(function (root) {
  const demos = [
    {
      mechanic_id: "movement.dash",
      demo_id: "movement.dash",
      title: "Dash",
      short_description: "A burst movement action with duration, input lock, direction, and cooldown.",
      demo_path: "playable-examples.html?demo=movement.dash",
      controls: ["A/D or Arrow keys: move", "Space or Shift: dash", "Touch buttons: move and dash"],
      what_to_observe: [
        "Dash distance comes from speed over a short committed duration.",
        "The cooldown prevents immediate repeated bursts.",
        "The cooldown indicator makes availability visible without changing the dash itself."
      ],
      common_bug_demonstrated_or_prevented:
        "Prevents repeated dash spam by keeping dash state and cooldown state separate from normal movement input.",
      related_mechanics: ["time.cooldown_time", "ui_ux.cooldown_indicator", "movement.air_dash"]
    },
    {
      mechanic_id: "platforming.coyote_time",
      demo_id: "platforming.coyote_time",
      title: "Coyote Time",
      short_description: "A small grace window that lets the player jump shortly after leaving a ledge.",
      demo_path: "playable-examples.html?demo=platforming.coyote_time",
      controls: ["A/D or Arrow keys: move", "Space: jump", "Touch buttons: move and jump"],
      what_to_observe: [
        "The player can still jump for a short time after walking off the platform.",
        "The timer expires quickly, so late inputs still fail.",
        "The mechanic depends on reliable ground-exit timing."
      ],
      common_bug_demonstrated_or_prevented:
        "Prevents missed ledge jumps by preserving a short ground grace timer after ground contact ends.",
      related_mechanics: ["platforming.jump_buffering", "platforming.double_jump", "platforming.variable_jump_height"]
    },
    {
      mechanic_id: "platforming.jump_buffering",
      demo_id: "platforming.jump_buffering",
      title: "Jump Buffering",
      short_description: "A pre-landing input buffer that consumes jump intent as soon as landing becomes valid.",
      demo_path: "playable-examples.html?demo=platforming.jump_buffering",
      controls: ["A/D or Arrow keys: move", "Space: buffer or perform jump", "Touch buttons: move and jump"],
      what_to_observe: [
        "Pressing jump shortly before landing stores the input.",
        "The buffered jump fires on landing if the buffer is still active.",
        "The buffer must be consumed or cleared to avoid stale jumps."
      ],
      common_bug_demonstrated_or_prevented:
        "Prevents dropped pre-landing jump inputs while clearing stale buffered input after use or timeout.",
      related_mechanics: ["platforming.coyote_time", "platforming.double_jump", "platforming.wall_jump"]
    },
    {
      mechanic_id: "combat.reload",
      demo_id: "combat.reload",
      title: "Reload",
      short_description: "A ranged action resource loop with ammo state, reload state, timing, and UI feedback.",
      demo_path: "playable-examples.html?demo=combat.reload",
      controls: ["Mouse click or F: fire", "R: reload", "Touch buttons: fire and reload"],
      what_to_observe: [
        "Firing consumes ammo and updates the ammo display.",
        "Reloading blocks firing until the reload timer completes.",
        "The reload progress bar is separate from the ammo transaction."
      ],
      common_bug_demonstrated_or_prevented:
        "Prevents firing during reload by treating reloading as an explicit state instead of only an animation.",
      related_mechanics: ["combat.ranged_attack", "time.cooldown_time", "ui_ux.cooldown_indicator"]
    },
    {
      mechanic_id: "ui_ux.cooldown_indicator",
      demo_id: "ui_ux.cooldown_indicator",
      title: "Cooldown Indicator",
      short_description: "Action availability feedback for abilities that are temporarily unavailable after use.",
      demo_path: "playable-examples.html?demo=ui_ux.cooldown_indicator",
      controls: ["Keys 1/2/3: activate abilities", "Touch buttons: activate abilities"],
      what_to_observe: [
        "Each ability has its own cooldown source and ready state.",
        "Disabled actions are visible while cooling down.",
        "The indicator communicates action availability, not every possible stat meter."
      ],
      common_bug_demonstrated_or_prevented:
        "Prevents ready-state desync by drawing cooldown fill from the same remaining-time state that gates ability use.",
      related_mechanics: ["time.cooldown_time", "movement.dash", "combat.reload"]
    }
  ];

  root.PlayableExamplesData = {
    demos,
    byId: Object.fromEntries(demos.map((demo) => [demo.mechanic_id, demo]))
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
