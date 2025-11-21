import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { ReactNode } from 'react'
import type { SvgIconComponent } from '@mui/icons-material'
import { useTheme } from '@orphelix/ui'

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
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const isLiquidGlass = visualPreset === 'liquidGlass'

  return (
    <Paper
      onClick={onClick}
      elevation={isGlass ? 0 : 1}
      sx={{
        p: 2,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        // Conditional glass effects - NO backdropFilter, NO gradients for performance!
        ...(isGlass && {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 46, 0.8)'
              : 'rgba(255, 255, 255, 0.5)',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(209, 213, 219, 0.5)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 2px 8px 0 rgba(0, 0, 0, 0.3)'
              : '0 2px 8px 0 rgba(31, 38, 135, 0.08)',
        }),
        '&:hover': {
          ...(isGlass && onClick && {
            transform: 'translateY(-2px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 4px 12px 0 rgba(0, 0, 0, 0.4)'
                : '0 4px 12px 0 rgba(31, 38, 135, 0.12)',
          }),
        },
        '&:active': {
          ...(isGlass && onClick && {
            transform: 'translateY(0px)',
          }),
        },
      }}
    >
      {/* Header with icon and name */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${resourceColor}25 0%, ${resourceColor}15 100%)`
                : `linear-gradient(135deg, ${resourceColor}30 0%, ${resourceColor}15 100%)`,
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
