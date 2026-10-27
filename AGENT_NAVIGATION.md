# Agent Navigation — Live Character Guide

> **Current-state map.** Describes what IS, not what happened — no history, no narrative
> (history lives in `worklog.md`, `DECISIONS.md`, `CHANGELOG.md`, git). Update the affected
> section in the same iteration any structure changes.
> Read after [`AGENTS.md`](./AGENTS.md) (the operating law). Current state: [`STATUS.md`](./STATUS.md).
> **Canonical version:** `9.2.6`. Engineering pipeline for RP character cards (SPINE → deploy, 12B–32B+ models).
> Single linear guide: Part 0 → Part 10 + 2 rendered appendices (A, E — D is canon-only; B absorbed into E, iter 172; C deleted iter 177, F-19/DEC-31) · 61 sections (iter 195: Part 5 5→4 and §5.4 merged; iter 177: Appendix C removed; iter 174: v3 S4a — Parts 2/3/4/5/6 38→26; iter 173: Part 8 16→2, Part 9 11→7, Part 10 4→5; iter 188: v4-7 — Part 7B 5→3; iter 189: v4-8 — §7A.11 absorbed into §7A.12; iter 190: v4-9 — Part 9 7→5, §1.5 → Part 9) · 3 widgets · canon→master sync green (87/87). **v2 is the live site (the switch iter 170, DEC-25; runtime 61, hash `6f563edc`); v3 stage 2 (DEC-27) moved the model/runtime layer into Appendix E; the v4 track (COMPLETE, iter 190) re-cut chapters so every fact is printed where it is applied — the guide carries 10 internal section links: 4 cross-chapter (3 in Part 7A + the §9.7 Part 10 bridge) and 6 to or from appendices.**

---

## 1. Where Things Are

| Directory | Purpose | Rules |
|-----------|---------|-------|
| `src/master/` | Author content — 12 part files (`part_00` + `part_01..10.html` incl. `07a`/`07b`) + 2 appendices (`mbti`, `model_params` — `model_table` absorbed into `model_params` iter 172; `glossary` deleted iter 177, F-19/DEC-31). 61 sections (Part 0 wired iter 169; 98 at the v2 switch — v3 S3/S4a and v4 chapters 0–9 de-duplicated the corpus). | **Authors edit here.** All content inside `<section data-section>`. FORBIDDEN: `<style>` / `<script>` / `<link>` / `<meta>`. |
| `src/shell/` | Infrastructure shell — `index.html` (auto-load; iter 193: `.layout-grid` = TOC rail \| `#content` \| `.tool-dock`, + the narrow-screen `.reading-bar`), `styles.css`, `lazy-loader.js` (iter 193: + `buildRailTOC`/`updateRailFromScroll` scrollspy, three-theme ◐ cycle, FAB re-parenting into the dock; the glossary side tab is retired — DEC-35; iter 194: the wide grid is centred, the E01–E18 mini-map nav and the ↔ width toggle are retired, `<body class="theme-dark">` makes soft dark the default — DEC-36), `event-bus.js`, `widgets/` (3 widgets), `interactions/` (5 VS behaviour scripts), `lib/` (2 shared scripts). | **Do NOT touch when writing Parts.** Changes go through an infrastructure request. |
| `src/shell/widgets/` | **3 content widgets** (iter 176, F-18): `ocean-insight`, `mbti-composer`, `persona-voice-hierarchy`. | Markup in HTML, data in `data/*.json` (exception: `persona-voice-hierarchy` uses canon-embedded §3.2 constants — see widget header). |
| `src/shell/interactions/` | **4 VS behaviour scripts**: `vs-e10-enneagram`, `vs-e13-diagnostic`, `vs-e16-author-note`, `vs-scroll-observer` (`vs-mini-map` retired iter-194 — the reading rail owns section navigation, DEC-36). No own data; attach behaviour to embed markup. | Loaded by `index.html`; paths mirrored in the build + root fallbacks. |
| `src/shell/lib/` | **2 shared scripts**: `widget-utils.js` (fetchJson cache, escapeHtml, OCEAN constants), `js-flag.js` (`.js` class pre-paint, CSP/FOUC). | `widget-utils.js` MUST load before widgets/interactions. |
| `src/assets/` | Static assets — `favicon.svg`, `preview-card.png`, `vs-styles.css`, `fonts/`. | Read by `build-shell-unified.mjs` (`ASSETS_SRC = src/assets/`). |
| `src/scripts/` | Build script `build-shell-unified.mjs` (copies shell + parts + data → `dist/`). | Run via `pnpm run build:shell`. |
| `src/VERSION` | Plain text file with the version. | Synchronized with `package.json` + `data/character_schema.json` + build manifest. |
| `data/` | JSON widget data: `glossary.json`, `ocean.json`, `enneagram.json`, `mbti.json`, `character_schema.json`, `anchor-redirects.json`. | Authors own data. Infrastructure owns schemas. **Never hardcode widget data in JS.** **`glossary.json` is GENERATED** from `docs/canon/glossary_registry.md` (`scripts/generate_glossary.mjs`, first stage of `pnpm run build`) — never hand-edit; term changes go through the registry only (DEC-17/18). **`enneagram.json` is GENERATED** from the §5.3 table (`scripts/generate_enneagram.mjs`, second stage of `pnpm run build`) — never hand-edit; canonical value changes go through `docs/canon/part_05.md` §5.3, machine-layer supplement changes through the generator (mig-5). |
| `scripts/` | Build + validation scripts. **package.json-wired:** `build-unified.mjs`, `validate-artifact.mjs`, `validate-master.mjs`, `version-sync.mjs`. **QA scripts:** `csp_check.mjs`, `bundle_check.mjs`, `contrast_checker.mjs`, `check_english.py`, `check_syntax_mix.py`, `check-doc-versions.mjs`, `test-interactive.mjs`. | `pnpm run <script>` for wired. `pnpm run qa:*` for ad-hoc QA. |
| `tests/` | Node test runner: `test-build.mjs`, `test-validate-artifact.mjs`, `test-version-sync.mjs`, `test-toc-coverage.mjs`, `widget-smoke.mjs`, `visual-parity.mjs`, `tests/integration/test-full-build.mjs`. | `pnpm test` runs `tests/test-*.mjs` + `tests/integration/*.mjs` (68 tests; `widget-smoke.mjs` and `visual-parity.mjs` are manual — run via `tests/run-tests.sh all`). |
| `docs/` | Technical documentation (not in build). | Update on structural changes. See §7. |
| `visual-system/` | Visual system prototypes: `PLAN.md`, `DESIGN-TOKENS.css`, `shared/`, `elements/` (E02–E06, E09, E11, E13, E14, E16, E18 — E01/E08/E10/E15 → `REMOVED_WITH_REASON` iter 138, E07 → iter 142, E12/E17 → iter 145, DEC-19), `hero/` → `REMOVED_WITH_REASON` iter 140 (DEC-19 §6.4 disposal; archive = git history), `integration/` (component-extracts). `tokens.json` feeds `qa:contrast`. | **Frozen design artifacts (DEC-19, iter 138):** master embed (L2) = the canonical visual markup; archive = git history; remaining families ride the freeze at their slice time. |
| `parts/`, `widgets/`, `interactions/`, `lib/`, `assets/`, `event-bus.js`, `data/`, `index.html`, `build.hash` | **Root fallbacks** — regenerated on every `pnpm run build` from `dist/`. Committed to git for GitHub Pages backward-compat. | **NEVER edit directly.** All edits go in `src/master/`, `src/shell/`, `src/assets/`, `data/`. |
| `dist/` | Deployment output (gitignored). | Auto-generated → GitHub Pages. |

---

## 2. Build Pipeline

```
docs/canon/glossary_registry.md  (canonical term record — 48 entries, iter 133+)
        ↓
scripts/generate_glossary.mjs   →   data/glossary.json  (generated — NEVER hand-edit)
        ↓
docs/canon/part_05.md §5.3      (canonical Enneagram 9-type table — mig-5, iter 136; renumbered §5.4→§5.3 iter 174)
        ↓
scripts/generate_enneagram.mjs  →   data/enneagram.json (generated — NEVER hand-edit;
        ↓                              canonical fields from §5.3; machine-layer
                                     supplement lives in the generator)
src/master/part_*.html  (author content)
        ↓
scripts/build-unified.mjs   →   parts/*.html (unified) + manifest.json  (reads data/glossary.json → parts/glossary.html)
        ↓
src/scripts/build-shell-unified.mjs   →   dist/  for GitHub Pages + root fallbacks
        ↓
dist/  (deployed to GitHub Pages)
```

The glossary chain (DEC-17/18): canonical term record → generated `glossary.json` → runtime panel (`src/shell/lazy-loader.js`) / no-JS page (`parts/glossary.html`). Parity gate: `python3 scripts/audit_glossary_parity.py` MUST PASS.
The enneagram chain (mig-5, DEC-17 direction precedent): §5.3 table (`docs/canon/part_05.md`) → generated `enneagram.json` → E10 mini-cards (the E10 reader script). Parity gate: `python3 scripts/audit_enneagram_parity.py` MUST PASS.

### Commands

```bash
pnpm install              # Install dependencies (Node >= 20, pnpm 10.x)
pnpm run build            # Full build (glossary + enneagram generation + unified + shell)
pnpm run build:glossary   # Registry → data/glossary.json only
pnpm run build:enneagram  # Canon §5.3 → data/enneagram.json only
pnpm run validate         # Validate build artifact
pnpm run validate:master  # Validate master files
pnpm run version:check    # Check 4-place version sync
pnpm test                 # All tests
pnpm run qa               # Aggregate QA (csp + bundle + english + syntax + doc-versions)
```

### Deploy

```bash
pnpm run build              # Rebuild dist/ + root fallbacks
pnpm run validate           # Validate build
pnpm run validate:master    # Validate master files
git add <specific files>    # Including regenerated root fallbacks
git commit -m "iter N: <description>"
git push origin main        # Trigger GitHub Actions → GitHub Pages
# Online in ~30–60 s: https://vudirvp-sketch.github.io/live-char-guide/
```

**What functionally deploys:** `src/master/*.html`, `src/shell/`, `src/assets/`, `data/*.json`, `parts/` (root fallbacks).

**What does NOT deploy (doc-only):** `docs/canon/*.md`, `docs/*.md`, root `*.md`, `visual-system/`, `scripts/`, `tests/`.

**Build hash scope (verified in code, `src/scripts/build-shell-unified.mjs`):** `build.hash` = first 8 hex chars of `sha256(src/shell/index.html)` — a **cache-busting value, NOT a content digest**. Consequences: changes to `src/master/*.html`, CSS, or `data/*.json` do NOT change the hash; only `src/shell/index.html` edits do. A run of `pnpm run build` may still touch root `index.html` (the `Generated:` timestamp comment) without any functional change.

---

## 3. Section Model

### Unified Single-Pass Architecture (v8+)

All content lives in a single linear pass: Part 1 → Part 10. No layers, tiers, or depth levels. Every section is visible to every reader.

```
Part 1 (Foundations) → Part 2 (Anchors) → Part 3 (Voice) → Part 4 (SPINE) →
Part 5 (Psychology) → Part 6 (CoT) → Part 7A/7B (Technical) →
Part 8 (Anti-patterns) → Part 9 (Diagnostics) → Part 10 (Examples)
```

### Section Markup in Master HTML

```html
<section data-section="p2_basic_anchors" id="p2_basic_anchors" data-toc-nav>
  <!-- difficulty: BASIC | INTERMEDIATE | EXPERT -->
  <!-- canonical: <canonical section name> -->
  <h2>Section heading</h2>
  <!-- content -->
</section>
```

The first section of each Part additionally carries the authored Part label:

```html
<section data-section="p4_spine_overview" id="p4_spine_overview" data-toc-nav data-part-title="SPINE: психологический каркас">
```

| Attribute | Required | Format | Example |
|-----------|----------|--------|---------|
| `data-section` | Yes | `p{N}_{topic}` / `p{7a}_{topic}` | `data-section="p4_spine_overview"` |
| `id` | Yes (must equal `data-section`) | `p{N}_{topic}` | `id="p4_spine_overview"` |
| `data-toc-nav` | **Yes** (iter 171 — every rendered section) | boolean | `data-toc-nav` |
| `data-part-title` | **Yes, once per Part** (iter 171 — on the Part's first section) | short Russian label | `data-part-title="Голос и изоляция"` |

**Navigation contract (DEC-26).** There is exactly ONE navigation surface: the shell
TOC panel built by `generateTOC()` in `src/shell/lazy-loader.js`. It groups sections by
`^p(\d+[ab]?)_`, titles each Part from `data-part-title` (fallback: its first `<h2>`,
then `Part N`), and labels each entry with the section's own first `h2|h3`.
`data-toc-nav` is therefore mandatory — a section without it is invisible to readers.
`tests/test-toc-coverage.mjs` enforces all four rules; the inline auto-TOC
(`AUTO_TOC_PLACEHOLDER`) was deleted in iter 171 and must not return.

### Naming Convention

Pattern: `p{part_number}_{topic}` (e.g. `p1_card_overview`, `p7a_core_directives`, `p8_ap15_ocean_overload`). Every `data-section` ID MUST be unique across the entire master guide.

### FORBIDDEN in Master Files

- `<style>` blocks → all styles live in `src/shell/styles.css` or `src/assets/vs-styles.css`.
- `<script>` blocks → all scripts live in `src/shell/lazy-loader.js`.
- `<link>` / `<meta>` elements.
- Content outside `<section data-section>`.
- `data-layer` / `data-layer-switch` attributes (removed in v8).
- `class="layer-remark"` (removed in v8).
- Markdown patterns inside HTML (use real HTML tags).

---

## 4. Widget Architecture

### Markup in HTML, Data in JSON, Behavior in JS

**3 content widgets** (iter 176, F-18). Markup lives in `src/master/*.html`, data in `data/*.json`, behavior in `src/shell/widgets/*.js` (`ocean-insight`, `mbti-composer`, `persona-voice-hierarchy`); the standalone VS behaviour lives in `src/shell/interactions/*.js`, shared helpers in `src/shell/lib/*.js`. JS only reads data, never hardcodes it. Exception: `persona-voice-hierarchy` embeds canon-constant data (6 sources × 3 models from §3.2 table) directly in JS — these are canonical prose values, not user-editable widget data. Since iter 180 it is the **control strip for the §3.2 table** (model toggle → column highlight, Markdown export) and does not re-render the matrix: the section table is the single numeric surface (`audit_voice_parity.py` fails if row/bar markup returns).

### Widget Data Files

| Widget | Data File |
|--------|-----------|
| `ocean-insight` | `data/ocean.json` |
| `vs-e10-enneagram` (interactions) | `data/enneagram.json` (**generated** from the §5.3 table — mig-5; LIE lives once in `types[].lie_template`) |
| `mbti-composer` | `data/mbti.json` |
| `persona-voice-hierarchy` | _(none — canon-embedded; values from §3.2 table)_ |
| Glossary | `data/glossary.json` (**generated** from `docs/canon/glossary_registry.md` — DEC-17/18) |
| Anchor redirects | `data/anchor-redirects.json` |
| Test scenarios | `data/test_scenarios.json` |

### Widget Lifecycle

1. `lazy-loader.js` scans the DOM on `scroll-into-view`.
2. Loads the corresponding `src/shell/widgets/<widget>.js` (or `interactions/…`, `lib/…`) dynamically.
3. Widget initializes, reads `data/*.json` via `fetch()`.
4. `event-bus.js` coordinates inter-widget events.

---

## 5. Core Rules

### Three Key Principles (§1.4)

1. **Anchor = Trigger → Action → Price** — every Anchor has a physical Price in the same scene.
2. **Voice = Examples and Greeting only** — linguistic voice (words, syntax) belongs only in Examples; physical voice characteristics (timbre, rasp) belong in Description as part of Embodiment.
3. **Psychology = compact in Description, in tags, not narrative** — SPINE/OCEAN/Enneagram as `<spine>`/`<ocean>`/`<enneagram>` tags, not narrative. Never in System Prompt.

### SPINE Framework

5 elements: GHOST (past trauma) → LIE (false belief) → FLAW (behavioral defect) → NEED (true need) → WANT (conscious desire).

### CORE DIRECTIVES (7, in System Prompt)

Layered by model (12B <64K vocab → English; ≥128K vocab 12B–14B → English or card language; 32B+/API → card language preferred — see §7A.2 RULE):

1. Show Never Tell
2. Embodiment First
3. Spatial & Anatomical Lock
4. Environmental Reactivity
5. Influence Boundary
6. Consequence Driven
7. Pre-Generation Filter

(Format Lock is a separate SP element — §7A.4 — not CORE DIRECTIVE #7; verified against `docs/canon/part_07a.md` iter 117.)

### Version Control

Versions are synchronized in 4 places: `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest. `pnpm run version:check` verifies sync. When bumping: update `src/VERSION` + `package.json` + `data/character_schema.json` MANUALLY in the same commit; `parts/manifest.json` regenerates on build.

---

## 6. Frequent Pitfalls

### Master HTML basics

1. **`<style>` / `<script>` forbidden in master files** — all styles in `src/shell/styles.css` or `src/assets/vs-styles.css`, scripts in `src/shell/lazy-loader.js`, `src/shell/widgets/*.js`, `src/shell/interactions/*.js` or `src/shell/lib/*.js`. Inline styles forbidden. Inline scripts forbidden (CSP compliance).
2. **Content outside `<section data-section>`** — all content in master HTML MUST be inside a section with the `data-section` attribute.
3. **Heading hierarchy** — one `<h1>` per page, `<h2>` for sections, `<h3>` for subsections. Do not skip levels.
4. **English terms in Russian prose (two-layer policy, DEC-16)** — 3+ English words outside allowed contexts trigger `check_english.py`. Baseline: 1 English leak by design (was 19 before iter-123 russification) — all executable prompt content (Tone Frame strings, SP directives, Part 10 card examples, Quality Grade, Token Budget Check). Guide prose, labels, and headings are Russian; ordinary English terminology is translated (`token → токен`, `lie → ложь`). English stays only in executable prompt containers (prescribed English), technical identifiers, and proper names. SP Language rule is layered (12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language) — see §7A.2 RULE.
5. **CSS class creation without approval** — authors use ONLY components from `docs/components.md`. New classes require infrastructure approval.
6. **Hardcoded widget data in JS** — all data lives in `data/*.json`. JS only reads.

### Build and deploy

7. **Root fallbacks vs canonical sources** — top-level `widgets/`, `assets/`, `parts/`, `event-bus.js`, `data/`, `index.html`, `build.hash` are **regenerated root fallbacks**, NOT duplicates. All edits go in canonical sources (`src/master/`, `src/shell/`, `src/assets/`, `data/`).
8. **Versions in 4 places** — `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest. `pnpm run version:check` verifies sync. **On version bump** — update ALL 4 places simultaneously (`src/VERSION` manually + `package.json` + `character_schema.json` manually; `parts/manifest.json` regenerates on build). KI#63 (iter 96): drift occurred when `src/VERSION` was updated without `package.json` / `character_schema.json`. KI#64 (iter 101, CLOSED iter-107): same drift pattern — `mermaid-init.js` JSDoc bumped to `9.3.0` alone; fixed via Variant A rollback (JSDoc → 9.2.6, no 4-place bump). **iter-113:** `mermaid-init.js` deleted entirely (Mermaid CDN dependency removed — content diagrams were replaced by VS-EMBEDs in iter 14, only infrastructure remained). The 5th version-tracking point (`mermaid-init.js` JSDoc) is gone; sync is back to canonical 4 places.
9. **Mermaid CDN dependency — REMOVED iter-113.** Mermaid.js was loaded from `cdn.jsdelivr.net` but had ZERO usages in `src/master/*.html` (content diagrams were replaced by VS-EMBEDs in iter 14). Removed in iter-113: CDN `<script>` tag, `widgets/mermaid-init.js`, lazy-loader init/render block + `reRenderMermaid()` call, `.mermaid` CSS in `src/shell/styles.css`. CSP tightened: `cdn.jsdelivr.net` dropped from `script-src`, `worker-src 'self' blob:;` directive dropped entirely (was Mermaid v11 Web Worker only). `cdn.jsdelivr.net` retained in `style-src` + `font-src` for Geist font CSS.
10. **`noscript` in build artifact** — must be present. Do not remove.
11. **Widget guards** — `Clipboard API guard` (`if (navigator.clipbox)`) — do not remove. (iter-112: `blueprint-viewer destroy()` removed — widget was dead, 0 container usages.)

### Visual System

12. **`viz > dry text` principle** — visualization = **replacement**, not **addition**. If a VS-EMBED shows a concept, text MUST NOT re-explain it. Unique visualizations are not deleted even when duplicated.
13. **VS scroll-animation invariant** — all animation classes in `src/assets/vs-styles.css` MUST be covered either by `SCROLL_ENTER_SELECTOR` in `vs-scroll-observer.js` (11 classes) or by the `scroll-enter` class. Audit: `python3 scripts/audit_vs_embeds.py`.
14. **CSS scoping invariant** — VS-EMBED element CSS selectors MUST be scoped to an element-specific parent (`.blueprint-area`, `.funnel-stack`, `.spine-flow`, etc.).
15. **VS elements registry** — 11 files in `visual-system/elements/` (E02, E03, E04, E05, E06, E09, E11, E13, E14, E16, E18); the shipped element CSS lives in `src/assets/vs-styles.css` SECTION 5 (the registry originally covered E01–E18 — E01/E07/E08/E10/E12/E15/E17 were disposed, DEC-19).

### Canon sync and drift detection

16. **Canon → master HTML sync** — `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. Regression test: `python3 scripts/audit_canon_master_sync.py` (87/87 PASS).
17. **Drift detector** — `python3 scripts/audit_canon_master_drift.py` — informational, exit 0. ~88 paragraph drifts expected (VS-EMBEDs replace text).
18. **Callout class policy** — allowed: `.callout.rule` / `.rec` / `.ex` and plain `.callout`. FORBIDDEN: `.callout.note` / `.info` / `.warn` / `.tip` / `.box` / `.sidebar` / `.custom` / `.important`.
19. **Callout labels — exactly four (F-20, iter 178 / DEC-32)** — `ПРАВИЛО`, `РЕКОМЕНДАЦИЯ`, `ПРИМЕР`, `НАБЛЮДЕНИЕ`, in ONE treatment: every labelled block is a `.callout` whose first paragraph is `<p><strong>LABEL:</strong> …</p>`. The retired vocabulary (`ИЛЛЮСТРАЦИЯ`, `ШАБЛОН`, `Переход`, `Синтез`, `Ссылка`, `Демонстрирует`, `Примечание`) is prose now, and the `example-label` chip class is forbidden. `scripts/validate-master.mjs` Check 8 rejects any deviation. Callout bodies are Russian; English label text is allowed ONLY inside copy-paste prompt containers where the guide prescribes English.
20. **YAML front-matter** — all canon files (except `_README.md`) use YAML front-matter.
21. **OCEAN labeling consistency** — extreme = strictly `<30` or `>70`; cautious zone = `30–40` / `60–70`. On mismatch between bible and canon Part 10 — fix the bible (principle: the guide's role as example takes priority).
22. **OCEAN format consistency** — canonical format: compact `O:72 C:65 E:41 A:38 N:68` (§5.1 RULE). Pipes and commas are FORBIDDEN inside `<ocean>` tags. Bible format (per-dimension with explanations) is allowed as documentation, not card content.
23. **Anchors format convention** — `<anchors>` XML is canonical across `src/master/` AND `parts/`. Plain `[ANCHORS]` text = drift (KI#58, closed iter 95).
24. **CORE_DIRECTIVES shorthand convention** — `{{CORE_DIRECTIVES — canonical template → Part 7A}}` is accepted as convention (D4, iter 93). Shorthand = navigational reference per "one definition — one place".

### Anchor navigation

25. **All `<section data-section="X">` in `src/master/*.html` MUST have `id="X"`** — the browser's anchor mechanism (`<a href="#X">`) works natively. When adding a new section, ALWAYS add the `id` attribute.

### New bugs and contradictions

26. **On discovering a new bug** — first document it in `STATUS.md` as `KI#<N>`, then fix.
27. **Display artifacts vs file content** — a terminal may eat bracket sequences in *output* (e.g. `[main]` rendering as `ain]`), which can masquerade as file corruption. Before recording such a KI, verify at byte level: `python3 -c "print(open('<file>').read().count('[main]'))"` or `grep -c 'branches: \[main\]' <file>` (anchored, escaped). An empty pickaxe (`git log -S '<suspect string>'`) is a truthful signal — a display is not. Recorded iter-116 after a suspected "workflow corruption" proved to be an output artifact.

---

## 7. Documentation Map

| File | When to Update |
|------|----------------|
| `AGENTS.md` | Short entry point. Update on stack / convention / invariant changes. |
| `AGENT_NAVIGATION.md` | On structural changes (this file). |
| `STATUS.md` | On status change (current iter + KIs + **Next step** — authoritative). |
| `worklog.md` | Every iteration — prepend a new Task ID section. |
| `PLAN.md` | On backlog change (new deferred items, order, scope/acceptance criteria). |
| `DECISIONS.md` | On a new standing decision (append-only — the long-term "why"). |
| `README.md` | On changes to capabilities / commands / structure. |
| `CHANGELOG.md` | On release (MAJOR.MINOR.PATCH). |
| `CONTRIBUTING.md` | On changes to contributor workflow. |
| `docs/architecture.md` | On structural changes. |
| `docs/content_map.md` | On adding/removing sections. |
| `docs/components.md` | On adding new CSS components. |
| `docs/CONTENT_RESTRUCTURE_PLAN.md` | Historical (iter 6): restructure strategy that produced the canon migration (iter 7–18, COMPLETE). Read-only context, referenced by `docs/canon/_README.md`. |
| `docs/terminology_dictionary.md` | On adding new terms. |
| `docs/character_bible.md` | On changes to canonical characters. |
| `docs/canon/_README.md` | On changes to Canon rules. |
| `docs/canon/glossary_registry.md` | On glossary term changes — the v2 canonical term record (48 entries = 45 migration-derived + 3 native, DEC-38; `data/glossary.json` is generated from it, DEC-17/18). |
| `docs/canon/part_NN.md` | On creating/updating the Canonical Guide Spec for a Part. |
| `docs/research/guide_analysis_consolidated.md` | Consolidated guide analysis (iter 73+). 12 sections: contradictions C1–C15, duplicates D1–D20, checklists, prioritized proposals P1/P2/P3. |
| `docs/research/research_plan.md` | Verification and edit plan iter 74+ (Phases 1–5). |
| `docs/research/editorial_research_en.md` | External editorial research intake (iter 118): textual-layer audit (semantic duplication, cognitive density, information timing, rule strength, reading modes) + proposed editorial rule set (§27). Claims verified at intake — KI#68 fixed same iteration. Backlog: PLAN rows ed-policy / ed-matrix / ed-1…ed-8. |
| `docs/research/editorial_matrix.md` | Editorial matrix (ed-matrix Phases A+B — full guide coverage): block-level audit of Parts 0–10 + 4 appendices — 99 canon-declared section IDs, **504 rows** (the iter-126 audit's 500 + 4 post-audit row additions: iter 139/142/147's rows + the iter-159 Appendix B НАБЛЮДЕНИЕ row) with machine-checkable `<data-section>::<NN>` IDs, repeat registry R01–R29 (§24 classes; the R01/R02 families COMPLETE iter 160). Evidence base for ed-1…ed-8 + dupes-1; KI#71/KI#72 recorded from it. The F2 `presentation` column (DEC-24) is seeded per Part/appendix at its build slice (**full-guide coverage: Parts 1–10 + Appendices A/B/C/D, iters 147–161 — no unsliced target remains**). |
| `docs/research/backlog_audit_iter118.md` | Backlog audit (post-iter-118 research session, BASE `bd06f8a1`): evidence-based verdicts for all 16 PLAN entries; re-scope evidence for dupes-1 (§7A.12 half stale — plain-copy block already removed from master); external-review claim check (repo-state consistency CONFIRMED); recommended execution order (ki-67 → ed-6 → ed-matrix Phase A). |
| `docs/research/migration_foundation_iter131.md` | V2 migration foundation (iter 131, BASE `987e4f31`): v1 baseline, information-layer map L1–L11, visual-layer embedded-knowledge analysis (532 embed strings, 63% without canonical textual home; prototype↔embed identity 93%; drift evidence), competing-knowledge clusters, first-bounded-area proposal (glossary). Read for any migration-track work. |
| `docs/research/migration_map_v2.md` | **Living registry (v1 → v2 migration map, iter 131+):** status vocabulary + visual dispositions, 18 VS-element dispositions (Registry A), 7 concept clusters (Registry B), block-level mechanism via `editorial_matrix.md` back-pointers (Registry C), owner decision points. Extended every migration iteration. |
| `docs/research/owner_gates_iter137.md` | Owner-gate recommendation package (iter 137, doc-only): verified evidence + recommended calls for the open map §6 gates (§6.1/§6.2/§6.4/§6.5) + call order — agent-prepared input; every gate stays owner-called (nothing DECIDED). |
| `docs/research/voice_cluster_iter141.md` | Voice influence % cluster owner-gate package (iter 141, doc-only): verified evidence inventory (all live locations of the §3.2 values/prose) + recommended calls V-a…V-e + build-slice sketch (`audit_voice_parity.py` checklist) — agent-prepared input; the disposition stays owner-called (map §6 row 6; nothing DECIDED). |
| `docs/research/presentation_intake_iter143.md` | Presentation-layer external analysis intake (iter 143, doc-only): two chat-delivered analyses (A: migration-vs-presentation phasing; B: 16-point overload/presentation diagnosis) verified against the repo — §2 count table (partial English-labelled export discrepancies), §3 claim verdicts, §4 guardrail conflicts, §5 durable findings F1–F6 → v2 architecture phase input. Nothing DECIDED. |
| `docs/research/owner_gates_iter144.md` | Owner-gate recommendation package (iter 144, doc-only): verified evidence + recommended calls for the two remaining owner gates — G1 KI#72 sampling values (12-row live-location inventory; S-a…S-d, §7A.6 canonical recommended; Options B/C rejected) + G2 v2 architecture phase opening (P-a/P-b/P-c first-slice options, P-a consolidated spec recommended; order G1 → sampling slice → phase) — agent-prepared input; both gates stay owner-called (nothing DECIDED). **Both calls ANSWERED 2026-09-15 → DEC-22 (sampling, executed iter 145) + DEC-23 (phase opened, P-a executed iter 146).** |
| `docs/research/owner_gates_iter165.md` | **Switch-time owner-call package (iter 165; CALLED 2026-09-18 + EXECUTED iters 166–170 — DEC-25):** G1 A1 · G2 approve-as-printed · G3 B (+ the Omnis align) · G4 (a)/(a) → the switch — the per-slice records in map §5.26; the body kept as the decision's provenance. |
| `docs/research/v2_architecture.md` | **The consolidated v2 architecture specification (iter 146, P-a per DEC-23) — RATIFIED by DEC-24 (iter 147).** Layer model L1–L11 (post-extraction) · reader-mode spec (F1: Learn/Build/Debug/Reference — entries, visibility, disclosure; overlays, not four sites) · presentation policy (F2 dispositions · F3 checklist triage · F4 example tiering · F5 Part micro-template · F6 `<details class="interactive">`) · rule-strength (DEC-20 + iter-145 OBSERVATION) · 7/7 cluster+gate inventory · v2 build plan (per-Part slices in guide order) · audit & switch plan. The v2 build phase — **slicing COMPLETE** (the Part-slice stage: Parts 1–10 executed iters 147–157, maps §5.8–§5.18, + the owner-called KI#84 canonical-audit reconciliation iter 157; **the appendix-slice stage: Appendices A + the KI#70 WIRE iter 158 (map §5.19), B iter 159 (map §5.20), C iter 160 (map §5.21 — the R01/R02 glossary compressions executed), D iter 161 (map §5.22 — canon-only, byte-stable) — the F2 column covers the full guide; the appendices A/B/C render at runtime since iter 158, 96 sections; Appendix D stays canon-only/non-rendering by design**); **the migration tail: parity audit COMPLETE (iter 162 — map §5.23: the 7 cluster gates + sync + drift + the full battery re-verified green on the completed corpus as one pass — zero content edits, zero new clusters, the corpus snapshot recorded) → canonical audit COMPLETE (iter 163 — map §5.24: the content-map ↔ canon ↔ glossary-registry ↔ master cross-pass — every concept single-homed, the KI#82-style Notes checks repo-wide, the 12 observation packages dispositioned) → reader-path audit COMPLETE (iter 164 — map §5.25: per-mode entry→completion verified — the iter-139 Debug precedent re-run green + the committed stage tool `scripts/readerpath_audit_iter164.py` for Learn/Build/Reference; 2 structural gaps recorded with owner-gates: LEARN-1 the Part 0 entry, REFERENCE-1 the no-JS glossary navigability — **both resolved iter 169**) → **the switch EXECUTED iters 166–170 (DEC-25): the G1–G4 called reconciliations as bounded slices + the Q8 one-pass battery green + the Q9 v1 freeze — v2 is the live site (98 sections, hash `c1518874`; map §5.26)**.** |

---

## 8. Cross-Reference Pairs

> Per IMP-48: when section A references section B, B MUST reference back to A. One canonical definition per concept — everywhere else = 1-sentence link. Registry of section-inventory pairs: `docs/content_map.md`.
> **Superseded for the re-cut chapters (v4, ACTIVE since iter 182):** a chapter prints the facts it uses, so it links to no other chapter's definition; only a different level (appendix / reference) may be linked. The pairs below are the pre-v4 registry; ✅ rows still describe the untouched Parts, ❌ rows are retired by the v4 slices.

### Known Cross-Reference Pairs

| # | Source | Target | Status |
|---|--------|--------|--------|
| 1 | `p1_top3_problems` | `p9_basic_checklist` | ❌ id absorbed → legacy redirect `p9_basic_checklist`; the three errors are rows 1–3 of «Пять самых частых ошибок» (iter 190) |
| 2 | `p7a_system_prompt` | `p7a_core_directives` | ✅ sub-section |
| 3 | `p7a_system_prompt` | `p7a_tone_frame` | ✅ sub-section |
| 4 | `p7b_lorebook_basics` | `p7b_lorebook_mechanics` | ❌ retired — v4 chapter 6 states both jobs in place (iter 188) |
| 5 | `p7a_authors_note` | `p7b_lorebook_mechanics` | ❌ retired — v4 chapter 6 (iter 188) |
| 6 | `p7b_lorebook_advanced` | `p7a_authors_note` | ❌ id absorbed → legacy redirect `p7b_lorebook_mechanics` (iter 188) |
| 7 | `p7b_structured_inject` | — | ❌ id absorbed → legacy redirect `p7a_authors_note` (iter 188) |
| 8 | `p4_spine_overview` | `p7a_xml_tags` | ✅ downstream |
| 9 | `p10_omnis` | `p4_ghost` | ✅ back-link (TP-15) |
| 10 | `p9_additional_problems` | `p1_top3_problems` | ❌ both ids absorbed — legacy redirect to `p9_basic_checklist` (iter 190) |
| 11 | `p10_elena` | `p2_anchor_rules` | ✅ back-link |
| 12 | `p1_card_overview` | `p7a_token_budget` | ✅ forward ref |
| 13 | `p1_card_overview` | `p7a_assembly_pipeline` | ✅ forward ref |
| 14 | `p1_value_proposition` | — | ✅ standalone |

---

## 9. Useful Links

| Resource | URL |
|----------|-----|
| Live guide | https://vudirvp-sketch.github.io/live-char-guide/ |
| Repository | https://github.com/vudirvp-sketch/live-char-guide |
| Issues | https://github.com/vudirvp-sketch/live-char-guide/issues |
| Navigation pattern source | https://github.com/vudirvp-sketch/poe2-regex-ru |

---

## 10. Information Ownership (anti-drift map)

One fact — one owner. Everyone else links; a copy is a link or a one-line summary, never a second full statement.

| Information | Single owner | Everyone else |
|---|---|---|
| Current iteration, KIs, **authoritative Next step** | `STATUS.md` | link; re-pin Next step every iteration |
| Backlog: what is pending, order, scope/acceptance criteria | `PLAN.md` | link |
| Agent operating law: authority order, preflight, fences, scope, DoD | `AGENTS.md` | `STATUS.md` carries one-liners only |
| Directory map, build pipeline, section/widget model | this file | link |
| Standing decisions — the long-term "why" | `DECISIONS.md` | link; worklog records what, not why |
| Iteration history (what happened) | `worklog.md` + `CHANGELOG.md` + git | link |
| Content semantics per Part | `docs/canon/part_NN.md` | master HTML derives; never restate |
| Section inventory / concept ownership | `docs/content_map.md` | link |
| CSS component registry | `docs/components.md` | link |
| Guide version (4-place sync) | `package.json` + `src/VERSION` + `data/character_schema.json` + build manifest | `pnpm run version:check` |
| Character canon (bible cards) | `docs/character_bible.md` + per-character bibles | link |
| Research/audit analyses | `docs/research/` | link |

Update rule: if a fact must appear in two documents, the second occurrence is a link.
If ownership of a fact changes, update this table in the same iteration.

---

## 11. Authoritative vs Historical (read before trusting a number)

Two kinds of documents live here, and mixing them up is how a guide starts lying about itself.

**Authoritative — act on them.** True as of HEAD; a change here is a change to the thing.
- `STATUS.md` (state, KIs, Next step) · `PLAN.md` (backlog) · `AGENTS.md` (operating law) · this file · `DECISIONS.md` (standing decisions)
- `docs/canon/part_NN.md` — content source of truth · `docs/canon/glossary_registry.md` — the term record · `src/master/*.html` — derived HTML
- `data/*.json` machine layers (`glossary.json` and `enneagram.json` are GENERATED — never hand-edit) · `parts/manifest.json` (built)
- `docs/content_map.md`, `docs/components.md`, `docs/architecture.md` — maps of the current system

**Historical — records, never facts to restore.** True at their commit; numbers frozen by definition.
- `docs/RESTRUCTURE_V3_PLAN.md`, `docs/RESTRUCTURE_V4_PLAN.md` — closed tracks · `docs/CONTENT_RESTRUCTURE_PLAN.md` (iter 6)
- `docs/research/**` — evidence at its date: `migration_map_v2.md` (§5.1 dispositions are RATIFIED, DEC-17/18; it extends only by an owner act — DEC-38), `editorial_matrix.md`, the owner-gate packages, the intakes
- `docs/I18N_PLAN.md`, `docs/PROMOTION_PLAN.md`, `docs/PROMOTION_SEO.md`, `docs/promotion/**` — proposals measured against an older corpus
- `worklog.md`, `CHANGELOG.md` (history by definition) · per-character bibles (narrative canon, dated)

**The rule.** A count, a § number or a path in a historical document is a **measurement at a commit**, not an instruction. Never align the guide, a gate or a value to it — if the two disagree, `STATUS.md` and the code that generates the value win. Current values are computed, not remembered:

| Value | Read it from |
|---|---|
| Parts / sections | `parts/manifest.json` (and `validate-master` prints both) |
| Legacy redirects | `data/anchor-redirects.json` (`SHELL-REDIRECTS` gate) |
| Glossary terms | `docs/canon/glossary_registry.md` → `data/glossary.json` (`audit_glossary_parity`) |
| Budget values | §7A.12 (`audit_token_budget_parity`); nobody else prints totals |
| OCEAN thresholds/ceilings | §5.1 (`audit_ocean_parity`) |
| Enneagram values | §5.3 (`audit_enneagram_parity`) |
| Sampling values | Appendix E (`audit_sampling_parity`) |
| Version | `pnpm run version:check` (4 places) |
| Difficulty/reader-path metadata | `python scripts/readerpath_audit_iter164.py` (prints measured counts) |

---

**Hint for the next agent:** run the preflight from `AGENTS.md` — read `STATUS.md` (state + authoritative **Next step**) → the reading gradient for your task type (`AGENTS.md`) → the sections of this file it names. **Principle:** "Better to underdeliver than to break things." One edit = one iteration. Found a bug — record it as `KI#<N>` first; fix immediately only if it is in scope (`AGENTS.md` → Scope discipline).
