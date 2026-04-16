# Live Character Guide

> **Engineering pipeline for RP character cards: Spine to deploy. For 12B–32B+ models.**

A comprehensive guide for creating character cards and system prompts for LLM roleplay. Instead of static descriptions, it transforms character cards into trigger-action-price systems that produce consistent, observable behavior.

## Quick Links

| Resource | Link |
|----------|------|
| **Online Guide** | [vudirvp-sketch.github.io/live-char-guide](https://vudirvp-sketch.github.io/live-char-guide/) |
| **Offline Version** | [Download HTML](https://vudirvp-sketch.github.io/live-char-guide/live-char-guide-zero-install.html) |
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

Benefits:
- Fast first paint (~50% smaller initial payload)
- User chooses depth before loading content
- Single-page app — no reloads when switching layers
- Browser history works correctly (back/forward)
- Anchor navigation works after content load

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
│   ├── shell/                          # Lazy-loading shell
│   │   ├── index.html                  # Minimal shell with layer selector
│   │   ├── lazy-loader.js              # Dynamic layer loading
│   │   └── styles.css                  # Shell-specific styles
│   │
│   ├── parts/                          # Content sections (Layer 2 base)
│   │   ├── 00_meta.html
│   │   ├── 01_header.html
│   │   ├── 01_core_principles.html     # Canonical rules
│   │   ├── 02_glossary.html
│   │   ├── 02_quickstart.html
│   │   ├── 03_architecture.html
│   │   ├── 04_core_blocks.html
│   │   ├── 05_psychology.html          # SPINE, Enneagram, OCEAN
│   │   ├── 05a_spine_anchors.html
│   │   ├── 05b_cot_tiers.html
│   │   ├── 06_technical.html
│   │   ├── 06b_antipatterns_advanced.html
│   │   ├── 07_testing.html
│   │   ├── 08_appendices.html
│   │   ├── 08b_debugging.html
│   │   ├── 09_conclusion.html
│   │   ├── 09_footer.html
│   │   ├── checkpoints.html
│   │   └── styles.css
│   │
│   ├── parts-l1/                       # Layer 1 specific content
│   ├── parts-l2/                       # Layer 2 specific content
│   ├── parts-l3/                       # Layer 3 specific content
│   │
│   ├── data/
│   │   ├── glossary.json               # Term definitions
│   │   └── test_scenarios.json         # Test scenarios
│   │
│   └── scripts/
│       ├── build-shell.mjs             # Shell build (default)
│       ├── build-layers.mjs            # Layer content build
│       ├── build-zero-install.mjs      # Offline version
│       ├── build.mjs                   # Inline build (deprecated)
│       └── build-utils.mjs             # Shared utilities
│
├── scripts/                            # Validation scripts
│   ├── validate-artifact.mjs           # Build validation
│   └── version-sync.mjs                # Version consistency check
│
├── tests/                              # Test suites
│   ├── test-build.mjs
│   ├── test-validate-artifact.mjs
│   ├── test-version-sync.mjs
│   └── integration/
│       └── test-full-build.mjs
│
├── dist/                               # Build output (gitignored)
│   ├── index.html                      # Shell entry point
│   ├── parts-l1/                       # Layer 1 HTML
│   ├── parts-l2/                       # Layer 2 HTML
│   ├── parts-l3/                       # Layer 3 HTML
│   └── assets/
│       ├── shell-styles.css
│       └── lazy-loader.js
│
├── .github/                            # GitHub Actions
│   └── workflows/
│       └── ci.yml
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

# Build all (shell + zero-install)
pnpm run build:all

# Build shell version (default)
pnpm run build

# Build offline version
pnpm run build:zero

# Build layer content only
pnpm run build:layers

# Legacy inline build (deprecated)
pnpm run build:inline

# Watch mode for development
pnpm run build:watch

# Validate build output
pnpm run validate

# Check version consistency
pnpm run version:check

# Run tests
pnpm run test

# Run linting
pnpm run lint

# Local development server
pnpm run dev
```

## Development Workflow

### Prerequisites

- Node.js >= 20 (see `.nvmrc`)
- pnpm 10.x

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
3. `pnpm run test` passes
4. No duplicate rule definitions outside canonical locations
5. All model-specific content has `data-model` attributes
6. Version numbers are synchronized

## Deployment

The project uses GitHub Pages with automatic deployment:

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Live at: https://vudirvp-sketch.github.io/live-char-guide/

The deployment uses the `dist/` directory (built via `build:shell`).

## Version

**Current version:** 5.12.0 (2026-04-17)

See [CHANGELOG.md](./CHANGELOG.md) for full version history.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

**Author:** TITAN FUSE Team
