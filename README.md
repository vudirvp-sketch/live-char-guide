# Live Character Guide for LLM

[![Build Status](https://github.com/vudirvp-sketch/live-char-guide/workflows/Build%20and%20Commit%20Artifacts/badge.svg)](https://github.com/vudirvp-sketch/live-char-guide/actions/workflows/build-artifact.yml)
[![Deploy Pages](https://github.com/vudirvp-sketch/live-char-guide/workflows/Deploy%20GitHub%20Pages/badge.svg)](https://github.com/vudirvp-sketch/live-char-guide/actions/workflows/deploy-pages.yml)
[![Version](https://img.shields.io/badge/version-5.3.2-blue.svg)](https://github.com/vudirvp-sketch/live-char-guide/blob/main/src/VERSION)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Engineering pipeline for RP character cards: Spine to deploy. For 12B–32B+ models.

## Quick Start for Users

1. Download [`live-char-guide-zero-install.html`](./live-char-guide-zero-install.html)
2. Open in any modern browser (Chrome, Firefox, Safari, Edge)
3. No installation, no server required — works offline via `file://` protocol

## For Contributors

### Prerequisites

- Node.js >= 18
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/vudirvp-sketch/live-char-guide.git
cd live-char-guide

# Install dependencies (including husky for pre-commit hooks)
npm install

# Run initial build
npm run build:all
```

### Editing the Guide

The guide is built from modular HTML parts in `src/parts/`:

```
src/parts/
├── 00_meta.html       # Meta tags, title
├── 01_header.html     # Navigation header
├── 02_quickstart.html # Quick Start section
├── 03_architecture.html
├── 04_core_blocks.html
├── 05_psychology.html
├── 06_technical.html
├── 07_testing.html
├── 08_appendices.html
├── 09_footer.html
└── styles.css         # All CSS (inlined in output)
```

### Build Commands

```bash
# Build index.html only (for web server)
npm run build

# Build zero-install.html only (offline version)
npm run build:zero

# Build both artifacts
npm run build:all

# Build and validate in one command
npm run build:check

# Watch mode - rebuild on changes
npm run build:watch

# Validate generated artifacts
npm run validate

# Check version consistency
npm run version:check

# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Format code with prettier
npm run lint:fix

# Check code formatting
npm run lint
```

### Pre-commit Hooks

This project uses Husky to run automated checks before each commit:

- **Build**: Automatically builds both artifacts
- **Validate**: Runs validation gates
- **Format**: Formats staged files with Prettier

To skip pre-commit hooks (not recommended):
```bash
git commit --no-verify
# or
SKIP_ARTIFACT_BUILD=1 git commit -m "message"
```

### Workflow

1. **Edit source files** in `src/parts/`
2. **Test locally**: `npm run build:all && npm run validate`
3. **Commit changes** — pre-commit hooks will build and validate automatically
4. **Push to main** — GitHub Actions will auto-regenerate if needed

### Auto-Regeneration

When you push to `main`, GitHub Actions automatically:
1. Runs `npm run build:all`
2. Validates both artifacts
3. Commits updated files (if changed) with `[skip ci]` to prevent loops
4. Comments on PRs with build summary

## Dual Artifact System

| File | Purpose | Features |
|------|---------|----------|
| `index.html` | Web server deployment | Google Fonts, standard CSP |
| `live-char-guide-zero-install.html` | Offline/Download | System fonts, strict CSP, works via `file://` |

### Key Differences

- **zero-install.html** is fully self-contained:
  - No external fonts (uses system font stack)
  - Works via `file://` protocol
  - Larger file size (~450KB) but complete offline support

- **index.html** is optimized for web servers:
  - Uses Google Fonts
  - Smaller file size (~340KB)
  - Requires web server to avoid CORS issues

## Version Management

The version is defined in a single source:

- `src/VERSION` — Single source of truth
- `package.json` — Should match VERSION
- Artifacts contain version in meta tags

To update version:
1. Edit `src/VERSION`
2. Update `package.json` version field
3. Run `npm run build:all`
4. Commit changes

## Testing

### Unit Tests

Located in `tests/` directory:
- `test-build.mjs` — Build script unit tests
- `test-validate-artifact.mjs` — Validation logic tests
- `test-version-sync.mjs` — Version sync tests

### Integration Tests

Located in `tests/integration/`:
- `test-full-build.mjs` — End-to-end build pipeline tests

### Accessibility Testing

```bash
# Start local server
npm run serve

# In another terminal, run axe accessibility tests
npm run test:a11y
```

## Project Structure

```
live-char-guide/
├── index.html                          # GENERATED, do not edit
├── live-char-guide-zero-install.html   # GENERATED, do not edit
├── src/
│   ├── VERSION                         # Single source of version truth
│   ├── parts/                          # Modular HTML content
│   ├── manifest/
│   │   └── structure.json              # Assembly manifest
│   ├── scripts/
│   │   ├── build.mjs                   # Build index.html
│   │   └── build-zero-install.mjs      # Build zero-install.html
│   └── assets/
│       ├── main.js                     # Client-side JavaScript
│       └── sw.js                       # Service worker
├── scripts/
│   ├── validate-artifact.mjs           # Post-build validation
│   ├── version-sync.mjs                # Version consistency check
│   └── test-interactive.mjs            # Interactive testing
├── tests/
│   ├── test-build.mjs                  # Build unit tests
│   ├── test-validate-artifact.mjs      # Validation unit tests
│   ├── test-version-sync.mjs           # Version sync unit tests
│   ├── integration/
│   │   └── test-full-build.mjs         # Integration tests
│   └── fixtures/                       # Test fixtures
├── .github/
│   ├── workflows/
│   │   ├── build-artifact.yml          # CI/CD automation
│   │   └── deploy-pages.yml            # GitHub Pages deployment
│   ├── ISSUE_TEMPLATE/                 # Issue templates
│   └── dependabot.yml                  # Automated dependency updates
├── .husky/
│   └── pre-commit                      # Pre-commit hooks
├── package.json
├── .gitignore
├── .prettierrc                         # Prettier config
├── .lintstagedrc.json                  # lint-staged config
├── CHANGELOG.md                        # Version history
├── build.sh                            # Unix build wrapper
└── build.bat                           # Windows build wrapper
```

## Troubleshooting

### Artifact not updating?
- Run `npm run build:all` locally
- Check GitHub Actions logs for build job
- Verify `src/VERSION` matches expected version

### Build fails?
- Check Node.js version (requires >= 18)
- Run `npm ci` to ensure clean dependencies
- Check validation errors with `npm run validate`

### Version mismatch detected?
- Run `npm run version:check` for detailed report
- Update `src/VERSION` and `package.json` to match

### Pre-commit hooks failing?
- Check the error output from the hook
- Run `npm run build:check` manually to debug
- Use `git commit --no-verify` to skip hooks (not recommended)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes in `src/parts/`
4. Run tests: `npm test`
5. Commit changes (hooks will auto-build)
6. Push to your fork
7. Open a Pull Request

## License

MIT License — See [LICENSE](./LICENSE) for details.

---

**TITAN FUSE Team** — Building better character cards for LLMs.
