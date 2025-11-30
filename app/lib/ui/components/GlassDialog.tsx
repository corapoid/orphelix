import Dialog from '@mui/material/Dialog'
import type { DialogProps } from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'

/**
 * Glass Dialog - Auto-adapts to visual preset with liquid glass effect
 *
 * - Backdrop blur
 * - Translucent background
 * - Border highlight
 * - Smooth animations
 */
export const GlassDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(8px)',
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.7)'
      : 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiDialog-paper': {
    backgroundImage: 'none',
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(26, 32, 44, 0.85)'
      : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    borderRadius: 16,
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.4)'
      : '0 8px 32px rgba(0, 0, 0, 0.12)',
    position: 'relative',
    overflow: 'hidden',
    // Liquid glass gradient shine effect
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
      pointerEvents: 'none',
    },
  },
})) as React.ComponentType<DialogProps>
