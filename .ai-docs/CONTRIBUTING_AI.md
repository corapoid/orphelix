# Contributing with AI - Orphelix

> **Document for AI**: Guidelines and best practices when working on the Orphelix project in AI-first development model.

## 📋 Before Starting Work

### 1. **Read Contextual Documentation**

**Mandatory:**
- ✅ [AI_CONTEXT.md](AI_CONTEXT.md) - Architecture, patterns, gotchas
- ✅ [TECHNICAL.md](app/TECHNICAL.md) - Full technical documentation
- ✅ [SECURITY.md](SECURITY.md) - Security patterns, auth flow

**Optional (depending on task):**
- [CHANGELOG.md](CHANGELOG.md) - Change history (for bugfixes)
- `docs/developer/` - Developer guides (for larger features)

### 2. **Understand the Task**

**Questions about the task before starting:**
1. Is this a new feature, bugfix, refactoring, or documentation?
2. Does it affect frontend, backend, or both?
3. Does it require K8s API operations? (→ server-side only!)
4. Does it require tests? (answer: almost always YES)
5. Could it break existing functionality? (→ regression tests)

### 3. **Check Existing Patterns**

**Before writing new code:**
- 🔍 Search for similar functionality (e.g., deployments → pattern for services)
- 🔍 Check `lib/k8s/api.ts` - does the function already exist?
- 🔍 See tests for similar features
- 🔍 Verify architectural decisions in AI_CONTEXT.md

**Example:**
```bash
# Want to add support for Kubernetes Jobs
# 1. Check how Deployments are done
grep -r "deployment" app/api/
grep -r "useDeployments" lib/hooks/

# 2. See tests
ls __tests__/lib/hooks/use-deployments.test.ts

# 3. Copy pattern and adapt for Jobs
```

---

## 🏗️ Implementation - Step by Step

### **Feature: New Kubernetes Resource**

**Example: Adding Services Support**

#### Step 1: API Route
```typescript
// app/api/services/route.ts
import { NextResponse } from 'next/server'
import { fetchServices } from '@/lib/k8s/api'

export async function GET() {
  try {
    const services = await fetchServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error('[API] Failed to fetch services:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch services',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
```

**Checklist:**
- [ ] Try-catch block
- [ ] Console.error with context `[API]`
- [ ] Proper error response (status 500)
- [ ] User-friendly error message + technical details

#### Step 2: K8s API Function
```typescript
// lib/k8s/api.ts

export async function fetchServices(namespace?: string): Promise<Service[]> {
  const ns = namespace || getCurrentNamespace()
  const coreApi = getK8sClient().makeApiClient(k8s.CoreV1Api)

  try {
    const response = await coreApi.listNamespacedService({ namespace: ns })
    return response.items.map(mapService)
  } catch (error) {
    console.error('[K8s API] Failed to fetch services:', error)
    throw error
  }
}

function mapService(service: k8s.V1Service): Service {
  return {
    name: service.metadata?.name || '',
    namespace: service.metadata?.namespace || '',
    type: service.spec?.type || 'ClusterIP',
    clusterIP: service.spec?.clusterIP || '',
    ports: service.spec?.ports?.map(p => ({
      port: p.port,
      targetPort: p.targetPort,
      protocol: p.protocol || 'TCP',
      name: p.name,
    })) || [],
    selector: service.spec?.selector || {},
    createdAt: service.metadata?.creationTimestamp?.toISOString() || '',
  }
}
```

**Checklist:**
- [ ] Use object parameters: `{ namespace: ns }`
- [ ] Response is direct: `response.items` (NOT `response.body.items`)
- [ ] Mapper function for type safety
- [ ] Handle optional fields with `||` fallback
- [ ] ISO string for timestamps

#### Step 3: TypeScript Types
```typescript
// types/kubernetes.ts

export interface Service {
  name: string
  namespace: string
  type: 'ClusterIP' | 'NodePort' | 'LoadBalancer' | 'ExternalName'
  clusterIP: string
  ports: ServicePort[]
  selector: Record<string, string>
  createdAt: string
}

export interface ServicePort {
  port: number
  targetPort: string | number
  protocol: 'TCP' | 'UDP' | 'SCTP'
  name?: string
}
```

**Checklist:**
- [ ] Export interface (available for other modules)
- [ ] Use union types for enum-like fields
- [ ] Optional fields with `?`
- [ ] Record<string, string> for key-value pairs

#### Step 4: TanStack Query Hook
```typescript
// lib/hooks/use-services.ts

import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { getMockServices } from '@/lib/mocks/data'
import type { Service } from '@/types/kubernetes'

export function useServices() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery({
    queryKey: ['services', namespace],
    queryFn: async () => {
      if (mode === 'demo') {
        return getMockServices()
      }

      const res = await fetch(`/api/services?namespace=${namespace || 'default'}`)
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to fetch services')
      }
      return res.json() as Promise<Service[]>
    },
    staleTime: 30000, // 30s
    refetchInterval: mode === 'real' ? 5000 : false, // Auto-refetch every 5s in real mode
  })
}
```

**Checklist:**
- [ ] queryKey includes namespace (for cache invalidation)
- [ ] Demo mode support
- [ ] Proper error handling (throw Error with message)
- [ ] Type assertion for return type
- [ ] staleTime + refetchInterval configured
- [ ] Auto-refetch ONLY in real mode

#### Step 5: Mock Data
```typescript
// lib/mocks/data.ts

export function getMockServices(): Service[] {
  return [
    {
      name: 'api-service',
      namespace: 'default',
      type: 'ClusterIP',
      clusterIP: '10.96.0.1',
      ports: [
        { port: 80, targetPort: 8080, protocol: 'TCP', name: 'http' },
      ],
      selector: { app: 'api' },
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // ... more mock data
  ]
}
```

**Checklist:**
- [ ] Realistic data (proper timestamps, IPs, names)
- [ ] Multiple examples (varied states)
- [ ] Consistent with real K8s responses

#### Step 6: React Component
```typescript
// app/components/services/service-list.tsx

'use client'
import { useServices } from '@/lib/hooks/use-services'
import { LoadingSpinner } from '@/app/components/common/loading-spinner'
import { ErrorMessage } from '@/app/components/common/error-message'
import { EmptyState } from '@/app/components/common/empty-state'

export function ServiceList() {
  const { data: services, isLoading, error } = useServices()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error.message} />
  if (!services?.length) return <EmptyState message="No services found" />

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Cluster IP</TableCell>
          <TableCell>Ports</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {services.map(service => (
          <ServiceRow key={service.name} service={service} />
        ))}
      </TableBody>
    </Table>
  )
}
```

**Checklist:**
- [ ] `'use client'` directive
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] Proper key prop (stable identifier)

#### Step 7: Unit Tests
```typescript
// __tests__/lib/hooks/use-services.test.tsx

import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useServices } from '@/lib/hooks/use-services'
import { describe, it, expect, beforeEach } from 'vitest'

describe('useServices', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })
  })

  it('returns services in demo mode', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useServices(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
    expect(result.current.data!.length).toBeGreaterThan(0)
    expect(result.current.data![0]).toHaveProperty('name')
    expect(result.current.data![0]).toHaveProperty('type')
  })
})
```

**Checklist:**
- [ ] QueryClientProvider wrapper
- [ ] retry: false (faster tests)
- [ ] waitFor for async operations
- [ ] Test successful path
- [ ] Test error handling (optional)

#### Step 8: Page Component
```typescript
// app/services/page.tsx

import { PageHeader } from '@/app/components/common/page-header'
import { ServiceList } from '@/app/components/services/service-list'

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Kubernetes services in the current namespace"
      />
      <ServiceList />
    </>
  )
}
```

**Checklist:**
- [ ] Use PageHeader component (consistent UI)
- [ ] Descriptive title and description

#### Step 9: Update CHANGELOG.md
```markdown
## [Unreleased]

### Added
- **Services Support** - View and monitor Kubernetes services with ports, selectors, and endpoints
```

---

## 🧪 Testing Guidelines

### **Unit Tests (Vitest)**

**What to test:**
1. ✅ Hooks (useServices, useDeployments, etc.)
2. ✅ Utility functions (formatters, validators)
3. ✅ Store actions (Zustand)
4. ✅ Mappers (K8s API → App types)

**What NOT to test:**
1. ❌ Next.js API routes (test E2E instead)
2. ❌ External libraries (TanStack Query, MUI)
3. ❌ Trivial code (simple getters)

**Pattern:**
```typescript
import { describe, it, expect, beforeEach } from 'vitest'

describe('FunctionName', () => {
  beforeEach(() => {
    // Setup
  })

  it('should handle expected input', () => {
    // Arrange
    const input = { ... }

    // Act
    const result = functionUnderTest(input)

    // Assert
    expect(result).toEqual(expectedOutput)
  })

  it('should handle edge cases', () => {
    // Test null, undefined, empty arrays, etc.
  })

  it('should throw on invalid input', () => {
    expect(() => functionUnderTest(invalidInput)).toThrow()
  })
})
```

### **E2E Tests (Playwright)**

**What to test:**
1. ✅ Critical user flows (login, navigation)
2. ✅ Interactive features (pod restart, YAML edit)
3. ✅ Error states (network failures)

**Pattern:**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Setup demo mode, auth, etc.
  })

  test('should complete happy path', async ({ page }) => {
    // Navigate
    await page.goto('/services')

    // Wait for load
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible()

    // Interact
    const table = page.getByRole('table')
    await expect(table).toBeVisible()

    const rows = page.getByRole('row')
    const count = await rows.count()
    expect(count).toBeGreaterThan(1) // Header + data rows
  })

  test('should handle errors gracefully', async ({ page }) => {
    // Simulate error (e.g., network failure)
    await page.route('**/api/services', route => route.abort())

    await page.goto('/services')

    // Verify error message displayed
    await expect(page.getByText(/failed to fetch/i)).toBeVisible()
  })
})
```

**Run tests:**
```bash
# Unit tests
npm run test                  # Run all
npm run test:watch            # Watch mode
npm run test -- services      # Filter by name

# E2E tests
npm run test:e2e              # Headless
npm run test:e2e:ui           # With UI
npm run test:e2e:debug        # Debug mode
```

---

## 📝 Documentation Updates

### **CHANGELOG.md**

**Format:**
```markdown
## [Unreleased]

### Added
- **Feature Name** - Brief description of what was added

### Changed
- **What Changed** - Brief description of the change

### Fixed
- **Bug Description** - Brief description of the fix

### Security
- **Security Issue** - Description of security improvement
```

**Example:**
```markdown
## [Unreleased]

### Added
- **Services Management** - View, filter, and monitor Kubernetes services with detailed port mappings and selector information
- **Service Details Page** - Detailed view of individual services with endpoints and pod connections

### Changed
- **Navigation** - Added "Services" link to sidebar menu

### Fixed
- **Service Type Badge** - Fixed badge color for ExternalName services
```

### **Mintlify Docs**

**If feature requires user documentation:**

1. Create file `docs/user/services.mdx`
2. Add to `docs/mint.json` in appropriate section
3. Format:

```markdown
---
title: Services
description: Monitor and manage Kubernetes services
---

## Overview

Brief description of the feature.

## Viewing Services

Step-by-step guide with screenshots.

## Service Details

Detailed information about what users can see.

## Common Actions

- Action 1
- Action 2
```

---

## 🔄 Git Workflow

### **Branch Naming**

```bash
feature/add-services-support
fix/pod-logs-race-condition
refactor/simplify-k8s-api
docs/update-services-guide
test/add-services-e2e
```

### **Commit Messages**

**Format:** `type: description`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `test:` - Tests
- `chore:` - Maintenance (deps, config)
- `perf:` - Performance improvement
- `style:` - Code style (formatting)

**Examples:**
```bash
feat: add services support with ports and endpoints
fix: resolve pod logs race condition on rapid refresh
refactor: split k8s/api.ts into smaller modules
docs: add services user guide to Mintlify
test: add E2E tests for services page
chore: update dependencies to latest versions
```

### **Pre-Commit Checklist**

**Before committing run:**
```bash
npm run lint:fix
npm run type-check
npm run test
npm run build
```

**All must pass ✅**

---

## 🚨 Common Pitfalls - AVOID!

### 1. **K8s Client in Client Component**
```typescript
// ❌ ERROR
'use client'
import { fetchPods } from '@/lib/k8s/api'

// ✅ CORRECT - only in API Route
```

### 2. **Forgetting Demo Mode**
```typescript
// ❌ ERROR - Hook doesn't support demo mode
export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch('/api/services')
      return res.json()
    }
  })
}

// ✅ CORRECT - Demo mode support
export function useServices() {
  const mode = useModeStore((state) => state.mode)

  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      if (mode === 'demo') {
        return getMockServices()
      }
      const res = await fetch('/api/services')
      return res.json()
    }
  })
}
```

### 3. **Missing Error Handling**
```typescript
// ❌ ERROR - Unhandled errors crash app
const pods = await fetchPods()

// ✅ CORRECT - Try-catch + proper error response
try {
  const pods = await fetchPods()
  return NextResponse.json(pods)
} catch (error) {
  console.error('[API] Failed:', error)
  return NextResponse.json(
    { error: 'Failed', details: error.message },
    { status: 500 }
  )
}
```

### 4. **Forgetting await params (Next.js 15)**
```typescript
// ❌ ERROR
export async function GET(req: Request, { params }: { params: { name: string } }) {
  const pod = await fetchPod(params.name)
}

// ✅ CORRECT
export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const pod = await fetchPod(name)
}
```

### 5. **Using response.body (old API)**
```typescript
// ❌ ERROR - Deprecated
const response = await appsApi.listNamespacedDeployment({ namespace })
return response.body.items

// ✅ CORRECT - New API
const response = await appsApi.listNamespacedDeployment({ namespace })
return response.items
```

---

## 🤖 Working with Claude Code Agents

### **When to use agents:**

**feature-implementer** - New functionality
```bash
# Prompt for AI:
"Use feature-implementer agent to add support for Kubernetes Jobs.
Include: API route, hook, component, tests."
```

**bug-fixer** - Fix bugs
```bash
# Prompt:
"Use bug-fixer agent to fix race condition in pod logs.
Issue: Logs don't load when rapidly switching pods."
```

**testing-agent** - Generate tests
```bash
# Prompt:
"Use testing-agent to generate tests for use-services hook.
Include: success path, error handling, demo mode."
```

**documentation-maintainer** - Update docs
```bash
# Prompt:
"Use documentation-maintainer to update CHANGELOG.md and docs/
after adding services feature."
```

**code-reviewer** - Review before merge
```bash
# Prompt:
"Use code-reviewer to check changes in PR #123.
Focus: TypeScript safety, error handling, tests coverage."
```

### **Agents are tools, not replacement**

✅ **Good use:**
- Repetitive tasks (generating similar features)
- Initial scaffolding (code structure)
- Test generation (test coverage)
- Documentation sync

❌ **Bad use:**
- Critical security decisions → Always human review
- Architecture changes → Discuss first
- Complex refactoring → Human oversight required

---

## 📊 Quality Metrics - Goals

**Code Quality:**
- Test Coverage: >80%
- TypeScript Strict: ✓ (zero `any` types)
- ESLint Errors: 0
- Build Warnings: 0

**Performance:**
- Build Time: <60s
- Bundle Size: <500KB (initial)
- API Response: <500ms (p95)
- SSE Connection: <2s

**Documentation:**
- Every public API function: JSDoc
- Every feature: User documentation
- Every API route: OpenAPI comment
- Complex logic: Inline comments

---

## 🎯 AI-Specific Guidelines

### **Prompt Engineering for AI**

**Good prompts:**
```
"Add support for Kubernetes Services using pattern from Deployments.
Include:
- API route: app/api/services/route.ts
- K8s function: lib/k8s/api.ts fetchServices()
- Hook: lib/hooks/use-services.ts
- Component: app/components/services/service-list.tsx
- Tests: __tests__/lib/hooks/use-services.test.tsx
- Mock data: lib/mocks/data.ts getMockServices()
Update CHANGELOG.md."
```

**Bad prompts:**
```
"Add services"  ← Too vague
"Fix the bug"   ← No context
"Make it better" ← No specific goal
```

### **Context Preservation**

**During long sessions:**
1. Regularly refresh context (read AI_CONTEXT.md)
2. Check recent commits (git log)
3. Verify current state (git status, npm run test)

### **Iterative Development**

**Instead of:**
```
"Implement entire services functionality from A to Z"
```

**Better:**
```
"Step 1: Add fetchServices() to lib/k8s/api.ts with tests
Step 2: Create API route app/api/services/route.ts
Step 3: Add hook use-services.ts
..."
```

**Why:** Easier verification of each step, fewer errors.

---

## ✅ Definition of Done

**Task is complete when:**

- [ ] Code works in demo mode
- [ ] Code works in real mode (with real cluster)
- [ ] Unit tests written and passing (coverage >80%)
- [ ] E2E test for critical path (if applicable)
- [ ] TypeScript checks pass (npm run type-check)
- [ ] ESLint checks pass (npm run lint)
- [ ] Build succeeds (npm run build)
- [ ] CHANGELOG.md updated
- [ ] User documentation added (if new feature)
- [ ] Code review passed (by human or code-reviewer agent)

---

## 🚀 Quick Reference

**Most common commands:**
```bash
# Development
npm run dev                   # Start dev server
npm run build                 # Production build
npm start                     # Start production server

# Testing
npm run test                  # Unit tests
npm run test:watch            # Watch mode
npm run test:e2e              # E2E tests
npm run test:e2e:ui           # E2E with UI

# Code Quality
npm run lint                  # Check lint errors
npm run lint:fix              # Auto-fix lint
npm run type-check            # TypeScript check

# All checks before commit
npm run lint:fix && npm run type-check && npm run test && npm run build
```

**Most frequently edited files:**
- `lib/k8s/api.ts` - K8s operations
- `app/api/*/route.ts` - API endpoints
- `lib/hooks/use-*.ts` - TanStack Query hooks
- `types/kubernetes.ts` - TypeScript types
- `lib/mocks/data.ts` - Demo mode data

**Most common errors and solutions:**
- "Can't resolve 'net'" → Move K8s client to API route
- "params is not a Promise" → Use `await params` (Next.js 15)
- "response.body is undefined" → Use `response.items` (new API)
- "Test fails with 'Cannot read properties of undefined'" → Check mock store

---

**Last Updated:** 2025-11-28
**Version:** 1.0.0
**Maintained by:** AI (Claude Code)

---

## 📞 Need Help?

1. Check [AI_CONTEXT.md](AI_CONTEXT.md) - Architecture patterns
2. Check [TECHNICAL.md](app/TECHNICAL.md) - Full technical docs
3. Check existing code - Find similar patterns
4. Check tests - They document expected behavior
5. Ask human - For architectural decisions
