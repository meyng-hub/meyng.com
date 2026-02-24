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
echo -e "${YELLOW}[1/5] Building...${NC}"
npm run build
echo -e "${GREEN}[1/5] Build passed${NC}"
echo ""

# Step 2: Start production server
echo -e "${YELLOW}[2/5] Starting production server on port $PORT...${NC}"
npx next start -p "$PORT" &>/dev/null &
SERVER_PID=$!

# Wait for server to be ready
for i in {1..15}; do
  if curl -s -o /dev/null http://localhost:$PORT/en 2>/dev/null; then
    break
  fi
  if [ $i -eq 15 ]; then
    echo -e "${RED}[2/5] Server failed to start within 15 seconds${NC}"
    kill $SERVER_PID 2>/dev/null
    exit 1
  fi
  sleep 1
done
echo -e "${GREEN}[2/5] Server running${NC}"
echo ""

# Step 3: Validate inline scripts (catches env var corruption)
echo -e "${YELLOW}[3/5] Validating inline scripts...${NC}"
SCRIPT_CONTENT=$(curl -s "http://localhost:$PORT/en" | python3 -c "
import sys
html = sys.stdin.read()
idx = html.find('window.dataLayer=')
if idx >= 0:
    start = html.rfind('<script>', 0, idx) + 8
    end = html.find('</script>', idx)
    script = html[start:end]
    if '\\n' in script or '\\r' in script:
        print('FAIL: inline script contains newline characters')
        sys.exit(1)
    else:
        print('OK')
else:
    print('SKIP: no GA script found (NEXT_PUBLIC_GA_ID not set)')
" 2>/dev/null)
echo -e "  ${GREEN}✓${NC} Inline scripts: $SCRIPT_CONTENT"
echo ""

# Step 4: Test all pages
echo -e "${YELLOW}[4/5] Testing all pages...${NC}"
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

# Step 5: Cleanup
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
