import { NextRequest, NextResponse } from 'next/server'
import { analyzeRepository } from '@/lib/github/repo-analyzer'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_FILE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiter
const limiter = rateLimit(GITHUB_FILE_LIMIT)

// Validate request parameters
const analyzeRequestSchema = z.object({
  owner: z.string().min(1, 'Owner is required'),
  repo: z.string().min(1, 'Repo is required'),
  ref: z.string().optional().default('main'),
  mode: z.enum(['demo']).optional(),
})

/**
 * GET /api/github/analyze-structure
 *
 * Analyzes GitHub repository structure
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)

    // Validate input
    const validated = analyzeRequestSchema.parse({
      owner: searchParams.get('owner'),
      repo: searchParams.get('repo'),
      ref: searchParams.get('ref') || 'main',
      mode: searchParams.get('mode') || undefined,
    })

    // Get base URL for server-side fetch
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    const host = request.headers.get('host') || 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    const structure = await analyzeRepository(
      validated.owner,
      validated.repo,
      validated.ref,
      validated.mode === 'demo' ? 'demo' : undefined,
      baseUrl
    )

    return NextResponse.json(structure)
  } catch (error) {
    return handleApiError(error)
  }
}
