# 🧠 Live Character Guide for LLM

Engineering pipeline for RP character cards: Spine to deploy. For 12B–32B+ models.

## Quick Start for Users

1. Download [`live-char-guide-zero-install.html`](./live-char-guide-zero-install.html)
2. Open in any modern browser (Chrome, Firefox, Safari, Edge)
3. No installation, no server required — works offline via `file://` protocol

## For Contributors

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
# Install dependencies
npm install

# Build index.html only (for web server)
npm run build

# Build zero-install.html only (offline version)
npm run build:zero

# Build both artifacts
npm run build:all

# Validate generated artifacts
npm run validate

# Check version consistency
npm run version:check
```

### Workflow

1. **Edit source files** in `src/parts/`
2. **Run build locally**: `npm run build:all`
3. **Commit changes** including updated artifacts:
   ```bash
   git add src/parts/*.html index.html live-char-guide-zero-install.html
   git commit -m "feat: update X section"
   ```
4. **Push to main** — GitHub Actions will auto-regenerate if needed

### Auto-Regeneration

When you push to `main`, GitHub Actions automatically:
1. Runs `npm run build:all`
2. Validates both artifacts
3. Commits updated files (if changed) with `[skip ci]` to prevent loops

## Dual Artifact System

| File | Purpose | Features |
|------|---------|----------|
| `index.html` | Web server deployment | Google Fonts, standard CSP |
| `live-char-guide-zero-install.html` | Offline/Download | System fonts, strict CSP, works via `file://` |

### Key Differences

- **zero-install.html** is fully self-contained:
  - No external fonts (uses system font stack)
  - Works via `file://` protocol
  - Larger file size (~850KB) but complete offline support

- **index.html** is optimized for web servers:
  - Uses Google Fonts
  - Smaller file size (~400KB)
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

## Project Structure

```
live-char-guide/
├── index.html                      # GENERATED, do not edit
├── live-char-guide-zero-install.html # GENERATED, do not edit
├── src/
│   ├── VERSION                     # Single source of version truth
│   ├── parts/                      # Modular HTML content
│   ├── manifest/
│   │   └── structure.json          # Assembly manifest
│   ├── scripts/
│   │   ├── build.mjs               # Build index.html
│   │   └── build-zero-install.mjs  # Build zero-install.html
│   └── assets/
│       ├── main.js                 # Client-side JavaScript
│       └── sw.js                   # Service worker
├── scripts/
│   ├── validate-artifact.mjs       # Post-build validation
│   └── version-sync.mjs            # Version consistency check
├── .github/workflows/
│   └── build-artifact.yml          # CI/CD automation
├── package.json
├── build.sh                        # Unix build wrapper
└── build.bat                       # Windows build wrapper
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

## License

MIT License — See [LICENSE](./LICENSE) for details.

---

**TITAN FUSE Team** — Building better character cards for LLMs.
