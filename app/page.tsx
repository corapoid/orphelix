'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
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
import { useDashboardSummary, useRecentEvents } from '@/lib/hooks/use-dashboard'
import { ClusterConnectionAlert } from '@/components/common/cluster-connection-alert'
import { useClusterHealth } from '@/lib/hooks/use-cluster-health'

export default function DashboardPage() {
  const { data: health } = useClusterHealth()
  const { data: summary, isLoading, error } = useDashboardSummary()
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
  } = useRecentEvents(10)

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
            details={[{ label: 'Bound', value: summary.pv.bound, color: 'success' }]}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryCard title="ConfigMaps" total={summary.configMaps} icon={SettingsIcon} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryCard title="Secrets" total={summary.secrets} icon={LockIcon} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryCard title="HPA" total={summary.hpa} icon={TrendingUpIcon} />
        </Grid>
      </Grid>

      <RecentEvents events={events || []} loading={eventsLoading} error={eventsError || null} />
    </Box>
  )
}
