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
import Paper from '@mui/material/Paper'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CodeIcon from '@mui/icons-material/Code'
import { AI_FEATURES } from '@/lib/config/ai-features'
import { useTheme } from '@/lib/ui'

const LOCAL_STORAGE_KEY = 'kubevista_openai_key'

export function AISettings() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const [hasKey, setHasKey] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testError, setTestError] = useState<string | null>(null)

  useEffect(() => {
    // Load existing key from localStorage
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      setApiKey(stored)
      setHasKey(true)
    }
  }, [])

  const testApiKey = async () => {
    const trimmedKey = apiKey.trim()
    if (!trimmedKey) return

    setTesting(true)
    setTestError(null)

    try {
      // Test the API key with a minimal request
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${trimmedKey}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key')
        }
        throw new Error(`API test failed: ${response.statusText}`)
      }

      // Key is valid, save it
      localStorage.setItem(LOCAL_STORAGE_KEY, trimmedKey)
      setHasKey(true)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)

      // Dispatch event so other components know the key was updated
      window.dispatchEvent(new Event('openai-key-updated'))
    } catch (error) {
      setTestError(error instanceof Error ? error.message : 'Failed to validate API key')
    } finally {
      setTesting(false)
    }
  }

  const handleSave = () => {
    testApiKey()
  }

  const handleClear = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setApiKey('')
    setHasKey(false)
    setTestError(null)
    setSaved(false)
    window.dispatchEvent(new Event('openai-key-updated'))
  }

  const availableFeatures = Object.values(AI_FEATURES).filter(f => f.enabled)

  return (
    <Box>
      {/* Feature Tiles */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {availableFeatures.map((feature) => {
          const isAvailable = hasKey && feature.requiredProvider === 'openai'
          const iconColor = isAvailable ? '#10B981' : '#94A3B8'
          return (
            <Grid key={feature.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper
                elevation={isGlass ? 0 : 1}
                sx={{
                  p: 2,
                  cursor: 'default',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                  overflow: 'hidden',
                  ...(isGlass && {
                    // Liquid glass effect
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(30, 30, 46, 0.6)'
                        : 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(209, 213, 219, 0.4)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
                        : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
                    // Glass shine - diagonal gradient
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '100%',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%, rgba(0, 0, 0, 0.1) 100%)'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 60%, rgba(0, 0, 0, 0.02) 100%)',
                      pointerEvents: 'none',
                      borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                    },
                  }),
                }}
              >
                {/* Header with icon and name */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5, position: 'relative', zIndex: 1 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? `linear-gradient(135deg, ${iconColor}25 0%, ${iconColor}15 100%)`
                          : `linear-gradient(135deg, ${iconColor}30 0%, ${iconColor}15 100%)`,
                      ...(isGlass && {
                        backdropFilter: 'blur(10px)',
                      }),
                      border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? `${iconColor}40`
                          : `${iconColor}30`,
                      flexShrink: 0,
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? `0 2px 8px 0 ${iconColor}20`
                          : `0 2px 8px 0 ${iconColor}15`,
                    }}
                  >
                    <CodeIcon sx={{ fontSize: 22, color: iconColor, opacity: 0.95 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        mb: 0.5,
                      }}
                    >
                      {feature.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
                      AI-Powered
                    </Typography>
                  </Box>
                </Box>

                {/* Status Badge */}
                <Box sx={{ mb: 1.5, position: 'relative', zIndex: 1 }}>
                  <Chip
                    label={isAvailable ? 'Enabled' : 'Disabled'}
                    size="small"
                    color={isAvailable ? 'success' : 'default'}
                  />
                </Box>

                {/* Description */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Paper>
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
            disabled={!apiKey.trim() || apiKey.trim() === localStorage.getItem(LOCAL_STORAGE_KEY) || testing}
          >
            {testing ? 'Testing...' : 'Save & Test API Key'}
          </Button>
          {hasKey && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleClear}
              disabled={testing}
            >
              Clear Key
            </Button>
          )}
        </Box>

        {saved && (
          <Alert severity="success" sx={{ mb: 2 }}>
            API key validated and saved successfully!
          </Alert>
        )}

        {testError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {testError}
          </Alert>
        )}
      </Box>
    </Box>
  )
}
