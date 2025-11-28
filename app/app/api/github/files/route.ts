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
const filesRequestSchema = z.object({
  owner: z.string().min(1, 'Owner is required'),
  repo: z.string().min(1, 'Repo is required'),
  ref: z.string().optional().default('main'),
})

/**
 * GET /api/github/files
 *
 * Lists YAML files in GitHub repository
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
    const validated = filesRequestSchema.parse({
      owner: searchParams.get('owner'),
      repo: searchParams.get('repo'),
      ref: searchParams.get('ref') || 'main',
    })

    const github = new GitHubClient(token)
    const files = await github.listYamlFiles(validated.owner, validated.repo, '', validated.ref)

    return NextResponse.json(files)
  } catch (error) {
    return handleApiError(error)
  }
}
