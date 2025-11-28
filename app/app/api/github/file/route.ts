import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { getMockFileContent } from '@/lib/mocks/github-data'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_FILE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiter
const limiter = rateLimit(GITHUB_FILE_LIMIT)

// Validate request parameters
const fileRequestSchema = z.object({
  owner: z.string().min(1, 'Owner is required'),
  repo: z.string().min(1, 'Repo is required'),
  path: z.string().min(1, 'Path is required'),
  ref: z.string().optional().default('main'),
  mode: z.enum(['demo']).optional(),
})

/**
 * GET /api/github/file
 *
 * Retrieves GitHub file content
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
    const validated = fileRequestSchema.parse({
      owner: searchParams.get('owner'),
      repo: searchParams.get('repo'),
      path: searchParams.get('path'),
      ref: searchParams.get('ref') || 'main',
      mode: searchParams.get('mode') || undefined,
    })

    // Mock mode for demo
    if (validated.mode === 'demo') {
      try {
        const { content, sha } = getMockFileContent(validated.path)
        return NextResponse.json({ content, sha })
      } catch {
        return NextResponse.json({ error: 'File not found' }, { status: 404 })
      }
    }

    const token = await getGitHubToken()

    if (!token) {
      throw new AuthenticationError('Please connect GitHub')
    }

    const github = new GitHubClient(token)
    const { content, sha } = await github.getFileContent(
      validated.owner,
      validated.repo,
      validated.path,
      validated.ref
    )

    return NextResponse.json({ content, sha })
  } catch (error) {
    return handleApiError(error)
  }
}
