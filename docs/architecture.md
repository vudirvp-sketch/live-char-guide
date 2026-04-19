# Live Character Guide Architecture

> **Version:** 6.0
> **Last Updated:** 2026-04-19
> **Status:** Draft for Stage 0a

---

## How the Repository Works

Live Character Guide v6 follows a **two-stage build pipeline** that transforms master HTML files into a layered reading experience.

### High-Level Flow

```
Author edits → Build Stage 1 → Build Stage 2 → GitHub Pages
```

Detailed flow:

```
src/master/part_*.html (author content)
        │
        ▼
┌─────────────────────────────────────┐
│  STAGE 1: build-layers.mjs          │
│  Parse HTML → Extract by data-layer │
│  → Generate per-layer HTML files    │
└─────────────────────────────────────┘
        │
        ▼
build/parts-l1/*.html
build/parts-l2/*.html
build/parts-l3/*.html
build/manifest.json
build/section-registry.json
        │
        ▼
┌─────────────────────────────────────┐
│  STAGE 2: build-shell.mjs           │
│  Copy shell + generated parts +     │
│  data → dist/                       │
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
| `src/master/` | Author | Master guide HTML files with `data-layer` markup | Authors writing Parts |
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

4. **Authors DO NOT write content outside `<section data-layer>`** — All content in master HTML must be inside a section with `data-layer` and `data-section` attributes.

---

## What Happens During Build

### Stage 1: build-layers.mjs

**Input:** All `src/master/part_*.html` files

**Process:**
1. Parse each master Part HTML file
2. Find all `<section>` elements with `data-layer` attribute
3. For nested sections: child inherits `data-layer` from nearest ancestor
4. Validate: no content outside `<section data-layer>` blocks
5. Validate: every `<section data-layer>` has `data-section` attribute

**Assembly per layer:**
- **L1:** Extract `data-layer="l1"` sections only
- **L2:** Extract `data-layer="l1"` + `data-layer="l2"` sections
- **L3:** Extract all sections

**Output:**
- `build/parts-l1/*.html` — Layer 1 HTML files
- `build/parts-l2/*.html` — Layer 2 HTML files
- `build/parts-l3/*.html` — Layer 3 HTML files
- `build/manifest.json` — Top-level manifest
- `build/parts-l{N}/manifest.json` — Per-layer manifest for lazy-loader
- `build/section-registry.json` — All `data-section` IDs for cross-phase validation
- `build/glossary.html` — Per-layer no-JS glossary

### Stage 2: build-shell.mjs

**Input:** `src/shell/` + `build/parts-l*/` + `data/`

**Process:**
1. Copy shell HTML/CSS/JS
2. Copy generated layer parts (path: `build/parts-l{N}/` → `dist/parts-l{N}/`)
3. Copy data JSON files
4. Generate footer for each layer
5. Validate layer names match `build/layer-config.json`

**Output:** `dist/` directory ready for GitHub Pages deployment

---

## Layer Model

### Cumulative Layer Architecture

```
L1 ⊂ L2 ⊂ L3
```

- **L1 (Минимальный/Basic):** ~15 min read, 400-800 tokens/card
- **L2 (Глубокий/Deep):** ~30 min read, 800-1500 tokens/card (includes all L1 content)
- **L3 (Экспертный/Expert):** ~60 min read, 1500+ tokens/card (includes all L1 + L2 content)

### Layer Markup in Master HTML

```html
<section data-layer="l1" data-section="p2_basic_anchors">
  <!-- Content visible in ALL layers -->
</section>

<section data-layer="l2" data-section="p2_embodiment">
  <!-- Content added starting from L2 -->
</section>

<section data-layer="l3" data-section="p2_cot_anchors">
  <!-- Content added starting from L3 -->
</section>
```

**Key attributes:**
- `data-layer`: Which layer(s) this section belongs to (`l1`, `l2`, or `l3`)
- `data-section`: Unique identifier across entire guide (convention: `p{N}_{topic}`)

### Section ID Naming Convention

Pattern: `p{part_number}_{topic}`

Examples:
- `p1_basic_blocks` — Part 1, basic blocks overview
- `p2_basic_anchors` — Part 2, anchor basics
- `p2_embodiment` — Part 2, embodiment protocol
- `p4_spine_overview` — Part 4, SPINE framework
- `p5_ocean_basics` — Part 5, OCEAN tool

**Rule:** Each `data-section` ID must be unique across the ENTIRE master guide, not just within a Part.

---

## Link Direction (DAG Model)

Links flow **unidirectionally from complex to simple**:

```
Part 4 (SPINE) ──can reference──▶ Part 2 (Anchors)
Part 2 (Anchors) ──cannot reference──▶ Part 4 (SPINE)
```

This is a **Directed Acyclic Graph (DAG)**, not a web of cross-references.

**Why:** Prevents duplication. Each concept is written once. Other Parts reference it; they do not re-explain it.

---

## Cross-Layer Navigation

### data-layer-switch Attribute

Used for explicit invitations to go deeper:

```html
<a data-layer-switch="2#p4_spine_overview" class="layer-remark">
  Подробнее о SPINE → Слой 2
</a>
```

**Format:** `data-layer-switch="{layer}#{section-id}"`

**Runtime behavior:**
- Clicking switches to the specified layer
- Scrolls to the specified section

**Build-time processing:**
- If target layer > current → render as layer-switch button
- If target layer ≤ current → convert to regular anchor link
- If target section doesn't exist → build error

### Regular Anchor Links

Regular `<a href="#section-id">` links:

- If target exists in current layer → anchor link
- If target doesn't exist → greyed-out text with tooltip "Available on Layer N"

---

## Widget Architecture

### Markup in HTML, Data in JSON

Widgets use the existing v5.12 model:

1. **SVG/HTML markup** stays in master HTML
2. **Text data** lives in `data/*.json` files
3. **Behavior** is in `src/shell/lazy-loader.js`

### Widget Data Files

| File | Purpose |
|------|---------|
| `data/ocean.json` | OCEAN pentagon: 5 trait descriptions, pole guidelines, anchor examples |
| `data/enneagram.json` | Enneagram: 9 types with core fear, desire, lie, flaw, wings, OCEAN correlation |
| `data/mbti.json` | MBTI: 16 types with temperament, hint, cognitive functions |
| `data/glossary.json` | Term definitions with layer-specific context |

### Widget Lifecycle

On layer switch, `lazy-loader.js`:
1. Clears `#content.innerHTML`
2. Fetches new parts
3. Inserts into DOM
4. Calls `initInteractiveElements()` (full reinitialization)

Panels (TOC, Glossary, Notepad) survive — they are outside `#content`.

---

## What NOT to Do

### Prohibited in Master HTML

- `<style>` blocks → all styles in `src/shell/styles.css`
- `<script>` blocks → all scripts in `src/shell/lazy-loader.js`
- `<link>` elements
- `<meta>` elements
- Any content outside a `<section data-layer>`

### Prohibited Actions

- Do not edit `src/shell/` when writing Parts
- Do not create new CSS classes (use component registry only)
- Do not hardcode widget data in JS (use `data/*.json`)
- Do not write content outside `<section data-layer>` in master HTML
- Do not make backward links (from simple to complex Parts)
- Do not duplicate concepts across Parts

---

## Version Control

### Canonical Version Locations

Version must be synchronized across ALL 4 locations:

1. `package.json` — `version` field
2. `src/VERSION` — plain text file
3. `data/character_schema.json` — `version` field
4. `src/shell/lazy-loader.js` — header comment

### Version Format

Semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR:** Architecture changes (v5 → v6)
- **MINOR:** New features, new Parts
- **PATCH:** Bug fixes, content corrections

---

## Build Validation

### Pre-commit Hooks

The following checks run before each commit:

1. `validate_terms.py` — No prohibited translations
2. `check_english.py` — No English leaks (3+ words outside allowed contexts)
3. `check_duplicates.py` — No duplicate concepts across Parts
4. `validate_anchors.py` — All anchor links resolve
5. `data-layer`/`data-section` validation — All sections have required attributes
6. Master HTML content restriction check — No prohibited elements
7. CSS class check — All classes are from registry
8. Syntax mix check — No Markdown patterns in HTML

### CI/CD Pipeline

GitHub Actions workflow:

1. **On PR:** Validate build, run tests
2. **On merge to main:** Build + deploy to GitHub Pages

---

## Directory Structure (v6)

```
live-char-guide/
├── .github/
│   └── workflows/        # GitHub Actions
├── build/                # Generated artifacts (gitignored)
│   ├── parts-l1/
│   ├── parts-l2/
│   ├── parts-l3/
│   ├── manifest.json
│   ├── section-registry.json
│   └── layer-config.json
├── data/                 # Widget data + glossary
│   ├── glossary.json
│   ├── ocean.json
│   ├── enneagram.json
│   ├── mbti.json
│   ├── test_scenarios.json
│   └── character_schema.json
├── docs/                 # Author documentation
│   ├── architecture.md
│   ├── character_bible.md
│   ├── content_map.md
│   ├── user_journeys.md
│   ├── components.md
│   ├── shell-components.md
│   └── terminology_dictionary.md
├── scripts/              # Build and validation scripts
│   ├── build-layers.mjs
│   ├── build-shell.mjs
│   └── ...
├── src/
│   ├── master/           # Author content (NEW in v6)
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

## Migration from v5.12

v6 is a **rebuild with reference to v5.12**, not an in-place evolution.

Key differences:

| Aspect | v5.12 | v6 |
|--------|-------|-----|
| Content source | `src/parts-l{N}/` | `src/master/part_*.html` |
| Layer assembly | Manual | Automated (`build-layers.mjs`) |
| Widget data | Hardcoded in JS | `data/*.json` files |
| Cross-layer links | Layer only (`data-layer-switch="2"`) | Layer + section (`data-layer-switch="2#id"`) |
| Layer names | Inconsistent | Canonical from `layer-config.json` |

### Zero Degradation Principle

v6 must cover 100% of v5.12 semantic and functional content. The migration map (`docs/migration_map.md`) tracks where each v5.12 section migrated.

---

*Document prepared for Live Character Guide v6 rebuild project*
