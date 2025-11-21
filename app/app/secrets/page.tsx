'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import SecretIcon from '@mui/icons-material/Lock'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import { useSecrets } from '@/lib/hooks/use-secrets'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import { ResourceCard } from '@/app/components/common/resource-card'
import type { Secret } from '@/types/kubernetes'

export default function SecretsPage() {
  const navigateTo = useNavigateTo()
  const { data: secrets, isLoading, error, refetch } = useSecrets()

  const columns: TableColumn<Secret>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (secret) => (
        <Typography variant="body2" fontWeight="medium">
          {secret.name}
        </Typography>
      ),
    },
    {
      field: 'namespace',
      label: 'Namespace',
    },
    {
      field: 'type',
      label: 'Type',
    },
    {
      field: 'keys',
      label: 'Keys',
      render: (secret) => secret.keys.length,
      customSortFn: (a, b, order) => {
        const aVal = a.keys.length
        const bVal = b.keys.length
        return order === 'asc' ? aVal - bVal : bVal - aVal
      },
    },
    {
      field: 'age',
      label: 'Age',
    },
  ]

  const renderCard = (secret: Secret, onClick?: () => void) => {
    const keyCount = secret.keys.length

    return (
      <ResourceCard
        name={secret.name}
        resourceType={secret.namespace}
        resourceColor="#F43F5E"
        icon={SecretIcon}
        onClick={onClick}
        statusBadge={
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            <Chip
              label={secret.type}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.75rem',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(244, 63, 94, 0.15)'
                    : 'rgba(244, 63, 94, 0.1)',
                color: '#F43F5E',
                border: '1px solid',
                borderColor: 'rgba(244, 63, 94, 0.3)',
              }}
            />
            <Chip
              label={`${keyCount} key${keyCount !== 1 ? 's' : ''}`}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.75rem',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
                color: 'text.secondary',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        }
        metrics={
          <Box>
            <Typography variant="caption" color="text.secondary">
              {secret.age}
            </Typography>
          </Box>
        }
      />
    )
  }

  return (
    <ResourceListView
      title="Secrets"
      resourceName="secret"
      resourceNamePlural="secrets"
      icon={VpnKeyIcon}
      data={secrets}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search secrets..."
      searchFilter={(secret, query) =>
        secret.name.toLowerCase().includes(query.toLowerCase())
      }
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(secret) => secret.name}
      onRowClick={(secret) => navigateTo(`/secrets/${encodeURIComponent(secret.name)}`)}
      renderCard={renderCard}
      emptyStateDescription="There are no secrets in this namespace."
    />
  )
}
