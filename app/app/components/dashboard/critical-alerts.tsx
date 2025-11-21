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
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ReactMarkdown from 'react-markdown'
import type { DashboardSummary } from '@/types/kubernetes'
import { usePods } from '@/lib/hooks/use-pods'
import { useNodes } from '@/lib/hooks/use-nodes'
import { useDeployments } from '@/lib/hooks/use-deployments'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import { useSidebarPins, useModeStore, useCriticalIssuesSettings } from '@/lib/core/store'
import { collectFailingPodsContext } from '@/lib/ai/context-collector'
import { useTheme } from '@orphelix/ui'

interface CriticalAlertsProps {
  summary: DashboardSummary
}

interface AlertItem {
  severity: 'error' | 'warning'
  message: string
  path: string
  type?: 'pod' | 'node' | 'deployment'
  name?: string
}

const STORAGE_KEY = 'criticalAlertsExpanded'

export function CriticalAlerts({ summary }: CriticalAlertsProps) {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const [expanded, setExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved === null ? true : saved === 'true'
    }
    return true
  })

  const [aiExplanations, setAiExplanations] = useState<Record<number, string>>({})
  const [aiLoading, setAiLoading] = useState<Record<number, boolean>>({})
  const [hasApiKey, setHasApiKey] = useState(false)

  const { data: pods, refetch: refetchPods } = usePods()
  const { data: nodes, refetch: refetchNodes } = useNodes()
  const { data: deployments, refetch: refetchDeployments } = useDeployments()
  const navigateTo = useNavigateTo()
  const { isPinned } = useSidebarPins()
  const { isResourceEnabled } = useCriticalIssuesSettings()
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  useEffect(() => {
    const apiKey = localStorage.getItem('kubevista_openai_key')
    setHasApiKey(!!apiKey)

    const handleKeyUpdate = () => {
      const key = localStorage.getItem('kubevista_openai_key')
      setHasApiKey(!!key)
    }

    window.addEventListener('openai-key-updated', handleKeyUpdate)
    return () => window.removeEventListener('openai-key-updated', handleKeyUpdate)
  }, [])

  // Save to localStorage when expanded changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, expanded.toString())
  }, [expanded])

  // Auto-refresh critical alerts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchPods()
      refetchNodes()
      refetchDeployments()
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [refetchPods, refetchNodes, refetchDeployments])

  const getAIExplanation = async (alert: AlertItem, index: number) => {
    if (!hasApiKey) return

    setAiLoading(prev => ({ ...prev, [index]: true }))
    setAiExplanations(prev => ({ ...prev, [index]: '' }))

    try {
      const apiKey = localStorage.getItem('kubevista_openai_key')
      if (!apiKey) return

      // Collect detailed context from failing pods
      const failingPodsContext = await collectFailingPodsContext(namespace || 'default', mode)

      const query = `Explain this Kubernetes issue:

**Issue:** ${alert.message}

${failingPodsContext ? `**Detailed Pod Information:**${failingPodsContext}\n` : ''}

Provide only:
1. **What's happening** - Brief explanation based on the actual logs and events
2. **Root cause** - Why this is occurring (reference specific errors from logs if available)

Keep it concise and practical.`

      const response = await fetch('/api/ai/troubleshoot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, apiKey }),
      })

      if (!response.ok) throw new Error('Failed to get AI explanation')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let explanation = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          explanation += chunk
          setAiExplanations(prev => ({ ...prev, [index]: explanation }))
        }
      }

      setAiLoading(prev => ({ ...prev, [index]: false }))
    } catch (error) {
      console.error('Failed to get AI explanation:', error)
      setAiLoading(prev => ({ ...prev, [index]: false }))
    }
  }

  const getCriticalAlerts = (): AlertItem[] => {
    const alerts: AlertItem[] = []

    // Critical: Failed pods (only if pods are visible and enabled)
    if (isPinned('/pods') && isResourceEnabled('pods') && summary.pods.failed > 0) {
      const failedPods = pods?.filter((p) => p.status === 'Failed' || p.status === 'CrashLoopBackOff') || []
      if (failedPods.length === 1) {
        // Single pod - go directly to pod details
        alerts.push({
          severity: 'error',
          message: `1 pod is failing: ${failedPods[0].name}`,
          path: `/pods/${failedPods[0].name}`,
          type: 'pod',
          name: failedPods[0].name,
        })
      } else {
        // Multiple pods - go to pods page with Failed filter
        alerts.push({
          severity: 'error',
          message: `${summary.pods.failed} pods are failing`,
          path: '/pods?status=Failed',
          type: 'pod',
        })
      }
    }

    // Critical: Not ready nodes (only if nodes are visible and enabled)
    if (isPinned('/nodes') && isResourceEnabled('nodes') && summary.nodes.notReady > 0) {
      const notReadyNodes = nodes?.filter((n) => n.status === 'NotReady') || []
      if (notReadyNodes.length === 1) {
        // Single node - go directly to node details
        alerts.push({
          severity: 'error',
          message: `1 node is not ready: ${notReadyNodes[0].name}`,
          path: `/nodes/${notReadyNodes[0].name}`,
        })
      } else {
        // Multiple nodes - go to nodes page with NotReady filter
        alerts.push({
          severity: 'error',
          message: `${summary.nodes.notReady} nodes are not ready`,
          path: '/nodes?status=NotReady',
        })
      }
    }

    // Critical: Degraded deployments (only if deployments are visible and enabled)
    if (isPinned('/deployments') && isResourceEnabled('deployments') && summary.deployments.degraded > 0) {
      const degradedDeployments = deployments?.filter((d) => d.status === 'Degraded') || []
      const percent = (summary.deployments.degraded / summary.deployments.total) * 100

      if (degradedDeployments.length === 1) {
        // Single deployment - go directly to deployment details
        alerts.push({
          severity: percent > 30 ? 'error' : 'warning',
          message: `1 deployment is degraded: ${degradedDeployments[0].name}`,
          path: `/deployments/${degradedDeployments[0].name}`,
        })
      } else {
        // Multiple deployments - go to deployments page with Degraded filter
        if (percent > 30) {
          alerts.push({
            severity: 'error',
            message: `${summary.deployments.degraded} deployments are degraded (${Math.round(percent)}%)`,
            path: '/deployments?status=Degraded',
          })
        } else {
          alerts.push({
            severity: 'warning',
            message: `${summary.deployments.degraded} deployments are degraded`,
            path: '/deployments?status=Degraded',
          })
        }
      }
    }

    // Warning: Many pending pods (only if pods are visible and enabled)
    if (isPinned('/pods') && isResourceEnabled('pods') && summary.pods.pending > 0) {
      const percent = (summary.pods.pending / summary.pods.total) * 100
      if (percent > 20) {
        alerts.push({
          severity: 'warning',
          message: `${summary.pods.pending} pod${summary.pods.pending > 1 ? 's are' : ' is'} pending (${Math.round(percent)}%)`,
          path: '/pods',
        })
      }
    }

    // Warning: Unbound volumes (only if PVs are visible and enabled)
    if (isPinned('/pv') && isResourceEnabled('pv')) {
      const unboundVolumes = summary.pv.total - summary.pv.bound
      if (unboundVolumes > 5) {
        alerts.push({
          severity: 'warning',
          message: `${unboundVolumes} persistent volumes are unbound`,
          path: '/pv',
        })
      }
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
        py: expanded ? 2.5 : 1,
        px: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        overflow: 'hidden',
        // Liquid glass effect with gradient
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? errorAlerts.length > 0
              ? 'rgba(40, 30, 35, 0.5)'
              : 'rgba(40, 35, 30, 0.5)'
            : errorAlerts.length > 0
              ? 'rgba(255, 245, 245, 0.25)'
              : 'rgba(255, 250, 245, 0.25)',
        ...(isGlass && {
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        }),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(209, 213, 219, 0.4)',
        ...(isGlass && {
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
              : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
        }),
        // Gradient overlay for depth
        '&::before': isGlass ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? errorAlerts.length > 0
                ? 'linear-gradient(135deg, rgba(211, 47, 47, 0.12) 0%, rgba(211, 47, 47, 0.04) 30%, transparent 50%, rgba(0, 0, 0, 0.15) 100%)'
                : 'linear-gradient(135deg, rgba(237, 108, 2, 0.12) 0%, rgba(237, 108, 2, 0.04) 30%, transparent 50%, rgba(0, 0, 0, 0.15) 100%)'
              : errorAlerts.length > 0
                ? 'linear-gradient(135deg, rgba(211, 47, 47, 0.08) 0%, rgba(211, 47, 47, 0.02) 30%, transparent 50%, rgba(0, 0, 0, 0.03) 100%)'
                : 'linear-gradient(135deg, rgba(237, 108, 2, 0.08) 0%, rgba(237, 108, 2, 0.02) 30%, transparent 50%, rgba(0, 0, 0, 0.03) 100%)',
          pointerEvents: 'none',
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        } : {},
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="body1" sx={{ fontWeight: 700, color: errorAlerts.length > 0 ? 'error.main' : 'warning.main' }}>
            {errorAlerts.length > 0 ? 'Critical Issues Detected' : 'Warnings'}
          </Typography>
          <IconButton
            size="small"
            sx={{ ml: 1 }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout={300}>
          <List dense sx={{ pt: 1 }}>
            {alerts.map((alert, index) => (
              <Box key={index}>
                <ListItem
                  sx={{
                    px: 0,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    onClick={() => navigateTo(alert.path)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flex: 1,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      borderRadius: (theme) => `${theme.shape.borderRadius}px`,
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
                  </Box>
                  {hasApiKey && alert.severity === 'error' && (
                    <Button
                      size="small"
                      startIcon={aiLoading[index] ? <CircularProgress size={14} /> : <AutoFixHighIcon />}
                      onClick={(e) => {
                        e.stopPropagation()
                        getAIExplanation(alert, index)
                      }}
                      disabled={aiLoading[index]}
                      sx={{
                        ml: 1,
                        minWidth: 'auto',
                        px: 1.5,
                        py: 0.5,
                        fontSize: '0.75rem',
                        textTransform: 'none',
                        // Liquid glass effect
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(139, 92, 246, 0.15)'
                            : 'rgba(139, 92, 246, 0.1)',
                        ...(isGlass && {
                          backdropFilter: 'blur(12px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                        }),
                        border: '1px solid',
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(139, 92, 246, 0.3)'
                            : 'rgba(139, 92, 246, 0.2)',
                        ...(isGlass && {
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '0 2px 8px 0 rgba(139, 92, 246, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                              : '0 2px 8px 0 rgba(139, 92, 246, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
                        }),
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(139, 92, 246, 0.25)'
                              : 'rgba(139, 92, 246, 0.15)',
                          borderColor: 'primary.main',
                        },
                        '&:disabled': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(139, 92, 246, 0.1)'
                              : 'rgba(139, 92, 246, 0.05)',
                        },
                      }}
                    >
                      AI Explain
                    </Button>
                  )}
                </ListItem>

                {aiExplanations[index] && (
                  <Box sx={{
                    ml: 4,
                    mb: 1,
                    p: 2,
                    '& p': { mb: 1 },
                    '& h1, & h2, & h3, & h4, & h5, & h6': { mt: 2, mb: 1 },
                  }}>
                    <ReactMarkdown>{aiExplanations[index]}</ReactMarkdown>
                  </Box>
                )}
              </Box>
            ))}
          </List>
        </Collapse>
      </Box>
    </Paper>
  )
}
