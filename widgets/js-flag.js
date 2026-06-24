/**
 * @fileoverview js-flag.js — early 'js' class flag for <html> element.
 * @module src/shell/widgets/js-flag
 * @version 9.1.0
 *
 * @description
 * Extracted from inline `<script>` in `src/shell/index.html` per KI#16 fix (iter 19).
 *
 * Why external (not inline):
 * - `pnpm run qa:csp` (scripts/csp_check.mjs) requires ZERO inline `<script>` tags
 *   in the built index.html — strict CSP hygiene.
 * - Inline `<script>document.documentElement.classList.add('js')</script>` broke
 *   this check, even though CSP allows `'unsafe-inline'` in script-src.
 *
 * Why synchronous in <head>:
 * - The `js` class on <html> is used by CSS to gate `.no-js` / `.js` variants
 *   (FOUC prevention: avoids flash of unstyled / no-js content before paint).
 * - Loaded via `<script src="widgets/js-flag.js"></script>` in <head> WITHOUT
 *   `defer` / `async` — browser blocks parsing, fetches, executes, continues.
 *   For a ~50-byte file the latency cost is negligible and cached after first load.
 *
 * Reference: AGENT_NAVIGATION.md §6 pitfall #34 (KI#16, fixed iter 19).
 */
document.documentElement.classList.add('js');
