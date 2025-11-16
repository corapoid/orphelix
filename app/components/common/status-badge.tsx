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
  Active: { color: 'success', icon: <CheckCircleIcon /> },
  Bound: { color: 'success', icon: <CheckCircleIcon /> },
  Normal: { color: 'success', icon: <CheckCircleIcon /> },

  // Error states
  Failed: { color: 'error', icon: <ErrorIcon /> },
  Degraded: { color: 'error', icon: <ErrorIcon /> },
  NotReady: { color: 'error', icon: <ErrorIcon /> },
  CrashLoopBackOff: { color: 'error', icon: <ErrorIcon /> },

  // Warning states
  Pending: { color: 'warning', icon: <HourglassEmptyIcon /> },
  Warning: { color: 'warning', icon: <ErrorIcon /> },

  // Info states
  Progressing: { color: 'info', icon: <HourglassEmptyIcon /> },

  // Unknown
  Unknown: { color: 'default', icon: <HelpOutlineIcon /> },
}

/**
 * StatusBadge - iOS Style
 *
 * Clean, minimal badge design inspired by iOS
 */
export function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Unknown

  // iOS-style color mapping
  const getColors = (colorType: typeof config.color) => {
    const colorMap = {
      success: {
        bg: 'rgba(52, 199, 89, 0.15)',
        bgDark: 'rgba(52, 199, 89, 0.2)',
        text: '#34C759',
        textDark: '#30D158',
      },
      error: {
        bg: 'rgba(255, 59, 48, 0.15)',
        bgDark: 'rgba(255, 69, 58, 0.2)',
        text: '#FF3B30',
        textDark: '#FF453A',
      },
      warning: {
        bg: 'rgba(255, 149, 0, 0.15)',
        bgDark: 'rgba(255, 159, 10, 0.2)',
        text: '#FF9500',
        textDark: '#FF9F0A',
      },
      info: {
        bg: 'rgba(0, 122, 255, 0.15)',
        bgDark: 'rgba(10, 132, 255, 0.2)',
        text: '#007AFF',
        textDark: '#0A84FF',
      },
      default: {
        bg: 'rgba(142, 142, 147, 0.15)',
        bgDark: 'rgba(142, 142, 147, 0.2)',
        text: '#8E8E93',
        textDark: '#98989D',
      },
    }
    return colorMap[colorType] || colorMap.default
  }

  const colors = getColors(config.color)

  return (
    <Chip
      label={status}
      size={size}
      sx={{
        fontWeight: 500,
        fontSize: '0.6875rem',
        height: 20,
        minWidth: 70,
        borderRadius: '10px',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? colors.bgDark : colors.bg,
        color: (theme) => theme.palette.mode === 'dark' ? colors.textDark : colors.text,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.08)',
        boxShadow: 'none',
        '& .MuiChip-label': {
          padding: '0 8px',
        },
      }}
    />
  )
}
