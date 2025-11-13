'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import { useThemeMode } from '../components/theme-provider'
import { useModeStore } from '@/lib/store'
import { ModeSelector } from '../components/layout/mode-selector'
import { NamespaceSelector } from '../components/layout/namespace-selector'
import { useState } from 'react'

export default function SettingsPage() {
  const { mode: themeMode, setThemeMode, actualTheme } = useThemeMode()
  const { mode: appMode, realtimeEnabled, setRealtimeEnabled, selectedNamespace } = useModeStore()
  const [modeSelectorOpen, setModeSelectorOpen] = useState(false)

  const handleRealtimeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRealtimeEnabled(event.target.checked)
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure your KubeVista dashboard preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Appearance Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                Appearance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customize the look and feel of the dashboard
              </Typography>
            </Box>

            {/* Theme Mode */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                Theme Mode
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant={themeMode === 'light' ? 'contained' : 'outlined'}
                  startIcon={<LightModeOutlinedIcon />}
                  onClick={() => setThemeMode('light')}
                  sx={{ flex: 1 }}
                >
                  Light
                </Button>
                <Button
                  variant={themeMode === 'dark' ? 'contained' : 'outlined'}
                  startIcon={<DarkModeOutlinedIcon />}
                  onClick={() => setThemeMode('dark')}
                  sx={{ flex: 1 }}
                >
                  Dark
                </Button>
                <Button
                  variant={themeMode === 'system' ? 'contained' : 'outlined'}
                  startIcon={<LaptopOutlinedIcon />}
                  onClick={() => setThemeMode('system')}
                  sx={{ flex: 1 }}
                >
                  System
                </Button>
              </Box>
              {themeMode === 'system' && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Currently using: {actualTheme === 'dark' ? 'Dark' : 'Light'} (from system)
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Cluster Configuration */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                Cluster Configuration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure cluster connection and mode
              </Typography>
            </Box>

            {/* Mode Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                Connection Mode
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={appMode === 'mock' ? 'DEMO MODE' : 'REAL CLUSTER'}
                  color={appMode === 'mock' ? 'warning' : 'success'}
                  onClick={() => setModeSelectorOpen(true)}
                  sx={{ cursor: 'pointer' }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setModeSelectorOpen(true)}
                >
                  Change Mode
                </Button>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {appMode === 'mock'
                  ? 'Using demo data for preview'
                  : 'Connected to live Kubernetes cluster'}
              </Typography>
            </Box>

            {/* Namespace Selector */}
            {appMode === 'real' && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Namespace
                </Typography>
                <NamespaceSelector fullWidth />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Current: {selectedNamespace || 'All namespaces'}
                </Typography>
              </Box>
            )}

            {/* Real-time Updates */}
            {appMode === 'real' && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Real-time Updates
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={realtimeEnabled}
                      onChange={handleRealtimeToggle}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2">
                        Enable real-time updates
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Data will refresh automatically via SSE
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* About Section */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                About KubeVista
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modern Kubernetes dashboard for cluster management
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Version: 1.1.0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                •
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Built with Next.js & Material-UI
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <ModeSelector open={modeSelectorOpen} onClose={() => setModeSelectorOpen(false)} />
    </Box>
  )
}
