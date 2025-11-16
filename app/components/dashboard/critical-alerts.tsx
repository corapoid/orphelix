import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Link from 'next/link'
import type { DashboardSummary } from '@/types/kubernetes'
import { usePods } from '@/lib/hooks/use-pods'
import { useNodes } from '@/lib/hooks/use-nodes'
import { useDeployments } from '@/lib/hooks/use-deployments'

interface CriticalAlertsProps {
  summary: DashboardSummary
}

interface AlertItem {
  severity: 'error' | 'warning'
  message: string
  link: string
}

const STORAGE_KEY = 'criticalAlertsExpanded'

export function CriticalAlerts({ summary }: CriticalAlertsProps) {
  const [expanded, setExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved === null ? true : saved === 'true'
    }
    return true
  })

  const { data: pods } = usePods()
  const { data: nodes } = useNodes()
  const { data: deployments } = useDeployments()

  // Save to localStorage when expanded changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, expanded.toString())
  }, [expanded])

  const getCriticalAlerts = (): AlertItem[] => {
    const alerts: AlertItem[] = []

    // Critical: Failed pods
    if (summary.pods.failed > 0) {
      const failedPods = pods?.filter((p) => p.status === 'Failed' || p.status === 'CrashLoopBackOff') || []
      if (failedPods.length === 1) {
        // Single pod - go directly to pod details
        alerts.push({
          severity: 'error',
          message: `1 pod is failing: ${failedPods[0].name}`,
          link: `/pods/${failedPods[0].name}`,
        })
      } else {
        // Multiple pods - go to pods page with Failed filter
        alerts.push({
          severity: 'error',
          message: `${summary.pods.failed} pods are failing`,
          link: '/pods?status=Failed',
        })
      }
    }

    // Critical: Not ready nodes
    if (summary.nodes.notReady > 0) {
      const notReadyNodes = nodes?.filter((n) => n.status === 'NotReady') || []
      if (notReadyNodes.length === 1) {
        // Single node - go directly to node details
        alerts.push({
          severity: 'error',
          message: `1 node is not ready: ${notReadyNodes[0].name}`,
          link: `/nodes/${notReadyNodes[0].name}`,
        })
      } else {
        // Multiple nodes - go to nodes page with NotReady filter
        alerts.push({
          severity: 'error',
          message: `${summary.nodes.notReady} nodes are not ready`,
          link: '/nodes?status=NotReady',
        })
      }
    }

    // Critical: Degraded deployments
    if (summary.deployments.degraded > 0) {
      const degradedDeployments = deployments?.filter((d) => d.status === 'Degraded') || []
      const percent = (summary.deployments.degraded / summary.deployments.total) * 100

      if (degradedDeployments.length === 1) {
        // Single deployment - go directly to deployment details
        alerts.push({
          severity: percent > 30 ? 'error' : 'warning',
          message: `1 deployment is degraded: ${degradedDeployments[0].name}`,
          link: `/deployments/${degradedDeployments[0].name}`,
        })
      } else {
        // Multiple deployments - go to deployments page with Degraded filter
        if (percent > 30) {
          alerts.push({
            severity: 'error',
            message: `${summary.deployments.degraded} deployments are degraded (${Math.round(percent)}%)`,
            link: '/deployments?status=Degraded',
          })
        } else {
          alerts.push({
            severity: 'warning',
            message: `${summary.deployments.degraded} deployments are degraded`,
            link: '/deployments?status=Degraded',
          })
        }
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

  const alerts = getCriticalAlerts()

  if (alerts.length === 0) {
    return null
  }

  const errorAlerts = alerts.filter((a) => a.severity === 'error')

  return (
    <Paper
      elevation={0}
      sx={{
        py: expanded ? 2 : 1.5,
        px: 2,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        // Liquid glass effect
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? errorAlerts.length > 0
              ? 'rgba(30, 30, 46, 0.6)'
              : 'rgba(30, 30, 46, 0.6)'
            : errorAlerts.length > 0
              ? 'rgba(255, 255, 255, 0.25)'
              : 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? errorAlerts.length > 0
              ? 'rgba(211, 47, 47, 0.4)'
              : 'rgba(237, 108, 2, 0.4)'
            : errorAlerts.length > 0
              ? 'rgba(211, 47, 47, 0.3)'
              : 'rgba(237, 108, 2, 0.3)',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
            : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
        // Glass shine
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%, rgba(0, 0, 0, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 60%, rgba(0, 0, 0, 0.02) 100%)',
          pointerEvents: 'none',
          borderRadius: 3,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: errorAlerts.length > 0 ? 'error.main' : 'warning.main' }}>
            {errorAlerts.length > 0 ? 'Critical Issues Detected' : 'Warnings'}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ ml: 1 }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout={300}>
          <List dense sx={{ pt: 1 }}>
            {alerts.map((alert, index) => (
              <Link key={index} href={alert.link} passHref legacyBehavior>
                <ListItem
                  component="a"
                  sx={{
                    px: 0,
                    py: 0.5,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    borderRadius: 1,
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
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
              </Link>
            ))}
          </List>
        </Collapse>
      </Box>
    </Paper>
  )
}
