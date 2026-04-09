#!/usr/bin/env node
/**
 * TITAN FUSE Build Script for Live Char Guide
 * Version: 1.0.0
 * 
 * Performs deterministic assembly of modular HTML parts into index.html
 * with anchor validation, BOM rejection, and cache-busting.
 */

import { parse } from 'node-html-parser';
import { createHash } from 'crypto';
import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const PARTS_DIR = join(ROOT, 'src', 'parts');
const MANIFEST_PATH = join(ROOT, 'src', 'manifest', 'structure.json');
const OUTPUT_PATH = join(ROOT, 'index.html');
const HASH_PATH = join(ROOT, 'build.hash');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function log(level, message) {
  const timestamp = new Date().toISOString();
  const prefix = level === 'ERROR' ? '❌' : level === 'WARN' ? '⚠️' : '✓';
  console.error(`[${timestamp}] ${prefix} ${message}`);
}

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

// ============================================================================
// ANCHOR VALIDATION (CROSSREF_VALIDATOR)
// ============================================================================

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

async function build() {
  log('INFO', 'Starting build process...');
  
  // 1. Load manifest
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
  
  const finalHtml = `<!DOCTYPE html>
<!-- AUTO-GENERATED: DO NOT EDIT [S-5 VETO] -->
<!-- Build hash: ${hash} -->
<!-- Generated: ${new Date().toISOString()} -->
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="build-hash" content="${hash}">
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
  
  // 6. Final BOM check
  const outputBuffer = Buffer.from(finalHtml, 'utf-8');
  const outputBom = detectBOM(outputBuffer);
  if (outputBom) {
    log('ERROR', `BOM detected in output: ${outputBom}`);
    process.exit(1);
  }
  
  // 7. Check for replacement characters (encoding issues)
  if (finalHtml.includes('\uFFFD')) {
    log('ERROR', 'Replacement characters detected in output - encoding issue');
    process.exit(1);
  }
  
  // 8. Write output files
  await writeFile(OUTPUT_PATH, outputBuffer, { encoding: 'utf-8' });
  await writeFile(HASH_PATH, hash, { encoding: 'utf-8' });
  
  log('INFO', `Build complete: ${OUTPUT_PATH}`);
  log('INFO', `Build hash: ${hash}`);
  log('INFO', `Processed ${processedFiles.length} files`);
  
  return { hash, filesProcessed: processedFiles.length };
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
    console.log(`Files: ${result.filesProcessed}`);
    process.exit(0);
  })
  .catch(err => {
    log('ERROR', `Build failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  });
