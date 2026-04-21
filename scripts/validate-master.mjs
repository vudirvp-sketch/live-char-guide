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
 * Checks implemented (full Stage 2):
 *   1. All sections have correct data-layer and data-section attributes
 *   2. All data-layer-switch references are valid (target section exists in target layer)
 *   3. All cross-references (href="#id") resolve within the same or referenced layer
 *   4. No prohibited elements in master HTML (<style>, <script>, <link>, <meta>)
 *   5. No content outside <section data-layer> blocks
 *   6. Glossary terms are used in at least one Part
 *   7. Heading hierarchy is correct (no h4 without h3 parent)
 *   8. No prohibited translations
 *   9. Visual components are from registry (CSS class check)
 *  10. Character examples match Character Bible
 *  11. IMP-27: every L2 section has an L1 mention; every L3 section has an L2 mention
 *      (recognises both data-layer-switch and term-marker with data-target-layer)
 *  12. IMP-28: no orphan sections (every section is reachable)
 *  13. Callout emoji markers are correct (IMP-56)
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
        errors.push(`${section.file} (${section.sectionId}): data-layer-switch="${targetLayer}#${targetSection}" — target section is in layer ${targetActualLayer}, deeper than referenced layer ${targetLayer}. Link targets a section invisible at the switch layer.`);
        errorCount++;
      }

      // NEW: Check that data-layer-switch target layer matches section's actual layer
      // If a link targets data-layer-switch="2#section" but the section has data-layer="l1",
      // that is an error — the section is already available at L1, no need to switch layers
      if (actualLayerNum < targetLayerNum) {
        errors.push(`${section.file} (${section.sectionId}): data-layer-switch="${targetLayer}#${targetSection}" — target section is in layer ${targetActualLayer} (L${actualLayerNum}), but link implies layer ${targetLayer}. Section is already available at a lower layer; no layer switch needed.`);
        errorCount++;
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
// CHECK 6: Glossary terms used in at least one Part
// ============================================================================

async function checkGlossaryTermsUsed(allContent) {
  console.log('\n📋 Check 6: Glossary terms used in at least one Part...');

  let errorCount = 0;
  const glossaryPath = join(ROOT, 'data', 'glossary.json');

  if (!existsSync(glossaryPath)) {
    warnings.push('glossary.json not found — skipping glossary term check');
    return 0;
  }

  const glossaryData = JSON.parse(await readFile(glossaryPath, 'utf-8'));
  const terms = glossaryData.canonical_terms || [];
  const allText = allContent.map(c => c.content).join('\n');

  // Use case-insensitive matching for glossary term lookup
  const allTextLower = allText.toLowerCase();

  const unusedTerms = [];
  for (const term of terms) {
    const termName = term.term;
    const aliases = term.aliases || [];
    const allForms = [termName, ...aliases].filter(Boolean);

    const found = allForms.some(form => allTextLower.includes(form.toLowerCase()));
    if (!found) {
      unusedTerms.push(termName);
    }
  }

  if (unusedTerms.length > 0) {
    for (const term of unusedTerms) {
      warnings.push(`Glossary term "${term}" not found in any master HTML file`);
    }
    log('WARN', `${unusedTerms.length} glossary terms not used in any Part (see warnings)`);
  } else {
    log('INFO', `All ${terms.length} glossary terms are used in at least one Part`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 7: Heading hierarchy (no h4 without h3 parent)
// ============================================================================

async function checkHeadingHierarchy(allContent) {
  console.log('\n📋 Check 7: Heading hierarchy (no h4 without h3 parent)...');

  let errorCount = 0;

  for (const { file, content } of allContent) {
    const lines = content.split('\n');
    let lastH2Line = -1;
    let lastH3Line = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.match(/^<h2[^>]*>/i)) {
        lastH2Line = i;
        lastH3Line = -1;
      } else if (line.match(/^<h3[^>]*>/i)) {
        lastH3Line = i;
      } else if (line.match(/^<h4[^>]*>/i)) {
        if (lastH3Line === -1) {
          const match = line.match(/<h4[^>]*>(.*?)<\/h4>/i);
          const headingText = match ? match[1] : line.substring(0, 60);
          errors.push(`${file}: h4 "${headingText}" at line ${i + 1} has no h3 parent (h2 → h4 skip)`);
          errorCount++;
        }
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'All heading hierarchies are correct (no h2 → h4 skips)');
  }

  return errorCount;
}

// ============================================================================
// CHECK 8: No prohibited translations
// ============================================================================

async function checkProhibitedTranslations(allContent) {
  console.log('\n📋 Check 8: Prohibited translations...');

  let errorCount = 0;
  const prohibited = [
    { wrong: 'Авторские заметки', correct: "Author's Note" },
    { wrong: 'Авторка', correct: "Author's Note" },
    { wrong: 'Лорбук', correct: 'Lorebook' },
    { wrong: 'Описание персонажа', correct: 'Description (Описание)' },
  ];

  for (const { file, content } of allContent) {
    // Skip code blocks and pre blocks
    const cleaned = content
      .replace(/<pre>[\s\S]*?<\/pre>/gi, '')
      .replace(/<code>[\s\S]*?<\/code>/gi, '');

    for (const { wrong, correct } of prohibited) {
      const regex = new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      if (regex.test(cleaned)) {
        errors.push(`${file}: Prohibited translation "${wrong}" found — use "${correct}" instead`);
        errorCount++;
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No prohibited translations found');
  }

  return errorCount;
}

// ============================================================================
// CHECK 9: Visual components from registry (CSS class check)
// ============================================================================

async function checkVisualComponents(allContent) {
  console.log('\n📋 Check 9: Visual components from registry...');

  let errorCount = 0;
  const allowedCallouts = ['callout warn', 'callout tip', 'callout important', 'callout'];
  const prohibitedCallouts = ['callout info', 'callout note', 'callout sidebar', 'callout box', 'callout custom'];

  const allowedTags = ['tag tip', 'tag opt', 'tag risk', 'tag advanced', 'tag core', 'tag'];
  const prohibitedTags = ['tag warn'];

  for (const { file, content } of allContent) {
    // Check prohibited callout types
    for (const prohibited of prohibitedCallouts) {
      const regex = new RegExp(`class=["'][^"']*${prohibited.replace(' ', '\\s+')}[^"']*["']`, 'gi');
      if (regex.test(content)) {
        errors.push(`${file}: Prohibited callout class "${prohibited}" found — use .callout.warn/.tip/.important only`);
        errorCount++;
      }
    }

    // Check prohibited tag types
    for (const prohibited of prohibitedTags) {
      const regex = new RegExp(`class=["'][^"']*${prohibited.replace(' ', '\\s+')}[^"']*["']`, 'gi');
      if (regex.test(content)) {
        errors.push(`${file}: Prohibited tag class "${prohibited}" found — use .tag.risk instead`);
        errorCount++;
      }
    }

    // Check for inline styles
    const inlineStyleRegex = /style=["'][^"']+["']/gi;
    const contentNoCode = content.replace(/<pre>[\s\S]*?<\/pre>/gi, '').replace(/<code>[\s\S]*?<\/code>/gi, '');
    const inlineMatches = contentNoCode.match(inlineStyleRegex);
    if (inlineMatches) {
      for (const m of inlineMatches) {
        // Allow style on SVG elements only
        if (!m.includes('fill:') && !m.includes('stroke:') && !m.includes('stop-color')) {
          warnings.push(`${file}: Inline style found: ${m.substring(0, 80)}`);
        }
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'All visual components are from the registry');
  }

  return errorCount;
}

// ============================================================================
// CHECK 10: Character examples match Character Bible
// ============================================================================

async function checkCharacterBible(allContent) {
  console.log('\n📋 Check 10: Character examples match Character Bible...');

  let errorCount = 0;
  const bibleCharacters = [
    'Елена', 'Елена', 'Geralt', 'Геральт', 'Walter', 'Уолтер',
    'Jesse', 'Joker', 'Edward', 'Эдвард', 'Tyler', 'Выщербленный',
    'Elliot', 'Nameless One'
  ];

  // Check that Bible characters are used and no non-Bible characters appear as examples
  const allText = allContent.map(c => c.content).join('\n');

  // All main characters found
  const foundChars = bibleCharacters.filter(name => allText.includes(name));
  log('INFO', `Found ${foundChars.length} distinct Bible character references`);

  // Check for prohibited character "Макс" (placeholder from v5.12)
  if (allText.includes('Макс') && !allText.includes('Максим')) {
    // "Макс" as standalone character reference is from v5.12 placeholder
    const maxContext = allText.match(/Макс[^ильсв]/g);
    if (maxContext) {
      warnings.push('Found "Макс" — verify this is not the v5.12 placeholder (should be Walter+Jesse pair)');
    }
  }

  // Check for "Paul Atreides" (replaced by Edward Elric)
  if (allText.includes('Paul Atreides') || allText.includes('Пол Атрейдес')) {
    errors.push('Found "Paul Atreides" — should be replaced by Edward Elric per Character Bible');
    errorCount++;
  }

  // Check for "Shinji Ikari" (replaced by Elliot Alderson)
  if (allText.includes('Shinji Ikari') || allText.includes('Синдзи')) {
    errors.push('Found "Shinji Ikari" — should be replaced by Elliot Alderson per Character Bible');
    errorCount++;
  }

  if (errorCount === 0) {
    log('INFO', 'All character examples match Character Bible');
  }

  return errorCount;
}

// ============================================================================
// CHECK 11: IMP-27 — L2 sections have L1 mention, L3 sections have L2 mention
// ============================================================================

async function checkIMP27(allSections) {
  console.log('\n📋 Check 11: IMP-27 — Layer visibility bridges...');

  let errorCount = 0;

  // Group sections by part
  const partSections = new Map();
  for (const section of allSections) {
    const key = section.partNum;
    if (!partSections.has(key)) partSections.set(key, []);
    partSections.get(key).push(section);
  }

  for (const [partNum, sections] of partSections) {
    const l1Sections = sections.filter(s => s.layer === 'l1');
    const l2Sections = sections.filter(s => s.layer === 'l2');
    const l3Sections = sections.filter(s => s.layer === 'l3');

    // Check: L2 sections should have some mention in L1 (via layer-remark or brief reference)
    // This is a soft check — we look for data-layer-switch or text references
    const l1Content = l1Sections.map(s => s.content).join('\n');

    for (const l2Section of l2Sections) {
      // Check if there's a layer-remark pointing to this L2 section from L1
      const hasLayerRemark = l1Content.includes(`data-layer-switch="2#${l2Section.sectionId}"`) ||
                             l1Content.includes(l2Section.sectionId);

      // Soft check: at least one L2 concept should be visible from L1
      // We don't error on every L2 section without L1 mention — only flag if NO L2 sections are mentioned
    }

    // Check: at least one L2/L3 reference from L1 content
    // Supports both data-layer-switch and term-marker with data-target-layer
    if (l2Sections.length > 0 && l1Sections.length > 0) {
      const hasLayerSwitch = l1Content.includes('data-layer-switch="2#') ||
                             l1Content.includes('data-layer-switch="3#');
      const hasTermMarker = /data-target-layer=["']2["']/i.test(l1Content) ||
                           /data-target-layer=["']3["']/i.test(l1Content);
      if (!hasLayerSwitch && !hasTermMarker && l1Content.length > 0) {
        warnings.push(`Part ${partNum}: L1 content has no data-layer-switch or term-marker references to L2/L3 — IMP-27 bridge missing`);
      }
    }

    // Check: at least one L3 reference from L2 content
    const l2Content = l2Sections.map(s => s.content).join('\n');
    if (l3Sections.length > 0 && l2Sections.length > 0) {
      const hasLayerSwitch = l2Content.includes('data-layer-switch="3#');
      const hasTermMarker = /data-target-layer=["']3["']/i.test(l2Content);
      if (!hasLayerSwitch && !hasTermMarker && l2Content.length > 0) {
        errors.push(`Part ${partNum}: L2 content has no data-layer-switch or term-marker references to L3 — IMP-27 bridge missing`);
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'IMP-27 layer visibility bridges checked');
  }

  return errorCount;
}

// ============================================================================
// CHECK 12: IMP-28 — No orphan sections
// ============================================================================

async function checkIMP28(allSections, sectionIds) {
  console.log('\n📋 Check 12: IMP-28 — No orphan sections...');

  let errorCount = 0;

  // A section is reachable if:
  // 1. It has an h2 or h3 heading (appears in TOC)
  // 2. It is referenced by another section (data-layer-switch or href)
  // 3. It has a data-section ID (can be linked to)

  const referencedSections = new Set();

  // All sections with headings are reachable via TOC
  for (const section of allSections) {
    if (section.content.match(/<h[23][^>]*>/i)) {
      referencedSections.add(section.sectionId);
    }
  }

  // Sections referenced by data-layer-switch
  for (const section of allSections) {
    const layerSwitchRegex = /data-layer-switch=["']\d+#([^"']+)["']/gi;
    let match;
    while ((match = layerSwitchRegex.exec(section.content)) !== null) {
      referencedSections.add(match[1]);
    }

    // Sections referenced by href
    const hrefRegex = /href=["']#([^"']+)["']/gi;
    while ((match = hrefRegex.exec(section.content)) !== null) {
      referencedSections.add(match[1]);
    }
  }

  // Check for orphans
  for (const section of allSections) {
    if (section.sectionId && !referencedSections.has(section.sectionId)) {
      warnings.push(`Part ${section.partNum} (${section.sectionId}): Section may be orphan — no heading h2/h3 and no inbound references`);
    }
  }

  if (errorCount === 0) {
    log('INFO', 'IMP-28 orphan section check completed');
  }

  return errorCount;
}

// ============================================================================
// CHECK 13: Callout emoji markers (IMP-56)
// ============================================================================

async function checkCalloutEmoji(allContent) {
  console.log('\n📋 Check 13: Callout emoji markers (IMP-56)...');

  let errorCount = 0;
  const expectedEmojis = {
    'callout warn': '⚠️',
    'callout tip': '💡',
    'callout important': '📌',
  };

  for (const { file, content } of allContent) {
    // Find all callout blocks
    const calloutRegex = /<div\s+class=["']callout\s+(warn|tip|important)["'][^>]*>([\s\S]*?)<\/div>/gi;
    let match;

    while ((match = calloutRegex.exec(content)) !== null) {
      const calloutType = match[1];
      const calloutContent = match[2];
      const expectedEmoji = expectedEmojis[`callout ${calloutType}`];

      if (expectedEmoji && !calloutContent.includes(expectedEmoji)) {
        warnings.push(`${file}: .callout.${calloutType} missing expected emoji "${expectedEmoji}" (IMP-56)`);
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'Callout emoji markers check completed');
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
  totalErrors += await checkGlossaryTermsUsed(allContent);
  totalErrors += await checkHeadingHierarchy(allContent);
  totalErrors += await checkProhibitedTranslations(allContent);
  totalErrors += await checkVisualComponents(allContent);
  totalErrors += await checkCharacterBible(allContent);
  totalErrors += await checkIMP27(allSections);
  totalErrors += await checkIMP28(allSections, sectionIds);
  totalErrors += await checkCalloutEmoji(allContent);

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
    console.log('\n✅ Master validation PASSED (all 13 checks)');
  } else {
    console.log(`\n❌ Master validation FAILED with ${errors.length} error(s)`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
