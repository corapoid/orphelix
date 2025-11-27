'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import CloudIcon from '@mui/icons-material/Cloud'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import GitHubIcon from '@mui/icons-material/GitHub'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { useRouter } from 'next/navigation'
import { useThemeMode } from '../theme-provider'
import { useModeStore } from '@/lib/core/store'
import { useTheme } from '@orphelix/ui'

export function UserMenu() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const { data: session } = useSession()
  const router = useRouter()
  const mode = useModeStore((state) => state.mode)
  const { mode: themeMode, setThemeMode } = useThemeMode()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setThemeMode(newMode)
  }

  const handleNavigation = (path: string) => {
    handleClose()
    // Prefix path with /demo if in demo mode
    const finalPath = mode === 'demo' ? `/demo${path}` : path
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.push(finalPath as any)
  }

  const handleLogout = async () => {
    handleClose()
    await signOut({ redirect: false })
    // Reset welcome modal
    useModeStore.getState().setHasCompletedWelcome(false)
  }

  // Show demo user in demo mode, real user in real mode
  const isDemo = mode === 'demo'
  const userName = isDemo ? 'Demo User' : (session?.user?.name || 'User')
  const userEmail = isDemo ? 'demo@orphelix.com' : (session?.user?.email || 'GitHub User')
  const userImage = isDemo
    ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo&backgroundColor=b6e3f4&eyes=default&mouth=smile'
    : session?.user?.image

  return (
    <>
      <Tooltip title={userName}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'transparent !important',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'transparent',
              '& .user-avatar-shadow': {
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 12px 30px rgba(0, 0, 0, 0.6)'
                    : '0 12px 34px rgba(15, 23, 42, 0.28)',
              },
            },
          }}
        >
          <Box
            className="user-avatar-shadow"
            sx={{
              borderRadius: '50%',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 10px 28px rgba(0, 0, 0, 0.55)'
                  : '0 10px 28px rgba(15, 23, 42, 0.22)',
              transition: 'box-shadow 0.2s ease-in-out',
            }}
          >
            <Avatar
              src={userImage || undefined}
              alt={userName}
              sx={{
                width: 32,
                height: 32,
                border: 'none',
                backgroundColor: 'transparent !important',
              }}
            >
              {!userImage && userName.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          mt: 1,
          '& .MuiPaper-root': {
            minWidth: 240,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            ...(isGlass && {
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            }),
          },
        }}
      >
        {/* User Info */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={userImage || undefined}
            alt={userName}
            sx={{ width: 40, height: 40 }}
          >
            {!userImage && userName.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {userName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {userEmail}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Theme Mode Icons */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Tooltip title="Light Mode">
            <IconButton
              size="small"
              onClick={() => handleThemeChange('light')}
              sx={{
                color: themeMode === 'light' ? 'primary.main' : 'text.secondary',
                bgcolor: themeMode === 'light' ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <LightModeOutlinedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dark Mode">
            <IconButton
              size="small"
              onClick={() => handleThemeChange('dark')}
              sx={{
                color: themeMode === 'dark' ? 'primary.main' : 'text.secondary',
                bgcolor: themeMode === 'dark' ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="System">
            <IconButton
              size="small"
              onClick={() => handleThemeChange('system')}
              sx={{
                color: themeMode === 'system' ? 'primary.main' : 'text.secondary',
                bgcolor: themeMode === 'system' ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <LaptopOutlinedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider />

        {/* Settings Menu Items */}
        <MenuItem onClick={() => handleNavigation('/settings?tab=0')}>
          <ListItemIcon>
            <CloudIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cluster Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/settings?tab=1')}>
          <ListItemIcon>
            <GitHubIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>GitHub Integration</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/settings?tab=2')}>
          <ListItemIcon>
            <AutoAwesomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>AI Features</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/settings?tab=3')}>
          <ListItemIcon>
            <PaletteOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Design</ListItemText>
        </MenuItem>

        {/* Logout - only in real mode */}
        {!isDemo && <Divider />}
        {!isDemo && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
