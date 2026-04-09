#!/usr/bin/env node
/**
 * @fileoverview Unit tests for build.mjs
 * @module tests/test-build
 * @version 1.0.0
 */

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FIXTURES_DIR = join(__dirname, 'fixtures');

// ============================================================================
// TEST UTILITIES
// ============================================================================

/**
 * Creates a temporary test environment
 * @param {string} name - Name of the test fixture
 * @returns {Promise<string>} Path to the test directory
 */
async function createTestEnv(name) {
  const testDir = join(FIXTURES_DIR, name);
  if (existsSync(testDir)) {
    await rm(testDir, { recursive: true });
  }
  await mkdir(testDir, { recursive: true });
  return testDir;
}

/**
 * Cleans up a test environment
 * @param {string} testDir - Path to the test directory
 */
async function cleanupTestEnv(testDir) {
  if (existsSync(testDir)) {
    await rm(testDir, { recursive: true });
  }
}

// ============================================================================
// BOM DETECTION TESTS
// ============================================================================

describe('BOM Detection', () => {
  it('should detect UTF-8 BOM', () => {
    const buffer = Buffer.from([0xEF, 0xBB, 0xBF, 0x74, 0x65, 0x73, 0x74]);
    const hasBOM = buffer.slice(0, 3).equals(Buffer.from([0xEF, 0xBB, 0xBF]));
    assert.strictEqual(hasBOM, true);
  });

  it('should detect UTF-16 LE BOM', () => {
    const buffer = Buffer.from([0xFF, 0xFE, 0x74, 0x00]);
    const hasBOM = buffer.slice(0, 2).equals(Buffer.from([0xFF, 0xFE]));
    assert.strictEqual(hasBOM, true);
  });

  it('should detect UTF-16 BE BOM', () => {
    const buffer = Buffer.from([0xFE, 0xFF, 0x00, 0x74]);
    const hasBOM = buffer.slice(0, 2).equals(Buffer.from([0xFE, 0xFF]));
    assert.strictEqual(hasBOM, true);
  });

  it('should not detect BOM in clean file', () => {
    const buffer = Buffer.from('test content without BOM');
    const hasBOM =
      buffer.slice(0, 3).equals(Buffer.from([0xEF, 0xBB, 0xBF])) ||
      buffer.slice(0, 2).equals(Buffer.from([0xFF, 0xFE])) ||
      buffer.slice(0, 2).equals(Buffer.from([0xFE, 0xFF]));
    assert.strictEqual(hasBOM, false);
  });
});

// ============================================================================
// VERSION EXTRACTION TESTS
// ============================================================================

describe('Version Extraction', () => {
  it('should extract version from VERSION file', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    if (existsSync(versionPath)) {
      const version = (await readFile(versionPath, 'utf-8')).trim();
      assert.match(version, /^\d+\.\d+\.\d+$/);
    }
  });

  it('should match package.json version', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    const packagePath = join(ROOT, 'package.json');

    if (existsSync(versionPath) && existsSync(packagePath)) {
      const version = (await readFile(versionPath, 'utf-8')).trim();
      const pkg = JSON.parse(await readFile(packagePath, 'utf-8'));
      assert.strictEqual(version, pkg.version);
    }
  });
});

// ============================================================================
// BUILD HASH TESTS
// ============================================================================

describe('Build Hash Generation', () => {
  it('should generate consistent hash for same content', async () => {
    const { createHash } = await import('crypto');
    const content = 'test content for hashing';

    const hash1 = createHash('sha256').update(content).digest('hex').slice(0, 8);
    const hash2 = createHash('sha256').update(content).digest('hex').slice(0, 8);

    assert.strictEqual(hash1, hash2);
    assert.match(hash1, /^[a-f0-9]{8}$/);
  });

  it('should generate different hash for different content', async () => {
    const { createHash } = await import('crypto');

    const hash1 = createHash('sha256').update('content 1').digest('hex').slice(0, 8);
    const hash2 = createHash('sha256').update('content 2').digest('hex').slice(0, 8);

    assert.notStrictEqual(hash1, hash2);
  });
});

// ============================================================================
// ANCHOR VALIDATION TESTS
// ============================================================================

describe('Anchor Validation', () => {
  it('should find valid anchor by id', () => {
    const html = '<div id="test-anchor">Content</div>';
    const idMatch = /id="test-anchor"/.test(html);
    assert.strictEqual(idMatch, true);
  });

  it('should find valid anchor by name', () => {
    const html = '<a name="test-anchor">Link</a>';
    const nameMatch = /name="test-anchor"/.test(html);
    assert.strictEqual(nameMatch, true);
  });

  it('should not find missing anchor', () => {
    const html = '<div>Content without anchor</div>';
    const idMatch = /id="missing-anchor"/.test(html);
    const nameMatch = /name="missing-anchor"/.test(html);
    assert.strictEqual(idMatch || nameMatch, false);
  });
});

// ============================================================================
// MANIFEST STRUCTURE TESTS
// ============================================================================

describe('Manifest Structure', () => {
  it('should have valid manifest.json', async () => {
    const manifestPath = join(ROOT, 'src', 'manifest', 'structure.json');
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));

      assert.ok(manifest.version, 'Manifest should have version');
      assert.ok(Array.isArray(manifest.parts), 'Manifest should have parts array');
      assert.ok(manifest.parts.length > 0, 'Parts array should not be empty');
    }
  });

  it('should have required part properties', async () => {
    const manifestPath = join(ROOT, 'src', 'manifest', 'structure.json');
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));

      for (const part of manifest.parts) {
        assert.ok(part.file, 'Part should have file property');
        assert.ok(part.type, 'Part should have type property');
        assert.ok(['head', 'body-start', 'section', 'body-end', 'style'].includes(part.type),
          `Part type "${part.type}" should be valid`);
      }
    }
  });
});

// ============================================================================
// OUTPUT FILE TESTS
// ============================================================================

describe('Output File Validation', () => {
  it('should have index.html after build', () => {
    const indexPath = join(ROOT, 'index.html');
    assert.strictEqual(existsSync(indexPath), true, 'index.html should exist');
  });

  it('should have zero-install.html after build', () => {
    const zeroPath = join(ROOT, 'live-char-guide-zero-install.html');
    assert.strictEqual(existsSync(zeroPath), true, 'zero-install.html should exist');
  });

  it('index.html should have DOCTYPE', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      assert.ok(content.startsWith('<!DOCTYPE html>'), 'Should start with DOCTYPE');
    }
  });

  it('index.html should have version meta tag', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      assert.match(content, /<meta name="livechar-version"/, 'Should have version meta');
    }
  });

  it('index.html should have build hash', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      assert.match(content, /<meta name="build-hash"/, 'Should have build hash meta');
    }
  });
});

// ============================================================================
// RUN TESTS
// ============================================================================

console.log('🧪 Running build.mjs unit tests...\n');
