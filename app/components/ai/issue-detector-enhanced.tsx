'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import CircularProgress from '@mui/material/CircularProgress'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { detectIssuesFromEvents, analyzeResourceMetrics, collectFailingPodsContext } from '@/lib/ai/context-collector'
import type { Event } from '@/types/kubernetes'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ReactMarkdown from 'react-markdown'

interface IssueDetectorEnhancedProps {
  events?: Event[]
  metrics?: {
    cpu?: string
    memory?: string
  }
  summary?: {
    pods?: { failed: number; total: number }
    nodes?: { notReady: number; total: number }
    deployments?: { degraded: number; total: number }
  }
  namespace?: string
}

interface DetectedIssue {
  severity: 'error' | 'warning' | 'info'
  message: string
  relatedEvents?: Event[]
  explanation?: string
  loading?: boolean
}

export function IssueDetectorEnhanced({ events = [], metrics, summary, namespace = 'default' }: IssueDetectorEnhancedProps) {
  const [issues, setIssues] = useState<DetectedIssue[]>([])
  const [expanded, setExpanded] = useState(true)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [autoExplainEnabled, setAutoExplainEnabled] = useState(false)

  // Import useModeStore dynamically to get current mode
  const [mode, setMode] = useState<'real' | 'mock'>('real')
  useEffect(() => {
    import('@/lib/core/store').then(({ useModeStore }) => {
      const currentMode = useModeStore.getState().mode
      setMode(currentMode)
    })
  }, [])

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

  useEffect(() => {
    const detectedIssues: DetectedIssue[] = []

    // Detect critical issues from summary
    if (summary) {
      if (summary.pods && summary.pods.failed > 0) {
        detectedIssues.push({
          severity: 'error',
          message: `${summary.pods.failed} pod${summary.pods.failed > 1 ? 's are' : ' is'} failing (Failed or CrashLoopBackOff)`,
        })
      }

      if (summary.nodes && summary.nodes.notReady > 0) {
        detectedIssues.push({
          severity: 'error',
          message: `${summary.nodes.notReady} node${summary.nodes.notReady > 1 ? 's are' : ' is'} not ready`,
        })
      }

      if (summary.deployments && summary.deployments.degraded > 0) {
        detectedIssues.push({
          severity: 'warning',
          message: `${summary.deployments.degraded} deployment${summary.deployments.degraded > 1 ? 's are' : ' is'} degraded`,
        })
      }
    }

    // Detect issues from events with related events
    if (events.length > 0) {
      const eventIssues = detectIssuesFromEvents(events)
      eventIssues.forEach(issue => {
        // Find related events for this issue
        const relatedEvents = events.filter(e => {
          const text = `${e.reason} ${e.message}`.toLowerCase()
          return (
            (issue.includes('CrashLoopBackOff') && /crashloopbackoff|backoff/i.test(text)) ||
            (issue.includes('pull container image') && /imagepullbackoff|errimagepull/i.test(text)) ||
            (issue.includes('Out Of Memory') && /oomkilled|out of memory/i.test(text)) ||
            (issue.includes('Insufficient resources') && /insufficient (cpu|memory)/i.test(text)) ||
            (issue.includes('cannot be scheduled') && /failed scheduling/i.test(text)) ||
            (issue.includes('Health probe') && /liveness probe failed|readiness probe failed/i.test(text))
          )
        }).slice(0, 5) // Max 5 related events

        detectedIssues.push({
          severity: issue.includes('critically') || issue.includes('CrashLoopBackOff') ? 'error' : 'warning',
          message: issue,
          relatedEvents,
        })
      })
    }

    // Analyze metrics
    if (metrics) {
      const metricIssues = analyzeResourceMetrics(metrics)
      metricIssues.forEach(issue => {
        detectedIssues.push({
          severity: issue.includes('critically') ? 'error' : 'warning',
          message: issue,
        })
      })
    }

    setIssues(detectedIssues)
  }, [events, metrics, summary])

  const getAIExplanation = async (issue: DetectedIssue, index: number) => {
    if (!hasApiKey) return

    // Mark as loading
    setIssues(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], loading: true }
      return updated
    })

    try {
      const apiKey = localStorage.getItem('kubevista_openai_key')
      if (!apiKey) return

      // Build context for AI
      const eventContext = issue.relatedEvents?.map(e =>
        `[${e.type}] ${e.reason}: ${e.message}${e.count > 1 ? ` (×${e.count})` : ''}`
      ).join('\n') || ''

      // Collect detailed context from failing pods (logs, events, etc.)
      const failingPodsContext = await collectFailingPodsContext(namespace, mode)

      const query = `Explain this Kubernetes issue:

**Issue:** ${issue.message}

${eventContext ? `**Related Events:**\n${eventContext}\n` : ''}

${failingPodsContext ? `**Detailed Pod Information:**${failingPodsContext}\n` : ''}

Provide only:
1. **What's happening** - Brief explanation based on the actual logs and events
2. **Root cause** - Why this is occurring (reference specific errors from logs if available)

Keep it concise and practical. Use the actual pod names, namespaces, and error messages from the context above.`

      const response = await fetch('/api/ai/troubleshoot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          apiKey,
        }),
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

          // Update state with accumulated explanation
          setIssues(prev => {
            const updated = [...prev]
            updated[index] = { ...updated[index], explanation, loading: true }
            return updated
          })
        }

        // Mark as complete when streaming is done
        setIssues(prev => {
          const updated = [...prev]
          updated[index] = { ...updated[index], explanation, loading: false }
          return updated
        })
      }
    } catch (error) {
      console.error('Failed to get AI explanation:', error)
      setIssues(prev => {
        const updated = [...prev]
        updated[index] = { ...updated[index], loading: false }
        return updated
      })
    }
  }

  const autoExplainAll = async () => {
    setAutoExplainEnabled(true)
    for (let i = 0; i < issues.length; i++) {
      if (!issues[i].explanation && !issues[i].loading) {
        await getAIExplanation(issues[i], i)
      }
    }
  }

  // Show widget even if no issues detected (for testing)
  if (issues.length === 0) {
    return (
      <GlassPanel sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToyIcon color="success" />
          <Typography variant="body1" fontWeight={600} color="success.main">
            No Issues Detected
          </Typography>
          <Chip
            label="All Good"
            size="small"
            color="success"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {events.length > 0
            ? `Analyzed ${events.length} event${events.length > 1 ? 's' : ''} - everything looks healthy!`
            : 'No events to analyze yet. Events will appear here as they occur.'}
        </Typography>
      </GlassPanel>
    )
  }

  const errorCount = issues.filter(i => i.severity === 'error').length
  const warningCount = issues.filter(i => i.severity === 'warning').length

  return (
    <GlassPanel sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: expanded ? 2 : 0,
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flex: 1 }}
          onClick={() => setExpanded(!expanded)}
        >
          <WarningIcon color="warning" />
          <Typography variant="body1" fontWeight={600}>
            Issues Detected
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {errorCount > 0 && (
              <Chip
                label={`${errorCount} Critical`}
                size="small"
                color="error"
                icon={<ErrorIcon />}
              />
            )}
            {warningCount > 0 && (
              <Chip
                label={`${warningCount} Warning${warningCount > 1 ? 's' : ''}`}
                size="small"
                color="warning"
              />
            )}
          </Box>
        </Box>
        {hasApiKey && (
          <Button
            variant="contained"
            size="small"
            startIcon={<AutoFixHighIcon />}
            onClick={autoExplainAll}
            disabled={autoExplainEnabled}
            sx={{ ml: 2 }}
          >
            {autoExplainEnabled ? 'Explaining...' : 'Explain All'}
          </Button>
        )}
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {issues.map((issue, idx) => (
            <Box key={idx}>
              <Alert
                severity={issue.severity}
                sx={{
                  width: '100%',
                  mb: 1,
                  '& .MuiAlert-message': {
                    width: '100%',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <AlertTitle sx={{ fontWeight: 600, mb: 0, flex: 1 }}>
                    {issue.message}
                  </AlertTitle>
                  {hasApiKey && !issue.explanation && !issue.loading && (
                    <Button
                      size="small"
                      startIcon={<SmartToyIcon />}
                      onClick={() => getAIExplanation(issue, idx)}
                      sx={{ ml: 2 }}
                    >
                      Explain
                    </Button>
                  )}
                </Box>
              </Alert>

              <Box>
                {issue.loading && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2" color="text.secondary">
                      AI is analyzing this issue...
                    </Typography>
                  </Box>
                )}

                {issue.explanation && (
                  <Box sx={{
                    p: 2,
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                    '& p': { mb: 1 },
                    '& pre': {
                      bgcolor: 'background.paper',
                      p: 1.5,
                      borderRadius: 1,
                      overflow: 'auto'
                    },
                    '& code': {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      bgcolor: 'background.paper',
                      px: 0.5,
                      py: 0.25,
                      borderRadius: 0.5,
                    },
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <SmartToyIcon fontSize="small" color="primary" />
                      <Typography variant="subtitle2" fontWeight={600}>
                        AI Analysis
                      </Typography>
                    </Box>
                    <ReactMarkdown>{issue.explanation}</ReactMarkdown>
                  </Box>
                )}

                {issue.relatedEvents && issue.relatedEvents.length > 0 && !issue.loading && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Related Events:
                    </Typography>
                    {issue.relatedEvents.map((event, eventIdx) => (
                      <Typography
                        key={eventIdx}
                        variant="caption"
                        component="div"
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          color: event.type === 'Warning' ? 'warning.main' : 'text.secondary',
                          mb: 0.5,
                        }}
                      >
                        [{event.type}] {event.reason}: {event.message}
                        {event.count > 1 && ` (×${event.count})`}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          ))}

          {hasApiKey && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                💡 Click "Explain" on any issue for AI-powered analysis and solutions
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </GlassPanel>
  )
}
