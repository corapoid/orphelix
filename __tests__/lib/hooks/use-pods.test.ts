import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePods, usePod, usePodEvents, usePodLogs } from '@/lib/hooks/use-pods'
import { useModeStore } from '@/lib/core/store'
import * as mockData from '@/lib/mocks/data'
import React, { type ReactNode } from 'react'

// Mock the store
vi.mock('@/lib/core/store', () => ({
  useModeStore: vi.fn(),
}))

// Mock the mock-data module
vi.mock('@/lib/mocks/data', () => ({
  generateMockPods: vi.fn(),
  generateMockEvents: vi.fn(),
}))

describe('usePods', () => {
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

  it('should return all pods in demo mode without filter', async () => {
    // Arrange
    const mockPods = [
      {
        name: 'web-app-123',
        namespace: 'default',
        status: 'Running' as const,
        restartCount: 0,
        age: '5d',
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [{ name: 'web', image: 'nginx:latest', ready: true, restartCount: 0 }],
        labels: { app: 'web' },
        configMaps: [],
        secrets: [],
      },
      {
        name: 'api-server-456',
        namespace: 'default',
        status: 'Pending' as const,
        restartCount: 1,
        age: '5d',
        nodeName: 'node-2',
        ip: '10.0.1.2',
        containers: [{ name: 'api', image: 'api:latest', ready: false, restartCount: 1 }],
        labels: { app: 'api' },
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => usePods(), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - data loaded
    expect(result.current.data).toEqual(mockPods)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(mockData.generateMockPods).toHaveBeenCalledTimes(1)
  })

  it('should filter pods by status', async () => {
    // Arrange
    const mockPods = [
      {
        name: 'web-app-123',
        namespace: 'default',
        status: 'Running' as const,
        restartCount: 0,
        age: '5d',
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [{ name: 'web', image: 'nginx:latest', ready: true, restartCount: 0 }],
        labels: { app: 'web' },
        configMaps: [],
        secrets: [],
      },
      {
        name: 'api-server-456',
        namespace: 'default',
        status: 'Pending' as const,
        restartCount: 1,
        age: '5d',
        nodeName: 'node-2',
        ip: '10.0.1.2',
        containers: [{ name: 'api', image: 'api:latest', ready: false, restartCount: 1 }],
        labels: { app: 'api' },
        configMaps: [],
        secrets: [],
      },
      {
        name: 'worker-789',
        namespace: 'default',
        status: 'Running' as const,
        restartCount: 0,
        age: '5d',
        nodeName: 'node-1',
        ip: '10.0.1.3',
        containers: [{ name: 'worker', image: 'worker:latest', ready: true, restartCount: 0 }],
        labels: { app: 'worker' },
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act - filter by 'Running' status
    const { result } = renderHook(() => usePods('Running'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should only return Running pods
    expect(result.current.data).toHaveLength(2)
    expect(result.current.data?.every((pod) => pod.status === 'Running')).toBe(true)
    expect(result.current.data?.map((pod) => pod.name)).toEqual([
      'web-app-123',
      'worker-789',
    ])
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockPods = [
      {
        name: 'test-pod',
        namespace: 'default',
        status: 'Running' as const,
        restartCount: 0,
        age: "5d",
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [{ name: 'test', image: 'test:latest', ready: true, restartCount: 0 }],
        labels: { app: 'test' },
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => usePods(), { wrapper })

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

  it('should use correct query key with mode and status filter', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn()
      })
    )

    const mockPods = [
      {
        name: 'test-pod',
        namespace: 'default',
        status: 'Running' as const,
        restartCount: 0,
        age: "5d",
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [{ name: 'test', image: 'test:latest', ready: true, restartCount: 0 }],
        labels: { app: 'test' },
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => usePods('Running'), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['pods', 'demo', 'demo', 'Running'])
  })

  it('should simulate network delay', async () => {
    // Arrange
    const mockPods = [
      {
        name: 'test-pod',
        namespace: 'default',
        status: 'Running' as const,
        restartCount: 0,
        age: "5d",
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [{ name: 'test', image: 'test:latest', ready: true, restartCount: 0 }],
        labels: { app: 'test' },
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    const startTime = Date.now()

    // Act
    const { result } = renderHook(() => usePods(), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const endTime = Date.now()
    const elapsed = endTime - startTime

    // Assert - should take at least 300ms (the simulated delay)
    expect(elapsed).toBeGreaterThanOrEqual(250)
    expect(result.current.data).toEqual(mockPods)
  })
})

describe('usePod', () => {
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

  it('should return specific pod by name', async () => {
    // Arrange
    const mockPods = [
      {
        name: 'web-app-123',
        namespace: 'default',
        status: 'Running' as const,
        restartCount: 0,
        age: '5d',
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [{ name: 'web', image: 'nginx:latest', ready: true, restartCount: 0 }],
        labels: { app: 'web' },
        configMaps: [],
        secrets: [],
      },
      {
        name: 'api-server-456',
        namespace: 'default',
        status: 'Pending' as const,
        restartCount: 1,
        age: '5d',
        nodeName: 'node-2',
        ip: '10.0.1.2',
        containers: [{ name: 'api', image: 'api:latest', ready: false, restartCount: 1 }],
        labels: { app: 'api' },
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => usePod('web-app-123'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should return only the requested pod
    expect(result.current.data).toEqual(mockPods[0])
    expect(result.current.data?.name).toBe('web-app-123')
  })

  it('should be disabled when name is empty', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    // Act
    const { result } = renderHook(() => usePod(''), { wrapper })

    // Assert - query should not be enabled
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should throw error when pod not found', async () => {
    // Arrange
    const mockPods = [
      {
        name: 'web-app-123',
        namespace: 'default',
        status: 'Running' as const,
        restartCount: 0,
        age: "5d",
        nodeName: 'node-1',
        ip: '10.0.1.1',
        containers: [{ name: 'web', image: 'nginx:latest', ready: true, restartCount: 0 }],
        labels: { app: 'web' },
        configMaps: [],
        secrets: [],
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockPods).mockReturnValue(mockPods)

    // Act
    const { result } = renderHook(() => usePod('nonexistent-pod'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    // Assert - should have error
    expect(result.current.error).toBeDefined()
    expect(result.current.error?.message).toBe('Pod not found')
  })

  it('should use correct query key', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn()
      })
    )

    // Act
    renderHook(() => usePod('test-pod'), { wrapper })

    // Assert - verify the query key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['pod', 'test-pod', 'demo', 'demo', ''])
  })
})

describe('usePodEvents', () => {
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

  it('should return events for specific pod', async () => {
    // Arrange
    const mockEvents = [
      {
        type: 'Normal' as const,
        reason: 'Started',
        message: 'Container started successfully',
        count: 1,
        firstTimestamp: new Date('2024-01-15T12:00:00Z').toISOString(),
        lastTimestamp: new Date('2024-01-15T12:00:00Z').toISOString(),
        kind: 'Pod',
        name: 'web-app-123',
        namespace: 'default',
      },
      {
        type: 'Warning' as const,
        reason: 'BackOff',
        message: 'Back-off restarting failed container',
        count: 5,
        firstTimestamp: new Date('2024-01-15T11:00:00Z').toISOString(),
        lastTimestamp: new Date('2024-01-15T11:55:00Z').toISOString(),
        kind: 'Pod',
        name: 'api-server-456',
        namespace: 'default',
      },
      {
        type: 'Normal' as const,
        reason: 'Pulled',
        message: 'Container image pulled',
        count: 1,
        firstTimestamp: new Date('2024-01-15T11:50:00Z').toISOString(),
        lastTimestamp: new Date('2024-01-15T11:50:00Z').toISOString(),
        kind: 'Pod',
        name: 'web-app-123',
        namespace: 'default',
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => usePodEvents('web-app-123'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should only return events for web-app-123
    expect(result.current.data).toHaveLength(2)
    expect(
      result.current.data?.every((event) => event.name === 'web-app-123')
    ).toBe(true)
  })

  it('should be disabled when podName is empty', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    // Act
    const { result } = renderHook(() => usePodEvents(''), { wrapper })

    // Assert - query should not be enabled
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should use correct query key', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn()
      })
    )

    // Act
    renderHook(() => usePodEvents('test-pod'), { wrapper })

    // Assert - verify the query key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['pod-events', 'test-pod', 'demo', 'demo', ''])
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockEvents = [
      {
        type: 'Normal' as const,
        reason: 'Created',
        message: 'Pod created',
        count: 1,
        firstTimestamp: new Date().toISOString(),
        lastTimestamp: new Date().toISOString(),
        kind: 'Pod',
        name: 'test-pod',
        namespace: 'default',
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => usePodEvents('test-pod'), { wrapper })

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
})

describe('usePodLogs', () => {
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

  it('should return logs for specific pod container', async () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    // Act
    const { result } = renderHook(
      () => usePodLogs('web-app-123', 'nginx', 100),
      { wrapper }
    )

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should return logs as an object with logs and parsed fields
    expect(result.current.data).toBeDefined()
    expect(typeof result.current.data).toBe('object')
    expect(result.current.data?.logs).toBeDefined()
    expect(typeof result.current.data?.logs).toBe('string')
    expect(result.current.data?.logs).toContain('nginx')
    expect(result.current.data?.logs.split('\n').length).toBeGreaterThan(0)
  })

  it('should respect tail parameter', async () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    // Act - request only 50 lines
    const { result } = renderHook(() => usePodLogs('web-app-123', 'nginx', 50), {
      wrapper,
    })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should return exactly 50 lines
    const lines = result.current.data?.logs.split('\n').filter((line: string) => line.trim())
    expect(lines?.length).toBe(50)
  })

  it('should use default tail of 100', async () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    // Act - don't specify tail parameter
    const { result } = renderHook(() => usePodLogs('web-app-123', 'nginx'), {
      wrapper,
    })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should return 100 lines by default
    const lines = result.current.data?.logs.split('\n').filter((line: string) => line.trim())
    expect(lines?.length).toBe(100)
  })

  it('should be disabled when podName is empty', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    // Act
    const { result } = renderHook(() => usePodLogs('', 'nginx', 100), { wrapper })

    // Assert - query should not be enabled
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should be disabled when containerName is empty', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    // Act
    const { result } = renderHook(() => usePodLogs('web-app-123', '', 100), {
      wrapper,
    })

    // Assert - query should not be enabled
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should use correct query key', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn()
      })
    )

    // Act
    renderHook(() => usePodLogs('test-pod', 'test-container', 50), { wrapper })

    // Assert - verify the query key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual([
      'pod-logs',
      'test-pod',
      'test-container',
      50,
      'demo',
      'demo',
    ])
  })

  it('should not auto-refresh logs', async () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    // Act
    const { result } = renderHook(() => usePodLogs('web-app-123', 'nginx', 100), {
      wrapper,
    })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - verify refetchInterval is false
    const query = queryClient.getQueryCache().getAll()[0]
    expect((query.options as any).refetchInterval).toBe(false)
    expect((query.options as any).staleTime).toBe(Infinity)
  })

  it('should handle loading states', async () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    // Act
    const { result } = renderHook(() => usePodLogs('web-app-123', 'nginx', 100), {
      wrapper,
    })

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
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'demo',
        selectedNamespace: 'demo',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )

    const startTime = Date.now()

    // Act
    const { result } = renderHook(() => usePodLogs('web-app-123', 'nginx', 100), {
      wrapper,
    })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const endTime = Date.now()
    const elapsed = endTime - startTime

    // Assert - should take at least 400ms (the simulated delay)
    expect(elapsed).toBeGreaterThanOrEqual(350)
    expect(result.current.data).toBeDefined()
  })
})
