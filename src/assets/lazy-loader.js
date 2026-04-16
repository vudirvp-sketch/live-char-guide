/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - LAZY LOADER v5.12.0
 * ============================================================================
 * 
 * Dynamic layer loading system:
 * 1. User selects layer → fetch HTML parts from parts-l{N}/
 * 2. Insert content into #content container
 * 3. Handle anchor navigation and browser history
 * 
 * Architecture:
 * - Shell (this file) loads once
 * - Layer content fetched on demand
 * - localStorage remembers last selected layer
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
  // DOM ELEMENTS
  // ============================================================================
  
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ============================================================================
  // LAYER SELECTION
  // ============================================================================

  /**
   * Load saved layer from localStorage or return default
   */
  function getSavedLayer() {
    try {
      const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
      if (saved && CONFIG.LAYERS.includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('[LazyLoader] localStorage unavailable:', e.message);
    }
    return null; // No saved layer = show modal
  }

  /**
   * Save layer to localStorage
   */
  function saveLayer(layer) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, layer);
    } catch (e) {
      console.warn('[LazyLoader] Failed to save layer:', e.message);
    }
  }

  /**
   * Check URL for layer parameter (for sharing links)
   */
  function getLayerFromURL() {
    const params = new URLSearchParams(window.location.search);
    const layer = params.get('layer');
    if (layer && CONFIG.LAYERS.includes(layer)) {
      return layer;
    }
    return null;
  }

  // ============================================================================
  // CONTENT LOADING
  // ============================================================================

  /**
   * Show loading overlay
   */
  function showLoading() {
    const overlay = $('#loading-overlay');
    if (overlay) {
      overlay.classList.remove('hidden');
    }
  }

  /**
   * Hide loading overlay
   */
  function hideLoading() {
    const overlay = $('#loading-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }

  /**
   * Fetch a single HTML part
   */
  async function fetchPart(layer, filename) {
    const dir = CONFIG.PARTS_DIR[layer];
    const url = `${dir}/${filename}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.text();
    } catch (e) {
      console.error(`[LazyLoader] Failed to fetch ${url}:`, e.message);
      return `<!-- Failed to load: ${filename} -->`;
    }
  }

  /**
   * Load all parts for a layer
   */
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

    // Clear previous content
    content.innerHTML = '';
    loadedParts.clear();

    try {
      // Load manifest for this layer
      const dir = CONFIG.PARTS_DIR[layer];
      const manifestUrl = `${dir}/manifest.json`;
      const manifestResponse = await fetch(manifestUrl);
      
      if (!manifestResponse.ok) {
        throw new Error(`Failed to load manifest: HTTP ${manifestResponse.status}`);
      }
      
      const manifest = await manifestResponse.json();
      const parts = manifest.parts || [];
      
      console.log(`[LazyLoader] Loading layer ${layer}: ${parts.length} parts`);
      
      // Fetch all parts
      const fetchPromises = parts.map(part => fetchPart(layer, part.file));
      const results = await Promise.all(fetchPromises);
      
      // Combine all parts
      const combinedHTML = results.join('\n');
      content.innerHTML = combinedHTML;

      // Set layer attribute on body for CSS visibility
      document.body.setAttribute('data-layer', layer);
      
      // Show content
      content.classList.remove('content-hidden');
      
      // Update switcher buttons
      updateSwitcherButtons(layer);
      
      // Initialize interactive elements
      initInteractiveElements();
      
      // Generate TOC
      generateTOC();
      
      // Handle anchor if present
      handleAnchor();
      
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

  /**
   * Hide layer selection modal
   */
  function hideModal() {
    const modal = $('#layer-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  /**
   * Show layer selection modal
   */
  function showModal() {
    const modal = $('#layer-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  /**
   * Show layer switcher
   */
  function showSwitcher() {
    const switcher = $('#layer-switcher');
    if (switcher) {
      switcher.classList.remove('hidden');
    }
  }

  /**
   * Update switcher button states
   */
  function updateSwitcherButtons(activeLayer) {
    $$('.layer-switch-btn').forEach(btn => {
      const layer = btn.dataset.layer;
      btn.classList.toggle('active', layer === activeLayer);
    });
  }

  /**
   * Show FAB buttons
   */
  function showFABs() {
    const fabs = $('#fab-group');
    if (fabs) {
      fabs.style.display = 'flex';
    }
  }

  // ============================================================================
  // LAYER SWITCHING
  // ============================================================================

  /**
   * Switch to a different layer
   */
  async function switchLayer(layer) {
    if (!CONFIG.LAYERS.includes(layer)) {
      console.error('[LazyLoader] Invalid layer:', layer);
      return;
    }

    if (layer === currentLayer) {
      return; // Already on this layer
    }

    currentLayer = layer;
    saveLayer(layer);
    
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('layer', layer);
    url.hash = ''; // Clear hash on layer switch
    history.pushState({ layer }, '', url);
    
    // Load content
    await loadLayerContent(layer);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Select layer (first time or from modal)
   */
  async function selectLayer(layer) {
    hideModal();
    showSwitcher();
    showFABs();
    await switchLayer(layer);
  }

  // ============================================================================
  // ANCHOR HANDLING
  // ============================================================================

  /**
   * Handle anchor navigation after content load
   */
  function handleAnchor() {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const targetId = hash.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        // Delay to ensure content is rendered
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }

  // ============================================================================
  // TOC GENERATION
  // ============================================================================

  /**
   * Generate Table of Contents from loaded content
   */
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

  /**
   * Initialize interactive elements after content load
   */
  function initInteractiveElements() {
    // Copy buttons
    $$('pre').forEach(pre => {
      if (pre.closest('.pre-wrapper')) return; // Already wrapped
      
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
        try {
          await navigator.clipboard.writeText(pre.textContent);
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        } catch (e) {
          btn.textContent = 'Error';
          setTimeout(() => btn.textContent = 'Copy', 2000);
        }
      });
      
      wrapper.appendChild(btn);
    });

    // Initialize any embedded SVG diagrams
    if (typeof initEnneagram === 'function') {
      initEnneagram();
    }
    if (typeof initOcean === 'function') {
      initOcean();
    }
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
      
      if (iconDark) iconDark.hidden = true;
      if (iconLight) iconLight.hidden = true;
      if (iconOled) iconOled.hidden = true;
      
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
      const nextIndex = (themes.indexOf(current) + 1) % themes.length;
      const nextTheme = themes[nextIndex];
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }

  // ============================================================================
  // PANEL SYSTEM
  // ============================================================================

  function initPanels() {
    const tocPanel = $('#toc-panel');
    const tocBtn = $('#fab-toc');
    const tocCloseBtn = tocPanel?.querySelector('[data-action="close"]');

    if (tocBtn && tocPanel) {
      tocBtn.addEventListener('click', () => {
        tocPanel.classList.toggle('open');
      });
    }

    if (tocCloseBtn && tocPanel) {
      tocCloseBtn.addEventListener('click', () => {
        tocPanel.classList.remove('open');
      });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && tocPanel?.classList.contains('open')) {
        tocPanel.classList.remove('open');
      }
    });
  }

  // ============================================================================
  // EVENT BINDING
  // ============================================================================

  function bindEvents() {
    // Layer modal buttons
    $$('.layer-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const layer = btn.dataset.layer;
        if (layer) selectLayer(layer);
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
      if (e.state && e.state.layer) {
        loadLayerContent(e.state.layer);
        currentLayer = e.state.layer;
        updateSwitcherButtons(e.state.layer);
      }
    });

    // Close TOC on link click
    $$('#toc-panel a').forEach(link => {
      link.addEventListener('click', () => {
        $('#toc-panel')?.classList.remove('open');
      });
    });
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  async function init() {
    console.log('[LazyLoader] Initializing...');

    // Check for URL parameter first
    let layer = getLayerFromURL();
    
    // Then check localStorage
    if (!layer) {
      layer = getSavedLayer();
    }

    if (layer) {
      // Auto-load saved/URL layer
      hideModal();
      showSwitcher();
      showFABs();
      currentLayer = layer;
      await loadLayerContent(layer);
      updateSwitcherButtons(layer);
    } else {
      // Show modal for selection
      hideLoading();
    }

    // Initialize other features
    initTheme();
    initPanels();
    bindEvents();

    console.log('[LazyLoader] Ready');
  }

  // Expose API
  window.LazyLoader = {
    switchLayer,
    get currentLayer() { return currentLayer; }
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
