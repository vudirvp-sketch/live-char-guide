# Live Character Guide Architecture

> **Version:** 8.0.0
> **Last Updated:** 2026-05-14
> **Status:** v8.0.0 — Unified single-pass guide (no layer system)

---

## How the Repository Works

Live Character Guide v8 follows a **single-stage build pipeline** that transforms master HTML files into a unified reading experience. All content is presented in a single linear pass from Part 1 to Part 10 — there are no layers, tiers, or depth levels.

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
| `src/master/` | Author | Master guide HTML files (92 sections in v8) | Authors writing Parts |
| `src/shell/` | Infrastructure | HTML/CSS/JS shell (loader, styles, panels) | Infrastructure only |
| `data/` | Shared | Widget data + glossary (JSON) | Authors (data), Infrastructure (schema) |
| `docs/` | Author | Documentation (not included in build) | Authors |
| `build/` | Generated | Build artifacts (gitignored) | Auto-generated only |
| `dist/` | Generated | Deployment output (gitignored) | Auto-generated only |
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

**Input:** `src/shell/` + `build/parts/` + `data/`

**Process:**
1. Copy shell HTML/CSS/JS
2. Copy generated parts and data files
3. Generate deployment-ready output

**Output:** `dist/` directory ready for GitHub Pages deployment

---

## Section Model

### Unified Single-Pass Architecture

v8 presents ALL content in a single linear pass. There are no layers, tiers, or depth levels. Every section is visible to every reader. The guide follows a natural learning gradient:

```
Part 1 (Foundations) → Part 2 (Anchors) → Part 3 (Voice) → Part 4 (SPINE) → Part 5 (Psychology) → Part 6 (CoT) → Part 7 (Technical) → Part 8 (Anti-patterns) → Part 9 (Diagnostics) → Part 10 (Examples)
```

### Section Markup in Master HTML

```html
<section data-section="p2_basic_anchors" data-toc-nav>
  <!-- Content visible to ALL readers -->
</section>
```

**Key attributes:**
- `data-section`: Unique identifier across entire guide (convention: `p{N}_{topic}`)
- `data-toc-nav`: Optional — marks section for inclusion in Table of Navigation

### Section ID Naming Convention

Pattern: `p{part_number}_{topic}`

Examples:
- `p1_card_overview` — Part 1, card anatomy overview
- `p2_basic_anchors` — Part 2, anchor basics
- `p4_spine_overview` — Part 4, SPINE framework
- `p7_core_directives` — Part 7, CORE DIRECTIVES
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

### Markup in HTML, Data in JSON

Widgets use the existing model:

1. **SVG/HTML markup** stays in master HTML
2. **Text data** lives in `data/*.json` files
3. **Behavior** is in `src/shell/lazy-loader.js`

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

Widgets activate when the user scrolls to the relevant Part. All widgets are always visible — no layer gating or conditional activation. The `lazy-loader.js` initializes interactive elements on page load.

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

### Pre-commit Hooks

The following checks run before each commit:

1. `validate_terms.py` — No prohibited translations
2. `check_english.py` — No English leaks (3+ words outside allowed contexts)
3. `check_duplicates.py` — No duplicate concepts across Parts
4. `validate-master.mjs` Check 3 — All anchor links resolve
5. `data-section` validation — All sections have required attributes
6. Master HTML content restriction check — No prohibited elements
7. CSS class check — All classes are from registry
8. Syntax mix check — No Markdown patterns in HTML
9. `validate-migration.mjs` — No `data-layer-switch` or `data-layer` on body (v8 requirement)

### CI/CD Pipeline

GitHub Actions workflow:

1. **On PR:** Validate build, run tests
2. **On merge to main:** Build + deploy to GitHub Pages

---

## Directory Structure (v8)

```
live-char-guide/
├── .github/
│   └── workflows/        # GitHub Actions
├── build/                # Generated artifacts (gitignored)
│   ├── parts/            # Unified HTML output
│   ├── build-manifest.json
│   └── section-registry.json
├── data/                 # Widget data + glossary
│   ├── glossary.json
│   ├── ocean.json
│   ├── enneagram.json
│   ├── mbti.json
│   ├── test_scenarios.json
│   ├── character_schema.json
│   └── anchor-redirects.json
├── docs/                 # Author documentation
│   ├── architecture.md
│   ├── character_bible.md
│   ├── content_map.md
│   ├── cross_reference_sync.md
│   ├── user_journeys.md
│   ├── components.md
│   ├── migration_map.md
│   ├── transition_guide.md
│   └── terminology_dictionary.md
├── scripts/              # Build and validation scripts
│   ├── build-unified.mjs
│   ├── validate-artifact.mjs
│   ├── validate-migration.mjs
│   └── ...
├── src/
│   ├── master/           # Author content
│   │   └── part_*.html
│   ├── shell/            # Infrastructure
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── lazy-loader.js
│   └── VERSION
├── tests/                # Test suite
├── dist/                 # Deployment output (gitignored)
└── package.json
```

---

## v7 → v8 Migration

v8 is a **unified restructuring** of v7, which mechanically merged L1/L2/L3 layers without eliminating their structural remnants.

Key changes:

| Aspect | v7 | v8 |
|--------|----|----|
| Content model | L1/L2/L3 layers with `data-layer` attributes | Unified single-pass, no layers |
| Build system | Layer extraction (`build-layers.mjs`) | Unified processing (`build-unified.mjs`) |
| Section IDs | Layer suffixes (`_l2`, `_l3`) | No layer suffixes |
| Widget activation | Gated by `data-layer` on `<body>` | Always visible |
| SPINE | Split: WANT/NEED/FLAW (base) + LIE/GHOST (L3) | Unified: all 5 elements in causal order (GHOST→LIE→FLAW→NEED→WANT) |
| CORE DIRECTIVES | Split: 1-5 (base) + 6-7 (L3) | Unified: all 7 directives, model notes inline |
| AP-15 | Split into basic + extended | Merged into single `p8_ap15_ocean_overload` |
| Quickstart | Part 1 (quickstart section) | Deleted; full Assembly Pipeline at end of Part 7 |
| Cross-references | Forward refs with links, "What's next?" bridges | Backward refs only (1 sentence + link), Part Resumes |
| "Основы/Дополнительно" tables | 10 tables across Parts 2-8 | Deleted, replaced with intro paragraphs |
| Model capability | Mixed with layer concepts | Inline `[MODEL_NOTE: text]` format |

See `docs/transition_guide.md` for a detailed migration guide for v7 users.

---

*Document prepared for Live Character Guide v8.0.0*
