'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SearchBar } from '../common/search-bar'
import { NamespaceSelector } from './namespace-selector'
import { RealtimeStatus } from './realtime-status'
import { useSearch } from '@/lib/contexts/search-context'
import { useModeStore } from '@/lib/core/store'

interface PageHeaderProps {
  title: string
  subtitle?: string
  hideSearch?: boolean
  hideNamespace?: boolean
}

export function PageHeader({
  title,
  subtitle,
  hideSearch = false,
  hideNamespace = false,
}: PageHeaderProps) {
  const { searchQuery, setSearchQuery, searchPlaceholder } = useSearch()
  const mode = useModeStore((state) => state.mode)

  return (
    <Box sx={{ mb: 3 }}>
      {/* Title and subtitle */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Controls row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {/* Search bar */}
        {!hideSearch && (
          <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={searchPlaceholder}
              fullWidth
            />
          </Box>
        )}

        {/* Namespace selector (only in real mode) */}
        {!hideNamespace && mode === 'real' && (
          <Box sx={{ minWidth: 200 }}>
            <NamespaceSelector />
          </Box>
        )}

        {/* Realtime status */}
        <RealtimeStatus />
      </Box>
    </Box>
  )
}
