# Live Character Guide

> **Engineering pipeline for RP character cards: Spine to deploy. For 12B–32B+ models.**

A comprehensive guide for creating character cards and system prompts for LLM roleplay. Instead of static descriptions, it transforms character cards into trigger-action-price systems that produce consistent, observable behavior.

## Quick Links

| Resource | Link |
|----------|------|
| **Online Guide** | [vudirvp-sketch.github.io/live-char-guide](https://vudirvp-sketch.github.io/live-char-guide/) |
| **Changelog** | [CHANGELOG.md](./CHANGELOG.md) |
| **Contributing** | [CONTRIBUTING.md](./CONTRIBUTING.md) |

## Layer System

The guide supports three depth levels with **cumulative visibility**:

| Layer | Name | Time | Description |
|-------|------|------|-------------|
| **Layer 1** | Minimum | ~15 min | Essential concepts, basic templates, minimal depth |
| **Layer 2** | Optimal | ~30 min | Full pipeline, all core elements, recommended baseline |
| **Layer 3** | Pro | ~60 min | Advanced theory, deep techniques, all optional elements |

### Cumulative Visibility Model

- **Layer 3** shows content from Layer 1 + 2 + 3
- **Layer 2** shows content from Layer 1 + 2
- **Layer 1** shows only Layer 1 content

### Direct Linking

Share specific layers via URL parameter:
```
https://vudirvp-sketch.github.io/live-char-guide/?layer=2
```

## Key Concepts

### SPINE Framework

Five core elements that define character psychology:

| Element | Description |
|---------|-------------|
| **WANT** | What the character actively pursues |
| **NEED** | What would actually heal them (often opposite to WANT) |
| **FLAW** | Behavioral blind spot blocking NEED |
| **LIE** | False belief sustaining the FLAW |
| **GHOST** | Past event that formed the FLAW/LIE |

### Core Rules

1. **OCEAN 1-2 Poles:** Use only 1-2 extreme OCEAN poles (<30 or >70) for memorable characters
2. **Price Mandatory:** Every anchor needs immediate physical/verbal manifestation
3. **Voice Isolation:** Voice patterns defined ONLY in Examples, never in Description
4. **GHOST Layering:** SP = never, Spine = definition, Examples = demonstration, LB/AN = triggers/state

## Architecture

### Lazy-Loading Shell (v5.12.0+)

The guide uses a minimal shell architecture for faster initial load:

```
User visits → Layer selector → Load selected layer content on-demand
```

**Benefits:**
- Fast first paint (~50% smaller initial payload)
- User chooses depth before loading content
- Single-page app — no reloads when switching layers
- Browser history works correctly (back/forward)
- Anchor navigation works after content load

### Build Flow

```
src/shell/index.html  →  dist/index.html (shell)
src/parts-l{1,2,3}/   →  dist/parts-l{1,2,3}/ (lazy-loaded content)
src/assets/           →  dist/assets/
src/data/             →  dist/data/
```

## Project Structure

```
live-char-guide/
├── README.md                           # This file
├── CHANGELOG.md                        # Version history
├── CONTRIBUTING.md                     # Contribution guidelines
├── LICENSE                             # MIT License
├── package.json                        # Dependencies & scripts
├── manifest.json                       # PWA manifest
├── robots.txt                          # SEO
├── sitemap.xml                         # SEO
│
├── src/
│   ├── VERSION                         # Source of truth for version
│   │
│   ├── shell/                          # Lazy-loading shell
│   │   ├── index.html                  # Minimal shell with layer selector
│   │   ├── lazy-loader.js              # Dynamic layer loading
│   │   └── styles.css                  # Shell-specific styles
│   │
│   ├── parts-l1/                       # Layer 1 content
│   │   ├── manifest.json               # Layer 1 structure
│   │   ├── 01_intro.html
│   │   ├── 02_quickstart.html
│   │   └── ...
│   │
│   ├── parts-l2/                       # Layer 2 content (recommended)
│   │   ├── manifest.json               # Layer 2 structure
│   │   ├── 01_intro.html
│   │   ├── 02_quickstart.html
│   │   └── ...
│   │
│   ├── parts-l3/                       # Layer 3 content (expert)
│   │   ├── manifest.json               # Layer 3 structure
│   │   ├── 01_intro.html
│   │   ├── 02_quickstart.html
│   │   └── ...
│   │
│   ├── data/
│   │   ├── glossary.json               # Term definitions
│   │   ├── character_schema.json       # JSON schema for cards
│   │   └── test_scenarios.json         # Test scenarios
│   │
│   ├── assets/
│   │   ├── favicon.svg
│   │   └── preview-card.png
│   │
│   ├── scripts/
│   │   ├── build-shell.mjs             # Main build script
│   │   └── build-utils.mjs             # Shared utilities
│   │
│   └── manifest/
│       └── structure.json              # Overall project structure
│
├── scripts/                            # Validation scripts
│   ├── validate-artifact.mjs           # Build validation
│   ├── version-sync.mjs                # Version consistency check
│   ├── check_duplicates.py             # Duplicate content detector
│   ├── validate_terms.py               # Terminology validator
│   ├── validate_downward_links.py      # Link validator
│   └── contrast_checker.mjs            # Accessibility contrast
│
├── tests/                              # Test suites
│   ├── test-build.mjs                  # Build unit tests
│   ├── test-validate-artifact.mjs      # Validation tests
│   ├── test-version-sync.mjs           # Version sync tests
│   └── integration/
│       └── test-full-build.mjs         # Integration tests
│
├── dist/                               # Build output (gitignored)
│   ├── index.html                      # Shell entry point
│   ├── build.hash                      # Build hash
│   ├── parts-l1/                       # Layer 1 HTML
│   ├── parts-l2/                       # Layer 2 HTML
│   ├── parts-l3/                       # Layer 3 HTML
│   ├── assets/
│   │   ├── shell-styles.css
│   │   ├── lazy-loader.js
│   │   └── ...
│   └── data/
│       └── glossary.json
│
├── .github/                            # GitHub Actions
│   └── workflows/
│       ├── build-artifact.yml          # Build & validate
│       ├── deploy-pages.yml            # Deploy to GitHub Pages
│       └── validate.yml                # Validation checks
│
├── .husky/                             # Pre-commit hooks
├── .lighthouserc.json                  # Lighthouse CI
├── .lintstagedrc.json                  # Lint-staged config
├── .prettierrc                         # Prettier config
├── eslint.config.js                    # ESLint config
└── .nvmrc                              # Node version
```

## Build Commands

```bash
# Install dependencies
pnpm install

# Build shell (dist/)
pnpm run build

# Build all (same as build:shell)
pnpm run build:all

# Validate build output
pnpm run validate

# Check version consistency
pnpm run version:check

# Run tests
pnpm test

# Run linting
pnpm run lint

# Local development server
pnpm run dev
```

## Development Workflow

### Prerequisites

- Node.js >= 20 (see `.nvmrc`)
- pnpm 10.x
- Python 3.10+ (for validation scripts)

### Quick Start

```bash
# Clone repository
git clone https://github.com/vudirvp-sketch/live-char-guide.git
cd live-char-guide

# Install dependencies
pnpm install

# Build and serve locally
pnpm run dev
# Opens at http://localhost:3000
```

### Validation Checklist

Before submitting changes, ensure:

1. `pnpm run build:all` succeeds without errors
2. `pnpm run validate` passes
3. `pnpm test` passes (all 62 tests)
4. No duplicate rule definitions outside canonical locations
5. All model-specific content has `data-model` attributes
6. Version numbers are synchronized (`src/VERSION` = `package.json`)

## Deployment

The project uses GitHub Pages with automatic deployment:

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Live at: https://vudirvp-sketch.github.io/live-char-guide/

### CI/CD Pipeline

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `build-artifact.yml` | Push to main, PR | Build, validate, run tests |
| `deploy-pages.yml` | Push to main | Deploy to GitHub Pages |
| `validate.yml` | Push/PR | Run validation scripts |

## Version

**Current version:** 5.12.0 (2026-04-17)

See [CHANGELOG.md](./CHANGELOG.md) for full version history.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

**Author:** TITAN FUSE Team
