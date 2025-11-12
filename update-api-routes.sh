#!/bin/bash

# Script to update API routes to accept namespace parameter

# List of API routes to update (excluding contexts and namespaces)
routes=(
  "app/api/pods/route.ts"
  "app/api/events/route.ts"
  "app/api/configmaps/route.ts"
  "app/api/secrets/route.ts"
  "app/api/hpa/route.ts"
  "app/api/nodes/route.ts"
)

for route in "${routes[@]}"; do
  if [ -f "$route" ]; then
    echo "Updating $route..."

    # Add NextRequest import if not present
    if ! grep -q "NextRequest" "$route"; then
      sed -i '' "s/import { NextResponse }/import { NextRequest, NextResponse }/" "$route"
    fi

    # Add api-helpers import
    if ! grep -q "api-helpers" "$route"; then
      sed -i '' "/from 'next\/server'/a\\
import { getNamespaceFromRequest } from '@/lib/api-helpers'
" "$route"
    fi

    # Update GET function signature
    sed -i '' "s/export async function GET()/export async function GET(request: NextRequest)/" "$route"

    # Add namespace extraction at the beginning of try block
    sed -i '' "/try {/a\\
    const namespace = getNamespaceFromRequest(request)
" "$route"

    echo "Updated $route"
  else
    echo "Skipping $route (not found)"
  fi
done

echo "Done! Don't forget to manually update function calls to pass namespace parameter."
