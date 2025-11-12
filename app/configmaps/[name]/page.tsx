'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Snackbar from '@mui/material/Snackbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useConfigMap, useConfigMapEvents } from '@/lib/hooks/use-configmaps'
import { formatAge } from '@/lib/utils'

const MAX_PREVIEW_LINES = 10

export default function ConfigMapDetailPage() {
  const params = useParams()
  const router = useRouter()
  const name = params.name as string

  const { data: configMap, isLoading, error } = useConfigMap(name)
  const { data: events, isLoading: eventsLoading } = useConfigMapEvents(name)

  const [searchQuery, setSearchQuery] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

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
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/configmaps')}
          sx={{ mb: 2 }}
        >
          Back to ConfigMaps
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      </Box>
    )
  }

  if (error || !configMap) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/configmaps')}
          sx={{ mb: 2 }}
        >
          Back to ConfigMaps
        </Button>
        <Alert severity="error">
          Failed to load ConfigMap: {error instanceof Error ? error.message : 'ConfigMap not found'}
        </Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/configmaps')}
        sx={{ mb: 2 }}
      >
        Back to ConfigMaps
      </Button>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h4">{configMap.name}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Namespace: {configMap.namespace} • Age: {formatAge(configMap.age)}
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Name:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {configMap.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Namespace:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {configMap.namespace}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Keys:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {Object.keys(configMap.data).length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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

      {/* Events Section */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Events
        </Typography>
        {eventsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : !events || events.length === 0 ? (
          <Alert severity="info">No events found for this ConfigMap</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Chip
                        label={event.type}
                        size="small"
                        color={event.type === 'Warning' ? 'warning' : 'default'}
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
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  )
}
