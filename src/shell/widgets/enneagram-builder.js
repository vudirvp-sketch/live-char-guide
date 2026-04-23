/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - ENNEAGRAM SMART BUILDER WIDGET v1.0.0
 * ============================================================================
 *
 * Interactive Enneagram type selector with SPINE autofill.
 * Part of the Persona Synthesis Framework (§4.2).
 *
 * Milestone Levels:
 *   M1 — Type selection, ring diagram, SPINE/FLAW fields, export (current)
 *   M2 — OCEAN tab, OCEAN-filtered FLAW anchors, examples (TODO)
 *   M3 — Advanced features (TODO)
 *
 * Activation: Only at L2+ guide layer (isWidgetAllowed())
 * Event Emission: enneagram:selected via EventBus (on "Подтвердить" click)
 *
 * Contract:
 *   - Reads: data/enneagram.json (v2.0.0)
 *   - Emits: enneagram:selected { typeId, wings } via window.EventBus
 *   - Fallback: if JSON missing → shows static placeholder
 *
 * @version 1.0.0
 */

(function() {
  'use strict';

  // ============================================================================
  // CONSTANTS
  // ============================================================================

  // Enneagram ring positions: 9 points on a circle
  // Traditional order clockwise from top: 9, 1, 2, 3, 4, 5, 6, 7, 8
  const ENNEAGRAM_ORDER = [9, 1, 2, 3, 4, 5, 6, 7, 8];
  const RING_RADIUS = 80;
  const RING_CENTER = 100;
  const RING_SIZE = 200;

  // Enneagram connection lines (traditional hex + triangle)
  // Hex: 1↔4↔2↔8↔5↔7↔1
  const HEX_PATH = [1, 4, 2, 8, 5, 7, 1];
  // Triangle: 3↔6↔9↔3
  const TRIANGLE_PATH = [3, 6, 9, 3];

  // Integration (growth) and Disintegration (stress) directions
  const GROWTH_LINES = {
    1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3
  };
  const STRESS_LINES = {
    1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6
  };

  // M1 visible tabs
  const M1_TABS = [
    { id: 'enneatype', label: 'Эннеатип' },
    { id: 'spine', label: 'SPINE & FLAW' },
    { id: 'export', label: 'Экспорт' }
  ];
  // M2+ tabs (hidden at M1)
  // { id: 'ocean', label: 'OCEAN' }
  // { id: 'examples', label: 'Примеры' }

  // Data cache
  let enneagramDataCache = null;

  // State
  let selectedTypeId = null;
  let currentWidgetLevel = 1;
  let confirmedType = null;
  let currentTab = 'enneatype';
  let exportFormat = 'markdown';

  // ============================================================================
  // DATA LOADING
  // ============================================================================

  async function fetchEnneagramData() {
    if (enneagramDataCache) return enneagramDataCache;
    const url = 'data/enneagram.json';
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      enneagramDataCache = data;
      console.log(`[EnneagramBuilder] Loaded data v${data.version || '?'} from ${url}`);
      return data;
    } catch (e) {
      console.warn(`[EnneagramBuilder] Failed to fetch ${url}:`, e.message);
      return null;
    }
  }

  // ============================================================================
  // STATE HELPERS
  // ============================================================================

  function getTypeInfo(typeId) {
    if (!enneagramDataCache || !enneagramDataCache.types) return null;
    return enneagramDataCache.types.find(function(t) { return t.id === typeId; }) || null;
  }

  function getWings(typeId) {
    // Wings are adjacent types on the ring: [left, right]
    var index = ENNEAGRAM_ORDER.indexOf(typeId);
    if (index === -1) return [];
    var left = ENNEAGRAM_ORDER[(index - 1 + 9) % 9];
    var right = ENNEAGRAM_ORDER[(index + 1) % 9];
    return [left, right];
  }

  function getSpineTemplate(typeId) {
    if (!enneagramDataCache || !enneagramDataCache.spine_templates) return null;
    return enneagramDataCache.spine_templates[String(typeId)] || null;
  }

  function getFlawAnchors(typeId) {
    if (!enneagramDataCache || !enneagramDataCache.flaw_anchors) return [];
    return enneagramDataCache.flaw_anchors[String(typeId)] || [];
  }

  // ============================================================================
  // SVG RING DIAGRAM BUILDER
  // ============================================================================

  function getPointPosition(typeId) {
    var index = ENNEAGRAM_ORDER.indexOf(typeId);
    if (index === -1) return { x: RING_CENTER, y: RING_CENTER };
    var angle = (Math.PI * 2 * index / 9) - Math.PI / 2;
    return {
      x: RING_CENTER + RING_RADIUS * Math.cos(angle),
      y: RING_CENTER + RING_RADIUS * Math.sin(angle)
    };
  }

  function buildConnectionLines() {
    var lines = '';

    // Hex path (1↔4↔2↔8↔5↔7↔1)
    for (var i = 0; i < HEX_PATH.length - 1; i++) {
      var from = getPointPosition(HEX_PATH[i]);
      var to = getPointPosition(HEX_PATH[i + 1]);
      var isActive = selectedTypeId && (
        HEX_PATH[i] === selectedTypeId || HEX_PATH[i + 1] === selectedTypeId
      );
      lines += '<line x1="' + from.x + '" y1="' + from.y + '" x2="' + to.x + '" y2="' + to.y + '" class="enneagram-connection-line' + (isActive ? ' active' : '') + '" data-from="' + HEX_PATH[i] + '" data-to="' + HEX_PATH[i + 1] + '" />';
    }

    // Triangle path (3↔6↔9↔3)
    for (var j = 0; j < TRIANGLE_PATH.length - 1; j++) {
      var fromT = getPointPosition(TRIANGLE_PATH[j]);
      var toT = getPointPosition(TRIANGLE_PATH[j + 1]);
      var isActiveT = selectedTypeId && (
        TRIANGLE_PATH[j] === selectedTypeId || TRIANGLE_PATH[j + 1] === selectedTypeId
      );
      lines += '<line x1="' + fromT.x + '" y1="' + fromT.y + '" x2="' + toT.x + '" y2="' + toT.y + '" class="enneagram-connection-line' + (isActiveT ? ' active' : '') + '" data-from="' + TRIANGLE_PATH[j] + '" data-to="' + TRIANGLE_PATH[j + 1] + '" />';
    }

    return lines;
  }

  function buildDirectionLines() {
    if (!selectedTypeId) return '';
    var lines = '';

    // Growth line (integration)
    var growthTarget = GROWTH_LINES[selectedTypeId];
    if (growthTarget) {
      var fromG = getPointPosition(selectedTypeId);
      var toG = getPointPosition(growthTarget);
      lines += '<line x1="' + fromG.x + '" y1="' + fromG.y + '" x2="' + toG.x + '" y2="' + toG.y + '" class="enneagram-connection-line active enneagram-growth-line" data-direction="growth" />';
    }

    // Stress line (disintegration)
    var stressTarget = STRESS_LINES[selectedTypeId];
    if (stressTarget) {
      var fromS = getPointPosition(selectedTypeId);
      var toS = getPointPosition(stressTarget);
      lines += '<line x1="' + fromS.x + '" y1="' + fromS.y + '" x2="' + toS.x + '" y2="' + toS.y + '" class="enneagram-connection-line active enneagram-stress-line" data-direction="stress" />';
    }

    return lines;
  }

  function buildRingSVG() {
    var connectionLines = buildConnectionLines();
    var directionLines = buildDirectionLines();

    // Build points
    var points = '';
    ENNEAGRAM_ORDER.forEach(function(typeId) {
      var pos = getPointPosition(typeId);
      var isSelected = selectedTypeId === typeId;
      var typeInfo = getTypeInfo(typeId);
      var title = typeInfo ? ('Тип ' + typeId + ': ' + typeInfo.name) : ('Тип ' + typeId);
      points += '<g class="enneagram-ring-point' + (isSelected ? ' selected' : '') + '" data-type="' + typeId + '" tabindex="0" role="button" aria-label="' + title + '">';
      points += '<circle cx="' + pos.x + '" cy="' + pos.y + '" r="' + (isSelected ? 14 : 12) + '" fill="' + (isSelected ? 'var(--accent)' : 'var(--bg-elevated)') + '" stroke="' + (isSelected ? 'var(--accent)' : 'var(--border)') + '" stroke-width="2" />';
      points += '<text x="' + pos.x + '" y="' + pos.y + '">' + typeId + '</text>';
      points += '</g>';
    });

    return '<svg class="enneagram-ring-svg" viewBox="0 0 ' + RING_SIZE + ' ' + RING_SIZE + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Enneagram Ring Diagram">' +
      connectionLines +
      directionLines +
      points +
    '</svg>';
  }

  // ============================================================================
  // TAB INTERFACE BUILDER
  // ============================================================================

  function buildTabsHTML() {
    var tabButtons = '';
    var tabContents = '';

    M1_TABS.forEach(function(tab) {
      var isActive = currentTab === tab.id;
      tabButtons += '<button class="enneagram-tab' + (isActive ? ' active' : '') + '" data-tab="' + tab.id + '" type="button">' + tab.label + '</button>';
      tabContents += '<div class="enneagram-tab-content' + (isActive ? ' active' : '') + '" id="enneagram-tab-' + tab.id + '">';
      tabContents += buildTabContent(tab.id);
      tabContents += '</div>';
    });

    return '<div class="enneagram-tabs">' + tabButtons + '</div>' + tabContents;
  }

  function buildTabContent(tabId) {
    if (tabId === 'enneatype') return buildEnneatypeTab();
    if (tabId === 'spine') return buildSpineTab();
    if (tabId === 'export') return buildExportTab();
    return '';
  }

  // ============================================================================
  // ЭННЕАТИП TAB
  // ============================================================================

  function buildEnneatypeTab() {
    var html = '';

    // Ring diagram
    html += '<div class="enneagram-ring-container" id="enneagram-ring">';
    html += buildRingSVG();
    html += '</div>';

    // Type info (shown when a type is selected)
    if (selectedTypeId) {
      var typeInfo = getTypeInfo(selectedTypeId);
      if (typeInfo) {
        html += '<div class="enneagram-type-info">';
        html += '<div class="enneagram-type-name">Тип ' + selectedTypeId + ': ' + typeInfo.name + '</div>';
        html += '<div class="enneagram-type-alt">' + typeInfo.name_alt + '</div>';
        html += '<div class="enneagram-type-fear"><strong>Страх:</strong> ' + typeInfo.core_fear + '</div>';
        html += '<div class="enneagram-type-desire"><strong>Желание:</strong> ' + typeInfo.core_desire + '</div>';

        // Growth/Stress directions
        var growthTarget = GROWTH_LINES[selectedTypeId];
        var stressTarget = STRESS_LINES[selectedTypeId];
        var growthInfo = getTypeInfo(growthTarget);
        var stressInfo = getTypeInfo(stressTarget);
        html += '<div class="enneagram-type-directions">';
        html += '<span class="enneagram-growth">Рост → ' + growthTarget + (growthInfo ? ' (' + growthInfo.name + ')' : '') + '</span>';
        html += '<span class="enneagram-stress">Стресс → ' + stressTarget + (stressInfo ? ' (' + stressInfo.name + ')' : '') + '</span>';
        html += '</div>';

        // Wings
        var wings = getWings(selectedTypeId);
        if (wings.length > 0) {
          html += '<div class="enneagram-type-wings">Крылья: ' + typeInfo.wings.join(', ') + '</div>';
        }

        html += '</div>';
      }

      // Confirm button
      var isConfirmed = confirmedType === selectedTypeId;
      html += '<button class="enneagram-confirm-btn" id="enneagram-confirm"' +
        (isConfirmed ? ' disabled' : '') + ' type="button">' +
        (isConfirmed ? '✓ Тип подтверждён' : 'Подтвердить тип') +
        '</button>';
    } else {
      html += '<p class="enneagram-hint">Нажмите на тип на диаграмме для выбора</p>';
    }

    return html;
  }

  // ============================================================================
  // SPINE & FLAW TAB
  // ============================================================================

  function buildSpineTab() {
    if (!selectedTypeId) {
      return '<p class="enneagram-hint">Сначала выберите тип на вкладке «Эннеатип»</p>';
    }

    var template = getSpineTemplate(selectedTypeId);
    if (!template) {
      return '<p class="enneagram-hint">SPINE шаблон не найден для типа ' + selectedTypeId + '</p>';
    }

    var html = '<div class="enneagram-spine-fields">';

    // WANT field
    html += buildSpineField('WANT', template.WANT);
    // NEED field
    html += buildSpineField('NEED', template.NEED);
    // FLAW field
    html += buildSpineField('FLAW', template.FLAW);

    // LIE field — hidden on L2, shown on L3 (check getGuideLayer per spec §4.2)
    var guideLayer = (typeof window.getGuideLayer === 'function') ? window.getGuideLayer() : (typeof window.getWidgetLevel === 'function' ? window.getWidgetLevel() : 1);
    if (guideLayer >= 3) {
      html += buildSpineField('LIE', template.LIE);
    }

    // GHOST field — hidden on L2, shown on L3
    if (guideLayer >= 3) {
      html += buildSpineField('GHOST', template.GHOST);
    }

    html += '</div>';

    // FLAW anchors (M1: without OCEAN filter)
    var anchors = getFlawAnchors(selectedTypeId);
    if (anchors.length > 0) {
      html += '<div class="enneagram-flaw-anchors">';
      html += '<h5>Триггеры FLAW</h5>';

      anchors.forEach(function(anchor) {
        html += '<div class="enneagram-flaw-anchor">';
        html += '<div class="anchor-trigger">' + escapeHtml(anchor.trigger) + '</div>';
        html += '<div class="anchor-action">' + escapeHtml(anchor.action) + '</div>';
        html += '<div class="anchor-cost">' + escapeHtml(anchor.cost) + '</div>';
        html += '</div>';
      });

      html += '</div>';
    }

    // L3 hint for hidden fields
    if (guideLayer < 3) {
      html += '<div class="enneagram-l3-hint">';
      html += '<small style="color: var(--text-muted);">Поля LIE и GHOST доступны на Layer 3</small>';
      html += '</div>';
    }

    return html;
  }

  function buildSpineField(fieldName, value) {
    var labelClass = 'label-' + fieldName;
    return '<div class="enneagram-spine-field">' +
      '<label class="enneagram-spine-label ' + labelClass + '" for="enneagram-spine-' + fieldName.toLowerCase() + '">' + fieldName + '</label>' +
      '<textarea class="enneagram-spine-input" id="enneagram-spine-' + fieldName.toLowerCase() + '" data-field="' + fieldName + '" rows="2">' + escapeHtml(value || '') + '</textarea>' +
      '</div>';
  }

  // ============================================================================
  // EXPORT TAB
  // ============================================================================

  function buildExportTab() {
    if (!selectedTypeId) {
      return '<p class="enneagram-hint">Сначала выберите тип на вкладке «Эннеатип»</p>';
    }

    var preview = generateExportContent(exportFormat);

    var html = '<div class="enneagram-export-format">';
    html += '<label style="font-size:0.8em;color:var(--text-muted);margin-right:0.5em;">Формат:</label>';
    html += '<select id="enneagram-export-format" style="font-size:0.8em;background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:4px;padding:0.2em 0.5em;">';
    html += '<option value="markdown"' + (exportFormat === 'markdown' ? ' selected' : '') + '>Markdown</option>';
    html += '<option value="json"' + (exportFormat === 'json' ? ' selected' : '') + '>JSON</option>';
    html += '</select>';
    html += '</div>';

    html += '<div class="enneagram-export-preview" id="enneagram-export-preview">' + escapeHtml(preview) + '</div>';

    html += '<div class="enneagram-export-actions">';
    html += '<button class="enneagram-copy-btn" id="enneagram-copy-export" type="button">📋 Копировать</button>';
    html += '</div>';

    return html;
  }

  function generateExportContent(format) {
    var typeInfo = getTypeInfo(selectedTypeId);
    var template = getSpineTemplate(selectedTypeId);
    if (!typeInfo || !template) return '';

    // Check guide layer for LIE/GHOST visibility (per spec §4.2)
    var guideLayer = (typeof window.getGuideLayer === 'function') ? window.getGuideLayer() : (typeof window.getWidgetLevel === 'function' ? window.getWidgetLevel() : 1);

    // Gather current field values from DOM (if available), otherwise use template
    var fields = {};
    ['WANT', 'NEED', 'FLAW', 'LIE', 'GHOST'].forEach(function(field) {
      var el = document.getElementById('enneagram-spine-' + field.toLowerCase());
      fields[field] = el ? el.value : (template[field] || '');
    });

    if (format === 'markdown') {
      var md = '**Enneagram:** Type ' + selectedTypeId + ' (' + typeInfo.name + ')\n';
      md += '- WANT: ' + fields.WANT + '\n';
      md += '- NEED: ' + fields.NEED + '\n';
      md += '- FLAW: ' + fields.FLAW + '\n';
      if (guideLayer >= 3) {
        md += '- LIE: ' + fields.LIE + '\n';
        md += '- GHOST: ' + fields.GHOST + '\n';
      }
      md += '- Рост → ' + GROWTH_LINES[selectedTypeId] + '\n';
      md += '- Стресс → ' + STRESS_LINES[selectedTypeId] + '\n';
      return md;
    }

    // JSON format
    var obj = {
      enneagram: {
        typeId: selectedTypeId,
        name: typeInfo.name,
        nameAlt: typeInfo.name_alt,
        spine: {
          WANT: fields.WANT,
          NEED: fields.NEED,
          FLAW: fields.FLAW
        }
      }
    };
    if (guideLayer >= 3) {
      obj.enneagram.spine.LIE = fields.LIE;
      obj.enneagram.spine.GHOST = fields.GHOST;
    }
    return JSON.stringify(obj, null, 2);
  }

  // ============================================================================
  // UTILITY
  // ============================================================================

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ============================================================================
  // M1 WIDGET BUILDER
  // ============================================================================

  function buildM1Widget(container, enneagramData) {
    var version = enneagramData.version || '?';

    container.innerHTML =
      '<div class="enneagram-widget">' +
        '<div class="enneagram-header">' +
          '<h4 class="enneagram-title">Enneagram Builder</h4>' +
          '<span class="enneagram-level-badge">M1</span>' +
        '</div>' +
        buildTabsHTML() +
        '<small style="display:block;margin-top:0.5em;color:var(--text-muted);font-size:0.7em;">Enneagram v' + version + '</small>' +
      '</div>';

    // Bind events
    bindEvents(container);
  }

  function reRender(container) {
    var widgetEl = container.querySelector('.enneagram-widget');
    if (!widgetEl) return;

    // Preserve current field values from SPINE tab before re-rendering
    var savedValues = {};
    ['WANT', 'NEED', 'FLAW', 'LIE', 'GHOST'].forEach(function(field) {
      var el = document.getElementById('enneagram-spine-' + field.toLowerCase());
      if (el) savedValues[field] = el.value;
    });

    var version = enneagramDataCache ? (enneagramDataCache.version || '?') : '?';

    widgetEl.innerHTML =
      '<div class="enneagram-header">' +
        '<h4 class="enneagram-title">Enneagram Builder</h4>' +
        '<span class="enneagram-level-badge">M1</span>' +
      '</div>' +
      buildTabsHTML() +
      '<small style="display:block;margin-top:0.5em;color:var(--text-muted);font-size:0.7em;">Enneagram v' + version + '</small>';

    // Restore saved field values
    ['WANT', 'NEED', 'FLAW', 'LIE', 'GHOST'].forEach(function(field) {
      var el = document.getElementById('enneagram-spine-' + field.toLowerCase());
      if (el && savedValues[field] !== undefined) {
        el.value = savedValues[field];
      }
    });

    bindEvents(container);
  }

  // ============================================================================
  // EVENT BINDING
  // ============================================================================

  function bindEvents(container) {
    // Tab switching
    container.querySelectorAll('.enneagram-tab').forEach(function(tabBtn) {
      tabBtn.addEventListener('click', function() {
        currentTab = tabBtn.dataset.tab;
        reRender(container);
      });
    });

    // Ring point selection
    var ringContainer = container.querySelector('#enneagram-ring');
    if (ringContainer) {
      ringContainer.addEventListener('click', function(e) {
        var point = e.target.closest('.enneagram-ring-point');
        if (!point) return;
        var typeId = parseInt(point.dataset.type, 10);
        if (isNaN(typeId)) return;
        selectedTypeId = typeId;
        confirmedType = null; // Reset confirmation on new selection
        currentTab = 'enneatype';
        reRender(container);
        console.log('[EnneagramBuilder] Selected type ' + typeId);
      });

      // Keyboard support
      ringContainer.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          var point = e.target.closest('.enneagram-ring-point');
          if (point) {
            e.preventDefault();
            point.click();
          }
        }
      });
    }

    // Confirm button
    var confirmBtn = container.querySelector('#enneagram-confirm');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function() {
        if (!selectedTypeId || confirmedType === selectedTypeId) return;
        confirmedType = selectedTypeId;
        var wings = getWings(selectedTypeId);

        // Emit event via EventBus
        if (window.EventBus && window.GuideEvents) {
          window.EventBus.emit(window.GuideEvents.ENNEAGRAM_SELECTED, {
            typeId: selectedTypeId,
            wings: wings
          });
          console.log('[EnneagramBuilder] Emitted enneagram:selected', { typeId: selectedTypeId, wings: wings });
        }

        reRender(container);
      });
    }

    // Export format selector
    var formatSelect = container.querySelector('#enneagram-export-format');
    if (formatSelect) {
      formatSelect.addEventListener('change', function() {
        exportFormat = formatSelect.value;
        var preview = container.querySelector('#enneagram-export-preview');
        if (preview) {
          preview.textContent = generateExportContent(exportFormat);
        }
      });
    }

    // Copy export button
    var copyBtn = container.querySelector('#enneagram-copy-export');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        var content = generateExportContent(exportFormat);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(content).then(function() {
            copyBtn.textContent = '✓ Скопировано';
            setTimeout(function() {
              copyBtn.textContent = '📋 Копировать';
            }, 1500);
          }).catch(function() {
            fallbackCopy(content);
            copyBtn.textContent = '✓ Скопировано';
            setTimeout(function() {
              copyBtn.textContent = '📋 Копировать';
            }, 1500);
          });
        } else {
          fallbackCopy(content);
          copyBtn.textContent = '✓ Скопировано';
          setTimeout(function() {
            copyBtn.textContent = '📋 Копировать';
          }, 1500);
        }
      });
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (_e) {
      console.warn('[EnneagramBuilder] Fallback copy failed');
    }
    document.body.removeChild(ta);
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  async function initEnneagramBuilder() {
    var container = document.getElementById('enneagram-embed');

    // Skip init if container is missing (per spec §4.2)
    if (!container) return;

    // Check guide layer — widgets only at L2+
    if (typeof window.isWidgetAllowed === 'function' && !window.isWidgetAllowed()) {
      container.innerHTML = '';
      container.style.display = 'none';
      console.log('[EnneagramBuilder] Widget hidden — L1 guide layer');
      return;
    }

    // Determine widget level
    currentWidgetLevel = (typeof window.getWidgetLevel === 'function') ? window.getWidgetLevel() : 1;

    // Fetch data
    var enneagramData = await fetchEnneagramData();
    if (!enneagramData) {
      container.innerHTML = '<div class="enneagram-widget"><p class="enneagram-error">Enneagram данные недоступны</p></div>';
      return;
    }

    // Build widget
    buildM1Widget(container, enneagramData);

    console.log('[EnneagramBuilder] Widget initialized at M' + currentWidgetLevel + ' level');
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  window.EnneagramBuilder = {
    init: initEnneagramBuilder,
    getSelectedType: function() { return selectedTypeId; },
    getLevel: function() { return currentWidgetLevel; },
    getVersion: function() { return '1.0.0'; }
  };

  // Auto-init after layer content is loaded
  function autoInit() {
    var container = document.getElementById('enneagram-embed');
    if (container) {
      initEnneagramBuilder();
    }
    // If container missing, skip init per spec §4.2
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(autoInit, 700);
    });
  } else {
    setTimeout(autoInit, 700);
  }

})();
