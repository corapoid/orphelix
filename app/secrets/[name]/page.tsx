'use client'

import { use, useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Paper,
  Alert,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import EditIcon from '@mui/icons-material/Edit'
import { useSecret } from '@/lib/hooks/use-secrets'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { YamlEditorModal } from '@/app/components/yaml-editor/yaml-editor-modal'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'

const MAX_PREVIEW_LINES = 10

export default function SecretDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const resolvedParams = use(params)
  const name = resolvedParams.name

  const { data: secret, isLoading, error, refetch } = useSecret(name)

  useAutoRefresh(refetch)

  const [searchQuery] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set())
  const [revealAll, setRevealAll] = useState(false)
  const [warningDialogOpen, setWarningDialogOpen] = useState(false)
  const [pendingRevealKey, setPendingRevealKey] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  // const [docsOpen, setDocsOpen] = useState(true)

  // Decode base64 value
  const decodeValue = (value: string): string => {
    try {
      return atob(value)
    } catch {
      return value
    }
  }

  // Check if value looks like JSON
  const isJSON = (str: string): boolean => {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  }

  // Format value for display
  const formatValue = (value: string): string => {
    const decoded = decodeValue(value)
    if (isJSON(decoded)) {
      try {
        return JSON.stringify(JSON.parse(decoded), null, 2)
      } catch {
        return decoded
      }
    }
    return decoded
  }

  // Check if value should be truncated
  const shouldTruncate = (value: string): boolean => {
    const formatted = formatValue(value)
    return formatted.split('\n').length > MAX_PREVIEW_LINES
  }

  // Get truncated value for preview
  const getTruncatedValue = (value: string): string => {
    const formatted = formatValue(value)
    const lines = formatted.split('\n')
    return lines.slice(0, MAX_PREVIEW_LINES).join('\n')
  }

  // Toggle expand/collapse for a key
  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  // Handle reveal request
  const handleRevealRequest = (key: string | null) => {
    setPendingRevealKey(key)
    setWarningDialogOpen(true)
  }

  // Confirm reveal
  const handleRevealConfirm = () => {
    if (pendingRevealKey === null) {
      // Reveal all
      setRevealAll(true)
      if (secret?.data) {
        setRevealedKeys(new Set(Object.keys(secret.data)))
      }
    } else {
      // Reveal single key
      setRevealedKeys((prev) => new Set(prev).add(pendingRevealKey))
    }
    setWarningDialogOpen(false)
    setPendingRevealKey(null)
  }

  // Hide value
  const handleHide = (key: string) => {
    setRevealedKeys((prev) => {
      const newSet = new Set(prev)
      newSet.delete(key)
      return newSet
    })
  }

  // Hide all values
  const handleHideAll = () => {
    setRevealAll(false)
    setRevealedKeys(new Set())
  }

  // Copy to clipboard
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(`Copied ${label} to clipboard`)
      setSnackbarOpen(true)
    })
  }

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!secret?.data) return []
    const entries = Object.entries(secret.data)
    if (!searchQuery) return entries

    return entries.filter(
      ([key, value]) =>
        key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        decodeValue(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [secret, searchQuery])

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !secret) {
    return (
      <Box>
        <PageHeader
          title="Secret Details"
          breadcrumbs={[
            { label: 'Secrets', href: '/secrets' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('Secret not found')}
          onRetry={() => refetch()}
          title="Failed to Load Secret"
        />
      </Box>
    )
  }

  const dataCount = Object.keys(secret.data || {}).length

  return (
    <Box>
      <PageHeader
        title={secret.name}
        metadata={[
          `Type: ${secret.type}`,
          `Age: ${secret.age}`,
        ]}
        breadcrumbs={[
          { label: 'Secrets', href: '/secrets' },
          { label: secret.name },
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

      <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Labels
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1.5}>
          {Object.entries(secret.labels || {}).length > 0 ? (
            Object.entries(secret.labels).map(([key, value]) => (
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

      {/* Security Warning */}
      <Alert severity="warning" icon={<WarningAmberIcon />} sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight="bold">
          Sensitive Data
        </Typography>
        <Typography variant="body2">
          This Secret contains sensitive information. Values are masked by default for security.
          Only reveal values when necessary and ensure you&apos;re in a secure environment.
        </Typography>
      </Alert>

      {/* Data Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Data</Typography>
        <Box display="flex" gap={1}>
          {!revealAll ? (
            <Button
              startIcon={<VisibilityIcon />}
              onClick={() => handleRevealRequest(null)}
              variant="outlined"
              color="warning"
              size="small"
            >
              Reveal All
            </Button>
          ) : (
            <Button
              startIcon={<VisibilityOffIcon />}
              onClick={handleHideAll}
              variant="outlined"
              size="small"
            >
              Hide All
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        {dataCount === 0 ? (
          <Alert severity="info">No data in this Secret</Alert>
        ) : filteredData.length === 0 ? (
          <Alert severity="info">No matches found</Alert>
        ) : (
          <Box display="flex" flexDirection="column" gap={3}>
            {filteredData.map(([key, value]) => {
              const isExpanded = expandedKeys.has(key)
              const isRevealed = revealedKeys.has(key)
              const isTruncated = shouldTruncate(value)
              const displayValue = isRevealed
                ? isExpanded || !isTruncated
                  ? formatValue(value)
                  : getTruncatedValue(value)
                : '••••••••••••••••'

              return (
                <Box key={key}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                          <Typography variant="subtitle2" fontWeight="bold" color="primary">
                            {key}
                          </Typography>
                          <Box display="flex" gap={1}>
                            {isRevealed && (
                              <>
                                <Tooltip title="Copy value">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleCopy(formatValue(value), key)}
                                  >
                                    <ContentCopyIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Hide value">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleHide(key)}
                                    color="default"
                                  >
                                    <VisibilityOffIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            {!isRevealed && (
                              <Tooltip title="Reveal value">
                                <IconButton
                                  size="small"
                                  onClick={() => handleRevealRequest(key)}
                                  color="warning"
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </Box>
                        <Box
                          component="pre"
                          sx={{
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(0, 0, 0, 0.3)'
                                : 'rgba(0, 0, 0, 0.05)',
                            p: 2,
                            borderRadius: '12px',
                            fontFamily: 'monospace',
                            fontSize: '0.8125rem',
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            color: 'text.primary',
                            overflow: 'auto',
                          }}
                        >
                          {displayValue}
                        </Box>
                        {isRevealed && isTruncated && (
                          <Button
                            size="small"
                            onClick={() => toggleExpand(key)}
                            startIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            sx={{ mt: 1 }}
                          >
                            {isExpanded ? 'Show Less' : 'Show More'}
                          </Button>
                        )}
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>
      </Box>
      {/* Documentation content preserved for future use:
        Right Sidebar - Documentation
        About Secrets
        A Secret is an object that contains a small amount of sensitive data such as a password, token, or key.
        Secret Types: Opaque, kubernetes.io/service-account-token, kubernetes.io/dockercfg, kubernetes.io/tls
        Example Secret
        Security Best Practices
        Learn more: https://kubernetes.io/docs/concepts/configuration/secret/
      */}

      {/* Warning Dialog */}
      <Dialog open={warningDialogOpen} onClose={() => setWarningDialogOpen(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon color="warning" />
          Security Warning
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to reveal sensitive data. Please ensure:
          </DialogContentText>
          <Box component="ul" sx={{ mt: 2 }}>
            <li>You are in a secure, private environment</li>
            <li>No one is looking over your shoulder</li>
            <li>You have proper authorization to view this data</li>
            <li>Screen sharing/recording is disabled</li>
          </Box>
          <DialogContentText sx={{ mt: 2, fontWeight: 'bold' }}>
            Do you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWarningDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRevealConfirm} color="warning" variant="contained">
            Reveal
          </Button>
        </DialogActions>
      </Dialog>

      <YamlEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        resourceName={secret.name}
        namespace={secret.namespace}
        resourceType="secret"
      />

      {/* Snackbar for copy feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  )
}
