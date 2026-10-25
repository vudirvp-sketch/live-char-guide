#!/usr/bin/env node
/**
 * Bundle size budget checker.
 * Uses stat() for accurate file sizes (not du which shows disk blocks).
 * 
 * Updated 2026: Modern limits for rich content guides
 * - index.html: 900 KB (was 500 KB) — the guide is now PRERENDERED into the
 *   document instead of being fetched at runtime (docs/PROMOTION_PLAN.md §3 A1),
 *   so index.html legitimately carries the whole corpus (~470 KB of text, ~90 KB
 *   after gzip). Budget must stay above the corpus or every content iteration
 *   breaks the build for the wrong reason.
 * - zero-install: 750 KB (was 500 KB)
 */
import { statSync, readdirSync } from 'fs';
import { join } from 'path';

const budgets = [
  { file: 'live-char-guide-zero-install.html', maxKb: 750 },
  { file: 'index.html', maxKb: 900 },
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
