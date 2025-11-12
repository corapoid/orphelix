import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SummaryCard } from '@/app/components/dashboard/summary-card'
import StorageIcon from '@mui/icons-material/Storage'
import CloudIcon from '@mui/icons-material/Cloud'
import DnsIcon from '@mui/icons-material/Dns'

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
    const allTens = screen.getAllByText('10')
    // The detail value should be the second one (first is total)
    const valueElement = allTens[1]
    // Check if the element has the success color style
    expect(valueElement).toHaveStyle({ color: '#4caf50' })
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
    const valueElement = screen.getByText('3')
    expect(valueElement).toHaveStyle({ color: '#ff9800' })
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
    const valueElement = screen.getByText('2')
    expect(valueElement).toHaveStyle({ color: '#f44336' })
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
    const allEights = screen.getAllByText('8')
    // The detail value should be the second one (first is total)
    const valueElement = allEights[1]
    expect(valueElement).toHaveStyle({ color: '#2196f3' })
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
    const allTens = screen.getAllByText('10')
    expect(allTens).toHaveLength(2) // One for card total, one for detail value
    // When no color is specified, it should not have an explicit color style from colorMap
    const valueElement = allTens[1] // The detail value
    // The element will have MUI's default text.primary color, not a color from colorMap
    expect(valueElement).not.toHaveStyle({ color: '#4caf50' })
    expect(valueElement).not.toHaveStyle({ color: '#ff9800' })
    expect(valueElement).not.toHaveStyle({ color: '#f44336' })
    expect(valueElement).not.toHaveStyle({ color: '#2196f3' })
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

    // Verify colors
    const availableValue = screen.getByText('7')
    const progressingValue = screen.getByText('2')
    const degradedValue = screen.getByText('1')

    expect(availableValue).toHaveStyle({ color: '#4caf50' })
    expect(progressingValue).toHaveStyle({ color: '#ff9800' })
    expect(degradedValue).toHaveStyle({ color: '#f44336' })
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
