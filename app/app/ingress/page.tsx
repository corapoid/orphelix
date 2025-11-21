'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import HttpIcon from '@mui/icons-material/Http'
import LockIcon from '@mui/icons-material/Lock'
import { StatusBadge } from '@/app/components/common/status-badge'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import { useIngresses } from '@/lib/hooks/use-ingress'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import type { Ingress } from '@/types/kubernetes'

export default function IngressPage() {
  const navigateTo = useNavigateTo()
  const { data: ingresses, isLoading, error, refetch } = useIngresses()

  const columns: TableColumn<Ingress>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (ingress) => (
        <Typography variant="body2" fontWeight="medium">
          {ingress.name}
        </Typography>
      ),
    },
    {
      field: 'className',
      label: 'Class',
      render: (ingress) =>
        ingress.className ? (
          <StatusBadge label={ingress.className} size="small" />
        ) : (
          <Typography variant="body2" color="text.secondary">
            default
          </Typography>
        ),
    },
    {
      field: 'hosts',
      label: 'Hosts',
      render: (ingress) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {ingress.hosts.slice(0, 2).map((host, idx) => (
            <StatusBadge
              key={idx}
              label={host}
              size="small"
            />
          ))}
          {ingress.hosts.length > 2 && (
            <Typography variant="caption" color="text.secondary">
              +{ingress.hosts.length - 2}
            </Typography>
          )}
          {ingress.hosts.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              *
            </Typography>
          )}
        </Box>
      ),
      sortable: false,
    },
    {
      field: 'paths',
      label: 'Paths',
      render: (ingress) => (
        <Typography variant="body2" color="text.secondary">
          {ingress.rules.reduce((sum, rule) => sum + rule.paths.length, 0)} path(s)
        </Typography>
      ),
      sortable: false,
    },
    {
      field: 'tls',
      label: 'TLS',
      render: (ingress) =>
        ingress.tls && ingress.tls.length > 0 ? (
          <StatusBadge
            icon={<LockIcon sx={{ fontSize: 14 }} />}
            label="Secured"
            size="small"
            color="success"
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            None
          </Typography>
        ),
      sortable: false,
    },
    {
      field: 'age',
      label: 'Age',
    },
  ]

  return (
    <ResourceListView
      title="Ingress"
      resourceName="ingress resource"
      resourceNamePlural="ingress resources"
      icon={HttpIcon}
      data={ingresses}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search ingress..."
      searchFilter={(ingress, query) =>
        ingress.name.toLowerCase().includes(query.toLowerCase()) ||
        ingress.hosts.some(host => host.toLowerCase().includes(query.toLowerCase()))
      }
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(ingress) => ingress.name}
      onRowClick={(ingress) => navigateTo(`/ingress/${ingress.name}`)}
      emptyStateDescription="There are no ingress resources in this namespace. Create an ingress to expose HTTP(S) routes."
      showClusterAlert={true}
    />
  )
}
