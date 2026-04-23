/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - OCEAN INSIGHT WIDGET v2.0.0
 * ============================================================================
 * 
 * Interactive OCEAN Big Five personality profiler.
 * Part of the Persona Synthesis Framework (§4.1).
 * 
 * Functionality Levels:
 *   M1 — Clickable pentagon vertices, 3 states (low/medium/high), auto-labels
 *   M2 — Sliders 0–100, live pentagon, extremum counter, passive forecast
 *   M3 — Manual comments, event subscriptions, comfort zone highlights (TODO)
 * 
 * Activation: Only at L2+ guide layer (isWidgetAllowed())
 * Event Emission (M2+): ocean:updated via EventBus
 * 
 * Contract:
 *   - Reads: data/ocean.json (v2.0.0 — includes extremum_thresholds)
 *   - Reads: data/mbti.json (v2.0.0 — includes ocean_suggestions)
 *   - Emits: ocean:updated { O, C, E, A, N } via window.EventBus
 *   - Subscribes: enneagram:selected, mbti:selected, mbti:ocean-apply (M3 only)
 *   - Fallback: if JSON missing → shows static placeholder
 * 
 * @version 2.0.0
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
  let mbtiDataCache = null;

  // Current profile state
  const oceanProfile = {
    O: 50, C: 50, E: 50, A: 50, N: 50
  };

  // Widget level (determined by guide layer)
  let currentWidgetLevel = 1;

  // Debounce timer for EventBus emission
  let debounceTimer = null;

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

  async function fetchMbtiData() {
    if (mbtiDataCache) return mbtiDataCache;
    const url = 'data/mbti.json';
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      mbtiDataCache = data;
      console.log(`[OCEAN] Loaded MBTI data v${data.version || '?'} from ${url}`);
      return data;
    } catch (e) {
      console.warn(`[OCEAN] Failed to fetch ${url}:`, e.message);
      return null;
    }
  }

  // ============================================================================
  // STATE HELPERS (M1)
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
  // M2 HELPERS
  // ============================================================================

  function getTraitLabel(traitId, value) {
    if (value <= 30) return TRAIT_LABELS_LOW[traitId];
    if (value >= 70) return TRAIT_LABELS_HIGH[traitId];
    return 'Умеренная';
  }

  function countExtrema(profile, thresholds) {
    let count = 0;
    const extremaList = [];
    TRAIT_IDS.forEach(function(id) {
      if (profile[id] >= thresholds.high) { count++; extremaList.push(id + '_high'); }
      if (profile[id] <= thresholds.low) { count++; extremaList.push(id + '_low'); }
    });
    return { count: count, extremaList: extremaList };
  }

  function getEnneagramForecast(oceanData, profile, thresholds) {
    // Check which poles are extreme
    var extremePoles = [];
    TRAIT_IDS.forEach(function(id) {
      if (profile[id] >= thresholds.high) extremePoles.push(id + '_high');
      if (profile[id] <= thresholds.low) extremePoles.push(id + '_low');
    });

    // Look up ocean.json.enneagram_suggestions for these poles
    var suggestions = oceanData.enneagram_suggestions || {};
    var typeCounts = {};
    extremePoles.forEach(function(pole) {
      var types = suggestions[pole] || [];
      types.forEach(function(t) { typeCounts[t] = (typeCounts[t] || 0) + 1; });
    });

    // Sort by frequency
    return Object.entries(typeCounts)
      .sort(function(a, b) { return b[1] - a[1]; })
      .slice(0, 3)
      .map(function(entry) { return entry[0]; });
  }

  function getMBTIForecast(mbtiData, profile) {
    if (!mbtiData || !mbtiData.ocean_suggestions) return [];
    var suggestions = mbtiData.ocean_suggestions;

    // Calculate distance between current profile and each type's suggestion
    var distances = Object.entries(suggestions).map(function(entry) {
      var typeCode = entry[0];
      var suggested = entry[1];
      var dist = 0;
      TRAIT_IDS.forEach(function(id) {
        dist += Math.abs(profile[id] - suggested[id]);
      });
      return { typeCode: typeCode, distance: dist };
    });

    distances.sort(function(a, b) { return a.distance - b.distance; });
    return distances.slice(0, 3).map(function(d) { return d.typeCode; });
  }

  function debounceEmit() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      if (window.EventBus && window.GuideEvents) {
        window.EventBus.emit(window.GuideEvents.OCEAN_UPDATED, { O: oceanProfile.O, C: oceanProfile.C, E: oceanProfile.E, A: oceanProfile.A, N: oceanProfile.N });
      }
    }, 300);
  }

  function generateCopyText(profile, thresholds) {
    var lines = ['**OCEAN Profile:**'];
    TRAIT_IDS.forEach(function(id) {
      var val = profile[id];
      var label = getTraitLabel(id, val);
      lines.push('- ' + TRAIT_NAMES[id] + ' (' + id + '): ' + val + ' — ' + label);
    });

    // Extrema summary
    var extResult = countExtrema(profile, thresholds);
    if (extResult.count > 0) {
      var extParts = [];
      TRAIT_IDS.forEach(function(id) {
        if (profile[id] >= thresholds.high) extParts.push(id + ':' + profile[id] + ' (высокий)');
        if (profile[id] <= thresholds.low) extParts.push(id + ':' + profile[id] + ' (низкий)');
      });
      lines.push('');
      lines.push('Экстремумы: ' + extParts.join(', '));
    }

    return lines.join('\n');
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function() {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.className = 'clipboard-fallback-textarea';
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand('copy'); } catch (_e) { /* ignore */ }
    document.body.removeChild(textarea);
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

  // M2 SVG builder — vertices are clickable to focus sliders, no state cycling
  function buildM2PentagonSVG() {
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

    // Vertex dots (clickable to focus slider)
    let vertices = '';
    for (let i = 0; i < 5; i++) {
      const traitId = TRAIT_IDS[i];
      const value = oceanProfile[traitId];
      const state = getState(value);
      const pos = getVertexPosition(i, value);
      const labelPos = getLabelPosition(i, 22);
      const traitLabel = getTraitLabel(traitId, value);

      const stateClass = `ocean-vertex ocean-vertex-${state}`;
      vertices += `<circle cx="${pos.x}" cy="${pos.y}" r="8" class="${stateClass}" data-trait="${traitId}" data-index="${i}" tabindex="0" role="button" aria-label="${TRAIT_NAMES[traitId]}: ${value} — ${traitLabel}" />`;
      vertices += `<text x="${labelPos.x}" y="${labelPos.y}" class="ocean-label ocean-label-${state}" data-trait="${traitId}" text-anchor="middle" dominant-baseline="middle">${traitLabel}</text>`;
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
  // M2 WIDGET — SLIDERS + LIVE PENTAGON + EXTREMUM + FORECAST + COPY
  // ============================================================================

  function buildM2Widget(container, oceanData, mbtiData) {
    const thresholds = oceanData?.extremum_thresholds || { low: 30, high: 70 };

    // Build sliders HTML
    let slidersHTML = '';
    TRAIT_IDS.forEach(function(id) {
      const val = oceanProfile[id];
      const valClass = val <= thresholds.low ? 'ocean-value-low' : (val >= thresholds.high ? 'ocean-value-high' : '');
      slidersHTML += `
        <div class="ocean-slider-row">
          <span class="ocean-slider-label">${id}</span>
          <span class="ocean-slider-name">${TRAIT_NAMES[id]}</span>
          <input type="range" min="0" max="100" value="${val}" class="ocean-slider-input" data-trait="${id}" aria-label="${TRAIT_NAMES[id]}: ${val}" />
          <span class="ocean-slider-value ${valClass}" data-value-trait="${id}">${val}</span>
        </div>`;
    });

    container.innerHTML = `
      <div class="ocean-widget ocean-widget-m2">
        <div class="ocean-header">
          <h4 class="ocean-title">OCEAN Profile</h4>
          <span class="ocean-level-badge">M2</span>
        </div>
        <div class="ocean-pentagon-container" id="ocean-pentagon">
          ${buildM2PentagonSVG()}
        </div>
        <div class="ocean-sliders">
          ${slidersHTML}
        </div>
        <div class="ocean-extremum-counter" id="ocean-extremum">
        </div>
        <div class="ocean-forecast" id="ocean-forecast">
        </div>
        <div class="ocean-actions">
          <button class="ocean-copy-btn" id="ocean-copy-btn">Copy for card</button>
        </div>
      </div>
    `;

    // Update extremum & forecast sections
    updateExtremum(container, oceanData, mbtiData, thresholds);
    updateForecast(container, oceanData, mbtiData, thresholds);

    // Bind slider events
    const sliders = container.querySelectorAll('.ocean-slider-input');
    sliders.forEach(function(slider) {
      slider.addEventListener('input', function() {
        const traitId = this.dataset.trait;
        const value = parseInt(this.value, 10);
        oceanProfile[traitId] = value;

        // Update value display
        const valueEl = container.querySelector(`[data-value-trait="${traitId}"]`);
        if (valueEl) {
          valueEl.textContent = value;
          valueEl.className = 'ocean-slider-value';
          if (value <= thresholds.low) valueEl.classList.add('ocean-value-low');
          else if (value >= thresholds.high) valueEl.classList.add('ocean-value-high');
        }

        // Update slider aria
        this.setAttribute('aria-label', TRAIT_NAMES[traitId] + ': ' + value);

        // Re-render pentagon
        const pentagonEl = container.querySelector('#ocean-pentagon');
        if (pentagonEl) {
          pentagonEl.innerHTML = buildM2PentagonSVG();
        }

        // Update extremum & forecast
        updateExtremum(container, oceanData, mbtiData, thresholds);
        updateForecast(container, oceanData, mbtiData, thresholds);

        // Debounced EventBus emission
        debounceEmit();
      });
    });

    // Bind pentagon vertex click → focus slider
    const pentagonEl = container.querySelector('#ocean-pentagon');
    if (pentagonEl) {
      pentagonEl.addEventListener('click', function(e) {
        const vertex = e.target.closest('.ocean-vertex');
        if (!vertex) return;
        const traitId = vertex.dataset.trait;
        if (!traitId) return;
        const slider = container.querySelector(`.ocean-slider-input[data-trait="${traitId}"]`);
        if (slider) slider.focus();
      });

      pentagonEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          const vertex = e.target.closest('.ocean-vertex');
          if (vertex) {
            e.preventDefault();
            const traitId = vertex.dataset.trait;
            if (!traitId) return;
            const slider = container.querySelector(`.ocean-slider-input[data-trait="${traitId}"]`);
            if (slider) slider.focus();
          }
        }
      });
    }

    // Bind copy button
    const copyBtn = container.querySelector('#ocean-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        const text = generateCopyText(oceanProfile, thresholds);
        copyToClipboard(text);
        copyBtn.textContent = 'Скопировано!';
        copyBtn.classList.add('ocean-copied');
        setTimeout(function() {
          copyBtn.textContent = 'Copy for card';
          copyBtn.classList.remove('ocean-copied');
        }, 1500);
      });
    }
  }

  function updateExtremum(container, oceanData, mbtiData, thresholds) {
    const el = container.querySelector('#ocean-extremum');
    if (!el) return;

    const result = countExtrema(oceanProfile, thresholds);
    let html = `Экстремумы: ${result.count}`;

    if (result.count >= 3) {
      html += `<div class="ocean-extremum-warning">⚠ 3+ экстремальных полюса могут создавать внутреннюю противоречивость</div>`;
    }

    el.innerHTML = html;
  }

  function updateForecast(container, oceanData, mbtiData, thresholds) {
    const el = container.querySelector('#ocean-forecast');
    if (!el) return;

    const enneagramTypes = getEnneagramForecast(oceanData, oceanProfile, thresholds);
    const mbtiTypes = getMBTIForecast(mbtiData, oceanProfile);

    let html = '<div class="ocean-forecast-title">Вероятные типы</div>';

    if (enneagramTypes.length > 0) {
      html += `<div class="ocean-forecast-types">На основе OCEAN наиболее вероятные типы Эннеаграммы: <strong>${enneagramTypes.join(', ')}</strong></div>`;
    } else {
      html += '<div class="ocean-forecast-types">На основе OCEAN нет выраженных экстремумов для прогноза Эннеаграммы</div>';
    }

    if (mbtiTypes.length > 0) {
      html += `<div class="ocean-forecast-types">На основе OCEAN наиболее вероятные MBTI-типы: <strong>${mbtiTypes.join(', ')}</strong></div>`;
    } else {
      html += '<div class="ocean-forecast-types">MBTI-данные недоступны для прогноза</div>';
    }

    el.innerHTML = html;
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  async function initOceanInsight() {
    const container = document.getElementById('ocean-embed');
    if (!container) return;

    // Check guide layer — widgets only at L2+
    if (typeof window.isWidgetAllowed === 'function' && !window.isWidgetAllowed()) {
      container.innerHTML = '';
      container.style.display = 'none';
      console.log('[OCEAN] Widget hidden — L1 guide layer');
      return;
    }

    // Determine widget level
    currentWidgetLevel = (typeof window.getWidgetLevel === 'function') ? window.getWidgetLevel() : 1;

    // Fetch data
    const oceanData = await fetchOceanData();
    if (!oceanData) {
      container.innerHTML = '<div class="ocean-widget"><p class="ocean-error">OCEAN данные недоступны</p></div>';
      return;
    }

    // Fetch MBTI data (optional, for M2+ forecast)
    let mbtiData = null;
    if (currentWidgetLevel >= 2) {
      mbtiData = await fetchMbtiData();
    }

    // Build widget based on level
    if (currentWidgetLevel >= 2) {
      // M2 — Full configuration
      buildM2Widget(container, oceanData, mbtiData);
    } else {
      // M1 — Clickable pentagon (fallback)
      buildM1Widget(container, oceanData);
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
    getVersion: () => '2.0.0'
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
