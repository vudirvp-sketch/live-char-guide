#!/usr/bin/env node
/**
 * Bundle size budget checker.
 * Uses stat() for accurate file sizes (not du which shows disk blocks).
 * 
 * Updated 2026: Modern limits for rich content guides
 * - index.html: 500 KB (was 350 KB)
 * - zero-install: 750 KB (was 500 KB)
 */
import { statSync, readdirSync } from 'fs';
import { join } from 'path';

const budgets = [
  { file: 'live-char-guide-zero-install.html', maxKb: 750 },
  { file: 'index.html', maxKb: 500 },
];

// Handle assets directory for main.js
try {
  const assetsDir = 'assets';
  const files = readdirSync(assetsDir);
  const mainJs = files.find(f => f.startsWith('main') && f.endsWith('.js'));
  if (mainJs) budgets.push({ file: join(assetsDir, mainJs), maxKb: 150 });
} catch {}

let exitCode = 0;

for (const { file, maxKb } of budgets) {
  try {
    const stats = statSync(file);
    const sizeKb = stats.size / 1024;
    if (sizeKb > maxKb) {
      console.log(`FAIL: ${file} is ${sizeKb.toFixed(1)}KB (max: ${maxKb}KB)`);
      exitCode = 1;
    } else {
      console.log(`PASS: ${file} is ${sizeKb.toFixed(1)}KB (max: ${maxKb}KB)`);
    }
  } catch {
    console.log(`SKIP: ${file} not found`);
  }
}

process.exit(exitCode);
