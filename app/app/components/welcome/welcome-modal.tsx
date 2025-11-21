'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
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
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { GlassPanel, GlassButton } from '@orphelix/ui'
import { useModeStore } from '@/lib/core/store'
import { useThemeMode } from '@/app/components/theme-provider'

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
  const pathname = usePathname()
  const { hasCompletedWelcome, setMode, setContext, setNamespace, setHasCompletedWelcome } = useModeStore()
  const { actualTheme, setThemeMode } = useThemeMode()
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

  const isValidRoute = (path: string) => {
    // List of valid routes in the app
    const validRoutes = [
      '/',
      '/deployments',
      '/statefulsets',
      '/daemonsets',
      '/pods',
      '/jobs',
      '/cronjobs',
      '/services',
      '/ingress',
      '/configmaps',
      '/secrets',
      '/namespaces',
      '/nodes',
      '/hpa',
      '/pv',
      '/events',
      '/labels',
      '/topology',
      '/settings',
      '/repo-browser',
    ]

    // Check if path matches valid routes or dynamic routes (e.g., /pods/[name])
    return validRoutes.some(route => path === route || path.startsWith(route + '/'))
  }

  const handleDemoMode = () => {
    setMode('demo')
    setContext(null) // Clear any real cluster context
    setNamespace('default') // Set default namespace for demo
    setHasCompletedWelcome(true)
    setOpen(false)

    // Set cookie for server-side middleware validation
    document.cookie = 'app-mode=demo; path=/; max-age=31536000; SameSite=Lax'

    // Redirect to home if on invalid route
    if (!isValidRoute(pathname)) {
      router.push('/')
    }
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
      setOpen(false)

      // Set cookie for server-side middleware validation
      document.cookie = 'app-mode=real; path=/; max-age=31536000; SameSite=Lax'

      // Redirect to home if on invalid route
      if (!isValidRoute(pathname)) {
        router.push('/')
      }
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
            ? 'radial-gradient(ellipse at top, rgba(102, 126, 234, 0.2), transparent 50%), radial-gradient(ellipse at bottom, rgba(118, 75, 162, 0.2), transparent 50%), linear-gradient(180deg, rgb(10, 10, 20) 0%, rgb(15, 15, 25) 100%)'
            : 'radial-gradient(ellipse at top, rgba(102, 126, 234, 0.12), transparent 50%), radial-gradient(ellipse at bottom, rgba(118, 75, 162, 0.12), transparent 50%), linear-gradient(180deg, rgb(250, 250, 255) 0%, rgb(240, 242, 250) 100%)',
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
                href="https://github.com/dmakowski-rasp/kubevista"
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

          {/* Step: Cluster Selection */}
          {step === 'cluster-selection' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="cluster-select-label">Select Kubernetes Cluster</InputLabel>
                <Select
                  labelId="cluster-select-label"
                  id="cluster-select"
                  value={selectedContextName}
                  label="Select Kubernetes Cluster"
                  onChange={(e) => setSelectedContextName(e.target.value)}
                  displayEmpty={false}
                  MenuProps={{
                    sx: {
                      zIndex: 10000,
                    }
                  }}
                >
                  {selectedContextName === '' && (
                    <MenuItem value="" disabled>
                      <Typography variant="body2" color="text.secondary">
                        Choose a cluster...
                      </Typography>
                    </MenuItem>
                  )}
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

              {/* Namespace selector (optional) */}
              {selectedContextName && (
                <FormControl fullWidth>
                  <InputLabel id="namespace-select-label">Namespace (optional)</InputLabel>
                  <Select
                    labelId="namespace-select-label"
                    id="namespace-select"
                    value={selectedNamespace}
                    label="Namespace (optional)"
                    onChange={(e) => setSelectedNamespace(e.target.value)}
                    disabled={loadingNamespaces}
                    endAdornment={
                      loadingNamespaces ? (
                        <Box sx={{ position: 'absolute', right: 40, display: 'flex', alignItems: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : null
                    }
                    MenuProps={{
                      sx: {
                        zIndex: 10000,
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>
                        {loadingNamespaces
                          ? 'Loading namespaces...'
                          : namespaces.length === 0
                          ? 'Unable to load namespaces (using default)'
                          : 'Use cluster default'}
                      </em>
                    </MenuItem>
                    {namespaces.map((ns) => (
                      <MenuItem key={ns.name} value={ns.name}>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {ns.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {ns.status}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
