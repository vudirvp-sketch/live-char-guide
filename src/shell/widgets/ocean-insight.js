/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - OCEAN INSIGHT WIDGET v1.0.0
 * ============================================================================
 * 
 * Interactive OCEAN Big Five personality profiler.
 * Part of the Persona Synthesis Framework (§4.1).
 * 
 * Functionality Levels:
 *   M1 — Clickable pentagon vertices, 3 states (low/medium/high), auto-labels
 *   M2 — Sliders 0–100, live pentagon, extremum counter, passive forecast (TODO)
 *   M3 — Manual comments, event subscriptions, comfort zone highlights (TODO)
 * 
 * Activation: Only at L2+ guide layer (isWidgetAllowed())
 * Event Emission (M2+): ocean:updated via EventBus
 * 
 * Contract:
 *   - Reads: data/ocean.json (v2.0.0 — includes extremum_thresholds)
 *   - Emits: ocean:updated { O, C, E, A, N } via window.EventBus
 *   - Subscribes: enneagram:selected, mbti:selected, mbti:ocean-apply (M3 only)
 *   - Fallback: if JSON missing → shows static placeholder
 * 
 * @version 1.0.0
 */

(function() {
  'use strict';

  // ============================================================================
  // CONSTANTS
  // ============================================================================

  const TRAIT_IDS = ['O', 'C', 'E', 'A', 'N'];
  const TRAIT_NAMES = {
    'O': 'Открытость',
    'C': 'Добросовестность',
    'E': 'Экстраверсия',
    'A': 'Доброжелательность',
    'N': 'Нейротизм'
  };
  const TRAIT_LABELS_LOW = {
    'O': 'Практичный',
    'C': 'Спонтанный',
    'E': 'Интроверт',
    'A': 'Конкурентный',
    'N': 'Стабильный'
  };
  const TRAIT_LABELS_HIGH = {
    'O': 'Любопытный',
    'C': 'Организованный',
    'E': 'Экстраверт',
    'A': 'Кооперативный',
    'N': 'Реактивный'
  };

  // Pentagon geometry
  const PENTAGON_SIZE = 200; // viewBox size
  const PENTAGON_CENTER = PENTAGON_SIZE / 2;
  const PENTAGON_RADIUS = 80;

  // State thresholds (M1: 3 states)
  const STATE_LOW = 'low';      // <= 30
  const STATE_MEDIUM = 'medium'; // 31-69
  const STATE_HIGH = 'high';    // >= 70

  // M1 default values for 3-state cycling
  const STATE_VALUES = {
    [STATE_LOW]: 20,
    [STATE_MEDIUM]: 50,
    [STATE_HIGH]: 80
  };

  // Data cache
  let oceanDataCache = null;

  // Current profile state
  const oceanProfile = {
    O: 50, C: 50, E: 50, A: 50, N: 50
  };

  // Widget level (determined by guide layer)
  let currentWidgetLevel = 1;

  // ============================================================================
  // DATA LOADING
  // ============================================================================

  async function fetchOceanData() {
    if (oceanDataCache) return oceanDataCache;
    const url = 'data/ocean.json';
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      oceanDataCache = data;
      console.log(`[OCEAN] Loaded data v${data.version || '?'} from ${url}`);
      return data;
    } catch (e) {
      console.warn(`[OCEAN] Failed to fetch ${url}:`, e.message);
      return null;
    }
  }

  // ============================================================================
  // STATE HELPERS
  // ============================================================================

  function getState(value) {
    if (value <= 30) return STATE_LOW;
    if (value >= 70) return STATE_HIGH;
    return STATE_MEDIUM;
  }

  function cycleState(currentState) {
    const cycle = [STATE_LOW, STATE_MEDIUM, STATE_HIGH];
    const idx = cycle.indexOf(currentState);
    return cycle[(idx + 1) % cycle.length];
  }

  function getStateLabel(traitId, state) {
    if (state === STATE_LOW) return `Низкая ${TRAIT_NAMES[traitId].toLowerCase()}`;
    if (state === STATE_HIGH) return `Высокая ${TRAIT_NAMES[traitId].toLowerCase()}`;
    return `${TRAIT_NAMES[traitId]}: средняя`;
  }

  // ============================================================================
  // PENTAGON GEOMETRY
  // ============================================================================

  function getVertexPosition(index, value) {
    const angle = (Math.PI * 2 * index / 5) - Math.PI / 2; // start from top
    const radius = PENTAGON_RADIUS * (value / 100);
    return {
      x: PENTAGON_CENTER + radius * Math.cos(angle),
      y: PENTAGON_CENTER + radius * Math.sin(angle)
    };
  }

  function getOuterVertexPosition(index) {
    const angle = (Math.PI * 2 * index / 5) - Math.PI / 2;
    return {
      x: PENTAGON_CENTER + PENTAGON_RADIUS * Math.cos(angle),
      y: PENTAGON_CENTER + PENTAGON_RADIUS * Math.sin(angle)
    };
  }

  function getLabelPosition(index, offset) {
    const angle = (Math.PI * 2 * index / 5) - Math.PI / 2;
    const r = PENTAGON_RADIUS + offset;
    return {
      x: PENTAGON_CENTER + r * Math.cos(angle),
      y: PENTAGON_CENTER + r * Math.sin(angle)
    };
  }

  // ============================================================================
  // SVG BUILDERS
  // ============================================================================

  function buildPentagonSVG() {
    // Outer polygon (fixed frame)
    let outerPoints = '';
    for (let i = 0; i < 5; i++) {
      const pos = getOuterVertexPosition(i);
      outerPoints += `${pos.x},${pos.y} `;
    }

    // Inner polygon (current values)
    let innerPoints = '';
    for (let i = 0; i < 5; i++) {
      const pos = getVertexPosition(i, oceanProfile[TRAIT_IDS[i]]);
      innerPoints += `${pos.x},${pos.y} `;
    }

    // Axis lines
    let axisLines = '';
    for (let i = 0; i < 5; i++) {
      const outer = getOuterVertexPosition(i);
      axisLines += `<line x1="${PENTAGON_CENTER}" y1="${PENTAGON_CENTER}" x2="${outer.x}" y2="${outer.y}" class="ocean-axis" />`;
    }

    // Clickable vertex dots + state labels
    let vertices = '';
    for (let i = 0; i < 5; i++) {
      const traitId = TRAIT_IDS[i];
      const value = oceanProfile[traitId];
      const state = getState(value);
      const pos = getVertexPosition(i, value);
      const labelPos = getLabelPosition(i, 22);
      const stateLabel = getStateLabel(traitId, state);

      const stateClass = `ocean-vertex ocean-vertex-${state}`;
      vertices += `<circle cx="${pos.x}" cy="${pos.y}" r="8" class="${stateClass}" data-trait="${traitId}" data-index="${i}" tabindex="0" role="button" aria-label="${TRAIT_NAMES[traitId]}: ${stateLabel}" />`;
      vertices += `<text x="${labelPos.x}" y="${labelPos.y}" class="ocean-label ocean-label-${state}" data-trait="${traitId}" text-anchor="middle" dominant-baseline="middle">${stateLabel}</text>`;
    }

    // Trait letter labels at outer edge
    let traitLetters = '';
    for (let i = 0; i < 5; i++) {
      const letterPos = getLabelPosition(i, 38);
      traitLetters += `<text x="${letterPos.x}" y="${letterPos.y}" class="ocean-trait-letter" text-anchor="middle" dominant-baseline="middle">${TRAIT_IDS[i]}</text>`;
    }

    return `<svg class="ocean-pentagon-svg" viewBox="0 0 ${PENTAGON_SIZE} ${PENTAGON_SIZE}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OCEAN Profile Pentagon">
      <polygon points="${outerPoints}" class="ocean-outer-frame" />
      ${axisLines}
      <polygon points="${innerPoints}" class="ocean-inner-shape" />
      ${vertices}
      ${traitLetters}
    </svg>`;
  }

  // ============================================================================
  // M1 WIDGET — CLICKABLE PENTAGON
  // ============================================================================

  function buildM1Widget(container, oceanData) {
    const thresholds = oceanData?.extremum_thresholds || { low: 30, high: 70 };

    container.innerHTML = `
      <div class="ocean-widget ocean-widget-m1">
        <div class="ocean-header">
          <h4 class="ocean-title">OCEAN Profile</h4>
          <span class="ocean-level-badge">M1</span>
        </div>
        <p class="ocean-hint">Нажмите на вершину пентагона для переключения: низкий → средний → высокий</p>
        <div class="ocean-pentagon-container" id="ocean-pentagon">
          ${buildPentagonSVG()}
        </div>
        <div class="ocean-legend">
          <span class="ocean-legend-item ocean-legend-low">Низкий (≤${thresholds.low})</span>
          <span class="ocean-legend-item ocean-legend-medium">Средний</span>
          <span class="ocean-legend-item ocean-legend-high">Высокий (≥${thresholds.high})</span>
        </div>
      </div>
    `;

    // Bind vertex click events
    const pentagonEl = container.querySelector('#ocean-pentagon');
    if (pentagonEl) {
      pentagonEl.addEventListener('click', (e) => {
        const vertex = e.target.closest('.ocean-vertex');
        if (!vertex) return;

        const traitId = vertex.dataset.trait;
        if (!traitId || !TRAIT_IDS.includes(traitId)) return;

        // Cycle state
        const currentState = getState(oceanProfile[traitId]);
        const nextState = cycleState(currentState);
        oceanProfile[traitId] = STATE_VALUES[nextState];

        // Re-render pentagon
        pentagonEl.innerHTML = buildPentagonSVG();

        console.log(`[OCEAN] ${traitId}: ${oceanProfile[traitId]} (${nextState})`);
      });

      // Keyboard support for vertices
      pentagonEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const vertex = e.target.closest('.ocean-vertex');
          if (vertex) {
            e.preventDefault();
            vertex.click();
          }
        }
      });
    }
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  async function initOceanInsight() {
    const container = document.getElementById('ocean-embed');
    if (!container) return;

    // Check guide layer — widgets only at L2+
    if (typeof isWidgetAllowed === 'function' && !isWidgetAllowed()) {
      container.innerHTML = '';
      container.style.display = 'none';
      console.log('[OCEAN] Widget hidden — L1 guide layer');
      return;
    }

    // Determine widget level
    currentWidgetLevel = (typeof getWidgetLevel === 'function') ? getWidgetLevel() : 1;

    // Fetch data
    const oceanData = await fetchOceanData();
    if (!oceanData) {
      container.innerHTML = '<div class="ocean-widget"><p class="ocean-error">OCEAN данные недоступны</p></div>';
      return;
    }

    // Build widget based on level
    // M1 — always available at L2+
    buildM1Widget(container, oceanData);

    // M2+ features will be added in future phases
    if (currentWidgetLevel >= 2) {
      // TODO: Add sliders, extremum counter, passive forecast
      console.log('[OCEAN] M2+ features — TODO (future phase)');
    }

    if (currentWidgetLevel >= 3) {
      // TODO: Add event subscriptions, comfort zone highlights
      console.log('[OCEAN] M3 features — TODO (future phase)');
    }

    console.log(`[OCEAN] Widget initialized at M${currentWidgetLevel} level`);
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  window.OceanInsight = {
    init: initOceanInsight,
    getProfile: () => ({ ...oceanProfile }),
    getLevel: () => currentWidgetLevel,
    getVersion: () => '1.0.0'
  };

  // Auto-init after layer content is loaded
  function autoInit() {
    const container = document.getElementById('ocean-embed');
    if (container) {
      initOceanInsight();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(autoInit, 600);
    });
  } else {
    setTimeout(autoInit, 600);
  }

})();
