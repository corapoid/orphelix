'use client'

import { ReactNode } from 'react'
import { ThemeProvider as OrphelixThemeProvider } from '@/lib/ui'

/**
 * App Theme Provider - Wrapper around @/lib/ui ThemeProvider
 *
 * Uses the new unified theme system with visual presets:
 * - liquidGlass (default): Full effects with blur, gradient shine, animations
 * - glass: Basic glassmorphism (blur + transparency)
 * - classic: Solid backgrounds, no effects
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <OrphelixThemeProvider
      storageKeyPrefix="orphelix"
      defaultPreset="liquidGlass"
    >
      {children}
    </OrphelixThemeProvider>
  )
}

// Re-export the hook from @/lib/ui for backward compatibility
export { useTheme, useTheme as useThemeMode } from '@/lib/ui'
