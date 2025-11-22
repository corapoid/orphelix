'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import ButtonBase from '@mui/material/ButtonBase'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckIcon from '@mui/icons-material/Check'
import { useModeStore, useClusterAliases } from '@/lib/core/store'
import { useTheme } from '@orphelix/ui'

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
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchor)
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'

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
    setMenuAnchor(null)
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

  const hasMultipleContexts = contexts.length > 1

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
          Cluster:
        </Typography>
        {hasMultipleContexts ? (
          <ButtonBase
            disableRipple
            onClick={(event) => setMenuAnchor(event.currentTarget)}
            sx={{
              px: 1,
              py: 0.4,
              borderRadius: (theme) => `${theme.shape.borderRadius}px`,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {selectedContext ? (
              (() => {
                const context = contexts.find((c) => c.name === selectedContext.name)
                const displayName = context ? getDisplayName(context.name) : selectedContext.name
                const truncated = truncateText(displayName, 34)
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
              })()
            ) : (
              <Typography color="text.secondary" sx={{ fontSize: '0.75rem' }}>Select...</Typography>
            )}
            <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
          </ButtonBase>
        ) : (
          <Typography fontWeight={600} sx={{ fontSize: '0.75rem' }}>
            {selectedContext ? getDisplayName(selectedContext.name) : 'N/A'}
          </Typography>
        )}
      </Box>
      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          mt: 1,
          '& .MuiPaper-root': {
            minWidth: 240,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            ...(isGlass && {
              backdropFilter: 'blur(36px)',
              WebkitBackdropFilter: 'blur(36px)',
            }),
          },
        }}
      >
        {contexts.map((context) => {
          const alias = getAlias(context.name)
          const primaryLabel = alias || context.name
          const secondaryLabel = context.cluster
          const selected = selectedContext?.name === context.name
          return (
            <MenuItem
              key={context.name}
              onClick={() => handleContextChange(context.name)}
              selected={selected}
              sx={{ py: 0.75, gap: 1 }}
            >
              {selected ? <CheckIcon sx={{ fontSize: 18 }} /> : <Box sx={{ width: 18 }} />}
              <Box sx={{ width: '100%' }}>
                <Typography fontWeight={600} sx={{ fontSize: '0.8rem' }} noWrap>
                  {primaryLabel}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {secondaryLabel}
                </Typography>
              </Box>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
