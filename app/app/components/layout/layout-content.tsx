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

  // Noise texture for grain effect (increased opacity for more visible grain)
  const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`

  // Get wallpaper from theme
  const wallpaper = visualPreset === 'liquidGlass'
    ? (themeMode === 'dark'
        ? muiTheme.palette.background.wallpaper
        : muiTheme.palette.background.wallpaper)
    : undefined

  // Combine wallpaper + noise
  const backgroundImage = wallpaper ? `${wallpaper}, ${noiseTexture}` : undefined

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
        ...(backgroundImage && {
          backgroundImage: backgroundImage,
          backgroundSize: 'cover, 200px 200px',
          backgroundPosition: 'center, 0 0',
          backgroundRepeat: 'no-repeat, repeat',
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
      ...(backgroundImage && {
        backgroundImage: backgroundImage,
        backgroundSize: 'cover, 200px 200px',
        backgroundPosition: 'center, 0 0',
        backgroundRepeat: 'no-repeat, repeat',
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
