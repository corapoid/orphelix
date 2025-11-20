import Button from '@mui/material/Button'
import { ButtonProps } from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

interface LiquidGlassButtonProps extends ButtonProps {
  selected?: boolean
}

/**
 * Button with liquid glass styling
 * Matches the glassmorphism effect from ResourceCard
 */
export function LiquidGlassButton({ selected = false, sx, ...props }: LiquidGlassButtonProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Button
      {...props}
      sx={{
        justifyContent: 'center',
        py: 1.5,
        px: 4,
        borderRadius: 3,
        border: '1px solid',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: '1.1rem',
        backgroundColor: isDark ? 'rgba(44, 44, 46, 0.75)' : 'rgba(255, 255, 255, 0.68)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(60, 60, 67, 0.12)',
        boxShadow: isDark
          ? '0 4px 16px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
          : '0 4px 16px 0 rgba(0, 0, 0, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.02)',
        color: isDark ? 'white' : 'text.primary',
        ...(selected && {
          borderColor: 'primary.main',
        }),
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(60, 60, 67, 0.18)',
          backgroundColor: isDark ? 'rgba(58, 58, 60, 0.86)' : 'rgba(255, 255, 255, 0.78)',
        },
        ...sx,
      }}
    />
  )
}
