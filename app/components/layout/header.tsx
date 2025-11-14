'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { RealtimeStatus } from './realtime-status'
import { Logo } from './logo'
import { SearchBar } from '../common/search-bar'
import { useSearch } from '@/lib/contexts/search-context'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick: _onMenuClick }: HeaderProps) {
  const { searchQuery, setSearchQuery, searchPlaceholder } = useSearch()

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
        {/* Logo on the left */}
        <Logo collapsed={false} />

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Search bar in the center */}
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={searchPlaceholder}
          />
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Real-time status on the right */}
        <RealtimeStatus />
      </Toolbar>
    </AppBar>
  )
}
