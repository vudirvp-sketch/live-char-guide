#!/bin/bash
# Run all tests for Live Character Guide
# Usage: ./tests/run-tests.sh [unit|integration|all]

set -e

cd "$(dirname "$0")/.."

echo "=========================================="
echo "Live Character Guide Test Runner"
echo "=========================================="
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "Error: Node.js 20+ required (found v$(node -v))"
  exit 1
fi

echo "Node.js version: $(node -v)"
echo ""

case "${1:-all}" in
  unit)
    echo "Running unit tests..."
    node --test tests/test-*.mjs
    ;;
  integration)
    echo "Running integration tests..."
    node --test tests/integration/*.mjs
    ;;
  all)
    echo "Running all tests..."
    node --test tests/*.mjs tests/integration/*.mjs
    ;;
  *)
    echo "Usage: $0 [unit|integration|all]"
    exit 1
    ;;
esac

echo ""
echo "=========================================="
echo "All tests passed!"
echo "=========================================="
