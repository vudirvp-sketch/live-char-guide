# Agent Navigation — Live Character Guide

> **Current-state map.** Describes what IS, not what happened — no history, no narrative
> (history lives in `worklog.md`, `DECISIONS.md`, `CHANGELOG.md`, git). Update the affected
> section in the same iteration any structure changes.
> Read after [`AGENTS.md`](./AGENTS.md) (the operating law). Current state: [`STATUS.md`](./STATUS.md).
> **Canonical version:** `9.2.6`. Engineering pipeline for RP character cards (SPINE → deploy, 12B–32B+ models).
> Single linear guide: Part 0 → Part 10 + 4 appendices · 97 sections · 12 widgets · canon→master sync green.

---

## 1. Where Things Are

| Directory | Purpose | Rules |
|-----------|---------|-------|
| `src/master/` | Author content — 10 Parts (`part_01..10.html`) + 3 appendices (`mbti`, `model_table`, `glossary`). 97 sections, ~6 600 lines of HTML. | **Authors edit here.** All content inside `<section data-section>`. FORBIDDEN: `<style>` / `<script>` / `<link>` / `<meta>`. |
| `src/shell/` | Infrastructure shell — `index.html` (auto-load), `styles.css`, `lazy-loader.js`, `event-bus.js`, `widgets/` (12 widgets). | **Do NOT touch when writing Parts.** Changes go through an infrastructure request. |
| `src/shell/widgets/` | 12 widgets: `ocean-insight`, `enneagram-builder`, `mbti-composer`, `persona-cross`, `persona-voice-hierarchy`, `persona-synthesis`, `vs-mini-map`, `widget-utils`, `vs-scroll-observer`, `vs-e10-enneagram`, `vs-e13-diagnostic`, `vs-e16-author-note`. (Plus `js-flag.js` infra script, not a widget.) | Markup in HTML, data in `data/*.json` (exception: `persona-voice-hierarchy` uses canon-embedded data — see widget header), behavior in `lazy-loader.js`. |
| `src/assets/` | Static assets — `favicon.svg`, `preview-card.png`, `vs-styles.css`, `fonts/`. | Read by `build-shell-unified.mjs` (`ASSETS_SRC = src/assets/`). |
| `src/scripts/` | Build script `build-shell-unified.mjs` (copies shell + parts + data → `dist/`). | Run via `pnpm run build:shell`. |
| `src/VERSION` | Plain text file with the version. | Synchronized with `package.json` + `data/character_schema.json` + build manifest. |
| `data/` | JSON widget data: `glossary.json`, `ocean.json`, `enneagram.json`, `mbti.json`, `character_schema.json`, `anchor-redirects.json`, `test_scenarios.json`. | Authors own data. Infrastructure owns schemas. **Never hardcode widget data in JS.** **`glossary.json` is GENERATED** from `docs/canon/glossary_registry.md` (`scripts/generate_glossary.mjs`, first stage of `pnpm run build`) — never hand-edit; term changes go through the registry only (DEC-17/18). **`enneagram.json` is GENERATED** from the §5.4 table (`scripts/generate_enneagram.mjs`, second stage of `pnpm run build`) — never hand-edit; canonical value changes go through `docs/canon/part_05.md` §5.4, machine-layer supplement changes through the generator (mig-5). |
| `scripts/` | Build + validation scripts. **package.json-wired:** `build-unified.mjs`, `validate-artifact.mjs`, `validate-master.mjs`, `version-sync.mjs`. **QA scripts:** `csp_check.mjs`, `bundle_check.mjs`, `contrast_checker.mjs`, `check_english.py`, `check_syntax_mix.py`, `check-doc-versions.mjs`, `test-interactive.mjs`. | `pnpm run <script>` for wired. `pnpm run qa:*` for ad-hoc QA. |
| `tests/` | Node test runner: `test-build.mjs`, `test-validate-artifact.mjs`, `test-version-sync.mjs`, `widget-smoke.mjs`, `visual-parity.mjs`, `tests/integration/test-full-build.mjs`. | `pnpm test` runs all. |
| `docs/` | Technical documentation (not in build). | Update on structural changes. See §7. |
| `visual-system/` | Visual system prototype: `PLAN.md`, `DESIGN-TOKENS.css`, `shared/`, `elements/` (E01–E18), `integration/` (component-extracts). | Isolated-first development strategy. |
| `parts/`, `widgets/`, `assets/`, `event-bus.js`, `data/`, `index.html`, `build.hash` | **Root fallbacks** — regenerated on every `pnpm run build` from `dist/`. Committed to git for GitHub Pages backward-compat. | **NEVER edit directly.** All edits go in `src/master/`, `src/shell/`, `src/assets/`, `data/`. |
| `dist/` | Deployment output (gitignored). | Auto-generated → GitHub Pages. |

---

## 2. Build Pipeline

```
docs/canon/glossary_registry.md  (canonical term record — 45 entries, iter 133+)
        ↓
scripts/generate_glossary.mjs   →   data/glossary.json  (generated — NEVER hand-edit)
        ↓
docs/canon/part_05.md §5.4      (canonical Enneagram 9-type table — mig-5, iter 136)
        ↓
scripts/generate_enneagram.mjs  →   data/enneagram.json (generated — NEVER hand-edit;
        ↓                              canonical fields from §5.4; machine-layer
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
The enneagram chain (mig-5, DEC-17 direction precedent): §5.4 table (`docs/canon/part_05.md`) → generated `enneagram.json` → E10 mini-cards + builder/synthesis widgets. Parity gate: `python3 scripts/audit_enneagram_parity.py` MUST PASS.

### Commands

```bash
pnpm install              # Install dependencies (Node >= 20, pnpm 10.x)
pnpm run build            # Full build (glossary + enneagram generation + unified + shell)
pnpm run build:glossary   # Registry → data/glossary.json only
pnpm run build:enneagram  # Canon §5.4 → data/enneagram.json only
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

| Attribute | Required | Format | Example |
|-----------|----------|--------|---------|
| `data-section` | Yes | `p{N}_{topic}` | `data-section="p4_spine_overview"` |
| `id` | Yes (must equal `data-section`) | `p{N}_{topic}` | `id="p4_spine_overview"` |
| `data-toc-nav` | No | boolean | `data-toc-nav` |

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

12 widgets. Markup lives in `src/master/*.html` (via `<div data-widget="...">`), data in `data/*.json`, behavior in `src/shell/widgets/*.js`. JS only reads data, never hardcodes it. Exception: `persona-voice-hierarchy` embeds canon-constant data (6 sources × 3 models from §3.2 table) directly in JS — these are canonical prose values, not user-editable widget data.

### Widget Data Files

| Widget | Data File |
|--------|-----------|
| `ocean-insight` | `data/ocean.json` |
| `enneagram-builder` / `vs-e10-enneagram` | `data/enneagram.json` (**generated** from the §5.4 table — mig-5; LIE lives once in `types[].lie_template`) |
| `mbti-composer` | `data/mbti.json` |
| `persona-cross` / `persona-synthesis` | `data/character_schema.json` |
| `persona-voice-hierarchy` | _(none — canon-embedded; values from §3.2 table)_ |
| Glossary | `data/glossary.json` (**generated** from `docs/canon/glossary_registry.md` — DEC-17/18) |
| Anchor redirects | `data/anchor-redirects.json` |
| Test scenarios | `data/test_scenarios.json` |

### Widget Lifecycle

1. `lazy-loader.js` scans the DOM on `scroll-into-view`.
2. Loads the corresponding `src/shell/widgets/<widget>.js` dynamically.
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

1. **`<style>` / `<script>` forbidden in master files** — all styles in `src/shell/styles.css` or `src/assets/vs-styles.css`, scripts in `src/shell/lazy-loader.js` or `src/shell/widgets/*.js`. Inline styles forbidden. Inline scripts forbidden (CSP compliance).
2. **Content outside `<section data-section>`** — all content in master HTML MUST be inside a section with the `data-section` attribute.
3. **Heading hierarchy** — one `<h1>` per page, `<h2>` for sections, `<h3>` for subsections. Do not skip levels.
4. **English terms in Russian prose (two-layer policy, DEC-16)** — 3+ English words outside allowed contexts trigger `check_english.py`. Baseline: 18 English leaks by design (was 19 before iter-123 russification) — all executable prompt content (Tone Frame strings, SP directives, Part 10 card examples, Quality Grade, Token Budget Check). Guide prose, labels, and headings are Russian; ordinary English terminology is translated (`token → токен`, `lie → ложь`). English stays only in executable prompt containers (prescribed English), technical identifiers, and proper names. SP Language rule is layered (12B <64K → English; ≥128K 12B–14B → either; 32B+/API → card language) — see §7A.2 RULE.
5. **CSS class creation without approval** — authors use ONLY components from `docs/components.md`. New classes require infrastructure approval.
6. **Hardcoded widget data in JS** — all data lives in `data/*.json`. JS only reads.

### Build and deploy

7. **Root fallbacks vs canonical sources** — top-level `widgets/`, `assets/`, `parts/`, `event-bus.js`, `data/`, `index.html`, `build.hash` are **regenerated root fallbacks**, NOT duplicates. All edits go in canonical sources (`src/master/`, `src/shell/`, `src/assets/`, `data/`).
8. **Versions in 4 places** — `package.json`, `src/VERSION`, `data/character_schema.json`, build manifest. `pnpm run version:check` verifies sync. **On version bump** — update ALL 4 places simultaneously (`src/VERSION` manually + `package.json` + `character_schema.json` manually; `parts/manifest.json` regenerates on build). KI#63 (iter 96): drift occurred when `src/VERSION` was updated without `package.json` / `character_schema.json`. KI#64 (iter 101, CLOSED iter-107): same drift pattern — `mermaid-init.js` JSDoc bumped to `9.3.0` alone; fixed via Variant A rollback (JSDoc → 9.2.6, no 4-place bump). **iter-113:** `mermaid-init.js` deleted entirely (Mermaid CDN dependency removed — content diagrams were replaced by VS-EMBEDs in iter 14, only infrastructure remained). The 5th version-tracking point (`mermaid-init.js` JSDoc) is gone; sync is back to canonical 4 places.
9. **Mermaid CDN dependency — REMOVED iter-113.** Mermaid.js was loaded from `cdn.jsdelivr.net` but had ZERO usages in `src/master/*.html` (content diagrams were replaced by VS-EMBEDs in iter 14). Removed in iter-113: CDN `<script>` tag, `widgets/mermaid-init.js`, lazy-loader init/render block + `reRenderMermaid()` call, `.mermaid` CSS in `src/shell/styles.css`. CSP tightened: `cdn.jsdelivr.net` dropped from `script-src`, `worker-src 'self' blob:;` directive dropped entirely (was Mermaid v11 Web Worker only). `cdn.jsdelivr.net` retained in `style-src` + `font-src` for Geist font CSS.
10. **`noscript` in build artifact** — must be present. Do not remove.
11. **Widget guards** — `persona-cross infinite loop guard`, `Clipboard API guard` (`if (navigator.clipbox)`) — do not remove. (iter-112: `blueprint-viewer destroy()` removed — widget was dead, 0 container usages.)

### Visual System

12. **`viz > dry text` principle** — visualization = **replacement**, not **addition**. If a VS-EMBED shows a concept, text MUST NOT re-explain it. Unique visualizations are not deleted even when duplicated.
13. **VS scroll-animation invariant** — all animation classes in `src/assets/vs-styles.css` MUST be covered either by `SCROLL_ENTER_SELECTOR` in `vs-scroll-observer.js` (11 classes) or by the `scroll-enter` class. Audit: `python3 scripts/audit_vs_embeds.py`.
14. **CSS scoping invariant** — VS-EMBED element CSS selectors MUST be scoped to an element-specific parent (`.blueprint-area`, `.funnel-stack`, `.spine-flow`, etc.).
15. **VS elements registry** — 18 VS elements: E01–E18. Styles in `src/assets/vs-styles.css` SECTION 5.

### Canon sync and drift detection

16. **Canon → master HTML sync** — `docs/canon/*.md` = source of truth. `src/master/*.html` = production HTML. Regression test: `python3 scripts/audit_canon_master_sync.py` (97/97 PASS).
17. **Drift detector** — `python3 scripts/audit_canon_master_drift.py` — informational, exit 0. ~88 paragraph drifts expected (VS-EMBEDs replace text).
18. **Callout class policy** — allowed: `.callout.rule` / `.rec` / `.ex` and plain `.callout`. FORBIDDEN: `.callout.note` / `.info` / `.warn` / `.tip` / `.box` / `.sidebar` / `.custom` / `.important`.
19. **Callout labels in Russian (DEC-16)** — labels `ПРАВИЛО`, `РЕКОМЕНДАЦИЯ`, `ПРИМЕР`, `ИЛЛЮСТРАЦИЯ`, `ШАБЛОН`, `Переход`, `Синтез`, `Ссылка`, `Демонстрирует` are Russian guide prose (former English semantic-anchor labels were retired iter 123). Callout bodies are Russian. `Примечание` is a Russian local clarification. English callout-label text is allowed ONLY inside copy-paste prompt containers where the guide prescribes English. Chip labels rendered by `example-label` components (`ИЛЛЮСТРАЦИЯ`, `ШАБЛОН`) follow the same rule.
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
| `docs/canon/glossary_registry.md` | On glossary term changes — the v2 canonical term record (45 entries; `data/glossary.json` is generated from it, DEC-17/18). |
| `docs/canon/part_NN.md` | On creating/updating the Canonical Guide Spec for a Part. |
| `docs/research/guide_analysis_consolidated.md` | Consolidated guide analysis (iter 73+). 12 sections: contradictions C1–C15, duplicates D1–D20, checklists, prioritized proposals P1/P2/P3. |
| `docs/research/research_plan.md` | Verification and edit plan iter 74+ (Phases 1–5). |
| `docs/research/editorial_research_en.md` | External editorial research intake (iter 118): textual-layer audit (semantic duplication, cognitive density, information timing, rule strength, reading modes) + proposed editorial rule set (§27). Claims verified at intake — KI#68 fixed same iteration. Backlog: PLAN rows ed-policy / ed-matrix / ed-1…ed-8. |
| `docs/research/editorial_matrix.md` | Editorial matrix (iter 120, ed-matrix Phase A): block-level audit of Parts 1/3/7A/9 — 38 sections, 210 rows with machine-checkable `<data-section>::<NN>` IDs, repeat registry R01–R20 (§24 classes), 13 automatic compression candidates. Evidence base for ed-1…ed-8 + dupes-1; KI#71/KI#72 recorded from it. Phase B (remaining parts + appendices) = PLAN row `ed-matrix`. |
| `docs/research/backlog_audit_iter118.md` | Backlog audit (post-iter-118 research session, BASE `bd06f8a1`): evidence-based verdicts for all 16 PLAN entries; re-scope evidence for dupes-1 (§7A.12 half stale — plain-copy block already removed from master); external-review claim check (repo-state consistency CONFIRMED); recommended execution order (ki-67 → ed-6 → ed-matrix Phase A). |
| `docs/research/migration_foundation_iter131.md` | V2 migration foundation (iter 131, BASE `987e4f31`): v1 baseline, information-layer map L1–L11, visual-layer embedded-knowledge analysis (532 embed strings, 63% without canonical textual home; prototype↔embed identity 93%; drift evidence), competing-knowledge clusters, first-bounded-area proposal (glossary). Read for any migration-track work. |
| `docs/research/migration_map_v2.md` | **Living registry (v1 → v2 migration map, iter 131+):** status vocabulary + visual dispositions, 18 VS-element dispositions (Registry A), 7 concept clusters (Registry B), block-level mechanism via `editorial_matrix.md` back-pointers (Registry C), owner decision points. Extended every migration iteration. |

---

## 8. Cross-Reference Pairs

> Per IMP-48: when section A references section B, B MUST reference back to A. One canonical definition per concept — everywhere else = 1-sentence link. Registry of section-inventory pairs: `docs/content_map.md`.

### Known Cross-Reference Pairs

| # | Source | Target | Status |
|---|--------|--------|--------|
| 1 | `p1_top3_problems` | `p9_basic_checklist` | ✅ back-link |
| 2 | `p7a_system_prompt` | `p7a_core_directives` | ✅ sub-section |
| 3 | `p7a_system_prompt` | `p7a_tone_frame` | ✅ sub-section |
| 4 | `p7b_lorebook_basics` | `p7b_lorebook_mechanics` | ✅ callout link |
| 5 | `p7a_authors_note` | `p7b_lorebook_mechanics` | ✅ upstream |
| 6 | `p7b_lorebook_advanced` | `p7a_authors_note` | ✅ upstream |
| 7 | `p7b_lorebook_advanced` | `p7b_structured_inject` | ✅ forward only |
| 8 | `p4_spine_navigation` | `p7a_xml_tags` | ✅ downstream |
| 9 | `p10_omnis` | `p4_ghost_layers` | ✅ back-link (TP-15) |
| 10 | `p9_additional_problems` | `p1_top3_problems` | ✅ back-link |
| 11 | `p10_elena` | `p2_anchor_examples` | ✅ back-link |
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

**Hint for the next agent:** run the preflight from `AGENTS.md` — read `STATUS.md` (state + authoritative **Next step**) → the reading gradient for your task type (`AGENTS.md`) → the sections of this file it names. **Principle:** "Better to underdeliver than to break things." One edit = one iteration. Found a bug — record it as `KI#<N>` first; fix immediately only if it is in scope (`AGENTS.md` → Scope discipline).
