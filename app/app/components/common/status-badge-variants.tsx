/**
 * StatusBadge Design Proposals
 *
 * Five different variants using MUI components for comparison
 */

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
  variant?: 'filled' | 'outlined'
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

// ==================== VARIANT 1: MUI Chip with Icons (Filled) ====================
// Classic look, colorful, clear visual hierarchy
export function StatusBadgeV1({ status, size = 'small' }: StatusBadgeProps) {
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
      }}
    />
  )
}

// ==================== VARIANT 2: MUI Chip Outlined with Icons ====================
// More subtle, modern look with borders instead of filled backgrounds
export function StatusBadgeV2({ status, size = 'small' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Unknown

  return (
    <Chip
      label={status}
      color={config.color}
      size={size}
      icon={config.icon}
      variant="outlined"
      sx={{
        fontWeight: 500,
        minWidth: size === 'small' ? 100 : 120,
      }}
    />
  )
}

// ==================== VARIANT 3: MUI Chip Minimal (No Icons) ====================
// Clean, text-focused approach
export function StatusBadgeV3({ status, size = 'small' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Unknown

  return (
    <Chip
      label={status}
      color={config.color}
      size={size}
      sx={{
        fontWeight: 600,
        minWidth: size === 'small' ? 90 : 110,
      }}
    />
  )
}

// ==================== VARIANT 4: MUI Chip with Rounded Borders ====================
// Pill-shaped badges, very modern
export function StatusBadgeV4({ status, size = 'small' }: StatusBadgeProps) {
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
        borderRadius: '16px', // More rounded than default
      }}
    />
  )
}

// ==================== VARIANT 5: MUI Chip Outlined Minimal ====================
// Most subtle option - outlined without icons
export function StatusBadgeV5({ status, size = 'small' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Unknown

  return (
    <Chip
      label={status}
      color={config.color}
      size={size}
      variant="outlined"
      sx={{
        fontWeight: 600,
        minWidth: size === 'small' ? 90 : 110,
        borderWidth: '1.5px',
      }}
    />
  )
}

// Export default (you can change this to your preferred variant)
export const StatusBadge = StatusBadgeV1
