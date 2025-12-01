'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ButtonBase from '@mui/material/ButtonBase'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckIcon from '@mui/icons-material/Check'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import GitHubIcon from '@mui/icons-material/GitHub'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { GlassPanel, GlassButton, useTheme } from '@/lib/ui'
import { useModeStore } from '@/lib/core/store'
import { useThemeMode } from '@/app/components/theme-provider'
import { welcomeBackground } from '@/lib/ui/backgrounds'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

interface KubeNamespace {
  name: string
  status: string
}

type WelcomeStep = 'initial' | 'github-required' | 'cluster-selection'

export function WelcomeModal() {
  const { status } = useSession()
  const router = useRouter()
  const { hasCompletedWelcome, setMode, setContext, setNamespace, setHasCompletedWelcome } = useModeStore()
  const { actualTheme, setThemeMode } = useThemeMode()
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const [open, setOpen] = useState(!hasCompletedWelcome)
  const [step, setStep] = useState<WelcomeStep>('initial')
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [selectedContextName, setSelectedContextName] = useState('')
  const [namespaces, setNamespaces] = useState<KubeNamespace[]>([])
  const [selectedNamespace, setSelectedNamespace] = useState('')
  const [loadingNamespaces, setLoadingNamespaces] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifyingConnection, setVerifyingConnection] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clusterMenuAnchor, setClusterMenuAnchor] = useState<null | HTMLElement>(null)
  const [namespaceMenuAnchor, setNamespaceMenuAnchor] = useState<null | HTMLElement>(null)

  // Update open state when hasCompletedWelcome changes
  useEffect(() => {
    setOpen(!hasCompletedWelcome)
  }, [hasCompletedWelcome])

  // Auto-advance to cluster loading if user is authenticated
  useEffect(() => {
    if (status === 'authenticated' && step === 'initial') {
      setStep('github-required')
    }
  }, [status, step])

  // Load namespaces when cluster is selected
  useEffect(() => {
    const loadNamespaces = async () => {
      // Only load namespaces when in cluster-selection step (real mode)
      if (!selectedContextName || step !== 'cluster-selection') {
        setNamespaces([])
        return
      }

      setLoadingNamespaces(true)
      try {
        const response = await fetch(`/api/namespaces?context=${encodeURIComponent(selectedContextName)}`)

        if (!response.ok) {
          const error = await response.json()
          console.error('Failed to fetch namespaces:', error)
          setNamespaces([])
          return
        }

        const data = await response.json()
        console.log('Namespaces loaded:', data)

        if (Array.isArray(data)) {
          setNamespaces(data)
          // Auto-select 'default' if exists
          const defaultNs = data.find((ns: KubeNamespace) => ns.name === 'default')
          if (defaultNs) {
            setSelectedNamespace('default')
          }
        } else {
          console.error('Invalid namespaces response format:', data)
          setNamespaces([])
        }
      } catch (err) {
        console.error('Failed to load namespaces:', err)
        setNamespaces([])
        // Don't block - namespaces are optional
      } finally {
        setLoadingNamespaces(false)
      }
    }

    loadNamespaces()
  }, [selectedContextName, step])

  const handleThemeToggle = () => {
    setThemeMode(actualTheme === 'light' ? 'dark' : 'light')
  }

  const handleDemoMode = async () => {
    // Set all state synchronously first
    setMode('demo')
    setContext(null)
    setNamespace('default')
    setHasCompletedWelcome(true)

    // Set cookie for server-side middleware validation
    document.cookie = 'app-mode=demo; path=/; max-age=31536000; SameSite=Lax'

    // Close modal immediately
    setOpen(false)

    // Navigate to home page
    await router.push('/')

    // Force full page refresh to sync everything
    window.location.reload()
  }

  const handleGitHubLogin = async () => {
    try {
      await signIn('github', {
        callbackUrl: '/',
        redirect: true
      })
    } catch (error) {
      console.error('GitHub sign in error:', error)
      setError('Failed to sign in with GitHub. Please try again.')
    }
  }

  const handleLoadClusters = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contexts')
      const data = await response.json()

      if (response.ok && data.contexts && data.contexts.length > 0) {
        setContexts(data.contexts)
        setStep('cluster-selection')
        // If only one cluster, pre-select it
        if (data.contexts.length === 1) {
          setSelectedContextName(data.contexts[0].name)
        } else {
          // Multiple clusters - don't auto-select, user must choose
          setSelectedContextName('')
        }
      } else {
        throw new Error('No Kubernetes contexts found. Please configure kubectl locally.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Kubernetes contexts')
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async () => {
    if (!selectedContextName) return

    const context = contexts.find((c) => c.name === selectedContextName)
    if (!context) return

    setVerifyingConnection(true)
    setError(null)

    try {
      // Verify cluster connection before proceeding
      const response = await fetch('/api/cluster-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contextName: context.name }),
      })

      if (!response.ok) {
        throw new Error('Failed to connect to cluster. Please check your kubectl configuration.')
      }

      // Connection verified - proceed
      setMode('real')
      setContext({
        name: context.name,
        cluster: context.cluster,
        user: context.user,
      })

      // Set namespace - use selected or fallback to context default or 'default'
      const namespaceToSet = selectedNamespace || context.namespace || 'default'
      setNamespace(namespaceToSet)

      setHasCompletedWelcome(true)

      // Set cookie for server-side middleware validation
      document.cookie = 'app-mode=real; path=/; max-age=31536000; SameSite=Lax'

      // Close modal immediately
      setOpen(false)

      // Navigate to home
      await router.push('/')

      // Force full page refresh
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify cluster connection')
    } finally {
      setVerifyingConnection(false)
    }
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
        flexDirection: 'column',
        zIndex: 9999,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? welcomeBackground.gradient.dark
            : welcomeBackground.gradient.light,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: welcomeBackground.noise.image,
          opacity: (theme) =>
            theme.palette.mode === 'dark'
              ? welcomeBackground.noise.opacity.dark
              : welcomeBackground.noise.opacity.light,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Theme toggle at top */}
      <Box sx={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
        display: 'flex',
        gap: 1,
      }}>
        <Tooltip title={actualTheme === 'light' ? 'Dark mode' : 'Light mode'} arrow>
          <IconButton
            onClick={handleThemeToggle}
            size="medium"
            sx={{
              color: 'text.secondary',
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            {actualTheme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Centered content */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        p: 3,
      }}>
        <Box sx={{
          position: 'relative',
          maxWidth: 680,
          width: '100%',
        }}>
          {/* Grain texture overlay */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
            opacity: (theme) => theme.palette.mode === 'dark' ? 0.4 : 0.3,
            pointerEvents: 'none',
            zIndex: 2,
            mixBlendMode: 'overlay',
          }} />

          {/* GitHub link - outside panel */}
          <Box sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 3,
          }}>
            <Tooltip title="GitHub Repository" arrow>
              <IconButton
                component={Link}
                href="https://github.com/corapoid/orphelix"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: 'text.secondary',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)',
                  }
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <GlassPanel
            sx={{
              width: '100%',
              p: 5,
              position: 'relative',
              zIndex: 1,
            }}
          >

          <Box sx={{ textAlign: 'center', mb: 5, mt: 3 }}>
            {/* Logo/Icon with Glow Effect */}
            <Box
              sx={{
                position: 'relative',
                width: 160,
                height: 'auto',
                margin: '0 auto 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="/logo.svg"
                alt="Orphelix Logo"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                  filter: (theme) => {
                    const baseFilter = theme.palette.mode === 'dark' ? 'none' : 'invert(1)';
                    return `${baseFilter} drop-shadow(0 0 40px rgba(102, 126, 234, 0.6)) drop-shadow(0 0 80px rgba(118, 75, 162, 0.4))`;
                  },
                }}
              />
            </Box>

            {/* App Name */}
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontFamily: '"Momo Trust Display", system-ui, sans-serif',
                letterSpacing: '0.06em',
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

            {step === 'initial' && (
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
                Sign in with GitHub to get started or explore the demo mode.
              </Typography>
            )}

            {step === 'github-required' && (
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
                ORPHELIX connects to your local Kubernetes cluster using kubectl.
                Please ensure kubectl is configured and authenticated on your machine.
              </Typography>
            )}

            {step === 'cluster-selection' && (
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
                Select a cluster to connect. We'll verify the connection before proceeding.
              </Typography>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Step: Initial - GitHub login or Demo */}
          {step === 'initial' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, alignItems: 'center' }}>
              <GlassButton
                onClick={handleGitHubLogin}
                size="large"
                startIcon={<GitHubIcon />}
                sx={{
                  py: 2,
                  fontSize: '1rem',
                  minWidth: 320,
                  justifyContent: 'center',
                  textAlign: 'center',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(30, 30, 46, 0.4)'
                      : 'rgba(255, 255, 255, 0.15)',
                  '&:hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(50, 50, 70, 0.5)'
                        : 'rgba(255, 255, 255, 0.25)',
                  },
                }}
              >
                Sign in with GitHub
              </GlassButton>

              <Typography variant="body2" color="text.secondary" textAlign="center">
                or
              </Typography>

              <GlassButton
                onClick={handleDemoMode}
                variant="outlined"
                size="large"
                sx={{
                  py: 2,
                  fontSize: '1rem',
                  minWidth: 320,
                  justifyContent: 'center',
                  textAlign: 'center',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(30, 30, 46, 0.3)'
                      : 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(50, 50, 70, 0.4)'
                        : 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                Demo
              </GlassButton>
            </Box>
          )}

          {/* Step: GitHub Required - Load clusters */}
          {step === 'github-required' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, alignItems: 'center' }}>
              <GlassButton
                onClick={handleLoadClusters}
                disabled={loading}
                size="large"
                sx={{
                  py: 2,
                  fontSize: '1rem',
                  minWidth: 320,
                  justifyContent: 'center',
                  textAlign: 'center',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(30, 30, 46, 0.4)'
                      : 'rgba(255, 255, 255, 0.15)',
                  '&:hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(50, 50, 70, 0.5)'
                        : 'rgba(255, 255, 255, 0.25)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Load Available Clusters'
                )}
              </GlassButton>

              {!loading && (
                <>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    or
                  </Typography>

                  <GlassButton
                    onClick={handleDemoMode}
                    variant="outlined"
                    size="large"
                    sx={{
                      py: 2,
                      fontSize: '1rem',
                      minWidth: 320,
                      justifyContent: 'center',
                      textAlign: 'center',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(30, 30, 46, 0.3)'
                          : 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark'
                        ? 'rgba(50, 50, 70, 0.4)'
                        : 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                Demo
              </GlassButton>
                </>
              )}
            </Box>
          )}

          {/* Step: Cluster Selection */}
          {step === 'cluster-selection' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Cluster Selector */}
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Select Kubernetes Cluster
                </Typography>
                <ButtonBase
                  onClick={(e) => setClusterMenuAnchor(e.currentTarget)}
                  sx={{
                    width: '100%',
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {selectedContextName ? (
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" fontWeight={600}>
                        {contexts.find((c) => c.name === selectedContextName)?.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {contexts.find((c) => c.name === selectedContextName)?.cluster}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Choose a cluster...
                    </Typography>
                  )}
                  <KeyboardArrowDownIcon />
                </ButtonBase>
                <Menu
                  anchorEl={clusterMenuAnchor}
                  open={Boolean(clusterMenuAnchor)}
                  onClose={() => setClusterMenuAnchor(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  slotProps={{
                    paper: {
                      sx: {
                        minWidth: 400,
                        maxHeight: 400,
                        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                        ...(isGlass && {
                          backdropFilter: 'blur(36px)',
                          WebkitBackdropFilter: 'blur(36px)',
                        }),
                      },
                    },
                  }}
                  sx={{ mt: 1, zIndex: 10001 }}
                >
                  {contexts.map((context) => {
                    const selected = selectedContextName === context.name
                    return (
                      <MenuItem
                        key={context.name}
                        onClick={() => {
                          setSelectedContextName(context.name)
                          setClusterMenuAnchor(null)
                        }}
                        selected={selected}
                        sx={{ py: 1.5, gap: 1.5 }}
                      >
                        {selected ? <CheckIcon sx={{ fontSize: 20 }} /> : <Box sx={{ width: 20 }} />}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {context.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {context.cluster}
                          </Typography>
                        </Box>
                      </MenuItem>
                    )
                  })}
                </Menu>
              </Box>

              {/* Namespace selector (optional) */}
              {selectedContextName && (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                    Namespace (optional)
                  </Typography>
                  <ButtonBase
                    onClick={(e) => !loadingNamespaces && setNamespaceMenuAnchor(e.currentTarget)}
                    disabled={loadingNamespaces}
                    sx={{
                      width: '100%',
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      bgcolor: 'background.paper',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                      '&.Mui-disabled': {
                        opacity: 0.6,
                      },
                    }}
                  >
                    {loadingNamespaces ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={16} />
                        <Typography variant="body2" color="text.secondary">
                          Loading namespaces...
                        </Typography>
                      </Box>
                    ) : selectedNamespace ? (
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body2" fontWeight={600}>
                          {selectedNamespace}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {namespaces.find((ns) => ns.name === selectedNamespace)?.status}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {namespaces.length === 0 ? 'Use cluster default' : 'Choose namespace...'}
                      </Typography>
                    )}
                    <KeyboardArrowDownIcon />
                  </ButtonBase>
                  <Menu
                    anchorEl={namespaceMenuAnchor}
                    open={Boolean(namespaceMenuAnchor)}
                    onClose={() => setNamespaceMenuAnchor(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    slotProps={{
                      paper: {
                        sx: {
                          minWidth: 400,
                          maxHeight: 400,
                          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                          ...(isGlass && {
                            backdropFilter: 'blur(36px)',
                            WebkitBackdropFilter: 'blur(36px)',
                          }),
                        },
                      },
                    }}
                    sx={{ mt: 1, zIndex: 10001 }}
                  >
                    <MenuItem
                      onClick={() => {
                        setSelectedNamespace('')
                        setNamespaceMenuAnchor(null)
                      }}
                      selected={selectedNamespace === ''}
                      sx={{ py: 1.5, gap: 1.5 }}
                    >
                      {selectedNamespace === '' ? <CheckIcon sx={{ fontSize: 20 }} /> : <Box sx={{ width: 20 }} />}
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        Use cluster default
                      </Typography>
                    </MenuItem>
                    {namespaces.map((ns) => {
                      const selected = selectedNamespace === ns.name
                      return (
                        <MenuItem
                          key={ns.name}
                          onClick={() => {
                            setSelectedNamespace(ns.name)
                            setNamespaceMenuAnchor(null)
                          }}
                          selected={selected}
                          sx={{ py: 1.5, gap: 1.5 }}
                        >
                          {selected ? <CheckIcon sx={{ fontSize: 20 }} /> : <Box sx={{ width: 20 }} />}
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {ns.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {ns.status}
                            </Typography>
                          </Box>
                        </MenuItem>
                      )
                    })}
                  </Menu>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <GlassButton
                  onClick={() => {
                    setStep('github-required')
                    setContexts([])
                    setSelectedContextName('')
                  }}
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    py: 2,
                    fontSize: '1rem',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(30, 30, 46, 0.3)'
                        : 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(50, 50, 70, 0.4)'
                          : 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  Back
                </GlassButton>
                <GlassButton
                  onClick={handleConnect}
                  disabled={!selectedContextName || verifyingConnection}
                  fullWidth
                  size="large"
                  sx={{
                    py: 2,
                    fontSize: '1rem',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(30, 30, 46, 0.4)'
                        : 'rgba(255, 255, 255, 0.15)',
                    '&:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(50, 50, 70, 0.5)'
                          : 'rgba(255, 255, 255, 0.25)',
                    },
                  }}
                >
                  {verifyingConnection ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Connect'
                  )}
                </GlassButton>
              </Box>
            </Box>
          )}
        </GlassPanel>
        </Box>
      </Box>
    </Box>
  )
}
