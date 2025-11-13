import { createTheme } from '@mui/material/styles'

// Modern minimalist color palette - clean and vibrant
const modernColors = {
  // Primary - Deep Blue
  blue: {
    main: '#0F172A',
    light: '#334155',
    dark: '#020617',
    contrast: '#FFFFFF',
  },
  // Accent colors - vibrant but refined
  indigo: {
    main: '#6366F1',
    light: '#818CF8',
    dark: '#4F46E5',
    contrast: '#FFFFFF',
  },
  cyan: {
    main: '#06B6D4',
    light: '#22D3EE',
    dark: '#0891B2',
    contrast: '#FFFFFF',
  },
  violet: {
    main: '#8B5CF6',
    light: '#A78BFA',
    dark: '#7C3AED',
    contrast: '#FFFFFF',
  },
  emerald: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
    contrast: '#FFFFFF',
  },
  amber: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    contrast: '#000000',
  },
  rose: {
    main: '#F43F5E',
    light: '#FB7185',
    dark: '#E11D48',
    contrast: '#FFFFFF',
  },
  // Neutrals - crisp grays
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: modernColors.indigo.main,
      light: modernColors.indigo.light,
      dark: modernColors.indigo.dark,
      contrastText: modernColors.indigo.contrast,
    },
    secondary: {
      main: modernColors.cyan.main,
      light: modernColors.cyan.light,
      dark: modernColors.cyan.dark,
      contrastText: modernColors.cyan.contrast,
    },
    error: {
      main: modernColors.rose.main,
      light: modernColors.rose.light,
      dark: modernColors.rose.dark,
    },
    warning: {
      main: modernColors.amber.main,
      light: modernColors.amber.light,
      dark: modernColors.amber.dark,
    },
    info: {
      main: modernColors.cyan.main,
      light: modernColors.cyan.light,
      dark: modernColors.cyan.dark,
    },
    success: {
      main: modernColors.emerald.main,
      light: modernColors.emerald.light,
      dark: modernColors.emerald.dark,
    },
    background: {
      default: modernColors.neutral[50],
      paper: '#FFFFFF',
    },
    text: {
      primary: modernColors.neutral[900],
      secondary: modernColors.neutral[600],
    },
    divider: modernColors.neutral[200],
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.10)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.14)',
    '0px 20px 40px rgba(0, 0, 0, 0.16)',
    '0px 24px 48px rgba(0, 0, 0, 0.18)',
    '0px 28px 56px rgba(0, 0, 0, 0.20)',
    '0px 32px 64px rgba(0, 0, 0, 0.22)',
    '0px 36px 72px rgba(0, 0, 0, 0.24)',
    '0px 40px 80px rgba(0, 0, 0, 0.26)',
    '0px 44px 88px rgba(0, 0, 0, 0.28)',
    '0px 48px 96px rgba(0, 0, 0, 0.30)',
    '0px 52px 104px rgba(0, 0, 0, 0.32)',
    '0px 56px 112px rgba(0, 0, 0, 0.34)',
    '0px 60px 120px rgba(0, 0, 0, 0.36)',
    '0px 64px 128px rgba(0, 0, 0, 0.38)',
    '0px 68px 136px rgba(0, 0, 0, 0.40)',
    '0px 72px 144px rgba(0, 0, 0, 0.42)',
    '0px 76px 152px rgba(0, 0, 0, 0.44)',
    '0px 80px 160px rgba(0, 0, 0, 0.46)',
    '0px 84px 168px rgba(0, 0, 0, 0.48)',
    '0px 88px 176px rgba(0, 0, 0, 0.50)',
    '0px 92px 184px rgba(0, 0, 0, 0.52)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
          },
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.875rem',
        },
        sizeLarge: {
          padding: '12px 28px',
          fontSize: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.10)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: modernColors.indigo.light,
      light: '#A5B4FC',
      dark: modernColors.indigo.main,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: modernColors.cyan.light,
      light: '#67E8F9',
      dark: modernColors.cyan.main,
      contrastText: '#000000',
    },
    error: {
      main: modernColors.rose.light,
      light: '#FDA4AF',
      dark: modernColors.rose.main,
    },
    warning: {
      main: modernColors.amber.light,
      light: '#FCD34D',
      dark: modernColors.amber.main,
    },
    info: {
      main: modernColors.cyan.light,
      light: '#67E8F9',
      dark: modernColors.cyan.main,
    },
    success: {
      main: modernColors.emerald.light,
      light: '#6EE7B7',
      dark: modernColors.emerald.main,
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F1F5F9',
      secondary: modernColors.neutral[400],
    },
    divider: modernColors.neutral[700],
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.3)',
    '0px 4px 8px rgba(0, 0, 0, 0.35)',
    '0px 8px 16px rgba(0, 0, 0, 0.40)',
    '0px 12px 24px rgba(0, 0, 0, 0.45)',
    '0px 16px 32px rgba(0, 0, 0, 0.50)',
    '0px 20px 40px rgba(0, 0, 0, 0.55)',
    '0px 24px 48px rgba(0, 0, 0, 0.60)',
    '0px 28px 56px rgba(0, 0, 0, 0.65)',
    '0px 32px 64px rgba(0, 0, 0, 0.70)',
    '0px 36px 72px rgba(0, 0, 0, 0.75)',
    '0px 40px 80px rgba(0, 0, 0, 0.80)',
    '0px 44px 88px rgba(0, 0, 0, 0.85)',
    '0px 48px 96px rgba(0, 0, 0, 0.90)',
    '0px 52px 104px rgba(0, 0, 0, 0.95)',
    '0px 56px 112px rgba(0, 0, 0, 1.00)',
    '0px 60px 120px rgba(0, 0, 0, 1.00)',
    '0px 64px 128px rgba(0, 0, 0, 1.00)',
    '0px 68px 136px rgba(0, 0, 0, 1.00)',
    '0px 72px 144px rgba(0, 0, 0, 1.00)',
    '0px 76px 152px rgba(0, 0, 0, 1.00)',
    '0px 80px 160px rgba(0, 0, 0, 1.00)',
    '0px 84px 168px rgba(0, 0, 0, 1.00)',
    '0px 88px 176px rgba(0, 0, 0, 1.00)',
    '0px 92px 184px rgba(0, 0, 0, 1.00)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
          },
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.875rem',
        },
        sizeLarge: {
          padding: '12px 28px',
          fontSize: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.35)',
        },
        elevation3: {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.40)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
})

// Export modern colors for use in components
export { modernColors }
