/**
 * Retry Logic with Exponential Backoff
 *
 * Provides retry functionality for transient failures in API calls.
 * Uses exponential backoff to avoid thundering herd problem.
 *
 * @module lib/api/retry
 */

import { createLogger } from '@/lib/logging/logger'
import {
  RETRY_MAX_ATTEMPTS,
  RETRY_INITIAL_DELAY_MS,
  RETRY_MAX_DELAY_MS,
  RETRY_BACKOFF_MULTIPLIER,
  RETRYABLE_HTTP_STATUS_CODES,
  K8S_RETRY_MAX_ATTEMPTS,
  K8S_RETRY_INITIAL_DELAY_MS,
  K8S_RETRY_MAX_DELAY_MS,
  GITHUB_RETRY_MAX_ATTEMPTS,
  GITHUB_RETRY_INITIAL_DELAY_MS,
  GITHUB_RETRY_MAX_DELAY_MS,
} from '@/lib/config/constants'

const logger = createLogger({ module: 'api-retry' })

/**
 * Retry configuration
 */
export interface RetryConfig {
  /**
   * Maximum number of retry attempts (including initial call)
   * Default: 3
   */
  maxAttempts?: number

  /**
   * Initial delay in milliseconds before first retry
   * Default: 1000ms
   */
  initialDelayMs?: number

  /**
   * Maximum delay in milliseconds between retries
   * Default: 10000ms (10 seconds)
   */
  maxDelayMs?: number

  /**
   * Backoff multiplier (exponential growth factor)
   * Default: 2 (doubles each time)
   */
  backoffMultiplier?: number

  /**
   * HTTP status codes that should trigger a retry
   * Default: [408, 429, 500, 502, 503, 504]
   */
  retryableStatusCodes?: number[]

  /**
   * Function to determine if error is retryable
   * If provided, overrides retryableStatusCodes
   */
  isRetryable?: (error: unknown) => boolean

  /**
   * Callback invoked before each retry
   */
  onRetry?: (attempt: number, delay: number, error: unknown) => void
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: Required<Omit<RetryConfig, 'onRetry'>> = {
  maxAttempts: RETRY_MAX_ATTEMPTS,
  initialDelayMs: RETRY_INITIAL_DELAY_MS,
  maxDelayMs: RETRY_MAX_DELAY_MS,
  backoffMultiplier: RETRY_BACKOFF_MULTIPLIER,
  retryableStatusCodes: [...RETRYABLE_HTTP_STATUS_CODES],
  isRetryable: (error: unknown) => {
    // Check if error has status code
    if (typeof error === 'object' && error !== null) {
      const statusCode = (error as any).status || (error as any).statusCode
      if (typeof statusCode === 'number') {
        return DEFAULT_CONFIG.retryableStatusCodes.includes(statusCode)
      }

      // Check for network errors
      const message = (error as any).message || ''
      if (typeof message === 'string') {
        return (
          message.includes('ECONNRESET') ||
          message.includes('ETIMEDOUT') ||
          message.includes('ENOTFOUND') ||
          message.includes('ECONNREFUSED') ||
          message.includes('network')
        )
      }
    }
    return false
  }
}

/**
 * Calculate delay for next retry using exponential backoff
 */
function calculateDelay(
  attempt: number,
  initialDelay: number,
  maxDelay: number,
  multiplier: number
): number {
  const delay = initialDelay * Math.pow(multiplier, attempt - 1)
  return Math.min(delay, maxDelay)
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retry a function with exponential backoff
 *
 * @param fn - Async function to retry
 * @param config - Retry configuration
 * @returns Promise resolving to function result
 *
 * @example
 * ```typescript
 * const result = await retry(
 *   async () => {
 *     const response = await fetch('/api/data')
 *     if (!response.ok) throw new Error('API error')
 *     return response.json()
 *   },
 *   {
 *     maxAttempts: 3,
 *     initialDelayMs: 1000,
 *     onRetry: (attempt, delay) => {
 *       console.log(`Retry attempt ${attempt} after ${delay}ms`)
 *     }
 *   }
 * )
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const {
    maxAttempts = DEFAULT_CONFIG.maxAttempts,
    initialDelayMs = DEFAULT_CONFIG.initialDelayMs,
    maxDelayMs = DEFAULT_CONFIG.maxDelayMs,
    backoffMultiplier = DEFAULT_CONFIG.backoffMultiplier,
    isRetryable = DEFAULT_CONFIG.isRetryable,
    onRetry
  } = config

  let lastError: unknown

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await fn()

      // Log success if this was a retry
      if (attempt > 1) {
        logger.info(`Operation succeeded after ${attempt} attempts`)
      }

      return result
    } catch (error) {
      lastError = error

      // Check if we should retry
      const shouldRetry = isRetryable(error)
      const isLastAttempt = attempt >= maxAttempts

      if (!shouldRetry || isLastAttempt) {
        // Don't retry - throw the error
        if (isLastAttempt) {
          logger.warn(
            { error, attempts: attempt },
            `Operation failed after ${attempt} attempts`
          )
        }
        throw error
      }

      // Calculate delay for next retry
      const delay = calculateDelay(attempt, initialDelayMs, maxDelayMs, backoffMultiplier)

      // Log retry attempt
      logger.info(
        {
          attempt,
          maxAttempts,
          delay,
          error: error instanceof Error ? error.message : String(error)
        },
        'Retrying operation after transient failure'
      )

      // Call onRetry callback if provided
      if (onRetry) {
        onRetry(attempt, delay, error)
      }

      // Wait before retry
      await sleep(delay)
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError
}

/**
 * Create a retry wrapper for a function
 *
 * @param fn - Function to wrap with retry logic
 * @param config - Retry configuration
 * @returns Wrapped function with retry logic
 *
 * @example
 * ```typescript
 * const fetchWithRetry = withRetry(
 *   async (url: string) => {
 *     const response = await fetch(url)
 *     if (!response.ok) throw new Error('API error')
 *     return response.json()
 *   },
 *   { maxAttempts: 3 }
 * )
 *
 * const data = await fetchWithRetry('/api/data')
 * ```
 */
export function withRetry<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  config: RetryConfig = {}
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    return retry(() => fn(...args), config)
  }
}

/**
 * Retry for Kubernetes API calls
 * Pre-configured for K8s-specific errors
 */
export async function retryK8sOperation<T>(
  fn: () => Promise<T>,
  operationName: string
): Promise<T> {
  return retry(fn, {
    maxAttempts: K8S_RETRY_MAX_ATTEMPTS,
    initialDelayMs: K8S_RETRY_INITIAL_DELAY_MS,
    maxDelayMs: K8S_RETRY_MAX_DELAY_MS,
    isRetryable: (error: unknown) => {
      // Retry on network errors and specific K8s errors
      if (typeof error === 'object' && error !== null) {
        const statusCode = (error as any).statusCode || (error as any).status

        // Retry on these K8s API errors
        if (RETRYABLE_HTTP_STATUS_CODES.includes(statusCode)) {
          return true
        }

        // Retry on network errors
        const message = (error as any).message || ''
        if (
          message.includes('ECONNRESET') ||
          message.includes('ETIMEDOUT') ||
          message.includes('timeout')
        ) {
          return true
        }
      }
      return false
    },
    onRetry: (attempt, delay, error) => {
      logger.info(
        {
          operation: operationName,
          attempt,
          delay,
          error: error instanceof Error ? error.message : String(error)
        },
        'Retrying K8s operation'
      )
    }
  })
}

/**
 * Retry for GitHub API calls
 * Pre-configured for GitHub-specific rate limits and errors
 */
export async function retryGitHubOperation<T>(
  fn: () => Promise<T>,
  operationName: string
): Promise<T> {
  return retry(fn, {
    maxAttempts: GITHUB_RETRY_MAX_ATTEMPTS,
    initialDelayMs: GITHUB_RETRY_INITIAL_DELAY_MS,
    maxDelayMs: GITHUB_RETRY_MAX_DELAY_MS,
    isRetryable: (error: unknown) => {
      if (typeof error === 'object' && error !== null) {
        const statusCode = (error as any).status

        // Retry on rate limit (403) and service errors
        if ([403, ...RETRYABLE_HTTP_STATUS_CODES].includes(statusCode)) {
          return true
        }

        // GitHub sometimes returns 403 for rate limiting
        const message = (error as any).message || ''
        if (message.includes('rate limit') || message.includes('API rate limit')) {
          return true
        }
      }
      return false
    },
    onRetry: (attempt, delay, error) => {
      logger.info(
        {
          operation: operationName,
          attempt,
          delay,
          error: error instanceof Error ? error.message : String(error)
        },
        'Retrying GitHub operation'
      )
    }
  })
}
