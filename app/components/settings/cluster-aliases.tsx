'use client'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { useClusterAliases, useModeStore } from '@/lib/core/store'
interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}
export function ClusterAliases() {
  const { aliases, setAlias, removeAlias } = useClusterAliases()
  const mode = useModeStore((state) => state.mode)
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [loading, setLoading] = useState(false)
  const [editingContext, setEditingContext] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    if (mode === 'mock') {
      // In demo mode, show a mock demo cluster
      setContexts([{
        name: 'demo-cluster',
        cluster: 'demo-cluster',
        user: 'demo-user',
        current: true,
      }])
      setLoading(false)
    } else {
      fetchContexts()
    }
  }, [mode])
  const fetchContexts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/contexts')
      const data = await response.json()
      if (response.ok && data.contexts) {
        setContexts(data.contexts)
      }
    } catch (err) {
      console.error('Failed to fetch contexts:', err)
    } finally {
      setLoading(false)
    }
  }
  const handleEdit = (contextName: string) => {
    setEditingContext(contextName)
    setEditValue(aliases[contextName] || contextName)
  }
  const handleSave = (contextName: string) => {
    if (editValue.trim() && editValue !== contextName) {
      setAlias(contextName, editValue.trim())
    } else if (editValue === contextName) {
      removeAlias(contextName)
    }
    setEditingContext(null)
    setEditValue('')
  }
  const handleCancel = () => {
    setEditingContext(null)
    setEditValue('')
  }
  const handleRemove = (contextName: string) => {
    removeAlias(contextName)
  }
  if (loading) {
    return <Typography>Loading contexts...</Typography>
  }
  if (contexts.length === 0) {
    return (
      <Alert severity="info">
        {mode === 'mock'
          ? 'Demo cluster alias not available.'
          : 'No Kubernetes contexts found. Please configure kubectl first.'}
      </Alert>
    )
  }
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        {mode === 'mock'
          ? 'Set a friendly name (alias) for the demo cluster. This will be displayed instead of "demo-cluster" throughout the application.'
          : 'Set friendly names (aliases) for your Kubernetes clusters. These will be displayed instead of the full context names throughout the application.'}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {contexts.map((context) => {
          const currentAlias = aliases[context.name]
          const isEditing = editingContext === context.name
          return (
            <Paper
              key={context.name}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 30, 46, 0.6)'
                    : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(209, 213, 219, 0.4)',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
                    : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {isEditing ? (
                  <>
                    <TextField
                      size="small"
                      fullWidth
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSave(context.name)
                        } else if (e.key === 'Escape') {
                          handleCancel()
                        }
                      }}
                      placeholder="Enter friendly name"
                      autoFocus
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleSave(context.name)}
                      color="primary"
                    >
                      <SaveIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={handleCancel}>
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {currentAlias || context.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cluster: {context.cluster}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(context.name)}
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      {currentAlias && (
                        <IconButton
                          size="small"
                          onClick={() => handleRemove(context.name)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </>
                )}
              </Box>
            </Paper>
          )
        })}
      </Box>
    </Box>
  )
}
