/**
 * @fileoverview Shell reading-layout invariants (iter-193, DEC-35).
 *
 * Guards the reading layout contract:
 *   1. the layout grid exists with the rail | content | dock structure;
 *   2. the rail, the reading bar and the dock are present in the shell;
 *   3. the three-theme cycle has all its CSS surfaces (OLED :root default,
 *      body.theme-dark, body.theme-light);
 *   4. the retired glossary side tab is gone from markup AND styles;
 *   5. the TOC panel (the narrow-screen fallback) still exists;
 *   6. the reading measure: body max-width is 72ch-capped (not the old 85ch).
 *
 * Source of truth: src/shell/index.html + src/shell/styles.css
 * (dist/index.html is the same file post-prerender; the shell elements it
 * asserts on are outside <main>, so the patterns hold in both).
 */
import { test } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

test('shell index.html: reading layout grid is present', () => {
  const html = read('src/shell/index.html');
  assert.ok(html.includes('id="layout-grid"'), 'layout grid container missing');
  assert.ok(/class="toc-rail" id="toc-rail"/.test(html), 'TOC rail missing');
  assert.ok(/class="reading-bar" id="reading-bar"/.test(html), 'reading bar missing');
  assert.ok(/class="tool-dock" id="tool-dock"/.test(html), 'tool dock missing');
  assert.ok(/id="toc-rail-sheet"/.test(html), 'reading-bar sheet missing');
});

test('shell index.html: content container survives inside the grid', () => {
  const html = read('src/shell/index.html');
  assert.match(html, /<main id="content"[^>]*class="content-hidden"/, 'content main must keep id + content-hidden');
  const gridPos = html.indexOf('id="layout-grid"');
  const mainPos = html.indexOf('<main id="content"');
  assert.ok(gridPos > -1 && mainPos > gridPos, 'main#content must live inside the layout grid');
});

test('shell index.html: the retired glossary side tab is gone', () => {
  const html = read('src/shell/index.html');
  assert.ok(!html.includes('id="glossary-tab"'), 'glossary-tab markup returned');
  assert.ok(!html.includes('class="glossary-tab"'), 'glossary-tab class returned');
});

test('shell index.html: theme button is the three-state ◐ cycle, soft dark by default', () => {
  const html = read('src/shell/index.html');
  assert.match(html, /id="fab-theme"[^>]*data-theme="dark"/, 'fab-theme must start in the soft-dark state');
  assert.match(html, /<body class="theme-dark">/, 'body must carry theme-dark so the first paint is soft dark');
  assert.ok(!html.includes('theme-icon-oled'), 'the retired sun/moon icon pair returned');
  assert.ok(!html.includes('theme-icon-light'), 'the retired sun/moon icon pair returned');
});

test('shell lazy-loader.js: the theme default is soft dark (iter-194)', () => {
  const js = read('src/shell/lazy-loader.js');
  assert.match(js, /if \(!\[['"]oled['"], ['"]dark['"], ['"]light['"]\]\.includes\(stored\)\) \{[\s\S]{0,220}?stored = 'dark';/, 'default theme is not soft dark');
  assert.ok(!js.includes('prefers-color-scheme'), 'the OS light preference still overrides the soft-dark default');
});

test('the ↔ content-width toggle is retired (iter-194): one dock control less', () => {
  const html = read('src/shell/index.html');
  const js = read('src/shell/lazy-loader.js');
  const css = read('src/shell/styles.css');
  assert.ok(!html.includes('fab-width'), '#fab-width markup returned');
  assert.ok(!js.includes('fab-width'), 'width-toggle handler returned');
  assert.ok(!js.includes('content-wide'), 'content-wide class wiring returned');
  assert.ok(!css.includes('content-wide'), 'content-wide styles returned');
});

test('shell styles.css: all three theme surfaces are defined', () => {
  const css = read('src/shell/styles.css');
  assert.match(css, /body\.theme-dark\s*\{/, 'body.theme-dark block missing');
  assert.match(css, /body\.theme-light\s*\{/, 'body.theme-light block missing');
  // OLED stays the :root default: --bg: #000000 in :root
  assert.match(css, /--bg:\s*#000000/, 'OLED :root default missing');
});

test('shell styles.css: the soft-dark palette values landed', () => {
  const css = read('src/shell/styles.css');
  assert.match(css, /body\.theme-dark\s*\{[^}]*--bg:\s*#0f1218/s, 'soft-dark --bg missing');
  assert.match(css, /body\.theme-dark\s*\{[^}]*--text:\s*#d9dde4/s, 'soft-dark --text missing');
});

test('shell styles.css: the glossary-tab styles are retired', () => {
  const css = read('src/shell/styles.css');
  assert.ok(!/\.glossary-tab\s*\{/.test(css), '.glossary-tab style block returned');
});

test('shell styles.css: the rail/bar/dock styles exist', () => {
  const css = read('src/shell/styles.css');
  assert.match(css, /\.toc-rail\s*\{/, '.toc-rail styles missing');
  assert.match(css, /\.reading-bar\s*\{/, '.reading-bar styles missing');
  assert.match(css, /\.tool-dock\s*\{/, '.tool-dock styles missing');
  assert.match(css, /\.rail-sections a\.on\s*\{/, 'rail scrollspy active style missing');
});

test('shell styles.css: reading measure is 72ch, not the old 85ch', () => {
  const css = read('src/shell/styles.css');
  assert.match(css, /--max-width:\s*min\(72ch,\s*1000px\)/, 'reading measure did not land');
  assert.ok(!/--max-width:\s*min\(1000px,\s*85ch\)/.test(css), 'the old 85ch measure returned');
});

test('shell lazy-loader.js: rail builder + scrollspy + dock wiring exist', () => {
  const js = read('src/shell/lazy-loader.js');
  assert.match(js, /function buildRailTOC\(\)/, 'buildRailTOC missing');
  assert.match(js, /function updateRailFromScroll\(\)/, 'scrollspy missing');
  assert.match(js, /function initReadingRail\(\)/, 'initReadingRail missing');
  assert.ok(js.includes('initReadingRail();'), 'initReadingRail is not wired into init()');
  assert.match(js, /oled:\s*'dark',\s*dark:\s*'light',\s*light:\s*'oled'/, 'three-state theme cycle missing');
  assert.ok(!js.includes("glossaryTab?.addEventListener"), 'retired glossary-tab handler returned');
  // the three post-injection sequences must rebuild the rail
  const buildCalls = js.match(/buildRailTOC\(\);/g) || [];
  assert.ok(buildCalls.length >= 4, `expected ≥4 buildRailTOC() call sites (prerender/fetch/retry/init), found ${buildCalls.length}`);
});

test('shell styles.css: focus-visible stays defined for keyboard users', () => {
  const css = read('src/shell/styles.css');
  assert.match(css, /\*:focus-visible\s*\{/, 'global focus-visible missing');
});

test('shell styles.css: the wide composition is centred, not left-hugging (iter-194)', () => {
  const css = read('src/shell/styles.css');
  // the ≥1220px block must centre the three tracks…
  assert.match(
    css,
    /@media \(min-width: 1220px\)[\s\S]*?grid-template-columns: 250px minmax\(0, var\(--max-width\)\) 56px;[\s\S]*?justify-content: center;/,
    'wide-screen layout grid is not centred'
  );
  // …and place the three zones explicitly, so hiding the rail cannot shift the text
  assert.match(css, /#content \{ grid-column: 2; \}/, 'content column placement missing');
  assert.match(css, /\.tool-dock \{ grid-column: 3; \}/, 'dock column placement missing');
  // the rail-hidden fallback must not swap to a two-column template any more
  assert.ok(
    !/body\.rail-hidden \.layout-grid \{ grid-template-columns/.test(css),
    'rail-hidden still re-templates the grid (text would jump)'
  );
});

test('the E01–E18 mini-map nav is retired (iter-194)', () => {
  const html = read('src/shell/index.html');
  const css = read('src/shell/styles.css');
  const js = read('src/shell/lazy-loader.js');
  assert.ok(!html.includes('vs-mini-map'), 'mini-map script tag returned to the shell');
  assert.ok(!css.includes('vs-mini-map'), 'mini-map styles returned');
  assert.ok(!js.includes('VsMiniMap'), 'mini-map init returned to lazy-loader');
});
