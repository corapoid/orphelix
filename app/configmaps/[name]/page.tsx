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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { GlassPanel } from '@/app/components/common/glass-panel'
import Link from 'next/link'

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
  const [docsOpen, setDocsOpen] = useState(true)

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
        headerActions={
          <IconButton
            onClick={() => setDocsOpen(!docsOpen)}
            size="medium"
            title={docsOpen ? "Hide documentation" : "Show documentation"}
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <InfoOutlinedIcon />
          </IconButton>
        }
      />

      <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Labels
              </Typography>
              <GlassPanel>
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
              </GlassPanel>
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
        </Box>

        {/* Right Sidebar - Documentation */}
        <Box
          sx={{
            width: 520,
            flexShrink: 0,
            mt: -12,
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-start',
            maxHeight: '100vh',
          }}
        >
          <GlassPanel
            open={docsOpen}
            closeable
            onClose={() => setDocsOpen(false)}
            animationType="fade"
            sx={{ p: 3, overflow: 'auto', maxHeight: '100vh' }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                About ConfigMaps
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              A ConfigMap is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2.5, lineHeight: 1.7 }}>
              ConfigMaps allow you to decouple environment-specific configuration from your container images, so that your applications are easily portable.
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Example ConfigMap
            </Typography>

            <Box
              component="pre"
              sx={{
                p: 1.5,
                mb: 2.5,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.3)'
                    : 'rgba(0, 0, 0, 0.05)',
                borderRadius: 2,
                overflow: 'auto',
                fontSize: '0.75rem',
                lineHeight: 1.5,
                fontFamily: 'monospace',
              }}
            >
{`apiVersion: v1
kind: ConfigMap
metadata:
  name: game-config
data:
  player_initial_lives: "3"
  ui_properties_file_name: "user-interface.properties"
  game.properties: |
    enemy.types=aliens,monsters
    player.maximum-lives=5
  user-interface.properties: |
    color.good=purple
    color.bad=yellow`}
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Using ConfigMaps
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  <strong>Environment Variables:</strong> Use configMapKeyRef in container env.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>Volume Mounts:</strong> Mount ConfigMap as a volume to access files.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>Command Arguments:</strong> Reference ConfigMap values in container commands.
                </Typography>
              </li>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Important Notes
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  ConfigMaps are not designed to hold large amounts of data (max 1 MiB).
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  Changes to ConfigMaps may not be immediately reflected in running Pods.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  For confidential data, use Secrets instead of ConfigMaps.
                </Typography>
              </li>
            </Box>

            <Box sx={{
              mt: 3,
              pt: 2,
              borderTop: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
            }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                }}
              >
                Learn more in the{' '}
                <Link
                  href="https://kubernetes.io/docs/concepts/configuration/configmap/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    official Kubernetes docs
                  </Typography>
                  <Box component="span" sx={{ fontSize: '0.65rem' }}>↗</Box>
                </Link>
              </Typography>
            </Box>
          </GlassPanel>
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
