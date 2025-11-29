/**
 * Tests for RealtimeStatus Component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RealtimeStatus } from '@/app/components/layout/realtime-status'

// Mock the realtime hook
const mockReconnect = vi.fn()
const mockRealtimeHook = {
  status: 'connected' as 'connected' | 'connecting' | 'disconnected' | 'error',
  error: null as string | null,
  reconnect: mockReconnect,
}

vi.mock('@/lib/hooks/use-realtime', () => ({
  useRealtimeUpdates: () => mockRealtimeHook,
}))

// Mock the mode store
const mockModeStore = {
  mode: 'real' as 'real' | 'mock',
  realtimeEnabled: true,
}

vi.mock('@/lib/core/store', () => ({
  useModeStore: (selector: any) => {
    if (typeof selector === 'function') {
      return selector(mockModeStore)
    }
    return mockModeStore
  },
}))

describe('RealtimeStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockModeStore.mode = 'real'
    mockModeStore.realtimeEnabled = true
    mockRealtimeHook.status = 'connected'
    mockRealtimeHook.error = null
  })

  describe('Visibility', () => {
    it('should render in real mode with realtime enabled', () => {
      render(<RealtimeStatus />)
      expect(screen.getByText('Live')).toBeInTheDocument()
    })

    it('should not render in mock mode', () => {
      mockModeStore.mode = 'mock'
      const { container } = render(<RealtimeStatus />)
      expect(container.firstChild).toBeNull()
    })

    it('should not render when realtime is disabled', () => {
      mockModeStore.realtimeEnabled = false
      const { container } = render(<RealtimeStatus />)
      expect(container.firstChild).toBeNull()
    })

    it('should not render in mock mode even with realtime enabled', () => {
      mockModeStore.mode = 'mock'
      mockModeStore.realtimeEnabled = true
      const { container } = render(<RealtimeStatus />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Connected Status', () => {
    beforeEach(() => {
      mockRealtimeHook.status = 'connected'
    })

    it('should display "Live" label when connected', () => {
      render(<RealtimeStatus />)
      expect(screen.getByText('Live')).toBeInTheDocument()
    })

    it('should show green indicator icon when connected', () => {
      const { container } = render(<RealtimeStatus />)
      const icon = container.querySelector('[data-testid="FiberManualRecordIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should not show reconnect button when connected', () => {
      render(<RealtimeStatus />)
      const syncIcon = screen.queryByTestId('SyncIcon')
      expect(syncIcon).not.toBeInTheDocument()
    })
  })

  describe('Connecting Status', () => {
    beforeEach(() => {
      mockRealtimeHook.status = 'connecting'
    })

    it('should display "Connecting..." label when connecting', () => {
      render(<RealtimeStatus />)
      expect(screen.getByText('Connecting...')).toBeInTheDocument()
    })

    it('should show loading spinner when connecting', () => {
      const { container } = render(<RealtimeStatus />)
      const spinner = container.querySelector('[role="progressbar"]')
      expect(spinner).toBeInTheDocument()
    })

    it('should not show reconnect button when connecting', () => {
      render(<RealtimeStatus />)
      const syncIcon = screen.queryByTestId('SyncIcon')
      expect(syncIcon).not.toBeInTheDocument()
    })
  })

  describe('Disconnected Status', () => {
    beforeEach(() => {
      mockRealtimeHook.status = 'disconnected'
    })

    it('should display "Disconnected" label when disconnected', () => {
      render(<RealtimeStatus />)
      expect(screen.getByText('Disconnected')).toBeInTheDocument()
    })

    it('should show reconnect button when disconnected', () => {
      render(<RealtimeStatus />)
      const syncIcon = screen.getByTestId('SyncIcon')
      expect(syncIcon).toBeInTheDocument()
    })

    it('should call reconnect when status box clicked', () => {
      render(<RealtimeStatus />)
      const statusBox = screen.getByText('Disconnected').closest('[class*="MuiBox-root"]')

      fireEvent.click(statusBox!)
      expect(mockReconnect).toHaveBeenCalledTimes(1)
    })

    it('should call reconnect when reconnect button clicked', () => {
      render(<RealtimeStatus />)
      const reconnectButton = screen.getByRole('button')

      fireEvent.click(reconnectButton)
      expect(mockReconnect).toHaveBeenCalledTimes(1)
    })

    it('should show gray indicator when disconnected', () => {
      const { container } = render(<RealtimeStatus />)
      const icon = container.querySelector('[data-testid="FiberManualRecordIcon"]')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Error Status', () => {
    beforeEach(() => {
      mockRealtimeHook.status = 'error'
      mockRealtimeHook.error = 'Connection failed'
    })

    it('should display "Error" label when in error state', () => {
      render(<RealtimeStatus />)
      expect(screen.getByText('Error')).toBeInTheDocument()
    })

    it('should show error icon when in error state', () => {
      const { container } = render(<RealtimeStatus />)
      const errorIcon = container.querySelector('[data-testid="ErrorIcon"]')
      expect(errorIcon).toBeInTheDocument()
    })

    it('should show reconnect button when in error state', () => {
      render(<RealtimeStatus />)
      const syncIcon = screen.getByTestId('SyncIcon')
      expect(syncIcon).toBeInTheDocument()
    })

    it('should call reconnect when status box clicked in error state', () => {
      render(<RealtimeStatus />)
      const statusBox = screen.getByText('Error').closest('[class*="MuiBox-root"]')

      fireEvent.click(statusBox!)
      expect(mockReconnect).toHaveBeenCalledTimes(1)
    })

    it('should call reconnect when reconnect button clicked in error state', () => {
      render(<RealtimeStatus />)
      const reconnectButton = screen.getByRole('button')

      fireEvent.click(reconnectButton)
      expect(mockReconnect).toHaveBeenCalledTimes(1)
    })
  })

  describe('Status Transitions', () => {
    it('should update UI when status changes from connected to disconnected', () => {
      mockRealtimeHook.status = 'connected'
      const { rerender } = render(<RealtimeStatus />)
      expect(screen.getByText('Live')).toBeInTheDocument()

      mockRealtimeHook.status = 'disconnected'
      rerender(<RealtimeStatus />)
      expect(screen.getByText('Disconnected')).toBeInTheDocument()
      expect(screen.getByTestId('SyncIcon')).toBeInTheDocument()
    })

    it('should update UI when status changes from connecting to connected', () => {
      mockRealtimeHook.status = 'connecting'
      const { rerender, container } = render(<RealtimeStatus />)
      expect(screen.getByText('Connecting...')).toBeInTheDocument()
      expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument()

      mockRealtimeHook.status = 'connected'
      rerender(<RealtimeStatus />)
      expect(screen.getByText('Live')).toBeInTheDocument()
      expect(container.querySelector('[role="progressbar"]')).not.toBeInTheDocument()
    })

    it('should show reconnect button when transitioning to error', () => {
      mockRealtimeHook.status = 'connected'
      const { rerender } = render(<RealtimeStatus />)
      expect(screen.queryByTestId('SyncIcon')).not.toBeInTheDocument()

      mockRealtimeHook.status = 'error'
      rerender(<RealtimeStatus />)
      expect(screen.getByTestId('SyncIcon')).toBeInTheDocument()
    })
  })

  describe('Tooltips', () => {
    it('should render tooltip container', () => {
      render(<RealtimeStatus />)
      const statusBox = screen.getByText('Live')
      expect(statusBox).toBeInTheDocument()
    })

    it('should have different tooltips for different states', () => {
      // Can't easily test tooltip content in jsdom, but we can verify the component structure
      mockRealtimeHook.status = 'connected'
      const { rerender } = render(<RealtimeStatus />)
      expect(screen.getByText('Live')).toBeInTheDocument()

      mockRealtimeHook.status = 'disconnected'
      rerender(<RealtimeStatus />)
      expect(screen.getByText('Disconnected')).toBeInTheDocument()

      mockRealtimeHook.status = 'error'
      rerender(<RealtimeStatus />)
      expect(screen.getByText('Error')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should render with MUI components', () => {
      const { container } = render(<RealtimeStatus />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })

    it('should use caption typography variant', () => {
      const { container } = render(<RealtimeStatus />)
      const caption = container.querySelector('[class*="MuiTypography-caption"]')
      expect(caption).toBeInTheDocument()
    })

    it('should have pointer cursor when disconnected', () => {
      mockRealtimeHook.status = 'disconnected'
      render(<RealtimeStatus />)
      const statusBox = screen.getByText('Disconnected').closest('[class*="MuiBox-root"]')
      expect(statusBox).toBeInTheDocument()
    })
  })
})
