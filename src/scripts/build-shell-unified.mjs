#!/usr/bin/env node
/**
 * @fileoverview Shell Build Script for Live Character Guide v7 (Unified)
 * @module src/scripts/build-shell-unified
 * @version 7.0.0
 *
 * @description
 * Shell build for the unified guide. Copies shell-unified + generated parts + data → dist-unified/
 *
 * Usage:
 *   node src/scripts/build-shell-unified.mjs
 */

import { createHash } from 'crypto';
import { readFile, writeFile, readdir, mkdir, copyFile, rm, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SRC_DIR = join(ROOT, 'src');
const SHELL_DIR = join(SRC_DIR, 'shell-unified');
const BUILD_DIR = join(ROOT, 'build');
const DATA_DIR = join(ROOT, 'data');
const DIST_DIR = join(ROOT, 'dist-unified');
const ASSETS_SRC = join(SRC_DIR, 'assets');
const ASSETS_DIST = join(DIST_DIR, 'assets');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

function log(level, message) {
  const timestamp = new Date().toISOString();
  const prefix = level === 'ERROR' ? '❌' : level === 'WARN' ? '⚠️' : '✓';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

// ============================================================================
// BUILD SHELL
// ============================================================================

async function buildShell() {
  log('INFO', 'Starting unified shell build...');

  const version = '7.0.0';

  // Verify build-unified.mjs has been run
  if (!existsSync(join(BUILD_DIR, 'parts', 'manifest.json'))) {
    log('ERROR', 'build-unified.mjs has not been run yet! Run it first:');
    log('ERROR', '  node scripts/build-unified.mjs');
    process.exit(1);
  }

  // Clean dist directory
  if (existsSync(DIST_DIR)) {
    await rm(DIST_DIR, { recursive: true });
  }
  await ensureDir(DIST_DIR);
  await ensureDir(ASSETS_DIST);

  // 1. Copy shell index.html
  const shellIndex = join(SHELL_DIR, 'index.html');
  let buildHash;
  if (existsSync(shellIndex)) {
    let indexContent = await readFile(shellIndex, 'utf-8');

    // Calculate hash for cache busting
    buildHash = createHash('sha256')
      .update(indexContent)
      .digest('hex')
      .slice(0, 8);

    // Add build metadata
    indexContent = indexContent.replace(
      /<!-- Live Character Guide - Shell v\d+\.\d+\.\d+ -->/,
      `<!-- Live Character Guide - Shell v${version} -->\n<!-- Build: ${buildHash} -->\n<!-- Generated: ${new Date().toISOString()} -->`
    );

    await writeFile(join(DIST_DIR, 'index.html'), indexContent);
    log('INFO', 'Copied shell-unified/index.html → dist-unified/index.html');
  } else {
    log('ERROR', 'shell-unified/index.html not found');
    process.exit(1);
  }

  // 2. Copy shell styles.css
  const shellStyles = join(SHELL_DIR, 'styles.css');
  if (existsSync(shellStyles)) {
    await copyFile(shellStyles, join(ASSETS_DIST, 'shell-styles.css'));
    log('INFO', 'Copied shell-unified/styles.css → dist-unified/assets/shell-styles.css');
  } else {
    log('ERROR', 'shell-unified/styles.css not found');
    process.exit(1);
  }

  // 3. Copy lazy-loader.js
  const lazyLoader = join(SHELL_DIR, 'lazy-loader.js');
  if (existsSync(lazyLoader)) {
    await copyFile(lazyLoader, join(ASSETS_DIST, 'lazy-loader.js'));
    log('INFO', 'Copied shell-unified/lazy-loader.js → dist-unified/assets/lazy-loader.js');
  } else {
    log('ERROR', 'shell-unified/lazy-loader.js not found');
    process.exit(1);
  }

  // 3b. Copy shell-unified/widgets/ → dist-unified/widgets/
  const widgetsSrc = join(SHELL_DIR, 'widgets');
  const widgetsDist = join(DIST_DIR, 'widgets');
  if (existsSync(widgetsSrc)) {
    await copyDir(widgetsSrc, widgetsDist);
    const widgetFiles = await readdir(widgetsDist);
    log('INFO', `Copied shell-unified/widgets/ → dist-unified/widgets/ (${widgetFiles.length} files)`);
  } else {
    log('WARN', 'shell-unified/widgets/ not found, skipping');
  }

  // 3c. Copy event-bus.js to dist root
  const eventBusSrc = join(SHELL_DIR, 'event-bus.js');
  if (existsSync(eventBusSrc)) {
    await copyFile(eventBusSrc, join(DIST_DIR, 'event-bus.js'));
    log('INFO', 'Copied shell-unified/event-bus.js → dist-unified/event-bus.js');
  } else {
    log('ERROR', 'shell-unified/event-bus.js not found');
    process.exit(1);
  }

  // 4. Copy unified parts from build/parts/ (SB-3)
  const buildPartsDir = join(BUILD_DIR, 'parts');
  const destPartsDir = join(DIST_DIR, 'parts');
  if (existsSync(buildPartsDir)) {
    await copyDir(buildPartsDir, destPartsDir);
    const files = await readdir(destPartsDir);
    log('INFO', `Copied build/parts/ → dist-unified/parts/ (${files.length} files)`);
  } else {
    log('ERROR', 'build/parts/ not found. Run build-unified.mjs first.');
    process.exit(1);
  }

  // 5. Copy assets (favicon, preview-card, fonts, etc.)
  if (existsSync(ASSETS_SRC)) {
    const assetFiles = await readdir(ASSETS_SRC);
    for (const file of assetFiles) {
      const srcPath = join(ASSETS_SRC, file);
      const destPath = join(ASSETS_DIST, file);
      const s = await stat(srcPath);

      if (s.isFile()) {
        await copyFile(srcPath, destPath);
      } else if (s.isDirectory()) {
        await copyDir(srcPath, destPath);
      }
    }
    log('INFO', `Copied ${assetFiles.length} assets → dist-unified/assets/`);
  }

  // 5b. Copy data files (SB-8: use glossary-unified.json as glossary.json)
  const DATA_DIST = join(DIST_DIR, 'data');
  await ensureDir(DATA_DIST);

  // Copy all data files except glossary.json (we'll handle that separately)
  if (existsSync(DATA_DIR)) {
    const dataFiles = await readdir(DATA_DIR);
    for (const file of dataFiles) {
      const srcPath = join(DATA_DIR, file);
      const destPath = join(DATA_DIST, file);

      if (file === 'glossary-unified.json') {
        // SB-8: Copy glossary-unified.json as glossary.json
        await copyFile(srcPath, join(DATA_DIST, 'glossary.json'));
        log('INFO', 'Copied data/glossary-unified.json → dist-unified/data/glossary.json');
      } else if (file === 'glossary.json') {
        // Skip original glossary.json (replaced by glossary-unified.json)
        continue;
      } else {
        await copyFile(srcPath, destPath);
      }
    }
    const dataDistFiles = await readdir(DATA_DIST);
    log('INFO', `Copied data/ → dist-unified/data/ (${dataDistFiles.length} files)`);
  } else {
    log('WARN', 'data/ directory not found, skipping');
  }

  // 6. Create build hash file
  await writeFile(join(DIST_DIR, 'build.hash'), buildHash);

  // 7. Copy 404.html from src/404.html
  const notFound = join(SRC_DIR, '404.html');
  if (existsSync(notFound)) {
    await copyFile(notFound, join(DIST_DIR, '404.html'));
    log('INFO', 'Copied src/404.html → dist-unified/404.html');
  }

  // 8. Copy sitemap.xml and robots.txt for SEO
  const sitemap = join(ROOT, 'sitemap.xml');
  const robots = join(ROOT, 'robots.txt');
  if (existsSync(sitemap)) {
    await copyFile(sitemap, join(DIST_DIR, 'sitemap.xml'));
    log('INFO', 'Copied sitemap.xml → dist-unified/sitemap.xml');
  }
  if (existsSync(robots)) {
    await copyFile(robots, join(DIST_DIR, 'robots.txt'));
    log('INFO', 'Copied robots.txt → dist-unified/robots.txt');
  }

  // === ROOT FALLBACK COPIES ===

  // 9. Create root index.html for backward compatibility
  await copyFile(join(DIST_DIR, 'index.html'), join(ROOT, 'index.html'));
  log('INFO', 'Copied dist-unified/index.html → index.html (root fallback)');

  // 10. Create root build.hash
  await copyFile(join(DIST_DIR, 'build.hash'), join(ROOT, 'build.hash'));
  log('INFO', 'Copied dist-unified/build.hash → build.hash (root fallback)');

  // 11. Create root assets/ for backward compatibility
  const rootAssets = join(ROOT, 'assets');
  if (existsSync(rootAssets)) {
    await rm(rootAssets, { recursive: true });
  }
  await copyDir(ASSETS_DIST, rootAssets);
  log('INFO', 'Copied dist-unified/assets/ → assets/ (root fallback)');

  // 12. Copy event-bus.js to root
  if (existsSync(join(DIST_DIR, 'event-bus.js'))) {
    await copyFile(join(DIST_DIR, 'event-bus.js'), join(ROOT, 'event-bus.js'));
    log('INFO', 'Copied dist-unified/event-bus.js → event-bus.js (root fallback)');
  }

  // 13. Copy widgets/ to root
  const rootWidgets = join(ROOT, 'widgets');
  if (existsSync(rootWidgets)) {
    await rm(rootWidgets, { recursive: true });
  }
  if (existsSync(widgetsDist)) {
    await copyDir(widgetsDist, rootWidgets);
    const widgetRootFiles = await readdir(rootWidgets);
    log('INFO', `Copied dist-unified/widgets/ → widgets/ (root fallback, ${widgetRootFiles.length} files)`);
  }

  // 14. Copy data/ to root
  const rootData = join(ROOT, 'data');
  if (existsSync(rootData)) {
    await rm(rootData, { recursive: true });
  }
  if (existsSync(DATA_DIST)) {
    await copyDir(DATA_DIST, rootData);
    const dataRootFiles = await readdir(rootData);
    log('INFO', `Copied dist-unified/data/ → data/ (root fallback, ${dataRootFiles.length} files)`);
  }

  // 15. Copy parts/ to root (SB-6: single parts/ instead of parts-l{N}/)
  const rootPartsDir = join(ROOT, 'parts');
  if (existsSync(rootPartsDir)) {
    await rm(rootPartsDir, { recursive: true });
  }
  const distPartsSrc = join(DIST_DIR, 'parts');
  if (existsSync(distPartsSrc)) {
    await copyDir(distPartsSrc, rootPartsDir);
    const partRootFiles = await readdir(rootPartsDir);
    log('INFO', `Copied dist-unified/parts/ → parts/ (root fallback, ${partRootFiles.length} files)`);
  }

  log('INFO', `Shell build complete! Hash: ${buildHash}`);

  return { hash: buildHash, version };
}

// ============================================================================
// ENTRY POINT
// ============================================================================

buildShell()
  .then(result => {
    console.log('\n============================================');
    console.log('UNIFIED SHELL BUILD SUCCESSFUL');
    console.log('============================================');
    console.log(`Version: ${result.version}`);
    console.log(`Hash: ${result.hash}`);
    console.log(`Output: ${DIST_DIR}`);
    process.exit(0);
  })
  .catch(err => {
    log('ERROR', `Build failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  });
