#!/usr/bin/env node
/**
 * CSP compliance checker.
 * Verifies Content Security Policy compliance for build outputs.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const distDir = '.';
let exitCode = 0;

// Check index.html (web version) — no inline scripts allowed
try {
  const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');
  // Match <script> tags without src attribute (inline scripts)
  const inlineScripts = indexHtml.match(/<script(?![^>]*\bsrc\b)[^>]*>[\s\S]*?<\/script>/gi);
  if (inlineScripts && inlineScripts.length > 0) {
    console.log(`FAIL: index.html has ${inlineScripts.length} inline script(s)`);
    exitCode = 1;
  } else {
    console.log('PASS: index.html has no inline scripts');
  }

  // Check for eval()
  if (indexHtml.includes('eval(')) {
    console.log('FAIL: eval() usage detected in index.html');
    exitCode = 1;
  } else {
    console.log('PASS: No eval() usage in index.html');
  }
} catch {
  console.log('SKIP: index.html not found');
}

// zero-install.html is expected to have inline JS — just check for eval
try {
  const zeroHtml = readFileSync(join(distDir, 'live-char-guide-zero-install.html'), 'utf-8');
  if (zeroHtml.includes('eval(')) {
    console.log('FAIL: eval() usage detected in zero-install.html');
    exitCode = 1;
  } else {
    console.log('PASS: No eval() usage in zero-install.html');
  }
} catch {
  console.log('SKIP: zero-install.html not found');
}

process.exit(exitCode);
