/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - LAZY LOADER v5.12.1
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
    LAYERS: ['1', '2', '3'],
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
        textarea.style.cssText = 'position:fixed;left:-9999px;top:0;';
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
      statusBar.style.cssText = 'padding:4px 10px; font-size:0.75rem; color:var(--text-muted); background:var(--bg-elevated); border-top:1px solid var(--border); display:flex; justify-content:space-between;';
      statusBar.innerHTML = '<span id="np-status">Готово</span><span id="np-count">0 симв.</span>';
      this.el.appendChild(statusBar);
    }

    loadContent() {
      const content = storage.get(`${this.storageKey}_content`) || '';
      if (this.textarea) {
        this.textarea.value = content;
        this.updateCount();
      }
    }

    saveContent = debounce(() => {
      if (!this.textarea) return;
      storage.set(`${this.storageKey}_content`, this.textarea.value);
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
        this.updateCount();
        this.saveContent();
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
      handleAnchor();
      loadGlossaryContent();
      
      console.log(`[LazyLoader] Layer ${layer} loaded successfully`);
      
    } catch (e) {
      console.error('[LazyLoader] Failed to load layer:', e);
      content.innerHTML = `<div class="callout warn"><strong>Ошибка загрузки</strong><p>Не удалось загрузить контент: ${e.message}</p><p>Попробуйте обновить страницу.</p></div>`;
    }

    isLoading = false;
    hideLoading();
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
    if (fabs) fabs.style.display = 'flex';
  }

  // ============================================================================
  // LAYER SWITCHING
  // ============================================================================

  async function switchLayer(layer) {
    if (!CONFIG.LAYERS.includes(layer)) {
      console.error('[LazyLoader] Invalid layer:', layer);
      return;
    }

    if (layer === currentLayer) return;

    currentLayer = layer;
    saveLayer(layer);
    
    const url = new URL(window.location);
    url.searchParams.set('layer', layer);
    url.hash = '';
    history.pushState({ layer }, '', url);
    
    await loadLayerContent(layer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  function generateTOC() {
    const tocContent = $('#toc-content');
    if (!tocContent) return;

    const sections = $$('section[id]');
    const tocLinks = [];

    sections.forEach(section => {
      const h2 = section.querySelector('h2');
      const h3s = section.querySelectorAll('h3[id]');

      if (h2 && section.id) {
        const h2Text = h2.textContent.replace(/^[0-9.]+\s*/, '').trim();
        tocLinks.push({ level: 2, id: section.id, text: h2Text.substring(0, 50) });
      }

      h3s.forEach(h3 => {
        if (h3.id) {
          const h3Text = h3.textContent.replace(/^[0-9.]+\s*/, '').trim();
          tocLinks.push({ level: 3, id: h3.id, text: h3Text.substring(0, 50) });
        }
      });
    });

    const tocHtml = tocLinks.map(link => {
      const indent = link.level === 3 ? 'toc-indent' : '';
      return `<li class="${indent}"><a href="#${link.id}">${link.text}</a></li>`;
    }).join('\n');

    tocContent.innerHTML = `<ul>${tocHtml}</ul>`;
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
          item.style.display = matches ? '' : 'none';
        });

        // Show/hide section headers
        glossaryContent.querySelectorAll('.glossary-section').forEach(section => {
          const visibleItems = section.querySelectorAll('.glossary-item:not([style*="display: none"])');
          section.style.display = visibleItems.length ? '' : 'none';
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
        storageKey: 'notepad_panel_state'
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

  async function init() {
    console.log('[LazyLoader] Initializing...');

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

    console.log('[LazyLoader] Ready');
  }

  // Expose API
  window.LazyLoader = {
    switchLayer,
    get currentLayer() { return currentLayer; },
    panels: panelInstances
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
