# Live Character Guide Architecture

> Version: 9.2.6 (canonical — `package.json` + `src/VERSION` + `data/character_schema.json`)
> Last Updated: 2026-09-13 (iter 117 — re-verified against the repository: build scripts, hook, workflows, docs tree)
> Status: Unified single-pass guide v9.2.x (no layer system)

---

## How the Repository Works

Live Character Guide v9 follows a **single-stage build pipeline** that transforms master HTML files into a unified reading experience. All content is presented in a single linear pass from Part 1 to Part 10 — there are no layers, tiers, or depth levels.

### High-Level Flow

```
Author edits → Build → GitHub Pages
```

Detailed flow:

```
src/master/part_*.html (author content)
        │
        ▼
┌─────────────────────────────────────┐
│  build-unified.mjs                   │
│  Parse HTML → Extract sections       │
│  → Generate unified HTML files       │
│  → Generate manifest + registry      │
└─────────────────────────────────────┘
        │
        ▼
build/parts/*.html (all sections equally)
build/parts/manifest.json
build/parts/glossary.html
build/parts/footer.html
build/section-registry.json
build/build-manifest.json
        │
        ▼
┌─────────────────────────────────────┐
│  build-shell-unified.mjs             │
│  Copy shell + generated parts +      │
│  data → dist/                        │
└─────────────────────────────────────┘
        │
        ▼
dist/ (deployed to GitHub Pages)
```

---

## Who Owns What

### Directory Ownership Map

| Directory | Owner | Purpose | Editable By |
|-----------|-------|---------|-------------|
| `src/master/` | Author | Master guide HTML files (96 `data-section` sections; see `docs/content_map.md` for the 96/97 canon-vs-master counting) | Authors writing Parts |
| `src/shell/` | Infrastructure | HTML/CSS/JS shell (`index.html`, `styles.css`, `lazy-loader.js`, `event-bus.js`, `widgets/` — 12 widgets) | Infrastructure only |
| `src/assets/` | Infrastructure | Static assets — `favicon.svg`, `preview-card.png`, `vs-styles.css`, `fonts/` | Infrastructure only |
| `src/scripts/` | Infrastructure | `build-shell-unified.mjs` (shell build stage) | Infrastructure only |
| `data/` | Shared | Widget data + glossary (JSON) | Authors (data), Infrastructure (schema) |
| `docs/` | Author | Documentation (not included in build) + `canon/` (source of truth) | Authors |
| `build/` | Generated | Build intermediate output (gitignored, regenerable from source) | Auto-generated only |
| `dist/` | Generated | Deployment output (gitignored) | Auto-generated only |
| `parts/`, `widgets/`, `assets/`, `data/`, `index.html`, `event-bus.js`, `build.hash` (root) | Generated | Root fallbacks — regenerated on every build, committed for GitHub Pages backward-compat | **NEVER hand-edit** |
| `visual-system/` | Infrastructure | Visual-system frozen design artifacts (DEC-19, iter 138: master embed = canonical visual markup; E01/E08/E10/E15 prototype+extract copies removed — REMOVED_WITH_REASON; feeds `qa:contrast` via `tokens.json`) | Infrastructure only |
| `scripts/` | Infrastructure | Build and validation scripts | Infrastructure only |
| `tests/` | Infrastructure | Test suite | Infrastructure only |

### Critical Rules

1. **Authors DO NOT edit `src/shell/`** — Shell is infrastructure. If you need a new CSS class, request it through the component registry process.

2. **Authors DO NOT create new CSS classes** — Use only components from `docs/components.md`. New classes require infrastructure approval.

3. **Authors DO NOT hardcode widget data in JS** — All widget data lives in `data/*.json` files.

4. **Authors DO NOT write content outside `<section data-section>`** — All content in master HTML must be inside a section with `data-section` attribute.

---

## What Happens During Build

### Build Stage: build-unified.mjs

**Input:** All `src/master/part_*.html` files

**Process:**
1. Parse each master Part HTML file
2. Find all `<section>` elements with `data-section` attribute
3. Validate: every `<section>` has `data-section` attribute
4. All sections are processed equally — no filtering by layer, tier, or depth
5. Check for duplicate `data-section` IDs across all Parts

**Output:**
- `build/parts/part_01.html` through `part_10.html` — Unified HTML files (all sections included)
- `build/parts/manifest.json` — Build manifest (version, format, parts with anchors)
- `build/parts/glossary.html` — No-JS glossary
- `build/parts/footer.html` — Footer with version and link
- `build/section-registry.json` — All `data-section` IDs mapped to parts
- `build/build-manifest.json` — Top-level build manifest (version, section count, content hash)

### Shell Stage: build-shell-unified.mjs

**Input:** `src/shell/` + `src/assets/` + `build/parts/` + `data/`

**Process:**
1. Copy shell HTML/CSS/JS
2. Copy generated parts, assets and data files
3. Generate deployment-ready output

**Output:**
- `dist/` directory ready for GitHub Pages deployment
- **Root fallbacks** — `parts/`, `widgets/`, `assets/`, `data/`, `index.html`, `event-bus.js`, `build.hash` copied from `dist/` and committed for GitHub Pages backward-compatibility (regenerated on every build — never hand-edit)

---

## Section Model

### Unified Single-Pass Architecture

v8 presents ALL content in a single linear pass. There are no layers, tiers, or depth levels. Every section is visible to every reader. The guide follows a natural learning gradient:

```
Part 1 (Foundations) → Part 2 (Anchors) → Part 3 (Voice) → Part 4 (SPINE) → Part 5 (Psychology) → Part 6 (CoT) → Part 7 (Technical) → Part 8 (Anti-patterns) → Part 9 (Diagnostics) → Part 10 (Examples)
```

### Section Markup in Master HTML

```html
<section data-section="p2_basic_anchors" id="p2_basic_anchors" data-toc-nav>
  <!-- Content visible to ALL readers -->
</section>
```

**Key attributes:**
- `data-section`: Unique identifier across entire guide (convention: `p{N}_{topic}`)
- `id`: REQUIRED and must equal `data-section` — the browser anchor mechanism (`<a href="#X">`) works off `id`, not `data-section`
- `data-toc-nav`: Optional — marks section for inclusion in Table of Navigation

### Section ID Naming Convention

Pattern: `p{part_number}_{topic}`

Examples:
- `p1_card_overview` — Part 1, card anatomy overview
- `p2_basic_anchors` — Part 2, anchor basics
- `p4_spine_overview` — Part 4, SPINE framework
- `p7a_core_directives` — Part 7A, CORE DIRECTIVES (Part 7 split into 7A/7B in v9.0.0)
- `p8_ap15_ocean_overload` — Part 8, anti-pattern 15

**Rule:** Each `data-section` ID must be unique across the ENTIRE master guide, not just within a Part.

---

## CORE DIRECTIVES Architecture

CORE DIRECTIVES is a unified directive system for the System Prompt, consisting of 7 items:

| # | Directive | Function | Model Note |
|---|-----------|----------|------------|
| 1 | SHOW NEVER TELL | Demonstrate through behavior, don't describe | All models |
| 2 | EMBODIMENT FIRST | State → Body → Sensor → Speech | All models |
| 3 | SPATIAL & ANATOMICAL LOCK | Prevent teleportation/anatomical errors | All models |
| 4 | ENVIRONMENTAL REACTIVITY | Sensory details only through character action | All models |
| 5 | INFLUENCE BOUNDARY | React to observable symptoms only | All models |
| 6 | CONSEQUENCE DRIVEN | WANT→NEED shift as Price accumulates | ≥32B and API; 12B limited effect |
| 7 | PRE-GENERATION FILTER | 4-item self-check before response | ≥32B or API; 12B often ignores |

**Directive Language Rule:** All directives in the CORE_DIRECTIVES block of the System Prompt are written in **English**, per terminology_dictionary.md convention. Guide prose explaining these directives is in **Russian**.

**Bracket Format:** All character card examples use bracket format `[SYSTEM]/[DESCRIPTION]/[EXAMPLES]/[ANCHORS]`. XML tags (`<spine>`, `<ghost_layers>`, etc.) are used INSIDE Description for structural markup, but the outer block delimiters are always brackets.

**Model Capability Notes:** Where a directive or technique has different effectiveness on different model sizes, this is noted inline using `[MODEL_NOTE: text]` format. These are technical constraints, not difficulty ratings — all content is mandatory reading.

**Cross-Reference Rule:** When section A references section B, the reference is a 1-sentence mention with link. Concepts are explained in full only in their canonical location. Backward references (to earlier Parts) are 1 sentence + link. Forward references are replaced with inline 1-sentence definitions.

---

## Widget Architecture

### Markup in HTML, Data in JSON, Behavior in Widgets

12 widgets follow the split model:

1. **SVG/HTML markup** stays in master HTML (`<div data-widget="...">`)
2. **Text data** lives in `data/*.json` files (exception: `persona-voice-hierarchy` embeds canon-constant values — see the widget header)
3. **Behavior** lives in `src/shell/widgets/*.js`; `src/shell/lazy-loader.js` scans the DOM on scroll-into-view and loads the matching widget module dynamically

### Widget Data Files

| File | Purpose |
|------|---------|
| `data/ocean.json` | OCEAN pentagon: 5 trait descriptions, pole guidelines, anchor examples |
| `data/enneagram.json` | Enneagram: 9 types with core fear, desire, lie, flaw, wings, OCEAN correlation |
| `data/mbti.json` | MBTI: 16 types with temperament, hint, cognitive functions |
| `data/glossary.json` | Term definitions with cross-references |
| `data/character_schema.json` | JSON Schema for character cards |
| `data/anchor-redirects.json` | Redirects for renamed/deleted section IDs |
| `data/test_scenarios.json` | Test scenario definitions |

### Widget Lifecycle

Widgets activate when the user scrolls the relevant Part into view — `lazy-loader.js` scans the DOM on `scroll-into-view` and dynamically imports the widget module. All widgets are always visible — no layer gating or conditional activation.

Panels (TOC, Glossary, Notepad) survive navigation — they are outside `#content`.

---

## What NOT to Do

### Prohibited in Master HTML

- `<style>` blocks → all styles in `src/shell/styles.css`
- `<script>` blocks → all scripts in `src/shell/lazy-loader.js`
- `<link>` elements
- `<meta>` elements
- Any content outside a `<section data-section>`
- `data-layer` attributes (removed in v8)
- `data-layer-switch` attributes (removed in v8)
- `class="layer-remark"` (removed in v8)

### Prohibited Actions

- Do not edit `src/shell/` when writing Parts
- Do not create new CSS classes (use component registry only)
- Do not hardcode widget data in JS (use `data/*.json`)
- Do not write content outside `<section data-section>` in master HTML
- Do not duplicate concepts across Parts (one canonical location per concept)
- Do not add layer/tier/depth markers or "basic/advanced" divisions

---

## Version Control

### Canonical Version Locations

Version must be synchronized across ALL 4 locations:

1. `package.json` — `version` field
2. `src/VERSION` — plain text file
3. `data/character_schema.json` — `version` field
4. Build output (`build/build-manifest.json`, `build/parts/manifest.json`)

### Version Format

Semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR:** Architecture changes (v7 → v8 — unified restructuring)
- **MINOR:** New features, new sections
- **PATCH:** Bug fixes, content corrections

### Documentation Version Sync Rule

When content changes are made, the following MUST be updated:

1. **Version bump:** Each affected `docs/*.md` file must have its version incremented
2. **Date update:** The `Last Updated` field in the header must reflect the date of the change
3. **Scope:** This applies to all files listed in `docs/` that have version headers

---

## Build Validation

### Pre-commit Hook

The Husky hook (`.husky/pre-commit`) runs on every commit:

1. `pnpm run lint` — ESLint over `src/`
2. `pnpm run build` — full build (unified + shell + root fallbacks)
3. `pnpm run validate` — build artifact validation

For doc-only commits that touch no `src/` or `data/` files, set `SKIP_ARTIFACT_BUILD=1`
to skip build + validate (lint always runs).

### QA Gates and Audits (not pre-commit — run per task type)

- `pnpm run validate:master` — master HTML invariants (12 checks)
- `pnpm run version:check` — 4-place version sync (MUST pass)
- `pnpm run qa:csp` / `qa:bundle` / `qa:contrast` / `qa:doc-versions` — PASS/FAIL gates
- `pnpm run qa:english` / `qa:syntax` — fixed baselines (18 / 247) that must not increase
- `python3 scripts/audit_canon_master_sync.py` — canon→master sync (MUST pass)
- `python3 scripts/audit_canon_master_drift.py` — informational drift detector
- `python3 scripts/audit_vs_embeds.py` — VS scroll-animation invariant

### CI/CD Pipeline

GitHub Actions workflows (`.github/workflows/`, branch filter `[main]`):

- `build-artifact.yml` — builds artifacts on push/PR touching buildable paths (`src/**`, `assets/**`, `data/**`, `docs/**`, `scripts/**`, `tests/**`, `visual-system/**`, workflows, `package.json`, `pnpm-lock.yaml`, `index.html`, `eslint.config.js`)
- `deploy-pages.yml` — build + deploy to GitHub Pages on push to `main`
- `validate.yml` — validation track on `src/**`, `data/**`, `scripts/**` changes

---

## Directory Structure (current)

```
live-char-guide/
├── .github/
│   └── workflows/        # build-artifact.yml · deploy-pages.yml · validate.yml
├── src/
│   ├── master/           # Author content: part_01..10 (incl. 7A/7B) + 3 appendices
│   ├── shell/            # Infrastructure: index.html, styles.css, lazy-loader.js,
│   │                     #   event-bus.js, widgets/ (12 widgets + js-flag.js)
│   ├── assets/           # favicon.svg, preview-card.png, vs-styles.css, fonts/
│   ├── scripts/          # build-shell-unified.mjs
│   └── VERSION
├── data/                 # Widget data + glossary (JSON, 7 files)
├── docs/                 # Tech docs (architecture, content_map, components,
│   │                     #   terminology, character bibles, CONTENT_RESTRUCTURE_PLAN)
│   │                     #   + canon/ (source of truth) + research/
├── scripts/              # Build + validation + QA scripts
├── tests/                 # Node test runner (test-*.mjs + integration/)
├── visual-system/         # Visual-system frozen design artifacts (DEC-19; tokens.json feeds qa:contrast)
├── build/                 # Generated intermediate output (gitignored)
├── dist/                  # Deployment output (gitignored)
├── parts/  widgets/  assets/  data/  index.html  event-bus.js  build.hash
│                         # Root fallbacks — regenerated, committed, never hand-edit
├── AGENTS.md  AGENT_NAVIGATION.md  STATUS.md  PLAN.md  DECISIONS.md
├── worklog.md  CHANGELOG.md  README.md  CONTRIBUTING.md
└── package.json
```

---

## Version History

Release history has a single owner: [`CHANGELOG.md`](../CHANGELOG.md) (latest iterations in detail, older as one-liners; full history in `git log`). This file does not duplicate it.

> Для детальной migration info по старым версиям — см. git history (`git log -- docs/`).

---

*Live Character Guide v9.2.6 · architecture re-verified against the repository at iter 117 (2026-09-13): build scripts, pre-commit hook, workflows, directory tree.*
