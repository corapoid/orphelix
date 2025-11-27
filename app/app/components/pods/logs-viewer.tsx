'use client'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'
import DownloadIcon from '@mui/icons-material/Download'
import RefreshIcon from '@mui/icons-material/Refresh'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useState, useMemo, useRef, useEffect } from 'react'
import { StatusBadge } from '@/app/components/common/status-badge'
import { useTheme } from '@/lib/ui'

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
  logLines?: number
  onLogLinesChange?: (lines: number) => void
}

export function LogsViewer({ logs, parsed, isLoading, error, containerName, onRefresh, logLines = 100, onLogLinesChange }: LogsViewerProps) {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const [searchQuery, setSearchQuery] = useState('')
  const [autoScroll, setAutoScroll] = useState(true)
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted')
  const logsEndRef = useRef<HTMLDivElement>(null)
  const logsContainerRef = useRef<HTMLDivElement>(null)

  const parsedLogLines = useMemo((): LogLine[] => {
    if (parsed && parsed.length > 0) {
      return parsed
    }
    // Fallback to raw logs split by line
    return logs.split('\n').filter((line) => line.trim()).map((line, index) => ({
      line: index + 1,
      message: line,
      raw: line,
      isJson: false,
      timestamp: undefined,
      level: undefined,
    }))
  }, [logs, parsed])

  const filteredLogs = useMemo(() => {
    if (!searchQuery) return parsedLogLines

    return parsedLogLines.filter((logLine) => {
      const searchLower = searchQuery.toLowerCase()
      return (
        logLine.message.toLowerCase().includes(searchLower) ||
        logLine.raw.toLowerCase().includes(searchLower) ||
        logLine.level?.toLowerCase().includes(searchLower)
      )
    })
  }, [parsedLogLines, searchQuery])

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
      totalLines: parsedLogLines.length,
      logs: parsedLogLines,
    }

    const blob = new Blob([JSON.stringify(logsData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = `${containerName}-logs.json`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
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
    <Paper
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 30, 46, 0.6)'
            : 'rgba(255, 255, 255, 0.25)',
        ...(isGlass && {
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(209, 213, 219, 0.4)',
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
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
            sx={{
              flex: 1,
              minWidth: 200,
              '& .MuiOutlinedInput-root': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 30, 46, 0.6)'
                    : 'rgba(255, 255, 255, 0.25)',
                ...(isGlass && {
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                }),
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(209, 213, 219, 0.4)',
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
          <StatusBadge
            label="Formatted"
            size="small"
            color={viewMode === 'formatted' ? 'info' : 'default'}
            onClick={() => setViewMode('formatted')}
            sx={{
              cursor: 'pointer',
              fontWeight: viewMode === 'formatted' ? 600 : 400,
              opacity: viewMode === 'formatted' ? 1 : 0.7,
            }}
          />
          <StatusBadge
            label="Raw"
            size="small"
            color={viewMode === 'raw' ? 'info' : 'default'}
            onClick={() => setViewMode('raw')}
            sx={{
              cursor: 'pointer',
              fontWeight: viewMode === 'raw' ? 600 : 400,
              opacity: viewMode === 'raw' ? 1 : 0.7,
            }}
          />
          {onLogLinesChange && (
            <Select
              size="small"
              value={logLines}
              onChange={(e) => onLogLinesChange(Number(e.target.value))}
              sx={{
                minWidth: 100,
                height: 32,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 30, 46, 0.6)'
                    : 'rgba(255, 255, 255, 0.25)',
                ...(isGlass && {
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                }),
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(209, 213, 219, 0.4)',
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            >
              <MenuItem value={100}>100 lines</MenuItem>
              <MenuItem value={250}>250 lines</MenuItem>
              <MenuItem value={500}>500 lines</MenuItem>
              <MenuItem value={1000}>1000 lines</MenuItem>
              <MenuItem value={2500}>2500 lines</MenuItem>
              <MenuItem value={5000}>5000 lines</MenuItem>
            </Select>
          )}
          {onRefresh && (
            <IconButton
              onClick={onRefresh}
              size="small"
              title="Refresh logs"
              sx={{
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton
            onClick={handleDownload}
            size="small"
            title="Download logs"
            sx={{
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box
        ref={logsContainerRef}
        sx={{
          p: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.4)'
              : 'rgba(0, 0, 0, 0.05)',
          color: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(0, 0, 0, 0.87)',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          maxHeight: 600,
          overflow: 'auto',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
          '& .log-line': {
            py: 0.25,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          },
          '& .log-line:hover': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.08)',
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
                  borderBottom: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.05)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.4)'
                        : 'rgba(0, 0, 0, 0.4)',
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
                      color: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.5)'
                          : 'rgba(0, 0, 0, 0.5)',
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
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.9)'
                        : 'rgba(0, 0, 0, 0.87)',
                    flex: 1,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {logLine.message}
                </Typography>
                {logLine.isJson && (
                  <StatusBadge
                    label="JSON"
                    size="small"
                    color="info"
                    sx={{
                      height: '16px',
                      fontSize: '0.65rem',
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
