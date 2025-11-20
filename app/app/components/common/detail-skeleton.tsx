import { Box, Paper, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid'

/**
 * Skeleton loader for detail pages
 * Shows animated placeholders while data is loading
 */
export function DetailSkeleton() {
  return (
    <Box>
      {/* Header Skeleton */}
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width={200} height={48} />
        <Box display="flex" gap={1} mt={2}>
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>

      <Box p={3}>
        <Grid container spacing={3}>
          {/* Details Panel Skeleton */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Skeleton variant="text" width={120} height={32} sx={{ mb: 2 }} />
              <Box display="flex" flexDirection="column" gap={2}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Box key={index}>
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width="60%" height={24} />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Labels Panel Skeleton */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Skeleton variant="text" width={100} height={32} sx={{ mb: 2 }} />
              <Box display="flex" flexWrap="wrap" gap={1}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={120}
                    height={32}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Content Section Skeleton */}
          <Grid size={12}>
            <Paper sx={{ p: 3 }}>
              <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 1 }} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
