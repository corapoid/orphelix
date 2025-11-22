'use client'

import { ReactNode, useEffect } from 'react'
import Box from '@mui/material/Box'
import { usePathname } from 'next/navigation'
import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'
import { useModeStore } from '@/lib/core/store'
import { useTheme } from '@orphelix/ui'
import { welcomeBackground } from '@/lib/ui/backgrounds'

interface LayoutContentProps {
  children: ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { hasCompletedWelcome, mode, selectedContext, selectedNamespace, setHasCompletedWelcome } = useModeStore()
  const { visualPreset, mode: themeMode } = useTheme()
  const pathname = usePathname()
  const isDashboardPage = pathname === '/' || pathname === '/demo'

  const isLiquidGlass = visualPreset === 'liquidGlass'
  const gradient = isLiquidGlass
    ? (themeMode === 'dark'
        ? welcomeBackground.gradient.dark
        : welcomeBackground.gradient.light)
    : undefined

  const backgroundBase = {
    ...(gradient
      ? {
          backgroundImage: gradient,
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          bgcolor: 'background.default',
        }),
  }

  const renderGrainOverlay = isLiquidGlass ? (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: welcomeBackground.noise.image,
        opacity: themeMode === 'dark'
          ? welcomeBackground.noise.opacity.dark
          : welcomeBackground.noise.opacity.light,
        mixBlendMode: 'overlay',
        zIndex: 0,
      }}
    />
  ) : null

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
      <>
        {renderGrainOverlay}
        <Box sx={{
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          ...backgroundBase,
        }}>
          {/* WelcomeModal will be displayed */}
        </Box>
      </>
    )
  }

  return (
    <>
      {renderGrainOverlay}
      <Box sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        ...backgroundBase,
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
            <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', pt: 2, px: isDashboardPage ? 0 : 2 }}>
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
