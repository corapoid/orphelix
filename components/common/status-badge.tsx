import Chip from '@mui/material/Chip'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'
import HelpIcon from '@mui/icons-material/Help'
import type { DeploymentStatus, PodStatus, NodeStatus } from '@/types/kubernetes'

type Status = DeploymentStatus | PodStatus | NodeStatus | string

interface StatusBadgeProps {
  status: Status
  size?: 'small' | 'medium'
}

const statusConfig: Record<
  string,
  {
    color: 'success' | 'error' | 'warning' | 'info' | 'default'
    icon?: React.ReactElement
  }
> = {
  // Deployment statuses
  Available: { color: 'success', icon: <CheckCircleIcon /> },
  Progressing: { color: 'info', icon: <WarningIcon /> },
  Degraded: { color: 'error', icon: <ErrorIcon /> },

  // Pod statuses
  Running: { color: 'success', icon: <CheckCircleIcon /> },
  Pending: { color: 'warning', icon: <WarningIcon /> },
  Failed: { color: 'error', icon: <ErrorIcon /> },
  Succeeded: { color: 'success', icon: <CheckCircleIcon /> },
  CrashLoopBackOff: { color: 'error', icon: <ErrorIcon /> },

  // Node statuses
  Ready: { color: 'success', icon: <CheckCircleIcon /> },
  NotReady: { color: 'error', icon: <ErrorIcon /> },

  // Generic
  Unknown: { color: 'default', icon: <HelpIcon /> },
}

export function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
  const config = statusConfig[status] || { color: 'default' as const }

  return (
    <Chip
      label={status}
      color={config.color}
      size={size}
      icon={config.icon}
      sx={{ minWidth: size === 'small' ? 100 : 120 }}
    />
  )
}
