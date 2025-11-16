'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CodeIcon from '@mui/icons-material/Code'
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
      {/* Feature Tiles */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {availableFeatures.map((feature) => {
          const isAvailable = hasKey && feature.requiredProvider === 'openai'
          const iconBgColor = isAvailable ? '#10B981' : '#94A3B8'
          return (
            <Grid key={feature.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.75rem' }}
                      >
                        YAML Editor
                      </Typography>
                      <Chip
                        label={isAvailable ? 'Enabled' : 'Disabled'}
                        size="small"
                        color={isAvailable ? 'success' : 'default'}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: iconBgColor,
                        color: '#FFFFFF',
                        flexShrink: 0,
                        boxShadow: `0 4px 14px ${iconBgColor}40`,
                      }}
                    >
                      <CodeIcon sx={{ fontSize: 28 }} />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* OpenAI API Key Form */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          OpenAI API Key
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enable AI-powered features by providing your OpenAI API key. The key is stored locally in your browser and never sent to our servers.
        </Typography>

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
          <Alert severity="success">
            API key saved successfully!
          </Alert>
        )}
      </Box>
    </Box>
  )
}
