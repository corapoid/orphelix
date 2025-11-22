'use client'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import { useGlassSurface } from '@/lib/ui/use-glass-surface'

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
  const glassInputSurface = useGlassSurface()

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
      sx={(theme) => ({
        minWidth: fullWidth ? undefined : 300,
        '& .MuiOutlinedInput-root': {
          ...glassInputSurface,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 4px 16px rgba(0, 0, 0, 0.35)'
              : '0 8px 24px rgba(15, 23, 42, 0.12)',
          borderRadius: `${theme.shape.borderRadius}px`,
          '& fieldset': {
            borderWidth: '1px',
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderWidth: '1px',
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px',
            borderColor: theme.palette.primary.main,
          },
        },
      })}
    />
  )
}
