'use client'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useState, useMemo, createContext, useContext, ReactNode, useEffect } from 'react'
import { lightTheme, darkTheme } from '@/lib/ui/theme'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  mode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  actualTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setThemeMode: () => {},
  actualTheme: 'light',
})

export const useThemeMode = () => useContext(ThemeContext)

// Get initial theme from localStorage or default to 'dark'
function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = localStorage.getItem('theme-mode')
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved as ThemeMode
    }
  } catch {
    // localStorage not available
  }
  return 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialTheme)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [_mounted, setMounted] = useState(false)

  // Initialize on client side only
  useEffect(() => {
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
    localStorage.setItem('theme-mode', newMode)
  }

  // Determine actual theme to use
  const actualTheme = mode === 'system' ? systemTheme : mode

  // Update HTML attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', actualTheme)
    document.documentElement.style.colorScheme = actualTheme
  }, [actualTheme])

  const theme = useMemo(() => (actualTheme === 'light' ? lightTheme : darkTheme), [actualTheme])

  return (
    <ThemeContext.Provider value={{ mode, setThemeMode, actualTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
