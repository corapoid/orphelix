import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useDashboardSummary, useRecentEvents } from '@/lib/hooks/use-dashboard'
import { useModeStore } from '@/lib/core/store'
import * as mockData from '@/lib/mocks/data'
import React, { type ReactNode } from 'react'

// Mock the store
vi.mock('@/lib/core/store', () => ({
  useModeStore: vi.fn(),
}))

// Mock the mock-data module
vi.mock('@/lib/mocks/data', () => ({
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
      services: 3,
      ingress: 2,
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
      services: 3,
      ingress: 2,
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
      services: 3,
      ingress: 2,
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
      services: 3,
      ingress: 2,
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
    expect(queries[0].queryKey).toEqual(['dashboard-summary', 'mock', 'mock', ''])
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
    // Arrange - use recent timestamps (within last 24 hours)
    const now = new Date()
    const mockEvents = [
      {
        type: 'Normal' as const,
        reason: 'Started',
        message: 'Container started successfully',
        count: 1,
        firstTimestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        lastTimestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        kind: 'Pod',
        name: 'web-app-123',
        namespace: 'default',
      },
      {
        type: 'Warning' as const,
        reason: 'BackOff',
        message: 'Back-off restarting failed container',
        count: 5,
        firstTimestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        lastTimestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        kind: 'Pod',
        name: 'api-server-456',
        namespace: 'default',
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act - use default 24 hour time range
    const { result } = renderHook(() => useRecentEvents(24), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - data loaded and filtered by time range
    expect(result.current.data).toHaveLength(2)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(mockData.generateMockEvents).toHaveBeenCalledTimes(1)
  })

  it('should respect timeRange parameter', async () => {
    // Arrange - create events with different timestamps
    const now = new Date()
    const mockEvents = [
      {
        type: 'Normal' as const,
        reason: 'Event',
        message: 'Recent event (2 hours ago)',
        count: 1,
        firstTimestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        lastTimestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        kind: 'Pod',
        name: 'pod-1',
        namespace: 'default',
      },
      {
        type: 'Normal' as const,
        reason: 'Event',
        message: 'Old event (10 hours ago)',
        count: 1,
        firstTimestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(),
        lastTimestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(),
        kind: 'Pod',
        name: 'pod-2',
        namespace: 'default',
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act - use 6 hour time range
    const { result } = renderHook(() => useRecentEvents(6), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should only return events within last 6 hours (only the first one)
    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0].message).toBe('Recent event (2 hours ago)')
  })

  it('should use default timeRange of 24 hours', async () => {
    // Arrange - create events with different timestamps
    const now = new Date()
    const mockEvents = [
      {
        type: 'Normal' as const,
        reason: 'Event',
        message: 'Event within 24h',
        count: 1,
        firstTimestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
        lastTimestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
        kind: 'Pod',
        name: 'pod-1',
        namespace: 'default',
      },
      {
        type: 'Normal' as const,
        reason: 'Event',
        message: 'Old event (30 hours ago)',
        count: 1,
        firstTimestamp: new Date(now.getTime() - 30 * 60 * 60 * 1000).toISOString(),
        lastTimestamp: new Date(now.getTime() - 30 * 60 * 60 * 1000).toISOString(),
        kind: 'Pod',
        name: 'pod-2',
        namespace: 'default',
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({ mode: 'mock', selectedNamespace: 'mock', selectedContext: null, realtimeEnabled: false, setMode: vi.fn(), setContext: vi.fn(), setNamespace: vi.fn(), setRealtimeEnabled: vi.fn(), reset: vi.fn() })
    )
    vi.mocked(mockData.generateMockEvents).mockReturnValue(mockEvents)

    // Act - don't pass timeRange parameter
    const { result } = renderHook(() => useRecentEvents(), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - should return events within default 24 hours
    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0].message).toBe('Event within 24h')
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

  it('should use correct query key with mode and timeRange', () => {
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
    const { result } = renderHook(() => useRecentEvents(6), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key (now includes namespace and timeRange)
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['recent-events', 'mock', 'mock', 6])
  })
})
