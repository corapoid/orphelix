import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import type { ViewMode } from '@/lib/hooks/use-view-mode'

interface ViewModeToggleProps {
  viewMode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewModeToggle({ viewMode, onChange }: ViewModeToggleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        p: 0.5,
      }}
    >
      <Tooltip title="List view">
        <IconButton
          size="small"
          onClick={() => onChange('list')}
          sx={{
            bgcolor: viewMode === 'list' ? 'primary.main' : 'transparent',
            color: viewMode === 'list' ? 'white' : 'text.secondary',
            '&:hover': {
              bgcolor: viewMode === 'list' ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          <ViewListIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Grid view">
        <IconButton
          size="small"
          onClick={() => onChange('grid')}
          sx={{
            bgcolor: viewMode === 'grid' ? 'primary.main' : 'transparent',
            color: viewMode === 'grid' ? 'white' : 'text.secondary',
            '&:hover': {
              bgcolor: viewMode === 'grid' ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          <ViewModuleIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
