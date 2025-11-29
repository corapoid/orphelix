import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SummaryCard } from '@/components/dashboard/summary-card'
import StorageIcon from '@mui/icons-material/Storage'
import CloudIcon from '@mui/icons-material/Cloud'
import DnsIcon from '@mui/icons-material/Dns'

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}))

// Mock mode store
vi.mock('@/lib/core/store', () => ({
  useModeStore: () => ({
    mode: 'real',
  }),
}))

describe('SummaryCard', () => {
  it('should render with title, total, and icon', () => {
    // Arrange
    const props = {
      title: 'Deployments',
      total: 5,
      icon: StorageIcon,
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Deployments')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('should render with details (label, value, color)', () => {
    // Arrange
    const props = {
      title: 'Pods',
      total: 15,
      icon: DnsIcon,
      details: [
        { label: 'Running', value: 12, color: 'success' as const },
        { label: 'Pending', value: 2, color: 'warning' as const },
        { label: 'Failed', value: 1, color: 'error' as const },
      ],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Pods')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('Running')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Failed')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should render without details', () => {
    // Arrange
    const props = {
      title: 'Nodes',
      total: 4,
      icon: CloudIcon,
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Nodes')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    // Should not render details section
    expect(screen.queryByText('Running')).not.toBeInTheDocument()
  })

  it('should render with empty details array', () => {
    // Arrange
    const props = {
      title: 'ConfigMaps',
      total: 5,
      icon: StorageIcon,
      details: [],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('ConfigMaps')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    // Should not render details section when array is empty
    expect(screen.queryByText('Running')).not.toBeInTheDocument()
  })

  it('should apply success color', () => {
    // Arrange
    const props = {
      title: 'Deployments',
      total: 10,
      icon: StorageIcon,
      details: [{ label: 'Healthy', value: 10, color: 'success' as const }],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Healthy')).toBeInTheDocument()
    expect(screen.getAllByText('10')).toHaveLength(2) // One for total, one for detail
  })

  it('should apply warning color', () => {
    // Arrange
    const props = {
      title: 'Pods',
      total: 5,
      icon: DnsIcon,
      details: [{ label: 'Pending', value: 3, color: 'warning' as const }],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should apply error color', () => {
    // Arrange
    const props = {
      title: 'Pods',
      total: 5,
      icon: DnsIcon,
      details: [{ label: 'Failed', value: 2, color: 'error' as const }],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Failed')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should apply info color', () => {
    // Arrange
    const props = {
      title: 'Resources',
      total: 8,
      icon: StorageIcon,
      details: [{ label: 'Active', value: 8, color: 'info' as const }],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getAllByText('8')).toHaveLength(2) // One for total, one for detail
  })

  it('should render detail without color', () => {
    // Arrange
    const props = {
      title: 'Resources',
      total: 10,
      icon: StorageIcon,
      details: [{ label: 'Total', value: 10 }],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getAllByText('10')).toHaveLength(2) // One for card total, one for detail value
  })

  it('should render multiple details with different colors', () => {
    // Arrange
    const props = {
      title: 'Deployments',
      total: 10,
      icon: StorageIcon,
      details: [
        { label: 'Available', value: 7, color: 'success' as const },
        { label: 'Progressing', value: 2, color: 'warning' as const },
        { label: 'Degraded', value: 1, color: 'error' as const },
      ],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Available')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('Progressing')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Degraded')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should render with zero values', () => {
    // Arrange
    const props = {
      title: 'Errors',
      total: 0,
      icon: StorageIcon,
      details: [{ label: 'Failed', value: 0, color: 'error' as const }],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Errors')).toBeInTheDocument()
    expect(screen.getAllByText('0')).toHaveLength(2) // One for total, one for detail
  })

  it('should render with large numbers', () => {
    // Arrange
    const props = {
      title: 'Pods',
      total: 1000,
      icon: DnsIcon,
      details: [
        { label: 'Running', value: 950, color: 'success' as const },
        { label: 'Pending', value: 50, color: 'warning' as const },
      ],
    }

    // Act
    render(<SummaryCard {...props} />)

    // Assert
    expect(screen.getByText('Pods')).toBeInTheDocument()
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('Running')).toBeInTheDocument()
    expect(screen.getByText('950')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
  })
})
