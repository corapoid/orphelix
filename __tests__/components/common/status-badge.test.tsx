import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/app/components/common/status-badge'

describe('StatusBadge', () => {
  describe('Deployment Statuses', () => {
    it('should render Available status with success color', () => {
      // Arrange & Act
      render(<StatusBadge status="Available" />)

      // Assert
      const badge = screen.getByText('Available')
      expect(badge).toBeInTheDocument()

      // Check that it's rendered as a Chip with success color
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorSuccess')
    })

    it('should render Progressing status with info color', () => {
      // Arrange & Act
      render(<StatusBadge status="Progressing" />)

      // Assert
      const badge = screen.getByText('Progressing')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorInfo')
    })

    it('should render Degraded status with error color', () => {
      // Arrange & Act
      render(<StatusBadge status="Degraded" />)

      // Assert
      const badge = screen.getByText('Degraded')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorError')
    })
  })

  describe('Pod Statuses', () => {
    it('should render Running status with success color', () => {
      // Arrange & Act
      render(<StatusBadge status="Running" />)

      // Assert
      const badge = screen.getByText('Running')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorSuccess')
    })

    it('should render Pending status with warning color', () => {
      // Arrange & Act
      render(<StatusBadge status="Pending" />)

      // Assert
      const badge = screen.getByText('Pending')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorWarning')
    })

    it('should render Failed status with error color', () => {
      // Arrange & Act
      render(<StatusBadge status="Failed" />)

      // Assert
      const badge = screen.getByText('Failed')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorError')
    })

    it('should render CrashLoopBackOff status with error color', () => {
      // Arrange & Act
      render(<StatusBadge status="CrashLoopBackOff" />)

      // Assert
      const badge = screen.getByText('CrashLoopBackOff')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorError')
    })

    it('should render Succeeded status with success color', () => {
      // Arrange & Act
      render(<StatusBadge status="Succeeded" />)

      // Assert
      const badge = screen.getByText('Succeeded')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorSuccess')
    })
  })

  describe('Node Statuses', () => {
    it('should render Ready status with success color', () => {
      // Arrange & Act
      render(<StatusBadge status="Ready" />)

      // Assert
      const badge = screen.getByText('Ready')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorSuccess')
    })

    it('should render NotReady status with error color', () => {
      // Arrange & Act
      render(<StatusBadge status="NotReady" />)

      // Assert
      const badge = screen.getByText('NotReady')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorError')
    })

    it('should render Unknown status with default color', () => {
      // Arrange & Act
      render(<StatusBadge status="Unknown" />)

      // Assert
      const badge = screen.getByText('Unknown')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorDefault')
    })
  })

  describe('Icon Rendering', () => {
    it('should render icon for Available status', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Available" />)

      // Assert
      const icon = container.querySelector('.MuiChip-icon')
      expect(icon).toBeInTheDocument()
    })

    it('should render icon for Progressing status', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Progressing" />)

      // Assert
      const icon = container.querySelector('.MuiChip-icon')
      expect(icon).toBeInTheDocument()
    })

    it('should render icon for Degraded status', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Degraded" />)

      // Assert
      const icon = container.querySelector('.MuiChip-icon')
      expect(icon).toBeInTheDocument()
    })

    it('should render icon for Running status', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Running" />)

      // Assert
      const icon = container.querySelector('.MuiChip-icon')
      expect(icon).toBeInTheDocument()
    })

    it('should render icon for Failed status', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Failed" />)

      // Assert
      const icon = container.querySelector('.MuiChip-icon')
      expect(icon).toBeInTheDocument()
    })

    it('should render icon for Unknown status', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Unknown" />)

      // Assert
      const icon = container.querySelector('.MuiChip-icon')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('should render small size by default', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Running" />)

      // Assert
      const chip = container.querySelector('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-sizeSmall')
    })

    it('should render small size when specified', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Running" size="small" />)

      // Assert
      const chip = container.querySelector('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-sizeSmall')
    })

    it('should render medium size when specified', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Running" size="medium" />)

      // Assert
      const chip = container.querySelector('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-sizeMedium')
    })

    it('should apply correct minWidth for small size', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Running" size="small" />)

      // Assert
      const chip = container.querySelector('.MuiChip-root') as HTMLElement
      expect(chip).toHaveStyle({ minWidth: '100px' })
    })

    it('should apply correct minWidth for medium size', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Running" size="medium" />)

      // Assert
      const chip = container.querySelector('.MuiChip-root') as HTMLElement
      expect(chip).toHaveStyle({ minWidth: '120px' })
    })
  })

  describe('Unknown/Custom Statuses', () => {
    it('should render custom status with default color', () => {
      // Arrange & Act
      render(<StatusBadge status="CustomStatus" />)

      // Assert
      const badge = screen.getByText('CustomStatus')
      expect(badge).toBeInTheDocument()

      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorDefault')
    })

    it('should not render icon for custom status', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="CustomStatus" />)

      // Assert
      const icon = container.querySelector('.MuiChip-icon')
      expect(icon).not.toBeInTheDocument()
    })
  })

  describe('Color Mapping Verification', () => {
    it('should map all deployment statuses correctly', () => {
      // Arrange
      const deploymentStatuses = [
        { status: 'Available', color: 'MuiChip-colorSuccess' },
        { status: 'Progressing', color: 'MuiChip-colorInfo' },
        { status: 'Degraded', color: 'MuiChip-colorError' },
      ]

      deploymentStatuses.forEach(({ status, color }) => {
        // Act
        const { container } = render(<StatusBadge status={status} />)

        // Assert
        const chip = container.querySelector('.MuiChip-root')
        expect(chip).toHaveClass(color)
      })
    })

    it('should map all pod statuses correctly', () => {
      // Arrange
      const podStatuses = [
        { status: 'Running', color: 'MuiChip-colorSuccess' },
        { status: 'Pending', color: 'MuiChip-colorWarning' },
        { status: 'Failed', color: 'MuiChip-colorError' },
        { status: 'Succeeded', color: 'MuiChip-colorSuccess' },
        { status: 'CrashLoopBackOff', color: 'MuiChip-colorError' },
      ]

      podStatuses.forEach(({ status, color }) => {
        // Act
        const { container } = render(<StatusBadge status={status} />)

        // Assert
        const chip = container.querySelector('.MuiChip-root')
        expect(chip).toHaveClass(color)
      })
    })

    it('should map all node statuses correctly', () => {
      // Arrange
      const nodeStatuses = [
        { status: 'Ready', color: 'MuiChip-colorSuccess' },
        { status: 'NotReady', color: 'MuiChip-colorError' },
        { status: 'Unknown', color: 'MuiChip-colorDefault' },
      ]

      nodeStatuses.forEach(({ status, color }) => {
        // Act
        const { container } = render(<StatusBadge status={status} />)

        // Assert
        const chip = container.querySelector('.MuiChip-root')
        expect(chip).toHaveClass(color)
      })
    })
  })

  describe('Accessibility', () => {
    it('should render with proper label text', () => {
      // Arrange & Act
      render(<StatusBadge status="Running" />)

      // Assert
      expect(screen.getByText('Running')).toBeInTheDocument()
    })

    it('should be visible to screen readers', () => {
      // Arrange & Act
      const { container } = render(<StatusBadge status="Running" />)

      // Assert
      const chip = container.querySelector('.MuiChip-root')
      expect(chip).toBeVisible()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string status', () => {
      // Arrange & Act
      render(<StatusBadge status="" />)

      // Assert - should render without crashing
      const chip = screen.queryByRole('button', { hidden: true })
      expect(chip).not.toBeInTheDocument() // MUI Chip without delete handler is not a button
    })

    it('should handle status with special characters', () => {
      // Arrange & Act
      render(<StatusBadge status="Status-With-Dashes" />)

      // Assert
      const badge = screen.getByText('Status-With-Dashes')
      expect(badge).toBeInTheDocument()
    })

    it('should handle very long status names', () => {
      // Arrange
      const longStatus = 'ThisIsAVeryLongStatusNameThatMightBreakLayout'

      // Act
      render(<StatusBadge status={longStatus} />)

      // Assert
      const badge = screen.getByText(longStatus)
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Multiple Instances', () => {
    it('should render multiple badges with different statuses', () => {
      // Arrange & Act
      const { container } = render(
        <>
          <StatusBadge status="Running" />
          <StatusBadge status="Pending" />
          <StatusBadge status="Failed" />
        </>
      )

      // Assert
      expect(screen.getByText('Running')).toBeInTheDocument()
      expect(screen.getByText('Pending')).toBeInTheDocument()
      expect(screen.getByText('Failed')).toBeInTheDocument()

      const chips = container.querySelectorAll('.MuiChip-root')
      expect(chips).toHaveLength(3)
    })

    it('should render multiple badges with different sizes', () => {
      // Arrange & Act
      const { container } = render(
        <>
          <StatusBadge status="Running" size="small" />
          <StatusBadge status="Pending" size="medium" />
        </>
      )

      // Assert
      const chips = container.querySelectorAll('.MuiChip-root')
      expect(chips).toHaveLength(2)
      expect(chips[0]).toHaveClass('MuiChip-sizeSmall')
      expect(chips[1]).toHaveClass('MuiChip-sizeMedium')
    })
  })
})
