/**
 * Prerender contract — docs/PROMOTION_PLAN.md §3 A1.
 *
 * The guide's words must be IN the HTML response, not fetched afterwards. These
 * assertions are the difference between "we added a build step" and "a crawler
 * actually sees the guide": without them a silent failure of prerenderIndex()
 * ships an invisible site while every other gate stays green.
 *
 * Run after `pnpm run build`.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST_INDEX = join(ROOT, 'dist', 'index.html');
const ROOT_INDEX = join(ROOT, 'index.html');
const MANIFEST = join(ROOT, 'build', 'parts', 'manifest.json');

function read(path) {
  return readFileSync(path, 'utf-8');
}

const distHtml = existsSync(DIST_INDEX) ? read(DIST_INDEX) : '';

describe('Prerender — content is in the HTML response', () => {
  it('dist/index.html exists', () => {
    assert.equal(existsSync(DIST_INDEX), true, 'run pnpm run build first');
  });

  it('main carries data-prerendered', () => {
    assert.match(distHtml, /<main id="content"[^>]*data-prerendered="true"/, 'lazy-loader.js adoption flag missing');
  });

  it('main is not hidden from crawlers', () => {
    const mainTag = (distHtml.match(/<main id="content"[^>]*>/) || [''])[0];
    assert.ok(mainTag.length > 0, '<main id="content"> not found');
    assert.doesNotMatch(mainTag, /content-hidden/, 'content-hidden must be dropped when prerendered');
  });

  it('every manifest section is present', () => {
    const manifest = JSON.parse(read(MANIFEST));
    const all = (manifest.parts || []).concat(manifest.appendices || []);
    const expected = all.reduce((sum, entry) => sum + entry.anchors.length, 0);
    const actual = (distHtml.match(/<section\s+data-section=/g) || []).length;
    assert.equal(actual, expected, `expected ${expected} sections in dist/index.html, found ${actual}`);
  });

  it('carries a real amount of visible text', () => {
    const text = distHtml.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
    const words = text.split(/\s+/).filter((word) => word.length > 1).length;
    // The whole point of the change: the old shell had ~40 words.
    assert.ok(words > 10000, `prerendered document has only ${words} words — content is still missing`);
  });

  it('root fallback equals the dist document', () => {
    assert.equal(read(ROOT_INDEX), distHtml, 'root index.html and dist/index.html diverged');
  });

  it('parts are still emitted for the fetch fallback', () => {
    const partsDir = join(ROOT, 'dist', 'parts');
    const files = readdirSync(partsDir).filter((file) => file.endsWith('.html'));
    assert.ok(files.length >= 14, `expected >= 14 part files in dist/parts, found ${files.length}`);
  });

  it('lazy-loader keeps the adoption guard', () => {
    const loader = read(join(ROOT, 'src', 'shell', 'lazy-loader.js'));
    assert.match(loader, /dataset\.prerendered === 'true'/, 'adoption guard removed from lazy-loader.js');
  });
});
