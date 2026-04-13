#!/usr/bin/env node
/**
 * @fileoverview TITAN FUSE Build Script for Live Char Guide
 * @module src/scripts/build
 * @version 1.2.0
 * @author TITAN FUSE Team
 * @license MIT
 * 
 * @description
 * Performs deterministic assembly of modular HTML parts into index.html
 * with anchor validation, BOM rejection, and cache-busting.
 * 
 * @example
 * // Run from command line
 * node src/scripts/build.mjs
 * 
 * // Or via npm
 * npm run build
 * 
 * @see {@link https://github.com/vudirvp-sketch/live-char-guide|Repository}
 */

import { createHash } from 'crypto';
import { readFile, writeFile, readdir, mkdir, copyFile, unlink, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { log, validateAnchors, detectBOM } from './build-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SRC_DIR = join(ROOT, 'src');
const PARTS_DIR = join(ROOT, 'src', 'parts');
const MANIFEST_PATH = join(ROOT, 'src', 'manifest', 'structure.json');
const VERSION_PATH = join(ROOT, 'src', 'VERSION');
const OUTPUT_PATH = join(ROOT, 'index.html');
const HASH_PATH = join(ROOT, 'build.hash');
const ASSETS_SRC = join(SRC_DIR, 'assets');
const ASSETS_OUT = join(ROOT, 'assets');

// ============================================================================
// UTILITY FUNCTIONS (local only)
// ============================================================================

/**
 * Ensures a directory exists, creating it if necessary
 * @async
 * @param {string} dir - Directory path to ensure
 * @returns {Promise<void>}
 */
async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

// ============================================================================
// SCRIPT DEFER ATTRIBUTE
// ============================================================================

/**
 * Adds defer attribute to external script tags that don't already have defer/async/type=module
 * @param {string} html - HTML content
 * @returns {string} HTML with defer added to eligible script tags
 */
function addDeferToScripts(html) {
  return html.replace(
    /<script(\s[^>]*)?\s+src=["']([^"']+\.js)["']([^>]*)?>/gi,
    (match, before, src, after) => {
      const fullAttrs = (before || '') + (after || '');
      // Skip if already has defer, async, or type="module"
      if (/\b(defer|async)\b/.test(fullAttrs)) return match;
      if (/type\s*=\s*["']module["']/i.test(fullAttrs)) return match;
      // Reconstruct with defer, preserving all attributes
      const beforeAttrs = before || '';
      const afterAttrs = after || '';
      return `<script${beforeAttrs} src="${src}"${afterAttrs} defer>`;
    }
  );
}

// ============================================================================
// ASSET HASHING (CACHE BUSTING)
// ============================================================================

/**
 * Hashes asset files (JS/CSS) by appending content hash to filenames and updating HTML references
 * @async
 * @param {string} html - HTML content
 * @param {string} assetsDir - Path to assets directory
 * @returns {Promise<string>} HTML with updated asset references
 */
async function hashAssets(html, assetsDir) {
  if (!existsSync(assetsDir)) return html;

  const assetFiles = await readdir(assetsDir);
  let updatedHtml = html;

  // Clean up old hashed files from previous builds
  for (const file of assetFiles) {
    if (/\.[a-f0-9]{8}\.(js|css)$/.test(file)) {
      await unlink(join(assetsDir, file));
    }
  }

  // Re-read directory after cleanup
  const currentFiles = (await readdir(assetsDir)).filter(
    f => f.endsWith('.js') || f.endsWith('.css')
  );

  for (const file of currentFiles) {
    const filePath = join(assetsDir, file);
    const content = await readFile(filePath);
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 8);
    const ext = file.split('.').pop();
    const baseName = file.replace(`.${ext}`, '');
    const newName = `${baseName}.${hash}.${ext}`;

    // Copy (not rename) to preserve source for zero-install build
    await copyFile(filePath, join(assetsDir, newName));

    // Update HTML references
    updatedHtml = updatedHtml.replace(
      new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
      newName
    );
  }

  return updatedHtml;
}

// ============================================================================
// BUG-002 FIX: COPY ASSETS TO OUTPUT DIRECTORY
// ============================================================================

/**
 * Copies all assets from src/assets to output assets directory
 * and applies version replacement to sw.js
 * @async
 * @param {string} version - Version string to inject into sw.js
 * @returns {Promise<void>}
 */
async function copyAssetsToOutput(version) {
  // Clean output assets directory
  if (existsSync(ASSETS_OUT)) {
    await rm(ASSETS_OUT, { recursive: true });
  }
  await ensureDir(ASSETS_OUT);

  // Copy all source assets to output
  const assetFiles = await readdir(ASSETS_SRC);
  for (const file of assetFiles) {
    const srcPath = join(ASSETS_SRC, file);
    const outPath = join(ASSETS_OUT, file);
    await copyFile(srcPath, outPath);
  }

  // BUG-001 FIX: Replace version in output sw.js (not source)
  const swOutPath = join(ASSETS_OUT, 'sw.js');
  if (existsSync(swOutPath)) {
    let swContent = await readFile(swOutPath, 'utf-8');
    swContent = swContent.replace('__LIVECHAR_VERSION__', version);
    await writeFile(swOutPath, swContent, { encoding: 'utf-8' });
  }
}

// ============================================================================
// MAIN BUILD FUNCTION
// ============================================================================

/**
 * Main build function that assembles HTML parts into index.html
 * @async
 * @returns {Promise<{hash: string, filesProcessed: number, version: string, sizeKB: number}>}
 *          Build result containing hash, file count, version, and output size
 * @throws {Error} If manifest is invalid, files missing, or validation fails
 * 
 * @example
 * const result = await build();
 * console.log(`Built ${result.filesProcessed} files, hash: ${result.hash}`);
 */
async function build() {
  log('INFO', 'Starting build process...');
  
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
  
  // 2. Validate manifest structure
  if (!manifest.parts || !Array.isArray(manifest.parts)) {
    log('ERROR', 'Invalid manifest: missing parts array');
    process.exit(1);
  }
  
  log('INFO', `Manifest version: ${manifest.version}`);
  log('INFO', `Parts to process: ${manifest.parts.length}`);
  
  // 3. Collect all content
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
  
  // 4. Report anchor validation errors
  if (allErrors.length > 0) {
    log('ERROR', 'Anchor validation failed:');
    for (const err of allErrors) {
      console.error(`  - ${err.anchor} in ${err.file}:${err.line}`);
      console.error(`    Context: ${err.context}`);
    }
    process.exit(1);
  }
  
  // 5. Assemble final HTML
  const hash = createHash('sha256')
    .update(headContent + bodyStartContent + sectionsContent + bodyEndContent + styleContent)
    .digest('hex')
    .slice(0, 8);
  
  const buildDate = new Date().toISOString();
  
  const finalHtml = `<!DOCTYPE html>
<!-- AUTO-GENERATED: DO NOT EDIT [S-5 VETO] -->
<!-- Build hash: ${hash} -->
<!-- Generated: ${buildDate} -->
<!-- Version: ${version} -->
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="build-hash" content="${hash}">
<meta name="livechar-version" content="${version}">
<meta name="livechar-build" content="${buildDate.split('T')[0]}">
<meta http-equiv="Cache-Control" content="no-cache">
${headContent}
<style>
${styleContent}
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
${bodyEndContent}
</body>
</html>`;
  
  // BUG-006 FIX: Removed injectTokens() call - tokens.json deleted (unused dead code)
  let processedHtml = finalHtml;

  // BUG-005 FIX: Replace __VERSION__ placeholder with actual version
  processedHtml = processedHtml.replace(/__VERSION__/g, version);

  // 5.6 Add defer to external script tags
  processedHtml = addDeferToScripts(processedHtml);

  // BUG-002 FIX: Copy assets to output directory BEFORE hashing
  log('INFO', 'Copying assets to output directory...');
  await copyAssetsToOutput(version);

  // 5.7 Hash assets (rename JS/CSS files with content hash for cache busting)
  processedHtml = await hashAssets(processedHtml, ASSETS_OUT);

  // 6. Final BOM check
  const outputBuffer = Buffer.from(processedHtml, 'utf-8');
  const outputBom = detectBOM(outputBuffer);
  if (outputBom) {
    log('ERROR', `BOM detected in output: ${outputBom}`);
    process.exit(1);
  }
  
  // 7. Check for replacement characters (encoding issues)
  if (processedHtml.includes('\uFFFD')) {
    log('ERROR', 'Replacement characters detected in output - encoding issue');
    process.exit(1);
  }
  
  // 8. Write output files
  await writeFile(OUTPUT_PATH, outputBuffer, { encoding: 'utf-8' });
  await writeFile(HASH_PATH, hash, { encoding: 'utf-8' });
  
  log('INFO', `Build complete: ${OUTPUT_PATH}`);
  log('INFO', `Build hash: ${hash}`);
  log('INFO', `Version: ${version}`);
  log('INFO', `Processed ${processedFiles.length} files`);
  
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
    console.log('BUILD SUCCESSFUL');
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
