/**
 * Shared Test Mocks
 *
 * Commonly used mocks for testing, to avoid duplication across test files.
 */

import { vi } from 'vitest'

/**
 * Mock logger instance with all log methods
 */
export const mockLogger = () => ({
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  trace: vi.fn(),
  fatal: vi.fn(),
  child: vi.fn().mockReturnThis(),
})

/**
 * Complete logger module mock with all exports
 * Use this in vi.mock('@/lib/logging/logger', () => mockLoggerModule())
 */
export const mockLoggerModule = () => ({
  createLogger: vi.fn(() => mockLogger()),
  createModuleLogger: vi.fn(() => mockLogger()),
  createApiLogger: vi.fn(() => mockLogger()),
  createK8sLogger: vi.fn(() => mockLogger()),
  createGitHubLogger: vi.fn(() => mockLogger()),
  createDbLogger: vi.fn(() => mockLogger()),
  baseLogger: mockLogger(),
  logger: mockLogger(),
  Logger: vi.fn().mockImplementation(() => mockLogger()),
})

/**
 * Mock rate limiter that allows all requests by default
 * Returns null (no rate limit) by default
 */
export const createMockRateLimiter = () => vi.fn().mockResolvedValue(null)

/**
 * Complete rate limiter module mock
 * Each call to rateLimit() returns a NEW mock function to avoid shared state
 */
export const mockRateLimiterModule = () => ({
  rateLimit: vi.fn(() => createMockRateLimiter()),
})
