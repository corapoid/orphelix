import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import type { DeploymentStatus, PodStatus, NodeStatus } from '@/types/kubernetes'

type Status = DeploymentStatus | PodStatus | NodeStatus | string

interface StatusBadgeProps {
  status: Status
  size?: 'small' | 'medium'
}

const statusConfig: Record<
  string,
  {
    color: string
    bgColor: string
    borderColor: string
  }
> = {
  // Deployment statuses
  Available: {
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  Progressing: {
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  Degraded: {
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },

  // Pod statuses
  Running: {
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  Pending: {
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  Failed: {
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  Succeeded: {
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  CrashLoopBackOff: {
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },

  // Node statuses
  Ready: {
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  NotReady: {
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },

  // Generic
  Unknown: {
    color: '#6b7280',
    bgColor: 'rgba(107, 114, 128, 0.1)',
    borderColor: 'rgba(107, 114, 128, 0.3)',
  },
}

/**
 * Modern status badge component
 *
 * Minimalist design matching the Live badge style
 */
export function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Unknown

  const fontSize = size === 'small' ? '0.75rem' : '0.875rem'
  const iconSize = size === 'small' ? 8 : 10
  const px = size === 'small' ? 1.5 : 2
  const py = size === 'small' ? 0.5 : 0.75

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px,
        py,
        borderRadius: 1.5,
        bgcolor: config.bgColor,
        border: '1px solid',
        borderColor: config.borderColor,
        minWidth: size === 'small' ? 90 : 110,
        justifyContent: 'center',
      }}
    >
      <FiberManualRecordIcon
        sx={{
          fontSize: iconSize,
          color: config.color,
        }}
      />
      <Typography
        variant="caption"
        sx={{
          fontWeight: 500,
          color: config.color,
          fontSize,
        }}
      >
        {status}
      </Typography>
    </Box>
  )
}
