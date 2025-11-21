'use client'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode, useState, useMemo, createContext, useContext, useEffect } from 'react'
import { buildTheme } from '../theme/theme-builder.js'
import {
  classicPreset,
  glassPreset,
  liquidGlassPreset,
  defaultVisualPreset,
  type VisualPresetName
} from '../theme/visual-presets.js'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  mode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  actualTheme: 'light' | 'dark'
  visualPreset: VisualPresetName
  setVisualPreset: (preset: VisualPresetName) => void
  compact: boolean
  setCompact: (compact: boolean) => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setThemeMode: () => {},
  actualTheme: 'dark',
  visualPreset: defaultVisualPreset,
  setVisualPreset: () => {},
  compact: false,
  setCompact: () => {},
})

export const useTheme = () => useContext(ThemeContext)
export const useThemeMode = () => useContext(ThemeContext) // Alias for compatibility

// Get initial theme mode from localStorage
function getInitialThemeMode(storageKey: string): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved as ThemeMode
    }
  } catch {
    // localStorage not available
  }
  return 'system'
}

// Get initial visual preset from localStorage
function getInitialVisualPreset(storageKey: string): VisualPresetName {
  if (typeof window === 'undefined') return defaultVisualPreset
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved === 'classic' || saved === 'glass' || saved === 'liquidGlass') {
      return saved as VisualPresetName
    }
  } catch {
    // localStorage not available
  }
  return defaultVisualPreset
}

// Get initial compact mode from localStorage
function getInitialCompact(storageKey: string): boolean {
  if (typeof window === 'undefined') return false
  try {
    const saved = localStorage.getItem(storageKey)
    return saved === 'true'
  } catch {
    // localStorage not available
  }
  return false
}

export interface ThemeProviderProps {
  children: ReactNode
  /**
   * Storage key prefix for localStorage (default: 'orphelix')
   * Will create keys: {prefix}-theme-mode, {prefix}-visual-preset, {prefix}-compact
   */
  storageKeyPrefix?: string
  /**
   * Default visual preset if not found in localStorage
   */
  defaultPreset?: VisualPresetName
}

/**
 * Unified Theme Provider for Orphelix UI
 *
 * Manages:
 * - Theme mode (light/dark/system)
 * - Visual preset (classic/glass/liquidGlass)
 * - Compact mode (spacing)
 *
 * All preferences are persisted to localStorage.
 */
export function ThemeProvider({
  children,
  storageKeyPrefix = 'orphelix',
  defaultPreset = defaultVisualPreset
}: ThemeProviderProps) {
  const themeModeKey = `${storageKeyPrefix}-theme-mode`
  const visualPresetKey = `${storageKeyPrefix}-visual-preset`
  const compactKey = `${storageKeyPrefix}-compact`

  const [mode, setMode] = useState<ThemeMode>('system')
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [visualPreset, setVisualPresetState] = useState<VisualPresetName>(defaultPreset)
  const [compact, setCompactState] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize on client side only
  useEffect(() => {
    setMode(getInitialThemeMode(themeModeKey))
    setVisualPresetState(getInitialVisualPreset(visualPresetKey))
    setCompactState(getInitialCompact(compactKey))
    setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setMounted(true)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [themeModeKey, visualPresetKey, compactKey])

  // Save theme mode to localStorage
  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode)
    localStorage.setItem(themeModeKey, newMode)
  }

  // Save visual preset to localStorage
  const setVisualPreset = (newPreset: VisualPresetName) => {
    setVisualPresetState(newPreset)
    localStorage.setItem(visualPresetKey, newPreset)
  }

  // Save compact mode to localStorage
  const setCompact = (newCompact: boolean) => {
    setCompactState(newCompact)
    localStorage.setItem(compactKey, String(newCompact))
  }

  // Determine actual theme to use
  const actualTheme = mode === 'system' ? systemTheme : mode

  // Build theme based on visual preset, mode, and compact setting
  const theme = useMemo(() => {
    let preset
    switch (visualPreset) {
      case 'classic':
        preset = classicPreset
        break
      case 'glass':
        preset = glassPreset
        break
      case 'liquidGlass':
        preset = liquidGlassPreset
        break
      default:
        preset = liquidGlassPreset
    }

    return buildTheme(preset, actualTheme, compact)
  }, [visualPreset, actualTheme, compact])

  // Update HTML attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', actualTheme)
    document.documentElement.style.colorScheme = actualTheme
  }, [actualTheme])

  // Update CSS custom property for borderRadius
  useEffect(() => {
    if (theme) {
      document.documentElement.style.setProperty('--orphelix-border-radius', `${theme.shape.borderRadius}px`)
    }
  }, [theme])

  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setThemeMode,
        actualTheme,
        visualPreset,
        setVisualPreset,
        compact,
        setCompact
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
