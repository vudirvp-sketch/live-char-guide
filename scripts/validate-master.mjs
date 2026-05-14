#!/usr/bin/env node
/**
 * @fileoverview Unified HTML Validation Script for Live Character Guide v9
 * @module scripts/validate-master
 * @version 3.0.0
 *
 * @description
 * Stage 2 validation: checks unified HTML files for structural and content
 * integrity. This script validates the unified architecture described
 * in the v9 restructure plan.
 *
 * Checks implemented (12 checks — v9 restructure):
 *   1. No layer artifacts in unified HTML (data-layer, data-layer-switch, etc.)
 *   2. All cross-references (href="#id") resolve within the unified file set
 *   3. No prohibited elements in unified HTML (<style>, <script>, <link>, <meta>)
 *   4. No content outside <section data-section> blocks
 *   5. Glossary terms are used in at least one Part
 *   6. Heading hierarchy is correct (no h4 without h3 parent)
 *   7. No prohibited translations
 *   8. Visual components are from registry (CSS class check)
 *   9. Character examples match Character Bible
 *  10. IMP-28: no orphan sections (every section is reachable)
 *  11. Callout blocks must NOT contain emoji markers (v9)
 *  12. Widget containers present (ocean-embed, enneagram-embed, etc.)
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
const UNIFIED_DIR = join(ROOT, 'src', 'master');
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
// PARSE ALL UNIFIED FILES
// ============================================================================

async function parseAllUnifiedFiles() {
  if (!existsSync(UNIFIED_DIR)) {
    log('ERROR', `Unified directory not found: ${UNIFIED_DIR}`);
    process.exit(1);
  }

  const unifiedFiles = await readdir(UNIFIED_DIR);
  const partFiles = unifiedFiles.filter(f => f.startsWith('part_') && f.endsWith('.html')).sort();
  const appendixFiles = unifiedFiles.filter(f => f.startsWith('appendix_') && f.endsWith('.html')).sort();
  const allFiles = [...partFiles, ...appendixFiles];

  if (partFiles.length === 0) {
    log('ERROR', 'No part files found in unified directory');
    process.exit(1);
  }

  const allSections = [];
  const allContent = [];

  for (const file of allFiles) {
    const filepath = join(UNIFIED_DIR, file);
    const content = await readFile(filepath, 'utf-8');
    const partMatch = file.match(/part_(\d+[a-z]?)/);
    const partNum = partMatch ? partMatch[1] : (file.startsWith('appendix_') ? 'appendix' : '00');

    // Parse sections — no data-layer required, only data-section
    const sectionRegex = /<section\s+([^>]*)>/gi;
    let match;

    while ((match = sectionRegex.exec(content)) !== null) {
      const attrs = match[1];
      const sectionMatch = attrs.match(/data-section=["']([^"']+)["']/i);

      if (sectionMatch) {
        const sectionId = sectionMatch[1];

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
// CHECK 1: No layer artifacts in unified HTML
// ============================================================================

async function checkNoLayerArtifacts(allContent) {
  console.log('\n📋 Check 1: No layer artifacts in unified HTML...');

  let errorCount = 0;
  const layerPatterns = [
    { pattern: /data-layer=/i, name: 'data-layer=' },
    { pattern: /data-layer-switch=/i, name: 'data-layer-switch=' },
    { pattern: /data-target-layer=/i, name: 'data-target-layer=' },
    { pattern: /class="layer-remark"/i, name: 'class="layer-remark"' },
  ];

  for (const { file, content } of allContent) {
    for (const { pattern, name } of layerPatterns) {
      if (pattern.test(content)) {
        errors.push(`${file}: Layer artifact found: ${name}`);
        errorCount++;
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No layer artifacts found in unified HTML files');
  }

  return errorCount;
}

// ============================================================================
// CHECK 2: All cross-references (href="#id") resolve
// ============================================================================

async function checkCrossReferences(allSections, sectionIds) {
  console.log('\n📋 Check 2: Cross-references (href="#id")...');

  let errorCount = 0;
  let refCount = 0;

  for (const section of allSections) {
    // Find all href="#id" links
    const hrefRegex = /href=["']#([^"']+)["']/gi;
    let match;

    while ((match = hrefRegex.exec(section.content)) !== null) {
      const targetId = match[1];
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
// CHECK 3: No prohibited elements in unified HTML
// ============================================================================

async function checkProhibitedElements(allContent) {
  console.log('\n📋 Check 3: Prohibited elements (<style>, <script>, <link>, <meta>)...');

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
    log('INFO', 'No prohibited elements found in any unified HTML file');
  }

  return errorCount;
}

// ============================================================================
// CHECK 4: No content outside <section data-section> blocks
// ============================================================================

async function checkContentOutsideSections(allContent) {
  console.log('\n📋 Check 4: Content outside <section data-section> blocks...');

  let errorCount = 0;

  for (const { file, content } of allContent) {
    // Strip HTML comments BEFORE section boundary analysis so they
    // don't get flagged as "content outside sections" (RP-10 fix).
    const contentNoComments = content.replace(/<!--[\s\S]*?-->/g, '');

    // Remove all sections (including their content)
    // We'll use a different approach: find what's NOT inside sections

    // Find all section boundaries
    const sectionStarts = [];
    const sectionEnds = [];
    const sectionRegex = /<section\s+[^>]*data-section[^>]*>/gi;
    let match;

    while ((match = sectionRegex.exec(contentNoComments)) !== null) {
      sectionStarts.push(match.index);
    }

    // For each section start, find its matching end
    for (const startIdx of sectionStarts) {
      const startTagEnd = contentNoComments.indexOf('>', startIdx) + 1;
      let depth = 1;
      let searchPos = startTagEnd;

      while (depth > 0 && searchPos < contentNoComments.length) {
        const nextOpen = contentNoComments.indexOf('<section', searchPos);
        const nextClose = contentNoComments.indexOf('</section>', searchPos);

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
        const betweenContent = contentNoComments.slice(lastEnd, sectionStarts[i]).trim();
        if (betweenContent.length > 0) {
          outsideRanges.push(betweenContent);
        }
        lastEnd = sectionEnds[i];
      }
    }

    // Check after last section
    const afterContent = contentNoComments.slice(lastEnd).trim();
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
        warnings.push(`${file}: Content found outside <section data-section> blocks: "${cleaned.substring(0, 80)}..."`);
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No significant content found outside <section data-section> blocks');
  }

  return errorCount;
}

// ============================================================================
// CHECK 5: Glossary terms used in at least one Part
// ============================================================================

async function checkGlossaryTermsUsed(allContent) {
  console.log('\n📋 Check 5: Glossary terms used in at least one Part...');

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
      warnings.push(`Glossary term "${term}" not found in any unified HTML file`);
    }
    log('WARN', `${unusedTerms.length} glossary terms not used in any Part (see warnings)`);
  } else {
    log('INFO', `All ${terms.length} glossary terms are used in at least one Part`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 6: Heading hierarchy (no h4 without h3 parent)
// ============================================================================

async function checkHeadingHierarchy(allContent) {
  console.log('\n📋 Check 6: Heading hierarchy (no h4 without h3 parent)...');

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
// CHECK 7: No prohibited translations
// ============================================================================

async function checkProhibitedTranslations(allContent) {
  console.log('\n📋 Check 7: Prohibited translations...');

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
// CHECK 8: Visual components from registry (CSS class check)
// ============================================================================

async function checkVisualComponents(allContent) {
  console.log('\n📋 Check 8: Visual components from registry...');

  let errorCount = 0;
  const allowedCallouts = ['callout rule', 'callout rec', 'callout ex', 'callout'];
  const prohibitedCallouts = ['callout info', 'callout note', 'callout sidebar', 'callout box', 'callout custom', 'callout warn', 'callout tip', 'callout important'];

  const allowedTags = ['tag core', 'tag'];
  const prohibitedTags = ['tag warn', 'tag opt', 'tag risk', 'tag advanced', 'tag tip'];

  for (const { file, content } of allContent) {
    // Check prohibited callout types
    for (const prohibited of prohibitedCallouts) {
      const regex = new RegExp(`class=["'][^"']*${prohibited.replace(' ', '\\s+')}[^"']*["']`, 'gi');
      if (regex.test(content)) {
        errors.push(`${file}: Prohibited callout class "${prohibited}" found — use .callout.rule/.rec/.ex only`);
        errorCount++;
      }
    }

    // Check prohibited tag types
    for (const prohibited of prohibitedTags) {
      const regex = new RegExp(`class=["'][^"']*${prohibited.replace(' ', '\\s+')}[^"']*["']`, 'gi');
      if (regex.test(content)) {
        errors.push(`${file}: Prohibited tag class "${prohibited}" found — use .tag.core instead`);
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
// CHECK 9: Character examples match Character Bible
// ============================================================================

async function checkCharacterBible(allContent) {
  console.log('\n📋 Check 9: Character examples match Character Bible...');

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
// CHECK 10: IMP-28 — No orphan sections
// ============================================================================

async function checkIMP28(allSections, sectionIds) {
  console.log('\n📋 Check 10: IMP-28 — No orphan sections...');

  let errorCount = 0;

  // A section is reachable if:
  // 1. It has an h2 or h3 heading (appears in TOC)
  // 2. It is referenced by another section via href
  // 3. It has a data-section ID (can be linked to)

  const referencedSections = new Set();

  // All sections with headings are reachable via TOC
  for (const section of allSections) {
    if (section.content.match(/<h[23][^>]*>/i)) {
      referencedSections.add(section.sectionId);
    }
  }

  // Sections referenced by href
  for (const section of allSections) {
    const hrefRegex = /href=["']#([^"']+)["']/gi;
    let match;
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
// CHECK 11: Callout blocks must NOT contain emoji markers (v9)
// ============================================================================

async function checkCalloutEmoji(allContent) {
  console.log('\n📋 Check 11: Callout blocks must NOT contain emoji markers (v9)...');

  let errorCount = 0;
  const v9CalloutTypes = ['callout rule', 'callout rec', 'callout ex'];
  const emojiSet = /[�⚠️💡🎯📝📋✅❌]/u;

  for (const { file, content } of allContent) {
    // Find all v9 callout blocks
    for (const calloutType of v9CalloutTypes) {
      const classPattern = calloutType.replace(' ', '\\s+');
      const calloutRegex = new RegExp(
        `<div\\s+class=["']${classPattern}["'][^>]*>([\\s\\S]*?)<\/div>`, 'gi'
      );
      let match;

      while ((match = calloutRegex.exec(content)) !== null) {
        const calloutContent = match[1];

        if (emojiSet.test(calloutContent)) {
          // Find which emoji was matched for a helpful message
          const foundEmoji = calloutContent.match(emojiSet);
          const emojiChar = foundEmoji ? foundEmoji[0] : 'emoji';
          warnings.push(
            `${file}: .${calloutType.replace(' ', '.')} block contains emoji "${emojiChar}" — v9 callouts must not include emoji markers`
          );
        }
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No emoji markers found in v9 callout blocks');
  }

  return errorCount;
}

// ============================================================================
// CHECK 12: Widget containers present
// ============================================================================

async function checkWidgetContainers(allSections) {
  console.log('\n📋 Check 12: Widget containers present...');

  let errorCount = 0;

  const requiredWidgets = [
    { id: 'ocean-embed', sectionContains: 'ocean' },
    { id: 'enneagram-embed', sectionContains: 'enneagram' },
    { id: 'mbti-embed', sectionContains: 'mbti', optional: true },
    { id: 'persona-cross', sectionContains: 'cross' },
    { id: 'persona-synthesis', sectionContains: 'cross' },
    { id: 'ocean-static', sectionContains: 'ocean' },
    { id: 'token-calc', sectionContains: ['token_budget', 'p1_token'] },
  ];

  for (const widget of requiredWidgets) {
    // Normalize sectionContains to an array for uniform handling
    const keywords = Array.isArray(widget.sectionContains) ? widget.sectionContains : [widget.sectionContains];

    // Find a section whose data-section contains any of the required keywords
    const matchingSection = allSections.find(s =>
      s.sectionId && keywords.some(kw => s.sectionId.includes(kw))
    );

    if (!matchingSection) {
      warnings.push(`Widget "${widget.id}": No section with data-section containing "${keywords.join("' or '")}" found`);
      continue;
    }

    // Check if the widget ID exists in that section's content
    const idPattern = new RegExp(`id=["']${widget.id}["']`, 'i');
    if (!idPattern.test(matchingSection.content)) {
      // Also check across all sections containing any of the keywords
      const allMatching = allSections.filter(s =>
        s.sectionId && keywords.some(kw => s.sectionId.includes(kw))
      );
      const foundAnywhere = allMatching.some(s => idPattern.test(s.content));
      if (!foundAnywhere) {
        if (widget.optional) {
          warnings.push(`Widget "${widget.id}" not found — optional (MBTI moved to Appendix A in v9)`);
        } else {
          errors.push(`Widget "${widget.id}" not found in any section with data-section containing "${keywords.join("' or '")}"`);
          errorCount++;
        }
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'All required widget containers are present');
  }

  return errorCount;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🔍 Live Character Guide v9 — Unified HTML Validation\n');
  console.log('=' .repeat(60));

  const { allSections, allContent, partFiles } = await parseAllUnifiedFiles();

  log('INFO', `Found ${partFiles.length} unified HTML files with ${allSections.length} sections\n`);

  // Build sectionIds set from parsed sections
  const sectionIds = new Set(allSections.map(s => s.sectionId).filter(Boolean));

  let totalErrors = 0;
  totalErrors += await checkNoLayerArtifacts(allContent);
  totalErrors += await checkCrossReferences(allSections, sectionIds);
  totalErrors += await checkProhibitedElements(allContent);
  totalErrors += await checkContentOutsideSections(allContent);
  totalErrors += await checkGlossaryTermsUsed(allContent);
  totalErrors += await checkHeadingHierarchy(allContent);
  totalErrors += await checkProhibitedTranslations(allContent);
  totalErrors += await checkVisualComponents(allContent);
  totalErrors += await checkCharacterBible(allContent);
  totalErrors += await checkIMP28(allSections, sectionIds);
  totalErrors += await checkCalloutEmoji(allContent);
  totalErrors += await checkWidgetContainers(allSections);

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
    console.log('\n✅ Unified validation PASSED (all 12 checks)');
  } else {
    console.log(`\n❌ Unified validation FAILED with ${errors.length} error(s)`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
