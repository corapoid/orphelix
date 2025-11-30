import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_PR_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'
import {
  githubOwnerSchema,
  githubRepoNameSchema,
  githubFilePathSchema,
  githubBranchSchema,
  k8sNameSchema,
  namespaceSchema,
  yamlContentSchema,
} from '@/lib/validation/schemas'
import { z } from 'zod'

// Create rate limiter for PR creation
const limiter = rateLimit(GITHUB_PR_LIMIT)

/**
 * GitHub PR Create Request Schema
 */
const githubPRCreateRequestSchema = z.object({
  owner: githubOwnerSchema,
  repo: githubRepoNameSchema,
  filePath: githubFilePathSchema,
  content: yamlContentSchema,
  deploymentName: k8sNameSchema,
  namespace: namespaceSchema,
  baseBranch: githubBranchSchema.optional().default('main'),
})

/**
 * POST /api/github/create-pr
 *
 * Creates a GitHub pull request with deployment changes
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
    const validated = githubPRCreateRequestSchema.parse(body)

    const github = new GitHubClient(token)

    // 1. Get current file SHA
    const { sha } = await github.getFileContent(
      validated.owner,
      validated.repo,
      validated.filePath,
      validated.baseBranch
    )

    // 2. Create new branch
    const branchName = `orphelix/${validated.namespace}/${validated.deploymentName}-${Date.now()}`
    await github.createBranch(validated.owner, validated.repo, validated.baseBranch, branchName)

    // 3. Commit changes
    const commitMessage = `Update ${validated.deploymentName} manifest via Orphelix\n\nNamespace: ${validated.namespace}\nFile: ${validated.filePath}`
    await github.commitFile(
      validated.owner,
      validated.repo,
      branchName,
      validated.filePath,
      validated.content,
      sha,
      commitMessage
    )

    // 4. Create PR
    const prTitle = `[Orphelix] Update ${validated.namespace}/${validated.deploymentName}`
    const prBody = `## Changes

Updated \`${validated.filePath}\` for deployment **${validated.deploymentName}** in namespace **${validated.namespace}**.

---

🤖 Generated with [Orphelix](https://github.com/corapoid/orphelix)
`

    const pr = await github.createPullRequest(
      validated.owner,
      validated.repo,
      prTitle,
      branchName,
      validated.baseBranch,
      prBody
    )

    return NextResponse.json({
      success: true,
      pr: {
        number: pr.number,
        url: pr.url,
      },
      branch: branchName,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
