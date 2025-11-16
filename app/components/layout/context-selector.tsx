'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CloudIcon from '@mui/icons-material/Cloud'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import { useModeStore, useClusterAliases } from '@/lib/core/store'
import FormControl from '@mui/material/FormControl'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

interface ContextSelectorProps {
  collapsed?: boolean
}

export function ContextSelector({ collapsed = false }: ContextSelectorProps) {
  const { mode, selectedContext, setContext, setNamespace } = useModeStore()
  const { getAlias } = useClusterAliases()
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [loading, setLoading] = useState(false)

  const getDisplayName = (contextName: string, clusterName: string) => {
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

        // Auto-select current context if no context selected
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

  if (collapsed) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <CloudIcon sx={{ color: 'primary.main', fontSize: 32 }} />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        p: 2.5,
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: '0.875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'text.primary',
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <CloudIcon sx={{ fontSize: 20 }} />
        Kubernetes Cluster
      </Typography>
    </Box>
  )
}
