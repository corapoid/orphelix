'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { GlassButton } from '@orphelix/ui'
import IconButton from '@mui/material/IconButton'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import EditIcon from '@mui/icons-material/Edit'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Link from 'next/link'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useDeployment, useDeploymentPods } from '@/lib/hooks/use-deployments'
import { useConfigMaps } from '@/lib/hooks/use-configmaps'
import { useSecrets } from '@/lib/hooks/use-secrets'
import { useHPAs } from '@/lib/hooks/use-hpa'
import { StatusBadge } from '@/app/components/common/status-badge'
import { TopologyGraph } from '@/app/components/topology/topology-graph'
import { buildDeploymentTopology } from '@/lib/ui/topology'
import { useMemo } from 'react'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { ResourceUsageChart } from '@/app/components/metrics/resource-usage-chart'
import { YamlEditorModal } from '@/app/components/yaml-editor/yaml-editor-modal'
import { RestartDeploymentDialog } from '@/app/components/deployments/restart-deployment-dialog'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { GlassPanel } from '@orphelix/ui'
import { useTheme } from '@orphelix/ui'

export default function DeploymentDetailPage() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const params = useParams()
  const name = params.name as string
  const [restarting, setRestarting] = useState(false)
  const [restartError, setRestartError] = useState<string | null>(null)
  const [restartSuccess, setRestartSuccess] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [restartDialogOpen, setRestartDialogOpen] = useState(false)
  const [podsExpanded, setPodsExpanded] = useState(true)

  const { data: deployment, isLoading, error, refetch } = useDeployment(name)

  // Auto-refresh
  useAutoRefresh(refetch)
  const { data: pods, isLoading: podsLoading } = useDeploymentPods(name)
  const { data: allConfigMaps } = useConfigMaps()
  const { data: allSecrets } = useSecrets()
  const { data: allHPAs } = useHPAs()

  // Build topology graph data
  const handleRestartClick = () => {
    setRestartDialogOpen(true)
  }

  const handleRestartConfirm = async () => {
    setRestarting(true)
    setRestartError(null)
    setRestartSuccess(false)

    try {
      const response = await fetch(
        `/api/deployments/${encodeURIComponent(name)}/restart?namespace=${deployment?.namespace}`,
        { method: 'POST' }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to restart deployment')
      }

      setRestartSuccess(true)
      setRestartDialogOpen(false)
      // Refetch deployment data after restart
      setTimeout(() => {
        refetch()
        setRestartSuccess(false)
      }, 2000)
    } catch (err) {
      setRestartError(err instanceof Error ? err.message : 'Failed to restart deployment')
    } finally {
      setRestarting(false)
    }
  }

  const handleRestartCancel = () => {
    setRestartDialogOpen(false)
  }

  const topologyData = useMemo(() => {
    if (!deployment || !pods) return null

    // Filter ConfigMaps and Secrets related to this deployment
    const relatedConfigMaps = allConfigMaps?.filter((cm) =>
      deployment.configMaps.includes(cm.name)
    ) || []

    const relatedSecrets = allSecrets?.filter((s) =>
      deployment.secrets.includes(s.name)
    ) || []

    return buildDeploymentTopology(deployment, pods, relatedConfigMaps, relatedSecrets, allHPAs || [])
  }, [deployment, pods, allConfigMaps, allSecrets, allHPAs])

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !deployment) {
    return (
      <Box sx={{ px: 2 }}>
        <PageHeader
          title="Deployment Details"
          breadcrumbs={[
            { label: 'Deployments', href: '/deployments' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('Deployment not found')}
          onRetry={() => refetch()}
          title="Failed to Load Deployment"
        />
      </Box>
    )
  }

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {deployment.name}
            <StatusBadge status={deployment.status} size="medium" />
          </Box>
        }
        metadata={[
          `Age: ${deployment.age}`,
        ]}
        breadcrumbs={[
          { label: 'Deployments', href: '/deployments' },
          { label: deployment.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
        actions={
          <Box sx={{ display: 'flex', gap: 2 }}>
            <GlassButton
              size="small"
              startIcon={<EditIcon />}
              onClick={() => setEditorOpen(true)}
            >
              Edit YAML
            </GlassButton>
            <GlassButton
              size="small"
              startIcon={<RestartAltIcon />}
              onClick={handleRestartClick}
              disabled={restarting}
              sx={{
                color: (theme) => theme.palette.warning.main,
                borderColor: (theme) => theme.palette.warning.main,
              }}
            >
              Restart
            </GlassButton>
          </Box>
        }
      />

      <YamlEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        resourceName={deployment.name}
        namespace={deployment.namespace}
        resourceType="deployment"
      />

      <RestartDeploymentDialog
        open={restartDialogOpen}
        deploymentName={deployment.name}
        isLoading={restarting}
        onConfirm={handleRestartConfirm}
        onCancel={handleRestartCancel}
      />

      {restartSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Deployment restart initiated successfully!
        </Alert>
      )}

      {restartError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setRestartError(null)}>
          {restartError}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Details
        </Typography>
        <GlassPanel sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                Strategy:
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                {deployment.strategy}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                Desired Replicas:
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                {deployment.replicas.desired}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                Ready Replicas:
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                {deployment.replicas.ready}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                Available Replicas:
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                {deployment.replicas.available}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                Unavailable Replicas:
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                {deployment.replicas.unavailable}
              </Typography>
            </Box>
          </Box>
        </GlassPanel>
      </Box>

      {/* Labels Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Labels
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {Object.entries(deployment.labels).map(([key, value]) => (
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
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                  {value}
                </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Resources Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Resources
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {deployment.configMaps.map((cm) => (
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
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                  {cm}
                </Typography>
              </Paper>
            </Link>
          ))}
          {deployment.secrets.map((secret) => (
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
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                  {secret}
                </Typography>
              </Paper>
            </Link>
          ))}
        </Box>
      </Box>

      {/* Pods Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Pods
          </Typography>
          {pods && pods.length > 3 && (
            <IconButton
              size="small"
              onClick={() => setPodsExpanded(!podsExpanded)}
              sx={{ color: 'text.secondary' }}
            >
              {podsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>
        <GlassPanel sx={{ p: 2 }}>
          {podsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : pods?.length ? (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Node</TableCell>
                      <TableCell>IP</TableCell>
                      <TableCell align="center">Restarts</TableCell>
                      <TableCell>Age</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(podsExpanded ? pods : pods.slice(0, 3)).map((pod) => (
                      <TableRow key={pod.name} hover>
                        <TableCell>
                          <Link href={`/pods/${encodeURIComponent(pod.name)}`} style={{ textDecoration: 'none' }}>
                            <Typography
                              variant="body2"
                              fontWeight="medium"
                              sx={{
                                color: 'primary.main',
                                '&:hover': { textDecoration: 'underline' },
                                cursor: 'pointer',
                              }}
                            >
                              {pod.name}
                            </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={pod.status} />
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/nodes/${encodeURIComponent(pod.nodeName)}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'primary.main',
                                '&:hover': {
                                  textDecoration: 'underline',
                                },
                                cursor: 'pointer',
                              }}
                            >
                              {pod.nodeName}
                            </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>{pod.ip}</TableCell>
                        <TableCell align="center">{pod.restartCount}</TableCell>
                        <TableCell>{pod.age}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {!podsExpanded && pods.length > 3 && (
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Showing 3 of {pods.length} pods
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ p: 2 }}>
              <Alert severity="info">No pods found for this deployment</Alert>
            </Box>
          )}
        </GlassPanel>
      </Box>

      {/* Resource Metrics Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Resource Metrics
        </Typography>
        <ResourceUsageChart deploymentName={name} namespace={deployment.namespace} />
      </Box>

      {/* Topology Graph Section */}
      {topologyData && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Topology
          </Typography>
          <TopologyGraph data={topologyData} height={500} />
        </Box>
      )}

    </Box>
  )
}
