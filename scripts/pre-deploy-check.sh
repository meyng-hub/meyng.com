#!/usr/bin/env bash
# Pre-deploy verification script for meyng-website
# Run this BEFORE every Vercel deployment to catch runtime SSR errors
# that npm run build alone cannot detect.
#
# Usage: bash scripts/pre-deploy-check.sh
#
# Exit codes: 0 = all checks pass, 1 = failure

set -e

PORT=${1:-3099}
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo "=========================================="
echo "  MEYNG Pre-Deploy Verification"
echo "=========================================="
echo ""

# Step 1: Build
echo -e "${YELLOW}[1/4] Building...${NC}"
npm run build
echo -e "${GREEN}[1/4] Build passed${NC}"
echo ""

# Step 2: Start production server
echo -e "${YELLOW}[2/4] Starting production server on port $PORT...${NC}"
npx next start -p "$PORT" &>/dev/null &
SERVER_PID=$!

# Wait for server to be ready
for i in {1..15}; do
  if curl -s -o /dev/null http://localhost:$PORT/en 2>/dev/null; then
    break
  fi
  if [ $i -eq 15 ]; then
    echo -e "${RED}[2/4] Server failed to start within 15 seconds${NC}"
    kill $SERVER_PID 2>/dev/null
    exit 1
  fi
  sleep 1
done
echo -e "${GREEN}[2/4] Server running${NC}"
echo ""

# Step 3: Test all pages
echo -e "${YELLOW}[3/4] Testing all pages...${NC}"
FAILED=0
PAGES=(
  "/en"
  "/fr"
  "/en/about"
  "/en/products"
  "/en/contact"
  "/en/privacy"
  "/en/terms"
  "/fr/about"
  "/fr/contact"
)

for page in "${PAGES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT$page")
  if [ "$STATUS" = "200" ]; then
    echo -e "  ${GREEN}✓${NC} $page → $STATUS"
  else
    echo -e "  ${RED}✗${NC} $page → $STATUS"
    FAILED=1
  fi
done

# Step 4: Cleanup
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null
echo ""

if [ $FAILED -eq 1 ]; then
  echo -e "${RED}=========================================="
  echo "  ✗ PRE-DEPLOY CHECK FAILED"
  echo "  Do NOT deploy until all pages return 200"
  echo -e "==========================================${NC}"
  exit 1
else
  echo -e "${GREEN}=========================================="
  echo "  ✓ ALL CHECKS PASSED — Safe to deploy"
  echo -e "==========================================${NC}"
  echo ""
  echo "  Next step: npx vercel deploy --prod --yes"
fi
