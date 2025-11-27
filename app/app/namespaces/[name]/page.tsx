'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useParams } from 'next/navigation'
import { useNamespace } from '@/lib/hooks/use-namespaces'
import { useResourceQuotas } from '@/lib/hooks/use-resourcequotas'
import { useLimitRanges } from '@/lib/hooks/use-limitranges'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { QuotaUsageCard } from '@/app/components/namespace/quota-usage-card'
import { useModeStore } from '@/lib/core/store'
import { useEffect } from 'react'
import { useTheme } from '@/lib/ui'

export default function NamespaceDetailPage() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const params = useParams()
  const name = params.name as string
  const setNamespace = useModeStore((state) => state.setNamespace)

  // Set the namespace in store for other components
  useEffect(() => {
    setNamespace(name)
    return () => {
      // Don't clear on unmount as other pages might need it
    }
  }, [name, setNamespace])

  const { data: namespace, isLoading, error, refetch } = useNamespace(name)
  const { data: quotas, error: quotasError } = useResourceQuotas()
  useLimitRanges()
  // const [docsOpen, setDocsOpen] = useState(true)

  useAutoRefresh(refetch)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !namespace) {
    return (
      <Box sx={{ px: 2 }}>
        <PageHeader
          title="Namespace Details"
          breadcrumbs={[
            { label: 'Namespaces', href: '/namespaces' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('Namespace not found')}
          onRetry={() => refetch()}
          title="Failed to Load Namespace"
        />
      </Box>
    )
  }

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {namespace.name}
            <Chip
              label={namespace.status}
              size="medium"
              color={namespace.status === 'Active' ? 'success' : 'default'}
              variant="outlined"
            />
          </Box>
        }
        metadata={[`Age: ${namespace.age}`]}
        breadcrumbs={[
          { label: 'Namespaces', href: '/namespaces' },
          { label: namespace.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Box>
        {/* Labels */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Labels
          </Typography>
          {Object.keys(namespace.labels).length > 0 ? (
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {Object.entries(namespace.labels).map(([key, value]) => (
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
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, color: 'text.secondary' }}
                  >
                    {key}:
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {value}
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No labels defined
            </Typography>
          )}
        </Box>

          {/* Resource Quotas */}
          {quotasError ? (
            <Box sx={{ mt: 3 }}>
            <Alert severity="warning">
              <AlertTitle>Cannot Load Resource Quotas</AlertTitle>
              {quotasError instanceof Error && quotasError.message.includes('403')
                ? 'You do not have permission to view resource quotas in this namespace.'
                : 'Failed to load resource quotas. Check your cluster connection and permissions.'}
            </Alert>
            </Box>
          ) : quotas && quotas.length > 0 ? (
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {quotas.map((quota) => (
                  <Grid size={{ xs: 12, md: 6 }} key={quota.name}>
                    <QuotaUsageCard quota={quota} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : null}

          {/* Annotations */}
          {Object.keys(namespace.annotations).length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Annotations
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {Object.entries(namespace.annotations).map(([key, value]) => (
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
      </Box>
      {/* Documentation content preserved for future use:
        Right Sidebar - Documentation
        About Namespaces
        Namespaces provide a mechanism for isolating groups of resources within a single cluster.
        When to Use Namespaces: teams/projects, multiple environments, resource quotas, RBAC
        Built-in Namespaces: default, kube-system, kube-public, kube-node-lease
        Resource Quotas & Limits
        Learn more: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
      */}
    </Box>
  )
}
