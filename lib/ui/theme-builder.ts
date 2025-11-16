import { createTheme, Theme, ThemeOptions } from '@mui/material/styles'
import type { ColorPalette } from './color-skins'

/**
 * Build MUI theme from color palette
 * Supports both regular and compact modes
 */
export function buildTheme(palette: ColorPalette, compact: boolean = false): Theme {
  // Typography scale - smaller in compact mode
  const scale = compact ? 0.875 : 1

  const themeOptions: ThemeOptions = {
    palette: {
      mode: palette.background.default.includes('F') ? 'light' : 'dark',
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
      // Headings - scaled down in compact mode
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
      // Body text
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
      borderRadius: compact ? 8 : 12,
    },
    spacing: compact ? 7 : 8, // Tighter spacing in compact mode
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: palette.background.default,
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
            borderRadius: compact ? 8 : 10,
            padding: compact ? '7px 16px' : '9px 20px',
            fontSize: `${0.875 * scale}rem`,
            fontWeight: 600,
            boxShadow: 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
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
            // Add glassmorphism for translucent backgrounds
            ...(palette.background.paper.includes('rgba') && {
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              boxShadow: 'none',
              border: palette.background.default.includes('F')
                ? '0.5px solid rgba(0, 0, 0, 0.08)'
                : '0.5px solid rgba(255, 255, 255, 0.12)',
            }),
          },
          rounded: {
            borderRadius: compact ? 12 : 16,
          },
          elevation1: {
            boxShadow: palette.background.paper.includes('rgba')
              ? 'none'
              : palette.background.default.includes('F')
              ? '0 2px 8px rgba(0, 0, 0, 0.06)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)',
          },
          elevation2: {
            boxShadow: palette.background.paper.includes('rgba')
              ? 'none'
              : palette.background.default.includes('F')
              ? '0 4px 12px rgba(0, 0, 0, 0.08)'
              : '0 4px 12px rgba(0, 0, 0, 0.35)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: compact ? 12 : 16,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            // Add glassmorphism for translucent backgrounds
            ...(palette.background.paper.includes('rgba') && {
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              boxShadow: 'none',
              border: palette.background.default.includes('F')
                ? '0.5px solid rgba(0, 0, 0, 0.08)'
                : '0.5px solid rgba(255, 255, 255, 0.12)',
            }),
            '&:hover': {
              transform: 'translateY(-2px)',
              ...(palette.background.paper.includes('rgba') && {
                border: palette.background.default.includes('F')
                  ? '0.5px solid rgba(0, 0, 0, 0.12)'
                  : '0.5px solid rgba(255, 255, 255, 0.18)',
              }),
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: compact ? 6 : 8,
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
              borderRadius: compact ? 8 : 10,
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none',
            // Add glassmorphism for translucent backgrounds
            ...(palette.background.paper.includes('rgba') && {
              backdropFilter: 'blur(60px)',
              WebkitBackdropFilter: 'blur(60px)',
              borderRight: palette.background.default.includes('F')
                ? '0.5px solid rgba(0, 0, 0, 0.06)'
                : '0.5px solid rgba(255, 255, 255, 0.1)',
            }),
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: compact ? 8 : 10,
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
 * Create glassmorphism CSS properties
 */
export function getGlassmorphismStyles(palette: ColorPalette, blur: number = 10) {
  return {
    background: palette.background.glass,
    backdropFilter: `blur(${blur}px) saturate(180%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
    border: `1px solid ${palette.border}`,
    boxShadow: palette.background.default.includes('F')
      ? '0 8px 32px 0 rgba(0, 0, 0, 0.08)'
      : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  }
}
