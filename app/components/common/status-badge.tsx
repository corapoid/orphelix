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
      icon={config.icon}
      sx={{
        fontWeight: 600,
        fontSize: size === 'small' ? '0.75rem' : '0.8125rem',
        minWidth: size === 'small' ? 100 : 120,
        height: size === 'small' ? 24 : 28,
        borderRadius: '6px',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? colors.bgDark : colors.bg,
        color: (theme) => theme.palette.mode === 'dark' ? colors.textDark : colors.text,
        border: 'none',
        '& .MuiChip-icon': {
          fontSize: size === 'small' ? '0.875rem' : '1rem',
          color: (theme) => theme.palette.mode === 'dark' ? colors.textDark : colors.text,
          marginLeft: '6px',
        },
        '& .MuiChip-label': {
          paddingLeft: '6px',
          paddingRight: '10px',
        },
      }}
    />
  )
}
