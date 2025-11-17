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
import IconButton from '@mui/material/IconButton'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useService } from '@/lib/hooks/use-services'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import type { ServiceType } from '@/types/kubernetes'
import Link from 'next/link'

export default function ServiceDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: service, isLoading, error, refetch } = useService(name)
  const [docsOpen, setDocsOpen] = useState(true)

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
          `Namespace: ${service.namespace}`,
          `Age: ${service.age}`,
        ]}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.name },
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
            <Paper
              elevation={0}
              sx={{
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
            </Paper>
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
                About Services
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              A Service is an abstract way to expose an application running on a set of Pods as a network service. With Kubernetes you don't need to modify your application to use an unfamiliar service discovery mechanism. Kubernetes gives Pods their own IP addresses and a single DNS name for a set of Pods, and can load-balance across them.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2.5, lineHeight: 1.7 }}>
              Services enable loose coupling between dependent Pods. A Service is defined using YAML or JSON, like all Kubernetes objects. The set of Pods targeted by a Service is usually determined by a label selector.
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Service Types
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  <strong>ClusterIP:</strong> Exposes the Service on an internal IP in the cluster. This type makes the Service only reachable from within the cluster.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>NodePort:</strong> Exposes the Service on each Node's IP at a static port. A ClusterIP Service is automatically created.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>LoadBalancer:</strong> Exposes the Service externally using a cloud provider's load balancer.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>ExternalName:</strong> Maps the Service to a DNS name by returning a CNAME record.
                </Typography>
              </li>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Example Service
            </Typography>

            <Box
              component="pre"
              sx={{
                p: 1.5,
                mb: 2.5,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.3)'
                    : 'rgba(0, 0, 0, 0.05)',
                borderRadius: 2,
                overflow: 'auto',
                fontSize: '0.75rem',
                lineHeight: 1.5,
                fontFamily: 'monospace',
              }}
            >
{`apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
  type: ClusterIP`}
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Key Concepts
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  <strong>Selector:</strong> Determines which Pods will receive traffic from this Service.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>Port:</strong> The port that will be exposed by this Service.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>TargetPort:</strong> The port on the Pod where traffic will be sent.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>Endpoints:</strong> Automatically maintained list of Pod IPs matching the selector.
                </Typography>
              </li>
            </Box>

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
                  href="https://kubernetes.io/docs/concepts/services-networking/service/"
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
