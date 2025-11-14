'use client'

import { Box, CircularProgress, Tooltip, IconButton, Typography } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import SyncIcon from '@mui/icons-material/Sync'
import ErrorIcon from '@mui/icons-material/Error'
import { useRealtimeUpdates } from '@/lib/hooks/use-realtime'
import { useModeStore } from '@/lib/core/store'

/**
 * Real-time connection status indicator
 *
 * Displays:
 * - Connection status (connected/disconnected/error)
 * - Reconnect button when disconnected
 * - Only visible in real mode with realtime enabled
 */
export function RealtimeStatus() {
  const mode = useModeStore((state) => state.mode)
  const realtimeEnabled = useModeStore((state) => state.realtimeEnabled)
  const { status, error, reconnect } = useRealtimeUpdates()

  // Don't show in mock mode or when realtime is disabled
  if (mode !== 'real' || !realtimeEnabled) {
    return null
  }

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return '#10b981' // green
      case 'connecting':
        return '#3b82f6' // blue
      case 'error':
        return '#ef4444' // red
      case 'disconnected':
        return '#6b7280' // gray
      default:
        return '#6b7280'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <FiberManualRecordIcon sx={{ fontSize: 10 }} />
      case 'connecting':
        return <CircularProgress size={10} />
      case 'error':
        return <ErrorIcon sx={{ fontSize: 12 }} />
      case 'disconnected':
        return <FiberManualRecordIcon sx={{ fontSize: 10 }} />
      default:
        return <FiberManualRecordIcon sx={{ fontSize: 10 }} />
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case 'connected':
        return 'Live'
      case 'connecting':
        return 'Connecting...'
      case 'error':
        return 'Error'
      case 'disconnected':
        return 'Disconnected'
      default:
        return 'Unknown'
    }
  }

  const getTooltipTitle = () => {
    if (error) {
      return `Real-time connection error: ${error}`
    }
    switch (status) {
      case 'connected':
        return 'Real-time updates active'
      case 'connecting':
        return 'Connecting to real-time updates...'
      case 'error':
        return 'Real-time connection error. Click to retry.'
      case 'disconnected':
        return 'Real-time updates disconnected. Click to reconnect.'
      default:
        return 'Real-time status unknown'
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      <Tooltip title={getTooltipTitle()} arrow>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            py: 0.5,
            borderRadius: 1.5,
            bgcolor: status === 'connected' ? 'rgba(16, 185, 129, 0.1)' : 'background.default',
            border: '1px solid',
            borderColor: status === 'connected' ? 'rgba(16, 185, 129, 0.3)' : 'divider',
            cursor: status === 'disconnected' || status === 'error' ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            animation: status === 'connecting' ? 'pulse 2s infinite' : 'none',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.6 },
            },
            '&:hover': status === 'disconnected' || status === 'error' ? {
              bgcolor: 'action.hover',
            } : {},
          }}
          onClick={status === 'disconnected' || status === 'error' ? reconnect : undefined}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: getStatusColor(),
            }}
          >
            {getStatusIcon()}
          </Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              color: status === 'connected' ? getStatusColor() : 'text.secondary',
              fontSize: '0.75rem',
            }}
          >
            {getStatusLabel()}
          </Typography>
        </Box>
      </Tooltip>

      {/* Reconnect button when disconnected or error */}
      {(status === 'disconnected' || status === 'error') && (
        <Tooltip title="Retry connection" arrow>
          <IconButton size="small" onClick={reconnect} sx={{ color: 'text.secondary' }}>
            <SyncIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
