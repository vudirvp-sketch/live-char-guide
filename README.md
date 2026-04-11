# Live Character Guide for LLM

[![Build Status](https://github.com/vudirvp-sketch/live-char-guide/workflows/Build%20and%20Commit%20Artifacts/badge.svg)](https://github.com/vudirvp-sketch/live-char-guide/actions/workflows/build-artifact.yml)
[![Deploy Pages](https://github.com/vudirvp-sketch/live-char-guide/workflows/Deploy%20GitHub%20Pages/badge.svg)](https://github.com/vudirvp-sketch/live-char-guide/actions/workflows/deploy-pages.yml)
[![Version](https://img.shields.io/badge/version-5.3.2-blue.svg)](https://github.com/vudirvp-sketch/live-char-guide/blob/main/src/VERSION)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Engineering pipeline for RP character cards: Spine to deploy. For 12B–32B+ models.

## Quick Start for Users

1. Download [`live-char-guide-zero-install.html`](./live-char-guide-zero-install.html)
2. Open in any modern browser (Chrome, Firefox, Safari, Edge)
3. No installation, no server required — works offline via `file://` protocol

## For Contributors

### Prerequisites

- Node.js >= 20
- pnpm (corepack enable if needed)

### Setup

```bash
# Clone the repository
git clone https://github.com/vudirvp-sketch/live-char-guide.git
cd live-char-guide

# Install dependencies (including husky for pre-commit hooks)
pnpm install

# Run initial build
pnpm run build:all
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
pnpm run build

# Build zero-install.html only (offline version)
pnpm run build:zero

# Build both artifacts
pnpm run build:all

# Build and validate in one command
pnpm run build:check

# Watch mode - rebuild on changes
pnpm run build:watch

# Validate generated artifacts
pnpm run validate

# Check version consistency
pnpm run version:check

# Run all tests
pnpm test

# Run unit tests only
pnpm run test:unit

# Run integration tests only
pnpm run test:integration

# Auto-format all files with Prettier
pnpm run lint:fix

# Lint source files with ESLint
pnpm run lint
```

### Pre-commit Hooks

This project uses Husky and lint-staged for automated pre-commit checks:

- **Lint**: Runs ESLint on source files
- **Build**: Builds both artifacts (index.html + zero-install.html)
- **Validate**: Validates generated artifacts
- **Format**: Auto-formats staged files with Prettier (via lint-staged)

To skip pre-commit hooks entirely (not recommended):
```bash
git commit --no-verify
```

To skip artifact build only (still runs lint and format):
```bash
SKIP_ARTIFACT_BUILD=1 git commit -m "message"
```

### Workflow

1. **Edit source files** in `src/parts/`
2. **Test locally**: `pnpm run build:all && pnpm run validate`
3. **Commit changes** — pre-commit hooks will build and validate automatically
4. **Push to main** — GitHub Actions will auto-regenerate if needed

### Auto-Regeneration

When you push to `main`, GitHub Actions automatically:
1. Runs `pnpm run build:all`
2. Validates both artifacts
3. Deploys to GitHub Pages via separate workflow
4. Comments on PRs with build summary (PRs only)

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
3. Run `pnpm run build:all`
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
pnpm run serve

# In another terminal, run axe accessibility tests
pnpm run test:a11y
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
│       ├── main.js                # Client-side JavaScript
│       ├── sw.js                  # Service worker
│       └── zero-install-addons.js # Zero-install diagnostics & storage indicators
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
- Run `pnpm run build:all` locally
- Check GitHub Actions logs for build job
- Verify `src/VERSION` matches expected version

### Build fails?
- Check Node.js version (requires >= 20)
- Run `pnpm install --frozen-lockfile` to ensure clean dependencies
- Check validation errors with `pnpm run validate`

### Version mismatch detected?
- Run `pnpm run version:check` for detailed report
- Update `src/VERSION` and `package.json` to match

### Pre-commit hooks failing?
- Check the error output from the hook
- Run `pnpm run build:check` manually to debug
- Use `git commit --no-verify` to skip hooks (not recommended)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes in `src/parts/`
4. Run tests: `pnpm test`
5. Commit changes (hooks will auto-build)
6. Push to your fork
7. Open a Pull Request

## License

MIT License — See [LICENSE](./LICENSE) for details.

---

**TITAN FUSE Team** — Building better character cards for LLMs.
