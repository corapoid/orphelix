'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { AI_FEATURES } from '@/lib/config/ai-features'

const LOCAL_STORAGE_KEY = 'kubevista_openai_key'

export function AISettings() {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const [hasKey, setHasKey] = useState(false)

  useEffect(() => {
    // Load existing key from localStorage
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      setApiKey(stored)
      setHasKey(true)
    }
  }, [])

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem(LOCAL_STORAGE_KEY, apiKey.trim())
      setHasKey(true)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)

      // Dispatch event so other components know the key was updated
      window.dispatchEvent(new Event('openai-key-updated'))
    }
  }

  const handleClear = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setApiKey('')
    setHasKey(false)
    window.dispatchEvent(new Event('openai-key-updated'))
  }

  const availableFeatures = Object.values(AI_FEATURES).filter(f => f.enabled)

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Enable AI-powered features by providing your OpenAI API key. The key is stored locally in your browser and never sent to our servers.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="OpenAI API Key"
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowKey(!showKey)}
                  edge="end"
                  size="small"
                >
                  {showKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText="Get your API key from https://platform.openai.com/api-keys"
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!apiKey.trim() || apiKey === localStorage.getItem(LOCAL_STORAGE_KEY)}
        >
          Save API Key
        </Button>
        {hasKey && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleClear}
          >
            Clear Key
          </Button>
        )}
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          API key saved successfully!
        </Alert>
      )}

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon fontSize="small" />
          AI-Powered Features
        </Typography>
        <List disablePadding>
          {availableFeatures.map((feature) => {
            const isAvailable = hasKey && feature.requiredProvider === 'openai'
            return (
              <ListItem key={feature.id} sx={{ px: 0 }}>
                <ListItemIcon>
                  {isAvailable ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="disabled" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {feature.name}
                      {isAvailable && (
                        <Chip label="Enabled" size="small" color="success" />
                      )}
                    </Box>
                  }
                  secondary={feature.description}
                />
              </ListItem>
            )
          })}
        </List>
      </Box>

      {!hasKey && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <AlertTitle>No API Key Configured</AlertTitle>
          AI-powered features are currently disabled. Add your OpenAI API key to enable intelligent file matching and other AI features.
        </Alert>
      )}
    </Box>
  )
}
