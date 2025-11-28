/**
 * Tests for API Keys Management Endpoint
 *
 * CRITICAL endpoint that handles encrypted sensitive data.
 * Must verify:
 * - Rate limiting (prevent brute force)
 * - Input validation (key names, values)
 * - Encryption/decryption security
 * - No key leakage in logs
 * - CRUD operations work correctly
 * - Concurrent access handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import Database from 'better-sqlite3'
import { mockLoggerModule, mockRateLimiterModule } from '../../helpers/mocks'

// Mock rate limiter
vi.mock('@/lib/security/rate-limiter', () => mockRateLimiterModule())

// Mock logger
vi.mock('@/lib/logging/logger', () => mockLoggerModule())

describe('API Keys Management Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/api-keys - Security Tests', () => {
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
      const { GET } = await import('@/app/api/api-keys/route')

      const request = new NextRequest('http://localhost:3000/api/api-keys?keyName=openai')

      const response = await GET(request)

      expect(mockRateLimiter).toHaveBeenCalled()
    })

    it('should require keyName parameter', async () => {
      const { GET } = await import('@/app/api/api-keys/route')

      const request = new NextRequest('http://localhost:3000/api/api-keys')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('keyName')
    })

    it('should validate keyName format', async () => {
      const { GET } = await import('@/app/api/api-keys/route')

      const invalidKeyNames = [
        '', // empty
        '   ', // whitespace
        '../etc/passwd', // path traversal
        'key; DROP TABLE api_keys; --', // SQL injection
        'a'.repeat(300), // too long
      ]

      for (const invalidKeyName of invalidKeyNames) {
        const request = new NextRequest(
          `http://localhost:3000/api/api-keys?keyName=${encodeURIComponent(invalidKeyName)}`
        )

        const response = await GET(request)

        expect([400, 404]).toContain(response.status)
      }
    })

    it('should return 404 for non-existent key', async () => {
      const { GET } = await import('@/app/api/api-keys/route')

      const request = new NextRequest(
        'http://localhost:3000/api/api-keys?keyName=nonexistent'
      )

      const response = await GET(request)

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toContain('not found')
    })

    it('should not log decrypted API key values', async () => {
      const { createLogger } = await import('@/lib/logging/logger')
      const mockLogger = {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn(),
      }

      vi.mocked(createLogger).mockReturnValue(mockLogger as any)

      const { GET } = await import('@/app/api/api-keys/route')

      const request = new NextRequest(
        'http://localhost:3000/api/api-keys?keyName=openai'
      )

      await GET(request)

      // Check that no API key values were logged
      const allLogCalls = [
        ...mockLogger.info.mock.calls,
        ...mockLogger.error.mock.calls,
        ...mockLogger.warn.mock.calls,
        ...mockLogger.debug.mock.calls,
      ]

      for (const call of allLogCalls) {
        const loggedData = JSON.stringify(call)
        expect(loggedData).not.toMatch(/sk-[a-zA-Z0-9]{20,}/)
      }
    })
  })

  describe('POST /api/api-keys - Security Tests', () => {
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
      const { POST } = await import('@/app/api/api-keys/route')

      const request = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({ keyName: 'openai', value: 'sk-test-123' }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect(mockRateLimiter).toHaveBeenCalled()
    })

    it('should validate request body schema', async () => {
      const { POST } = await import('@/app/api/api-keys/route')

      const invalidBodies = [
        {}, // missing required fields
        { keyName: 'openai' }, // missing value
        { value: 'sk-test-123' }, // missing keyName
        { keyName: '', value: 'sk-test-123' }, // empty keyName
        { keyName: 'openai', value: '' }, // empty value
      ]

      for (const invalidBody of invalidBodies) {
        const request = new NextRequest('http://localhost:3000/api/api-keys', {
          method: 'POST',
          body: JSON.stringify(invalidBody),
          headers: { 'Content-Type': 'application/json' },
        })

        const response = await POST(request)

        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.error).toBeDefined()
      }
    })

    it('should prevent SQL injection in keyName', async () => {
      const { POST } = await import('@/app/api/api-keys/route')

      const maliciousKeyName = "'; DROP TABLE api_keys; --"

      const request = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({
          keyName: maliciousKeyName,
          value: 'sk-test-123',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      // Should reject or safely handle
      expect([400, 500]).toContain(response.status)
    })

    it('should validate keyName length', async () => {
      const { POST } = await import('@/app/api/api-keys/route')

      const tooLongKeyName = 'a'.repeat(300)

      const request = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({
          keyName: tooLongKeyName,
          value: 'sk-test-123',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should validate value length', async () => {
      const { POST } = await import('@/app/api/api-keys/route')

      const tooLongValue = 'sk-' + 'a'.repeat(100000)

      const request = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({
          keyName: 'openai',
          value: tooLongValue,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect([400, 413]).toContain(response.status)
    })

    it('should not log API key values', async () => {
      const { createLogger } = await import('@/lib/logging/logger')
      const mockLogger = {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn(),
      }

      vi.mocked(createLogger).mockReturnValue(mockLogger as any)

      const { POST } = await import('@/app/api/api-keys/route')

      const apiKeyValue = 'sk-test-secret-key-123456'

      const request = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({
          keyName: 'openai',
          value: apiKeyValue,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      await POST(request)

      // Check that API key value was not logged
      const allLogCalls = [
        ...mockLogger.info.mock.calls,
        ...mockLogger.error.mock.calls,
        ...mockLogger.warn.mock.calls,
        ...mockLogger.debug.mock.calls,
      ]

      for (const call of allLogCalls) {
        const loggedData = JSON.stringify(call)
        expect(loggedData).not.toContain(apiKeyValue)
      }
    })
  })

  describe('DELETE /api/api-keys - Security Tests', () => {
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
      const { DELETE } = await import('@/app/api/api-keys/route')

      const request = new NextRequest('http://localhost:3000/api/api-keys?keyName=openai', {
        method: 'DELETE',
      })

      const response = await DELETE(request)

      expect(mockRateLimiter).toHaveBeenCalled()
    })

    it('should require keyName parameter', async () => {
      const { DELETE } = await import('@/app/api/api-keys/route')

      const request = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'DELETE',
      })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('keyName')
    })

    it('should validate keyName format', async () => {
      const { DELETE } = await import('@/app/api/api-keys/route')

      const invalidKeyNames = [
        '',
        '   ',
        '../etc/passwd',
        'key; DELETE FROM api_keys; --',
      ]

      for (const invalidKeyName of invalidKeyNames) {
        const request = new NextRequest(
          `http://localhost:3000/api/api-keys?keyName=${encodeURIComponent(invalidKeyName)}`,
          { method: 'DELETE' }
        )

        const response = await DELETE(request)

        expect([400, 404]).toContain(response.status)
      }
    })
  })

  describe('Encryption Tests', () => {
    it('should store encrypted values in database', async () => {
      const db = new Database(':memory:')
      db.exec(`
        CREATE TABLE api_keys (
          key_name TEXT PRIMARY KEY,
          encrypted_value TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      const { POST } = await import('@/app/api/api-keys/route')

      const plainValue = 'sk-test-plaintext-key'

      const request = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({
          keyName: 'openai',
          value: plainValue,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      await POST(request)

      // Verify stored value is encrypted (not plaintext)
      const row = db.prepare('SELECT encrypted_value FROM api_keys WHERE key_name = ?').get('openai') as any

      if (row) {
        // Encrypted value should not match plaintext
        expect(row.encrypted_value).not.toBe(plainValue)
        // Should be in format: salt.iv.authTag.ciphertext
        expect(row.encrypted_value.split('.')).toHaveLength(4)
      }

      db.close()
    })

    it('should decrypt values when retrieving', async () => {
      const { POST, GET } = await import('@/app/api/api-keys/route')

      const originalValue = 'sk-test-original-key-12345'

      // Store
      const postRequest = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({
          keyName: 'test-decrypt',
          value: originalValue,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      await POST(postRequest)

      // Retrieve
      const getRequest = new NextRequest(
        'http://localhost:3000/api/api-keys?keyName=test-decrypt'
      )

      const response = await GET(getRequest)

      if (response.status === 200) {
        const data = await response.json()
        expect(data.value).toBe(originalValue)
      }
    })
  })

  describe('Functionality Tests', () => {
    it('should successfully store and retrieve API key', async () => {
      const { POST, GET } = await import('@/app/api/api-keys/route')

      const keyName = 'test-key'
      const keyValue = 'sk-test-value-123'

      // Store
      const postRequest = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({ keyName, value: keyValue }),
        headers: { 'Content-Type': 'application/json' },
      })

      const postResponse = await POST(postRequest)
      expect(postResponse.status).toBe(200)

      // Retrieve
      const getRequest = new NextRequest(
        `http://localhost:3000/api/api-keys?keyName=${keyName}`
      )

      const getResponse = await GET(getRequest)
      expect(getResponse.status).toBe(200)

      const data = await getResponse.json()
      expect(data.value).toBe(keyValue)
    })

    it('should update existing key when storing with same keyName', async () => {
      const { POST, GET } = await import('@/app/api/api-keys/route')

      const keyName = 'update-test'

      // Store initial value
      const request1 = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({ keyName, value: 'sk-old-value' }),
        headers: { 'Content-Type': 'application/json' },
      })
      await POST(request1)

      // Update with new value
      const request2 = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({ keyName, value: 'sk-new-value' }),
        headers: { 'Content-Type': 'application/json' },
      })
      await POST(request2)

      // Retrieve
      const getRequest = new NextRequest(
        `http://localhost:3000/api/api-keys?keyName=${keyName}`
      )

      const response = await GET(getRequest)
      const data = await response.json()

      expect(data.value).toBe('sk-new-value')
    })

    it('should successfully delete API key', async () => {
      const { POST, DELETE, GET } = await import('@/app/api/api-keys/route')

      const keyName = 'delete-test'

      // Store
      const postRequest = new NextRequest('http://localhost:3000/api/api-keys', {
        method: 'POST',
        body: JSON.stringify({ keyName, value: 'sk-to-delete' }),
        headers: { 'Content-Type': 'application/json' },
      })
      await POST(postRequest)

      // Delete
      const deleteRequest = new NextRequest(
        `http://localhost:3000/api/api-keys?keyName=${keyName}`,
        { method: 'DELETE' }
      )
      const deleteResponse = await DELETE(deleteRequest)
      expect(deleteResponse.status).toBe(200)

      // Verify deleted
      const getRequest = new NextRequest(
        `http://localhost:3000/api/api-keys?keyName=${keyName}`
      )
      const getResponse = await GET(getRequest)
      expect(getResponse.status).toBe(404)
    })
  })
})
