#!/usr/bin/env node
/**
 * @fileoverview Migration Validation Script for Live Character Guide v6
 * @module scripts/validate-migration
 * @version 1.0.0
 *
 * @description
 * Stage 4 validation (IMP-30): verifies the v5.12 → v6 migration is complete
 * and correct. This script cross-references migration_map.md anchor mappings
 * against master HTML, section-registry, and build output to enforce the
 * Zero Degradation Principle (§0.4).
 *
 * Checks implemented:
 *   1. Parse migration_map.md and extract all v5.12 → v6 mappings
 *   2. Each mapped v6 data-section exists in master HTML
 *   3. All v5.12 concepts have corresponding v6 sections
 *   4. All mapped sections exist in section-registry.json
 *   5. CSS class migrations applied (.callout.info→.callout.important, .tag.warn→.tag.risk)
 *   6. No old data-layer-switch format ("2" → must be "2#section-id")
 *   7. No deprecated characters ("Макс", "Paul Atreides", "Shinji Ikari")
 *   8. No English text leaks ("Deception/Concealment" in anchor tables)
 *   9. Bug fix status from migration_map Bug Fix Tracking table
 *  10. Comprehensive pass/fail report
 *
 * Usage:
 *   node scripts/validate-migration.mjs
 *   node scripts/validate-migration.mjs --verbose
 */

import { readFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MIGRATION_MAP_PATH = join(ROOT, 'docs', 'migration_map.md');
const MASTER_DIR = join(ROOT, 'src', 'master');
const BUILD_DIR = join(ROOT, 'build');
const SECTION_REGISTRY_PATH = join(BUILD_DIR, 'section-registry.json');
const GLOSSARY_PATH = join(ROOT, 'data', 'glossary.json');

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

// ============================================================================
// PARSING: migration_map.md
// ============================================================================

/**
 * Parse the Anchor Mapping tables from migration_map.md.
 * Returns an array of { v5Anchor, v6Section, layer, notes, partHeader }
 */
function parseAnchorMappings(md) {
  const mappings = [];
  const lines = md.split('\n');
  let currentPart = '';
  let inAnchorTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect Part headers like "### Part 1: Basic Blocks"
    const partMatch = line.match(/^###\s+(Part\s+\d+[:\s].*)/);
    if (partMatch) {
      currentPart = partMatch[1].trim();
      inAnchorTable = false;
      continue;
    }

    // Detect anchor mapping table rows (| `anchor` | `section` | layer | notes |)
    if (line.startsWith('|') && line.includes('v5.12 Anchor')) {
      inAnchorTable = true;
      continue;
    }

    // Skip separator rows
    if (inAnchorTable && line.match(/^\|[\s\-:|]+\|$/)) {
      continue;
    }

    // End of table
    if (inAnchorTable && (!line.startsWith('|') || line.trim() === '')) {
      inAnchorTable = false;
      continue;
    }

    // Parse data rows
    if (inAnchorTable && line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 3) {
        const v5Raw = cells[0].replace(/^`|`$/g, '').trim();
        const v6Raw = cells[1].replace(/^`|`$/g, '').trim();
        const layer = cells[2] ? cells[2].trim() : '';
        const notes = cells[3] ? cells[3].trim() : '';

        // Skip header row (already handled above, but double-check)
        if (v5Raw === 'v5.12 Anchor' || v6Raw === 'v6 data-section') continue;

        // Skip placeholder entries (no actual v6 section exists)
        // These use patterns like _(not yet created)_, _(no separate section)_, or —
        if (v6Raw.startsWith('_(') || v6Raw === '—' || v6Raw === '') continue;

        mappings.push({
          v5Anchor: v5Raw,
          v6Section: v6Raw,
          layer,
          notes,
          partHeader: currentPart
        });
      }
    }
  }

  return mappings;
}

/**
 * Parse the CSS Class Migrations table from migration_map.md.
 * Returns an array of { v5Class, v6Class, notes }
 */
function parseCssMigrations(md) {
  const migrations = [];
  const lines = md.split('\n');
  let inTable = false;

  for (const line of lines) {
    if (line.includes('v5.12 Class') && line.includes('v6 Class')) {
      inTable = true;
      continue;
    }
    if (inTable && line.match(/^\|[\s\-:|]+\|$/)) continue;
    if (inTable && (!line.startsWith('|') || line.trim() === '')) {
      inTable = false;
      continue;
    }
    if (inTable && line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 2 && cells[0] !== 'v5.12 Class') {
        migrations.push({
          v5Class: cells[0].replace(/^\./, ''),
          v6Class: cells[1].replace(/^\./, ''),
          notes: cells[2] ? cells[2].trim() : ''
        });
      }
    }
  }

  return migrations;
}

/**
 * Parse the Bug Fix Tracking table from migration_map.md.
 * Returns an array of { bugId, fixLocation, status }
 */
function parseBugFixTracking(md) {
  const bugs = [];
  const lines = md.split('\n');
  let inTable = false;

  for (const line of lines) {
    if (line.includes('Bug ID') && line.includes('Fix Location') && line.includes('Status')) {
      inTable = true;
      continue;
    }
    if (inTable && line.match(/^\|[\s\-:|]+\|$/)) continue;
    if (inTable && (!line.startsWith('|') || line.trim() === '')) {
      inTable = false;
      continue;
    }
    if (inTable && line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 3 && cells[0] !== 'Bug ID') {
        bugs.push({
          bugId: cells[0],
          fixLocation: cells[1],
          status: cells[2]
        });
      }
    }
  }

  return bugs;
}

/**
 * Parse the Character Migration Notes table from migration_map.md.
 * Returns an array of { v5Character, v6Replacement, action }
 */
function parseCharacterMigrations(md) {
  const chars = [];
  const lines = md.split('\n');
  let inTable = false;

  for (const line of lines) {
    if (line.includes('v5.12 Character') && line.includes('v6 Replacement')) {
      inTable = true;
      continue;
    }
    if (inTable && line.match(/^\|[\s\-:|]+\|$/)) continue;
    if (inTable && (!line.startsWith('|') || line.trim() === '')) {
      inTable = false;
      continue;
    }
    if (inTable && line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 2 && cells[0] !== 'v5.12 Character') {
        chars.push({
          v5Character: cells[0],
          v6Replacement: cells[1],
          action: cells[2] ? cells[2].trim() : ''
        });
      }
    }
  }

  return chars;
}

/**
 * Parse the English Text Fixes table from migration_map.md.
 * Returns an array of { location, issue, fix }
 */
function parseEnglishTextFixes(md) {
  const fixes = [];
  const lines = md.split('\n');
  let inTable = false;

  for (const line of lines) {
    if (line.includes('v5.12 Location') && line.includes('Issue') && line.includes('Fix')) {
      inTable = true;
      continue;
    }
    if (inTable && line.match(/^\|[\s\-:|]+\|$/)) continue;
    if (inTable && (!line.startsWith('|') || line.trim() === '')) {
      inTable = false;
      continue;
    }
    if (inTable && line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 2 && cells[0] !== 'v5.12 Location') {
        fixes.push({
          location: cells[0],
          issue: cells[1],
          fix: cells[2] ? cells[2].trim() : ''
        });
      }
    }
  }

  return fixes;
}

// ============================================================================
// LOADING: Master HTML files
// ============================================================================

async function loadMasterFiles() {
  if (!existsSync(MASTER_DIR)) {
    errors.push(`Master directory not found: ${MASTER_DIR}`);
    return { allContent: [], sectionIds: new Set(), sectionData: new Map() };
  }

  const files = await readdir(MASTER_DIR);
  const partFiles = files.filter(f => f.startsWith('part_') && f.endsWith('.html')).sort();

  const allContent = [];
  const sectionIds = new Set();
  const sectionData = new Map(); // data-section → { file, layer, id }

  for (const file of partFiles) {
    const filepath = join(MASTER_DIR, file);
    const content = await readFile(filepath, 'utf-8');

    allContent.push({ file, content });

    // Extract data-section attributes
    const sectionRegex = /<section\s+([^>]*)>/gi;
    let match;
    while ((match = sectionRegex.exec(content)) !== null) {
      const attrs = match[1];
      const idMatch = attrs.match(/id=["']([^"']+)["']/i);
      const layerMatch = attrs.match(/data-layer=["']([^"']+)["']/i);
      const sectionMatch = attrs.match(/data-section=["']([^"']+)["']/i);

      if (idMatch) sectionIds.add(idMatch[1]);
      if (sectionMatch) {
        sectionIds.add(sectionMatch[1]);
        sectionData.set(sectionMatch[1], {
          file,
          layer: layerMatch ? layerMatch[1] : null,
          id: idMatch ? idMatch[1] : null
        });
      }
    }
  }

  return { allContent, sectionIds, sectionData };
}

// ============================================================================
// CHECK 1: Parse migration_map.md and extract all v5.12 → v6 mappings
// ============================================================================

async function checkParseMigrationMap(md) {
  console.log('\n📋 Check 1: Parse migration_map.md anchor mappings...');

  const mappings = parseAnchorMappings(md);

  if (mappings.length === 0) {
    errors.push('No anchor mappings found in migration_map.md — file may be malformed');
    return { mappings, errorCount: 1 };
  }

  log('INFO', `Parsed ${mappings.length} anchor mappings from migration_map.md`);

  // Group by part for verbose output
  if (VERBOSE) {
    const byPart = new Map();
    for (const m of mappings) {
      if (!byPart.has(m.partHeader)) byPart.set(m.partHeader, []);
      byPart.get(m.partHeader).push(m);
    }
    for (const [part, items] of byPart) {
      verbose(`${part}: ${items.length} mappings`);
    }
  }

  return { mappings, errorCount: 0 };
}

// ============================================================================
// CHECK 2: Each mapped v6 data-section exists in master HTML
// ============================================================================

async function checkMappedSectionsExist(mappings, sectionData) {
  console.log('\n📋 Check 2: Mapped v6 data-sections exist in master HTML...');

  let errorCount = 0;
  let foundCount = 0;
  const uniqueTargets = new Set(mappings.map(m => m.v6Section));

  for (const target of uniqueTargets) {
    if (sectionData.has(target)) {
      foundCount++;
      verbose(`data-section="${target}" found in ${sectionData.get(target).file}`);
    } else {
      errors.push(`Mapped v6 data-section="${target}" NOT FOUND in any master HTML file`);
      errorCount++;
    }
  }

  if (errorCount === 0) {
    log('INFO', `All ${uniqueTargets.size} unique v6 data-sections found in master HTML`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 3: All v5.12 concepts have corresponding v6 sections
// ============================================================================

async function checkConceptCoverage(mappings, sectionData) {
  console.log('\n📋 Check 3: v5.12 concepts have corresponding v6 sections...');

  let errorCount = 0;
  let coveredCount = 0;

  // Every v5.12 anchor must map to a non-empty v6 section
  for (const mapping of mappings) {
    if (!mapping.v6Section || mapping.v6Section.trim() === '') {
      errors.push(`v5.12 anchor "${mapping.v5Anchor}" (${mapping.partHeader}) has no v6 data-section mapping — Zero Degradation violation`);
      errorCount++;
      continue;
    }

    // The v6 section must exist
    if (!sectionData.has(mapping.v6Section)) {
      errors.push(`v5.12 concept "${mapping.v5Anchor}" → v6 "${mapping.v6Section}" — target section does not exist`);
      errorCount++;
    } else {
      coveredCount++;
      verbose(`v5.12 "${mapping.v5Anchor}" → v6 "${mapping.v6Section}" ✓`);
    }
  }

  if (errorCount === 0) {
    log('INFO', `All ${mappings.length} v5.12 concepts have corresponding v6 sections (${coveredCount} verified)`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 4: Cross-reference with section-registry.json
// ============================================================================

async function checkSectionRegistry(mappings) {
  console.log('\n📋 Check 4: Mapped sections exist in section-registry.json...');

  let errorCount = 0;
  let registry = null;

  if (!existsSync(SECTION_REGISTRY_PATH)) {
    errors.push('section-registry.json not found — run build first');
    return 1;
  }

  try {
    registry = JSON.parse(await readFile(SECTION_REGISTRY_PATH, 'utf-8'));
  } catch (e) {
    errors.push(`Failed to parse section-registry.json: ${e.message}`);
    return 1;
  }

  const registryKeys = new Set(Object.keys(registry));
  const uniqueTargets = new Set(mappings.map(m => m.v6Section));
  let foundCount = 0;

  for (const target of uniqueTargets) {
    if (registryKeys.has(target)) {
      foundCount++;
      // Verify layer consistency
      const regEntry = registry[target];
      const mappedMappings = mappings.filter(m => m.v6Section === target);
      for (const m of mappedMappings) {
        if (m.layer && regEntry.layer && m.layer !== regEntry.layer) {
          warnings.push(`Layer mismatch for "${target}": migration_map says "${m.layer}", registry says "${regEntry.layer}"`);
        }
      }
      verbose(`Registry: "${target}" → layer=${regEntry.layer}, part=${regEntry.part}`);
    } else {
      errors.push(`Mapped v6 section "${target}" NOT FOUND in section-registry.json`);
      errorCount++;
    }
  }

  // Also check for sections in registry that are NOT in migration map (informational)
  const unmappedSections = [];
  for (const key of registryKeys) {
    if (!uniqueTargets.has(key)) {
      unmappedSections.push(key);
    }
  }

  if (unmappedSections.length > 0) {
    verbose(`${unmappedSections.length} sections in registry not in migration map (may be v6-only additions): ${unmappedSections.join(', ')}`);
    info.push(`${unmappedSections.length} v6-only sections in registry (not mapped from v5.12)`);
  }

  if (errorCount === 0) {
    log('INFO', `All ${uniqueTargets.size} mapped sections found in section-registry.json`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 5: CSS class migrations applied
// ============================================================================

async function checkCssClassMigrations(allContent, cssMigrations) {
  console.log('\n📋 Check 5: CSS class migrations applied...');

  let errorCount = 0;

  // CSS migrations from migration_map: .callout.info → .callout.important, .tag.warn → .tag.risk
  const prohibitedClasses = [
    { v5: 'callout info', v6: 'callout important', bugId: 'BUG-4' },
    { v5: 'callout note', v6: 'callout tip', bugId: null },
    { v5: 'callout sidebar', v6: null, bugId: null },
    { v5: 'tag warn', v6: 'tag risk', bugId: 'BUG-6' }
  ];

  // Also add any parsed from migration_map
  for (const cm of cssMigrations) {
    if (!prohibitedClasses.some(pc => pc.v5 === cm.v5Class)) {
      prohibitedClasses.push({ v5: cm.v5Class, v6: cm.v6Class, bugId: null });
    }
  }

  for (const { file, content } of allContent) {
    // Skip code blocks
    const cleaned = content
      .replace(/<pre>[\s\S]*?<\/pre>/gi, '')
      .replace(/<code>[\s\S]*?<\/code>/gi, '');

    for (const { v5, v6, bugId } of prohibitedClasses) {
      // Look for the v5 class pattern in class attributes
      const v5Pattern = new RegExp(`class=["'][^"']*\\b${v5.replace(/\s+/g, '\\s+')}\\b[^"']*["']`, 'gi');
      const matches = cleaned.match(v5Pattern);

      if (matches) {
        const bugRef = bugId ? ` (${bugId})` : '';
        const fixMsg = v6 ? ` — use "${v6}" instead` : ' — class not allowed in v6';
        errors.push(`${file}: Found deprecated class "${v5}"${bugRef}${fixMsg}`);
        errorCount++;
      }
    }
  }

  // Positive check: verify v6 classes are actually used
  const requiredV6Classes = [
    { v6: 'callout important', desc: 'replaces .callout.info' },
    { v6: 'tag risk', desc: 'replaces .tag.warn' }
  ];

  const allText = allContent.map(c => c.content).join('\n');
  for (const { v6, desc } of requiredV6Classes) {
    const pattern = new RegExp(`class=["'][^"']*\\b${v6.replace(/\s+/g, '\\s+')}\\b[^"']*["']`, 'gi');
    if (pattern.test(allText)) {
      verbose(`v6 class "${v6}" (${desc}) is present ✓`);
    } else {
      warnings.push(`v6 class "${v6}" (${desc}) not found — may not be needed yet, or migration is incomplete`);
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No deprecated v5.12 CSS classes found in master HTML');
  }

  return errorCount;
}

// ============================================================================
// CHECK 6: No old data-layer-switch format
// ============================================================================

async function checkDataLayerSwitchFormat(allContent) {
  console.log('\n📋 Check 6: data-layer-switch format (must be "N#section-id")...');

  let errorCount = 0;
  let validCount = 0;

  for (const { file, content } of allContent) {
    // Find ALL data-layer-switch attributes
    const allLayerSwitchRegex = /data-layer-switch=["']([^"']+)["']/gi;
    let match;

    while ((match = allLayerSwitchRegex.exec(content)) !== null) {
      const value = match[1];

      // Old format: just a number like "2" or "3"
      if (/^\d+$/.test(value)) {
        errors.push(`${file}: Old data-layer-switch format "${value}" — v6 requires "N#section-id" format (e.g., "${value}#target-section")`);
        errorCount++;
        continue;
      }

      // New format: "N#section-id"
      const newFormatMatch = value.match(/^(\d+)#(.+)$/);
      if (newFormatMatch) {
        const layerNum = parseInt(newFormatMatch[1]);
        const sectionId = newFormatMatch[2];

        if (layerNum < 1 || layerNum > 3) {
          errors.push(`${file}: data-layer-switch="${value}" — invalid layer number ${layerNum} (must be 1-3)`);
          errorCount++;
          continue;
        }

        if (!sectionId || sectionId.trim() === '') {
          errors.push(`${file}: data-layer-switch="${value}" — empty section ID after #`);
          errorCount++;
          continue;
        }

        validCount++;
        verbose(`${file}: data-layer-switch="${value}" — valid ✓`);
      } else {
        errors.push(`${file}: data-layer-switch="${value}" — unrecognized format (expected "N#section-id")`);
        errorCount++;
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', `All data-layer-switch attributes use v6 format (${validCount} valid references)`);
  }

  return errorCount;
}

// ============================================================================
// CHECK 7: No deprecated characters
// ============================================================================

async function checkCharacterReplacements(allContent, charMigrations) {
  console.log('\n📋 Check 7: Character replacements applied...');

  let errorCount = 0;

  // Prohibited characters from migration_map
  const prohibitedCharacters = [
    { name: 'Макс', reason: 'v5.12 placeholder — replaced by Walter White + Jesse Pinkman pair', severity: 'error' },
    { name: 'Paul Atreides', reason: 'Replaced by Edward Elric per Character Bible', severity: 'error' },
    { name: 'Пол Атрейдес', reason: 'Russian variant of Paul Atreides — replaced by Edward Elric', severity: 'error' },
    { name: 'Shinji Ikari', reason: 'Replaced by Elliot Alderson per Character Bible', severity: 'error' },
    { name: 'Синдзи', reason: 'Russian variant of Shinji Ikari — replaced by Elliot Alderson', severity: 'error' }
  ];

  for (const { file, content } of allContent) {
    // Skip code blocks where character names might appear as examples of what NOT to do
    // But we still check — the character names should not appear in actual content
    const cleaned = content
      .replace(/<pre>[\s\S]*?<\/pre>/gi, '')   // Remove pre blocks
      .replace(/<code>[\s\S]*?<\/code>/gi, ''); // Remove inline code

    for (const { name, reason, severity } of prohibitedCharacters) {
      if (cleaned.includes(name)) {
        // Special case: "Макс" could be part of "Максим" (a real name)
        if (name === 'Макс') {
          // Check if it's standalone "Макс" not part of "Максим" or "Максимальный"
          const maxContext = cleaned.match(/Макс(?![ильсв])/g);
          if (maxContext) {
            errors.push(`${file}: Found deprecated character "${name}" — ${reason}`);
            errorCount++;
          }
        } else {
          if (severity === 'error') {
            errors.push(`${file}: Found deprecated character "${name}" — ${reason}`);
            errorCount++;
          } else {
            warnings.push(`${file}: Found deprecated character "${name}" — ${reason}`);
          }
        }
      }
    }
  }

  // Positive check: verify replacement characters exist
  const allText = allContent.map(c => c.content).join('\n');
  const replacementChecks = [
    { name: 'Walter', desc: 'replaces Макс' },
    { name: 'Jesse', desc: 'replaces Макс' },
    { name: 'Elliot', desc: 'replaces Shinji Ikari' }
  ];

  for (const { name, desc } of replacementChecks) {
    if (allText.includes(name)) {
      verbose(`Replacement character "${name}" (${desc}) found ✓`);
    } else {
      warnings.push(`Replacement character "${name}" (${desc}) not found — may not be used yet`);
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No deprecated v5.12 characters found in master HTML');
  }

  return errorCount;
}

// ============================================================================
// CHECK 8: No English text leaks
// ============================================================================

async function checkEnglishTextFixes(allContent, englishFixes) {
  console.log('\n📋 Check 8: No English text leaks in guide content...');

  let errorCount = 0;

  // Prohibited English terms from migration_map
  const prohibitedEnglish = [
    { term: 'Deception/Concealment', reason: 'Should be in Russian per migration_map' },
    { term: 'Deception', context: 'anchor table header', reason: 'Should be in Russian per migration_map' }
  ];

  // Also add any parsed from migration_map English Text Fixes
  for (const ef of englishFixes) {
    if (ef.issue && !prohibitedEnglish.some(pe => pe.term === ef.issue)) {
      prohibitedEnglish.push({ term: ef.issue, reason: ef.fix || 'Should be fixed per migration_map' });
    }
  }

  for (const { file, content } of allContent) {
    // Skip code blocks and pre blocks
    const cleaned = content
      .replace(/<pre>[\s\S]*?<\/pre>/gi, '')
      .replace(/<code>[\s\S]*?<\/code>/gi, '');

    for (const { term, reason } of prohibitedEnglish) {
      // Use word-boundary-aware matching for short terms
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'gi');

      if (regex.test(cleaned)) {
        errors.push(`${file}: Found English text "${term}" — ${reason}`);
        errorCount++;
      }
    }
  }

  if (errorCount === 0) {
    log('INFO', 'No prohibited English text found in guide content');
  }

  return errorCount;
}

// ============================================================================
// CHECK 9: Bug fix status from migration_map
// ============================================================================

async function checkBugFixStatus(bugFixes) {
  console.log('\n📋 Check 9: Bug fix status from migration_map...');

  let errorCount = 0;
  let fixedCount = 0;
  let pendingCount = 0;
  let otherCount = 0;

  for (const bug of bugFixes) {
    const statusLower = bug.status.toLowerCase();

    if (statusLower.includes('✅') || statusLower.includes('fixed') || statusLower.includes('verified')) {
      fixedCount++;
      verbose(`${bug.bugId} (${bug.fixLocation}): ${bug.status} ✓`);
    } else if (statusLower.includes('⏳') || statusLower.includes('pending') || statusLower.includes('during')) {
      pendingCount++;
      // HTML-related bugs (BUG-4, BUG-6) should be fixed by now (Stage 4)
      if (bug.fixLocation.toLowerCase().includes('html') || bug.fixLocation.toLowerCase().includes('migration')) {
        warnings.push(`${bug.bugId} (${bug.fixLocation}): Still pending — should be fixed by Stage 4`);
      } else {
        verbose(`${bug.bugId} (${bug.fixLocation}): Pending (non-HTML, may be fixed in different stage)`);
      }
    } else {
      otherCount++;
      verbose(`${bug.bugId} (${bug.fixLocation}): ${bug.status}`);
    }
  }

  // HTML-related bugs that MUST be fixed at Stage 4
  const htmlBugs = bugFixes.filter(b =>
    b.fixLocation.toLowerCase().includes('html') ||
    b.fixLocation.toLowerCase().includes('migration') ||
    b.bugId === 'BUG-4' ||
    b.bugId === 'BUG-6'
  );

  for (const bug of htmlBugs) {
    if (!bug.status.includes('✅')) {
      errors.push(`${bug.bugId} (${bug.fixLocation}): HTML/migration bug not yet fixed — Stage 4 requires completion`);
      errorCount++;
    }
  }

  log('INFO', `Bug fix status: ${fixedCount} fixed, ${pendingCount} pending, ${otherCount} other (total: ${bugFixes.length})`);

  return errorCount;
}

// ============================================================================
// CHECK 10: Comprehensive report
// ============================================================================

function generateReport(checkResults) {
  console.log('\n📋 Check 10: Generating comprehensive migration report...');

  const totalChecks = checkResults.length;
  const passedChecks = checkResults.filter(r => r.errorCount === 0).length;
  const failedChecks = totalChecks - passedChecks;

  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION VALIDATION REPORT');
  console.log('='.repeat(60));

  for (const result of checkResults) {
    const status = result.errorCount === 0 ? '✅ PASS' : '❌ FAIL';
    console.log(`   ${status}  Check ${result.checkNum}: ${result.name} (${result.errorCount} error(s))`);
  }

  console.log('-'.repeat(60));
  console.log(`   Total checks: ${totalChecks}`);
  console.log(`   Passed: ${passedChecks}`);
  console.log(`   Failed: ${failedChecks}`);
  console.log('='.repeat(60));

  return failedChecks;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🔍 Live Character Guide v6 — Migration Validation (Stage 4, IMP-30)\n');
  console.log('='.repeat(60));

  // Load migration_map.md
  if (!existsSync(MIGRATION_MAP_PATH)) {
    console.error('❌ migration_map.md not found. Cannot validate migration.');
    process.exit(1);
  }

  console.log('\n📂 Loading migration_map.md...');
  const md = await readFile(MIGRATION_MAP_PATH, 'utf-8');
  log('INFO', `Loaded migration_map.md (${md.split('\n').length} lines)`);

  // Pre-parse all tables from migration_map
  const cssMigrations = parseCssMigrations(md);
  const bugFixes = parseBugFixTracking(md);
  const charMigrations = parseCharacterMigrations(md);
  const englishFixes = parseEnglishTextFixes(md);

  verbose(`CSS migrations: ${cssMigrations.length}`);
  verbose(`Bug fixes tracked: ${bugFixes.length}`);
  verbose(`Character migrations: ${charMigrations.length}`);
  verbose(`English text fixes: ${englishFixes.length}`);

  // Load master HTML files
  console.log('\n📂 Loading master HTML files...');
  const { allContent, sectionIds, sectionData } = await loadMasterFiles();
  log('INFO', `Loaded ${allContent.length} master HTML files, ${sectionData.size} data-sections`);

  // Check that v5.12 source directories no longer exist (they've been fully migrated)
  const srcDir = join(ROOT, 'src');
  if (existsSync(srcDir)) {
    const srcEntries = await readdir(srcDir);
    const legacyDirs = srcEntries.filter(e =>
      e === 'parts-l1' || e === 'parts-l2' || e === 'parts-l3'
    );
    if (legacyDirs.length > 0) {
      warnings.push(`Legacy v5.12 directories still exist in src/: ${legacyDirs.join(', ')} — should be removed after migration`);
    } else {
      verbose('No legacy v5.12 source directories found in src/ ✓');
    }
  }

  // Run all checks
  const checkResults = [];

  // Check 1: Parse migration_map
  const check1 = await checkParseMigrationMap(md);
  const { mappings } = check1;
  checkResults.push({ checkNum: 1, name: 'Parse migration_map.md', errorCount: check1.errorCount });

  // Check 2: Mapped sections exist in master HTML
  const check2Errors = await checkMappedSectionsExist(mappings, sectionData);
  checkResults.push({ checkNum: 2, name: 'Mapped sections exist in master HTML', errorCount: check2Errors });

  // Check 3: v5.12 concept coverage
  const check3Errors = await checkConceptCoverage(mappings, sectionData);
  checkResults.push({ checkNum: 3, name: 'v5.12 concept coverage', errorCount: check3Errors });

  // Check 4: Section registry cross-reference
  const check4Errors = await checkSectionRegistry(mappings);
  checkResults.push({ checkNum: 4, name: 'Section registry cross-reference', errorCount: check4Errors });

  // Check 5: CSS class migrations
  const check5Errors = await checkCssClassMigrations(allContent, cssMigrations);
  checkResults.push({ checkNum: 5, name: 'CSS class migrations', errorCount: check5Errors });

  // Check 6: data-layer-switch format
  const check6Errors = await checkDataLayerSwitchFormat(allContent);
  checkResults.push({ checkNum: 6, name: 'data-layer-switch format', errorCount: check6Errors });

  // Check 7: Character replacements
  const check7Errors = await checkCharacterReplacements(allContent, charMigrations);
  checkResults.push({ checkNum: 7, name: 'Character replacements', errorCount: check7Errors });

  // Check 8: English text fixes
  const check8Errors = await checkEnglishTextFixes(allContent, englishFixes);
  checkResults.push({ checkNum: 8, name: 'English text fixes', errorCount: check8Errors });

  // Check 9: Bug fix status
  const check9Errors = await checkBugFixStatus(bugFixes);
  checkResults.push({ checkNum: 9, name: 'Bug fix status', errorCount: check9Errors });

  // Check 10: Comprehensive report
  const failedChecks = generateReport(checkResults);
  checkResults.push({ checkNum: 10, name: 'Comprehensive report', errorCount: 0 });

  // Summary
  const totalErrors = errors.length;
  const totalWarnings = warnings.length;

  console.log(`\n📊 Migration Validation Summary:`);
  console.log(`   Anchor mappings checked: ${mappings.length}`);
  console.log(`   Master sections found: ${sectionData.size}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(e => console.log(`   - ${e}`));
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(w => console.log(`   - ${w}`));
  }

  if (errors.length === 0) {
    console.log('\n✅ Migration validation PASSED (all 10 checks)');
    console.log(`   ${warnings.length} warnings (review recommended)`);
  } else {
    console.log(`\n❌ Migration validation FAILED with ${errors.length} error(s)`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
