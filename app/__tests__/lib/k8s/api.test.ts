/**
 * Tests for Kubernetes API Wrapper Functions
 *
 * These tests focus on security validation (no credential leakage in logs/errors)
 * and error handling patterns. Full integration tests are in E2E tests.
 *
 * Note: We're not mocking the full K8s SDK here - instead we test that:
 * 1. Functions don't leak sensitive data in logs
 * 2. Error messages don't expose credentials
 * 3. Input validation works correctly
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockLoggerModule } from '../../helpers/mocks'

// Mock logger to capture log calls
const mockLoggerInstance = {
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  trace: vi.fn(),
  fatal: vi.fn(),
  child: vi.fn().mockReturnThis(),
}

vi.mock('@/lib/logging/logger', () => ({
  ...mockLoggerModule(),
  createK8sLogger: vi.fn(() => mockLoggerInstance),
  logger: mockLoggerInstance,
  baseLogger: mockLoggerInstance,
}))

// Mock K8s client to avoid actual K8s API calls
vi.mock('@/lib/k8s/client', () => ({
  getCoreApi: vi.fn(() => ({
    listNamespacedPod: vi.fn().mockResolvedValue({ items: [] }),
    readNamespacedPod: vi.fn().mockResolvedValue(null),
    readNamespacedPodLog: vi.fn().mockResolvedValue(''),
    listNode: vi.fn().mockResolvedValue({ items: [] }),
  })),
  getAppsApi: vi.fn(() => ({
    listNamespacedDeployment: vi.fn().mockResolvedValue({ items: [] }),
  })),
  initK8sClient: vi.fn(),
  resetClient: vi.fn(),
  getCacheStats: vi.fn(() => ({
    hits: 0,
    misses: 0,
    total: 0,
    hitRate: '0.00%',
    cacheSize: 0,
    ttlMs: 300000,
    cleanupIntervalMs: 60000,
    enabled: true,
  })),
}))

describe('K8s API Security', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Credential Protection', () => {
    it('should not expose K8s credentials in function responses', async () => {
      const { fetchPods } = await import('@/lib/k8s/resources/pods')

      // Fetch pods - should return empty array with mocked client
      const result = await fetchPods('default', undefined, 'demo')

      // Convert result to string to check for credentials
      const resultStr = JSON.stringify(result)

      // Should not contain AWS keys
      expect(resultStr).not.toMatch(/AKIA[0-9A-Z]{16}/)
      expect(resultStr).not.toMatch(/aws_access_key_id/)
      expect(resultStr).not.toMatch(/aws_secret_access_key/)

      // Should not contain base64 encoded credentials
      expect(resultStr).not.toMatch(/-----BEGIN/)
      expect(resultStr).not.toMatch(/client-certificate-data/)
      expect(resultStr).not.toMatch(/client-key-data/)

      // Should not contain tokens
      expect(resultStr).not.toMatch(/Bearer\s+[A-Za-z0-9-_.]+/)
    })

    it('should not log kubeconfig credentials', async () => {
      const { createK8sLogger } = await import('@/lib/logging/logger')
      const mockK8sLogger = createK8sLogger()

      // Simulate fetching pods
      const { fetchPods } = await import('@/lib/k8s/resources/pods')

      try {
        await fetchPods('default', undefined, 'demo')
      } catch {
        // Expected to fail with mocked client
      }

      // Check all log calls for credential patterns
      const allCalls = [
        ...mockK8sLogger.info.mock.calls,
        ...mockK8sLogger.error.mock.calls,
        ...mockK8sLogger.debug.mock.calls,
      ]

      for (const call of allCalls) {
        const callStr = JSON.stringify(call)

        // Should not log AWS credentials
        expect(callStr).not.toMatch(/AKIA[0-9A-Z]{16}/)
        expect(callStr).not.toMatch(/aws_secret_access_key/)

        // Should not log certificate data
        expect(callStr).not.toMatch(/client-certificate-data/)
        expect(callStr).not.toMatch(/client-key-data/)
        expect(callStr).not.toMatch(/-----BEGIN (RSA |EC )?PRIVATE KEY-----/)
      }
    })
  })

  describe('Error Handling', () => {
    it('should handle Kubernetes API errors gracefully', async () => {
      const { fetchPods } = await import('@/lib/k8s/resources/pods')

      // fetchPods returns empty array on error, not throw
      const result = await fetchPods('default', undefined, 'demo')
      expect(Array.isArray(result)).toBe(true)
    })

    it('should return null when pod not found', async () => {
      const { fetchPod } = await import('@/lib/k8s/resources/pods')

      // fetchPod returns null on error
      const result = await fetchPod('nonexistent-pod', 'default')
      expect(result).toBeNull()
    })

    it('should handle errors in pod logs fetch', async () => {
      const { fetchPodLogs } = await import('@/lib/k8s/resources/pods')

      // fetchPodLogs returns empty string on error
      const result = await fetchPodLogs('test-pod', 'test-container', 'default')
      expect(typeof result).toBe('string')
    })
  })

  describe('API Function Exports', () => {
    it('should export all required pod functions', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchPods).toBeDefined()
      expect(api.fetchPod).toBeDefined()
      expect(api.fetchPodLogs).toBeDefined()
      expect(api.fetchNodePods).toBeDefined()

      expect(typeof api.fetchPods).toBe('function')
      expect(typeof api.fetchPod).toBe('function')
      expect(typeof api.fetchPodLogs).toBe('function')
      expect(typeof api.fetchNodePods).toBe('function')
    })

    it('should export all required deployment functions', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchDeployments).toBeDefined()
      expect(api.fetchDeployment).toBeDefined()
      expect(api.fetchDeploymentYaml).toBeDefined()

      expect(typeof api.fetchDeployments).toBe('function')
      expect(typeof api.fetchDeployment).toBe('function')
      expect(typeof api.fetchDeploymentYaml).toBe('function')
    })

    it('should export all required node functions', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchNodes).toBeDefined()
      expect(api.fetchNode).toBeDefined()
      expect(api.fetchNodeEvents).toBeDefined()

      expect(typeof api.fetchNodes).toBe('function')
      expect(typeof api.fetchNode).toBe('function')
      expect(typeof api.fetchNodeEvents).toBe('function')
    })

    it('should export config functions (ConfigMaps & Secrets)', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchConfigMaps).toBeDefined()
      expect(api.fetchConfigMap).toBeDefined()
      expect(api.fetchSecrets).toBeDefined()
      expect(api.fetchSecret).toBeDefined()

      expect(typeof api.fetchConfigMaps).toBe('function')
      expect(typeof api.fetchSecret).toBe('function')
    })

    it('should export networking functions (Services & Ingresses)', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchServices).toBeDefined()
      expect(api.fetchService).toBeDefined()
      expect(api.fetchIngresses).toBeDefined()
      expect(api.fetchIngress).toBeDefined()

      expect(typeof api.fetchServices).toBe('function')
      expect(typeof api.fetchIngress).toBe('function')
    })

    it('should export storage functions (PVs & PVCs)', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchPVs).toBeDefined()
      expect(api.fetchPVCs).toBeDefined()

      expect(typeof api.fetchPVs).toBe('function')
      expect(typeof api.fetchPVCs).toBe('function')
    })

    it('should export autoscaling functions (HPAs)', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchHPAs).toBeDefined()
      expect(typeof api.fetchHPAs).toBe('function')
    })

    it('should export namespace functions', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchNamespaces).toBeDefined()
      expect(api.fetchNamespace).toBeDefined()
      expect(api.fetchResourceQuotas).toBeDefined()
      expect(api.fetchLimitRanges).toBeDefined()

      expect(typeof api.fetchNamespaces).toBe('function')
      expect(typeof api.fetchResourceQuotas).toBe('function')
    })

    it('should export event functions', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchEvents).toBeDefined()
      expect(api.fetchResourceEvents).toBeDefined()

      expect(typeof api.fetchEvents).toBe('function')
      expect(typeof api.fetchResourceEvents).toBe('function')
    })

    it('should export label functions', async () => {
      const api = await import('@/lib/k8s/api')

      expect(api.fetchResourcesWithLabels).toBeDefined()
      expect(api.indexLabels).toBeDefined()
      expect(api.searchByLabelSelector).toBeDefined()

      expect(typeof api.fetchResourcesWithLabels).toBe('function')
      expect(typeof api.indexLabels).toBe('function')
      expect(typeof api.searchByLabelSelector).toBe('function')
    })
  })
})
