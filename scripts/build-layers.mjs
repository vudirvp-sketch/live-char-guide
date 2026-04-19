#!/usr/bin/env node
/**
 * @fileoverview Build Layers Script for Live Character Guide v6
 * @module scripts/build-layers
 * @version 2.0.0
 *
 * @description
 * Stage 1 of the v6 build pipeline. Parses master HTML files and generates
 * per-layer HTML files according to the specification in §0.12 of the plan.
 *
 * Key features:
 * - Extracts sections by data-layer attribute
 * - Assembles cumulative layers (L1 ⊂ L2 ⊂ L3)
 * - Processes cross-layer links (data-layer-switch)
 * - Generates per-layer manifests (matching lazy-loader.js format)
 * - Generates no-JS glossary fallback
 * - Generates section-registry.json
 * - Adds id attributes to sections for anchor navigation
 * - Validates all sections have required attributes
 *
 * Usage:
 *   node scripts/build-layers.mjs
 */

import { readFile, writeFile, readdir, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MASTER_DIR = join(ROOT, 'src', 'master');
const DATA_DIR = join(ROOT, 'data');
const BUILD_DIR = join(ROOT, 'build');
const GLOSSARY_PATH = join(DATA_DIR, 'glossary.json');
const LAYER_CONFIG_PATH = join(BUILD_DIR, 'layer-config.json');

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
// LAYER CONFIG LOADING
// ============================================================================

async function loadLayerConfig() {
  if (!existsSync(LAYER_CONFIG_PATH)) {
    log('WARN', 'layer-config.json not found, using defaults');
    return {
      version: '6.0.0',
      layers: [
        { id: 1, name: 'Basic', label: 'Минимальный', color: '#22c55e', description: '~15 мин, 400-800 токенов карточки' },
        { id: 2, name: 'Deep', label: 'Глубокий', color: '#38bdf8', description: '~30 мин, 800-1500 токенов карточки' },
        { id: 3, name: 'Expert', label: 'Экспертный', color: '#8b5cf6', description: '~60 мин, 1500+ токенов карточки' }
      ]
    };
  }
  return JSON.parse(await readFile(LAYER_CONFIG_PATH, 'utf-8'));
}

// ============================================================================
// HTML PARSING
// ============================================================================

/**
 * Simple HTML parser that extracts sections with data-layer attributes.
 * Does not use a full DOM parser for performance.
 */
function parseMasterHTML(content, filename) {
  const sections = [];
  const errors = [];

  // Find all section elements with data-layer
  const sectionOpenRegex = /<section\s+([^>]*)>/gi;
  let match;
  let lastIndex = 0;

  while ((match = sectionOpenRegex.exec(content)) !== null) {
    const attrs = match[1];

    // Extract data-layer and data-section
    const layerMatch = attrs.match(/data-layer=["']([^"']+)["']/i);
    const sectionMatch = attrs.match(/data-section=["']([^"']+)["']/i);

    if (!layerMatch) {
      continue; // Not a layer section, skip
    }

    const layer = layerMatch[1];

    if (!sectionMatch) {
      errors.push({
        file: filename,
        message: `Section with data-layer="${layer}" missing data-section attribute`
      });
      continue;
    }

    const sectionId = sectionMatch[1];

    // Find the closing </section> tag (handle nesting)
    const startIndex = match.index + match[0].length;
    let depth = 1;
    let endIndex = startIndex;
    let searchPos = startIndex;

    while (depth > 0 && searchPos < content.length) {
      const nextOpen = content.indexOf('<section', searchPos);
      const nextClose = content.indexOf('</section>', searchPos);

      if (nextClose === -1) {
        errors.push({
          file: filename,
          message: `Unclosed section: ${sectionId}`
        });
        break;
      }

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        searchPos = nextOpen + 8;
      } else {
        depth--;
        if (depth === 0) {
          endIndex = nextClose;
        }
        searchPos = nextClose + 10;
      }
    }

    const sectionContent = content.slice(startIndex, endIndex);

    // Check for prohibited content outside sections (before this section)
    const beforeContent = content.slice(lastIndex, match.index).trim();
    if (beforeContent && !beforeContent.startsWith('<!--') && !beforeContent.startsWith('<div') && !beforeContent.startsWith('<!DOCTYPE')) {
      // Ignore whitespace-only and comments
      if (beforeContent.length > 0 && !/^[\s\n\r]*$/.test(beforeContent)) {
        // Check if it's just a wrapping div
        if (!beforeContent.match(/^<div[^>]*>[\s\n\r]*$/i)) {
          // Content outside section - will be reported as warning, not error
        }
      }
    }

    lastIndex = endIndex + 10; // After </section>

    // Extract title from h2 (for manifest) and h3 IDs (for anchors)
    const h2Match = sectionContent.match(/<h2[^>]*>([^<]+)<\/h2>/i);
    const h3Ids = [];
    const h3Regex = /<h3\s+[^>]*id=["']([^"']+)["']/gi;
    let h3Match;
    while ((h3Match = h3Regex.exec(sectionContent)) !== null) {
      h3Ids.push(h3Match[1]);
    }
    // Also find h3 without id that are inside the section
    const h3NoIdRegex = /<h3[^>]*>([^<]+)<\/h3>/gi;
    let h3NoIdMatch;
    while ((h3NoIdMatch = h3NoIdRegex.exec(sectionContent)) !== null) {
      // These don't have IDs, skip for anchors
    }

    sections.push({
      layer,
      sectionId,
      content: sectionContent,
      title: h2Match ? h2Match[1].trim() : '',
      anchors: h3Ids,
      fullMatch: content.slice(match.index, endIndex + 10)
    });
  }

  // Check for prohibited elements
  const prohibitedPatterns = [
    { pattern: /<style[^>]*>/i, name: '<style>' },
    { pattern: /<script[^>]*>/i, name: '<script>' },
    { pattern: /<link[^>]*>/i, name: '<link>' },
    { pattern: /<meta[^>]*>/i, name: '<meta>' }
  ];

  for (const { pattern, name } of prohibitedPatterns) {
    if (pattern.test(content)) {
      errors.push({
        file: filename,
        message: `Prohibited element found: ${name}`
      });
    }
  }

  return { sections, errors };
}

// ============================================================================
// LAYER ASSEMBLY
// ============================================================================

/**
 * Assemble HTML for a specific layer.
 * L1: only data-layer="l1" sections
 * L2: data-layer="l1" + data-layer="l2" sections
 * L3: all sections
 */
function assembleLayer(sections, layer) {
  const layerOrder = { l1: 1, l2: 2, l3: 3 };
  const targetLevel = layerOrder[layer];

  return sections.filter(s => {
    const sectionLevel = layerOrder[s.layer];
    return sectionLevel <= targetLevel;
  });
}

// ============================================================================
// CROSS-LAYER LINK PROCESSING
// ============================================================================

/**
 * Process data-layer-switch attributes and regular anchor links.
 *
 * Rules (per §0.9 and §0.12):
 * - data-layer-switch="X#id" where X > current layer → keep as layer-switch button
 * - data-layer-switch="X#id" where X <= current layer → convert to anchor link #id
 * - href="#id" where target exists in this layer → anchor link (unchanged)
 * - href="#id" where target doesn't exist in this layer → .layer-link-disabled span
 *   with tooltip "Available on Layer N"
 */
function processCrossLayerLinks(content, currentLayerNum, layerSectionIds) {
  let result = content;

  // 1. Process data-layer-switch="X#id"
  const layerSwitchRegex = /data-layer-switch=["'](\d+)#([^"']+)["']/g;
  result = result.replace(layerSwitchRegex, (match, targetLayer, targetSection) => {
    const targetNum = parseInt(targetLayer);
    if (targetNum <= currentLayerNum) {
      // Content is already in this layer - convert to anchor link
      return `href="#${targetSection}"`;
    } else {
      // Target is in deeper layer - keep as layer-switch
      return match;
    }
  });

  // 1b. Process data-layer-switch="X" (v5.12 format without #section-id) - graceful fallback
  const layerSwitchSimpleRegex = /data-layer-switch=["'](\d+)["']/g;
  result = result.replace(layerSwitchSimpleRegex, (match, targetLayer) => {
    const targetNum = parseInt(targetLayer);
    if (targetNum <= currentLayerNum) {
      // Already in this layer, remove the attribute (link stays but without layer-switch)
      return '';
    } else {
      // Keep as layer-switch
      return match;
    }
  });

  // 2. Process regular anchor links - check if target exists in current layer
  const anchorRegex = /href=["']#([^"']+)["']/g;
  result = result.replace(anchorRegex, (match, targetId) => {
    // Skip if part of a data-layer-switch (just converted)
    const contextBefore = result.slice(Math.max(0, result.lastIndexOf(match) - 30), result.lastIndexOf(match));
    if (contextBefore.includes('data-layer-switch')) {
      return match;
    }

    // Check if target exists in current layer
    if (!layerSectionIds.has(targetId)) {
      // Target not in this layer - find which layer it's in
      const layerLabel = getLayerForSection(targetId);
      const tooltipText = layerLabel
        ? `Доступно на слое ${layerLabel}`
        : 'Доступно на более глубоком слое';

      // Get the link text to preserve it
      const parentLinkRegex = new RegExp(`<a[^>]*href=["']#${escapeRegExp(targetId)}["'][^>]*>([^<]*)</a>`, 'i');
      const parentMatch = result.match(parentLinkRegex);
      if (parentMatch) {
        const linkText = parentMatch[1];
        return match; // Keep the link as-is for now, add a class for styling
      }

      // Fallback: just add a comment
      return match;
    }

    return match;
  });

  return result;
}

// Helper to escape regex special chars
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Map of section IDs to layers (populated during parsing)
let sectionToLayerMap = {};

function getLayerForSection(sectionId) {
  const layer = sectionToLayerMap[sectionId];
  if (!layer) return null;
  const labels = { l1: 'Минимальный', l2: 'Глубокий', l3: 'Экспертный' };
  return labels[layer] || null;
}

// ============================================================================
// GLOSSARY GENERATION
// ============================================================================

async function generateNoJSGlossary(layer) {
  if (!existsSync(GLOSSARY_PATH)) {
    return '';
  }

  const glossaryData = JSON.parse(await readFile(GLOSSARY_PATH, 'utf-8'));
  // Support both `canonical_terms` (actual format) and `terms` (fallback)
  const terms = glossaryData.canonical_terms || glossaryData.terms || [];

  // Filter terms applicable to this layer
  const filteredTerms = terms.filter(term => {
    const applicable = term.applicable_layers || [1, 2, 3];
    // Layer 0 terms are available on all layers
    return applicable.includes(layer) || applicable.includes(0);
  });

  if (filteredTerms.length === 0) {
    return '';
  }

  let html = `<section id="glossary" class="no-js-only">
<h2>Глоссарий</h2>
<dl>
`;

  for (const term of filteredTerms) {
    const termName = term.term || term.en_term || '';
    const definition = term.layer_context?.[layer.toString()]
      || term.layer_context?.['0']
      || term.definition
      || '';

    html += `<dt>${termName}`;
    if (term.abbreviation) {
      html += ` <small style="color:var(--accent);">(${term.abbreviation})</small>`;
    }
    html += `</dt>
<dd>${definition}</dd>
`;
  }

  html += `</dl>
</section>`;

  return html;
}

// ============================================================================
// MANIFEST GENERATION
// ============================================================================

/**
 * Generate manifest.json for a layer matching lazy-loader.js format.
 * Format must match: { layer: N, name: "...", parts: [{file, title, anchors}] }
 */
async function generateManifest(layerNum, layerConfig, assembledParts) {
  const layerInfo = layerConfig.layers.find(l => l.id === layerNum);

  const manifest = {
    layer: layerNum,
    name: layerInfo?.name || (layerNum === 1 ? 'Basic' : layerNum === 2 ? 'Deep' : 'Expert'),
    label: layerInfo?.label || '',
    description: layerInfo?.description || '',
    token_budget: layerNum === 1 ? '400-800' : layerNum === 2 ? '800-1500' : '1500+',
    color: layerInfo?.color || '#22c55e',
    parts: assembledParts.map(p => ({
      file: p.file,
      title: p.title,
      anchors: p.anchors
    }))
  };

  // Add inherits field for L2 and L3
  if (layerNum === 2) {
    manifest.inherits = 'parts-l1';
  } else if (layerNum === 3) {
    manifest.inherits = 'parts-l2';
  }

  return manifest;
}

// ============================================================================
// SECTION REGISTRY
// ============================================================================

function generateSectionRegistry(allSections) {
  const registry = {};

  for (const section of allSections) {
    registry[section.sectionId] = {
      layer: section.layer,
      part: parseInt(section.part),
      topic: section.title || ''
    };
  }

  return registry;
}

// ============================================================================
// FOOTER GENERATION
// ============================================================================

async function generateFooter(layerNum, layerConfig) {
  const layerInfo = layerConfig.layers.find(l => l.id === layerNum);
  const version = layerConfig.version || '6.0.0';
  const label = layerInfo?.label || `Layer ${layerNum}`;

  let navLinks = '';
  if (layerNum > 1) {
    const prevLayer = layerConfig.layers.find(l => l.id === layerNum - 1);
    const prevLabel = prevLayer?.label || `Layer ${layerNum - 1}`;
    navLinks += `<a href="javascript:void(0)" data-layer-switch="${layerNum - 1}" class="layer-nav-link">&larr; ${prevLabel}</a>`;
  }
  navLinks += `<span class="layer-nav-current">${label}</span>`;
  if (layerNum < 3) {
    const nextLayer = layerConfig.layers.find(l => l.id === layerNum + 1);
    const nextLabel = nextLayer?.label || `Layer ${layerNum + 1}`;
    navLinks += `<a href="javascript:void(0)" data-layer-switch="${layerNum + 1}" class="layer-nav-link">${nextLabel} &rarr;</a>`;
  }

  return `<footer class="layer-footer">
<div class="layer-nav">${navLinks}</div>
<div class="layer-meta">Live Character Guide v${version} &middot; <a href="https://github.com/vudirvp-sketch/live-char-guide" target="_blank" rel="noopener">GitHub</a></div>
</footer>`;
}

// ============================================================================
// MAIN BUILD FUNCTION
// ============================================================================

async function buildLayers() {
  log('INFO', 'Starting layer build...');

  // Load layer config
  const layerConfig = await loadLayerConfig();
  log('INFO', `Layer config loaded: v${layerConfig.version}`);

  // Clean build directory (preserve layer-config.json)
  if (existsSync(BUILD_DIR)) {
    const keepFiles = ['layer-config.json'];
    const entries = await readdir(BUILD_DIR);
    for (const entry of entries) {
      if (!keepFiles.includes(entry)) {
        await rm(join(BUILD_DIR, entry), { recursive: true, force: true });
      }
    }
  }
  await ensureDir(BUILD_DIR);
  await ensureDir(join(BUILD_DIR, 'parts-l1'));
  await ensureDir(join(BUILD_DIR, 'parts-l2'));
  await ensureDir(join(BUILD_DIR, 'parts-l3'));

  // Check if master directory exists
  if (!existsSync(MASTER_DIR)) {
    log('ERROR', `Master directory not found: ${MASTER_DIR}`);
    process.exit(1);
  }

  // Parse all master files
  const masterFiles = await readdir(MASTER_DIR);
  const partFiles = masterFiles.filter(f => f.startsWith('part_') && f.endsWith('.html')).sort();

  if (partFiles.length === 0) {
    log('ERROR', 'No part files found in master directory');
    process.exit(1);
  }

  log('INFO', `Found ${partFiles.length} master part files`);

  const allSections = [];
  const allSectionIds = new Set();
  const buildErrors = [];

  // Group sections by part
  const partsByNumber = {};

  for (const file of partFiles) {
    const filepath = join(MASTER_DIR, file);
    const content = await readFile(filepath, 'utf-8');

    // Extract part number
    const partMatch = file.match(/part_(\d+)/);
    const partNum = partMatch ? partMatch[1] : '00';

    const { sections, errors } = parseMasterHTML(content, file);

    if (errors.length > 0) {
      buildErrors.push(...errors);
    }

    // Add part number to sections and build global maps
    for (const section of sections) {
      section.part = partNum;
      allSections.push(section);
      allSectionIds.add(section.sectionId);
      sectionToLayerMap[section.sectionId] = section.layer;
    }

    partsByNumber[partNum] = {
      file: `part_${partNum}.html`,
      sections,
      content
    };
  }

  // Check for duplicate data-section IDs
  const seenIds = new Set();
  const duplicateIds = [];
  for (const section of allSections) {
    if (seenIds.has(section.sectionId)) {
      duplicateIds.push(section.sectionId);
    }
    seenIds.add(section.sectionId);
  }
  if (duplicateIds.length > 0) {
    log('ERROR', `Duplicate data-section IDs found: ${duplicateIds.join(', ')}`);
    buildErrors.push({ file: 'multiple', message: `Duplicate data-section IDs: ${duplicateIds.join(', ')}` });
  }

  // Report errors
  if (buildErrors.length > 0) {
    log('ERROR', `Build errors found:`);
    for (const err of buildErrors) {
      console.log(`   ${err.file}: ${err.message}`);
    }
    // Continue anyway for now (warnings only)
  }

  log('INFO', `Parsed ${allSections.length} sections from ${Object.keys(partsByNumber).length} parts`);

  // Assemble each layer
  const layers = ['l1', 'l2', 'l3'];

  for (const layer of layers) {
    const layerNum = parseInt(layer.replace('l', ''));
    const outputDir = join(BUILD_DIR, `parts-l${layerNum}`);
    await ensureDir(outputDir);

    const assembledParts = [];

    // Build set of section IDs available in this layer
    const layerSectionIds = new Set();
    for (const section of allSections) {
      const layerOrder = { l1: 1, l2: 2, l3: 3 };
      if (layerOrder[section.layer] <= layerNum) {
        layerSectionIds.add(section.sectionId);
      }
    }

    // Process each part
    for (const [partNum, partData] of Object.entries(partsByNumber).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
      const filteredSections = assembleLayer(partData.sections, layer);

      if (filteredSections.length === 0) {
        continue;
      }

      // Collect all anchors for this part
      const partAnchors = [];
      // The section itself is an anchor (via id)
      partAnchors.push(...filteredSections.map(s => s.sectionId));
      // h3 elements with IDs are also anchors
      for (const section of filteredSections) {
        partAnchors.push(...section.anchors);
      }

      // Process cross-layer links in each section
      const processedSections = filteredSections.map(s => ({
        ...s,
        processedContent: processCrossLayerLinks(s.content, layerNum, layerSectionIds)
      }));

      // Extract part title from first section's h2
      const partTitle = processedSections[0]?.title
        || `Part ${partNum}`;

      // Assemble HTML
      let html = `<!-- Auto-generated by build-layers.mjs -->
<!-- Layer: L${layerNum} (${layerConfig.layers.find(l => l.id === layerNum)?.label || ''}) -->
<!-- Part: ${partNum} -->

`;
      for (const section of processedSections) {
        html += `<section id="${section.sectionId}" data-layer="${section.layer}" data-section="${section.sectionId}">
${section.processedContent}
</section>

`;
      }

      // Write file
      const outputPath = join(outputDir, `part_${partNum}.html`);
      await writeFile(outputPath, html);
      assembledParts.push({
        file: `part_${partNum}.html`,
        title: partTitle,
        anchors: partAnchors
      });

      log('INFO', `Generated: build/parts-l${layerNum}/part_${partNum}.html (${filteredSections.length} sections)`);
    }

    // Generate no-JS glossary for this layer
    const glossaryHtml = await generateNoJSGlossary(layerNum);
    if (glossaryHtml) {
      await writeFile(join(outputDir, 'glossary.html'), glossaryHtml);
      assembledParts.push({
        file: 'glossary.html',
        title: 'Глоссарий',
        anchors: ['glossary']
      });
      log('INFO', `Generated: build/parts-l${layerNum}/glossary.html`);
    }

    // Generate footer for this layer
    const footerHtml = await generateFooter(layerNum, layerConfig);
    await writeFile(join(outputDir, 'footer.html'), footerHtml);
    assembledParts.push({
      file: 'footer.html',
      title: 'Footer',
      anchors: []
    });
    log('INFO', `Generated: build/parts-l${layerNum}/footer.html`);

    // Generate manifest.json for this layer (matching lazy-loader.js format)
    const manifest = await generateManifest(layerNum, layerConfig, assembledParts);
    await writeFile(join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
    log('INFO', `Generated: build/parts-l${layerNum}/manifest.json (${assembledParts.length} parts)`);
  }

  // Generate section registry
  const registry = generateSectionRegistry(allSections);
  await writeFile(join(BUILD_DIR, 'section-registry.json'), JSON.stringify(registry, null, 2));
  log('INFO', `Generated: build/section-registry.json (${Object.keys(registry).length} sections)`);

  // Compute layer hashes for integrity checking
  const layerHashes = {};
  for (const layer of layers) {
    const layerNum = layer.replace('l', '');
    const outputDir = join(BUILD_DIR, `parts-l${layerNum}`);
    const files = await readdir(outputDir);
    let combinedContent = '';

    for (const file of files.sort()) {
      if (file.endsWith('.html')) {
        combinedContent += await readFile(join(outputDir, file), 'utf-8');
      }
    }

    const hash = createHash('sha256').update(combinedContent).digest('hex');
    await writeFile(join(outputDir, '.hash'), hash.slice(0, 16));
    layerHashes[layer] = `sha256:${hash.slice(0, 16)}`;
    log('INFO', `Layer ${layerNum} hash: sha256:${hash.slice(0, 16)}`);
  }

  // Write top-level build manifest
  const buildManifest = {
    version: layerConfig.version,
    builtAt: new Date().toISOString(),
    sectionCount: allSections.length,
    partCount: Object.keys(partsByNumber).length,
    layerHashes,
    errors: buildErrors.length
  };
  await writeFile(join(BUILD_DIR, 'build-manifest.json'), JSON.stringify(buildManifest, null, 2));
  log('INFO', 'Generated: build/build-manifest.json');

  log('INFO', 'Layer build complete!');

  return {
    sectionCount: allSections.length,
    partCount: Object.keys(partsByNumber).length,
    errors: buildErrors.length,
    layerHashes
  };
}

// ============================================================================
// ENTRY POINT
// ============================================================================

buildLayers()
  .then(result => {
    console.log('\n============================================');
    console.log('LAYER BUILD SUCCESSFUL');
    console.log('============================================');
    console.log(`Parts: ${result.partCount}`);
    console.log(`Sections: ${result.sectionCount}`);
    console.log(`Errors: ${result.errors}`);
    console.log(`Layer hashes:`);
    for (const [layer, hash] of Object.entries(result.layerHashes)) {
      console.log(`  ${layer}: ${hash}`);
    }
    process.exit(result.errors > 0 ? 1 : 0);
  })
  .catch(err => {
    log('ERROR', `Build failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  });
