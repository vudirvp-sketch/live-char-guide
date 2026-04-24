/**
 * ============================================================================
 * PERSONA-CROSS — OCEAN×Enneagram Correlation Widget
 * ============================================================================
 * 
 * Interactive 5×9 cross-table showing correlations between OCEAN dimensions
 * and Enneagram types. Part of the Live Character Guide v6.
 * 
 * Contract (§0.8):
 * - Input: fetches data/ocean.json and data/enneagram.json (cached)
 * - Output: interactive 5×9 cross-table in <div id="persona-cross">
 * - Event bus: persona-cross://select CustomEvent on cell click
 * - Fallback: if either JSON missing → <noscript> static table shown, init skipped
 * - Required JSON fields:
 *     enneagram.json: ocean_correlation (5 numbers per type, range -1.0 to 1.0)
 *     ocean.json: enneagram_suggestions (type numbers sorted by correlation strength)
 * 
 * @version 1.0.0
 */

(function() {
  'use strict';

  // OCEAN constants provided by WidgetUtils
  const OCEAN_TRAITS = window.WidgetUtils.OCEAN_TRAITS;
  const OCEAN_NAMES = window.WidgetUtils.OCEAN_NAMES;

  // Data cache
  let oceanDataCache = null;
  let enneagramDataCache = null;

  // Data fetching delegated to WidgetUtils.fetchJson

  /**
   * Get color for a correlation value (-1.0 to 1.0)
   * Positive = green, Negative = red, Neutral = gray
   */
  function getCorrelationColor(value) {
    if (value === null || value === undefined) return 'var(--bg-elevated)';
    const abs = Math.abs(value);
    const alpha = Math.min(0.6, abs * 0.8);
    if (value > 0.2) return `rgba(34, 197, 94, ${alpha})`; // green
    if (value < -0.2) return `rgba(239, 68, 68, ${alpha})`; // red
    return `rgba(107, 114, 128, ${alpha * 0.5})`; // gray
  }

  /**
   * Build the cross-table HTML
   */
  function buildCrossTable(oceanData, enneagramData) {
    const types = enneagramData.types || [];
    if (!types.length) return null;

    // Build header row: OCEAN traits
    let headerCells = '<th></th>'; // empty corner
    OCEAN_TRAITS.forEach(trait => {
      headerCells += `<th class="cross-trait-header" data-trait="${trait}">${trait}<br><small>${OCEAN_NAMES[trait]}</small></th>`;
    });

    // Build data rows: one per Enneagram type
    let rows = '';
    types.forEach(type => {
      const correlation = type.ocean_correlation || [0, 0, 0, 0, 0];
      const name = type.name || `Type ${type.id}`;
      rows += `<tr>`;
      rows += `<th class="cross-type-header" data-type="${type.id}">${type.id}<br><small>${name}</small></th>`;
      
      OCEAN_TRAITS.forEach((trait, i) => {
        const val = correlation[i] || 0;
        const display = val.toFixed(2);
        const bg = getCorrelationColor(val);
        const strength = Math.abs(val) > 0.5 ? 'strong' : Math.abs(val) > 0.2 ? 'moderate' : 'weak';
        // fix 10.4: add text symbol for accessibility (not color-only indicator)
        const symbol = val > 0.3 ? '+' : (val < -0.3 ? '−' : '0');
        rows += `<td class="cross-cell cross-${strength}" 
                     style="background:${bg}" 
                     data-trait="${trait}" 
                     data-type="${type.id}" 
                     data-value="${val}"
                     title="${OCEAN_NAMES[trait]} × ${name}: ${display}">${symbol} ${display}</td>`;
      });
      
      rows += `</tr>`;
    });

    return `<table class="cross-matrix"><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table>`;
  }

  /**
   * Dispatch custom event when a cell is clicked
   */
  function dispatchSelectEvent(trait, typeNum, value) {
    const event = new CustomEvent('persona-cross://select', {
      detail: { trait, type: typeNum, value },
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  /**
   * Initialize the widget
   */
  async function initPersonaCross() {
    const container = document.getElementById('persona-cross');
    if (!container) return;

    // Fetch both data sources using WidgetUtils.fetchJson
    oceanDataCache = await window.WidgetUtils.fetchJson('data/ocean.json');
    enneagramDataCache = await window.WidgetUtils.fetchJson('data/enneagram.json');
    const oceanData = oceanDataCache;
    const enneagramData = enneagramDataCache;

    if (!oceanData || !enneagramData) {
      console.warn('[PersonaCross] Missing data, widget not initialized');
      // Fallback: show noscript content (static table)
      return;
    }

    // Validate required fields
    const hasOceanCorrelation = enneagramData.types?.every(t => 
      Array.isArray(t.ocean_correlation) && t.ocean_correlation.length === 5
    );
    
    if (!hasOceanCorrelation) {
      console.warn('[PersonaCross] enneagram.json missing ocean_correlation fields');
      return;
    }

    // Build and insert table
    const tableHtml = buildCrossTable(oceanData, enneagramData);
    if (!tableHtml) return;

    container.innerHTML = `
      <div class="cross-header">
        <h4>\u041a\u043e\u0440\u0440\u0435\u043b\u044f\u0446\u0438\u044f OCEAN \u00d7 Enneagram</h4>
        <p class="cross-legend">
          <span class="legend-item" style="background:rgba(34,197,94,0.4)">\u041f\u043e\u043b\u043e\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f</span>
          <span class="legend-item" style="background:rgba(107,114,128,0.2)">\u041d\u0435\u0439\u0442\u0440\u0430\u043b\u044c\u043d\u0430\u044f</span>
          <span class="legend-item" style="background:rgba(239,68,68,0.4)">\u041e\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043b\u044c\u043d\u0430\u044f</span>
        </p>
      </div>
      <div class="cross-table-wrap">${tableHtml}</div>
    `;

    // Bind click events on cells
    container.querySelectorAll('.cross-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        // Remove previous selection
        container.querySelectorAll('.cross-cell.selected').forEach(c => c.classList.remove('selected'));
        container.querySelectorAll('.cross-trait-header.selected').forEach(c => c.classList.remove('selected'));
        container.querySelectorAll('.cross-type-header.selected').forEach(c => c.classList.remove('selected'));
        
        // Highlight selected
        cell.classList.add('selected');
        const trait = cell.dataset.trait;
        const typeNum = parseInt(cell.dataset.type, 10);
        const value = parseFloat(cell.dataset.value);
        
        // Highlight corresponding headers
        container.querySelector(`.cross-trait-header[data-trait="${trait}"]`)?.classList.add('selected');
        container.querySelector(`.cross-type-header[data-type="${typeNum}"]`)?.classList.add('selected');
        
        // Dispatch event for other widgets to react
        dispatchSelectEvent(trait, typeNum, value);
      });

      // Hover effect: highlight row and column
      cell.addEventListener('mouseenter', () => {
        const trait = cell.dataset.trait;
        const typeNum = cell.dataset.type;
        container.querySelectorAll(`.cross-cell[data-trait="${trait}"]`).forEach(c => c.classList.add('hover-col'));
        container.querySelectorAll(`.cross-cell[data-type="${typeNum}"]`).forEach(c => c.classList.add('hover-row'));
      });
      
      cell.addEventListener('mouseleave', () => {
        container.querySelectorAll('.cross-cell.hover-col').forEach(c => c.classList.remove('hover-col'));
        container.querySelectorAll('.cross-cell.hover-row').forEach(c => c.classList.remove('hover-row'));
      });
    });

    // Listen for external events (OCEAN pentagon click → highlight column)
    document.addEventListener('persona-cross://select', (e) => {
      // External widget triggered selection
      const { trait, type: typeNum } = e.detail;
      if (trait && typeNum) {
        const cell = container.querySelector(`.cross-cell[data-trait="${trait}"][data-type="${typeNum}"]`);
        if (cell) cell.click();
      }
    });

    console.log('[PersonaCross] Initialized successfully');
  }

  // Auto-initialize when DOM is ready
  function autoInit() {
    const container = document.getElementById('persona-cross');
    if (container) {
      initPersonaCross();
    }
  }

  // Expose public API
  window.PersonaCross = {
    init: initPersonaCross,
    get oceanData() { return oceanDataCache; },
    get enneagramData() { return enneagramDataCache; }
  };

  // Auto-init after layer content is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Wait a tick for lazy-loader to finish
      setTimeout(autoInit, 500);
    });
  } else {
    setTimeout(autoInit, 500);
  }

})();
