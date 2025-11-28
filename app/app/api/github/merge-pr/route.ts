import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_MERGE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'
import { githubOwnerSchema, githubRepoNameSchema } from '@/lib/validation/schemas'
import { z } from 'zod'

// Create rate limiter for PR merge operations
const limiter = rateLimit(GITHUB_MERGE_LIMIT)

/**
 * GitHub PR Merge Request Schema
 */
const githubPRMergeSchema = z.object({
  owner: githubOwnerSchema,
  repo: githubRepoNameSchema,
  pullNumber: z.number().int().positive('Pull request number must be positive'),
  mergeMethod: z.enum(['merge', 'squash', 'rebase']).optional().default('merge'),
})

/**
 * POST /api/github/merge-pr
 *
 * Merges a GitHub pull request
 *
 * Rate Limited: 20 requests per 5 minutes
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const token = await getGitHubToken()

    if (!token) {
      throw new AuthenticationError('Please connect GitHub')
    }

    const body = await request.json()

    // Validate input using Zod schema
    const validated = githubPRMergeSchema.parse(body)

    const github = new GitHubClient(token)
    const result = await github.mergePullRequest(
      validated.owner,
      validated.repo,
      validated.pullNumber,
      validated.mergeMethod
    )

    if (!result.merged) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
