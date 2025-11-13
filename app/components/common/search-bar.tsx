'use client'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'

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
          bgcolor: 'background.paper',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          },
        },
      }}
    />
  )
}
