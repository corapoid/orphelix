'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import FolderIcon from '@mui/icons-material/Folder'
import CircularProgress from '@mui/material/CircularProgress'
import { useModeStore } from '@/lib/core/store'
import FormControl from '@mui/material/FormControl'

interface NamespaceSelectorCompactProps {
  collapsed?: boolean
}

export function NamespaceSelectorCompact({ collapsed = false }: NamespaceSelectorCompactProps) {
  const { mode, selectedNamespace, setNamespace, selectedContext } = useModeStore()
  const [namespaces, setNamespaces] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === 'real' && selectedContext) {
      fetchNamespaces()
    }
  }, [mode, selectedContext])

  const fetchNamespaces = async () => {
    setLoading(true)
    try {
      const context = selectedContext?.name || ''
      const response = await fetch(`/api/namespaces?context=${context}`)
      const data = await response.json()

      if (response.ok && data.namespaces) {
        const namespaceNames = data.namespaces.map((ns: { name: string }) => ns.name)
        setNamespaces(namespaceNames)
      }
    } catch (err) {
      console.error('Failed to fetch namespaces:', err)
    } finally {
      setLoading(false)
    }
  }

  if (mode !== 'real') {
    return null
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
        <FolderIcon sx={{ color: 'primary.main', fontSize: 32 }} />
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
          mb: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <FolderIcon sx={{ fontSize: 20 }} />
        Namespace
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <FormControl fullWidth size="small">
          <Select
            value={selectedNamespace || 'all'}
            onChange={(e) => setNamespace(e.target.value === 'all' ? '' : e.target.value)}
            displayEmpty
            renderValue={(value) => {
              if (!value || value === 'all') {
                return (
                  <Typography variant="body2" fontWeight={500}>
                    All namespaces
                  </Typography>
                )
              }
              return (
                <Typography variant="body2" fontWeight={500}>
                  {value}
                </Typography>
              )
            }}
            sx={{
              fontSize: '0.875rem',
              bgcolor: 'background.default',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
            }}
          >
            <MenuItem value="all">
              <Typography variant="body2" fontWeight={500}>
                All namespaces
              </Typography>
            </MenuItem>
            {namespaces.map((ns) => (
              <MenuItem key={ns} value={ns}>
                <Typography variant="body2" fontWeight={500}>
                  {ns}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  )
}
