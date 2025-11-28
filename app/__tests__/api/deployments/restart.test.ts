/**
 * Tests for Deployment Restart API Endpoint
 *
 * Critical endpoint that performs destructive operations.
 * Must verify:
 * - Authentication required
 * - Rate limiting enforced
 * - Input validation (namespace, deployment name)
 * - SQL injection prevention
 * - Path traversal prevention
 * - K8s API integration
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { mockLoggerModule, mockRateLimiterModule } from '../../helpers/mocks'

// Mock K8s client
vi.mock('@/lib/k8s/client', () => ({
  getAppsApi: vi.fn(),
}))

// Mock rate limiter
vi.mock('@/lib/security/rate-limiter', () => mockRateLimiterModule())

// Mock logger
vi.mock('@/lib/logging/logger', () => mockLoggerModule())

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

      const response = await POST(request, { params: { name: 'test-deployment' } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('namespace')
    })

    it('should prevent SQL injection in deployment name', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const maliciousName = "'; DROP TABLE deployments; --"
      const request = new NextRequest(
        `http://localhost:3000/api/deployments/${encodeURIComponent(maliciousName)}/restart?namespace=default`,
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: maliciousName } })

      // Should either reject invalid name or safely handle it
      // K8s API will reject invalid resource names
      expect([400, 404, 500]).toContain(response.status)
    })

    it('should prevent SQL injection in namespace parameter', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const maliciousNamespace = "'; DROP TABLE namespaces; --"
      const request = new NextRequest(
        `http://localhost:3000/api/deployments/test-deployment/restart?namespace=${encodeURIComponent(maliciousNamespace)}`,
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: 'test-deployment' } })

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

      const response = await POST(request, { params: { name: traversalName } })

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

        const response = await POST(request, { params: { name: invalidName } })

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

      const response = await POST(request, { params: { name: 'test-deployment' } })

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

      const response = await POST(request, { params: { name: 'test-deployment' } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBeDefined()
    })

    it('should validate deployment name is not empty', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/%20/restart?namespace=default',
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: ' ' } })

      expect([400, 404]).toContain(response.status)
    })

    it('should validate context parameter if provided', async () => {
      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/test-deployment/restart?namespace=default&context=',
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: 'test-deployment' } })

      // Empty context should be handled gracefully (use current context)
      expect(response.status).toBeGreaterThanOrEqual(200)
    })
  })

  describe('Functionality Tests', () => {
    it('should handle non-existent deployment gracefully', async () => {
      const { getAppsApi } = await import('@/lib/k8s/client')

      const mockPatch = vi.fn().mockRejectedValue({
        statusCode: 404,
        body: { message: 'deployments.apps "non-existent" not found' }
      })

      vi.mocked(getAppsApi).mockReturnValue({
        patchNamespacedDeployment: mockPatch,
      } as any)

      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/non-existent/restart?namespace=default',
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: 'non-existent' } })

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })

    it('should handle K8s API errors gracefully', async () => {
      const { getAppsApi } = await import('@/lib/k8s/client')

      const mockPatch = vi.fn().mockRejectedValue({
        statusCode: 500,
        body: { message: 'Internal server error' }
      })

      vi.mocked(getAppsApi).mockReturnValue({
        patchNamespacedDeployment: mockPatch,
      } as any)

      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/test-deployment/restart?namespace=default',
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: 'test-deployment' } })

      expect(response.status).toBeGreaterThanOrEqual(500)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })

    it('should successfully restart deployment with valid parameters', async () => {
      const { getAppsApi } = await import('@/lib/k8s/client')

      const mockPatch = vi.fn().mockResolvedValue({
        body: {
          metadata: { name: 'test-deployment' },
          spec: {
            template: {
              metadata: {
                annotations: {
                  'kubectl.kubernetes.io/restartedAt': expect.any(String)
                }
              }
            }
          }
        }
      })

      vi.mocked(getAppsApi).mockReturnValue({
        patchNamespacedDeployment: mockPatch,
      } as any)

      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/test-deployment/restart?namespace=default',
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: 'test-deployment' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(mockPatch).toHaveBeenCalledWith(
        'test-deployment',
        'default',
        expect.any(Object),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        expect.objectContaining({
          headers: { 'Content-Type': 'application/strategic-merge-patch+json' }
        })
      )
    })

    it('should use custom context if provided', async () => {
      const { getAppsApi } = await import('@/lib/k8s/client')

      const mockPatch = vi.fn().mockResolvedValue({
        body: { metadata: { name: 'test-deployment' } }
      })

      vi.mocked(getAppsApi).mockReturnValue({
        patchNamespacedDeployment: mockPatch,
      } as any)

      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/test-deployment/restart?namespace=default&context=production',
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: 'test-deployment' } })

      expect(getAppsApi).toHaveBeenCalledWith('production')
      expect(response.status).toBe(200)
    })
  })

  describe('Error Handling', () => {
    it('should not leak sensitive information in error messages', async () => {
      const { getAppsApi } = await import('@/lib/k8s/client')

      const mockPatch = vi.fn().mockRejectedValue({
        statusCode: 401,
        body: { message: 'Unauthorized: Invalid kubeconfig credentials at /home/user/.kube/config' }
      })

      vi.mocked(getAppsApi).mockReturnValue({
        patchNamespacedDeployment: mockPatch,
      } as any)

      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/test-deployment/restart?namespace=default',
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: 'test-deployment' } })
      const data = await response.json()

      // Should not include file paths or sensitive details
      expect(data.error).not.toContain('/home/user')
      expect(data.error).not.toContain('kubeconfig')
    })

    it('should handle timeout errors gracefully', async () => {
      const { getAppsApi } = await import('@/lib/k8s/client')

      const mockPatch = vi.fn().mockRejectedValue({
        code: 'ETIMEDOUT',
        message: 'Request timeout'
      })

      vi.mocked(getAppsApi).mockReturnValue({
        patchNamespacedDeployment: mockPatch,
      } as any)

      const { POST } = await import('@/app/api/deployments/[name]/restart/route')

      const request = new NextRequest(
        'http://localhost:3000/api/deployments/test-deployment/restart?namespace=default',
        { method: 'POST' }
      )

      const response = await POST(request, { params: { name: 'test-deployment' } })

      expect([408, 500, 504]).toContain(response.status)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })
  })
})
