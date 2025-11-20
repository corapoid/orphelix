'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CloudIcon from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'

interface ContextSelectorProps {
  collapsed?: boolean
}

export function ContextSelector({ collapsed = false }: ContextSelectorProps) {
  if (collapsed) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Tooltip title="Kubernetes Cluster" placement="right">
          <CloudIcon sx={{ color: 'primary.main', fontSize: 24 }} />
        </Tooltip>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        p: 1.5,
        pb: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'text.primary',
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
        }}
      >
        <CloudIcon sx={{ fontSize: 16 }} />
        Kubernetes Cluster
      </Typography>
    </Box>
  )
}
