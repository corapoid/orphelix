/**
 * Rate Limit Configurations
 *
 * Centralized configuration for all rate limits in the application.
 * Each endpoint type has its own configuration with appropriate limits.
 *
 * @module lib/security/rate-limit-configs
 */

import { RateLimitConfig } from './rate-limiter'

/**
 * Get configuration value from environment or use default
 */
function getEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key]
  return value ? parseInt(value, 10) : defaultValue
}

/**
 * Rate limit for deployment restart operations
 * Conservative limit to prevent accidental mass restarts
 */
export const DEPLOYMENT_RESTART_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_RESTART_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_RESTART_MAX', 10), // 10 restarts per minute
  message: 'Too many deployment restart requests. Please wait before trying again.',
}

/**
 * Rate limit for pod restart operations
 * Similar to deployment restart
 */
export const POD_RESTART_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_POD_RESTART_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_POD_RESTART_MAX', 10), // 10 restarts per minute
  message: 'Too many pod restart requests. Please wait before trying again.',
}

/**
 * Rate limit for AI troubleshooting queries
 * More restrictive due to external API costs
 */
export const AI_QUERY_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_AI_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_AI_MAX', 5), // 5 queries per minute
  message: 'Too many AI queries. Please wait before submitting another request.',
}

/**
 * Rate limit for GitHub PR creation
 * Prevent spam and accidental duplicate PRs
 */
export const GITHUB_PR_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_PR_WINDOW_MS', 5 * 60 * 1000), // 5 minutes
  maxRequests: getEnvNumber('RL_PR_MAX', 20), // 20 PRs per 5 minutes
  message: 'Too many pull request creations. Please wait before creating another PR.',
}

/**
 * Rate limit for GitHub PR merge operations
 */
export const GITHUB_MERGE_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_MERGE_WINDOW_MS', 5 * 60 * 1000), // 5 minutes
  maxRequests: getEnvNumber('RL_MERGE_MAX', 20), // 20 merges per 5 minutes
  message: 'Too many pull request merge requests. Please wait before trying again.',
}

/**
 * Rate limit for GitHub file operations (read/write)
 */
export const GITHUB_FILE_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_GITHUB_FILE_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_GITHUB_FILE_MAX', 60), // 60 operations per minute
  message: 'Too many GitHub file operations. Please slow down.',
}

/**
 * Rate limit for authentication attempts
 * Prevent brute force attacks
 */
export const AUTH_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_AUTH_WINDOW_MS', 15 * 60 * 1000), // 15 minutes
  maxRequests: getEnvNumber('RL_AUTH_MAX', 5), // 5 attempts per 15 minutes
  message: 'Too many authentication attempts. Please try again later.',
}

/**
 * Rate limit for general API endpoints
 * Broad limit for all other endpoints
 */
export const GENERAL_API_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_GENERAL_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_GENERAL_MAX', 100), // 100 requests per minute
  message: 'Too many requests. Please slow down.',
}

/**
 * Rate limit for settings update operations
 */
export const SETTINGS_UPDATE_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_SETTINGS_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_SETTINGS_MAX', 30), // 30 updates per minute
  message: 'Too many settings updates. Please wait before trying again.',
}

/**
 * Rate limit for Kubernetes resource list operations
 * Higher limit since these are read-only
 */
export const K8S_LIST_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_K8S_LIST_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_K8S_LIST_MAX', 120), // 120 requests per minute
  message: 'Too many Kubernetes API requests. Please slow down.',
}

/**
 * Rate limit for Kubernetes resource detail operations
 */
export const K8S_DETAIL_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_K8S_DETAIL_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_K8S_DETAIL_MAX', 60), // 60 requests per minute
  message: 'Too many Kubernetes detail requests. Please slow down.',
}

/**
 * Rate limit for log fetching
 * More conservative due to potential large payloads
 */
export const LOGS_FETCH_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_LOGS_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_LOGS_MAX', 30), // 30 requests per minute
  message: 'Too many log fetch requests. Please wait before trying again.',
}

/**
 * Export all configurations as a map for easy access
 */
export const RATE_LIMIT_CONFIGS = {
  DEPLOYMENT_RESTART: DEPLOYMENT_RESTART_LIMIT,
  POD_RESTART: POD_RESTART_LIMIT,
  AI_QUERY: AI_QUERY_LIMIT,
  GITHUB_PR: GITHUB_PR_LIMIT,
  GITHUB_MERGE: GITHUB_MERGE_LIMIT,
  GITHUB_FILE: GITHUB_FILE_LIMIT,
  AUTH: AUTH_LIMIT,
  GENERAL_API: GENERAL_API_LIMIT,
  SETTINGS_UPDATE: SETTINGS_UPDATE_LIMIT,
  K8S_LIST: K8S_LIST_LIMIT,
  K8S_DETAIL: K8S_DETAIL_LIMIT,
  LOGS_FETCH: LOGS_FETCH_LIMIT,
} as const

/**
 * Get rate limit configuration by name
 */
export function getRateLimitConfig(name: keyof typeof RATE_LIMIT_CONFIGS): RateLimitConfig {
  return RATE_LIMIT_CONFIGS[name]
}
