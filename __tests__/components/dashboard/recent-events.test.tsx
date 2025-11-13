import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RecentEvents } from '@/app/components/dashboard/recent-events'
import type { Event } from '@/types/kubernetes'

// Mock the formatAge utility
vi.mock('@/lib/core/utils', () => ({
  formatAge: vi.fn((date: Date) => {
    // Simple mock implementation for testing
    const now = new Date('2024-01-15T12:00:00Z')
    const then = new Date(date)
    const diffMs = now.getTime() - then.getTime()
    const diffMinutes = Math.floor(diffMs / 1000 / 60)
    if (diffMinutes < 60) return `${diffMinutes}m`
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}h`
    return `${Math.floor(diffHours / 24)}d`
  }),
}))

describe('RecentEvents', () => {
  let mockNow: Date

  beforeEach(() => {
    // Set a fixed "now" time for consistent testing
    mockNow = new Date('2024-01-15T12:00:00Z')
    vi.useFakeTimers()
    vi.setSystemTime(mockNow)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const createMockEvent = (overrides?: Partial<Event>): Event => ({
    type: 'Normal',
    reason: 'Created',
    message: 'Successfully created pod',
    count: 1,
    firstTimestamp: new Date('2024-01-15T11:00:00Z').toISOString(),
    lastTimestamp: new Date('2024-01-15T11:30:00Z').toISOString(),
    kind: 'Pod',
    name: 'test-pod',
    namespace: 'default',
    ...overrides,
  })

  it('should render list of events', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        type: 'Normal',
        reason: 'Started',
        message: 'Container started successfully',
        kind: 'Pod',
        name: 'web-app-123',
        namespace: 'default',
      }),
      createMockEvent({
        type: 'Warning',
        reason: 'BackOff',
        message: 'Back-off restarting failed container',
        count: 5,
        kind: 'Pod',
        name: 'api-server-456',
        namespace: 'default',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText('Recent Events')).toBeInTheDocument()
    expect(screen.getByText('Started')).toBeInTheDocument()
    expect(screen.getByText('Container started successfully')).toBeInTheDocument()
    expect(screen.getByText('BackOff')).toBeInTheDocument()
    expect(screen.getByText('Back-off restarting failed container')).toBeInTheDocument()
  })

  it('should show loading state', () => {
    // Arrange
    const events: Event[] = []

    // Act
    render(<RecentEvents events={events} loading={true} />)

    // Assert
    expect(screen.getByText('Recent Events')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.queryByText('No events found')).not.toBeInTheDocument()
  })

  it('should show error state', () => {
    // Arrange
    const events: Event[] = []
    const error = new Error('Failed to fetch events')

    // Act
    render(<RecentEvents events={events} error={error} />)

    // Assert
    expect(screen.getByText('Recent Events')).toBeInTheDocument()
    expect(screen.getByText('Failed to load events: Failed to fetch events')).toBeInTheDocument()
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('should show empty state', () => {
    // Arrange
    const events: Event[] = []

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText('Recent Events')).toBeInTheDocument()
    expect(screen.getByText('No events found')).toBeInTheDocument()
  })

  it('should format event type chip for Normal events', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        type: 'Normal',
        reason: 'Created',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText('Normal')).toBeInTheDocument()
    // Check that the chip exists
    const chip = screen.getByText('Normal').closest('.MuiChip-root')
    expect(chip).toBeInTheDocument()
  })

  it('should format event type chip for Warning events', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        type: 'Warning',
        reason: 'Failed',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText('Warning')).toBeInTheDocument()
    const chip = screen.getByText('Warning').closest('.MuiChip-root')
    expect(chip).toBeInTheDocument()
  })

  it('should display event age', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        lastTimestamp: new Date('2024-01-15T11:30:00Z').toISOString(), // 30 minutes ago
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    // The formatAge mock will return "30m"
    expect(screen.getByText('30m')).toBeInTheDocument()
  })

  it('should display event message', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        message: 'This is a custom event message',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText('This is a custom event message')).toBeInTheDocument()
  })

  it('should display involved object kind and name', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        kind: 'Deployment',
        name: 'my-deployment',
        namespace: 'production',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText(/Deployment: my-deployment/)).toBeInTheDocument()
  })

  it('should display event count when greater than 1', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        count: 5,
        kind: 'Pod',
        name: 'test-pod',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText(/Pod: test-pod \(×5\)/)).toBeInTheDocument()
  })

  it('should not display count when it is 1', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        count: 1,
        kind: 'Pod',
        name: 'test-pod',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText('Pod: test-pod')).toBeInTheDocument()
    expect(screen.queryByText(/×/)).not.toBeInTheDocument()
  })

  it('should render multiple events in order', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        reason: 'First Event',
        message: 'This is the first event',
        kind: 'Pod',
        name: 'pod-1',
      }),
      createMockEvent({
        reason: 'Second Event',
        message: 'This is the second event',
        kind: 'Pod',
        name: 'pod-2',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText('First Event')).toBeInTheDocument()
    expect(screen.getByText('Second Event')).toBeInTheDocument()
  })

  it('should render events with different types', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        type: 'Normal',
        reason: 'Created',
        message: 'Pod created',
      }),
      createMockEvent({
        type: 'Warning',
        reason: 'Failed',
        message: 'Pod failed',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText('Normal')).toBeInTheDocument()
    expect(screen.getByText('Warning')).toBeInTheDocument()
    expect(screen.getByText('Created')).toBeInTheDocument()
    expect(screen.getByText('Failed')).toBeInTheDocument()
  })

  it('should handle events with different kinds of objects', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        kind: 'Pod',
        name: 'my-pod',
      }),
      createMockEvent({
        kind: 'Deployment',
        name: 'my-deployment',
      }),
      createMockEvent({
        kind: 'Service',
        name: 'my-service',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText(/Pod: my-pod/)).toBeInTheDocument()
    expect(screen.getByText(/Deployment: my-deployment/)).toBeInTheDocument()
    expect(screen.getByText(/Service: my-service/)).toBeInTheDocument()
  })

  it('should prioritize loading over error state', () => {
    // Arrange
    const events: Event[] = []
    const error = new Error('Some error')

    // Act
    render(<RecentEvents events={events} loading={true} error={error} />)

    // Assert
    // Loading should be shown, not error
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.queryByText(/Failed to load events/)).not.toBeInTheDocument()
  })

  it('should show empty state when no events and not loading or errored', () => {
    // Arrange
    const events: Event[] = []

    // Act
    render(<RecentEvents events={events} loading={false} error={null} />)

    // Assert
    expect(screen.getByText('No events found')).toBeInTheDocument()
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(screen.queryByText(/Failed to load/)).not.toBeInTheDocument()
  })

  it('should render with single event', () => {
    // Arrange
    const events: Event[] = [
      createMockEvent({
        reason: 'Single Event',
        message: 'This is a single event',
      }),
    ]

    // Act
    render(<RecentEvents events={events} />)

    // Assert
    expect(screen.getByText('Recent Events')).toBeInTheDocument()
    expect(screen.getByText('Single Event')).toBeInTheDocument()
  })
})
