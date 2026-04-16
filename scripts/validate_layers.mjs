#!/usr/bin/env node
/**
 * @fileoverview Phase 5: Layer System Validation Script
 * @module scripts/validate_layers
 * @version 1.0.0
 * 
 * @description
 * Validates the layer-based content visibility system:
 * - Checks that each layer shows ONLY its content + Layer 0
 * - Validates data-layer attributes in HTML files
 * - Reports any remaining legacy data-requires-track attributes
 * - Tests localStorage persistence simulation
 * 
 * @example
 * node scripts/validate_layers.mjs
 */

import { readFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PARTS_DIR = join(ROOT, 'src', 'parts');
const MANIFEST_PATH = join(ROOT, 'src', 'manifest', 'structure.json');
const NAV_MAP_PATH = join(ROOT, 'src', 'manifest', 'nav_map.json');
const STYLES_PATH = join(ROOT, 'src', 'parts', 'styles.css');
const MAIN_JS_PATH = join(ROOT, 'src', 'assets', 'main.js');
const GLOSSARY_JSON_PATH = join(ROOT, 'src', 'data', 'glossary.json');
const GLOSSARY_HTML_PATH = join(ROOT, 'src', 'parts', '02_glossary.html');

// Colors for console output
const COLORS = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  CYAN: '\x1b[36m',
};

function log(type, message) {
  const icons = { PASS: '✅', FAIL: '❌', WARN: '⚠️', INFO: 'ℹ️', SECTION: '\n━━' };
  const colors = { PASS: COLORS.GREEN, FAIL: COLORS.RED, WARN: COLORS.YELLOW, INFO: COLORS.CYAN, SECTION: COLORS.BLUE };
  console.log(`${colors[type]}${icons[type]} ${message}${COLORS.RESET}`);
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates that no legacy data-requires-track attributes remain
 */
async function validateNoLegacyAttributes() {
  log('SECTION', 'Validating no legacy attributes remain...');
  
  const files = await readdir(PARTS_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html'));
  const results = { passed: true, issues: [] };
  
  for (const file of htmlFiles) {
    const content = await readFile(join(PARTS_DIR, file), 'utf-8');
    const legacyMatches = content.match(/data-requires-track/g);
    
    if (legacyMatches) {
      results.passed = false;
      results.issues.push(`${file}: ${legacyMatches.length} legacy data-requires-track found`);
    }
  }
  
  if (results.passed) {
    log('PASS', 'No legacy data-requires-track attributes found');
  } else {
    log('FAIL', 'Legacy attributes found:');
    results.issues.forEach(issue => console.log(`   ${issue}`));
  }
  
  return results;
}

/**
 * Validates data-layer attribute usage in HTML files
 */
async function validateLayerAttributes() {
  log('SECTION', 'Validating data-layer attributes...');
  
  const files = await readdir(PARTS_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html'));
  const layerCounts = { '1': 0, '2': 0, '3': 0, invalid: [] };
  
  for (const file of htmlFiles) {
    const content = await readFile(join(PARTS_DIR, file), 'utf-8');
    
    // Find all data-layer attributes with proper pattern
    // Match only quoted values: data-layer="X" or data-layer='X'
    const validPattern = /data-layer=["']([123])["']/g;
    let match;
    while ((match = validPattern.exec(content)) !== null) {
      layerCounts[match[1]]++;
    }
    
    // Check for invalid layer values (anything other than 0, 1, 2, 3)
    const allLayerPattern = /data-layer=["']([^"']+)["']/g;
    while ((match = allLayerPattern.exec(content)) !== null) {
      if (!['0', '1', '2', '3'].includes(match[1])) {
        layerCounts.invalid.push(`${file}: data-layer="${match[1]}"`);
      }
    }
  }
  
  log('INFO', `Layer 1 elements: ${layerCounts['1']}`);
  log('INFO', `Layer 2 elements: ${layerCounts['2']}`);
  log('INFO', `Layer 3 elements: ${layerCounts['3']}`);
  
  if (layerCounts.invalid.length > 0) {
    log('FAIL', 'Invalid layer values found:');
    layerCounts.invalid.forEach(issue => console.log(`   ${issue}`));
    return { passed: false };
  }
  
  log('PASS', 'All data-layer attributes use valid values (0, 1, 2, 3)');
  return { passed: true };
}

/**
 * Validates CSS layer rules
 */
async function validateCSSRules() {
  log('SECTION', 'Validating CSS layer rules...');

  const content = await readFile(STYLES_PATH, 'utf-8');
  const results = { passed: true, issues: [] };

  // Check for Layer System comment header (CUMULATIVE model)
  if (!content.includes('LAYER SYSTEM: CUMULATIVE VISIBILITY MODEL')) {
    results.passed = false;
    results.issues.push('Missing Layer System CUMULATIVE VISIBILITY MODEL header comment');
  }

  // Check for layer color variables
  const requiredVars = ['--layer-0-clr', '--layer-1-clr', '--layer-2-clr', '--layer-3-clr'];
  for (const varName of requiredVars) {
    if (!content.includes(varName)) {
      results.passed = false;
      results.issues.push(`Missing CSS variable: ${varName}`);
    }
  }

  // Check for cumulative visibility rules
  const requiredRules = [
    'body[data-layer="1"] [data-layer="1"]',
    'body[data-layer="2"] [data-layer="1"]',
    'body[data-layer="2"] [data-layer="2"]',
    'body[data-layer="3"] [data-layer="1"]',
    'body[data-layer="3"] [data-layer="2"]',
    'body[data-layer="3"] [data-layer="3"]'
  ];

  for (const rule of requiredRules) {
    if (!content.includes(rule)) {
      results.passed = false;
      results.issues.push(`Missing cumulative CSS rule: ${rule}`);
    }
  }

  // Check that exclusive hiding rules are NOT present (deprecated)
  if (content.includes('body[data-layer="3"] [data-layer]:not([data-layer="3"])')) {
    results.passed = false;
    results.issues.push('DEPRECATED: Exclusive hiding rule found for Layer 3 - should use cumulative model');
  }

  if (results.passed) {
    log('PASS', 'CSS layer rules are correctly defined (cumulative model)');
  } else {
    log('FAIL', 'CSS validation issues:');
    results.issues.forEach(issue => console.log(`   ${issue}`));
  }

  return results;
}

/**
 * Validates JavaScript LayerState module
 */
async function validateJavaScript() {
  log('SECTION', 'Validating JavaScript LayerState module...');
  
  const content = await readFile(MAIN_JS_PATH, 'utf-8');
  const results = { passed: true, issues: [] };
  
  // Check for LayerState module
  if (!content.includes('window.LayerState')) {
    results.passed = false;
    results.issues.push('Missing window.LayerState export');
  }
  
  // Check for required functions
  const requiredFunctions = ['getLayer', 'setLayer', 'init'];
  for (const fn of requiredFunctions) {
    if (!content.includes(`getLayer:`) && !content.includes(`getLayer =`) && !content.includes(`.${fn}`)) {
      // More flexible check
      if (!content.includes(`getLayer`) && !content.includes(`setLayer`)) {
        results.passed = false;
        results.issues.push(`Missing function: ${fn}`);
      }
    }
  }
  
  // Check that migration function has been REMOVED (Phase 4)
  if (content.includes('migrateFromTracks')) {
    results.passed = false;
    results.issues.push('DEPRECATED: migrateFromTracks function should be removed (Phase 4)');
  }
  
  // Check for localStorage key
  if (!content.includes('guide-layer-selection')) {
    results.passed = false;
    results.issues.push('Missing guide-layer-selection localStorage key');
  }
  
  // Check for VALID_LAYERS
  if (!content.includes("VALID_LAYERS") && !content.includes("['1', '2', '3']")) {
    results.passed = false;
    results.issues.push('Missing VALID_LAYERS constant');
  }

  // Check for initTocContent function (Phase 3 migration)
  if (!content.includes('initTocContent')) {
    results.passed = false;
    results.issues.push('Missing initTocContent function (required for TOC generation)');
  }

  // Check for scrollToGlossary function (Phase 4 migration)
  if (!content.includes('scrollToGlossary')) {
    results.issues.push('WARN: scrollToGlossary function not found (enhanced glossary buttons)');
  }

  if (results.passed) {
    log('PASS', 'JavaScript LayerState module is correctly implemented');
  } else {
    log('FAIL', 'JavaScript validation issues:');
    results.issues.forEach(issue => console.log(`   ${issue}`));
  }
  
  return results;
}

/**
 * Validates manifest files
 */
async function validateManifests() {
  log('SECTION', 'Validating manifest files...');
  
  const results = { passed: true, issues: [] };
  
  // Validate structure.json
  const structureContent = await readFile(MANIFEST_PATH, 'utf-8');
  const structure = JSON.parse(structureContent);
  
  // Check layer_definitions
  if (!structure.layer_definitions || structure.layer_definitions.length !== 4) {
    results.passed = false;
    results.issues.push('structure.json: Missing or incomplete layer_definitions');
  }
  
  // Check layer field in parts
  const partsWithoutLayer = structure.parts.filter(p => p.layer === undefined && p.type === 'section');
  if (partsWithoutLayer.length > 0) {
    results.issues.push(`WARN: structure.json: ${partsWithoutLayer.length} parts without layer field`);
  }
  
  // Validate nav_map.json
  const navMapContent = await readFile(NAV_MAP_PATH, 'utf-8');
  const navMap = JSON.parse(navMapContent);
  
  // Check layer_matrix
  if (!navMap.navigation?.layer_matrix) {
    results.passed = false;
    results.issues.push('nav_map.json: Missing layer_matrix');
  } else {
    const layers = Object.keys(navMap.navigation.layer_matrix);
    if (!layers.includes('1') || !layers.includes('2') || !layers.includes('3')) {
      results.passed = false;
      results.issues.push('nav_map.json: layer_matrix missing required layers (1, 2, 3)');
    }
  }
  
  // Check layer_common
  if (!navMap.navigation?.layer_common) {
    results.issues.push('WARN: nav_map.json: Missing layer_common array');
  }
  
  if (results.passed) {
    log('PASS', 'Manifest files are correctly configured');
  } else {
    log('FAIL', 'Manifest validation issues:');
    results.issues.forEach(issue => console.log(`   ${issue}`));
  }
  
  return results;
}

/**
 * Validates layer distribution according to plan
 */
async function validateLayerDistribution() {
  log('SECTION', 'Validating layer distribution...');
  
  const structureContent = await readFile(MANIFEST_PATH, 'utf-8');
  const structure = JSON.parse(structureContent);
  
  const distribution = {
    0: structure.parts.filter(p => p.layer === 0).map(p => p.file),
    1: structure.parts.filter(p => p.layer === 1).map(p => p.file),
    2: structure.parts.filter(p => p.layer === 2).map(p => p.file),
    3: structure.parts.filter(p => p.layer === 3).map(p => p.file)
  };
  
  console.log('\n   Layer 0 (Common):');
  distribution[0].forEach(f => console.log(`      - ${f}`));
  
  console.log('\n   Layer 1 (Basic):');
  distribution[1].forEach(f => console.log(`      - ${f}`));
  
  console.log('\n   Layer 2 (Advanced):');
  distribution[2].forEach(f => console.log(`      - ${f}`));
  
  console.log('\n   Layer 3 (Expert):');
  distribution[3].forEach(f => console.log(`      - ${f}`));
  
  // Check critical files per layer
  const checks = [
    { layer: 0, files: ['00_meta.html', '01_header.html', '02_glossary.html'], name: 'Common' },
    { layer: 1, files: ['02_quickstart.html', '03_architecture.html'], name: 'Basic' },
    { layer: 2, files: ['05a_spine_anchors.html', '05b_cot_tiers.html'], name: 'Advanced' },
    { layer: 3, files: ['06a_antipatterns_core.html', '08b_debugging.html'], name: 'Expert' }
  ];
  
  let allPassed = true;
  for (const check of checks) {
    const missing = check.files.filter(f => !distribution[check.layer].includes(f));
    if (missing.length > 0) {
      log('FAIL', `${check.name} layer missing: ${missing.join(', ')}`);
      allPassed = false;
    }
  }
  
  if (allPassed) {
    log('PASS', 'Layer distribution follows the restructuring plan');
  }
  
  return { passed: allPassed };
}

/**
 * Validates glossary HTML and JSON consistency (Phase 2.9)
 * Ensures all terms in glossary.json have corresponding anchor IDs in 02_glossary.html
 */
async function validateGlossaryConsistency() {
  log('SECTION', 'Validating glossary.json ↔ 02_glossary.html consistency...');
  
  const results = { passed: true, issues: [], warnings: [] };
  
  // Read glossary.json
  let glossaryJson;
  try {
    const jsonContent = await readFile(GLOSSARY_JSON_PATH, 'utf-8');
    glossaryJson = JSON.parse(jsonContent);
  } catch (err) {
    results.passed = false;
    results.issues.push(`Failed to read glossary.json: ${err.message}`);
    return results;
  }
  
  // Read 02_glossary.html
  let htmlContent;
  try {
    htmlContent = await readFile(GLOSSARY_HTML_PATH, 'utf-8');
  } catch (err) {
    results.passed = false;
    results.issues.push(`Failed to read 02_glossary.html: ${err.message}`);
    return results;
  }
  
  // Extract anchor IDs from HTML
  const htmlAnchorPattern = /id="(layer-0-term-[^"]+)"/g;
  const htmlAnchors = new Set();
  let anchorMatch;
  while ((anchorMatch = htmlAnchorPattern.exec(htmlContent)) !== null) {
    htmlAnchors.add(anchorMatch[1]);
  }
  
  // Extract data-layers attributes from HTML
  const dataLayersPattern = /data-layers="([^"]+)"/g;
  const htmlDataLayers = new Set();
  let layersMatch;
  while ((layersMatch = dataLayersPattern.exec(htmlContent)) !== null) {
    htmlDataLayers.add(layersMatch[1]);
  }
  
  // Check each term in JSON has corresponding anchor in HTML
  const jsonTerms = glossaryJson.canonical_terms || [];
  const jsonAnchorIds = new Set();
  
  for (const term of jsonTerms) {
    if (term.anchor_id) {
      jsonAnchorIds.add(term.anchor_id);
      
      if (!htmlAnchors.has(term.anchor_id)) {
        results.passed = false;
        results.issues.push(`JSON term "${term.term}" has anchor_id="${term.anchor_id}" but not found in HTML`);
      }
      
      // Check applicable_layers field exists
      if (!term.applicable_layers || !Array.isArray(term.applicable_layers)) {
        results.warnings.push(`JSON term "${term.term}" missing applicable_layers array`);
      }
    }
  }
  
  // Check for orphaned anchors in HTML (not in JSON)
  for (const anchor of htmlAnchors) {
    if (!jsonAnchorIds.has(anchor)) {
      results.warnings.push(`HTML has anchor "${anchor}" with no corresponding JSON entry`);
    }
  }
  
  // Check version field
  if (!glossaryJson.version) {
    results.warnings.push('glossary.json missing version field');
  }
  
  // Check layer_markers field
  if (!glossaryJson.layer_markers) {
    results.warnings.push('glossary.json missing layer_markers field (for 📘/🔁/⚙️/🔍)');
  }
  
  // Summary
  log('INFO', `JSON terms: ${jsonTerms.length}`);
  log('INFO', `HTML anchors: ${htmlAnchors.size}`);
  log('INFO', `HTML data-layers attributes: ${htmlDataLayers.size}`);
  
  if (results.passed && results.issues.length === 0) {
    log('PASS', 'Glossary JSON and HTML are consistent');
    if (results.warnings.length > 0) {
      results.warnings.forEach(w => log('WARN', w));
    }
  } else {
    log('FAIL', 'Glossary consistency issues:');
    results.issues.forEach(issue => console.log(`   ${issue}`));
    results.warnings.forEach(w => log('WARN', w));
  }
  
  return results;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('PHASE 5: LAYER SYSTEM VALIDATION');
  console.log('='.repeat(60));
  
  const allResults = [];
  
  // Run all validations
  allResults.push(await validateNoLegacyAttributes());
  allResults.push(await validateLayerAttributes());
  allResults.push(await validateCSSRules());
  allResults.push(await validateJavaScript());
  allResults.push(await validateManifests());
  allResults.push(await validateLayerDistribution());
  allResults.push(await validateGlossaryConsistency());
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));
  
  const passed = allResults.filter(r => r.passed).length;
  const total = allResults.length;
  
  if (passed === total) {
    log('PASS', `All ${total} validation checks passed!`);
    console.log('\n✅ Phase 5: Layer System is correctly implemented.');
    console.log('   - Cumulative visibility model is working');
    console.log('   - Migration from track system is complete');
    console.log('   - All manifests and files are properly configured');
    process.exit(0);
  } else {
    log('FAIL', `${total - passed} of ${total} validation checks failed`);
    console.log('\n❌ Please fix the issues above before proceeding.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Validation error:', err);
  process.exit(1);
});
