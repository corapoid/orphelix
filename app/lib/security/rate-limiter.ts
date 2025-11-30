/**
 * Rate Limiting Implementation
 *
 * Provides rate limiting functionality to prevent abuse and DoS attacks.
 * Uses LRU cache for efficient memory management and automatic cleanup.
 *
 * @module lib/security/rate-limiter
 */

import { LRUCache } from 'lru-cache'
import { NextRequest, NextResponse } from 'next/server'
import { createModuleLogger } from '@/lib/logging/logger'

const logger = createModuleLogger('rate-limiter')

export interface RateLimitConfig {
  /**
   * Time window in milliseconds
   */
  windowMs: number

  /**
   * Maximum number of requests allowed in the window
   */
  maxRequests: number

  /**
   * Custom error message
   */
  message?: string

  /**
   * Skip rate limiting for certain conditions
   */
  skip?: (req: NextRequest) => boolean | Promise<boolean>

  /**
   * Custom identifier function
   */
  keyGenerator?: (req: NextRequest) => string | Promise<string>
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

// Store for each rate limit configuration
const stores = new Map<string, LRUCache<string, RateLimitEntry>>()

/**
 * Get or create cache for a specific rate limit configuration
 */
function getStore(configId: string, ttl: number): LRUCache<string, RateLimitEntry> {
  let store = stores.get(configId)

  if (!store) {
    store = new LRUCache<string, RateLimitEntry>({
      max: 10000, // Maximum number of unique identifiers to track
      ttl,
      updateAgeOnGet: false,
      updateAgeOnHas: false,
    })
    stores.set(configId, store)
  }

  return store
}

/**
 * Get client identifier for rate limiting
 * Uses IP address as identifier
 * Note: Session-based rate limiting can be added later if needed
 */
async function getClientIdentifier(req: NextRequest): Promise<string> {
  // Use IP address for rate limiting
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown'

  return `ip:${ip}`
}

/**
 * Create a rate limiter middleware
 *
 * @example
 * ```typescript
 * const limiter = rateLimit({
 *   windowMs: 60 * 1000, // 1 minute
 *   maxRequests: 10,
 *   message: 'Too many requests'
 * })
 *
 * export async function POST(req: NextRequest) {
 *   const limitResult = await limiter(req)
 *   if (limitResult) return limitResult
 *
 *   // Continue with request handling
 * }
 * ```
 */
export function rateLimit(config: RateLimitConfig) {
  const configId = `${config.windowMs}-${config.maxRequests}`
  const store = getStore(configId, config.windowMs)

  return async (req: NextRequest): Promise<Response | null> => {
    // Check if should skip rate limiting
    if (config.skip && await config.skip(req)) {
      return null
    }

    // Get identifier for this request
    const identifier = config.keyGenerator
      ? await config.keyGenerator(req)
      : await getClientIdentifier(req)

    const now = Date.now()
    const entry = store.get(identifier)

    if (!entry) {
      // First request from this identifier
      store.set(identifier, {
        count: 1,
        resetTime: now + config.windowMs,
      })

      return null // Allow request
    }

    // Check if window has expired
    if (now > entry.resetTime) {
      // Reset the counter
      store.set(identifier, {
        count: 1,
        resetTime: now + config.windowMs,
      })

      return null // Allow request
    }

    // Increment count
    entry.count++
    store.set(identifier, entry)

    // Check if limit exceeded
    if (entry.count > config.maxRequests) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000)

      // Log rate limit hit
      logger.rateLimitHit(identifier, req.url, config.maxRequests)

      return NextResponse.json(
        {
          error: config.message || 'Too many requests. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(config.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(entry.resetTime / 1000)),
          }
        }
      )
    }

    // Request allowed, add rate limit headers
    const remaining = config.maxRequests - entry.count

    // We need to modify the response in the actual handler
    // Store the rate limit info in request headers for handler to use
    req.headers.set('X-RateLimit-Limit', String(config.maxRequests))
    req.headers.set('X-RateLimit-Remaining', String(remaining))
    req.headers.set('X-RateLimit-Reset', String(Math.ceil(entry.resetTime / 1000)))

    return null // Allow request
  }
}

/**
 * Add rate limit headers to a response
 * Call this in your handler after getting the response
 */
export function addRateLimitHeaders(
  response: Response,
  limit: number,
  remaining: number,
  resetTime: number
): Response {
  const headers = new Headers(response.headers)
  headers.set('X-RateLimit-Limit', String(limit))
  headers.set('X-RateLimit-Remaining', String(Math.max(0, remaining)))
  headers.set('X-RateLimit-Reset', String(Math.ceil(resetTime / 1000)))

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

/**
 * Get current rate limit status for a request
 * Useful for debugging and monitoring
 */
export async function getRateLimitStatus(
  req: NextRequest,
  config: RateLimitConfig
): Promise<{
  identifier: string
  count: number
  limit: number
  remaining: number
  resetTime: number
} | null> {
  const identifier = config.keyGenerator
    ? await config.keyGenerator(req)
    : await getClientIdentifier(req)

  const configId = `${config.windowMs}-${config.maxRequests}`
  const store = getStore(configId, config.windowMs)
  const entry = store.get(identifier)

  if (!entry) {
    return {
      identifier,
      count: 0,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      resetTime: Date.now() + config.windowMs,
    }
  }

  return {
    identifier,
    count: entry.count,
    limit: config.maxRequests,
    remaining: Math.max(0, config.maxRequests - entry.count),
    resetTime: entry.resetTime,
  }
}

/**
 * Clear rate limit for a specific identifier
 * Useful for testing or manual intervention
 */
export function clearRateLimit(identifier: string, configId: string): void {
  const store = stores.get(configId)
  if (store) {
    store.delete(identifier)
  }
}

/**
 * Clear all rate limits
 * Useful for testing
 */
export function clearAllRateLimits(): void {
  stores.forEach(store => store.clear())
}

/**
 * Get statistics about rate limiting
 * Useful for monitoring
 */
export function getRateLimitStats(): Map<string, {
  totalEntries: number
  cacheSize: number
}> {
  const stats = new Map()

  stores.forEach((store, configId) => {
    stats.set(configId, {
      totalEntries: store.size,
      cacheSize: store.max,
    })
  })

  return stats
}
