/**
 * @fileoverview mermaid-init.js — Mermaid.js initialization (dark theme + brand colors).
 * @module src/shell/widgets/mermaid-init
 * @version 9.2.0
 *
 * @description
 * Extracted from inline `<script>` in `src/shell/index.html` per KI#16 fix (iter 19).
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
 * Safety guard:
 * - If `mermaid` global is undefined (CDN blocked) or `mermaid.initialize` is not a
 *   function (API changed), this script is a no-op. lazy-loader.js has its own
 *   fallback init that runs on content load if `_initialized` is not set.
 *
 * Reference: AGENT_NAVIGATION.md §6 pitfall #34 (KI#16, fixed iter 19).
 */
if (typeof mermaid !== 'undefined' && typeof mermaid.initialize === 'function') {
  mermaid.initialize({
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
  });
  mermaid._initialized = true;
}
