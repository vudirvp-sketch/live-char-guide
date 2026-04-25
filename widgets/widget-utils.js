// widget-utils.js — Shared utilities for Live Character Guide widgets
// Must be loaded BEFORE any widget JS file

(function() {
  'use strict';

  // ── OCEAN Constants (DC10: was defined 5×) ──

  const OCEAN_TRAITS = ['O', 'C', 'E', 'A', 'N'];

  const OCEAN_NAMES = {
    O: 'Открытость',
    C: 'Добросовестность',
    E: 'Экстраверсия',
    A: 'Доброжелательность',
    N: 'Нейротизм'
  };

  const OCEAN_NAMES_EN = {
    O: 'Openness',
    C: 'Conscientiousness',
    E: 'Extraversion',
    A: 'Agreeableness',
    N: 'Neuroticism'
  };

  const OCEAN_LABELS_LOW = {
    O: 'Практичный, предпочитает знакомое',
    C: 'Спонтанный, гибкий',
    E: 'Интроверт, предпочитает одиночество',
    A: 'Конкурентный, критичный',
    N: 'Эмоционально стабильный'
  };

  const OCEAN_LABELS_HIGH = {
    O: 'Любопытный, творческий',
    C: 'Организованный, дисциплинированный',
    E: 'Экстраверт, общительный',
    A: 'Доверчивый, альтруистичный',
    N: 'Тревожный, реактивный'
  };

  // ── HTML Escape (DC8: was implemented 4×) ──

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ── Clipboard Fallback (DC9: was implemented 3×) ──

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      return true;
    } catch (e) {
      return false;
    } finally {
      document.body.removeChild(ta);
    }
  }

  // ── JSON Fetch + Cache (DC11: was implemented 7×) ──

  const _cache = new Map();

  async function fetchJson(url) {
    if (_cache.has(url)) return _cache.get(url);
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      _cache.set(url, data);
      return data;
    } catch (e) {
      console.warn(`[WidgetUtils] Failed to fetch ${url}:`, e.message);
      return null;
    }
  }

  // ── OCEAN×Enneagram Conflict Detection (DC6: was implemented 3×) ──

  function checkOceanEnneagramConflicts(oceanProfile, oceanCorrelation, thresholds) {
    const tLow = thresholds?.low ?? 30;
    const tHigh = thresholds?.high ?? 70;
    const conflicts = [];
    const traits = OCEAN_TRAITS;

    traits.forEach((trait, i) => {
      const corr = oceanCorrelation[i];
      const actual = oceanProfile[trait] / 100;
      const expectedPosition = (corr + 1) / 2 * 0.6 + 0.2;
      const deviation = Math.abs(actual - expectedPosition);

      if (deviation > 0.35) {
        const expectedLevel = corr > 0.3 ? 'high' : corr < -0.3 ? 'low' : 'moderate';
        const actualLevel = actual > tHigh / 100 ? 'high' : actual < tLow / 100 ? 'low' : 'moderate';
        conflicts.push({
          trait,
          expected: expectedLevel,
          actual: actualLevel,
          deviation: deviation.toFixed(2),
          message: `${OCEAN_NAMES[trait]}: ожидается ${expectedLevel === 'high' ? 'высокий' : expectedLevel === 'low' ? 'низкий' : 'умеренный'}, фактически ${actualLevel === 'high' ? 'высокий' : actualLevel === 'low' ? 'низкий' : 'умеренный'}`
        });
      }
    });

    return conflicts;
  }

  // ── MBTI×Enneagram Compatibility Check (DC7: was implemented 2×) ──

  function checkMbtiEnneagramCompatibility(mbtiCode, typeId, mbtiSuggestionsData, enneagramSuggestionsData) {
    const enneagramSuggestsMbti = (mbtiSuggestionsData?.[String(typeId)] || []).includes(mbtiCode);
    const mbtiSuggestsEnneagram = (enneagramSuggestionsData?.[mbtiCode] || []).includes(typeId);

    if (enneagramSuggestsMbti && mbtiSuggestsEnneagram) return 'strong';
    if (enneagramSuggestsMbti || mbtiSuggestsEnneagram) return 'partial';
    return 'conflict';
  }

  // ── Enneagram Suggestions from OCEAN traits (migration from A1) ──

  function getEnneagramSuggestionsFromTraits(oceanData) {
    const suggestions = {};
    if (oceanData?.traits) {
      oceanData.traits.forEach(trait => {
        if (trait.enneagram_correlation) {
          suggestions[`${trait.id}_high`] = trait.enneagram_correlation.high;
          suggestions[`${trait.id}_low`] = trait.enneagram_correlation.low;
        }
      });
    }
    return suggestions;
  }

  // ── JSON Structure Validation (fix 6.5) ──

  /**
   * Validate that a JSON data object has all required keys.
   * @param {Object|null} data - Parsed JSON data
   * @param {string[]} requiredKeys - Keys that must exist
   * @param {string} context - Widget name for logging
   * @returns {boolean} true if valid
   */
  function validateData(data, requiredKeys, context) {
    if (!data) {
      console.warn('[' + context + '] Data is null');
      return false;
    }
    var missing = requiredKeys.filter(function(k) { return !(k in data); });
    if (missing.length > 0) {
      console.warn('[' + context + '] Missing keys:', missing.join(', '));
      return false;
    }
    return true;
  }

  // ── Export ──

  window.WidgetUtils = {
    OCEAN_TRAITS,
    OCEAN_NAMES,
    OCEAN_NAMES_EN,
    OCEAN_LABELS_LOW,
    OCEAN_LABELS_HIGH,
    escapeHtml,
    fallbackCopy,
    fetchJson,
    validateData,
    checkOceanEnneagramConflicts,
    checkMbtiEnneagramCompatibility,
    getEnneagramSuggestionsFromTraits
  };

})();
