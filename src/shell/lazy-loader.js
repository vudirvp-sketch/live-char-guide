/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - LAZY LOADER v6.2.3
 * ============================================================================
 * 
 * Dynamic layer loading system:
 * 1. User selects layer → fetch HTML parts from parts-l{N}/
 * 2. Insert content into #content container
 * 3. Handle anchor navigation and browser history
 * 
 * Features:
 * - Panel system (drag, resize, save state)
 * - Notepad with persistence
 * - Glossary panel
 * - Theme toggle (dark/light/oled)
 * - Content width toggle
 * - Scroll to top
 * 
 * Architecture:
 * - Shell (this file) loads once
 * - Layer content fetched on demand
 * - localStorage remembers preferences
 */

(function() {
  'use strict';

  // ============================================================================
  // CONFIGURATION
  // ============================================================================
  
  const CONFIG = {
    STORAGE_KEY: 'guide-layer-selection',
    VERSION: '6.2.0',
    LAYERS: ['1', '2', '3'],
    LAYER_LABELS: {
      '1': '\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439',
      '2': '\u0413\u043b\u0443\u0431\u043e\u043a\u0438\u0439',
      '3': '\u042d\u043a\u0441\u043f\u0435\u0440\u0442\u043d\u044b\u0439'
    },
    DEFAULT_LAYER: '2',
    PARTS_DIR: {
      '1': 'parts-l1',
      '2': 'parts-l2',
      '3': 'parts-l3'
    }
  };

  // ============================================================================
  // STATE
  // ============================================================================
  
  let currentLayer = null;
  let isLoading = false;
  let loadedParts = new Set();
  let lastVisibleSection = null; // IMP-46: scroll preservation

  // ============================================================================
  // ANCHOR REDIRECT MAP (§0.18: v5.12 → v6 backward compatibility)
  // ============================================================================

  // Hardcoded fallback — used if data/anchor-redirects.json is not available
  const ANCHOR_REDIRECTS_FALLBACK = {
    '03_core_blocks': 'p2_basic_anchors',
    '04_spine': 'p4_spine_overview',
    '05_ocean': 'p5_ocean_basics',
    '06_cot': 'p6_cot_basics',
    '07_tech': 'p7_system_prompt',
    '08_anti': 'p8_antipatterns_overview',
    '09_diag': 'p9_troubleshooting',
    '01_intro': 'p1_card_overview',
    '02_voice': 'p3_voice_isolation',
    '10_examples': 'p10_elena_l1'
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
  // GUIDE LAYER VISIBILITY HELPERS (§0.6)
  // ============================================================================

  /**
   * Get current guide layer from data-layer attribute or URL param.
   * Widgets use this to determine visibility and functionality level.
   * @returns {number} Layer number (1, 2, or 3)
   */
  function getGuideLayer() {
    return parseInt(document.body.getAttribute('data-layer') || '2', 10);
  }

  /**
   * Check if psychological tools (OCEAN, Enneagram, MBTI) are allowed.
   * These tools are only available at L2+ guide layer.
   * @returns {boolean}
   */
  function isWidgetAllowed() {
    return getGuideLayer() >= 2;
  }

  /**
   * Get widget functionality level (M1/M2/M3).
   * M1 = quick preset, M2 = full config, M3 = expert validation.
   * Only meaningful at L2+ guide layer.
   * @returns {number} Widget level (1, 2, or 3)
   */
  function getWidgetLevel() {
    // M3 — expert mode (can be toggled by user preference)
    if (window.userExpertMode) return 3;
    // M2 — default for L2+
    if (getGuideLayer() >= 2) return 2;
    // M1 — fallback (shouldn't happen at L2+)
    return 1;
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
  // LAYER SELECTION
  // ============================================================================

  function getSavedLayer() {
    try {
      const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
      if (saved && CONFIG.LAYERS.includes(saved)) return saved;
    } catch (e) {
      console.warn('[LazyLoader] localStorage unavailable:', e.message);
    }
    return null;
  }

  function saveLayer(layer) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, layer);
    } catch (e) {
      console.warn('[LazyLoader] Failed to save layer:', e.message);
    }
  }

  function getLayerFromURL() {
    const params = new URLSearchParams(window.location.search);
    const layer = params.get('layer');
    return layer && CONFIG.LAYERS.includes(layer) ? layer : null;
  }

  // ============================================================================
  // CONTENT LOADING
  // ============================================================================

  function showLoading() {
    $('#loading-overlay')?.classList.remove('hidden');
  }

  function hideLoading() {
    $('#loading-overlay')?.classList.add('hidden');
  }

  async function fetchPart(layer, filename) {
    const dir = CONFIG.PARTS_DIR[layer];
    const url = `${dir}/${filename}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (e) {
      console.error(`[LazyLoader] Failed to fetch ${url}:`, e.message);
      return `<!-- Failed to load: ${filename} -->`;
    }
  }

  async function loadLayerContent(layer) {
    if (isLoading) {
      console.warn('[LazyLoader] Already loading');
      return;
    }

    isLoading = true;
    showLoading();

    const content = $('#content');
    if (!content) {
      console.error('[LazyLoader] #content element not found');
      isLoading = false;
      hideLoading();
      return;
    }

    // IMP-46: Record nearest visible data-section before clearing content
    lastVisibleSection = null;
    const allSections = $$('section[data-section]');
    const viewportMiddle = window.scrollY + window.innerHeight / 2;
    let minDistance = Infinity;
    allSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const secMiddle = rect.top + window.scrollY + rect.height / 2;
      const dist = Math.abs(secMiddle - viewportMiddle);
      if (dist < minDistance) {
        minDistance = dist;
        lastVisibleSection = sec.getAttribute('data-section') || sec.id;
      }
    });

    content.innerHTML = '';
    loadedParts.clear();

    try {
      const dir = CONFIG.PARTS_DIR[layer];
      const manifestResponse = await fetch(`${dir}/manifest.json`);
      
      if (!manifestResponse.ok) {
        throw new Error(`Failed to load manifest: HTTP ${manifestResponse.status}`);
      }
      
      const manifest = await manifestResponse.json();
      const parts = manifest.parts || [];
      
      console.log(`[LazyLoader] Loading layer ${layer}: ${parts.length} parts`);
      
      const fetchPromises = parts.map(part => fetchPart(layer, part.file));
      const results = await Promise.all(fetchPromises);
      
      content.innerHTML = results.join('\n');
      document.body.setAttribute('data-layer', layer);
      content.classList.remove('content-hidden');
      
      updateSwitcherButtons(layer);
      initInteractiveElements();
      generateTOC();
      initActivePartHighlighting();
      handleAnchor();
      loadGlossaryContent();
      updateGlossaryForLayer(layer);
      handleLegacyAnchor();
      
      // IMP-46: Scroll to previously visible section after layer switch
      if (lastVisibleSection) {
        const targetEl = document.getElementById(lastVisibleSection);
        if (targetEl) {
          setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 100);
        }
      }
      
      console.log(`[LazyLoader] Layer ${layer} loaded successfully`);
      
    } catch (e) {
      console.error('[LazyLoader] Failed to load layer:', e);
      content.innerHTML = `<div class="callout warn"><strong>Ошибка загрузки</strong><p>Не удалось загрузить контент: ${e.message}</p><p>Попробуйте обновить страницу.</p></div>`;
    }

    isLoading = false;
    hideLoading();
  }

  // ============================================================================
  // IMP-47: WIDGET DISAPPEARANCE TOAST
  // ============================================================================

  // Widget containers that only exist on L2+ or L3
  const WIDGET_SELECTORS = {
    '#ocean-embed': { minLayer: 2, name: 'OCEAN' },
    '#enneagram-embed': { minLayer: 2, name: 'Эннеаграмма' },
    '#mbti-embed': { minLayer: 2, name: 'MBTI' },
    '#persona-cross': { minLayer: 3, name: 'OCEAN×Эннеаграмма' }
  };

  function checkWidgetDisappearance(oldLayer, newLayer) {
    if (!oldLayer || parseInt(newLayer, 10) >= parseInt(oldLayer, 10)) return;

    const oldLayerNum = parseInt(oldLayer, 10);
    const newLayerNum = parseInt(newLayer, 10);

    // Find which widgets existed in the old layer but don't exist in the new layer
    const disappearedWidgets = [];
    Object.entries(WIDGET_SELECTORS).forEach(([_selector, info]) => {
      if (oldLayerNum >= info.minLayer && newLayerNum < info.minLayer) {
        // Only show toast if the widget actually existed in the old content
        // (some parts don't have widgets at all)
        disappearedWidgets.push(info);
      }
    });

    if (disappearedWidgets.length === 0) return;

    // Show toast
    const toast = document.createElement('div');
    toast.className = 'widget-toast';

    const targetLayer = disappearedWidgets[0].minLayer;
    const targetLabel = CONFIG.LAYER_LABELS[String(targetLayer)];

    const message = document.createElement('span');
    message.textContent = `Интерактивный инструмент доступен на ${targetLabel} слое`;

    const switchBtn = document.createElement('button');
    switchBtn.textContent = `Перейти → ${targetLabel}`;
    switchBtn.className = 'widget-toast-btn';
    switchBtn.addEventListener('click', () => {
      toast.remove();
      switchLayer(String(targetLayer));
    });

    toast.appendChild(message);
    toast.appendChild(switchBtn);
    document.body.appendChild(toast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('widget-toast-fadeout');
        setTimeout(() => toast.remove(), 300);
      }
    }, 3000);
  }

  // ============================================================================
  // UI UPDATES
  // ============================================================================

  function hideModal() { $('#layer-modal')?.classList.add('hidden'); }
  // Reserved for future use
  function _showModal() { $('#layer-modal')?.classList.remove('hidden'); }
  function showSwitcher() { $('#layer-switcher')?.classList.remove('hidden'); }

  function updateSwitcherButtons(activeLayer) {
    $$('.layer-switch-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.layer === activeLayer);
    });
  }

  function showFABs() {
    const fabs = $('#fab-group');
    if (fabs) fabs.classList.remove('hidden');
  }

  function showLayerIndicator(layer) {
    const numEl = $('#current-layer-number');
    const labelEl = $('#current-layer-label');
    if (numEl) numEl.textContent = layer;
    if (labelEl) labelEl.textContent = CONFIG.LAYER_LABELS[layer] || '';
  }

  // ============================================================================
  // LAYER SWITCHING
  // ============================================================================

  async function switchLayer(layer, anchor = null) {
    if (!CONFIG.LAYERS.includes(layer)) {
      console.error('[LazyLoader] Invalid layer:', layer);
      return;
    }

    // If same layer, just scroll to anchor if provided
    if (layer === currentLayer) {
      if (anchor) {
        scrollToAnchor(anchor);
      }
      return;
    }

    const previousLayer = currentLayer; // IMP-47: track previous layer
    currentLayer = layer;
    saveLayer(layer);
    
    const url = new URL(window.location);
    url.searchParams.set('layer', layer);
    url.hash = anchor || '';
    history.pushState({ layer, anchor }, '', url);
    
    await loadLayerContent(layer);
    
    // Update layer indicator with new layer
    showLayerIndicator(layer);
    
    // IMP-47: Show toast if widgets disappeared on layer downgrade
    checkWidgetDisappearance(previousLayer, layer);
    
    // Scroll to anchor or top
    if (anchor) {
      scrollToAnchor(anchor);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function scrollToAnchor(anchor) {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn('[LazyLoader] Anchor not found:', anchor);
    }
  }

  async function selectLayer(layer) {
    hideModal();
    showSwitcher();
    showFABs();
    showLayerIndicator(layer);
    await switchLayer(layer);
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
   * - Group sections by Part (using data-section prefix p{N}_)
   * - First section of each Part (containing <h2>) becomes Tier 1 entry
   * - Sections with data-toc-nav attribute become Tier 2 entries
   * - Sections with data-toc-exclude or id="glossary" are skipped entirely
   * - Text truncation removed (NAV-01): CSS text-overflow:ellipsis handles overflow
   */
  function generateTOC() {
    const tocContent = $('#toc-content');
    if (!tocContent) return;

    const sections = $$('section[id]');

    // Group sections by Part number
    const partGroups = {};
    const partOrder = [];

    sections.forEach(section => {
      // Skip glossary and data-toc-exclude sections (NAV-01 §2.4, §3.6)
      if (section.hasAttribute('data-toc-exclude') || section.id === 'glossary') return;

      // Extract part number from data-section (format: p{N}_{topic})
      const sectionId = section.getAttribute('data-section') || section.id;
      const partMatch = sectionId.match(/^p(\d+)_/);
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

      // Tier 1: Find h2 in first section of this Part
      const firstSection = partSections[0];
      const h2 = firstSection.querySelector('h2');
      if (!h2) return;

      const partTitle = h2.textContent.replace(/^[0-9.]+\s*/, '').trim();
      // partId intentionally not used — data-part attribute uses partNum directly

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
          // Display text: first h3 textContent, cleaned
          const h3 = navSection.querySelector('h3');
          let linkText;
          if (h3) {
            linkText = h3.textContent.replace(/^[0-9.]+\s*/, '').trim();
          } else {
            // Fallback: use data-section ID as slug-derived label
            linkText = navSection.getAttribute('data-section')
              .replace(/^p\d+_/, '')
              .replace(/_/g, ' ');
          }
          tocHtml += `<li class="toc-indent"><a href="#${navSection.id}">${linkText}</a></li>`;
        });
        tocHtml += `</ul>`;
      }

      tocHtml += `</li>`;
    });

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
    // Disconnect previous observer if it exists (layer switch re-init)
    if (tocActiveObserver) {
      tocActiveObserver.disconnect();
      tocActiveObserver = null;
    }

    const sections = $$('section[id]');
    const partSections = []; // first section of each Part (contains h2)

    sections.forEach(section => {
      if (section.hasAttribute('data-toc-exclude') || section.id === 'glossary') return;
      const sectionId = section.getAttribute('data-section') || section.id;
      const partMatch = sectionId.match(/^p(\d+)_/);
      if (!partMatch) return;
      const partNum = partMatch[1];
      // Only track the first section of each Part
      if (partSections.find(ps => ps.partNum === partNum)) return;
      const h2 = section.querySelector('h2');
      if (h2) {
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
  // GLOSSARY LAYER FILTERING (IMP-51)
  // ============================================================================

  /**
   * FIX-04/§3.4: Hide glossary terms not applicable to current layer.
   * Uses CSS class toggle (.glossary-item-hidden) instead of inline styles.
   */
  function updateGlossaryForLayer(layer) {
    const layerNum = parseInt(layer, 10);
    const glossaryItems = $$('.glossary-item');
    
    glossaryItems.forEach(item => {
      const layers = (item.dataset.layers || '').split(' ').map(Number);
      const isAvailable = layers.some(l => l === 0 || l === layerNum);
      
      if (!isAvailable && layers.length > 0) {
        item.classList.add('glossary-item-hidden');
      } else {
        item.classList.remove('glossary-item-hidden');
      }
    });
  }

  // ============================================================================
  // LAYER SWITCH LINKS (data-layer-switch in-content navigation)
  // ============================================================================

  /**
   * Initialize the layer switch UI state (sync switcher buttons with current layer).
   * This is called after each layer content load to ensure the layer-switcher
   * reflects the current layer and that its buttons are properly highlighted.
   */
  function initLayerSwitch() {
    const switcher = $('#layer-switcher');
    if (!switcher) return;
    // Ensure switcher is visible after content replacement
    if (currentLayer) {
      switcher.classList.remove('hidden');
      updateSwitcherButtons(currentLayer);
      showLayerIndicator(currentLayer);
    }
  }

  /**
   * Bind click handlers to [data-layer-switch] links inside loaded content.
   * Format: data-layer-switch="3#p8_ap15_extended" → switch to layer 3, scroll to #p8_ap15_extended
   * Format: data-layer-switch="2#p5_ocean_validator" → switch to layer 2, scroll to #p5_ocean_validator
   */
  function bindDataLayerSwitchLinks() {
    $$('[data-layer-switch]').forEach(link => {
      // Remove previous handler to avoid duplicates on re-init
      link.removeEventListener('click', handleLayerSwitchClick);
      link.addEventListener('click', handleLayerSwitchClick);
    });
  }

  function handleLayerSwitchClick(e) {
    e.preventDefault();
    const attr = e.currentTarget.getAttribute('data-layer-switch');
    if (!attr) return;

    // Parse format: "{layer}#{anchor}" or just "{layer}"
    const [layerPart, anchorPart] = attr.split('#');
    const targetLayer = layerPart;
    const anchor = anchorPart || null;

    if (CONFIG.LAYERS.includes(targetLayer)) {
      switchLayer(targetLayer, anchor);
    } else {
      console.warn('[LazyLoader] Invalid layer in data-layer-switch:', targetLayer);
    }
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

    // Re-initialize interactive tools after layer switch
    // (content is replaced, so event listeners are lost)
    // Widget JS files auto-init via DOMContentLoaded + container detection
    // Re-trigger widget initialization after layer content replacement
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
    initLayerSwitch();
    initLayerToggle();
    initTooltips();
    initTokenCalc();
    initProgressBar();
    bindDataLayerSwitchLinks();

    // EventBus integration (§0.3): ensure EventBus is available after layer switch
    // event-bus.js is loaded before lazy-loader.js, so window.EventBus should exist
    if (typeof window.EventBus === 'undefined') {
      console.warn('[LazyLoader] EventBus not found — widgets will work standalone');
    }
  }

  // ============================================================================
  // TOOLTIP SYSTEM (Phase 3: term-marker hover tooltips)
  // ============================================================================

  /**
   * Initialize tooltip behavior for .term-marker elements.
   * On mouseenter: fetch first paragraph from referenced section and show tooltip.
   * On mouseleave: remove tooltip.
   * On mobile: tap to toggle tooltip.
   */
  function initTooltips() {
    const markers = $$('.term-marker');
    if (markers.length === 0) return;

    console.log(`[Tooltip] Initializing ${markers.length} term-markers`);

    // Tooltip summary cache — avoids re-fetching the same section content
    const tooltipCache = {};

    /**
     * Get a short summary (1-2 sentences) from a section element.
     * Tries: first <p> inside the section, then first list item, then h2 subtitle.
     */
    function getSectionSummary(sectionEl) {
      // Try first <p> that has actual text content
      const paragraphs = sectionEl.querySelectorAll('p');
      for (const p of paragraphs) {
        const text = p.textContent.trim();
        if (text.length > 20 && text.length < 500) {
          // Truncate to ~2 sentences
          const sentences = text.match(/[^.!?]+[.!?]+/g);
          if (sentences && sentences.length > 2) {
            return sentences.slice(0, 2).join(' ').trim();
          }
          return text.length > 200 ? text.slice(0, 200) + '...' : text;
        }
      }

      // Fallback: first <li>
      const firstLi = sectionEl.querySelector('li');
      if (firstLi) {
        const text = firstLi.textContent.trim();
        return text.length > 150 ? text.slice(0, 150) + '...' : text;
      }

      // Fallback: h2 text
      const h2 = sectionEl.querySelector('h2');
      if (h2) {
        return h2.textContent.trim();
      }

      return 'Подробнее — перейдите по ссылке';
    }

    /**
     * Determine which layer a section belongs to.
     */
    function getLayerForTooltip(sectionEl) {
      const layer = sectionEl.getAttribute('data-layer');
      if (layer === 'l1') return 1;
      if (layer === 'l2') return 2;
      if (layer === 'l3') return 3;
      return 0;
    }

    /**
     * Create and attach tooltip element to a marker.
     */
    async function createTooltip(marker) {
      const ref = marker.getAttribute('data-tooltip-ref');
      if (!ref) return;

      // Don't create duplicate tooltips
      if (marker.querySelector('.term-tooltip')) return;

      const sectionId = ref.startsWith('#') ? ref.slice(1) : ref;

      // Try to find the section in current DOM first
      const sectionEl = document.getElementById(sectionId);

      let summary;
      let targetLayer;
      const isAvailableInCurrentLayer = !!sectionEl;

      if (sectionEl) {
        targetLayer = getLayerForTooltip(sectionEl);

        // Check cache
        if (tooltipCache[sectionId]) {
          summary = tooltipCache[sectionId];
        } else {
          summary = getSectionSummary(sectionEl);
          tooltipCache[sectionId] = summary;
        }
      } else {
        // Section not in current layer — build generic tooltip
        // Determine target layer from tooltip-ref data attribute or from section registry
        const targetLayerAttr = marker.getAttribute('data-target-layer');
        if (targetLayerAttr) {
          targetLayer = parseInt(targetLayerAttr, 10);
        } else {
          // Default: if not found in current layer, it's likely L2 or L3
          targetLayer = 2;
        }

        summary = marker.getAttribute('data-tooltip-summary') || 'Доступно на более глубоком слое';
      }

      // Build tooltip HTML
      const tooltip = document.createElement('span');
      tooltip.className = 'term-tooltip';
      tooltip.setAttribute('role', 'tooltip');

      let layerBadge = '';
      if (!isAvailableInCurrentLayer && targetLayer > 0) {
        const layerLabels = { 1: 'Минимальный', 2: 'Глубокий', 3: 'Экспертный' };
        const layerClass = `layer-${targetLayer}`;
        layerBadge = ` <span class="layer-badge ${layerClass}">${layerLabels[targetLayer] || 'L' + targetLayer}</span>`;
      }

      tooltip.innerHTML = `<span class="term-tooltip-summary">${summary}</span>` +
        `<a class="term-tooltip-link" href="${ref}" data-layer-switch="${targetLayer}#${sectionId}">Подробнее →</a>${layerBadge}`;

      marker.appendChild(tooltip);
    }

    // Bind events to each marker
    markers.forEach(marker => {
      // Hover: create tooltip on mouseenter (lazy)
      marker.addEventListener('mouseenter', () => {
        createTooltip(marker);
      });

      // Focus: create tooltip for keyboard users
      marker.addEventListener('focus', () => {
        createTooltip(marker);
      });

      // Mobile: tap to toggle
      marker.addEventListener('click', (e) => {
        // Only for touch devices or small screens
        if (window.innerWidth <= 768 || ('ontouchstart' in window)) {
          e.preventDefault();
          marker.classList.toggle('tooltip-active');
          createTooltip(marker);
        }
      });
    });

    // Close tooltips on outside click (mobile)
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.term-marker')) {
        $$('.term-marker.tooltip-active').forEach(m => m.classList.remove('tooltip-active'));
      }
    });

    // Close tooltips on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        $$('.term-marker.tooltip-active').forEach(m => m.classList.remove('tooltip-active'));
      }
    });
  }

  // ============================================================================
  // THEME TOGGLE
  // ============================================================================

  function initTheme() {
    const toggle = $('#fab-theme');
    if (!toggle) return;

    const themes = ['dark', 'light', 'oled'];
    const iconDark = toggle.querySelector('.theme-icon-dark');
    const iconLight = toggle.querySelector('.theme-icon-light');
    const iconOled = toggle.querySelector('.theme-icon-oled');

    function applyTheme(theme) {
      document.body.classList.remove('theme-light', 'theme-oled');
      
      [iconDark, iconLight, iconOled].forEach(icon => { if (icon) icon.hidden = true; });
      
      if (theme === 'light') {
        document.body.classList.add('theme-light');
        if (iconLight) iconLight.hidden = false;
      } else if (theme === 'oled') {
        document.body.classList.add('theme-oled');
        if (iconOled) iconOled.hidden = false;
      } else {
        if (iconDark) iconDark.hidden = false;
      }
      
      toggle.setAttribute('data-theme', theme);
    }

    let stored = localStorage.getItem('theme');
    if (!stored || !themes.includes(stored)) {
      stored = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    
    applyTheme(stored);

    toggle.addEventListener('click', () => {
      const current = toggle.getAttribute('data-theme') || 'dark';
      const nextTheme = themes[(themes.indexOf(current) + 1) % themes.length];
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }

  // ============================================================================
  // WIDTH TOGGLE
  // ============================================================================

  function initWidthToggle() {
    const btn = $('#fab-width');
    if (!btn) return;

    // Load saved preference
    const saved = localStorage.getItem('content-width');
    if (saved === 'wide') {
      document.body.classList.add('content-wide');
      btn.setAttribute('aria-pressed', 'true');
    }

    btn.addEventListener('click', () => {
      const isWide = document.body.classList.toggle('content-wide');
      btn.setAttribute('aria-pressed', isWide ? 'true' : 'false');
      localStorage.setItem('content-width', isWide ? 'wide' : 'normal');
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
    const glossaryTab = $('#glossary-tab');
    const fabGlossary = $('#fab-glossary');
    const glossaryPanel = $('#glossary-panel');

    // Initialize glossary panel
    if (glossaryPanel && !panelInstances['glossary-panel']) {
      panelInstances['glossary-panel'] = new Panel(glossaryPanel, {
        storageKey: 'glossary_panel_state'
      });
    }

    // Glossary tab click
    glossaryTab?.addEventListener('click', () => {
      const panel = panelInstances['glossary-panel'];
      if (panel) {
        panel.toggle();
        panel.focus();
      }
    });

    glossaryTab?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        glossaryTab.click();
      }
    });

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

  // Cache glossary data so we don't re-fetch on every layer switch
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
      const urls = ['data/glossary.json', './data/glossary.json', 'src/data/glossary.json'];
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

    // 4. Get current layer for context-aware definitions
    const currentLayerNum = parseInt(document.body.getAttribute('data-layer') || '2', 10);

    const terms = glossaryData.canonical_terms;
    // TODO: Use layer markers in glossary term rendering
    const _layerMarkers = glossaryData.layer_markers || {
      '0': '📘', '1': '🔁', '2': '⚙️', '3': '🔍'
    };

    // 5. Build HTML: search + grouped terms
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
        const layers = term.applicable_layers || [0, 1, 2, 3];
        const layerStr = layers.join(' ');

        // Use layer-specific definition if available
        let definition = term.definition;
        if (term.layer_context && term.layer_context[String(currentLayerNum)]) {
          definition = term.layer_context[String(currentLayerNum)];
        }

        // Build layer markers
        const markers = layers.map(l => {
          const markerMap = { 0: '📘', 1: '🔁', 2: '⚙️', 3: '🔍' };
          return markerMap[l] || '';
        }).filter(m => m).join(' ');

        html += '<li class="glossary-item" data-layers="' + layerStr + '" data-term="' + term.term.toLowerCase() + '">';
        html += '<strong>' + term.term + '</strong>';
        if (term.abbreviation) {
          html += ' <small style="color:var(--accent);">(' + term.abbreviation + ')</small>';
        }
        html += '<br><span class="glossary-def">' + definition + '</span>';
        if (markers) {
          html += '<br><small style="color:var(--text-muted);">' + markers + '</small>';
        }
        if (term.anchor_id) {
          html += ' <a href="#' + term.anchor_id + '" class="glossary-link" title="Перейти к разделу">\u2192</a>';
        }
        html += '</li>';
      });

      html += '</ul></div>';
    });

    glossaryContent.innerHTML = html;
    console.log('[Glossary] Rendered ' + terms.length + ' terms (layer ' + currentLayerNum + ')');

    // 6. Initialize search functionality
    const searchInput = document.getElementById('glossary-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const items = glossaryContent.querySelectorAll('.glossary-item');

        items.forEach(item => {
          const termText = item.dataset.term || '';
          const content = item.textContent.toLowerCase();
          const matches = termText.includes(query) || content.includes(query);
          if (matches) {
            item.classList.remove('glossary-item-hidden');
          } else {
            item.classList.add('glossary-item-hidden');
          }
        });

        // Show/hide section headers
        glossaryContent.querySelectorAll('.glossary-section').forEach(section => {
          const visibleItems = section.querySelectorAll('.glossary-item:not(.glossary-item-hidden)');
          if (visibleItems.length) {
            section.classList.remove('glossary-section-hidden');
          } else {
            section.classList.add('glossary-section-hidden');
          }
        });
      });
    }
  }

  // ============================================================================
  // TOKEN CALCULATOR (V-08)
  // ============================================================================

  /**
   * Initialize the token budget calculator widget.
   * Updates total and layer recommendation in real-time as user adjusts sliders.
   * Progressive enhancement: without JS, static table remains functional.
   */
  function initTokenCalc() {
    const calcEl = $('#token-calc');
    if (!calcEl) return;

    const spSlider = $('#calc-sp');
    const descSlider = $('#calc-desc');
    const exSlider = $('#calc-ex');
    const ancSlider = $('#calc-anc');
    const totalEl = $('#calc-total');
    const layerTagEl = $('#calc-layer-tag');

    if (!spSlider || !descSlider || !exSlider || !ancSlider || !totalEl || !layerTagEl) return;

    const spValEl = $('#calc-sp-val');
    const descValEl = $('#calc-desc-val');
    const exValEl = $('#calc-ex-val');
    const ancValEl = $('#calc-anc-val');

    function updateCalc() {
      const sp = parseInt(spSlider.value, 10);
      const desc = parseInt(descSlider.value, 10);
      const ex = parseInt(exSlider.value, 10);
      const anc = parseInt(ancSlider.value, 10);
      const total = sp + desc + ex + anc;

      // Update value displays
      if (spValEl) spValEl.textContent = sp;
      if (descValEl) descValEl.textContent = desc;
      if (exValEl) exValEl.textContent = ex;
      if (ancValEl) ancValEl.textContent = anc;

      // Update total
      totalEl.textContent = total;

      // Update layer tag
      layerTagEl.className = 'tag';
      if (total < 400) {
        layerTagEl.textContent = 'Минимум (<400)';
        layerTagEl.classList.add('over');
      } else if (total <= 800) {
        layerTagEl.textContent = 'L1 (400–800)';
        layerTagEl.classList.add('layer-1');
      } else if (total <= 1500) {
        layerTagEl.textContent = 'L2 (800–1500)';
        layerTagEl.classList.add('layer-2');
      } else if (total <= 2500) {
        layerTagEl.textContent = 'L3 (1500–2500)';
        layerTagEl.classList.add('layer-3');
      } else {
        layerTagEl.textContent = 'Перегруз (>2500)';
        layerTagEl.classList.add('over');
      }
    }

    // Bind slider events
    spSlider.addEventListener('input', updateCalc);
    descSlider.addEventListener('input', updateCalc);
    exSlider.addEventListener('input', updateCalc);
    ancSlider.addEventListener('input', updateCalc);

    // Initial update
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
        storageKey: 'toc_panel_state'
      });
    }

    fabToc?.addEventListener('click', () => {
      const panel = panelInstances['toc-panel'];
      if (panel) {
        panel.toggle();
        panel.focus();
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
  // EVENT BINDING
  // ============================================================================

  function bindEvents() {
    // Layer modal buttons
    $$('.audience-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const layer = btn.dataset.layer;
        if (layer) selectLayer(layer);
      });
    });

    // Uncertain path button
    $$('.uncertain-path').forEach(btn => {
      btn.addEventListener('click', () => {
        selectLayer(btn.dataset.defaultLayer || CONFIG.DEFAULT_LAYER);
      });
    });

    // Layer switcher buttons
    $$('.layer-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const layer = btn.dataset.layer;
        if (layer) switchLayer(layer);
      });
    });

    // Browser history
    window.addEventListener('popstate', (e) => {
      if (e.state?.layer) {
        loadLayerContent(e.state.layer);
        currentLayer = e.state.layer;
        updateSwitcherButtons(e.state.layer);
      }
      // §0.18: Handle legacy anchor redirects on popstate too
      handleLegacyAnchor();
    });

    // Keyboard: close panels on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        Object.values(panelInstances).forEach(panel => {
          if (panel.isOpen()) panel.close();
        });
      }
    });
  }

  // ============================================================================
  // LAYER TOGGLE (V-14: Quick Reference toggle)
  // ============================================================================

  const LAYER_TOGGLE_KEY = 'guide-layer-toggle-state';

  function initLayerToggle() {
    // Create toggle UI
    const switcher = $('#layer-switcher');
    if (!switcher) return;

    // Check if already exists
    if ($('#layer-toggle-wrap')) return;

    // Create toggle container
    const toggleWrap = document.createElement('span');
    toggleWrap.className = 'layer-toggle-wrap';
    toggleWrap.id = 'layer-toggle-wrap';
    toggleWrap.setAttribute('aria-label', 'Переключение видимости слоёв');

    // Create toggle buttons for each layer
    ['1', '2', '3'].forEach(layer => {
      const btn = document.createElement('button');
      btn.className = 'layer-toggle-btn active';
      btn.dataset.toggleLayer = layer;
      btn.textContent = `L${layer}`;
      btn.title = `Переключить видимость L${layer}`;
      btn.setAttribute('aria-pressed', 'true');
      btn.type = 'button';
      toggleWrap.appendChild(btn);
    });

    // Insert after layer indicator
    const indicator = switcher.querySelector('.layer-indicator');
    if (indicator) {
      indicator.after(toggleWrap);
    } else {
      switcher.appendChild(toggleWrap);
    }

    // Load saved state
    const savedState = storage.get(LAYER_TOGGLE_KEY);
    if (savedState) {
      applyToggleState(savedState);
    }

    // Bind events
    toggleWrap.querySelectorAll('.layer-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleLayerVisibility(btn.dataset.toggleLayer));
    });

    console.log('[LayerToggle] Initialized');
  }

  function toggleLayerVisibility(layer) {
    const btn = $(`.layer-toggle-btn[data-toggle-layer="${layer}"]`);
    if (!btn) return;

    const isActive = btn.classList.toggle('active');
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

    // Get current state
    const state = getToggleState();
    state[layer] = isActive;

    // Apply and save
    applyToggleState(state);
    storage.set(LAYER_TOGGLE_KEY, state);

    console.log(`[LayerToggle] Layer ${layer} visibility: ${isActive ? 'visible' : 'dimmed'}`);
  }

  function getToggleState() {
    const state = { '1': true, '2': true, '3': true };
    $$('.layer-toggle-btn').forEach(btn => {
      const layer = btn.dataset.toggleLayer;
      state[layer] = btn.classList.contains('active');
    });
    return state;
  }

  function applyToggleState(state) {
    const body = document.body;

    // Update button states
    Object.entries(state).forEach(([layer, active]) => {
      const btn = $(`.layer-toggle-btn[data-toggle-layer="${layer}"]`);
      if (btn) {
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      }
    });

    // Check if we're in toggle mode (not all visible)
    const allVisible = state['1'] && state['2'] && state['3'];

    if (allVisible) {
      // Normal cumulative layer mode
      body.classList.remove('layer-toggle-mode', 'layer-hide-1', 'layer-hide-2', 'layer-hide-3');
    } else {
      // Toggle mode - show all layers but dim hidden ones
      body.classList.add('layer-toggle-mode');
      body.classList.toggle('layer-hide-1', !state['1']);
      body.classList.toggle('layer-hide-2', !state['2']);
      body.classList.toggle('layer-hide-3', !state['3']);
    }
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  async function init() {
    console.log('[LazyLoader] Initializing v' + CONFIG.VERSION + '...');

    // Load auto-generated anchor redirects (§0.18) before handling legacy anchors
    await loadAnchorRedirects();
    
    // Handle v5.12 legacy anchor redirects (§0.18)
    handleLegacyAnchor();

    let layer = getLayerFromURL() || getSavedLayer();

    if (layer) {
      hideModal();
      showSwitcher();
      showFABs();
      showLayerIndicator(layer);
      currentLayer = layer;
      await loadLayerContent(layer);
      updateSwitcherButtons(layer);
    } else {
      hideLoading();
    }

    initTheme();
    initWidthToggle();
    initScrollTop();
    initPanels();
    initGlossary();
    bindEvents();
    initLayerToggle();
    
    console.log('[LazyLoader] Ready (v' + CONFIG.VERSION + ')');
  }

  // Expose API
  window.LazyLoader = {
    switchLayer,
    scrollToAnchor,
    get currentLayer() { return currentLayer; },
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
