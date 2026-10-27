/**
 * Browser proof for the prerender change (docs/PROMOTION_PLAN.md §3 A1).
 *
 * A build artifact can be correct and the page still be broken. This drives a
 * real browser against the committed root document and asserts the four things
 * that prerendering could plausibly break:
 *
 *   1. the content renders (61 sections),
 *   2. the shell took the adoption path (no fragment refetch),
 *   3. the TOC still builds from the prerendered DOM,
 *   4. deep-link anchors still scroll (the 61-anchor / 133-redirect contract).
 *
 * Requires a static server on http://localhost:3000 (pnpm run serve).
 * Usage: node tools/verify-prerender.mjs
 */

import puppeteer from 'puppeteer';

const URL_BASE = process.env.VERIFY_URL || 'http://localhost:3000/';
const results = [];
const ok = (name) => results.push({ name, pass: true });
const bad = (name, detail) => results.push({ name, pass: false, detail });

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

try {
  const page = await browser.newPage();
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));

  const response = await page.goto(URL_BASE, { waitUntil: 'networkidle2', timeout: 60000 });

  // 1. Sections rendered
  const sections = await page.$$eval('main#content section[data-section]', (nodes) => nodes.length);
  sections === 61 ? ok(`61 sections rendered (got ${sections})`) : bad('section count', `expected 61, got ${sections}`);

  // 2. Adoption path: no parts/*.html fragment re-fetch
  const fragmentRequests = requests.filter((url) => /\/parts\/part_\d|appendix_/.test(url));
  fragmentRequests.length === 0
    ? ok('adoption path: no fragment refetch')
    : bad('fragment refetch', `${fragmentRequests.length} parts fetched: ${fragmentRequests.slice(0, 3).join(', ')}`);

  // 3. TOC built from the prerendered DOM
  const tocItems = await page.$$eval('#toc-content a, #toc-content [data-anchor]', (nodes) => nodes.length);
  tocItems > 50 ? ok(`TOC built (${tocItems} items)`) : bad('TOC', `only ${tocItems} TOC entries`);

  // 4. Deep link
  await page.goto(`${URL_BASE}#p4_spine_overview`, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const deepLink = await page.evaluate(() => {
    const target = document.getElementById('p4_spine_overview');
    if (!target) return { found: false };
    const rect = target.getBoundingClientRect();
    return { found: true, nearTop: Math.abs(rect.top) < 400, scrollY: window.scrollY };
  });
  deepLink.found && deepLink.nearTop
    ? ok(`deep link #p4_spine_overview (scrollY ${Math.round(deepLink.scrollY)})`)
    : bad('deep link', JSON.stringify(deepLink));

  // 5. No double paint: content is not duplicated
  const spineCount = await page.evaluate(() => document.querySelectorAll('[data-section="p4_spine_overview"]').length);
  spineCount === 1 ? ok('no double paint (single section instance)') : bad('double paint', `${spineCount} instances of p4_spine_overview`);

  // 6. Loading overlay is gone
  const overlayHidden = await page.evaluate(() => {
    const overlay = document.getElementById('loading-overlay');
    return !overlay || overlay.classList.contains('hidden');
  });
  overlayHidden ? ok('loading overlay hidden') : bad('loading overlay', 'overlay still visible');
} finally {
  await browser.close();
}

const failed = results.filter((result) => !result.pass);
for (const result of results) {
  console.log(`${result.pass ? 'PASS' : 'FAIL'}: ${result.name}${result.detail ? ` — ${result.detail}` : ''}`);
}
console.log('');
if (failed.length > 0) {
  console.log(`FAILED: ${failed.length} check(s)`);
  process.exit(1);
}
console.log('PASSED: prerender verified in a real browser');
