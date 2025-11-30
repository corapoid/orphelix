import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { getMockRepositoryTree } from '@/lib/mocks/github-data'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_FILE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiter
const limiter = rateLimit(GITHUB_FILE_LIMIT)

// Validate request parameters
const treeRequestSchema = z.object({
  owner: z.string().min(1, 'Owner is required'),
  repo: z.string().min(1, 'Repo is required'),
  ref: z.string().optional().default('main'),
  path: z.string().optional().default(''),
  mode: z.enum(['demo']).optional(),
})

/**
 * GET /api/github/tree
 *
 * Retrieves GitHub repository tree
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
    const validated = treeRequestSchema.parse({
      owner: searchParams.get('owner'),
      repo: searchParams.get('repo'),
      ref: searchParams.get('ref') || 'main',
      path: searchParams.get('path') || '',
      mode: searchParams.get('mode') || undefined,
    })

    // Mock mode for demo
    if (validated.mode === 'demo') {
      const tree = getMockRepositoryTree(validated.path)
      return NextResponse.json(tree)
    }

    const token = await getGitHubToken()

    if (!token) {
      throw new AuthenticationError('Please connect GitHub')
    }

    const github = new GitHubClient(token)
    const tree = await github.getRepositoryTree(
      validated.owner,
      validated.repo,
      validated.ref,
      validated.path
    )

    return NextResponse.json(tree)
  } catch (error) {
    return handleApiError(error)
  }
}
