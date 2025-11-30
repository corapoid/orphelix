/**
 * File Matching API
 *
 * Matches Kubernetes resources to YAML files using pattern matching.
 */

import { NextRequest, NextResponse } from 'next/server'
import { matchFileToResource } from '@/lib/github/file-matcher'
import type { KubernetesResource, YamlFile } from '@/lib/github/file-matcher'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_FILE_LIMIT, GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Create rate limiters
const matchLimiter = rateLimit(GITHUB_FILE_LIMIT)
const healthLimiter = rateLimit(GENERAL_API_LIMIT)

// Validate request schema
const matchFileSchema = z.object({
  resource: z.object({
    name: z.string(),
    namespace: z.string(),
    kind: z.string(),
    type: z.string().optional(),
  }),
  yamlFiles: z.array(z.object({
    path: z.string(),
    name: z.string(),
  })),
})

/**
 * POST /api/github/match-file
 *
 * Match a Kubernetes resource to a YAML file
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await matchLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const body = await request.json()

    // Validate input
    const validated = matchFileSchema.parse(body)

    // Perform matching using pattern matching only
    const result = await matchFileToResource(
      validated.resource as KubernetesResource,
      validated.yamlFiles as YamlFile[]
    )

    return NextResponse.json({
      matchedFile: result.file,
      method: result.method,
      confidence: result.confidence,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * GET /api/github/match-file
 *
 * Health check endpoint
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await healthLimiter(request)
  if (rateLimitResult) return rateLimitResult

  return NextResponse.json({
    status: 'ok',
    method: 'pattern-matching',
  })
}
