#!/usr/bin/env node
/**
 * @fileoverview Shell Build Script for Live Char Guide
 * @module src/scripts/build-shell
 * @version 1.0.0
 * 
 * @description
 * Builds the lazy-loading shell architecture:
 * - Copies shell/index.html → dist/index.html
 * - Copies shell/styles.css → dist/assets/shell-styles.css
 * - Copies shell/lazy-loader.js → dist/assets/lazy-loader.js
 * - Copies parts-l1/, parts-l2/, parts-l3/ → dist/parts-l{N}/
 * - Copies assets → dist/assets/
 */

import { createHash } from 'crypto';
import { readFile, writeFile, readdir, mkdir, copyFile, rm, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SRC_DIR = join(ROOT, 'src');
const SHELL_DIR = join(SRC_DIR, 'shell');
const DIST_DIR = join(ROOT, 'dist');
const ASSETS_SRC = join(SRC_DIR, 'assets');
const ASSETS_DIST = join(DIST_DIR, 'assets');
const VERSION_PATH = join(SRC_DIR, 'VERSION');

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
  log('INFO', 'Starting shell build...');
  
  // Read version
  let version = 'unknown';
  if (existsSync(VERSION_PATH)) {
    version = (await readFile(VERSION_PATH, 'utf-8')).trim();
    log('INFO', `Version: ${version}`);
  }
  
  // Clean dist directory
  if (existsSync(DIST_DIR)) {
    await rm(DIST_DIR, { recursive: true });
  }
  await ensureDir(DIST_DIR);
  await ensureDir(ASSETS_DIST);
  
  // 1. Copy shell index.html
  const shellIndex = join(SHELL_DIR, 'index.html');
  if (existsSync(shellIndex)) {
    let indexContent = await readFile(shellIndex, 'utf-8');
    
    // Replace version placeholder
    indexContent = indexContent.replace(/5\.12\.0/g, version);
    
    // Calculate hash for cache busting
    const hash = createHash('sha256')
      .update(indexContent)
      .digest('hex')
      .slice(0, 8);
    
    // Add build metadata
    indexContent = indexContent.replace(
      '<!-- Live Character Guide - Shell v5.12.0 -->',
      `<!-- Live Character Guide - Shell v${version} -->\n<!-- Build: ${hash} -->\n<!-- Generated: ${new Date().toISOString()} -->`
    );
    
    await writeFile(join(DIST_DIR, 'index.html'), indexContent);
    log('INFO', 'Copied shell/index.html → dist/index.html');
  } else {
    log('ERROR', 'shell/index.html not found');
    process.exit(1);
  }
  
  // 2. Copy shell styles.css
  const shellStyles = join(SHELL_DIR, 'styles.css');
  if (existsSync(shellStyles)) {
    await copyFile(shellStyles, join(ASSETS_DIST, 'shell-styles.css'));
    log('INFO', 'Copied shell/styles.css → dist/assets/shell-styles.css');
  } else {
    log('ERROR', 'shell/styles.css not found');
    process.exit(1);
  }
  
  // 3. Copy lazy-loader.js
  const lazyLoader = join(SHELL_DIR, 'lazy-loader.js');
  if (existsSync(lazyLoader)) {
    let loaderContent = await readFile(lazyLoader, 'utf-8');
    
    // Replace version
    loaderContent = loaderContent.replace(/5\.12\.0/g, version);
    
    await writeFile(join(ASSETS_DIST, 'lazy-loader.js'), loaderContent);
    log('INFO', 'Copied shell/lazy-loader.js → dist/assets/lazy-loader.js');
  } else {
    log('ERROR', 'shell/lazy-loader.js not found');
    process.exit(1);
  }
  
  // 4. Copy parts-l1, parts-l2, parts-l3
  const layers = ['1', '2', '3'];
  for (const layer of layers) {
    const partsDir = join(SRC_DIR, `parts-l${layer}`);
    const destDir = join(DIST_DIR, `parts-l${layer}`);
    
    if (existsSync(partsDir)) {
      await copyDir(partsDir, destDir);
      const files = await readdir(destDir);
      log('INFO', `Copied parts-l${layer}/ → dist/parts-l${layer}/ (${files.length} files)`);
    } else {
      log('WARN', `parts-l${layer}/ not found, skipping`);
    }
  }
  
  // 5. Copy assets (favicon, preview-card, etc.)
  if (existsSync(ASSETS_SRC)) {
    const assetFiles = await readdir(ASSETS_SRC);
    for (const file of assetFiles) {
      const srcPath = join(ASSETS_SRC, file);
      const destPath = join(ASSETS_DIST, file);
      const s = await stat(srcPath);
      
      if (s.isFile()) {
        await copyFile(srcPath, destPath);
      }
    }
    log('INFO', `Copied ${assetFiles.length} assets → dist/assets/`);
  }
  
  // 6. Create build hash file
  const hash = createHash('sha256')
    .update(Date.now().toString())
    .digest('hex')
    .slice(0, 8);
  await writeFile(join(DIST_DIR, 'build.hash'), hash);
  
  // 7. Copy 404.html if exists
  const notFound = join(ROOT, '404.html');
  if (existsSync(notFound)) {
    await copyFile(notFound, join(DIST_DIR, '404.html'));
    log('INFO', 'Copied 404.html');
  }
  
  log('INFO', `Shell build complete! Hash: ${hash}`);
  
  return { hash, version };
}

// ============================================================================
// ENTRY POINT
// ============================================================================

buildShell()
  .then(result => {
    console.log('\n============================================');
    console.log('SHELL BUILD SUCCESSFUL');
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
