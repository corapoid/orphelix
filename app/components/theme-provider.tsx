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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark') // Default to dark instead of system
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
  const [_mounted, setMounted] = useState(false)

  // Initialize on client side only
  useEffect(() => {
    setMounted(true)

    // Detect system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handler)

    // Load saved preference from localStorage
    const saved = localStorage.getItem('theme-mode') as ThemeMode | null
    if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
      setMode(saved)
    }

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
