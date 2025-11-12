'use client'

import { useState, useEffect } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { useModeStore } from '@/lib/store'

interface Namespace {
  name: string
  status: string
  age: string
}

export function NamespaceSelector() {
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
      const data = await response.json()
      setNamespaces(data.namespaces || [])
    } catch (error) {
      console.error('Failed to fetch namespaces:', error)
      setNamespaces([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event: { target: { value: string } }) => {
    setNamespace(event.target.value)
  }

  if (mode === 'mock') {
    return null
  }

  return (
    <Tooltip title="Select Kubernetes namespace" arrow>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="namespace-selector-label" sx={{ color: 'inherit' }}>
          Namespace
        </InputLabel>
        <Select
          labelId="namespace-selector-label"
          id="namespace-selector"
          value={selectedNamespace}
          label="Namespace"
          onChange={handleChange}
          disabled={loading}
          sx={{
            color: 'inherit',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '.MuiSvgIcon-root': {
              color: 'inherit',
            },
          }}
        >
          {loading ? (
            <MenuItem value={selectedNamespace}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                Loading...
              </Box>
            </MenuItem>
          ) : namespaces.length === 0 ? (
            <MenuItem value="default">default</MenuItem>
          ) : (
            namespaces.map((ns) => (
              <MenuItem key={ns.name} value={ns.name}>
                {ns.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Tooltip>
  )
}
