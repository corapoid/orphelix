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
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useService } from '@/lib/hooks/use-services'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { YamlEditorModal } from '@/app/components/yaml-editor/yaml-editor-modal'
import type { ServiceType } from '@/types/kubernetes'

export default function ServiceDetailPage() {
  const params = useParams()
  const name = params.name as string
  const [editorOpen, setEditorOpen] = useState(false)

  const { data: service, isLoading, error, refetch } = useService(name)

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
        actions={
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditorOpen(true)}
          >
            Edit YAML
          </Button>
        }
      />

      <Grid container spacing={3}>
        {/* Service Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Service Information
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  <Chip
                    label={service.type}
                    color={getServiceTypeColor(service.type)}
                    size="small"
                  />
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Cluster IP
                </Typography>
                <Typography variant="body1" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
                  {service.clusterIP || 'None'}
                </Typography>
              </Box>

              {service.externalIPs && service.externalIPs.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    External IPs
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
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

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Age
                </Typography>
                <Typography variant="body1">{service.age}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Selectors */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Selectors
            </Typography>

            {Object.keys(service.selector).length > 0 ? (
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                No selectors defined
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Ports */}
        <Grid item xs={12}>
          <Paper>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Ports
              </Typography>
            </Box>
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
        </Grid>

        {/* Labels */}
        {Object.keys(service.labels).length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Labels
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                {Object.entries(service.labels).map(([key, value]) => (
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

      {/* YAML Editor Modal */}
      <YamlEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        resourceType="Service"
        resourceName={service.name}
        namespace={service.namespace}
      />
    </Box>
  )
}
