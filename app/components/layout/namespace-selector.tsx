'use client'

import { useState, useEffect } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useModeStore } from '@/lib/core/store'

interface Namespace {
  name: string
  status: string
  age: string
}

interface NamespaceSelectorProps {
  onError?: (error: string) => void
}

export function NamespaceSelector({ onError }: NamespaceSelectorProps) {
  const { mode, selectedNamespace, setNamespace, clusterConnected, connectionError } = useModeStore()
  const [namespaces, setNamespaces] = useState<Namespace[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === 'real' && clusterConnected) {
      fetchNamespaces()
    }
  }, [mode, clusterConnected])

  const fetchNamespaces = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/namespaces')
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to fetch namespaces')
      }
      const data = await response.json()
      setNamespaces(data || [])
      if (onError && data.length === 0) {
        onError('No namespaces found in the cluster')
      }
    } catch (error) {
      console.error('Failed to fetch namespaces:', error)
      const errorMsg = error instanceof Error ? error.message : 'Failed to fetch namespaces'
      if (onError) {
        onError(errorMsg)
      }
      setNamespaces([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (namespaceName: string) => {
    setNamespace(namespaceName)
  }

  if (mode === 'mock') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Namespace:
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
              demo
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
          <MenuItem value="demo">demo</MenuItem>
        </Select>
      </Box>
    )
  }

  if (!clusterConnected) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="error" fontWeight={600}>
          Connection Error
        </Typography>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Namespace:
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
        Namespace:
      </Typography>
      <Select
        value={selectedNamespace || ''}
        onChange={(e) => handleChange(e.target.value)}
        displayEmpty
        variant="standard"
        disableUnderline
        autoWidth
        renderValue={(value) => {
          if (!value) return <Typography variant="body2" color="text.secondary">Select...</Typography>
          return (
            <Typography variant="body2" fontWeight={600}>
              {value}
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
        {namespaces.map((namespace, index) => (
          <Box key={namespace.name}>
            {index > 0 && <Divider sx={{ my: 0.5 }} />}
            <MenuItem
              value={namespace.name}
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
              <Typography variant="body2" fontWeight={500}>
                {namespace.name}
              </Typography>
            </MenuItem>
          </Box>
        ))}
      </Select>
    </Box>
  )
}
