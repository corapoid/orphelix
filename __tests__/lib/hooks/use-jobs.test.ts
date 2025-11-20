import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useJobs, useJob } from '@/lib/hooks/use-jobs'
import { useModeStore } from '@/lib/core/store'
import * as mockData from '@/lib/mocks/data'
import React, { type ReactNode } from 'react'
import type { Job } from '@/types/kubernetes'

// Mock the store
vi.mock('@/lib/core/store', () => ({
  useModeStore: vi.fn(),
}))

// Mock the mock-data module
vi.mock('@/lib/mocks/data', () => ({
  generateMockJobs: vi.fn(),
}))

describe('useJobs', () => {
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

  it('should return jobs in demo mode', async () => {
    // Arrange
    const mockJobs: Job[] = [
      {
        name: 'data-migration-20241114',
        namespace: 'default',
        status: 'Complete',
        completions: 1,
        succeeded: 1,
        failed: 0,
        active: 0,
        startTime: '2024-11-14T10:00:00Z',
        completionTime: '2024-11-14T10:15:23Z',
        duration: '15m 23s',
        age: '2h',
        labels: { app: 'migration', batch: 'true' },
        conditions: [
          {
            type: 'Complete',
            status: 'True',
            lastProbeTime: '2024-11-14T10:15:23Z',
            lastTransitionTime: '2024-11-14T10:15:23Z',
            reason: 'JobComplete',
            message: 'Job completed successfully',
          },
        ],
      },
      {
        name: 'etl-pipeline-failed',
        namespace: 'default',
        status: 'Failed',
        completions: 1,
        succeeded: 0,
        failed: 1,
        active: 0,
        startTime: '2024-11-14T09:00:00Z',
        completionTime: '2024-11-14T09:05:30Z',
        duration: '5m 30s',
        age: '3h',
        labels: { app: 'etl', batch: 'true' },
        conditions: [
          {
            type: 'Failed',
            status: 'True',
            lastProbeTime: '2024-11-14T09:05:30Z',
            lastTransitionTime: '2024-11-14T09:05:30Z',
            reason: 'BackoffLimitExceeded',
            message: 'Job has reached the specified backoff limit',
          },
        ],
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
    vi.mocked(mockData.generateMockJobs).mockReturnValue(mockJobs)

    // Act
    const { result } = renderHook(() => useJobs(), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - data loaded
    expect(result.current.data).toEqual(mockJobs)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(mockData.generateMockJobs).toHaveBeenCalledTimes(1)
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockJobs: Job[] = [
      {
        name: 'test-job',
        namespace: 'default',
        status: 'Running',
        completions: 1,
        succeeded: 0,
        failed: 0,
        active: 1,
        startTime: '2024-11-14T10:00:00Z',
        age: '10m',
        labels: { app: 'test' },
        conditions: [],
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
    vi.mocked(mockData.generateMockJobs).mockReturnValue(mockJobs)

    // Act
    const { result } = renderHook(() => useJobs(), { wrapper })

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
    const mockJobs: Job[] = []
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
    vi.mocked(mockData.generateMockJobs).mockReturnValue(mockJobs)

    const startTime = Date.now()

    // Act
    const { result } = renderHook(() => useJobs(), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const endTime = Date.now()
    const elapsed = endTime - startTime

    // Assert - should take at least 300ms (the simulated delay)
    expect(elapsed).toBeGreaterThanOrEqual(250)
    expect(result.current.data).toEqual(mockJobs)
  })

  it('should use correct query key with mode', () => {
    // Arrange
    const mockJobs: Job[] = []
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
    vi.mocked(mockData.generateMockJobs).mockReturnValue(mockJobs)

    // Act
    const { result } = renderHook(() => useJobs(), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['jobs', 'demo', 'demo', ''])
  })
})

describe('useJob', () => {
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

  it('should return single job by name', async () => {
    // Arrange
    const mockJobs: Job[] = [
      {
        name: 'data-migration-20241114',
        namespace: 'default',
        status: 'Complete',
        completions: 1,
        succeeded: 1,
        failed: 0,
        active: 0,
        startTime: '2024-11-14T10:00:00Z',
        completionTime: '2024-11-14T10:15:23Z',
        duration: '15m 23s',
        age: '2h',
        labels: { app: 'migration' },
        conditions: [],
      },
      {
        name: 'backup-job',
        namespace: 'default',
        status: 'Running',
        completions: 1,
        succeeded: 0,
        failed: 0,
        active: 1,
        startTime: '2024-11-14T11:00:00Z',
        age: '1h',
        labels: { app: 'backup' },
        conditions: [],
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
    vi.mocked(mockData.generateMockJobs).mockReturnValue(mockJobs)

    // Act
    const { result } = renderHook(() => useJob('data-migration-20241114'), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - correct job returned
    expect(result.current.data).toEqual(mockJobs[0])
    expect(result.current.data?.name).toBe('data-migration-20241114')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should throw error when job not found', async () => {
    // Arrange
    const mockJobs: Job[] = [
      {
        name: 'existing-job',
        namespace: 'default',
        status: 'Complete',
        completions: 1,
        succeeded: 1,
        failed: 0,
        active: 0,
        age: '2h',
        labels: {},
        conditions: [],
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
    vi.mocked(mockData.generateMockJobs).mockReturnValue(mockJobs)

    // Act
    const { result } = renderHook(() => useJob('non-existent'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    // Assert - error thrown
    expect(result.current.error).toBeDefined()
    expect((result.current.error as Error).message).toBe('Job not found')
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
    const { result } = renderHook(() => useJob(''), { wrapper })

    // Assert - query should not be enabled
    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockJobs: Job[] = [
      {
        name: 'test-job',
        namespace: 'default',
        status: 'Running',
        completions: 1,
        succeeded: 0,
        failed: 0,
        active: 1,
        age: '10m',
        labels: {},
        conditions: [],
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
    vi.mocked(mockData.generateMockJobs).mockReturnValue(mockJobs)

    // Act
    const { result } = renderHook(() => useJob('test-job'), { wrapper })

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
    const mockJobs: Job[] = []
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
    vi.mocked(mockData.generateMockJobs).mockReturnValue(mockJobs)

    // Act
    const { result } = renderHook(() => useJob('test-job'), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['jobs', 'test-job', 'demo', 'demo', ''])
  })
})
