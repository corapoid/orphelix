import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

export interface GlassPanelProps {
  children: ReactNode
  sx?: SxProps<Theme>
  closeable?: boolean
  open?: boolean
  onClose?: () => void
  animationType?: 'collapse' | 'fade' | 'none'
}

/**
 * Glass Panel - Auto-adapts to visual preset
 *
 * - Classic preset: Solid background
 * - Glass preset: Blur + transparency
 * - Liquid Glass preset: Blur + transparency + gradient shine
 *
 * The theme handles all styling based on the selected preset.
 */
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
        position: 'relative',
        // Theme provides all styling based on visual preset
        // No hardcoded values - everything comes from theme
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
