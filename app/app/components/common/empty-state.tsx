'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { SvgIconComponent } from '@mui/icons-material'
import InboxIcon from '@mui/icons-material/Inbox'

interface EmptyStateProps {
  icon?: SvgIconComponent
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

/**
 * Empty state component for when no data is available
 *
 * Provides a friendly, informative message with optional action
 */
export function EmptyState({
  icon: Icon = InboxIcon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Paper
      sx={{
        p: 6,
        textAlign: 'center',
        bgcolor: 'background.default',
        border: '2px dashed',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: 'action.hover',
          mb: 3,
        }}
      >
        <Icon sx={{ fontSize: 40, color: 'text.secondary' }} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
          {description}
        </Typography>
      )}

      {action && (
        <Button variant="contained" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Paper>
  )
}
