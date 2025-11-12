'use client'

import { use, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Alert,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import Grid from '@mui/material/Grid2'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useSecret, useSecretEvents } from '@/lib/hooks/use-secrets'

const MAX_PREVIEW_LINES = 10

export default function SecretDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const resolvedParams = use(params)
  const name = resolvedParams.name
  const router = useRouter()

  const { data: secret, isLoading, error } = useSecret(name)
  const { data: events, isLoading: eventsLoading } = useSecretEvents(name)

  const [searchQuery, setSearchQuery] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set())
  const [revealAll, setRevealAll] = useState(false)
  const [warningDialogOpen, setWarningDialogOpen] = useState(false)
  const [pendingRevealKey, setPendingRevealKey] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

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
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">Failed to load Secret: {error.message}</Alert>
      </Box>
    )
  }

  if (!secret) {
    return (
      <Box p={3}>
        <Alert severity="warning">Secret not found</Alert>
      </Box>
    )
  }

  const dataCount = Object.keys(secret.data || {}).length

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 3,
          mb: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ color: 'white' }}
          >
            Back
          </Button>
        </Box>
        <Typography variant="h4" fontWeight="bold">
          {secret.name}
        </Typography>
        <Box display="flex" gap={1} mt={2}>
          <Chip label={secret.namespace} color="primary" size="small" />
          <Chip label={secret.type} color="secondary" size="small" />
          <Chip label={secret.age} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
        </Box>
      </Box>

      <Box p={3}>
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
          {/* Details Panel */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {secret.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Namespace
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {secret.namespace}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Type
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {secret.type}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Data Keys
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {dataCount}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Labels Panel */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Labels
              </Typography>
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
            </Paper>
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

          {/* Events Section */}
          <Grid size={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Events
              </Typography>
              {eventsLoading ? (
                <CircularProgress size={24} />
              ) : events && events.length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Age</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events.map((event, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Chip
                              label={event.type}
                              size="small"
                              color={event.type === 'Warning' ? 'error' : 'success'}
                            />
                          </TableCell>
                          <TableCell>{event.reason}</TableCell>
                          <TableCell>{event.message}</TableCell>
                          <TableCell>{event.lastTimestamp || 'Unknown'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No events found
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
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
