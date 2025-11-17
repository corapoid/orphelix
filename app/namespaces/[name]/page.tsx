'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
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
import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { GlassPanel } from '@/app/components/common/glass-panel'
import Link from 'next/link'

export default function NamespaceDetailPage() {
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
  const { data: limitRanges, error: limitRangesError } = useLimitRanges()
  const [docsOpen, setDocsOpen] = useState(true)

  useAutoRefresh(refetch)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !namespace) {
    return (
      <Box>
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
    <Box>
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
        headerActions={
          <IconButton
            onClick={() => setDocsOpen(!docsOpen)}
            size="medium"
            title={docsOpen ? "Hide documentation" : "Show documentation"}
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <InfoOutlinedIcon />
          </IconButton>
        }
      />

      <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Grid container spacing={3}>
            {/* Namespace Info */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Namespace Information
              </Typography>
              <GlassPanel>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {namespace.name}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={namespace.status}
                    size="small"
                    color={namespace.status === 'Active' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Age
                </Typography>
                <Typography variant="body2" fontWeight="medium">{namespace.age}</Typography>
              </Box>
            </Box>
              </GlassPanel>
            </Grid>

            {/* Labels */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Labels
              </Typography>
              <GlassPanel>

            {Object.keys(namespace.labels).length > 0 ? (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                {Object.entries(namespace.labels).map(([key, value]) => (
                  <Chip key={key} label={`${key}=${value}`} size="small" variant="outlined" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No labels defined
              </Typography>
            )}
              </GlassPanel>
            </Grid>
          </Grid>

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

          {/* Limit Ranges */}
          {limitRangesError ? (
            <Box sx={{ mt: 3 }}>
            <Alert severity="warning">
              <AlertTitle>Cannot Load Limit Ranges</AlertTitle>
              {limitRangesError instanceof Error && limitRangesError.message.includes('403')
                ? 'You do not have permission to view limit ranges in this namespace.'
                : 'Failed to load limit ranges. Check your cluster connection and permissions.'}
            </Alert>
            </Box>
          ) : limitRanges && limitRanges.length > 0 ? (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Limit Ranges
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
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
                }}
              >

              {limitRanges.map((lr) => (
                <Box key={lr.name} sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    {lr.name}
                  </Typography>

                  {lr.limits.map((limit, idx) => (
                    <TableContainer key={idx} sx={{ mt: 1 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Type: {limit.type}</TableCell>
                            <TableCell>CPU</TableCell>
                            <TableCell>Memory</TableCell>
                            {limit.type === 'PersistentVolumeClaim' && (
                              <TableCell>Storage</TableCell>
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {limit.max && (
                            <TableRow>
                              <TableCell>Max</TableCell>
                              <TableCell>{limit.max.cpu || '-'}</TableCell>
                              <TableCell>{limit.max.memory || '-'}</TableCell>
                              {limit.type === 'PersistentVolumeClaim' && (
                                <TableCell>{limit.max.storage || '-'}</TableCell>
                              )}
                            </TableRow>
                          )}
                          {limit.min && (
                            <TableRow>
                              <TableCell>Min</TableCell>
                              <TableCell>{limit.min.cpu || '-'}</TableCell>
                              <TableCell>{limit.min.memory || '-'}</TableCell>
                              {limit.type === 'PersistentVolumeClaim' && (
                                <TableCell>{limit.min.storage || '-'}</TableCell>
                              )}
                            </TableRow>
                          )}
                          {limit.default && (
                            <TableRow>
                              <TableCell>Default</TableCell>
                              <TableCell>{limit.default.cpu || '-'}</TableCell>
                              <TableCell>{limit.default.memory || '-'}</TableCell>
                              {limit.type === 'PersistentVolumeClaim' && <TableCell>-</TableCell>}
                            </TableRow>
                          )}
                          {limit.defaultRequest && (
                            <TableRow>
                              <TableCell>Default Request</TableCell>
                              <TableCell>{limit.defaultRequest.cpu || '-'}</TableCell>
                              <TableCell>{limit.defaultRequest.memory || '-'}</TableCell>
                              {limit.type === 'PersistentVolumeClaim' && <TableCell>-</TableCell>}
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ))}
                </Box>
              ))}
              </Paper>
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
        </Box>

        {/* Right Sidebar - Documentation */}
        <Box
          sx={{
            width: 520,
            flexShrink: 0,
            mt: -12,
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-start',
            maxHeight: '100vh',
          }}
        >
          <GlassPanel
            open={docsOpen}
            closeable
            onClose={() => setDocsOpen(false)}
            animationType="fade"
            sx={{ p: 3, overflow: 'auto', maxHeight: '100vh' }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                About Namespaces
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              Namespaces provide a mechanism for isolating groups of resources within a single cluster. Names of resources need to be unique within a namespace, but not across namespaces. Namespace-based scoping is applicable only for namespaced objects (e.g. Deployments, Services, etc) and not for cluster-wide objects (e.g. StorageClass, Nodes, PersistentVolumes, etc).
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              When to Use Namespaces
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  Isolating resources for different teams or projects.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  Supporting multiple environments (dev, staging, prod) in one cluster.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  Applying different resource quotas and limits.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  Implementing access control via RBAC policies.
                </Typography>
              </li>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Built-in Namespaces
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  <strong>default:</strong> The default namespace for objects with no other namespace.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>kube-system:</strong> For objects created by the Kubernetes system.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>kube-public:</strong> Readable by all users, reserved for cluster usage.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>kube-node-lease:</strong> For node heartbeat objects.
                </Typography>
              </li>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Resource Quotas & Limits
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              Namespaces can have ResourceQuotas to limit the aggregate resource consumption, and LimitRanges to enforce minimum and maximum resource usage constraints on individual containers or pods.
            </Typography>

            <Box sx={{
              mt: 3,
              pt: 2,
              borderTop: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
            }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                }}
              >
                Learn more in the{' '}
                <Link
                  href="https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    official Kubernetes docs
                  </Typography>
                  <Box component="span" sx={{ fontSize: '0.65rem' }}>↗</Box>
                </Link>
              </Typography>
            </Box>
          </GlassPanel>
        </Box>
      </Box>
    </Box>
  )
}
