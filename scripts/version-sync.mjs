#!/usr/bin/env node
/**
 * @fileoverview Version Sync Checker for Live Char Guide
 * @module scripts/version-sync
 * @version 2.0.0
 * @author TITAN FUSE Team
 * @license MIT
 * 
 * @description
 * Detects drift between source version and artifact versions.
 * Compares version across:
 * - src/VERSION (source of truth)
 * - package.json
 * - dist/index.html meta tag (shell architecture)
 * 
 * Exit codes:
 * - 0: All versions in sync
 * - 1: Version drift detected (warning)
 * - 2: Error during check
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const VERSION_PATH = join(ROOT, 'src', 'VERSION');
const PACKAGE_PATH = join(ROOT, 'package.json');
const INDEX_PATH = join(ROOT, 'dist', 'index.html');

// ============================================================================
// VERSION EXTRACTION
// ============================================================================

/**
 * Extracts version string from HTML content
 * @param {string} content - HTML content to search
 * @param {string} name - Name of the file (for error reporting)
 * @returns {string|null} Version string or null if not found
 */
function extractVersionFromHtml(content, name) {
  // Try meta tag first
  const metaMatch = content.match(/<meta name="livechar-version" content="([^"]+)"/);
  if (metaMatch) {
    return metaMatch[1];
  }

  // Try comment format
  const commentMatch = content.match(/<!-- Version: ([\d.]+) -->/);
  if (commentMatch) {
    return commentMatch[1];
  }

  // Try build hash comment (less reliable)
  const hashMatch = content.match(/<!-- Build: ([a-f0-9]+) -->/);
  if (hashMatch) {
    return `hash:${hashMatch[1]}`;
  }

  return null;
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function checkVersionSync() {
  const versions = {};
  const errors = [];

  console.log('Checking version sync...\n');

  // 1. Read VERSION file
  if (existsSync(VERSION_PATH)) {
    const content = await readFile(VERSION_PATH, 'utf-8');
    versions.source = content.trim();
    console.log(`✓ src/VERSION: ${versions.source}`);
  } else {
    errors.push('src/VERSION file not found');
    versions.source = null;
    console.log('✗ src/VERSION: NOT FOUND');
  }

  // 2. Read package.json version
  if (existsSync(PACKAGE_PATH)) {
    try {
      const content = await readFile(PACKAGE_PATH, 'utf-8');
      const pkg = JSON.parse(content);
      versions.package = pkg.version;
      console.log(`✓ package.json: ${versions.package}`);
    } catch (e) {
      errors.push('Failed to parse package.json');
      versions.package = null;
      console.log('✗ package.json: PARSE ERROR');
    }
  } else {
    errors.push('package.json not found');
    versions.package = null;
    console.log('✗ package.json: NOT FOUND');
  }

  // 3. Extract version from dist/index.html (shell architecture)
  if (existsSync(INDEX_PATH)) {
    const content = await readFile(INDEX_PATH, 'utf-8');
    versions.index = extractVersionFromHtml(content, 'dist/index.html');
    if (versions.index) {
      console.log(`✓ dist/index.html: ${versions.index}`);
    } else {
      console.log('⚠ dist/index.html: No version found');
    }
  } else {
    console.log('⚠ dist/index.html: NOT FOUND (run build first)');
    versions.index = null;
  }

  // 4. Compare versions
  console.log('\n============================================');
  console.log('VERSION SYNC ANALYSIS');
  console.log('============================================');

  const nonNullVersions = Object.entries(versions)
    .filter(([_, v]) => v && !v.startsWith('hash:'))
    .map(([_, v]) => v);

  const uniqueVersions = [...new Set(nonNullVersions)];

  let status = 'sync';
  if (errors.length > 0) {
    status = 'error';
  } else if (uniqueVersions.length > 1) {
    status = 'outdated';
  }

  const result = {
    sourceVersion: versions.source,
    packageVersion: versions.package,
    indexVersion: versions.index,
    status,
    errors: errors.length > 0 ? errors : undefined
  };

  console.log(JSON.stringify(result, null, 2));

  // 5. Exit with appropriate code
  if (status === 'sync') {
    console.log('\n✓ All versions are in sync');
    process.exit(0);
  } else if (status === 'outdated') {
    console.log('\n⚠ Version drift detected');
    console.log('Run `pnpm run build:all` to sync versions');
    process.exit(1);
  } else {
    console.log('\n✗ Version check failed');
    process.exit(2);
  }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

checkVersionSync().catch(err => {
  console.error('Version sync check failed:', err.message);
  process.exit(2);
});
