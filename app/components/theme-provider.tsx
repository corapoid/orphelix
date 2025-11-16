'use client'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useState, useMemo, createContext, useContext, ReactNode, useEffect } from 'react'
import { colorSkins } from '@/lib/ui/color-skins'
import { buildTheme } from '@/lib/ui/theme-builder'
import { useUIPreferences } from '@/lib/core/store'

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

// Get initial theme from localStorage or default to 'light'
function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  try {
    const saved = localStorage.getItem('theme-mode')
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved as ThemeMode
    }
  } catch {
    // localStorage not available
  }
  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light')
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Get color skin from store
  const colorSkin = useUIPreferences((state) => state.colorSkin)

  // Initialize on client side only
  useEffect(() => {
    // Set initial values from client
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
    localStorage.setItem('theme-mode', newMode)
  }

  // Determine actual theme to use
  const actualTheme = mode === 'system' ? systemTheme : mode

  // Update HTML attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', actualTheme)
    document.documentElement.style.colorScheme = actualTheme
  }, [actualTheme])

  // Build theme from selected skin and theme mode (always compact)
  const theme = useMemo(() => {
    const skin = colorSkins[colorSkin] || colorSkins.classic
    const palette = actualTheme === 'light' ? skin.light : skin.dark
    return buildTheme(palette, true)
  }, [actualTheme, colorSkin])

  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ mode, setThemeMode, actualTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
