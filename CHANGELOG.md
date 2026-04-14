# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.5.4] - 2026-04-14

### Changed
- Refactored section IDs to semantic naming (antipatterns, xml-tags)
- Integrated debugging decision trees into main guide structure
- Consolidated Price definition to canonical location with cross-references
- Standardized terminology mapping in glossary.json

### Fixed
- Track filtering visibility via `isVisibleInTrack()` utility
- Cross-references from symptom table to decision trees
- All internal anchor links verified and working

### Added
- Cross-references between symptom table and decision trees
- download/README.md with resource documentation
- `data-requires-track` attributes on checkpoint items

### Removed
- Unused CSS variables (track-icon-speed, track-icon-glow)
- Legacy duplicate checks in JS (consolidated to utility)

## [Unreleased]

### Added
- Pre-commit hooks via Husky for automated build validation
- Unit tests for build scripts (`tests/test-build.mjs`)
- Unit tests for artifact validation (`tests/test-validate-artifact.mjs`)
- Unit tests for version sync (`tests/test-version-sync.mjs`)
- Integration tests (`tests/integration/test-full-build.mjs`)
- Comprehensive `.gitignore` for node_modules and IDE files
- Prettier configuration for code formatting
- lint-staged configuration for pre-commit formatting
- Dependabot configuration for automated dependency updates
- GitHub Issue templates
- JSDoc documentation for all build scripts

### Changed
- Enhanced GitHub Actions workflow with PR comments
- Improved error handling in build scripts
- Better validation error messages with context

## [5.4.0] - 2026-04-13

### Added
- Model Filter module (`ModelFilter`) for 12B/32B model-specific content visibility
- `id="system-prompt"` anchor for SVG dependency graph navigation
- Card validation panel with placeholder detection and export blocking
- Reference link to canonical glossary in appendix (deduplication)

### Changed
- Track C now bypasses GHOST consent gate (advanced users workflow)
- Model-specific content visibility now uses `display: revert` to preserve native display types (fixes `<tr>` and `<li>` elements)
- Track-based visibility CSS refactored with explicit positive model
- Test scenario counts clarified as "4 basic + 2 extended"

### Fixed
- FIX-001: Model toggle buttons now have JS handler
- FIX-002: Track B no longer hides `data-requires-track="B C"` elements
- FIX-003: SVG dependency graph "System Prompt" node now navigates correctly
- FIX-004: Track C users get immediate GHOST access without consent prompt
- FIX-005: Removed duplicate glossary (canonical in `02_glossary.html`)
- FIX-007: README typo `data-models` → `data-model`
- FIX-008: Console log version now matches VERSION file (5.4.0)
- FIX-009: Track C display type preserved (merged with FIX-002)
- FIX-010: Consistent test scenario counts across files
- FIX-013: Model-specific content preserves native display type for table rows and list items

## [5.3.2] - 2026-04-09

### Added
- Build automation pipeline with hash-based caching
- Dual artifact system (index.html + zero-install.html)
- Version synchronization checks
- GitHub Actions CI/CD workflow
- Artifact validation script
- Interactive test script

### Changed
- Modularized HTML into src/parts/ directory
- Separated source files from generated artifacts
- Improved build script with anchor validation

### Fixed
- BOM detection in source files
- Anchor cross-reference validation
- Version mismatch detection

## [5.3.1] - 2026-04-08

### Added
- Zero-install HTML artifact for offline use
- Build hash tracking for change detection
- Basic validation gates

### Changed
- Restructured project for source/artifact separation
- Updated README with contributor documentation

## [5.3.0] - 2026-04-07

### Added
- Initial release of Live Character Guide
- Core architecture documentation
- Quick start guide
- Character card building blocks
- Psychology and persona sections
- Technical implementation guide
- Testing strategies

[Unreleased]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.4.0...HEAD
[5.4.0]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.3.2...v5.4.0
[5.3.2]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.3.1...v5.3.2
[5.3.1]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.3.0...v5.3.1
[5.3.0]: https://github.com/vudirvp-sketch/live-char-guide/releases/tag/v5.3.0
