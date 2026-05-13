#!/usr/bin/env node
/**
 * @fileoverview Artifact Validation Script for Live Char Guide
 * @module scripts/validate-artifact
 * @version 3.0.0
 * @author TITAN FUSE Team
 * @license MIT
 * 
 * @description
 * Validates shell architecture artifacts against quality gates:
 * - File existence and size limits
 * - Version metadata presence and matching
 * - Required shell elements presence
 * - HTML validity checks
 * - WCAG 1.4.10 Reflow compliance
 */

import { readFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const DIST_DIR = join(ROOT, 'dist-unified');
const INDEX_PATH = join(DIST_DIR, 'index.html');
const VERSION_PATH = join(ROOT, 'src', 'VERSION');

// Validation limits for shell architecture
// Shell is lightweight: ~10KB index.html + lazy-loaded parts
// WCAG 1.4.10: Content reflow at 125% zoom (320px viewport)
const LIMITS = {
  indexMaxKB: 1000,
  shellMinKB: 2     // Shell HTML is small, content loaded via fetch
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

function log(level, message) {
  const timestamp = new Date().toISOString();
  const prefix = level === 'ERROR' ? '❌' : level === 'WARN' ? '⚠️' : '✓';
  console.error(`[${timestamp}] ${prefix} ${message}`);
}

async function checkFileExists(path, name) {
  if (!existsSync(path)) {
    return { pass: false, error: `${name} does not exist at ${path}` };
  }
  return { pass: true };
}

async function checkFileSize(path, name, minKB, maxKB) {
  const stats = await stat(path);
  const sizeKB = stats.size / 1024;

  if (sizeKB < minKB) {
    return { pass: false, error: `${name} too small: ${sizeKB.toFixed(1)} KB (min: ${minKB} KB)` };
  }
  if (sizeKB > maxKB) {
    return { pass: false, error: `${name} too large: ${sizeKB.toFixed(1)} KB (max: ${maxKB} KB)` };
  }
  return { pass: true, sizeKB };
}

async function checkVersion(content, name, expectedVersion) {
  // Check for version in meta tag
  const versionMatch = content.match(/<meta name="livechar-version" content="([^"]+)"/);
  if (!versionMatch) {
    // Check for version in comment (older format)
    const commentMatch = content.match(/<!-- Version: ([\d.]+) -->/);
    if (!commentMatch) {
      return { pass: false, error: `${name} missing version metadata` };
    }
    const version = commentMatch[1];
    if (version !== expectedVersion) {
      return { pass: false, error: `${name} version mismatch: ${version} vs ${expectedVersion}` };
    }
  } else {
    const version = versionMatch[1];
    if (version !== expectedVersion) {
      return { pass: false, error: `${name} version mismatch: ${version} vs ${expectedVersion}` };
    }
  }
  return { pass: true };
}

function checkRequiredSections(content, name) {
  // Shell architecture: check shell-specific elements
  const requiredShellElements = [
    { pattern: /id="content"/i, name: 'Content container' },
    { pattern: /data-layer="3"/i, name: 'Body data-layer=3' },
    { pattern: /lazy-loader\.js/i, name: 'Lazy loader script' }
  ];

  const missing = [];
  for (const element of requiredShellElements) {
    if (!element.pattern.test(content)) {
      missing.push(element.name);
    }
  }

  if (missing.length > 0) {
    return { pass: false, error: `${name} missing shell elements: ${missing.join(', ')}` };
  }
  return { pass: true };
}

function checkHtmlValidity(content, name) {
  // Basic HTML validity checks
  const errors = [];

  // Check for DOCTYPE within first 500 chars (handles leading comments)
  const firstLines = content.substring(0, 500);
  if (!firstLines.includes('<!DOCTYPE html>')) {
    errors.push('Missing DOCTYPE');
  }

  // Check for html, head, body tags
  if (!/<html[^>]*>/i.test(content)) {
    errors.push('Missing <html> tag');
  }
  if (!/<head[^>]*>/i.test(content)) {
    errors.push('Missing <head> tag');
  }
  if (!/<body[^>]*>/i.test(content)) {
    errors.push('Missing <body> tag');
  }

  if (errors.length > 0) {
    return { pass: false, error: `${name} HTML validity issues: ${errors.join(', ')}` };
  }
  return { pass: true };
}

/**
 * Check WCAG 1.4.10 Reflow compliance
 */
function checkWCAG1410Reflow(content, name) {
  const errors = [];
  const warnings = [];

  // Check viewport meta tag exists
  const viewportMatch = content.match(/<meta[^>]+viewport[^>]*>/i);
  if (!viewportMatch) {
    return { pass: false, error: `${name} missing viewport meta tag` };
  }

  // Verify viewport allows scaling (not locked)
  const viewport = viewportMatch[0];
  if (viewport.includes('user-scalable=no') || viewport.includes('maximum-scale=1')) {
    errors.push('Viewport prevents user scaling');
  }

  // Check for fixed-width elements that could cause issues at 320px
  const fixedWidthPattern = /width:\s*(\d+)px/g;
  let match;
  while ((match = fixedWidthPattern.exec(content)) !== null) {
    const width = parseInt(match[1]);
    if (width > 320) {
      warnings.push(`Fixed width ${width}px may cause reflow issues`);
    }
  }

  // Check for min-width that could prevent reflow
  const minWidthPattern = /min-width:\s*(\d+)px/g;
  const problematicallyWideElements = [];
  while ((match = minWidthPattern.exec(content)) !== null) {
    const width = parseInt(match[1]);
    if (width > 320) {
      problematicallyWideElements.push(width);
    }
  }

  if (problematicallyWideElements.length > 0) {
    warnings.push(`min-width values > 320px: ${problematicallyWideElements.slice(0, 3).join(', ')}px`);
  }

  // Check for overflow-x: hidden on body (anti-pattern for reflow)
  if (/body\s*{[^}]*overflow-x:\s*hidden/i.test(content)) {
    warnings.push('overflow-x: hidden on body may hide reflow issues');
  }

  if (errors.length > 0) {
    return { pass: false, error: `${name} WCAG 1.4.10 issues: ${errors.join(', ')}` };
  }

  return { pass: true, warnings };
}

// ============================================================================
// SHELL ARCHITECTURE CHECKS
// ============================================================================

async function checkShellArchitecture() {
  const results = [];

  // SHELL-PARTS: unified parts directory with manifest
  const partsDir = join(DIST_DIR, 'parts');
  const partsExist = existsSync(partsDir);
  if (!partsExist) {
    results.push({
      gate: 'SHELL-PARTS',
      pass: false,
      error: 'dist-unified/parts/ not found'
    });
  } else {
    const manifestPath = join(partsDir, 'manifest.json');
    const manifestExists = existsSync(manifestPath);
    if (!manifestExists) {
      results.push({
        gate: 'SHELL-PARTS',
        pass: false,
        error: 'dist-unified/parts/manifest.json not found'
      });
    } else {
      // Count HTML files in parts directory
      const { readdir: readdirSync } = await import('fs/promises');
      const partFiles = await readdirSync(partsDir);
      const htmlFiles = partFiles.filter(f => f.endsWith('.html'));
      if (htmlFiles.length < 10) {
        results.push({
          gate: 'SHELL-PARTS',
          pass: false,
          error: `dist-unified/parts/ has only ${htmlFiles.length} HTML files (minimum 10 required)`
        });
      } else {
        results.push({ gate: 'SHELL-PARTS', pass: true });
      }
    }
  }

  // Check assets
  const assetsDir = join(DIST_DIR, 'assets');
  const lazyLoader = join(assetsDir, 'lazy-loader.js');
  const shellStyles = join(assetsDir, 'shell-styles.css');

  // SHELL-LOADER: lazy-loader.js must exist and must NOT contain layer artifacts
  const loaderExists = existsSync(lazyLoader);
  if (!loaderExists) {
    results.push({
      gate: 'SHELL-LOADER',
      pass: false,
      error: 'dist-unified/assets/lazy-loader.js not found'
    });
  } else {
    const loaderContent = await readFile(lazyLoader, 'utf-8');
    const layerArtifacts = [];
    if (loaderContent.includes('switchLayer')) layerArtifacts.push('switchLayer');
    if (loaderContent.includes('loadLayerContent')) layerArtifacts.push('loadLayerContent');
    if (loaderContent.includes('CONFIG.LAYERS')) layerArtifacts.push('CONFIG.LAYERS');
    if (layerArtifacts.length > 0) {
      results.push({
        gate: 'SHELL-LOADER',
        pass: false,
        error: `dist-unified/assets/lazy-loader.js contains layer artifacts: ${layerArtifacts.join(', ')}`
      });
    } else {
      results.push({ gate: 'SHELL-LOADER', pass: true });
    }
  }

  // SHELL-STYLES: shell-styles.css must exist and must NOT contain layer modal/switcher styles
  const stylesExist = existsSync(shellStyles);
  if (!stylesExist) {
    results.push({
      gate: 'SHELL-STYLES',
      pass: false,
      error: 'dist-unified/assets/shell-styles.css not found'
    });
  } else {
    const stylesContent = await readFile(shellStyles, 'utf-8');
    const styleArtifacts = [];
    if (stylesContent.includes('.layer-modal')) styleArtifacts.push('.layer-modal');
    if (stylesContent.includes('.layer-switcher')) styleArtifacts.push('.layer-switcher');
    if (styleArtifacts.length > 0) {
      results.push({
        gate: 'SHELL-STYLES',
        pass: false,
        error: `dist-unified/assets/shell-styles.css contains layer artifacts: ${styleArtifacts.join(', ')}`
      });
    } else {
      results.push({ gate: 'SHELL-STYLES', pass: true });
    }
  }

  return results;
}

// ============================================================================
// MAIN VALIDATION
// ============================================================================

async function validate() {
  const results = [];
  let allPassed = true;

  log('INFO', 'Starting artifact validation (shell architecture)...');

  // 1. Load version
  let version = 'unknown';
  if (existsSync(VERSION_PATH)) {
    version = (await readFile(VERSION_PATH, 'utf-8')).trim();
    log('INFO', `Expected version: ${version}`);
  } else {
    log('WARN', 'VERSION file not found');
  }

  // 2. Validate dist-unified/index.html (shell architecture)
  log('INFO', 'Validating dist-unified/index.html (shell architecture)...');

  let indexResult = await checkFileExists(INDEX_PATH, 'dist-unified/index.html');
  if (!indexResult.pass) {
    results.push({ gate: 'GATE-1', ...indexResult });
    allPassed = false;
  } else {
    const indexContent = await readFile(INDEX_PATH, 'utf-8');

    // Shell is lightweight - only needs 2KB minimum
    const indexSize = await checkFileSize(INDEX_PATH, 'dist-unified/index.html', LIMITS.shellMinKB, LIMITS.indexMaxKB);

    results.push({ gate: 'GATE-1', ...indexSize });
    if (!indexSize.pass) allPassed = false;

    if (version !== 'unknown') {
      const versionCheck = await checkVersion(indexContent, 'dist-unified/index.html', version);
      results.push({ gate: 'GATE-2', ...versionCheck });
      if (!versionCheck.pass) allPassed = false;
    }

    const sectionsCheck = checkRequiredSections(indexContent, 'dist-unified/index.html');
    results.push({ gate: 'GATE-3', ...sectionsCheck });
    if (!sectionsCheck.pass) allPassed = false;

    const htmlCheck = checkHtmlValidity(indexContent, 'dist-unified/index.html');
    results.push({ gate: 'GATE-4', ...htmlCheck });
    if (!htmlCheck.pass) allPassed = false;

    // WCAG 1.4.10 Reflow check
    const wcagCheck = checkWCAG1410Reflow(indexContent, 'dist-unified/index.html');
    results.push({ gate: 'GATE-5', ...wcagCheck });
    if (!wcagCheck.pass) allPassed = false;
    if (wcagCheck.warnings && wcagCheck.warnings.length > 0) {
      log('WARN', `GATE-5 warnings: ${wcagCheck.warnings.join('; ')}`);
    }
  }

  // 3. Shell architecture checks
  const shellResults = await checkShellArchitecture();
  for (const result of shellResults) {
    results.push(result);
    if (!result.pass) allPassed = false;
  }

  // 4. Report results
  console.log('\n============================================');
  console.log('VALIDATION RESULTS (SHELL ARCHITECTURE (UNIFIED))');
  console.log('============================================');

  for (const result of results) {
    const status = result.pass ? '✓ PASS' : '✗ FAIL';
    console.log(`${result.gate}: ${status}`);
    if (!result.pass) {
      console.log(`  Error: ${result.error}`);
    } else if (result.sizeKB) {
      console.log(`  Size: ${result.sizeKB.toFixed(1)} KB`);
    }
  }

  console.log('============================================');

  if (allPassed) {
    console.log('✓ All validation gates passed');
    process.exit(0);
  } else {
    console.log('✗ Validation failed');
    process.exit(1);
  }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

validate().catch(err => {
  log('ERROR', `Validation error: ${err.message}`);
  console.error(err);
  process.exit(1);
});
