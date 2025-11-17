'use client'

import { use, useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Alert,
  Button,
  TextField,
  InputAdornment,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search'
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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import Link from 'next/link'

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

  const [searchQuery, setSearchQuery] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set())
  const [revealAll, setRevealAll] = useState(false)
  const [warningDialogOpen, setWarningDialogOpen] = useState(false)
  const [pendingRevealKey, setPendingRevealKey] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [docsOpen, setDocsOpen] = useState(true)

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
          `Namespace: ${secret.namespace}`,
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

      <Grid container spacing={3}>
          {/* Labels Panel */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Labels
            </Typography>
            <GlassPanel>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {Object.entries(secret.labels || {}).length > 0 ? (
                  Object.entries(secret.labels).map(([key, value]) => (
                    <Chip key={key} label={`${key}: ${value}`} size="small" />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No labels
                  </Typography>
                )}
              </Box>
            </GlassPanel>
          </Grid>

          {/* Data Section */}
          <Grid size={12}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Data</Typography>
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

              {dataCount > 0 && (
                <TextField
                  fullWidth
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
                  sx={{ mb: 2 }}
                />
              )}

              {dataCount === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No data in this Secret
                </Typography>
              ) : filteredData.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No matches found
                </Typography>
              ) : (
                <Box display="flex" flexDirection="column" gap={2}>
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
                      <Paper key={key} variant="outlined" sx={{ p: 2 }}>
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
                          sx={{
                            bgcolor: 'grey.50',
                            p: 2,
                            borderRadius: 1,
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all',
                            maxHeight: isExpanded ? 'none' : '300px',
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
                      </Paper>
                    )
                  })}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
        </Box>

        {/* Right Sidebar - Documentation */}
        <Box
          sx={{
            width: 520,
            flexShrink: 0,
            mt: 0,
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
                About Secrets
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              A Secret is an object that contains a small amount of sensitive data such as a password, token, or key. Secrets are similar to ConfigMaps but are specifically intended to hold confidential data.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2.5, lineHeight: 1.7 }}>
              Kubernetes provides several built-in types for some common usage scenarios. These types vary in terms of the validations performed and the constraints Kubernetes imposes on them.
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Secret Types
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  <strong>Opaque:</strong> Arbitrary user-defined data (default).
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>kubernetes.io/service-account-token:</strong> Service account token.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>kubernetes.io/dockercfg:</strong> Serialized dockercfg file.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>kubernetes.io/tls:</strong> Data for a TLS client or server.
                </Typography>
              </li>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Example Secret
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
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm`}
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Security Best Practices
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  Enable encryption at rest for Secrets in etcd.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  Use RBAC to restrict access to Secrets.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  Consider using external secret management systems.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  Avoid logging or printing Secret values.
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
                  href="https://kubernetes.io/docs/concepts/configuration/secret/"
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
