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
import { useState, useMemo, useRef, useEffect } from 'react'

interface LogsViewerProps {
  logs: string
  isLoading: boolean
  error: Error | null
  containerName: string
  onRefresh?: () => void
}

export function LogsViewer({ logs, isLoading, error, containerName, onRefresh }: LogsViewerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [autoScroll, setAutoScroll] = useState(true)
  const logsEndRef = useRef<HTMLDivElement>(null)
  const logsContainerRef = useRef<HTMLDivElement>(null)

  const logLines = useMemo(() => logs.split('\n').filter((line) => line.trim()), [logs])

  const filteredLogs = useMemo(() => {
    if (!searchQuery) return logLines

    return logLines.filter((line) =>
      line.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [logLines, searchQuery])

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
    const blob = new Blob([logs], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${containerName}-logs.txt`
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Container Logs: {containerName}</Typography>
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
              sx={{ width: 300 }}
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
        ) : (
          <>
            {filteredLogs.map((line, index) => (
              <Box key={index} className="log-line">
                {line}
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
