import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'
import type { AnchorHTMLAttributes } from 'react'
import { alpha, useTheme as useMuiTheme } from '@mui/material/styles'

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
export function GlassButton({ selected = false, sx, href, target, rel, size, ...props }: GlassButtonProps) {
  const theme = useMuiTheme()
  // @ts-expect-error - custom theme property
  const isGlass = theme.palette.mode && theme.effects?.transparency !== false
  const surfaceColor = theme.palette.background?.paper ?? theme.palette.background.default
  const hoverColor = alpha(surfaceColor, theme.palette.mode === 'dark' ? 0.9 : 0.95)

  // Size-based padding
  const sizeStyles = size === 'small'
    ? { py: 0.6, px: 1.75, fontSize: '0.8125rem' }
    : size === 'large'
    ? { py: 2.5, px: 5 }
    : { py: 2, px: 4 }

  return (
    <Button
      {...props}
      size={size}
      {...(href && { href, component: 'a' as const, target, rel })}
      sx={{
        ...sizeStyles,
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        // Conditional glass effects
        ...(isGlass && {
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: surfaceColor,
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
            backgroundColor: hoverColor,
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
