import Chip from '@mui/material/Chip'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import type { DeploymentStatus, PodStatus, NodeStatus } from '@/types/kubernetes'

type Status = DeploymentStatus | PodStatus | NodeStatus | string

interface StatusBadgeProps {
  status: Status
  size?: 'small' | 'medium'
}

// Config for status colors and icons
const statusConfig: Record<string, {
  color: 'success' | 'error' | 'warning' | 'info' | 'default'
  icon?: React.ReactElement
}> = {
  // Success states
  Available: { color: 'success', icon: <CheckCircleIcon /> },
  Running: { color: 'success', icon: <CheckCircleIcon /> },
  Ready: { color: 'success', icon: <CheckCircleIcon /> },
  Succeeded: { color: 'success', icon: <CheckCircleIcon /> },

  // Error states
  Failed: { color: 'error', icon: <ErrorIcon /> },
  Degraded: { color: 'error', icon: <ErrorIcon /> },
  NotReady: { color: 'error', icon: <ErrorIcon /> },
  CrashLoopBackOff: { color: 'error', icon: <ErrorIcon /> },

  // Warning states
  Pending: { color: 'warning', icon: <HourglassEmptyIcon /> },

  // Info states
  Progressing: { color: 'info', icon: <HourglassEmptyIcon /> },

  // Unknown
  Unknown: { color: 'default', icon: <HelpOutlineIcon /> },
}

/**
 * StatusBadge - V4 Variant (Pill-shaped with Icons)
 *
 * Modern, rounded badge design using MUI Chip
 */
export function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Unknown

  return (
    <Chip
      label={status}
      color={config.color}
      size={size}
      icon={config.icon}
      sx={{
        fontWeight: 500,
        minWidth: size === 'small' ? 100 : 120,
        borderRadius: '16px', // Extra rounded (pill-shaped)
      }}
    />
  )
}
