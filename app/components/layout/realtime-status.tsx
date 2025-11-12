'use client'

import { Box, Chip, CircularProgress, Tooltip, IconButton } from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import SyncIcon from '@mui/icons-material/Sync'
import ErrorIcon from '@mui/icons-material/Error'
import { useRealtimeUpdates } from '@/lib/hooks/use-realtime'
import { useModeStore } from '@/lib/store'

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
  const { status, error, reconnect, isConnected } = useRealtimeUpdates()

  // Don't show in mock mode or when realtime is disabled
  if (mode !== 'real' || !realtimeEnabled) {
    return null
  }

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'success'
      case 'connecting':
        return 'info'
      case 'error':
        return 'error'
      case 'disconnected':
        return 'default'
      default:
        return 'default'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <WifiIcon fontSize="small" />
      case 'connecting':
        return <CircularProgress size={16} />
      case 'error':
        return <ErrorIcon fontSize="small" />
      case 'disconnected':
        return <WifiOffIcon fontSize="small" />
      default:
        return <WifiOffIcon fontSize="small" />
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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title={getTooltipTitle()} arrow>
        <Chip
          icon={getStatusIcon()}
          label={getStatusLabel()}
          color={getStatusColor()}
          size="small"
          variant={isConnected ? 'filled' : 'outlined'}
          sx={{
            animation: status === 'connecting' ? 'pulse 2s infinite' : 'none',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.6 },
            },
          }}
        />
      </Tooltip>

      {/* Reconnect button when disconnected or error */}
      {(status === 'disconnected' || status === 'error') && (
        <Tooltip title="Retry connection" arrow>
          <IconButton size="small" onClick={reconnect} color="primary">
            <SyncIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
