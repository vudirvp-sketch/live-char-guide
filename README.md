# Live Character Guide

A comprehensive guide for creating character cards and system prompts for LLM roleplay.

## What is this?

Live Character Guide is an engineering pipeline for building deterministic behavioral engines for AI roleplay characters. Instead of static descriptions, it transforms character cards into trigger-action-price systems that produce consistent, observable behavior across 12B-32B+ models.

## Quick Navigation

**Track A (15 min)** - Essentials for beginners — minimal template, basic concepts  
**Track B (30 min)** - Full pipeline for card builders — all core elements  
**Track C (60 min)** - All features for power users — advanced techniques

[→ Open Full Guide](https://vudirvp-sketch.github.io/live-char-guide/) | [→ Download Offline Version](https://vudirvp-sketch.github.io/live-char-guide/live-char-guide-zero-install.html)

## Key Concepts

### SPINE Framework
Five core elements that define character psychology:
- **WANT** — What the character actively pursues
- **NEED** — What would actually heal them (often opposite to WANT)
- **FLAW** — Behavioral blind spot blocking NEED
- **LIE** — False belief sustaining the FLAW
- **GHOST** — Past event that formed the FLAW/LIE

### Core Rules
1. **OCEAN 1-2 Poles:** Use only 1-2 extreme OCEAN poles (<30 or >70) for memorable characters
2. **Price Mandatory:** Every anchor needs immediate physical/verbal manifestation
3. **Voice Isolation:** Voice patterns defined ONLY in Examples, never in Description
4. **GHOST Layering:** SP = never, Spine = definition, Examples = demonstration, LB/AN = triggers/state

## For Contributors

### Source Files
- `src/parts/*.html` — Content sections
- `src/data/glossary.json` — Term definitions
- `src/data/test_scenarios.json` — Test scenarios for validation
- `src/scripts/build.mjs` — Build script for index.html
- `src/scripts/build-zero-install.mjs` — Build script for offline version

### Build Commands
```bash
# Install dependencies
pnpm install

# Build both versions
pnpm run build

# Build index.html only
pnpm run build:index

# Build zero-install version
pnpm run build:zero

# Run validation scripts
python scripts/check_duplicates.py
python scripts/validate_terms.py
```

### Validation
Before submitting changes, ensure:
1. `pnpm run build` succeeds without errors
2. Python validation scripts pass
3. No duplicate rule definitions outside canonical locations
4. All model-specific content has `data-model` attributes

## Project Structure

```
live-char-guide/
├── README.md                    # This file
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT License
├── package.json                 # Dependencies
├── index.html                   # Built online version
├── live-char-guide-zero-install.html  # Built offline version
├── src/
│   ├── parts/                   # Content sections
│   │   ├── 00_meta.html         # Metadata
│   │   ├── 01_header.html       # Header
│   │   ├── 01_core_principles.html  # Canonical rules
│   │   ├── 02_glossary.html     # Term definitions
│   │   ├── 02_quickstart.html   # Quick start guide
│   │   ├── 03_architecture.html # System architecture
│   │   ├── 04_core_blocks.html  # Core blocks
│   │   ├── 05_psychology.html   # Psychology (SPINE, Enneagram, OCEAN)
│   │   ├── 05a_spine_anchors.html  # SPINE-Anchors mapping
│   │   ├── 05b_cot_tiers.html   # CoT tiers
│   │   ├── 06_technical.html    # Technical settings
│   │   ├── 07_testing.html      # Diagnostics
│   │   ├── 08_appendices.html   # Appendices
│   │   ├── 08b_debugging.html   # Debugging decision tree
│   │   ├── 09_conclusion.html   # Conclusion
│   │   ├── 09_footer.html       # Footer
│   │   ├── checkpoints.html     # Checkpoints
│   │   └── styles.css           # Styles
│   ├── data/                    # Data files
│   │   ├── glossary.json        # Glossary data
│   │   └── test_scenarios.json  # Test scenarios
│   ├── scripts/                 # Build scripts
│   │   ├── build.mjs
│   │   ├── build-zero-install.mjs
│   │   └── build-utils.mjs
│   ├── assets/                  # Static assets
│   └── manifest/                # Manifest files
├── scripts/                     # Validation scripts
│   ├── check_duplicates.py      # Check for duplicate rules
│   └── validate_terms.py        # Validate term usage
├── download/                    # Downloadable resources
└── .github/                     # GitHub Actions workflows
```

## Track System

The guide supports three reading tracks:

- **Track A (Quick Start):** ~15 min — Essential concepts for getting started
- **Track B (Full Pipeline):** ~30 min — Complete card building process
- **Track C (Advanced):** ~60 min — All features, including lorebook mechanics and advanced techniques

## Deployment

The project uses GitHub Pages with automatic deployment via GitHub Actions:
1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Live at: https://vudirvp-sketch.github.io/live-char-guide/

## Version

Current version: 6.0.0 (build 2026-04-15)

## License

MIT License — see [LICENSE](LICENSE) for details.
