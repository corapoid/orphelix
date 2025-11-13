'use client'

import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Radio from '@mui/material/Radio'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import { useModeStore } from '@/lib/core/store'

interface ModeSelectorProps {
  open: boolean
  onClose: () => void
}

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

export function ModeSelector({ open, onClose }: ModeSelectorProps) {
  const { mode, setMode, selectedContext, setContext } = useModeStore()
  const [tempMode, setTempMode] = useState<'mock' | 'real'>(mode)
  const [tempContext, setTempContext] = useState(selectedContext?.name || '')
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open && tempMode === 'real') {
      fetchContexts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, tempMode])

  const fetchContexts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contexts')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch contexts')
      }

      setContexts(data.contexts || [])

      // Auto-select current context if available
      const currentContext = data.contexts.find((ctx: KubeContext) => ctx.current)
      if (currentContext && !tempContext) {
        setTempContext(currentContext.name)
      }
    } catch (err) {
      console.error('Failed to fetch kubectl contexts:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch contexts')
      setContexts([])
    } finally {
      setLoading(false)
    }
  }

  const handleModeChange = (newMode: 'mock' | 'real') => {
    setTempMode(newMode)
    if (newMode === 'real' && contexts.length === 0) {
      fetchContexts()
    }
  }

  const handleContextSelect = (contextName: string) => {
    setTempContext(contextName)
  }

  const handleConfirm = () => {
    setMode(tempMode)

    if (tempMode === 'real' && tempContext) {
      const context = contexts.find((c) => c.name === tempContext)
      if (context) {
        setContext({
          name: context.name,
          cluster: context.cluster,
          user: context.user,
        })
      }
    } else {
      setContext(null)
    }

    onClose()
  }

  const handleCancel = () => {
    // Reset to current values
    setTempMode(mode)
    setTempContext(selectedContext?.name || '')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Select Mode</DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>Mode Selection</AlertTitle>
          Choose between <strong>Demo Mode</strong> (mock data) or <strong>Real Cluster</strong> (live data from Kubernetes).
        </Alert>

        <Box sx={{ mb: 3 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleModeChange('mock')} selected={tempMode === 'mock'}>
                <Radio
                  checked={tempMode === 'mock'}
                  onChange={() => handleModeChange('mock')}
                  value="mock"
                />
                <ListItemText
                  primary="Demo Mode"
                  secondary="Use realistic mock data - no cluster required"
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleModeChange('real')} selected={tempMode === 'real'}>
                <Radio
                  checked={tempMode === 'real'}
                  onChange={() => handleModeChange('real')}
                  value="real"
                />
                <ListItemText
                  primary="Real Cluster"
                  secondary="Connect to a live Kubernetes cluster"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {tempMode === 'real' && (
          <Box>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <AlertTitle>Kubernetes Context Required</AlertTitle>
              Select a context from your kubeconfig. Make sure kubectl is configured and you have access to the cluster.
            </Alert>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>Failed to Load Contexts</AlertTitle>
                {error}
                <Button size="small" onClick={fetchContexts} sx={{ mt: 1 }}>
                  Retry
                </Button>
              </Alert>
            ) : contexts.length === 0 ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                No Kubernetes contexts found. Please configure kubectl first.
              </Alert>
            ) : (
              <List>
                {contexts.map((context) => (
                  <ListItem key={context.name} disablePadding>
                    <ListItemButton
                      onClick={() => handleContextSelect(context.name)}
                      selected={tempContext === context.name}
                    >
                      <Radio
                        checked={tempContext === context.name}
                        onChange={() => handleContextSelect(context.name)}
                        value={context.name}
                      />
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {context.name}
                            {context.current && (
                              <Chip label="Current" size="small" color="primary" />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box component="span">
                            Cluster: {context.cluster}
                            {context.namespace && ` • Namespace: ${context.namespace}`}
                          </Box>
                        }
                        primaryTypographyProps={{ component: 'div' }}
                        secondaryTypographyProps={{ component: 'div' }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={tempMode === 'real' && !tempContext}
        >
          {tempMode === 'mock' ? 'Use Demo Mode' : 'Connect'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
