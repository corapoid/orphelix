'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
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
import { useEffect } from 'react'

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
  const { data: quotas } = useResourceQuotas()
  const { data: limitRanges } = useLimitRanges()

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
      />

      <Grid container spacing={3}>
        {/* Namespace Info */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Namespace Information
            </Typography>

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
                <Typography variant="body1">{namespace.age}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Labels */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Labels
            </Typography>

            {Object.keys(namespace.labels).length > 0 ? (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                {Object.entries(namespace.labels).map(([key, value]) => (
                  <Chip key={key} label={`${key}=${value}`} size="small" variant="outlined" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                No labels defined
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Resource Quotas */}
        {quotas && quotas.length > 0 && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {quotas.map((quota) => (
                <Grid item xs={12} md={6} key={quota.name}>
                  <QuotaUsageCard quota={quota} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {/* Limit Ranges */}
        {limitRanges && limitRanges.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Limit Ranges
              </Typography>

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
          </Grid>
        )}

        {/* Annotations */}
        {Object.keys(namespace.annotations).length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Annotations
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                {Object.entries(namespace.annotations).map(([key, value]) => (
                  <Chip key={key} label={`${key}=${value}`} size="small" variant="outlined" />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
