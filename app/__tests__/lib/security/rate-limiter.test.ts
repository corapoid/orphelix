/**
 * Tests for Rate Limiter
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { rateLimit } from '@/lib/security/rate-limiter'
import { NextRequest } from 'next/server'

// Mock NextRequest helper
function createMockRequest(ip: string = '127.0.0.1'): NextRequest {
  return {
    ip,
    headers: new Headers({
      'x-forwarded-for': ip,
    }),
    nextUrl: new URL('http://localhost:3000/api/test'),
  } as unknown as NextRequest
}

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Clear any existing rate limit data between tests
    vi.clearAllMocks()
  })

  describe('basic rate limiting', () => {
    it('should allow requests within limit', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 5,
        message: 'Too many requests',
      })

      const request = createMockRequest()

      // First 5 requests should succeed
      for (let i = 0; i < 5; i++) {
        const result = await limiter(request)
        expect(result).toBeNull()
      }
    })

    it('should block requests exceeding limit', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 3,
        message: 'Rate limit exceeded',
      })

      const request = createMockRequest()

      // First 3 requests should succeed
      for (let i = 0; i < 3; i++) {
        const result = await limiter(request)
        expect(result).toBeNull()
      }

      // 4th request should be blocked
      const blocked = await limiter(request)
      expect(blocked).not.toBeNull()

      if (blocked) {
        expect(blocked.status).toBe(429)
        const body = await blocked.json()
        expect(body.error).toBe('Rate limit exceeded')
      }
    })

    it('should track different IPs separately', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 2,
        message: 'Too many requests',
      })

      const request1 = createMockRequest('192.168.1.1')
      const request2 = createMockRequest('192.168.1.2')

      // IP 1: 2 requests (at limit)
      expect(await limiter(request1)).toBeNull()
      expect(await limiter(request1)).toBeNull()

      // IP 2: should still have full quota
      expect(await limiter(request2)).toBeNull()
      expect(await limiter(request2)).toBeNull()

      // Both IPs should now be at limit
      expect(await limiter(request1)).not.toBeNull()
      expect(await limiter(request2)).not.toBeNull()
    })
  })

  describe('identifier extraction', () => {
    it('should use x-forwarded-for header if available', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Limit',
      })

      const request = {
        ip: '10.0.0.1',
        headers: new Headers({
          'x-forwarded-for': '203.0.113.1, 198.51.100.1',
        }),
        nextUrl: new URL('http://localhost:3000/api/test'),
      } as unknown as NextRequest

      await limiter(request)

      // Second request from same x-forwarded-for should be blocked
      const result = await limiter(request)
      expect(result).not.toBeNull()
    })

    it('should fallback to request.ip if no x-forwarded-for', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Limit',
      })

      const request = {
        ip: '10.0.0.1',
        headers: new Headers(),
        nextUrl: new URL('http://localhost:3000/api/test'),
      } as unknown as NextRequest

      await limiter(request)

      // Second request should be blocked
      const result = await limiter(request)
      expect(result).not.toBeNull()
    })

    it('should use unknown as fallback identifier', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: 'Limit',
      })

      const request = {
        headers: new Headers(),
        nextUrl: new URL('http://localhost:3000/api/test'),
      } as NextRequest

      await limiter(request)

      // Second request should be blocked
      const result = await limiter(request)
      expect(result).not.toBeNull()
    })
  })

  describe('window expiration', () => {
    it('should reset count after window expires', async () => {
      const limiter = rateLimit({
        windowMs: 100, // 100ms window for testing
        maxRequests: 2,
        message: 'Too many requests',
      })

      const request = createMockRequest()

      // Use up the limit
      expect(await limiter(request)).toBeNull()
      expect(await limiter(request)).toBeNull()
      expect(await limiter(request)).not.toBeNull() // Blocked

      // Wait for window to expire
      await new Promise(resolve => setTimeout(resolve, 150))

      // Should be allowed again
      expect(await limiter(request)).toBeNull()
    })
  })

  describe('sequential requests', () => {
    it('should handle sequential requests correctly', async () => {
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 5,
        message: 'Too many requests',
      })

      // Use unique IP to avoid interference from other tests
      const request = createMockRequest('192.168.99.99')

      // Send requests sequentially
      const results: (Response | null)[] = []
      for (let i = 0; i < 10; i++) {
        const result = await limiter(request)
        results.push(result)
      }

      // Exactly 5 should succeed (null), 5 should be blocked
      const allowed = results.filter(r => r === null)
      const blocked = results.filter(r => r !== null)

      expect(allowed.length).toBe(5)
      expect(blocked.length).toBe(5)
    })
  })

  describe('custom configuration', () => {
    it('should respect custom windowMs', async () => {
      const limiter = rateLimit({
        windowMs: 200,
        maxRequests: 1,
        message: 'Limit',
      })

      const request = createMockRequest()

      expect(await limiter(request)).toBeNull()
      expect(await limiter(request)).not.toBeNull()

      await new Promise(resolve => setTimeout(resolve, 250))

      expect(await limiter(request)).toBeNull()
    })

    it('should use custom error message', async () => {
      const customMessage = 'Custom rate limit message'
      const limiter = rateLimit({
        windowMs: 60000,
        maxRequests: 1,
        message: customMessage,
      })

      const request = createMockRequest()

      await limiter(request)
      const blocked = await limiter(request)

      if (blocked) {
        const body = await blocked.json()
        expect(body.error).toBe(customMessage)
      }
    })
  })
})
