LIVE-CHAR-GUIDE BUILD-AUTOMATION PLAN
LLM-Optimized Machine-Readable Specification
Version: 1.1.0 | Updated: 2026-04-10 | Target: https://github.com/vudirvp-sketch/live-char-guide

META_DIRECTIVE
spec_type: build_automation_executable
target_consumers: [llm_agents, ci_cd_pipelines, github_actions]
format_priority: [machine_parseable, deterministic_execution, validation_gates]
language: en
repository: https://github.com/vudirvp-sketch/live-char-guide
repository_status: dual_artifact_system

CRITICAL_FINDING:
  - Existing build.mjs creates index.html (web server version)
  - zero-install.html requires separate build with offline optimizations
  - Both artifacts must be regenerated from same source

SECTION_1: EXECUTIVE_SUMMARY
1.1 OBJECTIVE
OBJECTIVE: Automate regeneration of both index.html AND live-char-guide-zero-install.html
CAPABILITY: Detect source changes in /src/parts or manifest
CAPABILITY: Trigger build pipeline on push/PR
CAPABILITY: Commit regenerated artifacts to main branch
CAPABILITY: Maintain sync between source and distributables

1.2 EXISTING_INFRASTRUCTURE_ANALYSIS
already_present:
  - src/scripts/build.mjs (creates index.html)
  - src/manifest/structure.json (defines part assembly)
  - src/parts/*.html (modular HTML fragments)
  - live-char-guide-zero-install.html (snapshot artifact, ~v5.3.2)
  - package.json with basic build script
  - build.sh / build.bat wrapper scripts

missing_critical:
  - build-zero-install.mjs: NOT_IMPLEMENTED (offline-optimized build)
  - github_actions_workflow: NOT_IMPLEMENTED (auto-trigger on push)
  - scripts/validate-artifact.mjs: NOT_IMPLEMENTED (test regenerated files)
  - scripts/version-sync.mjs: NOT_IMPLEMENTED (detect source/artifact drift)
  - src/VERSION: NOT_IMPLEMENTED (single source of version truth)
  - README.md: NOT_IMPLEMENTED (contributor documentation)

1.3 DUAL_ARTIFACT_SYSTEM
outputs:
  - index.html: Web server version (allows external fonts, dynamic assets)
  - live-char-guide-zero-install.html: Offline version (all inline, system fonts, CSP)

zero_install_differences:
  - Google Fonts URLs → System font fallbacks
  - Additional CSP meta tags for file:// protocol
  - Version metadata in HTML comments
  - Larger file size (more self-contained)

1.4 PERFORMANCE_REQUIREMENTS
sla_targets:
  build_execution:
    max_duration_seconds: 120
    timeout_seconds: 300
  artifact_size:
    index_html_max_kb: 300
    zero_install_max_kb: 500
  sync_latency:
    push_to_artifact_commit_seconds: 300

SECTION_2: IMPLEMENTATION_BLOCKS
BLOCK_1: BUILD TOOLING
ITEM_001: Zero-Install Build Script
id: BUILD-001
priority: HIGH
status: NOT_IMPLEMENTED
target_path: src/scripts/build-zero-install.mjs
estimated_time: 60min
risk_level: MEDIUM

specification:
  purpose: Create offline-optimized zero-install.html from same source
  inputs:
    - src/parts/*.html (same as index.html build)
    - src/manifest/structure.json
    - src/VERSION (new file)
  outputs:
    - live-char-guide-zero-install.html (root, self-contained)
  processing_steps:
    - step_1: Load manifest and assemble HTML (reuse index.html logic)
    - step_2: Replace Google Fonts URLs with system font stack
    - step_3: Add CSP meta tag for file:// protocol
    - step_4: Add version metadata comments
    - step_5: Validate no external resource references
  font_replacement_map:
    - "'IBM Plex Mono'" → "ui-monospace, SFMono-Regular, monospace"
    - "'Playfair Display'" → "Georgia, Cambria, serif"
    - "@import url('https://fonts.googleapis.com...')" → REMOVE
  validation_gates:
    - gate_1: Output exists and > 50KB
    - gate_2: No external URLs (fonts.googleapis.com, cdn, etc.)
    - gate_3: Contains version string matching src/VERSION
    - gate_4: CSP meta tag present

dependencies: [ITEM_004]
outputs: [src/scripts/build-zero-install.mjs]

ITEM_002: Validation Script
id: BUILD-002
priority: HIGH
status: NOT_IMPLEMENTED
target_path: scripts/validate-artifact.mjs
estimated_time: 30min
risk_level: LOW

specification:
  purpose: Verify regenerated artifacts meet quality gates
  validation_checks:
    - check_1: Both index.html and zero-install.html exist
    - check_2: File sizes within limits (index < 400KB, zero < 600KB)
    - check_3: Version strings match src/VERSION
    - check_4: Required sections present (Quick Start, Architecture, Anchors)
    - check_5: zero-install has NO external URLs
    - check_6: HTML validity (basic parse test)
  output_format:
    success: exit 0, log "✓ All validation gates passed"
    failure: exit 1, log failed gate IDs

dependencies: [ITEM_004]
outputs: [scripts/validate-artifact.mjs]

ITEM_003: Version Sync Checker
id: BUILD-003
priority: MEDIUM
status: NOT_IMPLEMENTED
target_path: scripts/version-sync.mjs
estimated_time: 20min
risk_level: LOW

specification:
  purpose: Detect drift between source version and artifact versions
  version_sources:
    - src/VERSION (single source of truth)
    - package.json version field
    - artifact HTML meta tags (extracted)
  comparison_logic:
    - Parse semantic version (vX.Y.Z) from each source
    - All sources must match
  output:
    - JSON: {source_version, package_version, index_version, zero_install_version, status}

dependencies: [ITEM_004]
outputs: [scripts/version-sync.mjs]

ITEM_004: VERSION File
id: BUILD-004
priority: HIGH
status: NOT_IMPLEMENTED
target_path: src/VERSION
estimated_time: 5min
risk_level: LOW

specification:
  purpose: Single source of truth for version
  format: "5.3.2" (semantic version without 'v' prefix)
  usage:
    - Read by build scripts
    - Embedded in artifact metadata
    - Compared by version-sync.mjs

dependencies: []
outputs: [src/VERSION]

BLOCK_2: CI_CD_AUTOMATION
ITEM_005: GitHub Actions Workflow
id: CI-001
priority: HIGH
status: NOT_IMPLEMENTED
target_path: .github/workflows/build-artifact.yml
estimated_time: 30min
risk_level: LOW

specification:
  purpose: Auto-regenerate both artifacts on source changes
  trigger_conditions:
    - push: branches: [main]
      paths: ['src/**', 'package.json']
    - pull_request: branches: [main]
    - workflow_dispatch:
  job_definition:
    name: build-and-commit-artifacts
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:all
      - run: npm run validate
      - name: Commit if changed
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(artifact): auto-regenerate HTML files [skip ci]"
          file_pattern: "index.html live-char-guide-zero-install.html"
          skip_fetch: true

dependencies: [ITEM_001, ITEM_002]
outputs: [.github/workflows/build-artifact.yml]

BLOCK_3: DOCUMENTATION
ITEM_006: README.md
id: DOCS-001
priority: HIGH
status: NOT_IMPLEMENTED
target_path: README.md
estimated_time: 30min
risk_level: LOW

specification:
  purpose: Document workflow for contributors and users
  sections:
    - title: Quick Start for Users
      content: Download zero-install.html, open in browser
    - title: For Contributors
      content: |
        1. Edit files in src/parts/
        2. Run `npm run build:all`
        3. Both index.html and zero-install.html will regenerate
        4. Commit changes OR push to main for auto-regeneration
    - title: Build Commands
      content: Reference for all npm scripts
    - title: Dual Artifact System
      content: Explain difference between index.html and zero-install.html

dependencies: []
outputs: [README.md]

ITEM_007: package.json Updates
id: DOCS-002
priority: HIGH
status: PARTIAL
target_path: package.json
estimated_time: 15min
risk_level: LOW

specification:
  scripts_to_add:
    build: "node src/scripts/build.mjs"
    build:zero: "node src/scripts/build-zero-install.mjs"
    build:all: "npm run build && npm run build:zero"
    validate: "node scripts/validate-artifact.mjs"
    version:check: "node scripts/version-sync.mjs"
    precommit: "npm run build:all && npm run validate"

dependencies: [ITEM_001, ITEM_002, ITEM_003]
outputs: [package.json updated]

SECTION_3: EXECUTION_PHASES
PHASE_1: FOUNDATION
duration: 30min
risk: LOW
code_changes: true
blocking: ALL_PHASES

actions:
  - CREATE: src/VERSION (ITEM_004)
  - CREATE: README.md (ITEM_006)
  - UPDATE: package.json with new scripts (ITEM_007)
  - CREATE: scripts/ directory

validation:
  - version_file_exists: PASS
  - readme_exists: PASS
  - package_json_updated: PASS

PHASE_2: BUILD_TOOLING
duration: 2h
risk: MEDIUM
code_changes: true
depends_on: PHASE_1

actions:
  - CREATE: src/scripts/build-zero-install.mjs (ITEM_001)
  - CREATE: scripts/validate-artifact.mjs (ITEM_002)
  - CREATE: scripts/version-sync.mjs (ITEM_003)
  - TEST: Local build execution
  - TEST: Validation passes

validation:
  - zero_install_build_works: PASS
  - both_artifacts_generated: PASS
  - validation_gates_pass: PASS

artifacts:
  - src/scripts/build-zero-install.mjs
  - scripts/validate-artifact.mjs
  - scripts/version-sync.mjs

PHASE_3: CI_CD_INTEGRATION
duration: 30min
risk: LOW
code_changes: true
depends_on: PHASE_2

actions:
  - CREATE: .github/workflows/build-artifact.yml (ITEM_005)
  - TEST: Push to feature branch → verify workflow triggers

validation:
  - workflow_file_created: PASS
  - workflow_syntax_valid: PASS

artifacts:
  - .github/workflows/build-artifact.yml

PHASE_4: FINAL_VALIDATION
duration: 30min
risk: LOW
code_changes: false
depends_on: PHASE_3

actions:
  - RUN: Full end-to-end test
  - VERIFY: Both artifacts open in browser
  - VERIFY: zero-install works via file:// protocol
  - DOCUMENT: Known limitations

validation:
  - e2e_pipeline_success: PASS
  - artifacts_functional: PASS

SECTION_4: COMMAND_REFERENCE
npm run build:
  action: Regenerate index.html only
  output: index.html

npm run build:zero:
  action: Regenerate zero-install.html only
  output: live-char-guide-zero-install.html

npm run build:all:
  action: Regenerate both artifacts
  use_case: Standard build command

npm run validate:
  action: Run validation gates on both artifacts
  exit_codes: 0 (pass), 1 (fail)

npm run version:check:
  action: Check version consistency across sources
  output: JSON status report

END_OF_SPECIFICATION
