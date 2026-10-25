#!/usr/bin/env node
/**
 * SEO gate — asserts the shipped heads and sitemap are actually correct.
 *
 * WHY: every SEO property added to src/shell/index.html is one build away from
 * silently disappearing (the head is copied, not generated), and absolute URLs
 * depend on {{SITE_URL}} substitution. This gate is the thing that makes the
 * metadata durable. Mirrors scripts/csp_check.mjs: runs over built artifacts,
 * exits 1 on any failure.
 *
 * Usage: node scripts/seo_check.mjs   (after pnpm run build)
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SITE } from './site-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

let failures = 0;
const pass = (msg) => console.log(`PASS: ${msg}`);
const fail = (msg) => {
  console.log(`FAIL: ${msg}`);
  failures++;
};
const warn = (msg) => console.log(`WARN: ${msg}`);

function check(condition, okMsg, failMsg) {
  if (condition) pass(okMsg);
  else fail(failMsg);
}

// ---------------------------------------------------------------------------
// 1. Locate the built document
// ---------------------------------------------------------------------------
const candidates = [join(ROOT, 'dist', 'index.html'), join(ROOT, 'index.html')];
const indexPath = candidates.find((p) => existsSync(p));

if (!indexPath) {
  console.log('FAIL: no built index.html found (run pnpm run build first)');
  process.exit(1);
}

const html = readFileSync(indexPath, 'utf-8');
const where = indexPath.replace(ROOT, '.').replace(/\\/g, '/');

// ---------------------------------------------------------------------------
// 2. Document shell
// ---------------------------------------------------------------------------
check(
  /<html[^>]+lang="ru"/.test(html),
  '<html lang="ru">',
  '<html> is missing lang="ru"'
);

const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
const title = titleMatch ? titleMatch[1].trim() : '';
check(title.length > 0, `title present (${title.length} chars)`, 'title missing');
check(
  /[А-Яа-яЁё]/.test(title),
  'title is in Russian',
  `title is not Russian — content language is ru (DEC-16): "${title}"`
);
if (title.length > 70) warn(`title is ${title.length} chars — search results truncate around 60`);

// ---------------------------------------------------------------------------
// 3. Token substitution — a leftover token breaks every absolute URL
// ---------------------------------------------------------------------------
check(
  !/\{\{SITE_[A-Z_]+\}\}/.test(html),
  'no unsubstituted {{SITE_*}} tokens',
  'unsubstituted {{SITE_*}} tokens left in the document (site-config substitution failed)'
);

// ---------------------------------------------------------------------------
// 4. Canonical
// ---------------------------------------------------------------------------
const canonicals = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)];
check(canonicals.length === 1, 'exactly one canonical link', `expected 1 canonical, found ${canonicals.length}`);
if (canonicals.length === 1) {
  const href = (canonicals[0][0].match(/href=["']([^"']+)["']/) || [])[1] || '';
  check(href.startsWith('https://'), `canonical is absolute (${href})`, `canonical is not absolute: "${href}"`);
  check(href === SITE.url, 'canonical equals SITE.url', `canonical "${href}" != SITE.url "${SITE.url}"`);
}

// ---------------------------------------------------------------------------
// 5. Open Graph / Twitter — relative URLs break every unfurl
// ---------------------------------------------------------------------------
for (const prop of ['og:url', 'og:image', 'og:site_name', 'og:locale', 'og:title']) {
  const re = new RegExp(`<meta[^>]+property=["']${prop}["'][^>]*>`, 'i');
  check(re.test(html), `${prop} present`, `${prop} missing`);
}

const ogImage = (html.match(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i) || [])[1] || '';
check(
  ogImage.startsWith('https://'),
  'og:image is absolute',
  `og:image must be absolute (Open Graph spec): "${ogImage}"`
);
if (ogImage.startsWith('https://')) {
  const relative = ogImage.slice(SITE.url.length).replace(/^\/+/, '');
  const expectedPath = indexPath.includes(`${'dist'}`)
    ? join(ROOT, 'dist', relative)
    : join(ROOT, relative);
  check(
    existsSync(expectedPath),
    `og:image file exists (${relative})`,
    `og:image target missing from the build: ${relative}`
  );
  const twitterImage = (html.match(/<meta[^>]+name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) || [])[1] || '';
  check(twitterImage === ogImage, 'twitter:image matches og:image', `twitter:image "${twitterImage}" != og:image "${ogImage}"`);
}

// ---------------------------------------------------------------------------
// 6. JSON-LD
// ---------------------------------------------------------------------------
const ldBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
check(ldBlocks.length === 1, 'exactly one JSON-LD block', `expected 1 JSON-LD block, found ${ldBlocks.length}`);

if (ldBlocks.length === 1) {
  let parsed = null;
  try {
    parsed = JSON.parse(ldBlocks[0][1]);
    pass('JSON-LD parses as JSON');
  } catch (error) {
    fail(`JSON-LD is not valid JSON: ${error.message}`);
  }

  if (parsed) {
    const nodes = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
    check(nodes.length >= 2, `JSON-LD @graph has ${nodes.length} nodes`, 'JSON-LD @graph should describe at least the article and the website');
    const serialized = JSON.stringify(parsed);
    check(!serialized.includes('{{'), 'JSON-LD URLs are substituted', 'JSON-LD contains unsubstituted tokens');
    check(/"inLanguage"\s*:\s*"ru"/.test(serialized), 'JSON-LD inLanguage: ru', 'JSON-LD is missing inLanguage: ru');
  }
}

// ---------------------------------------------------------------------------
// 7. Sitemap
// ---------------------------------------------------------------------------
for (const candidate of [join(ROOT, 'dist', 'sitemap.xml'), join(ROOT, 'sitemap.xml')]) {
  if (!existsSync(candidate)) continue;
  const xml = readFileSync(candidate, 'utf-8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  check(locs.length > 0, `sitemap has ${locs.length} URL(s)`, 'sitemap has no <loc> entries');
  const relative = locs.filter((loc) => !loc.startsWith('https://'));
  check(relative.length === 0, 'every sitemap <loc> is absolute', `sitemap has relative <loc>: ${relative.join(', ')}`);
  const fragments = locs.filter((loc) => loc.includes('#'));
  check(fragments.length === 0, 'sitemap lists no #fragment URLs', `sitemap lists fragment URLs (not addressable): ${fragments.join(', ')}`);
  check(/<lastmod>/.test(xml), 'sitemap has <lastmod>', 'sitemap has no <lastmod>');
  break;
}

// ---------------------------------------------------------------------------
// 8. robots.txt — only meaningful at the HOST root; say so honestly
// ---------------------------------------------------------------------------
const robotsPath = join(ROOT, 'robots.txt');
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf-8');
  const hostRoot = new URL(SITE.url).origin + '/';
  if (SITE.url === hostRoot) {
    pass('robots.txt is at the host root — crawlers will read it');
  } else if (/Sitemap:\s*https?:\/\//i.test(robots)) {
    warn(`robots.txt declares a Sitemap, but crawlers only read the HOST root robots.txt — this one is inert while the site sits at ${SITE.url} instead of ${hostRoot} (D-1)`);
  }
}

// ---------------------------------------------------------------------------
console.log('');
if (failures > 0) {
  console.log(`FAILED: ${failures} SEO check(s)`);
  process.exit(1);
}
console.log('PASSED: all SEO checks');
