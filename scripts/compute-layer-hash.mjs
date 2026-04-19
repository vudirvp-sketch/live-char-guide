#!/usr/bin/env node
/**
 * @fileoverview Compute Layer Hash for cross-phase integrity checks
 * @module scripts/compute-layer-hash
 * @version 1.0.0
 *
 * @description
 * Computes SHA-256 hash of each assembled layer's text content.
 * Used for cross-phase integrity checks (see §5.5 of the plan).
 *
 * The hash ensures that content written in one phase remains
 * unchanged in subsequent phases.
 *
 * Usage:
 *   node scripts/compute-layer-hash.mjs [layer]
 *   node scripts/compute-layer-hash.mjs 1
 *   node scripts/compute-layer-hash.mjs --all
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BUILD_DIR = join(ROOT, 'build');

// ============================================================================
// HASH COMPUTATION
// ============================================================================

/**
 * Compute SHA-256 hash of text content.
 * Normalizes whitespace for consistent hashing.
 */
function computeHash(content) {
  // Normalize: remove trailing whitespace, normalize line endings
  const normalized = content
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .trim();

  return createHash('sha256')
    .update(normalized, 'utf-8')
    .digest('hex');
}

/**
 * Compute hash for a single layer by combining all HTML files.
 */
async function computeLayerHash(layer) {
  const layerDir = join(BUILD_DIR, `parts-l${layer}`);

  if (!existsSync(layerDir)) {
    throw new Error(`Layer ${layer} not found: ${layerDir}`);
  }

  const files = await readdir(layerDir);
  const htmlFiles = files.filter(f => f.endsWith('.html')).sort();

  let combinedContent = '';

  for (const file of htmlFiles) {
    const filepath = join(layerDir, file);
    const content = await readFile(filepath, 'utf-8');
    combinedContent += `<!-- FILE: ${file} -->\n${content}\n`;
  }

  const hash = computeHash(combinedContent);
  const shortHash = hash.slice(0, 16);

  // Write hash file
  await writeFile(join(layerDir, '.hash'), shortHash);

  return {
    layer,
    hash: shortHash,
    fullHash: hash,
    files: htmlFiles.length,
    size: combinedContent.length
  };
}

/**
 * Compute hashes for all layers.
 */
async function computeAllHashes() {
  const results = [];

  for (const layer of [1, 2, 3]) {
    try {
      const result = await computeLayerHash(layer);
      results.push(result);
    } catch (err) {
      console.log(`⚠️  Layer ${layer}: ${err.message}`);
    }
  }

  // Write combined hash file
  const combined = results.map(r => `L${r.layer}:${r.hash}`).join('|');
  const combinedHash = computeHash(combined);

  await writeFile(join(BUILD_DIR, 'layers.hash'), combinedHash);

  return { results, combined: combinedHash };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const targetLayer = args.find(a => !a.startsWith('--'));
  const all = args.includes('--all');

  console.log('=== Computing Layer Hashes ===\n');

  if (!existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Run build-layers.mjs first.');
    process.exit(1);
  }

  if (targetLayer) {
    // Compute single layer
    const layer = parseInt(targetLayer);
    if (isNaN(layer) || layer < 1 || layer > 3) {
      console.error('❌ Invalid layer. Must be 1, 2, or 3.');
      process.exit(1);
    }

    const result = await computeLayerHash(layer);
    console.log(`Layer ${layer}:`);
    console.log(`  Hash: ${result.hash}`);
    console.log(`  Files: ${result.files}`);
    console.log(`  Size: ${result.size} bytes`);
  } else {
    // Compute all layers
    const { results, combined } = await computeAllHashes();

    console.log('Layer Hashes:');
    console.log('─────────────────────────────');

    for (const r of results) {
      console.log(`L${r.layer}: ${r.hash} (${r.files} files, ${r.size} chars)`);
    }

    console.log('─────────────────────────────');
    console.log(`Combined: ${combined.slice(0, 16)}`);
  }

  console.log('\n✓ Hash computation complete.');
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  });
