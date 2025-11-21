'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import { useModeStore, useClusterAliases } from '@/lib/core/store'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

export function ContextSelectorInline() {
  const { mode, selectedContext, setContext, setNamespace, setClusterConnected, setConnectionError } = useModeStore()
  const { getAlias } = useClusterAliases()
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [loading, setLoading] = useState(false)

  const getDisplayName = (contextName: string) => {
    const alias = getAlias(contextName)
    return alias || contextName
  }

  const truncateText = (text: string, maxLength: number = 25) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
  }

  const testConnection = async () => {
    try {
      const response = await fetch('/api/test-connection')
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Failed to connect to cluster')
      }

      setClusterConnected(true)
      setConnectionError(null)
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to connect to cluster'
      setClusterConnected(false)
      setConnectionError(errorMsg)
      return false
    }
  }

  useEffect(() => {
    if (mode === 'real') {
      fetchContexts()
    }
  }, [mode])

  // Test connection when context changes
  useEffect(() => {
    if (mode === 'real' && selectedContext) {
      testConnection()
    }
  }, [selectedContext, mode])

  const fetchContexts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/contexts')
      const data = await response.json()

      if (response.ok && data.contexts) {
        setContexts(data.contexts)

        const currentContext = data.contexts.find((ctx: KubeContext) => ctx.current)
        if (currentContext && !selectedContext) {
          setContext({
            name: currentContext.name,
            cluster: currentContext.cluster,
            user: currentContext.user,
          })

          if (currentContext.namespace) {
            setNamespace(currentContext.namespace)
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch contexts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleContextChange = (contextName: string) => {
    const context = contexts.find((c) => c.name === contextName)
    if (context) {
      setContext({
        name: context.name,
        cluster: context.cluster,
        user: context.user,
      })

      if (context.namespace) {
        setNamespace(context.namespace)
      }
    }
  }

  if (mode === 'demo') {
    const demoDisplayName = getDisplayName('demo-cluster')
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
          Cluster:
        </Typography>
        <Typography fontWeight={600} sx={{ fontSize: '0.75rem' }}>
          {demoDisplayName}
        </Typography>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
          Cluster:
        </Typography>
        <Box sx={{ py: 0.5, px: 1 }}>
          <CircularProgress size={20} />
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
        Cluster:
      </Typography>
      <Select
        value={selectedContext?.name || ''}
        onChange={(e) => handleContextChange(e.target.value)}
        displayEmpty
        variant="standard"
        disableUnderline
        autoWidth
        renderValue={(value) => {
          if (!value) return <Typography color="text.secondary" sx={{ fontSize: '0.75rem' }}>Select...</Typography>
          const context = contexts.find((c) => c.name === value)
          if (!context) return value
          const displayName = getDisplayName(context.name)
          const truncated = truncateText(displayName, 40)

          if (displayName !== truncated) {
            return (
              <Tooltip title={displayName} placement="bottom">
                <Typography fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                  {truncated}
                </Typography>
              </Tooltip>
            )
          }

          return (
            <Typography fontWeight={600} sx={{ fontSize: '0.75rem' }}>
              {displayName}
            </Typography>
          )
        }}
        sx={{
          fontSize: '0.75rem',
          '&:hover': {
            bgcolor: 'action.hover',
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          },
          '& .MuiSelect-select': {
            py: 0.5,
            px: 1,
          },
        }}
      >
        {contexts.map((context) => {
          const displayName = getDisplayName(context.name)
          const alias = getAlias(context.name)

          return (
            <MenuItem
              key={context.name}
              value={context.name}
              sx={{
                py: 0.5,
                px: 1.5,
                minHeight: 'auto',
                fontSize: '0.75rem',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box component="span" sx={{ fontWeight: 500 }}>
                  {displayName}
                </Box>
                {alias && (
                  <Box component="span" sx={{ color: 'text.secondary', opacity: 0.7, ml: 1 }}>
                    ({context.cluster})
                  </Box>
                )}
              </Box>
            </MenuItem>
          )
        })}
      </Select>
    </Box>
  )
}
