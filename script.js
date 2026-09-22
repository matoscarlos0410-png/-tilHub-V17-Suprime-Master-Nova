/* =========================================================
   ÚTILHUB V17 — NOVA FLOW X
   SCRIPT.JS
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const STORAGE_KEY = "utilhub-v17-nova-flow";

const DEFAULT_STATE = {
  theme: "dark",
  motion: true,
  effects: true,
  performance: "balanced",

  novaMode: "cosmic",

  particleCount: 110,
  speed: 1,
  intensity: 70,
  connectionDistance: 120,
  glow: 70,

  favorites: [],
  recent: [],

  notes: "",
  tasks: [],
  shoppingList: [],

  lastCurrency: null
};

let state = loadState();

const NOVA_MODES = [
  {
    id: "cosmic",
    name: "COSMIC",
    icon: "🌌",
    description: "Espacio profundo y partículas.",
    color: "#22d3ee"
  },
  {
    id: "aurora",
    name: "AURORA",
    icon: "🌈",
    description: "Ondas luminosas y suaves.",
    color: "#34d399"
  },
  {
    id: "pulse",
    name: "PULSE",
    icon: "💓",
    description: "Pulsos energéticos dinámicos.",
    color: "#60a5fa"
  },
  {
    id: "nebula",
    name: "NEBULA",
    icon: "☁️",
    description: "Nubes de energía.",
    color: "#c084fc"
  },
  {
    id: "cyber",
    name: "CYBER",
    icon: "💠",
    description: "Red tecnológica futurista.",
    color: "#22d3ee"
  },
  {
    id: "galaxy",
    name: "GALAXY",
    icon: "🌀",
    description: "Galaxias giratorias.",
    color: "#818cf8"
  },
  {
    id: "matrix",
    name: "MATRIX",
    icon: "🟢",
    description: "Lluvia digital.",
    color: "#4ade80"
  },
  {
    id: "wave",
    name: "WAVE",
    icon: "🌊",
    description: "Ondas que recorren la pantalla.",
    color: "#38bdf8"
  },
  {
    id: "quantum",
    name: "QUANTUM",
    icon: "⚛️",
    description: "Partículas impredecibles.",
    color: "#f472b6"
  },
  {
    id: "core",
    name: "CORE",
    icon: "🔵",
    description: "Núcleo energético central.",
    color: "#22d3ee"
  },
  {
    id: "stardust",
    name: "STARDUST",
    icon: "✨",
    description: "Polvo de estrellas.",
    color: "#facc15"
  },
  {
    id: "eclipse",
    name: "ECLIPSE",
    icon: "🌑",
    description: "Contraste oscuro orbital.",
    color: "#a78bfa"
  },
  {
    id: "plasma",
    name: "PLASMA",
    icon: "🔥",
    description: "Energía caliente y rápida.",
    color: "#fb7185"
  },
  {
    id: "void",
    name: "VOID",
    icon: "⚫",
    description: "Minimalismo espacial.",
    color: "#94a3b8"
  },
  {
    id: "lightning",
    name: "LIGHTNING",
    icon: "⚡",
    description: "Destellos eléctricos.",
    color: "#fef08a"
  },
  {
    id: "hologram",
    name: "HOLOGRAM",
    icon: "🔷",
    description: "Efecto holográfico.",
    color: "#67e8f9"
  },
  {
    id: "gravity",
    name: "GRAVITY",
    icon: "🪐",
    description: "Partículas atraídas al centro.",
    color: "#a5b4fc"
  },
  {
    id: "fusion",
    name: "FUSION",
    icon: "☀️",
    description: "Fusión de partículas.",
    color: "#fb923c"
  },
  {
    id: "dimension",
    name: "DIMENSION",
    icon: "🔮",
    description: "Espacio con profundidad.",
    color: "#818cf8"
  },
  {
    id: "infinity",
    name: "INFINITY",
    icon: "♾️",
    description: "Flujo continuo infinito.",
    color: "#22d3ee"
  }
];


/* =========================================================
   HERRAMIENTAS
   ========================================================= */

const TOOLS = [
  {
    id: "calculator",
    name: "Calculadora",
    icon: "🧮",
    category: "Cálculo",
    description: "Realiza operaciones matemáticas."
  },
  {
    id: "percentage",
    name: "Porcentajes",
    icon: "％",
    category: "Cálculo",
    description: "Calcula porcentajes fácilmente."
  },
  {
    id: "discount",
    name: "Descuentos",
    icon: "🏷️",
    category: "Cálculo",
    description: "Calcula precio final y ahorro."
  },
  {
    id: "rule3",
    name: "Regla de tres",
    icon: "📐",
    category: "Cálculo",
    description: "Resuelve reglas de tres."
  },

  {
    id: "length",
    name: "Longitud",
    icon: "📏",
    category: "Conversión",
    description: "Convierte unidades de longitud."
  },
  {
    id: "weight",
    name: "Peso",
    icon: "⚖️",
    category: "Conversión",
    description: "Convierte unidades de peso."
  },
  {
    id: "volume",
    name: "Volumen",
    icon: "🧪",
    category: "Conversión",
    description: "Convierte unidades de volumen."
  },
  {
    id: "temperature",
    name: "Temperatura",
    icon: "🌡️",
    category: "Conversión",
    description: "Convierte temperaturas."
  },
  {
    id: "timeconvert",
    name: "Tiempo",
    icon: "⏱️",
    category: "Conversión",
    description: "Convierte unidades de tiempo."
  },
  {
    id: "currency",
    name: "Monedas",
    icon: "💱",
    category: "Conversión",
    description: "Consulta conversiones de monedas."
  },

  {
    id: "datediff",
    name: "Diferencia de fechas",
    icon: "📅",
    category: "Tiempo",
    description: "Calcula días entre dos fechas."
  },
  {
    id: "age",
    name: "Edad",
    icon: "🎂",
    category: "Tiempo",
    description: "Calcula tu edad."
  },
  {
    id: "timer",
    name: "Temporizador",
    icon: "⏳",
    category: "Tiempo",
    description: "Cuenta atrás con precisión."
  },
  {
    id: "stopwatch",
    name: "Cronómetro",
    icon: "⏱️",
    category: "Tiempo",
    description: "Mide el tiempo transcurrido."
  },
  {
    id: "clock",
    name: "Reloj",
    icon: "🕐",
    category: "Tiempo",
    description: "Muestra la hora actual."
  },

  {
    id: "text",
    name: "Texto",
    icon: "🔤",
    category: "Texto",
    description: "Herramientas para trabajar con texto."
  },
  {
    id: "dictionary",
    name: "Diccionario",
    icon: "📖",
    category: "Texto",
    description: "Busca definiciones en español."
  },

  {
    id: "notes",
    name: "Notas",
    icon: "📝",
    category: "Organización",
    description: "Guarda notas en tu dispositivo."
  },
  {
    id: "tasks",
    name: "Tareas",
    icon: "✅",
    category: "Organización",
    description: "Organiza tus tareas."
  },
  {
    id: "shopping",
    name: "Lista de compras",
    icon: "🛒",
    category: "Organización",
    description: "Crea tu lista de compras."
  },

  {
    id: "password",
    name: "Contraseña",
    icon: "🔐",
    category: "Utilidades",
    description: "Genera contraseñas aleatorias."
  },
  {
    id: "random",
    name: "Aleatorio",
    icon: "🎲",
    category: "Utilidades",
    description: "Genera números y resultados aleatorios."
  },
  {
    id: "qr",
    name: "Código QR",
    icon: "▦",
    category: "Utilidades",
    description: "Crea un código QR."
  },

  {
    id: "food",
    name: "Comidas",
    icon: "🍔",
    category: "Utilidades",
    description: "Busca restaurantes y comidas."
  },
  {
    id: "buy",
    name: "Compras",
    icon: "🛍️",
    category: "Utilidades",
    description: "Busca productos y tiendas."
  }
];


/* =========================================================
   UTILIDADES GENERALES
   ========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return structuredClone(DEFAULT_STATE);
    }

    return {
      ...structuredClone(DEFAULT_STATE),
      ...JSON.parse(saved)
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch {
    showToast("No se pudo guardar localmente.", "⚠️");
  }
}

function showToast(message, icon = "✓") {
  const toast = $("#toast");

  if (!toast) {
    alert(message);
    return;
  }

  const iconElement = $("#toastIcon");
  const textElement = $("#toastText");

  if (iconElement) {
    iconElement.textContent = icon;
  }

  if (textElement) {
    textElement.textContent = message;
  }

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function formatNumber(number) {
  if (!Number.isFinite(number)) {
    return "—";
  }

  return new Intl.NumberFormat("es-PE", {
    maximumFractionDigits: 8
  }).format(number);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium"
  }).format(date);
}

function addRecent(toolId) {
  state.recent = [
    toolId,
    ...state.recent.filter(id => id !== toolId)
  ].slice(0, 8);

  saveState();
}

function isFavorite(toolId) {
  return state.favorites.includes(toolId);
}

function toggleFavorite(toolId) {
  if (isFavorite(toolId)) {
    state.favorites =
      state.favorites.filter(id => id !== toolId);

    showToast("Eliminado de favoritos", "☆");
  } else {
    state.favorites.push(toolId);

    showToast("Añadido a favoritos", "★");
  }

  saveState();

  renderTools();
}


/* =========================================================
   TEMA
   ========================================================= */

function applyTheme() {
  document.body.classList.toggle(
    "light-theme",
    state.theme === "light"
  );

  const themeButton =
    $("#themeButton");

  if (themeButton) {
    themeButton.textContent =
      state.theme === "light"
        ? "🌙"
        : "☀️";
  }
}

function toggleTheme() {
  state.theme =
    state.theme === "dark"
      ? "light"
      : "dark";

  applyTheme();
  saveState();

  showToast(
    state.theme === "dark"
      ? "Modo oscuro activado"
      : "Modo claro activado",
    state.theme === "dark" ? "🌙" : "☀️"
  );
}


/* =========================================================
   NOVA FLOW — CONFIGURACIÓN
   ========================================================= */

function applyNovaMode(mode) {
  const selected =
    NOVA_MODES.find(item => item.id === mode)
    || NOVA_MODES[0];

  NOVA_MODES.forEach(item => {
    document.body.classList.remove(
      `nova-${item.id}`
    );
  });

  document.body.classList.add(
    `nova-${selected.id}`
  );

  state.novaMode = selected.id;

  updateNovaUI(selected);

  saveState();

  if (window.NOVA) {
    window.NOVA.setMode(selected.id);
  }
}

function updateNovaUI(selected) {
  $$(".nova-mode-card").forEach(card => {
    card.classList.toggle(
      "active",
      card.dataset.mode === selected.id
    );
  });

  const name = $("#currentNovaName");
  const description = $("#currentNovaDescription");
  const icon = $("#currentNovaIcon");

  if (name) {
    name.textContent = selected.name;
  }

  if (description) {
    description.textContent =
      selected.description;
  }

  if (icon) {
    icon.textContent = selected.icon;
  }

  const modeLabel =
    $("#novaModeLabel");

  if (modeLabel) {
    modeLabel.textContent =
      selected.name;
  }
}

function renderNovaModes() {
  const container =
    $("#novaModes");

  if (!container) {
    return;
  }

  container.innerHTML =
    NOVA_MODES.map((mode, index) => `
      <button
        class="nova-mode-card ${
          mode.id === state.novaMode
            ? "active"
            : ""
        }"
        data-mode="${mode.id}"
        style="--mode-color:${mode.color}"
        type="button"
      >
        <span class="nova-mode-number">
          ${String(index + 1).padStart(2, "0")}
        </span>

        <span class="nova-mode-name">
          ${mode.icon} ${escapeHTML(mode.name)}
        </span>

        <span class="nova-mode-description">
          ${escapeHTML(mode.description)}
        </span>
      </button>
    `).join("");

  $$(".nova-mode-card").forEach(card => {
    card.addEventListener("click", () => {
      applyNovaMode(card.dataset.mode);

      showToast(
        `NOVA ${card.dataset.mode.toUpperCase()} activado`,
        "✦"
      );
    });
  });
}


/* =========================================================
   NOVA CONTROLES
   ========================================================= */

function setupNovaControls() {
  const motion =
    $("#motionSwitch");

  const effects =
    $("#effectsSwitch");

  const performance =
    $("#performanceSwitch");

  const particleRange =
    $("#particleRange");

  const speedRange =
    $("#speedRange");

  const intensityRange =
    $("#intensityRange");

  const distanceRange =
    $("#distanceRange");

  const glowRange =
    $("#glowRange");

  if (motion) {
    motion.checked = state.motion;

    motion.addEventListener("change", () => {
      state.motion = motion.checked;

      document.body.classList.toggle(
        "motion-off",
        !state.motion
      );

      saveState();

      if (window.NOVA) {
        window.NOVA.setMotion(
          state.motion
        );
      }
    });
  }

  if (effects) {
    effects.checked = state.effects;

    effects.addEventListener("change", () => {
      state.effects = effects.checked;

      saveState();

      if (window.NOVA) {
        window.NOVA.setEffects(
          state.effects
        );
      }
    });
  }

  if (performance) {
    performance.value =
      state.performance;

    performance.addEventListener("change", () => {
      state.performance =
        performance.value;

      applyPerformance();

      saveState();

      if (window.NOVA) {
        window.NOVA.setPerformance(
          state.performance
        );
      }
    });
  }

  setupRange(
    particleRange,
    "particleCount",
    value => {
      state.particleCount =
        Number(value);

      if (window.NOVA) {
        window.NOVA.setParticleCount(
          state.particleCount
        );
      }
    }
  );

  setupRange(
    speedRange,
    "speed",
    value => {
      state.speed =
        Number(value);

      if (window.NOVA) {
        window.NOVA.setSpeed(
          state.speed
        );
      }
    }
  );

  setupRange(
    intensityRange,
    "intensity",
    value => {
      state.intensity =
        Number(value);

      if (window.NOVA) {
        window.NOVA.setIntensity(
          state.intensity
        );
      }
    }
  );

  setupRange(
    distanceRange,
    "connectionDistance",
    value => {
      state.connectionDistance =
        Number(value);

      if (window.NOVA) {
        window.NOVA.setDistance(
          state.connectionDistance
        );
      }
    }
  );

  setupRange(
    glowRange,
    "glow",
    value => {
      state.glow =
        Number(value);

      if (window.NOVA) {
        window.NOVA.setGlow(
          state.glow
        );
      }
    }
  );

  applyPerformance();
}

function setupRange(element, property, callback) {
  if (!element) {
    return;
  }

  element.value =
    state[property];

  updateRangeOutput(
    element
  );

  element.addEventListener("input", () => {
    updateRangeOutput(element);

    callback(element.value);

    saveState();
  });
}

function updateRangeOutput(element) {
  const output =
    document.querySelector(
      `[data-output="${element.id}"]`
    );

  if (output) {
    output.textContent =
      element.value;
  }
}

function applyPerformance() {
  document.body.classList.remove(
    "performance-battery",
    "performance-ultra"
  );

  if (
    state.performance === "battery"
  ) {
    document.body.classList.add(
      "performance-battery"
    );
  }

  if (
    state.performance === "ultra"
  ) {
    document.body.classList.add(
      "performance-ultra"
    );
  }
}


/* =========================================================
   PRESETS
   ========================================================= */

function applyNovaPreset(preset) {
  const presets = {
    balanced: {
      particleCount: 110,
      speed: 1,
      intensity: 70,
      connectionDistance: 120,
      glow: 70,
      performance: "balanced"
    },

    performance: {
      particleCount: 65,
      speed: 0.8,
      intensity: 45,
      connectionDistance: 80,
      glow: 45,
      performance: "battery"
    },

    extreme: {
      particleCount: 180,
      speed: 1.5,
      intensity: 100,
      connectionDistance: 155,
      glow: 100,
      performance: "ultra"
    }
  };

  const config =
    presets[preset];

  if (!config) {
    return;
  }

  Object.assign(
    state,
    config
  );

  const rangeMap = {
    particleCount: "#particleRange",
    speed: "#speedRange",
    intensity: "#intensityRange",
    connectionDistance: "#distanceRange",
    glow: "#glowRange"
  };

  Object.entries(rangeMap).forEach(
    ([property, selector]) => {
      const element =
        $(selector);

      if (element) {
        element.value =
          state[property];

        updateRangeOutput(
          element
        );
      }
    }
  );

  const performance =
    $("#performanceSwitch");

  if (performance) {
    performance.value =
      state.performance;
  }

  applyPerformance();
  saveState();

  if (window.NOVA) {
    window.NOVA.refresh();
  }

  showToast(
    `Preset ${preset} aplicado`,
    "⚡"
  );
}


/* =========================================================
   NOVA FLOW — MOTOR DE ANIMACIÓN
   ========================================================= */

class NovaFlow {
  constructor() {
    this.canvas =
      document.getElementById(
        "novaCanvas"
      );

    if (!this.canvas) {
      return;
    }

    this.ctx =
      this.canvas.getContext(
        "2d",
        {
          alpha: true
        }
      );

    this.width = 0;
    this.height = 0;

    this.dpr = 1;

    this.particles = [];
    this.stars = [];
    this.ripples = [];
    this.bursts = [];

    this.mouse = {
      x: 0,
      y: 0,
      active: false
    };

    this.mode =
      state.novaMode;

    this.motion =
      state.motion;

    this.effects =
      state.effects;

    this.performance =
      state.performance;

    this.speed =
      state.speed;

    this.intensity =
      state.intensity;

    this.distance =
      state.connectionDistance;

    this.glow =
      state.glow;

    this.time = 0;

    this.lastFrame = performance.now();

    this.fps = 60;

    this.frameCount = 0;

    this.fpsTime = 0;

    this.running = true;

    this.resizeTimer = null;

    this.resize();

    this.createParticles();

    this.bindEvents();

    this.animate();
  }

  resize() {
    if (!this.canvas) {
      return;
    }

    const rect =
      this.canvas.getBoundingClientRect();

    this.width =
      Math.max(
        1,
        window.innerWidth
      );

    this.height =
      Math.max(
        1,
        window.innerHeight
      );

    this.dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    this.canvas.width =
      this.width * this.dpr;

    this.canvas.height =
      this.height * this.dpr;

    this.canvas.style.width =
      `${this.width}px`;

    this.canvas.style.height =
      `${this.height}px`;

    this.ctx.setTransform(
      this.dpr,
      0,
      0,
      this.dpr,
      0,
      0
    );

    this.createParticles();
  }

  bindEvents() {
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(
          this.resizeTimer
        );

        this.resizeTimer =
          setTimeout(
            () => this.resize(),
            120
          );
      },
      {
        passive: true
      }
    );

    window.addEventListener(
      "pointermove",
      event => {
        this.mouse.x =
          event.clientX;

        this.mouse.y =
          event.clientY;

        this.mouse.active =
          true;
      },
      {
        passive: true
      }
    );

    window.addEventListener(
      "pointerleave",
      () => {
        this.mouse.active =
          false;
      }
    );

    window.addEventListener(
      "click",
      event => {
        if (!this.effects) {
          return;
        }

        this.createBurst(
          event.clientX,
          event.clientY
        );
      }
    );

    window.addEventListener(
      "touchstart",
      event => {
        if (!this.effects) {
          return;
        }

        const touch =
          event.touches[0];

        if (touch) {
          this.createBurst(
            touch.clientX,
            touch.clientY
          );
        }
      },
      {
        passive: true
      }
    );
  }

  createParticles() {
    if (!this.ctx) {
      return;
    }

    const mobile =
      window.innerWidth <= 700;

    let amount =
      Number(state.particleCount);

    if (mobile) {
      amount =
        Math.min(
          amount,
          85
        );
    }

    if (
      state.performance === "battery"
    ) {
      amount =
        Math.min(
          amount,
          55
        );
    }

    this.particles = [];

    for (
      let i = 0;
      i < amount;
      i++
    ) {
      this.particles.push(
        this.createParticle()
      );
    }
  }

  createParticle() {
    const angle =
      Math.random() *
      Math.PI *
      2;

    const radius =
      Math.random() *
      Math.min(
        this.width,
        this.height
      ) *
      0.48;

    return {
      x:
        Math.random() *
        this.width,

      y:
        Math.random() *
        this.height,

      vx:
        (Math.random() - 0.5) *
        0.55,

      vy:
        (Math.random() - 0.5) *
        0.55,

      size:
        Math.random() *
        2.1 +
        0.45,

      alpha:
        Math.random() *
        0.65 +
        0.15,

      phase:
        Math.random() *
        Math.PI *
        2,

      angle,

      radius,

      life:
        Math.random() * 1000,

      hue:
        Math.random() * 360
    };
  }

  createBurst(x, y) {
    if (
      this.bursts.length > 22
    ) {
      this.bursts.shift();
    }

    const particles = [];

    for (
      let i = 0;
      i < 22;
      i++
    ) {
      const angle =
        Math.random() *
        Math.PI *
        2;

      const speed =
        Math.random() *
        3 +
        1;

      particles.push({
        x,
        y,
        vx:
          Math.cos(angle) *
          speed,
        vy:
          Math.sin(angle) *
          speed,
        life: 1,
        size:
          Math.random() *
          2 +
          0.6
      });
    }

    this.bursts.push({
      x,
      y,
      radius: 1,
      alpha: 0.7,
      particles
    });
  }

  updateParticle(p, index) {
    const t =
      this.time * 0.001;

    const mode =
      this.mode;

    if (!this.motion) {
      return;
    }

    if (mode === "cosmic") {
      p.x +=
        p.vx *
        this.speed;

      p.y +=
        p.vy *
        this.speed;
    }

    else if (mode === "aurora") {
      p.x +=
        Math.sin(
          t +
          p.phase +
          p.y * 0.002
        ) *
        0.45 *
        this.speed;

      p.y +=
        p.vy *
        0.35 *
        this.speed;
    }

    else if (mode === "pulse") {
      const pulse =
        Math.sin(
          t * 2 +
          p.phase
        );

      p.x +=
        p.vx *
        (1 + pulse * 0.5) *
        this.speed;

      p.y +=
        p.vy *
        (1 + pulse * 0.5) *
        this.speed;
    }

    else if (mode === "nebula") {
      p.x +=
        Math.sin(
          t +
          p.phase
        ) *
        0.65 *
        this.speed;

      p.y +=
        Math.cos(
          t * 0.7 +
          p.phase
        ) *
        0.65 *
        this.speed;
    }

    else if (mode === "cyber") {
      p.x +=
        0.5 *
        this.speed;

      p.y +=
        p.vy *
        0.3 *
        this.speed;
    }

    else if (mode === "galaxy") {
      const cx =
        this.width / 2;

      const cy =
        this.height / 2;

      const dx =
        p.x - cx;

      const dy =
        p.y - cy;

      const distance =
        Math.max(
          40,
          Math.hypot(dx, dy)
        );

      const force =
        0.00055 *
        this.speed;

      p.vx +=
        -dy *
        force;

      p.vy +=
        dx *
        force;

      p.x += p.vx;
      p.y += p.vy;
    }

    else if (mode === "matrix") {
      p.y +=
        (1.2 +
          p.size * 0.45) *
        this.speed;

      p.x +=
        Math.sin(
          t +
          p.phase
        ) *
        0.12;
    }

    else if (mode === "wave") {
      p.x +=
        0.7 *
        this.speed;

      p.y =
        p.y +
        Math.sin(
          p.x * 0.012 +
          t * 2 +
          p.phase
        ) *
        0.55;
    }

    else if (mode === "quantum") {
      p.x +=
        p.vx *
        this.speed *
        2;

      p.y +=
        p.vy *
        this.speed *
        2;

      if (
        Math.random() <
        0.006
      ) {
        p.vx =
          (Math.random() - 0.5) *
          1.5;

        p.vy =
          (Math.random() - 0.5) *
          1.5;
      }
    }

    else if (mode === "core") {
      const cx =
        this.width / 2;

      const cy =
        this.height / 2;

      const dx =
        cx - p.x;

      const dy =
        cy - p.y;

      const distance =
        Math.max(
          1,
          Math.hypot(dx, dy)
        );

      p.vx +=
        (dx / distance) *
        0.006 *
        this.speed;

      p.vy +=
        (dy / distance) *
        0.006 *
        this.speed;

      p.x += p.vx;
      p.y += p.vy;
    }

    else if (mode === "stardust") {
      p.x +=
        p.vx *
        this.speed;

      p.y +=
        p.vy *
        this.speed;

      p.alpha =
        0.25 +
        (
          Math.sin(
            t * 3 +
            p.phase
          ) +
          1
        ) *
        0.35;
    }

    else if (mode === "eclipse") {
      const cx =
        this.width / 2;

      const cy =
        this.height / 2;

      const dx =
        p.x - cx;

      const dy =
        p.y - cy;

      const distance =
        Math.hypot(dx, dy);

      const angle =
        Math.atan2(dy, dx) +
        0.0008 *
        this.speed;

      p.x =
        cx +
        Math.cos(angle) *
        distance;

      p.y =
        cy +
        Math.sin(angle) *
        distance;
    }

    else if (mode === "plasma") {
      p.x +=
        p.vx *
        2.3 *
        this.speed;

      p.y +=
        (
          p.vy +
          Math.sin(
            t * 3 +
            p.phase
          ) *
          0.7
        ) *
        this.speed;
    }

    else if (mode === "void") {
      p.x +=
        p.vx *
        0.2 *
        this.speed;

      p.y +=
        p.vy *
        0.2 *
        this.speed;
    }

    else if (mode === "lightning") {
      p.x +=
        p.vx *
        this.speed;

      p.y +=
        p.vy *
        this.speed;

      if (
        Math.random() <
        0.004
      ) {
        p.x +=
          (Math.random() - 0.5) *
          80;

        p.y +=
          (Math.random() - 0.5) *
          80;
      }
    }

    else if (mode === "hologram") {
      p.x +=
        p.vx *
        this.speed;

      p.y +=
        p.vy *
        this.speed;

      p.alpha =
        0.2 +
        (
          Math.sin(
            t * 2 +
            p.phase
          ) +
          1
        ) *
        0.35;
    }

    else if (mode === "gravity") {
      const cx =
        this.width / 2;

      const cy =
        this.height / 2;

      const dx =
        cx - p.x;

      const dy =
        cy - p.y;

      const distance =
        Math.max(
          20,
          Math.hypot(dx, dy)
        );

      const force =
        0.012 *
        this.speed;

      p.vx +=
        (dx / distance) *
        force;

      p.vy +=
        (dy / distance) *
        force;

      p.vx *= 0.99;
      p.vy *= 0.99;

      p.x += p.vx;
      p.y += p.vy;
    }

    else if (mode === "fusion") {
      p.x +=
        p.vx *
        1.3 *
        this.speed;

      p.y +=
        p.vy *
        1.3 *
        this.speed;

      p.size =
        1 +
        Math.abs(
          Math.sin(
            t * 2 +
            p.phase
          )
        ) *
        2;
    }

    else if (mode === "dimension") {
      p.x +=
        p.vx *
        this.speed;

      p.y +=
        p.vy *
        this.speed;

      const depth =
        Math.sin(
          t +
          p.phase
        );

      p.size =
        0.5 +
        (
          depth + 1
        ) *
        1.25;
    }

    else if (mode === "infinity") {
      const cx =
        this.width / 2;

      const cy =
        this.height / 2;

      const dx =
        p.x - cx;

      const dy =
        p.y - cy;

      const distance =
        Math.max(
          1,
          Math.hypot(dx, dy)
        );

      const infinity =
        Math.sin(
          t +
          distance * 0.01
        );

      p.x +=
        (
          p.vx +
          infinity * 0.25
        ) *
        this.speed;

      p.y +=
        (
          p.vy +
          Math.cos(
            t +
            distance * 0.01
          ) *
          0.25
        ) *
        this.speed;
    }

    this.mouseInteraction(p);

    this.wrapParticle(p);
  }

  mouseInteraction(p) {
    if (
      !this.mouse.active ||
      !this.motion
    ) {
      return;
    }

    const dx =
      this.mouse.x - p.x;

    const dy =
      this.mouse.y - p.y;

    const distance =
      Math.hypot(dx, dy);

    const radius =
      150;

    if (
      distance > 0 &&
      distance < radius
    ) {
      const force =
        (1 -
          distance / radius) *
        0.018;

      p.vx +=
        dx *
        force;

      p.vy +=
        dy *
        force;

      p.vx *= 0.992;
      p.vy *= 0.992;
    }
  }

  wrapParticle(p) {
    const margin = 40;

    if (
      p.x < -margin
    ) {
      p.x =
        this.width +
        margin;
    }

    if (
      p.x >
      this.width +
      margin
    ) {
      p.x =
        -margin;
    }

    if (
      p.y < -margin
    ) {
      p.y =
        this.height +
        margin;
    }

    if (
      p.y >
      this.height +
      margin
    ) {
      p.y =
        -margin;
    }
  }

  drawBackground() {
    const ctx =
      this.ctx;

    const w =
      this.width;

    const h =
      this.height;

    ctx.clearRect(
      0,
      0,
      w,
      h
    );

    const gradient =
      ctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        0,
        w * 0.5,
        h * 0.45,
        Math.max(w, h) * 0.72
      );

    const opacity =
      0.035 +
      state.intensity / 2500;

    gradient.addColorStop(
      0,
      `rgba(34,211,238,${opacity})`
    );

    gradient.addColorStop(
      0.4,
      `rgba(59,130,246,${opacity * 0.5})`
    );

    gradient.addColorStop(
      1,
      "rgba(0,0,0,0)"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      w,
      h
    );
  }

  drawParticle(p) {
    const ctx =
      this.ctx;

    const alpha =
      Math.max(
        0.05,
        Math.min(
          1,
          p.alpha *
          (this.intensity / 70)
        )
      );

    let color =
      `rgba(34,211,238,${alpha})`;

    if (
      this.mode === "matrix"
    ) {
      color =
        `rgba(74,222,128,${alpha})`;
    }

    if (
      this.mode === "stardust"
    ) {
      color =
        `rgba(250,204,21,${alpha})`;
    }

    if (
      this.mode === "plasma"
    ) {
      color =
        `rgba(251,113,133,${alpha})`;
    }

    if (
      this.mode === "quantum"
    ) {
      color =
        `hsla(${p.hue},90%,70%,${alpha})`;
    }

    if (
      this.mode === "hologram"
    ) {
      color =
        `rgba(103,232,249,${alpha})`;
    }

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      color;

    ctx.fill();

    if (
      this.glow > 55 &&
      p.size > 1.4
    ) {
      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size * 3,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        color.replace(
          `${alpha}`,
          `${alpha * 0.08}`
        );

      ctx.fill();
    }
  }

  drawConnections() {
    if (
      state.performance === "battery"
    ) {
      return;
    }

    const ctx =
      this.ctx;

    const maxDistance =
      this.distance;

    const particles =
      this.particles;

    for (
      let i = 0;
      i < particles.length;
      i++
    ) {
      const a =
        particles[i];

      for (
        let j = i + 1;
        j < particles.length;
        j++
      ) {
        const b =
          particles[j];

        const dx =
          a.x - b.x;

        const dy =
          a.y - b.y;

        const dist =
          Math.hypot(
            dx,
            dy
          );

        if (
          dist < maxDistance
        ) {
          const alpha =
            (
              1 -
              dist /
              maxDistance
            ) *
            0.14 *
            (this.intensity / 70);

          ctx.beginPath();

          ctx.moveTo(
            a.x,
            a.y
          );

          ctx.lineTo(
            b.x,
            b.y
          );

          ctx.strokeStyle =
            `rgba(34,211,238,${alpha})`;

          ctx.lineWidth =
            0.6;

          ctx.stroke();
        }
      }
    }
  }

  drawMouseGlow() {
    if (
      !this.mouse.active ||
      !this.effects
    ) {
      return;
    }

    const radius =
      170 *
      (this.glow / 70);

    const gradient =
      this.ctx.createRadialGradient(
        this.mouse.x,
        this.mouse.y,
        0,
        this.mouse.x,
        this.mouse.y,
        radius
      );

    gradient.addColorStop(
      0,
      "rgba(34,211,238,0.13)"
    );

    gradient.addColorStop(
      0.4,
      "rgba(59,130,246,0.045)"
    );

    gradient.addColorStop(
      1,
      "rgba(0,0,0,0)"
    );

    this.ctx.fillStyle =
      gradient;

    this.ctx.fillRect(
      this.mouse.x - radius,
      this.mouse.y - radius,
      radius * 2,
      radius * 2
    );
  }

  drawBursts() {
    const ctx =
      this.ctx;

    for (
      let i =
        this.bursts.length - 1;
      i >= 0;
      i--
    ) {
      const burst =
        this.bursts[i];

      burst.radius +=
        5;

      burst.alpha *=
        0.94;

      ctx.beginPath();

      ctx.arc(
        burst.x,
        burst.y,
        burst.radius,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle =
        `rgba(34,211,238,${burst.alpha})`;

      ctx.lineWidth =
        1.5;

      ctx.stroke();

      for (
        const particle of
        burst.particles
      ) {
        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;

        particle.vx *=
          0.97;

        particle.vy *=
          0.97;

        particle.life *=
          0.94;

        if (
          particle.life > 0.04
        ) {
          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            `rgba(34,211,238,${particle.life})`;

          ctx.fill();
        }
      }

      if (
        burst.alpha < 0.02
      ) {
        this.bursts.splice(
          i,
          1
        );
      }
    }
  }

  updateFPS(now) {
    this.frameCount++;

    if (
      now -
      this.fpsTime >
      1000
    ) {
      this.fps =
        this.frameCount;

      this.frameCount = 0;

      this.fpsTime =
        now;

      const fpsElement =
        $("#novaFPS");

      if (fpsElement) {
        fpsElement.textContent =
          `${this.fps} FPS`;
      }
    }
  }

  animate(now = performance.now()) {
    if (!this.canvas) {
      return;
    }

    if (!this.running) {
      return;
    }

    const delta =
      Math.min(
        50,
        now -
        this.lastFrame
      );

    this.lastFrame =
      now;

    this.time +=
      delta;

    this.updateFPS(now);

    this.drawBackground();

    for (
      let i = 0;
      i < this.particles.length;
      i++
    ) {
      const particle =
        this.particles[i];

      this.updateParticle(
        particle,
        i
      );

      this.drawParticle(
        particle
      );
    }

    this.drawConnections();

    this.drawMouseGlow();

    this.drawBursts();

    requestAnimationFrame(
      this.animate.bind(this)
    );
  }

  setMode(mode) {
    this.mode =
      mode;
  }

  setMotion(enabled) {
    this.motion =
      enabled;
  }

  setEffects(enabled) {
    this.effects =
      enabled;
  }

  setPerformance(mode) {
    this.performance =
      mode;

    this.createParticles();
  }

  setParticleCount(value) {
    state.particleCount =
      Number(value);

    this.createParticles();
  }

  setSpeed(value) {
    this.speed =
      Number(value);
  }

  setIntensity(value) {
    this.intensity =
      Number(value);
  }

  setDistance(value) {
    this.distance =
      Number(value);
  }

  setGlow(value) {
    this.glow =
      Number(value);
  }

  refresh() {
    this.createParticles();
  }
}


/* =========================================================
   INICIAR NOVA
   ========================================================= */

function startNova() {
  if (!window.NOVA) {
    window.NOVA =
      new NovaFlow();
  }

  applyNovaMode(
    state.novaMode
  );

  if (window.NOVA) {
    window.NOVA.setMotion(
      state.motion
    );

    window.NOVA.setEffects(
      state.effects
    );

    window.NOVA.setPerformance(
      state.performance
    );

    window.NOVA.setSpeed(
      state.speed
    );

    window.NOVA.setIntensity(
      state.intensity
    );

    window.NOVA.setDistance(
      state.connectionDistance
    );

    window.NOVA.setGlow(
      state.glow
    );
  }
}


/* =========================================================
   RENDERIZAR HERRAMIENTAS
   ========================================================= */

let currentCategory = "Todo";

function renderTools() {
  const container =
    $("#toolsGrid");

  if (!container) {
    return;
  }

  const search =
    (
      $("#globalSearch")?.value ||
      ""
    )
      .trim()
      .toLowerCase();

  const filtered =
    TOOLS.filter(tool => {

      const categoryMatch =
        currentCategory === "Todo" ||
        tool.category ===
          currentCategory;

      const searchMatch =
        !search ||
        tool.name
          .toLowerCase()
          .includes(search) ||
        tool.description
          .toLowerCase()
          .includes(search) ||
        tool.category
          .toLowerCase()
          .includes(search);

      return (
        categoryMatch &&
        searchMatch
      );
    });

  container.innerHTML =
    filtered.map(tool => `
      <article
        class="tool-card"
        data-tool="${tool.id}"
      >
        <button
          class="favorite-button ${
            isFavorite(tool.id)
              ? "is-favorite"
              : ""
          }"
          data-favorite="${tool.id}"
          type="button"
          aria-label="Favorito"
        >
          ${
            isFavorite(tool.id)
              ? "★"
              : "☆"
          }
        </button>

        <div class="tool-card-icon">
          ${tool.icon}
        </div>

        <span class="tool-card-category">
          ${escapeHTML(tool.category)}
        </span>

        <h3>
          ${escapeHTML(tool.name)}
        </h3>

        <p>
          ${escapeHTML(tool.description)}
        </p>

        <button
          class="tool-open-button"
          data-open="${tool.id}"
          type="button"
        >
          Abrir herramienta →
        </button>
      </article>
    `).join("");

  const count =
    $("#toolCount");

  if (count) {
    count.textContent =
      `${filtered.length} herramientas`;
  }

  $$("[data-open]").forEach(button => {
    button.addEventListener(
      "click",
      () => {
        openTool(
          button.dataset.open
        );
      }
    );
  });

  $$("[data-favorite]").forEach(button => {
    button.addEventListener(
      "click",
      event => {
        event.stopPropagation();

        toggleFavorite(
          button.dataset.favorite
        );
      }
    );
  });
}


/* =========================================================
   CATEGORÍAS
   ========================================================= */

function setupCategories() {
  $$(".category-button").forEach(button => {
    button.addEventListener(
      "click",
      () => {
        $$(".category-button")
          .forEach(item =>
            item.classList.remove(
              "active"
            )
          );

        button.classList.add(
          "active"
        );

        currentCategory =
          button.dataset.category ||
          "Todo";

        renderTools();
      }
    );
  });
}


/* =========================================================
   BÚSQUEDA
   ========================================================= */

function setupSearch() {
  const input =
    $("#globalSearch");

  if (!input) {
    return;
  }

  input.addEventListener(
    "input",
    () => {
      renderTools();
    }
  );

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() ===
          "k"
      ) {
        event.preventDefault();

        input.focus();
        input.select();
      }
    }
  );
}


/* =========================================================
   MODAL
   ========================================================= */

const modal =
  $("#modal");

const modalTitle =
  $("#modalTitle");

const modalIcon =
  $("#modalIcon");

const modalBody =
  $("#modalBody");

function openModal(
  title,
  icon,
  content
) {
  if (!modal) {
    return;
  }

  if (modalTitle) {
    modalTitle.textContent =
      title;
  }

  if (modalIcon) {
    modalIcon.textContent =
      icon;
  }

  if (modalBody) {
    modalBody.innerHTML =
      content;
  }

  modal.classList.add(
    "open"
  );

  document.body.style.overflow =
    "hidden";
}

function closeModal() {
  if (!modal) {
    return;
  }

  modal.classList.remove(
    "open"
  );

  document.body.style.overflow =
    "";
}

function setupModal() {
  $$("[data-close-modal]").forEach(
    button => {
      button.addEventListener(
        "click",
        closeModal
      );
    }
  );

  if (modal) {
    modal.addEventListener(
      "click",
      event => {
        if (
          event.target ===
          modal
        ) {
          closeModal();
        }
      }
    );
  }

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Escape"
      ) {
        closeModal();
      }
    }
  );
}


/* =========================================================
   ABRIR HERRAMIENTA
   ========================================================= */

function openTool(toolId) {
  addRecent(toolId);

  const tool =
    TOOLS.find(
      item =>
        item.id === toolId
    );

  if (!tool) {
    return;
  }

  const renderers = {
    calculator: renderCalculator,
    percentage: renderPercentage,
    discount: renderDiscount,
    rule3: renderRule3,

    length: renderLength,
    weight: renderWeight,
    volume: renderVolume,
    temperature: renderTemperature,
    timeconvert: renderTimeConvert,
    currency: renderCurrency,

    datediff: renderDateDiff,
    age: renderAge,
    timer: renderTimer,
    stopwatch: renderStopwatch,
    clock: renderClock,

    text: renderText,
    dictionary: renderDictionary,

    notes: renderNotes,
    tasks: renderTasks,
    shopping: renderShoppingList,

    password: renderPassword,
    random: renderRandom,
    qr: renderQR,

    food: renderFood,
    buy: renderShoppingWeb
  };

  const renderer =
    renderers[toolId];

  if (renderer) {
    renderer();
  }
}


/* =========================================================
   CALCULADORA
   ========================================================= */

function safeCalculate(expression) {
  const clean =
    String(expression)
      .replaceAll(",", ".")
      .trim();

  if (!clean) {
    throw new Error(
      "Escribe una operación."
    );
  }

  if (
    !/^[0-9+\-*/%().\s]+$/.test(
      clean
    )
  ) {
    throw new Error(
      "La operación contiene caracteres no permitidos."
    );
  }

  const tokens =
    clean.match(
      /(\d+(?:\.\d+)?)|([+\-*/%()])/g
    );

  if (!tokens) {
    throw new Error(
      "Operación inválida."
    );
  }

  let position = 0;

  function parseExpression() {
    let value =
      parseTerm();

    while (
      tokens[position] === "+" ||
      tokens[position] === "-"
    ) {
      const operator =
        tokens[position++];

      const right =
        parseTerm();

      if (
        operator === "+"
      ) {
        value += right;
      } else {
        value -= right;
      }
    }

    return value;
  }

  function parseTerm() {
    let value =
      parseFactor();

    while (
      tokens[position] === "*" ||
      tokens[position] === "/" ||
      tokens[position] === "%"
    ) {
      const operator =
        tokens[position++];

      const right =
        parseFactor();

      if (
        operator === "*"
      ) {
        value *= right;
      }

      if (
        operator === "/"
      ) {
        if (right === 0) {
          throw new Error(
            "No se puede dividir entre cero."
          );
        }

        value /= right;
      }

      if (
        operator === "%"
      ) {
        value %= right;
      }
    }

    return value;
  }

  function parseFactor() {
    const token =
      tokens[position];

    if (
      token === "+"
    ) {
      position++;
      return parseFactor();
    }

    if (
      token === "-"
    ) {
      position++;
      return -parseFactor();
    }

    if (
      token === "("
    ) {
      position++;

      const value =
        parseExpression();

      if (
        tokens[position] !==
        ")"
      ) {
        throw new Error(
          "Faltan paréntesis."
        );
      }

      position++;

      return value;
    }

    if (
      /^\d/.test(
        token || ""
      )
    ) {
      position++;

      return Number(token);
    }

    throw new Error(
      "Operación inválida."
    );
  }

  const result =
    parseExpression();

  if (
    position !==
    tokens.length
  ) {
    throw new Error(
      "Operación inválida."
    );
  }

  if (
    !Number.isFinite(result)
  ) {
    throw new Error(
      "Resultado no válido."
    );
  }

  return result;
}

function renderCalculator() {
  openModal(
    "Calculadora",
    "🧮",
    `
      <form class="tool-form" id="calculatorForm">
        <label>
          Operación
          <input
            id="calcExpression"
            placeholder="Ejemplo: 25 * 4 + 10"
            autocomplete="off"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Calcular
        </button>

        <div
          class="tool-result"
          id="calcResult"
        >
          Resultado: —
        </div>
      </form>
    `
  );

  $("#calculatorForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        try {
          const result =
            safeCalculate(
              $("#calcExpression")
                .value
            );

          $("#calcResult")
            .textContent =
            `Resultado: ${formatNumber(result)}`;
        } catch (error) {
          $("#calcResult")
            .textContent =
            error.message;
        }
      }
    );
}


/* =========================================================
   PORCENTAJE
   ========================================================= */

function renderPercentage() {
  openModal(
    "Porcentajes",
    "％",
    `
      <form class="tool-form" id="percentageForm">
        <label>
          Número
          <input
            id="percentageNumber"
            type="number"
            step="any"
          >
        </label>

        <label>
          Porcentaje
          <input
            id="percentageValue"
            type="number"
            step="any"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Calcular
        </button>

        <div
          class="tool-result"
          id="percentageResult"
        >
          Resultado: —
        </div>
      </form>
    `
  );

  $("#percentageForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const number =
          Number(
            $("#percentageNumber")
              .value
          );

        const percentage =
          Number(
            $("#percentageValue")
              .value
          );

        const result =
          number *
          percentage /
          100;

        $("#percentageResult")
          .textContent =
          `Resultado: ${formatNumber(result)}`;
      }
    );
}


/* =========================================================
   DESCUENTO
   ========================================================= */

function renderDiscount() {
  openModal(
    "Descuentos",
    "🏷️",
    `
      <form class="tool-form" id="discountForm">
        <label>
          Precio
          <input
            id="discountPrice"
            type="number"
            step="any"
          >
        </label>

        <label>
          Descuento (%)
          <input
            id="discountPercent"
            type="number"
            step="any"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Calcular
        </button>

        <div
          class="tool-result"
          id="discountResult"
        >
          Precio final: —
        </div>
      </form>
    `
  );

  $("#discountForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const price =
          Number(
            $("#discountPrice")
              .value
          );

        const percent =
          Number(
            $("#discountPercent")
              .value
          );

        const saving =
          price *
          percent /
          100;

        const finalPrice =
          price -
          saving;

        $("#discountResult")
          .innerHTML = `
            <strong>
              Precio final:
            </strong>
            ${formatNumber(finalPrice)}
            <br>
            Ahorras:
            ${formatNumber(saving)}
          `;
      }
    );
}


/* =========================================================
   REGLA DE TRES
   ========================================================= */

function renderRule3() {
  openModal(
    "Regla de tres",
    "📐",
    `
      <form class="tool-form" id="rule3Form">
        <label>
          A
          <input
            id="ruleA"
            type="number"
            step="any"
          >
        </label>

        <label>
          B
          <input
            id="ruleB"
            type="number"
            step="any"
          >
        </label>

        <label>
          C
          <input
            id="ruleC"
            type="number"
            step="any"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Resolver
        </button>

        <div
          class="tool-result"
          id="ruleResult"
        >
          X = —
        </div>
      </form>
    `
  );

  $("#rule3Form")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const a =
          Number($("#ruleA").value);

        const b =
          Number($("#ruleB").value);

        const c =
          Number($("#ruleC").value);

        if (a === 0) {
          $("#ruleResult")
            .textContent =
            "A no puede ser 0.";
          return;
        }

        const x =
          b * c / a;

        $("#ruleResult")
          .textContent =
          `X = ${formatNumber(x)}`;
      }
    );
}


/* =========================================================
   CONVERSIONES
   ========================================================= */

const CONVERSIONS = {

  length: {
    title: "Longitud",
    icon: "📏",
    units: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      ft: 0.3048,
      in: 0.0254
    }
  },

  weight: {
    title: "Peso",
    icon: "⚖️",
    units: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.45359237,
      oz: 0.0283495231
    }
  },

  volume: {
    title: "Volumen",
    icon: "🧪",
    units: {
      l: 1,
      ml: 0.001,
      m3: 1000,
      gal: 3.785411784,
      cup: 0.2365882365
    }
  },

  timeconvert: {
    title: "Tiempo",
    icon: "⏱️",
    units: {
      s: 1,
      min: 60,
      h: 3600,
      day: 86400
    }
  }
};

function renderConversion(
  type
) {
  const config =
    CONVERSIONS[type];

  const unitOptions =
    Object.keys(
      config.units
    )
      .map(
        unit =>
          `<option value="${unit}">
            ${unit}
          </option>`
      )
      .join("");

  openModal(
    config.title,
    config.icon,
    `
      <form
        class="tool-form"
        id="conversionForm"
      >
        <label>
          Cantidad
          <input
            id="conversionValue"
            type="number"
            step="any"
          >
        </label>

        <label>
          De
          <select id="conversionFrom">
            ${unitOptions}
          </select>
        </label>

        <label>
          A
          <select id="conversionTo">
            ${unitOptions}
          </select>
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Convertir
        </button>

        <div
          class="tool-result"
          id="conversionResult"
        >
          Resultado: —
        </div>
      </form>
    `
  );

  $("#conversionForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const value =
          Number(
            $("#conversionValue")
              .value
          );

        const from =
          $("#conversionFrom")
            .value;

        const to =
          $("#conversionTo")
            .value;

        const base =
          value *
          config.units[from];

        const result =
          base /
          config.units[to];

        $("#conversionResult")
          .textContent =
          `Resultado: ${formatNumber(result)} ${to}`;
      }
    );
}


/* =========================================================
   TEMPERATURA
   ========================================================= */

function renderTemperature() {
  openModal(
    "Temperatura",
    "🌡️",
    `
      <form
        class="tool-form"
        id="temperatureForm"
      >
        <label>
          Temperatura
          <input
            id="tempValue"
            type="number"
            step="any"
          >
        </label>

        <label>
          De
          <select id="tempFrom">
            <option value="c">Celsius</option>
            <option value="f">Fahrenheit</option>
            <option value="k">Kelvin</option>
          </select>
        </label>

        <label>
          A
          <select id="tempTo">
            <option value="c">Celsius</option>
            <option value="f">Fahrenheit</option>
            <option value="k">Kelvin</option>
          </select>
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Convertir
        </button>

        <div
          class="tool-result"
          id="tempResult"
        >
          Resultado: —
        </div>
      </form>
    `
  );

  $("#temperatureForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const value =
          Number(
            $("#tempValue").value
          );

        const from =
          $("#tempFrom").value;

        const to =
          $("#tempTo").value;

        let celsius;

        if (from === "c") {
          celsius = value;
        }

        if (from === "f") {
          celsius =
            (value - 32) *
            5 /
            9;
        }

        if (from === "k") {
          celsius =
            value -
            273.15;
        }

        let result;

        if (to === "c") {
          result =
            celsius;
        }

        if (to === "f") {
          result =
            celsius *
            9 /
            5 +
            32;
        }

        if (to === "k") {
          result =
            celsius +
            273.15;
        }

        $("#tempResult")
          .textContent =
          `Resultado: ${formatNumber(result)}°`;
      }
    );
}


/* =========================================================
   MONEDAS
   ========================================================= */

async function getCurrencyRate(
  from,
  to
) {
  const response =
    await fetch(
      `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`,
      {
        cache: "no-store"
      }
    );

  if (!response.ok) {
    throw new Error(
      "No se pudo consultar el tipo de cambio."
    );
  }

  const data =
    await response.json();

  if (
    data.result !==
    "success" ||
    !data.rates ||
    !data.rates[to]
  ) {
    throw new Error(
      "Moneda no disponible."
    );
  }

  return data.rates[to];
}

function renderCurrency() {
  openModal(
    "Conversor de monedas",
    "💱",
    `
      <form
        class="tool-form"
        id="currencyForm"
      >
        <label>
          Cantidad
          <input
            id="currencyAmount"
            type="number"
            step="any"
            value="1"
          >
        </label>

        <label>
          De
          <select id="currencyFrom">
            <option value="PEN">PEN — Sol</option>
            <option value="USD">USD — Dólar</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — Libra</option>
            <option value="JPY">JPY — Yen</option>
            <option value="BRL">BRL — Real</option>
          </select>
        </label>

        <label>
          A
          <select id="currencyTo">
            <option value="USD">USD — Dólar</option>
            <option value="PEN">PEN — Sol</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — Libra</option>
            <option value="JPY">JPY — Yen</option>
            <option value="BRL">BRL — Real</option>
          </select>
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Consultar
        </button>

        <div
          class="tool-result"
          id="currencyResult"
        >
          Resultado: —
        </div>
      </form>
    `
  );

  $("#currencyForm")
    ?.addEventListener(
      "submit",
      async event => {
        event.preventDefault();

        const amount =
          Number(
            $("#currencyAmount")
              .value
          );

        const from =
          $("#currencyFrom")
            .value;

        const to =
          $("#currencyTo")
            .value;

        const result =
          $("#currencyResult");

        result.textContent =
          "Consultando...";

        try {
          const rate =
            await getCurrencyRate(
              from,
              to
            );

          const converted =
            amount *
            rate;

          state.lastCurrency = {
            amount,
            from,
            to,
            rate,
            converted,
            date:
              new Date().toISOString()
          };

          saveState();

          result.innerHTML = `
            <strong>
              ${formatNumber(amount)}
              ${from}
            </strong>
            =
            <strong>
              ${formatNumber(converted)}
              ${to}
            </strong>
            <br>
            Tasa:
            ${formatNumber(rate)}
          `;
        } catch (error) {
          result.textContent =
            error.message;
        }
      }
    );
}


/* =========================================================
   FECHAS
   ========================================================= */

function renderDateDiff() {
  openModal(
    "Diferencia de fechas",
    "📅",
    `
      <form
        class="tool-form"
        id="dateDiffForm"
      >
        <label>
          Fecha inicial
          <input
            id="dateStart"
            type="date"
          >
        </label>

        <label>
          Fecha final
          <input
            id="dateEnd"
            type="date"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Calcular
        </button>

        <div
          class="tool-result"
          id="dateDiffResult"
        >
          Diferencia: —
        </div>
      </form>
    `
  );

  $("#dateDiffForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const start =
          new Date(
            `${$("#dateStart").value}T00:00:00`
          );

        const end =
          new Date(
            `${$("#dateEnd").value}T00:00:00`
          );

        const difference =
          Math.abs(
            end -
            start
          );

        const days =
          Math.round(
            difference /
            86400000
          );

        $("#dateDiffResult")
          .textContent =
          `Diferencia: ${days} días`;
      }
    );
}


/* =========================================================
   EDAD
   ========================================================= */

function renderAge() {
  openModal(
    "Calculadora de edad",
    "🎂",
    `
      <form
        class="tool-form"
        id="ageForm"
      >
        <label>
          Fecha de nacimiento
          <input
            id="birthDate"
            type="date"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Calcular edad
        </button>

        <div
          class="tool-result"
          id="ageResult"
        >
          Edad: —
        </div>
      </form>
    `
  );

  $("#ageForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const birth =
          new Date(
            `${$("#birthDate").value}T00:00:00`
          );

        const now =
          new Date();

        let age =
          now.getFullYear() -
          birth.getFullYear();

        const month =
          now.getMonth() -
          birth.getMonth();

        if (
          month < 0 ||
          (
            month === 0 &&
            now.getDate() <
              birth.getDate()
          )
        ) {
          age--;
        }

        $("#ageResult")
          .textContent =
          `Edad: ${age} años`;
      }
    );
}


/* =========================================================
   TEMPORIZADOR
   ========================================================= */

let timerInterval = null;
let timerEnd = 0;

function renderTimer() {
  openModal(
    "Temporizador",
    "⏳",
    `
      <div class="tool-form">
        <label>
          Minutos
          <input
            id="timerMinutes"
            type="number"
            min="0"
            value="1"
          >
        </label>

        <label>
          Segundos
          <input
            id="timerSeconds"
            type="number"
            min="0"
            max="59"
            value="0"
          >
        </label>

        <div
          class="tool-result"
          id="timerDisplay"
        >
          01:00
        </div>

        <div class="tool-actions">
          <button
            class="primary-button"
            id="timerStart"
            type="button"
          >
            Iniciar
          </button>

          <button
            class="secondary-button"
            id="timerStop"
            type="button"
          >
            Detener
          </button>

          <button
            class="secondary-button"
            id="timerReset"
            type="button"
          >
            Reiniciar
          </button>
        </div>
      </div>
    `
  );

  const display =
    $("#timerDisplay");

  function updateTimerDisplay() {
    const remaining =
      Math.max(
        0,
        timerEnd -
        Date.now()
      );

    const totalSeconds =
      Math.ceil(
        remaining /
        1000
      );

    const minutes =
      Math.floor(
        totalSeconds /
        60
      );

    const seconds =
      totalSeconds %
      60;

    display.textContent =
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (
      remaining <= 0
    ) {
      clearInterval(
        timerInterval
      );

      timerInterval =
        null;

      showToast(
        "Temporizador terminado",
        "⏰"
      );
    }
  }

  $("#timerStart")
    ?.addEventListener(
      "click",
      () => {
        const minutes =
          Number(
            $("#timerMinutes")
              .value
          );

        const seconds =
          Number(
            $("#timerSeconds")
              .value
          );

        timerEnd =
          Date.now() +
          (
            minutes * 60 +
            seconds
          ) *
            1000;

        clearInterval(
          timerInterval
        );

        timerInterval =
          setInterval(
            updateTimerDisplay,
            200
          );

        updateTimerDisplay();
      }
    );

  $("#timerStop")
    ?.addEventListener(
      "click",
      () => {
        clearInterval(
          timerInterval
        );

        timerInterval =
          null;
      }
    );

  $("#timerReset")
    ?.addEventListener(
      "click",
      () => {
        clearInterval(
          timerInterval
        );

        timerInterval =
          null;

        display.textContent =
          "00:00";
      }
    );
}


/* =========================================================
   CRONÓMETRO
   ========================================================= */

let stopwatchInterval = null;
let stopwatchStart = 0;
let stopwatchElapsed = 0;

function renderStopwatch() {
  openModal(
    "Cronómetro",
    "⏱️",
    `
      <div class="tool-form">
        <div
          class="tool-result"
          id="stopwatchDisplay"
        >
          00:00:00.000
        </div>

        <div class="tool-actions">
          <button
            class="primary-button"
            id="stopwatchStart"
            type="button"
          >
            Iniciar
          </button>

          <button
            class="secondary-button"
            id="stopwatchStop"
            type="button"
          >
            Detener
          </button>

          <button
            class="secondary-button"
            id="stopwatchReset"
            type="button"
          >
            Reiniciar
          </button>
        </div>
      </div>
    `
  );

  const display =
    $("#stopwatchDisplay");

  function update() {
    const elapsed =
      stopwatchElapsed +
      (
        stopwatchStart
          ? Date.now() -
            stopwatchStart
          : 0
      );

    const milliseconds =
      elapsed % 1000;

    const totalSeconds =
      Math.floor(
        elapsed /
        1000
      );

    const seconds =
      totalSeconds %
      60;

    const minutes =
      Math.floor(
        totalSeconds /
        60
      ) % 60;

    const hours =
      Math.floor(
        totalSeconds /
        3600
      );

    display.textContent =
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
  }

  $("#stopwatchStart")
    ?.addEventListener(
      "click",
      () => {
        if (
          stopwatchStart
        ) {
          return;
        }

        stopwatchStart =
          Date.now();

        stopwatchInterval =
          setInterval(
            update,
            30
          );
      }
    );

  $("#stopwatchStop")
    ?.addEventListener(
      "click",
      () => {
        if (
          !stopwatchStart
        ) {
          return;
        }

        stopwatchElapsed +=
          Date.now() -
          stopwatchStart;

        stopwatchStart =
          0;

        clearInterval(
          stopwatchInterval
        );

        stopwatchInterval =
          null;

        update();
      }
    );

  $("#stopwatchReset")
    ?.addEventListener(
      "click",
      () => {
        stopwatchStart = 0;
        stopwatchElapsed = 0;

        clearInterval(
          stopwatchInterval
        );

        stopwatchInterval =
          null;

        update();
      }
    );
}


/* =========================================================
   RELOJ
   ========================================================= */

function renderClock() {
  openModal(
    "Reloj",
    "🕐",
    `
      <div class="tool-form">
        <div
          class="tool-result"
          id="clockDisplay"
          style="font-size:2rem;text-align:center"
        >
          —
        </div>

        <div
          class="tool-result"
          id="clockDate"
        >
          —
        </div>
      </div>
    `
  );

  function update() {
    const now =
      new Date();

    $("#clockDisplay")
      .textContent =
      new Intl.DateTimeFormat(
        "es-PE",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }
      ).format(now);

    $("#clockDate")
      .textContent =
      new Intl.DateTimeFormat(
        "es-PE",
        {
          dateStyle: "full"
        }
      ).format(now);
  }

  update();

  const interval =
    setInterval(
      () => {
        if (
          !modal?.classList.contains(
            "open"
          )
        ) {
          clearInterval(
            interval
          );

          return;
        }

        update();
      },
      1000
    );
}


/* =========================================================
   TEXTO
   ========================================================= */

function renderText() {
  openModal(
    "Herramientas de texto",
    "🔤",
    `
      <div class="tool-form">
        <label>
          Escribe tu texto
          <textarea
            id="textInput"
            placeholder="Escribe aquí..."
          ></textarea>
        </label>

        <div class="tool-actions">
          <button
            class="secondary-button"
            id="textUpper"
            type="button"
          >
            MAYÚSCULAS
          </button>

          <button
            class="secondary-button"
            id="textLower"
            type="button"
          >
            minúsculas
          </button>

          <button
            class="secondary-button"
            id="textCopy"
            type="button"
          >
            Copiar
          </button>
        </div>

        <div
          class="tool-result"
          id="textStats"
        >
          Caracteres: 0 · Palabras: 0
        </div>
      </div>
    `
  );

  const input =
    $("#textInput");

  const stats =
    $("#textStats");

  function update() {
    const text =
      input.value;

    const words =
      text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    stats.textContent =
      `Caracteres: ${text.length} · Palabras: ${words}`;
  }

  input.addEventListener(
    "input",
    update
  );

  $("#textUpper")
    ?.addEventListener(
      "click",
      () => {
        input.value =
          input.value.toUpperCase();

        update();
      }
    );

  $("#textLower")
    ?.addEventListener(
      "click",
      () => {
        input.value =
          input.value.toLowerCase();

        update();
      }
    );

  $("#textCopy")
    ?.addEventListener(
      "click",
      async () => {
        try {
          await navigator.clipboard.writeText(
            input.value
          );

          showToast(
            "Texto copiado",
            "📋"
          );
        } catch {
          showToast(
            "No se pudo copiar",
            "⚠️"
          );
        }
      }
    );
}


/* =========================================================
   DICCIONARIO — MEJORADO
   ========================================================= */

async function dictionaryLookup(word) {
  const cleanWord =
    word
      .trim()
      .toLowerCase();

  if (!cleanWord) {
    throw new Error(
      "Escribe una palabra."
    );
  }

  const response =
    await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/es/${encodeURIComponent(cleanWord)}`,
      {
        cache: "no-store"
      }
    );

  let data = null;

  try {
    data =
      await response.json();
  } catch {
    throw new Error(
      "La respuesta del diccionario no es válida."
    );
  }

  if (!response.ok) {
    if (
      data &&
      data.title
    ) {
      throw new Error(
        data.title
      );
    }

    throw new Error(
      "No encontré esa palabra en el diccionario."
    );
  }

  if (
    !Array.isArray(data) ||
    !data.length
  ) {
    throw new Error(
      "No se encontraron resultados."
    );
  }

  return data[0];
}

function renderDictionary() {
  openModal(
    "Diccionario",
    "📖",
    `
      <form
        class="tool-form"
        id="dictionaryForm"
      >
        <label>
          Palabra
          <input
            id="dictionaryWord"
            placeholder="Ejemplo: libertad"
            autocomplete="off"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Buscar definición
        </button>

        <div
          class="tool-result"
          id="dictionaryResult"
        >
          Escribe una palabra para buscarla.
        </div>
      </form>
    `
  );

  $("#dictionaryForm")
    ?.addEventListener(
      "submit",
      async event => {
        event.preventDefault();

        const word =
          $("#dictionaryWord")
            .value
            .trim();

        const result =
          $("#dictionaryResult");

        if (!word) {
          result.textContent =
            "Escribe una palabra.";
          return;
        }

        result.textContent =
          "Buscando...";

        try {
          const data =
            await dictionaryLookup(
              word
            );

          const meanings =
            Array.isArray(
              data.meanings
            )
              ? data.meanings
              : [];

          if (!meanings.length) {
            result.textContent =
              "La palabra no tiene definiciones disponibles.";
            return;
          }

          let html =
            `<strong>${escapeHTML(data.word || word)}</strong>`;

          if (
            data.phonetic
          ) {
            html +=
              `<br><small>${escapeHTML(data.phonetic)}</small>`;
          }

          meanings
            .slice(0, 6)
            .forEach(
              meaning => {
                html += `
                  <hr
                    style="
                      border:0;
                      border-top:1px solid var(--line);
                      margin:14px 0
                    "
                  >

                  <strong>
                    ${escapeHTML(
                      meaning.partOfSpeech ||
                      "Definición"
                    )}
                  </strong>
                `;

                const definitions =
                  Array.isArray(
                    meaning.definitions
                  )
                    ? meaning.definitions
                    : [];

                definitions
                  .slice(0, 4)
                  .forEach(
                    definition => {
                      html += `
                        <p
                          style="
                            margin-top:8px;
                            color:var(--text-soft)
                          "
                        >
                          • ${escapeHTML(
                            definition.definition
                          )}
                        </p>
                      `;

                      if (
                        definition.example
                      ) {
                        html += `
                          <small
                            style="
                              display:block;
                              margin-top:4px;
                              color:var(--text-muted)
                            "
                          >
                            Ejemplo:
                            ${escapeHTML(
                              definition.example
                            )}
                          </small>
                        `;
                      }
                    }
                  );

                const synonyms =
                  Array.isArray(
                    meaning.synonyms
                  )
                    ? meaning.synonyms
                    : [];

                if (
                  synonyms.length
                ) {
                  html += `
                    <small
                      style="
                        display:block;
                        margin-top:9px;
                        color:var(--accent)
                      "
                    >
                      Sinónimos:
                      ${synonyms
                        .slice(0, 8)
                        .map(
                          escapeHTML
                        )
                        .join(", ")}
                    </small>
                  `;
                }
              }
            );

          result.innerHTML =
            html;
        } catch (error) {
          result.innerHTML = `
            <strong>
              No se encontró la palabra.
            </strong>

            <br><br>

            ${escapeHTML(
              error.message
            )}

            <br><br>

            <small>
              Comprueba la escritura e inténtalo nuevamente.
            </small>
          `;
        }
      }
    );
}


/* =========================================================
   NOTAS
   ========================================================= */

function renderNotes() {
  openModal(
    "Notas",
    "📝",
    `
      <div class="tool-form">
        <label>
          Tus notas
          <textarea
            id="notesInput"
            placeholder="Escribe tus notas..."
          ></textarea>
        </label>

        <button
          class="primary-button"
          id="saveNotes"
          type="button"
        >
          Guardar notas
        </button>
      </div>
    `
  );

  $("#notesInput")
    .value =
    state.notes || "";

  $("#saveNotes")
    ?.addEventListener(
      "click",
      () => {
        state.notes =
          $("#notesInput")
            .value;

        saveState();

        showToast(
          "Notas guardadas",
          "📝"
        );
      }
    );
}


/* =========================================================
   TAREAS
   ========================================================= */

function renderTasks() {
  openModal(
    "Tareas",
    "✅",
    `
      <div class="tool-form">
        <label>
          Nueva tarea
          <input
            id="taskInput"
            placeholder="Ejemplo: terminar proyecto"
          >
        </label>

        <button
          class="primary-button"
          id="addTask"
          type="button"
        >
          Añadir tarea
        </button>

        <div
          class="tool-result"
          id="taskList"
        ></div>
      </div>
    `
  );

  const render =
    () => {
      const list =
        $("#taskList");

      if (!state.tasks.length) {
        list.textContent =
          "No tienes tareas todavía.";
        return;
      }

      list.innerHTML =
        state.tasks
          .map(
            (task, index) => `
              <div
                style="
                  display:flex;
                  align-items:center;
                  gap:10px;
                  padding:9px 0;
                  border-bottom:1px solid var(--line)
                "
              >
                <input
                  type="checkbox"
                  data-task-check="${index}"
                  ${
                    task.done
                      ? "checked"
                      : ""
                  }
                >

                <span
                  style="
                    flex:1;
                    ${
                      task.done
                        ? "text-decoration:line-through;opacity:.5"
                        : ""
                    }
                  "
                >
                  ${escapeHTML(
                    task.text
                  )}
                </span>

                <button
                  class="small-button"
                  data-task-delete="${index}"
                  type="button"
                >
                  ×
                </button>
              </div>
            `
          )
          .join("");

      $$(
        "[data-task-check]"
      ).forEach(
        checkbox => {
          checkbox.addEventListener(
            "change",
            () => {
              const index =
                Number(
                  checkbox.dataset
                    .taskCheck
                );

              state.tasks[index]
                .done =
                checkbox.checked;

              saveState();

              render();
            }
          );
        }
      );

      $$(
        "[data-task-delete]"
      ).forEach(
        button => {
          button.addEventListener(
            "click",
            () => {
              const index =
                Number(
                  button.dataset
                    .taskDelete
                );

              state.tasks.splice(
                index,
                1
              );

              saveState();

              render();
            }
          );
        }
      );
    };

  $("#addTask")
    ?.addEventListener(
      "click",
      () => {
        const input =
          $("#taskInput");

        const text =
          input.value.trim();

        if (!text) {
          return;
        }

        state.tasks.push({
          text,
          done: false
        });

        input.value = "";

        saveState();

        render();
      }
    );

  render();
}


/* =========================================================
   LISTA DE COMPRAS
   ========================================================= */

function renderShoppingList() {
  openModal(
    "Lista de compras",
    "🛒",
    `
      <div class="tool-form">
        <label>
          Producto
          <input
            id="shoppingItem"
            placeholder="Ejemplo: arroz"
          >
        </label>

        <button
          class="primary-button"
          id="addShoppingItem"
          type="button"
        >
          Añadir
        </button>

        <div
          class="tool-result"
          id="shoppingItems"
        ></div>
      </div>
    `
  );

  function render() {
    const container =
      $("#shoppingItems");

    if (
      !state.shoppingList.length
    ) {
      container.textContent =
        "Tu lista está vacía.";
      return;
    }

    container.innerHTML =
      state.shoppingList
        .map(
          (item, index) => `
            <div
              style="
                display:flex;
                align-items:center;
                gap:9px;
                padding:8px 0;
              "
            >
              <span style="flex:1">
                ${escapeHTML(item)}
              </span>

              <button
                class="small-button"
                data-shopping-delete="${index}"
                type="button"
              >
                Eliminar
              </button>
            </div>
          `
        )
        .join("");

    $$(
      "[data-shopping-delete]"
    ).forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
            const index =
              Number(
                button.dataset
                  .shoppingDelete
              );

            state.shoppingList
              .splice(
                index,
                1
              );

            saveState();

            render();
          }
        );
      }
    );
  }

  $("#addShoppingItem")
    ?.addEventListener(
      "click",
      () => {
        const input =
          $("#shoppingItem");

        const item =
          input.value.trim();

        if (!item) {
          return;
        }

        state.shoppingList
          .push(item);

        input.value = "";

        saveState();

        render();
      }
    );

  render();
}


/* =========================================================
   GENERADOR DE CONTRASEÑAS
   ========================================================= */

function randomSecureNumber(max) {
  if (
    window.crypto &&
    crypto.getRandomValues
  ) {
    const array =
      new Uint32Array(1);

    crypto.getRandomValues(
      array
    );

    return (
      array[0] %
      max
    );
  }

  return Math.floor(
    Math.random() *
    max
  );
}

function renderPassword() {
  openModal(
    "Generador de contraseñas",
    "🔐",
    `
      <div class="tool-form">
        <label>
          Longitud
          <input
            id="passwordLength"
            type="number"
            min="6"
            max="64"
            value="16"
          >
        </label>

        <label>
          Caracteres
          <input
            id="passwordCharacters"
            value="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"
          >
        </label>

        <button
          class="primary-button"
          id="generatePassword"
          type="button"
        >
          Generar
        </button>

        <div
          class="tool-result"
          id="passwordResult"
          style="word-break:break-all"
        >
          —
        </div>

        <button
          class="secondary-button"
          id="copyPassword"
          type="button"
        >
          Copiar contraseña
        </button>
      </div>
    `
  );

  function generate() {
    const length =
      Math.max(
        6,
        Math.min(
          64,
          Number(
            $("#passwordLength")
              .value
          ) || 16
        )
      );

    const chars =
      $("#passwordCharacters")
        .value;

    if (!chars) {
      return;
    }

    let password = "";

    for (
      let i = 0;
      i < length;
      i++
    ) {
      password +=
        chars[
          randomSecureNumber(
            chars.length
          )
        ];
    }

    $("#passwordResult")
      .textContent =
      password;
  }

  $("#generatePassword")
    ?.addEventListener(
      "click",
      generate
    );

  $("#copyPassword")
    ?.addEventListener(
      "click",
      async () => {
        const value =
          $("#passwordResult")
            .textContent;

        if (
          !value ||
          value === "—"
        ) {
          return;
        }

        try {
          await navigator.clipboard
            .writeText(
              value
            );

          showToast(
            "Contraseña copiada",
            "🔐"
          );
        } catch {
          showToast(
            "No se pudo copiar",
            "⚠️"
          );
        }
      }
    );

  generate();
}


/* =========================================================
   ALEATORIO
   ========================================================= */

function renderRandom() {
  openModal(
    "Aleatorio",
    "🎲",
    `
      <div class="tool-form">
        <label>
          Mínimo
          <input
            id="randomMin"
            type="number"
            value="1"
          >
        </label>

        <label>
          Máximo
          <input
            id="randomMax"
            type="number"
            value="100"
          >
        </label>

        <button
          class="primary-button"
          id="generateRandom"
          type="button"
        >
          Generar número
        </button>

        <div
          class="tool-result"
          id="randomResult"
          style="font-size:2rem;text-align:center"
        >
          —
        </div>
      </div>
    `
  );

  $("#generateRandom")
    ?.addEventListener(
      "click",
      () => {
        let min =
          Number(
            $("#randomMin").value
          );

        let max =
          Number(
            $("#randomMax").value
          );

        if (min > max) {
          [min, max] =
            [max, min];
        }

        const result =
          Math.floor(
            Math.random() *
              (
                max -
                min +
                1
              )
          ) +
          min;

        $("#randomResult")
          .textContent =
          result;
      }
    );
}


/* =========================================================
   QR
   ========================================================= */

function renderQR() {
  openModal(
    "Código QR",
    "▦",
    `
      <form
        class="tool-form"
        id="qrForm"
      >
        <label>
          Texto o enlace
          <input
            id="qrText"
            placeholder="https://ejemplo.com"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Generar QR
        </button>

        <div
          class="tool-result"
          id="qrResult"
          style="text-align:center"
        >
          —
        </div>
      </form>
    `
  );

  $("#qrForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const text =
          $("#qrText")
            .value
            .trim();

        if (!text) {
          return;
        }

        const url =
          `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;

        $("#qrResult")
          .innerHTML = `
            <img
              src="${url}"
              alt="Código QR"
              style="
                width:min(300px,100%);
                border-radius:12px;
                background:#fff;
                padding:10px
              "
            >

            <br><br>

            <a
              class="secondary-button"
              href="${url}"
              target="_blank"
              rel="noopener"
            >
              Abrir QR
            </a>
          `;
      }
    );
}


/* =========================================================
   COMIDAS
   ========================================================= */

function renderFood() {
  openModal(
    "Comidas",
    "🍔",
    `
      <form
        class="tool-form"
        id="foodForm"
      >
        <label>
          ¿Qué comida buscas?
          <input
            id="foodQuery"
            placeholder="Ejemplo: pizza, hamburguesa, ceviche"
          >
        </label>

        <label>
          Lugar
          <input
            id="foodLocation"
            placeholder="Ejemplo: Lima"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Buscar comida
        </button>

        <div
          class="external-link-grid"
          id="foodLinks"
        ></div>
      </form>
    `
  );

  $("#foodForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const query =
          $("#foodQuery")
            .value
            .trim();

        const location =
          $("#foodLocation")
            .value
            .trim();

        if (!query) {
          showToast(
            "Escribe qué comida buscas.",
            "🍔"
          );

          return;
        }

        const search =
          `${query} ${location}`.trim();

        const encoded =
          encodeURIComponent(
            search
          );

        const mapsUrl =
          `https://www.google.com/maps/search/restaurantes+${encoded}`;

        const googleUrl =
          `https://www.google.com/search?q=${encodeURIComponent(
            `${search} restaurantes`
          )}`;

        const links =
          $("#foodLinks");

        links.innerHTML = `
          <a
            class="external-link"
            href="${mapsUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>📍</span>
            <div>
              <strong>Google Maps</strong>
              <small>
                Buscar restaurantes cercanos
              </small>
            </div>
          </a>

          <a
            class="external-link"
            href="${googleUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🔎</span>
            <div>
              <strong>Google</strong>
              <small>
                Buscar opciones de comida
              </small>
            </div>
          </a>
        `;
      }
    );
}


/* =========================================================
   COMPRAS
   ========================================================= */

function renderShoppingWeb() {
  openModal(
    "Compras",
    "🛍️",
    `
      <form
        class="tool-form"
        id="buyForm"
      >
        <label>
          ¿Qué producto buscas?
          <input
            id="buyQuery"
            placeholder="Ejemplo: audífonos, mochila, teclado"
          >
        </label>

        <button
          class="primary-button"
          type="submit"
        >
          Buscar producto
        </button>

        <div
          class="external-link-grid"
          id="buyLinks"
        ></div>

        <div
          class="tool-result"
        >
          ÚtilHub no realiza la compra automáticamente.
          Tú decides dónde comprar y realizas el pedido directamente.
        </div>
      </form>
    `
  );

  $("#buyForm")
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const query =
          $("#buyQuery")
            .value
            .trim();

        if (!query) {
          showToast(
            "Escribe un producto.",
            "🛍️"
          );

          return;
        }

        const encoded =
          encodeURIComponent(
            query
          );

        const googleShopping =
          `https://www.google.com/search?tbm=shop&q=${encoded}`;

        const googleSearch =
          `https://www.google.com/search?q=${encoded}`;

        const mercadoLibre =
          `https://listado.mercadolibre.com.pe/${encodeURIComponent(
            query
          )}`;

        $("#buyLinks")
          .innerHTML = `
            <a
              class="external-link"
              href="${googleShopping}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🛒</span>
              <div>
                <strong>Google Shopping</strong>
                <small>
                  Comparar productos
                </small>
              </div>
            </a>

            <a
              class="external-link"
              href="${mercadoLibre}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🛍️</span>
              <div>
                <strong>Mercado Libre</strong>
                <small>
                  Buscar productos
                </small>
              </div>
            </a>

            <a
              class="external-link"
              href="${googleSearch}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🔎</span>
              <div>
                <strong>Google</strong>
                <small>
                  Buscar más opciones
                </small>
              </div>
            </a>
          `;
      }
    );
}


/* =========================================================
   ALIAS DE HERRAMIENTAS
   ========================================================= */

function renderLength() {
  renderConversion(
    "length"
  );
}

function renderWeight() {
  renderConversion(
    "weight"
  );
}

function renderVolume() {
  renderConversion(
    "volume"
  );
}

function renderTimeConvert() {
  renderConversion(
    "timeconvert"
  );
}


/* =========================================================
   FAVORITOS / RECIENTES
   ========================================================= */

function renderQuickTools() {
  const container =
    $("#quickTools");

  if (!container) {
    return;
  }

  const recentTools =
    state.recent
      .map(
        id =>
          TOOLS.find(
            tool =>
              tool.id === id
          )
      )
      .filter(Boolean)
      .slice(0, 6);

  const tools =
    recentTools.length
      ? recentTools
      : TOOLS.slice(0, 6);

  container.innerHTML =
    tools.map(tool => `
      <button
        class="mini-tool"
        data-open="${tool.id}"
        type="button"
      >
        <span class="mini-tool-icon">
          ${tool.icon}
        </span>

        <span>
          <strong>
            ${escapeHTML(tool.name)}
          </strong>

          <span>
            ${escapeHTML(tool.category)}
          </span>
        </span>
      </button>
    `).join("");

  $$(
    "#quickTools [data-open]"
  ).forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          openTool(
            button.dataset.open
          );
        }
      );
    }
  );
}


/* =========================================================
   BOTONES RÁPIDOS DEL HTML
   ========================================================= */

function setupOpenButtons() {
  $$("[data-open]").forEach(
    button => {
      if (
        button.closest(
          "#toolsGrid"
        )
      ) {
        return;
      }

      button.addEventListener(
        "click",
        () => {
          const id =
            button.dataset.open;

          if (id) {
            openTool(id);
          }
        }
      );
    }
  );
}


/* =========================================================
   MENÚ
   ========================================================= */

function setupMenu() {
  const menu =
    $("#sideMenu");

  const overlay =
    $("#menuOverlay");

  const openButton =
    $("#menuButton");

  const closeButton =
    $("#closeMenu");

  if (
    !menu ||
    !overlay
  ) {
    return;
  }

  function openMenu() {
    menu.classList.add(
      "open"
    );

    overlay.classList.add(
      "open"
    );
  }

  function closeMenu() {
    menu.classList.remove(
      "open"
    );

    overlay.classList.remove(
      "open"
    );
  }

  openButton
    ?.addEventListener(
      "click",
      openMenu
    );

  closeButton
    ?.addEventListener(
      "click",
      closeMenu
    );

  overlay.addEventListener(
    "click",
    closeMenu
  );

  $$("#sideMenu [data-scroll]")
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
            const target =
              $(
                button.dataset.scroll
              );

            if (target) {
              target.scrollIntoView({
                behavior:
                  "smooth"
              });
            }

            closeMenu();
          }
        );
      }
    );
}


/* =========================================================
   MODO ENFOQUE
   ========================================================= */

function setupFocusMode() {
  const button =
    $("#focusButton");

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    () => {
      document.body.classList.toggle(
        "focus-mode"
      );

      const active =
        document.body.classList.contains(
          "focus-mode"
        );

      showToast(
        active
          ? "Modo enfoque activado"
          : "Modo enfoque desactivado",
        "🎯"
      );
    }
  );
}


/* =========================================================
   EXPORTAR DATOS
   ========================================================= */

function exportData() {
  const data =
    JSON.stringify(
      state,
      null,
      2
    );

  const blob =
    new Blob(
      [data],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    "utilhub-v17-datos.json";

  link.click();

  URL.revokeObjectURL(
    url
  );

  showToast(
    "Datos exportados",
    "💾"
  );
}

function importData(file) {
  const reader =
    new FileReader();

  reader.onload =
    event => {
      try {
        const imported =
          JSON.parse(
            event.target.result
          );

        state = {
          ...structuredClone(
            DEFAULT_STATE
          ),
          ...imported
        };

        saveState();

        location.reload();
      } catch {
        showToast(
          "Archivo no válido",
          "⚠️"
        );
      }
    };

  reader.readAsText(
    file
  );
}

function setupDataControls() {
  $("#exportData")
    ?.addEventListener(
      "click",
      exportData
    );

  $("#importData")
    ?.addEventListener(
      "change",
      event => {
        const file =
          event.target.files[0];

        if (file) {
          importData(file);
        }
      }
    );

  $("#clearData")
    ?.addEventListener(
      "click",
      () => {
        const confirmed =
          confirm(
            "¿Quieres borrar los datos guardados en ÚtilHub?"
          );

        if (!confirmed) {
          return;
        }

        localStorage.removeItem(
          STORAGE_KEY
        );

        location.reload();
      }
    );
}


/* =========================================================
   SERVICE WORKER
   ========================================================= */

function registerServiceWorker() {
  if (
    "serviceWorker" in
    navigator
  ) {
    window.addEventListener(
      "load",
      () => {
        navigator.serviceWorker
          .register(
            "./sw.js"
          )
          .catch(
            () => {}
          );
      }
    );
  }
}


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function init() {
  applyTheme();

  document.body.classList.toggle(
    "motion-off",
    !state.motion
  );

  renderNovaModes();

  setupNovaControls();

  setupCategories();

  setupSearch();

  setupModal();

  setupMenu();

  setupFocusMode();

  setupDataControls();

  setupOpenButtons();

  renderTools();

  renderQuickTools();

  startNova();

  registerServiceWorker();

  $$("#presetBalanced")
    .forEach(button => {
      button.addEventListener(
        "click",
        () =>
          applyNovaPreset(
            "balanced"
          )
      );
    });

  $$("#presetPerformance")
    .forEach(button => {
      button.addEventListener(
        "click",
        () =>
          applyNovaPreset(
            "performance"
          )
      );
    });

  $$("#presetExtreme")
    .forEach(button => {
      button.addEventListener(
        "click",
        () =>
          applyNovaPreset(
            "extreme"
          )
      );
    });

  $("#themeButton")
    ?.addEventListener(
      "click",
      toggleTheme
    );

  window.addEventListener(
    "resize",
    () => {
      renderQuickTools();
    },
    {
      passive: true
    }
  );
}


/* =========================================================
   ARRANQUE
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    init
  );
} else {
  init();
}
