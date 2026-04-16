// ============================================================================
// PHASE 3: LAYER NAVIGATION STATE MODULE
// ============================================================================
/**
 * LayerState - Manages layer selection (1, 2, 3) with localStorage persistence
 * 
 * Features:
 * - Loads saved layer from localStorage or defaults to '2'
 * - Sets data-layer attribute on body for CSS-based content filtering
 * - Dispatches 'layerchange' event for other components to react
 * - Provides API for getting/setting current layer
 * - Migrates from old track system (A/B/C → 1/2/3)
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'guide-layer-selection';
  const VALID_LAYERS = ['1', '2', '3'];
  const DEFAULT_LAYER = '2';  // Was: 'B'
  const LAYER_LABELS = { '1': 'Minimum', '2': 'Optimal', '3': 'Pro' };

  // Private state
  let currentLayer = DEFAULT_LAYER;

  /**
   * Load layer from localStorage or return default
   * @returns {string} Layer identifier ('1', '2', or '3')
   */
  function loadLayer() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && VALID_LAYERS.includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('[LayerState] localStorage unavailable:', e.message);
    }
    return DEFAULT_LAYER;
  }

  /**
   * Save layer to localStorage
   * @param {string} layer - Layer identifier
   */
  function saveLayer(layer) {
    try {
      localStorage.setItem(STORAGE_KEY, layer);
    } catch (e) {
      console.warn('[LayerState] Failed to save layer:', e.message);
    }
  }

  /**
   * Apply layer to DOM (set data-layer on body)
   * @param {string} layer - Layer identifier
   */
  function applyLayer(layer) {
    document.body.setAttribute('data-layer', layer);
    
    // Update layer-card button states
    document.querySelectorAll('.layer-card').forEach(card => {
      const isActive = card.dataset.layer === layer;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    
    // Also support audience-card (now uses data-layer only)
    document.querySelectorAll('.audience-card').forEach(card => {
      const cardLayer = card.dataset.layer;
      const isActive = cardLayer === layer;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    
    // Update layer indicator
    var numberEl = document.getElementById('current-layer-number');
    var labelEl = document.getElementById('current-layer-label');
    var indicator = document.querySelector('.layer-indicator');
    if (numberEl) numberEl.textContent = layer;
    if (labelEl) labelEl.textContent = LAYER_LABELS[layer] || 'Unknown';
    if (indicator) indicator.style.display = 'flex';
    
    // Update layer-switch-btn active states
    document.querySelectorAll('.layer-switch-btn').forEach(btn => {
      const btnLayer = btn.dataset.layer;
      const isActive = btnLayer === layer;
      btn.classList.toggle('active', isActive);
    });
  }

  /**
   * Set current layer
   * @param {string} layer - Layer identifier ('1', '2', or '3')
   * @param {boolean} [persist=true] - Whether to save to localStorage
   */
  function setLayer(layer, persist = true) {
    if (!VALID_LAYERS.includes(layer)) {
      console.error('[LayerState] Invalid layer:', layer);
      return;
    }

    if (layer === currentLayer) {
      return; // No change needed
    }

    const previousLayer = currentLayer;
    currentLayer = layer;

    // Apply to DOM
    applyLayer(currentLayer);

    // Persist
    if (persist) {
      saveLayer(currentLayer);
    }

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('layerchange', {
      detail: {
        layer: currentLayer,
        previousLayer: previousLayer
      }
    }));

    console.log('[LayerState] Layer changed:', previousLayer, '→', currentLayer);
  }

  /**
   * Get current layer
   * @returns {string} Current layer identifier
   */
  function getLayer() {
    return currentLayer;
  }

  /**
   * Initialize layer navigation UI
   */
  function initLayerNavigation() {
    
    // Load saved layer
    currentLayer = loadLayer();
    
    // Apply initial layer
    applyLayer(currentLayer);

    // Trigger animation on initial load
    setTimeout(function() {
      var activeCard = document.querySelector('.layer-card.active, .audience-card.active');
      if (activeCard) {
        activeCard.classList.remove('active');
        void activeCard.offsetWidth; // Force reflow
        activeCard.classList.add('active');
      }
    }, 100);

    // Bind click handlers to layer-card buttons
    document.querySelectorAll('.layer-card').forEach(card => {
      card.addEventListener('click', () => {
        setLayer(card.dataset.layer);
      });

      // Keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setLayer(card.dataset.layer);
        }
      });
    });

    // Also support audience-card buttons (now uses data-layer only)
    document.querySelectorAll('.audience-card').forEach(card => {
      card.addEventListener('click', () => {
        const layer = card.dataset.layer;
        if (layer) setLayer(layer);
      });

      // Keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const layer = card.dataset.layer;
          if (layer) setLayer(layer);
        }
      });
    });

    // Bind uncertain-path button
    const uncertainBtn = document.querySelector('.uncertain-path');
    if (uncertainBtn) {
      uncertainBtn.addEventListener('click', () => {
        const defaultLayer = uncertainBtn.dataset.defaultLayer || DEFAULT_LAYER;
        setLayer(defaultLayer);
      });
    }

    console.log('[LayerState] Initialized with layer:', currentLayer);

    // Debug: Verify DOM state after initialization
    console.log('[LayerState] DOM verification:');
    console.log('  - body.data-layer:', document.body.getAttribute('data-layer'));
    console.log('  - active layer-card:', document.querySelector('.layer-card.active')?.dataset.layer);
    console.log('  - visible layer sections:', document.querySelectorAll('body[data-layer] [data-layer]').length);
  }

  // Expose API
  window.LayerState = {
    getLayer: getLayer,
    setLayer: setLayer,
    VALID_LAYERS: VALID_LAYERS,
    DEFAULT_LAYER: DEFAULT_LAYER,
    init: initLayerNavigation
  };

  // Auto-initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayerNavigation);
  } else {
    // DOM already loaded
    initLayerNavigation();
  }
})();

// ============================================================================
// PHASE 3: LAYER SWITCH BUTTON HANDLER
// ============================================================================
/**
 * LayerSwitchButtons - Handles layer-switch-btn clicks
 * 
 * Binds to buttons with data-target attribute and switches to that layer
 */
(function() {
  'use strict';

  function initLayerSwitchButtons() {
    // Bind to .layer-switch-btn buttons
    document.querySelectorAll('.layer-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.layer || btn.dataset.target;
        if (target && window.LayerState) {
          window.LayerState.setLayer(target);
          // Optional: scroll to top after layer switch
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
    console.log('[LayerSwitchButtons] Initialized');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayerSwitchButtons);
  } else {
    initLayerSwitchButtons();
  }
})();


// === PANEL SYSTEM ===
(function() {
  'use strict';

  // Global z-index counter
  let globalZIndex = 1000;
  const MAX_Z_INDEX = 10000;

  // Debounce utility
  function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Safe localStorage with fallback
  const storage = {
    memoryFallback: new Map(),
    
    get(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.warn('[Panel] localStorage read error:', e.message);
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
          console.warn('[Panel] localStorage quota exceeded, using memory fallback');
          this.memoryFallback.set(key, value);
        } else {
          console.error('[Panel] localStorage write error:', e.message);
        }
        return false;
      }
    }
  };

  // Default panel state - v5.4.0: Compact default (ITEM-007)
  const DEFAULT_STATE = {
    visible: false,
    x: 20,
    y: 20,
    width: 280,
    height: Math.min(400, window.innerHeight * 0.6)  // 60vh max, compact default
  };

  // Panel-specific default positions - v5.4.0: Smart positioning (ITEM-005)
  const PANEL_DEFAULTS = {
    'toc-panel': {
      getDefaultPosition: () => ({
        x: Math.max(20, window.innerWidth - 320),  // Right side
        y: 80,
        width: 280,
        height: Math.min(400, window.innerHeight * 0.6)
      })
    },
    'notepad-panel': {
      getDefaultPosition: () => ({
        x: 20,  // Left side
        y: 80,
        width: 280,
        height: Math.min(400, window.innerHeight * 0.6)
      })
    }
  };

  // Panel class
  class Panel {
    constructor(element, options = {}) {
      this.el = element;
      this.storageKey = options.storageKey || 'panel_state';
      this.onToggle = options.onToggle || null;
      this.onSave = options.onSave || null;
      
      // State
      this.state = this.loadState();
      this.isDragging = false;
      this.isResizing = false;
      this.dragOffset = { x: 0, y: 0 };
      
      // Elements
      this.header = this.el.querySelector('[data-drag-handle]');
      this.resizeHandle = this.el.querySelector('[data-resize-handle]');
      this.closeBtn = this.el.querySelector('[data-action="close"]');
      this.collapseBtn = this.el.querySelector('[data-action="collapse"]');
      
      // Initialize
      this.applyState();
      this.bindEvents();
      this.setupAccessibility();
    }

    loadState() {
      const saved = storage.get(this.storageKey);
      
      // v5.4.0: Get panel-specific defaults (ITEM-005)
      const panelId = this.el.id;
      const panelDefaults = PANEL_DEFAULTS[panelId]?.getDefaultPosition() || DEFAULT_STATE;
      
      // v5.4.0: Validate saved position is still on-screen (ITEM-006)
      if (saved) {
        if (saved.x > window.innerWidth - 100 || saved.y > window.innerHeight - 100) {
          // Position is off-screen, use panel defaults
          return { ...panelDefaults, visible: false };
        }
        // Apply smart offset if other panels are open
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
      // Clamp position to viewport
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

    isOpen() {
      return this.el.classList.contains('open');
    }

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
      if (this.isOpen()) {
        this.close();
      } else {
        this.open();
      }
    }

    focus() {
      // Bring to front
      globalZIndex++;
      if (globalZIndex > MAX_Z_INDEX) {
        globalZIndex = 1000;
      }
      this.el.style.zIndex = globalZIndex;
      this.el.focus();
    }

    // Drag implementation
    startDrag(e) {
      if (e.target.closest('.panel-btn')) return;
      
      this.isDragging = true;
      this.el.classList.add('dragging');
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = this.el.getBoundingClientRect();
      
      this.dragOffset = {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
      
      this.focus();
      e.preventDefault();
    }

    onDrag(e) {
      if (!this.isDragging) return;
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      // Calculate new position
      let newX = clientX - this.dragOffset.x;
      let newY = clientY - this.dragOffset.y;
      
      // Clamp to viewport
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

    // Resize implementation
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
      // Toggle buttons
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }
      
      // Drag - mouse
      this.header.addEventListener('mousedown', (e) => this.startDrag(e));
      document.addEventListener('mousemove', (e) => this.onDrag(e));
      document.addEventListener('mouseup', () => this.endDrag());
      
      // Drag - touch
      this.header.addEventListener('touchstart', (e) => this.startDrag(e), { passive: false });
      document.addEventListener('touchmove', (e) => this.onDrag(e), { passive: false });
      document.addEventListener('touchend', () => this.endDrag());
      
      // Resize - mouse
      if (this.resizeHandle) {
        this.resizeHandle.addEventListener('mousedown', (e) => this.startResize(e));
        document.addEventListener('mousemove', (e) => this.onResize(e));
        document.addEventListener('mouseup', () => this.endResize());
        
        // Resize - touch
        this.resizeHandle.addEventListener('touchstart', (e) => this.startResize(e), { passive: false });
        document.addEventListener('touchmove', (e) => this.onResize(e), { passive: false });
        document.addEventListener('touchend', () => this.endResize());
      }
      
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
      this.setupMobileBehavior();
    }

    setupMobileBehavior() {
      // Detect mobile
      const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
      
      if (!isMobile()) return;
      
      // Swipe down to close on mobile
      let touchStartY = 0;
      
      this.el.addEventListener('touchstart', (e) => {
        if (!this.isOpen()) return;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      
      this.el.addEventListener('touchmove', (e) => {
        if (!this.isOpen() || !touchStartY) return;
        const deltaY = e.touches[0].clientY - touchStartY;
        // Swipe down threshold: 50px
        if (deltaY > 50) {
          this.close();
          touchStartY = 0;
        }
      }, { passive: true });
      
      this.el.addEventListener('touchend', () => {
        touchStartY = 0;
      }, { passive: true });
    }
  }

  // Enhanced Notepad extends Panel
  class NotepadPanel extends Panel {
    constructor(element, options = {}) {
      super(element, options);
      this.textarea = this.el.querySelector('textarea');
      this.saveBtn = this.el.querySelector('[data-action="save"]');
      this.clearBtn = this.el.querySelector('[data-action="clear"]');
      this.exportBtn = this.el.querySelector('[data-action="export"]');
      
      // Create status bar with counters if missing
      this.statusBar = this.el.querySelector('.panel-statusbar');
      if (!this.statusBar && this.textarea) {
        this.statusBar = document.createElement('div');
        this.statusBar.className = 'panel-statusbar';
        this.statusBar.style.cssText = 'padding:4px 10px; font-size:0.75rem; color:var(--text-muted); background:var(--bg-elevated); border-top:1px solid var(--border); display:flex; justify-content:space-between;';
        this.statusBar.innerHTML = '<span id="np-status">Готово</span><span id="np-count">0 симв.</span>';
        this.el.appendChild(this.statusBar);
      }

      this.bindEnhancedEvents();
      this.loadContent();
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
      if (this.statusBar) {
        const status = document.getElementById('np-status');
        if (status) status.textContent = 'Сохранено';
      }
      if (this.onSave) this.onSave(this.textarea.value);
    }, 250);

    clearContent() {
      if (!this.textarea) return;
      if (this.textarea.value.trim() === '') return;
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

    // IMP-009 FIX: Use copyToClipboard with fallback
    copyContent() {
      if (!this.textarea || !this.textarea.value.trim()) return;
      copyToClipboard(this.textarea.value).then((success) => {
        const status = document.getElementById('np-status');
        if (status) {
          if (success) {
            status.textContent = 'Скопировано в буфер';
          } else {
            status.textContent = 'Ошибка копирования';
          }
          setTimeout(() => status.textContent = 'Готово', 1500);
        }
      });
    }

    updateCount() {
      if (!this.textarea) return;
      const len = this.textarea.value.length;
      const words = this.textarea.value.trim() ? this.textarea.value.trim().split(/\s+/).length : 0;
      const countEl = document.getElementById('np-count');
      if (countEl) countEl.textContent = `${len} симв. · ${words} слов`;
    }

    bindEnhancedEvents() {
      if (this.textarea) {
        this.textarea.addEventListener('input', () => {
          this.saveContent();
          this.updateCount();
          // Auto-grow
          this.textarea.style.height = 'auto';
          this.textarea.style.height = this.textarea.scrollHeight + 'px';
        });
        // Tab support
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

      if (this.saveBtn) this.saveBtn.addEventListener('click', () => this.saveContent());
      if (this.clearBtn) this.clearBtn.addEventListener('click', () => this.clearContent());
      if (this.exportBtn) this.exportBtn.addEventListener('click', () => this.exportContent());

      // Add copy button if not in HTML
      let copyBtn = this.el.querySelector('[data-action="copy"]');
      if (!copyBtn) {
        copyBtn = document.createElement('button');
        copyBtn.className = 'panel-btn';
        copyBtn.dataset.action = 'copy';
        copyBtn.textContent = '📋';
        copyBtn.title = 'Копировать всё';
        this.el.querySelector('.panel-header-actions').prepend(copyBtn);
      }
      copyBtn.addEventListener('click', () => this.copyContent());
    }
  }

  // Expose to global scope
  window.Panel = Panel;
  window.NotepadPanel = NotepadPanel;
})();
// ============================================================================
// IMP-009 FIX: CLIPBOARD UTILITY WITH FALLBACK
// ============================================================================

/**
 * Copy text to clipboard with fallback for insecure contexts
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for insecure contexts (http://, file://)
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 99999); // For mobile
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (fallbackErr) {
      console.warn('[Clipboard] Copy failed:', fallbackErr);
      return false;
    }
  }
}

// === SPOILER TOGGLE ===
function initSpoilers() {
  const spoilers = document.querySelectorAll('[data-spoiler]');
  spoilers.forEach(spoiler => {
    // Check if already initialized
    if (spoiler.dataset.spoilerInit === 'true') return;
    
    // Create toggle button
    const toggle = document.createElement('button');
    toggle.className = 'spoiler-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '▼ Показать';
    
    // Insert before spoiler content
    spoiler.parentNode.insertBefore(toggle, spoiler);
    spoiler.hidden = true;
    
    // Mark as initialized
    spoiler.dataset.spoilerInit = 'true';
    
    toggle.addEventListener('click', () => {
      const isExpanded = !spoiler.hidden;
      spoiler.hidden = isExpanded;
      toggle.textContent = isExpanded ? '▼ Показать' : '▲ Скрыть';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
    });
  });
}

// Call on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initSpoilers);

// === TOC CONTENT GENERATION ===
/**
 * Generates TOC navigation links from section headers
 * Populates #toc-content with clickable links
 */
function initTocContent() {
  const tocContent = document.getElementById('toc-content');
  if (!tocContent) {
    console.warn('[TOC] #toc-content element not found');
    return;
  }

  // Find all section headers (H2 and H3 with IDs)
  const sections = document.querySelectorAll('section[id]');
  const tocLinks = [];

  sections.forEach(section => {
    const h2 = section.querySelector('h2');
    const h3s = section.querySelectorAll('h3[id]');

    // Add H2 link
    if (h2 && section.id) {
      const h2Text = h2.textContent.replace(/^[0-9.]+\s*/, '').trim();
      tocLinks.push({
        level: 2,
        id: section.id,
        text: h2Text.substring(0, 50)
      });
    }

    // Add H3 links
    h3s.forEach(h3 => {
      if (h3.id) {
        const h3Text = h3.textContent.replace(/^[0-9.]+\s*/, '').trim();
        tocLinks.push({
          level: 3,
          id: h3.id,
          text: h3Text.substring(0, 50)
        });
      }
    });
  });

  // Build TOC HTML
  const tocHtml = tocLinks.map(link => {
    const indent = link.level === 3 ? 'toc-indent' : '';
    return `<li class="${indent}"><a href="#${link.id}">${link.text}</a></li>`;
  }).join('\n');

  tocContent.innerHTML = `<ul>${tocHtml}</ul>`;
  console.log(`[TOC] Generated ${tocLinks.length} navigation links`);
}

// === TOC ACTIVE SECTION HIGHLIGHTING ===
function initTocHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const tocLinks = document.querySelectorAll('#toc-panel a');

  if (!sections.length || !tocLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          const parent = link.parentElement;
          if (parent) {
            parent.classList.toggle('active',
              link.getAttribute('href') === `#${id}`);
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(section => observer.observe(section));
}

// === COPY BUTTONS ===
function initCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    const wrapper = document.createElement('div');
    wrapper.className = 'pre-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Copy code');

    // IMP-009 FIX: Use copyToClipboard with fallback
    btn.addEventListener('click', async () => {
      const success = await copyToClipboard(pre.textContent);
      if (success) {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } else {
        btn.textContent = 'Error';
        setTimeout(() => btn.textContent = 'Copy', 2000);
      }
    });

    wrapper.appendChild(btn);

    // Add expand button
    const expandBtn = document.createElement('button');
    expandBtn.className = 'expand-btn';
    expandBtn.textContent = 'Expand';
    expandBtn.type = 'button';
    expandBtn.setAttribute('aria-label', 'Expand code block');

    expandBtn.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'code-modal';

      const modalContent = document.createElement('div');
      modalContent.className = 'code-modal-content';

      const closeBtn = document.createElement('button');
      closeBtn.className = 'code-modal-close';
      closeBtn.textContent = '✕';
      closeBtn.type = 'button';
      closeBtn.addEventListener('click', () => modal.remove());

      const preClone = pre.cloneNode(true);
      preClone.classList.add('pre-raw');

      modalContent.appendChild(closeBtn);
      modalContent.appendChild(preClone);
      modal.appendChild(modalContent);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });

      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') {
          modal.remove();
          document.removeEventListener('keydown', handler);
        }
      });

      document.body.appendChild(modal);
    });

    wrapper.appendChild(expandBtn);
  });
}

// === CHECKLIST PERSISTENCE ===
// BUG-003 FIX: Use version-independent storage key with migration
function initChecklist() {
  // Read version from meta tag
  const versionMeta = document.querySelector('meta[name="livechar-version"]');
  const version = versionMeta ? versionMeta.content : 'unknown';
  
  // Use stable storage key
  const STORAGE_KEY = 'guide-checklist-data';
  const OLD_KEY = `guide-checklist-v${version}`;
  
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');

  if (!checkboxes.length) return;

  // Migration: copy data from old versioned key if new key doesn't exist
  const oldData = localStorage.getItem(OLD_KEY);
  const newData = localStorage.getItem(STORAGE_KEY);
  if (oldData && !newData) {
    localStorage.setItem(STORAGE_KEY, oldData);
    localStorage.removeItem(OLD_KEY);
  }

  // Load saved state
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  checkboxes.forEach(cb => {
    const key = cb.dataset.key;
    if (key && saved[key]) cb.checked = true;
  });

  // Save on change
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const state = {};
      checkboxes.forEach(c => {
        if (c.dataset.key) state[c.dataset.key] = c.checked;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateChecklistProgress();
    });
  });

  updateChecklistProgress();
}

function updateChecklistProgress() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const total = checkboxes.length;
  const checked = document.querySelectorAll('.checklist-item input:checked').length;
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

  const bar = document.querySelector('.checklist-progress-bar');
  if (bar) bar.style.width = `${percent}%`;
}

// === THEME TOGGLE (3-state: dark → light → oled) ===
function initTheme() {
  const toggle = document.getElementById('fab-theme');
  if (!toggle) return;

  const themes = ['dark', 'light', 'oled'];
  const themeLabels = {
    dark: 'Тёмная',
    light: 'Светлая', 
    oled: 'OLED'
  };
  
  const iconDark = toggle.querySelector('.theme-icon-dark');
  const iconLight = toggle.querySelector('.theme-icon-light');
  const iconOled = toggle.querySelector('.theme-icon-oled');

  // Helper function to apply theme
  function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('theme-light', 'theme-oled');
    
    // Hide all icons
    if (iconDark) iconDark.hidden = true;
    if (iconLight) iconLight.hidden = true;
    if (iconOled) iconOled.hidden = true;
    
    // Apply theme
    if (theme === 'light') {
      document.body.classList.add('theme-light');
      if (iconLight) iconLight.hidden = false;
    } else if (theme === 'oled') {
      document.body.classList.add('theme-oled');
      if (iconOled) iconOled.hidden = false;
    } else {
      // Dark (default) - no class needed
      if (iconDark) iconDark.hidden = false;
    }
    
    // Update button attributes
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('data-theme', theme);
    const nextTheme = themes[(themes.indexOf(theme) + 1) % 3];
    toggle.setAttribute('title', `Тема: ${themeLabels[theme]} (→ ${themeLabels[nextTheme]})`);
    toggle.setAttribute('aria-label', `Тема: ${themeLabels[theme]}`);
  }

  // Initial theme from storage or system preference
  let stored = localStorage.getItem('theme');
  if (!stored || !themes.includes(stored)) {
    // Determine initial theme based on system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      stored = 'light';
    } else {
      stored = 'dark';
    }
  }
  
  applyTheme(stored);

  // Toggle handler - cycle through themes
  toggle.addEventListener('click', () => {
    const current = toggle.getAttribute('data-theme') || 'dark';
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    // Re-initialize SVGs on theme change for proper fill colors
    setTimeout(() => {
      const enneaSvg = document.getElementById('ennea-svg');
      const oceanSvg = document.getElementById('ocean-svg');
      if (enneaSvg && enneaSvg.children.length > 0) {
        enneaSvg.innerHTML = '';
        initEnneagram();
      }
      if (oceanSvg && oceanSvg.children.length > 0) {
        oceanSvg.innerHTML = '';
        initOcean();
      }
    }, 50);
  });
}

// === MOBILE NAVIGATION ===
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const toc = document.getElementById('toc-panel');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!hamburger || !toc || !overlay) return;

  hamburger.addEventListener('click', () => {
    toc.classList.add('open');
    overlay.classList.add('open');
  });

  overlay.addEventListener('click', () => {
    toc.classList.remove('open');
    overlay.classList.remove('open');
  });

  // Close on TOC link click (mobile)
  toc.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1023) {
        toc.classList.remove('open');
        overlay.classList.remove('open');
      }
    });
  });
}

// === SEARCH (Ctrl+K) ===
function initSearch() {
  const container = document.getElementById('search-container');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  if (!container || !input || !results) return;

  // Build search index from sections, excluding code blocks
  const sections = document.querySelectorAll('section[id]');
  const index = Array.from(sections).map(s => {
    // Clone section and remove code blocks before extracting text
    const indexableText = s.cloneNode(true);
    indexableText.querySelectorAll('pre, code').forEach(el => el.remove());
    return {
      id: s.id,
      title: s.querySelector('h2, h3')?.textContent || s.id,
      text: indexableText.textContent.toLowerCase()
    };
  });

  // Open/close on Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      container.hidden = !container.hidden;
      if (!container.hidden) input.focus();
    }
    if (e.key === 'Escape') container.hidden = true;
  });

  // Close on click outside
  container.addEventListener('click', (e) => {
    if (e.target === container) container.hidden = true;
  });

  // Search on input
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    if (!query) { results.innerHTML = ''; return; }

    const matches = index
      .filter(item => item.text.includes(query) || item.title.toLowerCase().includes(query))
      .slice(0, 8);

    results.innerHTML = matches.map(m =>
      `<a href="#${m.id}" class="search-result"><strong>${m.title}</strong></a>`
    ).join('');

    // Close on result click
    results.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        container.hidden = true;
        input.value = '';
        results.innerHTML = '';
      });
    });
  });
}

// === COPYABLE ANCHORS ===
async function initAnchors() {
  document.querySelectorAll('h2[id], h3[id], h4[id]').forEach(heading => {
    const anchor = document.createElement('a');
    anchor.href = `#${heading.id}`;
    anchor.className = 'heading-anchor';
    anchor.textContent = '#';

    anchor.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = location.href.split('#')[0] + '#' + heading.id;
      const success = await copyToClipboard(url);
      if (success) {
        anchor.textContent = '✓';
        setTimeout(() => anchor.textContent = '#', 1500);
      } else {
        console.error('Failed to copy anchor URL');
      }
    });

    heading.appendChild(anchor);
  });
}

// ============================================================================
// TASK 3.4: LEGACY ID REDIRECT HANDLER
// ============================================================================
/**
 * LegacyRedirect - Handles redirects from old non-semantic IDs to new semantic IDs
 * 
 * Maps legacy patch-based IDs (4.1.1, 5.5a, 08b, 09a) to semantic IDs
 */
(function initLegacyRedirects() {
  'use strict';

  // Legacy ID to semantic ID mapping
  const LEGACY_REDIRECTS = {
    // Section redirects
    '#05b_cot_tiers': '#cot-tiers',
    '#08b_debugging': '#debugging',
    '#06b_antipatterns_advanced': '#antipatterns',
    '#06a_antipatterns_core': '#antipatterns-core',
    '#06a_integration': '#integration-checklist',
    // Add more as needed
  };

  function handleLegacyRedirect() {
    const hash = window.location.hash;
    if (hash && LEGACY_REDIRECTS[hash]) {
      const newHash = LEGACY_REDIRECTS[hash];
      console.log('[LegacyRedirect] Redirecting:', hash, '→', newHash);
      
      // Update URL without adding to history
      history.replaceState(null, '', newHash);
      
      // Scroll to element
      const target = document.querySelector(newHash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Handle on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleLegacyRedirect);
  } else {
    handleLegacyRedirect();
  }

  // Handle hash changes
  window.addEventListener('hashchange', handleLegacyRedirect);

  console.log('[LegacyRedirect] Initialized with', Object.keys(LEGACY_REDIRECTS).length, 'redirects');
})();

// ============================================================================
// PHASE 3.9: HIDDEN LAYER ANCHOR NAVIGATION HANDLER
// ============================================================================
/**
 * HiddenLayerNavigator - Handles direct links to anchors in hidden layers
 * 
 * When a user navigates to an anchor in a layer that is currently hidden,
 * this module shows a remark offering to switch to that layer.
 */
(function initHiddenLayerNavigator() {
  'use strict';

  const LAYER_LABELS = {
    '1': 'Minimum',
    '2': 'Optimal',
    '3': 'Pro'
  };

  /**
   * Check if a target element is in a hidden layer
   * @param {HTMLElement} target - The target element
   * @returns {Object|null} - { layer: string, element: HTMLElement } or null
   */
  function getTargetLayerInfo(target) {
    if (!target) return null;
    
    // Find the closest parent with data-layer attribute
    const layerParent = target.closest('[data-layer]');
    if (!layerParent) return { layer: '0', element: target }; // Layer 0 is always visible
    
    const targetLayer = layerParent.getAttribute('data-layer');
    const currentLayer = document.body.getAttribute('data-layer');
    
    if (targetLayer === currentLayer || targetLayer === '0') {
      return null; // Already visible
    }
    
    return { layer: targetLayer, element: target };
  }

  /**
   * Show overlay remark asking user to switch layers
   * @param {string} targetLayer - The layer to switch to
   * @param {string} anchor - The anchor ID
   */
  function showLayerSwitchRemark(targetLayer, anchor) {
    // Remove any existing overlay
    const existing = document.querySelector('.layer-redirect-remark');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'layer-redirect-remark';
    overlay.innerHTML = `
      <p>This section belongs to <span class="layer-badge layer-${targetLayer}" data-tooltip="Recipe: ${LAYER_LABELS[targetLayer]}">Layer ${targetLayer}</span>.</p>
      <div class="layer-redirect-buttons">
        <button class="layer-redirect-switch" type="button">
          Switch to Layer ${targetLayer}
        </button>
        <button class="layer-redirect-stay" type="button">
          Stay on current layer
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Bind button handlers
    overlay.querySelector('.layer-redirect-switch').addEventListener('click', () => {
      if (window.LayerState) {
        window.LayerState.setLayer(targetLayer);
      }
      overlay.remove();
      // Scroll to target after layer switch
      setTimeout(() => {
        const target = document.getElementById(anchor);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    overlay.querySelector('.layer-redirect-stay').addEventListener('click', () => {
      overlay.remove();
    });

    // Close on Escape
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  /**
   * Handle hashchange for hidden layer navigation
   */
  function handleHiddenLayerNavigation() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    const layerInfo = getTargetLayerInfo(target);
    if (layerInfo && layerInfo.layer !== '0') {
      showLayerSwitchRemark(layerInfo.layer, hash);
    }
  }

  // Check on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Small delay to let LayerState initialize
      setTimeout(handleHiddenLayerNavigation, 200);
    });
  } else {
    setTimeout(handleHiddenLayerNavigation, 200);
  }

  // Handle hash changes
  window.addEventListener('hashchange', handleHiddenLayerNavigation);

  console.log('[HiddenLayerNavigator] Initialized');
})();

// ============================================================================
// PHASE 3.8: LAYER INDICATOR CONTROLLER
// ============================================================================
/**
 * LayerIndicatorController - Updates the layer indicator in the header
 */
(function initLayerIndicatorController() {
  'use strict';

  const LAYER_LABELS = {
    '1': 'Minimum',
    '2': 'Optimal',
    '3': 'Pro'
  };

  const LAYER_DESCRIPTIONS = {
    '1': 'Minimum: Basic recipe, prototype mode, ~15 min',
    '2': 'Optimal: Full pipeline with Price, ~30 min',
    '3': 'Pro: GHOST layers, CoT, advanced tuning, ~60 min'
  };

  function updateIndicator(layer) {
    const indicator = document.querySelector('.layer-indicator');
    const numberEl = document.getElementById('current-layer-number');
    const labelEl = document.getElementById('current-layer-label');

    if (!indicator || !numberEl || !labelEl) return;

    numberEl.textContent = layer;
    labelEl.textContent = LAYER_LABELS[layer] || 'Unknown';
    indicator.style.display = 'flex';
  }

  // Listen for layer changes
  window.addEventListener('layerchange', (e) => {
    updateIndicator(e.detail.layer);
  });

  // Initial update
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        if (window.LayerState) {
          updateIndicator(window.LayerState.getLayer());
        }
      }, 100);
    });
  } else {
    if (window.LayerState) {
      updateIndicator(window.LayerState.getLayer());
    }
  }

  console.log('[LayerIndicatorController] Initialized');
})();

// === TABS ===
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tablist => {
    const tabs = tablist.querySelectorAll('[role="tab"]');
    const section = tablist.closest('section');
    const panels = tablist.nextElementSibling?.querySelectorAll('[role="tabpanel"]');

    if (!tabs.length || !panels?.length) return;

    // Load saved state
    const sectionId = section?.id || 'default';
    const savedTab = sessionStorage.getItem(`tabs-${sectionId}`);

    if (savedTab) switchTab(savedTab);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    function switchTab(id) {
      tabs.forEach(t => {
        const isSelected = t.dataset.tab === id;
        t.setAttribute('aria-selected', String(isSelected));
      });

      panels.forEach(p => {
        const isSelected = p.dataset.tabPanel === id;
        p.hidden = !isSelected;
      });

      // Save state
      sessionStorage.setItem(`tabs-${sectionId}`, id);
    }
  });
}

// === ENNEAGRAM SVG ===
function initEnneagram() {
  const container = document.getElementById('ennea-svg');
  if (!container) return;

  // Enneagram points positions (clockwise from top)
  const points = [
    { x: 150, y: 20, num: 9 },   // Top
    { x: 280, y: 60, num: 1 },
    { x: 280, y: 180, num: 2 },
    { x: 200, y: 280, num: 3 },
    { x: 100, y: 280, num: 4 },
    { x: 20, y: 180, num: 5 },
    { x: 20, y: 60, num: 6 },
    { x: 100, y: 20, num: 7 },
    { x: 200, y: 20, num: 8 }  // Adjusted for layout
  ];

  // Clear existing
  container.innerHTML = '';

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 300 300');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  // Draw connections (enneagram inner lines)
  const connections = [
    [0, 4], [0, 5], [1, 3], [1, 7], [2, 4], [2, 8],
    [3, 6], [5, 7], [6, 8]
  ];

  connections.forEach(([from, to]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', points[from].x);
    line.setAttribute('y1', points[from].y);
    line.setAttribute('x2', points[to].x);
    line.setAttribute('y2', points[to].y);
    line.setAttribute('stroke', 'var(--text-muted, #666)');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('opacity', '0.4');
    svg.appendChild(line);
  });

  // Draw circle and points
  points.forEach((p, i) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', p.x);
    circle.setAttribute('cy', p.y);
    circle.setAttribute('r', '18');
    circle.setAttribute('fill', 'var(--bg-elevated, #222)');
    circle.setAttribute('stroke', 'var(--accent, #38bdf8)');
    circle.setAttribute('stroke-width', '2');
    svg.appendChild(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', p.x);
    text.setAttribute('y', p.y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'var(--text, #e8e8e8)');
    text.setAttribute('font-size', '14');
    text.setAttribute('font-weight', '600');
    text.textContent = p.num;
    svg.appendChild(text);
  });

  container.appendChild(svg);
}

// === OCEAN PENTAGON ===
function initOcean() {
  const container = document.getElementById('ocean-svg');
  if (!container) return;

  // Clear existing
  container.innerHTML = '';

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 300 300');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  // Pentagon points
  const cx = 150, cy = 150, r = 120;
  const angles = [-90, -18, 54, 126, 198].map(a => a * Math.PI / 180);
  const points = angles.map(a => ({
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a)
  }));

  const labels = ['O', 'C', 'E', 'A', 'N'];
  const colors = [
    'var(--ocean-O, #7c4dff)',
    'var(--ocean-C, #4dc3ff)',
    'var(--ocean-E, #ff6b6b)',
    'var(--ocean-A, #6bff8c)',
    'var(--ocean-N, #ffb84d)'
  ];

  // Draw pentagon
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', points.map(p => `${p.x},${p.y}`).join(' '));
  polygon.setAttribute('fill', 'none');
  polygon.setAttribute('stroke', 'var(--text-muted, #666)');
  polygon.setAttribute('stroke-width', '1');
  polygon.setAttribute('opacity', '0.4');
  svg.appendChild(polygon);

  // Draw points and labels
  points.forEach((p, i) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', p.x);
    circle.setAttribute('cy', p.y);
    circle.setAttribute('r', '20');
    circle.setAttribute('fill', 'var(--bg-elevated, #222)');
    circle.setAttribute('stroke', colors[i]);
    circle.setAttribute('stroke-width', '2');
    svg.appendChild(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', p.x);
    text.setAttribute('y', p.y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', colors[i]);
    text.setAttribute('font-size', '14');
    text.setAttribute('font-weight', '600');
    text.textContent = labels[i];
    svg.appendChild(text);
  });

  container.appendChild(svg);
}

// === INIT PANELS & FAB BUTTONS ===
function initPanels() {
  // Initialize TOC Panel
  const tocPanel = document.getElementById('toc-panel');
  const fabToc = document.getElementById('fab-toc');
  if (tocPanel && window.Panel) {
    const tocPanelInstance = new window.Panel(tocPanel, { storageKey: 'toc_panel_state' });
    if (fabToc) {
      fabToc.addEventListener('click', () => {
        tocPanelInstance.toggle();
        tocPanelInstance.focus();
      });
    }
  }

  // Initialize Notepad Panel
  const notepadPanel = document.getElementById('notepad-panel');
  const fabNotepad = document.getElementById('fab-scratchpad');
  if (notepadPanel && window.NotepadPanel) {
    const notepadInstance = new window.NotepadPanel(notepadPanel, { storageKey: 'notepad_panel_state' });
    if (fabNotepad) {
      fabNotepad.addEventListener('click', () => {
        notepadInstance.toggle();
        notepadInstance.focus();
      });
    }
  }

  // Initialize Glossary Tab with enhanced reliability
  const glossaryTab = document.getElementById('glossary-tab');
  const fabGlossary = document.getElementById('fab-glossary');

  function scrollToGlossary() {
    // Try multiple selectors for robustness
    const glossarySection =
      document.getElementById('glossary') ||
      document.querySelector('section[id*="glossary"]') ||
      document.querySelector('[data-layer="0"] section[id]');

    if (glossarySection) {
      glossarySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('[Glossary] Scrolled to glossary section');
    } else {
      console.warn('[Glossary] Glossary section not found');
    }
  }

  if (glossaryTab) {
    glossaryTab.addEventListener('click', scrollToGlossary);
    glossaryTab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToGlossary();
      }
    });
  }

  if (fabGlossary) {
    fabGlossary.addEventListener('click', scrollToGlossary);
  }

  console.log('[Panels] Glossary buttons initialized');

  // Initialize Scroll to Top
  const fabTop = document.getElementById('fab-top');
  if (fabTop) {
    fabTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initialize Width Toggle
  const fabWidth = document.getElementById('fab-width');
  if (fabWidth) {
    fabWidth.addEventListener('click', () => {
      const body = document.body;
      const isWide = body.classList.toggle('content-wide');
      fabWidth.setAttribute('aria-pressed', isWide ? 'true' : 'false');
      try {
        localStorage.setItem('content-width', isWide ? 'wide' : 'normal');
      } catch (e) {}
    });
    // Load saved width preference
    try {
      const savedWidth = localStorage.getItem('content-width');
      if (savedWidth === 'wide') {
        document.body.classList.add('content-wide');
        fabWidth.setAttribute('aria-pressed', 'true');
      }
    } catch (e) {}
  }

  console.log('[Panels] FAB buttons initialized');
}

// === INIT ALL ON DOMContentLoaded ===
document.addEventListener('DOMContentLoaded', () => {
  initTocContent();        // Generate TOC content first
  initTocHighlight();      // Then highlight active section
  initCopyButtons();
  initChecklist();
  initTheme();
  initMobileNav();
  initSearch();
  initAnchors();
  initTabs();
  initEnneagram();
  initOcean();
  initPanels();
  console.log('[Main] All components initialized');
});

// ============================================================================
// PHASE 3: LAYER VALIDATION UTILITY
// ============================================================================
/**
 * validateLayers - Validates layer visibility is correct
 * Run in console: validateLayers()
 */
function validateLayers() {
  const body = document.body;
  const currentLayer = body.getAttribute('data-layer');

  console.log('=== Layer Validation ===');
  console.log('Current layer:', currentLayer);

  // Count visible elements per layer
  const counts = { 0: 0, 1: 0, 2: 0, 3: 0 };

  document.querySelectorAll('[data-layer]').forEach(el => {
    const layer = el.dataset.layer;
    const isVisible = window.getComputedStyle(el).display !== 'none';
    if (isVisible) counts[layer]++;
  });

  // Count Layer 0 (no data-layer attribute)
  document.querySelectorAll('section > *:not([data-layer])').forEach(el => {
    if (window.getComputedStyle(el).display !== 'none') counts[0]++;
  });

  console.log('Visible elements per layer:', counts);

  // Validation rules
  const expected = {
    '1': { '1': 'visible', '2': 'hidden', '3': 'hidden' },
    '2': { '1': 'hidden', '2': 'visible', '3': 'hidden' },
    '3': { '1': 'hidden', '2': 'hidden', '3': 'visible' }
  };

  const rules = expected[currentLayer];
  let passed = true;

  for (const [layer, expectedState] of Object.entries(rules)) {
    const count = counts[layer];
    const actualState = count > 0 ? 'visible' : 'hidden';

    if (expectedState === 'visible' && count === 0) {
      console.error(`FAIL: Layer ${layer} should be visible but has no elements`);
      passed = false;
    }

    if (expectedState === 'hidden' && count > 0) {
      console.error(`FAIL: Layer ${layer} should be hidden but has ${count} visible elements`);
      passed = false;
    }
  }

  console.log(passed ? '✅ All validations passed' : '❌ Validation failed');
  return passed;
}

// Expose validation utility
window.validateLayers = validateLayers;
