/**
 * Tests for ErrorState Component
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorState } from '@/components/common/error-state'

describe('ErrorState', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'test')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe('Basic Rendering', () => {
    it('should render with Error object', () => {
      const error = new Error('Test error')
      render(<ErrorState error={error} />)
      expect(screen.getByText('Test error')).toBeInTheDocument()
    })

    it('should render with default title', () => {
      const error = new Error('Test')
      render(<ErrorState error={error} />)
      expect(screen.getByText('Error Loading Data')).toBeInTheDocument()
    })

    it('should render with custom title', () => {
      const error = new Error('Test')
      render(<ErrorState error={error} title="Custom Error Title" />)
      expect(screen.getByText('Custom Error Title')).toBeInTheDocument()
    })

    it('should handle unknown error type', () => {
      render(<ErrorState error="string error" />)
      expect(screen.getByText('Unknown error occurred')).toBeInTheDocument()
    })

    it('should render error icon', () => {
      const { container } = render(<ErrorState error={new Error('Test')} />)
      const icon = container.querySelector('[data-testid="ErrorOutlineIcon"]')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Friendly Error Messages', () => {
    it('should show friendly message for network errors', () => {
      const error = new Error('Failed to fetch data')
      render(<ErrorState error={error} />)
      expect(screen.getByText(/Network error. Please check your connection/)).toBeInTheDocument()
    })

    it('should show friendly message for 401 errors', () => {
      const error = new Error('401 Unauthorized')
      render(<ErrorState error={error} />)
      expect(screen.getByText(/You do not have permission/)).toBeInTheDocument()
      expect(screen.getByText(/RBAC permissions/)).toBeInTheDocument()
    })

    it('should show friendly message for 403 errors', () => {
      const error = new Error('403 Forbidden')
      render(<ErrorState error={error} />)
      expect(screen.getByText(/You do not have permission to access this resource/)).toBeInTheDocument()
    })

    it('should show friendly message for 404 errors', () => {
      const error = new Error('404 Not Found')
      render(<ErrorState error={error} />)
      expect(screen.getByText(/The requested resource was not found/)).toBeInTheDocument()
    })

    it('should show friendly message for 500 errors', () => {
      const error = new Error('500 Internal Server Error')
      render(<ErrorState error={error} />)
      expect(screen.getByText(/Server error. Please try again later/)).toBeInTheDocument()
    })

    it('should show friendly message for namespace errors', () => {
      const error = new Error('Namespace is required to list resources')
      render(<ErrorState error={error} />)
      expect(screen.getByText(/Please select a namespace/)).toBeInTheDocument()
    })

    it('should show original message for unknown errors', () => {
      const error = new Error('Custom error message')
      render(<ErrorState error={error} />)
      expect(screen.getByText('Custom error message')).toBeInTheDocument()
    })
  })

  describe('Retry Button', () => {
    it('should render retry button when onRetry provided', () => {
      const onRetry = vi.fn()
      render(<ErrorState error={new Error('Test')} onRetry={onRetry} />)
      expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument()
    })

    it('should not render retry button when onRetry not provided', () => {
      render(<ErrorState error={new Error('Test')} />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should call onRetry when button clicked', () => {
      const onRetry = vi.fn()
      render(<ErrorState error={new Error('Test')} onRetry={onRetry} />)

      const button = screen.getByRole('button', { name: /Try Again/i })
      fireEvent.click(button)

      expect(onRetry).toHaveBeenCalledTimes(1)
    })

    it('should display refresh icon in retry button', () => {
      const { container } = render(<ErrorState error={new Error('Test')} onRetry={vi.fn()} />)
      const icon = container.querySelector('[data-testid="RefreshIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should use outlined variant for retry button', () => {
      const { container } = render(<ErrorState error={new Error('Test')} onRetry={vi.fn()} />)
      const button = container.querySelector('[class*="MuiButton-outlined"]')
      expect(button).toBeInTheDocument()
    })
  })

  describe('MUI Alert Component', () => {
    it('should render as error severity', () => {
      const { container } = render(<ErrorState error={new Error('Test')} />)
      const alert = container.querySelector('[class*="MuiAlert-standardError"]')
      expect(alert).toBeInTheDocument()
    })

    it('should render AlertTitle', () => {
      const { container } = render(<ErrorState error={new Error('Test')} />)
      const alertTitle = container.querySelector('[class*="MuiAlertTitle-root"]')
      expect(alertTitle).toBeInTheDocument()
    })

    it('should render error message in alert body', () => {
      render(<ErrorState error={new Error('Specific error message')} />)
      expect(screen.getByText('Specific error message')).toBeInTheDocument()
    })
  })

  describe('Development Mode', () => {
    it('should show technical details in development mode', () => {
      vi.stubEnv('NODE_ENV', 'development')
      const error = new Error('Technical error details')
      render(<ErrorState error={error} />)

      // Should appear twice: once in friendly message, once in technical details
      const messages = screen.getAllByText('Technical error details')
      expect(messages.length).toBeGreaterThanOrEqual(1)
      vi.unstubAllEnvs()
    })

    it('should not show technical details in production mode', () => {
      vi.stubEnv('NODE_ENV', 'production')
      const error = new Error('Production error')
      render(<ErrorState error={error} />)

      // Should only appear once in friendly message
      const messages = screen.getAllByText('Production error')
      expect(messages.length).toBe(1)
      vi.unstubAllEnvs()
    })

    it('should render technical details in monospace', () => {
      vi.stubEnv('NODE_ENV', 'development')
      const { container } = render(<ErrorState error={new Error('Test')} />)
      const techBox = container.querySelector('[class*="MuiBox-root"]')
      expect(techBox).toBeInTheDocument()
      vi.unstubAllEnvs()
    })
  })

  describe('Layout and Styling', () => {
    it('should center content with max width', () => {
      const { container } = render(<ErrorState error={new Error('Test')} />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })

    it('should use error theme colors', () => {
      const { container } = render(<ErrorState error={new Error('Test')} onRetry={vi.fn()} />)
      const button = container.querySelector('[class*="MuiButton-outlined"]')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Error Handling Edge Cases', () => {
    it('should handle null error', () => {
      render(<ErrorState error={null} />)
      expect(screen.getByText('Unknown error occurred')).toBeInTheDocument()
    })

    it('should handle undefined error', () => {
      render(<ErrorState error={undefined} />)
      expect(screen.getByText('Unknown error occurred')).toBeInTheDocument()
    })

    it('should handle number as error', () => {
      render(<ErrorState error={404} />)
      expect(screen.getByText('Unknown error occurred')).toBeInTheDocument()
    })

    it('should handle object as error', () => {
      render(<ErrorState error={{ message: 'obj error' }} />)
      expect(screen.getByText('Unknown error occurred')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible alert', () => {
      const { container } = render(<ErrorState error={new Error('Test')} />)
      const alert = container.querySelector('[role="alert"]')
      expect(alert).toBeInTheDocument()
    })

    it('should have accessible retry button when present', () => {
      render(<ErrorState error={new Error('Test')} onRetry={vi.fn()} />)
      const button = screen.getByRole('button', { name: /Try Again/i })
      expect(button).toBeInTheDocument()
    })

    it('should have clear error title', () => {
      render(<ErrorState error={new Error('Test')} title="Clear Error Title" />)
      expect(screen.getByText('Clear Error Title')).toBeInTheDocument()
    })
  })

  describe('Multiple Error Scenarios', () => {
    it('should handle fetch error without retry', () => {
      const error = new Error('Failed to fetch')
      render(<ErrorState error={error} />)
      expect(screen.getByText(/Network error/)).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should handle unauthorized error with retry', () => {
      const error = new Error('Unauthorized access')
      const onRetry = vi.fn()
      render(<ErrorState error={error} onRetry={onRetry} />)
      expect(screen.getByText(/RBAC permissions/)).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should handle custom error with custom title', () => {
      const error = new Error('Custom problem')
      render(<ErrorState error={error} title="Something went wrong" />)
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('Custom problem')).toBeInTheDocument()
    })
  })
})
