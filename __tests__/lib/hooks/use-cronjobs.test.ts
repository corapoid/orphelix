import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCronJobs, useCronJob } from '@/lib/hooks/use-cronjobs'
import { useModeStore } from '@/lib/core/store'
import * as mockData from '@/lib/mocks/data'
import React, { type ReactNode } from 'react'
import type { CronJob } from '@/types/kubernetes'

// Mock the store
vi.mock('@/lib/core/store', () => ({
  useModeStore: vi.fn(),
}))

// Mock the mock-data module
vi.mock('@/lib/mocks/data', () => ({
  generateMockCronJobs: vi.fn(),
}))

describe('useCronJobs', () => {
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

  it('should return cronjobs in mock mode', async () => {
    // Arrange
    const mockCronJobs: CronJob[] = [
      {
        name: 'hourly-reports',
        namespace: 'default',
        schedule: '0 * * * *',
        suspend: false,
        active: 1,
        lastSchedule: '2024-11-14T10:00:00Z',
        lastSuccessfulTime: '2024-11-14T10:00:00Z',
        age: '30d',
        labels: { app: 'reports', tier: 'batch' },
      },
      {
        name: 'nightly-backup',
        namespace: 'default',
        schedule: '0 2 * * *',
        suspend: false,
        active: 0,
        lastSchedule: '2024-11-14T02:00:00Z',
        lastSuccessfulTime: '2024-11-14T02:00:00Z',
        age: '60d',
        labels: { app: 'backup', tier: 'system' },
      },
      {
        name: 'suspended-job',
        namespace: 'default',
        schedule: '*/15 * * * *',
        suspend: true,
        active: 0,
        age: '10d',
        labels: { app: 'temp' },
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockCronJobs).mockReturnValue(mockCronJobs)

    // Act
    const { result } = renderHook(() => useCronJobs(), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - data loaded
    expect(result.current.data).toEqual(mockCronJobs)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(mockData.generateMockCronJobs).toHaveBeenCalledTimes(1)
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockCronJobs: CronJob[] = [
      {
        name: 'test-cronjob',
        namespace: 'default',
        schedule: '0 12 * * *',
        suspend: false,
        active: 0,
        age: '5d',
        labels: { app: 'test' },
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockCronJobs).mockReturnValue(mockCronJobs)

    // Act
    const { result } = renderHook(() => useCronJobs(), { wrapper })

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
    const mockCronJobs: CronJob[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockCronJobs).mockReturnValue(mockCronJobs)

    const startTime = Date.now()

    // Act
    const { result } = renderHook(() => useCronJobs(), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const endTime = Date.now()
    const elapsed = endTime - startTime

    // Assert - should take at least 300ms (the simulated delay)
    expect(elapsed).toBeGreaterThanOrEqual(250)
    expect(result.current.data).toEqual(mockCronJobs)
  })

  it('should use correct query key with mode', () => {
    // Arrange
    const mockCronJobs: CronJob[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockCronJobs).mockReturnValue(mockCronJobs)

    // Act
    const { result } = renderHook(() => useCronJobs(), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['cronjobs', 'mock', 'mock'])
  })
})

describe('useCronJob', () => {
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

  it('should return single cronjob by name', async () => {
    // Arrange
    const mockCronJobs: CronJob[] = [
      {
        name: 'hourly-reports',
        namespace: 'default',
        schedule: '0 * * * *',
        suspend: false,
        active: 1,
        lastSchedule: '2024-11-14T10:00:00Z',
        lastSuccessfulTime: '2024-11-14T10:00:00Z',
        age: '30d',
        labels: { app: 'reports' },
      },
      {
        name: 'nightly-backup',
        namespace: 'default',
        schedule: '0 2 * * *',
        suspend: false,
        active: 0,
        age: '60d',
        labels: { app: 'backup' },
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockCronJobs).mockReturnValue(mockCronJobs)

    // Act
    const { result } = renderHook(() => useCronJob('hourly-reports'), { wrapper })

    // Assert - initially loading
    expect(result.current.isLoading).toBe(true)

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - correct cronjob returned
    expect(result.current.data).toEqual(mockCronJobs[0])
    expect(result.current.data?.name).toBe('hourly-reports')
    expect(result.current.data?.schedule).toBe('0 * * * *')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should throw error when cronjob not found', async () => {
    // Arrange
    const mockCronJobs: CronJob[] = [
      {
        name: 'existing-cronjob',
        namespace: 'default',
        schedule: '0 0 * * *',
        suspend: false,
        active: 0,
        age: '10d',
        labels: {},
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockCronJobs).mockReturnValue(mockCronJobs)

    // Act
    const { result } = renderHook(() => useCronJob('non-existent'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    // Assert - error thrown
    expect(result.current.error).toBeDefined()
    expect((result.current.error as Error).message).toBe('CronJob not found')
  })

  it('should be disabled when name is empty', () => {
    // Arrange
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
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
    const { result } = renderHook(() => useCronJob(''), { wrapper })

    // Assert - query should not be enabled
    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should handle loading states', async () => {
    // Arrange
    const mockCronJobs: CronJob[] = [
      {
        name: 'test-cronjob',
        namespace: 'default',
        schedule: '*/5 * * * *',
        suspend: false,
        active: 1,
        age: '1d',
        labels: {},
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockCronJobs).mockReturnValue(mockCronJobs)

    // Act
    const { result } = renderHook(() => useCronJob('test-cronjob'), { wrapper })

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
    const mockCronJobs: CronJob[] = []
    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockCronJobs).mockReturnValue(mockCronJobs)

    // Act
    const { result } = renderHook(() => useCronJob('test-cronjob'), { wrapper })

    // Assert - verify the query was created
    expect(result.current).toBeDefined()

    // The query should be using the correct key
    const queries = queryClient.getQueryCache().getAll()
    expect(queries).toHaveLength(1)
    expect(queries[0].queryKey).toEqual(['cronjobs', 'mock', 'mock', 'test-cronjob'])
  })

  it('should handle suspended cronjobs correctly', async () => {
    // Arrange
    const mockCronJobs: CronJob[] = [
      {
        name: 'suspended-cronjob',
        namespace: 'default',
        schedule: '0 0 * * *',
        suspend: true,
        active: 0,
        age: '5d',
        labels: { app: 'maintenance' },
      },
    ]

    vi.mocked(useModeStore).mockImplementation((selector: any) =>
      selector({
        mode: 'mock',
        selectedNamespace: 'mock',
        selectedContext: null,
        realtimeEnabled: false,
        setMode: vi.fn(),
        setContext: vi.fn(),
        setNamespace: vi.fn(),
        setRealtimeEnabled: vi.fn(),
        reset: vi.fn(),
      })
    )
    vi.mocked(mockData.generateMockCronJobs).mockReturnValue(mockCronJobs)

    // Act
    const { result } = renderHook(() => useCronJob('suspended-cronjob'), { wrapper })

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Assert - suspended flag should be true
    expect(result.current.data?.suspend).toBe(true)
    expect(result.current.data?.active).toBe(0)
  })
})
