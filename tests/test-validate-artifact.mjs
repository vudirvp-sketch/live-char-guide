#!/usr/bin/env node
/**
 * @fileoverview Unit tests for validate-artifact.mjs
 * @module tests/test-validate-artifact
 * @version 1.0.0
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
    indexMaxKB: 400,
    zeroInstallMaxKB: 600,
    minKB: 50
  };

  it('index.html should be within size limits', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const stats = await stat(indexPath);
      const sizeKB = stats.size / 1024;

      assert.ok(sizeKB >= LIMITS.minKB,
        `index.html too small: ${sizeKB.toFixed(1)} KB (min: ${LIMITS.minKB} KB)`);
      assert.ok(sizeKB <= LIMITS.indexMaxKB,
        `index.html too large: ${sizeKB.toFixed(1)} KB (max: ${LIMITS.indexMaxKB} KB)`);
    }
  });

  it('zero-install.html should be within size limits', async () => {
    const zeroPath = join(ROOT, 'live-char-guide-zero-install.html');
    if (existsSync(zeroPath)) {
      const stats = await stat(zeroPath);
      const sizeKB = stats.size / 1024;

      assert.ok(sizeKB >= LIMITS.minKB,
        `zero-install.html too small: ${sizeKB.toFixed(1)} KB (min: ${LIMITS.minKB} KB)`);
      assert.ok(sizeKB <= LIMITS.zeroInstallMaxKB,
        `zero-install.html too large: ${sizeKB.toFixed(1)} KB (max: ${LIMITS.zeroInstallMaxKB} KB)`);
    }
  });
});

// ============================================================================
// VERSION PRESENCE CHECK TESTS
// ============================================================================

describe('Version Presence Check', () => {
  it('index.html should contain version metadata', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      const hasVersionMeta = /<meta name="livechar-version" content="[^"]+"/.test(content);
      const hasVersionComment = /<!-- Version: [\d.]+ -->/.test(content);

      assert.ok(hasVersionMeta || hasVersionComment,
        'index.html should contain version metadata');
    }
  });

  it('zero-install.html should contain version metadata', async () => {
    const zeroPath = join(ROOT, 'live-char-guide-zero-install.html');
    if (existsSync(zeroPath)) {
      const content = await readFile(zeroPath, 'utf-8');
      const hasVersionMeta = /<meta name="livechar-version" content="[^"]+"/.test(content);
      const hasVersionComment = /<!-- Version: [\d.]+ -->/.test(content);

      assert.ok(hasVersionMeta || hasVersionComment,
        'zero-install.html should contain version metadata');
    }
  });

  it('version should match VERSION file', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    const indexPath = join(ROOT, 'index.html');

    if (existsSync(versionPath) && existsSync(indexPath)) {
      const expectedVersion = (await readFile(versionPath, 'utf-8')).trim();
      const content = await readFile(indexPath, 'utf-8');

      const versionMatch = content.match(/<meta name="livechar-version" content="([^"]+)"/);
      if (versionMatch) {
        assert.strictEqual(versionMatch[1], expectedVersion,
          'index.html version should match VERSION file');
      }
    }
  });
});

// ============================================================================
// REQUIRED SECTIONS CHECK TESTS
// ============================================================================

describe('Required Sections Check', () => {
  const requiredSections = [
    { pattern: /id="quick-start"|id="quickstart"/i, name: 'Quick Start' },
    { pattern: /id="architecture"/i, name: 'Architecture' },
    { pattern: /id="anchor"|id="anchors"/i, name: 'Anchors' }
  ];

  it('index.html should have all required sections', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');

      for (const section of requiredSections) {
        assert.ok(section.pattern.test(content),
          `index.html should have ${section.name} section`);
      }
    }
  });

  it('zero-install.html should have all required sections', async () => {
    const zeroPath = join(ROOT, 'live-char-guide-zero-install.html');
    if (existsSync(zeroPath)) {
      const content = await readFile(zeroPath, 'utf-8');

      for (const section of requiredSections) {
        assert.ok(section.pattern.test(content),
          `zero-install.html should have ${section.name} section`);
      }
    }
  });
});

// ============================================================================
// NO EXTERNAL REFS CHECK TESTS
// ============================================================================

describe('No External References Check', () => {
  it('zero-install.html should not have Google Fonts imports', async () => {
    const zeroPath = join(ROOT, 'live-char-guide-zero-install.html');
    if (existsSync(zeroPath)) {
      const content = await readFile(zeroPath, 'utf-8');
      const hasGoogleFonts = /@import\s+url\(['"]https:\/\/fonts\.googleapis\.com/i.test(content);

      assert.strictEqual(hasGoogleFonts, false,
        'zero-install.html should not have Google Fonts imports');
    }
  });

  it('zero-install.html should not have external JS references', async () => {
    const zeroPath = join(ROOT, 'live-char-guide-zero-install.html');
    if (existsSync(zeroPath)) {
      const content = await readFile(zeroPath, 'utf-8');
      const externalJs = /src=["']https?:\/\/[^"']+\.js/.test(content);

      assert.strictEqual(externalJs, false,
        'zero-install.html should not have external JS references');
    }
  });
});

// ============================================================================
// HTML VALIDITY CHECK TESTS
// ============================================================================

describe('HTML Validity Check', () => {
  it('index.html should have valid DOCTYPE', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      assert.ok(content.startsWith('<!DOCTYPE html>'),
        'index.html should start with <!DOCTYPE html>');
    }
  });

  it('zero-install.html should have valid DOCTYPE', async () => {
    const zeroPath = join(ROOT, 'live-char-guide-zero-install.html');
    if (existsSync(zeroPath)) {
      const content = await readFile(zeroPath, 'utf-8');
      assert.ok(content.startsWith('<!DOCTYPE html>'),
        'zero-install.html should start with <!DOCTYPE html>');
    }
  });

  it('index.html should have required HTML structure', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');

      assert.match(content, /<html[^>]*>/, 'Should have <html> tag');
      assert.match(content, /<head[^>]*>/, 'Should have <head> tag');
      assert.match(content, /<body[^>]*>/, 'Should have <body> tag');
      assert.match(content, /<\/html>/, 'Should have closing </html> tag');
    }
  });

  it('index.html should not have replacement characters', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      assert.ok(!content.includes('\uFFFD'),
        'index.html should not have replacement characters (encoding issues)');
    }
  });
});

// ============================================================================
// RUN TESTS
// ============================================================================

console.log('🧪 Running validate-artifact.mjs unit tests...\n');
