#!/usr/bin/env node
/**
 * @fileoverview Integration tests for full build pipeline
 * @module tests/integration/test-full-build
 * @version 1.0.0
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

// ============================================================================
// CLEAN SOURCE TO ARTIFACT TESTS
// ============================================================================

describe('Clean Source to Artifact Build', () => {
  it('should have source files present', () => {
    const srcDir = join(ROOT, 'src');
    assert.strictEqual(existsSync(srcDir), true, 'src/ directory should exist');

    const partsDir = join(ROOT, 'src', 'parts');
    assert.strictEqual(existsSync(partsDir), true, 'src/parts/ directory should exist');
  });

  it('should have manifest file', () => {
    const manifestPath = join(ROOT, 'src', 'manifest', 'structure.json');
    assert.strictEqual(existsSync(manifestPath), true, 'manifest should exist');
  });

  it('should generate valid index.html', async () => {
    const indexPath = join(ROOT, 'index.html');
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');

      assert.ok(content.startsWith('<!DOCTYPE html>'), 'Should have DOCTYPE');
      assert.ok(content.includes('<html'), 'Should have html tag');
      assert.ok(content.includes('</html>'), 'Should close html tag');
    }
  });

  it('should generate valid zero-install.html', async () => {
    const zeroPath = join(ROOT, 'live-char-guide-zero-install.html');
    if (existsSync(zeroPath)) {
      const content = await readFile(zeroPath, 'utf-8');

      assert.ok(content.startsWith('<!DOCTYPE html>'), 'Should have DOCTYPE');
      assert.ok(content.includes('<html'), 'Should have html tag');
    }
  });
});

// ============================================================================
// BUILD HASH CONSISTENCY TESTS
// ============================================================================

describe('Build Hash Consistency', () => {
  it('should have build.hash file', () => {
    const hashPath = join(ROOT, 'build.hash');
    assert.strictEqual(existsSync(hashPath), true, 'build.hash should exist');
  });

  it('should have build-zero-install.hash file', () => {
    const hashPath = join(ROOT, 'build-zero-install.hash');
    assert.strictEqual(existsSync(hashPath), true, 'build-zero-install.hash should exist');
  });

  it('build.hash should match index.html meta', async () => {
    const hashPath = join(ROOT, 'build.hash');
    const indexPath = join(ROOT, 'index.html');

    if (existsSync(hashPath) && existsSync(indexPath)) {
      const hash = (await readFile(hashPath, 'utf-8')).trim();
      const content = await readFile(indexPath, 'utf-8');

      assert.ok(content.includes(`content="${hash}"`),
        'index.html should contain matching build hash');
    }
  });
});

// ============================================================================
// VALIDATION INTEGRATION TESTS
// ============================================================================

describe('Validation Integration', () => {
  it('validate script should pass', () => {
    try {
      execSync('node scripts/validate-artifact.mjs', {
        cwd: ROOT,
        stdio: 'pipe',
        timeout: 30000
      });
    } catch (error) {
      // If validation fails, we still want to know what went wrong
      assert.fail(`Validation failed: ${error.stdout?.toString() || error.message}`);
    }
  });
});

// ============================================================================
// VERSION SYNC INTEGRATION TESTS
// ============================================================================

describe('Version Sync Integration', () => {
  it('all versions should be synchronized', async () => {
    const versionPath = join(ROOT, 'src', 'VERSION');
    const packagePath = join(ROOT, 'package.json');
    const indexPath = join(ROOT, 'index.html');

    if (!existsSync(versionPath)) {
      return; // Skip if no VERSION file
    }

    const expectedVersion = (await readFile(versionPath, 'utf-8')).trim();

    // Check package.json
    if (existsSync(packagePath)) {
      const pkg = JSON.parse(await readFile(packagePath, 'utf-8'));
      assert.strictEqual(pkg.version, expectedVersion, 'package.json version mismatch');
    }

    // Check index.html
    if (existsSync(indexPath)) {
      const content = await readFile(indexPath, 'utf-8');
      const match = content.match(/<meta name="livechar-version" content="([^"]+)"/);
      if (match) {
        assert.strictEqual(match[1], expectedVersion, 'index.html version mismatch');
      }
    }
  });
});

// ============================================================================
// RUN TESTS
// ============================================================================

console.log('Running full build integration tests...\n');
