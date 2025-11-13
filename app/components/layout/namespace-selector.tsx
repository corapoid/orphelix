'use client'

import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { useModeStore } from '@/lib/core/store'

interface Namespace {
  name: string
  status: string
  age: string
}

interface NamespaceSelectorProps {
  fullWidth?: boolean
}

export function NamespaceSelector({ fullWidth = false }: NamespaceSelectorProps) {
  const { mode, selectedNamespace, setNamespace } = useModeStore()
  const [namespaces, setNamespaces] = useState<Namespace[]>([])
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState(selectedNamespace)

  useEffect(() => {
    if (mode === 'real') {
      fetchNamespaces()
    }
  }, [mode])

  useEffect(() => {
    setInputValue(selectedNamespace)
  }, [selectedNamespace])

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

  const handleChange = (_event: unknown, newValue: string | null) => {
    if (newValue) {
      setNamespace(newValue)
    }
  }

  const handleInputChange = (_event: unknown, newInputValue: string) => {
    setInputValue(newInputValue)
  }

  if (mode === 'mock') {
    return null
  }

  const options = namespaces.length > 0
    ? namespaces.map((ns) => ns.name)
    : []

  return (
    <Tooltip
      title={namespaces.length === 0
        ? "Type namespace name manually (API list unavailable)"
        : "Select or type namespace"
      }
      arrow
    >
      <Box sx={{ minWidth: fullWidth ? undefined : 200, width: fullWidth ? '100%' : undefined }}>
        <Autocomplete
          freeSolo
          size="small"
          options={options}
          value={selectedNamespace}
          inputValue={inputValue}
          onChange={handleChange}
          onInputChange={handleInputChange}
          onBlur={() => {
            if (inputValue && inputValue !== selectedNamespace) {
              setNamespace(inputValue)
            }
          }}
          disabled={loading}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Namespace"
              placeholder="Enter namespace..."
              required
              error={!selectedNamespace}
              helperText={!selectedNamespace ? 'Required' : ''}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'inherit',
                },
                '& .MuiOutlinedInput-root': {
                  color: 'inherit',
                  '& fieldset': {
                    borderColor: !selectedNamespace ? 'error.main' : 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: !selectedNamespace ? 'error.main' : 'rgba(255, 255, 255, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: !selectedNamespace ? 'error.main' : 'primary.main',
                  },
                },
                '& .MuiSvgIcon-root': {
                  color: 'inherit',
                },
                '& .MuiFormHelperText-root': {
                  color: 'error.main',
                },
              }}
            />
          )}
        />
      </Box>
    </Tooltip>
  )
}
