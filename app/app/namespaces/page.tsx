'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FolderIcon from '@mui/icons-material/Folder'
import { StatusBadge } from '@/app/components/common/status-badge'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import { useNamespaces } from '@/lib/hooks/use-namespaces'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import type { Namespace } from '@/types/kubernetes'

export default function NamespacesPage() {
  const navigateTo = useNavigateTo()
  const { data: namespaces, isLoading, error, refetch } = useNamespaces()

  const columns: TableColumn<Namespace>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (ns) => (
        <Typography variant="body2" fontWeight="medium">
          {ns.name}
        </Typography>
      ),
    },
    {
      field: 'status',
      label: 'Status',
      render: (ns) => <StatusBadge status={ns.status} />,
    },
    {
      field: 'labels',
      label: 'Labels',
      render: (ns) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {Object.entries(ns.labels).slice(0, 2).map(([key, value]) => (
            <Chip
              key={key}
              label={`${key}=${value}`}
              size="small"
              variant="outlined"
            />
          ))}
          {Object.keys(ns.labels).length > 2 && (
            <Chip
              label={`+${Object.keys(ns.labels).length - 2} more`}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
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
      title="Namespaces"
      resourceName="namespace"
      resourceNamePlural="namespaces"
      icon={FolderIcon}
      data={namespaces}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search namespaces..."
      searchFilter={(ns, query) =>
        ns.name.toLowerCase().includes(query.toLowerCase())
      }
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(ns) => ns.name}
      onRowClick={(ns) => navigateTo(`/namespaces/${ns.name}`)}
      emptyStateDescription="There are no namespaces in this cluster."
      showClusterAlert={true}
    />
  )
}
