'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SettingsIcon from '@mui/icons-material/Settings'
import ConfigIcon from '@mui/icons-material/Description'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import { useConfigMaps } from '@/lib/hooks/use-configmaps'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import { ResourceCard } from '@/app/components/common/resource-card'
import type { ConfigMap } from '@/types/kubernetes'

export default function ConfigMapsPage() {
  const navigateTo = useNavigateTo()
  const { data: configMaps, isLoading, error, refetch } = useConfigMaps()

  const columns: TableColumn<ConfigMap>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (cm) => (
        <Typography variant="body2" fontWeight="medium">
          {cm.name}
        </Typography>
      ),
    },
    {
      field: 'namespace',
      label: 'Namespace',
    },
    {
      field: 'keys',
      label: 'Keys',
      render: (cm) => Object.keys(cm.data).length,
      customSortFn: (a, b, order) => {
        const aVal = Object.keys(a.data).length
        const bVal = Object.keys(b.data).length
        return order === 'asc' ? aVal - bVal : bVal - aVal
      },
    },
    {
      field: 'age',
      label: 'Age',
    },
  ]

  const renderCard = (cm: ConfigMap, onClick?: () => void) => {
    const keyCount = Object.keys(cm.data).length

    return (
      <ResourceCard
        name={cm.name}
        resourceType={cm.namespace}
        resourceColor="#10B981"
        icon={ConfigIcon}
        onClick={onClick}
        statusBadge={
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            <Chip
              label={`${keyCount} key${keyCount !== 1 ? 's' : ''}`}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.75rem',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(16, 185, 129, 0.1)',
                color: '#10B981',
                border: '1px solid',
                borderColor: 'rgba(16, 185, 129, 0.3)',
              }}
            />
          </Box>
        }
        metrics={
          <Box>
            <Typography variant="caption" color="text.secondary">
              {cm.age}
            </Typography>
          </Box>
        }
      />
    )
  }

  return (
    <ResourceListView
      title="ConfigMaps"
      resourceName="configmap"
      resourceNamePlural="configmaps"
      icon={SettingsIcon}
      data={configMaps}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search ConfigMaps..."
      searchFilter={(cm, query) =>
        cm.name.toLowerCase().includes(query.toLowerCase())
      }
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(cm) => cm.name}
      onRowClick={(cm) => navigateTo(`/configmaps/${encodeURIComponent(cm.name)}`)}
      renderCard={renderCard}
      emptyStateDescription="There are no ConfigMaps in this namespace yet."
    />
  )
}
