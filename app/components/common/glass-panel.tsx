import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  sx?: SxProps<Theme>
  closeable?: boolean
  open?: boolean
  onClose?: () => void
  animationType?: 'collapse' | 'fade' | 'none'
}

export function GlassPanel({
  children,
  sx = {},
  closeable = false,
  open = true,
  onClose,
  animationType = 'fade'
}: GlassPanelProps) {
  const content = (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
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
        borderRadius: '12px',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 16px 0 rgba(0, 0, 0, 0.3)'
            : '0 4px 16px 0 rgba(31, 38, 135, 0.08)',
        position: 'relative',
        ...sx,
      }}
    >
      {closeable && (
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
            zIndex: 1,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      <Box sx={closeable ? { pr: 4 } : undefined}>
        {children}
      </Box>
    </Paper>
  )

  if (animationType === 'collapse') {
    return <Collapse in={open} timeout={300}>{content}</Collapse>
  }

  if (animationType === 'fade') {
    return (
      <Fade in={open} timeout={400}>
        <Box>{content}</Box>
      </Fade>
    )
  }

  // no animation
  return open ? content : null
}
