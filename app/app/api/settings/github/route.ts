import { NextRequest, NextResponse } from 'next/server'
import { GitHubSettingsService } from '@/lib/db/services'
import { rateLimit } from '@/lib/security/rate-limiter'
import { SETTINGS_UPDATE_LIMIT, GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiters
const updateLimiter = rateLimit(SETTINGS_UPDATE_LIMIT)
const generalLimiter = rateLimit(GENERAL_API_LIMIT)

/**
 * GET /api/settings/github
 *
 * Retrieves GitHub settings
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const settings = GitHubSettingsService.get()
    const pendingPRs = GitHubSettingsService.getPendingPRs()
    const editBasket = GitHubSettingsService.getEditBasket()

    return NextResponse.json({
      ...settings,
      pendingPRs,
      editBasket,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/settings/github
 *
 * Updates GitHub settings
 *
 * Rate Limited: 30 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await updateLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const data = await request.json()

    if (data.repo) {
      GitHubSettingsService.update({
        owner: data.repo.owner,
        repo: data.repo.repo,
        branch: data.repo.branch,
      })
    }

    if (data.branch) {
      GitHubSettingsService.update({ branch: data.branch })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
