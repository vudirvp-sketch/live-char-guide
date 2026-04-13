#!/usr/bin/env node
/**
 * @fileoverview Shared Build Utilities for Live Char Guide
 * @module src/scripts/build-utils
 * @version 1.0.0
 * @author TITAN FUSE Team
 * @license MIT
 *
 * @description
 * Common utility functions shared between build.mjs and build-zero-install.mjs.
 * Eliminates code duplication between the two build scripts.
 *
 * @example
 * import { log, generateCSSVars, injectTokens, validateAnchors, detectBOM, validateDataFiles } from './build-utils.mjs';
 */

import { parse } from 'node-html-parser';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

// ============================================================================
// LOGGING
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
// TASK 7: DATA FILES VALIDATION
// ============================================================================

/**
 * Validates that required data files exist in the data directory
 * @param {string} dataDir - Path to src/data/ directory
 * @param {string[]} requiredFiles - Array of required filenames
 * @returns {string[]} Array of missing file names
 */
function validateDataFiles(dataDir, requiredFiles) {
  const missing = [];
  for (const file of requiredFiles) {
    if (!existsSync(join(dataDir, file))) {
      missing.push(file);
    }
  }
  return missing;
}

// ============================================================================
// EXPORTS
// ============================================================================

export { log, generateCSSVars, injectTokens, validateAnchors, detectBOM, validateDataFiles };
