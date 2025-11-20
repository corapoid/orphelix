'use client'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { ReactNode, useState, useMemo, createContext, useContext, useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  mode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  actualTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setThemeMode: () => {},
  actualTheme: 'dark',
})

export const useThemeMode = () => useContext(ThemeContext)

// Get initial theme from localStorage or default to 'system'
function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  try {
    const saved = localStorage.getItem('landing-theme-mode')
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved as ThemeMode
    }
  } catch {
    // localStorage not available
  }
  return 'system'
}

const createAppTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#0A84FF' : '#007AFF',
    },
    secondary: {
      main: mode === 'dark' ? '#5E5CE6' : '#5E5CE6',
    },
    background: {
      default: mode === 'dark' ? '#1C1C1E' : '#F1F2F8',
      paper: mode === 'dark' ? 'rgba(28, 28, 30, 0.88)' : 'rgba(241, 242, 248, 0.88)',
    },
    text: {
      primary: mode === 'dark' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(28, 28, 30, 0.92)',
      secondary: mode === 'dark' ? 'rgba(235, 235, 245, 0.68)' : 'rgba(60, 60, 67, 0.7)',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(60, 60, 67, 0.15)',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 32px',
        },
      },
    },
  },
})

export default function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('system')
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [mounted, setMounted] = useState(false)

  // Initialize on client side only
  useEffect(() => {
    setMode(getInitialTheme())
    setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setMounted(true)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Save preference to localStorage
  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode)
    localStorage.setItem('landing-theme-mode', newMode)
  }

  // Determine actual theme to use
  const actualTheme = mode === 'system' ? systemTheme : mode

  // Update HTML attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', actualTheme)
    document.documentElement.style.colorScheme = actualTheme
  }, [actualTheme])

  // Build theme
  const theme = useMemo(() => createAppTheme(actualTheme), [actualTheme])

  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ mode, setThemeMode, actualTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
