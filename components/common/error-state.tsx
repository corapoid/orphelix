import { Alert, AlertTitle, Button, Box } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface ErrorStateProps {
  error: Error | unknown
  onRetry?: () => void
  title?: string
}

/**
 * Error state component with retry functionality
 * Shows a user-friendly error message with the option to retry
 */
export function ErrorState({ error, onRetry, title = 'Error Loading Data' }: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

  // Parse common error types for better messages
  const getFriendlyMessage = (msg: string): string => {
    if (msg.includes('Failed to fetch')) {
      return 'Network error. Please check your connection and try again.'
    }
    if (msg.includes('403') || msg.includes('Forbidden')) {
      return 'You do not have permission to access this resource.'
    }
    if (msg.includes('404') || msg.includes('Not Found')) {
      return 'The requested resource was not found.'
    }
    if (msg.includes('500') || msg.includes('Internal Server Error')) {
      return 'Server error. Please try again later.'
    }
    if (msg.includes('Namespace is required')) {
      return 'Please select a namespace to view this resource.'
    }
    return msg
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon fontSize="large" />}
        sx={{
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <AlertTitle sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{title}</AlertTitle>
        <Box sx={{ mb: 2 }}>{getFriendlyMessage(errorMessage)}</Box>

        {onRetry && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            sx={{
              borderColor: 'error.main',
              color: 'error.main',
              '&:hover': {
                borderColor: 'error.dark',
                backgroundColor: 'error.light',
              },
            }}
          >
            Try Again
          </Button>
        )}

        {/* Technical details in smaller text */}
        {process.env.NODE_ENV === 'development' && (
          <Box
            sx={{
              mt: 2,
              p: 1,
              bgcolor: 'grey.100',
              borderRadius: 1,
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: 'text.secondary',
            }}
          >
            {errorMessage}
          </Box>
        )}
      </Alert>
    </Box>
  )
}
