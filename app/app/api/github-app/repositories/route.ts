import { NextRequest, NextResponse } from 'next/server'
import { githubApp } from '@/lib/auth/github-app'
import { cookies } from 'next/headers'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GITHUB_FILE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'

// Create rate limiter
const limiter = rateLimit(GITHUB_FILE_LIMIT)

/**
 * GET /api/github-app/repositories
 *
 * Retrieves repositories from GitHub App installations
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('github_app_token')?.value

    if (!token) {
      throw new AuthenticationError('Not authenticated with GitHub App')
    }

    // Get user's installations
    const installations = await githubApp.getUserInstallations(token)

    // Get repositories for all installations
    const { Octokit } = await import('@octokit/rest')
    const octokit = new Octokit({ auth: token })

    const allRepositories = []

    for (const installation of installations) {
      try {
        const { data } = await octokit.rest.apps.listInstallationReposForAuthenticatedUser({
          installation_id: installation.id,
        })

        allRepositories.push(
          ...data.repositories.map((repo) => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            owner: {
              login: repo.owner.login,
              avatar_url: repo.owner.avatar_url,
            },
            default_branch: repo.default_branch,
            private: repo.private,
          }))
        )
      } catch (error) {
        console.error(`Error fetching repos for installation ${installation.id}:`, error)
      }
    }

    return NextResponse.json({ repositories: allRepositories })
  } catch (error) {
    return handleApiError(error)
  }
}
