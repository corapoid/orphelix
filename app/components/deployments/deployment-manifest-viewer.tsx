'use client'

import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useQuery } from '@tanstack/react-query'
import Editor from '@monaco-editor/react'
import { useModeStore } from '@/lib/core/store'

interface DeploymentManifestViewerProps {
  name: string
  namespace: string
}

export function DeploymentManifestViewer({ name, namespace }: DeploymentManifestViewerProps) {
  const [expanded, setExpanded] = useState(false)
  const mode = useModeStore((state) => state.mode)

  const { data, isLoading, error } = useQuery({
    queryKey: ['deployment-yaml', name, namespace, mode],
    queryFn: async () => {
      if (mode === 'mock') {
        // In demo mode, load from example manifest
        const response = await fetch(`/examples/manifests/${name}.yaml`)
        if (!response.ok) {
          throw new Error('Example manifest not found')
        }
        const yaml = await response.text()
        return { yaml }
      }

      // Real mode - fetch from API
      const response = await fetch(
        `/api/resources/deployments/${encodeURIComponent(name)}/yaml?namespace=${namespace}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch deployment YAML')
      }
      return response.json()
    },
    enabled: expanded, // Only fetch when expanded
  })

  return (
    <Paper sx={{ mb: 3, overflow: 'hidden' }}>
      <Box
        sx={{
          p: 2,
          borderBottom: expanded ? 1 : 0,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="h6">Cluster Manifest (YAML)</Typography>
        <IconButton
          size="small"
          disableRipple
          sx={{
            '&:hover': {
              bgcolor: 'transparent',
            },
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ p: 2 }}>
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error">
              Failed to load deployment manifest: {error instanceof Error ? error.message : 'Unknown error'}
            </Alert>
          )}

          {data?.yaml && (
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Editor
                height="500px"
                defaultLanguage="yaml"
                value={data.yaml}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                }}
              />
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  )
}
