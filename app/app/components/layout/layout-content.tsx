'use client'

import { ReactNode, useEffect } from 'react'
import Box from '@mui/material/Box'
import { useTheme as useMuiTheme } from '@mui/material/styles'
import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'
import { useModeStore } from '@/lib/core/store'
import { useTheme } from '@orphelix/ui'

interface LayoutContentProps {
  children: ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { hasCompletedWelcome, mode, selectedContext, selectedNamespace, setHasCompletedWelcome } = useModeStore()
  const muiTheme = useMuiTheme()
  const { visualPreset, mode: themeMode } = useTheme()

  // Get wallpaper from theme
  const wallpaper = visualPreset === 'liquidGlass'
    ? (themeMode === 'dark'
        ? muiTheme.palette.background.wallpaper
        : muiTheme.palette.background.wallpaper)
    : undefined

  // Validate welcome completion - if completed but essential data is missing, reset
  useEffect(() => {
    if (hasCompletedWelcome) {
      // In real mode, must have context and namespace
      if (mode === 'real' && (!selectedContext || !selectedNamespace)) {
        setHasCompletedWelcome(false)
      }
      // In demo mode, must have namespace
      if (mode === 'demo' && !selectedNamespace) {
        setHasCompletedWelcome(false)
      }
    }
  }, [hasCompletedWelcome, mode, selectedContext, selectedNamespace, setHasCompletedWelcome])

  // Don't render sidebar and topbar if welcome flow is not completed
  if (!hasCompletedWelcome) {
    return (
      <Box sx={{
        height: '100vh',
        bgcolor: 'background.default',
        ...(wallpaper && {
          backgroundImage: wallpaper,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }),
        overflow: 'hidden'
      }}>
        {/* WelcomeModal will be displayed */}
      </Box>
    )
  }

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      bgcolor: 'background.default',
      ...(wallpaper && {
        backgroundImage: wallpaper,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }),
      overflow: 'hidden'
    }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            borderTopRightRadius: 3,
            overflow: 'hidden',
          }}
        >
          <TopBar />
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', pt: 2 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
