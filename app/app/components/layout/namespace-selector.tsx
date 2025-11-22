'use client'

import { useState, useEffect } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckIcon from '@mui/icons-material/Check'
import { useModeStore } from '@/lib/core/store'
import { useTheme } from '@orphelix/ui'

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
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchor)
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'

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

  const truncateText = (text: string, maxLength: number = 25) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
  }

  const handleChange = (namespaceName: string) => {
    setNamespace(namespaceName)
    setMenuAnchor(null)
  }

  if (mode === 'demo') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
          Namespace:
        </Typography>
        <Typography fontWeight={600} sx={{ fontSize: '0.75rem' }}>
          demo
        </Typography>
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
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, width: '100%' }}>
        <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
          Namespace:
        </Typography>
        <ButtonBase
          disableRipple
          onClick={(event) => setMenuAnchor(event.currentTarget)}
          sx={{
            pl: 1,
            pr: 0,
            py: 0.4,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          {selectedNamespace ? (
            (() => {
              const truncated = truncateText(selectedNamespace, 34)
              if (truncated !== selectedNamespace) {
                return (
                  <Typography fontWeight={600} sx={{ fontSize: '0.75rem', color: 'text.primary' }} title={selectedNamespace}>
                    {truncated}
                  </Typography>
                )
              }
              return (
                <Typography fontWeight={600} sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
                  {selectedNamespace}
                </Typography>
              )
            })()
          ) : (
            <Typography color="text.secondary" sx={{ fontSize: '0.75rem' }}>Select...</Typography>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <KeyboardArrowDownIcon sx={{ fontSize: 18, ml: 0.25 }} />
        </ButtonBase>
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
            minWidth: 200,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            ...(isGlass && {
              backdropFilter: 'blur(36px)',
              WebkitBackdropFilter: 'blur(36px)',
            }),
          },
        }}
      >
        {namespaces.map((namespace) => (
          <MenuItem
            key={namespace.name}
            onClick={() => handleChange(namespace.name)}
            selected={selectedNamespace === namespace.name}
            sx={{ py: 0.75, gap: 1 }}
          >
            {selectedNamespace === namespace.name ? <CheckIcon sx={{ fontSize: 18 }} /> : <Box sx={{ width: 18 }} />}
            <Typography fontWeight={600} sx={{ fontSize: '0.8rem' }}>
              {namespace.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
