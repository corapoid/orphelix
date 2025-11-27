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
import { GlassPanel } from '@/lib/ui'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { useTheme } from '@/lib/ui'

export default function IngressDetailPage() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const params = useParams()
  const name = params.name as string

  const { data: ingress, isLoading, error, refetch } = useIngress(name)
  // const [docsOpen, setDocsOpen] = useState(true)

  // Auto-refresh
  useAutoRefresh(refetch)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !ingress) {
    return (
      <Box sx={{ px: 2 }}>
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
    <Box sx={{ px: 2 }}>
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

      <Box>
        {/* Main Content */}
          <Grid container spacing={3}>
            {/* Ingress Details */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Ingress Information
              </Typography>
              <GlassPanel>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Ingress Class:
                    </Typography>
                    {ingress.className ? (
                      <Chip label={ingress.className} size="small" variant="outlined" />
                    ) : (
                      <Typography variant="body2" fontWeight="medium">
                        default
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"} sx={{ mb: 1 }}>
                      Hosts:
                    </Typography>
                    {ingress.hosts.length > 0 ? (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
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
                      <Typography variant="body2" fontWeight="medium">
                        All hosts (*)
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Age:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {ingress.age}
                    </Typography>
                  </Box>
                </Box>
              </GlassPanel>
            </Grid>

            {/* TLS Configuration */}
            {ingress.tls && ingress.tls.length > 0 && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LockIcon fontSize="small" />
                    TLS Configuration
                  </Box>
                </Typography>
                <GlassPanel>
                  {ingress.tls?.map((tlsConfig, idx) => (
                    <Box key={idx} sx={{ mb: idx < (ingress.tls?.length || 0) - 1 ? 2 : 0 }}>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"} sx={{ mb: 1 }}>
                          Hosts:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
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
                          <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                            Secret:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
                            {tlsConfig.secretName}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
                </GlassPanel>
              </Grid>
            )}
          </Grid>

          {/* Rules and Paths */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Rules and Paths
            </Typography>

            {ingress.rules.map((rule, ruleIdx) => (
              <Paper
                key={ruleIdx}
                elevation={isGlass ? 0 : 1}
                sx={{
                  mb: ruleIdx < ingress.rules.length - 1 ? 2 : 0,
                  borderRadius: (theme) => `${theme.shape.borderRadius}px`,
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
                <Box sx={{ px: 3, py: 1.5, bgcolor: 'action.hover', borderTopLeftRadius: (theme) => `${theme.shape.borderRadius}px`, borderTopRightRadius: (theme) => `${theme.shape.borderRadius}px` }}>
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
              </Paper>
            ))}

            {ingress.rules.length === 0 && (
              <Paper
                elevation={isGlass ? 0 : 1}
                sx={{
                  p: 3,
                  borderRadius: (theme) => `${theme.shape.borderRadius}px`,
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
                <Typography variant="body2" color="text.secondary">
                  No rules defined
                </Typography>
              </Paper>
            )}
          </Box>

          {/* Labels */}
          {Object.keys(ingress.labels).length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Labels
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {Object.entries(ingress.labels).map(([key, value]) => (
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
        About Ingress
        Ingress exposes HTTP and HTTPS routes from outside the cluster to services within the cluster.
        Example Ingress with nginx ingressClassName
        Path Types: Prefix, Exact, ImplementationSpecific
        TLS Configuration
        Learn more: https://kubernetes.io/docs/concepts/services-networking/ingress/
      */}
    </Box>
  )
}
