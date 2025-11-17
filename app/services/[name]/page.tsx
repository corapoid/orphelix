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
import { useParams } from 'next/navigation'
import { useService } from '@/lib/hooks/use-services'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import type { ServiceType } from '@/types/kubernetes'

export default function ServiceDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: service, isLoading, error, refetch } = useService(name)
  // const [docsOpen, setDocsOpen] = useState(true)

  // Auto-refresh
  useAutoRefresh(refetch)

  const getServiceTypeColor = (type: ServiceType) => {
    switch (type) {
      case 'LoadBalancer':
        return 'success'
      case 'NodePort':
        return 'info'
      case 'ClusterIP':
        return 'default'
      case 'ExternalName':
        return 'warning'
      default:
        return 'default'
    }
  }

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !service) {
    return (
      <Box>
        <PageHeader
          title="Service Details"
          breadcrumbs={[
            { label: 'Services', href: '/services' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('Service not found')}
          onRetry={() => refetch()}
          title="Failed to Load Service"
        />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {service.name}
            <Chip
              label={service.type}
              color={getServiceTypeColor(service.type)}
              size="medium"
            />
          </Box>
        }
        metadata={[
          `Age: ${service.age}`,
        ]}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Box>
        {/* Main Content */}
          <Grid container spacing={3}>
            {/* Service Details */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Service Information
              </Typography>
              <GlassPanel>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Type:
                    </Typography>
                    <Chip
                      label={service.type}
                      color={getServiceTypeColor(service.type)}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Cluster IP:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
                      {service.clusterIP || 'None'}
                    </Typography>
                  </Box>

                  {service.externalIPs && service.externalIPs.length > 0 && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        External IPs:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {service.externalIPs.map((ip, idx) => (
                          <Chip
                            key={idx}
                            label={ip}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Age:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {service.age}
                    </Typography>
                  </Box>
                </Box>
              </GlassPanel>
            </Grid>

            {/* Selectors */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Selectors
              </Typography>
              <GlassPanel>
                {Object.keys(service.selector).length > 0 ? (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {Object.entries(service.selector).map(([key, value]) => (
                      <Chip
                        key={key}
                        label={`${key}=${value}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No selectors defined
                  </Typography>
                )}
              </GlassPanel>
            </Grid>
          </Grid>

          {/* Ports */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Ports
            </Typography>
            <GlassPanel sx={{ p: 0, overflow: 'hidden' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Protocol</TableCell>
                      <TableCell>Port</TableCell>
                      <TableCell>Target Port</TableCell>
                      {service.type === 'NodePort' && <TableCell>Node Port</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {service.ports.map((port, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {port.name || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={port.protocol} size="small" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {port.port}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {port.targetPort}
                          </Typography>
                        </TableCell>
                        {service.type === 'NodePort' && (
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {port.nodePort || '-'}
                            </Typography>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </GlassPanel>
          </Box>

          {/* Labels */}
          {Object.keys(service.labels).length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Labels
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {Object.entries(service.labels).map(([key, value]) => (
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
      {/* Documentation content preserved for future use:
        Right Sidebar - Documentation
        About Services
        A Service is an abstract way to expose an application running on a set of Pods as a network service.
        Service Types: ClusterIP, NodePort, LoadBalancer, ExternalName
        Example Service
        Key Concepts: Selector, Port, TargetPort, Endpoints
        Learn more: https://kubernetes.io/docs/concepts/services-networking/service/
      */}
    </Box>
  )
}
