# Claude Code Security Agent Instructions

> **Universal Security Agent for Web Applications**
> Based on enterprise-grade security patterns from the Orphelix project.
> Use these instructions to systematically analyze and secure any web application.

## 🎯 Purpose

This document provides comprehensive, step-by-step instructions for Claude Code to:
1. **Analyze** web applications for security vulnerabilities
2. **Implement** enterprise-grade security patterns
3. **Test** security implementations comprehensively
4. **Document** security measures for production deployment

These patterns have been proven in production on the Orphelix Kubernetes management platform and are framework-agnostic.

---

## 📊 Security Implementation Phases

### Phase 1: Initial Security Audit
- Identify technology stack
- Map all API endpoints
- Calculate current security coverage
- Identify security gaps

### Phase 2: Core Security Infrastructure
- Implement rate limiting system
- Create input validation framework
- Build error handling system
- Set up structured logging

### Phase 3: Systematic Endpoint Hardening
- Secure all endpoints with rate limiting
- Add input validation to all endpoints
- Implement authentication/authorization
- Add error handling and logging

### Phase 4: Database Security
- Audit all database queries
- Verify parameterized statements (100%)
- Eliminate SQL injection vulnerabilities

### Phase 5: Advanced Security Features
- Implement API key/secret encryption
- Add security headers middleware
- Configure Content Security Policy

### Phase 6: Comprehensive Testing
- Create security test suite
- Test rate limiting
- Test input validation
- Test encryption

### Phase 7: Documentation & Deployment
- Create security report
- Document deployment checklist
- Create environment variable guide

---

## 🔍 Phase 1: Initial Security Audit

### Step 1.1: Technology Stack Analysis

**Prompt for Claude Code:**
```
Analyze the codebase and identify:

1. **Framework and version:**
   - Next.js (app router / pages router)
   - Express
   - Django
   - FastAPI
   - Ruby on Rails
   - Other

2. **Database technology:**
   - PostgreSQL
   - MySQL
   - MongoDB
   - SQLite
   - Redis
   - Other

3. **Authentication method:**
   - OAuth 2.0 (GitHub, Google, etc.)
   - JWT tokens
   - Session-based
   - API keys
   - None (public API)

4. **API architecture:**
   - REST
   - GraphQL
   - tRPC
   - WebSocket
   - Other

Search for key files:
- package.json / requirements.txt / go.mod / Gemfile
- Database client initialization
- Authentication configuration
- API route definitions

Create a summary document with findings.
```

**Example output:**
```markdown
## Technology Stack Analysis

**Framework:** Next.js 15 (App Router)
**Runtime:** Node.js 20+
**Database:** SQLite with better-sqlite3
**Authentication:** GitHub OAuth 2.0 with HTTP-only cookies
**API:** REST (Next.js API Routes)
**State Management:** TanStack Query
**Validation:** Zod (partial - needs expansion)
```

### Step 1.2: API Endpoint Mapping

**Prompt for Claude Code:**
```
Find and catalog ALL API endpoints in the application.

**For Next.js App Router:**
Search for files matching: app/**/route.ts, app/**/route.js
For each file, list all exported functions: GET, POST, PUT, PATCH, DELETE

**For Next.js Pages Router:**
Search for files matching: pages/api/**/*.ts, pages/api/**/*.js

**For Express:**
Search for: app.get(), app.post(), router.get(), etc.

**For Django:**
Search for: urlpatterns, @api_view decorators

For each endpoint found, create a table:

| Endpoint | Method | File Path | Purpose | Current Security | Risk Level |
|----------|--------|-----------|---------|------------------|------------|
| /api/users | GET | app/api/users/route.ts | List users | None | HIGH |
| /api/auth/login | POST | app/api/auth/login/route.ts | Login | Rate limiting | MEDIUM |

Risk levels:
- HIGH: No security measures
- MEDIUM: Partial security (1-2 measures)
- LOW: Good security (3+ measures)

Security measures to check:
- ✅ Rate limiting
- ✅ Input validation
- ✅ Authentication check
- ✅ Authorization check
- ✅ Error handling
- ✅ Logging

Calculate coverage:
- Endpoints with rate limiting: X/Total (%)
- Endpoints with validation: X/Total (%)
- Endpoints with auth: X/Total (%)
```

**Example output:**
```markdown
## API Endpoint Security Audit

**Total endpoints:** 77

| Endpoint | Method | Purpose | Rate Limit | Validation | Auth | Risk |
|----------|--------|---------|------------|------------|------|------|
| /api/k8s/pods | GET | List pods | ❌ | ❌ | ✅ | HIGH |
| /api/k8s/deployments | GET | List deployments | ❌ | ❌ | ✅ | HIGH |
| /api/github/repos | GET | List repos | ❌ | ✅ | ✅ | MEDIUM |
| /api/auth/login | POST | Login | ✅ | ✅ | N/A | LOW |

**Coverage:**
- Rate limiting: 15/77 (19%)
- Input validation: 30/77 (39%)
- Authentication: 65/77 (84%)
- Error handling: 20/77 (26%)

**Priority endpoints to secure:**
1. Authentication endpoints (prevent brute force)
2. Data mutation endpoints (prevent abuse)
3. Expensive operations (AI, file processing)
4. Public endpoints (no auth required)
```

### Step 1.3: Security Gap Analysis

**Prompt for Claude Code:**
```
Based on the endpoint audit, identify critical security gaps:

1. **Missing Rate Limiting:**
   - Which endpoints can be abused?
   - Which endpoints enable brute force attacks?

2. **Missing Input Validation:**
   - Which endpoints accept user input without validation?
   - Risk of injection attacks?

3. **Missing Authentication:**
   - Which endpoints should require auth but don't?

4. **Missing Error Handling:**
   - Which endpoints expose internal errors to users?
   - Risk of information disclosure?

5. **SQL Injection Risk:**
   - Are there any database queries with string concatenation?
   - Search for: `${}`, template literals in SQL

6. **XSS Risk:**
   - Are there any dangerouslySetInnerHTML usages?
   - Is user input rendered as HTML?

Create prioritized action plan:
1. Critical (fix immediately)
2. High (fix soon)
3. Medium (fix eventually)
4. Low (nice to have)
```

---

## 🏗️ Phase 2: Core Security Infrastructure

### Step 2.1: Rate Limiting System

**Create: `lib/security/rate-limit-configs.ts`**
```typescript
export interface RateLimitConfig {
  windowMs: number      // Time window in milliseconds
  maxRequests: number   // Max requests per window
  message: string       // Error message to user
}

/**
 * Helper to get rate limit from environment variables
 */
function getEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key]
  return value ? parseInt(value, 10) : defaultValue
}

// === Authentication & Authorization ===

/**
 * Strict limit for authentication endpoints
 * Prevents brute force attacks on login/password reset
 */
export const AUTH_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_AUTH_WINDOW_MS', 15 * 60 * 1000), // 15 minutes
  maxRequests: getEnvNumber('RL_AUTH_MAX', 5),
  message: 'Too many authentication attempts. Please try again later.',
}

// === Data Access (Read Operations) ===

/**
 * General limit for listing/reading resources
 * Balanced between usability and protection
 */
export const LIST_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_LIST_WINDOW_MS', 60 * 1000), // 1 minute
  maxRequests: getEnvNumber('RL_LIST_MAX', 120),
  message: 'Too many requests. Please slow down.',
}

/**
 * Limit for fetching individual resource details
 */
export const DETAIL_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_DETAIL_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_DETAIL_MAX', 60),
  message: 'Too many requests. Please slow down.',
}

// === Data Mutation (Write Operations) ===

/**
 * Stricter limit for creating/updating/deleting resources
 * Write operations are more expensive and riskier
 */
export const MUTATION_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_MUTATION_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_MUTATION_MAX', 30),
  message: 'Too many write operations. Please slow down.',
}

// === Expensive Operations ===

/**
 * Very strict limit for computationally expensive operations
 * Examples: AI queries, file processing, complex analytics
 */
export const EXPENSIVE_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_EXPENSIVE_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_EXPENSIVE_MAX', 10),
  message: 'Too many expensive operations. Please wait.',
}

/**
 * Extremely strict limit for AI/LLM queries
 * Cost-sensitive operations
 */
export const AI_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_AI_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_AI_MAX', 5),
  message: 'AI query limit reached. Please wait before trying again.',
}

// === File Operations ===

/**
 * Moderate limit for file access operations
 * Protects against file system abuse
 */
export const FILE_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_FILE_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_FILE_MAX', 60),
  message: 'Too many file operations. Please slow down.',
}

/**
 * Strict limit for file uploads
 * Upload operations are expensive (bandwidth, storage)
 */
export const UPLOAD_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_UPLOAD_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_UPLOAD_MAX', 10),
  message: 'Too many file uploads. Please wait.',
}

// === External API Calls ===

/**
 * Limit for external API proxying
 * Protects external services from abuse via your app
 */
export const EXTERNAL_API_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_EXTERNAL_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_EXTERNAL_MAX', 20),
  message: 'Too many external API requests. Please slow down.',
}

// === Settings & Configuration ===

/**
 * Moderate limit for settings updates
 * Balance between usability and preventing rapid changes
 */
export const SETTINGS_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_SETTINGS_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_SETTINGS_MAX', 30),
  message: 'Too many settings changes. Please slow down.',
}

// === General/Public Endpoints ===

/**
 * General limit for public endpoints
 * Less strict but still protective
 */
export const GENERAL_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_GENERAL_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_GENERAL_MAX', 100),
  message: 'Too many requests. Please try again later.',
}

// === Streaming Operations ===

/**
 * Very strict limit for long-running connections
 * SSE, WebSocket, streaming responses
 */
export const STREAM_LIMIT: RateLimitConfig = {
  windowMs: getEnvNumber('RL_STREAM_WINDOW_MS', 60 * 1000),
  maxRequests: getEnvNumber('RL_STREAM_MAX', 5),
  message: 'Too many stream connections. Please wait before opening another stream.',
}
```

**Create: `lib/security/rate-limiter.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { LRUCache } from 'lru-cache'
import type { RateLimitConfig } from './rate-limit-configs'

interface RateLimitEntry {
  count: number
  resetTime: number
}

/**
 * Create a rate limiter for an endpoint
 *
 * Uses LRU cache to store request counts per IP address
 * Returns null if request is allowed, or NextResponse with 429 if blocked
 *
 * @param config - Rate limit configuration
 * @returns Middleware function that checks rate limits
 *
 * @example
 * ```typescript
 * import { rateLimit } from '@/lib/security/rate-limiter'
 * import { AUTH_LIMIT } from '@/lib/security/rate-limit-configs'
 *
 * const limiter = rateLimit(AUTH_LIMIT)
 *
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await limiter(request)
 *   if (rateLimitResult) return rateLimitResult
 *
 *   // ... rest of endpoint logic
 * }
 * ```
 */
export function rateLimit(config: RateLimitConfig) {
  // Create LRU cache with automatic expiration
  const cache = new LRUCache<string, RateLimitEntry>({
    max: 10000, // Maximum number of entries
    ttl: config.windowMs, // Auto-expire after window
  })

  return async (request: NextRequest): Promise<NextResponse | null> => {
    // Get client identifier (IP address)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      '127.0.0.1'

    const identifier = `rate_limit:${ip}`
    const now = Date.now()

    const entry = cache.get(identifier)

    if (!entry) {
      // First request in this window
      cache.set(identifier, { count: 1, resetTime: now + config.windowMs })
      return null // Allow request
    }

    if (now > entry.resetTime) {
      // Window has expired, reset counter
      cache.set(identifier, { count: 1, resetTime: now + config.windowMs })
      return null // Allow request
    }

    if (entry.count >= config.maxRequests) {
      // Rate limit exceeded
      const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000)

      return NextResponse.json(
        { error: config.message },
        {
          status: 429,
          headers: {
            'Retry-After': resetInSeconds.toString(),
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': entry.resetTime.toString(),
          },
        }
      )
    }

    // Increment counter and allow request
    entry.count++
    cache.set(identifier, entry)
    return null // Allow request
  }
}
```

**Installation:**
```bash
npm install lru-cache
npm install --save-dev @types/lru-cache
```

### Step 2.2: Input Validation System

**Create: `lib/validation/schemas.ts`**
```typescript
import { z } from 'zod'

// ===========================
// Common Validation Patterns
// ===========================

/**
 * Email validation
 */
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .toLowerCase()

/**
 * URL validation
 */
export const urlSchema = z.string().url('Invalid URL')

/**
 * UUID validation
 */
export const uuidSchema = z.string().uuid('Invalid UUID format')

/**
 * ID validation (alphanumeric with hyphens/underscores)
 * Prevents path traversal and injection
 */
export const idSchema = z
  .string()
  .regex(/^[a-zA-Z0-9_-]+$/, 'ID must contain only letters, numbers, hyphens, and underscores')
  .min(1, 'ID is required')
  .max(100, 'ID must be at most 100 characters')

/**
 * Slug validation (URL-friendly identifiers)
 */
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens')
  .min(1, 'Slug is required')
  .max(100, 'Slug must be at most 100 characters')

// ===========================
// Kubernetes-Specific (DNS-1123)
// ===========================

/**
 * Kubernetes resource name validation (DNS-1123 compliant)
 * Used for: pods, deployments, services, namespaces, etc.
 *
 * Rules:
 * - Lowercase alphanumeric characters or hyphens
 * - Must start with alphanumeric
 * - Must end with alphanumeric
 * - Max 253 characters
 */
export const k8sNameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(253, 'Name must be at most 253 characters')
  .regex(
    /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/,
    'Name must be lowercase alphanumeric with hyphens, starting and ending with alphanumeric'
  )

export const k8sNamespaceSchema = k8sNameSchema

/**
 * Kubernetes label key validation
 */
export const k8sLabelKeySchema = z
  .string()
  .max(63, 'Label key must be at most 63 characters')
  .regex(/^[a-z0-9A-Z]([-_./a-z0-9A-Z]*[a-z0-9A-Z])?$/, 'Invalid label key format')

/**
 * Kubernetes label value validation
 */
export const k8sLabelValueSchema = z
  .string()
  .max(63, 'Label value must be at most 63 characters')
  .regex(/^[a-z0-9A-Z]([-_.a-z0-9A-Z]*[a-z0-9A-Z])?$/, 'Invalid label value format')

// ===========================
// GitHub-Specific
// ===========================

/**
 * GitHub owner/organization name
 */
export const githubOwnerSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/, 'Invalid GitHub owner name')
  .min(1)
  .max(39)

/**
 * GitHub repository name
 */
export const githubRepoSchema = z
  .string()
  .regex(/^[a-zA-Z0-9._-]+$/, 'Invalid GitHub repository name')
  .min(1)
  .max(100)

/**
 * GitHub branch/ref name
 */
export const githubRefSchema = z
  .string()
  .regex(/^[a-zA-Z0-9._/-]+$/, 'Invalid Git ref name')
  .min(1)
  .max(255)

/**
 * GitHub file path
 */
export const githubPathSchema = z
  .string()
  .regex(/^[a-zA-Z0-9._/-]+$/, 'Invalid file path')
  .min(1)
  .max(1000)

// ===========================
// Pagination & Sorting
// ===========================

/**
 * Pagination parameters
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

/**
 * Sort order
 */
export const sortOrderSchema = z.enum(['asc', 'desc']).default('asc')

/**
 * Generic sort parameters
 */
export function createSortSchema<T extends string>(fields: readonly T[]) {
  return z.object({
    sortBy: z.enum(fields as [T, ...T[]]).optional(),
    sortOrder: sortOrderSchema,
  })
}

// ===========================
// Date/Time
// ===========================

/**
 * ISO 8601 date string validation
 */
export const isoDateSchema = z.string().datetime('Invalid ISO date format')

/**
 * Unix timestamp (seconds)
 */
export const unixTimestampSchema = z.coerce.number().int().min(0)

// ===========================
// Text Content
// ===========================

/**
 * Short text (names, titles)
 */
export const shortTextSchema = z
  .string()
  .min(1, 'Field is required')
  .max(255, 'Field must be at most 255 characters')
  .trim()

/**
 * Long text (descriptions, comments)
 */
export const longTextSchema = z
  .string()
  .min(1, 'Field is required')
  .max(10000, 'Field must be at most 10000 characters')
  .trim()

/**
 * Optional text field
 */
export const optionalTextSchema = z
  .string()
  .max(1000, 'Field must be at most 1000 characters')
  .trim()
  .optional()

// ===========================
// Example: Endpoint-Specific Schema
// ===========================

/**
 * Example: User creation schema
 */
export const createUserSchema = z.object({
  email: emailSchema,
  name: shortTextSchema,
  role: z.enum(['admin', 'user', 'viewer']).default('user'),
  active: z.boolean().default(true),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

/**
 * Example: Resource query schema
 */
export const resourceQuerySchema = z.object({
  namespace: k8sNamespaceSchema.optional(),
  labelSelector: z.string().optional(),
  fieldSelector: z.string().optional(),
  ...paginationSchema.shape,
})

export type ResourceQueryInput = z.infer<typeof resourceQuerySchema>
```

**Installation:**
```bash
npm install zod
```

### Step 2.3: Error Handling System

**Create: `lib/api/errors.ts`**
```typescript
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { logger } from '@/lib/logger'

// ===========================
// Custom Error Classes
// ===========================

/**
 * Validation error (400)
 * Used when input validation fails
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Authentication error (401)
 * Used when user is not authenticated
 */
export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication required') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

/**
 * Authorization error (403)
 * Used when user lacks permission
 */
export class AuthorizationError extends Error {
  constructor(message: string = 'Access denied') {
    super(message)
    this.name = 'AuthorizationError'
  }
}

/**
 * Not found error (404)
 * Used when resource doesn't exist
 */
export class NotFoundError extends Error {
  constructor(message: string = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
  }
}

/**
 * Conflict error (409)
 * Used when operation conflicts with current state
 */
export class ConflictError extends Error {
  constructor(message: string = 'Resource conflict') {
    super(message)
    this.name = 'ConflictError'
  }
}

/**
 * Rate limit error (429)
 * Used when rate limit is exceeded
 */
export class RateLimitError extends Error {
  constructor(message: string = 'Rate limit exceeded') {
    super(message)
    this.name = 'RateLimitError'
  }
}

/**
 * External service error (502)
 * Used when external API fails
 */
export class ExternalServiceError extends Error {
  constructor(
    message: string = 'External service error',
    public service?: string
  ) {
    super(message)
    this.name = 'ExternalServiceError'
  }
}

// ===========================
// Centralized Error Handler
// ===========================

/**
 * Handle API errors with appropriate status codes and logging
 *
 * Features:
 * - Prevents information disclosure (no stack traces in production)
 * - Logs all errors with context
 * - Returns user-friendly error messages
 * - Includes error details for debugging (in development only)
 *
 * @param error - Error object (unknown type for safety)
 * @returns NextResponse with appropriate status code and error message
 *
 * @example
 * ```typescript
 * export async function GET(request: NextRequest) {
 *   try {
 *     const data = await fetchData()
 *     return NextResponse.json(data)
 *   } catch (error) {
 *     return handleApiError(error)
 *   }
 * }
 * ```
 */
export function handleApiError(error: unknown): NextResponse {
  const isDevelopment = process.env.NODE_ENV === 'development'

  // ===========================
  // Zod Validation Errors
  // ===========================
  if (error instanceof ZodError) {
    const details = error.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }))

    logger.warn({ type: 'validation_error', details }, 'Validation failed')

    return NextResponse.json(
      {
        error: 'Validation failed',
        details,
      },
      { status: 400 }
    )
  }

  // ===========================
  // Custom Error Classes
  // ===========================
  if (error instanceof ValidationError) {
    logger.warn({ error: error.message, details: error.details }, 'Validation error')
    return NextResponse.json(
      { error: error.message, details: error.details },
      { status: 400 }
    )
  }

  if (error instanceof AuthenticationError) {
    logger.warn({ error: error.message }, 'Authentication failed')
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  if (error instanceof AuthorizationError) {
    logger.warn({ error: error.message }, 'Authorization failed')
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  if (error instanceof NotFoundError) {
    logger.info({ error: error.message }, 'Resource not found')
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  if (error instanceof ConflictError) {
    logger.warn({ error: error.message }, 'Resource conflict')
    return NextResponse.json({ error: error.message }, { status: 409 })
  }

  if (error instanceof RateLimitError) {
    logger.warn({ error: error.message }, 'Rate limit exceeded')
    return NextResponse.json({ error: error.message }, { status: 429 })
  }

  if (error instanceof ExternalServiceError) {
    logger.error({ error: error.message, service: error.service }, 'External service failed')
    return NextResponse.json(
      { error: error.message, service: error.service },
      { status: 502 }
    )
  }

  // ===========================
  // Generic Error Handling
  // ===========================
  if (error instanceof Error) {
    // Log full error details
    logger.error({ error: error.message, stack: error.stack }, 'Internal server error')

    // In development: include error message for debugging
    if (isDevelopment) {
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: error.message,
          stack: error.stack,
        },
        { status: 500 }
      )
    }

    // In production: generic message only (prevent information disclosure)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  // ===========================
  // Unknown Error Type
  // ===========================
  logger.error({ error }, 'Unknown error type')
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

/**
 * Assert that a condition is true, throw error if not
 * Useful for precondition checks
 */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new ValidationError(message)
  }
}
```

### Step 2.4: Structured Logging System

**Create: `lib/logger.ts`**
```typescript
import pino from 'pino'

/**
 * Structured logger using Pino
 *
 * Features:
 * - JSON formatted logs (easy to parse/aggregate)
 * - Automatic redaction of sensitive fields
 * - Pretty printing in development
 * - Performance optimized
 * - Child loggers for context
 *
 * @example Basic usage
 * ```typescript
 * import { logger } from '@/lib/logger'
 *
 * logger.info('Server started on port 3000')
 * logger.error({ error: err, userId: 123 }, 'Failed to process request')
 * logger.warn({ ip: '1.2.3.4' }, 'Suspicious activity detected')
 * ```
 *
 * @example Child logger with context
 * ```typescript
 * const reqLogger = logger.child({ requestId: '123', userId: 'user-456' })
 * reqLogger.info('Processing request')
 * reqLogger.error({ error: err }, 'Request failed')
 * ```
 */
export const logger = pino({
  // Log level from environment variable
  level: process.env.LOG_LEVEL || 'info',

  // Pretty print in development for better readability
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        }
      : undefined,

  // Add context fields to every log
  base: {
    env: process.env.NODE_ENV || 'development',
    service: process.env.SERVICE_NAME || 'app',
  },

  // Redact sensitive fields from logs
  // These fields will be replaced with [Redacted] in logs
  redact: {
    paths: [
      // Generic sensitive fields
      'password',
      'token',
      'apiKey',
      'secret',
      'authorization',
      'cookie',
      'session',

      // Nested sensitive fields
      '*.password',
      '*.token',
      '*.apiKey',
      '*.secret',
      '*.authorization',

      // HTTP headers
      'headers.authorization',
      'headers.cookie',
      'headers["x-api-key"]',

      // Request/response bodies
      'req.headers.authorization',
      'req.headers.cookie',
      'res.headers["set-cookie"]',
    ],
    remove: true, // Remove redacted fields entirely
  },

  // Timestamp format (ISO 8601)
  timestamp: pino.stdTimeFunctions.isoTime,

  // Serializers for common objects
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
})

/**
 * Create a child logger with additional context
 *
 * @example
 * ```typescript
 * const userLogger = createLogger({ userId: '123', action: 'login' })
 * userLogger.info('User logged in')
 * ```
 */
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context)
}

/**
 * Log levels:
 * - fatal: Application is unusable
 * - error: Error occurred, but app can continue
 * - warn: Warning, potential issue
 * - info: General information
 * - debug: Debugging information
 * - trace: Very detailed debugging
 */
```

**Installation:**
```bash
npm install pino
npm install --save-dev pino-pretty
```

---

## 🔒 Phase 3: Systematic Endpoint Hardening

### Step 3.1: Endpoint Security Template

**Standard pattern for securing an endpoint:**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/security/rate-limiter'
import { APPROPRIATE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError, AuthenticationError } from '@/lib/api/errors'
import { yourEndpointSchema } from '@/lib/validation/schemas'
import { logger } from '@/lib/logger'
import { z } from 'zod'

// ===========================
// 1. RATE LIMITING
// ===========================
const limiter = rateLimit(APPROPRIATE_LIMIT)

// ===========================
// 2. INPUT VALIDATION SCHEMA
// ===========================
const requestSchema = z.object({
  // Define expected input fields with validation
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  status: z.enum(['active', 'inactive']).optional(),
})

/**
 * GET /api/your/endpoint
 *
 * Brief description of what this endpoint does
 *
 * @param request - Next.js request object
 * @returns JSON response with data or error
 *
 * Security:
 * - Rate Limited: X requests per Y seconds
 * - Authentication: Required
 * - Input Validation: Zod schema
 * - Error Handling: Centralized
 */
export async function GET(request: NextRequest) {
  // ===========================
  // 3. RATE LIMITING CHECK
  // ===========================
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    // ===========================
    // 4. AUTHENTICATION CHECK
    // ===========================
    const token = await getAuthToken(request)
    if (!token) {
      throw new AuthenticationError('Please log in to access this resource')
    }

    // ===========================
    // 5. INPUT VALIDATION
    // ===========================
    const { searchParams } = new URL(request.url)
    const validated = requestSchema.parse({
      id: searchParams.get('id'),
      name: searchParams.get('name'),
      status: searchParams.get('status') || undefined,
    })

    // ===========================
    // 6. AUTHORIZATION CHECK (if needed)
    // ===========================
    const hasAccess = await checkUserAccess(token.userId, validated.id)
    if (!hasAccess) {
      throw new AuthorizationError('You do not have permission to access this resource')
    }

    // ===========================
    // 7. BUSINESS LOGIC
    // ===========================
    // IMPORTANT: Use only validated data (validated.id, validated.name, etc.)
    // NEVER use raw searchParams directly in business logic!
    const result = await performOperation(validated.id, validated.name)

    // ===========================
    // 8. SUCCESS LOGGING
    // ===========================
    logger.info(
      {
        endpoint: '/api/your/endpoint',
        userId: token.userId,
        resourceId: validated.id,
        action: 'read',
        result: 'success',
      },
      'Operation completed successfully'
    )

    // ===========================
    // 9. RESPONSE
    // ===========================
    return NextResponse.json(result)
  } catch (error) {
    // ===========================
    // 10. ERROR HANDLING
    // ===========================
    return handleApiError(error)
  }
}

/**
 * POST /api/your/endpoint
 *
 * Create or update resource
 *
 * Security:
 * - Rate Limited: X requests per Y seconds (stricter for mutations)
 * - Authentication: Required
 * - Input Validation: Zod schema
 * - Error Handling: Centralized
 */
export async function POST(request: NextRequest) {
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const token = await getAuthToken(request)
    if (!token) {
      throw new AuthenticationError('Please log in')
    }

    // For POST, validate request body
    const body = await request.json()
    const validated = requestSchema.parse(body)

    // Business logic
    const result = await createResource(validated)

    logger.info(
      {
        endpoint: '/api/your/endpoint',
        userId: token.userId,
        action: 'create',
        resourceId: result.id,
      },
      'Resource created'
    )

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
```

### Step 3.2: Rate Limit Selection Guide

**Choose appropriate rate limit based on endpoint characteristics:**

| Endpoint Type | Example | Recommended Limit | Reasoning |
|---------------|---------|-------------------|-----------|
| **Authentication** | /api/auth/login | AUTH_LIMIT (5/15min) | Prevent brute force attacks |
| **Password Reset** | /api/auth/reset | AUTH_LIMIT (5/15min) | Prevent abuse, email flooding |
| **List Resources** | /api/users | LIST_LIMIT (120/min) | Balance usability & protection |
| **Get Details** | /api/users/:id | DETAIL_LIMIT (60/min) | Moderate protection |
| **Create/Update/Delete** | /api/users (POST/PUT/DELETE) | MUTATION_LIMIT (30/min) | Write operations are expensive |
| **File Upload** | /api/upload | UPLOAD_LIMIT (10/min) | Bandwidth/storage intensive |
| **File Download** | /api/files/:id | FILE_LIMIT (60/min) | Moderate bandwidth cost |
| **AI/LLM Query** | /api/ai/chat | AI_LIMIT (5/min) | Very expensive (cost per token) |
| **Analytics** | /api/analytics/generate | EXPENSIVE_LIMIT (10/min) | CPU/memory intensive |
| **External API Proxy** | /api/github/repos | EXTERNAL_API_LIMIT (20/min) | Protect external service |
| **Settings Update** | /api/settings | SETTINGS_LIMIT (30/min) | Balance usability & safety |
| **Health Check** | /api/health | GENERAL_LIMIT (100/min) | Public, low cost |
| **SSE/WebSocket** | /api/stream | STREAM_LIMIT (5/min) | Long-running connections |

**Prompt for Claude Code:**
```
For each endpoint in the application, choose the appropriate rate limit configuration:

1. Identify endpoint type (auth, read, write, expensive, etc.)
2. Select matching limit from rate-limit-configs.ts
3. Document reasoning for the choice
4. Add limiter to endpoint with the chosen configuration

Example:
- /api/auth/login → AUTH_LIMIT (prevent brute force)
- /api/pods → LIST_LIMIT (Kubernetes list operations)
- /api/pods/:name/restart → MUTATION_LIMIT (write operation)
- /api/ai/match-file → AI_LIMIT (LLM usage, expensive)
```

### Step 3.3: Systematic Hardening Process

**Prompt for Claude Code:**
```
Secure all API endpoints systematically:

1. **Categorize endpoints by type:**
   - Authentication (login, logout, reset password)
   - Resource listing (GET /api/resource)
   - Resource details (GET /api/resource/:id)
   - Resource mutations (POST/PUT/PATCH/DELETE)
   - File operations (upload/download)
   - Expensive operations (AI, analytics)
   - Settings/configuration
   - Health/status checks

2. **For each category, secure all endpoints:**
   - Add rate limiting (choose appropriate limit)
   - Create/use validation schema
   - Add authentication check (if required)
   - Add authorization check (if resource-specific)
   - Replace raw input with validated data
   - Add error handling (try-catch with handleApiError)
   - Add structured logging

3. **Track progress:**
   - Create a tracking document: ENDPOINT_SECURITY_PROGRESS.md
   - Format:
     ```markdown
     ## Endpoint Security Progress

     **Total endpoints:** 77
     **Secured:** 15/77 (19%)

     ### Recently Secured (commit XXXXX)
     - ✅ /api/auth/login (AUTH_LIMIT)
     - ✅ /api/auth/logout (GENERAL_LIMIT)
     - ✅ /api/users (LIST_LIMIT)

     ### In Progress
     - ⏳ /api/posts (need validation schema)

     ### Not Started
     - ❌ /api/comments
     - ❌ /api/settings
     ```

4. **Commit frequently:**
   - Commit after every 5-10 endpoints secured
   - Commit message format:
     ```
     security: Secure authentication endpoints (15/77)

     - Add AUTH_LIMIT to login/logout endpoints
     - Add input validation for credentials
     - Add error handling and logging

     Progress: 15/77 endpoints secured (19%)
     ```

5. **Test after each batch:**
   - Run type-check: npm run type-check
   - Run linter: npm run lint
   - Test endpoints manually (if possible)
   - Fix any errors before proceeding

6. **Continue until 100% coverage:**
   - Goal: All 77 endpoints secured (100%)
   - No endpoint should be missing rate limiting
   - No endpoint should use raw input without validation
   - All errors should be handled centrally
```

---

## 🗃️ Phase 4: Database Security

### Step 4.1: SQL Injection Prevention Audit

**Prompt for Claude Code:**
```
Audit ALL database queries for SQL injection vulnerabilities:

1. **Find all database query code:**

   For Node.js with better-sqlite3:
   Search for: .prepare(

   For PostgreSQL (pg library):
   Search for: .query(

   For MySQL (mysql2):
   Search for: .query( or .execute(

   For MongoDB:
   Search for: .find(, .findOne(, .insertOne(

   For Prisma ORM:
   Search for: prisma.

2. **Check each query for safety:**

   ✅ SAFE (parameterized):
   ```typescript
   // better-sqlite3
   db.prepare('SELECT * FROM users WHERE id = ?').get(userId)

   // PostgreSQL
   client.query('SELECT * FROM users WHERE id = $1', [userId])

   // MySQL
   connection.execute('SELECT * FROM users WHERE id = ?', [userId])

   // Prisma (always safe)
   prisma.user.findUnique({ where: { id: userId } })
   ```

   ❌ UNSAFE (string concatenation):
   ```typescript
   // Template literals
   db.prepare(`SELECT * FROM users WHERE id = ${userId}`).get()

   // String concatenation
   db.prepare('SELECT * FROM users WHERE id = ' + userId).get()

   // Direct interpolation
   client.query(`SELECT * FROM users WHERE name = '${name}'`)
   ```

3. **Create audit report:**
   ```markdown
   ## SQL Injection Audit Report

   **Total queries found:** 45

   ### Safe Queries (Parameterized)
   - ✅ lib/db/users.ts:15 - SELECT user by ID (uses ?)
   - ✅ lib/db/posts.ts:23 - INSERT post (uses ?)

   ### UNSAFE Queries (String Concatenation) - MUST FIX
   - ❌ lib/db/search.ts:42 - Search query uses template literal
   - ❌ lib/db/filter.ts:67 - WHERE clause uses string concatenation

   **Safety rate:** 43/45 (95.6%)
   **Critical vulnerabilities:** 2
   ```

4. **Fix all unsafe queries:**
   For each unsafe query:
   - Replace template literals with parameterized statements
   - Use ? placeholders (SQLite, MySQL) or $1, $2 (PostgreSQL)
   - Pass values as separate arguments
   - Commit with message: "security: Fix SQL injection vulnerability in X"

5. **Verification:**
   Search codebase for dangerous patterns:
   - Search: `prepare(\`` (template literal in prepare)
   - Search: `prepare('.*\${` (template literal interpolation)
   - Search: `query(\`` (template literal in query)

   Goal: 0 results for all searches
   Report: "✅ All X database queries use parameterized statements (100% safe)"
```

### Step 4.2: Safe Database Query Examples

**SQLite (better-sqlite3):**
```typescript
import Database from 'better-sqlite3'

const db = new Database('app.db')

// ✅ SAFE - Parameterized query
function getUserById(id: string) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id)
}

// ✅ SAFE - Multiple parameters
function createUser(name: string, email: string) {
  return db
    .prepare('INSERT INTO users (name, email) VALUES (?, ?)')
    .run(name, email)
}

// ✅ SAFE - IN clause with multiple values
function getUsersByIds(ids: string[]) {
  const placeholders = ids.map(() => '?').join(',')
  return db
    .prepare(`SELECT * FROM users WHERE id IN (${placeholders})`)
    .all(...ids)
}

// ❌ UNSAFE - String concatenation
function searchUsers(query: string) {
  // This is vulnerable to SQL injection!
  return db.prepare(`SELECT * FROM users WHERE name LIKE '%${query}%'`).all()
}

// ✅ SAFE - Correct way
function searchUsersSafe(query: string) {
  return db.prepare('SELECT * FROM users WHERE name LIKE ?').all(`%${query}%`)
}
```

**PostgreSQL (pg):**
```typescript
import { Pool } from 'pg'

const pool = new Pool()

// ✅ SAFE - Parameterized with $1, $2
async function getUserById(id: string) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  return result.rows[0]
}

// ✅ SAFE - Multiple parameters
async function createUser(name: string, email: string) {
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  )
  return result.rows[0]
}

// ❌ UNSAFE
async function searchUsers(query: string) {
  return await pool.query(`SELECT * FROM users WHERE name LIKE '%${query}%'`)
}

// ✅ SAFE
async function searchUsersSafe(query: string) {
  return await pool.query('SELECT * FROM users WHERE name LIKE $1', [`%${query}%`])
}
```

**MongoDB:**
```typescript
import { MongoClient } from 'mongodb'

const client = new MongoClient(url)
const db = client.db('myapp')

// ✅ SAFE - MongoDB queries are inherently safe from SQL injection
async function getUserById(id: string) {
  return await db.collection('users').findOne({ _id: id })
}

// ✅ SAFE - Query object
async function searchUsers(name: string) {
  return await db.collection('users').find({ name: { $regex: name } }).toArray()
}

// ❌ UNSAFE - Parsing user input as JSON
async function searchUsersUnsafe(userInput: string) {
  // User could inject malicious MongoDB operators!
  const query = JSON.parse(userInput)
  return await db.collection('users').find(query).toArray()
}

// ✅ SAFE - Validate and sanitize input
async function searchUsersSafe(name: string) {
  // Only allow simple string search
  if (typeof name !== 'string') {
    throw new Error('Invalid input')
  }
  return await db.collection('users').find({ name }).toArray()
}
```

**Prisma ORM (always safe):**
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ✅ SAFE - Prisma automatically uses parameterized queries
async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } })
}

// ✅ SAFE
async function searchUsers(query: string) {
  return await prisma.user.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  })
}

// Prisma protects against SQL injection by design
// All queries are parameterized internally
```

---

## 🔐 Phase 5: Advanced Security Features

### Step 5.1: API Key & Secret Encryption

**When to use:**
- Storing API keys (OpenAI, GitHub, AWS, etc.)
- Storing OAuth tokens
- Storing encryption keys
- Storing database credentials
- Any sensitive configuration data

**Create: `lib/security/encryption.ts`**
```typescript
import { randomBytes, scrypt, createCipheriv, createDecipheriv } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

// ===========================
// Constants
// ===========================
const ALGORITHM = 'aes-256-gcm' as const
const KEY_LENGTH = 32 // 256 bits
const IV_LENGTH = 12 // 96 bits (recommended for GCM)
const SALT_LENGTH = 16
const AUTH_TAG_LENGTH = 16

// Scrypt parameters (balanced security/performance)
const SCRYPT_COST = 16384 // CPU cost (N) - 2^14
const SCRYPT_BLOCK_SIZE = 8 // Block size (r)
const SCRYPT_PARALLELIZATION = 1 // Parallelization (p)

// ===========================
// Key Management
// ===========================

/**
 * Get encryption password from environment
 * MUST be set in production with strong random value
 */
function getEncryptionPassword(): string {
  const password = process.env.ENCRYPTION_KEY

  if (!password) {
    throw new Error(
      'ENCRYPTION_KEY environment variable is required. ' +
        'Generate with: openssl rand -base64 32'
    )
  }

  if (password.length < 32) {
    throw new Error('ENCRYPTION_KEY must be at least 32 characters long')
  }

  return password
}

/**
 * Derive encryption key from password using scrypt
 * Scrypt is designed to be expensive to prevent brute force
 *
 * @param password - Master password from environment
 * @param salt - Unique salt for this encryption
 * @returns Derived encryption key
 */
async function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
  return (await scryptAsync(password, salt, KEY_LENGTH, {
    N: SCRYPT_COST,
    r: SCRYPT_BLOCK_SIZE,
    p: SCRYPT_PARALLELIZATION,
  })) as Buffer
}

// ===========================
// Encryption
// ===========================

/**
 * Encrypt a string (e.g., API key, token, password)
 *
 * Uses AES-256-GCM authenticated encryption:
 * - AES-256: Industry-standard symmetric encryption
 * - GCM: Provides both confidentiality AND authenticity
 * - Authentication tag prevents tampering
 *
 * Each encryption uses unique salt and IV for maximum security
 * Even encrypting the same plaintext twice produces different ciphertext
 *
 * @param plaintext - String to encrypt
 * @returns Encrypted string in format: salt.iv.authTag.ciphertext (base64)
 *
 * @example
 * ```typescript
 * const apiKey = 'sk-test-1234567890'
 * const encrypted = await encrypt(apiKey)
 * // encrypted = "base64salt.base64iv.base64tag.base64cipher"
 *
 * // Store in database
 * db.prepare('UPDATE settings SET api_key = ?').run(encrypted)
 * ```
 */
export async function encrypt(plaintext: string): Promise<string> {
  const password = getEncryptionPassword()

  // Generate unique salt and IV for this encryption
  const salt = randomBytes(SALT_LENGTH)
  const iv = randomBytes(IV_LENGTH)

  // Derive encryption key from password + salt
  const key = await deriveKey(password, salt)

  // Encrypt
  const cipher = createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])

  // Get authentication tag (GCM provides this)
  const authTag = cipher.getAuthTag()

  // Return format: salt.iv.authTag.ciphertext
  // All parts are base64 encoded for safe storage
  return [
    salt.toString('base64'),
    iv.toString('base64'),
    authTag.toString('base64'),
    encrypted.toString('base64'),
  ].join('.')
}

/**
 * Decrypt a string encrypted with encrypt()
 *
 * @param encryptedData - Encrypted string from encrypt()
 * @returns Original plaintext
 * @throws Error if data is tampered or corrupted
 *
 * @example
 * ```typescript
 * const stored = db.prepare('SELECT api_key FROM settings').get()
 * const apiKey = await decrypt(stored.api_key)
 * // Use apiKey for API calls
 * ```
 */
export async function decrypt(encryptedData: string): Promise<string> {
  const password = getEncryptionPassword()

  // Parse encrypted data
  const parts = encryptedData.split('.')
  if (parts.length !== 4) {
    throw new Error('Invalid encrypted data format')
  }

  const [saltB64, ivB64, authTagB64, ciphertextB64] = parts

  // Decode from base64
  const salt = Buffer.from(saltB64, 'base64')
  const iv = Buffer.from(ivB64, 'base64')
  const authTag = Buffer.from(authTagB64, 'base64')
  const ciphertext = Buffer.from(ciphertextB64, 'base64')

  // Derive key (same password + salt = same key)
  const key = await deriveKey(password, salt)

  // Decrypt
  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)

  try {
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
    return decrypted.toString('utf8')
  } catch (error) {
    throw new Error(
      'Decryption failed - data may be tampered, corrupted, or encrypted with different key'
    )
  }
}

/**
 * Check if a string is encrypted (has expected format)
 * Useful for migrations or handling both encrypted/plaintext data
 *
 * @param value - String to check
 * @returns true if value appears to be encrypted
 *
 * @example
 * ```typescript
 * // Migrate plaintext keys to encrypted
 * const keys = db.prepare('SELECT id, api_key FROM settings').all()
 * for (const row of keys) {
 *   if (!isEncrypted(row.api_key)) {
 *     const encrypted = await encrypt(row.api_key)
 *     db.prepare('UPDATE settings SET api_key = ? WHERE id = ?')
 *       .run(encrypted, row.id)
 *   }
 * }
 * ```
 */
export function isEncrypted(value: string): boolean {
  const parts = value.split('.')
  if (parts.length !== 4) return false

  // Check that all parts are valid base64
  return parts.every((part) => {
    try {
      Buffer.from(part, 'base64')
      return true
    } catch {
      return false
    }
  })
}

/**
 * Clear sensitive string from memory (best effort)
 * JavaScript strings are immutable, so this only prevents
 * the most basic memory inspection. For true secrets,
 * consider using secure memory (e.g., libsodium).
 *
 * @param str - String to clear (not actually modified due to immutability)
 */
export function clearString(_str: string): void {
  // JavaScript strings are immutable, so we can't actually clear them
  // This function is provided for API compatibility and documentation
  // In production, minimize how long plaintext secrets stay in memory
}
```

**Environment setup:**
```bash
# Generate strong encryption key
openssl rand -base64 32

# Add to .env (NEVER commit this file!)
ENCRYPTION_KEY=generated-key-from-above-command
```

**`.env.example` (safe to commit):**
```bash
# Encryption
# Generate with: openssl rand -base64 32
ENCRYPTION_KEY=your-encryption-key-here-must-be-32-chars-minimum
```

**Usage examples:**
```typescript
import { encrypt, decrypt, isEncrypted } from '@/lib/security/encryption'

// === Storing API key ===
const apiKey = 'sk-test-1234567890'
const encrypted = await encrypt(apiKey)

db.prepare('INSERT INTO settings (name, value) VALUES (?, ?)').run(
  'openai_api_key',
  encrypted
)

// === Retrieving API key ===
const row = db.prepare('SELECT value FROM settings WHERE name = ?').get('openai_api_key')
const decrypted = await decrypt(row.value)

// Use decrypted key for API call
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: { 'Authorization': `Bearer ${decrypted}` }
})

// === Migration: Encrypt existing plaintext keys ===
const allSettings = db.prepare('SELECT id, value FROM settings WHERE name LIKE "%_key"').all()

for (const setting of allSettings) {
  if (!isEncrypted(setting.value)) {
    console.log(`Encrypting setting ${setting.id}...`)
    const encrypted = await encrypt(setting.value)
    db.prepare('UPDATE settings SET value = ? WHERE id = ?').run(encrypted, setting.id)
  }
}

console.log('✅ All API keys encrypted')
```

### Step 5.2: Security Headers Middleware

**For Next.js - Create: `middleware.ts`**
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Security headers middleware
 *
 * Implements defense-in-depth with multiple security headers
 * protecting against common web vulnerabilities
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // ===========================
  // Content Security
  // ===========================

  /**
   * X-Content-Type-Options: nosniff
   * Prevents MIME type sniffing
   * Browsers must respect declared Content-Type
   */
  response.headers.set('X-Content-Type-Options', 'nosniff')

  /**
   * X-Frame-Options: DENY
   * Prevents clickjacking attacks
   * Page cannot be embedded in iframe/frame
   *
   * Alternative: SAMEORIGIN (allow same-origin iframes)
   */
  response.headers.set('X-Frame-Options', 'DENY')

  /**
   * X-XSS-Protection: 1; mode=block
   * Legacy XSS filter (older browsers)
   * Modern browsers use CSP instead
   */
  response.headers.set('X-XSS-Protection', '1; mode=block')

  /**
   * Referrer-Policy: strict-origin-when-cross-origin
   * Controls referrer information sent with requests
   * - Same-origin: full URL
   * - Cross-origin: origin only
   * - HTTPS to HTTP: no referrer
   */
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // ===========================
  // Transport Security
  // ===========================

  /**
   * Strict-Transport-Security (HSTS)
   * Forces HTTPS for all connections
   * ONLY enable in production with valid HTTPS!
   *
   * Parameters:
   * - max-age: 31536000 (1 year in seconds)
   * - includeSubDomains: apply to all subdomains
   * - preload: eligible for HSTS preload list
   */
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  // ===========================
  // Content Security Policy (CSP)
  // ===========================

  /**
   * CSP controls what resources can be loaded
   * Prevents XSS, clickjacking, and other injection attacks
   *
   * CUSTOMIZE THIS FOR YOUR APPLICATION!
   * Start strict, then relax as needed
   */
  const cspDirectives = [
    // Default: restrict everything
    "default-src 'self'",

    // Scripts: adjust based on your needs
    // 'unsafe-inline': allows inline <script> (avoid if possible)
    // 'unsafe-eval': allows eval() (avoid if possible)
    // Add CDN domains if needed: https://cdn.example.com
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",

    // Styles: allows inline styles (common in React/Next.js)
    "style-src 'self' 'unsafe-inline'",

    // Images: allows data: URIs and external HTTPS images
    "img-src 'self' data: https:",

    // Fonts: allows data: URIs
    "font-src 'self' data:",

    // API calls: restrict to your API and specific external APIs
    "connect-src 'self' https://api.github.com https://api.openai.com",

    // Frames: prevent embedding (redundant with X-Frame-Options)
    "frame-ancestors 'none'",

    // Forms: only submit to same origin
    "form-action 'self'",

    // Block all plugins (Flash, Java, etc.)
    "object-src 'none'",

    // Upgrade insecure requests to HTTPS
    'upgrade-insecure-requests',
  ]

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '))

  // ===========================
  // Permissions Policy
  // ===========================

  /**
   * Permissions-Policy (formerly Feature-Policy)
   * Controls which browser features can be used
   */
  const permissionsPolicy = [
    'camera=()',     // Block camera
    'microphone=()', // Block microphone
    'geolocation=()', // Block geolocation
    'interest-cohort=()', // Block FLoC
    'payment=()',    // Block payment APIs
  ]

  response.headers.set('Permissions-Policy', permissionsPolicy.join(', '))

  return response
}

/**
 * Configure which routes the middleware runs on
 *
 * Options:
 * - matcher: '/:path*' - all routes
 * - matcher: '/api/:path*' - only API routes
 * - matcher: ['/', '/dashboard', '/api/:path*'] - specific routes
 */
export const config = {
  matcher: '/:path*', // Apply to all routes
}
```

**For Express:**
```typescript
import express from 'express'
import helmet from 'helmet'

const app = express()

// Use Helmet for security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.github.com'],
        fontSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
)
```

**Installation:**
```bash
# For Express
npm install helmet
```

---

## 🧪 Phase 6: Comprehensive Testing

### Step 6.1: Rate Limiter Tests

**Create: `__tests__/lib/security/rate-limiter.test.ts`**
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { rateLimit } from '@/lib/security/rate-limiter'
import { NextRequest } from 'next/server'
import type { RateLimitConfig } from '@/lib/security/rate-limit-configs'

describe('Rate Limiter', () => {
  const testConfig: RateLimitConfig = {
    windowMs: 60000, // 1 minute
    maxRequests: 3,
    message: 'Rate limit exceeded',
  }

  let request: NextRequest

  beforeEach(() => {
    // Create fresh request for each test
    request = new NextRequest('http://localhost:3000/api/test', {
      headers: { 'x-forwarded-for': '192.168.1.1' },
    })
  })

  it('should allow requests within limit', async () => {
    const limiter = rateLimit(testConfig)

    // First 3 requests should be allowed
    for (let i = 0; i < 3; i++) {
      const result = await limiter(request)
      expect(result).toBeNull()
    }
  })

  it('should block requests exceeding limit', async () => {
    const limiter = rateLimit(testConfig)

    // Use up the limit
    for (let i = 0; i < 3; i++) {
      await limiter(request)
    }

    // 4th request should be blocked
    const blocked = await limiter(request)
    expect(blocked).not.toBeNull()
    expect(blocked?.status).toBe(429)

    const body = await blocked?.json()
    expect(body).toHaveProperty('error')
  })

  it('should include rate limit headers in blocked response', async () => {
    const limiter = rateLimit(testConfig)

    // Exceed limit
    for (let i = 0; i < 3; i++) {
      await limiter(request)
    }

    const blocked = await limiter(request)

    // Check headers
    expect(blocked?.headers.get('X-RateLimit-Limit')).toBe('3')
    expect(blocked?.headers.get('X-RateLimit-Remaining')).toBe('0')
    expect(blocked?.headers.has('Retry-After')).toBe(true)
    expect(blocked?.headers.has('X-RateLimit-Reset')).toBe(true)
  })

  it('should track different IPs separately', async () => {
    const limiter = rateLimit(testConfig)

    // IP 1: use up limit
    const request1 = new NextRequest('http://localhost:3000/api/test', {
      headers: { 'x-forwarded-for': '192.168.1.1' },
    })
    for (let i = 0; i < 3; i++) {
      await limiter(request1)
    }

    // IP 2: should still be allowed
    const request2 = new NextRequest('http://localhost:3000/api/test', {
      headers: { 'x-forwarded-for': '192.168.1.2' },
    })
    const result = await limiter(request2)
    expect(result).toBeNull()
  })

  it('should use correct custom error message', async () => {
    const customConfig: RateLimitConfig = {
      windowMs: 60000,
      maxRequests: 1,
      message: 'Custom error message',
    }

    const limiter = rateLimit(customConfig)

    // First request allowed
    await limiter(request)

    // Second request blocked with custom message
    const blocked = await limiter(request)
    const body = await blocked?.json()
    expect(body.error).toBe('Custom error message')
  })
})
```

### Step 6.2: Encryption Tests

**Create: `__tests__/lib/security/encryption.test.ts`**
```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { encrypt, decrypt, isEncrypted } from '@/lib/security/encryption'

describe('Encryption', () => {
  const originalEnv = process.env.ENCRYPTION_KEY

  beforeAll(() => {
    // Set test encryption key
    process.env.ENCRYPTION_KEY = 'test-key-with-at-least-32-characters-long-for-security'
  })

  afterAll(() => {
    // Restore original
    process.env.ENCRYPTION_KEY = originalEnv
  })

  describe('encrypt and decrypt', () => {
    it('should encrypt and decrypt a string successfully', async () => {
      const plaintext = 'sk-test-api-key-1234567890'
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should produce different ciphertext for same plaintext (unique IV)', async () => {
      const plaintext = 'sk-test-api-key'
      const encrypted1 = await encrypt(plaintext)
      const encrypted2 = await encrypt(plaintext)

      // Same plaintext, different ciphertext (due to unique IV/salt)
      expect(encrypted1).not.toBe(encrypted2)

      // But both should decrypt to same plaintext
      expect(await decrypt(encrypted1)).toBe(plaintext)
      expect(await decrypt(encrypted2)).toBe(plaintext)
    })

    it('should handle empty string', async () => {
      const plaintext = ''
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should handle long strings', async () => {
      const plaintext = 'a'.repeat(10000)
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should handle unicode characters', async () => {
      const plaintext = '🔐 Secret key with émojis and spëcial çhars'
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })
  })

  describe('encrypted data format', () => {
    it('should produce encrypted string in correct format (4 base64 parts)', async () => {
      const encrypted = await encrypt('test')

      // Format: salt.iv.authTag.ciphertext
      const parts = encrypted.split('.')
      expect(parts).toHaveLength(4)

      // All parts should be valid base64
      parts.forEach((part) => {
        expect(() => Buffer.from(part, 'base64')).not.toThrow()
      })
    })
  })

  describe('isEncrypted', () => {
    it('should detect encrypted format correctly', async () => {
      const encrypted = await encrypt('test')
      expect(isEncrypted(encrypted)).toBe(true)
    })

    it('should return false for plaintext', () => {
      expect(isEncrypted('plain-text')).toBe(false)
      expect(isEncrypted('sk-test-key')).toBe(false)
      expect(isEncrypted('')).toBe(false)
    })

    it('should return false for invalid format', () => {
      expect(isEncrypted('abc.def')).toBe(false) // Only 2 parts
      expect(isEncrypted('abc.def.ghi.jkl.mno')).toBe(false) // 5 parts
      expect(isEncrypted('not-base64.abc.def.ghi')).toBe(false) // Invalid base64
    })
  })

  describe('error handling', () => {
    it('should throw error for tampered encrypted data', async () => {
      const encrypted = await encrypt('test')

      // Tamper with ciphertext
      const parts = encrypted.split('.')
      parts[3] = 'XXXXXXXXXX' // Invalid ciphertext
      const tampered = parts.join('.')

      await expect(decrypt(tampered)).rejects.toThrow('Decryption failed')
    })

    it('should throw error for invalid format', async () => {
      await expect(decrypt('invalid-format')).rejects.toThrow('Invalid encrypted data format')
    })

    it('should throw error for wrong encryption key', async () => {
      const encrypted = await encrypt('test')

      // Change encryption key
      process.env.ENCRYPTION_KEY = 'different-key-that-is-also-32-characters-or-longer'

      await expect(decrypt(encrypted)).rejects.toThrow('Decryption failed')

      // Restore
      process.env.ENCRYPTION_KEY = 'test-key-with-at-least-32-characters-long-for-security'
    })
  })

  describe('environment validation', () => {
    it('should throw error if ENCRYPTION_KEY is missing', async () => {
      delete process.env.ENCRYPTION_KEY

      await expect(encrypt('test')).rejects.toThrow('ENCRYPTION_KEY')
      await expect(decrypt('test')).rejects.toThrow('ENCRYPTION_KEY')

      // Restore
      process.env.ENCRYPTION_KEY = 'test-key-with-at-least-32-characters-long-for-security'
    })

    it('should throw error if ENCRYPTION_KEY is too short', async () => {
      process.env.ENCRYPTION_KEY = 'short'

      await expect(encrypt('test')).rejects.toThrow('at least 32 characters')

      // Restore
      process.env.ENCRYPTION_KEY = 'test-key-with-at-least-32-characters-long-for-security'
    })
  })
})
```

### Step 6.3: Validation Schema Tests

**Create: `__tests__/lib/validation/schemas.test.ts`**
```typescript
import { describe, it, expect } from 'vitest'
import {
  emailSchema,
  k8sNameSchema,
  k8sNamespaceSchema,
  idSchema,
  githubOwnerSchema,
  githubRepoSchema,
  paginationSchema,
} from '@/lib/validation/schemas'
import { ZodError } from 'zod'

describe('Validation Schemas', () => {
  describe('emailSchema', () => {
    it('should accept valid emails', () => {
      const validEmails = [
        'user@example.com',
        'test.user@domain.co.uk',
        'admin+tag@company.com',
        'name_123@test.io',
      ]

      validEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).not.toThrow()
      })
    })

    it('should reject invalid emails', () => {
      const invalidEmails = [
        'not-an-email',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example',
        '',
      ]

      invalidEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).toThrow(ZodError)
      })
    })

    it('should convert email to lowercase', () => {
      const result = emailSchema.parse('USER@EXAMPLE.COM')
      expect(result).toBe('user@example.com')
    })
  })

  describe('k8sNameSchema', () => {
    it('should accept valid DNS-1123 names', () => {
      const validNames = [
        'my-deployment',
        'nginx-prod',
        'web-app-123',
        'a',
        'test-name-with-many-hyphens',
        '123-starts-with-number',
      ]

      validNames.forEach((name) => {
        expect(() => k8sNameSchema.parse(name)).not.toThrow()
      })
    })

    it('should reject invalid DNS-1123 names', () => {
      const invalidNames = [
        'MyDeployment', // uppercase
        'my_deployment', // underscore
        'app@service', // special char
        '-starts-with-dash', // starts with dash
        'ends-with-dash-', // ends with dash
        '', // empty
        'a'.repeat(254), // too long (>253)
        'my..deployment', // consecutive dots (if dots allowed)
      ]

      invalidNames.forEach((name) => {
        expect(() => k8sNameSchema.parse(name)).toThrow(ZodError)
      })
    })
  })

  describe('idSchema', () => {
    it('should accept valid IDs', () => {
      const validIds = ['user123', 'post-456', 'item_789', 'ABC-123-XYZ']

      validIds.forEach((id) => {
        expect(() => idSchema.parse(id)).not.toThrow()
      })
    })

    it('should reject invalid IDs', () => {
      const invalidIds = [
        'user@123', // special char
        'post/456', // slash
        'item 789', // space
        '../etc/passwd', // path traversal
        '', // empty
        'a'.repeat(101), // too long
      ]

      invalidIds.forEach((id) => {
        expect(() => idSchema.parse(id)).toThrow(ZodError)
      })
    })
  })

  describe('githubOwnerSchema', () => {
    it('should accept valid GitHub owner names', () => {
      const validOwners = ['octocat', 'github', 'my-org', 'user123']

      validOwners.forEach((owner) => {
        expect(() => githubOwnerSchema.parse(owner)).not.toThrow()
      })
    })

    it('should reject invalid GitHub owner names', () => {
      const invalidOwners = [
        '-starts-with-dash',
        'ends-with-dash-',
        'has--double-dash',
        'has_underscore',
        '',
        'a'.repeat(40), // too long
      ]

      invalidOwners.forEach((owner) => {
        expect(() => githubOwnerSchema.parse(owner)).toThrow(ZodError)
      })
    })
  })

  describe('githubRepoSchema', () => {
    it('should accept valid GitHub repo names', () => {
      const validRepos = ['my-repo', 'repo.name', 'repo_name', 'repo-123']

      validRepos.forEach((repo) => {
        expect(() => githubRepoSchema.parse(repo)).not.toThrow()
      })
    })

    it('should reject invalid GitHub repo names', () => {
      const invalidRepos = [
        'repo name', // space
        'repo@name', // special char
        '', // empty
        'a'.repeat(101), // too long
      ]

      invalidRepos.forEach((repo) => {
        expect(() => githubRepoSchema.parse(repo)).toThrow(ZodError)
      })
    })
  })

  describe('paginationSchema', () => {
    it('should accept valid pagination params', () => {
      const valid = [
        { page: 1, limit: 20 },
        { page: 5, limit: 50 },
        { page: '10', limit: '25' }, // String numbers (will be coerced)
      ]

      valid.forEach((params) => {
        expect(() => paginationSchema.parse(params)).not.toThrow()
      })
    })

    it('should apply default values', () => {
      const result = paginationSchema.parse({})
      expect(result).toEqual({ page: 1, limit: 20 })
    })

    it('should coerce string numbers to integers', () => {
      const result = paginationSchema.parse({ page: '5', limit: '30' })
      expect(result).toEqual({ page: 5, limit: 30 })
    })

    it('should reject invalid pagination params', () => {
      const invalid = [
        { page: 0, limit: 20 }, // page must be >= 1
        { page: -1, limit: 20 }, // negative page
        { page: 1, limit: 0 }, // limit must be >= 1
        { page: 1, limit: 101 }, // limit must be <= 100
        { page: 1.5, limit: 20 }, // non-integer
      ]

      invalid.forEach((params) => {
        expect(() => paginationSchema.parse(params)).toThrow(ZodError)
      })
    })
  })
})
```

### Step 6.4: Error Handler Tests

**Create: `__tests__/lib/api/errors.test.ts`**
```typescript
import { describe, it, expect } from 'vitest'
import {
  handleApiError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from '@/lib/api/errors'
import { z, ZodError } from 'zod'

describe('Error Handling', () => {
  describe('handleApiError', () => {
    it('should handle ZodError with formatted details', async () => {
      const schema = z.object({
        email: z.string().email(),
        age: z.number().min(0),
      })

      try {
        schema.parse({ email: 'invalid', age: -1 })
      } catch (error) {
        const response = handleApiError(error)
        expect(response.status).toBe(400)

        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details).toBeInstanceOf(Array)
        expect(body.details.length).toBeGreaterThan(0)
      }
    })

    it('should handle ValidationError', async () => {
      const error = new ValidationError('Invalid input', { field: 'email' })
      const response = handleApiError(error)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toBe('Invalid input')
      expect(body.details).toEqual({ field: 'email' })
    })

    it('should handle AuthenticationError', async () => {
      const error = new AuthenticationError('Please log in')
      const response = handleApiError(error)

      expect(response.status).toBe(401)
      const body = await response.json()
      expect(body.error).toBe('Please log in')
    })

    it('should handle AuthorizationError', async () => {
      const error = new AuthorizationError('Access denied')
      const response = handleApiError(error)

      expect(response.status).toBe(403)
      const body = await response.json()
      expect(body.error).toBe('Access denied')
    })

    it('should handle NotFoundError', async () => {
      const error = new NotFoundError('Resource not found')
      const response = handleApiError(error)

      expect(response.status).toBe(404)
      const body = await response.json()
      expect(body.error).toBe('Resource not found')
    })

    it('should handle generic Error as 500', async () => {
      const error = new Error('Something went wrong')
      const response = handleApiError(error)

      expect(response.status).toBe(500)
      const body = await response.json()
      expect(body.error).toBe('Internal server error')
    })

    it('should handle unknown error type', async () => {
      const error = 'string error' // Not an Error object
      const response = handleApiError(error)

      expect(response.status).toBe(500)
    })
  })
})
```

### Step 6.5: Running Tests

**Prompt for Claude Code:**
```
Run comprehensive test suite:

1. **Install test dependencies** (if not already):
   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/react-hooks
   ```

2. **Run all tests:**
   ```bash
   npm test
   ```

3. **Run with coverage:**
   ```bash
   npm test -- --coverage
   ```

4. **Watch mode** (during development):
   ```bash
   npm test -- --watch
   ```

5. **Analyze results:**
   - Total tests: X
   - Passing: Y
   - Failing: Z
   - Coverage: X%

6. **Fix any failures:**
   - Read error messages carefully
   - Check async timing issues
   - Verify environment setup
   - Update tests if API changed

7. **Target metrics:**
   - Test pass rate: >95%
   - Security module coverage: >90%
   - No critical failures

8. **Report format:**
   ```markdown
   ## Test Results

   **Unit Tests:** 236 tests
   - ✅ Passing: 229 (97%)
   - ❌ Failing: 7 (3%)

   **Coverage:**
   - Statements: 85%
   - Branches: 78%
   - Functions: 82%
   - Lines: 85%

   **Security Module Coverage:**
   - rate-limiter.ts: 95%
   - encryption.ts: 98%
   - errors.ts: 92%
   - schemas.ts: 100%

   **Action Items:**
   - Fix async timing in rate-limiter test
   - Add missing edge case tests for encryption
   ```
```

---

## 📋 Phase 7: Documentation & Deployment

### Step 7.1: Security Report

**Prompt for Claude Code:**
```
Create comprehensive security documentation: SECURITY_REPORT.md

Include the following sections:

1. **Executive Summary**
   - Total endpoints secured
   - Security coverage percentages
   - Key security features implemented
   - Compliance status (OWASP Top 10)

2. **Security Architecture**
   - Defense in depth layers
   - Technology stack security features
   - Security data flow diagram (text/Mermaid)

3. **API Endpoint Security**
   - Table of all endpoints with security measures
   - Rate limiting coverage
   - Validation coverage
   - Authentication coverage

4. **Rate Limiting**
   - Configuration table with all limits
   - Reasoning for each limit type
   - How to adjust limits

5. **Input Validation**
   - Validation library used (Zod)
   - Coverage percentage
   - Common validation patterns
   - Example schemas

6. **Authentication & Authorization**
   - Authentication method (OAuth, JWT, etc.)
   - Token storage mechanism
   - Session management
   - Authorization patterns

7. **Database Security**
   - SQL injection prevention status (100% parameterized)
   - Example safe queries
   - Database access controls
   - Backup and recovery

8. **Encryption**
   - Algorithm used (AES-256-GCM)
   - Key derivation (scrypt)
   - What data is encrypted
   - Key management

9. **Security Headers**
   - All headers implemented
   - CSP policy
   - HSTS configuration

10. **Logging & Monitoring**
    - What is logged
    - Sensitive data redaction
    - Log aggregation setup
    - Alerting configuration

11. **Testing**
    - Security test coverage
    - Test results summary
    - Continuous testing strategy

12. **Threat Model**
    - OWASP Top 10 compliance table
    - Addressed threats
    - Residual risks
    - Risk mitigation strategies

13. **Deployment Checklist**
    - Pre-deployment security checks
    - Environment variable requirements
    - Production hardening steps
    - Post-deployment verification

14. **Incident Response**
    - Security incident contact
    - Response procedures
    - Logging and forensics
    - Communication plan

15. **Compliance**
    - GDPR compliance (if applicable)
    - SOC 2 considerations
    - Industry-specific requirements

Format as professional Markdown document with:
- Clear headings and sections
- Tables for structured data
- Code examples where relevant
- Mermaid diagrams for architecture
- Checklists for deployment
```

### Step 7.2: Environment Variables Documentation

**Create: `.env.example`**
```bash
# ===========================
# APPLICATION
# ===========================
NODE_ENV=production
PORT=3000
SERVICE_NAME=your-app-name

# ===========================
# SECURITY - ENCRYPTION
# ===========================
# Generate with: openssl rand -base64 32
# REQUIRED in production for API key encryption
ENCRYPTION_KEY=your-very-strong-random-key-at-least-32-characters-long

# ===========================
# SECURITY - RATE LIMITING
# ===========================
# Optional: Override default rate limits
# Format: WINDOW_MS (time window), MAX (max requests)

# Authentication endpoints
RL_AUTH_WINDOW_MS=900000
RL_AUTH_MAX=5

# List operations
RL_LIST_WINDOW_MS=60000
RL_LIST_MAX=120

# Write operations
RL_MUTATION_WINDOW_MS=60000
RL_MUTATION_MAX=30

# AI/LLM queries
RL_AI_WINDOW_MS=60000
RL_AI_MAX=5

# File operations
RL_FILE_WINDOW_MS=60000
RL_FILE_MAX=60

# External API calls
RL_EXTERNAL_WINDOW_MS=60000
RL_EXTERNAL_MAX=20

# General endpoints
RL_GENERAL_WINDOW_MS=60000
RL_GENERAL_MAX=100

# ===========================
# LOGGING
# ===========================
LOG_LEVEL=info
# Options: fatal, error, warn, info, debug, trace

# ===========================
# DATABASE
# ===========================
DATABASE_URL=path/to/database.db
# Or for PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# ===========================
# AUTHENTICATION
# ===========================
# Adjust based on your auth method

# For OAuth (GitHub example)
OAUTH_CLIENT_ID=your-github-client-id
OAUTH_CLIENT_SECRET=your-github-client-secret
OAUTH_REDIRECT_URI=https://yourapp.com/api/auth/callback

# For JWT
JWT_SECRET=your-jwt-secret-key-at-least-32-characters
JWT_EXPIRATION=7d

# Session secret (if using sessions)
SESSION_SECRET=your-session-secret-at-least-32-characters

# ===========================
# EXTERNAL SERVICES (if applicable)
# ===========================
# OpenAI
OPENAI_API_KEY=sk-your-openai-key

# GitHub
GITHUB_TOKEN=ghp_your-github-token

# AWS
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1

# ===========================
# IMPORTANT NOTES
# ===========================
# 1. NEVER commit .env file to version control
# 2. Add .env to .gitignore
# 3. Use .env.example for documentation only
# 4. Store production secrets in secure vault (AWS Secrets Manager, etc.)
# 5. Rotate secrets regularly
# 6. Use different keys for dev/staging/production
```

**.gitignore update:**
```gitignore
# Environment variables
.env
.env.local
.env.production
.env.development

# Keep .env.example
!.env.example
```

### Step 7.3: Deployment Security Checklist

**Create: DEPLOYMENT_CHECKLIST.md**
```markdown
# Deployment Security Checklist

Use this checklist before deploying to production.

## ☑️ Environment Configuration

### Required Environment Variables
- [ ] `NODE_ENV=production` is set
- [ ] `ENCRYPTION_KEY` is set (32+ random characters)
- [ ] All auth secrets are configured (OAuth, JWT, etc.)
- [ ] Database credentials are set
- [ ] External API keys are configured
- [ ] All secrets are stored in secure vault (not plaintext files)

### Environment Variable Security
- [ ] Secrets are unique per environment (dev/staging/prod)
- [ ] `.env` file is in `.gitignore`
- [ ] No secrets are hardcoded in source code
- [ ] No secrets in version control history
- [ ] Secrets are rotated regularly (quarterly minimum)

## ☑️ Application Security

### Rate Limiting
- [ ] Rate limiting is enabled for all endpoints
- [ ] Appropriate limits are configured per endpoint type
- [ ] Rate limiting works correctly (tested)
- [ ] Rate limit violations are logged

### Input Validation
- [ ] All endpoints validate input with Zod schemas
- [ ] No raw user input is used without validation
- [ ] Validation errors return helpful messages (no info disclosure)
- [ ] File upload validation is in place (size, type)

### Authentication & Authorization
- [ ] Authentication is required for protected endpoints
- [ ] Authorization checks verify resource ownership
- [ ] Tokens/sessions have appropriate expiration
- [ ] Logout/revocation works correctly
- [ ] Password reset flow is secure (if applicable)

### Database Security
- [ ] All queries use parameterized statements (0 SQL injection risk)
- [ ] Database has authentication enabled
- [ ] Database user has minimal required permissions
- [ ] Database is not publicly accessible
- [ ] Backups are configured and tested

### Encryption
- [ ] API keys/secrets are encrypted at rest
- [ ] Encryption key is strong and secure
- [ ] TLS/HTTPS is enforced for all connections
- [ ] No sensitive data in logs

### Security Headers
- [ ] Security headers middleware is enabled
- [ ] CSP policy is configured correctly
- [ ] HSTS is enabled (HTTPS only!)
- [ ] Frame protection is enabled (X-Frame-Options)

### Error Handling
- [ ] All errors are caught and handled
- [ ] No stack traces exposed to users (production)
- [ ] Errors are logged for debugging
- [ ] Generic error messages prevent info disclosure

## ☑️ Infrastructure Security

### Network
- [ ] HTTPS is enforced (redirect HTTP to HTTPS)
- [ ] TLS certificate is valid and not self-signed
- [ ] TLS 1.2+ is required (no TLS 1.0/1.1)
- [ ] Firewall rules restrict unnecessary ports
- [ ] DDoS protection is enabled (Cloudflare, AWS Shield, etc.)

### Server
- [ ] OS and packages are updated
- [ ] Unnecessary services are disabled
- [ ] SSH is secured (key-based auth, no root login)
- [ ] Intrusion detection is enabled (fail2ban, etc.)
- [ ] Server has automatic security updates

### Container/Docker (if applicable)
- [ ] Base images are from trusted sources
- [ ] Images are scanned for vulnerabilities
- [ ] Containers run as non-root user
- [ ] Secrets are injected at runtime (not baked in image)
- [ ] Container networking is restricted

## ☑️ Monitoring & Logging

### Logging
- [ ] Structured logging is enabled (JSON format)
- [ ] Sensitive data is redacted from logs
- [ ] Logs are aggregated to central service
- [ ] Log retention policy is configured
- [ ] Logs are backed up

### Monitoring
- [ ] Uptime monitoring is configured
- [ ] Error tracking is enabled (Sentry, etc.)
- [ ] Performance monitoring is in place (APM)
- [ ] Rate limit violations are monitored
- [ ] Failed authentication attempts are monitored
- [ ] Database performance is monitored

### Alerting
- [ ] Critical errors trigger alerts
- [ ] High rate limit violations trigger alerts
- [ ] Failed deployments trigger alerts
- [ ] Security events trigger alerts
- [ ] On-call rotation is defined

## ☑️ Testing & Quality

### Testing
- [ ] All tests pass (100%)
- [ ] Security tests are included
- [ ] Integration tests cover critical flows
- [ ] Load testing completed (expected traffic)
- [ ] Penetration testing completed (if required)

### Code Quality
- [ ] TypeScript checks pass (no errors)
- [ ] Linter passes (no warnings)
- [ ] Build succeeds
- [ ] No known security vulnerabilities (`npm audit`)
- [ ] Dependencies are up to date

## ☑️ Compliance & Documentation

### Documentation
- [ ] Security report is up to date
- [ ] API documentation is complete
- [ ] Environment variables are documented
- [ ] Deployment procedures are documented
- [ ] Incident response plan is documented

### Compliance
- [ ] Privacy policy is published (if handling user data)
- [ ] Terms of service are published
- [ ] GDPR compliance reviewed (if applicable)
- [ ] Data retention policy is defined
- [ ] User data export/deletion works (if applicable)

### Legal
- [ ] Security contact is published (security.txt)
- [ ] Bug bounty program is considered
- [ ] Vulnerability disclosure policy is published
- [ ] Legal review completed (if required)

## ☑️ Backup & Recovery

### Backups
- [ ] Database backups are automated
- [ ] Backups are tested (restore works)
- [ ] Backups are encrypted
- [ ] Backups are stored offsite
- [ ] Backup retention policy is defined

### Disaster Recovery
- [ ] Recovery procedures are documented
- [ ] RTO/RPO targets are defined
- [ ] Failover mechanism is in place (if HA required)
- [ ] Recovery has been tested

## ☑️ Post-Deployment

### Verification
- [ ] Application is accessible via HTTPS
- [ ] Health check endpoint returns OK
- [ ] Authentication works correctly
- [ ] Critical user flows work end-to-end
- [ ] Logs are being collected
- [ ] Monitoring dashboards show data

### Security Verification
- [ ] TLS is enforced (test with HTTP)
- [ ] Security headers are present (check with browser devtools)
- [ ] Rate limiting works (test by exceeding limits)
- [ ] Authentication is required (test without token)
- [ ] No sensitive data in responses/logs

### Final Steps
- [ ] Announce deployment to team
- [ ] Update status page (if applicable)
- [ ] Monitor for errors in first 24 hours
- [ ] Schedule post-deployment review
- [ ] Celebrate successful deployment! 🎉

---

## Emergency Contacts

**Security Incidents:**
- Email: security@yourcompany.com
- Phone: +1-XXX-XXX-XXXX
- Slack: #security-incidents

**On-Call Engineer:**
- PagerDuty: https://yourcompany.pagerduty.com
- Slack: #on-call

**Incident Response Lead:**
- Name: [Your Name]
- Email: [your-email]
- Phone: [your-phone]
```

---

## ✅ Success Metrics

At completion, your application should meet these security standards:

### Coverage Metrics
- ✅ **100% API endpoint security coverage**
  - All endpoints have rate limiting
  - All endpoints have input validation
  - All protected endpoints have authentication
  - All endpoints have error handling

- ✅ **100% SQL injection prevention**
  - All database queries use parameterized statements
  - Zero string concatenation in queries
  - Zero template literals with user input

- ✅ **>95% test pass rate**
  - Security tests pass
  - Unit tests pass
  - Integration tests pass

### Security Features
- ✅ **Rate limiting** on all endpoints
- ✅ **Input validation** with Zod schemas
- ✅ **Authentication & authorization** on protected resources
- ✅ **Error handling** with no information disclosure
- ✅ **Structured logging** with sensitive data redaction
- ✅ **API key encryption** at rest (AES-256-GCM)
- ✅ **Security headers** (CSP, HSTS, etc.)
- ✅ **HTTPS enforcement** in production
- ✅ **Comprehensive monitoring** and alerting

### Documentation
- ✅ **Security report** (SECURITY_REPORT.md)
- ✅ **Environment variables guide** (.env.example)
- ✅ **Deployment checklist** (DEPLOYMENT_CHECKLIST.md)
- ✅ **Incident response plan**
- ✅ **API documentation**

---

## 🚨 Common Vulnerabilities Checklist

Before deploying, verify you've addressed:

### 1. Injection Attacks
- ✅ SQL Injection: All queries parameterized
- ✅ NoSQL Injection: Input validation for MongoDB queries
- ✅ Command Injection: No shell commands with user input
- ✅ LDAP Injection: (if applicable)

### 2. Broken Authentication
- ✅ Strong password policy (if applicable)
- ✅ Multi-factor authentication (if required)
- ✅ Session timeout
- ✅ Secure password storage (bcrypt, scrypt, argon2)
- ✅ Brute force protection (rate limiting)

### 3. Sensitive Data Exposure
- ✅ HTTPS enforced
- ✅ API keys encrypted at rest
- ✅ No secrets in version control
- ✅ No sensitive data in logs
- ✅ Secure headers (HSTS, CSP)

### 4. XML External Entities (XXE)
- ✅ XML parsing disabled or secured (if applicable)
- ✅ External entity processing disabled

### 5. Broken Access Control
- ✅ Authorization checks on all protected resources
- ✅ Resource ownership verified
- ✅ Vertical privilege escalation prevented
- ✅ Horizontal privilege escalation prevented

### 6. Security Misconfiguration
- ✅ Default passwords changed
- ✅ Unnecessary services disabled
- ✅ Security headers configured
- ✅ Error messages don't disclose info
- ✅ Admin panels secured

### 7. Cross-Site Scripting (XSS)
- ✅ Output encoding (React auto-escapes)
- ✅ No `dangerouslySetInnerHTML` without sanitization
- ✅ CSP configured
- ✅ X-XSS-Protection header

### 8. Insecure Deserialization
- ✅ Don't deserialize untrusted data
- ✅ Validate before deserializing
- ✅ Use safe serialization formats (JSON)

### 9. Using Components with Known Vulnerabilities
- ✅ Dependencies updated (`npm audit`)
- ✅ Automated dependency scanning (Dependabot, Snyk)
- ✅ Regular security updates

### 10. Insufficient Logging & Monitoring
- ✅ Security events logged
- ✅ Failed login attempts logged
- ✅ Rate limit violations logged
- ✅ Alerts configured
- ✅ Incident response plan

---

## 📚 Resources & References

### Security Standards
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **OWASP Cheat Sheets**: https://cheatsheetseries.owasp.org/
- **CWE Top 25**: https://cwe.mitre.org/top25/

### Tools & Libraries
- **Zod**: https://zod.dev/ (validation)
- **Pino**: https://getpino.io/ (logging)
- **Helmet**: https://helmetjs.github.io/ (Express security headers)
- **Bcrypt**: https://github.com/kelektiv/node.bcrypt.js (password hashing)

### Frameworks
- **Next.js Security**: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
- **Express Security**: https://expressjs.com/en/advanced/best-practice-security.html

### Compliance
- **GDPR**: https://gdpr.eu/
- **SOC 2**: https://www.aicpa.org/soc2
- **PCI DSS**: https://www.pcisecuritystandards.org/ (if handling payments)

### Testing
- **OWASP ZAP**: https://www.zaproxy.org/ (penetration testing)
- **Burp Suite**: https://portswigger.net/burp (security testing)
- **SQLMap**: https://sqlmap.org/ (SQL injection testing)

---

## 🤖 Automation Prompt for Claude Code

Use this comprehensive prompt to automate the entire security implementation:

```
Please perform a complete security audit and implementation following the enterprise-grade security patterns from Orphelix. Execute all 7 phases systematically:

**Phase 1: Security Audit**
1. Analyze technology stack (framework, database, auth)
2. Map all API endpoints (create table with current security status)
3. Calculate security coverage percentages
4. Identify critical gaps (missing rate limiting, validation, etc.)

**Phase 2: Core Infrastructure**
1. Create rate limiting system (lib/security/rate-limiter.ts)
2. Create rate limit configs (lib/security/rate-limit-configs.ts)
3. Create validation schemas (lib/validation/schemas.ts)
4. Create error handling (lib/api/errors.ts)
5. Create structured logging (lib/logger.ts)

**Phase 3: Endpoint Hardening**
1. Categorize endpoints by type
2. Secure all endpoints systematically:
   - Add rate limiting
   - Add input validation
   - Add authentication/authorization
   - Add error handling
   - Add logging
3. Commit every 5-10 endpoints
4. Track progress (X/Total secured)

**Phase 4: Database Security**
1. Audit all database queries
2. Verify 100% use parameterized statements
3. Fix any string concatenation
4. Report verification results

**Phase 5: Advanced Features**
1. Implement API key encryption (lib/security/encryption.ts)
2. Add security headers middleware
3. Configure CSP and HSTS

**Phase 6: Testing**
1. Create security test suite
2. Test rate limiting, encryption, validation
3. Run tests and report results
4. Fix any failures

**Phase 7: Documentation**
1. Create SECURITY_REPORT.md
2. Create .env.example
3. Create DEPLOYMENT_CHECKLIST.md
4. Update README with security section

**Success Criteria:**
- 100% endpoint coverage
- 100% parameterized queries
- >95% test pass rate
- Complete documentation

Please proceed step by step, showing progress after each phase.
Ask for confirmation before making major changes.
```

---

**Document version:** 1.0.0
**Last updated:** 2025-11-28
**Based on:** Orphelix Kubernetes Management Platform
**Maintained by:** AI Security Team

---

For questions or contributions, see: [SECURITY_REPORT.md](SECURITY_REPORT.md)