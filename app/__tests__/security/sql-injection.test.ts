/**
 * Security Tests: SQL Injection Prevention
 *
 * Tests that input validation prevents SQL injection:
 * - Classic SQL injection payloads blocked by Zod schemas
 * - K8s name/namespace validation prevents injection
 * - API key field names validated
 * - All inputs validated before reaching database
 */

import { describe, it, expect } from 'vitest'
import {
  k8sNameSchema,
  namespaceSchema,
  apiKeyManagementSchema,
} from '@/lib/validation/schemas'

describe('Security: SQL Injection Prevention', () => {
  describe('Classic SQL Injection Payloads', () => {
    it('should block SQL injection via single quote in K8s names', () => {
      const payloads = [
        "'; DROP TABLE deployments; --",
        "pod'; DROP TABLE pods; --",
        "name'--",
      ]

      for (const payload of payloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })

    it('should block SQL injection via OR 1=1', () => {
      const payloads = [
        "' OR '1'='1",
        "admin' OR '1'='1'--",
        "' OR 1=1--",
      ]

      for (const payload of payloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })

    it('should block UNION SELECT injection', () => {
      const payloads = [
        "' UNION SELECT * FROM users--",
        "pod' UNION SELECT password FROM admins--",
      ]

      for (const payload of payloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })

    it('should block comment-based injection', () => {
      const payloads = [
        "admin'--",
        "name'/*comment*/",
        "pod'; --comment",
      ]

      for (const payload of payloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })

    it('should block stacked queries', () => {
      const payloads = [
        "name'; DELETE FROM pods WHERE '1'='1",
        "pod'; UPDATE deployments SET replicas=0; --",
      ]

      for (const payload of payloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })
  })

  describe('Namespace SQL Injection Prevention', () => {
    it('should block SQL injection in namespace parameter', () => {
      const payloads = [
        "'; DROP TABLE namespaces; --",
        "default' OR '1'='1",
        "ns' UNION SELECT * FROM secrets--",
      ]

      for (const payload of payloads) {
        const result = namespaceSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })

    it('should enforce strict namespace format', () => {
      const invalidInputs = [
        "default; DROP TABLE pods",
        "ns'--",
        "namespace' OR 1=1",
      ]

      for (const input of invalidInputs) {
        const result = namespaceSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })
  })

  describe('API Key Field Name Injection', () => {
    it('should block SQL injection in keyName', () => {
      const payloads = [
        "'; DROP TABLE api_keys; --",
        "keyName' OR '1'='1",
        "key'; DELETE FROM settings; --",
      ]

      for (const payload of payloads) {
        const result = apiKeyManagementSchema.safeParse({
          keyName: payload,
          value: 'sk-validkey123',
        })
        expect(result.success).toBe(false)
      }
    })

    it('should only accept safe keyNames', () => {
      const invalidKeyNames = [
        "key'; DROP TABLE",
        "key' OR '1'='1",
        "key/**/OR/**/1=1",
        "key/path/traversal",
      ]

      for (const keyName of invalidKeyNames) {
        const result = apiKeyManagementSchema.safeParse({
          keyName,
          value: 'sk-validkey123',
        })
        expect(result.success).toBe(false)
      }
    })
  })

  describe('Advanced SQL Injection Techniques', () => {
    it('should block case variation injection', () => {
      const payloads = [
        "' oR '1'='1",
        "' Or '1'='1",
        "' OR '1'='1",
        "' UnIoN SeLeCt",
      ]

      for (const payload of payloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })

    it('should block injection with inline comments', () => {
      const payloads = [
        "' /*comment*/ OR /*comment*/ '1'='1",
        "admin'/**/OR/**/1=1--",
      ]

      for (const payload of payloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })

    it('should block time-based blind injection', () => {
      const payloads = [
        "' OR SLEEP(5)--",
        "' OR pg_sleep(5)--",
        "' WAITFOR DELAY '00:00:05'--",
      ]

      for (const payload of payloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })
  })

  describe('Special Characters Blocking', () => {
    it('should block semicolons (statement separator)', () => {
      const inputs = [
        "name; DROP TABLE",
        "pod; DELETE FROM",
      ]

      for (const input of inputs) {
        const result = k8sNameSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })

    it('should block single quotes', () => {
      const inputs = [
        "name'test",
        "pod'--",
        "app'OR'1",
      ]

      for (const input of inputs) {
        const result = k8sNameSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })

    it('should block SQL comment attempts', () => {
      const inputs = [
        "name; --comment",
        "pod' --",
      ]

      for (const input of inputs) {
        const result = k8sNameSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })

    it('should block SQL comment syntax', () => {
      const inputs = [
        "name/*comment*/",
        "pod/**/OR",
      ]

      for (const input of inputs) {
        const result = k8sNameSchema.safeParse(input)
        expect(result.success).toBe(false)
      }
    })
  })

  describe('SQL Keywords Blocking', () => {
    it('should block common SQL keywords in uppercase', () => {
      const keywords = [
        'SELECT',
        'DROP',
        'DELETE',
        'INSERT',
        'UPDATE',
        'ALTER',
        'CREATE',
        'TABLE',
      ]

      for (const keyword of keywords) {
        const result = k8sNameSchema.safeParse(keyword)
        expect(result.success).toBe(false)
      }
    })

    it('should block SQL keywords with injection attempts', () => {
      const payloads = [
        "name OR SELECT",
        "pod UNION SELECT",
        "app DELETE FROM",
      ]

      for (const payload of payloads) {
        const result = k8sNameSchema.safeParse(payload)
        expect(result.success).toBe(false)
      }
    })
  })

  describe('Valid Inputs Should Pass', () => {
    it('should accept valid K8s names', () => {
      const validNames = [
        'my-deployment',
        'nginx-proxy',
        'app-v1',
        'service123',
      ]

      for (const name of validNames) {
        const result = k8sNameSchema.safeParse(name)
        expect(result.success).toBe(true)
      }
    })

    it('should accept valid namespaces', () => {
      const validNamespaces = [
        'default',
        'kube-system',
        'my-app',
        'production',
      ]

      for (const ns of validNamespaces) {
        const result = namespaceSchema.safeParse(ns)
        expect(result.success).toBe(true)
      }
    })

    it('should accept valid API key names', () => {
      const validKeyNames = [
        'openai',
        'github',
        'anthropic',
      ]

      for (const keyName of validKeyNames) {
        const result = apiKeyManagementSchema.safeParse({
          keyName,
          value: 'sk-validkey123',
        })
        expect(result.success).toBe(true)
      }
    })
  })
})
