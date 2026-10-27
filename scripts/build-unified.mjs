#!/usr/bin/env node
/**
 * @fileoverview Build Unified Script for Live Character Guide v9
 * @module scripts/build-unified
 * @version 9.2.0
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
const VERSION_FILE = join(ROOT, 'src', 'VERSION');

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
      partTitle: (dataAttrs['part-title'] || '').trim(),
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
    log('WARN', 'glossary.json not found, skipping glossary');
    return '';
  }

  const glossaryData = JSON.parse(await readFile(GLOSSARY_PATH, 'utf-8'));
  const terms = glossaryData.canonical_terms || glossaryData.terms || [];

  // iter-205 (audit v2 §4.9/G1): the no-JS glossary was a bare <section> fragment —
  // no <head>, no styles, no way back to the guide, and every term arrow pointed at
  // "#anchor" which resolves nowhere on a standalone page. It is now a full page:
  // own head, readable styles, a back link, and per-term links into the guide.
  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  const renderDefinition = (value) =>
    escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>');

  let items = '';
  for (const term of terms) {
    const termName = escapeHtml(term.term || '');
    const definition = renderDefinition(term.unified_definition || term.definition || '');
    const anchorId = term.anchor_id || '';

    items += `<dt>${termName}`;
    if (term.abbreviation) {
      items += ` <small class="glossary-abbr">(${escapeHtml(term.abbreviation)})</small>`;
    }
    if (anchorId) {
      items += ` <a href="../index.html#${anchorId}" class="glossary-ref" title="Открыть раздел в гайде">→</a>`;
    }
    items += `</dt>
<dd>${definition}</dd>
`;
  }

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Глоссарий — Live Character Guide</title>
<meta name="description" content="Ключевые термины Live Character Guide: SPINE, OCEAN, якоря, CoT, Format Lock и другие. Страница работает без JavaScript.">
<style>
  :root { --bg: #0f1218; --panel: #161b24; --text: #d9dde4; --muted: #9aa4b5; --accent: #3cc8ff; --border: #242c39; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 2rem 1rem 3rem; background: var(--bg); color: var(--text);
         font: 16px/1.65 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  main { max-width: 72ch; margin: 0 auto; }
  h1 { font-size: 1.6rem; line-height: 1.3; margin: 0.5rem 0 0.75rem; }
  a { color: var(--accent); }
  a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .back { margin: 0 0 1.25rem; font-size: 0.9rem; }
  .intro { color: var(--muted); margin: 0 0 1.75rem; }
  dl { display: grid; gap: 1rem; margin: 0; }
  dt { font-weight: 600; }
  dt .glossary-abbr { color: var(--muted); font-weight: 400; }
  dd { margin: 0.25rem 0 0; }
  dd code { background: var(--panel); color: var(--text); padding: 0.1em 0.35em;
            border-radius: 4px; font-size: 0.9em; }
  .glossary-ref { margin-left: 0.35rem; text-decoration: none; }
  .glossary-ref:hover { text-decoration: underline; }
  footer { margin-top: 2.5rem; padding-top: 1rem; border-top: 1px solid var(--border);
           color: var(--muted); font-size: 0.85rem; }
</style>
</head>
<body>
<main>
<section id="glossary" class="no-js-only" data-toc-exclude>
<p class="back"><a href="../index.html">← Live Character Guide</a></p>
<h1>Глоссарий</h1>
<p class="intro">${terms.length} терминов. Страница работает без JavaScript; ссылки «→» открывают раздел гайда.</p>
<dl>
${items}</dl>
<footer>Live Character Guide v9.2.6 — глоссарий генерируется из <code>docs/canon/glossary_registry.md</code>.</footer>
</section>
</main>
</body>
</html>
`;
}

// ============================================================================
// MAIN BUILD FUNCTION
// ============================================================================

async function buildUnified() {
  log('INFO', 'Starting unified build...');

  // Read version from src/VERSION
  let version = '0.0.0';
  if (existsSync(VERSION_FILE)) {
    version = (await readFile(VERSION_FILE, 'utf-8')).trim();
  } else {
    log('WARN', 'src/VERSION not found, using fallback version');
  }
  log('INFO', `Building version: ${version}`);

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
    // Part label: authored `data-part-title` on the Part's first section wins
    // (single source shared with the shell TOC); the first <h2> is a fallback.
    const partTitle = sections[0]?.partTitle || sections[0]?.title || `Part ${partNum}`;

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

  // NOTE (v3 restructure, iter 171): the inline Part-1 table of contents was
  // removed. The guide keeps exactly one navigation surface — the shell TOC
  // panel (`src/shell/lazy-loader.js` generateTOC) — plus the Part 0 module map.
  // The former `AUTO_TOC_PLACEHOLDER` injection (and its hardcoded English
  // `titleMap`) was deleted together with the duplicate artifact.

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

  // Generate manifest.json (version from src/VERSION)
  const manifest = {
    version: version,
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
<div class="guide-meta">Live Character Guide v${version} &middot; <a href="https://github.com/vudirvp-sketch/live-char-guide" target="_blank" rel="noopener">GitHub</a></div>
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
    version: version,
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
