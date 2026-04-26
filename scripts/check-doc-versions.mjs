#!/usr/bin/env node
/**
 * check-doc-versions.mjs
 *
 * Compares the "Last Updated" date in each docs/*.md file header
 * with the date of the last git commit that touched that file.
 * Warns when the declared date is older than the commit date by >7 days.
 *
 * Usage:
 *   node scripts/check-doc-versions.mjs
 *   node scripts/check-doc-versions.mjs --strict   # exit 1 on any warning
 */

import { execSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DOCS_DIR = join(import.meta.dirname, '..', 'docs');
const MAX_DRIFT_DAYS = 7;
const strict = process.argv.includes('--strict');

const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));

let warnings = 0;

for (const file of files) {
  const filepath = join(DOCS_DIR, file);
  const content = readFileSync(filepath, 'utf-8');

  // Extract "Last Updated: YYYY-MM-DD" or "Date: YYYY-MM-DD"
  const dateMatch = content.match(/(?:Last Updated|Date):\s*(\d{4}-\d{2}-\d{2})/);
  if (!dateMatch) {
    console.log(`ℹ️  ${file}: no date header found — skipping`);
    continue;
  }

  const declaredDate = new Date(dateMatch[1]);

  // Get last commit date for this file
  let commitDateStr;
  try {
    commitDateStr = execSync(
      `git log -1 --format="%ai" -- "${filepath}"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();
  } catch {
    console.log(`ℹ️  ${file}: no git history — skipping`);
    continue;
  }

  if (!commitDateStr) {
    console.log(`ℹ️  ${file}: empty git log — skipping`);
    continue;
  }

  const commitDate = new Date(commitDateStr.slice(0, 10));
  const diffMs = commitDate - declaredDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > MAX_DRIFT_DAYS) {
    console.warn(
      `⚠️  ${file}: declared date ${dateMatch[1]} is ${diffDays} days older than last commit (${commitDateStr.slice(0, 10)}). ` +
      `Consider updating the date header.`
    );
    warnings++;
  } else {
    console.log(`✅ ${file}: declared ${dateMatch[1]}, last commit ${commitDateStr.slice(0, 10)} (drift: ${diffDays}d)`);
  }
}

console.log(`\n${warnings === 0 ? '✅ All doc dates are current.' : `⚠️  ${warnings} warning(s) found.`}`);

if (strict && warnings > 0) {
  process.exit(1);
}
