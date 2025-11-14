'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Snackbar from '@mui/material/Snackbar'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SearchIcon from '@mui/icons-material/Search'
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

  const [searchQuery, setSearchQuery] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)

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
          `Namespace: ${configMap.namespace}`,
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

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Labels
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(configMap.labels).length > 0 ? (
                Object.entries(configMap.labels).map(([key, value]) => (
                  <Chip key={key} label={`${key}: ${value}`} size="small" variant="outlined" />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No labels
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Data Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Data</Typography>
          <TextField
            size="small"
            placeholder="Search keys or values..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
        </Box>

        {filteredData.length === 0 ? (
          <Alert severity="info">
            {searchQuery ? 'No data matches your search' : 'This ConfigMap has no data'}
          </Alert>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredData.map(([key, value]) => {
              const formattedValue = formatValue(value)
              const isTruncated = shouldTruncate(formattedValue)
              const isExpanded = expandedKeys.has(key)
              const displayValue = isTruncated && !isExpanded
                ? getTruncatedValue(formattedValue)
                : formattedValue

              return (
                <Paper key={key} variant="outlined" sx={{ p: 2 }}>
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
                      bgcolor: 'grey.50',
                      borderRadius: 1,
                      overflow: 'auto',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {displayValue}
                  </Box>
                </Paper>
              )
            })}
          </Box>
        )}
      </Paper>

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
