#!/usr/bin/env node
/**
 * @fileoverview Generate Anchor Redirect Map for v5.12 → v6 migration
 * @module scripts/gen-redirect-map
 * @version 1.0.0
 *
 * @description
 * Generates the ANCHOR_REDIRECTS map for lazy-loader.js to handle backward
 * compatibility with v5.12 URLs. See §0.18 of the plan.
 *
 * v5.12 URLs use anchors like #03_core_blocks, #04_spine
 * v6 URLs use anchors like #p2_basic_anchors, #p4_spine_overview
 *
 * This script generates the mapping from migration_map.md.
 *
 * Usage:
 *   node scripts/gen-redirect-map.mjs
 */

import { readFile, writeFile, existsSync } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MIGRATION_MAP_PATH = join(ROOT, 'docs', 'migration_map.md');
const OUTPUT_PATH = join(ROOT, 'build', 'anchor-redirects.json');

// ============================================================================
// FALLBACK REDIRECT MAP
// ============================================================================

/**
 * Default redirects if migration_map.md doesn't exist yet.
 * Based on analysis of v5.12 structure.
 */
const DEFAULT_REDIRECTS = {
  // Part 1 (Intro) → Part 1
  '01_intro': 'p1_card_overview',
  'intro': 'p1_card_overview',
  'what-is-card': 'p1_card_overview',

  // Part 2 (Core Blocks / Anchors) → Part 2
  '02_quickstart': 'p2_basic_anchors',
  '03_core_blocks': 'p2_basic_anchors',
  'anchors': 'p2_basic_anchors',
  'anchor-format': 'p2_anchor_format',
  'trigger': 'p2_trigger',
  'action': 'p2_action',
  'price': 'p2_price',
  'embodiment': 'p2_embodiment',
  'flaw-anchors': 'p2_flaw_anchors',

  // Part 3 (Voice) → Part 3
  'voice-isolation': 'p3_voice_isolation',
  'examples': 'p3_examples',
  'greeting': 'p3_greeting',
  'voice-leak': 'p3_voice_leak',
  'tier-quality': 'p3_tier_quality',
  'dialogue-markup': 'p3_dialogue_markup',
  'multi-char': 'p3_multi_char',
  'joker-case': 'p3_joker_case',

  // Part 4 (SPINE) → Part 4
  '04_spine': 'p4_spine_overview',
  'spine': 'p4_spine_overview',
  'want': 'p4_want',
  'need': 'p4_need',
  'flaw': 'p4_flaw',
  'lie': 'p4_lie',
  'ghost': 'p4_ghost',
  'ghost-layers': 'p4_ghost_layers',
  'spine-mapping': 'p4_spine_mapping',

  // Part 5 (Psych Toolkit) → Part 5
  '05_ocean': 'p5_ocean_basics',
  'ocean': 'p5_ocean_basics',
  'ocean-poles': 'p5_ocean_poles',
  'ocean-validator': 'p5_ocean_validator',
  'enneagram': 'p5_enneagram_basics',
  'enneagram-types': 'p5_enneagram_types',
  'enneagram-wings': 'p5_enneagram_wings',
  'mbti': 'p5_mbti_basics',
  'cross-matrix': 'p5_cross_matrix',

  // Part 6 (CoT) → Part 6
  'cot': 'p6_cot_basics',
  'cot-tiers': 'p6_cot_basics',
  'cot-tier1': 'p6_cot_tier1',
  'cot-tier2': 'p6_cot_tier2',
  'cot-tier3': 'p6_cot_tier3',
  'cot-anchors': 'p6_cot_anchors',

  // Part 7 (Technical) → Part 7
  'technical': 'p7_system_prompt',
  'system-prompt': 'p7_system_prompt',
  'authors-note': 'p7_authors_note',
  'lorebook': 'p7_lorebook',
  'format-lock': 'p7_format_lock',
  'structured-inject': 'p7_structured_inject',
  'xml-tags': 'p7_xml_tags',
  'api-blocks': 'p7_api_blocks',
  '4k-fallback': 'p7_4k_fallback',

  // Part 8 (Antipatterns) → Part 8
  'antipatterns': 'p8_antipatterns_overview',
  'ap-godmoding': 'p8_antipattern_godmoding',
  'ap-ooc': 'p8_antipattern_ooc',
  'ap-voice': 'p8_antipattern_voice',
  'ap-ocean': 'p8_antipattern_ocean',
  'ap-anchors': 'p8_antipattern_anchors',
  'ap-spine': 'p8_antipattern_spine',

  // Part 9 (Diagnostics) → Part 9
  '04_troubleshooting': 'p9_troubleshooting',
  'troubleshooting': 'p9_troubleshooting',
  'decision-tree': 'p9_decision_tree',
  '12b-issues': 'p9_12b_issues',
  'token-budget': 'p9_token_budget',
  'layer-comparison': 'p9_layer_comparison',

  // Glossary
  '05_glossary': 'glossary',
  'glossary': 'glossary',

  // Appendix
  '06_appendix': 'appendix',
  'appendix': 'appendix'
};

// ============================================================================
// PARSE MIGRATION MAP
// ============================================================================

async function parseMigrationMap() {
  if (!existsSync(MIGRATION_MAP_PATH)) {
    console.log('⚠️  migration_map.md not found, using default redirects');
    return DEFAULT_REDIRECTS;
  }

  const content = await readFile(MIGRATION_MAP_PATH, 'utf-8');
  const redirects = {};

  // Parse markdown table for v5.12 → v6 mappings
  // Expected format: | v5.12 anchor | v6 data-section | ...
  const lines = content.split('\n');
  let inTable = false;

  for (const line of lines) {
    // Check for table start
    if (line.startsWith('|') && line.includes('v5.12')) {
      inTable = true;
      continue;
    }

    // Skip header separator
    if (inTable && line.match(/^\|[\s-:|]+\|$/)) {
      continue;
    }

    // Parse table rows
    if (inTable && line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter(c => c);

      if (cells.length >= 2) {
        const v5Anchor = cells[0];
        const v6Section = cells[1];

        if (v5Anchor && v6Section && !v5Anchor.startsWith('-')) {
          redirects[v5Anchor] = v6Section;
        }
      }
    }

    // End of table
    if (inTable && !line.startsWith('|') && line.trim()) {
      inTable = false;
    }
  }

  // Merge with defaults (defaults fill in any gaps)
  return { ...DEFAULT_REDIRECTS, ...redirects };
}

// ============================================================================
// GENERATE OUTPUT
// ============================================================================

async function generateRedirectMap() {
  console.log('=== Generating Anchor Redirect Map ===\n');

  const redirects = await parseMigrationMap();

  // Generate JSON output
  const output = {
    generated: new Date().toISOString(),
    description: 'Anchor redirects for v5.12 → v6 migration. Used by lazy-loader.js handleLegacyAnchor().',
    redirects
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`✓ Generated: ${OUTPUT_PATH}`);
  console.log(`  ${Object.keys(redirects).length} redirect mappings`);

  // Also generate JavaScript module
  const jsOutput = `/**
 * Anchor redirects for v5.12 → v6 migration
 * Auto-generated by gen-redirect-map.mjs
 * DO NOT EDIT MANUALLY
 */

export const ANCHOR_REDIRECTS = ${JSON.stringify(redirects, null, 2)};

/**
 * Handle legacy anchor from v5.12 URLs.
 * Call on DOMContentLoaded and popstate.
 *
 * @param {string} hash - The URL hash (without #)
 * @returns {string|null} - The v6 section ID, or null if no redirect needed
 */
export function getRedirect(hash) {
  return ANCHOR_REDIRECTS[hash] || null;
}
`;

  const jsPath = OUTPUT_PATH.replace('.json', '.js');
  await writeFile(jsPath, jsOutput);
  console.log(`✓ Generated: ${jsPath}`);

  return Object.keys(redirects).length;
}

// ============================================================================
// ENTRY POINT
// ============================================================================

generateRedirectMap()
  .then(count => {
    console.log('\n============================================');
    console.log('REDIRECT MAP GENERATION SUCCESSFUL');
    console.log('============================================');
    console.log(`Total redirects: ${count}`);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Generation failed:', err.message);
    console.error(err);
    process.exit(1);
  });
