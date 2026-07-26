/**
 * @fileoverview mermaid-init.js — Mermaid.js initialization + dynamic theme re-render.
 * @module src/shell/widgets/mermaid-init
 * @version 9.3.0
 *
 * @description
 * Extracted from inline `<script>` in `src/shell/index.html` per KI#16 fix (iter 19).
 * iter 100: Added `window.reRenderMermaid(theme)` for dynamic theme switching.
 *
 * Loading order (must be preserved in index.html):
 *   1. `<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js">` (CDN, sync)
 *   2. `<script src="widgets/mermaid-init.js">` (this file, sync — runs immediately after mermaid loads)
 *   3. `<script src="event-bus.js">` / `<script src="widgets/...">` / `<script src="assets/lazy-loader.js">` (shell)
 *
 * The `mermaid._initialized = true` flag tells `lazy-loader.js` (line 689) to skip
 * its own redundant `mermaid.initialize(...)` call when content is loaded later.
 * Without this flag, lazy-loader re-initializes mermaid on every dynamic load.
 *
 * Dynamic theme re-render (iter 100):
 *   `window.reRenderMermaid(theme)` is called by lazy-loader.js `applyTheme()`
 *   when the user toggles between OLED/dark and Light themes. It:
 *     1. Saves original diagram source text into `data-original` attribute (first time only).
 *     2. Re-initializes mermaid with the appropriate theme config.
 *     3. Restores original source text and removes `data-processed` from rendered diagrams.
 *     4. Calls `mermaid.run()` to re-render all diagrams with the new theme.
 *
 * Safety guard:
 *   - If `mermaid` global is undefined (CDN blocked) or `mermaid.initialize` is not a
 *     function (API changed), this script is a no-op. lazy-loader.js has its own
 *     fallback init that runs on content load if `_initialized` is not set.
 *   - `reRenderMermaid()` is also a safe no-op if mermaid is unavailable.
 *
 * Reference: AGENT_NAVIGATION.md §6 pitfall #34 (KI#16, fixed iter 19).
 */

(function() {
  'use strict';

  /* ── Theme configs ─────────────────────────────────────────────── */

  const DARK_CONFIG = {
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      primaryColor: '#4a1a4a',
      primaryTextColor: '#e2e8f0',
      primaryBorderColor: '#8b5cf6',
      lineColor: '#6b7590',
      secondaryColor: '#1a1a2e',
      tertiaryColor: '#16162a',
      fontFamily: 'var(--font-body, sans-serif)',
      fontSize: '13px'
    },
    flowchart: { htmlLabels: true, curve: 'basis', padding: 12 }
  };

  const LIGHT_CONFIG = {
    startOnLoad: false,
    theme: 'default',
    themeVariables: {
      primaryColor: '#e8d5f5',
      primaryTextColor: '#1a1d24',
      primaryBorderColor: '#8b5cf6',
      lineColor: '#9ca3af',
      secondaryColor: '#f3f4f6',
      tertiaryColor: '#e5e7eb',
      fontFamily: 'var(--font-body, sans-serif)',
      fontSize: '13px'
    },
    flowchart: { htmlLabels: true, curve: 'basis', padding: 12 }
  };

  /* ── Initial init (dark/OLED = default) ────────────────────────── */

  if (typeof mermaid !== 'undefined' && typeof mermaid.initialize === 'function') {
    mermaid.initialize(DARK_CONFIG);
    mermaid._initialized = true;
  }

  /* ── Dynamic re-render on theme switch ─────────────────────────── */

  /**
   * Re-render all Mermaid diagrams with the specified theme.
   * Called by lazy-loader.js `applyTheme()` on theme toggle.
   *
   * @param {'oled'|'light'} theme — 'oled' uses dark config, 'light' uses default config.
   */
  window.reRenderMermaid = function(theme) {
    if (typeof mermaid === 'undefined' || typeof mermaid.initialize !== 'function') return;

    var config = (theme === 'light') ? LIGHT_CONFIG : DARK_CONFIG;

    // Step 1: Save original source text (only once per diagram)
    var diagrams = document.querySelectorAll('.mermaid');
    diagrams.forEach(function(el) {
      if (!el.getAttribute('data-original')) {
        // Before first render: innerText contains the raw diagram code.
        // After render: innerText is the SVG text content — but we need the original.
        // Mermaid stores the processed source; we capture it before it's overwritten.
        // If `data-processed` exists, the SVG replaced original text.
        // We use `textContent` which still has the diagram source in pre-render state,
        // or we read from the special attribute Mermaid sets.
        var original = el.getAttribute('data-original') || el.textContent.trim();
        if (original && !original.startsWith('<svg')) {
          el.setAttribute('data-original', original);
        }
      }
    });

    // Step 2: Re-initialize mermaid with new theme config
    try {
      mermaid.initialize(config);
    } catch (e) {
      console.warn('[Mermaid] Re-initialize error:', e.message);
      return;
    }

    // Step 3: Restore original source and mark as unprocessed for re-render
    diagrams.forEach(function(el) {
      var original = el.getAttribute('data-original');
      if (original) {
        el.removeAttribute('data-processed');
        el.innerHTML = original;
      }
    });

    // Step 4: Re-run mermaid on all diagrams
    requestAnimationFrame(async function() {
      try {
        if (typeof mermaid.run === 'function') {
          await mermaid.run({ querySelector: '.mermaid' });
        } else if (typeof mermaid.init === 'function') {
          mermaid.init(undefined, document.querySelectorAll('.mermaid'));
        }
      } catch (e) {
        console.warn('[Mermaid] Re-render error:', e.message);
      }
    });
  };
})();
