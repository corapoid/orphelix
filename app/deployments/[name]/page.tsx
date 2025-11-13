'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import EditIcon from '@mui/icons-material/Edit'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Link from 'next/link'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDeployment, useDeploymentPods } from '@/lib/hooks/use-deployments'
import { useConfigMaps } from '@/lib/hooks/use-configmaps'
import { useSecrets } from '@/lib/hooks/use-secrets'
import { StatusBadge } from '@/components/common/status-badge'
import { TopologyGraph } from '@/app/components/topology/topology-graph'
import { buildDeploymentTopology } from '@/lib/topology'
import { useMemo } from 'react'
import { DetailSkeleton } from '@/components/common/detail-skeleton'
import { ErrorState } from '@/components/common/error-state'
import { ResourceUsageChart } from '@/app/components/metrics/resource-usage-chart'
import { YamlEditorModal } from '@/app/components/github/yaml-editor-modal'

export default function DeploymentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const name = params.name as string
  const [restarting, setRestarting] = useState(false)
  const [restartError, setRestartError] = useState<string | null>(null)
  const [restartSuccess, setRestartSuccess] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)

  const { data: deployment, isLoading, error, refetch } = useDeployment(name)
  const { data: pods, isLoading: podsLoading } = useDeploymentPods(name)
  const { data: allConfigMaps } = useConfigMaps()
  const { data: allSecrets } = useSecrets()

  // Build topology graph data
  const handleRestart = async () => {
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

  const topologyData = useMemo(() => {
    if (!deployment || !pods) return null

    // Filter ConfigMaps and Secrets related to this deployment
    const relatedConfigMaps = allConfigMaps?.filter((cm) =>
      deployment.configMaps.includes(cm.name)
    ) || []

    const relatedSecrets = allSecrets?.filter((s) =>
      deployment.secrets.includes(s.name)
    ) || []

    return buildDeploymentTopology(deployment, pods, relatedConfigMaps, relatedSecrets)
  }, [deployment, pods, allConfigMaps, allSecrets])

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !deployment) {
    return (
      <Box>
        <Box p={3}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/deployments')}
            sx={{ mb: 2 }}
          >
            Back to Deployments
          </Button>
        </Box>
        <ErrorState
          error={error || new Error('Deployment not found')}
          onRetry={() => refetch()}
          title="Failed to Load Deployment"
        />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/deployments')}
        >
          Back to Deployments
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditorOpen(true)}
          >
            Edit YAML
          </Button>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<RestartAltIcon />}
            onClick={handleRestart}
            disabled={restarting}
          >
            {restarting ? 'Restarting...' : 'Restart Deployment'}
          </Button>
        </Box>
      </Box>

      <YamlEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        deploymentName={deployment.name}
        namespace={deployment.namespace}
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h4">{deployment.name}</Typography>
          <StatusBadge status={deployment.status} size="medium" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Namespace: {deployment.namespace}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: {deployment.age}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Strategy:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {deployment.strategy}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Desired Replicas:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {deployment.replicas.desired}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Ready Replicas:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {deployment.replicas.ready}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Available Replicas:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {deployment.replicas.available}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Unavailable Replicas:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {deployment.replicas.unavailable}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Labels
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(deployment.labels).map(([key, value]) => (
                <Chip key={key} label={`${key}: ${value}`} size="small" variant="outlined" />
              ))}
            </Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {deployment.configMaps.length > 0 ? (
                deployment.configMaps.map((cm) => (
                  <Link
                    key={cm}
                    href={`/configmaps/${encodeURIComponent(cm)}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Chip
                      label={`ConfigMap: ${cm}`}
                      size="small"
                      color="info"
                      clickable
                      icon={<OpenInNewIcon fontSize="small" />}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Link>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No ConfigMaps
                </Typography>
              )}
              {deployment.secrets.length > 0 ? (
                deployment.secrets.map((secret) => (
                  <Link
                    key={secret}
                    href={`/secrets/${encodeURIComponent(secret)}` as any}
                    style={{ textDecoration: 'none' }}
                  >
                    <Chip
                      label={`Secret: ${secret}`}
                      size="small"
                      color="warning"
                      clickable
                      icon={<OpenInNewIcon fontSize="small" />}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Link>
                ))
              ) : deployment.configMaps.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No Secrets
                </Typography>
              ) : null}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Pods Section */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Pods</Typography>
        </Box>
        {podsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : pods?.length ? (
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
                {pods.map((pod) => (
                  <TableRow key={pod.name} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {pod.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={pod.status} />
                    </TableCell>
                    <TableCell>{pod.nodeName}</TableCell>
                    <TableCell>{pod.ip}</TableCell>
                    <TableCell align="center">{pod.restartCount}</TableCell>
                    <TableCell>{pod.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ p: 2 }}>
            <Alert severity="info">No pods found for this deployment</Alert>
          </Box>
        )}
      </Paper>

      {/* Resource Metrics Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Resource Metrics
        </Typography>
        <ResourceUsageChart deploymentName={name} namespace={deployment.namespace} />
      </Box>

      {/* Topology Graph Section */}
      {topologyData && (
        <Paper sx={{ mb: 3 }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Topology</Typography>
          </Box>
          <Box>
            <TopologyGraph data={topologyData} height={500} />
          </Box>
        </Paper>
      )}

    </Box>
  )
}
