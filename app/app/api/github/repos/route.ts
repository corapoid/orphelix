import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_FILE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'

// Create rate limiter
const limiter = rateLimit(GITHUB_FILE_LIMIT)

/**
 * GET /api/github/repos
 *
 * Retrieves GitHub repositories
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

    const github = new GitHubClient(token)
    const repos = await github.listRepositories()

    return NextResponse.json(repos)
  } catch (error) {
    return handleApiError(error)
  }
}
