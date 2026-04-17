#!/usr/bin/env node
/**
 * @fileoverview Unit tests for validate-artifact.mjs
 * @module tests/test-validate-artifact
 * @version 2.0.0
 * 
 * @description
 * Tests for shell architecture artifact validation
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

  it('dist/index.html should be within size limits', async () => {
    const indexPath = join(ROOT, 'dist', 'index.html');
    if (existsSync(indexPath)) {
      const stats = await stat(indexPath);
      const sizeKB = stats.size / 1024;

      assert.ok(sizeKB >= LIMITS.shellMinKB,
        `dist/index.html too small: ${sizeKB.toFixed(1)} KB (min: ${LIMITS.shellMinKB} KB)`);
      assert.ok(sizeKB <= LIMITS.indexMaxKB,
        `dist/index.html too large: ${sizeKB.toFixed(1)} KB (max: ${LIMITS.indexMaxKB} KB)`);
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
  it('dist/index.html should contain version metadata', async () => {
    const indexPath = join(ROOT, 'dist', 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      const hasVersionMeta = /<meta name="livechar-version" content="[^"]+"/.test(content);
      const hasVersionComment = /<!-- Version: [\d.]+ -->/.test(content);

      assert.ok(hasVersionMeta || hasVersionComment,
        'dist/index.html should contain version metadata');
    }
  });

  it('version should match VERSION file', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    const indexPath = join(ROOT, 'dist', 'index.html');

    if (existsSync(versionPath) && existsSync(indexPath)) {
      const expectedVersion = (await readFile(versionPath, 'utf-8')).trim();
      const content = await readFile(indexPath, 'utf-8');

      const versionMatch = content.match(/<meta name="livechar-version" content="([^"]+)"/);
      if (versionMatch) {
        assert.strictEqual(versionMatch[1], expectedVersion,
          'dist/index.html version should match VERSION file');
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
    { pattern: /id="layer-modal"|class="layer-modal"/i, name: 'Layer selector' },
    { pattern: /lazy-loader\.js/i, name: 'Lazy loader script' }
  ];

  it('dist/index.html should have all required shell elements', async () => {
    const indexPath = join(ROOT, 'dist', 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');

      for (const element of requiredShellElements) {
        assert.ok(element.pattern.test(content),
          `dist/index.html should have ${element.name}`);
      }
    }
  });
});

// ============================================================================
// HTML VALIDITY CHECK TESTS
// ============================================================================

describe('HTML Validity Check', () => {
  it('dist/index.html should have valid DOCTYPE', async () => {
    const indexPath = join(ROOT, 'dist', 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      assert.ok(content.startsWith('<!DOCTYPE html>'),
        'dist/index.html should start with <!DOCTYPE html>');
    }
  });

  it('dist/index.html should have required HTML structure', async () => {
    const indexPath = join(ROOT, 'dist', 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');

      assert.match(content, /<html[^>]*>/, 'Should have <html> tag');
      assert.match(content, /<head[^>]*>/, 'Should have <head> tag');
      assert.match(content, /<body[^>]*>/, 'Should have <body> tag');
      assert.match(content, /<\/html>/, 'Should have closing </html> tag');
    }
  });

  it('dist/index.html should not have replacement characters', async () => {
    const indexPath = join(ROOT, 'dist', 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      assert.ok(!content.includes('\uFFFD'),
        'dist/index.html should not have replacement characters (encoding issues)');
    }
  });
});

// ============================================================================
// SHELL ARCHITECTURE TESTS
// ============================================================================

describe('Shell Architecture', () => {
  it('should have lazy-loader.js', () => {
    const lazyLoader = join(ROOT, 'dist', 'assets', 'lazy-loader.js');
    assert.strictEqual(existsSync(lazyLoader), true, 'dist/assets/lazy-loader.js should exist');
  });

  it('should have shell-styles.css', () => {
    const styles = join(ROOT, 'dist', 'assets', 'shell-styles.css');
    assert.strictEqual(existsSync(styles), true, 'dist/assets/shell-styles.css should exist');
  });

  it('should have parts-l1 directory', () => {
    const partsDir = join(ROOT, 'dist', 'parts-l1');
    assert.strictEqual(existsSync(partsDir), true, 'dist/parts-l1/ should exist');
  });

  it('should have parts-l2 directory', () => {
    const partsDir = join(ROOT, 'dist', 'parts-l2');
    assert.strictEqual(existsSync(partsDir), true, 'dist/parts-l2/ should exist');
  });

  it('should have parts-l3 directory', () => {
    const partsDir = join(ROOT, 'dist', 'parts-l3');
    assert.strictEqual(existsSync(partsDir), true, 'dist/parts-l3/ should exist');
  });
});

// ============================================================================
// RUN TESTS
// ============================================================================

console.log('🧪 Running validate-artifact.mjs unit tests (shell architecture)...\n');
