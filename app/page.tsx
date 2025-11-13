'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import WidgetsIcon from '@mui/icons-material/Widgets'
import StorageIcon from '@mui/icons-material/Storage'
import SettingsIcon from '@mui/icons-material/Settings'
import LockIcon from '@mui/icons-material/Lock'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { RecentEvents } from './components/dashboard/recent-events'
import { TopologyGraph } from './components/topology/topology-graph'
import { useDashboardSummary, useRecentEvents } from '@/lib/hooks/use-dashboard'
import { useDeployments } from '@/lib/hooks/use-deployments'
import { useConfigMaps } from '@/lib/hooks/use-configmaps'
import { useSecrets } from '@/lib/hooks/use-secrets'
import { useModeStore } from '@/lib/store'
import { buildConfigSecretsTopology } from '@/lib/topology'
import { useMemo } from 'react'
import { ClusterConnectionAlert } from '@/components/common/cluster-connection-alert'
import { useClusterHealth } from '@/lib/hooks/use-cluster-health'

export default function DashboardPage() {
  const { data: health } = useClusterHealth()
  const mode = useModeStore((state) => state.mode)
  const selectedContext = useModeStore((state) => state.selectedContext)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const { data: summary, isLoading, error } = useDashboardSummary()
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
  } = useRecentEvents(24) // Last 24 hours

  // Fetch data for ConfigMaps/Secrets topology
  const { data: deployments } = useDeployments()
  const { data: configMaps } = useConfigMaps()
  const { data: secrets } = useSecrets()

  // Build topology graph
  const topologyData = useMemo(() => {
    if (!deployments || !configMaps || !secrets || !namespace) return null
    return buildConfigSecretsTopology(deployments, configMaps, secrets, namespace)
  }, [deployments, configMaps, secrets, namespace])

  // If cluster is not connected, show connection alert instead of loading/error states
  if (health?.status === 'disconnected') {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>
        <ClusterConnectionAlert />
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load dashboard: {error instanceof Error ? error.message : 'Unknown error'}
      </Alert>
    )
  }

  if (!summary) {
    return <Alert severity="warning">No data available</Alert>
  }

  return (
    <Box>
      {/* Clean Header */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Cluster Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Cluster:</strong> {mode === 'mock' ? 'Demo' : (selectedContext?.cluster || 'Unknown')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Namespace:</strong> {mode === 'mock' ? 'demo' : (namespace || 'All namespaces')}
        </Typography>
      </Box>

      {/* Minimalist Stats Grid - Only Primary Accent */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {/* Deployments - Main Card */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            sx={{
              p: 2,
              height: '100%',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 1,
              },
            }}
            onClick={() => (window.location.href = '/deployments')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <AccountTreeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Deployments
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
              {summary.deployments.total}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                  Healthy
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 600 }}>
                  {summary.deployments.healthy}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                  Degraded
                </Typography>
                <Typography variant="body1" color="error.main" sx={{ fontWeight: 600 }}>
                  {summary.deployments.degraded}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Pods */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            sx={{
              p: 2,
              height: '100%',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 1,
              },
            }}
            onClick={() => (window.location.href = '/pods')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <WidgetsIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Pods
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
              {summary.pods.total}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                  Running
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 600 }}>
                  {summary.pods.running}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                  Pending
                </Typography>
                <Typography variant="body1" color="warning.main" sx={{ fontWeight: 600 }}>
                  {summary.pods.pending}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                  Failed
                </Typography>
                <Typography variant="body1" color="error.main" sx={{ fontWeight: 600 }}>
                  {summary.pods.failed}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Nodes */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            sx={{
              p: 2,
              height: '100%',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 1,
              },
            }}
            onClick={() => (window.location.href = '/nodes')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <StorageIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Nodes
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
              {summary.nodes.total}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                  Ready
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 600 }}>
                  {summary.nodes.ready}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                  Not Ready
                </Typography>
                <Typography variant="body1" color="error.main" sx={{ fontWeight: 600 }}>
                  {summary.nodes.notReady}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Storage */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            sx={{
              p: 2,
              height: '100%',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 1,
              },
            }}
            onClick={() => (window.location.href = '/pv')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <FolderOpenIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Volumes
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
              {summary.pv.total}
            </Typography>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                Bound
              </Typography>
              <Typography variant="body1" color="success.main" sx={{ fontWeight: 600 }}>
                {summary.pv.bound}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Secondary Resources - Compact Row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 },
            }}
            onClick={() => (window.location.href = '/configmaps')}
          >
            <SettingsIcon sx={{ fontSize: 20, color: 'text.secondary', mb: 0.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {summary.configMaps}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              ConfigMaps
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 },
            }}
            onClick={() => (window.location.href = '/secrets')}
          >
            <LockIcon sx={{ fontSize: 20, color: 'text.secondary', mb: 0.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {summary.secrets}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Secrets
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 },
            }}
            onClick={() => (window.location.href = '/hpa')}
          >
            <TrendingUpIcon sx={{ fontSize: 20, color: 'text.secondary', mb: 0.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {summary.hpa}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              HPA
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 },
            }}
            onClick={() => (window.location.href = '/events')}
          >
            <EventNoteIcon sx={{ fontSize: 20, color: 'text.secondary', mb: 0.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {events?.length || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Events (24h)
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* ConfigMaps/Secrets to Deployments Topology */}
      {topologyData && topologyData.nodes.length > 0 && (
        <Paper sx={{ mb: 4 }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Topology</Typography>
          </Box>
          <Box>
            <TopologyGraph data={topologyData} height={500} />
          </Box>
        </Paper>
      )}

      <RecentEvents events={events || []} loading={eventsLoading} error={eventsError || null} />
    </Box>
  )
}
