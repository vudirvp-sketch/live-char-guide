#!/usr/bin/env node
/**
 * @fileoverview TITAN FUSE Build Script for Live Char Guide
 * @module src/scripts/build
 * @version 1.1.0
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

import { parse } from 'node-html-parser';
import { createHash } from 'crypto';
import { readFile, writeFile, readdir, mkdir, copyFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const PARTS_DIR = join(ROOT, 'src', 'parts');
const MANIFEST_PATH = join(ROOT, 'src', 'manifest', 'structure.json');
const VERSION_PATH = join(ROOT, 'src', 'VERSION');
const OUTPUT_PATH = join(ROOT, 'index.html');
const HASH_PATH = join(ROOT, 'build.hash');
const TOKENS_PATH = join(ROOT, 'src', 'tokens.json');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Logs a message with timestamp and level indicator
 * @param {string} level - Log level: 'ERROR', 'WARN', or 'INFO'
 * @param {string} message - Message to log
 * @returns {void}
 */
function log(level, message) {
  const timestamp = new Date().toISOString();
  const prefix = level === 'ERROR' ? '❌' : level === 'WARN' ? '⚠️' : '✓';
  console.error(`[${timestamp}] ${prefix} ${message}`);
}

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
// DESIGN TOKEN INJECTION
// ============================================================================

/**
 * Generates CSS custom property declarations from a design tokens object
 * @param {Object} tokens - Parsed tokens.json object
 * @returns {string} Semicolon-separated CSS variable declarations
 */
function generateCSSVars(tokens) {
  const vars = [];
  const primitives = tokens.primitives || {};

  // Colors: --color-{category}-{name}
  if (primitives.color) {
    for (const [category, values] of Object.entries(primitives.color)) {
      for (const [name, def] of Object.entries(values)) {
        vars.push(`--color-${category}-${name}: ${def.value}`);
      }
    }
  }

  // Spacing: --spacing-{name}
  if (primitives.spacing) {
    for (const [name, def] of Object.entries(primitives.spacing)) {
      vars.push(`--spacing-${name}: ${def.value}`);
    }
  }

  // Typography: --typography-{category}-{name}
  if (primitives.typography) {
    for (const [category, values] of Object.entries(primitives.typography)) {
      if (typeof values === 'object' && values.value !== undefined) {
        vars.push(`--typography-${category}: ${values.value}`);
      } else {
        for (const [name, def] of Object.entries(values)) {
          vars.push(`--typography-${category}-${name}: ${def.value}`);
        }
      }
    }
  }

  // Border: --border-{category}-{name}
  if (primitives.border) {
    for (const [category, values] of Object.entries(primitives.border)) {
      for (const [name, def] of Object.entries(values)) {
        vars.push(`--border-${category}-${name}: ${def.value}`);
      }
    }
  }

  return vars.join(';');
}

/**
 * Injects design tokens as CSS custom properties into HTML <head>
 * @async
 * @param {string} html - HTML content
 * @param {string} tokensPath - Path to tokens.json
 * @returns {Promise<string>} HTML with CSS variables injected, or original HTML if tokens file missing
 */
async function injectTokens(html, tokensPath) {
  if (!existsSync(tokensPath)) {
    return html; // tokens.json is optional — graceful degradation
  }
  const tokens = JSON.parse(await readFile(tokensPath, 'utf-8'));
  const cssVars = generateCSSVars(tokens);
  return html.replace('</head>', `<style>:root{${cssVars}}</style></head>`);
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
// ANCHOR VALIDATION (CROSSREF_VALIDATOR)
// ============================================================================

/**
 * Validates that expected anchors exist in HTML content
 * @param {string} content - HTML content to validate
 * @param {Object} part - Part definition from manifest
 * @param {string} part.file - Filename of the part
 * @param {string[]} [part.anchors] - Array of expected anchor IDs (with # prefix)
 * @param {Object} manifest - Full manifest object
 * @returns {Array<{anchor: string, file: string, context: string, line: number}>} Array of validation errors
 */
function validateAnchors(content, part, manifest) {
  const root = parse(content);
  const errors = [];
  
  if (!part.anchors) return errors;
  
  for (const anchor of part.anchors) {
    const id = anchor.replace('#', '');
    const found = root.querySelector(`[id="${id}"], a[name="${id}"]`);
    
    if (!found) {
      // CURSOR_TRACKING: find context around expected anchor
      const idx = Math.max(
        content.indexOf(`id="${id}"`),
        content.indexOf(`name="${id}"`)
      );
      
      if (idx !== -1) {
        const ctx = content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + 50));
        errors.push({
          anchor,
          file: part.file,
          context: ctx,
          line: content.slice(0, idx).split('\n').length
        });
      } else {
        errors.push({
          anchor,
          file: part.file,
          context: 'Anchor not found in content',
          line: 0
        });
      }
    }
  }
  
  return errors;
}

// ============================================================================
// BOM DETECTION
// ============================================================================

/**
 * Detects Byte Order Mark (BOM) in a buffer
 * @param {Buffer} buffer - Buffer to check for BOM
 * @returns {string|null} BOM type ('UTF-8 BOM', 'UTF-16 LE BOM', 'UTF-16 BE BOM') or null if no BOM
 */
function detectBOM(buffer) {
  if (buffer.slice(0, 3).equals(Buffer.from([0xEF, 0xBB, 0xBF]))) {
    return 'UTF-8 BOM';
  }
  if (buffer.slice(0, 2).equals(Buffer.from([0xFF, 0xFE]))) {
    return 'UTF-16 LE BOM';
  }
  if (buffer.slice(0, 2).equals(Buffer.from([0xFE, 0xFF]))) {
    return 'UTF-16 BE BOM';
  }
  return null;
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
<body>
${bodyStartContent}
<main id="main-content" role="main">
${sectionsContent}
</main>
${bodyEndContent}
</body>
</html>`;
  
  // 5.5 Inject design tokens as CSS variables
  let processedHtml = await injectTokens(finalHtml, TOKENS_PATH);

  // 5.6 Add defer to external script tags
  processedHtml = addDeferToScripts(processedHtml);

  // 5.7 Hash assets (rename JS/CSS files with content hash for cache busting)
  const ASSETS_DIR = join(ROOT, 'assets');
  processedHtml = await hashAssets(processedHtml, ASSETS_DIR);

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
