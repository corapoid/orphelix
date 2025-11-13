import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/app/components/common/status-badge'

describe('StatusBadge', () => {
  describe('Deployment Statuses', () => {
    it('should render Available status', () => {
      render(<StatusBadge status="Available" />)
      const badge = screen.getByText('Available')
      expect(badge).toBeInTheDocument()
    })

    it('should render Progressing status', () => {
      render(<StatusBadge status="Progressing" />)
      const badge = screen.getByText('Progressing')
      expect(badge).toBeInTheDocument()
    })

    it('should render Degraded status', () => {
      render(<StatusBadge status="Degraded" />)
      const badge = screen.getByText('Degraded')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Pod Statuses', () => {
    it('should render Running status', () => {
      render(<StatusBadge status="Running" />)
      const badge = screen.getByText('Running')
      expect(badge).toBeInTheDocument()
    })

    it('should render Pending status', () => {
      render(<StatusBadge status="Pending" />)
      const badge = screen.getByText('Pending')
      expect(badge).toBeInTheDocument()
    })

    it('should render Failed status', () => {
      render(<StatusBadge status="Failed" />)
      const badge = screen.getByText('Failed')
      expect(badge).toBeInTheDocument()
    })

    it('should render Succeeded status', () => {
      render(<StatusBadge status="Succeeded" />)
      const badge = screen.getByText('Succeeded')
      expect(badge).toBeInTheDocument()
    })

    it('should render CrashLoopBackOff status', () => {
      render(<StatusBadge status="CrashLoopBackOff" />)
      const badge = screen.getByText('CrashLoopBackOff')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Node Statuses', () => {
    it('should render Ready status', () => {
      render(<StatusBadge status="Ready" />)
      const badge = screen.getByText('Ready')
      expect(badge).toBeInTheDocument()
    })

    it('should render NotReady status', () => {
      render(<StatusBadge status="NotReady" />)
      const badge = screen.getByText('NotReady')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Unknown Status', () => {
    it('should render Unknown status for unrecognized statuses', () => {
      render(<StatusBadge status="SomeUnknownStatus" />)
      const badge = screen.getByText('SomeUnknownStatus')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Badge Sizes', () => {
    it('should render small badge by default', () => {
      render(<StatusBadge status="Available" />)
      const badge = screen.getByText('Available')
      expect(badge).toBeInTheDocument()
    })

    it('should render medium badge when specified', () => {
      render(<StatusBadge status="Available" size="medium" />)
      const badge = screen.getByText('Available')
      expect(badge).toBeInTheDocument()
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
          <StatusBadge status="Degraded" size="medium" />
        </div>
      )

      expect(screen.getByText('Available')).toBeInTheDocument()
      expect(screen.getByText('Degraded')).toBeInTheDocument()
    })
  })
})
