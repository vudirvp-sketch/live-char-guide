/** Build a single-file preview from dist/ (iter-194). Review artifact, not deliverable. */
const { readFileSync, writeFileSync, readdirSync } = require('fs');
const path = require('path');

const DIST = 'dist';
const html = readFileSync(path.join(DIST, 'index.html'), 'utf8');

const escScript = (s) => s.replace(/<\/script/gi, '<\\/script');
const escStyle = (s) => s.replace(/<\/style/gi, '<\\/style');

let out = html;

// 1. CSP meta must go — inline scripts are the point of the single file
out = out.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>\r?\n?/, '<!-- CSP meta removed for the single-file preview: all resources inline -->\n');

// 2. CSS -> <style>
for (const css of ['assets/shell-styles.css', 'assets/vs-styles.css']) {
  out = out.replace('<link rel="stylesheet" href="' + css + '">', () =>
    '<style>\n' + escStyle(readFileSync(path.join(DIST, css), 'utf8')) + '\n</style>');
}

// 3. favicon -> data URI
const favUri = 'data:image/svg+xml,' + encodeURIComponent(readFileSync(path.join(DIST, 'assets/favicon.svg'), 'utf8').trim());
out = out.replace(/href="assets\/favicon\.svg" type="image\/svg\+xml"/, 'href="' + favUri + '" type="image/svg+xml"');
out = out.replace(/href="assets\/favicon\.svg"/, 'href="' + favUri + '"');

// 4. scripts -> inline <script> (escaped), same order as the shell
const SCRIPTS = [
  'lib/js-flag.js',
  'event-bus.js',
  'lib/widget-utils.js',
  'assets/lazy-loader.js',
  'widgets/persona-voice-hierarchy.js',
  'widgets/ocean-insight.js',
  'widgets/mbti-composer.js',
  'interactions/vs-scroll-observer.js',
  'interactions/vs-e10-enneagram.js',
  'interactions/vs-e13-diagnostic.js',
  'interactions/vs-e16-author-note.js'
];
for (const p of SCRIPTS) {
  const tag = '<script src="' + p + '"></script>';
  if (!out.includes(tag)) throw new Error('script tag not found: ' + tag);
  out = out.replace(tag, () => '<script>\n' + escScript(readFileSync(path.join(DIST, p), 'utf8')) + '\n</script>');
}

// 5. data islands + fetch shim, injected right after <body> so they exist before any script
const dataFiles = readdirSync(path.join(DIST, 'data')).filter((f) => f.endsWith('.json'));
let islands = '';
for (const f of dataFiles) {
  const json = readFileSync(path.join(DIST, 'data', f), 'utf8').trim();
  const id = f === 'glossary.json' ? ' id="glossary-data"' : '';
  islands += '<script type="application/json" data-fetch-key="data/' + f + '"' + id + '>' + escScript(json) + '</script>\n';
}
const shim = [
  '<script>',
  '(function () {',
  '  var ISLANDS = {};',
  '  document.querySelectorAll(\'script[type="application/json"][data-fetch-key]\').forEach(function (s) {',
  '    ISLANDS[s.getAttribute("data-fetch-key")] = s.textContent;',
  '  });',
  '  var orig = window.fetch;',
  '  window.fetch = function (input) {',
  '    var url = typeof input === "string" ? input : (input && input.url) || "";',
  '    var m = url.match(/(?:^|\\/)(data\\/[a-z_-]+\\.json)$/i);',
  '    if (m && ISLANDS[m[1]]) {',
  '      return Promise.resolve(new Response(ISLANDS[m[1]], { status: 200, headers: { "Content-Type": "application/json" } }));',
  '    }',
  '    return orig.apply(this, arguments);',
  '  };',
  '})();',
  '</script>',
  ''
].join('\n');
out = out.replace(/<body>/, '<body>\n' + islands + shim);

// 6. title marker + top banner
out = out.replace('<title>', '<title>[PREVIEW iter-194] ');
out = out.replace('<!DOCTYPE html>', [
  '<!DOCTYPE html>',
  '<!-- ============================================================',
  '     SINGLE-FILE PREVIEW — Live Character Guide, iter-194 (centred 3-zone composition)',
  '     Assembled from dist/ (prerendered, 62 sections, build hash e4dbb274).',
  '     Inline: both stylesheets, all 12 scripts, every data/*.json as an',
  '     island + a fetch shim (so the ocean/MBTI/enneagram widgets work',
  '     from file:// too), favicon data-URI.',
  '     Fonts: the Google/jsdelivr @import lines are kept (work online);',
  '     offline the stack degrades to system fonts.',
  '     This file is a REVIEW artifact, not the deliverable.',
  '     ============================================================ -->'
].join('\n'));

writeFileSync('live-char-guide-preview-iter194.html', out);
console.log('written: ' + (out.length / 1024).toFixed(0) + ' KB, islands: ' + dataFiles.join(', '));
