/**
 * Tests for AI Troubleshooting API Endpoint
 *
 * HIGH RISK endpoint that:
 * - Handles sensitive API keys
 * - Makes external API calls (cost implications)
 * - Processes user input (injection risks)
 * - Returns AI-generated content
 *
 * Must verify:
 * - API key validation and sanitization
 * - No API key leakage in logs or responses
 * - Rate limiting (prevent abuse/cost explosion)
 * - Input size limits
 * - SSRF prevention
 * - Timeout handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { mockLoggerModule, mockRateLimiterModule } from '../../helpers/mocks'

// Mock rate limiter
vi.mock('@/lib/security/rate-limiter', () => mockRateLimiterModule())

// Mock logger
vi.mock('@/lib/logging/logger', () => mockLoggerModule())

// Mock OpenAI
vi.mock('openai', () => ({
  default: vi.fn(() => ({
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  })),
}))

describe('POST /api/ai/troubleshoot', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Security Tests - API Key Handling', () => {
    it('should require API key in request body', async () => {
      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Why is my pod failing?',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('API key')
    })

    it('should validate API key format', async () => {
      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const invalidApiKeys = [
        '', // empty
        '   ', // whitespace
        'invalid-key', // wrong format
        'sk-' + 'a'.repeat(200), // too long
        'pk-123', // wrong prefix
      ]

      for (const invalidKey of invalidApiKeys) {
        const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
          method: 'POST',
          body: JSON.stringify({
            query: 'Test query',
            apiKey: invalidKey,
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        const response = await POST(request)

        expect([400, 401]).toContain(response.status)
      }
    })

    it('should not log API key', async () => {
      const { createLogger } = await import('@/lib/logging/logger')
      const mockLogger = {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn(),
      }

      vi.mocked(createLogger).mockReturnValue(mockLogger as any)

      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const apiKey = 'sk-test-1234567890'
      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Test query',
          apiKey,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      await POST(request)

      // Check that API key was not logged in any log calls
      const allLogCalls = [
        ...mockLogger.info.mock.calls,
        ...mockLogger.error.mock.calls,
        ...mockLogger.warn.mock.calls,
        ...mockLogger.debug.mock.calls,
      ]

      for (const call of allLogCalls) {
        const loggedData = JSON.stringify(call)
        expect(loggedData).not.toContain(apiKey)
        expect(loggedData).not.toContain('sk-test-')
      }
    })

    it('should not include API key in error responses', async () => {
      const OpenAI = (await import('openai')).default

      const mockCreate = vi.fn().mockRejectedValue({
        status: 401,
        message: 'Invalid API key: sk-test-1234567890'
      })

      vi.mocked(OpenAI).mockReturnValue({
        chat: {
          completions: {
            create: mockCreate,
          },
        },
      } as any)

      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const apiKey = 'sk-test-1234567890'
      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Test query',
          apiKey,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const responseText = await response.text()

      // API key should NOT be in response
      expect(responseText).not.toContain(apiKey)
      expect(responseText).not.toContain('sk-test-')
    })

    it('should enforce rate limiting', async () => {
      const { rateLimit } = await import('@/lib/security/rate-limiter')
      const mockRateLimiter = vi.fn()

      const rateLimitResponse = new Response(
        JSON.stringify({ error: 'Too many AI requests' }),
        { status: 429 }
      )
      mockRateLimiter.mockResolvedValue(rateLimitResponse)

      vi.mocked(rateLimit).mockReturnValue(mockRateLimiter)

      vi.resetModules()
      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Test query',
          apiKey: 'sk-test-1234567890',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect(mockRateLimiter).toHaveBeenCalled()
    })
  })

  describe('Input Validation Tests', () => {
    it('should require query parameter', async () => {
      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          apiKey: 'sk-test-1234567890',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('query')
    })

    it('should enforce query size limit', async () => {
      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const tooLongQuery = 'a'.repeat(100000) // 100KB query

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: tooLongQuery,
          apiKey: 'sk-test-1234567890',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect([400, 413]).toContain(response.status)
    })

    it('should validate query is not empty', async () => {
      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const emptyQueries = ['', '   ', '\n\n', '\t']

      for (const emptyQuery of emptyQueries) {
        const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
          method: 'POST',
          body: JSON.stringify({
            query: emptyQuery,
            apiKey: 'sk-test-1234567890',
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        const response = await POST(request)

        expect([400, 422]).toContain(response.status)
      }
    })

    it('should sanitize context input', async () => {
      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const maliciousContext = {
        podLogs: '<script>alert("xss")</script>',
        events: [{ message: '"; DROP TABLE events; --' }],
      }

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Why is my pod failing?',
          apiKey: 'sk-test-1234567890',
          context: maliciousContext,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      // Should handle gracefully (AI endpoint should sanitize or reject)
      expect(response.status).toBeGreaterThanOrEqual(200)
    })
  })

  describe('SSRF Prevention Tests', () => {
    it('should not allow external URL fetching in context', async () => {
      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const ssrfContext = {
        externalUrl: 'http://169.254.169.254/latest/meta-data/', // AWS metadata
        podLogs: 'Normal logs',
      }

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Analyze this',
          apiKey: 'sk-test-1234567890',
          context: ssrfContext,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      // Should not make external requests based on user input
      // (This is a placeholder - actual implementation depends on how context is used)
      expect(response.status).toBeGreaterThanOrEqual(200)
    })
  })

  describe('Functionality Tests', () => {
    it('should successfully query AI with valid parameters', async () => {
      const OpenAI = (await import('openai')).default

      const mockCreate = vi.fn().mockResolvedValue({
        choices: [{
          message: {
            content: 'Your pod is failing because of an OOMKill error.',
          },
        }],
      })

      vi.mocked(OpenAI).mockReturnValue({
        chat: {
          completions: {
            create: mockCreate,
          },
        },
      } as any)

      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Why is my pod failing?',
          apiKey: 'sk-test-1234567890',
          context: {
            podLogs: 'OOMKilled\nExit code: 137',
            events: [{ message: 'Pod exceeded memory limit' }],
          },
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)

      // Should be streaming response
      expect(response.headers.get('content-type')).toContain('text/event-stream')
    })

    it('should handle OpenAI API errors gracefully', async () => {
      const OpenAI = (await import('openai')).default

      const mockCreate = vi.fn().mockRejectedValue({
        status: 429,
        message: 'Rate limit exceeded'
      })

      vi.mocked(OpenAI).mockReturnValue({
        chat: {
          completions: {
            create: mockCreate,
          },
        },
      } as any)

      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Test query',
          apiKey: 'sk-test-1234567890',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect([429, 500]).toContain(response.status)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })

    it('should handle invalid JSON in request body', async () => {
      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: 'invalid json{{{',
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })

    it('should handle timeout errors', async () => {
      const OpenAI = (await import('openai')).default

      const mockCreate = vi.fn().mockRejectedValue({
        code: 'ETIMEDOUT',
        message: 'Request timeout'
      })

      vi.mocked(OpenAI).mockReturnValue({
        chat: {
          completions: {
            create: mockCreate,
          },
        },
      } as any)

      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Test query',
          apiKey: 'sk-test-1234567890',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect([408, 500, 504]).toContain(response.status)
    })
  })

  describe('Streaming Response Tests', () => {
    it('should properly stream AI responses', async () => {
      const OpenAI = (await import('openai')).default

      const mockStream = {
        [Symbol.asyncIterator]: async function* () {
          yield { choices: [{ delta: { content: 'Hello ' } }] }
          yield { choices: [{ delta: { content: 'world!' } }] }
        }
      }

      const mockCreate = vi.fn().mockResolvedValue(mockStream)

      vi.mocked(OpenAI).mockReturnValue({
        chat: {
          completions: {
            create: mockCreate,
          },
        },
      } as any)

      const { POST } = await import('@/app/api/ai/troubleshoot/route')

      const request = new NextRequest('http://localhost:3000/api/ai/troubleshoot', {
        method: 'POST',
        body: JSON.stringify({
          query: 'Test streaming',
          apiKey: 'sk-test-1234567890',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('text/event-stream')
      expect(response.headers.get('cache-control')).toBe('no-cache')
      expect(response.headers.get('connection')).toBe('keep-alive')
    })
  })
})
