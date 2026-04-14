#!/usr/bin/env node
/**
 * Build Validation Script for Live Char Guide
 * Validates build output for common issues
 * 
 * Checks:
 * 1. Truncated content detection
 * 2. Unclosed HTML tags
 * 3. Cross-file anchor references
 * 4. Version consistency
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const errors = [];
const warnings = [];

console.log('🔍 Running build validation...\n');

// ============================================================================
// Check 1: Truncated content
// ============================================================================
console.log('📋 Check 1: Truncated content detection...');

const htmlFiles = glob.sync('src/parts/*.html', { cwd: ROOT });
htmlFiles.forEach(file => {
  const filePath = join(ROOT, file);
  const content = readFileSync(filePath, 'utf-8');
  
  // Check for "..." at end of content (excluding whitespace)
  const trimmedContent = content.trimEnd();
  if (trimmedContent.endsWith('...')) {
    errors.push(`TRUNCATED: ${file} ends with "..."`);
  }
  
  // Check for known truncated patterns
  const truncatedPatterns = [
    'Как персонаж переме...',
    'Как персонаж перемещ...',
    ' content continues...'
  ];
  
  truncatedPatterns.forEach(pattern => {
    if (content.includes(pattern)) {
      errors.push(`TRUNCATED: ${file} contains known truncated text pattern`);
    }
  });
});

// ============================================================================
// Check 2: Unclosed HTML tags
// ============================================================================
console.log('📋 Check 2: Unclosed HTML tags...');

const tagCounts = (html, tag) => {
  const open = (html.match(new RegExp(`<${tag}[^>]*>`, 'gi')) || []).length;
  const close = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
  return { open, close };
};

htmlFiles.forEach(file => {
  const filePath = join(ROOT, file);
  const content = readFileSync(filePath, 'utf-8');
  
  ['div', 'section', 'article', 'details'].forEach(tag => {
    const { open, close } = tagCounts(content, tag);
    if (open !== close) {
      errors.push(`UNCLOSED: ${file} has ${open} <${tag}> but ${close} </${tag}>`);
    }
  });
});

// ============================================================================
// Check 3: Cross-file anchors (should be handled by build script)
// ============================================================================
console.log('📋 Check 3: Cross-file anchor references...');

htmlFiles.forEach(file => {
  const filePath = join(ROOT, file);
  const content = readFileSync(filePath, 'utf-8');
  const crossFileAnchors = content.match(/href="[^"]+\.html#[^"]+"/g);
  if (crossFileAnchors) {
    warnings.push(`CROSS-FILE: ${file} has cross-file anchors (will be fixed by build): ${crossFileAnchors.slice(0, 3).join(', ')}${crossFileAnchors.length > 3 ? '...' : ''}`);
  }
});

// ============================================================================
// Check 4: Version consistency
// ============================================================================
console.log('📋 Check 4: Version consistency...');

const packageJsonPath = join(ROOT, 'package.json');
const srcVersionPath = join(ROOT, 'src', 'VERSION');

if (existsSync(packageJsonPath) && existsSync(srcVersionPath)) {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const srcVersion = readFileSync(srcVersionPath, 'utf-8').trim();
  
  if (packageJson.version !== srcVersion) {
    errors.push(`VERSION: package.json=${packageJson.version}, src/VERSION=${srcVersion}`);
  } else {
    console.log(`  ✓ Version consistent: ${srcVersion}`);
  }
}

// ============================================================================
// Check 5: Duplicate VERSION files
// ============================================================================
console.log('📋 Check 5: Duplicate VERSION files...');

const rootVersionPath = join(ROOT, 'VERSION');
const srcVersionPathRoot = join(ROOT, 'src_VERSION');

if (existsSync(rootVersionPath)) {
  warnings.push('DUPLICATE: Root-level VERSION file exists (should be deleted)');
}
if (existsSync(srcVersionPathRoot)) {
  warnings.push('DUPLICATE: src_VERSION file exists (should be deleted)');
}

// ============================================================================
// Check 6: Duplicate directories
// ============================================================================
console.log('📋 Check 6: Duplicate directories...');

const partsDir = join(ROOT, 'parts');
const assetsDir = join(ROOT, 'assets');

if (existsSync(partsDir)) {
  warnings.push('DUPLICATE: Root-level parts/ directory exists (should be deleted)');
}
if (existsSync(assetsDir)) {
  warnings.push('DUPLICATE: Root-level assets/ directory exists (should use src/assets/)');
}

// ============================================================================
// Report
// ============================================================================
console.log('\n' + '='.repeat(50));

if (warnings.length > 0) {
  console.log('⚠️  Warnings:\n');
  warnings.forEach(w => console.log(`  - ${w}`));
  console.log('');
}

if (errors.length > 0) {
  console.error('❌ Build validation failed:\n');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('✅ Build validation passed');
  process.exit(0);
}
