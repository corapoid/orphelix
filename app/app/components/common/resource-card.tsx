import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { ReactNode } from 'react'
import type { SvgIconComponent } from '@mui/icons-material'

interface ResourceCardProps {
  name: string
  resourceType: string
  resourceColor: string
  icon: SvgIconComponent
  onClick?: () => void
  statusBadge?: ReactNode
  metrics?: ReactNode
  footer?: ReactNode
}

/**
 * Universal iOS-style Liquid Glass card for all Kubernetes resources
 */
export function ResourceCard({
  name,
  resourceType,
  resourceColor,
  icon: Icon,
  onClick,
  statusBadge,
  metrics,
  footer,
}: ResourceCardProps) {
  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        p: 2,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        // Liquid glass effect - MORE transparency!
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
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
            : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
        // Glass shine - diagonal gradient
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%, rgba(0, 0, 0, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 60%, rgba(0, 0, 0, 0.02) 100%)',
          pointerEvents: 'none',
          borderRadius: 3,
        },
        '&:hover': {
          transform: 'translateY(-2px) scale(1.01)',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.18)'
              : 'rgba(209, 213, 219, 0.6)',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(50, 50, 70, 0.7)'
              : 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(28px) saturate(200%)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 2px 2px 0 rgba(255, 255, 255, 0.12), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.3)'
              : '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 2px 2px 0 rgba(255, 255, 255, 1), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.08)',
        },
        '&:active': {
          transform: 'translateY(0px) scale(0.98)',
        },
      }}
    >
      {/* Header with icon and name */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${resourceColor}25 0%, ${resourceColor}15 100%)`
                : `linear-gradient(135deg, ${resourceColor}30 0%, ${resourceColor}15 100%)`,
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? `${resourceColor}40`
                : `${resourceColor}30`,
            flexShrink: 0,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? `0 2px 8px 0 ${resourceColor}20`
                : `0 2px 8px 0 ${resourceColor}15`,
          }}
        >
          <Icon sx={{ fontSize: 22, color: resourceColor, opacity: 0.95 }} />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            fontWeight={700}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
              mb: 0.5,
            }}
          >
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
            {resourceType}
          </Typography>
        </Box>
      </Box>

      {/* Status Badge */}
      {statusBadge && (
        <Box sx={{ mb: 1.5, position: 'relative', zIndex: 1 }}>
          {statusBadge}
        </Box>
      )}

      {/* Metrics */}
      {metrics && (
        <Box sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
          {metrics}
        </Box>
      )}

      {/* Footer */}
      {footer && (
        <Box sx={{ mt: 'auto', pt: 1.5, borderTop: '1px solid', borderColor: 'divider', position: 'relative', zIndex: 1 }}>
          {footer}
        </Box>
      )}
    </Paper>
  )
}
