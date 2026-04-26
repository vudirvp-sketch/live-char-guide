# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/2.0.0.html).

## [6.2.0] - 2026-04-27

### Added
- **Section counter fix:** content_map.md statistics now correctly reflect 105 unique sections from section-registry.json (was 104)
- **Migration map cleanup:** Added "Merged Sections" table, marked all obsolete IDs as `[MERGED → new_id]` or `[REMOVED → reason]`
- **p9_quality_scale** added to content_map.md Part 9 table (was present in section-registry but missing from content_map)
- **AP-11 Voice Bleed layer fix:** Corrected from l2 to l3 in migration_map.md Part 3 anchor mapping
- **Phantom bridge records removed:** Deleted p4_l1_bridge, p5_l1_bridge, p6_l1_bridge, p7_l1_bridge, p8_l1_bridge from migration_map New Sections table (these are navigational links in p1_next_steps, not separate data-sections)
- **IMP-48 cross-references:** Added 5 missing bidirectional cross-references (p9_top5_problems↔p1_top3_problems, p10_elena_l1↔p2_anchor_examples, p4_spine_mapping↔p5_cross_instrument_map, p7_core_directives↔p9_pre_deploy)
- **cross_reference_sync.md** updated with pairs #32–#35

### Changed
- Version synchronized across all 4 canonical locations: package.json, src/VERSION, data/character_schema.json, src/shell/lazy-loader.js
- README.md version badge updated to 6.2.0
- docs/architecture.md version header updated from 6.2 to 6.2.0
- BUG-1 (initLayerSwitch) and BUG-2 (colors[maxIdx]) verified as resolved in current codebase

## [6.1.0] - 2026-04-22

### Added
- **Layer restructure completed:** LIE/GHOST moved from L2 to L3, CoT basics/tiers moved from L2 to L3
- **Content Restoration Phases 0–13:** 45+ new and modified sections across all 10 Parts
- **CORE DIRECTIVES system:** Unified 7-directive system (5 on L2, all 7 on L3)
- **Tooltip system (Phase 3 L1 Remediation):** 11 data-layer-switch elements in L1 converted to term-marker tooltips
- **build-layers.mjs** updated: processCrossLayerLinks() handles term-marker elements
- **Lorebook Enhancement:** p7_lorebook_mechanics (L2) and p7_lorebook_advanced (L3) added
- **New card examples:** p10_walter_l2, p10_omnis_l1_card, p10_omnis_l2_card, p10_omnis_l3_card
- **New diagnostics:** p9_decision_tree, p9_element_scenario_map, p9_test_requirements, p9_pre_deploy, p9_quality_scale

### Changed
- SPINE on L2 now shows only WANT/NEED/FLAW; LIE/GHOST available on L3
- content_map.md fully rewritten (v2.3) with all 105 sections
- migration_map.md updated with Content Restoration entries
- cross_reference_sync.md updated (v1.4) with 31 pairs
- character_bible.md updated with IMP-48 refs, AN template, Lorebook

### Fixed
- Build validation: 102→105 sections, 0 errors
- validate-master.mjs passes (13 checks)
- validate-layers.mjs passes (7 checks)
- BUG-3 through BUG-11 all resolved

## [6.0.0] - 2026-04-19

### Added
- **NEW ARCHITECTURE:** Layer-based build system with cumulative visibility (L1 ⊂ L2 ⊂ L3)
- **build-layers.mjs:** Automated layer extraction from master HTML files
- **build-shell.mjs:** Shell + layer content assembly for GitHub Pages
- **10 master HTML files:** src/master/part_01 through part_10
- **Lazy-loading shell:** Dynamic layer content loading with panel system
- **Panel system:** Draggable, resizable TOC, Notepad, Glossary panels
- **Widget architecture:** Markup in HTML, data in JSON (ocean.json, enneagram.json, mbti.json, glossary.json)
- **Anchor redirect system:** Backward compatibility from v5.12 anchors to v6 data-section IDs

### Changed
- **BREAKING:** Complete rebuild from v5.12 — not an in-place evolution
- Content source: `src/parts-l{N}/` → `src/master/part_*.html` with `data-layer` markup
- Layer assembly: Manual → Automated via build-layers.mjs
- Cross-layer links: Layer only → Layer + section (`data-layer-switch="2#id"`)
- Layer names: Inconsistent → Canonical from layer-config.json
- SPINE model: All 5 elements on L2 → WANT/NEED/FLAW (L2) + LIE/GHOST (L3)

### Removed
- Old src/parts-l{N}/ directory structure (replaced by src/master/ + build output)
- validate_anchors.py CI script (replaced by validate-master.mjs)

## [5.12.0] - 2026-04-17

### Added
- **NEW ARCHITECTURE:** Lazy-loading shell system for faster initial load
  - `src/shell/index.html` — minimal shell with layer selector UI
  - `src/shell/lazy-loader.js` — dynamic layer content loading via fetch
  - `src/shell/styles.css` — shell-specific styles
- `build:shell` script for building lazy-loading architecture
- Layer content now loads on-demand from `parts-l1/`, `parts-l2/`, `parts-l3/`
- User selects layer on first visit, choice saved to localStorage
- Direct linking via `?layer=2` URL parameter for sharing
- Zero-install version preserved for offline use

### Changed
- **BREAKING:** Build output now goes to `dist/` directory
  - `dist/index.html` is now the shell (not inline content)
  - `dist/parts-l{1,2,3}/` contain layer HTML files
  - `dist/assets/` contain shell-styles.css and lazy-loader.js
- Default `pnpm run build` now uses shell architecture
- Use `pnpm run build:inline` for old inline build (deprecated)
- GitHub Pages deploys from `dist/` directory

### Removed
- `validate_anchors.py` CI script (dead code — validate-master.mjs Check 3 already validates anchors)

### Fixed
- Single URL architecture: no page reloads when switching layers
- Browser history works correctly (back/forward)
- Anchor navigation works after content load

## [5.11.0] - 2026-04-16

### Changed
- **BREAKING:** Layer visibility model changed from EXCLUSIVE to CUMULATIVE
  - Layer 3 now shows content from Layer 1, 2, and 3
  - Layer 2 now shows content from Layer 1 and 2
  - This fixes missing content on higher layers

### Fixed
- TOC panel now generates navigation content dynamically via `initTocContent()`
- Glossary buttons now reliably scroll to glossary section with `scrollToGlossary()`
- Reference cards with `data-layer="2"` are now visible on Layer 3
- CSS cumulative visibility rules properly cascade from lower to higher layers

### Removed
- `track_upgrade.html` reference from manifest (file was already deleted)

### Deprecated
- `.track-card.track-a/b/c` CSS classes - use `.track-card.layer-1/2/3` instead

## [5.10.0] - 2026-04-16

### Changed
- **Design Unification**: Implemented "One Semantic → One Visual Pattern" principle
  - Removed `.tag.tip` CSS definition (duplicates `.callout.tip`)
  - Converted all `.tag.tip` HTML instances to appropriate alternatives
  - Restricted `.tag.risk` usage to avoid duplication with `.callout.warn`

### Added
- `.dependency-map` and `.infographic` CSS classes for diagram containers
- Mobile-responsive overflow handling for `.dependency-map` containers
- Consistent link styling across all components including diagrams

### Fixed
- Duplicate visual signals eliminated (no more `.tag.tip` + `.callout.tip` confusion)
- "Edge Case" badge changed from `.tag.tip` to `.tag.opt` (correct semantic)
- "Хорошо" status badge changed from `.tag.tip` to `.tag.opt` (correct semantic)
- Removed redundant `.tag.risk` inside `.callout.warn` (was duplicate warning signal)

## [5.9.0] - 2026-04-15

### Changed
- Version synchronized across all project files (README, CHANGELOG, SPRINT_LOG.md)
- Track B description clarified: "production baseline" not "all core elements"
- Consolidated validate-artifact.mjs to single file (scripts/)
- Renamed 09a_antipatterns.html to 06b_antipatterns_advanced.html for stage alignment
- Removed track_visibility attribute from structure.json (using HTML data-requires-track)
- Added nav_map.json for navigation integrity

### Fixed
- Version drift between structure.json, README, CHANGELOG, and SPRINT_LOG.md
- CI instability from duplicate validation scripts with conflicting limits
- validate-artifact.mjs VERSION path corrected

### Added
- Section dependency map in architecture
- Track migration checklist in download/

### Removed
- Duplicate src/scripts/validate-artifact.mjs
- build.hash from version control (already in .gitignore)

## [5.5.5] - 2026-04-14

### Changed
- **Terminology standardization**: Replaced all "Лорбук" with "LB" across all files
- Simplified Context Capability Matrix: removed "GHOST Layers" column (over-engineering)
- Renamed "Lorebook" to "LB" in table headers for consistency

### Removed
- "GHOST Content Layer" comment from 02_quickstart.html (over-engineering cleanup)
- "GHOST Layers" concept from Context Capability Matrix table

### Fixed
- Phase 6 (Terminology Standardization) now fully implemented
- Phase 8 (Remove Over-Engineering) now fully implemented

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

[Unreleased]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.12.0...HEAD
[5.12.0]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.11.0...v5.12.0
[5.11.0]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.10.0...v5.11.0
[5.10.0]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.9.0...v5.10.0
[5.9.0]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.5.5...v5.9.0
[5.5.5]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.5.4...v5.5.5
[5.5.4]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.4.0...v5.5.4
[5.4.0]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.3.2...v5.4.0
[5.3.2]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.3.1...v5.3.2
[5.3.1]: https://github.com/vudirvp-sketch/live-char-guide/compare/v5.3.0...v5.3.1
[5.3.0]: https://github.com/vudirvp-sketch/live-char-guide/releases/tag/v5.3.0
