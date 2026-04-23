/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - OCEAN INSIGHT WIDGET v3.0.0
 * ============================================================================
 * 
 * Interactive OCEAN Big Five personality profiler.
 * Part of the Persona Synthesis Framework (§4.1).
 * 
 * Functionality Levels:
 *   M1 — Clickable pentagon vertices, 3 states (low/medium/high), auto-labels
 *   M2 — Sliders 0–100, live pentagon, extremum counter, passive forecast
 *   M3 — Manual comments, event subscriptions, comfort zone highlights
 * 
 * Activation: Only at L2+ guide layer (isWidgetAllowed())
 * Event Emission (M2+): ocean:updated via EventBus
 * Event Subscriptions:
 *   M2+: mbti:ocean-apply
 *   M3:  enneagram:selected, mbti:selected
 * 
 * Contract:
 *   - Reads: data/ocean.json (v2.0.0 — includes extremum_thresholds)
 *   - Reads: data/mbti.json (v2.0.0 — includes ocean_suggestions)
 *   - Reads: data/enneagram.json (v3.0.0 — includes ocean_defaults)
 *   - Emits: ocean:updated { O, C, E, A, N } via window.EventBus
 *   - Subscribes: enneagram:selected (M3), mbti:selected (M3), mbti:ocean-apply (M2+)
 *   - Fallback: if JSON missing → shows static placeholder
 * 
 * @version 3.0.0
 */

(function() {
  'use strict';

  // ============================================================================
  // CONSTANTS
  // ============================================================================

  // OCEAN constants now provided by WidgetUtils (loaded before this file)
  var TRAIT_IDS = window.WidgetUtils.OCEAN_TRAITS;
  var TRAIT_NAMES = window.WidgetUtils.OCEAN_NAMES;
  var TRAIT_LABELS_LOW = window.WidgetUtils.OCEAN_LABELS_LOW;
  var TRAIT_LABELS_HIGH = window.WidgetUtils.OCEAN_LABELS_HIGH;

  // Comfort zone source labels for tooltips
  const COMFORT_SOURCE_LABELS = {
    'enneagram': 'Тип Эннеаграммы',
    'mbti': 'MBTI-тип',
    'mbti-apply': 'MBTI-тип'
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
  let enneagramDataCache = null;

  // Current profile state
  const oceanProfile = {
    O: 50, C: 50, E: 50, A: 50, N: 50
  };

  // M3: Manual comment fields per trait
  const oceanComments = {
    O: '', C: '', E: '', A: '', N: ''
  };

  // Widget level (determined by guide layer)
  let currentWidgetLevel = 1;

  // Debounce timer for EventBus emission
  let debounceTimer = null;

  // Highlight notification auto-dismiss timer
  let highlightNotifTimer = null;

  // Subscription guards to prevent double-registration on re-init
  let m2EventSubscribed = false;
  let m3EventSubscribed = false;

  // ============================================================================
  // UTILITY
  // ============================================================================

  // escapeHtml provided by WidgetUtils

  // ============================================================================
  // DATA LOADING
  // ============================================================================

  // Data loading delegated to WidgetUtils.fetchJson (with internal cache)
  // Local caches are still populated for direct access within this widget

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
    var suggestions = window.WidgetUtils.getEnneagramSuggestionsFromTraits(oceanData) || {};
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

      // M3: Include comments if present
      if (currentWidgetLevel >= 3 && oceanComments[id]) {
        lines.push('  Комментарий: ' + oceanComments[id]);
      }
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
        window.WidgetUtils.fallbackCopy(text);
      });
    } else {
      window.WidgetUtils.fallbackCopy(text);
    }
  }

  // fallbackCopy provided by WidgetUtils

  // ============================================================================
  // M3 HELPERS
  // ============================================================================

  /**
   * Adds a green bar overlay on each slider showing the "typical zone"
   * for the selected type. Adds orange/red conflict marker if current value
   * deviates by >30 from reference.
   *
   * @param {Object} referenceProfile - { O: num, C: num, E: num, A: num, N: num }
   * @param {string} source - 'enneagram' | 'mbti' | 'mbti-apply'
   */
  function highlightComfortZones(referenceProfile, source) {
    var container = document.getElementById('ocean-embed');
    if (!container) return;

    TRAIT_IDS.forEach(function(id) {
      var refValue = referenceProfile[id];
      if (refValue === undefined) return;

      // --- Comfort zone green bar ---
      var comfortZone = container.querySelector('.ocean-comfort-zone[data-trait="' + id + '"]');
      if (comfortZone) {
        var left = Math.max(0, refValue - 10);
        var right = Math.min(100, refValue + 10);
        var width = right - left;
        comfortZone.style.left = left + '%';
        comfortZone.style.width = width + '%';
        comfortZone.style.display = 'block';
      }

      // --- Conflict marker (deviation > 30) ---
      var conflictMarker = container.querySelector('.ocean-conflict-marker[data-trait="' + id + '"]');
      if (!conflictMarker) return;

      var currentValue = oceanProfile[id];
      var deviation = Math.abs(currentValue - refValue);

      if (deviation > 30) {
        conflictMarker.style.left = currentValue + '%';
        conflictMarker.style.display = 'block';

        // Build tooltip
        var sourceLabel = COMFORT_SOURCE_LABELS[source] || source;
        var comparison;
        if (refValue > currentValue) {
          comparison = id + ' > ' + Math.round(refValue - 10);
        } else {
          comparison = id + ' < ' + Math.round(refValue + 10);
        }
        var tooltip = sourceLabel + ' обычно имеет ' + comparison + '. Текущее: ' + currentValue + '. Это осознанный конфликт?';
        conflictMarker.title = tooltip;
      } else {
        conflictMarker.style.display = 'none';
        conflictMarker.title = '';
      }
    });
  }

  /**
   * Shows a small toast notification at the bottom of the widget.
   * Auto-dismisses after 3 seconds.
   *
   * @param {string} message
   */
  function showHighlightNotification(message) {
    var container = document.getElementById('ocean-embed');
    if (!container) return;

    var notifContainer = container.querySelector('.ocean-highlight-notification-container');
    if (!notifContainer) return;

    // Clear any existing notification
    if (highlightNotifTimer) {
      clearTimeout(highlightNotifTimer);
      highlightNotifTimer = null;
    }

    var notif = document.createElement('div');
    notif.className = 'ocean-highlight-notification';
    notif.innerHTML = window.WidgetUtils.escapeHtml(message);
    notifContainer.innerHTML = '';
    notifContainer.appendChild(notif);

    // Auto-dismiss after 3 seconds
    highlightNotifTimer = setTimeout(function() {
      if (notif.parentNode) {
        notif.parentNode.removeChild(notif);
      }
      highlightNotifTimer = null;
    }, 3000);
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
  // M3 WIDGET — COMMENTS + COMFORT ZONES + EVENT SUBSCRIPTIONS
  // ============================================================================

  function buildM3Widget(container, oceanData, mbtiData) {
    // Build M2 base first
    buildM2Widget(container, oceanData, mbtiData);

    const widgetEl = container.querySelector('.ocean-widget');
    if (!widgetEl) return;

    // Update badge to M3
    const badge = widgetEl.querySelector('.ocean-level-badge');
    if (badge) badge.textContent = 'M3';
    widgetEl.classList.remove('ocean-widget-m2');
    widgetEl.classList.add('ocean-widget-m3');

    // Add M3-specific elements to each slider row
    TRAIT_IDS.forEach(function(id) {
      const sliderInput = widgetEl.querySelector('.ocean-slider-input[data-trait="' + id + '"]');
      if (!sliderInput) return;
      const sliderRow = sliderInput.closest('.ocean-slider-row');
      if (!sliderRow) return;

      // Wrap the slider input in a track wrapper for comfort zone overlays
      const wrapper = document.createElement('div');
      wrapper.className = 'ocean-slider-track-wrapper';
      sliderInput.parentNode.insertBefore(wrapper, sliderInput);
      wrapper.appendChild(sliderInput);

      // Add comfort zone overlay (hidden until subscription fires)
      const comfortZone = document.createElement('div');
      comfortZone.className = 'ocean-comfort-zone';
      comfortZone.style.display = 'none';
      comfortZone.dataset.trait = id;
      wrapper.appendChild(comfortZone);

      // Add conflict marker (hidden until deviation detected)
      const conflictMarker = document.createElement('div');
      conflictMarker.className = 'ocean-conflict-marker';
      conflictMarker.style.display = 'none';
      conflictMarker.dataset.trait = id;
      wrapper.appendChild(conflictMarker);

      // Add comment input below slider row
      const commentDiv = document.createElement('div');
      commentDiv.className = 'ocean-comment-row';
      const commentInput = document.createElement('input');
      commentInput.type = 'text';
      commentInput.className = 'ocean-comment-input';
      commentInput.placeholder = 'Комментарий к ' + TRAIT_NAMES[id] + '...';
      commentInput.dataset.trait = id;
      commentInput.setAttribute('aria-label', 'Комментарий к ' + TRAIT_NAMES[id]);
      commentInput.value = oceanComments[id] || '';
      commentDiv.appendChild(commentInput);

      // Insert comment row after slider row
      if (sliderRow.nextSibling) {
        sliderRow.parentNode.insertBefore(commentDiv, sliderRow.nextSibling);
      } else {
        sliderRow.parentNode.appendChild(commentDiv);
      }

      // Bind comment input to oceanComments state
      commentInput.addEventListener('input', function() {
        oceanComments[id] = this.value;
      });
    });

    // Add notification container at the bottom of the widget
    const notifContainer = document.createElement('div');
    notifContainer.className = 'ocean-highlight-notification-container';
    widgetEl.appendChild(notifContainer);
  }

  // ============================================================================
  // EVENT SUBSCRIPTIONS
  // ============================================================================

  function setupM2EventSubscriptions() {
    if (m2EventSubscribed) return;
    // M2+: mbti:ocean-apply — highlight recommended poles (NOT auto-replace sliders)
    if (window.EventBus && window.GuideEvents && window.GuideEvents.MBTI_OCEAN_APPLY) {
      window.EventBus.on(window.GuideEvents.MBTI_OCEAN_APPLY, function(detail) {
        if (detail && detail.suggestions) {
          highlightComfortZones(detail.suggestions, 'mbti-apply');
          showHighlightNotification('Рекомендованные значения MBTI подсвечены на слайдерах');
        }
      });
      m2EventSubscribed = true;
      console.log('[OCEAN] Subscribed to mbti:ocean-apply (M2+)');
    }
  }

  function setupM3EventSubscriptions() {
    if (m3EventSubscribed) return;
    if (!window.EventBus || !window.GuideEvents) return;

    // M3: enneagram:selected — read ocean_defaults, highlight comfort zones
    if (window.GuideEvents.ENNEAGRAM_SELECTED) {
      window.EventBus.on(window.GuideEvents.ENNEAGRAM_SELECTED, function(detail) {
        if (!detail) return;
        var typeId = detail.typeId;
        window.WidgetUtils.fetchJson('data/enneagram.json').then(function(enneagramData) {
          enneagramDataCache = enneagramData;
          if (!enneagramData || !enneagramData.ocean_defaults) return;
          var defaults = enneagramData.ocean_defaults[String(typeId)];
          if (!defaults) return;
          highlightComfortZones(defaults, 'enneagram');
        });
      });
      console.log('[OCEAN] Subscribed to enneagram:selected (M3)');
    }

    // M3: mbti:selected — read ocean_suggestions, highlight comfort zones
    if (window.GuideEvents.MBTI_SELECTED) {
      window.EventBus.on(window.GuideEvents.MBTI_SELECTED, function(detail) {
        if (!detail) return;
        var typeCode = detail.typeCode;
        if (!mbtiDataCache || !mbtiDataCache.ocean_suggestions) return;
        var suggestions = mbtiDataCache.ocean_suggestions[typeCode];
        if (!suggestions) return;
        highlightComfortZones(suggestions, 'mbti');
      });
      console.log('[OCEAN] Subscribed to mbti:selected (M3)');
    }

    m3EventSubscribed = true;
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
    oceanDataCache = await window.WidgetUtils.fetchJson('data/ocean.json');
    const oceanData = oceanDataCache;
    if (!oceanData) {
      container.innerHTML = '<div class="ocean-widget"><p class="ocean-error">OCEAN данные недоступны</p></div>';
      return;
    }

    // Fetch MBTI data (optional, for M2+ forecast)
    let mbtiData = null;
    if (currentWidgetLevel >= 2) {
      mbtiDataCache = await window.WidgetUtils.fetchJson('data/mbti.json');
      mbtiData = mbtiDataCache;
    }

    // Build widget based on level
    if (currentWidgetLevel >= 3) {
      buildM3Widget(container, oceanData, mbtiData);
    } else if (currentWidgetLevel >= 2) {
      buildM2Widget(container, oceanData, mbtiData);
    } else {
      buildM1Widget(container, oceanData);
    }

    // Event subscriptions: M2+ for mbti:ocean-apply, M3 for enneagram/mbti selected
    if (currentWidgetLevel >= 2) {
      setupM2EventSubscriptions();
    }
    if (currentWidgetLevel >= 3) {
      setupM3EventSubscriptions();
    }

    // Emit initial OCEAN state so late subscribers (PersonaSynthesis) can see it
    // This fixes the race condition where OCEAN initializes but never emits
    // until the user manually moves a slider
    if (currentWidgetLevel >= 2) {
      debounceEmit();
    }

    console.log(`[OCEAN] Widget initialized at M${currentWidgetLevel} level`);
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  window.OceanInsight = {
    init: initOceanInsight,
    getProfile: () => ({ ...oceanProfile }),
    getComments: () => ({ ...oceanComments }),
    getLevel: () => currentWidgetLevel,
    getVersion: () => '3.0.0'
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
