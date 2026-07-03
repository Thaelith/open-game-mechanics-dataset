const playableData = window.PlayableExamplesData || { demos: [], byId: {} };
const demoList = document.querySelector("#demoList");
const demoMechanicId = document.querySelector("#demoMechanicId");
const demoTitle = document.querySelector("#demoTitle");
const demoDescription = document.querySelector("#demoDescription");
const demoControls = document.querySelector("#demoControls");
const demoObserve = document.querySelector("#demoObserve");
const demoBug = document.querySelector("#demoBug");
const demoRelated = document.querySelector("#demoRelated");
const resetDemoButton = document.querySelector("#resetDemo");
const openMechanicLink = document.querySelector("#openMechanicLink");
const touchControls = document.querySelector("#touchControls");
const canvas = document.querySelector("#demoCanvas");
const ctx = canvas.getContext("2d");

const input = {
  held: new Set(),
  pressed: new Set()
};

let activeDemo = null;
let demoState = null;
let lastFrame = performance.now();

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function consume(action) {
  if (!input.pressed.has(action)) {
    return false;
  }
  input.pressed.delete(action);
  return true;
}

function queue(action) {
  input.pressed.add(action);
}

function isHeld(action) {
  return input.held.has(action);
}

function setHeld(action, active) {
  if (active) {
    input.held.add(action);
  } else {
    input.held.delete(action);
  }
}

function directionInput() {
  return (isHeld("right") ? 1 : 0) - (isHeld("left") ? 1 : 0);
}

function drawText(text, x, y, options = {}) {
  ctx.save();
  ctx.fillStyle = options.color || "#1d2522";
  ctx.font = `${options.weight || "600"} ${options.size || 16}px Inter, system-ui, sans-serif`;
  ctx.textAlign = options.align || "left";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawBar(x, y, width, height, value, label, color = "#146c5a") {
  const amount = clamp(value, 0, 1);
  ctx.save();
  ctx.fillStyle = "#eef3f1";
  ctx.strokeStyle = "#d8dfdc";
  ctx.lineWidth = 2;
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width * amount, height);
  drawText(label, x, y - 8, { size: 14, color: "#65726c" });
  ctx.restore();
}

function drawPlayer(x, y, color = "#146c5a") {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x - 17, y - 28, 34, 56);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 5, y - 18, 6, 6);
  ctx.restore();
}

function clearCanvas(title) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f7f8f6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawText(title, 28, 38, { size: 20, weight: "700" });
}

function drawGround(y = 370) {
  ctx.fillStyle = "#d8dfdc";
  ctx.fillRect(0, y, canvas.width, 4);
}

function drawPlatform(x, y, width, height = 18) {
  ctx.save();
  ctx.fillStyle = "#36524b";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "#e7f2ee";
  ctx.fillRect(x, y, width, 4);
  ctx.restore();
}

function mechanicHref(id) {
  return `index.html?id=${encodeURIComponent(id)}`;
}

function demoHref(id) {
  return `playable-examples.html?demo=${encodeURIComponent(id)}`;
}

function renderDemoList() {
  demoList.innerHTML = playableData.demos
    .map(
      (demo) => `
        <button
          class="demo-list-button ${activeDemo?.demo_id === demo.demo_id ? "is-active" : ""}"
          type="button"
          data-demo-id="${escapeHtml(demo.demo_id)}"
        >
          <strong>${escapeHtml(demo.title)}</strong>
          <code>${escapeHtml(demo.mechanic_id)}</code>
        </button>
      `
    )
    .join("");
}

function renderList(target, values) {
  target.innerHTML = values.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderTouchControls(buttons) {
  touchControls.innerHTML = buttons
    .map(
      (button) => `
        <button
          type="button"
          data-touch-action="${escapeHtml(button.action)}"
          data-touch-mode="${button.mode || "press"}"
        >${escapeHtml(button.label)}</button>
      `
    )
    .join("");
}

function renderMetadata() {
  demoMechanicId.textContent = activeDemo.mechanic_id;
  demoTitle.textContent = activeDemo.title;
  demoDescription.textContent = activeDemo.short_description;
  renderList(demoControls, activeDemo.controls);
  renderList(demoObserve, activeDemo.what_to_observe);
  demoBug.textContent = activeDemo.common_bug_demonstrated_or_prevented;
  demoRelated.innerHTML = activeDemo.related_mechanics
    .map((id) => `<a class="pill related-button" href="${escapeHtml(mechanicHref(id))}">${escapeHtml(id)}</a>`)
    .join("");
  openMechanicLink.href = mechanicHref(activeDemo.mechanic_id);
}

function setActiveDemo(id, options = {}) {
  const nextDemo = playableData.byId[id] || playableData.demos[0];
  if (!nextDemo) {
    return;
  }
  activeDemo = nextDemo;
  input.held.clear();
  input.pressed.clear();
  resetActiveDemo();
  renderDemoList();
  renderMetadata();
  renderTouchControls(demoHandlers[activeDemo.demo_id].touchControls);
  if (options.updateUrl !== false) {
    const url = new URL(window.location.href);
    url.searchParams.set("demo", activeDemo.demo_id);
    window.history.replaceState({ demo: activeDemo.demo_id }, "", url);
  }
}

function resetActiveDemo() {
  if (!activeDemo) {
    return;
  }
  demoState = demoHandlers[activeDemo.demo_id].reset();
}

function requestedDemoId() {
  return new URL(window.location.href).searchParams.get("demo") || playableData.demos[0]?.demo_id || "";
}

function dashReset() {
  return {
    x: 170,
    y: 355,
    dashDirection: 1,
    dashTimer: 0,
    dashDuration: 0.18,
    dashCooldown: 0,
    dashCooldownMax: 1.0,
    trail: [],
    message: "Dash ready."
  };
}

function dashUpdate(dt, state) {
  const dir = directionInput();
  if (dir) {
    state.dashDirection = dir;
  }

  state.dashCooldown = Math.max(0, state.dashCooldown - dt);
  state.dashTimer = Math.max(0, state.dashTimer - dt);

  if ((consume("dash") || consume("jump")) && state.dashCooldown <= 0 && state.dashTimer <= 0) {
    state.dashTimer = state.dashDuration;
    state.dashCooldown = state.dashCooldownMax;
    state.message = "Dash committed: input is locked during the burst.";
  }

  if (state.dashTimer > 0) {
    state.x += state.dashDirection * 760 * dt;
    state.trail.push({ x: state.x, y: state.y, life: 0.22 });
  } else {
    state.x += dir * 190 * dt;
  }

  state.x = clamp(state.x, 50, canvas.width - 50);
  state.trail = state.trail
    .map((item) => ({ ...item, life: item.life - dt }))
    .filter((item) => item.life > 0)
    .slice(-10);
}

function dashDraw(state) {
  clearCanvas("movement.dash");
  drawGround(385);
  ctx.save();
  for (const ghost of state.trail) {
    ctx.globalAlpha = clamp(ghost.life / 0.22, 0, 1) * 0.35;
    drawPlayer(ghost.x, ghost.y, "#146c5a");
  }
  ctx.restore();
  drawPlayer(state.x, state.y, state.dashTimer > 0 ? "#9c5b1a" : "#146c5a");
  drawBar(28, 72, 220, 18, 1 - state.dashCooldown / state.dashCooldownMax, "Cooldown / ready state");
  drawText(state.dashCooldown <= 0 ? "Ready" : `${state.dashCooldown.toFixed(1)}s`, 260, 88, {
    size: 14,
    color: state.dashCooldown <= 0 ? "#146c5a" : "#9c5b1a"
  });
  drawText(state.message, 28, 455, { size: 15, color: "#65726c" });
}

const platformTop = 340;
const playerHalfHeight = 28;

function coyoteReset() {
  return {
    x: 125,
    y: platformTop - playerHalfHeight,
    vx: 0,
    vy: 0,
    onGround: true,
    coyote: 0.12,
    coyoteMax: 0.12,
    message: "Walk off the ledge, then press jump quickly."
  };
}

function isSupportedByPlatform(x, y) {
  const feet = y + playerHalfHeight;
  return Math.abs(feet - platformTop) < 4 && x >= 70 && x <= 430;
}

function coyoteUpdate(dt, state) {
  const dir = directionInput();
  state.vx = dir * 175;
  state.x += state.vx * dt;

  if (state.onGround && !isSupportedByPlatform(state.x, state.y)) {
    state.onGround = false;
    state.message = "Left ground: coyote timer is active.";
  }

  if (!state.onGround) {
    state.coyote = Math.max(0, state.coyote - dt);
    state.vy += 980 * dt;
    state.y += state.vy * dt;
  } else {
    state.coyote = state.coyoteMax;
    state.vy = 0;
  }

  if (consume("jump")) {
    if (state.onGround || state.coyote > 0) {
      state.onGround = false;
      state.coyote = 0;
      state.vy = -430;
      state.message = "Jump accepted from ground grace window.";
    } else {
      state.message = "Jump missed: coyote timer already expired.";
    }
  }

  if (!state.onGround && state.vy >= 0 && state.y + playerHalfHeight >= platformTop && state.x >= 70 && state.x <= 430) {
    state.y = platformTop - playerHalfHeight;
    state.onGround = true;
    state.vy = 0;
    state.message = "Grounded. Walk off the ledge again.";
  }

  if (state.y > canvas.height + 80 || state.x > canvas.width + 80 || state.x < -80) {
    Object.assign(state, coyoteReset());
  }
}

function coyoteDraw(state) {
  clearCanvas("platforming.coyote_time");
  drawPlatform(70, platformTop, 360);
  drawPlayer(state.x, state.y, state.onGround ? "#146c5a" : "#9c5b1a");
  drawBar(28, 72, 220, 18, state.coyote / state.coyoteMax, "Coyote-time window");
  drawText(state.onGround ? "Grounded" : state.coyote > 0 ? "Grace window active" : "No jump grace", 260, 88, {
    size: 14,
    color: state.coyote > 0 ? "#146c5a" : "#9c5b1a"
  });
  drawText("Ledge ends here", 392, platformTop - 14, { size: 14, color: "#65726c" });
  drawText(state.message, 28, 455, { size: 15, color: "#65726c" });
}

function bufferReset() {
  return {
    x: 180,
    y: 110,
    vy: 40,
    onGround: false,
    buffer: 0,
    bufferMax: 0.18,
    message: "Press jump just before landing."
  };
}

function bufferUpdate(dt, state) {
  state.x += directionInput() * 160 * dt;
  state.x = clamp(state.x, 80, canvas.width - 80);

  if (consume("jump")) {
    if (state.onGround) {
      state.vy = -430;
      state.onGround = false;
      state.message = "Jump started from ground.";
    } else {
      state.buffer = state.bufferMax;
      state.message = "Jump input buffered before landing.";
    }
  }

  state.buffer = Math.max(0, state.buffer - dt);

  if (!state.onGround) {
    state.vy += 1020 * dt;
    state.y += state.vy * dt;
  }

  if (!state.onGround && state.vy >= 0 && state.y + playerHalfHeight >= platformTop) {
    state.y = platformTop - playerHalfHeight;
    if (state.buffer > 0) {
      state.vy = -430;
      state.onGround = false;
      state.buffer = 0;
      state.message = "Buffered jump consumed on landing.";
    } else {
      state.vy = 0;
      state.onGround = true;
      state.message = "Landed with no buffered jump.";
    }
  }

  if (state.y < 80 && state.vy < 0) {
    state.vy *= 0.85;
  }
}

function bufferDraw(state) {
  clearCanvas("platforming.jump_buffering");
  drawPlatform(70, platformTop, canvas.width - 140);
  drawPlayer(state.x, state.y, state.buffer > 0 ? "#9c5b1a" : "#146c5a");
  drawBar(28, 72, 220, 18, state.buffer / state.bufferMax, "Buffered jump input");
  drawText(state.buffer > 0 ? "Input stored" : "No buffered input", 260, 88, {
    size: 14,
    color: state.buffer > 0 ? "#9c5b1a" : "#65726c"
  });
  drawText(state.message, 28, 455, { size: 15, color: "#65726c" });
}

function reloadReset() {
  return {
    ammo: 6,
    magazineSize: 6,
    reload: 0,
    reloadTime: 1.35,
    targetFlash: 0,
    shots: [],
    message: "Fire until empty, then reload."
  };
}

function reloadUpdate(dt, state) {
  if (consume("fire")) {
    if (state.reload > 0) {
      state.message = "Cannot fire during reload state.";
    } else if (state.ammo > 0) {
      state.ammo -= 1;
      state.targetFlash = 0.16;
      state.shots.push({ life: 0.18 });
      state.message = state.ammo ? "Shot fired. Ammo transaction completed." : "Magazine empty. Reload required.";
    } else {
      state.message = "Empty. Press R or Reload.";
    }
  }

  if (consume("reload")) {
    if (state.reload > 0) {
      state.message = "Already reloading.";
    } else if (state.ammo === state.magazineSize) {
      state.message = "Magazine already full.";
    } else {
      state.reload = state.reloadTime;
      state.message = "Reload started. Firing is blocked until complete.";
    }
  }

  if (state.reload > 0) {
    state.reload = Math.max(0, state.reload - dt);
    if (state.reload === 0) {
      state.ammo = state.magazineSize;
      state.message = "Reload complete. Ammo display and gameplay state match.";
    }
  }

  state.targetFlash = Math.max(0, state.targetFlash - dt);
  state.shots = state.shots.map((shot) => ({ life: shot.life - dt })).filter((shot) => shot.life > 0);
}

function reloadDraw(state) {
  clearCanvas("combat.reload");
  const gunX = 160;
  const targetX = 700;
  const targetY = 285;
  ctx.fillStyle = "#36524b";
  ctx.fillRect(gunX - 35, targetY - 8, 80, 16);
  ctx.fillStyle = state.targetFlash > 0 ? "#9c5b1a" : "#146c5a";
  ctx.beginPath();
  ctx.arc(targetX, targetY, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(targetX, targetY, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#9c5b1a";
  ctx.lineWidth = 4;
  for (const shot of state.shots) {
    ctx.globalAlpha = clamp(shot.life / 0.18, 0, 1);
    ctx.beginPath();
    ctx.moveTo(gunX + 50, targetY);
    ctx.lineTo(targetX - 60, targetY);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  drawText(`Ammo ${state.ammo}/${state.magazineSize}`, 28, 82, { size: 18, weight: "700" });
  for (let index = 0; index < state.magazineSize; index += 1) {
    ctx.fillStyle = index < state.ammo ? "#146c5a" : "#d8dfdc";
    ctx.fillRect(28 + index * 28, 104, 18, 34);
  }
  drawBar(28, 172, 240, 18, state.reload > 0 ? 1 - state.reload / state.reloadTime : 1, "Reload progress");
  drawText(state.reload > 0 ? "Reloading" : "Ready", 280, 188, {
    size: 14,
    color: state.reload > 0 ? "#9c5b1a" : "#146c5a"
  });
  drawText(state.message, 28, 455, { size: 15, color: "#65726c" });
}

function cooldownReset() {
  return {
    abilities: [
      { action: "ability1", label: "1 Dash", cooldown: 1.4, remaining: 0, color: "#146c5a" },
      { action: "ability2", label: "2 Burst", cooldown: 2.2, remaining: 0, color: "#9c5b1a" },
      { action: "ability3", label: "3 Guard", cooldown: 3.2, remaining: 0, color: "#36524b" }
    ],
    flash: "",
    flashTime: 0,
    message: "Use abilities and watch availability feedback."
  };
}

function cooldownUpdate(dt, state) {
  for (const ability of state.abilities) {
    ability.remaining = Math.max(0, ability.remaining - dt);
    if (consume(ability.action)) {
      if (ability.remaining > 0) {
        state.flash = ability.label;
        state.flashTime = 0.2;
        state.message = `${ability.label} is still unavailable. Input feedback should say why.`;
      } else {
        ability.remaining = ability.cooldown;
        state.flash = ability.label;
        state.flashTime = 0.25;
        state.message = `${ability.label} activated. Indicator now shows the same cooldown state that gates input.`;
      }
    }
  }
  state.flashTime = Math.max(0, state.flashTime - dt);
}

function cooldownDraw(state) {
  clearCanvas("ui_ux.cooldown_indicator");
  drawText(state.message, 28, 455, { size: 15, color: "#65726c" });
  state.abilities.forEach((ability, index) => {
    const x = 120 + index * 245;
    const y = 185;
    const width = 170;
    const height = 130;
    const ready = ability.remaining <= 0;
    const fill = ability.remaining / ability.cooldown;
    ctx.save();
    ctx.fillStyle = ready ? "#ffffff" : "#eef3f1";
    ctx.strokeStyle = ready ? ability.color : "#d8dfdc";
    ctx.lineWidth = 4;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
    if (!ready) {
      ctx.fillStyle = "rgba(29, 37, 34, 0.16)";
      ctx.fillRect(x, y + height * (1 - fill), width, height * fill);
    }
    drawText(ability.label, x + width / 2, y + 48, {
      align: "center",
      size: 20,
      weight: "700",
      color: ready ? "#1d2522" : "#65726c"
    });
    drawText(ready ? "READY" : `${ability.remaining.toFixed(1)}s`, x + width / 2, y + 82, {
      align: "center",
      size: 16,
      color: ready ? "#146c5a" : "#9c5b1a"
    });
    ctx.restore();
  });
  if (state.flashTime > 0) {
    drawText(`Input: ${state.flash}`, canvas.width / 2, 390, {
      align: "center",
      size: 18,
      color: "#9c5b1a"
    });
  }
}

const demoHandlers = {
  "movement.dash": {
    reset: dashReset,
    update: dashUpdate,
    draw: dashDraw,
    touchControls: [
      { label: "Left", action: "left", mode: "hold" },
      { label: "Right", action: "right", mode: "hold" },
      { label: "Dash", action: "dash" }
    ]
  },
  "platforming.coyote_time": {
    reset: coyoteReset,
    update: coyoteUpdate,
    draw: coyoteDraw,
    touchControls: [
      { label: "Left", action: "left", mode: "hold" },
      { label: "Right", action: "right", mode: "hold" },
      { label: "Jump", action: "jump" }
    ]
  },
  "platforming.jump_buffering": {
    reset: bufferReset,
    update: bufferUpdate,
    draw: bufferDraw,
    touchControls: [
      { label: "Left", action: "left", mode: "hold" },
      { label: "Right", action: "right", mode: "hold" },
      { label: "Jump", action: "jump" }
    ]
  },
  "combat.reload": {
    reset: reloadReset,
    update: reloadUpdate,
    draw: reloadDraw,
    touchControls: [
      { label: "Fire", action: "fire" },
      { label: "Reload", action: "reload" }
    ]
  },
  "ui_ux.cooldown_indicator": {
    reset: cooldownReset,
    update: cooldownUpdate,
    draw: cooldownDraw,
    touchControls: [
      { label: "Ability 1", action: "ability1" },
      { label: "Ability 2", action: "ability2" },
      { label: "Ability 3", action: "ability3" }
    ]
  }
};

function handleKey(event, isDown) {
  const keyMap = {
    ArrowLeft: "left",
    KeyA: "left",
    ArrowRight: "right",
    KeyD: "right"
  };
  const holdAction = keyMap[event.code];
  if (holdAction) {
    event.preventDefault();
    setHeld(holdAction, isDown);
    return;
  }

  if (!isDown || event.repeat) {
    return;
  }

  const pressMap = {
    Space: "jump",
    ShiftLeft: "dash",
    ShiftRight: "dash",
    KeyF: "fire",
    KeyR: "reload",
    Digit1: "ability1",
    Digit2: "ability2",
    Digit3: "ability3"
  };
  const action = pressMap[event.code];
  if (action) {
    event.preventDefault();
    queue(action);
  }
}

function attachEvents() {
  demoList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-demo-id]");
    if (button) {
      setActiveDemo(button.dataset.demoId);
    }
  });

  resetDemoButton.addEventListener("click", resetActiveDemo);

  document.addEventListener("keydown", (event) => handleKey(event, true));
  document.addEventListener("keyup", (event) => handleKey(event, false));

  canvas.addEventListener("pointerdown", () => {
    if (activeDemo?.demo_id === "combat.reload") {
      queue("fire");
    }
  });

  touchControls.addEventListener("pointerdown", (event) => {
    const button = event.target.closest("[data-touch-action]");
    if (!button) {
      return;
    }
    event.preventDefault();
    const action = button.dataset.touchAction;
    if (button.dataset.touchMode === "hold") {
      setHeld(action, true);
    } else {
      queue(action);
    }
  });

  for (const eventName of ["pointerup", "pointercancel", "pointerleave"]) {
    touchControls.addEventListener(eventName, (event) => {
      const button = event.target.closest("[data-touch-action]");
      if (button?.dataset.touchMode === "hold") {
        setHeld(button.dataset.touchAction, false);
      }
    });
  }
}

function frame(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  if (activeDemo && demoState) {
    const handler = demoHandlers[activeDemo.demo_id];
    handler.update(dt, demoState);
    handler.draw(demoState);
  }
  input.pressed.clear();
  requestAnimationFrame(frame);
}

function init() {
  attachEvents();
  setActiveDemo(requestedDemoId(), { updateUrl: false });
  requestAnimationFrame(frame);
}

init();
