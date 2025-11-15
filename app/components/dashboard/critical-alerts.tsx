import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Link from 'next/link'
import type { DashboardSummary } from '@/types/kubernetes'

interface CriticalAlertsProps {
  summary: DashboardSummary
}

interface AlertItem {
  severity: 'error' | 'warning'
  message: string
  link?: string
}

function getCriticalAlerts(summary: DashboardSummary): AlertItem[] {
  const alerts: AlertItem[] = []

  // Critical: Failed pods
  if (summary.pods.failed > 0) {
    alerts.push({
      severity: 'error',
      message: `${summary.pods.failed} pod${summary.pods.failed > 1 ? 's are' : ' is'} failing`,
      link: '/pods',
    })
  }

  // Critical: Not ready nodes
  if (summary.nodes.notReady > 0) {
    alerts.push({
      severity: 'error',
      message: `${summary.nodes.notReady} node${summary.nodes.notReady > 1 ? 's are' : ' is'} not ready`,
      link: '/nodes',
    })
  }

  // Critical: Degraded deployments
  if (summary.deployments.degraded > 0) {
    const percent = (summary.deployments.degraded / summary.deployments.total) * 100
    if (percent > 30) {
      alerts.push({
        severity: 'error',
        message: `${summary.deployments.degraded} deployment${summary.deployments.degraded > 1 ? 's are' : ' is'} degraded (${Math.round(percent)}%)`,
        link: '/deployments',
      })
    } else {
      alerts.push({
        severity: 'warning',
        message: `${summary.deployments.degraded} deployment${summary.deployments.degraded > 1 ? 's are' : ' is'} degraded`,
        link: '/deployments',
      })
    }
  }

  // Warning: Many pending pods
  if (summary.pods.pending > 0) {
    const percent = (summary.pods.pending / summary.pods.total) * 100
    if (percent > 20) {
      alerts.push({
        severity: 'warning',
        message: `${summary.pods.pending} pod${summary.pods.pending > 1 ? 's are' : ' is'} pending (${Math.round(percent)}%)`,
        link: '/pods',
      })
    }
  }

  // Warning: Unbound volumes
  const unboundVolumes = summary.pv.total - summary.pv.bound
  if (unboundVolumes > 5) {
    alerts.push({
      severity: 'warning',
      message: `${unboundVolumes} persistent volumes are unbound`,
      link: '/pv',
    })
  }

  return alerts
}

export function CriticalAlerts({ summary }: CriticalAlertsProps) {
  const alerts = getCriticalAlerts(summary)

  if (alerts.length === 0) {
    return null
  }

  const errorAlerts = alerts.filter((a) => a.severity === 'error')
  const _warningAlerts = alerts.filter((a) => a.severity === 'warning')

  return (
    <Paper
      sx={{
        border: '1px solid',
        borderColor: errorAlerts.length > 0 ? 'error.main' : 'warning.main',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? errorAlerts.length > 0
              ? 'rgba(211, 47, 47, 0.08)'
              : 'rgba(237, 108, 2, 0.08)'
            : errorAlerts.length > 0
              ? 'rgba(211, 47, 47, 0.05)'
              : 'rgba(237, 108, 2, 0.05)',
      }}
    >
      <Alert
        severity={errorAlerts.length > 0 ? 'error' : 'warning'}
        sx={{
          '& .MuiAlert-message': { width: '100%' },
          border: 'none',
          bgcolor: 'transparent',
        }}
      >
        <AlertTitle sx={{ fontWeight: 700 }}>
          {errorAlerts.length > 0 ? 'Critical Issues Detected' : 'Warnings'}
        </AlertTitle>
        <List dense sx={{ pt: 1 }}>
          {alerts.map((alert, index) => (
            <ListItem
              key={index}
              sx={{
                px: 0,
                py: 0.5,
                ...(alert.link && {
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }),
              }}
              component={alert.link ? Link : 'li'}
              href={alert.link || ''}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {alert.severity === 'error' ? (
                  <ErrorOutlineIcon sx={{ fontSize: 20, color: 'error.main' }} />
                ) : (
                  <WarningAmberIcon sx={{ fontSize: 20, color: 'warning.main' }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={alert.message}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 500,
                }}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Click on an issue to view details
        </Typography>
      </Alert>
    </Paper>
  )
}
