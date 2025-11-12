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
import { SummaryCard } from './components/dashboard/summary-card'
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
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Deployments"
            total={summary.deployments.total}
            icon={AccountTreeIcon}
            href="/deployments"
            details={[
              { label: 'Healthy', value: summary.deployments.healthy, color: 'success' },
              { label: 'Degraded', value: summary.deployments.degraded, color: 'error' },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Pods"
            total={summary.pods.total}
            icon={WidgetsIcon}
            href="/pods"
            details={[
              { label: 'Running', value: summary.pods.running, color: 'success' },
              { label: 'Pending', value: summary.pods.pending, color: 'warning' },
              { label: 'Failed', value: summary.pods.failed, color: 'error' },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Nodes"
            total={summary.nodes.total}
            icon={StorageIcon}
            href="/nodes"
            details={[
              { label: 'Ready', value: summary.nodes.ready, color: 'success' },
              { label: 'Not Ready', value: summary.nodes.notReady, color: 'error' },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Persistent Volumes"
            total={summary.pv.total}
            icon={FolderOpenIcon}
            href="/pv"
            details={[{ label: 'Bound', value: summary.pv.bound, color: 'success' }]}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryCard title="ConfigMaps" total={summary.configMaps} icon={SettingsIcon} href="/configmaps" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryCard title="Secrets" total={summary.secrets} icon={LockIcon} href="/secrets" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryCard title="HPA" total={summary.hpa} icon={TrendingUpIcon} href="/hpa" />
        </Grid>
      </Grid>

      {/* ConfigMaps/Secrets to Deployments Topology */}
      {topologyData && topologyData.nodes.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Configuration Dependencies
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ConfigMaps and Secrets connected to Deployments (filtered by Flux kustomize namespace:{' '}
              <strong>{namespace}</strong>)
            </Typography>
          </Paper>
          <TopologyGraph data={topologyData} height={500} />
        </Box>
      )}

      <RecentEvents events={events || []} loading={eventsLoading} error={eventsError || null} />
    </Box>
  )
}
