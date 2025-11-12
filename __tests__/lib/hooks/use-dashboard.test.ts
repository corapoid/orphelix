import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useDashboardSummary, useRecentEvents } from '@/lib/hooks/use-dashboard'
import { useModeStore } from '@/lib/store'
import * as mockData from '@/lib/mock-data'
import React, { type ReactNode } from 'react'

// Mock the store
vi.mock('@/lib/store', () => ({
  useModeStore: vi.fn(),
}))

// Mock the mock-data module
vi.mock('@/lib/mock-data', () => ({
  generateMockDashboardSummary: vi.fn(),
  generateMockEvents: vi.fn(),
}))

describe('useDashboardSummary', () => {
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

  it('should return mock data in mock mode', async () => {
    // Arrange
    const mockSummary = {
      deployments: { total: 5, healthy: 4, degraded: 1 },
      pods: { total: 15, running: 12, pending: 2, failed: 1 },
      nodes: { total: 4, ready: 3, notReady: 1 },
      configMaps: 5,
      secrets: 5,
      hpa: 3,
      pv: { total: 5, bound: 4 },
    }

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDashboardSummary).mockReturnValue(mockSummary)

    // Act
    const { result } = renderHook(() => useDashboardSummary(), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - data loaded
    expect(result.current.data).toEqual(mockSummary)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(mockData.generateMockDashboardSummary).toHaveBeenCalledTimes(1)
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockSummary = {
      deployments: { total: 5, healthy: 5, degraded: 0 },
      pods: { total: 10, running: 10, pending: 0, failed: 0 },
      nodes: { total: 3, ready: 3, notReady: 0 },
      configMaps: 3,
      secrets: 3,
      hpa: 2,
      pv: { total: 3, bound: 3 },
    }

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDashboardSummary).mockReturnValue(mockSummary)

    // Act
    const { result } = renderHook(() => useDashboardSummary(), { wrapper })

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
    const mockSummary = {
      deployments: { total: 5, healthy: 5, degraded: 0 },
      pods: { total: 10, running: 10, pending: 0, failed: 0 },
      nodes: { total: 3, ready: 3, notReady: 0 },
      configMaps: 3,
      secrets: 3,
      hpa: 2,
      pv: { total: 3, bound: 3 },
    }

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDashboardSummary).mockReturnValue(mockSummary)

    const startTime = Date.now()

    // Act
    const { result } = renderHook(() => useDashboardSummary(), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const endTime = Date.now()
    const elapsed = endTime - startTime

    // Assert - should take at least 300ms (the simulated delay)
    // We use a lower threshold to account for test environment variability
    expect(elapsed).toBeGreaterThanOrEqual(250)
    expect(result.current.data).toEqual(mockSummary)
  })

  it('should use correct query key with mode', () => {
    // Arrange
    const mockSummary = {
      deployments: { total: 5, healthy: 5, degraded: 0 },
      pods: { total: 10, running: 10, pending: 0, failed: 0 },
      nodes: { total: 3, ready: 3, notReady: 0 },
      configMaps: 3,
      secrets: 3,
      hpa: 2,
      pv: { total: 3, bound: 3 },
    }

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockDashboardSummary).mockReturnValue(mockSummary)

    // Act
    const { result } = renderHook(() => useDashboardSummary(), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key (now includes namespace)
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['dashboard-summary', 'mock', 'mock'])
  })
})

describe('useRecentEvents', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    // Clear all mocks
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)

  it('should return mock events in mock mode', async () => {
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
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => useRecentEvents(10), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - data loaded
    expect(result.current.data).toEqual(mockEvents)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(mockData.generateMockEvents).toHaveBeenCalledTimes(1)
  })

  it('should respect limit parameter', async () => {
    // Arrange
    const mockEvents = Array.from({ length: 20 }, (_, i) => ({
      type: 'Normal' as const,
      reason: 'Event',
      message: `Event ${i}`,
      count: 1,
      firstTimestamp: new Date().toISOString(),
      lastTimestamp: new Date().toISOString(),
      kind: 'Pod',
      name: `pod-${i}`,
      namespace: 'default',
    }))

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => useRecentEvents(5), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should only return 5 events
    expect(result.current.data).toHaveLength(5)
    expect(result.current.data).toEqual(mockEvents.slice(0, 5))
  })

  it('should use default limit of 10', async () => {
    // Arrange
    const mockEvents = Array.from({ length: 20 }, (_, i) => ({
      type: 'Normal' as const,
      reason: 'Event',
      message: `Event ${i}`,
      count: 1,
      firstTimestamp: new Date().toISOString(),
      lastTimestamp: new Date().toISOString(),
      kind: 'Pod',
      name: `pod-${i}`,
      namespace: 'default',
    }))

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act - don't pass limit parameter
    const { result } = renderHook(() => useRecentEvents(), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should return default 10 events
    expect(result.current.data).toHaveLength(10)
    expect(result.current.data).toEqual(mockEvents.slice(0, 10))
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
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => useRecentEvents(), { wrapper })

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
    const mockEvents = [
      {
        type: 'Normal' as const,
        reason: 'Started',
        message: 'Container started',
        count: 1,
        firstTimestamp: new Date().toISOString(),
        lastTimestamp: new Date().toISOString(),
        kind: 'Pod',
        name: 'test-pod',
        namespace: 'default',
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    const startTime = Date.now()

    // Act
    const { result } = renderHook(() => useRecentEvents(), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const endTime = Date.now()
    const elapsed = endTime - startTime

    // Assert - should take at least 200ms (the simulated delay)
    // We use a lower threshold to account for test environment variability
    expect(elapsed).toBeGreaterThanOrEqual(150)
    expect(result.current.data).toEqual(mockEvents)
  })

  it('should use correct query key with mode and limit', () => {
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
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act
    const { result } = renderHook(() => useRecentEvents(5), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key (now includes namespace)
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['recent-events', 'mock', 'mock', 5])
  })
})
