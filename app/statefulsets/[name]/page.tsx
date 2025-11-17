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
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useStatefulSet } from '@/lib/hooks/use-statefulsets'

export default function StatefulSetDetailPage() {
  const params = useParams()
  const name = params.name as string
  const { data: statefulset, isLoading, error, refetch } = useStatefulSet(name)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !statefulset) {
    return (
      <Box>
        <PageHeader
          title="StatefulSet Details"
          breadcrumbs={[
            { label: 'StatefulSets', href: '/statefulsets' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('StatefulSet not found')}
          onRetry={refetch}
          title="Failed to Load StatefulSet"
        />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {statefulset.name}
            <StatusBadge status={statefulset.status} size="medium" />
          </Box>
        }
        metadata={[`Age: ${statefulset.age}`]}
        breadcrumbs={[
          { label: 'StatefulSets', href: '/statefulsets' },
          { label: statefulset.name },
        ]}
      />

      {/* Overview */}
      <GlassPanel sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Service Name
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {statefulset.serviceName}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Replicas
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {statefulset.replicas.ready}/{statefulset.replicas.desired}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Current
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {statefulset.replicas.current}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Updated
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {statefulset.replicas.updated}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Update Strategy
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {statefulset.updateStrategy}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Pod Management Policy
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {statefulset.podManagementPolicy}
            </Typography>
          </Grid>
        </Grid>
      </GlassPanel>

      {/* Persistent Volume Claims */}
      {statefulset.persistentVolumeClaims.length > 0 && (
        <GlassPanel sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Persistent Volume Claims
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {statefulset.persistentVolumeClaims.map((pvc) => (
              <Box
                key={pvc}
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" fontWeight="medium">
                  {pvc}
                </Typography>
              </Box>
            ))}
          </Box>
        </GlassPanel>
      )}

      {/* Labels */}
      {Object.keys(statefulset.labels).length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Labels
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {Object.entries(statefulset.labels).map(([key, value]) => (
              <Paper
                key={key}
                elevation={0}
                sx={{
                  px: 2,
                  py: 1,
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
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
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
      {(statefulset.configMaps.length > 0 || statefulset.secrets.length > 0) && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Resources
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {statefulset.configMaps.map((cm) => (
              <Link
                key={cm}
                href={`/configmaps/${encodeURIComponent(cm)}`}
                style={{ textDecoration: 'none' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    minWidth: 200,
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
                    borderRadius: 3,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(59, 130, 246, 0.5)'
                          : 'rgba(59, 130, 246, 0.4)',
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
            {statefulset.secrets.map((secret) => (
              <Link
                key={secret}
                href={`/secrets/${encodeURIComponent(secret)}`}
                style={{ textDecoration: 'none' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    minWidth: 200,
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
                    borderRadius: 3,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(234, 179, 8, 0.5)'
                          : 'rgba(234, 179, 8, 0.4)',
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
