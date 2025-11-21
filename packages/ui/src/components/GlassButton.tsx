import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'
import type { AnchorHTMLAttributes } from 'react'
import { useTheme as useMuiTheme } from '@mui/material/styles'

export interface GlassButtonProps extends Omit<ButtonProps, 'href'> {
  selected?: boolean
  href?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
}

/**
 * Glass Button - Auto-adapts to visual preset
 *
 * - Classic preset: Standard button with solid background, no glass effects
 * - Glass preset: Transparent with blur, border
 * - Liquid Glass preset: Transparent + blur + inset shadows + hover animations
 *
 * Automatically detects the visual preset from theme and applies appropriate styles.
 */
export function GlassButton({ selected = false, sx, href, target, rel, ...props }: GlassButtonProps) {
  const theme = useMuiTheme()
  // @ts-ignore - custom theme property
  const isGlass = theme.palette.mode && theme.effects?.transparency !== false

  return (
    <Button
      {...props}
      {...(href && { href, component: 'a' as const, target, rel })}
      sx={{
        py: 2,
        px: 4,
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        // Conditional glass effects
        ...(isGlass && {
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 46, 0.6)'
              : 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }),
        // Selected state
        ...(selected && {
          borderColor: 'primary.main',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(99, 102, 241, 0.15)'
              : 'rgba(99, 102, 241, 0.1)',
        }),
        '&:hover': {
          ...(isGlass && {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(50, 50, 70, 0.7)'
                : 'rgba(255, 255, 255, 0.4)',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.18)'
                : 'rgba(209, 213, 219, 0.6)',
          }),
        },
        ...sx,
      }}
    />
  )
}
