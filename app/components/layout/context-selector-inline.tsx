'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import CloudIcon from '@mui/icons-material/Cloud'
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

  if (mode === 'mock') {
    const demoDisplayName = getDisplayName('demo-cluster')
    return (
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
          borderRadius: 2,
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
        <CloudIcon sx={{ fontSize: 18, color: 'primary.main' }} />
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Cluster:
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {demoDisplayName}
        </Typography>
      </Paper>
    )
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Cluster:
        </Typography>
        <Box sx={{ py: 0.5, px: 1 }}>
          <CircularProgress size={20} />
        </Box>
      </Box>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1,
        borderRadius: 2,
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
      <CloudIcon sx={{ fontSize: 18, color: 'primary.main' }} />
      <Typography variant="caption" color="text.secondary" fontWeight={600}>
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
          if (!value) return <Typography variant="body2" color="text.secondary">Select...</Typography>
          const context = contexts.find((c) => c.name === value)
          if (!context) return value
          const displayName = getDisplayName(context.name)
          const truncated = truncateText(displayName, 40)

          if (displayName !== truncated) {
            return (
              <Tooltip title={displayName} placement="bottom">
                <Typography variant="body2" fontWeight={600}>
                  {truncated}
                </Typography>
              </Tooltip>
            )
          }

          return (
            <Typography variant="body2" fontWeight={600}>
              {displayName}
            </Typography>
          )
        }}
        sx={{
          fontSize: '0.875rem',
          '&:hover': {
            bgcolor: 'transparent',
          },
          '& .MuiSelect-select': {
            py: 0,
            px: 0,
          },
        }}
      >
        {contexts.map((context, index) => {
          const displayName = getDisplayName(context.name)
          const alias = getAlias(context.name)

          return (
            <Box key={context.name}>
              {index > 0 && <Divider sx={{ my: 0.5 }} />}
              <MenuItem
                value={context.name}
                sx={{
                  py: 1,
                  px: 2,
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
                  <Typography variant="body2" fontWeight={500} noWrap>
                    {displayName}
                  </Typography>
                  {alias && (
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ opacity: 0.7 }}>
                      {context.cluster}
                    </Typography>
                  )}
                </Box>
              </MenuItem>
            </Box>
          )
        })}
      </Select>
    </Paper>
  )
}
