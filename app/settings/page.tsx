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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import { useThemeMode } from '../components/theme-provider'
import { useModeStore, useUIPreferences } from '@/lib/core/store'
import { NamespaceSelector } from '../components/layout/namespace-selector'
import { colorSkins, ColorSkinName } from '@/lib/ui/color-skins'
import { GitHubAppInstallButton } from '@/app/components/github-app/install-button'
import { GitHubAppRepoSelector } from '@/app/components/github-app/repo-selector'
import { useState, useEffect } from 'react'
import { AISettings } from '@/app/components/settings/ai-settings'
import { ClusterAliases } from '@/app/components/settings/cluster-aliases'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

export default function SettingsPage() {
  const { mode: themeMode, setThemeMode, actualTheme } = useThemeMode()
  const {
    mode: appMode,
    setMode,
    realtimeEnabled,
    setRealtimeEnabled,
    autoRefreshEnabled,
    setAutoRefreshEnabled,
    autoRefreshInterval,
    setAutoRefreshInterval,
    selectedNamespace,
    selectedContext,
    setContext,
    setNamespace,
  } = useModeStore()
  const { colorSkin, setColorSkin, compactMode, setCompactMode } = useUIPreferences()
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testingConnection, setTestingConnection] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [namespaceError, setNamespaceError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  const fetchContexts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contexts')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch contexts')
      }

      setContexts(data.contexts || [])

      // Auto-select current context if available and no context selected
      const currentContext = data.contexts.find((ctx: KubeContext) => ctx.current)
      if (currentContext && !selectedContext) {
        setContext({
          name: currentContext.name,
          cluster: currentContext.cluster,
          user: currentContext.user,
        })

        // Also auto-set namespace if not already set
        if (currentContext.namespace && !selectedNamespace) {
          setNamespace(currentContext.namespace)
        }
      }
    } catch (err) {
      console.error('Failed to fetch kubectl contexts:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch contexts')
      setContexts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (appMode === 'real') {
      fetchContexts()
    }
  }, [appMode])

  const handleModeChange = (newMode: 'mock' | 'real') => {
    setMode(newMode)
    if (newMode === 'mock') {
      setContext(null)
    }
  }

  const testConnection = async () => {
    setTestingConnection(true)
    setConnectionError(null)

    try {
      const response = await fetch('/api/test-connection')
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Failed to connect to cluster')
      }

      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to connect to cluster'
      setConnectionError(errorMsg)
      return false
    } finally {
      setTestingConnection(false)
    }
  }

  const handleContextSelect = async (context: KubeContext) => {
    // First set the context
    setContext({
      name: context.name,
      cluster: context.cluster,
      user: context.user,
    })

    // Auto-set namespace from context (with fallback to 'default')
    if (context.namespace) {
      setNamespace(context.namespace)
    }

    // Then test the connection
    await testConnection()
  }

  const handleRealtimeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRealtimeEnabled(event.target.checked)
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure your KubeVista dashboard preferences
        </Typography>
      </Box>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Cluster" />
          <Tab label="Cluster Aliases" />
          <Tab label="AI Features" />
          <Tab label="GitHub Integration" />
          <Tab label="Design" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {/* Cluster Configuration */}
      {activeTab === 0 && (
        <Box>
          <Paper sx={{ p: 4 }}>
            {/* Mode Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Connection Mode
              </Typography>
              <RadioGroup
                value={appMode}
                onChange={(e) => handleModeChange(e.target.value as 'mock' | 'real')}
              >
                <FormControlLabel
                  value="mock"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1">Demo Mode</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Use realistic mock data - no cluster required
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="real"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1">Real Cluster</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Connect to a live Kubernetes cluster
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </Box>

            {/* Context Selection - shown when Real Cluster is selected */}
            {appMode === 'real' && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Kubernetes Context
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Context Required</AlertTitle>
                  Select a context from your kubeconfig. Make sure kubectl is configured and you have access to the cluster.
                </Alert>

                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : error ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    <AlertTitle>Failed to Load Contexts</AlertTitle>
                    {error}
                    <Button size="small" onClick={fetchContexts} sx={{ mt: 1 }}>
                      Retry
                    </Button>
                  </Alert>
                ) : contexts.length === 0 ? (
                  <Alert severity="error">
                    No Kubernetes contexts found. Please configure kubectl first.
                  </Alert>
                ) : (
                  <List sx={{ bgcolor: 'background.default', borderRadius: 1 }}>
                    {contexts.map((context) => (
                      <ListItem key={context.name} disablePadding>
                        <ListItemButton
                          onClick={() => handleContextSelect(context)}
                          selected={selectedContext?.name === context.name}
                        >
                          <Radio
                            checked={selectedContext?.name === context.name}
                            onChange={() => handleContextSelect(context)}
                            value={context.name}
                          />
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {context.name}
                                {context.current && (
                                  <Chip label="Current" size="small" color="primary" />
                                )}
                              </Box>
                            }
                            secondary={
                              <Box component="span">
                                Cluster: {context.cluster}
                                {context.namespace && ` • Namespace: ${context.namespace}`}
                              </Box>
                            }
                            primaryTypographyProps={{ component: 'div' }}
                            secondaryTypographyProps={{ component: 'div' }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            )}

            {/* Connection Status */}
            {appMode === 'real' && selectedContext && testingConnection && (
              <Box sx={{ mb: 4 }}>
                <Alert severity="info">
                  <AlertTitle>Testing Connection</AlertTitle>
                  Verifying connection to cluster...
                </Alert>
              </Box>
            )}

            {/* Connection Error */}
            {appMode === 'real' && selectedContext && connectionError && (
              <Box sx={{ mb: 4 }}>
                <Alert severity="error">
                  <AlertTitle>Connection Failed</AlertTitle>
                  {connectionError}
                  <Button size="small" onClick={testConnection} sx={{ mt: 1 }}>
                    Retry Connection
                  </Button>
                </Alert>
              </Box>
            )}

            {/* Namespace Selector */}
            {appMode === 'real' && selectedContext && !connectionError && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Namespace
                </Typography>
                {namespaceError && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <AlertTitle>Cannot Load Namespaces</AlertTitle>
                    {namespaceError}
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      You can still type a namespace name manually below.
                    </Typography>
                  </Alert>
                )}
                <NamespaceSelector fullWidth onError={setNamespaceError} />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Current: {selectedNamespace || 'All namespaces'}
                </Typography>
              </Box>
            )}

            {/* Auto Refresh */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Auto Refresh
              </Typography>
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
                    <Typography variant="body1">
                      Enable auto-refresh
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Automatically refresh data every {autoRefreshInterval} seconds
                    </Typography>
                  </Box>
                }
              />
              {autoRefreshEnabled && (
                <Box sx={{ mt: 2, ml: 4 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Refresh interval
                  </Typography>
                  <ButtonGroup size="small" sx={{ mt: 1 }}>
                    {[10, 30, 60].map((interval) => (
                      <Button
                        key={interval}
                        variant={autoRefreshInterval === interval ? 'contained' : 'outlined'}
                        onClick={() => setAutoRefreshInterval(interval)}
                      >
                        {interval}s
                      </Button>
                    ))}
                  </ButtonGroup>
                </Box>
              )}
            </Box>

            {/* Real-time Updates */}
            {appMode === 'real' && selectedContext && !connectionError && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Real-time Updates (SSE)
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={realtimeEnabled}
                      onChange={handleRealtimeToggle}
                      color="primary"
                      disabled={!!connectionError}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">
                        Enable real-time updates
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Data will refresh automatically via Server-Sent Events
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            )}
          </Paper>
        </Box>
      )}

      {/* Cluster Aliases */}
      {activeTab === 1 && (
        <Box>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Cluster Aliases
            </Typography>
            <ClusterAliases />
          </Paper>
        </Box>
      )}

      {/* AI Features */}
      {activeTab === 2 && (
        <Box>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              AI-Powered Features
            </Typography>
            <AISettings />
          </Paper>
        </Box>
      )}

      {/* GitHub Integration */}
      {activeTab === 3 && (
        <Box>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              GitHub App Integration
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Connect your GitHub App to edit Kubernetes manifests and create Pull Requests directly from KubeVista.
            </Typography>

            <Box sx={{ mb: 3 }}>
              <GitHubAppInstallButton />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Select Repository
              </Typography>
              <GitHubAppRepoSelector />
            </Box>
          </Paper>
        </Box>
      )}

      {/* Design */}
      {activeTab === 4 && (
        <Box>
          {/* Theme Mode */}
          <Paper sx={{ p: 4, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Theme Mode
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Button
                  variant={themeMode === 'light' ? 'contained' : 'outlined'}
                  onClick={() => setThemeMode('light')}
                  startIcon={<LightModeOutlinedIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 2 }}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Typography variant="body1">Light Mode</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Always use light theme
                    </Typography>
                  </Box>
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Button
                  variant={themeMode === 'dark' ? 'contained' : 'outlined'}
                  onClick={() => setThemeMode('dark')}
                  startIcon={<DarkModeOutlinedIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 2 }}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Typography variant="body1">Dark Mode</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Always use dark theme
                    </Typography>
                  </Box>
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Button
                  variant={themeMode === 'system' ? 'contained' : 'outlined'}
                  onClick={() => setThemeMode('system')}
                  startIcon={<LaptopOutlinedIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 2 }}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Typography variant="body1">System</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Currently: {actualTheme}
                    </Typography>
                  </Box>
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Color Skin */}
          <Paper sx={{ p: 4, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Color Skin
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose a color palette for your dashboard
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(colorSkins).map(([key, skin]) => {
                const isSelected = colorSkin === key
                const palette = actualTheme === 'light' ? skin.light : skin.dark
                return (
                  <Grid key={key} size={{ xs: 12, sm: 4 }}>
                    <Button
                      variant={isSelected ? 'contained' : 'outlined'}
                      onClick={() => setColorSkin(key as ColorSkinName)}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        py: 2,
                        px: 2,
                        borderWidth: 2,
                        borderColor: isSelected ? palette.primary.main : 'divider',
                        '&:hover': {
                          borderColor: palette.primary.main,
                        },
                      }}
                    >
                      <Box sx={{ textAlign: 'left', flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: 1,
                              background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.secondary.main} 100%)`,
                            }}
                          />
                          <Typography variant="body1" fontWeight={600}>
                            {skin.name}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {skin.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: 0.5,
                              bgcolor: palette.primary.main,
                            }}
                          />
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: 0.5,
                              bgcolor: palette.secondary.main,
                            }}
                          />
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: 0.5,
                              bgcolor: palette.accent.main,
                            }}
                          />
                        </Box>
                      </Box>
                    </Button>
                  </Grid>
                )
              })}
            </Grid>
          </Paper>

        </Box>
      )}
    </Box>
  )
}
