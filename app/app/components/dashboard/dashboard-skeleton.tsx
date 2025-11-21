import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export function DashboardSkeleton() {
  return (
    <Box>
      {/* Critical Alerts */}
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="rounded" height={120} />
      </Box>

      {/* Resource Overview - 4 cards */}
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={140} />
          ))}
        </Box>
      </Box>

      {/* Resource Utilization + Recent Activity */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <Box>
          <Skeleton variant="text" width={250} height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={300} />
        </Box>
        <Box>
          <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={300} />
        </Box>
      </Box>
    </Box>
  )
}
