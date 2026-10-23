/**
 * @fileoverview TOC coverage invariants (v3 restructure, iter 171).
 *
 * Guards the navigation contract that makes the guide readable:
 *   1. every rendered section is reachable in the shell TOC (`data-toc-nav`);
 *   2. every `data-section` id matches the Part-grouping regex the shell uses
 *      (`^p(\d+[ab]?)_`) — an id that does not match silently drops out of the
 *      TOC (this is how Parts 7A/7B disappeared before iter 171);
 *   3. every Part carries exactly one authored `data-part-title` (the Tier-1
 *      label; without it the Part is titled after its first section heading);
 *   4. there is exactly one navigation artifact — no inline auto-TOC placeholder
 *      may come back.
 *
 * Source of truth: src/master/*.html (the shell TOC is derived from it at runtime).
 */
import { test } from 'node:test';
import assert from 'node:assert';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MASTER = join(ROOT, 'src', 'master');

const PART_TITLE_FILES = [
  'part_00',
  'part_01',
  'part_02',
  'part_03',
  'part_04',
  'part_05',
  'part_06',
  'part_07a',
  'part_07b',
  'part_08',
  'part_09',
  'part_10',
];

function readMasterFiles() {
  return readdirSync(MASTER)
    .filter((f) => f.endsWith('.html'))
    .map((file) => ({ file, html: readFileSync(join(MASTER, file), 'utf8') }));
}

const SECTION_RE = /<section\b([^>]*)>/g;
const SECTION_ID_RE = /data-section="([^"]+)"/;
// Parts group by `p{N}_` / `p{NA}_`; appendices have their own TOC group.
const PART_GROUP_RE = /^p(\d+[ab]?)_/;
const APPENDIX_ID_RE = /^appendix_/;

test('every section is reachable in the shell TOC', () => {
  const missing = [];
  for (const { file, html } of readMasterFiles()) {
    for (const m of html.matchAll(SECTION_RE)) {
      const attrs = m[1];
      const id = SECTION_ID_RE.exec(attrs)?.[1];
      if (!id) continue;
      if (!/\bdata-toc-nav\b/.test(attrs)) missing.push(`${file}#${id}`);
    }
  }
  assert.deepStrictEqual(missing, [], `sections missing data-toc-nav: ${missing.join(', ')}`);
});

test('every data-section id matches the Part-grouping regex', () => {
  const orphans = [];
  for (const { file, html } of readMasterFiles()) {
    for (const m of html.matchAll(SECTION_RE)) {
      const id = SECTION_ID_RE.exec(m[1])?.[1];
      if (!id) continue;
      if (!PART_GROUP_RE.test(id) && !APPENDIX_ID_RE.test(id)) orphans.push(`${file}#${id}`);
    }
  }
  assert.deepStrictEqual(orphans, [], `section ids invisible to the TOC: ${orphans.join(', ')}`);
});

test('every Part carries exactly one authored data-part-title', () => {
  for (const base of PART_TITLE_FILES) {
    const html = readFileSync(join(MASTER, `${base}.html`), 'utf8');
    const titles = [...html.matchAll(/data-part-title="([^"]+)"/g)].map((m) => m[1]);
    assert.strictEqual(titles.length, 1, `${base}.html must carry exactly one data-part-title`);
    assert.ok(titles[0].trim().length > 0, `${base}.html data-part-title must not be empty`);
  }
});

test('no inline auto-TOC artifact returns', () => {
  for (const { file, html } of readMasterFiles()) {
    assert.ok(!html.includes('AUTO_TOC_PLACEHOLDER'), `${file} still carries the inline TOC placeholder`);
    assert.ok(!/class="guide-toc"/.test(html), `${file} still carries an inline .guide-toc block`);
  }
});
