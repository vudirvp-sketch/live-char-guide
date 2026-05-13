#!/usr/bin/env node
/**
 * @fileoverview Unit tests for validate-artifact.mjs (unified)
 * @module tests/test-validate-artifact
 * @version 3.0.0
 * 
 * @description
 * Tests for unified guide artifact validation.
 * Migrated from SHELL-L1/L2/L3 architecture to SHELL-PARTS (unified)
 * per Phase 6.7 of UNIFIED-GUIDE-MIGRATION-PLAN-v2.md.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ============================================================================
// SIZE VALIDATION TESTS
// ============================================================================

describe('Size Validation', () => {
  const LIMITS = {
    indexMaxKB: 1000,   // Shell is lightweight
    shellMinKB: 2       // Shell HTML is small, content loaded via fetch
  };

  it('dist index.html should be within size limits', async () => {
    const distPath = join(ROOT, 'dist', 'index.html');
    const indexPath = distPath;

    if (existsSync(indexPath)) {
      const stats = await stat(indexPath);
      const sizeKB = stats.size / 1024;

      assert.ok(sizeKB >= LIMITS.shellMinKB,
        `dist index.html too small: ${sizeKB.toFixed(1)} KB (min: ${LIMITS.shellMinKB} KB)`);
      assert.ok(sizeKB <= LIMITS.indexMaxKB,
        `dist index.html too large: ${sizeKB.toFixed(1)} KB (max: ${LIMITS.indexMaxKB} KB)`);
    }
  });

  it('root index.html should be within size limits', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const stats = await stat(indexPath);
      const sizeKB = stats.size / 1024;

      assert.ok(sizeKB >= LIMITS.shellMinKB,
        `index.html too small: ${sizeKB.toFixed(1)} KB (min: ${LIMITS.shellMinKB} KB)`);
      assert.ok(sizeKB <= LIMITS.indexMaxKB,
        `index.html too large: ${sizeKB.toFixed(1)} KB (max: ${LIMITS.indexMaxKB} KB)`);
    }
  });
});

// ============================================================================
// VERSION PRESENCE CHECK TESTS
// ============================================================================

describe('Version Presence Check', () => {
  it('dist index.html should contain version metadata', async () => {
    const distPath = join(ROOT, 'dist', 'index.html');
    const indexPath = distPath;

    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      const hasVersionMeta = /<meta name="livechar-version" content="[^"]+"/.test(content);
      const hasVersionComment = /<!-- Version: [\d.]+ -->/.test(content);

      assert.ok(hasVersionMeta || hasVersionComment,
        'dist index.html should contain version metadata');
    }
  });

  it('version should match VERSION file', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');

    const distPath = join(ROOT, 'dist', 'index.html');
    const indexPath = distPath;

    if (existsSync(versionPath) && existsSync(indexPath)) {
      const expectedVersion = (await readFile(versionPath, 'utf-8')).trim();
      const content = await readFile(indexPath, 'utf-8');

      const versionMatch = content.match(/<meta name="livechar-version" content="([^"]+)"/);
      if (versionMatch) {
        assert.strictEqual(versionMatch[1], expectedVersion,
          'dist index.html version should match VERSION file');
      }
    }
  });
});

// ============================================================================
// REQUIRED SECTIONS CHECK TESTS
// ============================================================================

describe('Required Sections Check', () => {
  const requiredShellElements = [
    { pattern: /id="content"/i, name: 'Content container' },
    { pattern: /lazy-loader\.js/i, name: 'Lazy loader script' }
  ];

  it('dist index.html should have all required shell elements', async () => {
    const distPath = join(ROOT, 'dist', 'index.html');
    const indexPath = distPath;

    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');

      for (const element of requiredShellElements) {
        assert.ok(element.pattern.test(content),
          `dist index.html should have ${element.name}`);
      }
    }
  });

  it('dist index.html should NOT have layer modal or switcher', async () => {
    const distPath = join(ROOT, 'dist', 'index.html');
    const indexPath = distPath;

    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');

      assert.ok(!content.includes('id="layer-modal"'),
        'dist index.html should NOT have layer modal');
      assert.ok(!content.includes('class="layer-modal"'),
        'dist index.html should NOT have layer-modal class');
      assert.ok(!content.includes('id="layer-switcher"'),
        'dist index.html should NOT have layer switcher');
    }
  });
});

// ============================================================================
// HTML VALIDITY CHECK TESTS
// ============================================================================

describe('HTML Validity Check', () => {
  it('dist index.html should have valid DOCTYPE', async () => {
    const distPath = join(ROOT, 'dist', 'index.html');
    const indexPath = distPath;

    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      assert.ok(content.startsWith('<!DOCTYPE html>'),
        'dist index.html should start with <!DOCTYPE html>');
    }
  });

  it('dist index.html should have required HTML structure', async () => {
    const distPath = join(ROOT, 'dist', 'index.html');
    const indexPath = distPath;

    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');

      assert.match(content, /<html[^>]*>/, 'Should have <html> tag');
      assert.match(content, /<head[^>]*>/, 'Should have <head> tag');
      assert.match(content, /<body[^>]*>/, 'Should have <body> tag');
      assert.match(content, /<\/html>/, 'Should have closing </html> tag');
    }
  });

  it('dist index.html should not have replacement characters', async () => {
    const distPath = join(ROOT, 'dist', 'index.html');
    const indexPath = distPath;

    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      assert.ok(!content.includes('\uFFFD'),
        'dist index.html should not have replacement characters (encoding issues)');
    }
  });
});

// ============================================================================
// SHELL ARCHITECTURE TESTS (UNIFIED)
// ============================================================================

describe('Shell Architecture (Unified)', () => {
  it('should have lazy-loader.js', () => {
    const distLazy = join(ROOT, 'dist', 'assets', 'lazy-loader.js');
    const lazyPath = distLazy;
    assert.strictEqual(existsSync(lazyPath), true, 'lazy-loader.js should exist in dist assets');
  });

  it('should have shell-styles.css', () => {
    const distStyles = join(ROOT, 'dist', 'assets', 'shell-styles.css');
    const stylesPath = distStyles;
    assert.strictEqual(existsSync(stylesPath), true, 'shell-styles.css should exist in dist assets');
  });

  it('should have unified parts directory', () => {
    const distParts = join(ROOT, 'dist', 'parts');
    const partsDir = distParts;
    assert.strictEqual(existsSync(partsDir), true, 'unified parts/ directory should exist in dist');
  });

  it('should have manifest.json in parts', () => {
    const distManifest = join(ROOT, 'dist', 'parts', 'manifest.json');
    const manifestPath = distManifest;
    assert.strictEqual(existsSync(manifestPath), true, 'parts/manifest.json should exist in dist');
  });
});

// ============================================================================
// RUN TESTS
// ============================================================================

console.log('🧪 Running validate-artifact.mjs unit tests (unified guide architecture)...\n');
