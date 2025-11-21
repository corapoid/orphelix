'use client'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@orphelix/ui'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  fullWidth?: boolean
}

/**
 * Unified search bar component
 *
 * Consistent search input across all list pages
 */
export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  fullWidth = false,
}: SearchBarProps) {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'

  const handleClear = () => {
    onChange('')
  }

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth={fullWidth}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear} edge="end">
                <ClearIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        minWidth: fullWidth ? undefined : 300,
        '& .MuiOutlinedInput-root': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 46, 0.6)'
              : 'rgba(255, 255, 255, 0.25)',
          ...(isGlass && {
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(209, 213, 219, 0.4)',
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          '& fieldset': {
            border: 'none',
          },
          '&:hover': {
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(209, 213, 219, 0.6)',
          },
          '&.Mui-focused': {
            borderColor: 'primary.main',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 0 0 2px rgba(59, 130, 246, 0.2)'
                : '0 0 0 2px rgba(59, 130, 246, 0.1)',
          },
        },
      }}
    />
  )
}
