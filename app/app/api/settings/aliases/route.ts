import { NextRequest, NextResponse } from 'next/server'
import { ClusterAliasesService } from '@/lib/db/services'
import { rateLimit } from '@/lib/security/rate-limiter'
import { SETTINGS_UPDATE_LIMIT, GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, ValidationError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiters
const updateLimiter = rateLimit(SETTINGS_UPDATE_LIMIT)
const generalLimiter = rateLimit(GENERAL_API_LIMIT)

// Validate request schemas
const aliasUpdateSchema = z.object({
  contextName: z.string().min(1, 'Context name is required'),
  alias: z.string().min(1, 'Alias is required'),
})

/**
 * GET /api/settings/aliases
 *
 * Retrieves cluster aliases
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)
    const contextName = searchParams.get('context')

    if (contextName) {
      const alias = ClusterAliasesService.get(contextName)
      return NextResponse.json({ alias })
    }

    const aliases = ClusterAliasesService.getAll()
    return NextResponse.json(aliases)
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/settings/aliases
 *
 * Sets a cluster alias
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
    const validated = aliasUpdateSchema.parse(body)

    ClusterAliasesService.set(validated.contextName, validated.alias)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * DELETE /api/settings/aliases
 *
 * Removes a cluster alias
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function DELETE(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)
    const contextName = searchParams.get('context')

    if (!contextName) {
      throw new ValidationError('context parameter is required')
    }

    ClusterAliasesService.remove(contextName)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
