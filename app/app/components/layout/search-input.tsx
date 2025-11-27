'use client'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useSearch } from '@/lib/contexts/search-context'
import { useTheme } from '@/lib/ui'

export function SearchInput() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const { searchQuery, setSearchQuery, searchPlaceholder } = useSearch()

  return (
    <TextField
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder={searchPlaceholder}
      size="small"
      variant="outlined"
      sx={{
        minWidth: 300,
        maxWidth: 500,
        width: '100%',
        '& .MuiOutlinedInput-root': {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.5)',
          ...(isGlass && {
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }),
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          transition: 'all 0.2s ease-in-out',
          '& fieldset': {
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(209, 213, 219, 0.4)',
            transition: 'border-color 0.2s ease-in-out',
          },
          '&:hover': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(255, 255, 255, 0.7)',
            '& fieldset': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(209, 213, 219, 0.6)',
            },
          },
          '&.Mui-focused': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(255, 255, 255, 0.8)',
            '& fieldset': {
              borderColor: 'primary.main',
              borderWidth: '1px',
            },
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          </InputAdornment>
        ),
        endAdornment: searchQuery && (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => setSearchQuery('')}
              sx={{
                padding: 0.5,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ClearIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
