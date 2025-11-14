'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import LockIcon from '@mui/icons-material/Lock'
import { useParams } from 'next/navigation'
import { useIngress } from '@/lib/hooks/use-ingress'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'

export default function IngressDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: ingress, isLoading, error, refetch } = useIngress(name)

  // Auto-refresh
  useAutoRefresh(refetch)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !ingress) {
    return (
      <Box>
        <PageHeader
          title="Ingress Details"
          breadcrumbs={[
            { label: 'Ingress', href: '/ingress' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('Ingress not found')}
          onRetry={() => refetch()}
          title="Failed to Load Ingress"
        />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {ingress.name}
            {ingress.tls && ingress.tls.length > 0 && (
              <Chip
                icon={<LockIcon sx={{ fontSize: 14 }} />}
                label="TLS Secured"
                size="medium"
                color="success"
              />
            )}
          </Box>
        }
        metadata={[
          `Namespace: ${ingress.namespace}`,
          `Age: ${ingress.age}`,
        ]}
        breadcrumbs={[
          { label: 'Ingress', href: '/ingress' },
          { label: ingress.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Grid container spacing={3}>
        {/* Ingress Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ingress Information
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Ingress Class
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {ingress.className ? (
                    <Chip label={ingress.className} size="small" variant="outlined" />
                  ) : (
                    'default'
                  )}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Hosts
                </Typography>
                {ingress.hosts.length > 0 ? (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                    {ingress.hosts.map((host, idx) => (
                      <Chip
                        key={idx}
                        label={host}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1">All hosts (*)</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Age
                </Typography>
                <Typography variant="body1">{ingress.age}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* TLS Configuration */}
        {ingress.tls && ingress.tls.length > 0 && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LockIcon fontSize="small" />
                  TLS Configuration
                </Box>
              </Typography>

              {ingress.tls.map((tlsConfig, idx) => (
                <Box key={idx} sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Hosts
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                      {tlsConfig.hosts.map((host, hostIdx) => (
                        <Chip
                          key={hostIdx}
                          label={host}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  {tlsConfig.secretName && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Secret
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
                        {tlsConfig.secretName}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Paper>
          </Grid>
        )}

        {/* Rules and Paths */}
        <Grid item xs={12}>
          <Paper>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Rules and Paths
              </Typography>
            </Box>

            {ingress.rules.map((rule, ruleIdx) => (
              <Box key={ruleIdx} sx={{ mb: 2 }}>
                <Box sx={{ px: 3, py: 1, bgcolor: 'action.hover' }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {rule.host || 'All hosts (*)'}
                  </Typography>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Path</TableCell>
                        <TableCell>Path Type</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Port</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rule.paths.map((path, pathIdx) => (
                        <TableRow key={pathIdx}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {path.path}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={path.pathType} size="small" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {path.backend.service.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {path.backend.service.port.number || path.backend.service.port.name || '-'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))}

            {ingress.rules.length === 0 && (
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  No rules defined
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Labels */}
        {Object.keys(ingress.labels).length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Labels
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                {Object.entries(ingress.labels).map(([key, value]) => (
                  <Chip
                    key={key}
                    label={`${key}=${value}`}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
