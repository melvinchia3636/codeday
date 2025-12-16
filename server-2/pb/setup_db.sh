#!/bin/bash
# Database Setup Script for Waifu Health Tracker API
# 
# This script helps set up PocketBase collections for the API.
# 
# Prerequisites:
# 1. PocketBase running on http://127.0.0.1:8090
# 2. Superuser credentials set in environment or prompted

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PB_URL="${POCKETBASE_URL:-http://127.0.0.1:8090}"
SCHEMA_FILE="${SCRIPT_DIR}/pb_schema.json"

echo "================================================="
echo "Waifu Health Tracker - Database Setup"
echo "================================================="
echo ""
echo "PocketBase URL: $PB_URL"
echo "Schema File: $SCHEMA_FILE"
echo ""

# Check if PocketBase is running
echo "Checking PocketBase connection..."
if ! curl -sf "$PB_URL/api/health" > /dev/null 2>&1; then
    echo "❌ Error: Cannot connect to PocketBase at $PB_URL"
    echo "   Please ensure PocketBase is running:"
    echo "   cd pb && ./pocketbase serve"
    exit 1
fi
echo "✅ PocketBase is running"
echo ""

# Check if schema file exists
if [ ! -f "$SCHEMA_FILE" ]; then
    echo "❌ Error: Schema file not found at $SCHEMA_FILE"
    exit 1
fi
echo "✅ Schema file found"
echo ""

echo "================================================="
echo "MANUAL SETUP REQUIRED"
echo "================================================="
echo ""
echo "PocketBase doesn't support direct schema import via API."
echo "Please follow these steps to set up the collections:"
echo ""
echo "Option 1: Using PocketBase Admin UI"
echo "  1. Open http://127.0.0.1:8090/_/ in your browser"
echo "  2. Log in with your superuser credentials"
echo "  3. Go to Settings → Import collections"
echo "  4. Paste the contents of: $SCHEMA_FILE"
echo "  5. Click 'Import' to create all collections"
echo ""
echo "Option 2: Using pocketbase CLI (if available)"
echo "  cd pb"
echo "  ./pocketbase migrate collections --import ../pb_schema.json"
echo ""
echo "After importing, run the tests with:"
echo "  bun test src/tests/api.test.ts"
echo ""

# Optionally open the schema file for copying
if command -v cat &> /dev/null; then
    echo "================================================="
    echo "Schema file contents (copy this to PocketBase Admin):"
    echo "================================================="
    cat "$SCHEMA_FILE"
fi
