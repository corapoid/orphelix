'use client'

import { ReactNode } from 'react'
import { ThemeProvider as OrphelixThemeProvider } from '@orphelix/ui'

/**
 * Landing Page Theme Provider - Wrapper around @orphelix/ui ThemeProvider
 *
 * Uses the new unified theme system with visual presets:
 * - liquidGlass (default): Full effects with blur, gradient shine, animations
 * - glass: Basic glassmorphism (blur + transparency)
 * - classic: Solid backgrounds, no effects
 */
export default function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <OrphelixThemeProvider
      storageKeyPrefix="orphelix-landing"
      defaultPreset="liquidGlass"
    >
      {children}
    </OrphelixThemeProvider>
  )
}

// Re-export the hook from @orphelix/ui for backward compatibility
export { useTheme as useThemeMode } from '@orphelix/ui'
