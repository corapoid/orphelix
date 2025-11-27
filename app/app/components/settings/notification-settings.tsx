'use client'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Alert from '@mui/material/Alert'
import { useState, useEffect } from 'react'
import { useTheme } from '@orphelix/ui'

interface NotificationStatus {
  enabled: boolean
  enabledResources: string[]
  status: string
}

export function NotificationSettings() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [permissionState, setPermissionState] = useState<NotificationPermission>('default')

  // Load current notification settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/notifications')
        if (response.ok) {
          const data: NotificationStatus = await response.json()
          setNotificationsEnabled(data.enabled)
        }
      } catch (error) {
        console.error('Failed to load notification settings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()

    // Check browser notification permission
    if ('Notification' in window) {
      setPermissionState(Notification.permission)
    }
  }, [])

  const handleToggle = async (checked: boolean) => {
    // Request browser permission if not already granted
    if (checked && 'Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      setPermissionState(permission)

      if (permission !== 'granted') {
        return // Don't enable if permission denied
      }
    }

    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: checked }),
      })

      if (response.ok) {
        setNotificationsEnabled(checked)

        // Send a test notification when enabled
        if (checked && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Orphelix - Notifications Enabled', {
            body: 'You will now receive desktop notifications for critical issues.',
            icon: '/icon.png',
          })
        }
      }
    } catch (error) {
      console.error('Failed to update notification settings:', error)
    }
  }

  const showPermissionWarning = notificationsEnabled && permissionState !== 'granted'

  return (
    <Paper
      elevation={isGlass ? 0 : 1}
      sx={{
        p: 3,
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        ...(isGlass && {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 46, 0.6)'
              : 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(209, 213, 219, 0.4)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
              : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
        }),
      }}
    >
      <Typography variant="body2" color="text.secondary" paragraph>
        Receive desktop notifications when critical issues are detected in your cluster. Notifications are based on the resources you&apos;ve enabled in Critical Issues Monitoring above.
      </Typography>

      {showPermissionWarning && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Browser notification permission is {permissionState === 'denied' ? 'denied' : 'not granted'}.
          Please enable notifications in your browser settings to receive alerts.
        </Alert>
      )}

      <FormControlLabel
        control={
          <Switch
            checked={notificationsEnabled}
            onChange={(e) => handleToggle(e.target.checked)}
            color="primary"
            disabled={loading}
          />
        }
        label={
          <Box>
            <Typography variant="body1" fontWeight={600}>
              Enable Desktop Notifications
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Get notified when new critical issues are detected (pods failing, nodes not ready, etc.)
            </Typography>
          </Box>
        }
      />

      {notificationsEnabled && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'action.hover', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            💡 <strong>Tip:</strong> The notification worker checks for critical issues every 30 seconds
            and will only alert you when new issues are detected, not for existing ones.
          </Typography>
        </Box>
      )}
    </Paper>
  )
}
