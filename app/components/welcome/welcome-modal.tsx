'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import GitHubIcon from '@mui/icons-material/GitHub'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { LiquidGlassButton } from '@/app/components/common/liquid-glass-button'
import { useModeStore } from '@/lib/core/store'
import { useThemeMode } from '@/app/components/theme-provider'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

export function WelcomeModal() {
  const { hasCompletedWelcome, setMode, setContext, setNamespace, setHasCompletedWelcome } = useModeStore()
  const { actualTheme, setThemeMode } = useThemeMode()
  const [open, setOpen] = useState(!hasCompletedWelcome)
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [selectedContextName, setSelectedContextName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Update open state when hasCompletedWelcome changes
  useEffect(() => {
    setOpen(!hasCompletedWelcome)
  }, [hasCompletedWelcome])

  const handleThemeToggle = () => {
    setThemeMode(actualTheme === 'light' ? 'dark' : 'light')
  }

  const handleDemoMode = () => {
    setMode('mock')
    setHasCompletedWelcome(true)
    setOpen(false)
  }

  const handleRealMode = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contexts')
      const data = await response.json()

      if (response.ok && data.contexts && data.contexts.length > 0) {
        setContexts(data.contexts)

        // Auto-select current context if exists
        const currentContext = data.contexts.find((ctx: KubeContext) => ctx.current)
        if (currentContext) {
          setSelectedContextName(currentContext.name)
        } else {
          setSelectedContextName(data.contexts[0].name)
        }
      } else {
        throw new Error('No Kubernetes contexts found. Please configure kubectl.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Kubernetes contexts')
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = () => {
    const context = contexts.find((c) => c.name === selectedContextName)
    if (!context) return

    setMode('real')
    setContext({
      name: context.name,
      cluster: context.cluster,
      user: context.user,
    })

    if (context.namespace) {
      setNamespace(context.namespace)
    }

    setHasCompletedWelcome(true)
    setOpen(false)
  }

  if (!open) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        p: 3,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'radial-gradient(ellipse at top, rgba(102, 126, 234, 0.15), transparent 50%), radial-gradient(ellipse at bottom, rgba(118, 75, 162, 0.15), transparent 50%), linear-gradient(180deg, rgba(10, 10, 20, 0.95) 0%, rgba(20, 20, 35, 0.98) 100%)'
            : 'radial-gradient(ellipse at top, rgba(102, 126, 234, 0.08), transparent 50%), radial-gradient(ellipse at bottom, rgba(118, 75, 162, 0.08), transparent 50%), linear-gradient(180deg, rgba(250, 250, 255, 0.98) 0%, rgba(240, 242, 255, 1) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: (theme) => theme.palette.mode === 'dark' ? 0.3 : 0.2,
          pointerEvents: 'none',
        },
      }}
    >
      <GlassPanel
        sx={{
          maxWidth: 680,
          width: '100%',
          p: 5,
          position: 'relative',
        }}
      >
        {/* Header with theme toggle and links */}
        <Box sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          gap: 1,
        }}>
          <Tooltip title={actualTheme === 'light' ? 'Dark mode' : 'Light mode'} arrow>
            <IconButton
              onClick={handleThemeToggle}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              {actualTheme === 'light' ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Documentation" arrow>
            <IconButton
              component={Link}
              href="#" // TODO: Add documentation link
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <MenuBookIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub Repository" arrow>
            <IconButton
              component={Link}
              href="https://github.com/dmakowski-rasp/kubevista"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 5, mt: 3 }}>
          {/* Logo/Icon */}
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            }}
          >
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 700 }}>
              O
            </Typography>
          </Box>

          {/* App Name */}
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontFamily: '"Space Grotesk", "Inter", system-ui, sans-serif',
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1.5,
            }}
          >
            ORPHELIX
          </Typography>

          {/* Welcome Message */}
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Modern Kubernetes Dashboard
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
            Connect to your Kubernetes cluster to monitor deployments, pods, services, and more.
            Or explore the demo mode to see what ORPHELIX can do.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {contexts.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, alignItems: 'center' }}>
            <LiquidGlassButton
              onClick={handleRealMode}
              disabled={loading}
              size="large"
              sx={{ py: 2, fontSize: '1rem', minWidth: 320 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Connect to Kubernetes Cluster'
              )}
            </LiquidGlassButton>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              or
            </Typography>

            <LiquidGlassButton
              onClick={handleDemoMode}
              variant="outlined"
              size="large"
              sx={{ py: 2, fontSize: '1rem', minWidth: 320 }}
            >
              Explore Demo Mode
            </LiquidGlassButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Select Kubernetes Context</InputLabel>
              <Select
                value={selectedContextName}
                label="Select Kubernetes Context"
                onChange={(e) => setSelectedContextName(e.target.value)}
              >
                {contexts.map((context) => (
                  <MenuItem key={context.name} value={context.name}>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {context.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {context.cluster}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <LiquidGlassButton
                onClick={() => setContexts([])}
                variant="outlined"
                fullWidth
                size="large"
                sx={{ py: 2, fontSize: '1rem' }}
              >
                Back
              </LiquidGlassButton>
              <LiquidGlassButton
                onClick={handleConnect}
                disabled={!selectedContextName}
                fullWidth
                size="large"
                sx={{ py: 2, fontSize: '1rem' }}
              >
                Connect
              </LiquidGlassButton>
            </Box>
          </Box>
        )}
      </GlassPanel>
    </Box>
  )
}
