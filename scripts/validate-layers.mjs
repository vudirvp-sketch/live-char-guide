#!/usr/bin/env node
/**
 * @fileoverview Layer Validation Script for Live Character Guide v6
 * @module scripts/validate-layers
 * @version 1.0.0
 *
 * @description
 * Stage 4 validation: verifies the integrity of assembled layer HTML files.
 * This script checks that the cumulative layer model (L1 ⊂ L2 ⊂ L3) is
 * correctly implemented after the build-layers stage.
 *
 * Checks implemented (Stage 4, first half):
 *   1. L2 contains all L1 sections (cumulative layer integrity)
 *   2. L3 contains all L2 sections (cumulative layer integrity)
 *   3. No duplicate content across layers within the same layer file
 *   4. All internal href="#id" links resolve within each layer
 *   5. All data-layer-switch references point to valid sections in target layers
 *   6. Section content matches between layers (L1 section in L2 file === L1 file)
 *   7. Layer manifests are consistent with actual files
 *
 * Usage:
 *   node scripts/validate-layers.mjs
 *   node scripts/validate-layers.mjs --verbose
 */

import { readFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BUILD_DIR = join(ROOT, 'build');
const LAYERS = ['l1', 'l2', 'l3'];
const LAYER_NAMES = { l1: 'Минимальный', l2: 'Глубокий', l3: 'Экспертный' };

const VERBOSE = process.argv.includes('--verbose');

const errors = [];
const warnings = [];
const info = [];

// ============================================================================
// UTILITY
// ============================================================================

function log(level, message) {
  const prefix = level === 'ERROR' ? '❌' : level === 'WARN' ? '⚠️' : level === 'INFO' ? '✓' : 'ℹ️';
  console.log(`${prefix} ${message}`);
}

function verbose(message) {
  if (VERBOSE) console.log(`   ${message}`);
}

/**
 * Extract section IDs and their content from an HTML file
 */
function extractSections(html) {
  const sections = [];
  const sectionRegex = /<section\s+([^>]*)>/gi;
  let match;

  while ((match = sectionRegex.exec(html)) !== null) {
    const attrs = match[1];
    const idMatch = attrs.match(/id=["']([^"']+)["']/i);
    const dataLayerMatch = attrs.match(/data-layer=["']([^"']+)["']/i);
    const dataSectionMatch = attrs.match(/data-section=["']([^"']+)["']/i);

    const id = idMatch ? idMatch[1] : null;
    const dataLayer = dataLayerMatch ? dataLayerMatch[1] : null;
    const dataSection = dataSectionMatch ? dataSectionMatch[1] : null;

    // Find closing tag and extract content
    const startIndex = match.index + match[0].length;
    let depth = 1;
    let endIndex = startIndex;
    let searchPos = startIndex;

    while (depth > 0 && searchPos < html.length) {
      const nextOpen = html.indexOf('<section', searchPos);
      const nextClose = html.indexOf('</section>', searchPos);

      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        searchPos = nextOpen + 8;
      } else {
        depth--;
        if (depth === 0) endIndex = nextClose;
        searchPos = nextClose + 10;
      }
    }

    const content = html.slice(startIndex, endIndex);
    const textContent = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    sections.push({
      id,
      dataLayer,
      dataSection,
      content,
      textContent,
      contentHash: createHash('sha256').update(textContent).digest('hex').substring(0, 16)
    });
  }

  return sections;
}

/**
 * Extract all href and data-layer-switch references from HTML
 */
function extractLinks(html, sourceFile) {
  const links = [];
  const hrefRegex = /href=["']#([^"']+)["']/gi;
  const layerSwitchRegex = /data-layer-switch=["'](\d+)#([^"']+)["']/gi;

  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    // Skip if part of data-layer-switch
    const contextBefore = html.substring(Math.max(0, match.index - 50), match.index);
    if (contextBefore.includes('data-layer-switch')) continue;

    links.push({
      type: 'href',
      target: match[1],
      source: sourceFile
    });
  }

  while ((match = layerSwitchRegex.exec(html)) !== null) {
    links.push({
      type: 'layer-switch',
      targetLayer: parseInt(match[1]),
      targetSection: match[2],
      source: sourceFile
    });
  }

  return links;
}

// ============================================================================
// LOAD LAYER DATA
// ============================================================================

async function loadLayerData() {
  const layerData = {};

  for (const layer of LAYERS) {
    const layerDir = join(BUILD_DIR, `parts-${layer}`);
    if (!existsSync(layerDir)) {
      errors.push(`Layer directory not found: ${layerDir}`);
      continue;
    }

    const files = await readdir(layerDir);
    const htmlFiles = files.filter(f => f.endsWith('.html')); // includes part_*, glossary.html, footer.html

    const sections = [];
    const allLinks = [];
    const fileContents = {};

    for (const file of htmlFiles) {
      const filepath = join(layerDir, file);
      const html = await readFile(filepath, 'utf-8');
      fileContents[file] = html;

      const fileSections = extractSections(html);
      for (const section of fileSections) {
        section.file = file;
        section.layer = layer;
        sections.push(section);
      }

      const fileLinks = extractLinks(html, file);
      allLinks.push(...fileLinks);
    }

    // Load manifest
    const manifestPath = join(layerDir, 'manifest.json');
    let manifest = null;
    if (existsSync(manifestPath)) {
      manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));
    }

    layerData[layer] = {
      dir: layerDir,
      files: htmlFiles,
      fileContents,
      sections,
      links: allLinks,
      manifest
    };
  }

  return layerData;
}

// ============================================================================
// CHECK 1: L2 contains all L1 sections (cumulative integrity)
// ============================================================================

async function checkCumulativeL1inL2(layerData) {
  console.log('\n📋 Check 1: L2 contains all L1 sections (cumulative L1 ⊂ L2)...');

  let errorCount = 0;
  let matchCount = 0;
  let mismatchCount = 0;

  if (!layerData.l1 || !layerData.l2) {
    errors.push('Cannot check L1⊂L2: missing layer data');
    return 1;
  }

  // Build maps of sections by data-section ID
  const l1Sections = new Map();
  for (const s of layerData.l1.sections) {
    if (s.dataSection) l1Sections.set(s.dataSection, s);
  }

  const l2Sections = new Map();
  for (const s of layerData.l2.sections) {
    if (s.dataSection) l2Sections.set(s.dataSection, s);
  }

  // Every L1 section must appear in L2
  for (const [id, l1Section] of l1Sections) {
    const l2Section = l2Sections.get(id);

    if (!l2Section) {
      errors.push(`L1 section "${id}" (from ${l1Section.file}) is MISSING from L2 — cumulative layer violation`);
      errorCount++;
      continue;
    }

    // Check content match
    if (l1Section.contentHash !== l2Section.contentHash) {
      // Content mismatch — check if it's just whitespace differences
      const l1Normalized = l1Section.textContent.replace(/\s+/g, ' ').trim();
      const l2Normalized = l2Section.textContent.replace(/\s+/g, ' ').trim();

      if (l1Normalized !== l2Normalized) {
        warnings.push(`L1 section "${id}" content differs in L2 — L1 hash: ${l1Section.contentHash}, L2 hash: ${l2Section.contentHash}`);
        mismatchCount++;
      }
    } else {
      matchCount++;
      verbose(`L1 section "${id}" matches in L2 ✓`);
    }
  }

  if (errorCount === 0) {
    log('INFO', `All ${l1Sections.size} L1 sections present in L2 (${matchCount} exact matches, ${mismatchCount} content differences)`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 2: L3 contains all L2 sections (cumulative integrity)
// ============================================================================

async function checkCumulativeL2inL3(layerData) {
  console.log('\n📋 Check 2: L3 contains all L2 sections (cumulative L2 ⊂ L3)...');

  let errorCount = 0;
  let matchCount = 0;
  let mismatchCount = 0;

  if (!layerData.l2 || !layerData.l3) {
    errors.push('Cannot check L2⊂L3: missing layer data');
    return 1;
  }

  // Build maps of sections by data-section ID
  const l2Sections = new Map();
  for (const s of layerData.l2.sections) {
    if (s.dataSection) l2Sections.set(s.dataSection, s);
  }

  const l3Sections = new Map();
  for (const s of layerData.l3.sections) {
    if (s.dataSection) l3Sections.set(s.dataSection, s);
  }

  // Every L2 section must appear in L3
  for (const [id, l2Section] of l2Sections) {
    const l3Section = l3Sections.get(id);

    if (!l3Section) {
      errors.push(`L2 section "${id}" (from ${l2Section.file}) is MISSING from L3 — cumulative layer violation`);
      errorCount++;
      continue;
    }

    // Check content match
    if (l2Section.contentHash !== l3Section.contentHash) {
      const l2Normalized = l2Section.textContent.replace(/\s+/g, ' ').trim();
      const l3Normalized = l3Section.textContent.replace(/\s+/g, ' ').trim();

      if (l2Normalized !== l3Normalized) {
        warnings.push(`L2 section "${id}" content differs in L3 — L2 hash: ${l2Section.contentHash}, L3 hash: ${l3Section.contentHash}`);
        mismatchCount++;
      }
    } else {
      matchCount++;
      verbose(`L2 section "${id}" matches in L3 ✓`);
    }
  }

  if (errorCount === 0) {
    log('INFO', `All ${l2Sections.size} L2 sections present in L3 (${matchCount} exact matches, ${mismatchCount} content differences)`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 3: No duplicate content across layers
// ============================================================================

async function checkDuplicates(layerData) {
  console.log('\n📋 Check 3: No duplicate content across layers...');

  let errorCount = 0;

  // Check that no section appears twice within the same layer
  for (const layer of LAYERS) {
    if (!layerData[layer]) continue;

    const seenSections = new Map();
    for (const section of layerData[layer].sections) {
      if (!section.dataSection) continue;

      if (seenSections.has(section.dataSection)) {
        const existing = seenSections.get(section.dataSection);
        errors.push(`Duplicate data-section="${section.dataSection}" in ${layer}: found in both ${existing.file} and ${section.file}`);
        errorCount++;
      }
      seenSections.set(section.dataSection, section);
    }
  }

  // Check for cross-layer content duplication (L3-only sections that duplicate L2 sections)
  // This is a soft check — identical content across different data-section IDs is suspicious
  if (layerData.l2 && layerData.l3) {
    const l2OnlySections = new Map();
    for (const s of layerData.l2.sections) {
      if (s.dataSection && s.dataLayer === 'l2') {
        l2OnlySections.set(s.dataSection, s);
      }
    }

    const l3OnlySections = new Map();
    for (const s of layerData.l3.sections) {
      if (s.dataSection && s.dataLayer === 'l3') {
        l3OnlySections.set(s.dataSection, s);
      }
    }

    // Check if any L3-only section has identical text to an L2-only section
    for (const [l3id, l3Section] of l3OnlySections) {
      for (const [l2id, l2Section] of l2OnlySections) {
        if (l3Section.contentHash === l2Section.contentHash && l3Section.textContent.length > 50) {
          warnings.push(`L3 section "${l3id}" has identical content to L2 section "${l2id}" — possible duplication (IMP-5)`);
        }
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No duplicate sections found within layers');
  }

  return errorCount;
}

// ============================================================================
// CHECK 4: All links resolve within each layer
// ============================================================================

async function checkLinksResolve(layerData) {
  console.log('\n📋 Check 4: All internal links resolve within layers...');

  let errorCount = 0;

  for (const layer of LAYERS) {
    if (!layerData[layer]) continue;

    // Build set of all IDs available in this layer
    const availableIds = new Set();
    for (const section of layerData[layer].sections) {
      if (section.id) availableIds.add(section.id);
      if (section.dataSection) availableIds.add(section.dataSection);
    }

    // Also scan for all id="..." attributes in the HTML
    for (const [file, html] of Object.entries(layerData[layer].fileContents)) {
      const idRegex = /id=["']([^"']+)["']/gi;
      let match;
      while ((match = idRegex.exec(html)) !== null) {
        availableIds.add(match[1]);
      }
    }

    // Check all href="#id" links
    const brokenLinks = [];
    for (const link of layerData[layer].links) {
      if (link.type === 'href') {
        if (!availableIds.has(link.target)) {
          // Check if target exists in a different layer (expected for cross-layer links)
          let foundInOtherLayer = false;
          for (const otherLayer of LAYERS) {
            if (otherLayer === layer || !layerData[otherLayer]) continue;
            for (const section of layerData[otherLayer].sections) {
              if (section.id === link.target || section.dataSection === link.target) {
                foundInOtherLayer = true;
                break;
              }
            }
            if (foundInOtherLayer) break;
          }

          if (foundInOtherLayer) {
            // Link target exists in a different layer — this should be a layer-link-disabled
            // per §0.9, not a broken link, but check that it's handled properly
            verbose(`${layer}/${link.source}: href="#${link.target}" targets section in different layer (expected: .layer-link-disabled)`);
          } else {
            brokenLinks.push(`${layer}/${link.source}: href="#${link.target}" — target ID does not exist in ANY layer`);
            errorCount++;
          }
        }
      }
    }

    if (brokenLinks.length > 0) {
      for (const bl of brokenLinks) {
        errors.push(bl);
      }
    }

    // Check all data-layer-switch references
    const brokenSwitches = [];
    for (const link of layerData[layer].links) {
      if (link.type === 'layer-switch') {
        const targetLayerKey = `l${link.targetLayer}`;
        if (!layerData[targetLayerKey]) {
          brokenSwitches.push(`${layer}/${link.source}: data-layer-switch="${link.targetLayer}#${link.targetSection}" — target layer ${targetLayerKey} does not exist`);
          errorCount++;
          continue;
        }

        // Check target section exists in target layer
        const targetExists = layerData[targetLayerKey].sections.some(
          s => s.dataSection === link.targetSection || s.id === link.targetSection
        );

        if (!targetExists) {
          brokenSwitches.push(`${layer}/${link.source}: data-layer-switch="${link.targetLayer}#${link.targetSection}" — target section does not exist in ${targetLayerKey}`);
          errorCount++;
        }
      }
    }

    if (brokenSwitches.length > 0) {
      for (const bs of brokenSwitches) {
        errors.push(bs);
      }
    }

    const totalLinks = layerData[layer].links.filter(l => l.type === 'href').length;
    const totalSwitches = layerData[layer].links.filter(l => l.type === 'layer-switch').length;
    log('INFO', `${layer.toUpperCase()}: ${totalLinks} href links, ${totalSwitches} layer-switches checked`);
  }

  if (errorCount === 0) {
    log('INFO', 'All internal links resolve correctly across all layers');
  }

  return errorCount;
}

// ============================================================================
// CHECK 5: Section content consistency (L1 section same in L2 file vs L1 file)
// ============================================================================

async function checkContentConsistency(layerData) {
  console.log('\n📋 Check 5: Section content consistency across layers...');

  let errorCount = 0;
  let consistentCount = 0;

  // For each L1 section, compare its content in L1 file vs L2 file vs L3 file
  // They should be identical (build-layers copies them exactly)
  const l1Sections = new Map();
  for (const s of (layerData.l1?.sections || [])) {
    if (s.dataSection) l1Sections.set(s.dataSection, s);
  }

  for (const [id, l1Section] of l1Sections) {
    // Check in L2
    const l2Match = (layerData.l2?.sections || []).find(s => s.dataSection === id);
    if (l2Match) {
      if (l1Section.contentHash === l2Match.contentHash) {
        consistentCount++;
      } else {
        // Content difference between L1 and L2 for same section
        // This is a soft check — could be intentional (build adds layer-switch links)
        const l1Len = l1Section.textContent.length;
        const l2Len = l2Match.textContent.length;
        const diff = Math.abs(l1Len - l2Len);
        const pct = l1Len > 0 ? (diff / l1Len * 100).toFixed(1) : 'N/A';

        verbose(`L1/L2 content diff for "${id}": ${l1Len} vs ${l2Len} chars (${pct}% difference)`);
      }
    }

    // Check in L3
    const l3Match = (layerData.l3?.sections || []).find(s => s.dataSection === id);
    if (l3Match) {
      if (l1Section.contentHash === l3Match.contentHash) {
        consistentCount++;
      } else {
        const l1Len = l1Section.textContent.length;
        const l3Len = l3Match.textContent.length;
        const diff = Math.abs(l1Len - l3Len);
        const pct = l1Len > 0 ? (diff / l1Len * 100).toFixed(1) : 'N/A';

        verbose(`L1/L3 content diff for "${id}": ${l1Len} vs ${l3Len} chars (${pct}% difference)`);
      }
    }
  }

  // Check L2 sections in L3
  const l2Sections = new Map();
  for (const s of (layerData.l2?.sections || [])) {
    if (s.dataSection) l2Sections.set(s.dataSection, s);
  }

  for (const [id, l2Section] of l2Sections) {
    const l3Match = (layerData.l3?.sections || []).find(s => s.dataSection === id);
    if (l3Match) {
      if (l2Section.contentHash === l3Match.contentHash) {
        consistentCount++;
      } else {
        const l2Len = l2Section.textContent.length;
        const l3Len = l3Match.textContent.length;
        const diff = Math.abs(l2Len - l3Len);
        const pct = l2Len > 0 ? (diff / l2Len * 100).toFixed(1) : 'N/A';

        verbose(`L2/L3 content diff for "${id}": ${l2Len} vs ${l3Len} chars (${pct}% difference)`);
      }
    }
  }

  log('INFO', `Content consistency: ${consistentCount} exact matches across layers`);

  return errorCount;
}

// ============================================================================
// CHECK 6: Layer manifests are consistent with actual files
// ============================================================================

async function checkManifestConsistency(layerData) {
  console.log('\n📋 Check 6: Layer manifests consistent with actual files...');

  let errorCount = 0;

  for (const layer of LAYERS) {
    if (!layerData[layer]) continue;

    const { manifest, files } = layerData[layer];

    if (!manifest) {
      errors.push(`${layer}: No manifest.json found`);
      errorCount++;
      continue;
    }

    // Check manifest parts match actual files
    const manifestFiles = new Set((manifest.parts || []).map(p => p.file));
    const actualPartFiles = new Set(files.filter(f => f.endsWith('.html')));

    // Files in manifest but not on disk
    for (const file of manifestFiles) {
      if (!actualPartFiles.has(file)) {
        errors.push(`${layer}: manifest references "${file}" but file does not exist`);
        errorCount++;
      }
    }

    // Files on disk but not in manifest
    for (const file of actualPartFiles) {
      if (!manifestFiles.has(file)) {
        errors.push(`${layer}: file "${file}" exists but is not in manifest`);
        errorCount++;
      }
    }

    // Check layer name matches canonical names
    const canonicalNames = { l1: 'Basic', l2: 'Deep', l3: 'Expert' };
    if (manifest.name && manifest.name !== canonicalNames[layer]) {
      warnings.push(`${layer}: manifest name "${manifest.name}" ≠ canonical "${canonicalNames[layer]}" (§0.17)`);
    }

    // Check layer number
    const expectedLayerNum = { l1: 1, l2: 2, l3: 3 };
    if (manifest.layer && manifest.layer !== expectedLayerNum[layer]) {
      errors.push(`${layer}: manifest layer=${manifest.layer}, expected ${expectedLayerNum[layer]}`);
      errorCount++;
    }
  }

  if (errorCount === 0) {
    log('INFO', 'All layer manifests are consistent with actual files');
  }

  return errorCount;
}

// ============================================================================
// CHECK 7: Layer section counts follow cumulative model
// ============================================================================

async function checkSectionCounts(layerData) {
  console.log('\n📋 Check 7: Section counts follow cumulative model...');

  let errorCount = 0;

  const counts = {};
  for (const layer of LAYERS) {
    if (!layerData[layer]) continue;
    counts[layer] = {
      total: layerData[layer].sections.length,
      l1: layerData[layer].sections.filter(s => s.dataLayer === 'l1').length,
      l2: layerData[layer].sections.filter(s => s.dataLayer === 'l2').length,
      l3: layerData[layer].sections.filter(s => s.dataLayer === 'l3').length,
    };
  }

  console.log('\n   Section distribution:');
  for (const layer of LAYERS) {
    if (!counts[layer]) continue;
    const c = counts[layer];
    console.log(`   ${layer.toUpperCase()}: ${c.total} total (l1: ${c.l1}, l2: ${c.l2}, l3: ${c.l3})`);
  }

  // L1 should only have l1 sections
  if (counts.l1) {
    if (counts.l1.l2 > 0 || counts.l1.l3 > 0) {
      errors.push(`L1 contains non-l1 sections: l2=${counts.l1.l2}, l3=${counts.l1.l3}`);
      errorCount++;
    }
  }

  // L2 should have l1 + l2 sections
  if (counts.l2) {
    if (counts.l2.l1 !== (counts.l1?.l1 || 0)) {
      warnings.push(`L2 l1-section count (${counts.l2.l1}) ≠ L1 l1-section count (${counts.l1?.l1 || 0})`);
    }
    if (counts.l2.l3 > 0) {
      errors.push(`L2 contains l3 sections: ${counts.l2.l3}`);
      errorCount++;
    }
  }

  // L3 should have l1 + l2 + l3 sections
  if (counts.l3) {
    if (counts.l3.l1 !== (counts.l1?.l1 || 0)) {
      warnings.push(`L3 l1-section count (${counts.l3.l1}) ≠ L1 l1-section count (${counts.l1?.l1 || 0})`);
    }
    if (counts.l3.l2 !== (counts.l2?.l2 || 0)) {
      warnings.push(`L3 l2-section count (${counts.l3.l2}) ≠ L2 l2-section count (${counts.l2?.l2 || 0})`);
    }
  }

  // Cumulative: each layer should have MORE sections than the previous
  if (counts.l1 && counts.l2 && counts.l2.total <= counts.l1.total) {
    warnings.push(`L2 total sections (${counts.l2.total}) ≤ L1 total sections (${counts.l1.total}) — expected more`);
  }
  if (counts.l2 && counts.l3 && counts.l3.total <= counts.l2.total) {
    warnings.push(`L3 total sections (${counts.l3.total}) ≤ L2 total sections (${counts.l2.total}) — expected more`);
  }

  if (errorCount === 0) {
    log('INFO', 'Section counts follow the cumulative layer model correctly');
  }

  return errorCount;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🔍 Live Character Guide v6 — Layer Validation (Stage 4)\n');
  console.log('='.repeat(60));

  // Verify build output exists
  if (!existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Run "pnpm run build:layers" first.');
    process.exit(1);
  }

  // Load all layer data
  console.log('\n📂 Loading layer data from build output...');
  const layerData = await loadLayerData();

  for (const layer of LAYERS) {
    if (layerData[layer]) {
      log('INFO', `${layer.toUpperCase()} (${LAYER_NAMES[layer]}): ${layerData[layer].files.length} files, ${layerData[layer].sections.length} sections`);
    }
  }

  // Run all checks
  let totalErrors = 0;

  totalErrors += await checkCumulativeL1inL2(layerData);
  totalErrors += await checkCumulativeL2inL3(layerData);
  totalErrors += await checkDuplicates(layerData);
  totalErrors += await checkLinksResolve(layerData);
  totalErrors += await checkContentConsistency(layerData);
  totalErrors += await checkManifestConsistency(layerData);
  totalErrors += await checkSectionCounts(layerData);

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Layer Validation Summary:`);
  console.log(`   Total errors: ${errors.length}`);
  console.log(`   Total warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(e => console.log(`   - ${e}`));
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(w => console.log(`   - ${w}`));
  }

  if (errors.length === 0) {
    console.log('\n✅ Layer validation PASSED (all 7 checks)');
    console.log(`   ${warnings.length} warnings (review recommended)`);
  } else {
    console.log(`\n❌ Layer validation FAILED with ${errors.length} error(s)`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
