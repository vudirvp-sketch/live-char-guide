#!/usr/bin/env node
/**
 * generate_glossary.mjs — v2 glossary machine-layer generator (DEC-17/DEC-18, iter 133).
 *
 * Source-of-truth chain (DEC-17b):
 *   docs/canon/glossary_registry.md  (canonical term record — the only hand-edited file)
 *     → data/glossary.json           (generated machine layer — NEVER hand-edit)
 *       → runtime glossary panel     (src/shell/lazy-loader.js, fetch data/glossary.json)
 *       → no-JS glossary page        (scripts/build-unified.mjs → parts/glossary.html)
 *
 * Wired as the first stage of `pnpm run build` (package.json "build" chain), so the
 * generated artifact can never drift from the registry without showing in `git status`.
 *
 * Registry entry pattern (see docs/canon/glossary_registry.md "Registry pattern"):
 *
 *   ### Head
 *   **Head** — definition (single line).
 *   → `[ref: part_NN.md §X.Y — Title]`
 *   → `[meta: sources=…; lang=ru|en; home=<section id>; xrefs=a, b; abbr=X; aliases=…; deprecated=…; prohibited=…]`
 *
 * Emitted JSON fields (v1-compatible shape):
 *   version             — from src/VERSION (fixes the stale 9.2.0; DEC-17 "version generated")
 *   canonical_terms[]   — term, abbreviation, aliases, definition, prohibited, deprecated,
 *                         anchor_id, cross_refs, language_category
 *   NOT emitted (dead/stale v1 layers, REMOVED_WITH_REASON per migration_map_v2 §5.1):
 *   core_rules (dead data), unified_definition (stale drafts; runtime falls back to
 *   `definition` — both consumers use `unified_definition || definition`).
 *
 * language_category semantics (v2, clean re-definition): 'en' = English identifier
 * head (DEC-16 identifier class), 'ru' = Russian-first head. Nothing consumed the v1
 * A/B values (verified iter 132); the field now encodes the ratified head-form policy.
 *
 * Deterministic output: registry order, 2-space indent, trailing newline — no timestamps.
 */

import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_PATH = join(ROOT, 'docs', 'canon', 'glossary_registry.md');
const VERSION_PATH = join(ROOT, 'src', 'VERSION');
const OUT_PATH = join(ROOT, 'data', 'glossary.json');

/** Parse the registry markdown into term records. */
function parseRegistry(text) {
  const lines = text.split('\n');
  const entries = [];
  const standaloneSources = []; // meta lines outside any entry (e.g. the pattern section C-1)

  let current = null;
  let inFence = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (line.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue; // example blocks inside the pattern declaration are not entries
    if (line.startsWith('### ')) {
      current = { head: line.slice(4).trim() };
      entries.push(current);
      continue;
    }
    if (!current) {
      // Before the first entry: still collect standalone meta sources for reporting.
      const m = line.match(/^→ `\[meta: (.+)\]`$/);
      if (m) standaloneSources.push(m[1]);
      continue;
    }
    if (line.startsWith('**') && current.definition === undefined) {
      const m = line.match(/^\*\*(.+?)\*\* — (.*)$/);
      if (!m) {
        throw new Error(`Entry "${current.head}": definition line does not match the pattern`);
      }
      if (m[1] !== current.head) {
        throw new Error(
          `Entry "${current.head}": bold head "${m[1]}" differs from the section heading`
        );
      }
      current.definition = m[2].trim();
      continue;
    }
    if (line.startsWith('→ `[ref: ')) {
      const m = line.match(/^→ `\[ref: (.+)\]`$/);
      if (!m) throw new Error(`Entry "${current.head}": malformed ref line`);
      current.ref = m[1];
      continue;
    }
    if (line.startsWith('→ `[meta: ')) {
      const m = line.match(/^→ `\[meta: (.+)\]`$/);
      if (!m) throw new Error(`Entry "${current.head}": malformed meta line`);
      const fields = {};
      for (const part of m[1].split('; ')) {
        const eq = part.indexOf('=');
        if (eq === -1) throw new Error(`Entry "${current.head}": malformed meta field "${part}"`);
        fields[part.slice(0, eq)] = part.slice(eq + 1);
      }
      current.meta = fields;
      continue;
    }
  }

  return { entries, standaloneSources };
}

function parseList(value) {
  if (!value || !value.trim()) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

/** Validate parsed entries and build the machine-layer records. */
function buildTerms(entries) {
  const seenHeads = new Set();
  const terms = [];

  for (const e of entries) {
    if (!e.definition || !e.ref || !e.meta) {
      throw new Error(`Entry "${e.head}": incomplete entry (need definition + ref + meta)`);
    }
    const meta = e.meta;
    for (const required of ['sources', 'lang', 'home']) {
      if (!meta[required]) {
        throw new Error(`Entry "${e.head}": meta field "${required}" is required`);
      }
    }
    if (!['ru', 'en'].includes(meta.lang)) {
      throw new Error(`Entry "${e.head}": lang must be "ru" or "en" (got "${meta.lang}")`);
    }
    if (!/^[a-z][a-z0-9_]*$/.test(meta.home)) {
      throw new Error(`Entry "${e.head}": home "${meta.home}" is not a section id`);
    }
    for (const x of parseList(meta.xrefs)) {
      if (!/^[a-z][a-z0-9_]*$/.test(x)) {
        throw new Error(`Entry "${e.head}": xref "${x}" is not a section id`);
      }
    }
    if (seenHeads.has(e.head)) {
      throw new Error(`Duplicate entry head: ${e.head}`);
    }
    seenHeads.add(e.head);

    // Registry typography: after "**Head** — " the sentence continues lowercase (MD norm).
    // The machine layer renders the definition standalone (panel / no-JS <dd>), so the
    // first letter is upper-cased on emission (Unicode-aware, covers Cyrillic).
    const definition = e.definition
      ? e.definition.charAt(0).toUpperCase() + e.definition.slice(1)
      : e.definition;

    terms.push({
      term: e.head,
      abbreviation: (meta.abbr && meta.abbr.trim()) || null,
      aliases: parseList(meta.aliases),
      definition,
      prohibited: parseList(meta.prohibited),
      deprecated: parseList(meta.deprecated),
      anchor_id: meta.home,
      cross_refs: ['#' + meta.home, ...parseList(meta.xrefs).map((x) => '#' + x)],
      language_category: meta.lang,
    });
  }

  return terms;
}

async function main() {
  if (!existsSync(REGISTRY_PATH)) {
    console.error('[glossary] registry not found:', REGISTRY_PATH);
    process.exit(1);
  }
  const registry = await readFile(REGISTRY_PATH, 'utf-8');
  const { entries, standaloneSources } = parseRegistry(registry);

  if (entries.length === 0) {
    console.error('[glossary] registry parsed to 0 entries — refusing to write');
    process.exit(1);
  }

  const terms = buildTerms(entries);

  const version = (await readFile(VERSION_PATH, 'utf-8')).trim();
  const output = { version, canonical_terms: terms };
  const json = JSON.stringify(output, null, 2) + '\n';

  await writeFile(OUT_PATH, json);
  console.log(
    `[glossary] generated ${OUT_PATH}: ${terms.length} terms, version ${version}` +
      (standaloneSources.length
        ? ` (registry pattern sources: ${standaloneSources.join(' | ')})`
        : '')
  );
}

main().catch((err) => {
  console.error('[glossary] FAILED:', err.message);
  process.exit(1);
});
