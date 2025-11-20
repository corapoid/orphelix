'use client'

import { IconButton, Tooltip, Box } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useThemeMode } from './theme-provider'

export function ThemeToggle() {
  const { actualTheme, setThemeMode } = useThemeMode()

  const handleThemeToggle = () => {
    setThemeMode(actualTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Tooltip title={actualTheme === 'light' ? 'Dark mode' : 'Light mode'} arrow>
        <IconButton
          onClick={handleThemeToggle}
          size="medium"
          sx={{
            color: 'text.primary',
            bgcolor: 'background.paper',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              bgcolor: 'action.hover',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {actualTheme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}
