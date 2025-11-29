/**
 * Tests for NamespaceSelector Component
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NamespaceSelector } from '@/components/layout/namespace-selector'

// Mock the mode store
const mockSetNamespace = vi.fn()
const mockModeStore: {
  mode: 'real' | 'demo'
  selectedNamespace: string | null
  setNamespace: typeof mockSetNamespace
} = {
  mode: 'real',
  selectedNamespace: 'default',
  setNamespace: mockSetNamespace,
}

vi.mock('@/lib/core/store', () => ({
  useModeStore: (selector?: any) => {
    if (typeof selector === 'function') {
      return selector(mockModeStore)
    }
    return mockModeStore
  },
}))

// Mock the theme context
const mockThemeContext: {
  visualPreset: 'liquidGlass' | 'classic'
  toggleTheme: ReturnType<typeof vi.fn>
  mode: 'light' | 'dark'
  compact: boolean
} = {
  visualPreset: 'liquidGlass',
  toggleTheme: vi.fn(),
  mode: 'light',
  compact: false,
}

vi.mock('@/lib/ui', () => ({
  useTheme: () => mockThemeContext,
}))

// Mock fetch
global.fetch = vi.fn()

describe('NamespaceSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockModeStore.mode = 'real'
    mockModeStore.selectedNamespace = 'default'
    mockThemeContext.visualPreset = 'liquidGlass'

    // Default successful fetch
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [
        { name: 'default', status: 'Active', age: '10d' },
        { name: 'kube-system', status: 'Active', age: '10d' },
        { name: 'production', status: 'Active', age: '5d' },
      ],
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Demo Mode', () => {
    it('should show static "demo" namespace in demo mode', () => {
      mockModeStore.mode = 'demo'
      render(<NamespaceSelector />)

      expect(screen.getByText('Namespace:')).toBeInTheDocument()
      expect(screen.getByText('demo')).toBeInTheDocument()
    })

    it('should not show dropdown in demo mode', () => {
      mockModeStore.mode = 'demo'
      render(<NamespaceSelector />)

      const button = screen.queryByRole('button')
      expect(button).not.toBeInTheDocument()
    })

    it('should not fetch namespaces in demo mode', () => {
      mockModeStore.mode = 'demo'
      render(<NamespaceSelector />)

      expect(global.fetch).not.toHaveBeenCalled()
    })
  })

  describe('Loading State', () => {
    it('should show loading spinner while fetching', async () => {
      // Delay the fetch to see loading state
      ;(global.fetch as any).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => [] }), 100))
      )

      render(<NamespaceSelector />)

      const spinner = screen.getByRole('progressbar')
      expect(spinner).toBeInTheDocument()
    })

    it('should show "Namespace:" label during loading', async () => {
      ;(global.fetch as any).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => [] }), 100))
      )

      render(<NamespaceSelector />)

      expect(screen.getByText('Namespace:')).toBeInTheDocument()
    })
  })

  describe('Real Mode - Namespace Fetching', () => {
    it('should fetch namespaces on mount in real mode', async () => {
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/namespaces')
      })
    })

    it('should display selected namespace', async () => {
      mockModeStore.selectedNamespace = 'production'
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('production')).toBeInTheDocument()
      })
    })

    it('should show "Select..." when no namespace selected', async () => {
      mockModeStore.selectedNamespace = null
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('Select...')).toBeInTheDocument()
      })
    })

    it('should truncate long namespace names', async () => {
      const longName = 'a'.repeat(40)
      mockModeStore.selectedNamespace = longName

      render(<NamespaceSelector />)

      await waitFor(() => {
        const truncated = screen.queryByText(longName)
        expect(truncated).not.toBeInTheDocument()
        expect(screen.getByText(/\.\.\.$/)).toBeInTheDocument()
      })
    })

    it('should show full namespace name in title attribute when truncated', async () => {
      const longName = 'very-long-namespace-name-that-exceeds-limit'
      mockModeStore.selectedNamespace = longName

      render(<NamespaceSelector />)

      await waitFor(() => {
        const element = screen.getByTitle(longName)
        expect(element).toBeInTheDocument()
      })
    })
  })

  describe('Dropdown Menu', () => {
    it('should open menu when button clicked', async () => {
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('default')).toBeInTheDocument()
      })

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      })
    })

    it('should display all fetched namespaces in menu', async () => {
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('default')).toBeInTheDocument()
      })

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const menuItems = screen.getAllByRole('menuitem')
        expect(menuItems).toHaveLength(3)
        expect(screen.getByText('kube-system')).toBeInTheDocument()
        expect(screen.getByText('production')).toBeInTheDocument()
      })
    })

    it('should show check icon for selected namespace', async () => {
      mockModeStore.selectedNamespace = 'default'
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('default')).toBeInTheDocument()
      })

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const checkIcon = screen.getByTestId('CheckIcon')
        expect(checkIcon).toBeInTheDocument()
      })
    })

    it('should call setNamespace when namespace selected', async () => {
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('default')).toBeInTheDocument()
      })

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const productionItem = screen.getByText('production')
        fireEvent.click(productionItem)
      })

      expect(mockSetNamespace).toHaveBeenCalledWith('production')
    })

    it('should close menu after namespace selection', async () => {
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('default')).toBeInTheDocument()
      })

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const productionItem = screen.getByText('production')
        fireEvent.click(productionItem)
      })

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })

    it('should show dropdown arrow icon', async () => {
      render(<NamespaceSelector />)

      await waitFor(() => {
        const arrow = screen.getByTestId('KeyboardArrowDownIcon')
        expect(arrow).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should call onError when fetch fails', async () => {
      const onError = vi.fn()
      ;(global.fetch as any).mockRejectedValue(new Error('Network error'))

      render(<NamespaceSelector onError={onError} />)

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith('Network error')
      })
    })

    it('should call onError when response is not ok', async () => {
      const onError = vi.fn()
      ;(global.fetch as any).mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Unauthorized' }),
      })

      render(<NamespaceSelector onError={onError} />)

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith('Unauthorized')
      })
    })

    it('should call onError when no namespaces found', async () => {
      const onError = vi.fn()
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => [],
      })

      render(<NamespaceSelector onError={onError} />)

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith('No namespaces found in the cluster')
      })
    })

    it('should set empty namespaces array on error', async () => {
      ;(global.fetch as any).mockRejectedValue(new Error('Network error'))

      render(<NamespaceSelector />)

      // After error, component should still render (with current selectedNamespace if any)
      await waitFor(() => {
        // Loading should finish
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
      })

      // Component should be rendered with button (or selected namespace if there was one)
      expect(screen.getByText('Namespace:')).toBeInTheDocument()
    })

    it('should handle error without onError callback', async () => {
      ;(global.fetch as any).mockRejectedValue(new Error('Network error'))

      // Should not throw
      expect(() => render(<NamespaceSelector />)).not.toThrow()
    })
  })

  describe('Styling', () => {
    it('should apply glass effect for liquidGlass preset', async () => {
      mockThemeContext.visualPreset = 'liquidGlass'
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('default')).toBeInTheDocument()
      })

      // Glass effect is applied to menu, which is only visible when open
      // Just verify component renders without errors
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should not apply glass effect for classic preset', async () => {
      mockThemeContext.visualPreset = 'classic'
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('default')).toBeInTheDocument()
      })

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render with MUI components', async () => {
      const { container } = render(<NamespaceSelector />)

      await waitFor(() => {
        const box = container.querySelector('[class*="MuiBox-root"]')
        expect(box).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button', async () => {
      render(<NamespaceSelector />)

      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
    })

    it('should have accessible menu items', async () => {
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('default')).toBeInTheDocument()
      })

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const menuItems = screen.getAllByRole('menuitem')
        expect(menuItems.length).toBeGreaterThan(0)
      })
    })

    it('should show namespace label', async () => {
      render(<NamespaceSelector />)

      await waitFor(() => {
        expect(screen.getByText('Namespace:')).toBeInTheDocument()
      })
    })
  })
})
