'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
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
import { useModeStore } from '@/lib/store'
import { NamespaceSelector } from '../components/layout/namespace-selector'
import { GitHubLoginButton } from '@/app/components/github/login-button'
import { RepoSelector } from '@/app/components/github/repo-selector'
import { GitHubAppInstallButton } from '@/app/components/github-app/install-button'
import { GitHubAppRepoSelector } from '@/app/components/github-app/repo-selector'
import { useSession } from 'next-auth/react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState, useEffect } from 'react'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

export default function SettingsPage() {
  const { mode: themeMode, setThemeMode, actualTheme } = useThemeMode()
  const { mode: appMode, setMode, realtimeEnabled, setRealtimeEnabled, selectedNamespace, selectedContext, setContext } = useModeStore()
  const { data: session } = useSession()
  const [githubIntegrationType, setGithubIntegrationType] = useState<'oauth' | 'app'>('app')
  const [contexts, setContexts] = useState<KubeContext[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testingConnection, setTestingConnection] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Then test the connection
    await testConnection()
  }

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
        {/* Cluster Configuration */}
        <Grid size={{ xs: 12 }}>
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
              <RadioGroup
                value={appMode}
                onChange={(e) => handleModeChange(e.target.value as 'mock' | 'real')}
              >
                <FormControlLabel
                  value="mock"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body2">Demo Mode</Typography>
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
                      <Typography variant="body2">Real Cluster</Typography>
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
              <Box sx={{ mb: 3 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Kubernetes Context Required</AlertTitle>
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
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                      Select Context
                    </Typography>
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
                  </Box>
                )}
              </Box>
            )}

            {/* Connection Status */}
            {appMode === 'real' && selectedContext && testingConnection && (
              <Box sx={{ mb: 3 }}>
                <Alert severity="info">
                  <AlertTitle>Testing Connection</AlertTitle>
                  Verifying connection to cluster...
                </Alert>
              </Box>
            )}

            {/* Connection Error */}
            {appMode === 'real' && selectedContext && connectionError && (
              <Box sx={{ mb: 3 }}>
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
            {appMode === 'real' && selectedContext && !connectionError && (
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
                      disabled={!!connectionError}
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

        {/* Appearance Section - minimized */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Appearance
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {themeMode === 'system'
                    ? `System (currently ${actualTheme})`
                    : themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
                </Typography>
              </Box>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  variant={themeMode === 'light' ? 'contained' : 'outlined'}
                  onClick={() => setThemeMode('light')}
                >
                  <LightModeOutlinedIcon fontSize="small" />
                </Button>
                <Button
                  variant={themeMode === 'dark' ? 'contained' : 'outlined'}
                  onClick={() => setThemeMode('dark')}
                >
                  <DarkModeOutlinedIcon fontSize="small" />
                </Button>
                <Button
                  variant={themeMode === 'system' ? 'contained' : 'outlined'}
                  onClick={() => setThemeMode('system')}
                >
                  <LaptopOutlinedIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </Box>
          </Paper>
        </Grid>

        {/* GitHub Integration */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              GitHub Integration
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Connect your GitHub account to edit Kubernetes manifests and create Pull Requests directly from KubeVista.
            </Typography>

            <Tabs
              value={githubIntegrationType}
              onChange={(_, v) => setGithubIntegrationType(v)}
              sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="GitHub App (Recommended)" value="app" />
              <Tab label="OAuth (Legacy)" value="oauth" />
            </Tabs>

            {githubIntegrationType === 'app' ? (
              <Box>
                <GitHubAppInstallButton />
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Select Repository
                  </Typography>
                  <GitHubAppRepoSelector />
                </Box>
              </Box>
            ) : (
              <Box>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  OAuth grants access to ALL repositories. Consider using GitHub App for granular control.
                </Alert>
                <Box sx={{ mb: 3 }}>
                  <GitHubLoginButton />
                </Box>
                {session && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      Select Repository
                    </Typography>
                    <RepoSelector />
                    <Alert severity="info" sx={{ mt: 2 }}>
                      After selecting a repository, you can edit YAML files from deployment details pages.
                      Changes will be committed as Pull Requests for review.
                    </Alert>
                  </Box>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
