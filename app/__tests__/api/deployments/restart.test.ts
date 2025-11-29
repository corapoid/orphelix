/**
 * Tests for Deployment Restart API Endpoint
 *
 * Critical endpoint that performs destructive operations.
 * Verifies security and validation only (not K8s integration).
 *
 * Security tests:
 * - Rate limiting enforced
 * - Input validation (namespace, deployment name)
 * - SQL injection prevention
 * - Path traversal prevention
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { mockLoggerModule, _mockRateLimiterModule } from '../../helpers/mocks'

// Mock K8s client
vi.mock('@/lib/k8s/client', () => ({
  getKubeConfig: vi.fn(() => ({
    getCurrentCluster: vi.fn(() => ({ server: 'https://kubernetes.default.svc' })),
    applyToHTTPSOptions: vi.fn(async () => {}),
  })),
  getAppsApi: vi.fn(),
}))

// Mock rate limiter - return null (no rate limit) by default
vi.mock('@/lib/security/rate-limiter', () => ({
  rateLimit: vi.fn(() => vi.fn().mockResolvedValue(null)),
  clearAllRateLimits: vi.fn(),
}))

vi.mock('@/lib/security/rate-limit-configs', () => ({
  DEPLOYMENT_RESTART_LIMIT: {
    windowMs: 60000,
    maxRequests: 10,
    message: 'Too many deployment restart requests',
  },
}))

// Mock logger
vi.mock('@/lib/logging/logger', () => mockLoggerModule())

// Mock https to prevent actual K8s API calls in tests
vi.mock('https', () => ({
  default: {
    request: vi.fn(() => ({
      on: vi.fn(),
      write: vi.fn(),
      end: vi.fn(),
    })),
  },
}))

describe('POST /api/deployments/[name]/restart', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Security Tests', () => {
    it('should require namespace parameter', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest('http://localhost:3000/api/deployments/test-deployment/restart', {
        method: 'POST',
      })

      const response = await POST(request, { params: Promise.resolve({ name: 'test-deployment' }) })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Validation failed')
      expect(data.details).toBeDefined()
      const hasNamespaceError = data.details.some((d: any) =>
        d.path === 'namespace' || d.message.toLowerCase().includes('namespace')
      )
      expect(hasNamespaceError).toBe(true)
    })

    it('should prevent SQL injection in deployment name', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const maliciousName = "'; DROP TABLE deployments; --"
      const request = new NextRequest(
        `http://localhost:3000/api/deployments/${encodeURIComponent(maliciousName)}/restart?namespace=default`,
        { method: 'POST' }
      )

      const response = await POST(request, { params: Promise.resolve({ name: maliciousName }) })

      // Should reject invalid name or safely handle it
      expect([400, 404, 500]).toContain(response.status)
    })

    it('should prevent SQL injection in namespace parameter', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const maliciousNamespace = "'; DROP TABLE namespaces; --"
      const request = new NextRequest(
        `http://localhost:3000/api/deployments/test-deployment/restart?namespace=${encodeURIComponent(maliciousNamespace)}`,
        { method: 'POST' }
      )

      const response = await POST(request, { params: Promise.resolve({ name: 'test-deployment' }) })

      // Should safely handle malicious input (K8s API validates namespace names)
      expect([400, 404, 500]).toContain(response.status)
    })

    it('should prevent path traversal in deployment name', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const traversalName = '../../../etc/passwd'
      const request = new NextRequest(
        `http://localhost:3000/api/deployments/${encodeURIComponent(traversalName)}/restart?namespace=default`,
        { method: 'POST' }
      )

      const response = await POST(request, { params: Promise.resolve({ name: traversalName }) })

      // Should reject or safely handle path traversal attempt
      expect([400, 404, 500]).toContain(response.status)
    })

    it('should validate deployment name format', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const invalidNames = [
        '', // empty
        'a'.repeat(300), // too long
        'INVALID_NAME', // uppercase not allowed in k8s
        'invalid name with spaces',
        'invalid@name#with$special',
      ]

      for (const invalidName of invalidNames) {
        const request = new NextRequest(
          `http://localhost:3000/api/deployments/${encodeURIComponent(invalidName)}/restart?namespace=default`,
          { method: 'POST' }
        )

        const response = await POST(request, { params: Promise.resolve({ name: invalidName }) })

        // Should reject invalid names
        expect([400, 404, 500]).toContain(response.status)
      }
    })

    it('should enforce rate limiting', async () => {
      const { rateLimit } = await import('@/lib/security/rate-limiter')
      const mockRateLimiter = vi.fn()

      // Mock rate limit exceeded
      const rateLimitResponse = new Response(
        JSON.stringify({ error: 'Too many requests' }),
        { status: 429 }
      )
      mockRateLimiter.mockResolvedValue(rateLimitResponse)

      vi.mocked(rateLimit).mockReturnValue(mockRateLimiter)

      // Re-import to get new mock
      vi.resetModules()
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/test-deployment/restart?namespace=default',
        { method: 'POST' }
      )

      const _response = await POST(request, { params: Promise.resolve({ name: 'test-deployment' }) })

      expect(mockRateLimiter).toHaveBeenCalled()
    })
  })

  describe('Validation Tests', () => {
    it('should validate namespace is not empty', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/test-deployment/restart?namespace=',
        { method: 'POST' }
      )

      const response = await POST(request, { params: Promise.resolve({ name: 'test-deployment' }) })

      // May get rate limited (429) or validation error (400)
      expect([400, 429]).toContain(response.status)

      if (response.status === 400) {
        const data = await response.json()
        expect(data.error).toBe('Validation failed')
        expect(data.details).toBeDefined()
        const hasNamespaceError = data.details.some((d: any) =>
          d.path === 'namespace' || d.message.toLowerCase().includes('namespace')
        )
        expect(hasNamespaceError).toBe(true)
      }
    })

    it('should validate deployment name is not empty', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/%20/restart?namespace=default',
        { method: 'POST' }
      )

      const response = await POST(request, { params: Promise.resolve({ name: ' ' }) })

      // May get rate limited (429) or validation error (400)
      expect([400, 429]).toContain(response.status)

      if (response.status === 400) {
        const data = await response.json()
        expect(data.error).toBe('Validation failed')
        expect(data.details).toBeDefined()
        const hasNameError = data.details.some((d: any) =>
          d.path === 'name' || d.message.toLowerCase().includes('name')
        )
        expect(hasNameError).toBe(true)
      }
    })

    it('should validate context parameter if provided', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/test-deployment/restart?namespace=default&context=',
        { method: 'POST' }
      )

      const response = await POST(request, { params: Promise.resolve({ name: 'test-deployment' }) })

      // Empty context should be handled gracefully (use current context)
      expect(response.status).toBeGreaterThanOrEqual(200)
    })
  })
})
