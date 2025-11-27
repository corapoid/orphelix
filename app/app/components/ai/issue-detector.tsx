'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import { GlassPanel } from '@/lib/ui'
import { detectIssuesFromEvents, analyzeResourceMetrics } from '@/lib/ai/context-collector'
import type { Event } from '@/types/kubernetes'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import { useRouter } from 'next/navigation'

interface IssueDetectorProps {
  events?: Event[]
  metrics?: {
    cpu?: string
    memory?: string
  }
}

interface DetectedIssue {
  severity: 'error' | 'warning' | 'info'
  message: string
}

export function IssueDetector({ events = [], metrics }: IssueDetectorProps) {
  const router = useRouter()
  const [issues, setIssues] = useState<DetectedIssue[]>([])
  const [expanded, setExpanded] = useState(true)
  const [hasApiKey, setHasApiKey] = useState(false)

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

    // Detect issues from events
    if (events.length > 0) {
      const eventIssues = detectIssuesFromEvents(events)
      eventIssues.forEach(issue => {
        detectedIssues.push({
          severity: issue.includes('critically') || issue.includes('CrashLoopBackOff') ? 'error' : 'warning',
          message: issue,
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
  }, [events, metrics])

  if (issues.length === 0) {
    return null
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
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            variant="outlined"
            size="small"
            startIcon={<SmartToyIcon />}
            onClick={(e) => {
              e.stopPropagation()
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              router.push('/settings?tab=2' as any)
            }}
          >
            Ask AI
          </Button>
        )}
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {issues.map((issue, idx) => (
            <Alert
              key={idx}
              severity={issue.severity}
              sx={{
                '& .MuiAlert-message': {
                  width: '100%',
                },
              }}
            >
              <AlertTitle sx={{ fontWeight: 600, mb: 0 }}>
                {issue.message}
              </AlertTitle>
            </Alert>
          ))}

          {hasApiKey && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                💡 Use the AI Troubleshooting Assistant for detailed analysis and solutions
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </GlassPanel>
  )
}
