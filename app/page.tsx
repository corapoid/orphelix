'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import LanguageIcon from '@mui/icons-material/Language'
import { ClusterHealthScore } from './components/dashboard/cluster-health-score'
import { CriticalAlerts } from './components/dashboard/critical-alerts'
import { ResourceOverview } from './components/dashboard/resource-overview'
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
  const selectedContext = useModeStore((state) => state.selectedContext)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const { data: summary, isLoading, error } = useDashboardSummary()
  const { data: events, isLoading: eventsLoading, error: eventsError } = useRecentEvents(1) // Last 1 hour
  const { data: quotas } = useResourceQuotas()

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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Cluster Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Cluster:</strong> {mode === 'mock' ? 'Demo' : selectedContext?.cluster || 'Unknown'} •
          <strong> Namespace:</strong> {mode === 'mock' ? 'demo' : namespace || 'All namespaces'}
        </Typography>
      </Box>

      {/* 1. Cluster Health Score (Hero) */}
      <Box sx={{ mb: 3 }}>
        <ClusterHealthScore summary={summary} />
      </Box>

      {/* 2. Critical Alerts (Conditional) */}
      <Box sx={{ mb: 3 }}>
        <CriticalAlerts summary={summary} />
      </Box>

      {/* 3. Resource Overview (Grouped Cards) */}
      <Box sx={{ mb: 4 }}>
        <ResourceOverview summary={summary} />
      </Box>

      {/* 4. Recent Activity + Resource Utilization (Side by Side) */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mb: 4 }}>
        <Box>
          <RecentEvents events={events || []} loading={eventsLoading} error={eventsError || null} />
        </Box>
        <Box>
          <ResourceUtilization quotas={quotas} />
        </Box>
      </Box>

      {/* Quick Link to Topology */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<LanguageIcon />}
          onClick={() => (window.location.href = '/topology')}
        >
          View Cluster Topology
        </Button>
      </Box>
    </Box>
  )
}
