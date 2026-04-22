#!/usr/bin/env node
// STANDALONE UTILITY: Not part of the main build pipeline.
// Use for manual manifest regeneration only.
// The main build uses build-layers.mjs for manifest generation.
/**
 * @fileoverview Generate manifests from master HTML files
 * @module scripts/gen-manifest
 * @version 1.0.0
 *
 * @description
 * Parses master HTML files (src/master/part_*.html) and generates
 * per-layer manifest.json files according to the layer-config.json schema.
 *
 * Usage:
 *   node scripts/gen-manifest.mjs
 */

import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MASTER_DIR = join(ROOT, 'src', 'master');
const BUILD_DIR = join(ROOT, 'build');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

function log(level, message) {
  const timestamp = new Date().toISOString();
  const prefix = level === 'ERROR' ? '❌' : level === 'WARN' ? '⚠️' : '✓';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

// ============================================================================
// PARSE MASTER HTML
// ============================================================================

/**
 * Extract section information from a master HTML file.
 * Returns array of { data-layer, data-section, title } objects.
 */
async function parseMasterFile(filepath) {
  const content = await readFile(filepath, 'utf-8');
  const sections = [];

  // Regex to find sections with data-layer and data-section attributes
  const sectionRegex = /<section[^>]*data-layer=["']([^"']+)["'][^>]*data-section=["']([^"']+)["'][^>]*>/gi;

  let match;
  while ((match = sectionRegex.exec(content)) !== null) {
    const layer = match[1];
    const sectionId = match[2];

    // Try to extract title from following h3/h4 element
    const afterSection = content.slice(match.index + match[0].length);
    const titleMatch = afterSection.match(/<(h[3-4])[^>]*>([^<]+)</i);
    const title = titleMatch ? titleMatch[2].trim() : sectionId;

    sections.push({
      layer,
      sectionId,
      title
    });
  }

  return sections;
}

/**
 * Parse all master files and organize by layer.
 */
async function parseAllMasterFiles() {
  if (!existsSync(MASTER_DIR)) {
    log('WARN', `Master directory not found: ${MASTER_DIR}`);
    return { l1: [], l2: [], l3: [] };
  }

  const files = await readdir(MASTER_DIR);
  const partFiles = files.filter(f => f.startsWith('part_') && f.endsWith('.html'));

  const result = {
    l1: [],
    l2: [],
    l3: []
  };

  for (const file of partFiles) {
    const filepath = join(MASTER_DIR, file);
    const sections = await parseMasterFile(filepath);

    // Extract part number from filename (part_01_anchors.html → 01)
    const partMatch = file.match(/part_(\d+)/);
    const partNum = partMatch ? partMatch[1] : '??';

    // Extract title from first h1 or use filename
    const content = await readFile(filepath, 'utf-8');
    const h1Match = content.match(/<h1[^>]*>([^<]+)</i);
    const partTitle = h1Match ? h1Match[1].trim() : file.replace('.html', '');

    // Get unique layers present in this file
    const layersPresent = new Set(sections.map(s => s.layer));

    // Add to appropriate layer arrays
    if (layersPresent.has('l1')) {
      result.l1.push({
        file: `part_${partNum}.html`,
        title: partTitle,
        anchors: sections.filter(s => s.layer === 'l1').map(s => s.sectionId)
      });
    }

    if (layersPresent.has('l2')) {
      result.l2.push({
        file: `part_${partNum}.html`,
        title: partTitle,
        anchors: sections.filter(s => ['l1', 'l2'].includes(s.layer)).map(s => s.sectionId)
      });
    }

    if (layersPresent.has('l3')) {
      result.l3.push({
        file: `part_${partNum}.html`,
        title: partTitle,
        anchors: sections.map(s => s.sectionId)
      });
    }
  }

  // Sort by part number
  const sortByPartNum = (a, b) => {
    const numA = parseInt(a.file.match(/part_(\d+)/)?.[1] || '0');
    const numB = parseInt(b.file.match(/part_(\d+)/)?.[1] || '0');
    return numA - numB;
  };

  result.l1.sort(sortByPartNum);
  result.l2.sort(sortByPartNum);
  result.l3.sort(sortByPartNum);

  return result;
}

// ============================================================================
// LOAD LAYER CONFIG
// ============================================================================

async function loadLayerConfig() {
  const configPath = join(BUILD_DIR, 'layer-config.json');
  if (!existsSync(configPath)) {
    log('ERROR', `Layer config not found: ${configPath}`);
    throw new Error('Layer config not found. Run Stage 0a first.');
  }

  const content = await readFile(configPath, 'utf-8');
  return JSON.parse(content);
}

// ============================================================================
// GENERATE MANIFESTS
// ============================================================================

async function generateManifests() {
  log('INFO', 'Starting manifest generation...');

  // Ensure build directory exists
  await ensureDir(BUILD_DIR);
  await ensureDir(join(BUILD_DIR, 'parts-l1'));
  await ensureDir(join(BUILD_DIR, 'parts-l2'));
  await ensureDir(join(BUILD_DIR, 'parts-l3'));

  // Load layer config
  const layerConfig = await loadLayerConfig();
  const layerMap = {};
  for (const layer of layerConfig.layers) {
    layerMap[layer.id] = layer;
  }

  // Parse master files
  const parsed = await parseMasterFiles();

  // Generate per-layer manifests
  const manifestTemplates = [
    { layerId: 1, key: 'l1', inherits: null },
    { layerId: 2, key: 'l2', inherits: 'parts-l1' },
    { layerId: 3, key: 'l3', inherits: 'parts-l2' }
  ];

  for (const template of manifestTemplates) {
    const layer = layerMap[template.layerId];
    const manifest = {
      layer: template.layerId,
      name: layer.name,
      label: layer.label,
      description: layer.description,
      token_budget: layer.token_budget,
      color: layer.color
    };

    if (template.inherits) {
      manifest.inherits = template.inherits;
    }

    manifest.parts = parsed[template.key];

    // Add footer
    manifest.parts.push({
      file: 'footer.html',
      title: 'Footer',
      anchors: []
    });

    // Write manifest
    const manifestPath = join(BUILD_DIR, `parts-l${template.layerId}`, 'manifest.json');
    await ensureDir(dirname(manifestPath));
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    log('INFO', `Generated: build/parts-l${template.layerId}/manifest.json (${manifest.parts.length} parts)`);
  }

  // Generate top-level manifest
  const topLevelManifest = {
    version: layerConfig.version,
    layers: layerConfig.layers.map(l => ({
      id: l.id,
      name: l.name,
      label: l.label,
      color: l.color,
      description: l.description,
      manifest: `parts-l${l.id}/manifest.json`
    }))
  };

  await writeFile(join(BUILD_DIR, 'manifest.json'), JSON.stringify(topLevelManifest, null, 2));
  log('INFO', 'Generated: build/manifest.json');

  log('INFO', 'Manifest generation complete!');
}

// ============================================================================
// ENTRY POINT
// ============================================================================

generateManifests()
  .then(() => {
    console.log('\n============================================');
    console.log('MANIFEST GENERATION SUCCESSFUL');
    console.log('============================================');
    process.exit(0);
  })
  .catch(err => {
    log('ERROR', `Generation failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  });
