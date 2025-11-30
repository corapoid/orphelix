import { NextRequest, NextResponse } from 'next/server'
import { GitHubSettingsService } from '@/lib/db/services'
import { rateLimit } from '@/lib/security/rate-limiter'
import { SETTINGS_UPDATE_LIMIT, GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiters
const updateLimiter = rateLimit(SETTINGS_UPDATE_LIMIT)
const generalLimiter = rateLimit(GENERAL_API_LIMIT)

/**
 * GET /api/settings/github/basket
 *
 * Retrieves GitHub edit basket
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const basket = GitHubSettingsService.getEditBasket()
    return NextResponse.json(basket)
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/settings/github/basket
 *
 * Adds item to GitHub edit basket
 *
 * Rate Limited: 30 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await updateLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const edit = await request.json()
    GitHubSettingsService.addToBasket(edit)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * DELETE /api/settings/github/basket
 *
 * Removes item from GitHub edit basket
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function DELETE(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('filePath')

    if (!filePath) {
      // Clear entire basket
      GitHubSettingsService.clearBasket()
    } else {
      // Remove specific file
      GitHubSettingsService.removeFromBasket(filePath)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
