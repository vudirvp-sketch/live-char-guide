/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - MBTI COMPOSER WIDGET v3.0.0
 * ============================================================================
 *
 * Interactive MBTI type selector with grid and axis slider modes.
 * Part of the Persona Synthesis Framework (§4.3).
 *
 * Milestone Levels:
 *   M1 — Quick Selection: grid mode + axis slider mode, result card
 *   M2 — Extended configuration, OCEAN cross-ref, SPINE patterns, Enneagram hints
 *   M3 — Deep linking with Enneagram, ocean:updated subscription, full export (current)
 *
 * Activation: Only at L2+ guide layer (isWidgetAllowed())
 * Event Emission:
 *   mbti:selected     via EventBus (on type selection)
 *   mbti:ocean-apply  via EventBus (on "Apply to OCEAN" button click)
 *
 * Contract:
 *   - Reads: data/mbti.json (v2.0.0)
 *   - Emits: mbti:selected { typeCode, temperament } via window.EventBus
 *   - Emits: mbti:ocean-apply { suggestions: { O, C, E, A, N } } via window.EventBus
 *   - Subscribes: ocean:updated { O, C, E, A, N } via window.EventBus (M3)
 *   - Subscribes: enneagram:selected { typeId, wings } via window.EventBus (M3)
 *   - Fallback: if JSON missing → shows static placeholder
 *
 * @version 3.0.0
 */

(function() {
  'use strict';

  // ============================================================================
  // CONSTANTS
  // ============================================================================

  var TEMPERAMENT_ORDER = ['NT', 'NF', 'SJ', 'SP'];

  var TEMPERAMENT_NAMES = {
    'NT': 'Аналитики',
    'NF': 'Дипломаты',
    'SJ': 'Стражи',
    'SP': 'Исследователи'
  };

  // Normalize temperament keys from mbti.json
  var TEMPERAMENT_NORMALIZE = {
    'SP-темперамент': 'SP',
    'SP': 'SP',
    'NT': 'NT',
    'NF': 'NF',
    'SJ': 'SJ'
  };

  var AXIS_CONFIG = [
    { id: 'EI', left: 'E', right: 'I', leftLabel: 'Экстраверсия', rightLabel: 'Интроверсия', default: 50 },
    { id: 'SN', left: 'S', right: 'N', leftLabel: 'Сенсорика', rightLabel: 'Интуиция', default: 50 },
    { id: 'TF', left: 'T', right: 'F', leftLabel: 'Мышление', rightLabel: 'Чувство', default: 50 },
    { id: 'JP', left: 'J', right: 'P', leftLabel: 'Суждение', rightLabel: 'Восприятие', default: 50 }
  ];

  var SPINE_FIELD_COLORS = {
    'WANT': 'green',
    'FLAW': 'red',
    'LIE': '#b8a000',
    'GHOST': 'purple'
  };

  // OCEAN_TRAITS provided by WidgetUtils
  var OCEAN_TRAITS = window.WidgetUtils.OCEAN_TRAITS;

  var SPINE_FIELDS = ['WANT', 'FLAW', 'LIE', 'GHOST'];

  // Data cache
  var mbtiDataCache = null;
  var enneagramDataCache = null; // Needed for WidgetUtils.checkMbtiEnneagramCompatibility

  // State
  var selectedType = null;
  var currentMode = 'grid'; // 'grid' or 'sliders'
  var currentWidgetLevel = 1;
  var showOceanRef = false;       // OCEAN checkbox state
  var showSpinePatterns = false;  // SPINE checkbox state
  var showEnneagramLink = false;  // M3: Enneagram checkbox state
  var oceanEventSubscribed = false; // M3: track ocean:updated subscription
  var enneagramEventSubscribed = false; // M3: track enneagram:selected subscription
  var currentOceanProfile = null; // M3: latest OCEAN profile from event
  var lastEnneagramType = null;   // M3: latest Enneagram type from event

  // Slider values
  var axisValues = {
    EI: 50,
    SN: 50,
    TF: 50,
    JP: 50
  };

  // ============================================================================
  // DATA LOADING
  // ============================================================================

  // fetchMbtiData delegated to WidgetUtils.fetchJson

  // ============================================================================
  // HELPERS
  // ============================================================================

  function normalizeTemperament(raw) {
    return TEMPERAMENT_NORMALIZE[raw] || raw;
  }

  function getTypeInfo(typeCode) {
    if (!mbtiDataCache || !mbtiDataCache.types) return null;
    return mbtiDataCache.types.find(function(t) { return t.code === typeCode; }) || null;
  }

  function getTemperamentInfo(temperamentKey) {
    if (!mbtiDataCache || !mbtiDataCache.temperaments) return null;
    return mbtiDataCache.temperaments[temperamentKey] || null;
  }

  function getTypesByTemperament() {
    if (!mbtiDataCache || !mbtiDataCache.types) return {};
    var grouped = {};
    TEMPERAMENT_ORDER.forEach(function(t) { grouped[t] = []; });
    mbtiDataCache.types.forEach(function(type) {
      var temp = normalizeTemperament(type.temperament);
      if (grouped[temp]) {
        grouped[temp].push(type);
      }
    });
    return grouped;
  }

  function slidersToTypeCode() {
    var e = axisValues.EI < 50 ? 'E' : 'I';
    var s = axisValues.SN < 50 ? 'S' : 'N';
    var t = axisValues.TF < 50 ? 'T' : 'F';
    var j = axisValues.JP < 50 ? 'J' : 'P';
    return e + s + t + j;
  }

  // escapeHtml provided by WidgetUtils

  function getLevelBadge() {
    if (currentWidgetLevel >= 3) return 'M3';
    return currentWidgetLevel >= 2 ? 'M2' : 'M1';
  }

  // ============================================================================
  // BUILD RESULT CARD — OCEAN SECTION (M2+)
  // ============================================================================

  function buildOceanSection(typeCode) {
    var html = '<div class="mbti-ocean-section">';
    html += '<label class="mbti-ocean-checkbox">' +
      '<input type="checkbox"' + (showOceanRef ? ' checked' : '') + ' data-toggle="ocean" /> ' +
      '\uD83D\uDD17 Связать с OCEAN' +
    '</label>';

    if (showOceanRef && mbtiDataCache && mbtiDataCache.ocean_suggestions) {
      var suggestions = mbtiDataCache.ocean_suggestions[typeCode];
      if (suggestions) {
        html += '<div class="mbti-ocean-bars">';
        OCEAN_TRAITS.forEach(function(trait) {
          var val = suggestions[trait] || 0;
          html += '<div class="mbti-ocean-bar-row">' +
            '<span class="mbti-ocean-bar-label">' + trait + '</span>' +
            '<div class="mbti-ocean-bar-track"><div class="mbti-ocean-bar-fill" style="width:' + val + '%"></div></div>' +
            '<span class="mbti-ocean-bar-value">' + val + '</span>' +
          '</div>';
        });
        html += '</div>';
        html += '<button class="mbti-ocean-apply-btn" type="button">Применить к OCEAN-виджету</button>';
      }
    }

    html += '</div>';
    return html;
  }

  // ============================================================================
  // BUILD RESULT CARD — SPINE SECTION (M2+)
  // ============================================================================

  function buildSpineSection(typeCode) {
    var html = '<div class="mbti-spine-section">';
    html += '<label class="mbti-spine-checkbox">' +
      '<input type="checkbox"' + (showSpinePatterns ? ' checked' : '') + ' data-toggle="spine" /> ' +
      '\uD83D\uDD17 Показать подсказки SPINE' +
    '</label>';

    if (showSpinePatterns && mbtiDataCache && mbtiDataCache.spine_patterns) {
      var patterns = mbtiDataCache.spine_patterns[typeCode];
      if (patterns) {
        SPINE_FIELDS.forEach(function(field) {
          var val = patterns[field] || '';
          var color = SPINE_FIELD_COLORS[field] || 'inherit';
          html += '<div class="mbti-spine-field">' +
            '<span class="mbti-spine-field-label" style="color:' + color + '">' + field + '</span>' +
            '<span class="mbti-spine-field-value">' + window.WidgetUtils.escapeHtml(val) + '</span>' +
            '<button class="mbti-spine-copy-btn" type="button" data-spine-field="' + field + '" data-type-code="' + typeCode + '" title="Копировать">\uD83D\uDCCB</button>' +
          '</div>';
        });
      }
    }

    html += '</div>';
    return html;
  }

  // ============================================================================
  // BUILD RESULT CARD — ENNEAGRAM HINTS (M2+)
  // ============================================================================

  function buildEnneagramHints(typeCode) {
    var html = '<div class="mbti-enneagram-hints">';
    if (mbtiDataCache && mbtiDataCache.enneagram_suggestions) {
      var suggestions = mbtiDataCache.enneagram_suggestions[typeCode];
      if (suggestions && suggestions.length > 0) {
        html += 'Наиболее вероятные типы Эннеаграммы: ';
        suggestions.forEach(function(typeId) {
          var isMatch = lastEnneagramType && typeId === lastEnneagramType;
          html += '<span class="mbti-enneagram-hint-chip' + (isMatch ? ' enneagram-match-highlight' : '') + '" tabindex="0" role="button" aria-label="Эннеаграмма тип ' + typeId + '" data-enneagram-type="' + typeId + '">' + typeId + '</span>';
        });
      }
    }
    html += '</div>';
    return html;
  }

  // ============================================================================
  // BUILD RESULT CARD — ENNEAGRAM LINKING SECTION (M3)
  // ============================================================================

  function buildEnneagramLinkSection(typeCode) {
    var html = '<div class="mbti-enneagram-link-section">';
    html += '<label class="mbti-enneagram-checkbox">' +
      '<input type="checkbox"' + (showEnneagramLink ? ' checked' : '') + ' data-toggle="enneagram" /> ' +
      '\uD83D\uDD17 Связать с Эннеаграммой' +
    '</label>';

    if (showEnneagramLink && mbtiDataCache && mbtiDataCache.enneagram_suggestions) {
      var suggestions = mbtiDataCache.enneagram_suggestions[typeCode];
      if (suggestions && suggestions.length > 0) {
        html += '<div class="mbti-enneagram-links">';
        html += '<span class="mbti-enneagram-links-label">Типы Эннеаграммы для ' + window.WidgetUtils.escapeHtml(typeCode) + ':</span>';
        suggestions.forEach(function(typeId) {
          var isMatch = lastEnneagramType && typeId === lastEnneagramType;
          html += '<button class="mbti-enneagram-link-btn' + (isMatch ? ' enneagram-match-highlight' : '') + '" type="button" data-enneagram-emit="' + typeId + '">Тип ' + typeId + '</button>';
        });
        html += '</div>';
      }

      // M3: Show live OCEAN compatibility if both OCEAN and Enneagram are active
      if (lastEnneagramType && enneagramDataCache) {
        var compatLevel = window.WidgetUtils.checkMbtiEnneagramCompatibility(
          typeCode, lastEnneagramType,
          enneagramDataCache.mbti_suggestions || {},
          mbtiDataCache.enneagram_suggestions || {}
        );
        var compatLabel = compatLevel === 'strong' ? 'Сильная совместимость' : compatLevel === 'partial' ? 'Частичная совместимость' : 'Нетипичное сочетание';
        var compatClass = compatLevel === 'strong' ? 'compat-yes' : compatLevel === 'partial' ? 'compat-partial' : 'compat-no';
        html += '<div class="mbti-enneagram-compat">';
        html += '<span class="mbti-enneagram-compat-label">\uD83D\uDD17 Выбранный тип Эннеаграммы: ' + lastEnneagramType + '</span>';
        html += '<span class="mbti-enneagram-compat-status ' + compatClass + '">' + compatLabel + '</span>';
        html += '</div>';
      }
    }

    html += '</div>';
    return html;
  }

  // ============================================================================
  // BUILD RESULT CARD — OCEAN COMPATIBILITY (M3)
  // ============================================================================

  function buildOceanCompatSection(typeCode) {
    if (!currentOceanProfile) return '';
    if (!mbtiDataCache || !mbtiDataCache.ocean_suggestions) return '';

    var suggestions = mbtiDataCache.ocean_suggestions[typeCode];
    if (!suggestions) return '';

    var html = '<div class="mbti-ocean-compat">';
    html += '<span class="mbti-ocean-compat-label">\uD83D\uDD17 Совместимость с текущим OCEAN:</span>';

    // Calculate distance between current OCEAN and this type's suggestion
    var totalDist = 0;
    OCEAN_TRAITS.forEach(function(trait) {
      totalDist += Math.abs(currentOceanProfile[trait] - suggestions[trait]);
    });
    var maxDist = 5 * 100; // 5 traits × 100 max
    var compatPct = Math.round((1 - totalDist / maxDist) * 100);
    var compatClass = compatPct >= 70 ? 'compat-yes' : (compatPct >= 40 ? 'compat-partial' : 'compat-no');

    html += '<span class="mbti-ocean-compat-value ' + compatClass + '">' + compatPct + '%</span>';

    // Show per-trait comparison
    html += '<div class="mbti-ocean-compat-traits">';
    OCEAN_TRAITS.forEach(function(trait) {
      var actual = currentOceanProfile[trait];
      var expected = suggestions[trait];
      var diff = Math.abs(actual - expected);
      var traitCompatClass = diff <= 15 ? 'trait-match' : (diff <= 30 ? 'trait-partial' : 'trait-conflict');
      html += '<div class="mbti-ocean-compat-trait ' + traitCompatClass + '">';
      html += '<span class="compat-trait-letter">' + trait + '</span>';
      html += '<span class="compat-trait-actual">' + actual + '</span>';
      html += '<span class="compat-trait-arrow">→</span>';
      html += '<span class="compat-trait-expected">' + expected + '</span>';
      html += '</div>';
    });
    html += '</div>';
    html += '</div>';
    return html;
  }

  // ============================================================================
  // BUILD RESULT CARD
  // ============================================================================

  function buildResultCard(typeCode) {
    var typeInfo = getTypeInfo(typeCode);
    if (!typeInfo) {
      return '<div class="mbti-empty-state">Тип ' + window.WidgetUtils.escapeHtml(typeCode) + ' не найден</div>';
    }

    var temp = normalizeTemperament(typeInfo.temperament);
    var tempInfo = getTemperamentInfo(typeInfo.temperament);
    var tempName = tempInfo ? tempInfo.name : TEMPERAMENT_NAMES[temp] || temp;
    var functions = (typeInfo.cognitive_functions || []).join(' \u2192 ');

    var html = '<div class="mbti-result-card">' +
      '<div class="mbti-result-code">' + window.WidgetUtils.escapeHtml(typeInfo.code) + '</div>' +
      '<div class="mbti-result-name">' + window.WidgetUtils.escapeHtml(typeInfo.name) + '</div>' +
      '<div class="mbti-result-temperament">' + window.WidgetUtils.escapeHtml(temp) + ' \u2014 ' + window.WidgetUtils.escapeHtml(tempName) + '</div>' +
      (functions ? '<div class="mbti-result-functions">' + window.WidgetUtils.escapeHtml(functions) + '</div>' : '') +
      '<div class="mbti-result-hint">' + window.WidgetUtils.escapeHtml(typeInfo.hint) + '</div>';

    // M2+ extended sections
    if (currentWidgetLevel >= 2) {
      html += buildOceanSection(typeCode);
      html += buildSpineSection(typeCode);
      html += buildEnneagramHints(typeCode);
    }

    // M3 extended sections
    if (currentWidgetLevel >= 3) {
      html += buildEnneagramLinkSection(typeCode);
      html += buildOceanCompatSection(typeCode);
    }

    // M3: Full export button
    if (currentWidgetLevel >= 3) {
      html += '<div class="mbti-export-section">';
      html += '<button class="mbti-export-btn" type="button" id="mbti-full-export">Экспорт полного профиля</button>';
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  // ============================================================================
  // MODE TOGGLE
  // ============================================================================

  function buildModeToggle() {
    var gridActive = currentMode === 'grid' ? ' active' : '';
    var sliderActive = currentMode === 'sliders' ? ' active' : '';
    var gridSelected = currentMode === 'grid' ? 'true' : 'false';
    var sliderSelected = currentMode === 'sliders' ? 'true' : 'false';
    return '<div class="mbti-mode-toggle" role="tablist">' +
      '<button class="mbti-mode-btn' + gridActive + '" data-mode="grid" type="button" role="tab" aria-selected="' + gridSelected + '" aria-controls="mbti-tabpanel-grid" id="mbti-tab-grid">\u0417\u043D\u0430\u044E \u0441\u0432\u043E\u0439 \u0442\u0438\u043F</button>' +
      '<button class="mbti-mode-btn' + sliderActive + '" data-mode="sliders" type="button" role="tab" aria-selected="' + sliderSelected + '" aria-controls="mbti-tabpanel-sliders" id="mbti-tab-sliders">\u041F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0438\u043F</button>' +
    '</div>';
  }

  // ============================================================================
  // GRID MODE
  // ============================================================================

  function buildGrid() {
    var grouped = getTypesByTemperament();
    var html = '<div class="mbti-grid">';

    TEMPERAMENT_ORDER.forEach(function(temp) {
      var types = grouped[temp] || [];
      types.forEach(function(type) {
        var isSelected = selectedType === type.code ? ' selected' : '';
        html += '<div class="mbti-grid-cell' + isSelected + '" data-temperament="' + temp + '" data-type="' + type.code + '" tabindex="0" role="button" aria-label="' + window.WidgetUtils.escapeHtml(type.code) + ': ' + window.WidgetUtils.escapeHtml(type.name) + '">' +
          '<span class="mbti-cell-code">' + window.WidgetUtils.escapeHtml(type.code) + '</span>' +
          '<span class="mbti-cell-name">' + window.WidgetUtils.escapeHtml(type.name) + '</span>' +
        '</div>';
      });
    });

    html += '</div>';
    return html;
  }

  // ============================================================================
  // AXIS SLIDER MODE
  // ============================================================================

  function buildAxisSliders() {
    var html = '<div class="mbti-axis-sliders">';

    AXIS_CONFIG.forEach(function(axis) {
      var val = axisValues[axis.id];
      html += '<div class="mbti-axis-row">' +
        '<span class="mbti-axis-label mbti-axis-label-left" title="' + window.WidgetUtils.escapeHtml(axis.leftLabel) + '">' + axis.left + '</span>' +
        '<input type="range" min="0" max="100" value="' + val + '" class="mbti-axis-input" data-axis="' + axis.id + '" aria-label="' + window.WidgetUtils.escapeHtml(axis.leftLabel) + ' \u2014 ' + window.WidgetUtils.escapeHtml(axis.rightLabel) + '" />' +
        '<span class="mbti-axis-label mbti-axis-label-right" title="' + window.WidgetUtils.escapeHtml(axis.rightLabel) + '">' + axis.right + '</span>' +
      '</div>';
    });

    html += '</div>';
    return html;
  }

  // ============================================================================
  // SELECT TYPE
  // ============================================================================

  function selectType(typeCode) {
    selectedType = typeCode;

    var typeInfo = getTypeInfo(typeCode);
    var temperament = typeInfo ? normalizeTemperament(typeInfo.temperament) : '';

    // Emit event via EventBus
    if (window.EventBus && window.GuideEvents) {
      window.EventBus.emit(window.GuideEvents.MBTI_SELECTED, {
        typeCode: selectedType,
        temperament: temperament
      });
      console.log('[MBTI] Emitted mbti:selected', { typeCode: selectedType, temperament: temperament });
    }
  }

  // ============================================================================
  // EMIT OCEAN APPLY EVENT
  // ============================================================================

  function emitOceanApply() {
    if (window.EventBus && window.GuideEvents && mbtiDataCache && mbtiDataCache.ocean_suggestions) {
      var suggestions = mbtiDataCache.ocean_suggestions[selectedType];
      if (suggestions) {
        window.EventBus.emit(window.GuideEvents.MBTI_OCEAN_APPLY, {
          suggestions: { O: suggestions.O, C: suggestions.C, E: suggestions.E, A: suggestions.A, N: suggestions.N }
        });
        console.log('[MBTI] Emitted mbti:ocean-apply', { typeCode: selectedType });
      }
    }
  }

  // ============================================================================
  // WIDGET BUILDER (M1 / M2)
  // ============================================================================

  function buildWidget(container) {
    var version = mbtiDataCache ? (mbtiDataCache.version || '?') : '?';
    var badge = getLevelBadge();

    var modeContent = currentMode === 'grid' ? buildGrid() : buildAxisSliders();
    var resultHtml = selectedType ? buildResultCard(selectedType) : '<div class="mbti-empty-state">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430</div>';

    container.innerHTML =
      '<div class="mbti-widget">' +
        '<div class="mbti-header">' +
          '<h4 class="mbti-title">MBTI Composer</h4>' +
          '<span class="mbti-level-badge">' + badge + '</span>' +
        '</div>' +
        buildModeToggle() +
        '<div id="mbti-mode-content" role="tabpanel" aria-labelledby="mbti-tab-' + currentMode + '">' + modeContent + '</div>' +
        '<div id="mbti-result">' + resultHtml + '</div>' +
        '<small style="display:block;margin-top:0.5em;color:var(--text-muted);font-size:0.7em;">MBTI v' + version + '</small>' +
      '</div>';

    bindEvents(container);
  }

  function reRender(container) {
    var widgetEl = container.querySelector('.mbti-widget');
    if (!widgetEl) return;

    var version = mbtiDataCache ? (mbtiDataCache.version || '?') : '?';
    var badge = getLevelBadge();
    var modeContent = currentMode === 'grid' ? buildGrid() : buildAxisSliders();
    var resultHtml = selectedType ? buildResultCard(selectedType) : '<div class="mbti-empty-state">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430</div>';

    widgetEl.innerHTML =
      '<div class="mbti-header">' +
        '<h4 class="mbti-title">MBTI Composer</h4>' +
        '<span class="mbti-level-badge">' + badge + '</span>' +
      '</div>' +
      buildModeToggle() +
      '<div id="mbti-mode-content" role="tabpanel" aria-labelledby="mbti-tab-' + currentMode + '">' + modeContent + '</div>' +
      '<div id="mbti-result">' + resultHtml + '</div>' +
      '<small style="display:block;margin-top:0.5em;color:var(--text-muted);font-size:0.7em;">MBTI v' + version + '</small>';

    bindEvents(container);
  }

  function updateResultOnly(container) {
    var resultEl = container.querySelector('#mbti-result');
    if (!resultEl) return;
    var resultHtml = selectedType ? buildResultCard(selectedType) : '<div class="mbti-empty-state">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430</div>';
    resultEl.innerHTML = resultHtml;
    bindResultCardEvents(container);
  }

  // ============================================================================
  // RESULT CARD EVENT BINDING (M2+)
  // ============================================================================

  function bindResultCardEvents(container) {
    if (currentWidgetLevel < 2) return;

    var resultEl = container.querySelector('#mbti-result');
    if (!resultEl) return;

    // OCEAN checkbox toggle
    var oceanCheckbox = resultEl.querySelector('[data-toggle="ocean"]');
    if (oceanCheckbox) {
      oceanCheckbox.addEventListener('change', function() {
        showOceanRef = oceanCheckbox.checked;
        updateResultOnly(container);
      });
    }

    // SPINE checkbox toggle
    var spineCheckbox = resultEl.querySelector('[data-toggle="spine"]');
    if (spineCheckbox) {
      spineCheckbox.addEventListener('change', function() {
        showSpinePatterns = spineCheckbox.checked;
        updateResultOnly(container);
      });
    }

    // OCEAN apply button
    var applyBtn = resultEl.querySelector('.mbti-ocean-apply-btn');
    if (applyBtn) {
      applyBtn.addEventListener('click', function() {
        emitOceanApply();
      });
    }

    // M3: Enneagram checkbox toggle
    var enneagramCheckbox = resultEl.querySelector('[data-toggle="enneagram"]');
    if (enneagramCheckbox) {
      enneagramCheckbox.addEventListener('change', function() {
        showEnneagramLink = enneagramCheckbox.checked;
        updateResultOnly(container);
      });
    }

    // M3: Enneagram link buttons (emit enneagram suggestion event)
    resultEl.querySelectorAll('.mbti-enneagram-link-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var typeId = parseInt(btn.dataset.enneagramEmit, 10);
        if (isNaN(typeId)) return;
        // Optional: emit event that Enneagram Builder can react to
        if (window.EventBus && window.GuideEvents) {
          window.EventBus.emit(window.GuideEvents.ENNEAGRAM_SELECTED, {
            typeId: typeId,
            wings: []
          });
          console.log('[MBTI] Emitted enneagram:selected suggestion for type ' + typeId);
        }
      });
    });

    // M3: Full export button
    var exportBtn = resultEl.querySelector('#mbti-full-export');
    if (exportBtn) {
      exportBtn.addEventListener('click', function() {
        var content = generateFullExport();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(content).then(function() {
            exportBtn.textContent = '✓ Скопировано';
            setTimeout(function() { exportBtn.textContent = 'Экспорт полного профиля'; }, 1500);
          });
        }
      });
    }

    // SPINE copy buttons
    resultEl.querySelectorAll('.mbti-spine-copy-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var field = btn.dataset.spineField;
        var typeCode = btn.dataset.typeCode;
        if (mbtiDataCache && mbtiDataCache.spine_patterns && mbtiDataCache.spine_patterns[typeCode]) {
          var text = mbtiDataCache.spine_patterns[typeCode][field] || '';
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() {
              console.log('[MBTI] Copied SPINE ' + field + ' to clipboard');
            });
          } else {
            console.warn('[MBTI] Clipboard API not available');
          }
        }
      });
    });
  }

  // ============================================================================
  // EVENT BINDING
  // ============================================================================

  function bindEvents(container) {
    // Mode toggle
    container.querySelectorAll('.mbti-mode-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var mode = btn.dataset.mode;
        if (mode === currentMode) return;
        currentMode = mode;
        reRender(container);
      });
    });

    // Grid cell selection
    var modeContent = container.querySelector('#mbti-mode-content');
    if (modeContent && currentMode === 'grid') {
      modeContent.addEventListener('click', function(e) {
        var cell = e.target.closest('.mbti-grid-cell');
        if (!cell) return;
        var typeCode = cell.dataset.type;
        if (!typeCode) return;
        selectType(typeCode);
        reRender(container);
        console.log('[MBTI] Selected type ' + typeCode);
      });

      modeContent.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          var cell = e.target.closest('.mbti-grid-cell');
          if (cell) {
            e.preventDefault();
            cell.click();
          }
        }
      });
    }

    // Axis slider input
    if (modeContent && currentMode === 'sliders') {
      modeContent.querySelectorAll('.mbti-axis-input').forEach(function(slider) {
        slider.addEventListener('input', function() {
          var axisId = slider.dataset.axis;
          var value = parseInt(slider.value, 10);
          axisValues[axisId] = value;

          // Real-time result display
          var typeCode = slidersToTypeCode();
          selectedType = typeCode;

          updateResultOnly(container);
        });
      });

      // On slider change (mouseup), emit event
      modeContent.querySelectorAll('.mbti-axis-input').forEach(function(slider) {
        slider.addEventListener('change', function() {
          var typeCode = slidersToTypeCode();
          selectType(typeCode);
          console.log('[MBTI] Slider selected type ' + typeCode);
        });
      });
    }

    // Result card events (M2+ sections)
    bindResultCardEvents(container);
  }

  // ============================================================================
  // M3: EVENT SUBSCRIPTIONS
  // ============================================================================

  function subscribeOceanUpdates() {
    if (oceanEventSubscribed) return;
    if (!window.EventBus || !window.GuideEvents) return;
    if (currentWidgetLevel < 3) return;

    window.EventBus.on(window.GuideEvents.OCEAN_UPDATED, function(profile) {
      currentOceanProfile = {
        O: profile.O,
        C: profile.C,
        E: profile.E,
        A: profile.A,
        N: profile.N
      };

      // Re-render result card if type selected (to update OCEAN compat)
      if (selectedType) {
        var container = document.getElementById('mbti-embed');
        if (container) {
          updateResultOnly(container);
        }
      }
    });

    oceanEventSubscribed = true;
    console.log('[MBTI] Subscribed to ocean:updated events (M3)');
  }

  function subscribeEnneagramSelected() {
    if (enneagramEventSubscribed) return;
    if (!window.EventBus || !window.GuideEvents) return;
    if (currentWidgetLevel < 3) return;

    window.EventBus.on(window.GuideEvents.ENNEAGRAM_SELECTED, function(data) {
      lastEnneagramType = data.typeId || null;

      // Re-render result card if type selected (to update Enneagram compat)
      if (selectedType) {
        var container = document.getElementById('mbti-embed');
        if (container) {
          updateResultOnly(container);
        }
      }
    });

    enneagramEventSubscribed = true;
    console.log('[MBTI] Subscribed to enneagram:selected events (M3)');
  }

  // ============================================================================
  // M3: FULL EXPORT
  // ============================================================================

  function generateFullExport() {
    if (!selectedType) return '';
    var typeInfo = getTypeInfo(selectedType);
    if (!typeInfo) return '';

    var temp = normalizeTemperament(typeInfo.temperament);
    var tempInfo = getTemperamentInfo(typeInfo.temperament);
    var tempName = tempInfo ? tempInfo.name : TEMPERAMENT_NAMES[temp] || temp;
    var functions = (typeInfo.cognitive_functions || []).join(' → ');

    var lines = [];
    lines.push('**MBTI:** ' + typeInfo.code + ' (' + typeInfo.name + ')');
    lines.push('- Темперамент: ' + temp + ' — ' + tempName);
    if (functions) lines.push('- Когнитивные функции: ' + functions);
    lines.push('- Характеристика: ' + typeInfo.hint);

    // OCEAN suggestions
    if (mbtiDataCache && mbtiDataCache.ocean_suggestions && mbtiDataCache.ocean_suggestions[selectedType]) {
      var s = mbtiDataCache.ocean_suggestions[selectedType];
      lines.push('');
      lines.push('**Рекомендованный OCEAN:** O:' + s.O + ' C:' + s.C + ' E:' + s.E + ' A:' + s.A + ' N:' + s.N);
    }

    // Enneagram suggestions
    if (mbtiDataCache && mbtiDataCache.enneagram_suggestions && mbtiDataCache.enneagram_suggestions[selectedType]) {
      var enneaSugg = mbtiDataCache.enneagram_suggestions[selectedType];
      lines.push('**Вероятные типы Эннеаграммы:** ' + enneaSugg.join(', '));
    }

    // SPINE patterns
    if (mbtiDataCache && mbtiDataCache.spine_patterns && mbtiDataCache.spine_patterns[selectedType]) {
      var patterns = mbtiDataCache.spine_patterns[selectedType];
      lines.push('');
      lines.push('**SPINE:**');
      if (patterns.WANT) lines.push('- WANT: ' + patterns.WANT);
      if (patterns.FLAW) lines.push('- FLAW: ' + patterns.FLAW);
      if (patterns.LIE) lines.push('- LIE: ' + patterns.LIE);
      if (patterns.GHOST) lines.push('- GHOST: ' + patterns.GHOST);
    }

    // OCEAN compatibility
    if (currentOceanProfile && mbtiDataCache && mbtiDataCache.ocean_suggestions && mbtiDataCache.ocean_suggestions[selectedType]) {
      var suggestions = mbtiDataCache.ocean_suggestions[selectedType];
      var totalDist = 0;
      OCEAN_TRAITS.forEach(function(trait) {
        totalDist += Math.abs(currentOceanProfile[trait] - suggestions[trait]);
      });
      var compatPct = Math.round((1 - totalDist / 500) * 100);
      lines.push('');
      lines.push('**Совместимость с OCEAN:** ' + compatPct + '%');
    }

    // Enneagram compatibility (using WidgetUtils.checkMbtiEnneagramCompatibility)
    if (lastEnneagramType && enneagramDataCache) {
      var compatLevel = window.WidgetUtils.checkMbtiEnneagramCompatibility(
        selectedType, lastEnneagramType,
        enneagramDataCache.mbti_suggestions || {},
        mbtiDataCache.enneagram_suggestions || {}
      );
      var compatLabel = compatLevel === 'strong' ? 'Сильная совместимость' : compatLevel === 'partial' ? 'Частичная совместимость' : 'Нетипичное сочетание';
      lines.push('**Совместимость с Эннеаграммой тип ' + lastEnneagramType + ':** ' + compatLabel);
    }

    return lines.join('\n');
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  async function initMBTIComposer() {
    var container = document.getElementById('mbti-embed');

    // Skip init if container missing
    if (!container) {
      return;
    }

    // Check guide layer — widgets only at L2+
    if (typeof window.isWidgetAllowed === 'function' && !window.isWidgetAllowed()) {
      container.innerHTML = '';
      container.style.display = 'none';
      console.log('[MBTI] Widget hidden — L1 guide layer');
      return;
    }

    // Determine widget level
    currentWidgetLevel = (typeof window.getWidgetLevel === 'function') ? window.getWidgetLevel() : 1;

    // Fetch data
    mbtiDataCache = await window.WidgetUtils.fetchJson('data/mbti.json');
    enneagramDataCache = await window.WidgetUtils.fetchJson('data/enneagram.json');
    var mbtiData = mbtiDataCache;
    if (!mbtiData) {
      container.innerHTML = '<div class="mbti-widget"><p class="mbti-empty-state">MBTI \u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B</p></div>';
      return;
    }

    // Build widget
    buildWidget(container);

    // M3: subscribe to events from other widgets
    if (currentWidgetLevel >= 3) {
      subscribeOceanUpdates();
      subscribeEnneagramSelected();
    }

    console.log('[MBTI] Widget initialized at M' + currentWidgetLevel + ' level');
  }

  // ─── Layer Change Handler ────────────────────────────────────────────

  function handleLayerChange() {
    // Re-evaluate widget level on layer change
    var newLevel = (typeof window.getWidgetLevel === 'function') ? window.getWidgetLevel() : 1;
    if (newLevel !== currentWidgetLevel) {
      currentWidgetLevel = newLevel;
      // If upgraded to M3, subscribe to events that weren't available at M2
      if (currentWidgetLevel >= 3) {
        subscribeOceanUpdates();
        subscribeEnneagramSelected();
      }
    }
  }

  // Listen for layer changes
  document.addEventListener('layer-changed', function() {
    handleLayerChange();
  });

  var mbtiLayerObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === 'data-layer') {
        handleLayerChange();
      }
    });
  });
  mbtiLayerObserver.observe(document.body, { attributes: true });

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  window.MBTIComposer = {
    init: initMBTIComposer,
    getSelectedType: function() { return selectedType; },
    getLevel: function() { return currentWidgetLevel; },
    getVersion: function() { return '3.0.0'; }
  };

  // Auto-init after layer content is loaded
  function autoInit() {
    var container = document.getElementById('mbti-embed');
    if (container) {
      initMBTIComposer();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      (window.EventBus && window.EventBus.whenReady ? window.EventBus.whenReady(autoInit) : setTimeout(autoInit, 800));
    });
  } else {
    (window.EventBus && window.EventBus.whenReady ? window.EventBus.whenReady(autoInit) : setTimeout(autoInit, 800));
  }

})();
