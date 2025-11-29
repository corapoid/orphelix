/**
 * Tests for Theme Builder
 */

import { describe, it, expect } from 'vitest'
import { buildTheme, getGlassmorphismStyles } from '@/lib/ui/theme/theme-builder'
import { classicPreset, liquidGlassPreset } from '@/lib/ui/theme/visual-presets'

describe('buildTheme', () => {
  describe('Basic Theme Creation', () => {
    it('should create theme with light mode', () => {
      const theme = buildTheme(classicPreset, 'light')
      expect(theme.palette.mode).toBe('light')
    })

    it('should create theme with dark mode', () => {
      const theme = buildTheme(classicPreset, 'dark')
      expect(theme.palette.mode).toBe('dark')
    })

    it('should apply compact mode scaling', () => {
      const normal = buildTheme(classicPreset, 'light', false)
      const compact = buildTheme(classicPreset, 'light', true)

      // Typography should be scaled down
      expect(compact.typography.h1?.fontSize).not.toBe(normal.typography.h1?.fontSize)

      // Spacing should be reduced (compact=7, normal=8)
      expect(parseFloat(compact.spacing(1) as string)).toBeLessThan(parseFloat(normal.spacing(1) as string))
    })
  })

  describe('Color Palette', () => {
    it('should apply light palette colors', () => {
      const theme = buildTheme(classicPreset, 'light')

      expect(theme.palette.primary.main).toBe(classicPreset.light.primary.main)
      expect(theme.palette.secondary.main).toBe(classicPreset.light.secondary.main)
      expect(theme.palette.background.default).toBe(classicPreset.light.background.default)
    })

    it('should apply dark palette colors', () => {
      const theme = buildTheme(classicPreset, 'dark')

      expect(theme.palette.primary.main).toBe(classicPreset.dark.primary.main)
      expect(theme.palette.secondary.main).toBe(classicPreset.dark.secondary.main)
      expect(theme.palette.background.default).toBe(classicPreset.dark.background.default)
    })

    it('should include semantic colors', () => {
      const theme = buildTheme(classicPreset, 'light')

      expect(theme.palette.error.main).toBe(classicPreset.light.error)
      expect(theme.palette.warning.main).toBe(classicPreset.light.warning)
      expect(theme.palette.info.main).toBe(classicPreset.light.info)
      expect(theme.palette.success.main).toBe(classicPreset.light.success)
    })
  })

  describe('Typography', () => {
    it('should use Inter font family', () => {
      const theme = buildTheme(classicPreset, 'light')
      expect(theme.typography.fontFamily).toContain('Inter')
    })

    it('should define all heading levels', () => {
      const theme = buildTheme(classicPreset, 'light')

      expect(theme.typography.h1).toBeDefined()
      expect(theme.typography.h2).toBeDefined()
      expect(theme.typography.h3).toBeDefined()
      expect(theme.typography.h4).toBeDefined()
      expect(theme.typography.h5).toBeDefined()
      expect(theme.typography.h6).toBeDefined()
    })

    it('should define body text styles', () => {
      const theme = buildTheme(classicPreset, 'light')

      expect(theme.typography.body1).toBeDefined()
      expect(theme.typography.body2).toBeDefined()
      expect(theme.typography.caption).toBeDefined()
    })

    it('should scale typography in compact mode', () => {
      const normal = buildTheme(classicPreset, 'light', false)
      const compact = buildTheme(classicPreset, 'light', true)

      const normalSize = parseFloat(normal.typography.h1?.fontSize as string)
      const compactSize = parseFloat(compact.typography.h1?.fontSize as string)

      expect(compactSize).toBeLessThan(normalSize)
    })
  })

  describe('Classic Preset Styling', () => {
    it('should use smaller border radius for classic preset', () => {
      const theme = buildTheme(classicPreset, 'light')
      expect(theme.shape.borderRadius).toBe(10)
    })

    it('should not apply transparency effects', () => {
      const theme = buildTheme(classicPreset, 'light')
      const paperStyles = theme.components?.MuiPaper?.styleOverrides?.root

      // Classic preset should not have blur effects
      expect(paperStyles).not.toHaveProperty('backdropFilter')
    })

    it('should not apply glass effects to cards', () => {
      const theme = buildTheme(classicPreset, 'light')
      const cardStyles = theme.components?.MuiCard?.styleOverrides?.root

      // Classic preset should not have glass styling
      expect(cardStyles).not.toHaveProperty('backdropFilter')
    })
  })

  describe('Liquid Glass Preset Styling', () => {
    it('should apply transparency to Paper', () => {
      const theme = buildTheme(liquidGlassPreset, 'light')
      const paperStyles = theme.components?.MuiPaper?.styleOverrides?.root as Record<string, any>

      // Liquid Glass has transparency but blur=false for performance
      expect(paperStyles.backgroundColor).toBe(liquidGlassPreset.light.background.glass)
      expect(paperStyles.border).toBeDefined()
    })

    it('should apply transparency to Card', () => {
      const theme = buildTheme(liquidGlassPreset, 'light')
      const cardStyles = theme.components?.MuiCard?.styleOverrides?.root as Record<string, any>

      // Liquid Glass has transparency but blur=false for performance
      expect(cardStyles.backgroundColor).toBe(liquidGlassPreset.light.background.glass)
      expect(cardStyles.border).toBeDefined()
    })

    it('should apply inset shadows when enabled', () => {
      const theme = buildTheme(liquidGlassPreset, 'light')
      const paperStyles = theme.components?.MuiPaper?.styleOverrides?.root as Record<string, any>

      if (liquidGlassPreset.effects.insetShadows) {
        expect(paperStyles.boxShadow).toBeDefined()
      }
    })

    it('should apply gradient shine overlay to cards', () => {
      const theme = buildTheme(liquidGlassPreset, 'light')
      const cardStyles = theme.components?.MuiCard?.styleOverrides?.root as Record<string, any>

      if (liquidGlassPreset.effects.gradient) {
        expect(cardStyles['&::before']).toBeDefined()
      }
    })

    it('should apply hover animations when enabled', () => {
      const theme = buildTheme(liquidGlassPreset, 'light')
      const cardStyles = theme.components?.MuiCard?.styleOverrides?.root as Record<string, any>

      if (liquidGlassPreset.effects.animations) {
        expect(cardStyles['&:hover']).toBeDefined()
        expect(cardStyles['&:hover'].transform).toBeDefined()
      }
    })

    it('should apply stronger blur to drawer', () => {
      const theme = buildTheme(liquidGlassPreset, 'light')
      const drawerStyles = theme.components?.MuiDrawer?.styleOverrides?.paper as Record<string, any>

      if (liquidGlassPreset.effects.blur) {
        // Drawer should have 2.5x blur
        expect(drawerStyles.backdropFilter).toContain('blur')
        const blurValue = parseFloat(drawerStyles.backdropFilter.match(/blur\((\d+)px\)/)?.[1] || '0')
        expect(blurValue).toBeGreaterThan(liquidGlassPreset.effects.blur as number)
      }
    })
  })

  describe('Component Overrides', () => {
    it('should override Button styles', () => {
      const theme = buildTheme(classicPreset, 'light')
      expect(theme.components?.MuiButton?.styleOverrides?.root).toBeDefined()
    })

    it('should override Chip styles', () => {
      const theme = buildTheme(classicPreset, 'light')
      expect(theme.components?.MuiChip?.styleOverrides?.root).toBeDefined()
    })

    it('should override TextField styles', () => {
      const theme = buildTheme(classicPreset, 'light')
      expect(theme.components?.MuiTextField?.styleOverrides?.root).toBeDefined()
    })

    it('should remove borders from tables', () => {
      const theme = buildTheme(classicPreset, 'light')

      expect(theme.components?.MuiTable?.styleOverrides?.root).toHaveProperty('border', 'none')
      expect(theme.components?.MuiTableRow?.styleOverrides?.root).toHaveProperty('borderBottom', 'none')
      expect(theme.components?.MuiTableCell?.styleOverrides?.root).toHaveProperty('borderBottom', 'none')
    })

    it('should apply compact spacing to components', () => {
      const normal = buildTheme(classicPreset, 'light', false)
      const compact = buildTheme(classicPreset, 'light', true)

      const normalButton = normal.components?.MuiButton?.styleOverrides?.root as Record<string, any>
      const compactButton = compact.components?.MuiButton?.styleOverrides?.root as Record<string, any>

      expect(compactButton.padding).not.toBe(normalButton.padding)
    })
  })

  describe('Global Styles', () => {
    it('should apply smooth transitions', () => {
      const theme = buildTheme(classicPreset, 'light')
      const baselineStyles = theme.components?.MuiCssBaseline?.styleOverrides as Record<string, any>

      expect(baselineStyles['*'].transition).toContain('background-color')
      expect(baselineStyles['*'].transition).toContain('color')
    })

    it('should apply gradient wallpaper when specified', () => {
      const theme = buildTheme(liquidGlassPreset, 'light')
      const baselineStyles = theme.components?.MuiCssBaseline?.styleOverrides as Record<string, any>

      if (liquidGlassPreset.light.background.wallpaper?.includes('gradient')) {
        expect(baselineStyles.body.backgroundImage).toBeDefined()
        expect(baselineStyles.body.backgroundAttachment).toBe('fixed')
      }
    })
  })
})

describe('getGlassmorphismStyles', () => {
  describe('Classic Preset', () => {
    it('should return solid styles for light mode', () => {
      const styles = getGlassmorphismStyles(classicPreset, 'light')

      expect(styles.backgroundColor).toBe(classicPreset.light.background.paper)
      expect(styles).not.toHaveProperty('backdropFilter')
      expect(styles.boxShadow).toBeDefined()
    })

    it('should return solid styles for dark mode', () => {
      const styles = getGlassmorphismStyles(classicPreset, 'dark')

      expect(styles.backgroundColor).toBe(classicPreset.dark.background.paper)
      expect(styles).not.toHaveProperty('backdropFilter')
      expect(styles.boxShadow).toBeDefined()
    })

    it('should use divider for border', () => {
      const styles = getGlassmorphismStyles(classicPreset, 'light')
      expect(styles.border).toContain(classicPreset.light.divider)
    })
  })

  describe('Liquid Glass Preset', () => {
    it('should return glass styles for light mode', () => {
      const styles = getGlassmorphismStyles(liquidGlassPreset, 'light')

      // Liquid Glass has transparency but blur=false for performance
      expect(styles.backgroundColor).toBe(liquidGlassPreset.light.background.glass)
      expect(styles.border).toBeDefined()
      expect(styles.boxShadow).toBeDefined()
    })

    it('should return glass styles for dark mode', () => {
      const styles = getGlassmorphismStyles(liquidGlassPreset, 'dark')

      // Liquid Glass has transparency but blur=false for performance
      expect(styles.backgroundColor).toBe(liquidGlassPreset.dark.background.glass)
      expect(styles.border).toBeDefined()
      expect(styles.boxShadow).toBeDefined()
    })

    it('should not apply blur when effects.blur is false', () => {
      const styles = getGlassmorphismStyles(liquidGlassPreset, 'light')
      // liquidGlassPreset has blur: false
      expect(styles.backdropFilter).toBe('none')
    })

    it('should include WebKit prefix', () => {
      const styles = getGlassmorphismStyles(liquidGlassPreset, 'light')
      expect(styles.WebkitBackdropFilter).toBeDefined()
      expect(styles.WebkitBackdropFilter).toBe(styles.backdropFilter)
    })

    it('should not apply inset shadows when disabled', () => {
      const styles = getGlassmorphismStyles(liquidGlassPreset, 'light')

      // liquidGlassPreset has insetShadows: false
      if (!liquidGlassPreset.effects.insetShadows) {
        expect(styles.boxShadow).not.toContain('inset')
      }
    })

    it('should use border from palette', () => {
      const styles = getGlassmorphismStyles(liquidGlassPreset, 'light')
      expect(styles.border).toContain(liquidGlassPreset.light.border)
    })
  })

  describe('Blur Customization', () => {
    it('should respect preset blur settings', () => {
      const styles = getGlassmorphismStyles(liquidGlassPreset, 'light')
      // liquidGlassPreset has blur: false, so backdropFilter should be 'none'
      expect(styles.backdropFilter).toBe('none')
    })

    it('should ignore custom blur when effects.blur is false', () => {
      const customBlur = 50
      const styles = getGlassmorphismStyles(liquidGlassPreset, 'light', customBlur)
      // Even with custom blur param, preset has blur: false
      expect(styles.backdropFilter).toBe('none')
    })
  })
})
