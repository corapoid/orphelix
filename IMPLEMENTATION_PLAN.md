# Implementation Plan: Security & Testing Improvements

**Created:** 2025-11-28
**Branch:** `feat/security-and-testing-improvements`
**Estimated Duration:** 13-15 weeks
**Current Coverage:** ~35%
**Target Coverage:** 80%+

---

## Executive Summary

This document outlines a comprehensive plan to improve the security, testing coverage, and code quality of the Orphelix Kubernetes dashboard application. The plan addresses critical security vulnerabilities, establishes comprehensive test coverage (from 35% to 80%+), and resolves significant technical debt.

### Key Objectives

1. **Security Hardening** - Fix critical vulnerabilities (rate limiting, CSP, input validation, SQL injection)
2. **Test Coverage** - Achieve 80%+ coverage across all layers (API, Database, K8s client, UI)
3. **Technical Debt** - Replace console.log with structured logging, optimize performance
4. **Code Quality** - Standardize error handling, remove hardcoded values

---

## Current State Analysis

### Coverage Breakdown
```
Overall Coverage:        35%
├── API Routes:           0%  ❌ CRITICAL
├── Database Layer:       0%  ❌ CRITICAL
├── K8s Client:           0%  ❌ CRITICAL
├── GitHub Auth:          0%  ❌ CRITICAL
├── React Hooks:         72%  ⚠️
├── UI Components:    25-88%  ⚠️
└── Mock Data:         80.8%  ✅
```

### Security Issues Identified

| Severity | Issue | Impact | Files Affected |
|----------|-------|--------|----------------|
| 🔴 CRITICAL | No rate limiting | DoS/Brute force attacks | All API routes (45+) |
| 🔴 CRITICAL | No CSP/Security headers | XSS, Clickjacking | middleware.ts |
| 🔴 CRITICAL | Weak input validation | Injection attacks | All API routes |
| 🔴 CRITICAL | SQL injection risk | Database compromise | lib/db/services.ts |
| 🟡 HIGH | OpenAI key in localStorage | Credential theft | components/settings/ai-settings.tsx |
| 🟡 HIGH | No sanitization | XSS vulnerabilities | Multiple components |
| 🟢 MEDIUM | Excessive logging (176×) | Information disclosure | 86 files |

### Performance Issues

| Issue | Impact | Location |
|-------|--------|----------|
| K8s client reinit on every call | 200-500ms latency | lib/k8s/client.ts |
| Map serialization to localStorage | Memory inefficiency | lib/core/store.ts |
| No retry logic for API calls | Poor resilience | All API calls |
| Hardcoded timeouts/URLs | Poor configurability | Multiple files |

---

## Implementation Phases

### Phase 1: Critical Security (Weeks 1-2)

#### 1.1 Rate Limiting Implementation

**Priority:** 🔴 CRITICAL
**Estimated Time:** 3 days
**Files Created:** 3
**Files Modified:** 45+

**Tasks:**
- [ ] Create `lib/security/rate-limiter.ts` with LRU cache
- [ ] Define rate limit configurations for each endpoint type
- [ ] Add rate limiting middleware to all API routes
- [ ] Add rate limit headers (X-RateLimit-*, Retry-After)
- [ ] Write security tests for rate limiting bypass attempts

**Rate Limit Strategy:**
```typescript
Deployment Restart: 10 requests / 60s per user
AI Queries:         5 requests / 60s per user
GitHub PRs:        20 requests / 300s per user
General API:       100 requests / 60s per IP
```

**Success Criteria:**
- ✅ All API routes have rate limiting
- ✅ Rate limit headers present in responses
- ✅ Tests verify 429 responses after limit exceeded
- ✅ Different limits for authenticated vs anonymous users

---

#### 1.2 Security Headers & CSP

**Priority:** 🔴 CRITICAL
**Estimated Time:** 1 day
**Files Modified:** 2

**Tasks:**
- [ ] Update `proxy.ts` middleware with security headers
- [ ] Configure Content-Security-Policy
- [ ] Add X-Frame-Options, X-Content-Type-Options
- [ ] Add Strict-Transport-Security for HTTPS
- [ ] Update `next.config.ts` with additional headers
- [ ] Test CSP doesn't break existing functionality

**Headers to Add:**
```
Content-Security-Policy
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy
Strict-Transport-Security
```

**Success Criteria:**
- ✅ All security headers present in responses
- ✅ CSP allows legitimate resources only
- ✅ No XSS/Clickjacking vulnerabilities in security scan
- ✅ Application functions normally with strict CSP

---

#### 1.3 Input Validation with Zod

**Priority:** 🔴 CRITICAL
**Estimated Time:** 1 week
**Files Created:** 2
**Files Modified:** 45+

**Tasks:**
- [ ] Create `lib/validation/schemas.ts` with Zod schemas
- [ ] Define schemas for all input types (k8s names, namespaces, YAML, etc.)
- [ ] Create validation middleware
- [ ] Add validation to all API routes
- [ ] Add validation error handling with detailed messages
- [ ] Write tests for validation edge cases

**Validation Schemas:**
```typescript
- k8sNameSchema: ^[a-z0-9]([-a-z0-9]*[a-z0-9])?$ (1-253 chars)
- namespaceSchema: ^[a-z0-9]([-a-z0-9]*[a-z0-9])?$ (1-63 chars)
- contextNameSchema: ^[a-zA-Z0-9_.-]+$ (1-255 chars)
- yamlContentSchema: max 1MB, valid YAML syntax
- githubRepoSchema: owner, repo, branch validation
- aiQuerySchema: query, apiKey format validation
```

**Success Criteria:**
- ✅ All API routes validate inputs
- ✅ Invalid inputs return 400 with detailed error
- ✅ No unvalidated data reaches business logic
- ✅ Tests cover all validation edge cases

---

#### 1.4 SQL Injection Prevention

**Priority:** 🔴 CRITICAL
**Estimated Time:** 2 days
**Files Created:** 1
**Files Modified:** 2

**Tasks:**
- [ ] Create `lib/db/query-builder.ts` with safe query builder
- [ ] Refactor `UserSettingsService.update()` with whitelist approach
- [ ] Add field name validation (alphanumeric + underscore only)
- [ ] Add table name whitelist
- [ ] Write SQL injection attack tests
- [ ] Verify all database operations use safe methods

**Safety Measures:**
```typescript
1. Whitelist allowed fields
2. Validate column names (regex: ^[a-z_]+$)
3. Validate table names (enum of allowed tables)
4. Always use prepared statements
5. Never concatenate user input into SQL
```

**Success Criteria:**
- ✅ All SQL queries use prepared statements
- ✅ Field names validated against whitelist
- ✅ SQL injection tests pass (various payloads)
- ✅ No dynamic SQL string concatenation

---

### Phase 2: Structured Logging (Week 3)

#### 2.1 Logger Implementation

**Priority:** 🟡 HIGH
**Estimated Time:** 3 days
**Files Created:** 2
**Files Modified:** 86

**Tasks:**
- [ ] Install pino and pino-pretty
- [ ] Create `lib/logging/logger.ts` with typed logger
- [ ] Create specialized loggers (api, k8s, db, security)
- [ ] Configure log redaction for sensitive data
- [ ] Create codemod script to replace console.log
- [ ] Run codemod on all files (86 files)
- [ ] Manual review of converted logs
- [ ] Add request/response logging middleware

**Log Redaction:**
```typescript
Redact:
- req.headers.authorization
- req.headers.cookie
- *.apiKey
- *.token
- *.password
- *.secret
- *.privateKey
```

**Success Criteria:**
- ✅ 0× console.log in production code
- ✅ All logs use structured format (JSON)
- ✅ Sensitive data redacted from logs
- ✅ Log levels configurable via env var
- ✅ Development mode has pretty printing

---

### Phase 3: Performance Optimizations (Week 3-4)

#### 3.1 K8s Client Caching

**Priority:** 🟡 HIGH
**Estimated Time:** 1 day
**Files Modified:** 2

**Tasks:**
- [ ] Implement client cache with TTL (5 minutes)
- [ ] Add cache key generation (context-based)
- [ ] Add cache expiry cleanup
- [ ] Add metrics collection (cache hits/misses)
- [ ] Test token refresh for AWS EKS
- [ ] Benchmark performance improvement

**Cache Strategy:**
```typescript
Cache Key: contextName
TTL: 5 minutes (AWS EKS tokens valid 15min)
Eviction: LRU + periodic cleanup
Metrics: cache hits, misses, evictions
```

**Success Criteria:**
- ✅ 90%+ cache hit rate in normal usage
- ✅ Latency reduced by 200-500ms per request
- ✅ AWS EKS tokens refresh before expiry
- ✅ Memory usage stays under 100MB for cache

---

#### 3.2 Retry Logic for API Calls

**Priority:** 🟡 HIGH
**Estimated Time:** 1 day
**Files Created:** 1
**Files Modified:** 10+

**Tasks:**
- [ ] Create `lib/api/retry.ts` with exponential backoff
- [ ] Add retry wrapper to K8s API calls
- [ ] Add retry wrapper to GitHub API calls
- [ ] Configure retryable status codes (408, 429, 5xx)
- [ ] Add retry metrics logging
- [ ] Test retry behavior with network failures

**Retry Configuration:**
```typescript
Max Attempts: 3
Initial Delay: 1000ms
Max Delay: 10000ms
Backoff Multiplier: 2
Retryable: 408, 429, 500, 502, 503, 504
```

**Success Criteria:**
- ✅ Transient failures automatically retried
- ✅ Exponential backoff prevents thundering herd
- ✅ Max 3 attempts before final failure
- ✅ Retry attempts logged for debugging

---

#### 3.3 Configuration Constants

**Priority:** 🟢 MEDIUM
**Estimated Time:** 1 day
**Files Created:** 1
**Files Modified:** 15+

**Tasks:**
- [ ] Create `lib/config/constants.ts` with all config
- [ ] Replace hardcoded timeouts (30000ms → CONFIG.TIMEOUTS.SSE_HEARTBEAT)
- [ ] Replace hardcoded URLs
- [ ] Add config validation on startup
- [ ] Update `.env.local.example` with new variables
- [ ] Document all configuration options

**Configuration Categories:**
```typescript
TIMEOUTS: SSE, K8s API, GitHub API, Database
RETRY: Max attempts, delays
RATE_LIMITS: Per-endpoint configurations
CACHE: TTLs for various caches
URLS: External service endpoints
LIMITS: Max sizes for inputs
```

**Success Criteria:**
- ✅ 0× hardcoded timeouts/URLs in code
- ✅ All config values from environment or defaults
- ✅ Config validation catches invalid values
- ✅ Documentation lists all config options

---

#### 3.4 Error Response Standardization

**Priority:** 🟡 HIGH
**Estimated Time:** 2 days
**Files Created:** 1
**Files Modified:** 45+

**Tasks:**
- [ ] Create `lib/api/errors.ts` with error classes
- [ ] Define error types (ValidationError, AuthError, NotFoundError, etc.)
- [ ] Create error handler middleware
- [ ] Update all API routes to use standard errors
- [ ] Ensure consistent HTTP status codes
- [ ] Add error response schema

**Error Classes:**
```typescript
ValidationError: 400
AuthenticationError: 401
AuthorizationError: 403
NotFoundError: 404
ConflictError: 409
RateLimitError: 429
ExternalServiceError: 502
DatabaseError: 500
```

**Success Criteria:**
- ✅ All errors use standard classes
- ✅ Consistent HTTP status codes across API
- ✅ Error responses have code, message, details
- ✅ Internal errors don't expose sensitive info

---

### Phase 4: OpenAI Key Migration (Week 4-5)

#### 4.1 Database Encryption

**Priority:** 🟡 HIGH
**Estimated Time:** 2 days
**Files Created:** 3
**Files Modified:** 3

**Tasks:**
- [ ] Create `lib/security/encryption.ts` with AES-256-GCM
- [ ] Add migration `lib/db/migrations/001_add_encryption.sql`
- [ ] Update database schema with encrypted column
- [ ] Add encryption methods to UserSettingsService
- [ ] Create API endpoint `/api/settings/ai`
- [ ] Update AI settings component to use API
- [ ] Remove localStorage usage for API key

**Encryption Details:**
```
Algorithm: AES-256-GCM
Key Source: ENCRYPTION_KEY env var (32 bytes base64)
Storage: JSON {encrypted, iv, tag}
Display: Masked (sk-...xxxx)
```

**Success Criteria:**
- ✅ API keys encrypted at rest
- ✅ Encryption key from environment only
- ✅ 0× API keys in localStorage
- ✅ Keys displayed as masked in UI
- ✅ Encryption tests verify algorithm

---

### Phase 5: Database Layer Tests (Week 5-6)

**Priority:** 🔴 CRITICAL
**Estimated Time:** 1 week
**Coverage Target:** 0% → 85%+

**Tasks:**
- [ ] Write `__tests__/lib/db/database.test.ts`
- [ ] Write `__tests__/lib/db/services.test.ts`
- [ ] Write `__tests__/lib/db/migrations.test.ts`
- [ ] Write `__tests__/lib/db/security.test.ts` (SQL injection)
- [ ] Write `__tests__/lib/db/transactions.test.ts` (ACID)
- [ ] Write `__tests__/lib/db/performance.test.ts` (concurrency)

**Test Categories:**
```typescript
Database Initialization:
- Schema creation
- WAL mode enabled
- Singleton constraints
- Migration execution

UserSettingsService:
- CRUD operations
- SQL injection prevention ✅ CRITICAL
- Transaction rollback
- Concurrent updates

Security:
- Directory traversal prevention
- File permissions (600)
- Input sanitization
- TOCTOU attacks

Performance:
- Concurrent access
- WAL performance
- Query optimization
```

**Success Criteria:**
- ✅ 85%+ coverage for database layer
- ✅ All SQL injection tests pass
- ✅ Transaction tests verify ACID properties
- ✅ Concurrent access tests pass

---

### Phase 6: API Routes Tests (Week 7-10)

**Priority:** 🔴 CRITICAL
**Estimated Time:** 3-4 weeks
**Coverage Target:** 0% → 80%+
**Files to Create:** ~45 test files

#### 6.1 Authentication & Authorization Tests

**Files:**
- `__tests__/api/auth/nextauth.test.ts`
- `__tests__/api/github-app/callback.test.ts`
- `__tests__/api/github-app/installations.test.ts`

**Test Coverage:**
- [ ] GitHub OAuth flow
- [ ] Session creation and validation
- [ ] GitHub App installation flow
- [ ] Token exchange and refresh
- [ ] Session expiry handling
- [ ] CSRF protection

---

#### 6.2 Kubernetes Operations Tests (CRITICAL)

**Files:**
- `__tests__/api/deployments/restart.test.ts` ⚠️ CRITICAL
- `__tests__/api/pods/restart.test.ts` ⚠️ CRITICAL
- `__tests__/api/deployments/list.test.ts`
- `__tests__/api/pods/logs.test.ts`
- (15+ more files)

**Security Tests:**
- [ ] Require authentication
- [ ] Validate namespace parameter
- [ ] Prevent SQL injection in resource names
- [ ] Prevent path traversal attacks
- [ ] Rate limit enforcement
- [ ] RBAC permission checks

**Functionality Tests:**
- [ ] Successful restart operation
- [ ] Handle K8s API errors gracefully
- [ ] Return 404 for non-existent resources
- [ ] Validate resource name format
- [ ] Handle network timeouts
- [ ] Retry on transient failures

**Integration Tests:**
- [ ] Verify K8s API calls
- [ ] Verify annotation updates
- [ ] Handle concurrent requests
- [ ] Validate kubeconfig context

---

#### 6.3 AI & GitHub Integration Tests

**Files:**
- `__tests__/api/ai/troubleshoot.test.ts` ⚠️ HIGH RISK
- `__tests__/api/ai/match-file.test.ts`
- `__tests__/api/github/create-pr.test.ts`
- `__tests__/api/github/merge-pr.test.ts`

**Security Tests:**
- [ ] API key validation and format
- [ ] Prevent API key leakage in logs
- [ ] Rate limiting for AI queries
- [ ] Input size limits
- [ ] SSRF prevention for URLs
- [ ] GitHub token validation

**Functionality Tests:**
- [ ] AI troubleshooting responses
- [ ] Context formatting
- [ ] PR creation workflow
- [ ] PR merging workflow
- [ ] File matching algorithm

---

#### 6.4 Settings & Database Tests

**Files:**
- `__tests__/api/settings/route.test.ts`
- `__tests__/api/settings/github.test.ts`
- `__tests__/api/settings/ai.test.ts`

**Tests:**
- [ ] CRUD operations
- [ ] SQL injection prevention ✅
- [ ] Input validation
- [ ] Concurrent updates handling
- [ ] Migration from localStorage

---

### Phase 7: Security Test Suite (Week 11)

**Priority:** 🔴 CRITICAL
**Estimated Time:** 1.5 weeks
**Files to Create:** 10+

#### 7.1 Security Tests

**Files:**
- `__tests__/security/authentication.test.ts`
- `__tests__/security/authorization.test.ts`
- `__tests__/security/input-validation.test.ts`
- `__tests__/security/sql-injection.test.ts`
- `__tests__/security/xss-prevention.test.ts`
- `__tests__/security/csrf-protection.test.ts`
- `__tests__/security/rate-limiting.test.ts`
- `__tests__/security/secrets-management.test.ts`
- `__tests__/security/api-security.test.ts`
- `__tests__/security/penetration/` (SSRF, path traversal, command injection)

**Test Categories:**
```typescript
Authentication:
- Session fixation prevention
- Session invalidation on logout
- CSRF token validation
- Session hijacking prevention
- Brute force protection

Authorization:
- RBAC enforcement
- Privilege escalation prevention
- Namespace access validation
- Horizontal privilege escalation

Input Validation:
- XSS prevention (all inputs)
- YAML validation
- XXE attack prevention
- Input size limits

SQL Injection:
- Prepared statement usage
- Field name validation
- Table name whitelist
- Multiple injection vectors

Rate Limiting:
- Per-user limits
- Per-IP limits
- 429 response codes
- Retry-After headers

Secrets Management:
- No secrets in logs
- Encryption at rest
- HTTP-only cookies
- No secrets in error messages
```

**Success Criteria:**
- ✅ 80%+ coverage for security tests
- ✅ All common attack vectors tested
- ✅ OWASP Top 10 vulnerabilities tested
- ✅ Penetration tests pass

---

### Phase 8: K8s Client Tests (Week 11-12)

**Priority:** 🔴 CRITICAL
**Estimated Time:** 1 week
**Coverage Target:** 0% → 80%+

**Files:**
- `__tests__/lib/k8s/client.test.ts`
- `__tests__/lib/k8s/api.test.ts`
- `__tests__/lib/k8s/auth.test.ts`
- `__tests__/lib/k8s/error-handling.test.ts`
- `__tests__/lib/k8s/performance.test.ts`

**Test Categories:**
```typescript
Client Initialization:
- Kubeconfig path validation
- Context switching
- Certificate validation
- Credentials not exposed in logs

Token Management (AWS EKS):
- Token refresh on expiry
- Token caching
- Exec auth failures

Performance:
- Client reuse (cache hit rate)
- No unnecessary reinit
- Concurrent request handling

Network Resilience:
- Timeout handling (30s)
- Retry on transient failures
- Network partition handling

Security:
- SSRF prevention
- Certificate validation
- No credential leakage
```

**Success Criteria:**
- ✅ 80%+ coverage for K8s client
- ✅ AWS EKS token refresh tested
- ✅ Cache hit rate >90% verified
- ✅ All error scenarios covered

---

### Phase 9: GitHub Auth Tests (Week 12)

**Priority:** 🔴 CRITICAL
**Estimated Time:** 4 days
**Coverage Target:** 0% → 80%+

**Files:**
- `__tests__/lib/auth/github-app.test.ts`
- `__tests__/lib/github/client.test.ts`
- `__tests__/lib/github/token-management.test.ts`
- `__tests__/lib/github/security.test.ts`

**Test Categories:**
```typescript
Authentication Flow:
- Private key validation
- OAuth code exchange
- Token refresh
- Installation token generation

Security:
- Private key not in logs ✅ CRITICAL
- Token not exposed ✅ CRITICAL
- Webhook signature validation

Error Handling:
- GitHub API errors
- Rate limit handling
- Network failures

Token Management:
- Expiry detection
- Automatic refresh
- Token caching (1h TTL)
```

**Success Criteria:**
- ✅ 80%+ coverage for GitHub auth
- ✅ Private key security verified
- ✅ Token lifecycle tested
- ✅ Error scenarios covered

---

### Phase 10: UI & Store Tests (Week 13)

**Priority:** 🟡 HIGH
**Estimated Time:** 1 week
**Coverage Target:** 25% → 80%+

#### 10.1 Store Tests Enhancement

**Files to Update:**
- `__tests__/lib/core/store.test.ts` (36% → 80%+)

**New Tests:**
```typescript
useGitHubStore:
- localStorage persistence
- Map serialization
- Server sync
- Storage quota exceeded

useClusterAliases:
- Load from localStorage
- Sync to database
- Alias CRUD operations

useSidebarPins:
- Pin/unpin items
- Set serialization
- Persistence

useCriticalIssuesSettings:
- Resource enable/disable
- Set serialization
- Persistence
```

---

#### 10.2 UI Component Tests

**Files:**
- `__tests__/lib/ui/theme/theme-builder.test.ts` (0% → 80%)
- `__tests__/lib/ui/providers/ThemeProvider.test.tsx` (2.63% → 80%)
- `__tests__/lib/ui/components/GlassButton.test.tsx` (0% → 80%)
- `__tests__/lib/ui/components/GlassCard.test.tsx` (0% → 80%)
- `__tests__/lib/ui/components/GlassPanel.test.tsx` (66% → 80%)

**Test Categories:**
```typescript
Theme System:
- Theme generation
- Color token application
- Dark/light mode switching
- Theme persistence

UI Components:
- Rendering
- Props handling
- User interactions
- Accessibility
```

**Success Criteria:**
- ✅ 80%+ coverage for store
- ✅ 80%+ coverage for UI components
- ✅ Mock localStorage for tests
- ✅ All user interactions tested

---

### Phase 11: E2E Tests Rebuild (Week 14-15)

**Priority:** 🔴 CRITICAL
**Estimated Time:** 2 weeks
**Files to Create:** 30+

#### 11.1 E2E Infrastructure

**Files:**
- `tests/e2e/setup/global-setup.ts`
- `tests/e2e/setup/test-database.ts`
- `tests/e2e/setup/mock-cluster.ts`
- `tests/e2e/fixtures/app.fixture.ts`
- `playwright.config.ts` (complete rewrite)

**Setup Tasks:**
- [ ] Configure Playwright with multiple browsers
- [ ] Create global setup (start app, init DB)
- [ ] Create fixtures (auth, demo mode)
- [ ] Configure video/screenshot on failure
- [ ] Set up parallel execution

---

#### 11.2 Authentication E2E Tests

**Files:**
- `tests/e2e/auth/login.spec.ts`
- `tests/e2e/auth/oauth.spec.ts`
- `tests/e2e/auth/github-app.spec.ts`

**Tests:**
- [ ] GitHub OAuth login flow
- [ ] Redirect to dashboard after login
- [ ] Logout and session clear
- [ ] Demo mode toggle
- [ ] GitHub App installation

---

#### 11.3 Critical Operations E2E Tests

**Files:**
- `tests/e2e/deployments/restart.spec.ts` ⚠️ CRITICAL
- `tests/e2e/pods/restart.spec.ts` ⚠️ CRITICAL
- `tests/e2e/github/create-pr.spec.ts`

**Tests:**
```typescript
Deployment Restart:
- Click restart button
- Confirm dialog appears
- Loading state during restart
- Success notification shown
- Deployment updated in UI

Pod Restart:
- Navigate to pod details
- Restart button visible
- Confirmation required
- Error handling on failure

GitHub PR Creation:
- Edit YAML in Monaco editor
- Click "Create PR"
- PR created successfully
- Link to PR shown
```

---

#### 11.4 Security E2E Tests

**Files:**
- `tests/e2e/security/xss.spec.ts`
- `tests/e2e/security/csrf.spec.ts`
- `tests/e2e/security/authorization.spec.ts`

**Tests:**
```typescript
XSS Prevention:
- Deployment names with <script>
- Pod logs with malicious HTML
- YAML editor input
- GitHub PR descriptions

CSRF Protection:
- POST without CSRF token
- Invalid CSRF token
- Token expiry

Authorization:
- Access denied for unauthorized resources
- Namespace isolation
- Role-based access control
```

---

#### 11.5 Performance E2E Tests

**Files:**
- `tests/e2e/performance/sse.spec.ts`
- `tests/e2e/performance/pagination.spec.ts`
- `tests/e2e/performance/memory-leaks.spec.ts`

**Tests:**
```typescript
SSE Real-time Updates:
- Receive pod status changes
- Reconnect on disconnect
- Heartbeat timeout handling
- No memory leaks after 1h

Pagination:
- Load 1000+ pods
- Scroll performance
- Filter/search performance

Memory:
- Monitor memory usage
- Detect leaks (heap snapshots)
- Verify cleanup on unmount
```

---

#### 11.6 Accessibility E2E Tests

**Files:**
- `tests/e2e/accessibility/a11y.spec.ts`

**Tests:**
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] ARIA labels
- [ ] Focus management

**Success Criteria:**
- ✅ 30+ E2E test files created
- ✅ All critical flows covered
- ✅ Security scenarios tested
- ✅ Performance benchmarks established
- ✅ Accessibility standards met (WCAG 2.1 AA)

---

### Phase 12: Additional Improvements (Week 15)

#### 12.1 IndexedDB Migration

**Priority:** 🟢 MEDIUM
**Estimated Time:** 2 days

**Tasks:**
- [ ] Create `lib/storage/indexed-db.ts`
- [ ] Create migration from localStorage
- [ ] Update GitHub store to use IndexedDB
- [ ] Update cluster aliases to use IndexedDB
- [ ] Test migration with existing data
- [ ] Benchmark performance improvement

**Success Criteria:**
- ✅ localStorage → IndexedDB migration successful
- ✅ No data loss during migration
- ✅ Performance improved for large datasets
- ✅ Storage quota handling implemented

---

#### 12.2 Resolve TODO/FIXME Comments

**Priority:** 🟢 MEDIUM
**Estimated Time:** 3-4 days

**Tasks:**
- [ ] Audit all TODO/FIXME comments (17 found)
- [ ] Categorize by priority (CRITICAL, HIGH, MEDIUM, LOW)
- [ ] Create GitHub issues for each
- [ ] Resolve CRITICAL and HIGH in this sprint
- [ ] Add remaining to backlog/roadmap

**Success Criteria:**
- ✅ All TODOs documented in GitHub issues
- ✅ CRITICAL and HIGH items resolved
- ✅ Remaining items in product roadmap

---

## Testing Strategy

### Unit Tests

**Framework:** Vitest
**Coverage Tool:** v8
**Target:** 80%+ overall coverage

**Patterns:**
```typescript
// Arrange-Act-Assert pattern
describe('Feature', () => {
  beforeEach(() => {
    // Setup
  })

  it('should do something', () => {
    // Arrange
    const input = setupTestData()

    // Act
    const result = functionUnderTest(input)

    // Assert
    expect(result).toEqual(expected)
  })
})
```

**Mocking Strategy:**
- Mock external dependencies (K8s API, GitHub API)
- Use MSW for HTTP mocking
- Mock database with in-memory SQLite
- Mock filesystem operations

---

### Integration Tests

**Approach:** API route tests with real database

**Setup:**
```typescript
beforeEach(async () => {
  // Create test database
  await initTestDatabase()

  // Start Next.js test server
  await startTestServer()
})

afterEach(async () => {
  // Clean up
  await cleanupDatabase()
  await stopTestServer()
})
```

---

### E2E Tests

**Framework:** Playwright
**Browsers:** Chromium, Firefox
**Execution:** Parallel (CI: sequential)

**Structure:**
```typescript
test.describe('Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/feature')
  })

  test('should perform action', async ({ page }) => {
    // Interact with page
    await page.click('button')

    // Assert
    await expect(page.locator('.result')).toBeVisible()
  })
})
```

---

### Security Tests

**Approach:** Dedicated security test suite

**Categories:**
1. **Input Validation** - Test all injection vectors
2. **Authentication** - Test session security
3. **Authorization** - Test access controls
4. **Rate Limiting** - Test DoS prevention
5. **Encryption** - Test data protection

**Tools:**
- Zod for schema validation testing
- Custom SQL injection payloads
- XSS payloads from OWASP
- CSRF token validation

---

## Success Metrics

### Coverage Targets

| Layer | Current | Target | Critical |
|-------|---------|--------|----------|
| Overall | 35% | 80%+ | ✅ |
| API Routes | 0% | 80%+ | ✅ |
| Database | 0% | 85%+ | ✅ |
| K8s Client | 0% | 80%+ | ✅ |
| GitHub Auth | 0% | 80%+ | ✅ |
| React Hooks | 72% | 80%+ | - |
| UI Components | 25% | 80%+ | - |
| Store | 36% | 80%+ | - |

---

### Security Metrics

**Before:**
- ❌ No rate limiting
- ❌ No CSP headers
- ❌ No input validation
- ❌ SQL injection risk
- ⚠️ API keys in localStorage
- ⚠️ 176× console.log

**After:**
- ✅ Rate limiting on all endpoints
- ✅ Full CSP + security headers
- ✅ Zod validation on all inputs
- ✅ SQL injection prevented
- ✅ API keys encrypted in database
- ✅ Structured logging (pino)

---

### Performance Metrics

**Before:**
- K8s client: 200-500ms latency (reinit on every call)
- No retry logic (poor resilience)
- Map serialization to localStorage (inefficient)

**After:**
- K8s client: <50ms (90%+ cache hit rate)
- Retry logic with exponential backoff
- IndexedDB for efficient storage

---

## Dependencies

### New Dependencies

```json
{
  "dependencies": {
    "zod": "^3.22.4",
    "pino": "^8.16.2",
    "pino-pretty": "^10.2.3",
    "lru-cache": "^10.1.0",
    "idb": "^8.0.0",
    "isomorphic-dompurify": "^2.9.0"
  },
  "devDependencies": {
    "msw": "^2.0.0",
    "@playwright/test": "^1.40.0"
  }
}
```

---

## Risk Management

### High-Risk Changes

| Change | Risk | Mitigation |
|--------|------|------------|
| Rate limiting | May block legitimate users | Start with generous limits, monitor metrics |
| CSP headers | May break existing functionality | Test thoroughly, gradual rollout |
| K8s client caching | Stale data if TTL too long | 5min TTL, metrics monitoring |
| Database encryption | Migration may fail | Backup before migration, rollback plan |
| E2E tests | May be flaky | Retry logic, deterministic test data |

---

### Rollback Plan

**If critical issues arise:**
1. Revert Git branch to main
2. Redeploy previous version
3. Investigate issue in isolation
4. Fix and re-test before re-deploying

**Feature Flags:**
- Rate limiting can be disabled via env var
- CSP can be set to report-only mode
- K8s client caching can be disabled

---

## Timeline

### Sprint Breakdown

```
Sprint 1-2:  Security Critical (Weeks 1-2)
  - Rate limiting
  - Security headers
  - Input validation
  - SQL injection prevention

Sprint 3:    Logging & Performance (Week 3)
  - Structured logging (pino)
  - K8s client caching
  - Retry logic

Sprint 4:    Configuration & Errors (Week 4)
  - Configuration constants
  - Error standardization
  - OpenAI key migration (start)

Sprint 5:    Database Tests (Week 5)
  - Database layer tests
  - SQL injection tests
  - Transaction tests

Sprint 6-9:  API Route Tests (Weeks 6-9)
  - Authentication tests
  - Kubernetes operation tests
  - AI & GitHub tests
  - Settings tests

Sprint 10:   Security Test Suite (Week 10)
  - Comprehensive security tests
  - Penetration testing

Sprint 11:   K8s & GitHub Tests (Week 11)
  - K8s client tests
  - GitHub auth tests

Sprint 12:   UI & Store Tests (Week 12)
  - Store tests enhancement
  - UI component tests

Sprint 13-14: E2E Rebuild (Weeks 13-14)
  - E2E infrastructure
  - Critical operation tests
  - Security E2E tests
  - Performance tests

Sprint 15:   Final Improvements (Week 15)
  - IndexedDB migration
  - Resolve TODOs
  - Final testing & documentation
```

---

## Monitoring & Validation

### Continuous Integration

**GitHub Actions Workflow:**
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Install dependencies
      - Run linter (ESLint)
      - Run type check (TypeScript)
      - Run unit tests (Vitest)
      - Run E2E tests (Playwright)
      - Generate coverage report
      - Fail if coverage < 80%
```

---

### Code Quality Gates

**Pre-commit:**
- ESLint must pass
- TypeScript must compile
- Prettier formatting

**Pre-merge:**
- All tests must pass
- Coverage >= 80%
- No security vulnerabilities (npm audit)
- E2E tests pass

---

### Security Scanning

**Tools:**
- `npm audit` for dependency vulnerabilities
- ESLint security plugins
- Snyk for container scanning
- OWASP ZAP for penetration testing (manual)

**Schedule:**
- Every commit: npm audit
- Weekly: Snyk scan
- Monthly: Full penetration test

---

## Documentation Updates

### Files to Update

1. **README.md**
   - Add security section
   - Update testing section
   - Add configuration guide

2. **SECURITY.md**
   - Document rate limiting
   - Document encryption
   - Update authentication flow

3. **CONTRIBUTING.md** (new)
   - Test requirements
   - Security guidelines
   - Code review process

4. **API.md** (new)
   - Document all endpoints
   - Error response formats
   - Rate limit headers

---

## Completion Checklist

### Phase 1: Security Critical
- [ ] Rate limiting implemented and tested
- [ ] Security headers configured
- [ ] Input validation with Zod
- [ ] SQL injection prevented
- [ ] Security tests pass

### Phase 2: Logging
- [ ] Pino logger implemented
- [ ] All console.log replaced
- [ ] Sensitive data redacted
- [ ] Log levels configurable

### Phase 3: Performance
- [ ] K8s client caching (90%+ hit rate)
- [ ] Retry logic implemented
- [ ] Configuration constants
- [ ] Error standardization

### Phase 4: OpenAI Migration
- [ ] Database encryption implemented
- [ ] API endpoint created
- [ ] UI updated
- [ ] Migration tested

### Phase 5-12: Testing
- [ ] Database tests (85%+ coverage)
- [ ] API route tests (80%+ coverage)
- [ ] Security test suite
- [ ] K8s client tests
- [ ] GitHub auth tests
- [ ] UI & store tests
- [ ] E2E tests rebuilt
- [ ] Coverage targets met

### Final
- [ ] All linter errors fixed
- [ ] All TypeScript errors fixed
- [ ] Coverage >= 80% overall
- [ ] E2E tests pass in CI
- [ ] Security scan passes
- [ ] Documentation updated
- [ ] TODO/FIXME resolved or tracked

---

## Appendix

### A. File Structure

```
orphelix/
├── app/
│   ├── api/                           (45+ routes to test)
│   ├── components/                    (UI components)
│   └── lib/
│       ├── security/                  (NEW)
│       │   ├── rate-limiter.ts
│       │   ├── encryption.ts
│       │   ├── sanitization.ts
│       │   └── middleware.ts
│       ├── validation/                (NEW)
│       │   ├── schemas.ts
│       │   └── middleware.ts
│       ├── logging/                   (NEW)
│       │   ├── logger.ts
│       │   └── middleware.ts
│       ├── api/                       (NEW)
│       │   ├── errors.ts
│       │   └── retry.ts
│       ├── storage/                   (NEW)
│       │   ├── indexed-db.ts
│       │   └── migration.ts
│       ├── config/                    (NEW)
│       │   └── constants.ts
│       └── db/
│           ├── query-builder.ts       (NEW)
│           └── migrations/            (NEW)
├── __tests__/                         (NEW - 108+ files)
│   ├── api/                           (45 files)
│   ├── lib/                           (30 files)
│   ├── components/                    (10 files)
│   ├── security/                      (10 files)
│   └── integration/                   (13 files)
├── tests/
│   └── e2e/                           (NEW - 30 files)
├── scripts/
│   └── replace-console-logs.ts        (NEW)
├── IMPLEMENTATION_PLAN.md             (THIS FILE)
└── vitest.config.ts                   (UPDATE)
```

---

### B. Environment Variables

```bash
# Security
ENCRYPTION_KEY=                        # 32-byte base64 key
RATE_LIMIT_ENABLED=true               # Enable/disable rate limiting

# Timeouts (milliseconds)
SSE_HEARTBEAT_MS=30000
K8S_TIMEOUT_MS=10000
GITHUB_TIMEOUT_MS=15000
DB_TIMEOUT_MS=5000

# Retry
RETRY_MAX_ATTEMPTS=3
RETRY_INITIAL_DELAY_MS=1000
RETRY_MAX_DELAY_MS=10000

# Rate Limits
RL_RESTART_WINDOW_MS=60000
RL_RESTART_MAX=10
RL_AI_WINDOW_MS=60000
RL_AI_MAX=5
RL_PR_WINDOW_MS=300000
RL_PR_MAX=20

# Cache TTLs
CACHE_K8S_CLIENT_MS=300000            # 5 minutes
CACHE_GITHUB_TOKEN_MS=3600000         # 1 hour

# Logging
LOG_LEVEL=info                        # debug|info|warn|error
```

---

### C. Testing Commands

```bash
# Unit tests
npm run test                          # Run all tests
npm run test:watch                    # Watch mode
npm run test:coverage                 # With coverage
npm run test:security                 # Security tests only

# E2E tests
npm run test:e2e                      # All E2E tests
npm run test:e2e:ui                   # With UI
npm run test:e2e:debug                # Debug mode

# Linting
npm run lint                          # ESLint
npm run lint:fix                      # Auto-fix
npm run type-check                    # TypeScript

# Combined
npm run validate                      # Lint + Type + Test
```

---

### D. Git Workflow

```bash
# Create feature branch (DONE)
git checkout -b feat/security-and-testing-improvements

# Work in phases
git add .
git commit -m "feat(security): add rate limiting"
git commit -m "test(api): add deployment restart tests"

# Before merge
npm run validate                       # All checks pass
npm run test:coverage                  # >= 80%
npm run test:e2e                       # All pass

# Create PR
gh pr create --title "Security & Testing Improvements" \
             --body "Implements comprehensive security hardening and testing"
```

---

**Document Version:** 1.0
**Last Updated:** 2025-11-28
**Author:** AI Assistant (Claude)
**Reviewed By:** TBD
