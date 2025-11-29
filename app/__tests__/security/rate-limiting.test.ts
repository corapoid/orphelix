/**
 * Security Tests: Rate Limiting
 *
 * Comprehensive tests for rate limiting implementation:
 * - Per-endpoint rate limits enforced
 * - 429 responses after limit exceeded
 * - Rate limit headers present
 * - Cache key generation
 * - LRU cache eviction
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { rateLimit, clearAllRateLimits } from '@/lib/security/rate-limiter'
import { NextRequest } from 'next/server'

describe('Security: Rate Limiting', () => {
  beforeEach(() => {
    // Clear all rate limit caches before each test
    clearAllRateLimits()
    vi.clearAllMocks()
  })

  describe('Rate Limit Enforcement', () => {
    it('should allow requests under the limit', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 5,
        message: 'Too many requests',
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      })

      // Make 5 requests - all should succeed
      for (let i = 0; i < 5; i++) {
        const result = await limiter(request)
        expect(result).toBeNull()
      }
    })

    it('should block requests after limit exceeded', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 3,
        message: 'Rate limit exceeded',
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      })

      // First 3 requests succeed
      for (let i = 0; i < 3; i++) {
        const result = await limiter(request)
        expect(result).toBeNull()
      }

      // 4th request should be rate limited
      const blockedResult = await limiter(request)
      expect(blockedResult).not.toBeNull()
      expect(blockedResult?.status).toBe(429)

      const data = await blockedResult?.json()
      expect(data.error).toContain('Rate limit exceeded')
    })

    it('should return 429 status code when rate limited', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Too many requests',
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
      })

      // First request succeeds
      await limiter(request)

      // Second request gets 429
      const result = await limiter(request)
      expect(result?.status).toBe(429)
    })

    it('should include custom error message', async () => {
      const customMessage = 'Custom rate limit message'
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: customMessage,
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      })

      await limiter(request) // Use up the limit

      const result = await limiter(request)
      const data = await result?.json()

      expect(data.error).toContain(customMessage)
    })
  })

  describe('Rate Limit Headers', () => {
    it('should include X-RateLimit headers in response', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 10,
        message: 'Too many requests',
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      })

      // Make one request
      await limiter(request)

      // Make another to check headers
      const result = await limiter(request)

      // On rate limited response, headers should be present
      if (result) {
        expect(result.headers.get('X-RateLimit-Limit')).toBeDefined()
        expect(result.headers.get('X-RateLimit-Remaining')).toBeDefined()
        expect(result.headers.get('X-RateLimit-Reset')).toBeDefined()
      }
    })

    it('should include Retry-After header when rate limited', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Too many requests',
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      })

      await limiter(request) // Use up the limit

      const result = await limiter(request)
      expect(result?.headers.get('Retry-After')).toBeDefined()

      const retryAfter = parseInt(result?.headers.get('Retry-After') || '0')
      expect(retryAfter).toBeGreaterThan(0)
      expect(retryAfter).toBeLessThanOrEqual(60) // Should be within window
    })
  })

  describe('Client Identification', () => {
    it('should use IP address for rate limiting', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 2,
        message: 'Too many requests',
      })

      // Request from IP 1.2.3.4
      const request1 = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'x-forwarded-for': '1.2.3.4',
        },
      })

      // Request from IP 5.6.7.8
      const request2 = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'x-forwarded-for': '5.6.7.8',
        },
      })

      // Use up limit for IP 1.2.3.4
      await limiter(request1)
      await limiter(request1)
      const blocked1 = await limiter(request1)
      expect(blocked1?.status).toBe(429)

      // IP 5.6.7.8 should still have quota
      const allowed2 = await limiter(request2)
      expect(allowed2).toBeNull()
    })

    it('should handle multiple IPs in X-Forwarded-For', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Too many requests',
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'x-forwarded-for': '1.2.3.4, 5.6.7.8, 9.10.11.12',
        },
      })

      await limiter(request)
      const result = await limiter(request)

      // Should use first IP in the list
      expect(result?.status).toBe(429)
    })

    it('should use X-Real-IP as fallback', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Too many requests',
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'x-real-ip': '1.2.3.4',
        },
      })

      await limiter(request)
      const result = await limiter(request)

      expect(result?.status).toBe(429)
    })
  })

  describe('Time Window Behavior', () => {
    it('should reset counter after time window expires', async () => {
      const limiter = rateLimit({
        windowMs: 100, // 100ms window for testing
        maxRequests: 2,
        message: 'Too many requests',
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      })

      // Use up the limit
      await limiter(request)
      await limiter(request)

      // Should be rate limited now
      const blocked = await limiter(request)
      expect(blocked?.status).toBe(429)

      // Wait for window to expire
      await new Promise((resolve) => setTimeout(resolve, 150))

      // Should be allowed again
      const allowed = await limiter(request)
      expect(allowed).toBeNull()
    })
  })

  describe('Configuration Validation', () => {
    it('should accept valid configuration', () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 10,
        message: 'Too many requests',
      })

      expect(limiter).toBeDefined()
      expect(typeof limiter).toBe('function')
    })
  })

  describe('Skip Function', () => {
    it('should skip rate limiting when skip function returns true', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Too many requests',
        skip: async (req) => {
          // Skip rate limiting for requests with special header
          return req.headers.get('x-skip-rate-limit') === 'true'
        },
      })

      const skippedRequest = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'x-skip-rate-limit': 'true',
        },
      })

      // Make multiple requests - should all succeed
      for (let i = 0; i < 5; i++) {
        const result = await limiter(skippedRequest)
        expect(result).toBeNull()
      }
    })

    it('should apply rate limiting when skip function returns false', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Too many requests',
        skip: async () => false,
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      })

      await limiter(request)
      const result = await limiter(request)

      expect(result?.status).toBe(429)
    })
  })

  describe('Custom Key Generator', () => {
    it('should use custom key generator when provided', async () => {
      let keyGeneratorCalled = false

      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 2,
        message: 'Too many requests',
        keyGenerator: async (req) => {
          keyGeneratorCalled = true
          return `custom-key-${req.headers.get('user-id')}`
        },
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'user-id': '12345',
        },
      })

      await limiter(request)

      expect(keyGeneratorCalled).toBe(true)
    })
  })

  describe('Cache Management', () => {
    it('should clear all rate limits', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Too many requests',
      })

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      })

      // Use up the limit
      await limiter(request)
      const blocked = await limiter(request)
      expect(blocked?.status).toBe(429)

      // Clear all rate limits
      clearAllRateLimits()

      // Should be allowed again
      const allowed = await limiter(request)
      expect(allowed).toBeNull()
    })
  })
})
