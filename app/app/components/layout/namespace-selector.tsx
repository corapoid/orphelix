'use client'

import { useState, useEffect } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
  const { mode, selectedNamespace, setNamespace } = useModeStore()
  const [namespaces, setNamespaces] = useState<Namespace[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === 'real') {
      fetchNamespaces()
    }
  }, [mode])

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

  if (mode === 'demo') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
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
            <Typography fontWeight={600} sx={{ fontSize: '0.75rem' }}>
              demo
            </Typography>
          )}
          sx={{
            fontSize: '0.75rem',
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
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
      <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
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
          if (!value) return <Typography color="text.secondary" sx={{ fontSize: '0.75rem' }}>Select...</Typography>
          return (
            <Typography fontWeight={600} sx={{ fontSize: '0.75rem' }}>
              {value}
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
        {namespaces.map((namespace) => (
          <MenuItem
            key={namespace.name}
            value={namespace.name}
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
            {namespace.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
