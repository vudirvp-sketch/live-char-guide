/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - ENNEAGRAM SMART BUILDER WIDGET v3.0.0
 * ============================================================================
 *
 * Interactive Enneagram type selector with SPINE autofill.
 * Part of the Persona Synthesis Framework (§4.2).
 *
 * Milestone Levels:
 *   M1 — Type selection, ring diagram, SPINE/FLAW fields, export
 *   M2 — OCEAN tab, OCEAN-filtered FLAW anchors, MBTI hints, examples
 *   M3 — OCEAN×Enneagram conflict validator, mbti:selected subscription, red borders (current)
 *
 * Activation: Only at L2+ guide layer (isWidgetAllowed())
 * Event Emission: enneagram:selected via EventBus (on "Подтвердить" click)
 * Event Subscription: ocean:updated via EventBus (M2+, for FLAW filtering)
 * Event Subscription: mbti:selected via EventBus (M3, for live MBTI hints)
 *
 * Contract:
 *   - Reads: data/enneagram.json (v2.0.0)
 *   - Reads: data/ocean.json (v2.0.0 — for extremum thresholds)
 *   - Emits: enneagram:selected { typeId, wings } via window.EventBus
 *   - Subscribes: ocean:updated { O, C, E, A, N } via window.EventBus (M2+)
 *   - Subscribes: mbti:selected { typeCode, temperament } via window.EventBus (M3)
 *   - Fallback: if JSON missing → shows static placeholder
 *
 * @version 3.0.0
 */

(function() {
  'use strict';

  // ============================================================================
  // CONSTANTS
  // ============================================================================

  // Enneagram ring positions: 9 points on a circle
  // Traditional order clockwise from top: 9, 1, 2, 3, 4, 5, 6, 7, 8
  var ENNEAGRAM_ORDER = [9, 1, 2, 3, 4, 5, 6, 7, 8];
  var RING_RADIUS = 80;
  var RING_CENTER = 100;
  var RING_SIZE = 200;

  // Enneagram connection lines (traditional hex + triangle)
  // Hex: 1↔4↔2↔8↔5↔7↔1
  var HEX_PATH = [1, 4, 2, 8, 5, 7, 1];
  // Triangle: 3↔6↔9↔3
  var TRIANGLE_PATH = [3, 6, 9, 3];

  // Integration (growth) and Disintegration (stress) directions
  var GROWTH_LINES = {
    1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3
  };
  var STRESS_LINES = {
    1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6
  };

  // M1 visible tabs
  var M1_TABS = [
    { id: 'enneatype', label: 'Эннеатип' },
    { id: 'spine', label: 'SPINE & FLAW' },
    { id: 'export', label: 'Экспорт' }
  ];

  // M2+ tabs (5 total)
  var M2_TABS = [
    { id: 'enneatype', label: 'Эннеатип' },
    { id: 'ocean', label: 'OCEAN' },
    { id: 'spine', label: 'SPINE & FLAW' },
    { id: 'examples', label: 'Примеры' },
    { id: 'export', label: 'Экспорт' }
  ];

  // OCEAN trait metadata
  var OCEAN_TRAITS = ['O', 'C', 'E', 'A', 'N'];
  var OCEAN_NAMES = {
    'O': 'Открытость',
    'C': 'Добросовестность',
    'E': 'Экстраверсия',
    'A': 'Доброжелательность',
    'N': 'Нейротизм'
  };

  // Data caches
  var enneagramDataCache = null;
  var oceanDataCache = null;

  // State
  var selectedTypeId = null;
  var currentWidgetLevel = 1;
  var confirmedType = null;
  var currentTab = 'enneatype';
  var exportFormat = 'markdown';
  var showAllAnchors = true; // FLAW anchor filter toggle (default: show all)
  var currentOceanProfile = { O: 50, C: 50, E: 50, A: 50, N: 50 };
  var oceanEventSubscribed = false; // Track if we subscribed to avoid duplicates
  var mbtiEventSubscribed = false; // M3: track mbti:selected subscription
  var conflictWarnings = []; // M3: current OCEAN×Enneagram conflicts
  var lastMbtiSelected = null; // M3: last selected MBTI type for live hints

  // ============================================================================
  // DATA LOADING
  // ============================================================================

  async function fetchEnneagramData() {
    if (enneagramDataCache) return enneagramDataCache;
    var url = 'data/enneagram.json';
    try {
      var response = await fetch(url);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      var data = await response.json();
      enneagramDataCache = data;
      console.log('[EnneagramBuilder] Loaded data v' + (data.version || '?') + ' from ' + url);
      return data;
    } catch (e) {
      console.warn('[EnneagramBuilder] Failed to fetch ' + url + ':', e.message);
      return null;
    }
  }

  async function fetchOceanData() {
    if (oceanDataCache) return oceanDataCache;
    var url = 'data/ocean.json';
    try {
      var response = await fetch(url);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      var data = await response.json();
      oceanDataCache = data;
      console.log('[EnneagramBuilder] Loaded OCEAN data v' + (data.version || '?') + ' from ' + url);
      return data;
    } catch (e) {
      console.warn('[EnneagramBuilder] Failed to fetch ' + url + ':', e.message);
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

  function getOceanDefaults(typeId) {
    if (!enneagramDataCache || !enneagramDataCache.ocean_defaults) return null;
    return enneagramDataCache.ocean_defaults[String(typeId)] || null;
  }

  function getMbtiSuggestions(typeId) {
    if (!enneagramDataCache || !enneagramDataCache.mbti_suggestions) return null;
    return enneagramDataCache.mbti_suggestions[String(typeId)] || null;
  }

  function getLevelBadge() {
    if (currentWidgetLevel >= 3) return 'M3';
    return currentWidgetLevel >= 2 ? 'M2' : 'M1';
  }

  function getActiveTabs() {
    return currentWidgetLevel >= 2 ? M2_TABS : M1_TABS;
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
    var tabs = getActiveTabs();
    var tabButtons = '';
    var tabContents = '';

    tabs.forEach(function(tab) {
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
    if (tabId === 'ocean') return buildOceanTab();
    if (tabId === 'spine') return buildSpineTab();
    if (tabId === 'examples') return buildExamplesTab();
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
        html += '<div class="enneagram-type-name">Тип ' + selectedTypeId + ': ' + escapeHtml(typeInfo.name) + '</div>';
        html += '<div class="enneagram-type-alt">' + escapeHtml(typeInfo.name_alt) + '</div>';
        html += '<div class="enneagram-type-fear"><strong>Страх:</strong> ' + escapeHtml(typeInfo.core_fear) + '</div>';
        html += '<div class="enneagram-type-desire"><strong>Желание:</strong> ' + escapeHtml(typeInfo.core_desire) + '</div>';

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

        // M2+ MBTI hints (passive connection)
        if (currentWidgetLevel >= 2 && confirmedType === selectedTypeId) {
          var mbtiSuggestions = getMbtiSuggestions(selectedTypeId);
          if (mbtiSuggestions && mbtiSuggestions.length > 0) {
            html += '<div class="enneagram-mbti-hints">';
            html += '<span class="enneagram-mbti-label">Наиболее вероятные MBTI-типы: </span>';
            mbtiSuggestions.forEach(function(mbtiType, idx) {
              if (idx > 0) html += ', ';
              var isMatch = lastMbtiSelected && mbtiType === lastMbtiSelected;
              html += '<span class="enneagram-mbti-type' + (isMatch ? ' mbti-match-highlight' : '') + '" tabindex="0" role="button" data-mbti="' + escapeHtml(mbtiType) + '">' + escapeHtml(mbtiType) + '</span>';
            });
            html += '</div>';
          }
        }

        // M3: Live MBTI compatibility from mbti:selected event
        if (currentWidgetLevel >= 3 && lastMbtiSelected && confirmedType === selectedTypeId) {
          html += '<div class="enneagram-mbti-live">';
          html += '<span class="enneagram-mbti-live-label">\uD83D\uDD17 Выбранный MBTI: </span>';
          html += '<span class="enneagram-mbti-live-value">' + escapeHtml(lastMbtiSelected) + '</span>';
          var suggestions = getMbtiSuggestions(selectedTypeId) || [];
          var isCompatible = suggestions.indexOf(lastMbtiSelected) !== -1;
          html += '<span class="enneagram-mbti-compat ' + (isCompatible ? 'compat-yes' : 'compat-no') + '">' +
            (isCompatible ? 'Совместим' : 'Нетипичное сочетание') + '</span>';
          html += '</div>';
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
  // OCEAN TAB (M2+)
  // ============================================================================

  function buildOceanTab() {
    if (!selectedTypeId) {
      return '<p class="enneagram-hint">Сначала выберите тип на вкладке «Эннеатип»</p>';
    }

    var html = '';
    var oceanDefaults = getOceanDefaults(selectedTypeId);

    if (oceanDefaults) {
      html += '<div class="enneagram-ocean-sliders">';

      OCEAN_TRAITS.forEach(function(trait) {
        var value = oceanDefaults[trait];
        if (typeof value === 'undefined') value = 50;
        var barPercent = value;
        var barColor = value >= 70 ? 'var(--accent)' : (value <= 30 ? 'var(--danger, #ef4444)' : 'var(--border)');

        html += '<div class="enneagram-ocean-slider-row">';
        html += '<span class="enneagram-ocean-trait-letter">' + trait + '</span>';
        html += '<span class="enneagram-ocean-trait-name">' + escapeHtml(OCEAN_NAMES[trait]) + '</span>';
        html += '<div class="enneagram-ocean-bar-container">';
        html += '<div class="enneagram-ocean-bar" style="width:' + barPercent + '%;background:' + barColor + ';"></div>';
        html += '</div>';
        html += '<span class="enneagram-ocean-value">' + value + '</span>';
        html += '</div>';
      });

      html += '</div>';

      // M3: Conflict warnings (OCEAN×Enneagram)
      if (currentWidgetLevel >= 3 && conflictWarnings.length > 0) {
        html += '<div class="enneagram-conflict-warnings">';
        html += '<h5>Конфликты OCEAN×Эннеаграмма</h5>';
        conflictWarnings.forEach(function(w) {
          html += '<div class="conflict-warning">';
          html += '<span class="warning-icon">\u26A0\uFE0F</span>';
          html += '<span class="warning-text">' + escapeHtml(w.message) + '</span>';
          html += '<span class="warning-question">Это осознанный конфликт?</span>';
          html += '</div>';
        });
        html += '</div>';
      }

      // Button to suggest OCEAN fill — emits event, does NOT auto-fill per sovereignty §0.1
      html += '<div class="enneagram-ocean-actions">';
      html += '<button class="enneagram-ocean-suggest-btn" id="enneagram-ocean-suggest" type="button">Заполнить по типу</button>';
      html += '</div>';
    } else {
      html += '<p class="enneagram-hint">OCEAN данные не найдены для типа ' + selectedTypeId + '</p>';
    }

    // Correlation table
    var typeInfo = getTypeInfo(selectedTypeId);
    if (typeInfo && typeInfo.ocean_correlation) {
      html += '<div class="enneagram-ocean-correlation">';
      html += '<h5>Корреляция с OCEAN</h5>';
      html += '<table class="enneagram-ocean-correlation-table">';
      html += '<tr>';
      OCEAN_TRAITS.forEach(function(trait) {
        html += '<th>' + trait + '</th>';
      });
      html += '</tr><tr>';
      typeInfo.ocean_correlation.forEach(function(val) {
        var pct = Math.round(val * 100);
        var cellColor = val >= 0.7 ? 'var(--accent)' : (val <= 0.3 ? 'var(--danger, #ef4444)' : 'var(--text-muted)');
        html += '<td style="color:' + cellColor + ';">' + pct + '%</td>';
      });
      html += '</tr>';
      html += '</table>';
      html += '</div>';
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

    // FLAW anchors
    var anchors = getFlawAnchors(selectedTypeId);
    if (anchors.length > 0) {
      // M2+ FLAW anchors filtering by OCEAN extrema
      var relevantAnchors = anchors;
      var isM2 = currentWidgetLevel >= 2;

      if (isM2 && !showAllAnchors) {
        var thresholds = oceanDataCache?.extremum_thresholds || { low: 30, high: 70 };
        relevantAnchors = anchors.filter(function(anchor) {
          return anchor.ocean_tags.every(function(tag) {
            var parts = tag.split('_'); // e.g., "N_high" → ["N", "high"]
            var trait = parts[0];
            var level = parts[1];
            var value = currentOceanProfile[trait];
            if (typeof value === 'undefined') return true;
            if (level === 'high') return value >= thresholds.high;
            if (level === 'low') return value <= thresholds.low;
            if (level === 'moderate') return value > thresholds.low && value < thresholds.high;
            return true;
          });
        });
      }

      html += '<div class="enneagram-flaw-anchors">';
      html += '<h5>Триггеры FLAW</h5>';

      // M2+ toggle button for OCEAN filtering
      if (isM2) {
        var toggleLabel = showAllAnchors ? 'Показать по OCEAN' : 'Показать все';
        html += '<button class="enneagram-anchor-toggle-btn" id="enneagram-anchor-toggle" type="button">' + toggleLabel + '</button>';
      }

      relevantAnchors.forEach(function(anchor) {
        html += '<div class="enneagram-flaw-anchor">';
        html += '<div class="anchor-trigger">' + escapeHtml(anchor.trigger) + '</div>';
        html += '<div class="anchor-action">' + escapeHtml(anchor.action) + '</div>';
        html += '<div class="anchor-cost">' + escapeHtml(anchor.cost) + '</div>';

        // M2+ ocean_tags badges
        if (isM2 && anchor.ocean_tags && anchor.ocean_tags.length > 0) {
          html += '<div class="anchor-ocean-tags">';
          anchor.ocean_tags.forEach(function(tag) {
            var parts = tag.split('_');
            var tagColor = parts[1] === 'high' ? 'var(--accent)' : (parts[1] === 'low' ? 'var(--danger, #ef4444)' : 'var(--text-muted)');
            html += '<span class="ocean-tag-badge" style="background:' + tagColor + ';color:var(--bg);font-size:0.7em;padding:0.1em 0.4em;border-radius:3px;margin-right:0.3em;">' + escapeHtml(tag) + '</span>';
          });
          html += '</div>';
        }

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
  // EXAMPLES TAB (M2+)
  // ============================================================================

  function buildExamplesTab() {
    if (!selectedTypeId) {
      return '<p class="enneagram-hint">Сначала выберите тип на вкладке «Эннеатип»</p>';
    }

    var typeInfo = getTypeInfo(selectedTypeId);
    if (!typeInfo || !typeInfo.anchor_examples || typeInfo.anchor_examples.length === 0) {
      return '<p class="enneagram-hint">Примеры не найдены для типа ' + selectedTypeId + '</p>';
    }

    var html = '<div class="enneagram-examples-list">';

    typeInfo.anchor_examples.forEach(function(example) {
      html += '<div class="enneagram-example-card">';

      // Trigger → Action → Cost
      html += '<div class="example-row"><span class="example-label">Триггер:</span> ' + escapeHtml(example.trigger) + '</div>';
      html += '<div class="example-row"><span class="example-label">Действие:</span> ' + escapeHtml(example.action) + '</div>';
      html += '<div class="example-row"><span class="example-label">Цена:</span> ' + escapeHtml(example.price) + '</div>';

      // Ocean tags badges (if present on examples from flaw_anchors)
      var anchors = getFlawAnchors(selectedTypeId);
      var matchingAnchor = anchors.find(function(a) { return a.trigger === example.trigger; });
      if (matchingAnchor && matchingAnchor.ocean_tags && matchingAnchor.ocean_tags.length > 0) {
        html += '<div class="example-ocean-tags">';
        matchingAnchor.ocean_tags.forEach(function(tag) {
          var parts = tag.split('_');
          var tagColor = parts[1] === 'high' ? 'var(--accent)' : (parts[1] === 'low' ? 'var(--danger, #ef4444)' : 'var(--text-muted)');
          html += '<span class="ocean-tag-badge" style="background:' + tagColor + ';color:var(--bg);font-size:0.7em;padding:0.1em 0.4em;border-radius:3px;margin-right:0.3em;">' + escapeHtml(tag) + '</span>';
        });
        html += '</div>';
      }

      html += '</div>';
    });

    html += '</div>';
    return html;
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

      // M2+ OCEAN data in export
      if (currentWidgetLevel >= 2) {
        var oceanDefaults = getOceanDefaults(selectedTypeId);
        if (oceanDefaults) {
          md += '\n**OCEAN defaults:** O=' + oceanDefaults.O + ' C=' + oceanDefaults.C + ' E=' + oceanDefaults.E + ' A=' + oceanDefaults.A + ' N=' + oceanDefaults.N + '\n';
        }
      }

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
    if (currentWidgetLevel >= 2) {
      var oceanDefaultsJson = getOceanDefaults(selectedTypeId);
      if (oceanDefaultsJson) {
        obj.enneagram.oceanDefaults = oceanDefaultsJson;
      }
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
  // WIDGET BUILDER
  // ============================================================================

  function buildWidget(container, enneagramData) {
    var version = enneagramData.version || '?';
    var badge = getLevelBadge();

    container.innerHTML =
      '<div class="enneagram-widget">' +
        '<div class="enneagram-header">' +
          '<h4 class="enneagram-title">Enneagram Builder</h4>' +
          '<span class="enneagram-level-badge">' + badge + '</span>' +
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
    var badge = getLevelBadge();

    widgetEl.innerHTML =
      '<div class="enneagram-header">' +
        '<h4 class="enneagram-title">Enneagram Builder</h4>' +
        '<span class="enneagram-level-badge">' + badge + '</span>' +
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

    // M2+ OCEAN suggest button
    var oceanSuggestBtn = container.querySelector('#enneagram-ocean-suggest');
    if (oceanSuggestBtn) {
      oceanSuggestBtn.addEventListener('click', function() {
        var oceanDefaults = getOceanDefaults(selectedTypeId);
        if (!oceanDefaults) return;

        // Emit event suggestion — does NOT auto-fill OCEAN widget per sovereignty §0.1
        if (window.EventBus && window.GuideEvents) {
          window.EventBus.emit(window.GuideEvents.OCEAN_UPDATED, {
            O: oceanDefaults.O,
            C: oceanDefaults.C,
            E: oceanDefaults.E,
            A: oceanDefaults.A,
            N: oceanDefaults.N
          });
          console.log('[EnneagramBuilder] Emitted ocean:updated suggestion for type ' + selectedTypeId);
        }

        oceanSuggestBtn.textContent = '✓ Предложение отправлено';
        oceanSuggestBtn.disabled = true;
        setTimeout(function() {
          oceanSuggestBtn.textContent = 'Заполнить по типу';
          oceanSuggestBtn.disabled = false;
        }, 1500);
      });
    }

    // M2+ Anchor toggle button
    var anchorToggleBtn = container.querySelector('#enneagram-anchor-toggle');
    if (anchorToggleBtn) {
      anchorToggleBtn.addEventListener('click', function() {
        showAllAnchors = !showAllAnchors;
        reRender(container);
      });
    }

    // M2+ MBTI hint type clicks (informational only)
    container.querySelectorAll('.enneagram-mbti-type').forEach(function(mbtiEl) {
      mbtiEl.addEventListener('click', function() {
        // Informational only — no navigation
        console.log('[EnneagramBuilder] MBTI type info:', mbtiEl.dataset.mbti);
      });
    });

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
  // EVENT SUBSCRIPTION (M2+)
  // ============================================================================

  function subscribeOceanUpdates(_container) {
    if (oceanEventSubscribed) return;
    if (!window.EventBus || !window.GuideEvents) return;
    if (currentWidgetLevel < 2) return;

    window.EventBus.on(window.GuideEvents.OCEAN_UPDATED, function(profile) {
      currentOceanProfile = {
        O: profile.O,
        C: profile.C,
        E: profile.E,
        A: profile.A,
        N: profile.N
      };

      // M3: Run conflict validator if type is confirmed
      if (currentWidgetLevel >= 3 && confirmedType) {
        conflictWarnings = checkOceanEnneagramConflicts(confirmedType, currentOceanProfile);
      }

      // Re-render active tab (SPINE for FLAW filtering, OCEAN for conflict warnings)
      if (currentTab === 'spine' || currentTab === 'ocean') {
        var containerEl = document.getElementById('enneagram-embed');
        if (containerEl) {
          reRender(containerEl);
        }
      }
    });

    oceanEventSubscribed = true;
    console.log('[EnneagramBuilder] Subscribed to ocean:updated events (M2+)');
  }

  // ============================================================================
  // M3: OCEAN×ENNEAGRAM CONFLICT VALIDATOR
  // ============================================================================

  /**
   * Checks OCEAN profile against enneagram type's ocean_correlation.
   * Returns array of conflict objects { trait, expected, actual, message }.
   * Per spec §5.1 and §4.2 M3.
   */
  function checkOceanEnneagramConflicts(typeId, profile) {
    if (!enneagramDataCache || !enneagramDataCache.types) return [];
    var typeInfo = getTypeInfo(typeId);
    if (!typeInfo || !typeInfo.ocean_correlation) return [];

    var correlation = typeInfo.ocean_correlation;
    var conflicts = [];

    OCEAN_TRAITS.forEach(function(trait, i) {
      var expectedCorrelation = correlation[i]; // -1.0 to 1.0
      var actualValue = profile[trait]; // 0-100

      // Normalize actual to 0-1
      var actualNormalized = actualValue / 100;

      // Convert correlation to expected position
      // -1.0 = low (0.2), 0 = moderate (0.5), 1.0 = high (0.8)
      var expectedPosition = (expectedCorrelation + 1) / 2 * 0.6 + 0.2;

      // Check for significant deviation
      var deviation = Math.abs(actualNormalized - expectedPosition);
      if (deviation > 0.35) {
        var expectedLabel = expectedCorrelation > 0.3 ? 'высокий' :
          expectedCorrelation < -0.3 ? 'низкий' : 'умеренный';
        var actualLabel = actualValue > 70 ? 'высокий' :
          actualValue < 30 ? 'низкий' : 'умеренный';

        conflicts.push({
          trait: trait,
          expected: expectedLabel,
          actual: actualLabel,
          deviation: deviation.toFixed(2),
          message: trait + ': ожидается ' + expectedLabel +
            ' (корреляция ' + expectedCorrelation.toFixed(2) +
            '), фактически ' + actualLabel + ' (' + actualValue + ')'
        });
      }
    });

    return conflicts;
  }

  // ============================================================================
  // M3: MBTI:SELECTED SUBSCRIPTION
  // ============================================================================

  function subscribeMbtiSelected() {
    if (mbtiEventSubscribed) return;
    if (!window.EventBus || !window.GuideEvents) return;
    if (currentWidgetLevel < 3) return;

    window.EventBus.on(window.GuideEvents.MBTI_SELECTED, function(data) {
      lastMbtiSelected = data.typeCode || null;

      // Re-render Эннеатип tab if active (to show live MBTI hint)
      if (currentTab === 'enneatype') {
        var containerEl = document.getElementById('enneagram-embed');
        if (containerEl) {
          reRender(containerEl);
        }
      }
    });

    mbtiEventSubscribed = true;
    console.log('[EnneagramBuilder] Subscribed to mbti:selected events (M3)');
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

    // M2+: fetch OCEAN data for extremum thresholds
    if (currentWidgetLevel >= 2) {
      await fetchOceanData();
    }

    // Build widget
    buildWidget(container, enneagramData);

    // M2+: subscribe to OCEAN updates
    if (currentWidgetLevel >= 2) {
      subscribeOceanUpdates(container);
    }

    // M3: subscribe to MBTI selected events
    if (currentWidgetLevel >= 3) {
      subscribeMbtiSelected();
    }

    console.log('[EnneagramBuilder] Widget initialized at M' + currentWidgetLevel + ' level');
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  window.EnneagramBuilder = {
    init: initEnneagramBuilder,
    getSelectedType: function() { return selectedTypeId; },
    getLevel: function() { return currentWidgetLevel; },
    getVersion: function() { return '3.0.0'; }
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
