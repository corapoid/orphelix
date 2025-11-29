#!/bin/bash

# Script to replace console.log with proper logger usage
# This is a helper script for code quality improvement

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Console.log Replacement Script${NC}"
echo "This script helps identify and replace console.log with proper logging"
echo ""

# Files with console.log
FILES=(
  "app/components/settings/cluster-aliases.tsx"
  "app/components/settings/notification-settings.tsx"
  "app/components/repo-browser/select-repo-modal.tsx"
  "app/components/repo-browser/file-tree.tsx"
  "app/components/repo-browser/branch-selector.tsx"
  "app/components/layout/context-selector-inline.tsx"
  "app/components/layout/namespace-selector.tsx"
  "app/components/layout/sidebar.tsx"
  "app/components/layout/mode-selector.tsx"
  "app/components/welcome/welcome-modal.tsx"
  "app/components/dashboard/critical-alerts.tsx"
  "app/components/ai/troubleshooting-chat.tsx"
)

echo -e "${YELLOW}Files with console.log:${NC}"
for file in "${FILES[@]}"; do
  count=$(grep -c "console\." "$file" 2>/dev/null || echo "0")
  if [ "$count" -gt 0 ]; then
    echo "  - $file: $count occurrences"
  fi
done

echo ""
echo "To replace manually:"
echo "1. Add: import { createLogger } from '@/lib/logging/logger'"
echo "2. Add: const logger = createLogger({ module: 'component-name' })"
echo "3. Replace: console.log(...) -> logger.debug(...)"
echo "4. Replace: console.error(...) -> logger.error(...)"
echo "5. Replace: console.warn(...) -> logger.warn(...)"
