import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_FILE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiter
const limiter = rateLimit(GITHUB_FILE_LIMIT)

// Validate request schemas
const branchesListSchema = z.object({
  owner: z.string().min(1, 'Owner is required'),
  repo: z.string().min(1, 'Repo is required'),
})

const branchCreateSchema = z.object({
  owner: z.string().min(1, 'Owner is required'),
  repo: z.string().min(1, 'Repo is required'),
  baseBranch: z.string().min(1, 'Base branch is required'),
  newBranch: z.string().min(1, 'New branch name is required'),
})

/**
 * GET /api/github/branches
 *
 * Lists branches in GitHub repository
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
    const validated = branchesListSchema.parse({
      owner: searchParams.get('owner'),
      repo: searchParams.get('repo'),
    })

    const github = new GitHubClient(token)
    const branches = await github.listBranches(validated.owner, validated.repo)

    return NextResponse.json(branches)
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/github/branches
 *
 * Creates a new branch in GitHub repository
 *
 * Rate Limited: 60 requests per 60 seconds
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

    // Validate input
    const validated = branchCreateSchema.parse(body)

    const github = new GitHubClient(token)
    await github.createBranch(
      validated.owner,
      validated.repo,
      validated.baseBranch,
      validated.newBranch
    )

    return NextResponse.json({ success: true, branch: validated.newBranch })
  } catch (error) {
    return handleApiError(error)
  }
}
