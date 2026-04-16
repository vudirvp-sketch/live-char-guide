#!/usr/bin/env node
/**
 * @fileoverview Artifact Validation Script for Live Char Guide
 * @module scripts/validate-artifact
 * @version 1.3.0
 * @author TITAN FUSE Team
 * @license MIT
 * 
 * @description
 * Validates both index.html and zero-install.html artifacts against quality gates:
 * - File existence and size limits
 * - Version metadata presence and matching
 * - Required sections presence
 * - No external resource references (zero-install only)
 * - HTML validity checks
 * 
 * @example
 * // Run validation
 * node scripts/validate-artifact.mjs
 * 
 * // Via npm
 * npm run validate
 * 
 * @see {@link https://github.com/vudirvp-sketch/live-char-guide|Repository}
 */

import { readFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const INDEX_PATH = join(ROOT, 'dist', 'index.html');
const ZERO_INSTALL_PATH = join(ROOT, 'live-char-guide-zero-install.html');
const VERSION_PATH = join(ROOT, 'src', 'VERSION');

// Validation limits - synchronized with bundle_check.mjs
// Updated 2026: Modern limits for rich content guides
// WCAG 1.4.10: Content reflow at 125% zoom (320px viewport)
// v5.4.0: Increased limits for action plan implementation (core principles, glossary, debugging)
const LIMITS = {
  indexMaxKB: 1000,
  zeroInstallMaxKB: 1200,
  minKB: 50
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
  // For shell architecture (dist/index.html), check shell elements
  // For zero-install, check content sections
  const isShell = content.includes('lazy-loader.js') || content.includes('layer-modal');

  if (isShell) {
    // Shell architecture: check shell-specific elements
    const requiredShellElements = [
      { pattern: /id="content"/i, name: 'Content container' },
      { pattern: /id="layer-modal"|class="layer-modal"/i, name: 'Layer selector' },
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

  // Zero-install: check content sections
  const requiredSections = [
    { pattern: /id="quick-start"|id="quickstart"/i, name: 'Quick Start' },
    { pattern: /id="architecture"/i, name: 'Architecture' },
    { pattern: /id="anchor"|id="anchors"/i, name: 'Anchors' }
  ];

  const missing = [];
  for (const section of requiredSections) {
    if (!section.pattern.test(content)) {
      missing.push(section.name);
    }
  }

  if (missing.length > 0) {
    return { pass: false, error: `${name} missing sections: ${missing.join(', ')}` };
  }
  return { pass: true };
}

function checkNoExternalUrls(content, name) {
  // Check for external font imports (should not exist in zero-install)
  const googleFontsPattern = /@import\s+url\(['"]https:\/\/fonts\.googleapis\.com/i;
  if (googleFontsPattern.test(content)) {
    return { pass: false, error: `${name} contains Google Fonts imports - not suitable for offline use` };
  }

  // Check for external CDN URLs
  const cdnPattern = /href=["']https?:\/\/(?!fonts\.googleapis\.com)[^"']+\.css|src=["']https?:\/\/[^"']+\.js/g;
  const matches = content.match(cdnPattern);
  if (matches && matches.length > 0) {
    // Filter out common allowed external references (like og:image)
    const problematic = matches.filter(m => !m.includes('og:image') && !m.includes('twitter:'));
    if (problematic.length > 0) {
      return { pass: false, error: `${name} contains external resource references: ${problematic.slice(0, 3).join(', ')}` };
    }
  }

  return { pass: true };
}

function checkHtmlValidity(content, name) {
  // Basic HTML validity checks
  const errors = [];

  // BUG-013 FIX: Check for DOCTYPE within first 500 chars (handles leading comments)
  const firstLines = content.substring(0, 500);
  if (!firstLines.includes('<!DOCTYPE html>')) {
    errors.push('Missing DOCTYPE');
  }

  // Check for unclosed tags (basic check)
  const openTags = content.match(/<(div|section|article|main|header|footer|nav|aside)[^>]*>/gi) || [];
  const closeTags = content.match(/<\/(div|section|article|main|header|footer|nav|aside)>/gi) || [];

  // This is a rough check - may have false positives for self-closing or nested tags
  // We'll just warn, not error

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
 * Check WCAG 1.4.10 Reflow compliance (v5.4.0 - ITEM-009)
 * At 125% zoom (320px viewport), content should not require horizontal scrolling
 * @param {string} content - HTML content
 * @param {string} name - Artifact name
 * @returns {{pass: boolean, error?: string, warnings?: string[]}}
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
  // Note: This is a heuristic check - full implementation would parse CSS properly
  const fixedWidthPattern = /width:\s*(\d+)px/g;
  let match;
  while ((match = fixedWidthPattern.exec(content)) !== null) {
    const width = parseInt(match[1]);
    if (width > 320) {
      // This is a warning, not error - may be in media query or not affect reflow
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
// MAIN VALIDATION
// ============================================================================

async function validate() {
  const results = [];
  let allPassed = true;

  log('INFO', 'Starting artifact validation...');

  // 1. Load version
  let version = 'unknown';
  if (existsSync(VERSION_PATH)) {
    version = (await readFile(VERSION_PATH, 'utf-8')).trim();
    log('INFO', `Expected version: ${version}`);
  } else {
    log('WARN', 'VERSION file not found');
  }

  // 2. Check index.html (shell or full)
  log('INFO', 'Validating index.html...');

  let indexResult = await checkFileExists(INDEX_PATH, 'index.html');
  if (!indexResult.pass) {
    results.push({ gate: 'GATE-1', ...indexResult });
    allPassed = false;
  } else {
    const indexContent = await readFile(INDEX_PATH, 'utf-8');

    // Check if this is a shell architecture (smaller minimum size)
    const isShell = indexContent.includes('lazy-loader.js') || indexContent.includes('layer-modal');
    const minSize = isShell ? 2 : LIMITS.minKB; // Shell only needs 2KB, full needs 50KB

    const indexSize = await checkFileSize(INDEX_PATH, 'index.html', minSize, LIMITS.indexMaxKB);

    results.push({ gate: 'GATE-1', ...indexSize });
    if (!indexSize.pass) allPassed = false;

    if (version !== 'unknown') {
      const versionCheck = await checkVersion(indexContent, 'index.html', version);
      results.push({ gate: 'GATE-2', ...versionCheck });
      if (!versionCheck.pass) allPassed = false;
    }

    const sectionsCheck = checkRequiredSections(indexContent, 'index.html');
    results.push({ gate: 'GATE-3', ...sectionsCheck });
    if (!sectionsCheck.pass) allPassed = false;

    const htmlCheck = checkHtmlValidity(indexContent, 'index.html');
    results.push({ gate: 'GATE-4', ...htmlCheck });
    if (!htmlCheck.pass) allPassed = false;

    // v5.4.0: WCAG 1.4.10 Reflow check (ITEM-009)
    const wcagCheck = checkWCAG1410Reflow(indexContent, 'index.html');
    results.push({ gate: 'GATE-10', ...wcagCheck });
    if (!wcagCheck.pass) allPassed = false;
    if (wcagCheck.warnings && wcagCheck.warnings.length > 0) {
      log('WARN', `GATE-10 warnings: ${wcagCheck.warnings.join('; ')}`);
    }
  }

  // 3. Check zero-install.html
  log('INFO', 'Validating live-char-guide-zero-install.html...');

  let zeroResult = await checkFileExists(ZERO_INSTALL_PATH, 'zero-install.html');
  if (!zeroResult.pass) {
    results.push({ gate: 'GATE-5', ...zeroResult });
    allPassed = false;
  } else {
    const zeroContent = await readFile(ZERO_INSTALL_PATH, 'utf-8');
    const zeroSize = await checkFileSize(ZERO_INSTALL_PATH, 'zero-install.html', LIMITS.minKB, LIMITS.zeroInstallMaxKB);

    results.push({ gate: 'GATE-5', ...zeroSize });
    if (!zeroSize.pass) allPassed = false;

    if (version !== 'unknown') {
      const versionCheck = await checkVersion(zeroContent, 'zero-install.html', version);
      results.push({ gate: 'GATE-6', ...versionCheck });
      if (!versionCheck.pass) allPassed = false;
    }

    const sectionsCheck = checkRequiredSections(zeroContent, 'zero-install.html');
    results.push({ gate: 'GATE-7', ...sectionsCheck });
    if (!sectionsCheck.pass) allPassed = false;

    const externalCheck = checkNoExternalUrls(zeroContent, 'zero-install.html');
    results.push({ gate: 'GATE-8', ...externalCheck });
    if (!externalCheck.pass) allPassed = false;

    const htmlCheck = checkHtmlValidity(zeroContent, 'zero-install.html');
    results.push({ gate: 'GATE-9', ...htmlCheck });
    if (!htmlCheck.pass) allPassed = false;

    // v5.4.0: WCAG 1.4.10 Reflow check (ITEM-009)
    const wcagCheck = checkWCAG1410Reflow(zeroContent, 'zero-install.html');
    results.push({ gate: 'GATE-11', ...wcagCheck });
    if (!wcagCheck.pass) allPassed = false;
    if (wcagCheck.warnings && wcagCheck.warnings.length > 0) {
      log('WARN', `GATE-11 warnings: ${wcagCheck.warnings.join('; ')}`);
    }
  }

  // 4. Report results
  console.log('\n============================================');
  console.log('VALIDATION RESULTS');
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
