'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Link from 'next/link'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useParams } from 'next/navigation'
import { StatusBadge } from '@/app/components/common/status-badge'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@orphelix/ui'
import { useDaemonSet } from '@/lib/hooks/use-daemonsets'
import { useTheme } from '@orphelix/ui'

export default function DaemonSetDetailPage() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const params = useParams()
  const name = params.name as string
  const { data: daemonset, isLoading, error, refetch } = useDaemonSet(name)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !daemonset) {
    return (
      <Box>
        <PageHeader
          title="DaemonSet Details"
          breadcrumbs={[
            { label: 'DaemonSets', href: '/daemonsets' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('DaemonSet not found')}
          onRetry={refetch}
          title="Failed to Load DaemonSet"
        />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {daemonset.name}
            <StatusBadge status={daemonset.status} size="medium" />
          </Box>
        }
        metadata={[`Age: ${daemonset.age}`]}
        breadcrumbs={[
          { label: 'DaemonSets', href: '/daemonsets' },
          { label: daemonset.name },
        ]}
      />

      {/* Overview */}
      <GlassPanel sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color={isGlass ? "text.secondary" : "text.primary"}>
              Desired
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {daemonset.desired}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color={isGlass ? "text.secondary" : "text.primary"}>
              Current
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {daemonset.current}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color={isGlass ? "text.secondary" : "text.primary"}>
              Ready
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {daemonset.ready}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color={isGlass ? "text.secondary" : "text.primary"}>
              Up-to-date
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {daemonset.upToDate}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color={isGlass ? "text.secondary" : "text.primary"}>
              Available
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {daemonset.available}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color={isGlass ? "text.secondary" : "text.primary"}>
              Update Strategy
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {daemonset.updateStrategy}
            </Typography>
          </Grid>
        </Grid>
      </GlassPanel>

      {/* Labels */}
      {Object.keys(daemonset.labels).length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Labels
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {Object.entries(daemonset.labels).map(([key, value]) => (
              <Paper
                key={key}
                elevation={isGlass ? 0 : 1}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  ...(isGlass && {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(30, 30, 46, 0.6)'
                        : 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(209, 213, 219, 0.4)',
                  }),
                }}
              >
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  {key}:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {value}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      {/* Resources */}
      {(daemonset.configMaps.length > 0 || daemonset.secrets.length > 0) && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Resources
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {daemonset.configMaps.map((cm) => (
              <Link
                key={cm}
                href={`/configmaps/${encodeURIComponent(cm)}`}
                style={{ textDecoration: 'none' }}
              >
                <Paper
                  elevation={isGlass ? 0 : 1}
                  sx={{
                    p: 2.5,
                    minWidth: 200,
                    borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    ...(isGlass && {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(30, 30, 46, 0.6)'
                          : 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(24px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                      border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.12)'
                          : 'rgba(209, 213, 219, 0.4)',
                    }),
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      ...(isGlass && {
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(59, 130, 246, 0.5)'
                            : 'rgba(59, 130, 246, 0.4)',
                      }),
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="info.main" fontWeight={600}>
                      ConfigMap
                    </Typography>
                    <OpenInNewIcon fontSize="small" sx={{ color: 'info.main', opacity: 0.6 }} />
                  </Box>
                  <Typography variant="body1" fontWeight={500}>
                    {cm}
                  </Typography>
                </Paper>
              </Link>
            ))}
            {daemonset.secrets.map((secret) => (
              <Link
                key={secret}
                href={`/secrets/${encodeURIComponent(secret)}`}
                style={{ textDecoration: 'none' }}
              >
                <Paper
                  elevation={isGlass ? 0 : 1}
                  sx={{
                    p: 2.5,
                    minWidth: 200,
                    borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    ...(isGlass && {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(30, 30, 46, 0.6)'
                          : 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(24px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                      border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.12)'
                          : 'rgba(209, 213, 219, 0.4)',
                    }),
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      ...(isGlass && {
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(234, 179, 8, 0.5)'
                            : 'rgba(234, 179, 8, 0.4)',
                      }),
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="warning.main" fontWeight={600}>
                      Secret
                    </Typography>
                    <OpenInNewIcon fontSize="small" sx={{ color: 'warning.main', opacity: 0.6 }} />
                  </Box>
                  <Typography variant="body1" fontWeight={500}>
                    {secret}
                  </Typography>
                </Paper>
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
