import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_PR_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiter
const limiter = rateLimit(GITHUB_PR_LIMIT)

// Validate request schema
const multiFilePRSchema = z.object({
  owner: z.string().min(1, 'Owner is required'),
  repo: z.string().min(1, 'Repo is required'),
  branch: z.string().min(1, 'Branch name is required'),
  baseBranch: z.string().optional().default('main'),
  files: z.array(z.object({
    path: z.string().min(1, 'File path is required'),
    content: z.string(),
    sha: z.string(),
  })).min(1, 'At least one file is required'),
  commitMessage: z.string().optional(),
  prTitle: z.string().optional(),
  prBody: z.string().optional(),
})

/**
 * POST /api/github/create-multi-file-pr
 *
 * Creates a GitHub pull request with multiple file changes
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

    const requestBody = await request.json()

    // Validate input
    const validated = multiFilePRSchema.parse(requestBody)

    const github = new GitHubClient(token)

    // 1. Create new branch from base
    await github.createBranch(validated.owner, validated.repo, validated.baseBranch, validated.branch)

    // 2. Commit each file to the new branch
    for (const file of validated.files) {
      const message = validated.commitMessage || `Update ${file.path}`
      await github.commitFile(
        validated.owner,
        validated.repo,
        validated.branch,
        file.path,
        file.content,
        file.sha,
        message
      )
    }

    // 3. Create PR
    const title = validated.prTitle || `Update ${validated.files.length} files`
    const body = validated.prBody || `Updated ${validated.files.length} configuration files`

    const pr = await github.createPullRequest(
      validated.owner,
      validated.repo,
      title,
      validated.branch,
      validated.baseBranch,
      body
    )

    return NextResponse.json({
      success: true,
      number: pr.number,
      url: pr.url,
      branch: validated.branch,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
