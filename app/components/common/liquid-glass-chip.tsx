import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'

interface LiquidGlassChipProps extends ChipProps {
  color?: 'success' | 'error' | 'warning' | 'info' | 'default'
}

export function LiquidGlassChip({ color = 'default', sx, ...props }: LiquidGlassChipProps) {
  const getColors = (colorType: typeof color) => {
    const colorMap = {
      success: {
        bg: 'rgba(52, 199, 89, 0.15)',
        bgDark: 'rgba(52, 199, 89, 0.2)',
        text: '#34C759',
        textDark: '#30D158',
      },
      error: {
        bg: 'rgba(255, 59, 48, 0.15)',
        bgDark: 'rgba(255, 69, 58, 0.2)',
        text: '#FF3B30',
        textDark: '#FF453A',
      },
      warning: {
        bg: 'rgba(255, 149, 0, 0.15)',
        bgDark: 'rgba(255, 159, 10, 0.2)',
        text: '#FF9500',
        textDark: '#FF9F0A',
      },
      info: {
        bg: 'rgba(0, 122, 255, 0.15)',
        bgDark: 'rgba(10, 132, 255, 0.2)',
        text: '#007AFF',
        textDark: '#0A84FF',
      },
      default: {
        bg: 'rgba(142, 142, 147, 0.15)',
        bgDark: 'rgba(142, 142, 147, 0.2)',
        text: '#8E8E93',
        textDark: '#98989D',
      },
    }
    return colorMap[colorType] || colorMap.default
  }

  const colors = getColors(color)

  return (
    <Chip
      {...props}
      sx={{
        fontWeight: 500,
        fontSize: '0.6875rem',
        height: 20,
        minWidth: 70,
        borderRadius: '10px',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? colors.bgDark : colors.bg,
        color: (theme) => theme.palette.mode === 'dark' ? colors.textDark : colors.text,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.08)',
        boxShadow: 'none',
        '& .MuiChip-label': {
          padding: '0 8px',
        },
        '& .MuiChip-icon': {
          marginLeft: '4px',
          marginRight: '-4px',
          fontSize: '0.875rem',
          color: (theme) => theme.palette.mode === 'dark' ? colors.textDark : colors.text,
        },
        ...sx,
      }}
    />
  )
}
