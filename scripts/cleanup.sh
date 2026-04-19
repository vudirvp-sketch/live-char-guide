#!/bin/bash
# Cleanup script for Live Character Guide migration
# Version: 2.0.0
# Purpose: Clean up legacy files during v5 → v6 migration
#
# WARNING: This script is for v5 → v6 migration ONLY.
# DO NOT run on v6+ repositories.
#
# Usage:
#   ./scripts/cleanup.sh           # Run cleanup
#   ./scripts/cleanup.sh --dry-run # Preview changes without executing

set -e

# ============================================================================
# CONFIGURATION
# ============================================================================

SCRIPT_VERSION="2.0.0"
DRY_RUN=false
FORCE=false

# ============================================================================
# ARGUMENT PARSING
# ============================================================================

for arg in "$@"; do
    case $arg in
        --dry-run|-n)
            DRY_RUN=true
            shift
            ;;
        --force|-f)
            FORCE=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --dry-run, -n    Preview changes without executing"
            echo "  --force, -f      Skip confirmation prompts"
            echo "  --help, -h       Show this help message"
            echo ""
            echo "This script cleans up legacy files from v5.12 to prepare for v6."
            echo "It should only be run ONCE during the migration process."
            exit 0
            ;;
    esac
done

# ============================================================================
# VERSION GUARD
# ============================================================================

# Check if this is a v6+ repository
if [ -f "build/layer-config.json" ] || [ -d "src/master" ]; then
    echo "❌ ERROR: This appears to be a v6+ repository."
    echo "   This cleanup script is for v5 → v6 migration ONLY."
    echo "   If you need to clean build artifacts, use: rm -rf dist/ build/"
    exit 1
fi

# Check VERSION file
if [ -f "src/VERSION" ]; then
    VERSION=$(cat src/VERSION)
    if [[ "$VERSION" =~ ^6\. ]]; then
        echo "❌ ERROR: VERSION file indicates v6.x"
        echo "   This cleanup script is for v5 → v6 migration ONLY."
        exit 1
    fi
fi

# ============================================================================
# DRY RUN MODE
# ============================================================================

if [ "$DRY_RUN" = true ]; then
    echo "=== DRY RUN MODE (no changes will be made) ==="
    echo ""
fi

# ============================================================================
# CONFIRMATION
# ============================================================================

if [ "$FORCE" = false ] && [ "$DRY_RUN" = false ]; then
    echo "=== Live Character Guide v5 → v6 Migration Cleanup ==="
    echo ""
    echo "This script will remove legacy v5.12 files:"
    echo "  - Root fallback files (index.html, build.hash, assets/)"
    echo "  - Legacy build artifacts"
    echo "  - Old src/parts/ directory (if exists)"
    echo "  - src/manifest/structure.json"
    echo ""
    echo "After cleanup, run: pnpm run build:all"
    echo ""
    read -p "Continue? [y/N] " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
fi

# ============================================================================
# CLEANUP FUNCTIONS
# ============================================================================

remove_file() {
    local file="$1"
    local desc="$2"

    if [ -f "$file" ]; then
        if [ "$DRY_RUN" = true ]; then
            echo "[DRY RUN] Would remove: $file ($desc)"
        else
            echo "Removing: $file ($desc)"
            rm -f "$file"
        fi
    fi
}

remove_dir() {
    local dir="$1"
    local desc="$2"

    if [ -d "$dir" ]; then
        if [ "$DRY_RUN" = true ]; then
            echo "[DRY RUN] Would remove: $dir/ ($desc)"
        else
            echo "Removing: $dir/ ($desc)"
            rm -rf "$dir"
        fi
    fi
}

# ============================================================================
# LEGACY FILES CLEANUP
# ============================================================================

echo "=== Cleaning up legacy v5.12 files ==="
echo ""

# Remove legacy zero-install file
remove_file "live-char-guide-zero-install.html" "legacy zero-install"

# Remove legacy build hash files
remove_file "build-zero-install.hash" "legacy build hash"

# Remove old src/parts directory
# NOTE: Safety check - this should not exist in v6
if [ -d "src/parts" ]; then
    # Verify it's not src/parts-l{1,2,3}
    if [ -L "src/parts" ]; then
        echo "⚠️  src/parts is a symlink - skipping"
    else
        remove_dir "src/parts" "old flat parts directory"
    fi
fi

# Remove old src/manifest/structure.json
remove_file "src/manifest/structure.json" "old structure.json"

# Clean dist directory
if [ -d "dist" ]; then
    if [ "$DRY_RUN" = true ]; then
        echo "[DRY RUN] Would remove: dist/ (build output)"
    else
        echo "Cleaning: dist/ (will be regenerated)"
        rm -rf dist/
    fi
fi

# Remove root fallback files (regenerated by build)
remove_file "index.html" "root fallback"
remove_file "build.hash" "root fallback"
remove_dir "assets" "root fallback"

# Remove PWA manifest (deferred per §0.22)
remove_file "manifest.json" "PWA manifest (deferred)"

# ============================================================================
# COMPLETION
# ============================================================================

echo ""
if [ "$DRY_RUN" = true ]; then
    echo "=== DRY RUN COMPLETE ==="
    echo "Run without --dry-run to apply changes."
else
    echo "=== Cleanup complete ==="
    echo ""
    echo "Next steps:"
    echo "  1. Run: pnpm run build:all"
    echo "  2. Verify: pnpm run validate"
    echo "  3. Test: pnpm test"
fi
