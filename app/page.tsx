'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { CriticalAlerts } from './components/dashboard/critical-alerts'
import { ResourceOverviewV2 } from './components/dashboard/resource-overview-v2'
import { ResourceUtilization } from './components/dashboard/resource-utilization'
import { RecentEvents } from './components/dashboard/recent-events'
import { HealthStatusWidget } from './components/dashboard/health-status-widget'
import { useDashboardSummary, useRecentEvents } from '@/lib/hooks/use-dashboard'
import { useResourceQuotas } from '@/lib/hooks/use-resourcequotas'
import { useModeStore } from '@/lib/core/store'
import { ClusterConnectionAlert } from '@/app/components/common/cluster-connection-alert'
import { useClusterHealth } from '@/lib/hooks/use-cluster-health'

export default function DashboardPage() {
  const { data: health } = useClusterHealth()
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const { data: summary, isLoading, error } = useDashboardSummary()
  const { data: events, isLoading: eventsLoading, error: eventsError } = useRecentEvents(1) // Last 1 hour
  const { data: quotas } = useResourceQuotas()

  // If cluster is not connected, show connection alert instead of loading/error states
  if (health?.status === 'disconnected') {
    return <ClusterConnectionAlert />
  }

  // If in real mode but no namespace selected, show alert
  if (mode === 'real' && !namespace) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Namespace Required
        </Typography>
        <Typography variant="body2">
          Please select a namespace above to view cluster resources.
          You can also set a default namespace in Settings.
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => (window.location.href = '/settings')}
          sx={{ mt: 2 }}
        >
          Go to Settings
        </Button>
      </Alert>
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
      {/* 1. Critical Alerts (Conditional) */}
      <Box sx={{ mb: 3 }}>
        <CriticalAlerts summary={summary} />
      </Box>

      {/* 2. Resource Overview + Health & Utilization (Side by Side on wide screens) */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '2fr 1fr' }, gap: 3, mb: 4, alignItems: 'start' }}>
        <Box>
          <ResourceOverviewV2 summary={summary} />
        </Box>
        <Box sx={{ display: { xs: 'none', xl: 'flex' }, flexDirection: 'column', gap: 3 }}>
          <HealthStatusWidget
            totalPods={summary.pods.total}
            healthyPods={summary.pods.running}
            unhealthyPods={summary.pods.failed + summary.pods.pending}
            podsWithRestarts={summary.pods.total - summary.pods.running}
          />
          <ResourceUtilization quotas={quotas} />
        </Box>
      </Box>

      {/* 3. Recent Activity (full width) */}
      <Box sx={{ mb: 4 }}>
        <RecentEvents events={events || []} loading={eventsLoading} error={eventsError || null} />
      </Box>

      {/* 4. Health & Resource Utilization (for smaller screens) */}
      <Box sx={{ display: { xs: 'flex', xl: 'none' }, flexDirection: 'column', gap: 3, mb: 4 }}>
        <HealthStatusWidget
          totalPods={summary.pods.total}
          healthyPods={summary.pods.running}
          unhealthyPods={summary.pods.failed + summary.pods.pending}
          podsWithRestarts={summary.pods.total - summary.pods.running}
        />
        <ResourceUtilization quotas={quotas} />
      </Box>
    </Box>
  )
}
