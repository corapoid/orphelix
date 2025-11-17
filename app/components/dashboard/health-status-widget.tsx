'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import FavoriteIcon from '@mui/icons-material/Favorite'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'

interface HealthStatusWidgetProps {
  totalPods: number
  healthyPods: number
  unhealthyPods: number
  podsWithRestarts: number
}

export function HealthStatusWidget({
  totalPods,
  healthyPods,
  unhealthyPods,
  podsWithRestarts,
}: HealthStatusWidgetProps) {
  const navigateTo = useNavigateTo()
  const healthPercentage = totalPods > 0 ? (healthyPods / totalPods) * 100 : 0
  const hasIssues = unhealthyPods > 0 || podsWithRestarts > 0

  const getHealthColor = () => {
    if (healthPercentage >= 95) return 'success'
    if (healthPercentage >= 80) return 'warning'
    return 'error'
  }

  const getHealthStatus = () => {
    if (healthPercentage >= 95) return 'Excellent'
    if (healthPercentage >= 80) return 'Good'
    if (healthPercentage >= 60) return 'Fair'
    return 'Critical'
  }

  return (
    <GlassPanel
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
      onClick={() => navigateTo('/pods')}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <FavoriteIcon sx={{ color: getHealthColor() === 'success' ? 'success.main' : getHealthColor() === 'warning' ? 'warning.main' : 'error.main' }} />
            Cluster Health
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Pod health overview
          </Typography>
        </Box>
        <Chip
          label={getHealthStatus()}
          size="small"
          color={getHealthColor()}
          variant="outlined"
        />
      </Box>

      {/* Health Percentage Bar */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" fontWeight={600}>
            {healthPercentage.toFixed(1)}% Healthy
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {healthyPods}/{totalPods} pods
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={healthPercentage}
          color={getHealthColor()}
          sx={{
            height: 8,
            borderRadius: 1,
            bgcolor: 'action.hover',
          }}
        />
      </Box>

      {/* Status Breakdown */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography variant="body2">Healthy</Typography>
          </Box>
          <Typography variant="body2" fontWeight={600}>
            {healthyPods}
          </Typography>
        </Box>

        {unhealthyPods > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ErrorOutlineIcon sx={{ fontSize: 16, color: 'error.main' }} />
              <Typography variant="body2">Unhealthy</Typography>
            </Box>
            <Typography variant="body2" fontWeight={600} color="error">
              {unhealthyPods}
            </Typography>
          </Box>
        )}

        {podsWithRestarts > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningAmberIcon sx={{ fontSize: 16, color: 'warning.main' }} />
              <Typography variant="body2">With Restarts</Typography>
            </Box>
            <Typography variant="body2" fontWeight={600} color="warning.main">
              {podsWithRestarts}
            </Typography>
          </Box>
        )}
      </Box>

      {hasIssues && (
        <Box
          sx={{
            mt: 2,
            p: 1,
            bgcolor: 'warning.dark',
            color: 'warning.contrastText',
            borderRadius: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" fontWeight={600}>
            Click to view pods and investigate issues
          </Typography>
        </Box>
      )}
    </GlassPanel>
  )
}
