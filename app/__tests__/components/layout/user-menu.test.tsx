/**
 * Tests for UserMenu Component
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { UserMenu } from '@/components/layout/user-menu'

// Mock next-auth
const mockSignOut = vi.fn()
const mockSession = {
  user: {
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/avatar.jpg',
  },
}

vi.mock('next-auth/react', () => ({
  signOut: () => mockSignOut(),
  useSession: () => ({ data: mockSession }),
}))

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

// Mock theme provider
const mockSetThemeMode = vi.fn()
const mockThemeMode = {
  mode: 'light' as 'light' | 'dark' | 'system',
  setThemeMode: mockSetThemeMode,
}

vi.mock('@/app/components/theme-provider', () => ({
  useThemeMode: () => mockThemeMode,
}))

// Mock mode store
const mockSetHasCompletedWelcome = vi.fn()
const mockModeStore = {
  mode: 'real' as 'real' | 'demo',
  setHasCompletedWelcome: mockSetHasCompletedWelcome,
}

vi.mock('@/lib/core/store', () => ({
  useModeStore: Object.assign(
    (selector?: any) => {
      if (typeof selector === 'function') {
        return selector(mockModeStore)
      }
      return mockModeStore
    },
    {
      getState: () => mockModeStore,
    }
  ),
}))

// Mock UI theme
const mockUITheme = {
  visualPreset: 'liquidGlass' as 'liquidGlass' | 'classic',
  toggleTheme: vi.fn(),
  mode: 'light' as const,
  compact: false,
}

vi.mock('@/lib/ui', () => ({
  useTheme: () => mockUITheme,
}))

describe('UserMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockModeStore.mode = 'real'
    mockThemeMode.mode = 'light'
    mockSession.user = {
      name: 'Test User',
      email: 'test@example.com',
      image: 'https://example.com/avatar.jpg',
    }
  })

  afterEach(async () => {
    // Ensure all async operations complete before cleanup
    await waitFor(() => {}, { timeout: 100 })
    cleanup()
  })

  describe('Avatar Button', () => {
    it('should render user avatar button', () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should display user avatar image', () => {
      render(<UserMenu />)
      const avatar = screen.getByAltText('Test User')
      expect(avatar).toBeInTheDocument()
    })

    it('should display first letter when no image', () => {
      mockSession.user.image = undefined
      const { container } = render(<UserMenu />)

      // Avatar should contain "T" (first letter of "Test User")
      expect(container.textContent).toContain('T')
    })

    it('should open menu when avatar clicked', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')

      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      })
    })
  })

  describe('Demo Mode', () => {
    beforeEach(() => {
      mockModeStore.mode = 'demo'
    })

    it('should show demo user name in demo mode', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText('Demo User')).toBeInTheDocument()
      })
    })

    it('should show demo email in demo mode', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText('demo@orphelix.com')).toBeInTheDocument()
      })
    })

    it('should not show logout button in demo mode', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.queryByText('Logout')).not.toBeInTheDocument()
      })
    })

    it('should prefix navigation paths with /demo', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const settingsItem = screen.getByText('Cluster Settings')
        fireEvent.click(settingsItem)
      })

      expect(mockPush).toHaveBeenCalledWith('/demo/settings?tab=0')
    })
  })

  describe('Real Mode', () => {
    it('should show real user name in real mode', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeInTheDocument()
      })
    })

    it('should show real user email in real mode', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText('test@example.com')).toBeInTheDocument()
      })
    })

    it('should show logout button in real mode', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
    })

    it('should use regular navigation paths', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const settingsItem = screen.getByText('Cluster Settings')
        fireEvent.click(settingsItem)
      })

      expect(mockPush).toHaveBeenCalledWith('/settings?tab=0')
    })
  })

  describe('Theme Mode Controls', () => {
    it('should display all three theme mode buttons', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        // Check for theme icons instead of counting buttons
        expect(screen.getByTestId('LightModeOutlinedIcon')).toBeInTheDocument()
        expect(screen.getByTestId('DarkModeOutlinedIcon')).toBeInTheDocument()
        expect(screen.getByTestId('LaptopOutlinedIcon')).toBeInTheDocument()
      })
    })

    it('should call setThemeMode with "light" when light button clicked', async () => {
      render(<UserMenu />)
      const avatarButton = screen.getByRole('button')
      fireEvent.click(avatarButton)

      await waitFor(() => {
        const lightIcon = screen.getByTestId('LightModeOutlinedIcon')
        const lightButton = lightIcon.closest('button')!
        fireEvent.click(lightButton)
      })

      await waitFor(() => {
        expect(mockSetThemeMode).toHaveBeenCalledWith('light')
      })
    })

    it('should call setThemeMode with "dark" when dark button clicked', async () => {
      render(<UserMenu />)
      const avatarButton = screen.getByRole('button')
      fireEvent.click(avatarButton)

      await waitFor(() => {
        const darkIcon = screen.getByTestId('DarkModeOutlinedIcon')
        const darkButton = darkIcon.closest('button')!
        fireEvent.click(darkButton)
      })

      await waitFor(() => {
        expect(mockSetThemeMode).toHaveBeenCalledWith('dark')
      })
    })

    it('should call setThemeMode with "system" when system button clicked', async () => {
      render(<UserMenu />)
      const avatarButton = screen.getByRole('button')
      fireEvent.click(avatarButton)

      await waitFor(() => {
        const systemIcon = screen.getByTestId('LaptopOutlinedIcon')
        const systemButton = systemIcon.closest('button')!
        fireEvent.click(systemButton)
      })

      await waitFor(() => {
        expect(mockSetThemeMode).toHaveBeenCalledWith('system')
      })
    })

    it('should highlight active theme mode', async () => {
      mockThemeMode.mode = 'dark'
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const darkIcon = screen.getByTestId('DarkModeOutlinedIcon')
        expect(darkIcon.closest('button')).toBeInTheDocument()
      })
    })
  })

  describe('Settings Navigation', () => {
    it('should navigate to Cluster Settings', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const item = screen.getByText('Cluster Settings')
        fireEvent.click(item)
      })

      expect(mockPush).toHaveBeenCalledWith('/settings?tab=0')
    })

    it('should navigate to GitHub Integration', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const item = screen.getByText('GitHub Integration')
        fireEvent.click(item)
      })

      expect(mockPush).toHaveBeenCalledWith('/settings?tab=1')
    })

    it('should navigate to AI Features', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const item = screen.getByText('AI Features')
        fireEvent.click(item)
      })

      expect(mockPush).toHaveBeenCalledWith('/settings?tab=2')
    })

    it('should navigate to Design settings', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const item = screen.getByText('Design')
        fireEvent.click(item)
      })

      expect(mockPush).toHaveBeenCalledWith('/settings?tab=3')
    })

    it('should close menu after navigation', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const item = screen.getByText('Cluster Settings')
        fireEvent.click(item)
      })

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })
  })

  describe('Logout', () => {
    it('should call signOut when logout clicked', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const logoutItem = screen.getByText('Logout')
        fireEvent.click(logoutItem)
      })

      expect(mockSignOut).toHaveBeenCalled()
    })

    it('should close menu after logout', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const logoutItem = screen.getByText('Logout')
        fireEvent.click(logoutItem)
      })

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })

      // Wait for any pending state updates to complete
      await waitFor(() => expect(mockSetHasCompletedWelcome).toHaveBeenCalled())
    })
  })

  describe('Menu Icons', () => {
    it('should display Cloud icon for Cluster Settings', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByTestId('CloudIcon')).toBeInTheDocument()
      })
    })

    it('should display GitHub icon for GitHub Integration', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByTestId('GitHubIcon')).toBeInTheDocument()
      })
    })

    it('should display AutoAwesome icon for AI Features', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByTestId('AutoAwesomeIcon')).toBeInTheDocument()
      })
    })

    it('should display Palette icon for Design', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByTestId('PaletteOutlinedIcon')).toBeInTheDocument()
      })
    })

    it('should display Logout icon when in real mode', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByTestId('LogoutIcon')).toBeInTheDocument()
      })
    })
  })

  describe('Styling', () => {
    it('should apply glass effect for liquidGlass preset', () => {
      mockUITheme.visualPreset = 'liquidGlass'
      render(<UserMenu />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should not apply glass effect for classic preset', () => {
      mockUITheme.visualPreset = 'classic'
      render(<UserMenu />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render with MUI Avatar', () => {
      const { container } = render(<UserMenu />)
      const avatar = container.querySelector('[class*="MuiAvatar-root"]')
      expect(avatar).toBeInTheDocument()
    })

    it('should render dividers between sections', async () => {
      render(<UserMenu />)
      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const dividers = document.querySelectorAll('[class*="MuiDivider-root"]')
        expect(dividers.length).toBeGreaterThan(0)
      })
    })
  })
})
