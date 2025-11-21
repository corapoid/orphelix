'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { TopologyGraph } from '@/app/components/topology/topology-graph'
import { useModeStore } from '@/lib/core/store'
import { useDeployments } from '@/lib/hooks/use-deployments'
import { useConfigMaps } from '@/lib/hooks/use-configmaps'
import { useSecrets } from '@/lib/hooks/use-secrets'
import { buildConfigSecretsTopology } from '@/lib/ui/topology'
import { useMemo } from 'react'
import { PageHeader } from '@/app/components/common/page-header'

export default function TopologyPage() {
  const namespace = useModeStore((state) => state.selectedNamespace)
  const { data: deployments, isLoading: deploymentsLoading } = useDeployments()
  const { data: configMaps, isLoading: configMapsLoading } = useConfigMaps()
  const { data: secrets, isLoading: secretsLoading } = useSecrets()

  const topologyData = useMemo(() => {
    if (!deployments || !configMaps || !secrets || !namespace) return null
    return buildConfigSecretsTopology(deployments, configMaps, secrets, namespace)
  }, [deployments, configMaps, secrets, namespace])

  const isLoading = deploymentsLoading || configMapsLoading || secretsLoading

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader
        title="Cluster Topology"
        metadata={[`Namespace: ${namespace || 'All'}`]}
      />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      ) : !topologyData || topologyData.nodes.length === 0 ? (
        <Alert severity="info">
          No topology data available for the current namespace. Deploy some resources with ConfigMaps or Secrets to see the topology graph.
        </Alert>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            ConfigMaps/Secrets → Deployments
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Visualizes how ConfigMaps and Secrets are mounted in Deployments
          </Typography>
          <TopologyGraph data={topologyData} height={700} />
        </Paper>
      )}
    </Box>
  )
}
