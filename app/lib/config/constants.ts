/**
 * Application Configuration Constants
 *
 * Centralized configuration for timeouts, intervals, cache TTLs, and retry logic.
 * All values can be overridden via environment variables.
 *
 * @module lib/config/constants
 */

/**
 * Get configuration value from environment or use default
 */
function getEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key]
  return value ? parseInt(value, 10) : defaultValue
}

function getEnvString(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue
}

/**
 * =============================================================================
 * KUBERNETES CLIENT CONFIGURATION
 * =============================================================================
 */

/**
 * K8s client cache TTL in milliseconds
 * Default: 5 minutes (300000ms)
 *
 * Context:
 * - AWS EKS tokens are valid for 15 minutes
 * - Cache TTL set to 5 minutes provides safety margin
 * - Reduces client initialization from 200-500ms to <50ms
 *
 * Environment: K8S_CLIENT_CACHE_TTL_MS
 */
export const K8S_CLIENT_CACHE_TTL_MS = getEnvNumber('K8S_CLIENT_CACHE_TTL_MS', 5 * 60 * 1000)

/**
 * K8s client cache cleanup interval in milliseconds
 * Default: 1 minute (60000ms)
 *
 * How often to check and remove expired cache entries
 *
 * Environment: K8S_CLIENT_CACHE_CLEANUP_INTERVAL_MS
 */
export const K8S_CLIENT_CACHE_CLEANUP_INTERVAL_MS = getEnvNumber('K8S_CLIENT_CACHE_CLEANUP_INTERVAL_MS', 60 * 1000)

/**
 * K8s API request timeout in milliseconds
 * Default: 30 seconds (30000ms)
 *
 * Environment: K8S_API_TIMEOUT_MS
 */
export const K8S_API_TIMEOUT_MS = getEnvNumber('K8S_API_TIMEOUT_MS', 30 * 1000)

/**
 * =============================================================================
 * RETRY LOGIC CONFIGURATION
 * =============================================================================
 */

/**
 * Maximum retry attempts for all operations
 * Default: 3 (1 initial + 2 retries)
 *
 * Environment: RETRY_MAX_ATTEMPTS
 */
export const RETRY_MAX_ATTEMPTS = getEnvNumber('RETRY_MAX_ATTEMPTS', 3)

/**
 * Initial delay before first retry in milliseconds
 * Default: 1000ms (1 second)
 *
 * Environment: RETRY_INITIAL_DELAY_MS
 */
export const RETRY_INITIAL_DELAY_MS = getEnvNumber('RETRY_INITIAL_DELAY_MS', 1000)

/**
 * Maximum delay between retries in milliseconds
 * Default: 10000ms (10 seconds)
 *
 * Environment: RETRY_MAX_DELAY_MS
 */
export const RETRY_MAX_DELAY_MS = getEnvNumber('RETRY_MAX_DELAY_MS', 10 * 1000)

/**
 * Exponential backoff multiplier
 * Default: 2 (doubles each retry)
 *
 * Example with multiplier=2, initial=1000ms:
 * - Attempt 1: 0ms (immediate)
 * - Attempt 2: 1000ms delay
 * - Attempt 3: 2000ms delay
 *
 * Environment: RETRY_BACKOFF_MULTIPLIER
 */
export const RETRY_BACKOFF_MULTIPLIER = getEnvNumber('RETRY_BACKOFF_MULTIPLIER', 2)

/**
 * K8s-specific retry configuration
 * More aggressive (shorter delays) for K8s API calls
 */
export const K8S_RETRY_MAX_DELAY_MS = getEnvNumber('K8S_RETRY_MAX_DELAY_MS', 5000) // 5s max
export const K8S_RETRY_MAX_ATTEMPTS = getEnvNumber('K8S_RETRY_MAX_ATTEMPTS', 3)
export const K8S_RETRY_INITIAL_DELAY_MS = getEnvNumber('K8S_RETRY_INITIAL_DELAY_MS', 1000)

/**
 * GitHub-specific retry configuration
 * More conservative (longer delays) for GitHub API rate limits
 */
export const GITHUB_RETRY_MAX_DELAY_MS = getEnvNumber('GITHUB_RETRY_MAX_DELAY_MS', 15000) // 15s max
export const GITHUB_RETRY_MAX_ATTEMPTS = getEnvNumber('GITHUB_RETRY_MAX_ATTEMPTS', 3)
export const GITHUB_RETRY_INITIAL_DELAY_MS = getEnvNumber('GITHUB_RETRY_INITIAL_DELAY_MS', 2000) // 2s initial

/**
 * HTTP status codes that should trigger retry
 * Standard transient failure codes
 */
export const RETRYABLE_HTTP_STATUS_CODES = [
  408, // Request Timeout
  429, // Too Many Requests
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504, // Gateway Timeout
] as const

/**
 * =============================================================================
 * REAL-TIME UPDATES (SSE) CONFIGURATION
 * =============================================================================
 */

/**
 * SSE heartbeat interval in milliseconds
 * Default: 30 seconds (30000ms)
 *
 * How often server sends heartbeat to keep connection alive
 *
 * Environment: SSE_HEARTBEAT_INTERVAL_MS
 */
export const SSE_HEARTBEAT_INTERVAL_MS = getEnvNumber('SSE_HEARTBEAT_INTERVAL_MS', 30 * 1000)

/**
 * SSE reconnection delay in milliseconds
 * Default: 3 seconds (3000ms)
 *
 * Delay before attempting to reconnect after connection loss
 *
 * Environment: SSE_RECONNECT_DELAY_MS
 */
export const SSE_RECONNECT_DELAY_MS = getEnvNumber('SSE_RECONNECT_DELAY_MS', 3000)

/**
 * SSE maximum reconnection attempts
 * Default: 5
 *
 * After this many failed reconnects, give up
 *
 * Environment: SSE_MAX_RECONNECT_ATTEMPTS
 */
export const SSE_MAX_RECONNECT_ATTEMPTS = getEnvNumber('SSE_MAX_RECONNECT_ATTEMPTS', 5)

/**
 * =============================================================================
 * AUTO-REFRESH CONFIGURATION
 * =============================================================================
 */

/**
 * Default auto-refresh interval in seconds
 * Default: 30 seconds
 *
 * User-configurable in settings, this is the default
 *
 * Environment: DEFAULT_AUTO_REFRESH_INTERVAL_SEC
 */
export const DEFAULT_AUTO_REFRESH_INTERVAL_SEC = getEnvNumber('DEFAULT_AUTO_REFRESH_INTERVAL_SEC', 30)

/**
 * Minimum allowed auto-refresh interval in seconds
 * Default: 5 seconds
 *
 * Prevents users from setting too aggressive refresh rates
 *
 * Environment: MIN_AUTO_REFRESH_INTERVAL_SEC
 */
export const MIN_AUTO_REFRESH_INTERVAL_SEC = getEnvNumber('MIN_AUTO_REFRESH_INTERVAL_SEC', 5)

/**
 * Maximum allowed auto-refresh interval in seconds
 * Default: 300 seconds (5 minutes)
 *
 * Environment: MAX_AUTO_REFRESH_INTERVAL_SEC
 */
export const MAX_AUTO_REFRESH_INTERVAL_SEC = getEnvNumber('MAX_AUTO_REFRESH_INTERVAL_SEC', 300)

/**
 * =============================================================================
 * GITHUB API CONFIGURATION
 * =============================================================================
 */

/**
 * GitHub API request timeout in milliseconds
 * Default: 30 seconds (30000ms)
 *
 * Environment: GITHUB_API_TIMEOUT_MS
 */
export const GITHUB_API_TIMEOUT_MS = getEnvNumber('GITHUB_API_TIMEOUT_MS', 30 * 1000)

/**
 * GitHub API base URL
 * Default: https://api.github.com
 *
 * Can be overridden for GitHub Enterprise
 *
 * Environment: GITHUB_API_BASE_URL
 */
export const GITHUB_API_BASE_URL = getEnvString('GITHUB_API_BASE_URL', 'https://api.github.com')

/**
 * =============================================================================
 * DATABASE CONFIGURATION
 * =============================================================================
 */

/**
 * Database query timeout in milliseconds
 * Default: 5 seconds (5000ms)
 *
 * Environment: DB_QUERY_TIMEOUT_MS
 */
export const DB_QUERY_TIMEOUT_MS = getEnvNumber('DB_QUERY_TIMEOUT_MS', 5000)

/**
 * Database connection pool size
 * Default: 1 (SQLite doesn't support connection pooling)
 *
 * Placeholder for future database migration
 *
 * Environment: DB_POOL_SIZE
 */
export const DB_POOL_SIZE = getEnvNumber('DB_POOL_SIZE', 1)

/**
 * =============================================================================
 * ENCRYPTION CONFIGURATION
 * =============================================================================
 */

/**
 * Encryption algorithm for API keys
 * Default: aes-256-gcm (authenticated encryption)
 *
 * IMPORTANT: Do not change this after encrypting data!
 *
 * Environment: ENCRYPTION_ALGORITHM
 */
export const ENCRYPTION_ALGORITHM = getEnvString('ENCRYPTION_ALGORITHM', 'aes-256-gcm')

/**
 * Encryption key length in bytes
 * Default: 32 bytes (256 bits)
 *
 * Environment: ENCRYPTION_KEY_LENGTH
 */
export const ENCRYPTION_KEY_LENGTH = getEnvNumber('ENCRYPTION_KEY_LENGTH', 32)

/**
 * =============================================================================
 * LOGGING CONFIGURATION
 * =============================================================================
 */

/**
 * Log level
 * Default: info
 * Options: trace, debug, info, warn, error, fatal
 *
 * Environment: LOG_LEVEL
 */
export const LOG_LEVEL = getEnvString('LOG_LEVEL', process.env.NODE_ENV === 'production' ? 'info' : 'debug')

/**
 * Enable pretty printing in development
 * Default: true in development, false in production
 *
 * Environment: LOG_PRETTY
 */
export const LOG_PRETTY = process.env.LOG_PRETTY === 'true' || process.env.NODE_ENV === 'development'

/**
 * =============================================================================
 * NOTIFICATION CONFIGURATION
 * =============================================================================
 */

/**
 * Desktop notification timeout in milliseconds
 * Default: 5 seconds (5000ms)
 *
 * How long notifications stay on screen
 *
 * Environment: NOTIFICATION_TIMEOUT_MS
 */
export const NOTIFICATION_TIMEOUT_MS = getEnvNumber('NOTIFICATION_TIMEOUT_MS', 5000)

/**
 * =============================================================================
 * PERFORMANCE THRESHOLDS
 * =============================================================================
 */

/**
 * Slow query threshold in milliseconds
 * Default: 1000ms (1 second)
 *
 * Log warning when queries exceed this duration
 *
 * Environment: SLOW_QUERY_THRESHOLD_MS
 */
export const SLOW_QUERY_THRESHOLD_MS = getEnvNumber('SLOW_QUERY_THRESHOLD_MS', 1000)

/**
 * Slow API request threshold in milliseconds
 * Default: 2000ms (2 seconds)
 *
 * Log warning when API requests exceed this duration
 *
 * Environment: SLOW_API_THRESHOLD_MS
 */
export const SLOW_API_THRESHOLD_MS = getEnvNumber('SLOW_API_THRESHOLD_MS', 2000)

/**
 * =============================================================================
 * FEATURE FLAGS
 * =============================================================================
 */

/**
 * Enable K8s client caching
 * Default: true
 *
 * Can be disabled for debugging
 *
 * Environment: ENABLE_K8S_CLIENT_CACHE
 */
export const ENABLE_K8S_CLIENT_CACHE = process.env.ENABLE_K8S_CLIENT_CACHE !== 'false'

/**
 * Enable retry logic
 * Default: true
 *
 * Can be disabled for debugging
 *
 * Environment: ENABLE_RETRY_LOGIC
 */
export const ENABLE_RETRY_LOGIC = process.env.ENABLE_RETRY_LOGIC !== 'false'

/**
 * Enable structured logging
 * Default: true
 *
 * Environment: ENABLE_STRUCTURED_LOGGING
 */
export const ENABLE_STRUCTURED_LOGGING = process.env.ENABLE_STRUCTURED_LOGGING !== 'false'

/**
 * =============================================================================
 * EXPORTED CONFIGURATION OBJECT
 * =============================================================================
 */

/**
 * Complete application configuration
 * All constants in one object for easy access
 */
export const APP_CONFIG = {
  // Kubernetes
  k8s: {
    clientCacheTTL: K8S_CLIENT_CACHE_TTL_MS,
    clientCacheCleanupInterval: K8S_CLIENT_CACHE_CLEANUP_INTERVAL_MS,
    apiTimeout: K8S_API_TIMEOUT_MS,
    retryMaxAttempts: K8S_RETRY_MAX_ATTEMPTS,
    retryInitialDelay: K8S_RETRY_INITIAL_DELAY_MS,
    retryMaxDelay: K8S_RETRY_MAX_DELAY_MS,
  },

  // GitHub
  github: {
    apiBaseUrl: GITHUB_API_BASE_URL,
    apiTimeout: GITHUB_API_TIMEOUT_MS,
    retryMaxAttempts: GITHUB_RETRY_MAX_ATTEMPTS,
    retryInitialDelay: GITHUB_RETRY_INITIAL_DELAY_MS,
    retryMaxDelay: GITHUB_RETRY_MAX_DELAY_MS,
  },

  // Retry
  retry: {
    maxAttempts: RETRY_MAX_ATTEMPTS,
    initialDelay: RETRY_INITIAL_DELAY_MS,
    maxDelay: RETRY_MAX_DELAY_MS,
    backoffMultiplier: RETRY_BACKOFF_MULTIPLIER,
    retryableStatusCodes: RETRYABLE_HTTP_STATUS_CODES,
  },

  // SSE
  sse: {
    heartbeatInterval: SSE_HEARTBEAT_INTERVAL_MS,
    reconnectDelay: SSE_RECONNECT_DELAY_MS,
    maxReconnectAttempts: SSE_MAX_RECONNECT_ATTEMPTS,
  },

  // Auto-refresh
  autoRefresh: {
    defaultInterval: DEFAULT_AUTO_REFRESH_INTERVAL_SEC,
    minInterval: MIN_AUTO_REFRESH_INTERVAL_SEC,
    maxInterval: MAX_AUTO_REFRESH_INTERVAL_SEC,
  },

  // Database
  database: {
    queryTimeout: DB_QUERY_TIMEOUT_MS,
    poolSize: DB_POOL_SIZE,
  },

  // Encryption
  encryption: {
    algorithm: ENCRYPTION_ALGORITHM,
    keyLength: ENCRYPTION_KEY_LENGTH,
  },

  // Logging
  logging: {
    level: LOG_LEVEL,
    pretty: LOG_PRETTY,
  },

  // Notifications
  notifications: {
    timeout: NOTIFICATION_TIMEOUT_MS,
  },

  // Performance
  performance: {
    slowQueryThreshold: SLOW_QUERY_THRESHOLD_MS,
    slowApiThreshold: SLOW_API_THRESHOLD_MS,
  },

  // Feature flags
  features: {
    k8sClientCache: ENABLE_K8S_CLIENT_CACHE,
    retryLogic: ENABLE_RETRY_LOGIC,
    structuredLogging: ENABLE_STRUCTURED_LOGGING,
  },
} as const

/**
 * Type-safe access to configuration
 */
export type AppConfig = typeof APP_CONFIG
