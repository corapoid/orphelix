'use client'

import { useMemo } from 'react'
import { designTokens, getGlassmorphismStyles, visualPresets, useTheme } from '@orphelix/ui'

/**
 * Returns a memoized SX snippet representing the current preset's glass surface.
 * Keeps all surfaces in sync with the global Liquid Glass styling.
 */
export function useGlassSurface(blur: number = designTokens.blur.light) {
  const { visualPreset, actualTheme } = useTheme()

  return useMemo(() => {
    const preset = visualPresets[visualPreset]
    if (!preset) {
      return {}
    }

    return getGlassmorphismStyles(preset, actualTheme, blur)
  }, [visualPreset, actualTheme, blur])
}
