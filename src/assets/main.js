// ============================================================================
// ITEM-001: TRACK NAVIGATION STATE MODULE
// ============================================================================
/**
 * NavigationState - Manages track selection (A, B, C) with localStorage persistence
 * 
 * Features:
 * - Loads saved track from localStorage or defaults to 'B'
 * - Sets data-track attribute on body for CSS-based content filtering
 * - Dispatches 'trackchange' event for other components to react
 * - Provides API for getting/setting current track
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'guide-track-selection';
  const VALID_TRACKS = ['A', 'B', 'C'];
  const DEFAULT_TRACK = 'B';

  // Private state
  let currentTrack = DEFAULT_TRACK;

  /**
   * Load track from localStorage or return default
   * @returns {string} Track identifier ('A', 'B', or 'C')
   */
  function loadTrack() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && VALID_TRACKS.includes(saved.toUpperCase())) {
        return saved.toUpperCase();
      }
    } catch (e) {
      console.warn('[NavigationState] localStorage unavailable:', e.message);
    }
    return DEFAULT_TRACK;
  }

  /**
   * Save track to localStorage
   * @param {string} track - Track identifier
   */
  function saveTrack(track) {
    try {
      localStorage.setItem(STORAGE_KEY, track);
    } catch (e) {
      console.warn('[NavigationState] Failed to save track:', e.message);
    }
  }

  /**
   * Apply track to DOM (set data-track on body)
   * @param {string} track - Track identifier
   */
  function applyTrack(track) {
    document.body.setAttribute('data-track', track);
    
    // Update audience-card button states
    document.querySelectorAll('.audience-card').forEach(card => {
      const isActive = card.dataset.track === track;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  /**
   * Set current track
   * @param {string} track - Track identifier ('A', 'B', or 'C')
   * @param {boolean} [persist=true] - Whether to save to localStorage
   */
  function setTrack(track, persist = true) {
    const normalizedTrack = track.toUpperCase();
    
    if (!VALID_TRACKS.includes(normalizedTrack)) {
      console.error('[NavigationState] Invalid track:', track);
      return;
    }

    if (normalizedTrack === currentTrack) {
      return; // No change needed
    }

    const previousTrack = currentTrack;
    currentTrack = normalizedTrack;

    // Apply to DOM
    applyTrack(currentTrack);

    // Persist
    if (persist) {
      saveTrack(currentTrack);
    }

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('trackchange', {
      detail: {
        track: currentTrack,
        previousTrack: previousTrack
      }
    }));

    console.log('[NavigationState] Track changed:', previousTrack, '→', currentTrack);
  }

  /**
   * Get current track
   * @returns {string} Current track identifier
   */
  function getTrack() {
    return currentTrack;
  }

  /**
   * Initialize track navigation UI
   */
  function initTrackNavigation() {
    // Load saved track
    currentTrack = loadTrack();
    
    // Apply initial track
    applyTrack(currentTrack);

    // Bind click handlers to track buttons
    document.querySelectorAll('.audience-card').forEach(card => {
      card.addEventListener('click', () => {
        setTrack(card.dataset.track);
      });

      // Keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setTrack(card.dataset.track);
        }
      });
    });

    // Bind uncertain-path button
    const uncertainBtn = document.querySelector('.uncertain-path');
    if (uncertainBtn) {
      uncertainBtn.addEventListener('click', () => {
        setTrack(uncertainBtn.dataset.track || DEFAULT_TRACK);
      });
    }

    console.log('[NavigationState] Initialized with track:', currentTrack);
  }

  // Expose API
  window.NavigationState = {
    getTrack: getTrack,
    setTrack: setTrack,
    VALID_TRACKS: VALID_TRACKS,
    DEFAULT_TRACK: DEFAULT_TRACK,
    init: initTrackNavigation
  };

  // Auto-initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrackNavigation);
  } else {
    // DOM already loaded
    initTrackNavigation();
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
        p.hidden = p.dataset.tab !== id;
      });
      sessionStorage.setItem(`tabs-${sectionId}`, id);
    }
  });
}

// === TOC COLLAPSE TOGGLE ===
function initTocToggle() {
  const btn = document.getElementById('fab-toc');
  const toc = document.getElementById('toc-panel');
  if (!btn || !toc) return;

  const STORAGE_KEY = 'toc-collapsed';

  // BUG-004 FIX: Use distinct icons for collapsed/expanded states
  function setCollapsed(collapsed) {
    toc.classList.toggle('toc-collapsed', collapsed);
    // BUG-004 FIX: Different icons for different states
    btn.textContent = collapsed ? '📋' : '📑';
    btn.setAttribute('aria-label', collapsed ? 'Развернуть навигацию' : 'Свернуть навигацию');
    localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
  }

  // Restore saved state
  if (localStorage.getItem(STORAGE_KEY) === '1') {
    setCollapsed(true);
  }

  btn.addEventListener('click', () => {
    const isCollapsed = toc.classList.contains('toc-collapsed');
    setCollapsed(!isCollapsed);
  });
}

// === SCROLL TO TOP ===
function initScrollTop() {
  const btn = document.getElementById('fab-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 400 ? '1' : '0.3';
    btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === MBTI EMBED ===
function initMbti() {
  const grid = document.getElementById('mbti-types-grid');
  if (!grid) return;

  const GROUP_COLORS = {
    'Аналитики': '#7c4dff',
    'Дипломаты': '#4dc3ff',
    'Стражи': '#6bff8c',
    'Исследователи': '#ff6b6b'
  };

  const FUNCTION_DESCRIPTIONS = {
    'Ne': 'Экстравертная интуиция — видит возможности, связи, паттерны во внешнем мире',
    'Ni': 'Интровертная интуиция — синтезирует инсайты, видит долгосрочные последствия',
    'Se': 'Экстравертное ощущение — живёт в моменте, реагирует на физический мир',
    'Si': 'Интровертное ощущение — хранит опыт, сравнивает с прошлым, ценит стабильность',
    'Te': 'Экстравертное мышление — организует, планирует, достигает эффективности',
    'Ti': 'Интровертное мышление — анализирует, классифицирует, ищет внутреннюю логику',
    'Fe': 'Экстравертное чувство — гармонизирует, считывает эмоции, ценит группу',
    'Fi': 'Интровертное чувство — аутентичность, личные ценности, внутренняя гармония'
  };

  const MBTI_TYPES = [
    {
      code: 'INTJ',
      name: 'Архитектор',
      group: 'Аналитики',
      functions: {
        dominant: { name: 'Ni', desc: 'Интровертная интуиция' },
        auxiliary: { name: 'Te', desc: 'Экстравертное мышление' },
        tertiary: { name: 'Fi', desc: 'Интровертное чувство' },
        inferior: { name: 'Se', desc: 'Экстравертное ощущение' }
      },
      core: 'Стратегическое видение, долгосрочное планирование, поиск паттернов. Стремится к совершенству и компетентности.',
      stress: 'Под стрессом: погружается в сенсорные излишества (еда, алкоголь, покупки), становится импульсивным и растерянным.',
      growth: 'В росте: развивает спонтанность и присутствие в моменте, учится наслаждаться простыми радостями.',
      rp_hook: 'В сцене: замечает скрытые мотивы, планирует на три шага вперёд, избегает импровизации. Триггер: хаос → анализ → план. Тело: неподвижная поза, пристальный взгляд, экономные жесты.',
      markers: [
        'Говорит о долгосрочных последствиях',
        'Нетерпим к неэффективности',
        'Предпочитает глубокие разговоры светским',
        'Долго обдумывает ответы'
      ],
      lieSuggestion: '«Если я не контролирую будущее — всё развалится.»',
      flawSuggestion: 'Перехватывает инициативу, не слушает возражений, планирует за всех, игнорирует эмоции ради эффективности.'
    },
    {
      code: 'INTP',
      name: 'Логик',
      group: 'Аналитики',
      functions: {
        dominant: { name: 'Ti', desc: 'Интровертное мышление' },
        auxiliary: { name: 'Ne', desc: 'Экстравертная интуиция' },
        tertiary: { name: 'Si', desc: 'Интровертное ощущение' },
        inferior: { name: 'Fe', desc: 'Экстравертное чувство' }
      },
      core: 'Анализ, поиск истины, построение ментальных моделей. Стремится понять, как всё работает на самом деле.',
      stress: 'Под стрессом: становится эмоционально нестабильным, ищет внешнего подтверждения, реагирует на чужие эмоции.',
      growth: 'В росте: развивает социальные навыки и эмпатию, учится выражать чувства и заботиться о других.',
      rp_hook: 'В сцене: задаёт уточняющие вопросы, ищет логические противоречия, уходит в мысли. Триггер: нелогичность → анализ → коррекция. Тело: рассеянный взгляд, поза «мыслителя», паузы в речи.',
      markers: [
        'Точность формулировок важнее скорости',
        'Склонен к теоретизированию',
        'Забывает о бытовых делах',
        'Не любит мелкую светскую беседу'
      ],
      lieSuggestion: '«Если я пойму систему — найду правильное решение.»',
      flawSuggestion: 'Уходит в анализ, не принимает решений, откладывает действие ради «полной картины».'
    },
    {
      code: 'ENTJ',
      name: 'Командир',
      group: 'Аналитики',
      functions: {
        dominant: { name: 'Te', desc: 'Экстравертное мышление' },
        auxiliary: { name: 'Ni', desc: 'Интровертная интуиция' },
        tertiary: { name: 'Se', desc: 'Экстравертное ощущение' },
        inferior: { name: 'Fi', desc: 'Интровертное чувство' }
      },
      core: 'Лидерство, стратегия, эффективность. Стремится к контролю и достижению амбициозных целей.',
      stress: 'Под стрессом: становится замкнутым, погружается в самокопание, испытывает чувства вины и неполноценности.',
      growth: 'В росте: развивает внутренний мир и ценности, учится быть уязвимым и принимать свои эмоции.',
      rp_hook: 'В сцене: берёт инициативу, делегирует, не терпит возражений без аргументов. Триггер: беспорядок → реорганизация → контроль. Тело: прямая осанка, уверенные жесты, командный тон.',
      markers: [
        'Быстро принимает решения',
        'Прямолинеен в критике',
        'Видит потенциальные проблемы',
        'Нетерпим к неэффективности'
      ],
      lieSuggestion: '«Если я не контролирую — будет хаос.»',
      flawSuggestion: 'Перехватывает управление, не доверяет другим, подавляет несогласных.'
    },
    {
      code: 'ENTP',
      name: 'Визионер',
      group: 'Аналитики',
      functions: {
        dominant: { name: 'Ne', desc: 'Экстравертная интуиция' },
        auxiliary: { name: 'Ti', desc: 'Интровертное мышление' },
        tertiary: { name: 'Fe', desc: 'Экстравертное чувство' },
        inferior: { name: 'Si', desc: 'Интровертное ощущение' }
      },
      core: 'Генерация идей, споры, интеллектуальные вызовы. Стремится к новизне и интеллектуальной стимуляции.',
      stress: 'Под стрессом: зацикливается на деталях и прошлом, становится обидчивым и мнительным.',
      growth: 'В росте: развивает последовательность и обязательность, учится доводить дела до конца.',
      rp_hook: 'В сцене: играет «адвоката дьявола», предлагает безумные идеи, переключается между темами. Триггер: скука → провокация → дебаты. Тело: активная жестикуляция, меняет позу, быстрый темп речи.',
      markers: [
        'Любит спорить ради спора',
        'Начинает много проектов',
        'Склонен к импровизации',
        'Быстро находит слабые места'
      ],
      lieSuggestion: '«Если достаточно помучить идею — найду истину.»',
      flawSuggestion: 'Бросает проекты на полпути, спорит ради спора, игнорирует рутину.'
    },
    {
      code: 'INFJ',
      name: 'Адвокат',
      group: 'Дипломаты',
      functions: {
        dominant: { name: 'Ni', desc: 'Интровертная интуиция' },
        auxiliary: { name: 'Fe', desc: 'Экстравертное чувство' },
        tertiary: { name: 'Ti', desc: 'Интровертное мышление' },
        inferior: { name: 'Se', desc: 'Экстравертное ощущение' }
      },
      core: 'Глубокое понимание людей, поиск смысла, помощь другим. Стремится к гармонии и аутентичности.',
      stress: 'Под стрессом: погружается в сенсорные удовольствия, становится импульсивным и растерянным.',
      growth: 'В росте: развивает способность действовать в моменте, учится наслаждаться простыми радостями.',
      rp_hook: 'В сцене: считывает настроение, предугадывает реакции, избегает конфликта. Триггер: дисгармония → посредничество → восстановление. Тело: мягкие движения, внимательный взгляд, тихий голос.',
      markers: [
        'Чувствует настроение других',
        'Избегает конфликтов',
        'Предпочитает глубокие связи',
        'Нуждается в времени наедине'
      ],
      lieSuggestion: '«Если я всем помогу — будет гармония.»',
      flawSuggestion: 'Жертвует собой ради других, избегает конфликта любой ценой, выгорает.'
    },
    {
      code: 'INFP',
      name: 'Посредник',
      group: 'Дипломаты',
      functions: {
        dominant: { name: 'Fi', desc: 'Интровертное чувство' },
        auxiliary: { name: 'Ne', desc: 'Экстравертная интуиция' },
        tertiary: { name: 'Si', desc: 'Интровертное ощущение' },
        inferior: { name: 'Te', desc: 'Экстравертное мышление' }
      },
      core: 'Внутренние ценности, аутентичность, творчество. Стремится жить в соответствии со своими идеалами.',
      stress: 'Под стрессом: становится критичным и жёстким, навязывает своё мнение, теряет гибкость.',
      growth: 'В росте: развивает структурированность и решительность, учится действовать логически.',
      rp_hook: 'В сцене: защищает ценности, уходит в себя при конфликте, ищет глубину. Триггер: несправедливость → защита → отступление. Тело: избегающий контакт, сжатая поза, тихий голос.',
      markers: [
        'Ценит аутентичность',
        'Склонен к идеализму',
        'Трудно принимает критику',
        'Богатый внутренний мир'
      ],
      lieSuggestion: '«Если буду настоящим — меня примут.»',
      flawSuggestion: 'Уходит в себя при конфликте, идеализирует, избегает конфронтации.'
    },
    {
      code: 'ENFJ',
      name: 'Тренер',
      group: 'Дипломаты',
      functions: {
        dominant: { name: 'Fe', desc: 'Экстравертное чувство' },
        auxiliary: { name: 'Ni', desc: 'Интровертная интуиция' },
        tertiary: { name: 'Se', desc: 'Экстравертное ощущение' },
        inferior: { name: 'Ti', desc: 'Интровертное мышление' }
      },
      core: 'Эмпатия, мотивация других, создание гармонии. Стремится помочь людям раскрыть потенциал.',
      stress: 'Под стрессом: становится замкнутым и критичным, сомневается в своей компетентности.',
      growth: 'В росте: развивает критическое мышление, учится объективно оценивать ситуации.',
      rp_hook: 'В сцене: поддерживает, вдохновляет, сглаживает конфликты. Триггер: чужая боль → помощь → руководство. Тело: открытая поза, тёплый взгляд, модулирует голос.',
      markers: [
        'Легко заводит друзей',
        'Чувствует эмоции других',
        'Стремится помочь',
        'Избегает критики'
      ],
      lieSuggestion: '«Если я всем помогу — буду нужен.»',
      flawSuggestion: 'Игнорирует свои потребности, манипулирует «ради блага», выгорает.'
    },
    {
      code: 'ENFP',
      name: 'Борец',
      group: 'Дипломаты',
      functions: {
        dominant: { name: 'Ne', desc: 'Экстравертная интуиция' },
        auxiliary: { name: 'Fi', desc: 'Интровертное чувство' },
        tertiary: { name: 'Te', desc: 'Экстравертное мышление' },
        inferior: { name: 'Si', desc: 'Интровертное ощущение' }
      },
      core: 'Энтузиазм, креативность, соединение людей. Стремится к свободе и значимым связям.',
      stress: 'Под стрессом: становится мнительным и обидчивым, зацикливается на деталях.',
      growth: 'В росте: развивает последовательность, учится следовать рутине и доводить дела до конца.',
      rp_hook: 'В сцене: генерирует идеи, воодушевляет, переключается между темами. Триггер: возможность → энтузиазм → действие. Тело: активные жесты, расширенные зрачки, быстрый темп.',
      markers: [
        'Начинает много проектов',
        'Легко заводит знакомства',
        'Ценит аутентичность',
        'Не любит рутину'
      ],
      lieSuggestion: '«Если будет достаточно возможностей — найду своё.»',
      flawSuggestion: 'Бросает начатое, избегает рутины, рассеивает энергию.'
    },
    {
      code: 'ISTJ',
      name: 'Логист',
      group: 'Стражи',
      functions: {
        dominant: { name: 'Si', desc: 'Интровертное ощущение' },
        auxiliary: { name: 'Te', desc: 'Экстравертное мышление' },
        tertiary: { name: 'Fi', desc: 'Интровертное чувство' },
        inferior: { name: 'Ne', desc: 'Экстравертная интуиция' }
      },
      core: 'Надёжность, порядок, традиции. Стремится к стабильности и выполнению обязательств.',
      stress: 'Под стрессом: видит везде катастрофические сценарии, паникует о будущем.',
      growth: 'В росте: развивает гибкость, учится принимать изменения и новые идеи.',
      rp_hook: 'В сцене: следует правилам, помнит детали, выполняет обязательства. Триггер: беспорядок → организация → порядок. Тело: сдержанные движения, ровный голос, фиксирует детали.',
      markers: [
        'Помнит детали и даты',
        'Выполняет обещания',
        'Ценит традиции',
        'Предпочитает проверенные пути'
      ],
      lieSuggestion: '«Если следовать правилам — всё будет правильно.»',
      flawSuggestion: 'Ригиден, сопротивляется переменам, судит по стандартам.'
    },
    {
      code: 'ISFJ',
      name: 'Защитник',
      group: 'Стражи',
      functions: {
        dominant: { name: 'Si', desc: 'Интровертное ощущение' },
        auxiliary: { name: 'Fe', desc: 'Экстравертное чувство' },
        tertiary: { name: 'Ti', desc: 'Интровертное мышление' },
        inferior: { name: 'Ne', desc: 'Экстравертная интуиция' }
      },
      core: 'Забота, преданность, внимание к деталям. Стремится создавать комфорт и безопасность для близких.',
      stress: 'Под стрессом: видит негативные возможности, становится тревожным и мнительным.',
      growth: 'В росте: развивает адаптивность, учится справляться с неопределённостью.',
      rp_hook: 'В сцене: заботится, помнит предпочтения, избегает конфликта. Триггер: чужая нужда → помощь → забота. Тело: мягкие движения, внимательный взгляд, тихий голос.',
      markers: [
        'Помнит детали о людях',
        'Стремится помочь',
        'Ценит гармонию',
        'Не любит перемен'
      ],
      lieSuggestion: '«Если я забочусь о всех — меня не отвергнут.»',
      flawSuggestion: 'Жертвует собой, трудно говорит «нет», копит обиды.'
    },
    {
      code: 'ESTJ',
      name: 'Исполнитель',
      group: 'Стражи',
      functions: {
        dominant: { name: 'Te', desc: 'Экстравертное мышление' },
        auxiliary: { name: 'Si', desc: 'Интровертное ощущение' },
        tertiary: { name: 'Ne', desc: 'Экстравертная интуиция' },
        inferior: { name: 'Fi', desc: 'Интровертное чувство' }
      },
      core: 'Организация, эффективность, лидерство. Стремится к порядку и достижению результатов.',
      stress: 'Под стрессом: становится замкнутым и эмоциональным, чувствует себя непонятым.',
      growth: 'В росте: развивает эмпатию, учится учитывать чувства других.',
      rp_hook: 'В сцене: организует, делегирует, требует результатов. Триггер: неэффективность → реорганизация → контроль. Тело: уверенная стойка, командный голос, точные жесты.',
      markers: [
        'Быстро принимает решения',
        'Ценит порядок',
        'Прямолинеен',
        'Ориентирован на результат'
      ],
      lieSuggestion: '«Если всё организовано правильно — результат гарантирован.»',
      flawSuggestion: 'Нетерпим к инакомыслию, подавляет эмоции, контролирует.'
    },
    {
      code: 'ESFJ',
      name: 'Консул',
      group: 'Стражи',
      functions: {
        dominant: { name: 'Fe', desc: 'Экстравертное чувство' },
        auxiliary: { name: 'Si', desc: 'Интровертное ощущение' },
        tertiary: { name: 'Ne', desc: 'Экстравертная интуиция' },
        inferior: { name: 'Ti', desc: 'Интровертное мышление' }
      },
      core: 'Гармония, забота, социальные связи. Стремится к признанию и принадлежности к группе.',
      stress: 'Под стрессом: становится критичным и обидчивым, сомневается в своей компетентности.',
      growth: 'В росте: развивает критическое мышление, учится объективно оценивать.',
      rp_hook: 'В сцене: создаёт атмосферу, заботится, помнит о всех. Триггер: дискомфорт группы → гармонизация → забота. Тело: открытая поза, тёплая улыбка, модулирует голос.',
      markers: [
        'Легко заводит друзей',
        'Помнит о важных датах',
        'Стремится к гармонии',
        'Ценит традиции'
      ],
      lieSuggestion: '«Если всем комфортно — я на своём месте.»',
      flawSuggestion: 'Зависит от чужого мнения, избегает конфликта, манипулирует заботой.'
    },
    {
      code: 'ISTP',
      name: 'Виртуоз',
      group: 'Исследователи',
      functions: {
        dominant: { name: 'Ti', desc: 'Интровертное мышление' },
        auxiliary: { name: 'Se', desc: 'Экстравертное ощущение' },
        tertiary: { name: 'Ni', desc: 'Интровертная интуиция' },
        inferior: { name: 'Fe', desc: 'Экстравертное чувство' }
      },
      core: 'Практический анализ, действия, мастерство. Стремится понять, как вещи работают на практике.',
      stress: 'Под стрессом: становится эмоционально нестабильным, ищет чужого одобрения.',
      growth: 'В росте: развивает социальные навыки, учится выражать чувства.',
      rp_hook: 'В сцене: анализирует, действует, сохраняет спокойствие. Триггер: проблема → анализ → действие. Тело: расслабленная поза, экономные движения, прищуренный взгляд.',
      markers: [
        'Хорошо работает руками',
        'Сохраняет спокойствие в кризисе',
        'Предпочитает практику теории',
        'Не любит долгие разговоры'
      ],
      lieSuggestion: '«Если разберусь в механизме — смогу его контролировать.»',
      flawSuggestion: 'Эмоционально отстранён, избегает обязательств, рискует без расчёта.'
    },
    {
      code: 'ISFP',
      name: 'Артист',
      group: 'Исследователи',
      functions: {
        dominant: { name: 'Fi', desc: 'Интровертное чувство' },
        auxiliary: { name: 'Se', desc: 'Экстравертное ощущение' },
        tertiary: { name: 'Ni', desc: 'Интровертная интуиция' },
        inferior: { name: 'Te', desc: 'Экстравертное мышление' }
      },
      core: 'Эстетика, аутентичность, свобода. Стремится жить в гармонии с внутренними ценностями.',
      stress: 'Под стрессом: становится жёстким и критичным, навязывает своё мнение.',
      growth: 'В росте: развивает структурированность, учится планировать.',
      rp_hook: 'В сцене: ценит красоту, избегает конфликта, живёт моментом. Триггер: красота → наслаждение → творчество. Тело: мягкие движения, чувствительный взгляд, тихий голос.',
      markers: [
        'Ценит эстетику',
        'Живёт моментом',
        'Избегает конфликтов',
        'Ценит свободу'
      ],
      lieSuggestion: '«Если буду верен себе — найду гармонию.»',
      flawSuggestion: 'Избегает конфликта, трудно планирует, уходит от ответственности.'
    },
    {
      code: 'ESTP',
      name: 'Предприниматель',
      group: 'Исследователи',
      functions: {
        dominant: { name: 'Se', desc: 'Экстравертное ощущение' },
        auxiliary: { name: 'Ti', desc: 'Интровертное мышление' },
        tertiary: { name: 'Fe', desc: 'Экстравертное чувство' },
        inferior: { name: 'Ni', desc: 'Интровертная интуиция' }
      },
      core: 'Действие, риск, момент. Стремится к острым ощущениям и практическому успеху.',
      stress: 'Под стрессом: видит скрытые угрозы, становится мнительным и тревожным.',
      growth: 'В росте: развивает дальновидность, учится планировать наперёд.',
      rp_hook: 'В сцене: действует быстро, берёт риск, импровизирует. Триггер: возможность → действие → результат. Тело: активная поза, раскованные движения, громкий голос.',
      markers: [
        'Быстро реагирует',
        'Любит риск',
        'Хорошо импровизирует',
        'Живёт моментом'
      ],
      lieSuggestion: '«Если действую быстро — контролирую ситуацию.»',
      flawSuggestion: 'Импульсивен, игнорирует последствия, рискует без нужды.'
    },
    {
      code: 'ESFP',
      name: 'Развлекатель',
      group: 'Исследователи',
      functions: {
        dominant: { name: 'Se', desc: 'Экстравертное ощущение' },
        auxiliary: { name: 'Fi', desc: 'Интровертное чувство' },
        tertiary: { name: 'Te', desc: 'Экстравертное мышление' },
        inferior: { name: 'Ni', desc: 'Интровертная интуиция' }
      },
      core: 'Радость, энергия, люди. Стремится к удовольствию и созданию позитивной атмосферы.',
      stress: 'Под стрессом: видит негативные сценарии, чувствует себя потерянным.',
      growth: 'В росте: развивает планирование, учится думать о будущем.',
      rp_hook: 'В сцене: развлекает, живёт моментом, создаёт атмосферу. Триггер: веселье → участие → энергия. Тело: активные движения, широкая улыбка, громкий смех.',
      markers: [
        'Любит быть в центре',
        'Легко заводит друзей',
        'Живёт моментом',
        'Избегает негатива'
      ],
      lieSuggestion: '«Если всем весело — всё хорошо.»',
      flawSuggestion: 'Избегает проблем, импульсивен, трудно с обязательствами.'
    }
  ];

  // State - explicitly initialized
  let activeCard = null;
  let activeFilters = new Set();
  let activeType = null;

  // Render grid
  MBTI_TYPES.forEach(type => {
    const card = document.createElement('div');
    card.className = 'type-card';
    card.dataset.type = type.code;
    card.setAttribute('tabindex', '0');

    const color = GROUP_COLORS[type.group];

    card.innerHTML = `
      <div class="type-code" style="color:${color}">${type.code}</div>
      <div class="type-nickname">${type.name}</div>
    `;

    card.addEventListener('click', () => {
      if (activeCard) activeCard.classList.remove('active');
      card.classList.add('active');
      activeCard = card;
      activeType = type;
      showType(type, color);
      updateUsagePanel(type, color);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    grid.appendChild(card);
  });

  // Show type in panel
  function showType(type, color) {
    const panel = document.getElementById('mbti-panel');

    panel.innerHTML = `
      <div class="panel-header" style="border-color:${color}33">
        <div class="type-code-large" style="color:${color}">${type.code}</div>
        <div class="type-full-name">${type.name}</div>
        <div class="type-group">${type.group}</div>
      </div>

      <div class="panel-body">
        <div class="section">
          <div class="section-label">Когнитивные функции</div>
          <div class="functions-stack">
            <div class="function dominant">
              <span class="func-name" style="color:${color}">${type.functions.dominant.name}</span>
              <span class="func-role">Доминантная</span>
              <span class="func-desc">${FUNCTION_DESCRIPTIONS[type.functions.dominant.name]}</span>
            </div>
            <div class="function auxiliary">
              <span class="func-name">${type.functions.auxiliary.name}</span>
              <span class="func-role">Вспомогательная</span>
              <span class="func-desc">${FUNCTION_DESCRIPTIONS[type.functions.auxiliary.name]}</span>
            </div>
            <div class="function tertiary">
              <span class="func-name">${type.functions.tertiary.name}</span>
              <span class="func-role">Терциарная</span>
              <span class="func-desc">${FUNCTION_DESCRIPTIONS[type.functions.tertiary.name]}</span>
            </div>
            <div class="function inferior">
              <span class="func-name">${type.functions.inferior.name}</span>
              <span class="func-role">Инфериорная</span>
              <span class="func-desc">${FUNCTION_DESCRIPTIONS[type.functions.inferior.name]}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-label">Ядро типа</div>
          <div class="section-content">${type.core}</div>
        </div>

        <div class="section">
          <div class="section-label">Поведенческие маркеры</div>
          <ul class="marker-list">
            ${type.markers.map(m => `<li>${m}</li>`).join('')}
          </ul>
        </div>

        <div class="section stress-section">
          <div class="section-label">Под стрессом</div>
          <div class="section-content">${type.stress}</div>
        </div>

        <div class="section growth-section">
          <div class="section-label">В росте</div>
          <div class="section-content">${type.growth}</div>
        </div>

        <div class="section rp-section">
          <div class="section-label">RP-якорь</div>
          <div class="section-content">${type.rp_hook}</div>
        </div>
      </div>
    `;
  }

  // Update usage panel with type-specific content
  function updateUsagePanel(type, color) {
    const panel = document.getElementById('mbti-type-usage-panel');
    if (!panel) return;

    panel.style.display = 'block';

    // Type badge
    document.getElementById('mbti-usage-type-badge').textContent = type.code;
    document.getElementById('mbti-usage-type-badge').style.color = color;

    // Motivation
    document.getElementById('mbti-usage-motivation').innerHTML = `
      <strong>LIE:</strong> ${type.lieSuggestion}<br>
      <strong>FLAW:</strong> ${type.flawSuggestion}
    `;

    // MBTI tag
    const funcStr = `${type.functions.dominant.name}-${type.functions.auxiliary.name}-${type.functions.tertiary.name}-${type.functions.inferior.name}`;
    const stressShort = type.stress.replace('Под стрессом: ', '').split('.')[0] + '.';
    const growthShort = type.growth.replace('В росте: ', '').split('.')[0] + '.';
    document.getElementById('mbti-usage-mbti-tag').textContent = `<mbti>
Тип: ${type.code}. Функции: ${funcStr}.
Под стрессом: ${stressShort}
В росте: ${growthShort}
</mbti>`;

    // Behavior anchors
    const rpMatch = type.rp_hook.match(/Триггер:\s*([^.]+)\.\s*Тело:\s*([^.]+)\./);
    const triggerPart = rpMatch ? rpMatch[1] : 'ситуация требует реакции';
    const bodyPart = rpMatch ? rpMatch[2] : 'напряжённая поза';

    document.getElementById('mbti-usage-behavior').textContent = `<behavior>
- Когда ${triggerPart.split('→')[0].trim()} → ${bodyPart.toLowerCase()} → Цена: ${type.flawSuggestion.split(',')[0].toLowerCase()}.

- Когда ${type.markers[0].toLowerCase()} → [добавь действие] → Цена: [добавь цену].

- Когда чувствует угрозу → ${type.stress.replace('Под стрессом: ', '').split(',')[0].toLowerCase()}.
</behavior>`;

    // Example template
    document.getElementById('mbti-usage-example').textContent = `<START>
{{char}}: [${bodyPart.toLowerCase()}.] [сенсорная деталь окружения.] «[речь персонажа — проявление ${type.lieSuggestion.split(':')[0].toLowerCase()}].» [телесная реакция.]`;
  }

  // Filter bar logic
  const DICHOTOMIES = {
    'E': { letters: ['E', 'I'], index: 0 },
    'S': { letters: ['S', 'N'], index: 1 },
    'T': { letters: ['T', 'F'], index: 2 },
    'J': { letters: ['J', 'P'], index: 3 }
  };

  const filterButtons = document.querySelectorAll('.mbti-embed .filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const dichotomy = btn.dataset.dichotomy;

      if (activeFilters.has(dichotomy)) {
        activeFilters.delete(dichotomy);
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        activeFilters.add(dichotomy);
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      }

      applyFilters();
    });
  });

  function applyFilters() {
    const cards = document.querySelectorAll('.mbti-embed .type-card');

    cards.forEach(card => {
      const code = card.dataset.type;
      let visible = true;

      activeFilters.forEach(filter => {
        const { letters, index } = DICHOTOMIES[filter];
        const letter = code[index];
        // Highlight the first letter of the dichotomy pair
        if (letter !== letters[0]) {
          visible = false;
        }
      });

      if (visible) {
        card.classList.remove('dimmed');
      } else {
        card.classList.add('dimmed');
      }
    });
  }
}

// Lazy init for MBTI details — initialize on first open
document.getElementById('acc-mbti')?.addEventListener('toggle', function() {
  if (this.open && !document.querySelector('#mbti-types-grid .type-card')) {
    initMbti();
  }
});

// === ENNEAGRAM EMBED ===
function initEnneagram() {
  const svg = document.getElementById('ennea-svg');
  if (!svg) return;

  const ENNEA_TYPES = [
    { n:1, name:'Реформатор', key:'Совершенство',
      fear:'быть плохим, неправильным, порочным',
      desire:'быть правым, добродетельным, безупречным',
      wings:[{label:'1w9',desc:'мягче, спокойнее, избегает конфликта'},{label:'1w2',desc:'теплее, ориентирован на людей, учительский'}]
    },
    { n:2, name:'Помощник', key:'Помощь',
      fear:'быть ненужным, нелюбимым',
      desire:'быть любимым, нужным',
      wings:[{label:'2w1',desc:'помогает из принципа, более строгий'},{label:'2w3',desc:'помогает чтобы нравиться, амбициозный'}]
    },
    { n:3, name:'Деятель', key:'Успех',
      fear:'быть ничем, пустым, провалившимся',
      desire:'быть успешным, ценным, признанным',
      wings:[{label:'3w2',desc:'харизматичный, ориентирован на людей'},{label:'3w4',desc:'артистичный, самовыражение через успех'}]
    },
    { n:4, name:'Индивидуалист', key:'Идентичность',
      fear:'быть безликим, обычным, ненастоящим',
      desire:'быть уникальным, особенным, аутентичным',
      wings:[{label:'4w3',desc:'выражает уникальность через достижения'},{label:'4w5',desc:'уходит внутрь, накапливает внутренний мир'}]
    },
    { n:5, name:'Исследователь', key:'Знание',
      fear:'быть беспомощным, пустым, без компетентности',
      desire:'быть компетентным, всезнающим',
      wings:[{label:'5w4',desc:'интровертный, творческий, эстетичный'},{label:'5w6',desc:'системный, командный, готовится к рискам'}]
    },
    { n:6, name:'Лоялист', key:'Лояльность',
      fear:'остаться без поддержки, один на один с опасностью',
      desire:'быть в безопасности, иметь союзников',
      wings:[{label:'6w5',desc:'отстранённый, аналитичный, готовится к угрозам'},{label:'6w7',desc:'активный, ищет развлечения чтобы отвлечься от страха'}]
    },
    { n:7, name:'Энтузиаст', key:'Разнообразие',
      fear:'быть в ловушке, в боли, в тягостном',
      desire:'быть свободным, счастливым, насыщенным',
      wings:[{label:'7w6',desc:'более осторожный, лояльный, ищет безопасность'},{label:'7w8',desc:'напористый, ищет контроль и приключения'}]
    },
    { n:8, name:'Босс', key:'Контроль',
      fear:'быть уязвимым, контролируемым, слабым',
      desire:'быть сильным, независимым, защищённым',
      wings:[{label:'8w7',desc:'экспансивный, авантюрный, энергичный'},{label:'8w9',desc:'медленнее, мощнее, покровительственный'}]
    },
    { n:9, name:'Миротворец', key:'Покой',
      fear:'быть в конфликте, отвергнутым, расколотым',
      desire:'быть в гармонии, едином, спокойном',
      wings:[{label:'9w8',desc:'более напористый, прямолинейный'},{label:'9w1',desc:'принципиальный, идеалистичный, упорядоченный'}]
    }
  ];

  const ENNEA_COLORS = [
    '#e8867a','#e8a87a','#e8d87a','#a8d87a',
    '#7adde8','#7a9ee8','#aa7ae8','#e87aa8','#aaaaaa'
  ];

  const cx = 240, cy = 240, R = 185, r = 28;
  const NS = 'http://www.w3.org/2000/svg';

  const connections = [
    [1,4],[4,2],[2,8],[8,5],[5,7],[7,1],[3,6],[6,9],[9,3]
  ];

  function enneaPos(n) {
    const angle = ((n - 1) / 9) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  }

  // Inner connection lines
  const linesG = document.createElementNS(NS, 'g');
  linesG.setAttribute('class', 'inner-lines');
  svg.appendChild(linesG);

  connections.forEach(([a, b]) => {
    const pa = enneaPos(a), pb = enneaPos(b);
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', pa.x); line.setAttribute('y1', pa.y);
    line.setAttribute('x2', pb.x); line.setAttribute('y2', pb.y);
    line.setAttribute('stroke', '#ffffff');
    linesG.appendChild(line);
  });

  // Guide circle
  const guide = document.createElementNS(NS, 'circle');
  guide.setAttribute('cx', cx); guide.setAttribute('cy', cy);
  guide.setAttribute('r', R);
  guide.setAttribute('fill', 'none');
  guide.setAttribute('stroke', document.body.classList.contains('theme-light') ? '#d1d5db' : '#2a2a38');
  guide.setAttribute('stroke-width', '1');
  svg.appendChild(guide);

  let activeEnneaNode = null;

  ENNEA_TYPES.forEach((t, i) => {
    const p = enneaPos(t.n);
    const color = ENNEA_COLORS[i];
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'node');
    g.style.color = color;

    // Background circle
    const circ = document.createElementNS(NS, 'circle');
    circ.setAttribute('cx', p.x); circ.setAttribute('cy', p.y);
    circ.setAttribute('r', r);
    circ.setAttribute('fill', document.body.classList.contains('theme-light') ? '#ffffff' : '#0b0b0f');
    circ.setAttribute('stroke', color);
    g.appendChild(circ);

    // Type number
    const num = document.createElementNS(NS, 'text');
    num.setAttribute('x', p.x); num.setAttribute('y', p.y - 5);
    num.setAttribute('text-anchor', 'middle');
    num.setAttribute('dominant-baseline', 'central');
    num.setAttribute('fill', color);
    num.setAttribute('font-size', '15');
    num.setAttribute('font-family', "'Playfair Display', serif");
    num.setAttribute('font-weight', '700');
    num.setAttribute('pointer-events', 'none');
    num.textContent = t.n;
    g.appendChild(num);

    // Short name label
    const lbl = document.createElementNS(NS, 'text');
    lbl.setAttribute('x', p.x); lbl.setAttribute('y', p.y + 9);
    lbl.setAttribute('text-anchor', 'middle');
    lbl.setAttribute('dominant-baseline', 'central');
    lbl.setAttribute('fill', 'rgba(255,255,255,0.65)');
    lbl.setAttribute('font-size', '8.5');
    lbl.setAttribute('font-family', "'IBM Plex Mono', monospace");
    lbl.setAttribute('pointer-events', 'none');
    lbl.textContent = t.name.slice(0, 8);
    g.appendChild(lbl);

    g.addEventListener('click', () => {
      if (activeEnneaNode) activeEnneaNode.classList.remove('active');
      g.classList.add('active');
      activeEnneaNode = g;
      showEnneaPanel(t, color);
    });

    svg.appendChild(g);
  });

  function showEnneaPanel(t, color) {
    const panel = document.getElementById('ennea-panel');
    if (!panel) return;
    panel.innerHTML =
      '<div class="ennea-panel-header" style="border-color:' + color + '33">' +
        '<div class="ennea-type-num" style="color:' + color + '">' + t.n + '</div>' +
        '<div class="ennea-type-name">' + t.name + '</div>' +
        '<span class="ennea-keyword" style="background:' + color + '22;color:' + color + ';border:1px solid ' + color + '55">' + t.key + '</span>' +
      '</div>' +
      '<div class="ennea-panel-body">' +
        '<div>' +
          '<div class="ennea-row-label">😨 Страх</div>' +
          '<div class="ennea-fear-val">' + t.fear + '</div>' +
        '</div>' +
        '<div>' +
          '<div class="ennea-row-label">✨ Желание</div>' +
          '<div class="ennea-desire-val">' + t.desire + '</div>' +
        '</div>' +
        '<div>' +
          '<div class="ennea-row-label">Крылья</div>' +
          '<div class="ennea-wings-row">' +
            t.wings.map(function(w) {
              return '<div class="ennea-wing-chip">' +
                '<div class="wn" style="color:' + color + '">' + w.label + '</div>' +
                '<div class="wd">' + w.desc + '</div>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // Wings reference grid
  const wg = document.getElementById('ennea-wings-grid');
  if (wg) {
    ENNEA_TYPES.forEach(function(t, i) {
      const color = ENNEA_COLORS[i];
      t.wings.forEach(function(w) {
        const div = document.createElement('div');
        div.className = 'ennea-wing-item';
        div.innerHTML =
          '<div class="wi-title" style="color:' + color + '">' + w.label + ' — ' + t.name + '</div>' +
          '<div class="wi-desc">' + w.desc + '</div>';
        wg.appendChild(div);
      });
    });
  }
}

// === SCRATCHPAD MODULE (Floating / Draggable / Resizable) ===
function initScratchpad() {
  'use strict';

  const STORAGE_KEY   = 'guide_scratchpad_v45_local';
  const ENABLED_KEY   = 'guide_scratchpad_enabled_v45';
  const GEOMETRY_KEY  = 'guide_scratchpad_geometry_v45';

  /* ---- Safe localStorage wrappers ---- */
  function safeGetItem(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function safeSetItem(key, val) {
    try { localStorage.setItem(key, val); } catch { /* storage unavailable */ }
  }
  function safeRemoveItem(key) {
    try { localStorage.removeItem(key); } catch { /* storage unavailable */ }
  }

  /* ================================================================
     Phase 1: DOM Injection
     ================================================================ */

  const fabGroup = document.getElementById('fab-group');
  const fabTheme = document.getElementById('fab-theme');
  if (!fabGroup || !fabTheme) return;

  // FAB button — use existing if present (added in HTML), otherwise create
  let fabBtn = document.getElementById('fab-scratchpad');
  if (!fabBtn) {
    fabBtn = document.createElement('button');
    fabBtn.className = 'fab-btn';
    fabBtn.id = 'fab-scratchpad';
    fabBtn.setAttribute('aria-label', 'Toggle scratchpad');
    fabBtn.title = 'Scratchpad';
    fabBtn.type = 'button';
    fabBtn.textContent = '📝';
    fabTheme.after(fabBtn);
  }

  // Hidden file input
  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.id = 'guide-scratchpad-import';
  importInput.accept = '.txt';
  importInput.style.display = 'none';
  fabGroup.after(importInput);

  // Panel
  const panel = document.createElement('div');
  panel.id = 'guide-scratchpad-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Scratchpad panel');
  panel.setAttribute('aria-hidden', 'true');

  // Header (drag handle)
  const header = document.createElement('div');
  header.id = 'guide-scratchpad-header';

  const titleEl = document.createElement('span');
  titleEl.id = 'guide-scratchpad-title';
  titleEl.textContent = '📝 Scratchpad';

  const actions = document.createElement('div');
  actions.id = 'guide-scratchpad-actions';

  const actionDefs = [
    { id: 'guide-scratchpad-copy',       title: 'Copy All',     icon: '📋' },
    { id: 'guide-scratchpad-export',     title: 'Export .txt',  icon: '💾' },
    { id: 'guide-scratchpad-import-btn', title: 'Import .txt',  icon: '📂' },
    { id: 'guide-scratchpad-clear',      title: 'Clear',        icon: '🗑️' },
    { id: 'guide-scratchpad-close',      title: 'Close (Esc)',  icon: '✖'  }
  ];

  const actionBtns = {};
  actionDefs.forEach(function(def) {
    var btn = document.createElement('button');
    btn.id = def.id;
    btn.title = def.title;
    btn.type = 'button';
    btn.textContent = def.icon;
    actions.appendChild(btn);
    actionBtns[def.id] = btn;
  });

  header.appendChild(titleEl);
  header.appendChild(actions);

  // Body (textarea)
  var body = document.createElement('div');
  body.id = 'guide-scratchpad-body';

  var textarea = document.createElement('textarea');
  textarea.id = 'guide-scratchpad-textarea';
  textarea.spellcheck = true;
  textarea.placeholder =
    'Draft your Anchors, Spine, GHOST, Greeting, Examples, SP settings here…\n\n' +
    '[Trigger] → [Action] → [Price]\n\n' +
    '[Spine]:\n\n' +
    '[GHOST]:\n\n' +
    '[Greeting First Message]:';
  body.appendChild(textarea);

  // Status bar
  var statusBar = document.createElement('div');
  statusBar.id = 'guide-scratchpad-status';
  var charCount = document.createElement('span');
  charCount.id = 'guide-scratchpad-chars';
  charCount.textContent = '0 chars';
  var wordCount = document.createElement('span');
  wordCount.id = 'guide-scratchpad-words';
  wordCount.textContent = '0 words';
  statusBar.appendChild(charCount);
  statusBar.appendChild(wordCount);

  // Resize handle (bottom-right grip)
  var resizeHandle = document.createElement('div');
  resizeHandle.id = 'guide-scratchpad-resize';

  panel.appendChild(header);
  panel.appendChild(body);
  panel.appendChild(statusBar);
  panel.appendChild(resizeHandle);
  document.body.appendChild(panel);

  /* ================================================================
     Geometry: default position, restoration, persistence
     ================================================================ */

  var MIN_W = 280, MIN_H = 200;

  function defaultGeometry() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var w = Math.round(vw * 0.42);
    var h = Math.round(vh * 0.62);
    if (vw < 640) { w = vw - 24; h = Math.round(vh * 0.6); }
    // clamp
    w = Math.max(MIN_W, Math.min(w, vw - 24));
    h = Math.max(MIN_H, Math.min(h, vh - 24));
    // center with slight right offset
    var x = Math.round((vw - w) / 2 + vw * 0.08);
    var y = Math.round((vh - h) / 2);
    return { x: x, y: y, w: w, h: h };
  }

  function applyGeometry(geo) {
    panel.style.left   = geo.x + 'px';
    panel.style.top    = geo.y + 'px';
    panel.style.width  = geo.w + 'px';
    panel.style.height = geo.h + 'px';
  }

  function readGeometry() {
    try {
      var raw = localStorage.getItem(GEOMETRY_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  }

  function saveGeometry() {
    try {
      localStorage.setItem(GEOMETRY_KEY, JSON.stringify({
        x: parseInt(panel.style.left, 10),
        y: parseInt(panel.style.top, 10),
        w: panel.offsetWidth,
        h: panel.offsetHeight
      }));
    } catch {}
  }

  // Set initial geometry
  var savedGeo = readGeometry();
  var geo = savedGeo || defaultGeometry();
  applyGeometry(geo);

  /* ================================================================
     Drag Logic (header is the drag handle)
     ================================================================ */

  var isDragging = false;
  var dragOffsetX = 0, dragOffsetY = 0;

  function onDragStart(e) {
    // Ignore if clicking on action buttons
    if (e.target.closest('#guide-scratchpad-actions')) return;
    isDragging = true;
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragOffsetX = clientX - panel.offsetLeft;
    dragOffsetY = clientY - panel.offsetTop;
    document.body.style.cursor = 'grabbing';
    // Bring to front
    panel.style.zIndex = '9999';
    e.preventDefault();
  }

  function onDragMove(e) {
    if (!isDragging) return;
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var clientY = e.touches ? e.touches[0].clientY : e.clientY;
    var newX = clientX - dragOffsetX;
    var newY = clientY - dragOffsetY;
    // Clamp to viewport
    var maxX = window.innerWidth - 60;
    var maxY = window.innerHeight - 40;
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    panel.style.left = newX + 'px';
    panel.style.top  = newY + 'px';
    e.preventDefault();
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = '';
    panel.style.zIndex = '9998';
    saveGeometry();
  }

  header.addEventListener('mousedown', onDragStart);
  header.addEventListener('touchstart', onDragStart, { passive: false });
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('mouseup', onDragEnd);
  document.addEventListener('touchend', onDragEnd);

  /* ================================================================
     Resize Logic (bottom-right handle)
     ================================================================ */

  var isResizing = false;
  var resizeStartX = 0, resizeStartY = 0;
  var resizeStartW = 0, resizeStartH = 0;

  function onResizeStart(e) {
    isResizing = true;
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var clientY = e.touches ? e.touches[0].clientY : e.clientY;
    resizeStartX = clientX;
    resizeStartY = clientY;
    resizeStartW = panel.offsetWidth;
    resizeStartH = panel.offsetHeight;
    document.body.style.cursor = 'nwse-resize';
    panel.style.zIndex = '9999';
    e.preventDefault();
    e.stopPropagation();
  }

  function onResizeMove(e) {
    if (!isResizing) return;
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var clientY = e.touches ? e.touches[0].clientY : e.clientY;
    var dw = clientX - resizeStartX;
    var dh = clientY - resizeStartY;
    var newW = Math.max(MIN_W, resizeStartW + dw);
    var newH = Math.max(MIN_H, resizeStartH + dh);
    // Clamp to viewport
    newW = Math.min(newW, window.innerWidth - panel.offsetLeft);
    newH = Math.min(newH, window.innerHeight - panel.offsetTop);
    panel.style.width  = newW + 'px';
    panel.style.height = newH + 'px';
    e.preventDefault();
  }

  function onResizeEnd() {
    if (!isResizing) return;
    isResizing = false;
    document.body.style.cursor = '';
    panel.style.zIndex = '9998';
    saveGeometry();
  }

  resizeHandle.addEventListener('mousedown', onResizeStart);
  resizeHandle.addEventListener('touchstart', onResizeStart, { passive: false });
  document.addEventListener('mousemove', function(e) {
    if (isResizing) onResizeMove(e);
  });
  document.addEventListener('touchmove', function(e) {
    if (isResizing) onResizeMove(e);
  }, { passive: false });
  document.addEventListener('mouseup', onResizeEnd);
  document.addEventListener('touchend', onResizeEnd);

  /* ================================================================
     State Management + Toggle + Autosave
     ================================================================ */

  function updateCounter() {
    var val = textarea.value;
    var chars = val.length;
    var words = val.trim() ? val.trim().split(/\s+/).length : 0;
    charCount.textContent = chars + ' chars';
    wordCount.textContent = words + ' words';
  }

  function openPanel() {
    panel.classList.add('guide-scratchpad-open');
    fabBtn.classList.add('guide-scratchpad-active');
    panel.setAttribute('aria-hidden', 'false');
    safeSetItem(ENABLED_KEY, 'true');
    textarea.focus();
    updateCounter();
  }

  function closePanel() {
    panel.classList.remove('guide-scratchpad-open');
    fabBtn.classList.remove('guide-scratchpad-active');
    panel.setAttribute('aria-hidden', 'true');
    safeSetItem(ENABLED_KEY, 'false');
    fabBtn.focus();
  }

  function togglePanel() {
    if (panel.classList.contains('guide-scratchpad-open')) {
      closePanel();
    } else {
      openPanel();
    }
  }

  // Autosave with debounce
  var saveTimer = null;
  function handleAutosave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function() {
      safeSetItem(STORAGE_KEY, textarea.value);
      updateCounter();
    }, 300);
  }

  // Content restoration
  var savedContent = safeGetItem(STORAGE_KEY);
  if (savedContent !== null) {
    textarea.value = savedContent;
    updateCounter();
  }
  if (safeGetItem(ENABLED_KEY) === 'true') {
    openPanel();
  }

  /* ================================================================
     Event Bindings
     ================================================================ */

  fabBtn.addEventListener('click', togglePanel);
  actionBtns['guide-scratchpad-close'].addEventListener('click', closePanel);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && panel.classList.contains('guide-scratchpad-open')) {
      closePanel();
    }
  });

  textarea.addEventListener('input', handleAutosave);

  /* ================================================================
     Action Buttons
     ================================================================ */

  // Copy All
  actionBtns['guide-scratchpad-copy'].addEventListener('click', async function() {
    var text = textarea.value;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      textarea.select();
      document.execCommand('copy');
      textarea.setSelectionRange(textarea.selectionStart, textarea.selectionEnd);
    }
    var orig = actionBtns['guide-scratchpad-copy'].textContent;
    actionBtns['guide-scratchpad-copy'].textContent = '✅';
    setTimeout(function() { actionBtns['guide-scratchpad-copy'].textContent = orig; }, 1200);
  });

  // Export .txt
  actionBtns['guide-scratchpad-export'].addEventListener('click', function() {
    var text = textarea.value;
    if (!text) return;
    var date = new Date().toISOString().slice(0, 10);
    var blob = new Blob([text], { type: 'text/plain; charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'guide-notes-' + date + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Import .txt
  actionBtns['guide-scratchpad-import-btn'].addEventListener('click', function() {
    if (textarea.value.trim()) {
      var ok = confirm('Importing will replace current content. Continue?');
      if (!ok) return;
    }
    importInput.click();
  });

  importInput.addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      textarea.value = ev.target.result;
      safeSetItem(STORAGE_KEY, textarea.value);
      updateCounter();
    };
    reader.readAsText(file, 'utf-8');
    importInput.value = '';
  });

  // Clear
  actionBtns['guide-scratchpad-clear'].addEventListener('click', function() {
    if (!textarea.value.trim()) return;
    var ok = confirm('Clear all scratchpad content?');
    if (!ok) return;
    textarea.value = '';
    safeRemoveItem(STORAGE_KEY);
    updateCounter();
  });

  /* ================================================================
     Focus Trap
     ================================================================ */

  panel.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    var focusable = panel.querySelectorAll('textarea, button');
    var first = focusable[0];
    var last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  initTocHighlight();
  initCopyButtons();
  initChecklist();
  initTheme();
  initMobileNav();
  initSearch();
  initAnchors();
  initTabs();
  // BUG-014 FIX: Removed initTocToggle() - conflicts with Panel system
  // The Panel class (initialized in IIFE below) handles TOC panel via safeRebindFab()
  // initTocToggle() was adding duplicate listeners and using incompatible CSS classes
  // initTocToggle();
  initScrollTop();
  initEnneagram();
  initOcean();
  // initScratchpad() removed — legacy scratchpad killed by CSS isolation + safeRebindFab
  // initGuidePanels() removed — replaced by safe IIFE below
  // Initialize Guide Mode Manager
  initGuideMode();
  console.log('Guide v5.3.2 initialized - All Phases Complete (1-14 + Content Modifications + OCEAN + Panel System + Mobile Adaptations + Dual Mode)');
});

// === GUIDE MODE MANAGER ===
function initGuideMode() {
  'use strict';

  const STORAGE_KEY = 'guide-mode';
  const DEFAULT_MODE = 'quick_start';
  const VALID_MODES = ['quick_start', 'propeller_workshop'];

  function getSavedMode() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return VALID_MODES.includes(saved) ? saved : DEFAULT_MODE;
    } catch (e) {
      return DEFAULT_MODE;
    }
  }

  function setMode(mode) {
    if (!VALID_MODES.includes(mode)) {
      console.error('[GuideMode] Invalid mode:', mode);
      return;
    }

    // Update body class
    document.body.classList.remove('mode-quick_start', 'mode-propeller_workshop');
    document.body.classList.add(`mode-${mode}`);

    // Update buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      const isActive = btn.dataset.mode === mode;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Update mode switch links
    document.querySelectorAll('.mode-switch-link').forEach(link => {
      const targetMode = link.dataset.targetMode;
      if (targetMode) {
        link.onclick = (e) => {
          e.preventDefault();
          setMode(targetMode);
        };
      }
    });

    // Persist
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {
      console.warn('[GuideMode] localStorage unavailable');
    }

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('modechange', { detail: { mode } }));

    console.log('[GuideMode] Mode set to:', mode);
  }

  function bindEvents() {
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => setMode(btn.dataset.mode));
    });
  }

  // Initialize
  const initialMode = getSavedMode();
  setMode(initialMode);
  bindEvents();

  // Expose API
  window.guideMode = {
    getMode: getSavedMode,
    setMode: setMode,
    VALID_MODES: VALID_MODES
  };

  return window.guideMode;
}

// === SAFE FAB REBIND & ENHANCED NOTEPAD INIT ===
(function() {
  'use strict';

  // Remove all old event listeners from FAB buttons by cloning them
  function safeRebindFab(id, callback) {
    const btn = document.getElementById(id);
    if (!btn) return;
    const clone = btn.cloneNode(true);
    btn.parentNode.replaceChild(clone, btn);
    clone.addEventListener('click', (e) => { e.preventDefault(); callback(); });
    return clone;
  }

  // === generateTOCLinks (must be defined before DOMContentLoaded) ===
  function generateTOCLinks(panelEl) {
    const tocContent = panelEl.querySelector('#toc-content');
    if (!tocContent) return;

    // Force-clear any static/hardcoded children
    tocContent.replaceChildren();

    // Get current mode from body class or default
    const getCurrentMode = () => {
      if (document.body.classList.contains('mode-propeller_workshop')) return 'propeller_workshop';
      return 'quick_start';
    };

    // Check if a heading is visible in current mode
    function isVisibleInMode(heading) {
      const currentMode = getCurrentMode();
      
      // Check the heading itself
      const headingVisibility = heading.dataset?.modeVisibility;
      if (headingVisibility) {
        return headingVisibility === currentMode ||
               headingVisibility === 'both';
      }
      
      // Check parent section for data-mode-visibility
      const parentSection = heading.closest('section[data-mode-visibility]');
      if (parentSection) {
        const sectionVisibility = parentSection.dataset.modeVisibility;
        return sectionVisibility === currentMode ||
               sectionVisibility === 'both';
      }
      
      // Check parent details/accordion for data-mode-visibility
      const parentDetails = heading.closest('details[data-mode-visibility]');
      if (parentDetails) {
        const detailsVisibility = parentDetails.dataset.modeVisibility;
        return detailsVisibility === currentMode ||
               detailsVisibility === 'both';
      }
      
      // Check any parent with data-mode-visibility
      const parentWithMode = heading.closest('[data-mode-visibility]');
      if (parentWithMode) {
        const visibility = parentWithMode.dataset.modeVisibility;
        return visibility === currentMode ||
               visibility === 'both';
      }
      
      // No mode restriction - visible in all modes
      return true;
    }

    const allHeadings = document.querySelectorAll('main h2, main h3');
    // Filter headings by mode visibility
    const headings = Array.from(allHeadings).filter(isVisibleInMode);
    if (!headings.length) return;

    /**
     * Extract display label from a heading element.
     * Copies the heading's text content and also preserves
     * <span class="tag"> and <small> child elements as inline metadata.
     */
    function extractLabel(h) {
      const label = document.createElement('span');
      // Get plain text nodes (excluding tag children)
      const textOnly = Array.from(h.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent.trim())
        .join(' ');
      if (textOnly) label.appendChild(document.createTextNode(textOnly));

      // Copy <span class="tag"> elements as compact inline badges
      h.querySelectorAll(':scope > span.tag').forEach(tag => {
        const badge = tag.cloneNode(true);
        badge.style.fontSize = '0.7em';
        badge.style.marginLeft = '0.3em';
        badge.style.verticalAlign = 'middle';
        label.appendChild(badge);
      });

      // Copy <small> elements
      h.querySelectorAll(':scope > small').forEach(small => {
        const sm = small.cloneNode(true);
        sm.style.fontSize = '0.7em';
        sm.style.marginLeft = '0.3em';
        sm.style.opacity = '0.7';
        label.appendChild(sm);
      });

      return label;
    }

    const rootUl = document.createElement('ul');
    let currentH2Li = null;   // <li> for the current H2
    let currentH2Ul = null;   // nested <ul> for H3 children of current H2

    headings.forEach(h => {
      if (!h.id) {
        // Generate id from text-only content (ignore tag children)
        const rawText = Array.from(h.childNodes)
          .filter(n => n.nodeType === Node.TEXT_NODE)
          .map(n => n.textContent.trim())
          .join(' ');
        h.id = rawText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u0400-\u04ff-]/g, '');
      }

      const a = document.createElement('a');
      a.href = `#${h.id}`;
      // Use extractLabel to include metadata badges
      a.appendChild(extractLabel(h));

      a.addEventListener('click', (e) => {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth <= 768) {
          window.guidePanels?.toc?.close();
        }
      });

      if (h.tagName === 'H2') {
        // H2 — create top-level <li>
        const li = document.createElement('li');
        li.appendChild(a);

        // Prepare nested <ul> for upcoming H3 children
        const nestedUl = document.createElement('ul');
        li.appendChild(nestedUl);

        rootUl.appendChild(li);
        currentH2Li = li;
        currentH2Ul = nestedUl;
      } else if (h.tagName === 'H3') {
        // H3 — nest under the current H2's <ul>
        const li = document.createElement('li');
        li.appendChild(a);

        if (currentH2Ul) {
          currentH2Ul.appendChild(li);
        } else {
          // Fallback: if no preceding H2, append to root
          rootUl.appendChild(li);
        }
      }
    });

    // If the last H2 had an empty nested <ul>, remove it to keep DOM clean
    if (currentH2Ul && currentH2Ul.children.length === 0) {
      currentH2Ul.remove();
    }
    // Also clean up any empty nested <ul>s from H2 items with no H3 children
    rootUl.querySelectorAll(':scope > li > ul').forEach(nested => {
      if (nested.children.length === 0) nested.remove();
    });

    tocContent.appendChild(rootUl);
  }

  // === INITIALIZATION ===
  document.addEventListener('DOMContentLoaded', () => {
    // FIX: Skip if already initialized by another script instance
    if (window.guidePanels && window.guidePanels._initialized) {
      console.log('[Panel] Already initialized by another instance, skipping');
      return;
    }

    // 1. Initialize panels
    const tocPanelEl = document.getElementById('toc-panel');
    let tocPanel = null;
    if (tocPanelEl && window.Panel) {
      tocPanel = new window.Panel(tocPanelEl, {
        storageKey: 'guide_toc_state',
        onToggle: (isOpen) => {
          const fab = document.getElementById('fab-toc');
          if (fab) fab.setAttribute('aria-pressed', isOpen);
        }
      });

      // Generate TOC links into panel (guaranteed to run)
      generateTOCLinks(tocPanelEl);
    }

    const notepadPanelEl = document.getElementById('notepad-panel');
    let notepadPanel = null;
    if (notepadPanelEl && window.NotepadPanel) {
      notepadPanel = new window.NotepadPanel(notepadPanelEl, {
        storageKey: 'guide_notepad_state',
        onSave: (content) => console.log(`[Notepad] Saved: ${content.length} chars`)
      });
    }

    // 2. Safely rebind FAB buttons (kills old listeners from legacy scratchpad)
    safeRebindFab('fab-toc', () => { if (tocPanel) tocPanel.toggle(); });
    safeRebindFab('fab-scratchpad', () => { if (notepadPanel) notepadPanel.toggle(); });

    // 3. Initialize content width toggle (v5.4.0 - ITEM-004)
    if (typeof initWidthToggle === 'function') {
      initWidthToggle();
    }

    // 4. Global access for debugging + initialization flag
    window.guidePanels = { toc: tocPanel, notepad: notepadPanel, _initialized: true };

    // 5. Re-generate TOC on mode change
    window.addEventListener('modechange', () => {
      if (tocPanelEl) {
        generateTOCLinks(tocPanelEl);
      }
    });
  });
})();

// generateTOCLinks moved inside IIFE — see above

/* ============================================================
   OCEAN WIDGET INITIALIZATION
   ============================================================ */
function initOcean() {
  'use strict';

  const svg = document.getElementById('ocean-svg');
  if (!svg) return;

  const TRAITS_DATA = [
    {
      id: 'O',
      name: 'Открытость опыту',
      color: '#7c4dff',
      low: {
        title: 'Низкая открытость',
        desc: 'Предпочитает привычное новому. Скептичен к идеям, которые не проверены опытом. Ценит традиции и проверенные методы.',
        markers: [
          'Избегает незнакомых ситуаций',
          'Скептичен к новым идеям и методам',
          'Предпочитает проверенные пути',
          'Узкий круг интересов',
          'Настороженно относится к изменениям'
        ],
        rp_behavior: 'В сцене: сопротивляется изменениям плана, ссылается на прошлый опыт, задаёт уточняющие вопросы о последствиях. Триггер: новое → пауза → оценка риска. Тело: напряжение в плечах, сжатые губы, взгляд в сторону.'
      },
      high: {
        title: 'Высокая открытость',
        desc: 'Любопытен, креативен, открыт новым идеям и опыту. Толерантен к неопределённости. Ищет разнообразие и интеллектуальную стимуляцию.',
        markers: [
          'Активно ищет новый опыт',
          'Быстро осваивает новые идеи',
          'Широкий круг интересов',
          'Толерантен к неопределённости',
          'Склонен к философским размышлениям'
        ],
        rp_behavior: 'В сцене: предлагает альтернативы, задаёт вопросы «а что если», легко меняет направление. Триггер: неизвестное → интерес → исследование. Тело: расширенные зрачки, лёгкая поза, жестикуляция в сторону объекта интереса.'
      }
    },
    {
      id: 'C',
      name: 'Добросовестность',
      color: '#4dc3ff',
      low: {
        title: 'Низкая добросовестность',
        desc: 'Спонтанный, гибкий, но может быть недисциплинированным. Живёт моментом, иногда в ущерб долгосрочным целям.',
        markers: [
          'Действует импульсивно',
          'Трудно придерживается планов',
          'Рабочее место в хаосе',
          'Откладывает дела на потом',
          'Легко отвлекается'
        ],
        rp_behavior: 'В сцене: опаздывает, забывает о договорённостях, переключается между темами. Триггер: дедлайн → избегание → отвлечение. Тело: рассеянный взгляд, дёрганые движения, смена позы.'
      },
      high: {
        title: 'Высокая добросовестность',
        desc: 'Организованный, дисциплинированный, ориентированный на цели. Надёжный и настойчивый в достижении результатов.',
        markers: [
          'Составляет списки и планы',
          'Выполняет обязательства вовремя',
          'Внимателен к деталям',
          'Последователен в решениях',
          'Стремится к совершенству'
        ],
        rp_behavior: 'В сцене: проверяет детали, напоминает о сроках, следует протоколу. Триггер: беспорядок → напряжение → действие по устранению. Тело: прямая осанка, точные движения, взгляд фиксирует объекты.'
      }
    },
    {
      id: 'E',
      name: 'Экстраверсия',
      color: '#ff6b6b',
      low: {
        title: 'Низкая экстраверсия (интроверсия)',
        desc: 'Предпочитает одиночество или малые группы. Энергия восстанавливается в тишине. Глубокий внутренний мир.',
        markers: [
          'Избегает громких компаний',
          'Долго обдумывает ответы',
          'Предпочитает переписку разговору',
          'Устаёт от длительного общения',
          'Ценит личное пространство'
        ],
        rp_behavior: 'В сцене: отступает в конфликтных ситуациях, говорит меньше, чем другие, паузы перед ответами. Триггер: толпа → отстранение → поиск укрытия. Тело: скрещенные руки, взгляд вниз или в сторону, шаг назад.'
      },
      high: {
        title: 'Высокая экстраверсия',
        desc: 'Энергичен в общении, инициирует контакты. Энергия приходит от взаимодействия с людьми. Ассертивен и уверен.',
        markers: [
          'Легко заводит знакомства',
          'Говорит больше, чем слушает',
          'Любит быть в центре внимания',
          'Быстро принимает решения',
          'Оптимистичный взгляд на жизнь'
        ],
        rp_behavior: 'В сцене: инициирует разговоры, заполняет паузы, задаёт много вопросов. Триггер: тишина → дискомфорт → заполнение. Тело: открытая поза, наклон вперёд, постоянный зрительный контакт.'
      }
    },
    {
      id: 'A',
      name: 'Доброжелательность',
      color: '#6bff8c',
      low: {
        title: 'Низкая доброжелательность',
        desc: 'Конкурентный, скептичный, прямой. Защищает свои интересы. Может быть критичным и требовательным.',
        markers: [
          'Высказывает критику открыто',
          'Сомневается в мотивах других',
          'Конкурирует за ресурсы',
          'Трудно прощает обиды',
          'Прямолинеен в общении'
        ],
        rp_behavior: 'В сцене: подвергает сомнению чужие слова, защищает границы, идёт на конфликт. Триггер: угроза интересам → контратака → защита. Тело: напряжённая стойка, пристальный взгляд, резкие жесты.'
      },
      high: {
        title: 'Высокая доброжелательность',
        desc: 'Кооперативный, доверяющий, эмпатичный. Стремится к гармонии в отношениях. Щедрый и участливый.',
        markers: [
          'Ищет компромиссы',
          'Доверяет людям по умолчанию',
          'Помогает без просьбы',
          'Избегает конфликтов',
          'Учитывает чувства других'
        ],
        rp_behavior: 'В сцене: сглаживает углы, предлагает помощь, соглашается с чужим мнением. Триггер: конфликт → сглаживание → уступка. Тело: мягкие жесты, наклон головы, открытая улыбка.'
      }
    },
    {
      id: 'N',
      name: 'Нейротизм',
      color: '#ffb84d',
      low: {
        title: 'Низкий нейротизм (эмоциональная стабильность)',
        desc: 'Спокоен, устойчив к стрессу. Редко испытывает тревогу или подавленность. Быстро восстанавливается после неудач.',
        markers: [
          'Сохраняет спокойствие в кризисе',
          'Не склонен к тревожным мыслям',
          'Легко справляется со стрессом',
          'Стабильное настроение',
          'Не принимает близко к сердцу'
        ],
        rp_behavior: 'В сцене: остаётся невозмутимым, логически анализирует проблемы, успокаивает других. Триггер: хаос → анализ → план действий. Тело: расслабленная поза, ровное дыхание, уверенные движения.'
      },
      high: {
        title: 'Высокий нейротизм',
        desc: 'Чувствителен, эмоционально реактивен. Интенсивно переживает как позитивные, так и негативные эмоции. Склонен к тревоге.',
        markers: [
          'Быстро реагирует на стресс',
          'Часто переживает о будущем',
          'Резкие перепады настроения',
          'Остро воспринимает критику',
          'Склонен к самокопанию'
        ],
        rp_behavior: 'В сцене: остро реагирует на изменения, перечисляет возможные негативные исходы, ищет подтверждение безопасности. Триггер: неопределённость → тревога → поиск контроля. Тело: учащённое дыхание, напряжённые мышцы, суетливые движения.'
      }
    }
  ];

  // SVG reference already exists above
  if (!svg) return; // Guard clause if SVG not present

  const cx = 240, cy = 240, R = 160, r = 28;

  // Position calculation for pentagon vertices
  function position(index) {
    const angle = ((index * 72) - 90) * Math.PI / 180;
    return {
      x: cx + R * Math.cos(angle),
      y: cy + R * Math.sin(angle)
    };
  }

  // Draw background guide circle
  const guideCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  guideCircle.setAttribute('cx', cx);
  guideCircle.setAttribute('cy', cy);
  guideCircle.setAttribute('r', R);
  guideCircle.setAttribute('fill', 'none');
  guideCircle.setAttribute('stroke', document.body.classList.contains('theme-light') ? '#d1d5db' : '#2a2a38');
  guideCircle.setAttribute('stroke-width', '1');
  svg.appendChild(guideCircle);

  // Draw inner concentric circles for reference
  [50, 100].forEach(radius => {
    const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    innerCircle.setAttribute('cx', cx);
    innerCircle.setAttribute('cy', cy);
    innerCircle.setAttribute('r', radius);
    innerCircle.setAttribute('fill', 'none');
    innerCircle.setAttribute('stroke', document.body.classList.contains('theme-light') ? '#e5e7eb' : '#1a1a24');
    innerCircle.setAttribute('stroke-width', '1');
    svg.appendChild(innerCircle);
  });

  // Draw axis lines from center to vertices
  TRAITS_DATA.forEach((trait, i) => {
    const p = position(i);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx);
    line.setAttribute('y1', cy);
    line.setAttribute('x2', p.x);
    line.setAttribute('y2', p.y);
    line.setAttribute('stroke', trait.color);
    line.setAttribute('class', 'pentagon-axis');
    svg.appendChild(line);
  });

  // Draw pentagon outline
  const pentagonPoints = TRAITS_DATA.map((_, i) => {
    const p = position(i);
    return `${p.x},${p.y}`;
  }).join(' ');

  const pentagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  pentagon.setAttribute('points', pentagonPoints);
  pentagon.setAttribute('class', 'pentagon-outline');
  pentagon.setAttribute('stroke', document.body.classList.contains('theme-light') ? '#d1d5db' : '#4a4a5a');
  svg.appendChild(pentagon);

  // Draw center point
  const centerDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  centerDot.setAttribute('cx', cx);
  centerDot.setAttribute('cy', cy);
  centerDot.setAttribute('r', 4);
  centerDot.setAttribute('fill', document.body.classList.contains('theme-light') ? '#9ca3af' : '#3a3a4a');
  svg.appendChild(centerDot);

  // State
  let activeTrait = null;
  let activePole = 'high';
  let activeNode = null;

  // Draw vertex nodes
  TRAITS_DATA.forEach((trait, i) => {
    const p = position(i);
    const color = trait.color;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'pentagon-node');
    g.setAttribute('tabindex', '0');
    g.style.color = color;

    // Circle
    const circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circ.setAttribute('cx', p.x);
    circ.setAttribute('cy', p.y);
    circ.setAttribute('r', r);
    circ.setAttribute('fill', document.body.classList.contains('theme-light') ? '#ffffff' : '#16161e');
    circ.setAttribute('stroke', color);
    g.appendChild(circ);

    // Letter
    const letter = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    letter.setAttribute('x', p.x);
    letter.setAttribute('y', p.y - 4);
    letter.textContent = trait.id;
    letter.style.fill = color;
    g.appendChild(letter);

    // Label
    const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lbl.setAttribute('x', p.x);
    lbl.setAttribute('y', p.y + 10);
    lbl.setAttribute('class', 'label');
    lbl.textContent = trait.name.split(' ')[0];
    g.appendChild(lbl);

    // Click handler
    g.addEventListener('click', () => {
      if (activeNode) activeNode.classList.remove('active');
      g.classList.add('active');
      activeNode = g;
      activeTrait = trait;
      showPanel(trait, color);
    });

    // Keyboard accessibility
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        g.click();
      }
    });

    svg.appendChild(g);
  });

  // Panel update function
  function showPanel(trait, color) {
    const panel = document.getElementById('ocean-panel');
    if (!panel) return;

    const data = trait[activePole];

    panel.innerHTML = `
      <div class="panel-header" style="border-color:${color}33">
        <div class="trait-letter" style="color:${color}">${trait.id}</div>
        <div class="trait-name">${trait.name}</div>
        <div class="pole-toggle">
          <button class="pole-btn ${activePole === 'low' ? 'active' : ''}" data-pole="low">Низкий</button>
          <button class="pole-btn ${activePole === 'high' ? 'active' : ''}" data-pole="high">Высокий</button>
        </div>
      </div>
      <div class="panel-body">
        <div class="section">
          <div class="section-label">${data.title}</div>
          <div class="section-content">${data.desc}</div>
        </div>
        <div class="section">
          <div class="section-label">Поведенческие маркеры</div>
          <ul class="marker-list">
            ${data.markers.map(m => `<li>${m}</li>`).join('')}
          </ul>
        </div>
        <div class="section rp-section">
          <div class="section-label">RP-применение</div>
          <div class="rp-content">${data.rp_behavior}</div>
        </div>
      </div>
    `;

    // Add toggle listeners
    panel.querySelectorAll('.pole-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activePole = btn.dataset.pole;
        showPanel(trait, color);
      });
    });
  }
}

// ============================================================================
// v5.4.0: CONTENT WIDTH TOGGLE (ITEM-004)
// ============================================================================
/**
 * Initialize content width toggle button
 * Toggles between normal (85ch) and wide (95ch) content width
 * Persists preference in localStorage
 */
function initWidthToggle() {
  const btn = document.getElementById('fab-width');
  if (!btn) return;

  const STORAGE_KEY = 'content-width-mode';
  const saved = localStorage.getItem(STORAGE_KEY);

  // Apply saved preference on load
  if (saved === 'wide') {
    document.body.classList.add('content-wide');
    btn.setAttribute('aria-pressed', 'true');
  } else {
    btn.setAttribute('aria-pressed', 'false');
  }

  // Toggle handler
  btn.addEventListener('click', () => {
    document.body.classList.toggle('content-wide');
    const isWide = document.body.classList.contains('content-wide');
    localStorage.setItem(STORAGE_KEY, isWide ? 'wide' : 'normal');
    btn.setAttribute('aria-pressed', isWide ? 'true' : 'false');
  });
}

// ============================================================================
// ITEM-002: GHOST CONSENT MODULE
// ============================================================================
/**
 * GhostConsent - Manages GHOST content disclosure with layered progressive approach
 * 
 * Layers:
 * - Layer 0: GHOST hidden in Track A (beginners)
 * - Layer 1: GHOST teaser appears after SPINE completion (Track B+)
 * - Layer 2: Full GHOST requires explicit consent with TTL
 * 
 * Features:
 * - Consent persistence with 30-day TTL
 * - SPINE completion tracking
 * - Event dispatching for UI updates
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'ghost_consent_data';
  const TEASER_VIEWED_KEY = 'ghost_teaser_viewed';
  const SPINE_COMPLETED_KEY = 'spine_sections_completed';
  const TTL_DAYS = 30;
  const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;

  // Required SPINE elements for completion check
  const SPINE_ELEMENTS = ['FLAW', 'LIE', 'WANT', 'NEED'];

  // Private state
  let consentData = null;
  let teaserViewed = false;
  let spineCompleted = false;

  /**
   * Load consent data from localStorage
   * @returns {Object|null} Consent data or null if not found/expired
   */
  function loadConsentData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const data = JSON.parse(raw);
      
      // Check TTL
      if (data.timestamp && (Date.now() - data.timestamp > TTL_MS)) {
        // Expired - clear consent but preserve teaser_viewed flag
        clearConsent();
        return null;
      }

      return data;
    } catch (e) {
      console.warn('[GhostConsent] Failed to load consent data:', e.message);
      return null;
    }
  }

  /**
   * Save consent data to localStorage
   * @param {boolean} consented - Whether user consented
   */
  function saveConsentData(consented) {
    try {
      consentData = {
        consented: consented,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    } catch (e) {
      console.warn('[GhostConsent] Failed to save consent:', e.message);
    }
  }

  /**
   * Load teaser viewed state
   * @returns {boolean}
   */
  function loadTeaserViewed() {
    try {
      return localStorage.getItem(TEASER_VIEWED_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  /**
   * Save teaser viewed state
   */
  function saveTeaserViewed() {
    try {
      teaserViewed = true;
      localStorage.setItem(TEASER_VIEWED_KEY, 'true');
    } catch (e) {
      console.warn('[GhostConsent] Failed to save teaser viewed:', e.message);
    }
  }

  /**
   * Check if SPINE sections have been viewed/completed
   * @returns {boolean}
   */
  function checkSpineCompletion() {
    try {
      // Check if user has scrolled through SPINE-related sections
      const spineSections = document.querySelectorAll('[data-spine-element]');
      if (spineSections.length === 0) {
        // Fallback: check for sections containing SPINE element IDs
        const viewed = JSON.parse(localStorage.getItem(SPINE_COMPLETED_KEY) || '[]');
        return SPINE_ELEMENTS.every(el => viewed.includes(el));
      }
      
      const viewed = [];
      spineSections.forEach(section => {
        const element = section.dataset.spineElement;
        if (element && isElementInViewport(section)) {
          viewed.push(element);
        }
      });
      
      return SPINE_ELEMENTS.every(el => viewed.includes(el));
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if element is in viewport
   * @param {HTMLElement} el 
   * @returns {boolean}
   */
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Get current track from NavigationState
   * @returns {string} 'A', 'B', or 'C'
   */
  function getCurrentTrack() {
    if (window.NavigationState && typeof window.NavigationState.getTrack === 'function') {
      return window.NavigationState.getTrack();
    }
    return 'B'; // Default
  }

  /**
   * Check if GHOST content should be visible
   * @returns {Object} { layer: 0|1|2, canShow: boolean, reason: string }
   */
  function getGhostVisibility() {
    const track = getCurrentTrack();
    
    // Layer 0: Track A - always hidden
    if (track === 'A') {
      return { layer: 0, canShow: false, reason: 'Track A - GHOST hidden for beginners' };
    }

    // Check SPINE completion for Track B+
    const spineComplete = checkSpineCompletion();
    
    if (!spineComplete) {
      return { layer: 0, canShow: false, reason: 'SPINE not completed - prerequisites not met' };
    }

    // Layer 1: Teaser visible, full content requires consent
    if (!consentData || !consentData.consented) {
      return { layer: 1, canShow: true, reason: 'Teaser visible - consent required for full content' };
    }

    // Layer 2: Full GHOST visible
    return { layer: 2, canShow: true, reason: 'Full GHOST visible with consent' };
  }

  /**
   * Give consent for full GHOST content
   */
  function giveConsent() {
    saveConsentData(true);
    applyGhostVisibility();
    
    window.dispatchEvent(new CustomEvent('ghostconsentchange', {
      detail: { consented: true, layer: 2 }
    }));

    console.log('[GhostConsent] Consent given - Layer 2 active');
  }

  /**
   * Clear consent (but preserve teaser_viewed flag)
   */
  function clearConsent() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      consentData = null;
      applyGhostVisibility();
      
      window.dispatchEvent(new CustomEvent('ghostconsentchange', {
        detail: { consented: false, layer: teaserViewed ? 1 : 0 }
      }));

      console.log('[GhostConsent] Consent cleared - teaser_viewed preserved');
    } catch (e) {
      console.warn('[GhostConsent] Failed to clear consent:', e.message);
    }
  }

  /**
   * Apply GHOST visibility to DOM
   */
  function applyGhostVisibility() {
    const visibility = getGhostVisibility();
    const body = document.body;

    // Remove all layer classes
    body.classList.remove('ghost-layer-0', 'ghost-layer-1', 'ghost-layer-2');
    
    // Add current layer class
    body.classList.add(`ghost-layer-${visibility.layer}`);

    // Update data attribute for CSS targeting
    body.setAttribute('data-ghost-layer', visibility.layer);

    // Show/hide GHOST content based on layer
    document.querySelectorAll('[data-ghost-content]').forEach(el => {
      const requiredLayer = parseInt(el.dataset.ghostContent, 10);
      el.hidden = visibility.layer < requiredLayer;
    });

    // Show/hide teaser
    document.querySelectorAll('[data-ghost-teaser]').forEach(el => {
      el.hidden = visibility.layer < 1;
    });

    // Update consent UI if present
    const consentPrompt = document.querySelector('[data-ghost-consent-prompt]');
    if (consentPrompt) {
      consentPrompt.hidden = visibility.layer !== 1;
    }

    console.log('[GhostConsent] Visibility applied:', visibility);
  }

  /**
   * Mark teaser as viewed
   */
  function viewTeaser() {
    saveTeaserViewed();
    window.dispatchEvent(new CustomEvent('ghostteaserviewed'));
  }

  /**
   * Initialize GHOST consent system
   */
  function init() {
    // Load state
    consentData = loadConsentData();
    teaserViewed = loadTeaserViewed();

    // Apply initial visibility
    applyGhostVisibility();

    // Listen for track changes
    window.addEventListener('trackchange', () => {
      applyGhostVisibility();
    });

    // Set up consent button handlers
    document.querySelectorAll('[data-ghost-consent-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.ghostConsentBtn === 'accept') {
          giveConsent();
        } else if (btn.dataset.ghostConsentBtn === 'decline') {
          viewTeaser(); // Just mark teaser as viewed
          applyGhostVisibility();
        }
      });
    });

    // Track SPINE section visibility for completion
    const spineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target.dataset.spineElement;
          if (element) {
            try {
              const viewed = JSON.parse(localStorage.getItem(SPINE_COMPLETED_KEY) || '[]');
              if (!viewed.includes(element)) {
                viewed.push(element);
                localStorage.setItem(SPINE_COMPLETED_KEY, JSON.stringify(viewed));
              }
            } catch (e) {}
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-spine-element]').forEach(el => {
      spineObserver.observe(el);
    });

    console.log('[GhostConsent] Initialized - Layer:', getGhostVisibility().layer);
  }

  // Expose API
  window.GhostConsent = {
    getVisibility: getGhostVisibility,
    giveConsent: giveConsent,
    clearConsent: clearConsent,
    viewTeaser: viewTeaser,
    isConsented: () => consentData && consentData.consented,
    isTeaserViewed: () => teaserViewed,
    init: init
  };

  // Auto-initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ============================================================================
// ITEM-005: OCEAN VALIDATOR MODULE
// ============================================================================
/**
 * OCEANValidator - Validates OCEAN personality profiles for character distinctiveness
 * 
 * Rule: 1-2 extreme poles (values <30 or >70) = optimal memorable character
 * - 0 extremes = forgettable (warning)
 * - 1-2 extremes = optimal distinctiveness (green)
 * - 3+ extremes = inconsistent character (error)
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'ocean_validator_traits';

  // Default trait values (middle of scale)
  const DEFAULT_TRAITS = { O: 50, C: 50, E: 50, A: 50, N: 50 };

  // Current trait values
  let traits = { ...DEFAULT_TRAITS };

  /**
   * Load traits from localStorage
   */
  function loadTraits() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate all traits exist and are numbers 0-100
        if (typeof parsed === 'object' && ['O', 'C', 'E', 'A', 'N'].every(k => typeof parsed[k] === 'number')) {
          traits = {
            O: Math.max(0, Math.min(100, parsed.O)),
            C: Math.max(0, Math.min(100, parsed.C)),
            E: Math.max(0, Math.min(100, parsed.E)),
            A: Math.max(0, Math.min(100, parsed.A)),
            N: Math.max(0, Math.min(100, parsed.N))
          };
        }
      }
    } catch (e) {
      console.warn('[OCEANValidator] Failed to load traits:', e.message);
    }
  }

  /**
   * Save traits to localStorage
   */
  function saveTraits() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(traits));
    } catch (e) {
      console.warn('[OCEANValidator] Failed to save traits:', e.message);
    }
  }

  /**
   * Get extreme traits (values <30 or >70)
   * @returns {Array} Array of { trait, value, direction } objects
   */
  function getExtremes() {
    const extremes = [];
    const traitNames = { O: 'Открытость', C: 'Добросовестность', E: 'Экстраверсия', A: 'Доброжелательность', N: 'Нейротизм' };
    
    for (const [key, value] of Object.entries(traits)) {
      if (value < 30 || value > 70) {
        extremes.push({
          trait: key,
          name: traitNames[key],
          value: value,
          direction: value < 30 ? 'low' : 'high'
        });
      }
    }
    return extremes;
  }

  /**
   * Validate OCEAN profile
   * @returns {Object} { status, color, message, extremes }
   */
  function validate() {
    const extremes = getExtremes();

    if (extremes.length === 0) {
      return {
        status: 'warning',
        color: 'yellow',
        message: 'Нет экстремальных полюсов — персонаж может быть забываемым',
        messageEn: 'No extreme poles — character may be forgettable',
        extremes: [],
        suggestion: 'Рекомендуется установить 1-2 значения <30 или >70'
      };
    }

    if (extremes.length >= 1 && extremes.length <= 2) {
      const extremeNames = extremes.map(e => `${e.name} (${e.value})`).join(', ');
      return {
        status: 'valid',
        color: 'green',
        message: `Оптимальная различимость: ${extremes.length} экстремальный полюс`,
        messageEn: `Optimal distinctiveness: ${extremes.length} extreme pole(s)`,
        extremes,
        details: extremeNames
      };
    }

    // 3+ extremes
    return {
      status: 'error',
      color: 'red',
      message: `Слишком много экстремумов (${extremes.length}) — персонаж может быть непоследовательным`,
      messageEn: `Too many extremes (${extremes.length}) — may create inconsistent character`,
      extremes,
      suggestion: 'Рекомендуется оставить 1-2 экстремальных полюса'
    };
  }

  /**
   * Update UI with validation result
   * @param {Object} result - Validation result from validate()
   */
  function updateUI(result) {
    const indicator = document.getElementById('ocean-validator-status');
    const details = document.getElementById('ocean-validator-details');
    
    if (indicator) {
      // Remove all color classes
      indicator.classList.remove('ocean-validator-green', 'ocean-validator-yellow', 'ocean-validator-red');
      indicator.classList.add(`ocean-validator-${result.color}`);
      indicator.textContent = result.message;
      indicator.setAttribute('data-status', result.status);
    }

    if (details) {
      if (result.extremes.length > 0) {
        const extremeLabels = result.extremes.map(e => 
          `<span class="ocean-extreme-tag ocean-extreme-${e.direction}">${e.name}: ${e.value}</span>`
        ).join(' ');
        details.innerHTML = extremeLabels;
      } else {
        details.innerHTML = '<span class="ocean-no-extremes">Все значения в нормальном диапазоне (30-70)</span>';
      }
    }

    // Update slider highlights
    document.querySelectorAll('.ocean-slider').forEach(slider => {
      const trait = slider.dataset.trait;
      if (trait && traits[trait] !== undefined) {
        const value = traits[trait];
        const isExtreme = value < 30 || value > 70;
        slider.classList.toggle('ocean-extreme', isExtreme);
        slider.classList.toggle('ocean-extreme-low', value < 30);
        slider.classList.toggle('ocean-extreme-high', value > 70);
      }
    });

    // Dispatch event for external listeners
    window.dispatchEvent(new CustomEvent('oceanvalidated', { detail: result }));
  }

  /**
   * Set a trait value
   * @param {string} trait - Trait key (O, C, E, A, N)
   * @param {number} value - Value (0-100)
   */
  function setTrait(trait, value) {
    if (!['O', 'C', 'E', 'A', 'N'].includes(trait)) {
      console.warn('[OCEANValidator] Invalid trait:', trait);
      return;
    }
    traits[trait] = Math.max(0, Math.min(100, value));
    saveTraits();
    
    const result = validate();
    updateUI(result);
    return result;
  }

  /**
   * Get current traits
   * @returns {Object} Traits object
   */
  function getTraits() {
    return { ...traits };
  }

  /**
   * Reset traits to defaults
   */
  function resetTraits() {
    traits = { ...DEFAULT_TRAITS };
    saveTraits();
    const result = validate();
    updateUI(result);
    return result;
  }

  /**
   * Initialize validator UI
   */
  function init() {
    loadTraits();
    
    // Set up slider listeners
    document.querySelectorAll('.ocean-slider').forEach(slider => {
      const trait = slider.dataset.trait;
      if (trait) {
        // Set initial value
        slider.value = traits[trait] || 50;
        
        // Listen for changes
        slider.addEventListener('input', (e) => {
          setTrait(trait, parseInt(e.target.value, 10));
        });
      }
    });

    // Initial validation
    const result = validate();
    updateUI(result);

    console.log('[OCEANValidator] Initialized - Extremes:', getExtremes().length);
  }

  // Expose API
  window.OCEANValidator = {
    validate,
    getExtremes,
    getTraits,
    setTrait,
    resetTraits,
    updateUI,
    init
  };

  // Auto-initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ============================================================================
// BUG-007 FIX: SERVICE WORKER REGISTRATION (moved from inline script)
// ============================================================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/assets/sw.js")
      .then(reg => console.log("[SW] Service Worker registered:", reg.scope))
      .catch(err => console.warn("[SW] Service Worker registration failed:", err));
  });
}
