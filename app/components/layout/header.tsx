'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { RealtimeStatus } from './realtime-status'
import { Logo } from './logo'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick: _onMenuClick }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 'none',
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Logo collapsed={false} />

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Real-time status indicator */}
          <RealtimeStatus />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
