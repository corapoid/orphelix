'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useHPAs } from '@/lib/hooks/use-hpa'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import type { HPA } from '@/types/kubernetes'

export default function HPAPage() {
  const { data: hpas, isLoading, error, refetch } = useHPAs()

  const columns: TableColumn<HPA>[] = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'namespace',
      label: 'Namespace',
    },
    {
      field: 'target',
      label: 'Target',
      render: (hpa) => `${hpa.targetRef.kind}/${hpa.targetRef.name}`,
      sortable: false,
    },
    {
      field: 'minReplicas',
      label: 'Min Replicas',
    },
    {
      field: 'maxReplicas',
      label: 'Max Replicas',
    },
    {
      field: 'currentReplicas',
      label: 'Current / Desired',
      render: (hpa) => `${hpa.currentReplicas} / ${hpa.desiredReplicas}`,
    },
    {
      field: 'cpuUtilization',
      label: 'CPU Utilization',
      render: (hpa) => {
        const cpuMetric = hpa.metrics.find(
          (m) => m.type === 'Resource' && m.resource?.name === 'cpu'
        )
        const cpuCurrent = cpuMetric?.resource?.current?.averageUtilization || 0
        const cpuTarget = cpuMetric?.resource?.target?.averageUtilization || 100

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 100 }}>
              <LinearProgress
                variant="determinate"
                value={Math.min((cpuCurrent / cpuTarget) * 100, 100)}
                color={cpuCurrent > cpuTarget ? 'warning' : 'primary'}
              />
            </Box>
            <Typography variant="body2">
              {cpuCurrent}% / {cpuTarget}%
            </Typography>
          </Box>
        )
      },
      sortable: false,
    },
    {
      field: 'age',
      label: 'Age',
    },
  ]

  return (
    <ResourceListView
      title="HPA (Horizontal Pod Autoscaler)"
      resourceName="HPA"
      resourceNamePlural="HPAs"
      icon={TrendingUpIcon}
      data={hpas}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search HPAs..."
      searchFilter={(hpa, query) =>
        hpa.name.toLowerCase().includes(query.toLowerCase())
      }
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(hpa) => hpa.name}
      emptyStateDescription="There are no Horizontal Pod Autoscalers in this namespace."
      showClusterAlert={false}
    />
  )
}
