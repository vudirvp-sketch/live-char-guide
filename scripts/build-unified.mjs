#!/usr/bin/env node
/**
 * @fileoverview Build Unified Script for Live Character Guide v7
 * @module scripts/build-unified
 * @version 7.0.0
 *
 * @description
 * Replaces build-layers.mjs. Reads src/unified/part_*.html and produces
 * a single set of output files in build/parts/.
 *
 * Input:  src/unified/part_01.html ... part_10.html
 *         data/glossary-unified.json
 * Output: build/parts/part_01.html ... part_10.html
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
const UNIFIED_DIR = join(ROOT, 'src', 'unified');
const DATA_DIR = join(ROOT, 'data');
const BUILD_DIR = join(ROOT, 'build');
const GLOSSARY_PATH = join(DATA_DIR, 'glossary-unified.json');

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
// GLOSSARY GENERATION
// ============================================================================

async function generateGlossaryHTML() {
  if (!existsSync(GLOSSARY_PATH)) {
    log('WARN', 'glossary-unified.json not found, skipping glossary');
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
  let combinedHTMLContent = '';

  for (const file of partFiles) {
    const filepath = join(UNIFIED_DIR, file);
    const content = await readFile(filepath, 'utf-8');

    // Extract part number
    const partMatch = file.match(/part_(\d+)/);
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

  // Generate manifest.json (FIX-14: only version, format, parts)
  const manifest = {
    version: '7.0.0',
    format: 'unified',
    parts: assembledParts
  };
  await writeFile(join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  log('INFO', `Generated: build/parts/manifest.json (${assembledParts.length} parts)`);

  // Generate glossary.html
  const glossaryHtml = await generateGlossaryHTML();
  if (glossaryHtml) {
    await writeFile(join(outputDir, 'glossary.html'), glossaryHtml);
    log('INFO', 'Generated: build/parts/glossary.html');
  }

  // Generate footer.html (without layer navigation)
  const footerHtml = `<footer class="layer-footer">
<div class="layer-meta">Live Character Guide v7.0.0 &middot; <a href="https://github.com/vudirvp-sketch/live-char-guide" target="_blank" rel="noopener">GitHub</a></div>
</footer>`;
  await writeFile(join(outputDir, 'footer.html'), footerHtml);
  log('INFO', 'Generated: build/parts/footer.html');

  // Generate section-registry.json (without layer field)
  const registry = {};
  for (const section of allSections) {
    registry[section.sectionId] = {
      part: parseInt(section.part),
      topic: section.title || ''
    };
  }
  await writeFile(join(BUILD_DIR, 'section-registry.json'), JSON.stringify(registry, null, 2));
  log('INFO', `Generated: build/section-registry.json (${Object.keys(registry).length} sections)`);

  // Generate build-manifest.json
  const contentHash = createHash('sha256').update(combinedHTMLContent).digest('hex');
  const buildManifest = {
    version: '7.0.0',
    format: 'unified',
    builtAt: new Date().toISOString(),
    sectionCount: allSections.length,
    partCount: partFiles.length,
    contentHash: `sha256:${contentHash.slice(0, 16)}`
  };
  await writeFile(join(BUILD_DIR, 'build-manifest.json'), JSON.stringify(buildManifest, null, 2));
  log('INFO', 'Generated: build/build-manifest.json');

  log('INFO', 'Unified build complete!');

  return {
    sectionCount: allSections.length,
    partCount: partFiles.length,
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
    console.log(`Sections: ${result.sectionCount}`);
    console.log(`Errors: ${result.errors}`);
    process.exit(result.errors > 0 ? 1 : 0);
  })
  .catch(err => {
    log('ERROR', `Build failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  });
