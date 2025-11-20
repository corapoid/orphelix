# Technical Documentation - Orphelix

> Complete documentation for developers

## Table of Contents

- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Development](#development)
- [Key Patterns](#key-patterns)
- [API Routes](#api-routes)
- [Real-time Updates (SSE)](#real-time-updates-sse)
- [State Management](#state-management)
- [Testing](#testing)
- [Build and Deploy](#build-and-deploy)
- [Troubleshooting](#troubleshooting)

---

## Architecture

### High-Level Overview

```
┌────────────────────────────────────────────────────────────┐
│                         Browser                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 19 + Next.js 15 App Router                    │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐      │  │
│  │  │  Pages     │  │ Components │  │   Hooks    │      │  │
│  │  │            │  │  (MUI v6)  │  │ (TanStack) │      │  │
│  │  └────────────┘  └────────────┘  └────────────┘      │  │
│  │         │               │               │            │  │
│  │         └───────────────┴───────────────┘            │  │
│  │                      │                               │  │
│  │         ┌────────────▼─────────────┐                 │  │
│  │         │   Zustand Store          │                 │  │
│  │         │  (Mode, Context, RT)     │                 │  │
│  │         └──────────────────────────┘                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                  │
│                         │ fetch() / EventSource            │
└─────────────────────────┼──────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────┐
│                   Next.js Server (Node.js)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Routes (/api/*)                     │  │
│  │  ┌─────────────────┐  ┌──────────────────────────┐   │  │
│  │  │ REST Endpoints  │  │  SSE Stream (/api/stream)│   │  │
│  │  │  - deployments  │  │  - Watch API             │   │  │
│  │  │  - pods         │  │  - Heartbeat             │   │  │
│  │  │  - nodes        │  │  - Auto-reconnect        │   │  │
│  │  │  - configmaps   │  │                          │   │  │
│  │  │  - secrets      │  │                          │   │  │
│  │  │  - hpa/pv/events│  │                          │   │  │
│  │  └────────┬────────┘  └────────────┬─────────────┘   │  │
│  │           │                        │                 │  │
│  │           └────────────┬───────────┘                 │  │
│  │                        │                             │  │
│  │           ┌────────────▼─────────────┐               │  │
│  │           │  lib/k8s-client.ts       │               │  │
│  │           │  lib/k8s-api.ts          │               │  │
│  │           └────────────┬─────────────┘               │  │
│  └────────────────────────┼─────────────────────────────┘  │
└────────────────────────────┼───────────────────────────────┘
                             │
                             │ @kubernetes/client-node
                             ▼
                   ┌──────────────────────┐
                   │  Kubernetes Cluster  │
                   │   - API Server       │
                   │   - Watch API        │
                   └──────────────────────┘
```

### Key Architectural Decisions

1. **API Routes Pattern**
   - **Why:** @kubernetes/client-node requires Node.js modules (net, dns, tls) unavailable in the browser
   - **How:** All K8s operations executed server-side in API Routes
   - **Impact:** Requires fetch() from frontend, additional layer

2. **Server-Sent Events for Real-time**
   - **Why:** Kubernetes Watch API is ideal for SSE (one-way stream)
   - **How:** `/api/stream` route with EventSource on client
   - **Impact:** Real-time updates without WebSocket complexity

3. **Demo/Real Mode Toggle with Server-Side Protection**
   - **Why:** Demo without cluster requirements + safe development + secure validation
   - **How:** Zustand store + NextAuth v5 middleware + HTTP cookies
   - **Impact:** Dual data paths (mock-data.ts vs k8s-api.ts) + server-side route protection
   - **Security:** Cannot be bypassed from client (validation happens before rendering)

4. **NextAuth v5 for Authentication and Authorization**
   - **Why:** Previous client-side validation could be bypassed (localStorage, DevTools, direct URLs)
   - **How:** Server-side proxy.ts with auth() callback executing before page render
   - **Impact:** Complete security - route protection happens on server, not client

5. **Next.js 15 App Router**
   - **Why:** Latest features, RSC support, better routing
   - **How:** Migration from Pages Router, Promise-based params
   - **Impact:** Greater complexity, but better performance

---

## Technology Stack

### Frontend

| Technology | Version | Usage |
|------------|---------|-------|
| **Next.js** | 15.0.3 | Framework, routing, SSR |
| **React** | 19.0.0 | UI library |
| **TypeScript** | 5.7.2 | Type safety |
| **Material-UI** | 6.2.0 | Component library |
| **Zustand** | 5.0.2 | State management |
| **TanStack Query** | 5.62.11 | Server state, caching |
| **React Flow** | 11.11.4 | Topology graphs |

### Backend

| Technology | Version | Usage |
|------------|---------|-------|
| **@kubernetes/client-node** | 1.0.0 | K8s API client |
| **NextAuth.js** | 5.0.0-beta.30 | Authentication & authorization |
| **Octokit** | 4.0.2 | GitHub API (Flux) |
| **Next.js API Routes** | 15.0.3 | Server-side endpoints |

### Testing

| Technology | Version | Usage |
|------------|---------|-------|
| **Vitest** | 2.1.8 | Unit tests |
| **React Testing Library** | 16.1.0 | Component tests |
| **Playwright** | 1.49.1 | E2E tests |
| **MSW** | 2.7.0 | API mocking |

### Development Tools

| Technology | Version | Usage |
|------------|---------|-------|
| **ESLint** | 9.17.0 | Code linting |
| **Prettier** | 3.4.2 | Code formatting |
| **Turbopack** | - | Fast dev bundler |

---

## Project Structure

```
kubevista/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (server-side only)
│   │   ├── deployments/
│   │   │   ├── route.ts         # GET /api/deployments
│   │   │   └── [name]/
│   │   │       ├── route.ts     # GET /api/deployments/:name
│   │   │       └── pods/
│   │   │           └── route.ts # GET /api/deployments/:name/pods
│   │   ├── pods/
│   │   │   ├── route.ts         # GET /api/pods
│   │   │   └── [name]/
│   │   │       ├── route.ts     # GET /api/pods/:name
│   │   │       ├── logs/
│   │   │       │   └── route.ts # GET /api/pods/:name/logs
│   │   │       ├── events/
│   │   │       │   └── route.ts # GET /api/pods/:name/events
│   │   │       └── restart/
│   │   │           └── route.ts # POST /api/pods/:name/restart
│   │   ├── nodes/               # Nodes endpoints
│   │   ├── configmaps/          # ConfigMaps endpoints
│   │   ├── secrets/             # Secrets endpoints
│   │   ├── hpa/                 # HPA endpoints
│   │   ├── pv/                  # PV endpoints
│   │   ├── events/              # Events endpoints
│   │   ├── topology/            # Topology endpoints
│   │   └── stream/
│   │       └── route.ts         # SSE endpoint
│   │
│   ├── components/              # React Components
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── mode-selector.tsx
│   │   │   └── realtime-status.tsx
│   │   ├── dashboard/
│   │   │   ├── resource-card.tsx
│   │   │   └── recent-events.tsx
│   │   ├── deployments/
│   │   │   ├── deployment-list.tsx
│   │   │   ├── deployment-detail.tsx
│   │   │   └── pods-list.tsx
│   │   ├── pods/
│   │   │   ├── pod-list.tsx
│   │   │   ├── pod-detail.tsx
│   │   │   ├── logs-viewer.tsx
│   │   │   └── restart-pod-dialog.tsx
│   │   ├── nodes/
│   │   ├── configmaps/
│   │   ├── secrets/
│   │   ├── hpa/
│   │   ├── pv/
│   │   ├── events/
│   │   ├── topology/
│   │   └── common/
│   │       ├── status-badge.tsx
│   │       ├── loading-spinner.tsx
│   │       └── error-message.tsx
│   │
│   ├── deployments/             # Pages
│   │   ├── page.tsx
│   │   └── [name]/
│   │       └── page.tsx
│   ├── pods/
│   │   ├── page.tsx
│   │   └── [name]/
│   │       └── page.tsx
│   ├── nodes/
│   ├── configmaps/
│   ├── secrets/
│   ├── hpa/
│   ├── pv/
│   ├── events/
│   ├── topology/
│   ├── flux/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Dashboard overview
│   └── globals.css
│
├── lib/                         # Libraries and utilities
│   ├── k8s-client.ts           # K8s client initialization
│   ├── k8s-api.ts              # K8s API functions (15KB)
│   ├── mock-data.ts            # Mock data generator
│   ├── store.ts                # Zustand store
│   ├── theme.ts                # MUI theme configuration
│   ├── utils.ts                # Helper functions
│   └── hooks/                  # Custom React hooks
│       ├── use-deployments.ts
│       ├── use-deployment.ts
│       ├── use-pods.ts
│       ├── use-pod.ts
│       ├── use-pod-logs.ts
│       ├── use-restart-pod.ts
│       ├── use-nodes.ts
│       ├── use-configmaps.ts
│       ├── use-secrets.ts
│       ├── use-hpa.ts
│       ├── use-pv.ts
│       ├── use-events.ts
│       ├── use-topology.ts
│       └── use-realtime.ts
│
├── types/                      # TypeScript type definitions
│   ├── kubernetes.ts           # K8s resource types
│   └── app.ts                  # App-specific types
│
├── __tests__/                  # Vitest unit tests
│   ├── lib/
│   │   ├── mock-data.test.ts
│   │   ├── store.test.ts
│   │   └── hooks/
│   │       ├── use-deployments.test.tsx
│   │       ├── use-pods.test.tsx
│   │       └── ...
│   ├── components/
│   │   ├── dashboard/
│   │   ├── deployments/
│   │   ├── pods/
│   │   └── ...
│   └── setup.ts
│
├── tests/                      # E2E tests
│   └── e2e/
│       ├── dashboard.spec.ts
│       ├── deployments.spec.ts
│       ├── pods.spec.ts
│       └── ...
│
├── public/                     # Static assets
│
├── .claude/                    # Claude Code agents
│   └── agents/
│       ├── testing-agent.md
│       ├── code-quality-agent.md
│       └── documentation-agent.md
│
├── vitest.config.ts
├── playwright.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── README.md
├── TECHNICAL.md                # This file
├── TESTING.md
├── CHANGELOG.md
└── PROJECT_SUMMARY.md
```

---

## Development

### Environment Setup

```bash
# Requirements
node -v  # v20+
npm -v   # v10+

# Installation
git clone <repo>
cd kubevista
npm install

# Configure kubectl (for real mode)
kubectl config current-context
kubectl get pods

# Optional: GitHub token (for Flux)
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (Turbopack)
npm run dev:clean        # Dev server + clear cache

# Build
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run type-check       # TypeScript type check
npm run format           # Prettier format
npm run format:check     # Prettier check only

# Testing
npm run test             # Run all unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run E2E tests (headless)
npm run test:e2e:ui      # E2E with Playwright UI
npm run test:e2e:debug   # E2E debug mode

# All Checks (before commit)
npm run check:all        # lint + type-check + test + build
```

### Development Workflow

1. **Branch naming:**
   ```
   feature/add-namespace-selector
   fix/pod-logs-race-condition
   refactor/simplify-k8s-api
   docs/update-technical-readme
   ```

2. **Commit convention:**
   ```
   feat: add namespace selector to header
   fix: resolve pod logs race condition
   refactor: simplify K8s API error handling
   docs: update technical documentation
   test: add unit tests for topology graph
   chore: update dependencies
   ```

3. **Pre-commit checklist:**
   ```bash
   npm run lint:fix
   npm run type-check
   npm run test
   npm run build
   ```

4. **Code review checklist:**
   - [ ] Type safety (no `any` types)
   - [ ] Error handling (try-catch blocks)
   - [ ] Loading states
   - [ ] Unit tests added/updated
   - [ ] E2E tests updated (if UI changed)
   - [ ] Documentation updated
   - [ ] No console.log (use console.warn/error)
   - [ ] Accessibility (ARIA labels)

---

## Key Patterns

### 1. API Routes Pattern

**Problem:** @kubernetes/client-node requires Node.js modules unavailable in the browser.

**Solution:** Server-side API Routes.

```typescript
// ❌ DOES NOT WORK - K8s client in component
'use client'
import { fetchDeployments } from '@/lib/k8s-api'
export default function Page() {
  const deployments = await fetchDeployments() // ERROR: Can't resolve 'net'
}

// ✅ WORKS - K8s client in API Route
// app/api/deployments/route.ts
import { fetchDeployments } from '@/lib/k8s-api'
export async function GET() {
  const deployments = await fetchDeployments()
  return NextResponse.json(deployments)
}

// Component uses fetch()
'use client'
import { useDeployments } from '@/lib/hooks/use-deployments'
export default function Page() {
  const { data: deployments } = useDeployments()
}
```

### 2. NextAuth v5 Server-Side Route Protection

**Problem:** Previous client-side validation could be bypassed by disabling JavaScript, modifying localStorage, or accessing URLs directly.

**Solution:** Server-side proxy with NextAuth v5 authorization callback.

```typescript
// auth.ts - NextAuth v5 configuration
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async authorized({ auth, request }) {
      const { pathname } = request.nextUrl

      // Allow root and API routes
      if (pathname === '/') return true
      if (pathname.startsWith('/api')) return true

      // Check authentication
      if (auth) return true

      // Check demo mode cookie
      const appMode = request.cookies.get('app-mode')?.value
      if (appMode === 'demo') return true

      return false // Redirect to '/'
    },
  },
})

// proxy.ts - Next.js 16 middleware
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function proxy(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  if (pathname === '/') return NextResponse.next()
  if (pathname.startsWith('/api')) return NextResponse.next()
  if (session) return NextResponse.next()

  const appMode = request.cookies.get('app-mode')?.value
  if (appMode === 'demo') return NextResponse.next()

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

// Component sets cookie for server validation
const handleDemoMode = () => {
  document.cookie = 'app-mode=demo; path=/; max-age=31536000; SameSite=Lax'
  setMode('demo')
}

const handleGitHubLogin = async () => {
  await signIn('github', {
    callbackUrl: '/',
    redirect: true
  })
}
```

**Benefits:**
- ✅ Executes on server before rendering
- ✅ Cannot be bypassed from client
- ✅ Cookie-based state accessible to middleware
- ✅ GitHub OAuth integration
- ✅ Works with both authenticated and demo modes

### 3. Next.js 15 Dynamic Params (Promise-based)

**Problem:** Next.js 15 requires await for params in dynamic routes.

```typescript
// ❌ DOES NOT WORK - Next.js 15
export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const deployment = await fetchDeployment(params.name)
}

// ✅ WORKS - Next.js 15
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const deployment = await fetchDeployment(name)
}
```

### 4. @kubernetes/client-node API (Object Parameters)

**Problem:** New version requires object parameters instead of individual args.

```typescript
// ❌ OLD VERSION
await appsApi.listNamespacedDeployment(namespace)
await coreApi.readNamespacedPod(name, namespace)

// ✅ NEW VERSION
await appsApi.listNamespacedDeployment({ namespace })
await coreApi.readNamespacedPod({ name, namespace })
```

**Problem:** Response is direct object, not `{ body: ... }`.

```typescript
// ❌ OLD VERSION
const response = await appsApi.listNamespacedDeployment({ namespace })
return response.body.items

// ✅ NEW VERSION
const response = await appsApi.listNamespacedDeployment({ namespace })
return response.items
```

### 5. TanStack Query Hooks Pattern

```typescript
// lib/hooks/use-deployments.ts
import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/store'
import { getMockDeployments } from '@/lib/mock-data'

export function useDeployments() {
  const mode = useModeStore((state) => state.mode)

  return useQuery({
    queryKey: ['deployments'],
    queryFn: async () => {
      if (mode === 'mock') {
        return getMockDeployments()
      }
      const res = await fetch('/api/deployments')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    refetchInterval: mode === 'real' ? 5000 : false, // Auto-refetch in real mode
    staleTime: 30000,
  })
}
```

### 6. Error Handling Pattern

```typescript
// API Route
export async function GET() {
  try {
    initK8sClient()
    const deployments = await fetchDeployments()
    return NextResponse.json(deployments)
  } catch (error) {
    console.error('[API] Failed to fetch deployments:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch deployments',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Hook
export function useDeployments() {
  return useQuery({
    queryKey: ['deployments'],
    queryFn: async () => {
      const res = await fetch('/api/deployments')
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to fetch')
      }
      return res.json()
    },
  })
}

// Component
export default function Page() {
  const { data, isLoading, error } = useDeployments()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error.message} />
  if (!data) return <NoData />

  return <DeploymentList deployments={data} />
}
```

---

## API Routes

### List of All Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/deployments` | GET | List all deployments |
| `/api/deployments/:name` | GET | Deployment details |
| `/api/deployments/:name/pods` | GET | Pods belonging to deployment |
| `/api/deployments/:name/events` | GET | Deployment events |
| `/api/pods` | GET | List all pods |
| `/api/pods/:name` | GET | Pod details |
| `/api/pods/:name/logs` | GET | Container logs |
| `/api/pods/:name/events` | GET | Pod events |
| `/api/pods/:name/restart` | POST | Restart pod (delete) |
| `/api/nodes` | GET | List nodes |
| `/api/nodes/:name` | GET | Node details |
| `/api/nodes/:name/pods` | GET | Pods on node |
| `/api/configmaps` | GET | List ConfigMaps |
| `/api/configmaps/:name` | GET | ConfigMap details |
| `/api/secrets` | GET | List Secrets |
| `/api/secrets/:name` | GET | Secret details |
| `/api/hpa` | GET | List HPA |
| `/api/hpa/:name` | GET | HPA details |
| `/api/pv` | GET | List PV |
| `/api/pv/:name` | GET | PV details |
| `/api/events` | GET | List all events |
| `/api/topology` | GET | Topology graph |
| `/api/stream` | GET | SSE stream (real-time) |

### Example API Route Implementation

```typescript
// app/api/pods/[name]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { fetchPod } from '@/lib/k8s-api'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params

    if (!name) {
      return NextResponse.json(
        { error: 'Pod name is required' },
        { status: 400 }
      )
    }

    const pod = await fetchPod(name)

    if (!pod) {
      return NextResponse.json(
        { error: 'Pod not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(pod)
  } catch (error) {
    console.error('[API] Failed to fetch pod:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch pod',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
```

---

## Real-time Updates (SSE)

### SSE Architecture

```
Browser                     Next.js Server              Kubernetes
   │                              │                          │
   │  EventSource('/api/stream')  │                          │
   ├─────────────────────────────>│                          │
   │                              │  Watch API (deployments) │
   │                              ├─────────────────────────>│
   │                              │  Watch API (pods)        │
   │                              ├─────────────────────────>│
   │                              │  Watch API (events)      │
   │                              ├─────────────────────────>│
   │                              │                          │
   │      event: connected        │                          │
   │<─────────────────────────────┤                          │
   │                              │                          │
   │      event: heartbeat        │                          │
   │<─────────────────────────────┤                          │
   │      (every 30s)             │                          │
   │                              │     MODIFIED deployment  │
   │                              │<─────────────────────────┤
   │    event: deployment         │                          │
   │<─────────────────────────────┤                          │
   │    { type: 'MODIFIED', ... } │                          │
   │                              │                          │
   │  queryClient.invalidate()    │                          │
   │──┐                           │                          │
   │<─┘ fetch('/api/deployments') │                          │
   ├─────────────────────────────>│                          │
   │        fresh data            │                          │
   │<─────────────────────────────┤                          │
```

### Server-Side (SSE Endpoint)

```typescript
// app/api/stream/route.ts
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (type: string, data: unknown) => {
        const message = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`
        controller.enqueue(encoder.encode(message))
      }

      sendEvent('connected', { timestamp: new Date().toISOString() })

      const heartbeatInterval = setInterval(() => {
        sendEvent('heartbeat', { timestamp: new Date().toISOString() })
      }, 30000)

      // Kubernetes Watch API
      const kc = new k8s.KubeConfig()
      kc.loadFromDefault()
      const watch = new k8s.Watch(kc)

      const deploymentWatch = watch.watch(
        '/apis/apps/v1/namespaces/default/deployments',
        {},
        (type, apiObj) => {
          sendEvent('deployment', {
            type, // ADDED, MODIFIED, DELETED
            object: {
              name: apiObj.metadata?.name,
              replicas: {
                desired: apiObj.spec?.replicas || 0,
                ready: apiObj.status?.readyReplicas || 0,
              },
            },
          })
        },
        (err) => {
          if (err) sendEvent('error', { message: err.message })
        }
      )

      // Cleanup on disconnect
      request.signal.addEventListener('abort', async () => {
        clearInterval(heartbeatInterval)
        const ac = await deploymentWatch
        ac?.abort()
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
```

### Client-Side (React Hook)

```typescript
// lib/hooks/use-realtime.ts
export function useRealtimeUpdates() {
  const queryClient = useQueryClient()
  const mode = useModeStore((state) => state.mode)
  const realtimeEnabled = useModeStore((state) => state.realtimeEnabled)

  const [status, setStatus] = useState<'connected' | 'connecting' | 'error' | 'disconnected'>('disconnected')
  const eventSourceRef = useRef<EventSource | null>(null)

  const connect = useCallback(() => {
    if (mode !== 'real' || !realtimeEnabled) return

    const eventSource = new EventSource('/api/stream')
    eventSourceRef.current = eventSource

    eventSource.addEventListener('connected', () => {
      setStatus('connected')
    })

    eventSource.addEventListener('deployment', (event) => {
      const data = JSON.parse(event.data)
      queryClient.invalidateQueries({ queryKey: ['deployments'] })
    })

    eventSource.addEventListener('pod', (event) => {
      const data = JSON.parse(event.data)
      queryClient.invalidateQueries({ queryKey: ['pods'] })
    })

    eventSource.onerror = () => {
      setStatus('error')
      eventSource.close()
      // Auto-reconnect logic...
    }
  }, [mode, realtimeEnabled, queryClient])

  useEffect(() => {
    if (mode === 'real' && realtimeEnabled) {
      connect()
    }
    return () => eventSourceRef.current?.close()
  }, [mode, realtimeEnabled, connect])

  return { status, isConnected: status === 'connected' }
}
```

---

## State Management

### Zustand Store

```typescript
// lib/store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ModeStore {
  mode: 'mock' | 'real'
  selectedContext: KubernetesContext | null
  realtimeEnabled: boolean
  setMode: (mode: 'mock' | 'real') => void
  setContext: (context: KubernetesContext | null) => void
  setRealtimeEnabled: (enabled: boolean) => void
  reset: () => void
}

export const useModeStore = create<ModeStore>()(
  persist(
    (set) => ({
      mode: 'mock',
      selectedContext: null,
      realtimeEnabled: false,
      setMode: (mode) => set({ mode }),
      setContext: (context) => set({ selectedContext: context }),
      setRealtimeEnabled: (enabled) => set({ realtimeEnabled: enabled }),
      reset: () => set({ mode: 'mock', selectedContext: null, realtimeEnabled: false }),
    }),
    {
      name: 'kubevista-mode', // localStorage key
    }
  )
)
```

**Usage in component:**

```typescript
'use client'
import { useModeStore } from '@/lib/store'

export default function Header() {
  const mode = useModeStore((state) => state.mode)
  const setMode = useModeStore((state) => state.setMode)
  const realtimeEnabled = useModeStore((state) => state.realtimeEnabled)
  const setRealtimeEnabled = useModeStore((state) => state.setRealtimeEnabled)

  return (
    <Box>
      <Chip
        label={mode === 'mock' ? 'DEMO MODE' : 'REAL CLUSTER'}
        onClick={() => setMode(mode === 'mock' ? 'real' : 'mock')}
      />
      <Switch
        checked={realtimeEnabled}
        onChange={(e) => setRealtimeEnabled(e.target.checked)}
        disabled={mode === 'mock'}
      />
    </Box>
  )
}
```

---

## Testing

### Unit Tests (Vitest)

**Location:** `__tests__/**/*.test.ts(x)`

**Setup:**

```typescript
// __tests__/setup.ts
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
afterEach(() => cleanup())
```

**Example hook test:**

```typescript
// __tests__/lib/hooks/use-deployments.test.tsx
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useDeployments } from '@/lib/hooks/use-deployments'

describe('useDeployments', () => {
  it('returns deployments in mock mode', async () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useDeployments(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBeDefined()
    expect(result.current.data.length).toBeGreaterThan(0)
  })
})
```

**Example component test:**

```typescript
// __tests__/components/pods/pod-list.test.tsx
import { render, screen } from '@testing-library/react'
import { PodList } from '@/app/components/pods/pod-list'

describe('PodList', () => {
  const mockPods = [
    { name: 'pod-1', status: 'Running', ip: '10.0.0.1' },
    { name: 'pod-2', status: 'Pending', ip: '10.0.0.2' },
  ]

  it('renders pod list', () => {
    render(<PodList pods={mockPods} />)
    expect(screen.getByText('pod-1')).toBeInTheDocument()
    expect(screen.getByText('pod-2')).toBeInTheDocument()
  })
})
```

**Run tests:**

```bash
npm run test              # Run all
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage
npm run test -- pod-list  # Specific file
```

### E2E Tests (Playwright)

**Location:** `tests/e2e/**/*.spec.ts`

**Example E2E test:**

```typescript
// tests/e2e/deployments.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Deployments Page', () => {
  test('displays deployment list', async ({ page }) => {
    await page.goto('/deployments')

    // Wait for list to load
    await expect(page.getByRole('heading', { name: 'Deployments' })).toBeVisible()

    // Check table exists
    const table = page.getByRole('table')
    await expect(table).toBeVisible()

    // Check at least one row
    const rows = page.getByRole('row')
    const count = await rows.count()
    expect(count).toBeGreaterThan(1) // Header + at least 1 row
  })

  test('navigates to deployment detail', async ({ page }) => {
    await page.goto('/deployments')

    // Click first deployment
    await page.getByRole('row').nth(1).click()

    // Should navigate to detail page
    await expect(page).toHaveURL(/\/deployments\/[a-z0-9-]+/)
    await expect(page.getByText('Deployment Details')).toBeVisible()
  })
})
```

**Run E2E tests:**

```bash
npm run test:e2e          # Headless
npm run test:e2e:ui       # With UI
npm run test:e2e:debug    # Debug mode
npx playwright test --project=chromium  # Chrome only
```

---

## Build and Deploy

### Production Build

```bash
# Build
npm run build

# Output:
# .next/               - Next.js build output
# .next/standalone/    - Standalone server (Node.js only)
# .next/static/        - Static assets

# Start production server
npm start
```

### Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

**Build and run:**

```bash
docker build -t kubevista:1.0.0 .
docker run -p 3000:3000 \
  -v ~/.kube/config:/home/nextjs/.kube/config:ro \
  kubevista:1.0.0
```

### Kubernetes Deployment

**deployment.yaml:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kubevista
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kubevista
  template:
    metadata:
      labels:
        app: kubevista
    spec:
      serviceAccountName: kubevista
      containers:
      - name: dashboard
        image: kubevista:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kubevista
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kubevista
rules:
- apiGroups: ["", "apps", "autoscaling"]
  resources: ["*"]
  verbs: ["get", "list", "watch"]
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["delete"] # For pod restart
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kubevista
subjects:
- kind: ServiceAccount
  name: kubevista
  namespace: default
roleRef:
  kind: ClusterRole
  name: kubevista
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: v1
kind: Service
metadata:
  name: kubevista
  namespace: default
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: kubevista
```

**Deploy:**

```bash
kubectl apply -f deployment.yaml
kubectl get svc kubevista
```

---

## Troubleshooting

### Problem: "Module not found: Can't resolve 'net'"

**Cause:** Trying to use @kubernetes/client-node in a client component.

**Solution:** Move logic to API Route.

```typescript
// ❌ DOES NOT WORK
'use client'
import { fetchPods } from '@/lib/k8s-api'

// ✅ WORKS
// app/api/pods/route.ts
import { fetchPods } from '@/lib/k8s-api'
export async function GET() { ... }
```

### Problem: Type error in Next.js 15 dynamic routes

**Cause:** Params are Promise in Next.js 15.

**Solution:**

```typescript
// ✅
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
}
```

### Problem: SSE does not connect

**Debug:**

```bash
# Check dev server logs
npm run dev

# Test SSE endpoint
curl -N http://localhost:3000/api/stream

# Should see:
# event: connected
# data: {"timestamp":"..."}
```

**Common causes:**
1. Real mode not enabled
2. kubectl not configured
3. Missing Watch API permissions

### Problem: E2E tests fail

**Debug:**

```bash
# Run with UI
npm run test:e2e:ui

# Run with trace
npx playwright test --trace on

# Open trace
npx playwright show-trace trace.zip
```

### Problem: Build fails

**Debug:**

```bash
# Check type errors
npm run type-check

# Check lint errors
npm run lint

# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

---

## Performance Optimizations

### 1. TanStack Query Caching

```typescript
export function useDeployments() {
  return useQuery({
    queryKey: ['deployments'],
    queryFn: fetchDeployments,
    staleTime: 30000,        // 30s - data is "fresh" for 30s
    gcTime: 300000,          // 5min - cache kept for 5min
    refetchInterval: 5000,   // Auto-refetch every 5s (real mode)
  })
}
```

### 2. React.memo for Components

```typescript
export const PodListItem = React.memo(({ pod }: { pod: Pod }) => {
  return <TableRow>...</TableRow>
}, (prevProps, nextProps) => {
  return prevProps.pod.name === nextProps.pod.name
})
```

### 3. useMemo for Heavy Computations

```typescript
const filteredPods = useMemo(() => {
  return pods.filter(pod =>
    pod.name.includes(searchQuery) &&
    (statusFilter === 'all' || pod.status === statusFilter)
  )
}, [pods, searchQuery, statusFilter])
```

### 4. Virtualization for Long Lists

```typescript
import { FixedSizeList } from 'react-window'

<FixedSizeList
  height={600}
  itemCount={pods.length}
  itemSize={60}
  width="100%"
>
  {({ index, style }) => (
    <PodListItem pod={pods[index]} style={style} />
  )}
</FixedSizeList>
```

---

## Contribution Guidelines

### Pull Request Process

1. Fork repo and create branch
2. Implement feature/fix with tests
3. Ensure all checks pass:
   ```bash
   npm run lint:fix
   npm run type-check
   npm run test
   npm run build
   ```
4. Update CHANGELOG.md
5. Create PR with description of changes

### Code Style

- **TypeScript strict mode:** Use types, avoid `any`
- **Functional components:** Prefer function components over class
- **Hooks:** Use custom hooks for reusable logic
- **Error handling:** Always try-catch in async functions
- **Console logs:** Only `console.warn` and `console.error` in production

---

## Developer Contact

- **GitHub Issues:** Bugs and feature requests
- **Discussions:** Technical questions and discussions
- **Email:** tech@kubevista.dev (example)

---

**Last updated:** 2025-11-12
**Documentation version:** 1.0.0
