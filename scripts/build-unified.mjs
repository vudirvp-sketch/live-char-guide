#!/usr/bin/env node
/**
 * @fileoverview Build Unified Script for Live Character Guide v9
 * @module scripts/build-unified
 * @version 9.0.0
 *
 * @description
 * Reads src/master/part_*.html and appendix_*.html and produces
 * a single set of output files in build/parts/.
 * All sections are processed equally — no layer-based filtering.
 *
 * Input:  src/master/part_01.html ... part_10.html (including part_07a, part_07b)
 *         src/master/appendix_mbti.html, appendix_model_table.html
 *         data/glossary.json
 * Output: build/parts/part_01.html ... part_10.html
 *         build/parts/appendix_mbti.html, appendix_model_table.html
 *         build/parts/manifest.json
 *         build/parts/glossary.html
 *         build/parts/footer.html
 *         build/section-registry.json
 *         build/build-manifest.json
 */

import { readFile, writeFile, readdir, mkdir, rm, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const UNIFIED_DIR = join(ROOT, 'src', 'master');
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

function parseUnifiedHTML(content, filename) {
  const sections = [];
  const errors = [];

  // Find all section elements
  const sectionOpenRegex = /<section\s+([^>]*)>/gi;
  let match;

  while ((match = sectionOpenRegex.exec(content)) !== null) {
    const attrs = match[1];

    // Extract data-section
    const sectionMatch = attrs.match(/data-section=["']([^"']+)["']/i);
    if (!sectionMatch) {
      errors.push({
        file: filename,
        message: `Section missing data-section attribute: ${attrs.slice(0, 80)}`
      });
      continue;
    }

    const sectionId = sectionMatch[1];

    // Capture data-* attributes
    const dataAttrs = {};
    const dataAttrRegex = /data-([a-z][-a-z0-9]*)=["']([^"']*)["']/gi;
    let dataMatch;
    while ((dataMatch = dataAttrRegex.exec(attrs)) !== null) {
      dataAttrs[dataMatch[1]] = dataMatch[2];
    }
    // Boolean data-* attributes without values
    const booleanAttrRegex = /(^|\s)(data-([a-z][-a-z0-9]*))(?=\s|$)/gi;
    let boolMatch;
    while ((boolMatch = booleanAttrRegex.exec(attrs)) !== null) {
      const key = boolMatch[3];
      if (!(key in dataAttrs)) {
        dataAttrs[key] = '';
      }
    }

    // Extract id attribute
    const idMatch = attrs.match(/id=["']([^"']+)["']/i);
    const sectionHtmlId = idMatch ? idMatch[1] : sectionId;

    // Find closing </section>
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

    // Extract h2 title
    const h2RawMatch = sectionContent.match(/<h2[^>]*>([\s\S]+?)<\/h2>/i);
    const h2Title = h2RawMatch ? h2RawMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    // Extract h3 IDs for anchors
    const h3Ids = [];
    const h3Regex = /<h3\s+[^>]*id=["']([^"']+)["']/gi;
    let h3Match;
    while ((h3Match = h3Regex.exec(sectionContent)) !== null) {
      h3Ids.push(h3Match[1]);
    }

    sections.push({
      sectionId,
      dataAttrs,
      content: sectionContent,
      title: h2Title,
      anchors: h3Ids,
      fullMatch: content.slice(match.index, endIndex + 10)
    });
  }

  return { sections, errors };
}

// ============================================================================
// TABLE OF CONTENTS GENERATION
// ============================================================================

/**
 * Convert a section anchor ID to a readable title
 */
function anchorToTitle(anchor) {
  // Map of known section IDs to their titles
  const titleMap = {
    'p1_card_overview': 'Базовые блоки карточки',
    'p1_structure_overview': 'Структура гайда',
    'p1_core_rules': 'Три ключевых принципа',
    'p1_token_budget': 'Token Budget',
    'p1_assembly_pipeline': 'Конвейер сборки карточки',
    'p1_top3_problems': 'Топ-3 критичные ошибки',
    'p2_basic_anchors': 'Базовые Anchors',
    'p2_anchor_rules': 'Правила Anchors',
    'p2_anchor_examples': 'Примеры Anchors',
    'p2_embodiment': 'Embodiment Protocol',
    'p2_env_reactivity': 'Environmental Reactivity',
    'p2_sensory_anchors': 'Sensory Anchors',
    'p3_voice_isolation': 'Voice Isolation',
    'p3_influence_hierarchy': 'Иерархия влияния',
    'p3_examples_rules': 'Правила Examples',
    'p3_examples_quality': 'Качество Examples',
    'p3_greeting': 'Greeting Message',
    'p3_voice_leak': 'Voice Leak',
    'p3_joker_case': 'Крайний случай: голос без описания',
    'p3_multi_char': 'Мульти-персонажные примеры',
    'p4_spine_overview': 'SPINE (обзор)',
    'p4_ghost': 'GHOST',
    'p4_lie': 'LIE',
    'p4_flaw': 'FLAW',
    'p4_need': 'NEED',
    'p4_want': 'WANT',
    'p4_ghost_layers': 'GHOST Layers',
    'p4_spine_full_chain': 'Полный СПИН (5 элементов)',
    'p4_spine_mapping': 'SPINE → Anchors mapping',
    'p4_spine_check': 'SPINE consistency check',
    'p4_spine_navigation': 'SPINE Navigation',
    'p5_ocean_basics': 'OCEAN',
    'p5_elena_profile': 'Елена OCEAN/Enneagram profile',
    'p5_enneagram_basics': 'Enneagram basics',
    'p5_ocean_warning': 'OCEAN Value Conflicts',
    'p5_mbti_ref': 'MBTI Reference',
    'p5_cross_instrument_map': 'Enneagram → SPINE',
    'p5_enneagram_wings': 'Enneagram wings',
    'p5_cross_matrix': 'OCEAN×Enneagram matrix',
    'p6_cot_bridge': 'CoT bridge (обзор)',
    'p6_cot_basics': 'CoT basics',
    'p6_cot_tiers': 'CoT Tier definitions',
    'p6_cot_tier2': 'CoT Tier 2',
    'p6_cot_tier3': 'CoT Tier 3',
    'p6_cot_anchors': 'CoT anchors',
    'p7a_system_prompt': 'System Prompt (SP)',
    'p7a_core_directives': 'CORE DIRECTIVES',
    'p7a_tone_frame': 'Tone Frame',
    'p7a_format_lock': 'Format Lock',
    'p7a_authors_note': "Author's Note (AN)",
    'p7a_sampling_params': 'Sampling parameters',
    'p7a_model_checklist': 'Model Type Checklist',
    'p7a_ooc_protection': 'OOC Protection',
    'p7a_xml_tags': 'XML tags',
    'p7a_api_blocks': 'API blocks',
    'p7a_4k_fallback': '4K-Fallback',
    'p7a_assembly_pipeline': 'Assembly Pipeline',
    'p7b_structured_inject': 'Structured Inject',
    'p7b_greeting': 'Greeting Message',
    'p7b_lorebook_basics': 'Lorebook (LB) basics',
    'p7b_lorebook_mechanics': 'Lorebook Mechanics',
    'p7b_lorebook_advanced': 'Lorebook Advanced',
    'p8_antipatterns_overview': 'Anti-pattern overview',
    'p8_ap1_token_bloat': 'AP-1: Token bloat',
    'p8_ap2_missing_price': 'AP-2: Missing price',
    'p8_ap3_voice_in_description': 'AP-3: Voice in Description',
    'p8_ap4_ghost_in_sp': 'AP-4: GHOST in SP',
    'p8_ap5_reppen_high': 'AP-5: RepPen high',
    'p8_ap6_no_anti_godmoding': 'AP-6: No anti-godmoding',
    'p8_ap7_presence_penalty': 'AP-7: Presence Penalty',
    'p8_ap8_ghost_no_anchors': 'AP-8: GHOST no anchors',
    'p8_ap9_spine_broken': 'AP-9: Broken SPINE',
    'p8_ap10_cot_overload': 'AP-10: CoT overload',
    'p8_ap11_voice_bleed': 'AP-11: Voice Bleed',
    'p8_ap12_xml_malformed': 'AP-12: XML malformed',
    'p8_ap13_lorebook_conflict': 'AP-13: Lorebook conflict',
    'p8_ap14_context_violation': 'AP-14: Context violation',
    'p8_ap15_nested_anchors': 'AP-15: Nested Anchors',
    'p9_quality_scale': 'Шкала качества карточки',
    'p9_one_change_rule': 'One Change Rule',
    'p9_basic_checklist': 'Диагностика и чек-лист',
    'p9_additional_problems': 'Дополнительные проблемы',
    'p9_symptom_table': 'Symptom table',
    'p9_decision_tree': 'Decision Tree',
    'p9_test_scenarios': 'Test scenarios',
    'p9_element_scenario_map': 'Element→Scenario Mapping',
    'p9_test_requirements': 'Test Requirements',
    'p9_12b_issues': '12B-specific issues',
    'p9_pre_deploy': 'Pre-Deploy Validation',
    'p10_elena': 'Елена',
    'p10_geralt': 'Геральт',
    'p10_edward': 'Эдвард Элрик',
    'p10_walter': 'Уолтер Уайт',
    'p10_omnis': 'Омнис-Зета 7-Квин',
    'p10_vysherblenny': 'Выщербленный',
    'appendix_mbti': 'MBTI Reference',
    'appendix_model_table': 'Model Capability Table',
    'appendix_glossary': 'Глоссарий'
  };
  return titleMap[anchor] || anchor.replace(/_/g, ' ').replace(/^p\d+a?\s*/, '');
}

/**
 * Generate Table of Contents HTML from parsed parts and appendices
 */
function generateTOC(parts, appendices) {
  const partLabels = {
    '01': 'Базовые блоки карточки',
    '02': 'Behavioral Anchors',
    '03': 'Voice & Isolation',
    '04': 'SPINE Framework',
    '05': 'Psychology Toolkit',
    '06': 'CoT (цепочка рассуждений)',
    '07a': 'System Prompt & Assembly',
    '07b': 'Lorebook, Greeting & Compatibility',
    '08': 'Anti-patterns',
    '09': 'Diagnostics and Debugging',
    '10': 'Full Card Examples'
  };

  let html = '<ol class="toc-parts">\n';

  for (const part of parts) {
    const partNum = part.file.replace('part_', '').replace('.html', '');
    const label = partLabels[partNum] || part.title || `Part ${partNum}`;
    html += `<li><strong>Part ${partNum.toUpperCase()}:</strong> ${label}\n  <ul>\n`;
    for (const anchor of part.anchors) {
      // Skip the first anchor if it's the part overview (it's the part itself)
      const isFirst = anchor === part.anchors[0];
      if (isFirst) continue; // Skip overview section in TOC sub-items
      // Extract section title from anchor ID — use a readable format
      const title = anchorToTitle(anchor);
      html += `    <li><a href="#${anchor}">${title}</a></li>\n`;
    }
    html += `  </ul>\n</li>\n`;
  }

  html += '</ol>\n\n';

  if (appendices && appendices.length > 0) {
    html += '<h4>Приложения</h4>\n<ol class="toc-appendices">\n';
    const appendixLabels = {
      'appendix_mbti.html': 'Appendix A: MBTI Reference',
      'appendix_model_table.html': 'Appendix B: Model Capability Table',
      'appendix_glossary.html': 'Appendix C: Глоссарий'
    };
    // Sort appendices by their label order (A, B, C) rather than file name
    const sortedAppendices = [...appendices].sort((a, b) => {
      const labelA = appendixLabels[a.file] || a.title || a.file;
      const labelB = appendixLabels[b.file] || b.title || b.file;
      return labelA.localeCompare(labelB);
    });
    for (const app of sortedAppendices) {
      const label = appendixLabels[app.file] || app.title || app.file;
      const anchorId = app.anchors[0] || app.file.replace('.html', '');
      html += `<li><strong>${label.split(':')[0]}:</strong> <a href="#${anchorId}">${label.includes(':') ? label.split(':').slice(1).join(':').trim() : label}</a></li>\n`;
    }
    html += '</ol>\n';
  }

  return html;
}

// ============================================================================
// GLOSSARY GENERATION
// ============================================================================

async function generateGlossaryHTML() {
  if (!existsSync(GLOSSARY_PATH)) {
    log('WARN', 'glossary.json not found, skipping glossary');
    return '';
  }

  const glossaryData = JSON.parse(await readFile(GLOSSARY_PATH, 'utf-8'));
  const terms = glossaryData.canonical_terms || glossaryData.terms || [];

  let html = `<section id="glossary" class="no-js-only" data-toc-exclude>
<h2>Глоссарий</h2>
<dl>
`;

  for (const term of terms) {
    const termName = term.term || '';
    // Use unified_definition (GD-2)
    const definition = term.unified_definition || term.definition || '';
    const anchorId = term.anchor_id || '';

    html += `<dt>${termName}`;
    if (term.abbreviation) {
      html += ` <small class="glossary-abbr">(${term.abbreviation})</small>`;
    }
    if (anchorId) {
      html += ` <a href="#${anchorId}" class="glossary-ref">→</a>`;
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
// MAIN BUILD FUNCTION
// ============================================================================

async function buildUnified() {
  log('INFO', 'Starting unified build...');

  // Clean build directory
  if (existsSync(BUILD_DIR)) {
    const entries = await readdir(BUILD_DIR);
    for (const entry of entries) {
      await rm(join(BUILD_DIR, entry), { recursive: true, force: true });
    }
  }
  await ensureDir(BUILD_DIR);
  const outputDir = join(BUILD_DIR, 'parts');
  await ensureDir(outputDir);

  // Check if unified directory exists
  if (!existsSync(UNIFIED_DIR)) {
    log('ERROR', `Unified directory not found: ${UNIFIED_DIR}`);
    process.exit(1);
  }

  // Parse all unified files
  const unifiedFiles = await readdir(UNIFIED_DIR);
  const partFiles = unifiedFiles.filter(f => f.startsWith('part_') && f.endsWith('.html')).sort();

  if (partFiles.length === 0) {
    log('ERROR', 'No part files found in unified directory');
    process.exit(1);
  }

  log('INFO', `Found ${partFiles.length} unified part files`);

  const allSections = [];
  const buildErrors = [];
  const assembledParts = [];
  const assembledAppendices = [];
  let combinedHTMLContent = '';

  for (const file of partFiles) {
    const filepath = join(UNIFIED_DIR, file);
    const content = await readFile(filepath, 'utf-8');

    // Extract part number (with optional letter suffix for part_07a, part_07b)
    const partMatch = file.match(/part_(\d+[a-z]?)/);
    const partNum = partMatch ? partMatch[1] : '00';

    const { sections, errors } = parseUnifiedHTML(content, file);

    if (errors.length > 0) {
      buildErrors.push(...errors);
      for (const err of errors) {
        log('ERROR', `${err.file}: ${err.message}`);
      }
    }

    // Check for missing data-section
    for (const section of sections) {
      section.part = partNum;
      allSections.push(section);
    }

    // Write file to build/parts/ (content unchanged)
    const outputPath = join(outputDir, `part_${partNum}.html`);
    await writeFile(outputPath, content);
    combinedHTMLContent += content;

    // Collect anchors
    const partAnchors = sections.map(s => s.sectionId);
    for (const section of sections) {
      partAnchors.push(...section.anchors);
    }

    // Extract part title from first section's h2
    const partTitle = sections[0]?.title || `Part ${partNum}`;

    assembledParts.push({
      file: `part_${partNum}.html`,
      title: partTitle,
      anchors: partAnchors
    });

    log('INFO', `Generated: build/parts/part_${partNum}.html (${sections.length} sections)`);
  }

  // Process appendix files
  const appendixFiles = unifiedFiles.filter(f => f.startsWith('appendix_') && f.endsWith('.html')).sort();

  for (const file of appendixFiles) {
    const filepath = join(UNIFIED_DIR, file);
    const content = await readFile(filepath, 'utf-8');
    const { sections, errors } = parseUnifiedHTML(content, file);

    if (errors.length > 0) {
      buildErrors.push(...errors);
      for (const err of errors) {
        log('ERROR', `${err.file}: ${err.message}`);
      }
    }

    for (const section of sections) {
      section.part = 'appendix';
      allSections.push(section);
    }

    const outputPath = join(outputDir, file);
    await writeFile(outputPath, content);
    combinedHTMLContent += content;

    const appendixAnchors = sections.map(s => s.sectionId);
    const appendixTitle = sections[0]?.title || file.replace('.html', '');

    // Append to manifest appendices (will be added to manifest)
    assembledAppendices.push({
      file: file,
      title: appendixTitle,
      anchors: appendixAnchors
    });

    log('INFO', `Generated: build/parts/${file} (${sections.length} sections)`);
  }

  // Auto-generate and inject Table of Contents into part_01.html
  const part01Path = join(outputDir, 'part_01.html');
  if (existsSync(part01Path)) {
    const tocHTML = generateTOC(assembledParts, assembledAppendices);
    let part01Content = await readFile(part01Path, 'utf-8');
    const placeholder = '<!-- AUTO_TOC_PLACEHOLDER: This TOC is auto-generated by the build script. Do not edit manually. -->';
    if (part01Content.includes(placeholder)) {
      part01Content = part01Content.replace(placeholder, tocHTML);
      await writeFile(part01Path, part01Content);
      log('INFO', 'Injected auto-generated TOC into build/parts/part_01.html');
    } else {
      log('WARN', 'AUTO_TOC_PLACEHOLDER not found in part_01.html — skipping TOC injection');
    }
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

  // Error if any section missing data-section
  if (buildErrors.length > 0) {
    log('ERROR', 'Build errors found. Exiting.');
    process.exit(1);
  }

  // Generate manifest.json (v9: version, format, parts, appendices)
  const manifest = {
    version: '9.0.0',
    format: 'unified',
    parts: assembledParts,
    appendices: assembledAppendices
  };
  await writeFile(join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  log('INFO', `Generated: build/parts/manifest.json (${assembledParts.length} parts, ${assembledAppendices.length} appendices)`);

  // Generate glossary.html
  const glossaryHtml = await generateGlossaryHTML();
  if (glossaryHtml) {
    await writeFile(join(outputDir, 'glossary.html'), glossaryHtml);
    log('INFO', 'Generated: build/parts/glossary.html');
  }

  // Generate footer.html
  const footerHtml = `<footer class="guide-footer">
<div class="guide-meta">Live Character Guide v9.0.0 &middot; <a href="https://github.com/vudirvp-sketch/live-char-guide" target="_blank" rel="noopener">GitHub</a></div>
</footer>`;
  await writeFile(join(outputDir, 'footer.html'), footerHtml);
  log('INFO', 'Generated: build/parts/footer.html');

  // Generate section-registry.json
  const registry = {};
  for (const section of allSections) {
    registry[section.sectionId] = {
      part: section.part,
      topic: section.title || ''
    };
  }
  await writeFile(join(BUILD_DIR, 'section-registry.json'), JSON.stringify(registry, null, 2));
  log('INFO', `Generated: build/section-registry.json (${Object.keys(registry).length} sections)`);

  // Generate build-manifest.json
  const contentHash = createHash('sha256').update(combinedHTMLContent).digest('hex');
  const buildManifest = {
    version: '9.0.0',
    format: 'unified',
    builtAt: new Date().toISOString(),
    sectionCount: allSections.length,
    partCount: partFiles.length,
    appendixCount: appendixFiles.length,
    contentHash: `sha256:${contentHash.slice(0, 16)}`
  };
  await writeFile(join(BUILD_DIR, 'build-manifest.json'), JSON.stringify(buildManifest, null, 2));
  log('INFO', 'Generated: build/build-manifest.json');

  log('INFO', 'Unified build complete!');

  return {
    sectionCount: allSections.length,
    partCount: partFiles.length,
    appendixCount: appendixFiles.length,
    errors: buildErrors.length
  };
}

// ============================================================================
// ENTRY POINT
// ============================================================================

buildUnified()
  .then(result => {
    console.log('\n============================================');
    console.log('UNIFIED BUILD SUCCESSFUL');
    console.log('============================================');
    console.log(`Parts: ${result.partCount}`);
    console.log(`Appendices: ${result.appendixCount}`);
    console.log(`Sections: ${result.sectionCount}`);
    console.log(`Errors: ${result.errors}`);
    process.exit(result.errors > 0 ? 1 : 0);
  })
  .catch(err => {
    log('ERROR', `Build failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  });
