import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_FILE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiter
const limiter = rateLimit(GITHUB_FILE_LIMIT)

// Validate request parameters
const kustomizeRequestSchema = z.object({
  owner: z.string().min(1, 'Owner is required'),
  repo: z.string().min(1, 'Repo is required'),
  filePath: z.string().min(1, 'File path is required'),
  ref: z.string().optional().default('main'),
})

/**
 * GET /api/github/kustomize
 *
 * Retrieves kustomize structure from GitHub
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const token = await getGitHubToken()

    if (!token) {
      throw new AuthenticationError('Please connect GitHub')
    }

    const { searchParams } = new URL(request.url)

    // Validate input
    const validated = kustomizeRequestSchema.parse({
      owner: searchParams.get('owner'),
      repo: searchParams.get('repo'),
      filePath: searchParams.get('filePath'),
      ref: searchParams.get('ref') || 'main',
    })

    const github = new GitHubClient(token)
    const structure = await github.getKustomizeStructure(
      validated.owner,
      validated.repo,
      validated.filePath,
      validated.ref
    )

    return NextResponse.json(structure)
  } catch (error) {
    return handleApiError(error)
  }
}
