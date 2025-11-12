'use client'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'
import RefreshIcon from '@mui/icons-material/Refresh'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import { useState, useMemo, useRef, useEffect } from 'react'

interface LogLine {
  line: number
  timestamp?: string
  level?: string
  message: string
  raw: string
  isJson: boolean
  data?: Record<string, unknown>
}

interface LogsViewerProps {
  logs: string
  parsed?: LogLine[]
  isLoading: boolean
  error: Error | null
  containerName: string
  onRefresh?: () => void
}

export function LogsViewer({ logs, parsed, isLoading, error, containerName, onRefresh }: LogsViewerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [autoScroll, setAutoScroll] = useState(true)
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted')
  const logsEndRef = useRef<HTMLDivElement>(null)
  const logsContainerRef = useRef<HTMLDivElement>(null)

  const logLines = useMemo(() => {
    if (parsed && parsed.length > 0) {
      return parsed
    }
    // Fallback to raw logs split by line
    return logs.split('\n').filter((line) => line.trim()).map((line, index) => ({
      line: index + 1,
      message: line,
      raw: line,
      isJson: false,
    }))
  }, [logs, parsed])

  const filteredLogs = useMemo(() => {
    if (!searchQuery) return logLines

    return logLines.filter((logLine) => {
      const searchLower = searchQuery.toLowerCase()
      return (
        logLine.message.toLowerCase().includes(searchLower) ||
        logLine.raw.toLowerCase().includes(searchLower) ||
        logLine.level?.toLowerCase().includes(searchLower)
      )
    })
  }, [logLines, searchQuery])

  const getLevelColor = (level?: string): string => {
    if (!level) return 'grey.400'
    const upperLevel = level.toUpperCase()
    if (upperLevel.includes('ERROR') || upperLevel.includes('FATAL')) return 'error.main'
    if (upperLevel.includes('WARN')) return 'warning.main'
    if (upperLevel.includes('INFO')) return 'info.main'
    if (upperLevel.includes('DEBUG')) return 'grey.500'
    return 'success.main'
  }

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [filteredLogs, autoScroll])

  // Detect manual scroll
  useEffect(() => {
    const container = logsContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50
      setAutoScroll(isAtBottom)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownload = () => {
    // Download parsed logs as JSON
    const logsData = {
      container: containerName,
      timestamp: new Date().toISOString(),
      totalLines: logLines.length,
      logs: logLines,
    }

    const blob = new Blob([JSON.stringify(logsData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${containerName}-logs.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          <CircularProgress />
        </Box>
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper sx={{ p: 2 }}>
        <Alert severity="error">
          Failed to load logs: {error.message}
        </Alert>
      </Paper>
    )
  }

  return (
    <Paper>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Container Logs: {containerName}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label="Formatted"
              size="small"
              color={viewMode === 'formatted' ? 'primary' : 'default'}
              onClick={() => setViewMode('formatted')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Raw"
              size="small"
              color={viewMode === 'raw' ? 'primary' : 'default'}
              onClick={() => setViewMode('raw')}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1 }}
          />
          {onRefresh && (
            <IconButton onClick={onRefresh} size="small" title="Refresh logs">
              <RefreshIcon />
            </IconButton>
          )}
          <IconButton onClick={handleDownload} size="small" title="Download logs">
            <DownloadIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        ref={logsContainerRef}
        sx={{
          p: 2,
          bgcolor: 'grey.900',
          color: 'grey.100',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          maxHeight: 600,
          overflow: 'auto',
          '& .log-line': {
            py: 0.25,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          },
          '& .log-line:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        {filteredLogs.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            {searchQuery ? 'No logs match your search' : 'No logs available'}
          </Typography>
        ) : viewMode === 'raw' ? (
          <>
            {filteredLogs.map((logLine, index) => (
              <Box key={index} className="log-line">
                {logLine.raw}
              </Box>
            ))}
            <div ref={logsEndRef} />
          </>
        ) : (
          <>
            {filteredLogs.map((logLine, index) => (
              <Box
                key={index}
                className="log-line"
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'flex-start',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: 'grey.600',
                    fontSize: '0.75rem',
                    minWidth: '40px',
                    flexShrink: 0,
                  }}
                >
                  {logLine.line}
                </Typography>
                {logLine.timestamp && (
                  <Typography
                    component="span"
                    sx={{
                      color: 'grey.500',
                      fontSize: '0.75rem',
                      minWidth: '180px',
                      flexShrink: 0,
                    }}
                  >
                    {logLine.timestamp}
                  </Typography>
                )}
                {logLine.level && (
                  <Typography
                    component="span"
                    sx={{
                      color: getLevelColor(logLine.level),
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      minWidth: '60px',
                      flexShrink: 0,
                    }}
                  >
                    {logLine.level}
                  </Typography>
                )}
                <Typography
                  component="span"
                  sx={{
                    color: 'grey.100',
                    flex: 1,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {logLine.message}
                </Typography>
                {logLine.isJson && (
                  <Chip
                    label="JSON"
                    size="small"
                    sx={{
                      height: '16px',
                      fontSize: '0.65rem',
                      bgcolor: 'primary.dark',
                      color: 'primary.contrastText',
                    }}
                  />
                )}
              </Box>
            ))}
            <div ref={logsEndRef} />
          </>
        )}
      </Box>

      {!autoScroll && (
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            p: 1,
            bgcolor: 'info.main',
            color: 'info.contrastText',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            setAutoScroll(true)
            logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <Typography variant="caption">
            Auto-scroll disabled. Click here to scroll to bottom.
          </Typography>
        </Box>
      )}
    </Paper>
  )
}
