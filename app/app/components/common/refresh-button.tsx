'use client'

import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import RefreshIcon from '@mui/icons-material/Refresh'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useModeStore } from '@/lib/core/store'

interface RefreshButtonProps {
  onRefresh: () => unknown
  isLoading?: boolean
  size?: 'small' | 'medium' | 'large'
  showCountdown?: boolean
}

/**
 * Refresh button with auto-refresh countdown
 *
 * Shows manual refresh button and optional countdown for auto-refresh
 */
export function RefreshButton({
  onRefresh,
  isLoading = false,
  size = 'medium',
  showCountdown = true,
}: RefreshButtonProps) {
  const { autoRefreshEnabled, autoRefreshInterval } = useModeStore()
  const [countdown, setCountdown] = useState(autoRefreshInterval)
  const [refreshing, setRefreshing] = useState(false)

  // Reset countdown when interval changes
  useEffect(() => {
    setCountdown(autoRefreshInterval)
  }, [autoRefreshInterval])

  // Countdown timer
  useEffect(() => {
    if (!autoRefreshEnabled) {
      setCountdown(autoRefreshInterval)
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return autoRefreshInterval
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [autoRefreshEnabled, autoRefreshInterval])

  const handleRefresh = async () => {
    setRefreshing(true)
    setCountdown(autoRefreshInterval) // Reset countdown on manual refresh
    try {
      await onRefresh()
    } finally {
      setRefreshing(false)
    }
  }

  const loading = isLoading || refreshing

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {showCountdown && autoRefreshEnabled && (
        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 40 }}>
          {countdown}s
        </Typography>
      )}
      <Tooltip title="Refresh data">
        <IconButton
          onClick={handleRefresh}
          disabled={loading}
          size={size}
          sx={{
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          {loading ? (
            <CircularProgress size={size === 'small' ? 16 : 24} />
          ) : (
            <RefreshIcon fontSize={size} />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  )
}
