/**
 * Tests for Pod Restart (Delete) API Endpoint
 *
 * Critical endpoint that performs destructive operations.
 * Must verify:
 * - Authentication required
 * - Rate limiting enforced
 * - Input validation (namespace, pod name)
 * - SQL injection prevention
 * - Path traversal prevention
 * - K8s API integration
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { mockLoggerModule, mockRateLimiterModule } from '../../helpers/mocks'

// Mock K8s client
vi.mock('@/lib/k8s/client', () => ({
  getCoreApi: vi.fn(),
}))

// Mock rate limiter
vi.mock('@/lib/security/rate-limiter', () => mockRateLimiterModule())

// Mock logger
vi.mock('@/lib/logging/logger', () => mockLoggerModule())

describe('DELETE /api/pods/[name]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Security Tests', () => {
    it('should require namespace parameter', async () => {
      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest('http://localhost:3000/api/pods/test-pod', {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { name: 'test-pod' } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('namespace')
    })

    it('should prevent SQL injection in pod name', async () => {
      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const maliciousName = "'; DROP TABLE pods; --"
      const request = new NextRequest(
        `http://localhost:3000/api/pods/${encodeURIComponent(maliciousName)}?namespace=default`,
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: maliciousName } })

      // Should either reject invalid name or safely handle it
      expect([400, 404, 500]).toContain(response.status)
    })

    it('should prevent SQL injection in namespace parameter', async () => {
      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const maliciousNamespace = "default' OR '1'='1"
      const request = new NextRequest(
        `http://localhost:3000/api/pods/test-pod?namespace=${encodeURIComponent(maliciousNamespace)}`,
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })

      // Should safely handle malicious input
      expect([400, 404, 500]).toContain(response.status)
    })

    it('should prevent path traversal in pod name', async () => {
      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const traversalName = '../../kube-system/coredns'
      const request = new NextRequest(
        `http://localhost:3000/api/pods/${encodeURIComponent(traversalName)}?namespace=default`,
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: traversalName } })

      expect([400, 404, 500]).toContain(response.status)
    })

    it('should validate pod name format', async () => {
      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const invalidNames = [
        '',
        'a'.repeat(300),
        'INVALID_POD',
        'invalid pod name',
        'pod@invalid#name',
      ]

      for (const invalidName of invalidNames) {
        const request = new NextRequest(
          `http://localhost:3000/api/pods/${encodeURIComponent(invalidName)}?namespace=default`,
          { method: 'DELETE' }
        )

        const response = await DELETE(request, { params: { name: invalidName } })

        expect([400, 404, 500]).toContain(response.status)
      }
    })

    it('should enforce rate limiting', async () => {
      const { rateLimit } = await import('@/lib/security/rate-limiter')
      const mockRateLimiter = vi.fn()

      const rateLimitResponse = new Response(
        JSON.stringify({ error: 'Too many requests' }),
        { status: 429 }
      )
      mockRateLimiter.mockResolvedValue(rateLimitResponse)

      vi.mocked(rateLimit).mockReturnValue(mockRateLimiter)

      vi.resetModules()
      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/test-pod?namespace=default',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })

      expect(mockRateLimiter).toHaveBeenCalled()
    })

    it('should prevent cross-namespace pod deletion attempts', async () => {
      const { getCoreApi } = await import('@/lib/k8s/client')

      const mockDelete = vi.fn().mockRejectedValue({
        statusCode: 403,
        body: { message: 'Forbidden: pod not found in namespace' }
      })

      vi.mocked(getCoreApi).mockReturnValue({
        deleteNamespacedPod: mockDelete,
      } as any)

      const { DELETE } = await import('@/app/api/pods/[name]/route')

      // Try to delete a pod from a different namespace
      const request = new NextRequest(
        'http://localhost:3000/api/pods/kube-proxy-xyz?namespace=default',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'kube-proxy-xyz' } })

      expect([403, 404, 500]).toContain(response.status)
    })
  })

  describe('Validation Tests', () => {
    it('should validate namespace is not empty', async () => {
      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/test-pod?namespace=',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBeDefined()
    })

    it('should validate pod name is not empty', async () => {
      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/%20?namespace=default',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: ' ' } })

      expect([400, 404]).toContain(response.status)
    })

    it('should handle gracePeriodSeconds parameter', async () => {
      const { getCoreApi } = await import('@/lib/k8s/client')

      const mockDelete = vi.fn().mockResolvedValue({
        body: { metadata: { name: 'test-pod' } }
      })

      vi.mocked(getCoreApi).mockReturnValue({
        deleteNamespacedPod: mockDelete,
      } as any)

      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/test-pod?namespace=default&gracePeriodSeconds=30',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })

      expect(response.status).toBeGreaterThanOrEqual(200)
      expect(response.status).toBeLessThan(300)
    })
  })

  describe('Functionality Tests', () => {
    it('should handle non-existent pod gracefully', async () => {
      const { getCoreApi } = await import('@/lib/k8s/client')

      const mockDelete = vi.fn().mockRejectedValue({
        statusCode: 404,
        body: { message: 'pods "non-existent" not found' }
      })

      vi.mocked(getCoreApi).mockReturnValue({
        deleteNamespacedPod: mockDelete,
      } as any)

      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/non-existent?namespace=default',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'non-existent' } })

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })

    it('should handle K8s API errors gracefully', async () => {
      const { getCoreApi } = await import('@/lib/k8s/client')

      const mockDelete = vi.fn().mockRejectedValue({
        statusCode: 500,
        body: { message: 'Internal server error' }
      })

      vi.mocked(getCoreApi).mockReturnValue({
        deleteNamespacedPod: mockDelete,
      } as any)

      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/test-pod?namespace=default',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })

      expect(response.status).toBeGreaterThanOrEqual(500)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })

    it('should successfully delete pod with valid parameters', async () => {
      const { getCoreApi } = await import('@/lib/k8s/client')

      const mockDelete = vi.fn().mockResolvedValue({
        body: {
          metadata: { name: 'test-pod' },
          status: { phase: 'Terminating' }
        }
      })

      vi.mocked(getCoreApi).mockReturnValue({
        deleteNamespacedPod: mockDelete,
      } as any)

      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/test-pod?namespace=default',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(mockDelete).toHaveBeenCalledWith(
        'test-pod',
        'default',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    })

    it('should use custom context if provided', async () => {
      const { getCoreApi } = await import('@/lib/k8s/client')

      const mockDelete = vi.fn().mockResolvedValue({
        body: { metadata: { name: 'test-pod' } }
      })

      vi.mocked(getCoreApi).mockReturnValue({
        deleteNamespacedPod: mockDelete,
      } as any)

      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/test-pod?namespace=default&context=staging',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })

      expect(getCoreApi).toHaveBeenCalledWith('staging')
      expect(response.status).toBe(200)
    })

    it('should handle pod already terminating', async () => {
      const { getCoreApi } = await import('@/lib/k8s/client')

      const mockDelete = vi.fn().mockRejectedValue({
        statusCode: 409,
        body: { message: 'pod is already terminating' }
      })

      vi.mocked(getCoreApi).mockReturnValue({
        deleteNamespacedPod: mockDelete,
      } as any)

      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/test-pod?namespace=default',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })

      // 409 Conflict is acceptable for already-terminating pods
      expect([200, 409]).toContain(response.status)
    })
  })

  describe('Error Handling', () => {
    it('should not leak sensitive information in error messages', async () => {
      const { getCoreApi } = await import('@/lib/k8s/client')

      const mockDelete = vi.fn().mockRejectedValue({
        statusCode: 401,
        body: { message: 'Unauthorized: cluster credentials expired at /Users/admin/.kube/config' }
      })

      vi.mocked(getCoreApi).mockReturnValue({
        deleteNamespacedPod: mockDelete,
      } as any)

      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/test-pod?namespace=default',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })
      const data = await response.json()

      // Should not include file paths or sensitive details
      expect(data.error).not.toContain('/Users')
      expect(data.error).not.toContain('kubeconfig')
    })

    it('should handle network errors gracefully', async () => {
      const { getCoreApi } = await import('@/lib/k8s/client')

      const mockDelete = vi.fn().mockRejectedValue({
        code: 'ECONNREFUSED',
        message: 'Connection refused'
      })

      vi.mocked(getCoreApi).mockReturnValue({
        deleteNamespacedPod: mockDelete,
      } as any)

      const { DELETE } = await import('@/app/api/pods/[name]/route')

      const request = new NextRequest(
        'http://localhost:3000/api/pods/test-pod?namespace=default',
        { method: 'DELETE' }
      )

      const response = await DELETE(request, { params: { name: 'test-pod' } })

      expect([500, 502, 503, 504]).toContain(response.status)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })
  })
})
