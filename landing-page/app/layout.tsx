import type { Metadata } from 'next'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import './globals.css'

export const metadata: Metadata = {
  title: 'Orphelix - Modern Kubernetes Dashboard',
  description: 'Beautiful GitOps workflow for Kubernetes with real-time monitoring, topology visualization, and demo mode.',
  keywords: ['kubernetes', 'dashboard', 'gitops', 'devops', 'monitoring', 'k8s'],
  authors: [{ name: 'Orphelix Team' }],
  openGraph: {
    title: 'Orphelix - Modern Kubernetes Dashboard',
    description: 'Beautiful GitOps workflow for Kubernetes with real-time monitoring',
    type: 'website',
  },
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#8b5cf6',
    },
    background: {
      default: '#0a0e27',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 32px',
        },
      },
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="gradient-bg" />
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
