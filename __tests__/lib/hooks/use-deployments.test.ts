import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  useDeployments,
  useDeployment,
  useDeploymentPods,
  useDeploymentEvents,
} from '@/lib/hooks/use-deployments'
import { useModeStore } from '@/lib/core/store'
import * as mockData from '@/lib/mocks/data'
import React, { type ReactNode } from 'react'
import type { Deployment, Pod, Event } from '@/types/kubernetes'

// Mock the store
vi.mock('@/lib/core/store', () => ({
  useModeStore: vi.fn(),
}))

// Mock the mock-data module
vi.mock('@/lib/mocks/data', () => ({
  generateMockDeployments: vi.fn(),
  generateMockPods: vi.fn(),
  generateMockEvents: vi.fn(),
}))

describe('useDeployments', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries for tests
        },
      },
    })

    // Clear all mocks
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)

  it('should return deployments in mock mode', async () => {
    // Arrange
    const mockDeployments: Deployment[] = [
      {
        name: 'web-app',
        namespace: 'default',
        replicas: { desired: 3, ready: 3, available: 3, unavailable: 0 },
        status: 'Available',
        age: '5d',
        labels: { app: 'web-app', tier: 'frontend' },
        selector: { app: 'web-app' },
        strategy: 'RollingUpdate',
        configMaps: ['web-app-config'],
        secrets: ['web-app-secret'],
      },
      {
        name: 'api-server',
        namespace: 'default',
        replicas: { desired: 2, ready: 1, available: 1, unavailable: 1 },
        status: 'Progressing',
        age: '5d',
        labels: { app: 'api-server', tier: 'backend' },
        selector: { app: 'api-server' },
        strategy: 'RollingUpdate',
        configMaps: ['api-server-config'],
        secrets: ['api-server-secret'],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDeployments).mockReturnValue(mockDeployments)

    // Act
    const { result } = renderHook(() => useDeployments(), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - data loaded
    expect(result.current.data).toEqual(mockDeployments)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(mockData.generateMockDeployments).toHaveBeenCalledTimes(1)
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockDeployments: Deployment[] = [
      {
        name: 'web-app',
        namespace: 'default',
        replicas: { desired: 3, ready: 3, available: 3, unavailable: 0 },
        status: 'Available',
        age: "5d",
        labels: { app: 'web-app' },
        selector: { app: 'web-app' },
        strategy: 'RollingUpdate',
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDeployments).mockReturnValue(mockDeployments)

    // Act
    const { result } = renderHook(() => useDeployments(), { wrapper })

    // Assert - check loading state
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeNull()

    // Wait for success
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeDefined()
  })

  it('should simulate network delay', async () => {
    // Arrange
    const mockDeployments: Deployment[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDeployments).mockReturnValue(mockDeployments)

    const startTime = Date.now()

    // Act
    const { result } = renderHook(() => useDeployments(), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const endTime = Date.now()
    const elapsed = endTime - startTime

    // Assert - should take at least 300ms (the simulated delay)
    expect(elapsed).toBeGreaterThanOrEqual(250)
    expect(result.current.data).toEqual(mockDeployments)
  })

  it('should use correct query key with mode', () => {
    // Arrange
    const mockDeployments: Deployment[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDeployments).mockReturnValue(mockDeployments)

    // Act
    const { result } = renderHook(() => useDeployments(), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key (now includes namespace)
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['deployments', 'mock', 'mock'])
  })
})

describe('useDeployment', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)

  it('should return single deployment by name', async () => {
    // Arrange
    const mockDeployments: Deployment[] = [
      {
        name: 'web-app',
        namespace: 'default',
        replicas: { desired: 3, ready: 3, available: 3, unavailable: 0 },
        status: 'Available',
        age: '5d',
        labels: { app: 'web-app' },
        selector: { app: 'web-app' },
        strategy: 'RollingUpdate',
        configMaps: [],
        secrets: [],
      },
      {
        name: 'api-server',
        namespace: 'default',
        replicas: { desired: 2, ready: 2, available: 2, unavailable: 0 },
        status: 'Available',
        age: '5d',
        labels: { app: 'api-server' },
        selector: { app: 'api-server' },
        strategy: 'RollingUpdate',
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDeployments).mockReturnValue(mockDeployments)

    // Act
    const { result } = renderHook(() => useDeployment('web-app'), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - correct deployment returned
    expect(result.current.data).toEqual(mockDeployments[0])
    expect(result.current.data?.name).toBe('web-app')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should throw error when deployment not found', async () => {
    // Arrange
    const mockDeployments: Deployment[] = [
      {
        name: 'web-app',
        namespace: 'default',
        replicas: { desired: 3, ready: 3, available: 3, unavailable: 0 },
        status: 'Available',
        age: "5d",
        labels: { app: 'web-app' },
        selector: { app: 'web-app' },
        strategy: 'RollingUpdate',
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDeployments).mockReturnValue(mockDeployments)

    // Act
    const { result } = renderHook(() => useDeployment('non-existent'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    // Assert - error thrown
    expect(result.current.error).toBeDefined()
    expect((result.current.error as Error).message).toBe('Deployment not found')
  })

  it('should be disabled when name is empty', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )

    // Act
    const { result } = renderHook(() => useDeployment(''), { wrapper })

    // Assert - query should not be enabled
    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockDeployments: Deployment[] = [
      {
        name: 'api-server',
        namespace: 'default',
        replicas: { desired: 2, ready: 2, available: 2, unavailable: 0 },
        status: 'Available',
        age: "5d",
        labels: { app: 'api-server' },
        selector: { app: 'api-server' },
        strategy: 'RollingUpdate',
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDeployments).mockReturnValue(mockDeployments)

    // Act
    const { result } = renderHook(() => useDeployment('api-server'), { wrapper })

    // Assert - check loading state
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for success
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeDefined()
  })

  it('should use correct query key with name and mode', () => {
    // Arrange
    const mockDeployments: Deployment[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDeployments).mockReturnValue(mockDeployments)

    // Act
    const { result } = renderHook(() => useDeployment('test-deployment'), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['deployment', 'test-deployment', 'mock', 'mock'])
  })
})

describe('useDeploymentPods', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)

  it('should return filtered pods for deployment', async () => {
    // Arrange
    const mockPods: Pod[] = [
      {
        name: 'web-app-abc123',
        namespace: 'default',
        status: 'Running',
        restartCount: 0,
        age: "5d",
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [{ name: 'web-app', image: 'web-app:latest', ready: true, restartCount: 0 }],
        labels: { app: 'web-app', version: 'v1' },
        ownerReferences: [{ kind: 'ReplicaSet', name: 'web-app-xyz', uid: '123' }],
      configMaps: [],
      secrets: [],
      },
      {
        name: 'api-server-def456',
        namespace: 'default',
        status: 'Running',
        restartCount: 0,
        age: "5d",
        nodeName: 'node-2',
        ip: '10.0.1.2',
        containers: [{ name: 'api-server', image: 'api-server:latest', ready: true, restartCount: 0 }],
        labels: { app: 'api-server', version: 'v1' },
        ownerReferences: [{ kind: 'ReplicaSet', name: 'api-server-xyz', uid: '456' }],
      configMaps: [],
      secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => useDeploymentPods('web-app'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - only web-app pods returned
    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0].name).toBe('web-app-abc123')
    expect(result.current.data?.[0].labels.app).toBe('web-app')
  })

  it('should filter pods by owner reference', async () => {
    // Arrange
    const mockPods: Pod[] = [
      {
        name: 'web-app-pod1',
        namespace: 'default',
        status: 'Running',
        restartCount: 0,
        age: "5d",
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [],
        labels: { app: 'other-app' }, // Different label
        ownerReferences: [{ kind: 'ReplicaSet', name: 'web-app-12345', uid: '123' }], // Matches deployment
      configMaps: [],
      secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => useDeploymentPods('web-app'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - pod should be included due to owner reference
    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0].name).toBe('web-app-pod1')
  })

  it('should filter pods by matching app label', async () => {
    // Arrange
    const mockPods: Pod[] = [
      {
        name: 'web-app-pod1',
        namespace: 'default',
        status: 'Running',
        restartCount: 0,
        age: "5d",
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [],
        labels: { app: 'web-app' }, // Matches deployment
        ownerReferences: undefined, // No owner reference
      configMaps: [],
      secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => useDeploymentPods('web-app'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - pod should be included due to matching label
    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0].name).toBe('web-app-pod1')
  })

  it('should be disabled when deployment name is empty', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )

    // Act
    const { result } = renderHook(() => useDeploymentPods(''), { wrapper })

    // Assert - query should not be enabled
    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockPods: Pod[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => useDeploymentPods('web-app'), { wrapper })

    // Assert - check loading state
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for success
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeDefined()
  })

  it('should use correct query key with deployment name and mode', () => {
    // Arrange
    const mockPods: Pod[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => useDeploymentPods('test-deployment'), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['deployment-pods', 'test-deployment', 'mock', 'mock'])
  })
})

describe('useDeploymentEvents', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)

  it('should return filtered events for deployment', async () => {
    // Arrange
    const mockEvents: Event[] = [
      {
        type: 'Normal',
        reason: 'ScalingReplicaSet',
        message: 'Scaled up replica set web-app-xyz to 3',
        count: 1,
        firstTimestamp: new Date().toISOString(),
        lastTimestamp: new Date().toISOString(),
        kind: 'Deployment',
        name: 'web-app',
        namespace: 'default',
      },
      {
        type: 'Warning',
        reason: 'Failed',
        message: 'Failed to pull image',
        count: 2,
        firstTimestamp: new Date().toISOString(),
        lastTimestamp: new Date().toISOString(),
        kind: 'Pod',
        name: 'api-server-123',
        namespace: 'default',
      },
      {
        type: 'Normal',
        reason: 'Updated',
        message: 'Updated deployment',
        count: 1,
        firstTimestamp: new Date().toISOString(),
        lastTimestamp: new Date().toISOString(),
        kind: 'Deployment',
        name: 'web-app',
        namespace: 'default',
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => useDeploymentEvents('web-app'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - only web-app deployment events returned
    expect(result.current.data).toHaveLength(2)
    expect(result.current.data?.[0].name).toBe('web-app')
    expect(result.current.data?.[0].kind).toBe('Deployment')
    expect(result.current.data?.[1].name).toBe('web-app')
  })

  it('should filter only deployment events', async () => {
    // Arrange
    const mockEvents: Event[] = [
      {
        type: 'Normal',
        reason: 'Created',
        message: 'Created deployment',
        count: 1,
        firstTimestamp: new Date().toISOString(),
        lastTimestamp: new Date().toISOString(),
        kind: 'Deployment',
        name: 'web-app',
        namespace: 'default',
      },
      {
        type: 'Normal',
        reason: 'Started',
        message: 'Started pod',
        count: 1,
        firstTimestamp: new Date().toISOString(),
        lastTimestamp: new Date().toISOString(),
        kind: 'Pod',
        name: 'web-app-123',
        namespace: 'default',
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => useDeploymentEvents('web-app'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - only Deployment kind events, not Pod events
    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0].kind).toBe('Deployment')
    expect(result.current.data?.[0].name).toBe('web-app')
  })

  it('should be disabled when deployment name is empty', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )

    // Act
    const { result } = renderHook(() => useDeploymentEvents(''), { wrapper })

    // Assert - query should not be enabled
    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockEvents: Event[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => useDeploymentEvents('web-app'), { wrapper })

    // Assert - check loading state
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for success
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeDefined()
  })

  it('should simulate network delay', async () => {
    // Arrange
    const mockEvents: Event[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    const startTime = Date.now()

    // Act
    const { result } = renderHook(() => useDeploymentEvents('web-app'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const endTime = Date.now()
    const elapsed = endTime - startTime

    // Assert - should take at least 150ms (the simulated delay)
    expect(elapsed).toBeGreaterThanOrEqual(100)
    expect(result.current.data).toEqual(mockEvents)
  })

  it('should use correct query key with deployment name and mode', () => {
    // Arrange
    const mockEvents: Event[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => useDeploymentEvents('test-deployment'), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['deployment-events', 'test-deployment', 'mock', 'mock'])
  })
})
