#!/usr/bin/env node
/**
 * TITAN FUSE Build Script for Live Char Guide - Zero-Install Version
 * Version: 1.1.0
 *
 * Creates offline-optimized HTML file that works via file:// protocol.
 * - Replaces Google Fonts with system font fallbacks
 * - Adds CSP meta tags for offline use
 * - Embeds version metadata
 * - BUG-011 FIX: Comprehensive external URL validation
 */

import { createHash } from 'crypto';
import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { log, validateAnchors, detectBOM } from './build-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const PARTS_DIR = join(ROOT, 'src', 'parts');
const MANIFEST_PATH = join(ROOT, 'src', 'manifest', 'structure.json');
const VERSION_PATH = join(ROOT, 'src', 'VERSION');
const MAIN_JS_PATH = join(ROOT, 'src', 'assets', 'main.js');
const ZERO_INSTALL_ADDONS_PATH = join(ROOT, 'src', 'assets', 'zero-install-addons.js');
const SW_JS_PATH = join(ROOT, 'src', 'assets', 'sw.js');
const OUTPUT_PATH = join(ROOT, 'live-char-guide-zero-install.html');
const HASH_PATH = join(ROOT, 'build-zero-install.hash');

// ============================================================================
// ZERO-INSTALL TRANSFORMATIONS
// ============================================================================

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
  
  // BUG-012 FIX: Strip external script tags from bodyEndContent for zero-install
  // Zero-install uses inline JS only - external script references cause duplicate loading
  let cleanBodyEndContent = bodyEndContent
    .replace(/<script\s+src=["'][^"']+["'][^>]*>\s*<\/script>/gi, '')
    .replace(/<\/body>\s*<\/html>\s*$/gi, '');

  const inlineJs = jsContent ? `<script>
// === INLINE JAVASCRIPT FOR ZERO-INSTALL OFFLINE SUPPORT ===
${jsContent}
</script>` : '';

  // 8. Assemble final HTML with zero-install optimizations
  const hash = createHash('sha256')
    .update(headContent + bodyStartContent + sectionsContent + cleanBodyEndContent + transformedStyle + inlineJs)
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
<body>
${bodyStartContent}
<main id="main-content" role="main">
${sectionsContent}
</main>
${cleanBodyEndContent}
${inlineJs}
</body>
</html>`;

  // BUG-006 FIX: Removed injectTokens() call - tokens.json deleted (unused dead code)
  let processedHtml = finalHtml;

  // BUG-005 FIX: Replace __VERSION__ placeholder with actual version
  processedHtml = processedHtml.replace(/__VERSION__/g, version);

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
