#!/usr/bin/env node
/**
 * @fileoverview Unit tests for version-sync.mjs
 * @module tests/test-version-sync
 * @version 2.0.0
 * 
 * @description
 * Tests for version synchronization in shell architecture
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ============================================================================
// VERSION EXTRACTION TESTS
// ============================================================================

describe('Version Extraction', () => {
  it('should extract version from src/VERSION', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    if (existsSync(versionPath)) {
      const version = (await readFile(versionPath, 'utf-8')).trim();
      assert.match(version, /^\d+\.\d+\.\d+$/, 'VERSION should be semantic version');
    }
  });

  it('should extract version from package.json', async () => {
    const packagePath = join(ROOT, 'package.json');
    if (existsSync(packagePath)) {
      const pkg = JSON.parse(await readFile(packagePath, 'utf-8'));
      assert.match(pkg.version, /^\d+\.\d+\.\d+$/, 'package.json version should be semantic');
    }
  });

  it('should extract version from dist/index.html meta tag', async () => {
    const indexPath = join(ROOT, 'dist', 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      const match = content.match(/<meta name="livechar-version" content="([^"]+)"/);
      if (match) {
        assert.match(match[1], /^\d+\.\d+\.\d+$/, 'HTML version should be semantic');
      }
    }
  });
});

// ============================================================================
// SYNC STATE DETECTION TESTS
// ============================================================================

describe('Sync State Detection', () => {
  it('VERSION and package.json should be in sync', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    const packagePath = join(ROOT, 'package.json');

    if (existsSync(versionPath) && existsSync(packagePath)) {
      const version = (await readFile(versionPath, 'utf-8')).trim();
      const pkg = JSON.parse(await readFile(packagePath, 'utf-8'));

      assert.strictEqual(version, pkg.version,
        'VERSION and package.json should have same version');
    }
  });

  it('dist/index.html version should match VERSION file', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    const indexPath = join(ROOT, 'dist', 'index.html');

    if (existsSync(versionPath) && existsSync(indexPath)) {
      const expectedVersion = (await readFile(versionPath, 'utf-8')).trim();
      const content = await readFile(indexPath, 'utf-8');

      const match = content.match(/<meta name="livechar-version" content="([^"]+)"/);
      if (match) {
        assert.strictEqual(match[1], expectedVersion,
          'dist/index.html version should match VERSION file');
      }
    }
  });

  it('root index.html version should match VERSION file', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    const indexPath = join(ROOT, 'index.html');

    if (existsSync(versionPath) && existsSync(indexPath)) {
      const expectedVersion = (await readFile(versionPath, 'utf-8')).trim();
      const content = await readFile(indexPath, 'utf-8');

      const match = content.match(/<meta name="livechar-version" content="([^"]+)"/);
      if (match) {
        assert.strictEqual(match[1], expectedVersion,
          'root index.html version should match VERSION file');
      }
    }
  });
});

// ============================================================================
// SEMANTIC VERSION PARSING TESTS
// ============================================================================

describe('Semantic Version Parsing', () => {
  function parseVersion(version) {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!match) {
      throw new Error(`Invalid version format: ${version}`);
    }
    return {
      major: parseInt(match[1], 10),
      minor: parseInt(match[2], 10),
      patch: parseInt(match[3], 10)
    };
  }

  function compareVersions(v1, v2) {
    const p1 = parseVersion(v1);
    const p2 = parseVersion(v2);

    if (p1.major !== p2.major) return p1.major < p2.major ? -1 : 1;
    if (p1.minor !== p2.minor) return p1.minor < p2.minor ? -1 : 1;
    if (p1.patch !== p2.patch) return p1.patch < p2.patch ? -1 : 1;
    return 0;
  }

  it('should parse valid semantic versions', () => {
    const parsed = parseVersion('5.12.0');
    assert.deepStrictEqual(parsed, { major: 5, minor: 12, patch: 0 });
  });

  it('should compare versions correctly', () => {
    assert.strictEqual(compareVersions('1.0.0', '1.0.1'), -1);
    assert.strictEqual(compareVersions('1.0.1', '1.0.0'), 1);
    assert.strictEqual(compareVersions('1.0.0', '1.0.0'), 0);
    assert.strictEqual(compareVersions('2.0.0', '1.9.9'), 1);
    assert.strictEqual(compareVersions('1.2.0', '1.10.0'), -1);
  });

  it('should throw on invalid version format', () => {
    assert.throws(() => parseVersion('invalid'));
    assert.throws(() => parseVersion('1.2'));
    assert.throws(() => parseVersion('1.2.3.4'));
  });
});

// ============================================================================
// OUTDATED WARNING TESTS
// ============================================================================

describe('Outdated Detection', () => {
  it('should detect if artifact version is older than source', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    const indexPath = join(ROOT, 'dist', 'index.html');

    if (existsSync(versionPath) && existsSync(indexPath)) {
      const sourceVersion = (await readFile(versionPath, 'utf-8')).trim();
      const content = await readFile(indexPath, 'utf-8');

      const match = content.match(/<meta name="livechar-version" content="([^"]+)"/);
      if (match) {
        const artifactVersion = match[1];

        // Artifact version should equal source version (not older)
        assert.strictEqual(artifactVersion, sourceVersion,
          'Artifact should not be older than source');
      }
    }
  });
});

// ============================================================================
// RUN TESTS
// ============================================================================

console.log('🧪 Running version-sync.mjs unit tests (shell architecture)...\n');
