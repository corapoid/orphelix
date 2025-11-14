import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import type { DashboardSummary } from '@/types/kubernetes'

interface ClusterHealthScoreProps {
  summary: DashboardSummary
}

function calculateHealthScore(summary: DashboardSummary): {
  score: number
  status: 'healthy' | 'warning' | 'critical'
  issues: string[]
} {
  let score = 100
  const issues: string[] = []

  // Deployments health (max -30 points)
  if (summary.deployments.degraded > 0) {
    const degradedPercent = (summary.deployments.degraded / summary.deployments.total) * 100
    if (degradedPercent > 50) {
      score -= 30
      issues.push(`${summary.deployments.degraded} deployments degraded`)
    } else if (degradedPercent > 20) {
      score -= 15
      issues.push(`${summary.deployments.degraded} deployments degraded`)
    } else {
      score -= 5
      issues.push(`${summary.deployments.degraded} deployment(s) degraded`)
    }
  }

  // Pods health (max -30 points)
  if (summary.pods.failed > 0) {
    const failedPercent = (summary.pods.failed / summary.pods.total) * 100
    if (failedPercent > 10) {
      score -= 20
      issues.push(`${summary.pods.failed} pods failing`)
    } else {
      score -= 10
      issues.push(`${summary.pods.failed} pod(s) failing`)
    }
  }
  if (summary.pods.pending > 0) {
    const pendingPercent = (summary.pods.pending / summary.pods.total) * 100
    if (pendingPercent > 20) {
      score -= 10
      issues.push(`${summary.pods.pending} pods pending`)
    }
  }

  // Nodes health (max -25 points)
  if (summary.nodes.notReady > 0) {
    const notReadyPercent = (summary.nodes.notReady / summary.nodes.total) * 100
    if (notReadyPercent > 30) {
      score -= 25
      issues.push(`${summary.nodes.notReady} nodes not ready`)
    } else {
      score -= 15
      issues.push(`${summary.nodes.notReady} node(s) not ready`)
    }
  }

  // Volumes health (max -15 points)
  const unboundVolumes = summary.pv.total - summary.pv.bound
  if (unboundVolumes > 0) {
    if (unboundVolumes > 5) {
      score -= 15
      issues.push(`${unboundVolumes} volumes unbound`)
    } else {
      score -= 5
    }
  }

  score = Math.max(0, Math.min(100, score))

  let status: 'healthy' | 'warning' | 'critical'
  if (score >= 80) {
    status = 'healthy'
  } else if (score >= 50) {
    status = 'warning'
  } else {
    status = 'critical'
  }

  return { score, status, issues }
}

export function ClusterHealthScore({ summary }: ClusterHealthScoreProps) {
  const { score, status, issues } = calculateHealthScore(summary)

  const statusConfig = {
    healthy: {
      color: 'success.main' as const,
      bgColor: 'success.light' as const,
      icon: <CheckCircleIcon sx={{ fontSize: 28 }} />,
      label: 'Healthy',
      chipColor: 'success' as const,
    },
    warning: {
      color: 'warning.main' as const,
      bgColor: 'warning.light' as const,
      icon: <WarningIcon sx={{ fontSize: 28 }} />,
      label: 'Warning',
      chipColor: 'warning' as const,
    },
    critical: {
      color: 'error.main' as const,
      bgColor: 'error.light' as const,
      icon: <ErrorIcon sx={{ fontSize: 28 }} />,
      label: 'Critical',
      chipColor: 'error' as const,
    },
  }

  const config = statusConfig[status]

  return (
    <Paper
      sx={{
        p: 3,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ color: config.color }}>{config.icon}</Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Cluster Health Score
            </Typography>
            <Chip label={config.label} size="small" color={config.chipColor} />
          </Box>
        </Box>
        <Typography variant="h2" sx={{ fontWeight: 800, color: config.color }}>
          {score}
          <Typography component="span" variant="h5" color="text.secondary">
            /100
          </Typography>
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={score}
        sx={{
          height: 8,
          borderRadius: 1,
          mb: 2,
          bgcolor: 'action.hover',
          '& .MuiLinearProgress-bar': {
            bgcolor: config.color,
            borderRadius: 1,
          },
        }}
      />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Pods:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {summary.pods.running}/{summary.pods.total} running
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Nodes:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {summary.nodes.ready}/{summary.nodes.total} ready
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Deployments:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {summary.deployments.healthy}/{summary.deployments.total} healthy
          </Typography>
        </Box>
        {issues.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
            <Typography variant="body2" color="warning.main" fontWeight="medium">
              {issues.length} issue{issues.length > 1 ? 's' : ''}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
