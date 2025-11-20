import Card from '@mui/material/Card'
import type { CardProps } from '@mui/material/Card'

export interface GlassCardProps extends CardProps {
  /**
   * Whether the card should be interactive (hover effects, clickable)
   */
  interactive?: boolean
}

/**
 * Glass Card - Auto-adapts to visual preset
 *
 * - Classic preset: Solid background, standard elevation
 * - Glass preset: Blur + transparency
 * - Liquid Glass preset: Blur + transparency + gradient shine + hover animations
 *
 * The theme handles all styling based on the selected preset.
 */
export function GlassCard({ interactive = false, sx, ...props }: GlassCardProps) {
  return (
    <Card
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        // Theme provides all styling based on visual preset
        // Effects (blur, gradient, animations) come from theme
        ...(interactive && {
          cursor: 'pointer',
          // Additional hover effects are applied by theme when animations are enabled
        }),
        ...sx,
      }}
    />
  )
}
