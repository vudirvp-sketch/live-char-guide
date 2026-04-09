#!/bin/bash
# Build script for Live Char Guide
set -e

export NODE_OPTIONS="--input-type=module"

echo "============================================"
echo "Live Char Guide Build Script v1.0.0"
echo "============================================"

# Run build
node src/scripts/build.mjs

# Check result
if [ -f "build.hash" ]; then
  HASH=$(cat build.hash)
  echo ""
  echo "[OK] Build completed successfully"
  echo "[OK] Build hash: $HASH"
else
  echo "[ERROR] Build failed - no hash file generated"
  exit 1
fi
