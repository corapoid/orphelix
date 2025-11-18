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
      {/* 1. Critical Alerts with AI Explanation */}
      <Box sx={{ mb: 3 }}>
        <CriticalAlerts summary={summary} />
      </Box>

      {/* 2. Resource Overview */}
      <Box sx={{ mb: 3 }}>
        <ResourceOverviewV2 summary={summary} />
      </Box>

      {/* 4. Cluster Resource Utilization (left) + Recent Activity (right) */}
      <Box sx={{ display: 'grid', gridTemplateColumns: quotas && quotas.length > 0 ? '1fr 1fr' : '1fr', gap: 3, mb: 3 }}>
        {/* Cluster Resource Utilization */}
        {quotas && quotas.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Cluster Resource Utilization
            </Typography>
            <ResourceUtilization quotas={quotas} />
          </Box>
        )}

        {/* Recent Activity */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Recent Activity
          </Typography>
          <RecentEvents events={events || []} loading={eventsLoading} error={eventsError || null} />
        </Box>
      </Box>
    </Box>
  )
}
