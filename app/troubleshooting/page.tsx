'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import { PageHeader } from '@/app/components/common/page-header'
import { TroubleshootingChat } from '@/app/components/ai/troubleshooting-chat'
import { useRouter } from 'next/navigation'

export default function TroubleshootingPage() {
  const router = useRouter()
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if API key is configured
    const apiKey = localStorage.getItem('kubevista_openai_key')
    setHasApiKey(!!apiKey)
    setIsChecking(false)

    // Listen for API key updates
    const handleKeyUpdate = () => {
      const key = localStorage.getItem('kubevista_openai_key')
      setHasApiKey(!!key)
    }

    window.addEventListener('openai-key-updated', handleKeyUpdate)
    return () => window.removeEventListener('openai-key-updated', handleKeyUpdate)
  }, [])

  if (isChecking) {
    return null
  }

  if (!hasApiKey) {
    return (
      <Box>
        <PageHeader
          title="AI Troubleshooting Assistant"
          breadcrumbs={[{ label: 'Troubleshooting' }]}
        />

        <Alert
          severity="warning"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => router.push('/settings?tab=2')}
            >
              Go to Settings
            </Button>
          }
        >
          <Typography variant="subtitle2" gutterBottom>
            OpenAI API Key Required
          </Typography>
          <Typography variant="body2">
            To use the AI Troubleshooting Assistant, please configure your OpenAI API key in Settings.
          </Typography>
        </Alert>

        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            opacity: 0.5,
          }}
        >
          <Typography variant="h5" gutterBottom>
            AI-Powered Kubernetes Troubleshooting
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Get intelligent help diagnosing and resolving cluster issues
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)' }}>
      <PageHeader
        title="AI Troubleshooting Assistant"
        subtitle="Get intelligent help diagnosing and resolving Kubernetes issues"
        breadcrumbs={[{ label: 'Troubleshooting' }]}
      />

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <TroubleshootingChat />
      </Box>
    </Box>
  )
}
