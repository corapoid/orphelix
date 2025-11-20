'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import EditIcon from '@mui/icons-material/Edit'
import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useConfigMap } from '@/lib/hooks/use-configmaps'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { YamlEditorModal } from '@/app/components/yaml-editor/yaml-editor-modal'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'

const MAX_PREVIEW_LINES = 10

export default function ConfigMapDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: configMap, isLoading, error, refetch } = useConfigMap(name)

  // Auto-refresh
  useAutoRefresh(refetch)

  const [searchQuery] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  // const [docsOpen, setDocsOpen] = useState(true)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(`Copied ${label} to clipboard`)
      setSnackbarOpen(true)
    })
  }

  const toggleExpanded = (key: string) => {
    const newExpanded = new Set(expandedKeys)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedKeys(newExpanded)
  }

  const filteredData = useMemo(() => {
    if (!configMap?.data) return []

    const entries = Object.entries(configMap.data)
    if (!searchQuery) return entries

    return entries.filter(
      ([key, value]) =>
        key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [configMap, searchQuery])

  const isJSON = (str: string): boolean => {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  }

  const formatValue = (value: string): string => {
    if (isJSON(value)) {
      try {
        return JSON.stringify(JSON.parse(value), null, 2)
      } catch {
        return value
      }
    }
    return value
  }

  const shouldTruncate = (value: string): boolean => {
    return value.split('\n').length > MAX_PREVIEW_LINES
  }

  const getTruncatedValue = (value: string): string => {
    const lines = value.split('\n')
    return lines.slice(0, MAX_PREVIEW_LINES).join('\n') + '\n...'
  }

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !configMap) {
    return (
      <Box>
        <PageHeader
          title="ConfigMap Details"
          breadcrumbs={[
            { label: 'ConfigMaps', href: '/configmaps' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('ConfigMap not found')}
          onRetry={() => refetch()}
          title="Failed to Load ConfigMap"
        />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={configMap.name}
        metadata={[
          `Age: ${configMap.age}`,
          `Keys: ${Object.keys(configMap.data).length}`,
        ]}
        breadcrumbs={[
          { label: 'ConfigMaps', href: '/configmaps' },
          { label: configMap.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
        actions={
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditorOpen(true)}
          >
            Edit YAML
          </Button>
        }
      />

      {/* Main Content */}
      <Box>
        {/* Labels Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Labels
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {Object.entries(configMap.labels).length > 0 ? (
                Object.entries(configMap.labels).map(([key, value]) => (
                  <Paper
                    key={key}
                    elevation={0}
                    sx={{
                      px: 2,
                      py: 1,
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
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 600, color: 'text.secondary' }}
                    >
                      {key}:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {value}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No labels
                </Typography>
              )}
            </Box>
          </Box>

          {/* Data Section */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Data</Typography>

          <Box sx={{ mb: 3 }}>
            {filteredData.length === 0 ? (
              <Alert severity="info">
                {searchQuery ? 'No data matches your search' : 'This ConfigMap has no data'}
              </Alert>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {filteredData.map(([key, value]) => {
                  const formattedValue = formatValue(value)
                  const isTruncated = shouldTruncate(formattedValue)
                  const isExpanded = expandedKeys.has(key)
                  const displayValue = isTruncated && !isExpanded
                    ? getTruncatedValue(formattedValue)
                    : formattedValue

                  return (
                    <Box key={key}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary">
                          {key}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {isTruncated && (
                            <IconButton
                              size="small"
                              onClick={() => toggleExpanded(key)}
                              title={isExpanded ? 'Show less' : 'Show more'}
                            >
                              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(value, key)}
                            title="Copy value"
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box
                        component="pre"
                        sx={{
                          p: 2,
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(0, 0, 0, 0.3)'
                              : 'rgba(0, 0, 0, 0.05)',
                          borderRadius: '12px',
                          overflow: 'auto',
                          fontFamily: 'monospace',
                          fontSize: '0.8125rem',
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          color: 'text.primary',
                        }}
                      >
                        {displayValue}
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            )}
          </Box>
      </Box>

      <YamlEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        resourceName={configMap.name}
        namespace={configMap.namespace}
        resourceType="configmap"
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  )
}
