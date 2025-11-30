import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_LIST_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

// Create rate limiter for contexts operations
const limiter = rateLimit(K8S_LIST_LIMIT)

/**
 * GET /api/contexts
 *
 * Retrieves list of kubectl contexts
 *
 * Rate Limited: 120 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    // Get contexts with details
    const output = execSync('kubectl config get-contexts', { encoding: 'utf-8' })

    const lines = output.split('\n').filter(line => line.trim())
    const contexts: KubeContext[] = []

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (!line.trim()) continue

      const isCurrent = line.startsWith('*')
      const parts = line.replace(/^\*?\s+/, '').split(/\s+/)

      if (parts.length >= 3) {
        contexts.push({
          name: parts[0],
          cluster: parts[1],
          user: parts[2],
          // Use namespace from context, fallback to 'default'
          namespace: parts[3] || 'default',
          current: isCurrent,
        })
      }
    }

    return NextResponse.json({ contexts })
  } catch (error) {
    return handleApiError(error)
  }
}
