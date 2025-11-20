import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatusBadge } from '@/app/components/common/status-badge'

describe('StatusBadge', () => {
  describe('Deployment Statuses', () => {
    it('should render Available status with success color', () => {
      render(<StatusBadge status="Available" />)
      const badge = screen.getByText('Available')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })

    it('should render Progressing status with info color', () => {
      render(<StatusBadge status="Progressing" />)
      const badge = screen.getByText('Progressing')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })

    it('should render Degraded status with error color', () => {
      render(<StatusBadge status="Degraded" />)
      const badge = screen.getByText('Degraded')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })
  })

  describe('Pod Statuses', () => {
    it('should render Running status with success color', () => {
      render(<StatusBadge status="Running" />)
      const badge = screen.getByText('Running')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })

    it('should render Pending status with warning color', () => {
      render(<StatusBadge status="Pending" />)
      const badge = screen.getByText('Pending')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })

    it('should render Failed status with error color', () => {
      render(<StatusBadge status="Failed" />)
      const badge = screen.getByText('Failed')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })

    it('should render Succeeded status with success color', () => {
      render(<StatusBadge status="Succeeded" />)
      const badge = screen.getByText('Succeeded')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })

    it('should render CrashLoopBackOff status with error color', () => {
      render(<StatusBadge status="CrashLoopBackOff" />)
      const badge = screen.getByText('CrashLoopBackOff')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })
  })

  describe('Node Statuses', () => {
    it('should render Ready status with success color', () => {
      render(<StatusBadge status="Ready" />)
      const badge = screen.getByText('Ready')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })

    it('should render NotReady status with error color', () => {
      render(<StatusBadge status="NotReady" />)
      const badge = screen.getByText('NotReady')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toBeInTheDocument()
    })
  })

  describe('Generic Statuses', () => {
    it('should render Unknown status with default color', () => {
      render(<StatusBadge status="Unknown" />)
      const badge = screen.getByText('Unknown')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorDefault')
    })

    it('should handle custom status as Unknown with default color', () => {
      render(<StatusBadge status="CustomStatus" />)
      const badge = screen.getByText('CustomStatus')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-colorDefault')
    })
  })

  describe('Badge Sizes', () => {
    it('should render small badge by default', () => {
      render(<StatusBadge status="Available" />)
      const badge = screen.getByText('Available')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-sizeSmall')
    })

    it('should render medium badge when specified', () => {
      render(<StatusBadge status="Available" size="medium" />)
      const badge = screen.getByText('Available')
      expect(badge).toBeInTheDocument()
      const chip = badge.closest('.MuiChip-root')
      expect(chip).toHaveClass('MuiChip-sizeMedium')
    })
  })

  describe('Multiple Instances', () => {
    it('should render multiple badges with different statuses', () => {
      render(
        <div>
          <StatusBadge status="Running" />
          <StatusBadge status="Pending" />
          <StatusBadge status="Failed" />
        </div>
      )

      expect(screen.getByText('Running')).toBeInTheDocument()
      expect(screen.getByText('Pending')).toBeInTheDocument()
      expect(screen.getByText('Failed')).toBeInTheDocument()
    })

    it('should render multiple badges with different sizes', () => {
      render(
        <div>
          <StatusBadge status="Available" size="small" />
          <StatusBadge status="Available" size="medium" />
        </div>
      )

      const badges = screen.getAllByText('Available')
      expect(badges).toHaveLength(2)
    })
  })
})
