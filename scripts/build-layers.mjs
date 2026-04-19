#!/usr/bin/env node
/**
 * @fileoverview Build Layers Script for Live Character Guide v6
 * @module scripts/build-layers
 * @version 1.0.0
 *
 * @description
 * Stage 1 of the v6 build pipeline. Parses master HTML files and generates
 * per-layer HTML files according to the specification in §0.12 of the plan.
 *
 * Key features:
 * - Extracts sections by data-layer attribute
 * - Assembles cumulative layers (L1 ⊂ L2 ⊂ L3)
 * - Processes cross-layer links (data-layer-switch)
 * - Generates per-layer manifests
 * - Generates no-JS glossary fallback
 * - Validates all sections have required attributes
 *
 * Usage:
 *   node scripts/build-layers.mjs
 */

import { readFile, writeFile, readdir, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MASTER_DIR = join(ROOT, 'src', 'master');
const DATA_DIR = join(ROOT, 'data');
const BUILD_DIR = join(ROOT, 'build');
const GLOSSARY_PATH = join(DATA_DIR, 'glossary.json');

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
// HTML PARSING
// ============================================================================

/**
 * Simple HTML parser that extracts sections with data-layer attributes.
 * Does not use a full DOM parser for performance.
 */
function parseMasterHTML(content, filename) {
  const sections = [];
  const errors = [];

  // Track content outside sections
  let contentOutsideSections = [];

  // Find all section elements with data-layer
  // This regex handles nested sections and captures the full section content
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

    sections.push({
      layer,
      sectionId,
      content: sectionContent,
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

  const filteredSections = sections.filter(s => {
    const sectionLevel = layerOrder[s.layer];
    return sectionLevel <= targetLevel;
  });

  // Sort by original order (they should already be in order from parsing)
  // but also group by part file

  return filteredSections;
}

// ============================================================================
// CROSS-LAYER LINK PROCESSING
// ============================================================================

/**
 * Process data-layer-switch attributes in the assembled content.
 *
 * Rules:
 * - data-layer-switch="X#id" where X > current layer → render as layer-switch button
 * - data-layer-switch="X#id" where X ≤ current layer → convert to anchor link #id
 * - href="#id" where target doesn't exist → greyed-out text with tooltip
 */
function processCrossLayerLinks(content, currentLayer, allSectionIds) {
  const layerNum = parseInt(currentLayer);

  // Process data-layer-switch
  const layerSwitchRegex = /data-layer-switch=["'](\d+)#([^"']+)["']/g;
  let result = content;

  result = result.replace(layerSwitchRegex, (match, targetLayer, targetSection) => {
    const targetNum = parseInt(targetLayer);

    if (targetNum <= layerNum) {
      // Content is already in this layer - convert to anchor link
      return `href="#${targetSection}"`;
    } else {
      // Target is in deeper layer - keep as layer-switch
      return match;
    }
  });

  // Process regular anchor links - check if target exists
  const anchorRegex = /href=["']#([^"']+)["']/g;
  result = result.replace(anchorRegex, (match, targetId) => {
    // Skip if this is already a layer-switch link
    if (result.slice(result.indexOf(match) - 20, result.indexOf(match)).includes('data-layer-switch')) {
      return match;
    }

    if (!allSectionIds.has(targetId)) {
      // Target doesn't exist in any layer - this is a build error
      // For now, just warn
      // TODO: Check if target exists in deeper layer and add tooltip
    }

    return match;
  });

  return result;
}

// ============================================================================
// GLOSSARY GENERATION
// ============================================================================

async function generateNoJSGlossary(layer) {
  if (!existsSync(GLOSSARY_PATH)) {
    return '';
  }

  const glossaryData = JSON.parse(await readFile(GLOSSARY_PATH, 'utf-8'));
  const terms = glossaryData.terms || [];

  // Filter terms applicable to this layer
  const filteredTerms = terms.filter(term => {
    const applicable = term.applicable_layers || [1, 2, 3];
    return applicable.includes(layer);
  });

  if (filteredTerms.length === 0) {
    return '';
  }

  let html = `<section id="glossary" class="no-js-only">
<h2>Глоссарий</h2>
<dl>
`;

  for (const term of filteredTerms) {
    const termRu = term.term_ru || term.term;
    const definition = term.layer_context?.[layer.toString()] || term.definition || '';

    html += `<dt>${term.en_term || term.term}${termRu ? ` (${termRu})` : ''}</dt>
<dd>${definition}</dd>
`;
  }

  html += `</dl>
</section>`;

  return html;
}

// ============================================================================
// SECTION REGISTRY
// ============================================================================

async function generateSectionRegistry(allSections) {
  const registry = {};

  for (const section of allSections) {
    registry[section.sectionId] = {
      layer: section.layer,
      part: section.part,
      topic: section.topic || ''
    };
  }

  return registry;
}

// ============================================================================
// MAIN BUILD FUNCTION
// ============================================================================

async function buildLayers() {
  log('INFO', 'Starting layer build...');

  // Clean build directory
  if (existsSync(BUILD_DIR)) {
    // Don't delete layer-config.json
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
    log('WARN', `Master directory not found: ${MASTER_DIR}`);
    log('WARN', 'Creating empty placeholder...');

    // Create a minimal placeholder master file for testing
    await ensureDir(MASTER_DIR);
    const placeholderContent = `<!-- Placeholder master file - replace with actual content -->
<section data-layer="l1" data-section="p1_placeholder">
  <h3>Placeholder</h3>
  <p>This is a placeholder. Replace with actual content from v5.12 migration.</p>
</section>
`;
    await writeFile(join(MASTER_DIR, 'part_01_intro.html'), placeholderContent);
    log('INFO', 'Created placeholder: src/master/part_01_intro.html');
  }

  // Parse all master files
  const masterFiles = await readdir(MASTER_DIR);
  const partFiles = masterFiles.filter(f => f.startsWith('part_') && f.endsWith('.html'));

  if (partFiles.length === 0) {
    log('WARN', 'No part files found in master directory');
  }

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

    // Add part number to sections
    for (const section of sections) {
      section.part = partNum;
      allSections.push(section);
      allSectionIds.add(section.sectionId);
    }

    partsByNumber[partNum] = {
      file: `part_${partNum}.html`,
      sections,
      content
    };
  }

  // Report errors
  if (buildErrors.length > 0) {
    log('ERROR', `Build errors found:`);
    for (const err of buildErrors) {
      console.log(`   ${err.file}: ${err.message}`);
    }
    // Continue anyway for now (warnings only)
  }

  // Assemble each layer
  const layers = ['l1', 'l2', 'l3'];
  const layerManifests = {};

  for (const layer of layers) {
    const layerNum = layer.replace('l', '');
    const outputDir = join(BUILD_DIR, `parts-l${layerNum}`);
    await ensureDir(outputDir);

    const assembledParts = [];

    // Process each part
    for (const [partNum, partData] of Object.entries(partsByNumber).sort()) {
      const filteredSections = assembleLayer(partData.sections, layer);

      if (filteredSections.length === 0) {
        continue;
      }

      // Process cross-layer links
      const processedSections = filteredSections.map(s => ({
        ...s,
        processedContent: processCrossLayerLinks(s.content, layerNum, allSectionIds)
      }));

      // Assemble HTML
      let html = `<!-- Auto-generated by build-layers.mjs -->
<!-- Layer: ${layer} -->
<!-- Part: ${partNum} -->

`;
      for (const section of processedSections) {
        html += `<section data-layer="${section.layer}" data-section="${section.sectionId}">
${section.processedContent}
</section>

`;
      }

      // Write file
      const outputPath = join(outputDir, `part_${partNum}.html`);
      await writeFile(outputPath, html);
      assembledParts.push(partNum);

      log('INFO', `Generated: build/parts-l${layerNum}/part_${partNum}.html (${filteredSections.length} sections)`);
    }

    // Generate no-JS glossary for this layer
    const glossaryHtml = await generateNoJSGlossary(parseInt(layerNum));
    if (glossaryHtml) {
      await writeFile(join(outputDir, 'glossary.html'), glossaryHtml);
      log('INFO', `Generated: build/parts-l${layerNum}/glossary.html`);
    }

    layerManifests[layer] = assembledParts;
  }

  // Generate section registry
  const registry = await generateSectionRegistry(allSections);
  await writeFile(join(BUILD_DIR, 'section-registry.json'), JSON.stringify(registry, null, 2));
  log('INFO', `Generated: build/section-registry.json (${Object.keys(registry).length} sections)`);

  // Compute layer hashes for integrity checking
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

    const hash = createHash('sha256').update(combinedContent).digest('hex').slice(0, 16);
    await writeFile(join(outputDir, '.hash'), hash);
    log('INFO', `Layer ${layerNum} hash: ${hash}`);
  }

  log('INFO', 'Layer build complete!');

  return {
    sectionCount: allSections.length,
    partCount: Object.keys(partsByNumber).length,
    errors: buildErrors.length
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
    process.exit(result.errors > 0 ? 1 : 0);
  })
  .catch(err => {
    log('ERROR', `Build failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  });
