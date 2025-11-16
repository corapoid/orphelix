'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import { useModeStore, useClusterAliases } from '@/lib/core/store'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

export function ContextSelectorInline() {
  const { mode, selectedContext, setContext, setNamespace } = useModeStore()
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

  useEffect(() => {
    if (mode === 'real') {
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
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Cluster:
        </Typography>
        <Select
          value="demo"
          disabled
          variant="standard"
          disableUnderline
          autoWidth
          IconComponent={() => null}
          renderValue={() => (
            <Typography variant="body2" fontWeight={600}>
              Demo Mode
            </Typography>
          )}
          sx={{
            fontSize: '0.875rem',
            '& .MuiSelect-select': {
              py: 0.5,
              px: 1,
            },
          }}
        >
          <MenuItem value="demo">Demo Mode</MenuItem>
        </Select>
      </Box>
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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            bgcolor: 'action.hover',
            borderRadius: 1,
          },
          '& .MuiSelect-select': {
            py: 0.5,
            px: 1,
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
    </Box>
  )
}
