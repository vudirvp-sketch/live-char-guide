/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - LAZY LOADER v6.0.0
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
    VERSION: '6.0.0',
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
  // WIDGET DATA CACHE (Stage 1.5: JSON fetch instead of hardcode)
  // ============================================================================

  const widgetDataCache = {
    ocean: null,
    enneagram: null,
    mbti: null
  };

  async function fetchWidgetData(type) {
    if (widgetDataCache[type]) return widgetDataCache[type];
    const url = `data/${type}.json`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      widgetDataCache[type] = data;
      console.log(`[WidgetData] Loaded ${type} from ${url}`);
      return data;
    } catch (e) {
      console.warn(`[WidgetData] Failed to fetch ${url}:`, e.message);
      return null;
    }
  }

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
    } catch (e) {
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
  // CLIPBOARD UTILITY
  // ============================================================================

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
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
    Object.entries(WIDGET_SELECTORS).forEach(([selector, info]) => {
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
  function showModal() { $('#layer-modal')?.classList.remove('hidden'); }
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
      const partId = firstSection.id;

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
    initOcean();
    initOceanValidator();
    initEnneagram();
    initMBTI();
    initLayerSwitch();
    initTooltips();
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
        } catch (e) {
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
    const layerMarkers = glossaryData.layer_markers || {
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
  // INITIALIZATION
  // ============================================================================

  // ============================================================================
  // OCEAN PENTAGON SVG
  // ============================================================================

  // Trait data shared between functions
  const OCEAN_TRAITS = ['O', 'C', 'E', 'A', 'N'];
  const OCEAN_NAMES = {
    'O': 'Открытость',
    'C': 'Добросовестность',
    'E': 'Экстраверсия',
    'A': 'Доброжелательность',
    'N': 'Нейротизм'
  };
  const OCEAN_COLORS = {
    'O': 'var(--ocean-O, #7c4dff)',
    'C': 'var(--ocean-C, #4dc3ff)',
    'E': 'var(--ocean-E, #ff6b6b)',
    'A': 'var(--ocean-A, #6bff8c)',
    'N': 'var(--ocean-N, #ffb84d)'
  };

  function initOcean() {
    const container = document.getElementById('ocean-svg');
    if (!container) return;
    
    // DO NOT clear innerHTML - use existing static SVG from HTML
    // Just bind event handlers to existing nodes
    const nodes = container.querySelectorAll('.ocean-node');
    
    nodes.forEach(node => {
      const trait = node.getAttribute('data-trait');
      if (!trait) return;

      const name = OCEAN_NAMES[trait];
      const color = OCEAN_COLORS[trait];

      // Click handler
      node.addEventListener('click', () => {
        // Remove active from all nodes
        container.querySelectorAll('.ocean-node').forEach(n => n.classList.remove('active'));
        // Add active to clicked node
        node.classList.add('active');
        showOceanPanel(trait, name, color);
        
        // Open corresponding details section
        const details = document.getElementById(`ocean-detail-${trait}`);
        if (details) {
          details.open = true;
          details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });

      // Keyboard handler for accessibility
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          node.click();
        }
      });
    });
    
    // Quick link handlers
    document.querySelectorAll('.ocean-quick-links .trait-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const trait = link.dataset.trait;
        const node = document.querySelector(`#ocean-trait-${trait}`);
        if (node) node.click();
      });
    });
  }

  async function showOceanPanel(letter, name, color) {
    const panel = document.getElementById('ocean-panel');
    if (!panel) return;

    // Stage 1.5: Try fetching from data/ocean.json first
    const oceanData = await fetchWidgetData('ocean');
    if (oceanData && oceanData.traits) {
      const traitObj = oceanData.traits.find(t => t.id === letter);
      if (traitObj) {
        const anchorKey = `${letter === 'N' ? 'high' : 'low'}_${letter}`;
        const anchorExamples = (oceanData.anchor_examples && oceanData.anchor_examples[anchorKey]) || [];
        const anchorText = anchorExamples.map(a => 
          `Триггер: ${a.trigger}\nДействие: ${a.action}\nЦена: ${a.price}`
        ).join('\n\n');

        // Fallback to hardcoded anchor text if no matching examples
        const fallbackAnchors = {
          'O': 'Низкий O \u2192 предпочитает рутину, подозрение к новому\nПример: "Когда сталкивается с новым, колеблется, задаёт уточняющие вопросы \u2192 Цена: затянутая пауза"\n\nВысокий O \u2192 ищет разнообразие, открыт нестандартным идеям\nПример: "Когда скучно, сразу предлагает новое занятие \u2192 Цена: не может усидеть на месте"',
          'C': 'Низкий C \u2192 решения в последний момент, гибкие дедлайны\nПример: "Когда есть план, сразу ищет исключения \u2192 Цена: опаздывает на 5 минут"\n\nВысокий C \u2192 планирует заранее, структурированные рутины\nПример: "Когда детали не совпадают с планом, перепроверяет \u2192 Цена: напряжение в челюсти"',
          'E': 'Низкий E \u2192 сольные активности, внутренний монолог\nПример: "Когда все идут на вечеринку, находит повод остаться \u2192 Цена: едва заметный вздох облегчения"\n\nВысокий E \u2192 инициирует разговор, ищет стимуляцию\nПример: "Когда тишина, первым начинает разговор \u2192 Цена: не замечает чужой дискомфорт"',
          'A': 'Низкий A \u2192 конкурентный драйв, скептицизм\nПример: "Когда кто-то предлагает помощь, спрашивает \u201cчто тебе с этого?\u201d \u2192 Цена: короткий прищур"\n\nВысокий A \u2192 помогает без просьбы, избегает конфликта\nПример: "Когда видит проблему, предлагает помощь без запроса \u2192 Цена: не замечает манипуляцию"',
          'N': 'Низкий N \u2192 готов к кризису, стабилен под давлением\nПример: "Когда всё рушится, сначала действует \u2192 Цена: пауза только после решения проблемы"\n\nВысокий N \u2192 стресс-реакции видимы, нуждается в поддержке\nПример: "Когда неопределённость, переспрашивает, ищет подтверждения \u2192 Цена: теребит край одежды"'
        };

        const anchorDisplay = anchorText || fallbackAnchors[letter] || '';

        panel.innerHTML = `
          <div class="panel-header">
            <div class="trait-letter" style="color: ${color}">${letter}</div>
            <div class="trait-name">${name}</div>
          </div>
          <div class="panel-body">
            <div class="section">
              <div class="section-label">Низкий полюс (&lt;30)</div>
              <ul class="marker-list">
                <li>${traitObj.low.label}</li>
                <li>${traitObj.low.description}</li>
              </ul>
            </div>
            <div class="section">
              <div class="section-label">Высокий полюс (&gt;70)</div>
              <ul class="marker-list">
                <li>${traitObj.high.label}</li>
                <li>${traitObj.high.description}</li>
              </ul>
            </div>
            <div class="section rp-section">
              <div class="section-label">Примеры якорей</div>
              <div class="rp-content"><code>${anchorDisplay.replace(/\n/g, '<br>')}</code></div>
            </div>
          </div>
        `;
        return;
      }
    }

    // Fallback: hardcoded data (preserved for offline/no-JS)
    const data = {
      'O': {
        low: ['Практичный', 'Предпочитает знакомое', 'Консервативный подход'],
        high: ['Любопытный', 'Творческий', 'Открыт новому опыту'],
        anchor: 'Низкий O → предпочитает рутину, подозрение к новому\n' +
                'Пример: "Когда сталкивается с новым, колеблется, задаёт уточняющие вопросы → Цена: затянутая пауза"\n\n' +
                'Высокий O → ищет разнообразие, открыт нестандартным идеям\n' +
                'Пример: "Когда скучно, сразу предлагает новое занятие → Цена: не может усидеть на месте"'
      },
      'C': {
        low: ['Спонтанный', 'Гибкий', 'Менее организованный'],
        high: ['Организованный', 'Дисциплинированный', 'Надёжный'],
        anchor: 'Низкий C → решения в последний момент, гибкие дедлайны, толерантность к хаосу\n' +
                'Пример: "Когда есть план, сразу ищет исключения → Цена: опаздывает на 5 минут"\n\n' +
                'Высокий C → планирует заранее, структурированные рутины, внимателен к деталям\n' +
                'Пример: "Когда детали не совпадают с планом, перепроверяет, исправляет других → Цена: напряжение в челюсти"'
      },
      'E': {
        low: ['Интроверт', 'Предпочитает одиночество', 'Задумчивый'],
        high: ['Экстраверт', 'Энергичный', 'Общительный'],
        anchor: 'Низкий E → сольные активности, внутренний монолог, предпочтение малых групп\n' +
                'Пример: "Когда все идут на вечеринку, находит повод остаться → Цена: едва заметный вздох облегчения"\n\n' +
                'Высокий E → инициирует разговор, ищет стимуляцию, групповые активности\n' +
                'Пример: "Когда тишина, первым начинает разговор → Цена: не замечает чужой дискомфорт"'
      },
      'A': {
        low: ['Конкурентный', 'Критичный', 'Скептичный'],
        high: ['Доверчивый', 'Альтруистичный', 'Кооперативный'],
        anchor: 'Низкий A → конкурентный драйв, вызов другим, скептицизм как база\n' +
                'Пример: "Когда кто-то предлагает помощь, спрашивает "что тебе с этого?" → Цена: короткий прищур"\n\n' +
                'Высокий A → помогает без просьбы, предполагает хорошие намерения, избегает конфликта\n' +
                'Пример: "Когда видит проблему, предлагает помощь без запроса → Цена: не замечает манипуляцию"'
      },
      'N': {
        low: ['Эмоционально стабильный', 'Спокойный', 'Устойчивый'],
        high: ['Тревожный', 'Эмоционально реактивный', 'Чувствительный'],
        anchor: 'Низкий N → готов к кризису, не зацикливается на негативе, стабилен под давлением\n' +
                'Пример: "Когда всё рушится, сначала действует → Цена: пауза только после решения проблемы"\n\n' +
                'Высокий N → стресс-реакции видимы, склонен к рефлексии, нуждается в поддержке\n' +
                'Пример: "Когда неопределённость, переспрашивает, ищет подтверждения → Цена: теребит край одежды"'
      }
    };

    const traitData = data[letter];

    panel.innerHTML = `
      <div class="panel-header">
        <div class="trait-letter" style="color: ${color}">${letter}</div>
        <div class="trait-name">${name}</div>
      </div>
      <div class="panel-body">
        <div class="section">
          <div class="section-label">Низкий полюс (&lt;30)</div>
          <ul class="marker-list">
            ${traitData.low.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="section">
          <div class="section-label">Высокий полюс (&gt;70)</div>
          <ul class="marker-list">
            ${traitData.high.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="section rp-section">
          <div class="section-label">Примеры якорей</div>
          <div class="rp-content"><code>${traitData.anchor.replace(/\n/g, '<br>')}</code></div>
        </div>
      </div>
    `;
  }

  // ============================================================================
  // OCEAN VALIDATOR
  // ============================================================================

  // Enneagram type suggestions based on OCEAN extremes
  const ENNEAGRAM_SUGGESTIONS = {
    'O': { low: [1, 6, 9], high: [4, 5, 7] },
    'C': { low: [7, 9], high: [1, 3, 5] },
    'E': { low: [4, 5, 9], high: [2, 3, 7, 8] },
    'A': { low: [3, 8], high: [2, 6, 9] },
    'N': { low: [3, 9], high: [4, 6] }
  };

  function updateProfilePolygon() {
    const svg = document.getElementById('ocean-svg');
    const profile = document.getElementById('ocean-profile');
    if (!svg || !profile) return;

    // Pentagon geometry: center (200, 185), radius 145
    const cx = 200, cy = 185;
    const baseRadius = 145;
    const innerRadius = 50; // minimum radius at value 0

    const points = OCEAN_TRAITS.map((trait, i) => {
      const slider = document.getElementById(`slider-${trait}`);
      const val = slider ? parseInt(slider.value, 10) : 50;
      const r = innerRadius + (val / 100) * (baseRadius - innerRadius);
      const angle = (-90 + i * 72) * Math.PI / 180;
      const x = Math.round(cx + r * Math.cos(angle));
      const y = Math.round(cy + r * Math.sin(angle));
      return `${x},${y}`;
    });

    profile.setAttribute('points', points.join(' '));

    // Color based on dominant trait
    const values = OCEAN_TRAITS.map(t => {
      const slider = document.getElementById(`slider-${t}`);
      return slider ? parseInt(slider.value, 10) : 50;
    });
    const maxIdx = values.indexOf(Math.max(...values));
    const colors = ['var(--ocean-O)', 'var(--ocean-C)', 'var(--ocean-E)', 'var(--ocean-A)', 'var(--ocean-N)'];
    profile.setAttribute('stroke', colors[maxIdx]);
  }

  function initOceanValidator() {
    const sliders = document.querySelectorAll('.ocean-slider');
    if (sliders.length === 0) return;

    // FIXED: Use correct IDs from HTML
    const statusEl = document.getElementById('validator-status');
    const detailsEl = document.getElementById('validator-details');
    const extremesListEl = document.getElementById('extremes-list');
    const enneagramSuggestionEl = document.getElementById('enneagram-suggestion');

    // Safety check: if required elements don't exist, skip initialization
    if (!statusEl || !detailsEl) {
      console.warn('[OCEAN Validator] Required elements not found in DOM');
      return;
    }

    function updateValidator() {
      const extremes = [];

      sliders.forEach(slider => {
        const trait = slider.dataset.trait;
        const value = parseInt(slider.value, 10);
        
        // FIXED: Use correct ID format value-{trait} instead of ocean-value-{trait}
        const valueEl = document.getElementById(`value-${trait}`);
        if (valueEl) valueEl.textContent = value;

        // Update aria-valuenow
        slider.setAttribute('aria-valuenow', value);

        const label = slider.closest('.ocean-slider-label');
        if (label) {
          label.classList.remove('ocean-extreme', 'ocean-extreme-low', 'ocean-extreme-high');
        }

        if (value < 30) {
          extremes.push({ trait, value, type: 'low', name: OCEAN_NAMES[trait] });
          if (label) label.classList.add('ocean-extreme', 'ocean-extreme-low');
        } else if (value > 70) {
          extremes.push({ trait, value, type: 'high', name: OCEAN_NAMES[trait] });
          if (label) label.classList.add('ocean-extreme', 'ocean-extreme-high');
        }
      });

      // Update status
      statusEl.classList.remove('validator-green', 'validator-yellow', 'validator-red');

      if (extremes.length === 0) {
        statusEl.textContent = '⚠ 0 экстремумов — персонаж может быть забываемым';
        statusEl.classList.add('validator-yellow');
        if (extremesListEl) {
          extremesListEl.textContent = 'Все значения в нормальном диапазоне (30–70).';
        }
        if (enneagramSuggestionEl) {
          enneagramSuggestionEl.textContent = '';
        }
      } else if (extremes.length <= 2) {
        statusEl.textContent = `✓ ${extremes.length} экстремум(а) — персонаж запоминающийся`;
        statusEl.classList.add('validator-green');
        if (extremesListEl) {
          const parts = extremes.map(e => {
            const dir = e.type === 'low' ? 'низкая' : 'высокая';
            return `${e.trait}: ${e.value} (${dir})`;
          });
          extremesListEl.textContent = 'Экстремумы: ' + parts.join(', ');
        }
      } else {
        statusEl.textContent = `✗ ${extremes.length} экстремумов — риск внутренней противоречивости`;
        statusEl.classList.add('validator-red');
        if (extremesListEl) {
          const parts = extremes.map(e => `${e.trait}: ${e.value}`);
          extremesListEl.textContent = 'Экстремумы: ' + parts.join(', ');
        }
      }

      // Enneagram suggestions
      if (enneagramSuggestionEl && extremes.length > 0) {
        const suggestedTypes = new Set();
        extremes.forEach(e => {
          const types = e.type === 'low' ? ENNEAGRAM_SUGGESTIONS[e.trait].low : ENNEAGRAM_SUGGESTIONS[e.trait].high;
          types.forEach(type => suggestedTypes.add(type));
        });
        if (suggestedTypes.size > 0) {
          enneagramSuggestionEl.textContent = 'Рекомендуемые типы Enneagram: ' + [...suggestedTypes].sort().join(', ');
        } else {
          enneagramSuggestionEl.textContent = '';
        }
      }

      // Update profile polygon
      updateProfilePolygon();
    }

    // Bind slider events
    sliders.forEach(slider => {
      slider.addEventListener('input', updateValidator);
    });

    // Reset button
    const resetBtn = document.getElementById('ocean-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sliders.forEach(slider => {
          const trait = slider.dataset.trait;
          slider.value = 50;
          slider.setAttribute('aria-valuenow', '50');
          const valueEl = document.getElementById(`value-${trait}`);
          if (valueEl) valueEl.textContent = '50';
        });
        updateValidator();
      });
    }

    // Copy button
    const copyBtn = document.getElementById('ocean-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const profile = OCEAN_TRAITS.map(t => {
          const slider = document.getElementById(`slider-${t}`);
          return `${t}:${slider ? slider.value : 50}`;
        }).join(' ');
        copyToClipboard(profile).then((success) => {
          const original = copyBtn.textContent;
          copyBtn.textContent = success ? 'Скопировано!' : 'Ошибка';
          setTimeout(() => { copyBtn.textContent = original; }, 1500);
        });
      });
    }

    // Initial update
    updateValidator();
  }

  // ============================================================================
  // ENNEAGRAM SVG
  // ============================================================================

  function initEnneagram() {
    const container = document.getElementById('ennea-svg');
    if (!container) return;

    // SVG is now static in HTML - just bind event handlers to existing nodes
    const nodes = container.querySelectorAll('.node');
    
    nodes.forEach(node => {
      const typeNum = node.getAttribute('data-type');
      if (!typeNum) return;

      // Click handler
      node.addEventListener('click', () => showEnneaPanel(typeNum));

      // Keyboard handler for accessibility
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showEnneaPanel(typeNum);
        }
      });
    });
  }

  async function showEnneaPanel(typeNum) {
    const panel = document.getElementById('ennea-panel');
    if (!panel) return;

    // Stage 1.5: Try fetching from data/enneagram.json first
    const enneagramData = await fetchWidgetData('enneagram');
    if (enneagramData && enneagramData.types) {
      const typeObj = enneagramData.types.find(t => t.id === parseInt(typeNum, 10));
      if (typeObj) {
        const anchorText = (typeObj.anchor_examples || []).map(a => 
          `Триггер: ${a.trigger}\nДействие: ${a.action}\nЦена: ${a.price}`
        ).join('\n\n');

        panel.innerHTML = `
          <div class="ennea-panel-header">
            <div class="ennea-type-num">${typeNum}</div>
            <div class="ennea-type-name">${typeObj.name}</div>
          </div>
          <div class="ennea-panel-body">
            <div class="section">
              <div class="ennea-row-label">Core Fear</div>
              <div class="ennea-fear-val">${typeObj.core_fear}</div>
            </div>
            <div class="section">
              <div class="ennea-row-label">Core Desire</div>
              <div class="ennea-desire-val">${typeObj.core_desire}</div>
            </div>
            <div class="section">
              <div class="ennea-row-label">Стресс → ${typeObj.stress_direction} | Рост → ${typeObj.growth_direction}</div>
            </div>
            <div class="section">
              <div class="ennea-row-label">Шаблон лжи</div>
              <div>${typeObj.lie_template}</div>
            </div>
            <div class="section">
              <div class="ennea-row-label">Паттерн изъяна</div>
              <div>${typeObj.flaw_pattern}</div>
            </div>
            ${typeObj.wings ? `<div class="section">
              <div class="ennea-row-label">Wings</div>
              <div class="ennea-wings-row">
                ${typeObj.wings.map(w => `
                  <div class="ennea-wing-chip">
                    <div class="wn">${w}</div>
                  </div>
                `).join('')}
              </div>
            </div>` : ''}
            ${anchorText ? `<div class="section">
              <div class="ennea-row-label">Примеры якорей</div>
              <div class="ennea-anchor-val"><code>${anchorText.replace(/\n/g, '<br>')}</code></div>
            </div>` : ''}
          </div>
        `;
        return;
      }
    }

    // Fallback: hardcoded data (preserved for offline/no-JS)
    const enneaData = {
      1: {
        name: 'Перфекционист',
        fear: 'Быть плохим, коррумпированным, несовершённым',
        desire: 'Быть хорошим, цельным, уравновешенным',
        stress: 4,
        growth: 7,
        wings: [
          { num: '9w1', desc: 'Мечтательный реформатор' },
          { num: '2w1', desc: 'Помощник-идеалист' }
        ],
        anchorExample: 'Триггер: Кто-то делает работу "неправильно"\n' +
                       'Действие: Перехватывает контроль, переделывает молча\n' +
                       'Цена: Напряжение в плечах, губы сжаты'
      },
      2: {
        name: 'Помощник',
        fear: 'Быть ненужным, нелюбимым',
        desire: 'Быть любимым, нужным, ценным',
        stress: 8,
        growth: 4,
        wings: [
          { num: '1w2', desc: 'Активный помощник' },
          { num: '3w2', desc: 'Достигатор-помощник' }
        ],
        anchorExample: 'Триггер: Кто-то упоминает проблему\n' +
                       'Действие: Предлагает помощь до того, как попросили\n' +
                       'Цена: Едва заметная улыбка, ждёт благодарности'
      },
      3: {
        name: 'Достигатель',
        fear: 'Быть никчёмным, неудачником',
        desire: 'Быть ценным, успешным, admired',
        stress: 9,
        growth: 6,
        wings: [
          { num: '2w3', desc: 'Помощник-деятель' },
          { num: '4w3', desc: 'Индивидуалист-деятель' }
        ],
        anchorExample: 'Триггер: Появляется возможность проявить себя\n' +
                       'Действие: Берёт ответственность, демонстрирует результат\n' +
                       'Цена: Проверяет реакцию окружающих, корректирует образ'
      },
      4: {
        name: 'Индивидуалист',
        fear: 'Быть обычным, незначимым',
        desire: 'Быть уникальным, особенным, аутентичным',
        stress: 2,
        growth: 1,
        wings: [
          { num: '3w4', desc: 'Достигатор-индивидуалист' },
          { num: '5w4', desc: 'Исследователь-индивидуалист' }
        ],
        anchorExample: 'Триггер: Чувствует себя непонятым\n' +
                       'Действие: Отстраняется, погружается в внутренний мир\n' +
                       'Цена: Долгий взгляд в пустоту, руки скрещены'
      },
      5: {
        name: 'Исследователь',
        fear: 'Быть некомпетентным, бесполезным, истощённым',
        desire: 'Быть компетентным, знающим, проницательным',
        stress: 7,
        growth: 8,
        wings: [
          { num: '4w5', desc: 'Индивидуалист-исследователь' },
          { num: '6w5', desc: 'Лоялист-исследователь' }
        ],
        anchorExample: 'Триггер: Вопрос, на который нет ответа\n' +
                       'Действие: Уходит в исследование, накапливает данные\n' +
                       'Цена: Физически отстраняется, уменьшает зрительный контакт'
      },
      6: {
        name: 'Лоялист',
        fear: 'Быть без поддержки, брошенным',
        desire: 'Быть в безопасности, поддержанным',
        stress: 3,
        growth: 9,
        wings: [
          { num: '5w6', desc: 'Исследователь-лоялист' },
          { num: '7w6', desc: 'Энтузиаст-лоялист' }
        ],
        anchorExample: 'Триггер: Неопределённость в планах\n' +
                       'Действие: Ищет подтверждения, перепроверяет\n' +
                       'Цена: Переспрашивает, теребит пальцы'
      },
      7: {
        name: 'Энтузиаст',
        fear: 'Быть ограниченным, в депривации',
        desire: 'Быть удовлетворённым, свободным',
        stress: 1,
        growth: 5,
        wings: [
          { num: '6w7', desc: 'Лоялист-энтузиаст' },
          { num: '8w7', desc: 'Челленджер-энтузиаст' }
        ],
        anchorExample: 'Триггер: Скука или рутина\n' +
                       'Действие: Предлагает новое направление, переключается\n' +
                       'Цена: Блеск в глазах, не заканчивает начатое'
      },
      8: {
        name: 'Босс',
        fear: 'Быть слабым, уязвимым, контролируемым',
        desire: 'Быть сильным, защищённым, влиятельным',
        stress: 5,
        growth: 2,
        wings: [
          { num: '7w8', desc: 'Энтузиаст-босс' },
          { num: '9w8', desc: 'Миротворец-босс' }
        ],
        anchorExample: 'Триггер: Кто-то пытается доминировать\n' +
                       'Действие: Демонстрирует силу, не отступает\n' +
                       'Цена: Напряжение в челюсти, расширяются ноздри'
      },
      9: {
        name: 'Миротворец',
        fear: 'Быть в конфликте, отделённым',
        desire: 'Быть в мире, цельным, гармоничным',
        stress: 6,
        growth: 3,
        wings: [
          { num: '8w9', desc: 'Челленджер-миротворец' },
          { num: '1w9', desc: 'Перфекционист-миротворец' }
        ],
        anchorExample: 'Триггер: Нарастает напряжение в группе\n' +
                       'Действие: Сглаживает конфликт, ищет компромисс\n' +
                       'Цена: Рассеянный взгляд, теряет собственную позицию'
      }
    };

    const data = enneaData[typeNum];
    if (!data) return;

    panel.innerHTML = `
      <div class="ennea-panel-header">
        <div class="ennea-type-num">${typeNum}</div>
        <div class="ennea-type-name">${data.name}</div>
      </div>
      <div class="ennea-panel-body">
        <div class="section">
          <div class="ennea-row-label">Core Fear</div>
          <div class="ennea-fear-val">${data.fear}</div>
        </div>
        <div class="section">
          <div class="ennea-row-label">Core Desire</div>
          <div class="ennea-desire-val">${data.desire}</div>
        </div>
        <div class="section">
          <div class="ennea-row-label">Стресс → ${data.stress} | Рост → ${data.growth}</div>
        </div>
        <div class="section">
          <div class="ennea-row-label">Wings</div>
          <div class="ennea-wings-row">
            ${data.wings.map(w => `
              <div class="ennea-wing-chip">
                <div class="wn">${w.num}</div>
                <div class="wd">${w.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="section">
          <div class="ennea-row-label">Пример якоря</div>
          <div class="ennea-anchor-val"><code>${data.anchorExample.replace(/\n/g, '<br>')}</code></div>
        </div>
      </div>
    `;
  }

  // ============================================================================
  // MBTI FILTER
  // ============================================================================

  async function initMBTI() {
    const AXES = ['EI', 'SN', 'TF', 'JP'];

    // Stage 1.5: Try fetching from data/mbti.json
    let typesDB = null;
    const mbtiData = await fetchWidgetData('mbti');
    if (mbtiData && mbtiData.types) {
      typesDB = {};
      mbtiData.types.forEach(t => {
        typesDB[t.code] = { name: t.name, hint: t.hint, temperament: t.temperament };
      });
    }

    // Fallback: hardcoded types database
    if (!typesDB) {

    // Mapping slider values to letters
    const axisLetterMap = {
      EI: { '-1': 'E', '0': null, '1': 'I' },
      SN: { '-1': 'S', '0': null, '1': 'N' },
      TF: { '-1': 'T', '0': null, '1': 'F' },
      JP: { '-1': 'J', '0': null, '1': 'P' }
    };

    // Type database (names and hints)
    const typesDB = {
      INTJ: { name: 'Архитектор', hint: 'Стратег, видит системы', temperament: 'NT' },
      INTP: { name: 'Логик', hint: 'Аналитик, ищет истину', temperament: 'NT' },
      ENTJ: { name: 'Командир', hint: 'Лидер, системный', temperament: 'NT' },
      ENTP: { name: 'Дебатёр', hint: 'Инноватор, любит споры', temperament: 'NT' },
      INFJ: { name: 'Адвокат', hint: 'Визионер, эмпатичный', temperament: 'NF' },
      INFP: { name: 'Посредник', hint: 'Идеалист, ценности-драйвен', temperament: 'NF' },
      ENFJ: { name: 'Протагонист', hint: 'Харизматичный лидер', temperament: 'NF' },
      ENFP: { name: 'Борец', hint: 'Энтузиаст, вдохновляет', temperament: 'NF' },
      ISTJ: { name: 'Администратор', hint: 'Надёжный, долг', temperament: 'SJ' },
      ISFJ: { name: 'Защитник', hint: 'Заботливый, преданный', temperament: 'SJ' },
      ESTJ: { name: 'Менеджер', hint: 'Организованный', temperament: 'SJ' },
      ESFJ: { name: 'Консул', hint: 'Социальный, заботливый', temperament: 'SJ' },
      ISTP: { name: 'Виртуоз', hint: 'Прагматичный, в моменте', temperament: 'SP' },
      ISFP: { name: 'Артист', hint: 'Чувствительный, эстетичный', temperament: 'SP' },
      ESTP: { name: 'Предприниматель', hint: 'Действие-ориентированный', temperament: 'SP' },
      ESFP: { name: 'Развлекатель', hint: 'Спонтанный, социальный', temperament: 'SP' }
    };
    } // end fallback typesDB

    // Mapping slider values to letters
    const axisLetterMap = {
      EI: { '-1': 'E', '0': null, '1': 'I' },
      SN: { '-1': 'S', '0': null, '1': 'N' },
      TF: { '-1': 'T', '0': null, '1': 'F' },
      JP: { '-1': 'J', '0': null, '1': 'P' }
    };

    // Get current selection for an axis (radio takes priority over slider)
    function getAxisValue(axis) {
      const radio = document.querySelector(`input[name="axis-${axis}"]:checked`);
      if (radio) return radio.value;

      const slider = document.getElementById(`slider-${axis}`);
      if (slider) {
        const val = slider.value;
        return axisLetterMap[axis][val];
      }
      return null;
    }

    // Update result display
    function updateResult() {
      const letters = AXES.map(getAxisValue);
      const type = letters.every(Boolean) ? letters.join('') : null;
      const data = type ? typesDB[type] : null;

      const resultType = document.getElementById('result-type');
      const resultName = document.getElementById('result-name');
      const resultHint = document.getElementById('result-hint');

      if (resultType) {
        resultType.textContent = type || '—';
      }

      if (resultName) {
        resultName.textContent = data ? data.name : 'Выберите все 4 оси';
      }

      if (resultHint) {
        resultHint.textContent = data ? data.hint : '';
      }

      // Highlight matching card
      document.querySelectorAll('.type-card').forEach(card => {
        card.classList.toggle('highlighted', card.dataset.type === type);
      });

      // Open corresponding temperament group
      if (data) {
        const group = document.querySelector(`#mbti-group-${data.temperament.toLowerCase()}`);
        if (group && !group.open) {
          group.open = true;
        }
      }
    }

    // Sync slider with radio
    function syncSliderToRadio(axis, value) {
      const slider = document.getElementById(`slider-${axis}`);
      if (!slider) return;

      const letterToValue = { E: -1, I: 1, S: -1, N: 1, T: -1, F: 1, J: -1, P: 1 };
      slider.value = letterToValue[value] || 0;
    }

    // Initialize event listeners
    AXES.forEach(axis => {
      // Slider change
      const slider = document.getElementById(`slider-${axis}`);
      if (slider) {
        slider.addEventListener('input', () => {
          // Clear radios when slider moves
          document.querySelectorAll(`input[name="axis-${axis}"]`).forEach(r => {
            r.checked = false;
          });
          updateResult();
        });
      }

      // Radio change
      document.querySelectorAll(`input[name="axis-${axis}"]`).forEach(radio => {
        radio.addEventListener('change', () => {
          syncSliderToRadio(axis, radio.value);
          updateResult();
        });
      });
    });

    // Initial update
    updateResult();
  }

  // ============================================================================
  // LAYER SWITCH
  // ============================================================================

  function initLayerSwitch() {
    document.querySelectorAll('[data-layer-switch]').forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const rawValue = link.getAttribute('data-layer-switch');
        // Support formats: "3", "3#anchor", "Layer 3: #anchor"
        const match = rawValue.match(/^(\d+)(?:[#:]?\s*#?\s*(.+))?$/);
        if (!match) return;

        const targetLayer = match[1];
        const targetAnchor = match[2] ? match[2].trim() : null;

        if (window.LazyLoader && window.LazyLoader.switchLayer) {
          await window.LazyLoader.switchLayer(targetLayer, targetAnchor);
        }
      });
    });
  }

  // ============================================================================
  // INIT INTERACTIVE TOOLS
  // ============================================================================

  function initInteractiveTools() {
    initOcean();
    initOceanValidator();
    initEnneagram();
    initLayerSwitch();
  }

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
    
    // Initialize interactive tools after content is loaded
    initInteractiveTools();

    // Pre-fetch widget data for faster panel display
    fetchWidgetData('ocean');
    fetchWidgetData('enneagram');
    fetchWidgetData('mbti');

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
