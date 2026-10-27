/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - LAZY LOADER v7.0.0 (UNIFIED)
 * ============================================================================
 * 
 * Unified content loading system:
 * 1. On page load → fetch HTML parts from parts/
 * 2. Insert content into #content container
 * 3. Handle anchor navigation and browser history
 * 
 * Features:
 * - Panel system (drag, resize, save state)
 * - Notepad with persistence
 * - Glossary panel
 * - Theme toggle (default dark ↔ light)
 * - Content width toggle
 * - Expert mode toggle (M3 widget level)
 * - Scroll to top
 * - Part fetch resilience (KI#69: retry with backoff + visible
 *   in-place error placeholders with one-click re-fetch)
 * 
 * Architecture:
 * - Shell (this file) loads once
 * - Content fetched from single unified parts/ directory
 * - localStorage remembers preferences
 */

(function() {
  'use strict';

  // ============================================================================
  // CONFIGURATION
  // ============================================================================
  
  const CONFIG = {
    STORAGE_KEY: 'guide-unified',
    VERSION: '9.2.0',
    PARTS_DIR: 'parts',
    // KI#69: per-part fetch resilience — attempts and backoff delays
    PARTS_MAX_RETRIES: 2,
    PARTS_RETRY_DELAYS_MS: [300, 900]
  };

  // KI#70 WIRE (DEC-24 Q7, iter 158): appendix render order = the guide
  // lettering A → E per the canon appendix files (appendix_mbti.md A.1,
  // appendix_model_params.md E.1 — v3 stage 2, iter 172: Appendix B was absorbed
  // into Appendix E, D stays canon-only; F-19/iter 177: Appendix C deleted, the
  // glossary lives in the panel + its generated no-JS page). The
  // manifest `appendices` array is alphabetical (a build-unified.mjs artifact),
  // so the load list re-orders it here. Files not listed sort last (stable
  // sort) — future appendices degrade gracefully.
  const APPENDIX_GUIDE_ORDER = [
    'appendix_mbti.html',        // Appendix A — MBTI Reference
    'appendix_model_params.html' // Appendix E — Model, context & parameters
  ];

  // ============================================================================
  // STATE
  // ============================================================================
  
  let isLoading = false;
  let loadedParts = new Set();

  // ============================================================================
  // ANCHOR REDIRECT MAP (0.18: v5.12 → v6 backward compatibility)
  // ============================================================================

  // Hardcoded fallback — used if data/anchor-redirects.json is not available
  const ANCHOR_REDIRECTS_FALLBACK = {
    '03_core_blocks': 'p2_basic_anchors',
    '04_spine': 'p4_spine_overview',
    '05_ocean': 'p5_ocean_basics',
    '06_cot': 'p6_cot_basics',
    '07_tech': 'p7a_system_prompt',
    '08_anti': 'p8_antipatterns_overview',
    '09_diag': 'p9_basic_checklist',
    '01_intro': 'p1_card_overview',
    '02_voice': 'p3_voice_isolation',
    '10_examples': 'p10_elena'
  };

  // Active redirect map — initialized from JSON fetch or fallback
  let ANCHOR_REDIRECTS = { ...ANCHOR_REDIRECTS_FALLBACK };

  // Try to load auto-generated redirects from data/anchor-redirects.json
  async function loadAnchorRedirects() {
    try {
      const response = await fetch('data/anchor-redirects.json');
      if (response.ok) {
        const data = await response.json();
        if (data && data.redirects) {
          ANCHOR_REDIRECTS = { ...ANCHOR_REDIRECTS_FALLBACK, ...data.redirects };
          console.log(`[AnchorRedirect] Loaded ${Object.keys(data.redirects).length} redirects from JSON`);
        }
      }
    } catch (_e) {
      console.warn('[AnchorRedirect] Using hardcoded fallback redirects');
    }
  }

  function handleLegacyAnchor() {
    const hash = window.location.hash.slice(1);
    if (hash && ANCHOR_REDIRECTS[hash]) {
      const target = ANCHOR_REDIRECTS[hash];
      history.replaceState(null, '', '#' + target);
      // If content is loaded, scroll to the new anchor
      const targetEl = document.getElementById(target);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      console.log(`[AnchorRedirect] ${hash} → ${target}`);
    }
  }

  // ============================================================================
  // DOM UTILITIES
  // ============================================================================
  
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ============================================================================
  // STORAGE UTILITY
  // ============================================================================

  const storage = {
    memoryFallback: new Map(),
    
    get(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.warn('[Storage] Read error:', e.message);
        return this.memoryFallback.get(key) || null;
      }
    },
    
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        this.memoryFallback.set(key, value);
        return true;
      } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22) {
          console.warn('[Storage] Quota exceeded, using memory fallback');
          this.memoryFallback.set(key, value);
        } else {
          console.error('[Storage] Write error:', e.message);
        }
        return false;
      }
    }
  };

  // ============================================================================
  // DEBOUNCE UTILITY
  // ============================================================================

  function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ============================================================================
  // GUIDE LAYER VISIBILITY HELPERS (0.6)
  // v8: No layer system — all widgets always active
  // ============================================================================

  /**
   * Get current guide layer.
   * v8: Always returns 3 — all widgets are always visible.
   * @returns {number} Layer number (always 3)
   */
  function getGuideLayer() {
    return 3;
  }

  /**
   * Check if psychological tools (OCEAN, Enneagram, MBTI) are allowed.
   * v8: Always true — no layer gating.
   * @returns {boolean}
   */
  function isWidgetAllowed() {
    return true;
  }

  /**
   * Get widget functionality level (M1/M2/M3).
   * M1 = quick preset, M2 = full config, M3 = expert validation.
   * v8: Always M2 (full config) — widgets always fully functional.
   * @returns {number} Widget level (always 2)
   */
  function getWidgetLevel() {
    return 2;
  }

  // Expose on window for widgets (loaded outside this IIFE)
  window.getGuideLayer = getGuideLayer;
  window.isWidgetAllowed = isWidgetAllowed;
  window.getWidgetLevel = getWidgetLevel;

  // ============================================================================
  // CLIPBOARD UTILITY
  // ============================================================================

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_err) {
      // Fallback for insecure contexts (http://, file://)
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.className = 'clipboard-fallback-textarea';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
      } catch (fallbackErr) {
        console.warn('[Clipboard] Copy failed:', fallbackErr);
        return false;
      }
    }
  }

  // ============================================================================
  // PANEL SYSTEM
  // ============================================================================

  let globalZIndex = 1000;
  const MAX_Z_INDEX = 10000;

  const DEFAULT_PANEL_STATE = {
    visible: false,
    x: 20,
    y: 80,
    width: 280,
    height: Math.min(400, window.innerHeight * 0.6)
  };

  const PANEL_DEFAULTS = {
    'toc-panel': () => ({
      x: Math.max(20, window.innerWidth - 320),
      y: 80,
      width: 280,
      height: Math.min(400, window.innerHeight * 0.6)
    }),
    'notepad-panel': () => ({
      x: 20,
      y: 80,
      width: 280,
      height: Math.min(400, window.innerHeight * 0.6)
    }),
    'glossary-panel': () => ({
      x: Math.max(20, window.innerWidth - 340),
      y: 100,
      width: 300,
      height: Math.min(450, window.innerHeight * 0.6)
    })
  };

  class Panel {
    constructor(element, options = {}) {
      this.el = element;
      this.storageKey = options.storageKey || `panel_${element.id}`;
      this.onToggle = options.onToggle || null;
      this.onSave = options.onSave || null;
      
      this.state = this.loadState();
      this.isDragging = false;
      this.isResizing = false;
      this.dragOffset = { x: 0, y: 0 };
      
      this.header = this.el.querySelector('[data-drag-handle]');
      this.resizeHandle = this.el.querySelector('[data-resize-handle]');
      this.closeBtn = this.el.querySelector('[data-action="close"]');
      
      this.applyState();
      this.bindEvents();
      this.setupAccessibility();
    }

    loadState() {
      const saved = storage.get(this.storageKey);
      const panelDefaults = PANEL_DEFAULTS[this.el.id]?.() || DEFAULT_PANEL_STATE;
      
      if (saved) {
        if (saved.x > window.innerWidth - 100 || saved.y > window.innerHeight - 100) {
          return { ...panelDefaults, visible: false };
        }
        const openPanels = document.querySelectorAll('.panel.open');
        if (openPanels.length > 0 && !saved.visible) {
          saved.y = Math.min(saved.y + 50, window.innerHeight - 200);
        }
      }
      
      return { ...panelDefaults, ...saved };
    }

    saveState = debounce(() => {
      const rect = this.el.getBoundingClientRect();
      this.state = {
        visible: this.isOpen(),
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
      storage.set(this.storageKey, this.state);
    }, 300);

    applyState() {
      const x = Math.max(0, Math.min(this.state.x, window.innerWidth - 100));
      const y = Math.max(0, Math.min(this.state.y, window.innerHeight - 100));
      
      this.el.style.left = `${x}px`;
      this.el.style.top = `${y}px`;
      this.el.style.width = `${Math.max(220, this.state.width)}px`;
      this.el.style.height = `${Math.max(150, this.state.height)}px`;
      
      if (this.state.visible) {
        this.el.classList.add('open');
      }
    }

    isOpen() { return this.el.classList.contains('open'); }

    open() {
      this.el.classList.add('open');
      this.state.visible = true;
      this.saveState();
      if (this.onToggle) this.onToggle(true);
    }

    close() {
      this.el.classList.remove('open');
      this.state.visible = false;
      this.saveState();
      if (this.onToggle) this.onToggle(false);
    }

    toggle() {
      if (this.isOpen()) this.close();
      else this.open();
    }

    focus() {
      globalZIndex++;
      if (globalZIndex > MAX_Z_INDEX) globalZIndex = 1000;
      this.el.style.zIndex = globalZIndex;
      this.el.focus();
    }

    startDrag(e) {
      if (e.target.closest('.panel-btn')) return;
      
      this.isDragging = true;
      this.el.classList.add('dragging');
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = this.el.getBoundingClientRect();
      
      this.dragOffset = { x: clientX - rect.left, y: clientY - rect.top };
      this.focus();
      e.preventDefault();
    }

    onDrag(e) {
      if (!this.isDragging) return;
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      let newX = clientX - this.dragOffset.x;
      let newY = clientY - this.dragOffset.y;
      
      const rect = this.el.getBoundingClientRect();
      newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
      newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));
      
      this.el.style.left = `${newX}px`;
      this.el.style.top = `${newY}px`;
    }

    endDrag() {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.el.classList.remove('dragging');
      this.saveState();
    }

    startResize(e) {
      this.isResizing = true;
      this.el.classList.add('dragging');
      this.focus();
      e.preventDefault();
    }

    onResize(e) {
      if (!this.isResizing) return;
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const rect = this.el.getBoundingClientRect();
      const newWidth = Math.max(220, clientX - rect.left);
      const newHeight = Math.max(150, clientY - rect.top);
      
      this.el.style.width = `${newWidth}px`;
      this.el.style.height = `${newHeight}px`;
    }

    endResize() {
      if (!this.isResizing) return;
      this.isResizing = false;
      this.el.classList.remove('dragging');
      this.saveState();
    }

    bindEvents() {
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }
      
      // Drag - mouse
      this.header?.addEventListener('mousedown', (e) => this.startDrag(e));
      document.addEventListener('mousemove', (e) => this.onDrag(e));
      document.addEventListener('mouseup', () => this.endDrag());
      
      // Drag - touch
      this.header?.addEventListener('touchstart', (e) => this.startDrag(e), { passive: false });
      document.addEventListener('touchmove', (e) => this.onDrag(e), { passive: false });
      document.addEventListener('touchend', () => this.endDrag());
      
      // Resize - mouse
      this.resizeHandle?.addEventListener('mousedown', (e) => this.startResize(e));
      document.addEventListener('mousemove', (e) => this.onResize(e));
      document.addEventListener('mouseup', () => this.endResize());
      
      // Resize - touch
      this.resizeHandle?.addEventListener('touchstart', (e) => this.startResize(e), { passive: false });
      document.addEventListener('touchmove', (e) => this.onResize(e), { passive: false });
      document.addEventListener('touchend', () => this.endResize());
      
      // Focus on click
      this.el.addEventListener('mousedown', () => this.focus());
      
      // Keyboard
      this.el.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
          e.preventDefault();
        }
      });
      
      // Save on window resize
      window.addEventListener('resize', debounce(() => {
        if (this.isOpen()) {
          const rect = this.el.getBoundingClientRect();
          if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
            this.applyState();
          }
        }
      }, 100));
    }

    setupAccessibility() {
      this.el.setAttribute('role', 'dialog');
      this.el.setAttribute('aria-modal', 'false');
    }
  }

  // ============================================================================
  // NOTEPAD PANEL (extends Panel)
  // ============================================================================

  class NotepadPanel extends Panel {
    constructor(element, options = {}) {
      super(element, options);
      this.textarea = this.el.querySelector('textarea');
      this.saveBtn = this.el.querySelector('[data-action="save"]');
      this.clearBtn = this.el.querySelector('[data-action="clear"]');
      this.exportBtn = this.el.querySelector('[data-action="export"]');
      
      this.createStatusBar();
      this.bindNotepadEvents();
      this.loadContent();
    }

    createStatusBar() {
      if (this.el.querySelector('.panel-statusbar')) return;
      
      const statusBar = document.createElement('div');
      statusBar.className = 'panel-statusbar';
      statusBar.innerHTML = '<span id="np-status">Готово</span><span id="np-count">0 симв.</span>';
      this.el.appendChild(statusBar);
    }

    // IMP-52: Global notepad — single key `lcg-notepad-v1` shared across layers
    // Format: { "notes": "...", "anchors": ["#spine", "#ocean"] }
    static GLOBAL_NOTEPAD_KEY = 'lcg-notepad-v1';

    loadContent() {
      const data = storage.get(NotepadPanel.GLOBAL_NOTEPAD_KEY) || { notes: '', anchors: [] };
      if (this.textarea) {
        this.textarea.value = data.notes || '';
        this.updateCount();
      }
      this.currentAnchors = data.anchors || [];
    }

    saveContent = debounce(() => {
      if (!this.textarea) return;
      const data = {
        notes: this.textarea.value,
        anchors: this.currentAnchors || []
      };
      storage.set(NotepadPanel.GLOBAL_NOTEPAD_KEY, data);
      if (this.saveBtn) {
        this.saveBtn.textContent = '✓';
        setTimeout(() => { this.saveBtn.textContent = '💾'; }, 800);
      }
      const status = $('#np-status');
      if (status) status.textContent = 'Сохранено';
    }, 250);

    clearContent() {
      if (!this.textarea || !this.textarea.value.trim()) return;
      if (confirm('Очистить все заметки? Это действие нельзя отменить.')) {
        this.textarea.value = '';
        this.currentAnchors = [];
        this.updateCount();
        this.saveContent();
      }
    }

    // IMP-52: Auto-anchor insertion on heading click
    addAnchor(anchorId) {
      if (!anchorId || !this.currentAnchors) return;
      if (!this.currentAnchors.includes('#' + anchorId)) {
        this.currentAnchors.push('#' + anchorId);
        this.saveContent();
        const status = $('#np-status');
        if (status) {
          status.textContent = `Якорь: #${anchorId}`;
          setTimeout(() => status.textContent = 'Готово', 1500);
        }
      }
    }

    exportContent() {
      if (!this.textarea || !this.textarea.value.trim()) {
        alert('Блокнот пуст. Нечего экспортировать.');
        return;
      }
      const blob = new Blob([this.textarea.value], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `notes_${new Date().toISOString().slice(0,10)}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }

    copyContent() {
      if (!this.textarea || !this.textarea.value.trim()) return;
      copyToClipboard(this.textarea.value).then((success) => {
        const status = $('#np-status');
        if (status) {
          status.textContent = success ? 'Скопировано' : 'Ошибка копирования';
          setTimeout(() => status.textContent = 'Готово', 1500);
        }
      });
    }

    updateCount() {
      if (!this.textarea) return;
      const len = this.textarea.value.length;
      const words = this.textarea.value.trim() ? this.textarea.value.trim().split(/\s+/).length : 0;
      const countEl = $('#np-count');
      if (countEl) countEl.textContent = `${len} симв. · ${words} слов`;
    }

    bindNotepadEvents() {
      if (this.textarea) {
        this.textarea.addEventListener('input', () => {
          this.saveContent();
          this.updateCount();
        });
        this.textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.textarea.selectionStart;
            const end = this.textarea.selectionEnd;
            this.textarea.value = this.textarea.value.substring(0, start) + '  ' + this.textarea.value.substring(end);
            this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
            this.saveContent();
          }
        });
      }

      this.saveBtn?.addEventListener('click', () => this.saveContent());
      this.clearBtn?.addEventListener('click', () => this.clearContent());
      this.exportBtn?.addEventListener('click', () => this.exportContent());
      
      // Add copy button
      let copyBtn = this.el.querySelector('[data-action="copy"]');
      if (!copyBtn) {
        copyBtn = document.createElement('button');
        copyBtn.className = 'panel-btn';
        copyBtn.dataset.action = 'copy';
        copyBtn.textContent = '📋';
        copyBtn.title = 'Копировать всё';
        this.el.querySelector('.panel-header-actions')?.prepend(copyBtn);
      }
      copyBtn.addEventListener('click', () => this.copyContent());

      // IMP-52: Auto-anchor insertion on heading click while notepad is open
      this.bindAutoAnchorInsertion();
    }

    // IMP-52: When user clicks a heading while the notepad is open,
    // auto-insert the section anchor into the anchors array
    bindAutoAnchorInsertion() {
      document.addEventListener('click', (e) => {
        if (!this.isOpen()) return;
        const heading = e.target.closest('h2[id], h3[id], h4[id]');
        if (heading && heading.id) {
          this.addAnchor(heading.id);
        }
      });
    }
  }

  // Panel instances storage
  const panelInstances = {};

  // ============================================================================
  // CONTENT LOADING
  // ============================================================================

  function showLoading() {
    $('#loading-overlay')?.classList.remove('hidden');
  }

  function hideLoading() {
    $('#loading-overlay')?.classList.add('hidden');
  }

  // ============================================================================
  // PART FETCH RESILIENCE (KI#69)
  // ============================================================================
  // Before KI#69 a failed part fetch was silently replaced by an HTML comment
  // (`.catch(() => '<!-- Failed to load ... -->')`): every table, VS-visual and
  // widget container of that part vanished with no signal, while the loading
  // overlay still hid normally (page "looked loaded"). Now each part gets up to
  // PARTS_MAX_RETRIES retries for transient failures (network errors, 5xx, 429);
  // persistent failures render a visible in-place callout with a one-click
  // surgical re-fetch that re-runs the standard post-injection init sequence.

  /**
   * Fetch one part file with retry/backoff.
   * Retries network-level errors, 5xx and 429; fails fast on other 4xx
   * (the file is genuinely absent — retrying would only delay the error).
   * @param {string} file part filename (e.g. 'part_07a.html')
   * @returns {Promise<string>} part HTML text
   */
  async function fetchPartHtml(file) {
    let lastError = null;
    for (let attempt = 0; attempt <= CONFIG.PARTS_MAX_RETRIES; attempt++) {
      if (attempt > 0) {
        const delay = CONFIG.PARTS_RETRY_DELAYS_MS[
          Math.min(attempt - 1, CONFIG.PARTS_RETRY_DELAYS_MS.length - 1)
        ];
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      try {
        const response = await fetch(`${CONFIG.PARTS_DIR}/${file}`);
        if (response.ok) return await response.text();
        lastError = new Error(`HTTP ${response.status}`);
        // Permanent client error (except 429 Too Many Requests) — no retry
        if (response.status >= 400 && response.status < 500 && response.status !== 429) break;
      } catch (e) {
        lastError = e; // network-level failure — retryable
      }
    }
    throw lastError;
  }

  /** Minimal HTML escaping for values interpolated into runtime UI markup. */
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Visible in-place placeholder rendered where a failed part belongs.
   * Keeps the part's document position so the reader sees the actual gap.
   * `data-part-file` is the hook for the surgical retry.
   */
  function partErrorHtml(part, error) {
    const label = (part && part.title) || (part && part.file) || 'раздел';
    const file = part ? part.file : '';
    const reason = error && error.message ? error.message : 'сеть недоступна';
    return '<div class="callout load-error" role="alert" data-part-file="' + escapeHtml(file) + '">'
      + '<strong>Ошибка загрузки раздела</strong>'
      + '<p>Раздел «' + escapeHtml(label) + '» (' + escapeHtml(file) + ') не удалось загрузить: '
      + escapeHtml(reason) + '. Таблицы, визуализации и виджеты этого раздела отсутствуют до восстановления.</p>'
      + '<button type="button" class="load-retry-btn">Повторить загрузку</button>'
      + '</div>';
  }

  /**
   * Wire retry buttons inside part-failure placeholders of `scope`.
   * Idempotent (dataset.wired guard) — safe to call after any injection.
   */
  function wirePartRetryButtons(scope) {
    scope.querySelectorAll('.load-error[data-part-file] .load-retry-btn').forEach(btn => {
      if (btn.dataset.wired === '1') return;
      btn.dataset.wired = '1';
      btn.addEventListener('click', () => retryFailedPart(btn.closest('.load-error')));
    });
  }

  /**
   * Surgical re-fetch of a single failed part: replaces its placeholder with
   * the recovered content in place (scroll position and all other parts are
   * preserved), then re-runs the standard post-injection sequence used by
   * loadContent(). All steps are re-entrant: copy-button wrappers skip
   * already-wrapped <pre>, widget .init() re-scans containers, and parts
   * carry no <script> so executeInlineScripts is a no-op for part content.
   */
  async function retryFailedPart(placeholder) {
    if (!placeholder) return;
    const content = $('#content');
    const file = placeholder.getAttribute('data-part-file');
    const btn = placeholder.querySelector('.load-retry-btn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Загрузка…';
    }
    try {
      const html = await fetchPartHtml(file);
      const holder = document.createElement('div');
      holder.innerHTML = html;
      const frag = document.createDocumentFragment();
      while (holder.firstChild) frag.appendChild(holder.firstChild);
      placeholder.replaceWith(frag);
      if (content) {
        executeInlineScripts(content);
        initInteractiveElements();
        generateTOC();
        initActivePartHighlighting();
        buildRailTOC();
        handleAnchor();
      }
      console.log('[LazyLoader] Part recovered on retry:', file);
    } catch (e) {
      console.warn('[LazyLoader] Part retry failed for ' + file + ':', e.message);
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Повторить загрузку';
      }
      const p = placeholder.querySelector('p');
      if (p) {
        p.textContent = 'Повторная загрузка не удалась: ' + (e.message || 'сеть недоступна')
          + '. Проверьте соединение и нажмите «Повторить загрузку» ещё раз.';
      }
    }
  }

  async function loadContent() {
    if (isLoading) return;
    isLoading = true;
    showLoading();

    const content = $('#content');
    if (!content) { isLoading = false; hideLoading(); return; }

    // PRERENDER ADOPTION (docs/PROMOTION_PLAN.md 3 A1)
    // dist/index.html ships the guide already inside <main>, so crawlers see the
    // full text and returning visitors skip 17 fragment requests. The DOM is
    // byte-identical to what the fetch path builds, therefore we run the SAME
    // post-injection sequence and never re-fetch, never repaint.
    // The `content.innerHTML = ''` wipe below MUST NOT run on this path.
    if (content.dataset.prerendered === 'true' && content.children.length > 0) {
      try {
        content.classList.remove('content-hidden');
        initInteractiveElements();
        generateTOC();
        initActivePartHighlighting();
        buildRailTOC();
        handleAnchor();
        loadGlossaryContent();
        handleLegacyAnchor();
        isLoading = false;
        hideLoading();
        return;
      } catch (e) {
        // A prerendered DOM that fails to initialise must degrade to the fetch
        // path, not to a blank page.
        console.warn('[LazyLoader] Prerendered content failed to initialise, falling back to fetch:', e);
        delete content.dataset.prerendered;
        content.innerHTML = '';
        isLoading = false;
        hideLoading();
        return loadContent();
      }
    }

    content.innerHTML = '';
    loadedParts.clear();

    try {
      const manifestResponse = await fetch(`${CONFIG.PARTS_DIR}/manifest.json`);
      if (!manifestResponse.ok) throw new Error(`Failed to load manifest: HTTP ${manifestResponse.status}`);

      const manifest = await manifestResponse.json();
      // KI#70 WIRE (DEC-24 Q7, iter 158): appendices load after the Parts on
      // the same fetch pipeline — they inherit the KI#69 retry/placeholder
      // machinery for free. Guide order A → E (APPENDIX_GUIDE_ORDER).
      const appendices = (manifest.appendices || []).slice().sort((a, b) =>
        APPENDIX_GUIDE_ORDER.indexOf(a.file) - APPENDIX_GUIDE_ORDER.indexOf(b.file)
      );
      const parts = (manifest.parts || []).concat(appendices);

      const fetchPromises = parts.map(async part => {
        try {
          return { ok: true, html: await fetchPartHtml(part.file) };
        } catch (e) {
          return { ok: false, part, error: e };
        }
      });

      const results = await Promise.all(fetchPromises);

      const failedParts = [];
      const chunks = results.map(result => {
        if (result.ok) return result.html;
        failedParts.push(result);
        return partErrorHtml(result.part, result.error);
      });
      content.innerHTML = chunks.join('\n');
      content.classList.remove('content-hidden');

      if (failedParts.length > 0) {
        console.warn('[LazyLoader] ' + failedParts.length + ' of ' + parts.length
          + ' part(s) failed after ' + (CONFIG.PARTS_MAX_RETRIES + 1) + ' attempt(s):',
          failedParts.map(r => r.part.file + ' (' + (r.error ? r.error.message : '?') + ')').join(', '));
        wirePartRetryButtons(content);
      }

      // FIX: Execute inline scripts that were injected via innerHTML
      // (browsers don't execute <script> tags inserted via innerHTML)
      executeInlineScripts(content);

      initInteractiveElements();
      generateTOC();
      initActivePartHighlighting();
      buildRailTOC();
      handleAnchor();
      loadGlossaryContent();
      handleLegacyAnchor();

    } catch (e) {
      // Manifest-level failure: whole guide unavailable — visible error +
      // one-click full reload (same runtime-UI classes as part placeholders).
      // NB: content-hidden must be lifted here too, or the callout stays
      // display:none (pre-existing invisibility of the old error message).
      content.classList.remove('content-hidden');
      content.innerHTML = '<div class="callout load-error" role="alert">'
        + '<strong>Ошибка загрузки</strong>'
        + '<p>Не удалось загрузить содержание руководства: ' + escapeHtml(e.message) + '.</p>'
        + '<button type="button" class="load-retry-btn">Повторить загрузку</button></div>';
      const manifestRetryBtn = content.querySelector('.load-retry-btn');
      if (manifestRetryBtn) {
        manifestRetryBtn.addEventListener('click', () => loadContent());
      }
    }

    isLoading = false;
    hideLoading();
  }

  // ============================================================================
  // INLINE SCRIPT EXECUTION (FIX: innerHTML scripts don't execute)
  // ============================================================================

  /**
   * FIX: Execute inline <script> tags that were injected via innerHTML.
   * Browsers do not execute <script> tags inserted via innerHTML (HTML spec).
   * This function extracts each script, strips the DOMContentLoaded wrapper
   * (since DOM is already loaded at this point), and executes it safely.
   *
   * FIX-01: Non-module scripts are executed via new Function() to handle
   * bare `return` statements (legal inside DOMContentLoaded callback but
   * illegal at top level). Module scripts preserve type="module" so that
   * `import` statements work correctly.
   */
  function executeInlineScripts(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
      let code = oldScript.textContent.trim();
      if (!code) return;

      const isModule = oldScript.type === 'module';

      // Remove DOMContentLoaded wrapper since DOM is already loaded
      code = code.replace(
        /document\.addEventListener\(\s*['"]DOMContentLoaded['"]\s*,\s*\(\)\s*=>\s*\{([\s\S]*)\}\s*\)\s*;?\s*$/,
        '$1'
      );

      // FIX-26: After stripping DOMContentLoaded wrapper, any `return` statement
      // (even inside an `if` block) becomes illegal at the module top level.
      // The previous regex /^\s*return\s/m only matched `return` at the start
      // of a line, missing indented returns like `        return;` inside `if`.
      // Use \breturn\b to catch return at ANY indentation level.
      const hasReturnStatement = /\breturn\b/.test(code);

      if (isModule) {
        // Module scripts: preserve type="module" and wrap in IIFE for return statements
        // Module scripts can't use new Function() — they need the module scope
        // Wrap in IIFE to handle bare returns (FIX-26: broader detection)
        if (hasReturnStatement) {
          code = '(function() { ' + code + ' })();';
        }
        const newScript = document.createElement('script');
        newScript.type = 'module';
        // Copy other attributes (except type which we already set)
        for (const attr of oldScript.attributes) {
          if (attr.name !== 'type') {
            newScript.setAttribute(attr.name, attr.value);
          }
        }
        newScript.textContent = code;
        oldScript.parentNode.replaceChild(newScript, oldScript);
      } else {
        // Non-module scripts: use new Function() for safe execution
        // This handles bare `return` statements that would cause
        // SyntaxError: Illegal return statement at top level
        try {
          const fn = new Function(code);
          fn.call(window);
        } catch (e) {
          console.warn('[LazyLoader] Inline script error:', e.message);
        }
        // Remove the original script tag (already executed via new Function)
        if (oldScript.parentNode) {
          oldScript.parentNode.removeChild(oldScript);
        }
      }
    });
  }

  // ============================================================================
  // ANCHOR HANDLING
  // ============================================================================

  function handleAnchor() {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const targetId = hash.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }

  // KI#36 fix: listen for hashchange so anchor clicks (which update URL hash)
  // reliably trigger smooth scroll, even when native browser behavior is
  // interrupted by dynamic content / panel transitions.
  function initHashChangeListener() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      if (!hash || hash.length <= 1) return;
      const targetId = hash.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ============================================================================
  // TOC GENERATION
  // ============================================================================

  /**
   * NAV-01: Two-Tier Collapsible TOC
   * 
   * Tier 1: Part-level entries (h2 titles), always visible, ~10 items max
   * Tier 2: Section-level entries from NAV sections (data-toc-nav), hidden by default
   *
   * Mechanism:
   * - Group sections by Part (using data-section prefix p{N}_ / p{NA}_ / p{NB}_)
   * - The Part's first section supplies the Tier 1 label: `data-part-title`
   *   when authored, else its own <h2>, else `Part N`
   * - Sections with data-toc-nav attribute become Tier 2 entries (label = the
   *   section's own first h2/h3, so a section is never labelled by its child)
   * - Sections with data-toc-exclude or id="glossary" are skipped entirely
   * - Text truncation removed (NAV-01): CSS text-overflow:ellipsis handles overflow
   */
  /**
   * Tier-1 TOC label for a Part.
   * `data-part-title` on the Part's first section is the authored, single-source
   * label (it matches the Part 0 module map and `parts/manifest.json`).
   * Fallbacks preserve the pre-existing behaviour for parts without it.
   * @param {Element} section - first section of the Part
   * @param {string} partNum - part key parsed from data-section ("1"…"10", "7a", "7b")
   * @returns {string}
   */
  function partTitleOf(section, partNum) {
    const authored = (section.getAttribute('data-part-title') || '').trim();
    if (authored) return authored;
    const h2 = section.querySelector('h2');
    if (h2) return h2.textContent.replace(/^[0-9.]+\s*/, '').trim();
    return `Part ${partNum.toUpperCase()}`;
  }

  function generateTOC() {
    const tocContent = $('#toc-content');
    if (!tocContent) return;

    const sections = $$('section[data-section]');

    // Group sections by Part number
    const partGroups = {};
    const partOrder = [];

    sections.forEach(section => {
      // Skip glossary and data-toc-exclude sections (NAV-01 2.4, 3.6)
      if (section.hasAttribute('data-toc-exclude') || section.id === 'glossary') return;

      // Extract part key from data-section (format: p{N}_{topic}, p{7a}_…, p{7b}_…)
      const sectionId = section.getAttribute('data-section') || section.id;
      const partMatch = sectionId.match(/^p(\d+[ab]?)_/);
      if (!partMatch) return;

      const partNum = partMatch[1];
      if (!partGroups[partNum]) {
        partGroups[partNum] = [];
        partOrder.push(partNum);
      }
      partGroups[partNum].push(section);
    });

    // Build two-tier TOC HTML
    let tocHtml = '<ul class="toc-list">';

    partOrder.forEach(partNum => {
      const partSections = partGroups[partNum];
      if (partSections.length === 0) return;

      // Tier 1: authored Part title (data-part-title) — never the bare first heading
      const firstSection = partSections[0];
      const partTitle = partTitleOf(firstSection, partNum);

      // Collect Tier 2 entries (sections with data-toc-nav)
      const navSections = partSections.filter(s => s.hasAttribute('data-toc-nav'));

      // Build Part entry with toggle button
      tocHtml += `<li class="toc-part">`;
      tocHtml += `<button class="toc-part-toggle" data-part="part_${partNum.padStart(2, '0')}" aria-expanded="false">`;
      tocHtml += `<span class="toc-part-arrow">\u25B8</span>`;
      tocHtml += `<span class="toc-part-title">${partTitle}</span>`;
      tocHtml += `</button>`;

      // Tier 2: NAV section links (hidden by default)
      if (navSections.length > 0) {
        tocHtml += `<ul class="toc-sections hidden">`;
        navSections.forEach(navSection => {
          // Display text: the section's own heading (h2 or h3 — whichever opens
          // the section). Never a child heading: that mislabels sections whose
          // title itself is an <h2> (the first section of every Part).
          const ownHeading = navSection.querySelector('h2, h3');
          let linkText;
          if (ownHeading) {
            linkText = ownHeading.textContent.replace(/^(?:\u00a7\s*)?\d+(?:\.\d+)+[.:]?\s*/, '').trim();
          } else {
            // Fallback: use data-section ID as slug-derived label
            linkText = navSection.getAttribute('data-section')
              .replace(/^p\d+[ab]?_/, '')
              .replace(/_/g, ' ');
          }
          tocHtml += `<li class="toc-indent"><a href="#${navSection.id}">${linkText}</a></li>`;
        });
        tocHtml += `</ul>`;
      }

      tocHtml += `</li>`;
    });

    // KI#70 WIRE (DEC-24 Q7, iter 158): appendix sections get their own TOC
    // group after the Parts — the same «Приложения» convention the
    // auto-injected part-01 TOC uses. Entry text = the appendix section's own
    // h2; DOM order = load order (guide lettering A → E). Part-number
    // active highlighting intentionally does not apply (its regex is
    // Part-scoped by design).
    const appendixSections = Array.from(sections).filter(section => {
      if (section.hasAttribute('data-toc-exclude') || section.id === 'glossary') return false;
      const sectionId = section.getAttribute('data-section') || section.id;
      return sectionId.startsWith('appendix_') && section.hasAttribute('data-toc-nav');
    });
    if (appendixSections.length > 0) {
      tocHtml += `<li class="toc-part">`;
      tocHtml += `<button class="toc-part-toggle" data-part="appendices" aria-expanded="false">`;
      tocHtml += `<span class="toc-part-arrow">\u25B8</span>`;
      tocHtml += `<span class="toc-part-title">Приложения</span>`;
      tocHtml += `</button>`;
      tocHtml += `<ul class="toc-sections hidden">`;
      appendixSections.forEach(section => {
        const h2 = section.querySelector('h2');
        const linkText = h2 ? h2.textContent.trim() : section.getAttribute('data-section');
        tocHtml += `<li class="toc-indent"><a href="#${section.id}">${linkText}</a></li>`;
      });
      tocHtml += `</ul>`;
      tocHtml += `</li>`;
    }

    tocHtml += '</ul>';
    tocContent.innerHTML = tocHtml;

    // Bind toggle behavior (accordion: one Part expanded at a time)
    const toggleButtons = $$('.toc-part-toggle');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        const sectionsList = btn.nextElementSibling;

        // Accordion: collapse all other Parts
        toggleButtons.forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            const otherSections = otherBtn.nextElementSibling;
            if (otherSections) otherSections.classList.add('hidden');
          }
        });

        // Toggle current Part
        if (isExpanded) {
          btn.setAttribute('aria-expanded', 'false');
          if (sectionsList) sectionsList.classList.add('hidden');
        } else {
          btn.setAttribute('aria-expanded', 'true');
          if (sectionsList) sectionsList.classList.remove('hidden');
        }
      });
    });
  }

  // ============================================================================
  // READING RAIL (iter-193): persistent TOC + scrollspy + reading bar
  // ============================================================================

  // Ordered nav model shared by the rail and the reading-bar sheet: one entry
  // per rendered section that carries data-toc-nav, in DOM order, with its
  // Part grouping (part key + authored title). Mirrors generateTOC()'s
  // grouping logic (same regexes) without re-deriving from the DOM twice.
  function collectNavModel() {
    const parts = [];          // [{ key, title, sections: [{id, label, el}] }]
    const byKey = new Map();
    const sections = $$('section[data-section]');
    sections.forEach(section => {
      if (section.hasAttribute('data-toc-exclude') || section.id === 'glossary') return;
      if (!section.hasAttribute('data-toc-nav')) return;
      const sectionId = section.getAttribute('data-section') || section.id;

      let partKey;
      const partMatch = sectionId.match(/^p(\d+[ab]?)_/);
      if (partMatch) {
        partKey = partMatch[1];
      } else if (sectionId.startsWith('appendix_')) {
        partKey = 'appendices';
      } else {
        return; // same filter as generateTOC()
      }

      let group = byKey.get(partKey);
      if (!group) {
        group = { key: partKey, title: null, firstSection: section, sections: [] };
        byKey.set(partKey, group);
        parts.push(group);
      }
      // Appendix group label — the same «Приложения» convention as generateTOC()
      if (partKey === 'appendices' && !group.title) group.title = 'Приложения';
      // Part title: data-part-title on the Part's first section (partTitleOf rule)
      if (!group.title) {
        const authored = (section.getAttribute('data-part-title') || '').trim();
        if (authored) group.title = authored;
      }

      const ownHeading = section.querySelector('h2, h3');
      let label;
      if (ownHeading) {
        label = ownHeading.textContent.replace(/^(?:\u00a7\s*)?\d+(?:\.\d+)+[.:]?\s*/, '').trim();
      } else {
        label = sectionId.replace(/^p\d+[ab]?_/, '').replace(/_/g, ' ');
      }
      group.sections.push({ id: section.id, label, el: section });
    });
    // Part title fallback: data-part-title on the first section of the Part
    // (partTitleOf rule); appendices already carry their label above.
    parts.forEach(g => { if (!g.title) g.title = partTitleOf(g.firstSection, g.key) || ('Part ' + g.key.toUpperCase()); });
    return parts;
  }

  function railTreeHtml(parts, opts) {
    const { sheet } = opts || {};
    let html = '<ul class="rail-list">';
    parts.forEach(part => {
      const partId = part.key === 'appendices' ? 'appendices' : part.key;
      html += `<li class="rail-part" data-rail-part="${partId}">`;
      html += `<div class="rail-part-row"><a class="rail-part-link" href="#${part.firstSection.id}">` +
              `<i class="rail-part-num">${partId === 'appendices' ? 'A–E' : partId}</i>` +
              `<span>${part.title}</span></a>` +
              `<button class="rail-chev" type="button" aria-label="Показать разделы части «${part.title}»">▸</button></div>`;
      if (!sheet) html += `<div class="rail-part-progress" aria-hidden="true"><b></b></div>`;
      html += '<ul class="rail-sections">';
      part.sections.forEach(s => {
        html += `<li><a href="#${s.id}" data-rail-target="${s.id}">${s.label}</a></li>`;
      });
      html += '</ul></li>';
    });
    html += '</ul>';
    return html;
  }

  let railState = null; // { parts, flat, current, openParts:Set, built }

  function buildRailTOC() {
    const rail = $('#toc-rail');
    const sheet = $('#toc-rail-sheet');
    const parts = collectNavModel();
    if (!parts.length) return;

    const flat = [];
    parts.forEach(p => p.sections.forEach(s => flat.push({ part: p, ...s })));

    if (rail) {
      rail.innerHTML =
        '<div class="toc-rail-head"><span>Содержание</span><span class="toc-rail-pct">0%</span></div>' +
        '<div class="toc-rail-progress" aria-hidden="true"><b></b></div>' +
        railTreeHtml(parts, { sheet: false });
    }
    if (sheet) {
      sheet.innerHTML = railTreeHtml(parts, { sheet: true });
    }

    railState = {
      parts,
      flat,
      current: -1,
      openParts: new Set(),     // user-toggled parts (override the auto-current)
      manualOpen: new Set(),    // parts the reader explicitly expanded
      built: true
    };

    // Chevron toggles: track manual open/close state per part
    $$('.rail-chev').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const li = btn.closest('.rail-part');
        if (!li || !railState) return;
        const key = li.dataset.railPart;
        if (railState.manualOpen.has(key)) railState.manualOpen.delete(key);
        else railState.manualOpen.add(key);
        li.classList.toggle('open', railState.manualOpen.has(key));
      });
    });

    updateRailFromScroll();
  }

  // Scrollspy: highlight the section occupying the top third of the viewport.
  // Same «line» heuristic as the demo: 0.3 * innerHeight; bottom-of-page pins
  // the last section. Updates: .on for the active section link, .read for the
  // sections before it, the current part's expansion + progress bar, the
  // rail's global % read, and the reading-bar crumb/fill.
  function updateRailFromScroll() {
    if (!railState || !railState.built) return;
    const { flat, parts } = railState;

    const line = window.innerHeight * 0.3;
    let k = 0;
    for (let i = 0; i < flat.length; i++) {
      const el = flat[i].el;
      if (!el) continue;
      if (el.getBoundingClientRect().top <= line) k = i;
    }
    const docEl = document.documentElement;
    if (window.scrollY + window.innerHeight >= docEl.scrollHeight - 4) k = flat.length - 1;

    if (k !== railState.current) {
      railState.current = k;
      const cur = flat[k];
      const curPartKey = cur ? cur.part.key : null;

      // section links: .on for current, .read for everything before it
      $$('[data-rail-target]').forEach(a => {
        const idx = flat.findIndex(s => s.id === a.dataset.railTarget);
        if (idx < 0) return;
        a.classList.toggle('on', idx === k);
        a.classList.toggle('read', idx < k);
      });

      // part rows: .on for the active part; expand the active part unless the
      // reader manually closed it; manually-opened parts stay open
      parts.forEach(p => {
        const li = document.querySelector(`.rail-part[data-rail-part="${p.key}"]`);
        if (!li) return;
        const isActive = p.key === curPartKey;
        li.classList.toggle('on', isActive);
        const open = isActive || railState.manualOpen.has(p.key);
        li.classList.toggle('open', open);
      });

      // reading-bar crumb: «Part › Section»
      if (cur) {
        const crumb = $('#reading-bar-crumb');
        const partLabel = cur.part.key === 'appendices' ? 'Приложения' : 'Часть ' + cur.part.key;
        if (crumb) crumb.innerHTML = `${partLabel} › <b>${cur.label}</b>`;
      }
    }

    // global % read + bar fill (cheap, runs on scroll)
    const scrollable = Math.max(1, docEl.scrollHeight - window.innerHeight);
    const g = Math.min(1, Math.max(0, window.scrollY / scrollable));
    const pct = Math.round(g * 100);

    document.querySelectorAll('.toc-rail-pct').forEach(el => { el.textContent = pct + '%'; });
    document.querySelectorAll('.toc-rail-progress b').forEach(el => { el.style.width = (g * 100) + '%'; });

    const fill = $('#reading-bar-fill');
    if (fill) {
      fill.style.setProperty('--reading-progress', pct + '%');
      fill.setAttribute('aria-valuenow', String(pct));
    }
    const barPct = $('#reading-bar-pct');
    if (barPct) barPct.textContent = pct + '%';

    // part progress inside the rail: fraction of the active part scrolled
    const cur = flat[k];
    if (cur && cur.el) {
      const r = cur.el.getBoundingClientRect();
      const top = document.querySelector(`.rail-part[data-rail-part="${cur.part.key}"] .rail-part-progress b`);
      if (top) {
        const pr = cur.el.getBoundingClientRect();
        const partTop = pr.top;
        const partHeight = Math.max(1, pr.height);
        const pp = Math.min(1, Math.max(0, (line - partTop) / partHeight));
        top.style.width = (pp * 100) + '%';
      }
      void r;
    }
  }

  function initReadingRail() {
    buildRailTOC();

    // Scrollspy wiring: rAF-throttled, passive, also on resize
    let railTick = false;
    const requestRailUpdate = () => {
      if (!railTick) {
        railTick = true;
        window.requestAnimationFrame(() => {
          railTick = false;
          updateRailFromScroll();
        });
      }
    };
    window.addEventListener('scroll', requestRailUpdate, { passive: true });
    window.addEventListener('resize', requestRailUpdate);

    // Reading bar visibility: ≥1220px the rail covers navigation — the bar
    // stays hidden. Below that, unhide it.
    const bar = $('#reading-bar');
    const mql = window.matchMedia('(min-width: 1220px)');
    const applyBarVisibility = () => {
      if (!bar) return;
      bar.hidden = mql.matches;
      if (bar.hidden) bar.classList.remove('open');
    };
    applyBarVisibility();
    mql.addEventListener('change', applyBarVisibility);

    // ☰ sheet toggle
    const barBtn = $('#reading-bar-btn');
    if (barBtn && bar) {
      barBtn.addEventListener('click', () => {
        const open = bar.classList.toggle('open');
        barBtn.setAttribute('aria-expanded', String(open));
      });
    }

    // Rail links: smooth scroll + close the sheet; manualOpen is preserved so
    // the tree does not snap shut on navigation
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-rail-target], a.rail-part-link');
      if (!a) return;
      e.preventDefault();
      const id = a.dataset.railTarget || (a.getAttribute('href') || '').slice(1);
      const target = id && document.getElementById(id);
      if (target) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      }
      const sBar = $('#reading-bar');
      if (sBar && sBar.classList.contains('open')) {
        sBar.classList.remove('open');
        $('#reading-bar-btn')?.setAttribute('aria-expanded', 'false');
      }
    });

    // rail toggle (📑): hide/show the left rail on wide screens
    const fabTocRail = $('#fab-toc');
    if (fabTocRail) {
      fabTocRail.title = 'Содержание';
      const applyRailPref = () => {
        const hidden = storage.get('rail-hidden') === true;
        document.body.classList.toggle('rail-hidden', hidden);
      };
      applyRailPref();
    }
  }

  // ============================================================================
  // ACTIVE PART HIGHLIGHTING (FIX-07, P3)
  // ============================================================================

  /**
   * FIX-07: Intersection Observer that highlights the currently visible
   * Part's toggle button in the TOC with .toc-part-active class.
   * Detects which Part's first section (containing <h2>) is in the viewport
   * and applies the highlight. Cleans up previous observer on re-init.
   */
  let tocActiveObserver = null;

  function initActivePartHighlighting() {
    // Disconnect previous observer if it exists
    if (tocActiveObserver) {
      tocActiveObserver.disconnect();
      tocActiveObserver = null;
    }

    const sections = $$('section[data-section]');
    const partSections = []; // first section of each Part (carries data-part-title or an h2)

    sections.forEach(section => {
      if (section.hasAttribute('data-toc-exclude') || section.id === 'glossary') return;
      const sectionId = section.getAttribute('data-section') || section.id;
      const partMatch = sectionId.match(/^p(\d+[ab]?)_/);
      if (!partMatch) return;
      const partNum = partMatch[1];
      // Only track the first section of each Part
      if (partSections.find(ps => ps.partNum === partNum)) return;
      if (section.querySelector('h2') || section.hasAttribute('data-part-title')) {
        partSections.push({ partNum, section });
      }
    });

    if (partSections.length === 0) return;

    // Track which part is currently active
    let currentActivePart = null;

    tocActiveObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const partInfo = partSections.find(ps => ps.section === entry.target);
        if (!partInfo) return;

        if (entry.isIntersecting) {
          // New part entered viewport — update highlight
          if (currentActivePart !== partInfo.partNum) {
            // Remove highlight from previous active part
            $$('.toc-part-toggle.toc-part-active').forEach(btn => btn.classList.remove('toc-part-active'));
            // Add highlight to new active part
            const toggleBtn = $(`.toc-part-toggle[data-part="part_${partInfo.partNum.padStart(2, '0')}"]`);
            if (toggleBtn) {
              toggleBtn.classList.add('toc-part-active');
            }
            currentActivePart = partInfo.partNum;
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in top 20-40% of viewport
      threshold: 0
    });

    partSections.forEach(ps => tocActiveObserver.observe(ps.section));
  }

  // ============================================================================
  // INTERACTIVE ELEMENTS
  // ============================================================================

  function initInteractiveElements() {
    // Copy buttons
    $$('pre').forEach(pre => {
      if (pre.closest('.pre-wrapper')) return;
      
      const wrapper = document.createElement('div');
      wrapper.className = 'pre-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Copy code');
      
      btn.addEventListener('click', async () => {
        const success = await copyToClipboard(pre.textContent);
        btn.textContent = success ? 'Copied!' : 'Error';
        btn.classList.toggle('copied', success);
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
      
      wrapper.appendChild(btn);
    });

    // Re-initialize interactive tools after content load
    // Widget JS files auto-init via DOMContentLoaded + container detection
    if (window.OceanInsight && typeof window.OceanInsight.init === 'function') {
      window.OceanInsight.init();
    }
    if (window.EnneagramBuilder && typeof window.EnneagramBuilder.init === 'function') {
      window.EnneagramBuilder.init();
    }
    if (window.MBTIComposer && typeof window.MBTIComposer.init === 'function') {
      window.MBTIComposer.init();
    }
    if (window.PersonaSynthesis && typeof window.PersonaSynthesis.init === 'function') {
      window.PersonaSynthesis.init();
    }
    if (window.PersonaCross && typeof window.PersonaCross.init === 'function') {
      window.PersonaCross.init();
    }
    if (window.PersonaVoiceHierarchy && typeof window.PersonaVoiceHierarchy.init === 'function') {
      window.PersonaVoiceHierarchy.init();
    }
    initTokenCalc();
    initProgressBar();

    // === VISUAL SYSTEM WIDGETS ===
    // Инициализация VS-виджетов после загрузки контента
    // (iter-194: the E01–E18 mini-map nav is retired — the reading rail owns TOC)

    // VS Scroll-анимации через IntersectionObserver
    initVsScrollAnimations();

    // EventBus integration (0.3): ensure EventBus is available after content load
    if (typeof window.EventBus === 'undefined') {
      console.warn('[LazyLoader] EventBus not found — widgets will work standalone');
    }
  }

  // ============================================================================
  // VISUAL SYSTEM SCROLL ANIMATIONS
  // ============================================================================

  function initVsScrollAnimations() {
    // FIX: Handle BOTH animation class systems:
    //   .vs-scroll-enter → .vs-is-visible  (used by lazy-loader)
    //   .scroll-enter    → .is-visible     (used by vs-embed elements in parts HTML)
    const scrollElements = $$('.vs-scroll-enter, .scroll-enter');
    if (!scrollElements.length) return;

    // Проверяем prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Показываем все элементы сразу без анимации
      scrollElements.forEach(el => {
        el.classList.add('vs-is-visible');
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add both classes for maximum compatibility
          entry.target.classList.add('vs-is-visible');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    scrollElements.forEach(el => observer.observe(el));
  }



  // ============================================================================
  // THEME TOGGLE
  // ============================================================================

  function initTheme() {
    const toggle = $('#fab-theme');
    if (!toggle) return;

    // DEC-35: three-state cycle — soft dark (body.theme-dark, the default since
    // iter-194) → light (body.theme-light) → OLED (no class) → back. Legacy
    // stored values map onto the cycle: 'oled' stays OLED. A visitor with no
    // stored preference starts in soft dark — the body already carries the class
    // in the markup, so the first paint needs no JS.
    function applyTheme(theme) {
      document.body.classList.remove('theme-dark', 'theme-light');
      if (theme === 'light') {
        document.body.classList.add('theme-light');
      } else if (theme === 'dark') {
        document.body.classList.add('theme-dark');
      } // 'oled' → no class (the :root default)
      toggle.setAttribute('data-theme', theme);
    }

    let stored = localStorage.getItem('theme');
    if (!['oled', 'dark', 'light'].includes(stored)) {
      // iter-194: soft dark is the default (the soft-dark palette is the
      // recommended long-reading surface); OLED and light stay one click away.
      stored = 'dark';
    }

    applyTheme(stored);

    toggle.addEventListener('click', () => {
      const current = toggle.getAttribute('data-theme') || 'oled';
      const next = { oled: 'dark', dark: 'light', light: 'oled' }[current] || 'oled';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // ============================================================================
  // SCROLL TO TOP
  // ============================================================================

  function initScrollTop() {
    const btn = $('#fab-top');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================================
  // GLOSSARY
  // ============================================================================

  function initGlossary() {
    const fabGlossary = $('#fab-glossary');
    const glossaryPanel = $('#glossary-panel');

    // Initialize glossary panel
    if (glossaryPanel && !panelInstances['glossary-panel']) {
      panelInstances['glossary-panel'] = new Panel(glossaryPanel, {
        storageKey: 'glossary_panel_state',
        onToggle: (isOpen) => {
          fabGlossary?.classList.toggle('active', isOpen);
        }
      });
    }

    // iter-193: the vertical side tab is retired (DEC-35) — the dock 📖 button
    // is the single glossary entry point.

    // FAB glossary click
    fabGlossary?.addEventListener('click', () => {
      const panel = panelInstances['glossary-panel'];
      if (panel) {
        panel.toggle();
        panel.focus();
      }
    });

    // Load glossary content
    loadGlossaryContent();
  }

  // Cache glossary data so we don't re-fetch on every content load
  let glossaryDataCache = null;

  async function loadGlossaryContent() {
    const glossaryContent = $('#glossary-content');
    if (!glossaryContent) return;

    let glossaryData = glossaryDataCache;

    // 1. Try loading from inline <script type="application/json" id="glossary-data">
    if (!glossaryData) {
      const inlineData = document.getElementById('glossary-data');
      if (inlineData) {
        try {
          glossaryData = JSON.parse(inlineData.textContent);
          glossaryDataCache = glossaryData;
          console.log('[Glossary] Loaded data from inline JSON');
        } catch (e) {
          console.warn('[Glossary] Failed to parse inline JSON:', e.message);
        }
      }
    }

    // 2. Fallback: fetch external glossary.json
    if (!glossaryData) {
      const urls = ['data/glossary.json', './data/glossary.json'];
      for (const url of urls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            glossaryData = await response.json();
            glossaryDataCache = glossaryData;
            console.log('[Glossary] Loaded data from', url);
            break;
          }
        } catch (_e) {
          // try next URL
        }
      }
    }

    // 3. No data available — show error
    if (!glossaryData || !glossaryData.canonical_terms) {
      glossaryContent.innerHTML = '<p style="color:var(--text-muted);padding:1em;">Глоссарий недоступен. Данные не найдены.</p>';
      console.error('[Glossary] No glossary data available');
      return;
    }

    const terms = glossaryData.canonical_terms;

    // 4. Build HTML: search + grouped terms
    let html = '<div class="glossary-search"><input type="text" id="glossary-search-input" placeholder="Поиск терминов..." aria-label="Поиск в глоссарии"></div>';

    // Group terms by first letter
    const groupedTerms = {};
    terms.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!groupedTerms[firstLetter]) groupedTerms[firstLetter] = [];
      groupedTerms[firstLetter].push(term);
    });

    const sortedLetters = Object.keys(groupedTerms).sort();

    sortedLetters.forEach(letter => {
      html += '<div class="glossary-section"><h4>' + letter + '</h4><ul>';

      groupedTerms[letter].forEach(term => {
        // Use unified definition if available, fallback to regular definition.
        // iter-204: definitions are plain text with markdown `code` spans — escape the
        // text first, then turn backticked spans into <code> (they used to render as
        // literal backticks and a raw <anchors> tag in the panel).
        let definition = escapeHtml(term.unified_definition || term.definition || '')
          .replace(/`([^`]+)`/g, '<code>$1</code>');

        html += '<li class="glossary-item" data-term="' + term.term.toLowerCase() + '">';
        html += '<strong>' + term.term + '</strong>';
        if (term.abbreviation) {
          html += ' <small style="color:var(--accent);">(' + term.abbreviation + ')</small>';
        }
        html += '<br><span class="glossary-def">' + definition + '</span>';
        if (term.anchor_id) {
          html += ' <a href="#' + term.anchor_id + '" class="glossary-link" title="Перейти к разделу">\u2192</a>';
        }
        html += '</li>';
      });

      html += '</ul></div>';
    });

    glossaryContent.innerHTML = html;
    console.log('[Glossary] Rendered ' + terms.length + ' terms');

    // KI#36 fix: close glossary panel on anchor link click so user sees the target section
    glossaryContent.querySelectorAll('a.glossary-link').forEach(link => {
      link.addEventListener('click', () => {
        const panel = panelInstances['glossary-panel'];
        if (panel && panel.isOpen()) {
          // Defer close to allow native hash navigation to fire first
          setTimeout(() => panel.close(), 50);
        }
      });
    });

    // 5. Initialize search functionality
    const searchInput = document.getElementById('glossary-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const items = glossaryContent.querySelectorAll('.glossary-item');

        items.forEach(item => {
          const termText = item.dataset.term || '';
          const content = item.textContent.toLowerCase();
          const matches = termText.includes(query) || content.includes(query);
          item.style.display = matches ? '' : 'none';
        });

        // Show/hide section headers
        glossaryContent.querySelectorAll('.glossary-section').forEach(section => {
          const items = section.querySelectorAll('.glossary-item');
          const hasVisible = Array.from(items).some(item => item.style.display !== 'none');
          section.style.display = hasVisible ? '' : 'none';
        });
      });
    }
  }

  // ============================================================================
  // TOKEN CALCULATOR (V-08)
  // ============================================================================

  /**
   * Initialize the token budget calculator widget (iter C, iter 201).
   * Profile-aware: the block limits come from 7A.12 (4K = the 4K-Fallback spec,
   * 8K/16K = the table's Min/Max windows), the total class comes from the printed
   * size scale, and the profile band is a hint, never a verdict.
   * Progressive enhancement: without JS the static tables remain functional.
   */
  function initTokenCalc() {
    const calcEl = $('#token-calc');
    if (!calcEl) return;

    const profileEl = $('#calc-profile');
    const blocks = [
      { key: 'sp', slider: $('#calc-sp'), valEl: $('#calc-sp-val') },
      { key: 'desc', slider: $('#calc-desc'), valEl: $('#calc-desc-val') },
      { key: 'ex', slider: $('#calc-ex'), valEl: $('#calc-ex-val') },
      { key: 'greeting', slider: $('#calc-greeting'), valEl: $('#calc-greeting-val') },
    ];
    const totalEl = $('#calc-total');
    const rangeEl = $('#calc-budget-range');
    const statusEl = $('#calc-status');

    if (!profileEl || !totalEl || !rangeEl || !statusEl ||
        blocks.some((b) => !b.slider)) return;

    // Limits: [min, max] per block, plus the profile's total band (orientir).
    const PROFILES = {
      '4k': { label: '4K', band: [410, 540], limits: { sp: [80, 100], desc: [150, 200], ex: [130, 160], greeting: [50, 80] } },
      '8k': { label: '8K', band: [400, 900], limits: { sp: [50, 200], desc: [150, 700], ex: [80, 400], greeting: [40, 100] } },
      '16k': { label: '16K+', band: [740, 1140], limits: { sp: [50, 200], desc: [150, 700], ex: [80, 400], greeting: [40, 100] } },
    };
    const NAMES = { sp: 'System Prompt', desc: 'Description', ex: 'Examples', greeting: 'Greeting' };
    const MARK = { ok: '✓', high: '⚠', low: '▲' };

    function statusFor(value, min, max) {
      if (value < min) return 'low';
      if (value > max) return 'high';
      return 'ok';
    }

    function updateCalc() {
      const profile = PROFILES[profileEl.value] || PROFILES['8k'];
      let total = 0;

      blocks.forEach((b) => {
        const value = parseInt(b.slider.value, 10);
        total += value;
        if (b.valEl) b.valEl.textContent = value;
      });
      totalEl.textContent = total;

      statusEl.replaceChildren();
      blocks.forEach((b) => {
        const value = parseInt(b.slider.value, 10);
        const [min, max] = profile.limits[b.key];
        const state = statusFor(value, min, max);
        const chip = document.createElement('span');
        chip.className = 'token-calc-chip token-calc-chip--' + state;
        chip.textContent = NAMES[b.key] + ' ' + MARK[state];
        chip.title = state === 'ok'
          ? `${value} — в лимите ${profile.label} (${min}–${max})`
          : state === 'high'
            ? `${value} — выше лимита ${profile.label} (${max})`
            : `${value} — ниже лимита ${profile.label} (${min})`;
        statusEl.appendChild(chip);
      });

      let cls = 'over';
      let clsName = 'Перегруз (>2500)';
      if (total < 400) {
        cls = 'over';
        clsName = 'Минимум (<400)';
      } else if (total <= 900) {
        cls = 'budget-basic';
        clsName = 'Базовый (400–900)';
      } else if (total <= 1500) {
        cls = 'budget-standard';
        clsName = 'Стандартный (900–1500)';
      } else if (total <= 2500) {
        cls = 'budget-extended';
        clsName = 'Расширенный (1500–2500)';
      }
      rangeEl.className = 'tag ' + cls;
      rangeEl.textContent = clsName;
      rangeEl.title = `Полоса ${profile.label}: ${profile.band[0]}–${profile.band[1]} (ориентир, не гейт)`;
      statusEl.dataset.band = (total >= profile.band[0] && total <= profile.band[1]) ? 'in' : 'out';
    }

    profileEl.addEventListener('change', updateCalc);
    blocks.forEach((b) => b.slider.addEventListener('input', updateCalc));

    updateCalc();
    console.log('[TokenCalc] Initialized');
  }

  // ============================================================================
  // PROGRESS BAR (V-09)
  // ============================================================================

  /**
   * Initialize the reading progress bar.
   * Uses IntersectionObserver to track which sections are visible.
   * Progressive enhancement: without JS, progress bar is hidden (no loss of functionality).
   */
  function initProgressBar() {
    // Check if progress bar already exists
    let progressBar = $('.progress-bar');
    
    if (!progressBar) {
      // Create progress bar element
      progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      progressBar.setAttribute('role', 'progressbar');
      progressBar.setAttribute('aria-valuenow', '0');
      progressBar.setAttribute('aria-valuemin', '0');
      progressBar.setAttribute('aria-valuemax', '100');
      progressBar.innerHTML = '<div class="progress-fill"></div>';
      document.body.appendChild(progressBar);
    }

    const progressFill = progressBar.querySelector('.progress-fill');
    if (!progressFill) return;

    let sections = $$('section[data-section]');
    if (sections.length === 0) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      
      progressFill.style.width = progress + '%';
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Initial update
    updateProgress();

    console.log('[ProgressBar] Initialized');
  }

  // ============================================================================
  // PANEL INITIALIZATION
  // ============================================================================

  function initPanels() {
    // TOC Panel
    const tocPanel = $('#toc-panel');
    const fabToc = $('#fab-toc');
    
    if (tocPanel && !panelInstances['toc-panel']) {
      panelInstances['toc-panel'] = new Panel(tocPanel, {
        storageKey: 'toc_panel_state',
        onToggle: (isOpen) => {
          fabToc?.classList.toggle('active', isOpen);
        }
      });
    }

    // iter-193: 📑 is dual-mode (DEC-35). ≥1220px the persistent rail IS the
    // TOC, so 📑 toggles the rail's visibility (body.rail-hidden). Below
    // 1220px the rail is display:none, so 📑 opens the classic floating TOC
    // panel. The click handler decides by the same media query the CSS uses.
    fabToc?.addEventListener('click', () => {
      const wide = window.matchMedia('(min-width: 1220px)').matches;
      if (wide) {
        const hidden = !(document.body.classList.toggle('rail-hidden'));
        storage.set('rail-hidden', hidden);
      } else {
        const panel = panelInstances['toc-panel'];
        if (panel) {
          panel.toggle();
          panel.focus();
        }
      }
    });

    // Notepad Panel
    const notepadPanel = $('#notepad-panel');
    const fabNotepad = $('#fab-scratchpad');
    
    if (notepadPanel && !panelInstances['notepad-panel']) {
      panelInstances['notepad-panel'] = new NotepadPanel(notepadPanel, {
        storageKey: 'notepad_panel_state',
        // IMP-52: Notepad content is global — uses lcg-notepad-v1 internally,
        // position/size still uses per-panel storageKey
        onToggle: (isOpen) => {
          fabNotepad?.classList.toggle('active', isOpen);
        }
      });
    }

    fabNotepad?.addEventListener('click', () => {
      const panel = panelInstances['notepad-panel'];
      if (panel) {
        panel.toggle();
        panel.focus();
      }
    });

    // Close TOC on link click
    $$('#toc-panel a').forEach(link => {
      link.addEventListener('click', () => {
        panelInstances['toc-panel']?.close();
      });
    });

    console.log('[Panels] FAB buttons initialized');
  }

  // ============================================================================
  // UI HELPERS
  // ============================================================================

  function showFABs() {
    const fabs = $('#fab-group');
    if (fabs) fabs.classList.remove('hidden');
    // iter-193: dock the FAB buttons into the grid's tool column (DEC-35).
    // The buttons keep their ids/handlers; the fab-group itself stays hidden
    // (it was only ever a positioning wrapper — the dock owns layout now).
    const dock = $('#tool-dock');
    if (dock && fabs) {
      [...fabs.children].forEach(btn => dock.appendChild(btn));
    }
  }

  // ============================================================================
  // BACKWARD COMPATIBILITY
  // ============================================================================

  // Backward compatibility: strip ?layer=N from old URLs
  function cleanupLayerURL() {
    const url = new URL(window.location);
    if (url.searchParams.has('layer')) {
      const hash = url.hash;
      url.searchParams.delete('layer');
      history.replaceState(null, '', url.pathname + url.search + hash);
    }
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  // Auto-load content on page load (no modal)
  function initApp() {
    cleanupLayerURL();
    showFABs();
    loadContent();
  }

  async function init() {
    console.log('[LazyLoader] Initializing v' + CONFIG.VERSION + '...');

    // Load auto-generated anchor redirects (0.18) before handling legacy anchors
    await loadAnchorRedirects();
    
    // Handle v5.12 legacy anchor redirects (0.18)
    handleLegacyAnchor();

    initTheme();
    initScrollTop();
    initPanels();
    initGlossary();
    initReadingRail();
    initHashChangeListener();

    // Keyboard: close panels on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        Object.values(panelInstances).forEach(panel => {
          if (panel.isOpen()) panel.close();
        });
      }
    });

    initApp();

    console.log('[LazyLoader] Ready (v' + CONFIG.VERSION + ')');
  }

  // Expose API
  window.LazyLoader = {
    loadContent,
    panels: panelInstances,
    version: CONFIG.VERSION
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
