/**
 * ============================================================================
 * PERSONA-VOICE-HIERARCHY — Voice Influence Hierarchy Interactive Widget
 * ============================================================================
 *
 * Interactive companion to the static E07 visual and §3.2 percentage table.
 * Renders a model-tier toggle (12B / 32B+ / API), hover-syncs the §3.2 table
 * rows with the E07 SVG bars, and exports a Markdown voice_sources block.
 *
 * Contract (§0.8):
 * - Input: <div id="persona-voice-hierarchy" data-model="12B"
 *           data-source-table="p3_influence_hierarchy"> placeholder in
 *           src/master/part_03.html (inside section p3_influence_hierarchy).
 * - Output: toggle toolbar + dynamic readout + export button.
 * - Side effect: adds `.vh-active-model` class to the corresponding <th> and
 *   <td> cells of the sibling <table> so the existing static table visually
 *   reflects the selected model tier.
 * - Side effect: on row hover, highlights the matching SVG bar group via the
 *   `data-vh-source` attribute on each <tr> (added at init).
 * - Event bus: dispatches `persona-voice-hierarchy://model-change` with
 *   `{ model: '12B'|'32B+'|'API' }` and `persona-voice-hierarchy://export`
 *   with `{ format: 'markdown', content }`.
 * - Fallback: if no placeholder container is present, init is a no-op.
 * - Data: hardcoded from canon part_03.md §3.2 table (6 sources × 3 models).
 *   Not extracted to data/*.json because the values are canonical prose,
 *   not user-editable widget data.
 *
 * @version 9.2.6
 */

(function() {
  'use strict';

  // ========================================================================
  // CANON DATA — sourced from docs/canon/part_03.md §3.2 table
  // Do NOT edit these values without updating the canon table first.
  // ========================================================================
  const VOICE_SOURCES = [
    { id: 'recent_chat',  label: 'Recent chat',   models: { '12B': 85, '32B+': 80, 'API': 75 }, note: 'Самый сильный фактор на любой модели — модель копирует последние ~10–20 сообщений.' },
    { id: 'examples',     label: 'Examples',      models: { '12B': 10, '32B+': 12, 'API': 15 }, note: 'Voice-маркеры копируются из <START>-блоков. Качество Examples > количество.' },
    { id: 'greeting',     label: 'Greeting',      models: { '12B': 3,  '32B+': 5,  'API': 5  }, note: 'Задаёт стартовый тон; влияние падает после ~5 реплик.' },
    { id: 'authors_note', label: "Author's Note", models: { '12B': 2,  '32B+': 3,  'API': 5  }, note: 'На 12B AN не влияет на лингвистический голос (см. §7A.7).' },
    { id: 'description',  label: 'Description',   models: { '12B': 0,  '32B+': 3,  'API': 5  }, note: '12B: 0% — ЗАПРЕЩЕНО. Стилистические директивы в Description — ошибка сборки.' },
    { id: 'system_prompt',label: 'System Prompt', models: { '12B': 0,  '32B+': 1,  'API': 2  }, note: 'На 12B лингвистические директивы в SP игнорируются; работают только CORE DIRECTIVES.' }
  ];

  const MODELS = ['12B', '32B+', 'API'];

  // ========================================================================
  // STATE
  // ========================================================================
  let activeModel = '12B';
  let containerEl = null;
  let sourceTableEl = null;
  let isInitialized = false;

  // ========================================================================
  // HELPERS
  // ========================================================================

  /**
   * Locate the sibling <table> inside the same <section> as the widget
   * container. Falls back to any table inside #p3_influence_hierarchy.
   */
  function findSourceTable() {
    const section = containerEl.closest('section[data-section="p3_influence_hierarchy"]');
    if (!section) return null;
    return section.querySelector('table');
  }

  /**
   * Tag each <tr> in the source table with data-vh-source so we can
   * hover-sync between the table and the widget's own UI.
   */
  function annotateSourceTable() {
    if (!sourceTableEl) return;
    const rows = sourceTableEl.querySelectorAll('tbody tr');
    rows.forEach((row, idx) => {
      const source = VOICE_SOURCES[idx];
      if (!source) return;
      row.setAttribute('data-vh-source', source.id);
      row.setAttribute('data-vh-label', source.label);
    });
  }

  /**
   * Update the source table's <th> and <td> classes to reflect the
   * active model tier. The first <th> column (Source label) is skipped.
   */
  function syncSourceTableModel() {
    if (!sourceTableEl) return;
    const headers = sourceTableEl.querySelectorAll('thead th');
    MODELS.forEach((m, idx) => {
      const header = headers[idx + 1];
      if (!header) return;
      header.classList.toggle('vh-active-model', m === activeModel);
    });
    // No need to toggle <td> classes — column highlight is handled by
    // CSS :nth-child based on .vh-active-model on <th>. But we add a
    // data attribute to <table> so CSS can target the right column.
    sourceTableEl.setAttribute('data-vh-model', activeModel);
  }

  /**
   * Escape text for safe HTML insertion.
   */
  function esc(text) {
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * Render the widget UI into the container.
   */
  function render() {
    const total = VOICE_SOURCES.reduce((sum, s) => sum + (s.models[activeModel] || 0), 0);
    const forbiddenSource = VOICE_SOURCES.find(s => s.models[activeModel] === 0 && s.id === 'description');

    const toggleHtml = MODELS.map(m => {
      const isActive = m === activeModel;
      return `<button type="button" class="vh-toggle-btn${isActive ? ' vh-toggle-btn--active' : ''}" data-model="${esc(m)}" aria-pressed="${isActive ? 'true' : 'false'}" aria-label="Показать влияние для модели ${esc(m)}">${esc(m)}</button>`;
    }).join('');

    const rowsHtml = VOICE_SOURCES.map(s => {
      const pct = s.models[activeModel] || 0;
      const isForbidden = pct === 0 && s.id === 'description';
      const barWidth = Math.max(2, pct); // min 2% so the bar is visible
      const barClass = isForbidden ? 'vh-bar vh-bar--forbidden' : 'vh-bar';
      const valueClass = isForbidden ? 'vh-value vh-value--forbidden' : 'vh-value';
      const valueLabel = isForbidden ? '0% (ЗАПРЕЩЕНО)' : `~${pct}%`;
      return `
        <div class="vh-row" data-source="${esc(s.id)}" data-label="${esc(s.label)}">
          <div class="vh-row-label">${esc(s.label)}</div>
          <div class="vh-bar-track">
            <div class="${barClass}" style="width:${barWidth}%"></div>
          </div>
          <div class="${valueClass}">${esc(valueLabel)}</div>
        </div>`;
    }).join('');

    containerEl.innerHTML = `
      <div class="vh-toolbar">
        <div class="vh-toggle-group" role="group" aria-label="Выбор модели">${toggleHtml}</div>
        <button type="button" class="vh-export-btn" data-action="export" aria-label="Экспорт блок voice_sources в Markdown">📋 Экспорт Markdown</button>
      </div>
      <div class="vh-readout">
        <div class="vh-readout-rows">${rowsHtml}</div>
        <div class="vh-readout-total">
          <span class="vh-total-label">Сумма (ориентир):</span>
          <span class="vh-total-value">~${total}%</span>
        </div>
      </div>
      <p class="vh-hint"><strong>Примечание:</strong> Проценты — качественные ориентиры (см. §3.1 Методология), не точные измерения. Hover на ряде таблицы выше подсвечивает соответствующий источник. Переключатель модели меняет активный столбец.</p>
      ${forbiddenSource ? `<div class="vh-warning">⚠ На модели <strong>${esc(activeModel)}</strong>: ${esc(forbiddenSource.label)} = 0% влияния на лингвистический голос. Физическая характеристика (тембр, хрип) допустима в Description как часть Embodiment (§3.1).</div>` : ''}
    `;

    bindEvents();
  }

  /**
   * Bind click handlers on toggle buttons + export button,
   * and hover handlers on .vh-row + source-table rows.
   */
  function bindEvents() {
    // Toggle buttons
    containerEl.querySelectorAll('.vh-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const model = btn.getAttribute('data-model');
        if (model && model !== activeModel) {
          activeModel = model;
          render();
          syncSourceTableModel();
          dispatchModelChange(model);
        }
      });
    });

    // Export button
    const exportBtn = containerEl.querySelector('.vh-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportMarkdown);
    }

    // Hover-sync: widget row ↔ source table row
    containerEl.querySelectorAll('.vh-row').forEach(row => {
      const sourceId = row.getAttribute('data-source');
      row.addEventListener('mouseenter', () => highlightSource(sourceId, true));
      row.addEventListener('mouseleave', () => highlightSource(sourceId, false));
    });

    // Reverse direction: hover on the source <table> row highlights widget row
    if (sourceTableEl) {
      sourceTableEl.querySelectorAll('tbody tr[data-vh-source]').forEach(tr => {
        const sourceId = tr.getAttribute('data-vh-source');
        tr.addEventListener('mouseenter', () => highlightSource(sourceId, true));
        tr.addEventListener('mouseleave', () => highlightSource(sourceId, false));
      });
    }
  }

  /**
   * Highlight a source row both in the widget and in the source table.
   */
  function highlightSource(sourceId, on) {
    const widgetRow = containerEl.querySelector(`.vh-row[data-source="${sourceId}"]`);
    if (widgetRow) {
      widgetRow.classList.toggle('vh-row--highlighted', on);
    }
    if (sourceTableEl) {
      const tableRow = sourceTableEl.querySelector(`tbody tr[data-vh-source="${sourceId}"]`);
      if (tableRow) {
        tableRow.classList.toggle('vh-row--highlighted', on);
      }
    }
  }

  // ========================================================================
  // EVENT BUS
  // ========================================================================

  function dispatchModelChange(model) {
    if (typeof CustomEvent === 'undefined') return;
    const event = new CustomEvent('persona-voice-hierarchy://model-change', {
      detail: { model },
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  function dispatchExport(content) {
    if (typeof CustomEvent === 'undefined') return;
    const event = new CustomEvent('persona-voice-hierarchy://export', {
      detail: { format: 'markdown', content },
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  // ========================================================================
  // EXPORT
  // ========================================================================

  /**
   * Generate a Markdown block summarizing voice_sources for the active model.
   * The block is intended for copy-paste into an Author's Note or System
   * Prompt as a reminder of which sources actually shape voice.
   */
  function generateMarkdown() {
    const lines = [];
    lines.push(`# Voice Sources — model: ${activeModel}`);
    lines.push('');
    lines.push('| Источник | Влияние | Примечание |');
    lines.push('|----------|---------|------------|');
    VOICE_SOURCES.forEach(s => {
      const pct = s.models[activeModel] || 0;
      const pctLabel = pct === 0 && s.id === 'description' ? '0% (ЗАПРЕЩЕНО)' : `~${pct}%`;
      // Strip Markdown-special chars from note; keep concise
      const note = (s.note || '').replace(/\|/g, '\\|');
      lines.push(`| ${s.label} | ${pctLabel} | ${note} |`);
    });
    lines.push('');
    lines.push('> Качественные ориентиры. См. §3.1 Методология и §3.2 Иерархия влияния.');
    return lines.join('\n');
  }

  function exportMarkdown() {
    const md = generateMarkdown();
    // Use the shared clipboard helper if available
    if (window.WidgetUtils && typeof window.WidgetUtils.fallbackCopy === 'function') {
      window.WidgetUtils.fallbackCopy(md);
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).catch(() => {});
    }
    // Visual feedback on the button
    const btn = containerEl.querySelector('.vh-export-btn');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = '✓ Скопировано';
      btn.classList.add('vh-export-btn--done');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('vh-export-btn--done');
      }, 1800);
    }
    dispatchExport(md);
  }

  // ========================================================================
  // INIT
  // ========================================================================

  /**
   * Initialize the widget. Reads data-model from the container to restore
   * the user's last selection (defaults to '12B' per §3.2 RULE).
   */
  function init() {
    if (isInitialized) return;
    containerEl = document.getElementById('persona-voice-hierarchy');
    if (!containerEl) return;

    // Read initial model from data attribute (default 12B)
    const initialModel = containerEl.getAttribute('data-model');
    if (initialModel && MODELS.includes(initialModel)) {
      activeModel = initialModel;
    }

    sourceTableEl = findSourceTable();
    annotateSourceTable();
    syncSourceTableModel();
    render();
    isInitialized = true;
  }

  /**
   * Teardown (for future SPA-style content swaps).
   */
  function destroy() {
    if (containerEl) containerEl.innerHTML = '';
    if (sourceTableEl) {
      sourceTableEl.removeAttribute('data-vh-model');
      sourceTableEl.querySelectorAll('[data-vh-source]').forEach(el => {
        el.removeAttribute('data-vh-source');
        el.removeAttribute('data-vh-label');
        el.classList.remove('vh-row--highlighted');
      });
      sourceTableEl.querySelectorAll('.vh-active-model').forEach(el => el.classList.remove('vh-active-model'));
    }
    isInitialized = false;
    containerEl = null;
    sourceTableEl = null;
  }

  // ========================================================================
  // PUBLIC API
  // ========================================================================
  window.PersonaVoiceHierarchy = {
    init,
    destroy,
    exportMarkdown,
    generateMarkdown,
    get activeModel() { return activeModel; },
    set activeModel(model) {
      if (MODELS.includes(model)) {
        activeModel = model;
        if (isInitialized) {
          render();
          syncSourceTableModel();
          dispatchModelChange(model);
        }
      }
    },
    get sources() { return VOICE_SOURCES.map(s => ({ ...s })); }
  };

  // ========================================================================
  // AUTO-INIT — standardized pattern: EventBus.whenReady + 500ms fallback
  // ========================================================================
  function autoInit() {
    if (document.getElementById('persona-voice-hierarchy')) {
      init();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      (window.EventBus && window.EventBus.whenReady ? window.EventBus.whenReady(autoInit) : setTimeout(autoInit, 500));
    });
  } else {
    (window.EventBus && window.EventBus.whenReady ? window.EventBus.whenReady(autoInit) : setTimeout(autoInit, 500));
  }

})();
