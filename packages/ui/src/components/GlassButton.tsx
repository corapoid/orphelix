import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'
import type { AnchorHTMLAttributes } from 'react'

export interface GlassButtonProps extends Omit<ButtonProps, 'href'> {
  selected?: boolean
  href?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
}

/**
 * Glass Button - Auto-adapts to visual preset
 *
 * - Classic preset: Standard button with solid background
 * - Glass preset: Transparent with blur, no special effects
 * - Liquid Glass preset: Transparent + blur + inset shadows + hover animations
 *
 * The theme handles all styling based on the selected preset.
 * This replaces both LiquidGlassButton variants.
 */
export function GlassButton({ selected = false, sx, href, target, rel, ...props }: GlassButtonProps) {
  return (
    <Button
      {...props}
      {...(href && { href, component: 'a' as const, target, rel })}
      sx={{
        py: 2,
        px: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        // Theme provides all glass effects based on preset
        // Colors and effects come from theme
        ...(selected && {
          borderColor: 'primary.main',
        }),
        ...sx,
      }}
    />
  )
}
