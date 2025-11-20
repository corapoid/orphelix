import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

interface GridSkeletonProps {
  cards?: number
}

export function GridSkeleton({ cards = 8 }: GridSkeletonProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 2,
      }}
    >
      {Array.from({ length: cards }).map((_, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'rgba(0, 0, 0, 0.01)',
          }}
        >
          {/* Header with icon and title */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
            <Skeleton variant="rounded" width={44} height={44} />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="70%" height={24} />
              <Skeleton variant="text" width="50%" height={20} />
            </Box>
          </Box>

          {/* Status badge */}
          <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
            <Skeleton variant="rounded" width={80} height={22} />
            <Skeleton variant="rounded" width={60} height={22} />
          </Box>

          {/* Metrics */}
          <Box>
            <Skeleton variant="text" width="40%" height={16} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="90%" height={14} />
            <Skeleton variant="text" width="85%" height={14} />
            <Skeleton variant="text" width="80%" height={14} />
            <Skeleton variant="text" width="30%" height={16} sx={{ mt: 1 }} />
          </Box>
        </Box>
      ))}
    </Box>
  )
}
