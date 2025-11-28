# AI Context - Orphelix Development

> **Important**: This document is the starting point for AI when working on the Orphelix project. Read it before starting any work.

## 🎯 What is Orphelix?

**Orphelix** is a modern Kubernetes dashboard with GitOps features, built 100% by AI (Claude Code).

**Key Features:**
- Real-time Kubernetes resource monitoring
- GitOps workflow with YAML editing and PR creation
- AI-powered troubleshooting (log analysis, topology)
- Demo mode (realistic data without cluster)
- Production mode (real K8s cluster)

**Users:** DevOps engineers, SRE, Kubernetes administrators

---

## 🏗️ Architecture - Key Decisions

### 1. **Why API Routes? (Most Important Decision)**

**Problem:**
```typescript
// ❌ THIS DOESN'T WORK - @kubernetes/client-node requires Node.js modules
'use client'
import { fetchPods } from '@/lib/k8s-api'

// Error: Can't resolve 'net', 'tls', 'dns'
```

**Solution:**
```typescript
// ✅ K8s client ONLY server-side
// app/api/pods/route.ts
import { fetchPods } from '@/lib/k8s-api'
export async function GET() {
  const pods = await fetchPods()
  return NextResponse.json(pods)
}

// Component uses fetch()
'use client'
const { data } = useQuery({
  queryKey: ['pods'],
  queryFn: async () => {
    const res = await fetch('/api/pods')
    return res.json()
  }
})
```

**Remember:** `@kubernetes/client-node` can ONLY work in API Routes, never in client components!

### 2. **NextAuth v5 - Server-Side Protection**

**Previous implementation (UNSAFE):**
```typescript
// ❌ Can be bypassed via DevTools / localStorage manipulation
if (localStorage.getItem('mode') === 'real') {
  return <Dashboard />
}
```

**Current implementation (SECURE):**
```typescript
// ✅ Server-side validation in proxy.ts
export async function proxy(request: NextRequest) {
  const session = await auth()
  const appMode = request.cookies.get('app-mode')?.value

  // Validation BEFORE page rendering
  if (!session && appMode !== 'demo') {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
```

**Remember:** Never use `localStorage` for authentication! Always use HTTP-only cookies + server-side validation.

### 3. **Next.js 15 - Promise-based Params**

**Old way (Next.js 14):**
```typescript
// ❌ DOESN'T WORK in Next.js 15
export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const pod = await fetchPod(params.name)
}
```

**New way (Next.js 15):**
```typescript
// ✅ Params are Promise!
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const pod = await fetchPod(name)
}
```

### 4. **@kubernetes/client-node - API Changes**

**Old version:**
```typescript
// ❌ Deprecated
await appsApi.listNamespacedDeployment(namespace)
const response = await appsApi.listNamespacedDeployment({ namespace })
return response.body.items
```

**New version:**
```typescript
// ✅ Object parameters + direct response
const response = await appsApi.listNamespacedDeployment({ namespace })
return response.items // Direct items, not response.body.items
```

### 5. **Demo vs Real Mode**

```typescript
// lib/core/store.ts
export const useModeStore = create<ModeStore>()(
  persist(
    (set) => ({
      mode: 'demo', // Default: demo mode
      // ...
    }),
    {
      name: 'orphelix-mode', // localStorage key
    }
  )
)
```

**Flow:**
1. User selects mode in UI → `setMode('demo' | 'real')`
2. Store saves to `localStorage`
3. Components check `mode` and use:
   - `demo`: `lib/mocks/data.ts`
   - `real`: `fetch('/api/...')`
4. Middleware (`proxy.ts`) validates `app-mode` cookie

---

## 📁 Project Structure - Most Important Files

### **Backend (Server-Side)**

| File | Lines | Description |
|------|-------|-------------|
| `lib/k8s/api.ts` | 2074 | **CORE** - All K8s API operations |
| `lib/k8s/client.ts` | ~100 | K8s client initialization from kubeconfig |
| `auth.ts` | ~50 | NextAuth v5 configuration |
| `proxy.ts` | ~100 | Middleware - route protection |
| `app/api/**/route.ts` | ~50 each | API endpoints (19+ routes) |

### **Frontend (Client-Side)**

| File | Description |
|------|-------------|
| `lib/core/store.ts` | Zustand store (mode, context, namespace) |
| `lib/hooks/use-*.ts` | TanStack Query hooks (deployments, pods, etc.) |
| `app/components/**/*.tsx` | React components (MUI v6) |
| `lib/ui/theme/` | Design system (glass morphism) |

### **Testing**

| File | Description |
|------|-------------|
| `__tests__/**/*.test.tsx` | 217 unit tests (Vitest) |
| `tests/e2e/**/*.spec.ts` | 93 E2E tests (Playwright) |
| `vitest.config.ts` | Vitest configuration |
| `playwright.config.ts` | Playwright configuration |

### **Deployment**

| File | Description |
|------|-------------|
| `orphelix-cli.js` | CLI tool (PM2 wrapper) |
| `ecosystem.config.js` | PM2 configuration |
| `orphelix.db` | SQLite database (settings, preferences) |

---

## 🔄 Data Flow - How the Application Works

### **Example: Fetching Deployments**

```
┌─────────────────────────────────────────────────────────┐
│ 1. Component (Client-Side)                              │
│    app/deployments/page.tsx                             │
│                                                          │
│    const { data } = useDeployments()                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Hook (Client-Side)                                   │
│    lib/hooks/use-deployments.ts                         │
│                                                          │
│    const mode = useModeStore(state => state.mode)       │
│    if (mode === 'demo') return getMockDeployments()     │
│    const res = await fetch('/api/deployments')          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 3. API Route (Server-Side)                              │
│    app/api/deployments/route.ts                         │
│                                                          │
│    export async function GET() {                        │
│      const deployments = await fetchDeployments()       │
│      return NextResponse.json(deployments)              │
│    }                                                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 4. K8s API Client (Server-Side)                         │
│    lib/k8s/api.ts                                       │
│                                                          │
│    const kc = new k8s.KubeConfig()                      │
│    kc.loadFromDefault()                                 │
│    const appsApi = kc.makeApiClient(k8s.AppsV1Api)      │
│    const response = await appsApi.listNamespacedDeployment({ namespace }) │
│    return response.items.map(mapDeployment)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Kubernetes API Server                                │
│    kubectl cluster (via kubeconfig)                     │
└─────────────────────────────────────────────────────────┘
```

### **Real-time Updates (SSE)**

```
┌─────────────────────────────────────────────────────────┐
│ 1. Component mounts                                      │
│    → useRealtimeUpdates() hook                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 2. EventSource connection                                │
│    const eventSource = new EventSource('/api/stream')   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Server SSE endpoint                                   │
│    app/api/stream/route.ts                              │
│                                                          │
│    - Watch K8s API (deployments, pods, events)          │
│    - Send events: deployment, pod, event                │
│    - Heartbeat every 30s                                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Client receives event                                 │
│    eventSource.addEventListener('deployment', (e) => {   │
│      queryClient.invalidateQueries(['deployments'])     │
│    })                                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Patterns - Use Consistently

### 1. **New K8s Resource (e.g., Services)**

**Step 1:** API Route
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

**Step 2:** K8s API Function
```typescript
// lib/k8s/api.ts
export async function fetchServices(namespace?: string): Promise<Service[]> {
  const ns = namespace || getCurrentNamespace()
  const coreApi = getK8sClient().makeApiClient(k8s.CoreV1Api)

  const response = await coreApi.listNamespacedService({ namespace: ns })
  return response.items.map(mapService)
}

function mapService(service: k8s.V1Service): Service {
  return {
    name: service.metadata?.name || '',
    namespace: service.metadata?.namespace || '',
    type: service.spec?.type || '',
    clusterIP: service.spec?.clusterIP || '',
    ports: service.spec?.ports?.map(p => ({
      port: p.port,
      targetPort: p.targetPort,
      protocol: p.protocol,
    })) || [],
    createdAt: service.metadata?.creationTimestamp || '',
  }
}
```

**Step 3:** TanStack Query Hook
```typescript
// lib/hooks/use-services.ts
import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { getMockServices } from '@/lib/mocks/data'

export function useServices() {
  const mode = useModeStore((state) => state.mode)

  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      if (mode === 'demo') {
        return getMockServices()
      }
      const res = await fetch('/api/services')
      if (!res.ok) throw new Error('Failed to fetch services')
      return res.json()
    },
    staleTime: 30000,
    refetchInterval: mode === 'real' ? 5000 : false,
  })
}
```

**Step 4:** Component
```typescript
// app/components/services/service-list.tsx
'use client'
import { useServices } from '@/lib/hooks/use-services'

export function ServiceList() {
  const { data: services, isLoading, error } = useServices()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error.message} />
  if (!services?.length) return <EmptyState />

  return (
    <Table>
      {services.map(service => (
        <ServiceRow key={service.name} service={service} />
      ))}
    </Table>
  )
}
```

**Step 5:** Tests
```typescript
// __tests__/lib/hooks/use-services.test.tsx
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useServices } from '@/lib/hooks/use-services'

describe('useServices', () => {
  it('returns services in demo mode', async () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useServices(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBeDefined()
    expect(result.current.data.length).toBeGreaterThan(0)
  })
})
```

### 2. **Error Handling Pattern**

**Always use this pattern:**

```typescript
// API Route
try {
  const data = await fetchResource()
  return NextResponse.json(data)
} catch (error) {
  console.error('[API] Context:', error)
  return NextResponse.json(
    {
      error: 'User-friendly message',
      details: error instanceof Error ? error.message : 'Unknown error'
    },
    { status: 500 }
  )
}

// Hook
const res = await fetch('/api/resource')
if (!res.ok) {
  const errorData = await res.json()
  throw new Error(errorData.error || 'Failed to fetch')
}

// Component
const { data, isLoading, error } = useResource()

if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error.message} />
if (!data) return <EmptyState message="No data available" />
```

### 3. **TypeScript Types**

**Define types in `types/` directory:**

```typescript
// types/kubernetes.ts
export interface Service {
  name: string
  namespace: string
  type: 'ClusterIP' | 'NodePort' | 'LoadBalancer' | 'ExternalName'
  clusterIP: string
  ports: ServicePort[]
  createdAt: string
}

export interface ServicePort {
  port: number
  targetPort: string | number
  protocol: 'TCP' | 'UDP' | 'SCTP'
  name?: string
}
```

**Use strict TypeScript:**
- ❌ Never use `any`
- ✅ Use `unknown` and type guards
- ✅ Define return types for functions
- ✅ Use generics where possible

---

## 🧪 Testing Standards

### **Unit Tests (Vitest)**

**What to test:**
- Hooks (TanStack Query)
- Utility functions
- Store actions
- Data transformations (mappers)

**Pattern:**
```typescript
import { describe, it, expect } from 'vitest'

describe('ComponentName', () => {
  it('should do something specific', () => {
    // Arrange
    const input = { ... }

    // Act
    const result = functionUnderTest(input)

    // Assert
    expect(result).toEqual(expectedOutput)
  })
})
```

### **E2E Tests (Playwright)**

**What to test:**
- Critical user flows (login, view resources)
- Navigation
- Interactive features (pod restart, YAML edit)

**Pattern:**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('should complete user flow', async ({ page }) => {
    await page.goto('/path')

    await expect(page.getByRole('heading')).toBeVisible()
    await page.getByRole('button', { name: 'Action' }).click()

    await expect(page).toHaveURL(/\/expected-path/)
  })
})
```

**Before commit ALWAYS:**
```bash
npm run lint:fix
npm run type-check
npm run test
npm run build
```

---

## 🚫 Most Common Mistakes - AVOID!

### 1. **K8s Client in Client Component**
```typescript
// ❌ ERROR - Can't resolve 'net'
'use client'
import { fetchPods } from '@/lib/k8s/api'

// ✅ CORRECT - Only in API Route
// app/api/pods/route.ts
import { fetchPods } from '@/lib/k8s/api'
```

### 2. **localStorage for Auth**
```typescript
// ❌ ERROR - Can be bypassed
if (localStorage.getItem('authenticated') === 'true') { ... }

// ✅ CORRECT - Server-side cookie validation
const session = await auth()
if (!session) return redirect('/')
```

### 3. **Forgetting await params**
```typescript
// ❌ ERROR - Next.js 15
const deployment = await fetchDeployment(params.name)

// ✅ CORRECT
const { name } = await params
const deployment = await fetchDeployment(name)
```

### 4. **response.body with K8s client**
```typescript
// ❌ ERROR - Deprecated API
const response = await appsApi.listNamespacedDeployment({ namespace })
return response.body.items

// ✅ CORRECT - New API
return response.items
```

### 5. **Missing Error Handling**
```typescript
// ❌ ERROR - Unhandled errors
const pods = await fetchPods()
return NextResponse.json(pods)

// ✅ CORRECT - Try-catch + proper error response
try {
  const pods = await fetchPods()
  return NextResponse.json(pods)
} catch (error) {
  console.error('[API] Error:', error)
  return NextResponse.json(
    { error: 'Failed to fetch pods' },
    { status: 500 }
  )
}
```

---

## 📚 Additional Documentation

**Read before working:**
- [TECHNICAL.md](app/TECHNICAL.md) - Full technical documentation
- [SECURITY.md](SECURITY.md) - Security patterns, auth flow
- [CHANGELOG.md](CHANGELOG.md) - Change history
- [CONTRIBUTING_AI.md](CONTRIBUTING_AI.md) - AI work guidelines

**External Docs:**
- [@kubernetes/client-node](https://github.com/kubernetes-client/javascript)
- [Next.js 15 App Router](https://nextjs.org/docs)
- [NextAuth v5](https://authjs.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Material-UI v6](https://mui.com/)

---

## ✅ Checklist Before Each Implementation

- [ ] Read relevant section in TECHNICAL.md
- [ ] Understand why we use API Routes
- [ ] Know the flow: API Route → Hook → Component
- [ ] Know difference between demo and real mode
- [ ] Remember await params in Next.js 15
- [ ] Use new @kubernetes/client-node API (object params, direct response)
- [ ] Apply proper error handling
- [ ] Write unit tests for new code
- [ ] Update CHANGELOG.md
- [ ] Run `npm run lint:fix && npm run type-check && npm run test`

---

## 💡 Workflow Tips

**Questions before starting work:**
1. Can this be a client component? → NO if using K8s client
2. Do I need a new API route? → YES for each new K8s resource
3. Must I support demo mode? → YES for all hooks
4. Do I need to write tests? → YES always

**When something doesn't work:**
1. Check console errors (browser + terminal)
2. Verify API route responds: `curl http://localhost:3000/api/resource`
3. Check kubectl permissions: `kubectl get <resource>`
4. Review similar working code (e.g., deployments pattern)

---

**Last Updated:** 2025-11-28
**Version:** 0.1.0
**Maintained by:** AI (Claude Code)
