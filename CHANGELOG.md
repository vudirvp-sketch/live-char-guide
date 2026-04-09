# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[Unreleased]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.3.2...HEAD
[5.3.2]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.3.1...v5.3.2
[5.3.1]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.3.0...v5.3.1
[5.3.0]: https://github.com/vudirvp-sketch/live-char-guide/releases/tag/v5.3.0
