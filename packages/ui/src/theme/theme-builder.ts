import { createTheme, Theme, ThemeOptions } from '@mui/material/styles'
import type { VisualPreset } from './visual-presets.js'
import { designTokens } from './design-tokens.js'

/**
 * Build MUI theme from visual preset
 * Applies conditional styling based on preset effects
 */
export function buildTheme(preset: VisualPreset, mode: 'light' | 'dark', compact: boolean = false): Theme {
  const palette = mode === 'light' ? preset.light : preset.dark
  const { effects } = preset
  const scale = compact ? 0.875 : 1

  // Determine if dark mode based on background color
  const isDark = mode === 'dark'

  // Use smaller border radius for classic preset
  const isClassic = !effects.transparency
  const cardRadius = isClassic ? 10 : (compact ? designTokens.radius.md : designTokens.radius.lg)
  const buttonRadius = isClassic ? 10 : (compact ? designTokens.radius.sm : 10)

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: palette.primary.main,
        light: palette.primary.light,
        dark: palette.primary.dark,
        contrastText: palette.primary.contrast,
      },
      secondary: {
        main: palette.secondary.main,
        light: palette.secondary.light,
        dark: palette.secondary.dark,
        contrastText: palette.secondary.contrast,
      },
      error: {
        main: palette.error,
      },
      warning: {
        main: palette.warning,
      },
      info: {
        main: palette.info,
      },
      success: {
        main: palette.success,
      },
      background: {
        default: palette.background.default,
        paper: palette.background.paper,
      },
      text: {
        primary: palette.text.primary,
        secondary: palette.text.secondary,
        disabled: palette.text.disabled,
      },
      divider: palette.divider,
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: `${2.25 * scale}rem`,
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: `${1.875 * scale}rem`,
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontSize: `${1.5 * scale}rem`,
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontSize: `${1.25 * scale}rem`,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: `${1.125 * scale}rem`,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: `${1 * scale}rem`,
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: `${0.875 * scale}rem`,
        lineHeight: 1.6,
        fontWeight: 400,
      },
      body2: {
        fontSize: `${0.8125 * scale}rem`,
        lineHeight: 1.5,
        fontWeight: 400,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: `${0.875 * scale}rem`,
        letterSpacing: '0.01em',
      },
      caption: {
        fontSize: `${0.75 * scale}rem`,
        lineHeight: 1.4,
      },
    },
    shape: {
      borderRadius: cardRadius,
    },
    spacing: compact ? 7 : 8,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
          },
          body: {
            backgroundColor: palette.background.default,
            transition: 'background-color 0.3s ease-in-out',
            ...(palette.background.wallpaper && palette.background.wallpaper.includes('gradient')
              ? {
                  backgroundImage: palette.background.wallpaper,
                  backgroundAttachment: 'fixed',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }
              : {
                  backgroundImage: 'none',
                }),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: buttonRadius,
            padding: compact ? '7px 16px' : '9px 20px',
            fontSize: `${0.875 * scale}rem`,
            fontWeight: 600,
            boxShadow: 'none',
            transition: `all ${designTokens.animations.duration.normal}ms ${designTokens.animations.easing.standard}`,
            ...(effects.animations && {
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: isDark
                  ? '0 4px 12px rgba(0, 0, 0, 0.4)'
                  : '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }),
          },
          sizeSmall: {
            padding: compact ? '4px 12px' : '5px 14px',
            fontSize: `${0.8125 * scale}rem`,
          },
          sizeLarge: {
            padding: compact ? '10px 20px' : '12px 24px',
            fontSize: `${0.9375 * scale}rem`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            // CONDITIONAL: Transparency effects
            ...(effects.transparency && {
              backgroundColor: palette.background.glass,
              backdropFilter: effects.blur
                ? `blur(${effects.blur}px) saturate(${effects.saturation}%)`
                : 'none',
              WebkitBackdropFilter: effects.blur
                ? `blur(${effects.blur}px) saturate(${effects.saturation}%)`
                : 'none',
              border: `1px solid ${palette.border}`,
            }),
            // CONDITIONAL: Inset shadows for depth
            ...(effects.insetShadows && {
              boxShadow: isDark
                ? `${designTokens.shadows.glass.dark}, ${designTokens.shadows.glassInset.dark}`
                : `${designTokens.shadows.glass.light}, ${designTokens.shadows.glassInset.light}`,
            }),
          },
          rounded: {
            borderRadius: cardRadius,
          },
          elevation1: {
            boxShadow: effects.transparency
              ? 'none'
              : isDark
              ? '0 1px 3px rgba(0, 0, 0, 0.2)'
              : '0 1px 3px rgba(0, 0, 0, 0.04)',
          },
          elevation2: {
            boxShadow: effects.transparency
              ? 'none'
              : isDark
              ? '0 2px 6px rgba(0, 0, 0, 0.25)'
              : '0 2px 6px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius,
            transition: `all ${designTokens.animations.duration.normal}ms ${designTokens.animations.easing.standard}`,
            // CONDITIONAL: Glass effects
            ...(effects.transparency && {
              backgroundColor: palette.background.glass,
              backdropFilter: effects.blur
                ? `blur(${effects.blur}px) saturate(${effects.saturation}%)`
                : 'none',
              WebkitBackdropFilter: effects.blur
                ? `blur(${effects.blur}px) saturate(${effects.saturation}%)`
                : 'none',
              border: `1px solid ${palette.border}`,
              boxShadow: 'none',
            }),
            // CONDITIONAL: Inset shadows
            ...(effects.insetShadows && {
              boxShadow: isDark
                ? `${designTokens.shadows.glass.dark}, ${designTokens.shadows.glassInset.dark}`
                : `${designTokens.shadows.glass.light}, ${designTokens.shadows.glassInset.light}`,
            }),
            // CONDITIONAL: Gradient shine overlay
            ...(effects.gradient && {
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                background: isDark
                  ? designTokens.gradients.diagonalShine.dark
                  : designTokens.gradients.diagonalShine.light,
                pointerEvents: 'none',
                borderRadius: cardRadius,
              },
            }),
            // CONDITIONAL: Animations
            ...(effects.animations && {
              '&:hover': {
                transform: 'translateY(-2px)',
                ...(effects.transparency && {
                  border: `1px solid ${palette.border.replace('0.12', '0.18')}`,
                }),
                ...(effects.insetShadows && {
                  boxShadow: isDark
                    ? `${designTokens.shadows.glassHover.dark}, ${designTokens.shadows.glassInset.dark}`
                    : `${designTokens.shadows.glassHover.light}, ${designTokens.shadows.glassInset.light}`,
                }),
              },
            }),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: isClassic ? 5 : (compact ? 6 : designTokens.radius.sm),
            fontWeight: 600,
            fontSize: `${0.8125 * scale}rem`,
            height: compact ? 26 : 32,
          },
          sizeSmall: {
            height: compact ? 22 : 24,
            fontSize: `${0.75 * scale}rem`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: buttonRadius,
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none',
            // CONDITIONAL: Glass effect for drawer
            ...(effects.transparency && {
              backgroundColor: palette.background.glass,
              backdropFilter: effects.blur
                ? `blur(${effects.blur * 2.5}px) saturate(${effects.saturation}%)`
                : 'none',
              WebkitBackdropFilter: effects.blur
                ? `blur(${effects.blur * 2.5}px) saturate(${effects.saturation}%)`
                : 'none',
              borderRight: `1px solid ${palette.border}`,
            }),
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: buttonRadius,
            marginBottom: compact ? 2 : 4,
            padding: compact ? '8px 12px' : '10px 16px',
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: compact ? 36 : 40,
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            border: 'none',
            boxShadow: 'none',
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            borderBottom: 'none',
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            borderBottom: 'none',
            '&:last-child td': {
              borderBottom: 'none',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: 'none',
          },
          head: {
            fontWeight: 700,
            borderBottom: 'none',
          },
        },
      },
    },
  }

  return createTheme(themeOptions)
}

/**
 * Get glassmorphism styles for custom components
 * Returns CSS properties based on preset effects
 */
export function getGlassmorphismStyles(
  preset: VisualPreset,
  mode: 'light' | 'dark',
  blur: number = designTokens.blur.medium
) {
  const palette = mode === 'light' ? preset.light : preset.dark
  const { effects } = preset
  const isDark = mode === 'dark'

  if (!effects.transparency) {
    // Classic preset - solid colors
    return {
      background: palette.background.paper,
      border: `1px solid ${palette.divider}`,
      boxShadow: isDark
        ? '0 4px 16px rgba(0, 0, 0, 0.3)'
        : '0 4px 16px rgba(0, 0, 0, 0.08)',
    }
  }

  // Glass or Liquid Glass presets
  return {
    background: palette.background.glass,
    backdropFilter: effects.blur ? `blur(${blur}px) saturate(${effects.saturation}%)` : 'none',
    WebkitBackdropFilter: effects.blur ? `blur(${blur}px) saturate(${effects.saturation}%)` : 'none',
    border: `1px solid ${palette.border}`,
    boxShadow: effects.insetShadows
      ? isDark
        ? `${designTokens.shadows.glass.dark}, ${designTokens.shadows.glassInset.dark}`
        : `${designTokens.shadows.glass.light}, ${designTokens.shadows.glassInset.light}`
      : isDark
      ? designTokens.shadows.glass.dark
      : designTokens.shadows.glass.light,
  }
}
