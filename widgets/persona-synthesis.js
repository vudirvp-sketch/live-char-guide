/**
 * ============================================================================
 * PERSONA SYNTHESIS DASHBOARD — L3 Aggregator v1.0.0
 * ============================================================================
 *
 * Unified aggregation dashboard for all three psychological tools.
 * Only rendered at L3 guide layer. Subscribes to all events on the bus,
 * builds a conflict map, generates unified narrative, exports Character Card.
 *
 * Architecture (§4.4):
 * - L1/L2 guide: Absent (not rendered)
 * - L3 guide: Active, subscribed to all events
 *
 * Event Subscriptions (§2.2):
 *   ocean:updated       — { O, C, E, A, N } from OCEAN Insight
 *   enneagram:selected  — { typeId, wings } from Enneagram Builder
 *   mbti:selected       — { typeCode, temperament } from MBTI Composer
 *
 * Event Emission (§2.1):
 *   synthesis:exported  — { format, content } on Character Card export
 *
 * Data Sources (§0.5 Single Data Owner):
 *   enneagram.json — ocean_correlation, ocean_defaults, spine_templates, mbti_suggestions
 *   mbti.json      — ocean_suggestions, enneagram_suggestions, spine_patterns
 *   ocean.json     — traits[], extremum_thresholds
 *
 * @version 1.0.0
 */

(function() {
  'use strict';

  // ─── Constants ───────────────────────────────────────────────────────
  // OCEAN constants provided by WidgetUtils
  const OCEAN_TRAITS = window.WidgetUtils.OCEAN_TRAITS;
  const OCEAN_LABELS = window.WidgetUtils.OCEAN_NAMES;

  // ─── State ───────────────────────────────────────────────────────────
  const synthesisState = {
    ocean: null,       // { O, C, E, A, N } numbers 0-100
    enneagram: null,   // { typeId, wings }
    mbti: null         // { typeCode, temperament }
  };

  // Data caches
  let enneagramDataCache = null;
  let mbtiDataCache = null;
  let oceanDataCache = null;

  // Container reference
  let dashboardEl = null;

  // ─── Data Fetching ───────────────────────────────────────────────────

  // Data fetching delegated to WidgetUtils.fetchJson
  // Local caches are still populated for direct access

  // ─── Layer Check ─────────────────────────────────────────────────────

  function getGuideLayer() {
    return parseInt(document.body.getAttribute('data-layer') || '2', 10);
  }

  function isActive() {
    return getGuideLayer() >= 3;
  }

  // ─── Conflict Detection (§5.1) ──────────────────────────────────────

  /**
   * OCEAN x Enneagram conflict detection — delegated to WidgetUtils
   */
  function checkOceanEnneagramConflicts(oceanProfile, enneagramTypeId) {
    if (!enneagramDataCache || !oceanProfile || !enneagramTypeId) return [];
    const type = enneagramDataCache.types.find(function(t) { return t.id === enneagramTypeId; });
    if (!type || !type.ocean_correlation) return [];
    return window.WidgetUtils.checkOceanEnneagramConflicts(oceanProfile, type.ocean_correlation);
  }

  /**
   * MBTI x Enneagram compatibility check — delegated to WidgetUtils
   */
  function checkMbtiEnneagramCompatibility(mbtiCode, enneagramTypeId) {
    if (!mbtiCode || !enneagramTypeId) return null;
    return window.WidgetUtils.checkMbtiEnneagramCompatibility(
      mbtiCode, enneagramTypeId,
      enneagramDataCache?.mbti_suggestions,
      mbtiDataCache?.enneagram_suggestions
    );
  }

  // ─── Narrative Generation (§4.4) ─────────────────────────────────────

  /**
   * Generate unified SPINE narrative combining all three systems.
   * Base: enneagram.json.spine_templates
   * Enrich: mbti.json.spine_patterns
   * Adjust: OCEAN profile vocabulary
   */
  function generateNarrative() {
    if (!synthesisState.enneagram) return null;

    var typeId = String(synthesisState.enneagram.typeId);
    var narrative = {};

    // Base SPINE from Enneagram
    if (enneagramDataCache && enneagramDataCache.spine_templates && enneagramDataCache.spine_templates[typeId]) {
      var template = enneagramDataCache.spine_templates[typeId];
      narrative.WANT = template.WANT || '';
      narrative.NEED = template.NEED || '';
      narrative.FLAW = template.FLAW || '';
      narrative.LIE = template.LIE || '';
      narrative.GHOST = template.GHOST || '';
    }

    // Enrich with MBTI patterns
    if (synthesisState.mbti && mbtiDataCache && mbtiDataCache.spine_patterns) {
      var mbtiCode = synthesisState.mbti.typeCode;
      var patterns = mbtiDataCache.spine_patterns[mbtiCode];
      if (patterns) {
        // If MBTI provides additional nuance, append as secondary line
        if (patterns.WANT && narrative.WANT && patterns.WANT !== narrative.WANT) {
          narrative.WANT_MBTI = patterns.WANT;
        }
        if (patterns.FLAW && narrative.FLAW && patterns.FLAW !== narrative.FLAW) {
          narrative.FLAW_MBTI = patterns.FLAW;
        }
        if (patterns.LIE && (!narrative.LIE || patterns.LIE !== narrative.LIE)) {
          narrative.LIE_MBTI = patterns.LIE;
        }
        if (patterns.GHOST && (!narrative.GHOST || patterns.GHOST !== narrative.GHOST)) {
          narrative.GHOST_MBTI = patterns.GHOST;
        }
      }
    }

    // OCEAN vocabulary adjustment
    if (synthesisState.ocean) {
      narrative.ocean_vocab = getOceanVocabulary(synthesisState.ocean);
    }

    return narrative;
  }

  /**
   * Get vocabulary modifiers based on OCEAN profile
   */
  function getOceanVocabulary(profile) {
    var vocab = {};
    if (profile.N >= 70) vocab.emotional_tone = '\u044d\u043c\u043e\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e \u0440\u0435\u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0439';
    else if (profile.N <= 30) vocab.emotional_tone = '\u0441\u043f\u043e\u043a\u043e\u0439\u043d\u044b\u0439, \u0443\u0441\u0442\u043e\u0439\u0447\u0438\u0432\u044b\u0439';
    else vocab.emotional_tone = '\u0443\u043c\u0435\u0440\u0435\u043d\u043d\u043e \u044d\u043c\u043e\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439';

    if (profile.E >= 70) vocab.social_style = '\u043e\u0431\u0449\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439, \u044d\u043a\u0441\u0442\u0440\u0430\u0432\u0435\u0440\u0442\u043d\u044b\u0439';
    else if (profile.E <= 30) vocab.social_style = '\u0438\u043d\u0442\u0440\u043e\u0432\u0435\u0440\u0442\u043d\u044b\u0439, \u0441\u0434\u0435\u0440\u0436\u0430\u043d\u043d\u044b\u0439';
    else vocab.social_style = '\u0430\u043c\u0431\u0438\u0432\u0435\u0440\u0442\u043d\u044b\u0439';

    if (profile.O >= 70) vocab.cognitive_style = '\u0442\u0432\u043e\u0440\u0447\u0435\u0441\u043a\u0438\u0439, \u043b\u044e\u0431\u043e\u043f\u044b\u0442\u043d\u044b\u0439';
    else if (profile.O <= 30) vocab.cognitive_style = '\u043f\u0440\u0430\u043a\u0442\u0438\u0447\u043d\u044b\u0439, \u043a\u043e\u043d\u0441\u0435\u0440\u0432\u0430\u0442\u0438\u0432\u043d\u044b\u0439';
    else vocab.cognitive_style = '\u0443\u043c\u0435\u0440\u0435\u043d\u043d\u043e \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0439';

    return vocab;
  }

  // ─── Character Card Export (§4.4) ─────────────────────────────────────

  function generateCharacterCard() {
    var lines = [];
    lines.push('# Character Profile');
    lines.push('');

    // OCEAN Section
    if (synthesisState.ocean) {
      lines.push('## \u041f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c');
      lines.push('');
      lines.push('### OCEAN');
      OCEAN_TRAITS.forEach(function(trait) {
        var val = synthesisState.ocean[trait];
        var label = val > 70 ? '\u0432\u044b\u0441\u043e\u043a\u0438\u0439' : val < 30 ? '\u043d\u0438\u0437\u043a\u0438\u0439' : '\u0443\u043c\u0435\u0440\u0435\u043d\u043d\u044b\u0439';
        var desc = getOceanTraitDescription(trait, val);
        lines.push('- ' + OCEAN_LABELS[trait] + ' (' + trait + '): ' + val + ' (' + label + ') \u2014 ' + desc);
      });
      lines.push('');
    }

    // Enneagram Section
    if (synthesisState.enneagram && enneagramDataCache) {
      var typeId = synthesisState.enneagram.typeId;
      var typeObj = enneagramDataCache.types.find(function(t) { return t.id === typeId; });
      var wingStr = synthesisState.enneagram.wings && synthesisState.enneagram.wings.length > 0 ? 'w' + synthesisState.enneagram.wings[0] : '';
      lines.push('### Enneagram: ' + typeId + wingStr + (typeObj ? ' (' + typeObj.name + ')' : ''));
      var narrative = generateNarrative();
      if (narrative) {
        if (narrative.WANT) lines.push('- WANT: ' + narrative.WANT);
        if (narrative.NEED) lines.push('- NEED: ' + narrative.NEED);
        if (narrative.FLAW) lines.push('- FLAW: ' + narrative.FLAW);
        if (narrative.LIE) lines.push('- LIE: ' + narrative.LIE);
        if (narrative.GHOST) lines.push('- GHOST: ' + narrative.GHOST);
        if (narrative.WANT_MBTI) lines.push('- WANT (MBTI): ' + narrative.WANT_MBTI);
        if (narrative.FLAW_MBTI) lines.push('- FLAW (MBTI): ' + narrative.FLAW_MBTI);
        if (narrative.LIE_MBTI) lines.push('- LIE (MBTI): ' + narrative.LIE_MBTI);
        if (narrative.GHOST_MBTI) lines.push('- GHOST (MBTI): ' + narrative.GHOST_MBTI);
      }
      lines.push('');
    }

    // MBTI Section
    if (synthesisState.mbti && mbtiDataCache) {
      var mbtiCode = synthesisState.mbti.typeCode;
      var mbtiType = mbtiDataCache.types.find(function(t) { return t.code === mbtiCode; });
      lines.push('### MBTI: ' + mbtiCode + (mbtiType ? ' (' + mbtiType.name + ')' : ''));
      lines.push('- \u0422\u0435\u043c\u043f\u0435\u0440\u0430\u043c\u0435\u043d\u0442: ' + (mbtiType ? mbtiType.temperament : synthesisState.mbti.temperament));
      if (mbtiType && mbtiType.cognitive_functions) {
        lines.push('- \u0424\u0443\u043d\u043a\u0446\u0438\u0438: ' + mbtiType.cognitive_functions);
      }
      lines.push('');
    }

    // Conflicts Section
    var conflicts = [];
    if (synthesisState.ocean && synthesisState.enneagram) {
      conflicts = conflicts.concat(checkOceanEnneagramConflicts(synthesisState.ocean, synthesisState.enneagram.typeId));
    }
    var mbtiEnneagramCompat = null;
    if (synthesisState.mbti && synthesisState.enneagram) {
      mbtiEnneagramCompat = checkMbtiEnneagramCompatibility(synthesisState.mbti.typeCode, synthesisState.enneagram.typeId);
    }

    lines.push('## \u041a\u043e\u043d\u0444\u043b\u0438\u043a\u0442\u044b \u0438 \u043d\u0430\u043f\u0440\u044f\u0436\u0435\u043d\u0438\u044f');
    lines.push('');

    if (synthesisState.ocean && synthesisState.enneagram) {
      if (conflicts.length === 0) {
        lines.push('- OCEAN\u00d7Enneagram: \u0421\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 (\u0431\u0435\u0437 \u0437\u043d\u0430\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0440\u0430\u0441\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u0439)');
      } else {
        conflicts.forEach(function(c) {
          lines.push('- OCEAN\u00d7Enneagram: ' + c.message);
        });
      }
    }

    if (mbtiEnneagramCompat) {
      var compatLabels = { strong: '\u0441\u0438\u043b\u044c\u043d\u043e\u0435 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435', partial: '\u0447\u0430\u0441\u0442\u0438\u0447\u043d\u043e\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0435\u043d\u0438\u0435', conflict: '\u0440\u0430\u0441\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u0435' };
      if (synthesisState.mbti && synthesisState.enneagram) {
        lines.push('- MBTI\u00d7Enneagram: ' + synthesisState.mbti.typeCode + '\u00d7' + synthesisState.enneagram.typeId + ' \u2014 ' + compatLabels[mbtiEnneagramCompat]);
      }
    }

    lines.push('');

    // Recommendation
    if (conflicts.length === 0 && mbtiEnneagramCompat === 'strong') {
      lines.push('\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u044f: \u041f\u0440\u043e\u0444\u0438\u043b\u044c \u043a\u043e\u043d\u0441\u0438\u0441\u0442\u0435\u043d\u0442\u0435\u043d, \u043c\u043e\u0436\u043d\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043a\u0430\u043a \u043e\u0441\u043d\u043e\u0432\u0443');
    } else if (conflicts.length > 0 || mbtiEnneagramCompat === 'conflict') {
      lines.push('\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u044f: \u0415\u0441\u0442\u044c \u043d\u0430\u043f\u0440\u044f\u0436\u0435\u043d\u0438\u044f \u2014 \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435, \u043e\u0441\u043e\u0437\u043d\u0430\u043d\u043d\u044b\u0439 \u043b\u0438 \u043a\u043e\u043d\u0444\u043b\u0438\u043a\u0442');
    } else {
      lines.push('\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u044f: \u041f\u0440\u043e\u0444\u0438\u043b\u044c \u0432 \u0446\u0435\u043b\u043e\u043c \u0441\u043e\u0433\u043b\u0430\u0441\u043e\u0432\u0430\u043d, \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u044b \u0442\u043e\u043d\u043a\u0438\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0438');
    }

    return lines.join('\n');
  }

  function getOceanTraitDescription(trait, value) {
    if (!oceanDataCache || !oceanDataCache.traits) return '';
    var traitObj = oceanDataCache.traits.find(function(t) { return t.id === trait; });
    if (!traitObj) return '';
    if (value >= 70 && traitObj.high) return traitObj.high.label || traitObj.high;
    if (value <= 30 && traitObj.low) return traitObj.low.label || traitObj.low;
    return '\u0443\u043c\u0435\u0440\u0435\u043d\u043d\u044b\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c';
  }

  // ─── Rendering ───────────────────────────────────────────────────────

  function updateDashboard() {
    if (!dashboardEl || !isActive()) return;

    var html = '';

    // Header
    html += '<div class="synthesis-header">';
    html += '<h3>\u041f\u0435\u0440\u0441\u043e\u043d\u0430 \u0421\u0438\u043d\u0442\u0435\u0437</h3>';
    html += '<span class="synthesis-level-badge">L3</span>';
    html += '</div>';

    // Status Bar — what data we have
    html += '<div class="synthesis-status-bar">';
    html += buildStatusChip('OCEAN', synthesisState.ocean !== null);
    html += buildStatusChip('Enneagram', synthesisState.enneagram !== null);
    html += buildStatusChip('MBTI', synthesisState.mbti !== null);
    html += '</div>';

    // Waiting state — if not all data present
    if (!synthesisState.ocean && !synthesisState.enneagram && !synthesisState.mbti) {
      html += '<div class="synthesis-waiting">';
      html += '<p>\u041e\u0436\u0438\u0434\u0430\u043d\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0445\u2026</p>';
      html += '<p class="synthesis-waiting-hint">\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0432\u0438\u0434\u0436\u0435\u0442\u044b OCEAN, Enneagram \u0438 MBTI \u0434\u043b\u044f \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u043f\u0440\u043e\u0444\u0438\u043b\u044f</p>';
      html += '</div>';
    } else {
      // Conflict Map
      html += buildConflictMap();

      // Narrative Preview
      html += buildNarrativePreview();

      // Character Card Export
      html += buildExportSection();
    }

    dashboardEl.innerHTML = html;
    bindExportButton();
  }

  function buildStatusChip(label, active) {
    return '<span class="synthesis-status-chip ' + (active ? 'active' : 'inactive') + '">' +
           (active ? '\u2713' : '\u25cb') + ' ' + label + '</span>';
  }

  function buildConflictMap() {
    var html = '<div class="synthesis-conflict-map">';
    html += '<h4>\u041a\u0430\u0440\u0442\u0430 \u043a\u043e\u043d\u0444\u043b\u0438\u043a\u0442\u043e\u0432</h4>';

    // OCEAN x Enneagram
    if (synthesisState.ocean && synthesisState.enneagram) {
      var conflicts = checkOceanEnneagramConflicts(synthesisState.ocean, synthesisState.enneagram.typeId);
      html += '<div class="synthesis-conflict-group">';
      html += '<div class="synthesis-conflict-title">OCEAN \u00d7 Enneagram</div>';
      if (conflicts.length === 0) {
        html += '<div class="synthesis-conflict-item compat-yes">\u0421\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442</div>';
      } else {
        conflicts.forEach(function(c) {
          html += '<div class="synthesis-conflict-item compat-conflict">';
          html += '<span class="conflict-warning-icon">\u26a0\ufe0f</span> ' + c.message;
          html += '</div>';
        });
      }
      html += '</div>';
    } else if (synthesisState.ocean || synthesisState.enneagram) {
      html += '<div class="synthesis-conflict-group">';
      html += '<div class="synthesis-conflict-title">OCEAN \u00d7 Enneagram</div>';
      html += '<div class="synthesis-conflict-item compat-partial">\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445</div>';
      html += '</div>';
    }

    // MBTI x Enneagram
    if (synthesisState.mbti && synthesisState.enneagram) {
      var compat = checkMbtiEnneagramCompatibility(synthesisState.mbti.typeCode, synthesisState.enneagram.typeId);
      var compatLabels = { strong: '\u0421\u0438\u043b\u044c\u043d\u043e\u0435 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435', partial: '\u0427\u0430\u0441\u0442\u0438\u0447\u043d\u043e\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0435\u043d\u0438\u0435', conflict: '\u0420\u0430\u0441\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u0435' };
      var compatClass = compat === 'strong' ? 'compat-yes' : compat === 'partial' ? 'compat-partial' : 'compat-conflict';
      html += '<div class="synthesis-conflict-group">';
      html += '<div class="synthesis-conflict-title">MBTI \u00d7 Enneagram</div>';
      html += '<div class="synthesis-conflict-item ' + compatClass + '">' + synthesisState.mbti.typeCode + ' \u00d7 \u0422\u0438\u043f ' + synthesisState.enneagram.typeId + ': ' + compatLabels[compat] + '</div>';
      html += '</div>';
    } else if (synthesisState.mbti || synthesisState.enneagram) {
      html += '<div class="synthesis-conflict-group">';
      html += '<div class="synthesis-conflict-title">MBTI \u00d7 Enneagram</div>';
      html += '<div class="synthesis-conflict-item compat-partial">\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445</div>';
      html += '</div>';
    }

    // OCEAN x MBTI
    if (synthesisState.ocean && synthesisState.mbti && mbtiDataCache && mbtiDataCache.ocean_suggestions) {
      var mbtiSuggestions = mbtiDataCache.ocean_suggestions[synthesisState.mbti.typeCode];
      if (mbtiSuggestions) {
        html += '<div class="synthesis-conflict-group">';
        html += '<div class="synthesis-conflict-title">OCEAN \u00d7 MBTI</div>';
        var traitConflits = 0;
        OCEAN_TRAITS.forEach(function(trait) {
          var actual = synthesisState.ocean[trait];
          var expected = mbtiSuggestions[trait];
          if (expected !== undefined) {
            var diff = Math.abs(actual - expected);
            if (diff > 30) traitConflits++;
          }
        });
        if (traitConflits === 0) {
          html += '<div class="synthesis-conflict-item compat-yes">\u0421\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442</div>';
        } else {
          html += '<div class="synthesis-conflict-item compat-partial">' + traitConflits + ' \u0442\u0440\u0435\u0439\u0442(\u043e\u0432) \u0441 \u0440\u0430\u0441\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u0435\u043c >30</div>';
        }
        html += '</div>';
      }
    }

    html += '</div>';
    return html;
  }

  function buildNarrativePreview() {
    var narrative = generateNarrative();
    if (!narrative) return '';

    var html = '<div class="synthesis-narrative">';
    html += '<h4>\u0415\u0434\u0438\u043d\u044b\u0439 \u043d\u0430\u0440\u0440\u0430\u0442\u0438\u0432 (SPINE)</h4>';

    var fields = [
      { key: 'WANT', label: 'WANT', cssClass: 'label-WANT' },
      { key: 'NEED', label: 'NEED', cssClass: 'label-NEED' },
      { key: 'FLAW', label: 'FLAW', cssClass: 'label-FLAW' },
      { key: 'LIE', label: 'LIE', cssClass: 'label-LIE' },
      { key: 'GHOST', label: 'GHOST', cssClass: 'label-GHOST' },
      { key: 'WANT_MBTI', label: 'WANT (MBTI)', cssClass: 'label-WANT' },
      { key: 'FLAW_MBTI', label: 'FLAW (MBTI)', cssClass: 'label-FLAW' },
      { key: 'LIE_MBTI', label: 'LIE (MBTI)', cssClass: 'label-LIE' },
      { key: 'GHOST_MBTI', label: 'GHOST (MBTI)', cssClass: 'label-GHOST' }
    ];

    fields.forEach(function(f) {
      if (narrative[f.key]) {
        html += '<div class="synthesis-narrative-field">';
        html += '<span class="mbti-spine-field-label ' + f.cssClass + '">' + f.label + '</span>';
        html += '<span class="synthesis-narrative-value">' + narrative[f.key] + '</span>';
        html += '</div>';
      }
    });

    // OCEAN vocabulary
    if (narrative.ocean_vocab) {
      html += '<div class="synthesis-vocab">';
      html += '<div class="synthesis-vocab-title">OCEAN-\u0432\u043e\u043a\u0430\u0431\u0443\u043b\u044f\u0440</div>';
      var vocabEntries = Object.entries(narrative.ocean_vocab);
      vocabEntries.forEach(function(entry) {
        html += '<div class="synthesis-vocab-entry"><span class="synthesis-vocab-key">' + entry[0] + ':</span> ' + entry[1] + '</div>';
      });
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  function buildExportSection() {
    var html = '<div class="synthesis-export">';
    html += '<h4>\u042d\u043a\u0441\u043f\u043e\u0440\u0442 Character Card</h4>';

    // Preview
    var card = generateCharacterCard();
    var previewLines = card.split('\n').slice(0, 10);
    html += '<div class="synthesis-export-preview"><pre>' + window.WidgetUtils.escapeHtml(previewLines.join('\n')) + '\n\u2026</pre></div>';

    // Export buttons
    html += '<div class="synthesis-export-actions">';
    html += '<button class="synthesis-export-btn" data-format="markdown">\u042d\u043a\u0441\u043f\u043e\u0440\u0442 Markdown</button>';
    html += '<button class="synthesis-export-btn" data-format="json">\u042d\u043a\u0441\u043f\u043e\u0440\u0442 JSON</button>';
    html += '<button class="synthesis-export-btn synthesis-copy-btn" data-format="clipboard">\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c</button>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  // escapeHtml provided by WidgetUtils

  function bindExportButton() {
    if (!dashboardEl) return;
    var btns = dashboardEl.querySelectorAll('.synthesis-export-btn, .synthesis-copy-btn');
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var format = btn.getAttribute('data-format');
        var content = '';

        if (format === 'markdown' || format === 'clipboard') {
          content = generateCharacterCard();
        } else if (format === 'json') {
          var jsonData = {
            ocean: synthesisState.ocean,
            enneagram: synthesisState.enneagram,
            mbti: synthesisState.mbti,
            conflicts: (synthesisState.ocean && synthesisState.enneagram) ?
              checkOceanEnneagramConflicts(synthesisState.ocean, synthesisState.enneagram.typeId) : [],
            narrative: generateNarrative()
          };
          content = JSON.stringify(jsonData, null, 2);
        }

        if (format === 'clipboard') {
          navigator.clipboard.writeText(content).then(function() {
            btn.textContent = '\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e!';
            setTimeout(function() { btn.textContent = '\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c'; }, 1500);
          }).catch(function() {
            // Fallback for older browsers
            window.WidgetUtils.fallbackCopy(content);
          });
        } else {
          // Download file
          var blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/markdown' });
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'character-card.' + (format === 'json' ? 'json' : 'md');
          a.click();
          setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
        }

        // Emit synthesis:exported event (§2.1)
        if (window.EventBus && window.GuideEvents) {
          window.EventBus.emit(window.GuideEvents.SYNTHESIS_EXPORTED, {
            format: format,
            content: content
          });
        }
      });
    });
  }

  // ─── Event Subscriptions (§2.2) ──────────────────────────────────────

  function subscribeToEvents() {
    if (!window.EventBus || !window.GuideEvents) return;

    window.EventBus.on(window.GuideEvents.OCEAN_UPDATED, function(profile) {
      synthesisState.ocean = profile;
      updateDashboard();
    });

    window.EventBus.on(window.GuideEvents.ENNEAGRAM_SELECTED, function(data) {
      synthesisState.enneagram = data;
      updateDashboard();
    });

    window.EventBus.on(window.GuideEvents.MBTI_SELECTED, function(data) {
      synthesisState.mbti = data;
      updateDashboard();
    });
  }

  // ─── State Reconciliation ─────────────────────────────────────────────

  function reconcileState() {
    // Read current state from widget public APIs + EventBus last-value cache
    // This handles the race condition where widgets emit events before
    // PersonaSynthesis subscribes

    // OCEAN: check EventBus cache first, then widget API
    if (!synthesisState.ocean) {
      if (window.EventBus && typeof window.EventBus.getLast === 'function') {
        var cachedOcean = window.EventBus.getLast(window.GuideEvents.OCEAN_UPDATED);
        if (cachedOcean && typeof cachedOcean.O === 'number') {
          synthesisState.ocean = cachedOcean;
        }
      }
      if (!synthesisState.ocean && window.OceanInsight && typeof window.OceanInsight.getProfile === 'function') {
        var profile = window.OceanInsight.getProfile();
        if (profile && (profile.O + profile.C + profile.E + profile.A + profile.N) > 0) {
          synthesisState.ocean = profile;
        }
      }
    }

    // MBTI: check EventBus cache first, then widget API
    if (!synthesisState.mbti) {
      if (window.EventBus && typeof window.EventBus.getLast === 'function') {
        var cachedMbti = window.EventBus.getLast(window.GuideEvents.MBTI_SELECTED);
        if (cachedMbti && cachedMbti.typeCode) {
          synthesisState.mbti = cachedMbti;
        }
      }
      if (!synthesisState.mbti && window.MBTIComposer && typeof window.MBTIComposer.getSelectedType === 'function') {
        var mbtiType = window.MBTIComposer.getSelectedType();
        if (mbtiType) {
          synthesisState.mbti = { typeCode: mbtiType, temperament: '' };
        }
      }
    }

    // Enneagram: check EventBus cache first, then widget API
    if (!synthesisState.enneagram) {
      if (window.EventBus && typeof window.EventBus.getLast === 'function') {
        var cachedEnneagram = window.EventBus.getLast(window.GuideEvents.ENNEAGRAM_SELECTED);
        if (cachedEnneagram && cachedEnneagram.typeId) {
          synthesisState.enneagram = cachedEnneagram;
        }
      }
      if (!synthesisState.enneagram && window.EnneagramBuilder && typeof window.EnneagramBuilder.getSelectedType === 'function') {
        var enneagramType = window.EnneagramBuilder.getSelectedType();
        if (enneagramType) {
          synthesisState.enneagram = { typeId: enneagramType, wings: [] };
        }
      }
    }
  }

  // ─── Initialization ──────────────────────────────────────────────────

  async function init() {
    if (!isActive()) {
      console.log('[PersonaSynthesis] Skipped: layer < 3');
      return;
    }

    // Create container if not exists
    dashboardEl = document.getElementById('persona-synthesis');
    if (!dashboardEl) {
      dashboardEl = document.createElement('div');
      dashboardEl.id = 'persona-synthesis';
      dashboardEl.className = 'persona-synthesis-widget';

      // Insert after the last widget section
      var content = document.getElementById('content');
      if (content) {
        content.appendChild(dashboardEl);
      } else {
        document.body.appendChild(dashboardEl);
      }
    }

    // Fetch all data in parallel using WidgetUtils.fetchJson
    enneagramDataCache = await window.WidgetUtils.fetchJson('data/enneagram.json');
    mbtiDataCache = await window.WidgetUtils.fetchJson('data/mbti.json');
    oceanDataCache = await window.WidgetUtils.fetchJson('data/ocean.json');

    // Subscribe to events (with last-value replay from EventBus v2)
    subscribeToEvents();

    // State reconciliation: read current state from already-initialized widgets
    // This ensures PersonaSynthesis sees OCEAN/Enneagram/MBTI even if
    // they were set before this widget initialized
    reconcileState();

    // Initial render
    updateDashboard();

    console.log('[PersonaSynthesis] Initialized (L3)');
  }

  // ─── Layer Change Handler ────────────────────────────────────────────

  function handleLayerChange() {
    if (isActive()) {
      if (!dashboardEl) {
        init();
      } else {
        dashboardEl.style.display = '';
        // Re-reconcile state when becoming visible (widgets may have been updated)
        reconcileState();
        updateDashboard();
      }
    } else {
      if (dashboardEl) {
        dashboardEl.style.display = 'none';
      }
    }
  }

  // Listen for layer changes
  document.addEventListener('layer-changed', function() {
    handleLayerChange();
  });

  // Also observe data-layer attribute changes on body
  var layerObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === 'data-layer') {
        handleLayerChange();
      }
    });
  });
  layerObserver.observe(document.body, { attributes: true });

  // ─── Auto-init ───────────────────────────────────────────────────────

  function autoInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(init, 800);
      });
    } else {
      setTimeout(init, 800);
    }
  }

  // Expose public API
  window.PersonaSynthesis = {
    init: init,
    get state() { return Object.assign({}, synthesisState); },
    getNarrative: generateNarrative,
    getCharacterCard: generateCharacterCard,
    getConflicts: function() {
      var conflicts = [];
      if (synthesisState.ocean && synthesisState.enneagram) {
        conflicts = conflicts.concat(checkOceanEnneagramConflicts(synthesisState.ocean, synthesisState.enneagram.typeId));
      }
      return conflicts;
    },
    getMbtiEnneagramCompat: function() {
      if (synthesisState.mbti && synthesisState.enneagram) {
        return checkMbtiEnneagramCompatibility(synthesisState.mbti.typeCode, synthesisState.enneagram.typeId);
      }
      return null;
    }
  };

  autoInit();

})();
