'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { useClusterAliases } from '@/lib/core/store'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

export function ClusterAliases() {
  const { aliases, setAlias, removeAlias } = useClusterAliases()
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [loading, setLoading] = useState(false)
  const [editingContext, setEditingContext] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    fetchContexts()
  }, [])

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
        No Kubernetes contexts found. Please configure kubectl first or switch to Real Cluster mode in the Cluster tab.
      </Alert>
    )
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Set friendly names (aliases) for your Kubernetes clusters. These will be displayed instead of the full context names throughout the application.
      </Typography>

      <List sx={{ bgcolor: 'background.default', borderRadius: 1 }}>
        {contexts.map((context) => {
          const currentAlias = aliases[context.name]
          const isEditing = editingContext === context.name

          return (
            <ListItem
              key={context.name}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                py: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {context.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Cluster: {context.cluster}
                  </Typography>
                </Box>

                {!isEditing && (
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
                )}
              </Box>

              {isEditing ? (
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <TextField
                    size="small"
                    fullWidth
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Enter friendly name"
                    autoFocus
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
                </Box>
              ) : currentAlias ? (
                <Paper sx={{ p: 1.5, bgcolor: 'primary.main', color: 'white', mt: 1 }}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Alias:
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {currentAlias}
                  </Typography>
                </Paper>
              ) : (
                <Alert severity="info" sx={{ mt: 1 }}>
                  <Typography variant="caption">
                    No alias set. Click the edit icon to add one.
                  </Typography>
                </Alert>
              )}
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
