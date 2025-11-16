import Button from '@mui/material/Button'
import { ButtonProps } from '@mui/material/Button'

interface LiquidGlassButtonProps extends ButtonProps {
  selected?: boolean
}

/**
 * Button with liquid glass styling
 * Matches the glassmorphism effect from ResourceCard
 */
export function LiquidGlassButton({ selected = false, sx, ...props }: LiquidGlassButtonProps) {
  return (
    <Button
      {...props}
      sx={{
        justifyContent: 'flex-start',
        py: 2,
        px: 2,
        borderRadius: 3,
        border: '1px solid',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 30, 46, 0.6)'
            : 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(209, 213, 219, 0.4)',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
            : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
        ...(selected && {
          borderColor: 'primary.main',
        }),
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.18)'
              : 'rgba(209, 213, 219, 0.6)',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(50, 50, 70, 0.7)'
              : 'rgba(255, 255, 255, 0.4)',
        },
        ...sx,
      }}
    />
  )
}
