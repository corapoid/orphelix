'use client'

import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { LiquidGlassButton } from '@/app/components/common/liquid-glass-button'
import { useModeStore } from '@/lib/core/store'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

export function WelcomeModal() {
  const { hasCompletedWelcome, setMode, setContext, setNamespace, setHasCompletedWelcome } = useModeStore()
  const [open, setOpen] = useState(!hasCompletedWelcome)
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [selectedContextName, setSelectedContextName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Update open state when hasCompletedWelcome changes
  useEffect(() => {
    setOpen(!hasCompletedWelcome)
  }, [hasCompletedWelcome])

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

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          borderRadius: 4,
          backdropFilter: 'blur(40px)',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 46, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          {/* Logo/Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            }}
          >
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
              O
            </Typography>
          </Box>

          {/* App Name */}
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            Orphelix
          </Typography>

          {/* Welcome Message */}
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Modern Kubernetes Dashboard
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
            Connect to your Kubernetes cluster to monitor deployments, pods, services, and more.
            Or explore the demo mode to see what Orphelix can do.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {contexts.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <LiquidGlassButton
              onClick={handleRealMode}
              disabled={loading}
              fullWidth
              size="large"
              sx={{ py: 1.5 }}
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
              fullWidth
              size="large"
              sx={{ py: 1.5 }}
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
              >
                Back
              </LiquidGlassButton>
              <LiquidGlassButton
                onClick={handleConnect}
                disabled={!selectedContextName}
                fullWidth
                size="large"
              >
                Connect
              </LiquidGlassButton>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}
