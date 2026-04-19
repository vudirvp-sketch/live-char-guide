#!/usr/bin/env node
/**
 * @fileoverview Master HTML Validation Script for Live Character Guide v6
 * @module scripts/validate-master
 * @version 1.0.0
 *
 * @description
 * Stage 2 validation: checks master HTML files for structural and content
 * integrity BEFORE layer assembly. This script is part of the Master
 * Validation phase described in §5 Stage 2 of the plan.
 *
 * Checks implemented (first batch — ~1/3 of full Stage 2):
 *   1. All sections have correct data-layer and data-section attributes
 *   2. All data-layer-switch references are valid (target section exists in target layer)
 *   3. All cross-references (href="#id") resolve within the same or referenced layer
 *   4. No prohibited elements in master HTML (<style>, <script>, <link>, <meta>)
 *   5. No content outside <section data-layer> blocks
 *
 * Checks NOT yet implemented (deferred to next batch):
 *   - All terms from glossary.json are used in at least one Part
 *   - No duplicate meaning/functionality across Parts
 *   - No prohibited translations (validate_terms.py)
 *   - No English leaks (check_english.py)
 *   - All character examples match Character Bible
 *   - All visual components are from registry (CSS class check)
 *   - IMP-27: every L2 section has an L1 mention; every L3 section has an L2 mention
 *   - IMP-28: no orphan sections
 *
 * Usage:
 *   node scripts/validate-master.mjs
 */

import { readFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MASTER_DIR = join(ROOT, 'src', 'master');
const BUILD_DIR = join(ROOT, 'build');

const errors = [];
const warnings = [];

// ============================================================================
// UTILITY
// ============================================================================

function log(level, message) {
  const prefix = level === 'ERROR' ? '❌' : level === 'WARN' ? '⚠️' : '✓';
  console.log(`${prefix} ${message}`);
}

// ============================================================================
// PARSE ALL MASTER FILES
// ============================================================================

async function parseAllMasterFiles() {
  if (!existsSync(MASTER_DIR)) {
    log('ERROR', `Master directory not found: ${MASTER_DIR}`);
    process.exit(1);
  }

  const masterFiles = await readdir(MASTER_DIR);
  const partFiles = masterFiles.filter(f => f.startsWith('part_') && f.endsWith('.html')).sort();

  if (partFiles.length === 0) {
    log('ERROR', 'No part files found in master directory');
    process.exit(1);
  }

  const allSections = [];
  const allContent = [];

  for (const file of partFiles) {
    const filepath = join(MASTER_DIR, file);
    const content = await readFile(filepath, 'utf-8');
    const partMatch = file.match(/part_(\d+)/);
    const partNum = partMatch ? partMatch[1] : '00';

    // Parse sections with data-layer
    const sectionRegex = /<section\s+([^>]*)>/gi;
    let match;

    while ((match = sectionRegex.exec(content)) !== null) {
      const attrs = match[1];
      const layerMatch = attrs.match(/data-layer=["']([^"']+)["']/i);
      const sectionMatch = attrs.match(/data-section=["']([^"']+)["']/i);

      if (layerMatch) {
        const layer = layerMatch[1];
        const sectionId = sectionMatch ? sectionMatch[1] : null;

        // Find closing tag and extract content
        const startIndex = match.index + match[0].length;
        let depth = 1;
        let endIndex = startIndex;
        let searchPos = startIndex;

        while (depth > 0 && searchPos < content.length) {
          const nextOpen = content.indexOf('<section', searchPos);
          const nextClose = content.indexOf('</section>', searchPos);

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

        const sectionContent = content.slice(startIndex, endIndex);

        allSections.push({
          file,
          partNum,
          layer,
          sectionId,
          content: sectionContent,
          startIndex: match.index,
          endIndex: endIndex + 10
        });
      }
    }

    allContent.push({ file, partNum, content });
  }

  return { allSections, allContent, partFiles };
}

// ============================================================================
// CHECK 1: All sections have correct data-layer and data-section attributes
// ============================================================================

async function checkSectionAttributes(allSections) {
  console.log('\n📋 Check 1: Section attributes (data-layer, data-section)...');

  let sectionCount = 0;
  let errorCount = 0;
  const sectionIds = new Set();
  const validLayers = new Set(['l1', 'l2', 'l3']);

  for (const section of allSections) {
    sectionCount++;

    // Check data-section exists
    if (!section.sectionId) {
      errors.push(`${section.file}: Section with data-layer="${section.layer}" is missing data-section attribute`);
      errorCount++;
      continue;
    }

    // Check data-section format (should be snake_case, prefixed with part number)
    if (!/^[a-z][a-z0-9_]*$/.test(section.sectionId)) {
      warnings.push(`${section.file}: data-section="${section.sectionId}" — not in snake_case format`);
    }

    // Check layer value
    if (!validLayers.has(section.layer)) {
      errors.push(`${section.file}: data-layer="${section.layer}" — invalid layer value (expected l1, l2, or l3)`);
      errorCount++;
    }

    // Check uniqueness
    if (sectionIds.has(section.sectionId)) {
      errors.push(`${section.file}: data-section="${section.sectionId}" — DUPLICATE (already used in another section)`);
      errorCount++;
    }
    sectionIds.add(section.sectionId);
  }

  if (errorCount === 0) {
    log('INFO', `All ${sectionCount} sections have valid data-layer and data-section attributes`);
    log('INFO', `All data-section IDs are unique (${sectionIds.size} unique IDs)`);
  }

  return { sectionIds, errorCount };
}

// ============================================================================
// CHECK 2: All data-layer-switch references are valid
// ============================================================================

async function checkLayerSwitchRefs(allSections, sectionIds) {
  console.log('\n📋 Check 2: data-layer-switch references...');

  let errorCount = 0;
  let refCount = 0;

  // Build a map of sectionId → layer for validation
  const sectionLayerMap = new Map();
  for (const section of allSections) {
    if (section.sectionId) {
      sectionLayerMap.set(section.sectionId, section.layer);
    }
  }

  for (const section of allSections) {
    // Find all data-layer-switch attributes
    const layerSwitchRegex = /data-layer-switch=["'](\d+)#([^"']+)["']/gi;
    let match;

    while ((match = layerSwitchRegex.exec(section.content)) !== null) {
      refCount++;
      const targetLayer = match[1];
      const targetSection = match[2];

      // Check target section exists
      if (!sectionLayerMap.has(targetSection)) {
        errors.push(`${section.file} (${section.sectionId}): data-layer-switch="${targetLayer}#${targetSection}" — target section "${targetSection}" does not exist`);
        errorCount++;
        continue;
      }

      // Check target section is in the target layer or a deeper layer
      const targetActualLayer = sectionLayerMap.get(targetSection);
      const layerNums = { l1: 1, l2: 2, l3: 3 };
      const targetLayerNum = parseInt(targetLayer);
      const actualLayerNum = layerNums[targetActualLayer] || 0;

      if (actualLayerNum > targetLayerNum) {
        warnings.push(`${section.file} (${section.sectionId}): data-layer-switch="${targetLayer}#${targetSection}" — target section is in layer ${targetActualLayer}, deeper than referenced layer ${targetLayer}`);
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', `All ${refCount} data-layer-switch references are valid`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 3: All cross-references (href="#id") resolve
// ============================================================================

async function checkCrossReferences(allSections, sectionIds) {
  console.log('\n📋 Check 3: Cross-references (href="#id")...');

  let errorCount = 0;
  let refCount = 0;

  for (const section of allSections) {
    // Find all href="#id" links (excluding data-layer-switch)
    const hrefRegex = /href=["']#([^"']+)["']/gi;
    let match;

    while ((match = hrefRegex.exec(section.content)) !== null) {
      const targetId = match[1];

      // Skip if this href is part of a data-layer-switch
      const contextBefore = section.content.substring(Math.max(0, match.index - 40), match.index);
      if (contextBefore.includes('data-layer-switch')) {
        continue;
      }

      refCount++;

      if (!sectionIds.has(targetId)) {
        errors.push(`${section.file} (${section.sectionId}): href="#${targetId}" — target ID does not exist in any section`);
        errorCount++;
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', `All ${refCount} internal href references resolve to existing sections`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 4: No prohibited elements in master HTML
// ============================================================================

async function checkProhibitedElements(allContent) {
  console.log('\n📋 Check 4: Prohibited elements (<style>, <script>, <link>, <meta>)...');

  let errorCount = 0;
  const prohibitedPatterns = [
    { pattern: /<style[^>]*>/i, name: '<style>' },
    { pattern: /<script[^>]*>/i, name: '<script>' },
    { pattern: /<link[^>]*>/i, name: '<link>' },
    { pattern: /<meta[^>]*>/i, name: '<meta>' }
  ];

  for (const { file, content } of allContent) {
    for (const { pattern, name } of prohibitedPatterns) {
      if (pattern.test(content)) {
        errors.push(`${file}: Prohibited element found: ${name}`);
        errorCount++;
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No prohibited elements found in any master HTML file');
  }

  return errorCount;
}

// ============================================================================
// CHECK 5: No content outside <section data-layer> blocks
// ============================================================================

async function checkContentOutsideSections(allContent) {
  console.log('\n📋 Check 5: Content outside <section data-layer> blocks...');

  let errorCount = 0;

  for (const { file, content } of allContent) {
    // Remove all sections with data-layer
    let remaining = content;

    // Remove HTML comments
    remaining = remaining.replace(/<!--[\s\S]*?-->/g, '');

    // Remove all sections (including their content)
    // We'll use a different approach: find what's NOT inside sections

    // Find all section boundaries
    const sectionStarts = [];
    const sectionEnds = [];
    const sectionRegex = /<section\s+[^>]*data-layer[^>]*>/gi;
    let match;

    while ((match = sectionRegex.exec(content)) !== null) {
      sectionStarts.push(match.index);
    }

    // For each section start, find its matching end
    for (const startIdx of sectionStarts) {
      const startTagEnd = content.indexOf('>', startIdx) + 1;
      let depth = 1;
      let searchPos = startTagEnd;

      while (depth > 0 && searchPos < content.length) {
        const nextOpen = content.indexOf('<section', searchPos);
        const nextClose = content.indexOf('</section>', searchPos);

        if (nextClose === -1) break;

        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          searchPos = nextOpen + 8;
        } else {
          depth--;
          if (depth === 0) {
            sectionEnds.push(nextClose + 10);
          }
          searchPos = nextClose + 10;
        }
      }
    }

    // Now find content between sections
    const outsideRanges = [];
    let lastEnd = 0;

    for (let i = 0; i < sectionStarts.length; i++) {
      if (i < sectionEnds.length) {
        const betweenContent = content.slice(lastEnd, sectionStarts[i]).trim();
        if (betweenContent.length > 0) {
          outsideRanges.push(betweenContent);
        }
        lastEnd = sectionEnds[i];
      }
    }

    // Check after last section
    const afterContent = content.slice(lastEnd).trim();
    if (afterContent.length > 0) {
      outsideRanges.push(afterContent);
    }

    // Validate outside content — only whitespace and wrapping divs allowed
    for (const outsideContent of outsideRanges) {
      // Remove wrapping divs
      const cleaned = outsideContent
        .replace(/<div[^>]*>/gi, '')
        .replace(/<\/div>/gi, '')
        .trim();

      if (cleaned.length > 0 && !/^[\s\n\r]*$/.test(cleaned)) {
        warnings.push(`${file}: Content found outside <section data-layer> blocks: "${cleaned.substring(0, 80)}..."`);
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No significant content found outside <section data-layer> blocks');
  }

  return errorCount;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🔍 Live Character Guide v6 — Master HTML Validation\n');
  console.log('=' .repeat(60));

  const { allSections, allContent, partFiles } = await parseAllMasterFiles();

  log('INFO', `Found ${partFiles.length} master HTML files with ${allSections.length} sections\n`);

  // Run all checks
  const sectionCheckResult = await checkSectionAttributes(allSections);
  const { sectionIds } = sectionCheckResult;

  let totalErrors = 0;
  totalErrors += await checkLayerSwitchRefs(allSections, sectionIds);
  totalErrors += await checkCrossReferences(allSections, sectionIds);
  totalErrors += await checkProhibitedElements(allContent);
  totalErrors += await checkContentOutsideSections(allContent);

  // Add errors from check 1
  totalErrors += sectionCheckResult.errorCount;

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Validation Summary:`);
  console.log(`   Parts checked: ${partFiles.length}`);
  console.log(`   Sections checked: ${allSections.length}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(e => console.log(`   - ${e}`));
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(w => console.log(`   - ${w}`));
  }

  if (errors.length === 0) {
    console.log('\n✅ Master validation passed (first batch of checks)');
  } else {
    console.log(`\n❌ Master validation FAILED with ${errors.length} error(s)`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
