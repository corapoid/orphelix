/**
 * Request Logging Utilities
 *
 * Helpers for logging HTTP requests in Next.js API routes
 *
 * @module lib/logging/request-logger
 */

import { NextRequest } from 'next/server'
import { createApiLogger } from './logger'
import { randomUUID } from 'crypto'

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  return randomUUID()
}

/**
 * Extract request ID from headers or generate new one
 */
export function getRequestId(request: NextRequest): string {
  return request.headers.get('x-request-id') || generateRequestId()
}

/**
 * Get client IP address from request
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  return 'unknown'
}

/**
 * Create a logger for an API request with automatic context
 */
export function createRequestLogger(request: NextRequest, route: string) {
  const requestId = getRequestId(request)
  const clientIp = getClientIp(request)
  const method = request.method
  const url = request.url

  return createApiLogger(route, requestId).child({
    requestId,
    method,
    url,
    clientIp,
  })
}

/**
 * Log the start of a request
 */
export function logRequestStart(request: NextRequest, route: string) {
  const logger = createRequestLogger(request, route)
  const method = request.method
  const url = new URL(request.url)

  logger.debug('Request started', {
    method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
  })

  return logger
}

/**
 * Log the completion of a request
 */
export function logRequestEnd(
  request: NextRequest,
  route: string,
  statusCode: number,
  startTime: number
) {
  const logger = createRequestLogger(request, route)
  const method = request.method
  const url = new URL(request.url)
  const duration = Date.now() - startTime

  logger.httpRequest(method, url.pathname, statusCode, duration)
}
