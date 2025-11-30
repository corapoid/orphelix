import { NextRequest, NextResponse } from 'next/server'
import { ApiKeysService } from '@/lib/db/services'
import { apiKeyManagementSchema } from '@/lib/validation/schemas'
import { createLogger } from '@/lib/logging/logger'
import { rateLimit } from '@/lib/security/rate-limiter'
import { API_KEYS_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'

const logger = createLogger({ module: 'api-keys-route' })
const apiKeysLimiter = rateLimit(API_KEYS_LIMIT)

/**
 * GET /api/api-keys
 * Get an API key by name (decrypted)
 *
 * Rate Limited: 10 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await apiKeysLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const searchParams = request.nextUrl.searchParams
    const keyName = searchParams.get('name')

    if (!keyName) {
      return NextResponse.json(
        { error: 'Missing key name parameter' },
        { status: 400 }
      )
    }

    // Validate key name
    const validation = apiKeyManagementSchema.safeParse({ keyName, value: 'dummy' })
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid key name', details: validation.error.issues },
        { status: 400 }
      )
    }

    const value = await ApiKeysService.get(keyName)

    if (!value) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      )
    }

    logger.info('API key retrieved', { keyName })

    return NextResponse.json({ value })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/api-keys
 * Store an API key (encrypted)
 *
 * Rate Limited: 10 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await apiKeysLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const body = await request.json()

    // Validate request body
    const validation = apiKeyManagementSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { keyName, value } = validation.data

    await ApiKeysService.set(keyName, value)

    logger.info('API key stored', { keyName })

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * DELETE /api/api-keys
 * Remove an API key
 *
 * Rate Limited: 10 requests per 60 seconds
 */
export async function DELETE(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await apiKeysLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const searchParams = request.nextUrl.searchParams
    const keyName = searchParams.get('name')

    if (!keyName) {
      return NextResponse.json(
        { error: 'Missing key name parameter' },
        { status: 400 }
      )
    }

    // Validate key name
    const validation = apiKeyManagementSchema.safeParse({ keyName, value: 'dummy' })
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid key name', details: validation.error.issues },
        { status: 400 }
      )
    }

    ApiKeysService.remove(keyName)

    logger.info('API key removed', { keyName })

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
