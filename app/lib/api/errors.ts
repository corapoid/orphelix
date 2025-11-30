/**
 * Standardized Error Handling
 *
 * Provides consistent error responses across all API endpoints.
 * Prevents information leakage while providing useful error messages.
 *
 * @module lib/api/errors
 */

import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { createModuleLogger } from '@/lib/logging/logger'

const logger = createModuleLogger('api-errors')

/**
 * Base Application Error Class
 * All custom errors should extend this class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, this.constructor)
  }

  toJSON() {
    return {
      error: this.message,
      code: this.code,
      details: this.details,
    }
  }
}

/**
 * Validation Error (400)
 * Used when user input fails validation
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details)
    this.name = 'ValidationError'
  }
}

/**
 * Authentication Error (401)
 * Used when user is not authenticated
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR')
    this.name = 'AuthenticationError'
  }
}

/**
 * Authorization Error (403)
 * Used when user lacks necessary permissions
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR')
    this.name = 'AuthorizationError'
  }
}

/**
 * Not Found Error (404)
 * Used when requested resource doesn't exist
 */
export class NotFoundError extends AppError {
  constructor(resource: string, identifier: string) {
    super(
      `${resource} not found: ${identifier}`,
      404,
      'NOT_FOUND',
      { resource, identifier }
    )
    this.name = 'NotFoundError'
  }
}

/**
 * Conflict Error (409)
 * Used when request conflicts with current state
 */
export class ConflictError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 409, 'CONFLICT', details)
    this.name = 'ConflictError'
  }
}

/**
 * Rate Limit Error (429)
 * Used when rate limit is exceeded
 */
export class RateLimitError extends AppError {
  constructor(retryAfter: number) {
    super(
      'Too many requests. Please try again later.',
      429,
      'RATE_LIMIT_EXCEEDED',
      { retryAfter }
    )
    this.name = 'RateLimitError'
  }
}

/**
 * External Service Error (502)
 * Used when an external service (K8s API, GitHub API) fails
 */
export class ExternalServiceError extends AppError {
  constructor(service: string, originalError: Error | string) {
    const message = typeof originalError === 'string'
      ? originalError
      : originalError.message

    super(
      `${service} service error: ${message}`,
      502,
      'EXTERNAL_SERVICE_ERROR',
      { service, originalError: message }
    )
    this.name = 'ExternalServiceError'
  }
}

/**
 * Database Error (500)
 * Used when database operations fail
 */
export class DatabaseError extends AppError {
  constructor(operation: string, originalError: Error | string) {
    const message = typeof originalError === 'string'
      ? originalError
      : originalError.message

    super(
      `Database error during ${operation}`,
      500,
      'DATABASE_ERROR',
      { operation, originalError: message }
    )
    this.name = 'DatabaseError'
  }
}

/**
 * Internal Server Error (500)
 * Generic server error - should be used sparingly
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error', details?: unknown) {
    super(message, 500, 'INTERNAL_ERROR', details)
    this.name = 'InternalServerError'
  }
}

/**
 * Error Handler Middleware
 * Converts any error into a standard JSON response
 *
 * @example
 * ```typescript
 * try {
 *   // ... operation
 * } catch (error) {
 *   return handleApiError(error)
 * }
 * ```
 */
export function handleApiError(error: unknown): Response {
  // Handle AppError instances
  if (error instanceof AppError) {
    // Log application errors
    logger.error('Application error', error, {
      code: error.code,
      statusCode: error.statusCode,
    })

    const response = NextResponse.json(
      error.toJSON(),
      { status: error.statusCode }
    )

    // Add Retry-After header for rate limit errors
    if (error instanceof RateLimitError && error.details) {
      response.headers.set('Retry-After', String((error.details as { retryAfter: number }).retryAfter))
    }

    return response
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    logger.warn('Validation error', {
      issues: error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    })

    return NextResponse.json(
      {
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      },
      { status: 400 }
    )
  }

  // Handle Kubernetes API errors
  if (error && typeof error === 'object' && 'statusCode' in error) {
    const k8sError = error as {
      statusCode?: number
      body?: { message?: string; reason?: string }
      message?: string
    }

    const statusCode = k8sError.statusCode || 500
    const message = k8sError.body?.message || k8sError.message || 'Kubernetes API error'
    const reason = k8sError.body?.reason

    logger.error('Kubernetes API error', undefined, {
      statusCode,
      reason,
      message,
      error: k8sError,
    })

    return NextResponse.json(
      {
        error: message,
        code: 'K8S_API_ERROR',
        details: reason ? { reason } : undefined,
      },
      { status: statusCode }
    )
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    // Log error with stack trace
    logger.error('Unhandled error', error)

    // Don't expose internal error details in production
    const isDevelopment = process.env.NODE_ENV === 'development'

    return NextResponse.json(
      {
        error: isDevelopment ? error.message : 'Internal server error',
        code: 'INTERNAL_ERROR',
        details: isDevelopment ? { stack: error.stack } : undefined,
      },
      { status: 500 }
    )
  }

  // Handle unknown errors
  logger.error('Unknown error type', undefined, {
    errorType: typeof error,
    error: String(error),
  })

  return NextResponse.json(
    {
      error: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
    },
    { status: 500 }
  )
}

/**
 * Async error handler wrapper
 * Automatically catches errors and returns standardized responses
 *
 * @example
 * ```typescript
 * export const GET = withErrorHandler(async (request) => {
 *   const data = await fetchData()
 *   return NextResponse.json(data)
 * })
 * ```
 */
export function withErrorHandler<T extends unknown[]>(
  handler: (...args: T) => Promise<Response>
) {
  return async (...args: T): Promise<Response> => {
    try {
      return await handler(...args)
    } catch (error) {
      return handleApiError(error)
    }
  }
}

/**
 * Assert condition or throw error
 * Useful for precondition checks
 *
 * @example
 * ```typescript
 * assertExists(user, 'User', userId)
 * ```
 */
export function assertExists<T>(
  value: T | null | undefined,
  resource: string,
  identifier: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new NotFoundError(resource, identifier)
  }
}

/**
 * Assert authorized or throw error
 *
 * @example
 * ```typescript
 * assertAuthorized(hasPermission, 'You do not have permission to perform this action')
 * ```
 */
export function assertAuthorized(
  condition: boolean,
  message: string = 'Insufficient permissions'
): asserts condition {
  if (!condition) {
    throw new AuthorizationError(message)
  }
}

/**
 * Assert authenticated or throw error
 *
 * @example
 * ```typescript
 * assertAuthenticated(session?.user, 'Please login to continue')
 * ```
 */
export function assertAuthenticated(
  user: unknown,
  message: string = 'Authentication required'
): asserts user {
  if (!user) {
    throw new AuthenticationError(message)
  }
}

/**
 * Assert valid or throw validation error
 *
 * @example
 * ```typescript
 * assertValid(value.length > 0, 'Value cannot be empty')
 * ```
 */
export function assertValid(
  condition: boolean,
  message: string,
  details?: unknown
): asserts condition {
  if (!condition) {
    throw new ValidationError(message, details)
  }
}
