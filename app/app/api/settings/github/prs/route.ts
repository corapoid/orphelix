import { NextRequest, NextResponse } from 'next/server'
import { GitHubSettingsService } from '@/lib/db/services'
import { rateLimit } from '@/lib/security/rate-limiter'
import { SETTINGS_UPDATE_LIMIT, GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, ValidationError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiters
const updateLimiter = rateLimit(SETTINGS_UPDATE_LIMIT)
const generalLimiter = rateLimit(GENERAL_API_LIMIT)

// Validate request schemas
const pendingPRSchema = z.object({
  deploymentName: z.string().min(1, 'Deployment name is required'),
  namespace: z.string().min(1, 'Namespace is required'),
  prNumber: z.number().int().positive('PR number must be positive'),
})

/**
 * GET /api/settings/github/prs
 *
 * Retrieves pending pull requests
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const pendingPRs = GitHubSettingsService.getPendingPRs()
    return NextResponse.json(pendingPRs)
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/settings/github/prs
 *
 * Sets a pending pull request
 *
 * Rate Limited: 30 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await updateLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const body = await request.json()

    // Validate input
    const validated = pendingPRSchema.parse(body)

    GitHubSettingsService.setPendingPR(
      validated.deploymentName,
      validated.namespace,
      validated.prNumber
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * DELETE /api/settings/github/prs
 *
 * Removes a pending pull request
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function DELETE(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)
    const deploymentName = searchParams.get('deploymentName')
    const namespace = searchParams.get('namespace')

    if (!deploymentName || !namespace) {
      throw new ValidationError('deploymentName and namespace parameters are required')
    }

    GitHubSettingsService.removePendingPR(deploymentName, namespace)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
