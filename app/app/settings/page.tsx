'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import { useTheme } from '../components/theme-provider'
import { useModeStore } from '@/lib/core/store'
import { GitHubAppInstallButton } from '@/app/components/github-app/install-button'
import { GitHubAppRepoSelector } from '@/app/components/github-app/repo-selector'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { AISettings } from '@/app/components/settings/ai-settings'
import { ClusterAliases } from '@/app/components/settings/cluster-aliases'
import { CriticalIssuesSettings } from '@/app/components/settings/critical-issues-settings'
import { GlassButton } from '@orphelix/ui'

function GitHubIntegrationTab() {
  const { data: installations } = useQuery({
    queryKey: ['github-app-installations'],
    queryFn: async () => {
      const response = await fetch('/api/github-app/installations')
      if (!response.ok) return []
      return response.json()
    },
  })

  const hasInstallations = installations && installations.length > 0

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        GitHub App Integration
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Connect your GitHub App to edit Kubernetes manifests and create Pull Requests directly from Orphelix.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <GitHubAppInstallButton />
      </Box>

      {hasInstallations && (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Select Repository
          </Typography>
          <GitHubAppRepoSelector />
        </Box>
      )}
    </Box>
  )
}

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const { mode: themeMode, setThemeMode, actualTheme, visualPreset, setVisualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const {
    autoRefreshEnabled,
    setAutoRefreshEnabled,
    autoRefreshInterval,
    setAutoRefreshInterval,
  } = useModeStore()
  const [activeTab, setActiveTab] = useState(0)

  // Set active tab from URL parameter
  useEffect(() => {
    if (tabParam) {
      const tabIndex = parseInt(tabParam, 10)
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex <= 3) {
        setActiveTab(tabIndex)
      }
    }
  }, [tabParam])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ px: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure your Orphelix dashboard preferences
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Cluster Configuration" />
          <Tab label="GitHub Integration" />
          <Tab label="AI Features" />
          <Tab label="Design" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Cluster Aliases
            </Typography>
            <ClusterAliases />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Critical Issues Monitoring
            </Typography>
            <CriticalIssuesSettings />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Auto Refresh
            </Typography>
            <Paper
              elevation={isGlass ? 0 : 1}
              sx={{
                p: 3,
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                ...(isGlass && {
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
                }),
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoRefreshEnabled}
                      onChange={(e) => setAutoRefreshEnabled(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        Enable auto-refresh
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Automatically refresh data every {autoRefreshInterval} seconds
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      opacity: autoRefreshEnabled ? 1 : 0.5,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    Refresh interval
                  </Typography>
                  <ButtonGroup
                    size="small"
                    disabled={!autoRefreshEnabled}
                    sx={{
                      opacity: autoRefreshEnabled ? 1 : 0.5,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    {[10, 30, 60].map((interval) => (
                      <Button
                        key={interval}
                        variant={autoRefreshInterval === interval ? 'contained' : 'outlined'}
                        onClick={() => setAutoRefreshInterval(interval)}
                        disabled={!autoRefreshEnabled}
                      >
                        {interval}s
                      </Button>
                    ))}
                  </ButtonGroup>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      {activeTab === 1 && <GitHubIntegrationTab />}

      {activeTab === 2 && (
        <Box>
          <AISettings />
        </Box>
      )}

      {activeTab === 3 && (
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Theme Mode
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <GlassButton
                  onClick={() => setThemeMode('light')}
                  fullWidth
                  selected={themeMode === 'light'}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                      <LightModeOutlinedIcon sx={{ fontSize: 20, color: themeMode === 'light' ? 'primary.main' : 'text.secondary' }} />
                      <Typography variant="body1" fontWeight={600} sx={{ color: themeMode === 'light' ? 'primary.main' : 'inherit' }}>
                        Light Mode
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 4.5 }}>
                      Always use light theme
                    </Typography>
                  </Box>
                </GlassButton>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <GlassButton
                  onClick={() => setThemeMode('dark')}
                  fullWidth
                  selected={themeMode === 'dark'}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                      <DarkModeOutlinedIcon sx={{ fontSize: 20, color: themeMode === 'dark' ? 'primary.main' : 'text.secondary' }} />
                      <Typography variant="body1" fontWeight={600} sx={{ color: themeMode === 'dark' ? 'primary.main' : 'inherit' }}>
                        Dark Mode
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 4.5 }}>
                      Always use dark theme
                    </Typography>
                  </Box>
                </GlassButton>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <GlassButton
                  onClick={() => setThemeMode('system')}
                  fullWidth
                  selected={themeMode === 'system'}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                      <LaptopOutlinedIcon sx={{ fontSize: 20, color: themeMode === 'system' ? 'primary.main' : 'text.secondary' }} />
                      <Typography variant="body1" fontWeight={600} sx={{ color: themeMode === 'system' ? 'primary.main' : 'inherit' }}>
                        System
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 4.5 }}>
                      Currently: {actualTheme}
                    </Typography>
                  </Box>
                </GlassButton>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Visual Style
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose your preferred interface style. Each preset changes the overall look and feel.
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <GlassButton
                  onClick={() => setVisualPreset('classic')}
                  fullWidth
                  selected={visualPreset === 'classic'}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5, color: visualPreset === 'classic' ? 'primary.main' : 'inherit' }}>
                      Classic
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Solid backgrounds, standard MUI look. Best for accessibility.
                    </Typography>
                  </Box>
                </GlassButton>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <GlassButton
                  onClick={() => setVisualPreset('glass')}
                  fullWidth
                  selected={visualPreset === 'glass'}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5, color: visualPreset === 'glass' ? 'primary.main' : 'inherit' }}>
                      Glassmorphism
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Transparent with blur effect. Modern and clean.
                    </Typography>
                  </Box>
                </GlassButton>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <GlassButton
                  onClick={() => setVisualPreset('liquidGlass')}
                  fullWidth
                  selected={visualPreset === 'liquidGlass'}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5, color: visualPreset === 'liquidGlass' ? 'primary.main' : 'inherit' }}>
                      Liquid Glass ✨
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Premium feel with gradient shine and animations.
                    </Typography>
                  </Box>
                </GlassButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}
