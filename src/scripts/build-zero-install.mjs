#!/usr/bin/env node
/**
 * TITAN FUSE Build Script for Live Char Guide - Zero-Install Version
 * Version: 1.2.0
 *
 * Creates offline-optimized HTML file that works via file:// protocol.
 * - Replaces Google Fonts with system font fallbacks
 * - Adds CSP meta tags for offline use
 * - Embeds version metadata
 * - TASK 7: Inlines all data files for offline support
 * - BUG-011 FIX: Comprehensive external URL validation
 * - BUG-013 FIX: Robust external script removal
 * - BUG-015 FIX: Ensure inline JS is inside <body>, not after </html>
 */

import { createHash } from 'crypto';
import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { log, validateAnchors, detectBOM, validateDataFiles } from './build-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SRC_DIR = join(ROOT, 'src');
const PARTS_DIR = join(ROOT, 'src', 'parts');
const MANIFEST_PATH = join(ROOT, 'src', 'manifest', 'structure.json');
const VERSION_PATH = join(ROOT, 'src', 'VERSION');
const MAIN_JS_PATH = join(ROOT, 'src', 'assets', 'main.js');
const ZERO_INSTALL_ADDONS_PATH = join(ROOT, 'src', 'assets', 'zero-install-addons.js');
const SW_JS_PATH = join(ROOT, 'src', 'assets', 'sw.js');
const OUTPUT_PATH = join(ROOT, 'live-char-guide-zero-install.html');
const HASH_PATH = join(ROOT, 'build-zero-install.hash');
const DATA_SRC = join(SRC_DIR, 'data');

// ============================================================================
// ZERO-INSTALL TRANSFORMATIONS
// ============================================================================

/**
 * TASK 1.2: Ensures all H2 and H3 headers have ID attributes for anchor linking
 * @param {string} html - HTML content
 * @returns {string} HTML with ID attributes added to headers without them
 */
function ensureHeaderIds(html) {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, content) => {
    if (attrs.includes('id=')) return match;
    const id = content
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/[^a-zа-яё0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
    return `<h${level} id="${id}"${attrs}>${content}</h${level}>`;
  });
}

/**
 * TASK 2.5: Converts cross-file anchor references to internal anchors
 * @param {string} html - HTML content
 * @returns {string} HTML with internal anchor references
 */
function fixCrossFileAnchors(html) {
  return html.replace(/href="[^"]+\.html#([^"]+)"/g, 'href="#$1"');
}

/**
 * Remove Google Fonts @import statements and replace with system fonts
 */
function transformCssForOffline(cssContent) {
  // Remove Google Fonts imports
  let transformed = cssContent.replace(
    /@import\s+url\(['"]https:\/\/fonts\.googleapis\.com\/css2\?[^'"]+['"]\);?/g,
    '/* Google Fonts removed for zero-install offline support */\n    /* Using system fonts: IBM Plex Mono fallback to system monospace, Playfair Display fallback to Georgia/serif */'
  );

  // Replace IBM Plex Mono with system monospace
  transformed = transformed.replace(
    /'IBM Plex Mono',\s*monospace/g,
    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
  );

  // Replace Playfair Display with system serif
  transformed = transformed.replace(
    /'Playfair Display',\s*serif/g,
    'Georgia, Cambria, "Times New Roman", Times, serif'
  );

  return transformed;
}

/**
 * Add zero-install specific meta tags
 */
function generateZeroInstallHead(version, hash) {
  const buildDate = new Date().toISOString().split('T')[0];

  return `
<meta name="livechar-version" content="${version}">
<meta name="livechar-build" content="${buildDate}">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;">
`;
}

// ============================================================================
// BUG-011 FIX: COMPREHENSIVE EXTERNAL URL DETECTION
// ============================================================================

/**
 * Get line number from content index
 * @param {string} content - Full content
 * @param {number} index - Character index
 * @returns {number} Line number (1-based)
 */
function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

/**
 * Find all external URLs in HTML content
 * @param {string} content - HTML content
 * @returns {Array<{type: string, url: string, line: number}>} Found external URLs
 */
function findExternalURLs(content) {
  const externalURLs = [];
  let match;

  // Check CSS @import with external URLs
  const cssImportRegex = /@import\s+url\(\s*['"]?(https?:\/\/[^'")\s]+)/g;
  while ((match = cssImportRegex.exec(content)) !== null) {
    externalURLs.push({ type: 'css-import', url: match[1], line: getLineNumber(content, match.index) });
  }

  // Check <link href="https://...">
  const linkHrefRegex = /<link[^>]+href\s*=\s*['"](https?:\/\/[^'"]+)['"]/gi;
  while ((match = linkHrefRegex.exec(content)) !== null) {
    externalURLs.push({ type: 'link-href', url: match[1], line: getLineNumber(content, match.index) });
  }

  // Check <script src="https://...">
  const scriptSrcRegex = /<script[^>]+src\s*=\s*['"](https?:\/\/[^'"]+)['"]/gi;
  while ((match = scriptSrcRegex.exec(content)) !== null) {
    externalURLs.push({ type: 'script-src', url: match[1], line: getLineNumber(content, match.index) });
  }

  // Check <img src="https://...">
  const imgSrcRegex = /<img[^>]+src\s*=\s*['"](https?:\/\/[^'"]+)['"]/gi;
  while ((match = imgSrcRegex.exec(content)) !== null) {
    externalURLs.push({ type: 'img-src', url: match[1], line: getLineNumber(content, match.index) });
  }

  return externalURLs;
}

// ============================================================================
// BUG-013, BUG-015 FIX: CLEAN CONTENT FOR ZERO-INSTALL
// ============================================================================

/**
 * Clean bodyEndContent for zero-install build
 * Removes external scripts and closing HTML tags that would break inline JS placement
 * 
 * @param {string} content - Raw body-end content from parts
 * @returns {string} Cleaned content safe for zero-install
 */
function cleanBodyEndForZeroInstall(content) {
  let cleaned = content;
  
  // BUG-013 FIX: Remove ALL external script tags with any attributes
  // Pattern matches: <script src="..." defer></script> or <script async src="..."></script>
  cleaned = cleaned.replace(/<script[^>]*\bsrc\s*=\s*["'][^"']+["'][^>]*>\s*<\/script>/gi, '');
  
  // Also handle self-closing script tags (invalid but just in case)
  cleaned = cleaned.replace(/<script[^>]*\bsrc\s*=\s*["'][^"']+["'][^>]*\/>/gi, '');
  
  // BUG-015 FIX: Remove ALL closing body and html tags
  // These will be added by the template, so any in content would cause inline JS to appear after </html>
  cleaned = cleaned.replace(/<\/body>/gi, '');
  cleaned = cleaned.replace(/<\/html>/gi, '');
  
  // Trim trailing whitespace
  cleaned = cleaned.trimEnd();
  
  return cleaned;
}

// ============================================================================
// TASK 7: INLINE DATA FILES FOR ZERO-INSTALL
// ============================================================================

/**
 * Inlines all JSON data files as script tags for zero-install builds
 * Generic function that handles any JSON files in the data directory
 * @async
 * @returns {Promise<string>} HTML string with inline data script tags
 */
async function inlineDataFiles() {
  if (!existsSync(DATA_SRC)) {
    log('WARN', 'src/data/ directory not found');
    return '';
  }

  const files = await readdir(DATA_SRC);
  let html = '';
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const dataId = file.replace('.json', '-data');
      const content = await readFile(join(DATA_SRC, file), 'utf-8');
      html += `<script type="application/json" id="${dataId}">${content}</script>\n`;
      log('INFO', `Inlined data: ${file}`);
    }
  }
  
  return html;
}

// ============================================================================
// MAIN BUILD FUNCTION
// ============================================================================

async function build() {
  log('INFO', 'Starting zero-install build process...');

  // 1. Load version
  let version = 'unknown';
  if (existsSync(VERSION_PATH)) {
    version = (await readFile(VERSION_PATH, 'utf-8')).trim();
    log('INFO', `Version: ${version}`);
  } else {
    log('WARN', 'VERSION file not found, using "unknown"');
  }

  // TASK 7D: Validate required data files exist
  const missingData = validateDataFiles(DATA_SRC, ['glossary.json', 'test_scenarios.json']);
  if (missingData.length > 0) {
    log('ERROR', `Missing required data files: ${missingData.join(', ')}`);
    process.exit(1);
  }
  log('INFO', 'Data files validation passed');

  // 2. Load manifest
  log('INFO', `Loading manifest from ${MANIFEST_PATH}`);
  const manifestContent = await readFile(MANIFEST_PATH, 'utf-8');
  const manifest = JSON.parse(manifestContent);

  // 3. Validate manifest structure
  if (!manifest.parts || !Array.isArray(manifest.parts)) {
    log('ERROR', 'Invalid manifest: missing parts array');
    process.exit(1);
  }

  log('INFO', `Manifest version: ${manifest.version}`);
  log('INFO', `Parts to process: ${manifest.parts.length}`);

  // 4. Collect all content
  let headContent = '';
  let bodyStartContent = '';
  let sectionsContent = '';
  let bodyEndContent = '';
  let styleContent = '';

  const allErrors = [];
  const processedFiles = [];

  for (const part of manifest.parts) {
    const filePath = join(PARTS_DIR, part.file);

    if (!existsSync(filePath)) {
      log('ERROR', `Part file not found: ${part.file}`);
      process.exit(1);
    }

    const buffer = await readFile(filePath);
    const bomType = detectBOM(buffer);

    if (bomType) {
      log('ERROR', `BOM detected in ${part.file}: ${bomType}`);
      process.exit(1);
    }

    let content = buffer.toString('utf-8');

    // BOM check after conversion
    if (content.charCodeAt(0) === 0xFEFF) {
      log('ERROR', `BOM detected post-conversion in ${part.file}`);
      process.exit(1);
    }

    // Validate anchors
    const anchorErrors = validateAnchors(content, part, manifest);
    if (anchorErrors.length > 0) {
      allErrors.push(...anchorErrors);
    }

    // Route content to appropriate section
    switch (part.type) {
      case 'head':
        headContent += content + '\n';
        break;
      case 'body-start':
        bodyStartContent += content + '\n';
        break;
      case 'section':
        sectionsContent += content + '\n';
        break;
      case 'body-end':
        bodyEndContent += content + '\n';
        break;
      case 'style':
        if (part.inline) {
          styleContent += content + '\n';
        }
        break;
    }

    processedFiles.push(part.file);
    log('INFO', `Processed: ${part.file}`);
  }

  // 5. Report anchor validation errors
  if (allErrors.length > 0) {
    log('ERROR', 'Anchor validation failed:');
    for (const err of allErrors) {
      console.error(`  - ${err.anchor} in ${err.file}:${err.line}`);
      console.error(`    Context: ${err.context}`);
    }
    process.exit(1);
  }

  // 6. Transform CSS for offline use
  log('INFO', 'Transforming CSS for offline use...');
  const transformedStyle = transformCssForOffline(styleContent);

  // 7. Load and inline JavaScript for zero-install
  let jsContent = '';
  
  // Load main.js
  if (existsSync(MAIN_JS_PATH)) {
    log('INFO', 'Loading main.js for inline embedding...');
    jsContent = await readFile(MAIN_JS_PATH, 'utf-8');
    log('INFO', `main.js loaded: ${Math.round(jsContent.length / 1024)} KB`);
  } else {
    log('WARN', 'main.js not found');
  }
  
  // Load zero-install-addons.js
  if (existsSync(ZERO_INSTALL_ADDONS_PATH)) {
    log('INFO', 'Loading zero-install-addons.js for inline embedding...');
    const addonsContent = await readFile(ZERO_INSTALL_ADDONS_PATH, 'utf-8');
    jsContent += '\n\n' + addonsContent;
    log('INFO', `zero-install-addons.js loaded: ${Math.round(addonsContent.length / 1024)} KB`);
  } else {
    log('WARN', 'zero-install-addons.js not found');
  }
  
  // TASK 7: Load and inline data files
  log('INFO', 'Loading data files for inline embedding...');
  const inlineDataHtml = await inlineDataFiles();
  
  // BUG-013, BUG-015 FIX: Clean body-end content properly
  log('INFO', 'Cleaning body-end content for zero-install...');
  const cleanBodyEndContent = cleanBodyEndForZeroInstall(bodyEndContent);
  
  // Verify no external scripts remain
  if (cleanBodyEndContent.match(/<script[^>]*\bsrc\s*=/i)) {
    log('ERROR', 'External script tag still present after cleaning!');
    log('ERROR', 'Content snippet: ' + cleanBodyEndContent.substring(0, 500));
    process.exit(1);
  }
  
  // Verify no closing body/html tags remain
  if (cleanBodyEndContent.match(/<\/body>/i) || cleanBodyEndContent.match(/<\/html>/i)) {
    log('ERROR', 'Closing body/html tags still present after cleaning!');
    log('ERROR', 'Content snippet: ' + cleanBodyEndContent.substring(0, 500));
    process.exit(1);
  }

  // BUG-016 FIX: localStorage and matchMedia polyfills for file:// protocol
  // In Firefox/Safari, localStorage throws SecurityError when accessed via file://
  // matchMedia is also unavailable in some contexts, causing Panel constructor to crash
  const zeroInstallPolyfill = `
// === ZERO-INSTALL POLYFILLS (file:// protocol compatibility) ===
(function() {
  'use strict';
  // localStorage polyfill - in-memory fallback for file:// protocol
  try {
    var testKey = '__lc_probe__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
  } catch (e) {
    var memoryStorage = {};
    window.localStorage = {
      getItem: function(key) {
        return Object.prototype.hasOwnProperty.call(memoryStorage, key) ? memoryStorage[key] : null;
      },
      setItem: function(key, value) {
        memoryStorage[key] = String(value);
      },
      removeItem: function(key) {
        delete memoryStorage[key];
      },
      clear: function() {
        memoryStorage = {};
      },
      key: function(index) {
        var keys = Object.keys(memoryStorage);
        return index >= 0 && index < keys.length ? keys[index] : null;
      }
    };
    Object.defineProperty(window.localStorage, 'length', {
      get: function() { return Object.keys(memoryStorage).length; }
    });
    console.info('[ZeroInstall] localStorage unavailable - using in-memory fallback');
  }
  // matchMedia polyfill - required for Panel constructor
  if (!window.matchMedia) {
    window.matchMedia = function(query) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: function() {},
        removeListener: function() {},
        addEventListener: function() {},
        removeEventListener: function() {},
        dispatchEvent: function() { return false; }
      };
    };
    console.info('[ZeroInstall] matchMedia unavailable - using stub fallback');
  }
})();
`;

  const inlineJs = jsContent ? `<script>
// === INLINE JAVASCRIPT FOR ZERO-INSTALL OFFLINE SUPPORT ===
${zeroInstallPolyfill}
${jsContent}
</script>` : '';

  // 8. Assemble final HTML with zero-install optimizations
  // IMPORTANT: inlineJs MUST be inside <body>, before closing tags
  // TASK 7: inlineDataHtml is inserted before inlineJs
  const hash = createHash('sha256')
    .update(headContent + bodyStartContent + sectionsContent + cleanBodyEndContent + transformedStyle + inlineDataHtml + inlineJs)
    .digest('hex')
    .slice(0, 8);

  const buildDate = new Date().toISOString();

  const finalHtml = `<!DOCTYPE html>
<!-- AUTO-GENERATED: DO NOT EDIT [S-5 VETO] -->
<!-- Build hash: ${hash} -->
<!-- Generated: ${buildDate} -->
<!-- Version: ${version} -->
<!-- Zero-Install: Works via file:// protocol -->
<!-- JavaScript: INLINED for offline support -->
<!-- Data files: INLINED for offline support -->
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="build-hash" content="${hash}">
<meta name="livechar-version" content="${version}">
<meta name="livechar-build" content="${buildDate.split('T')[0]}">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;">
${headContent}
<style>
${transformedStyle}
</style>
</head>
<body data-track="B">
<script>
// CRITICAL: Set default track BEFORE CSS renders to prevent FOUC
(function() {
  var track = 'B';
  try {
    var saved = localStorage.getItem('guide-track-selection');
    if (saved && ['A','B','C'].indexOf(saved.toUpperCase()) !== -1) {
      track = saved.toUpperCase();
    }
  } catch(e) {}
  document.body.setAttribute('data-track', track);
})();
</script>
${bodyStartContent}
<main id="main-content" role="main">
${sectionsContent}
</main>
</div><!-- /.content-wrapper -->
${cleanBodyEndContent}
${inlineDataHtml}
${inlineJs}
</body>
</html>`;

  // BUG-006 FIX: Removed injectTokens() call - tokens.json deleted (unused dead code)
  let processedHtml = finalHtml;

  // BUG-005 FIX: Replace __VERSION__ placeholder with actual version
  processedHtml = processedHtml.replace(/__VERSION__/g, version);

  // TASK 1.2: Ensure all H2/H3 headers have ID attributes
  processedHtml = ensureHeaderIds(processedHtml);

  // TASK 2.5: Fix cross-file anchor references
  processedHtml = fixCrossFileAnchors(processedHtml);

  // 9. Final BOM check
  const outputBuffer = Buffer.from(processedHtml, 'utf-8');
  const outputBom = detectBOM(outputBuffer);
  if (outputBom) {
    log('ERROR', `BOM detected in output: ${outputBom}`);
    process.exit(1);
  }

  // 10. Check for replacement characters (encoding issues)
  if (processedHtml.includes('\uFFFD')) {
    log('ERROR', 'Replacement characters detected in output - encoding issue');
    process.exit(1);
  }

  // BUG-011 FIX: Comprehensive external URL validation
  const externalURLs = findExternalURLs(processedHtml);
  if (externalURLs.length > 0) {
    log('ERROR', `Found ${externalURLs.length} external URL(s) - zero-install must be fully offline:`);
    for (const { type, url, line } of externalURLs) {
      log('ERROR', `  ${type}: ${url} (line ${line})`);
    }
    process.exit(1);
  }

  // BUG-015 CHECK: Verify inline JS is inside <body>
  const bodyCloseIndex = processedHtml.lastIndexOf('</body>');
  const inlineScriptIndex = processedHtml.indexOf('// === INLINE JAVASCRIPT');
  if (inlineScriptIndex > bodyCloseIndex) {
    log('ERROR', 'Inline JavaScript appears AFTER </body> - this will not execute!');
    process.exit(1);
  }

  // TASK 7 CHECK: Verify inline data is inside <body>
  const inlineDataIndex = processedHtml.indexOf('id="glossary-data"');
  if (inlineDataIndex > bodyCloseIndex) {
    log('ERROR', 'Inline data appears AFTER </body> - this will not be accessible!');
    process.exit(1);
  }

  // 12. Write output files
  await writeFile(OUTPUT_PATH, outputBuffer, { encoding: 'utf-8' });
  await writeFile(HASH_PATH, hash, { encoding: 'utf-8' });

  log('INFO', `Build complete: ${OUTPUT_PATH}`);
  log('INFO', `Build hash: ${hash}`);
  log('INFO', `Version: ${version}`);
  log('INFO', `Processed ${processedFiles.length} files`);

  // 13. Report file size
  const sizeKB = Math.round(outputBuffer.length / 1024);
  log('INFO', `Output size: ${sizeKB} KB`);

  return { hash, filesProcessed: processedFiles.length, version, sizeKB };
}

// ============================================================================
// ENTRY POINT
// ============================================================================

build()
  .then(result => {
    console.log('\n============================================');
    console.log('ZERO-INSTALL BUILD SUCCESSFUL');
    console.log('============================================');
    console.log(`Hash: ${result.hash}`);
    console.log(`Version: ${result.version}`);
    console.log(`Files: ${result.filesProcessed}`);
    console.log(`Size: ${result.sizeKB} KB`);
    process.exit(0);
  })
  .catch(err => {
    log('ERROR', `Build failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  });
