'use client'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useConfigMaps } from '@/lib/hooks/use-configmaps'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { useSortableTable, SortFunction } from '@/lib/hooks/use-table-sort'
import { PageHeader } from '@/app/components/common/page-header'
import { SearchBar } from '@/app/components/common/search-bar'
import { EmptyState } from '@/app/components/common/empty-state'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import type { ConfigMap } from '@/types/kubernetes'

export default function ConfigMapsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: configMaps, isLoading, error, refetch } = useConfigMaps()

  // Auto-refresh
  useAutoRefresh(refetch)

  const filteredConfigMaps = configMaps?.filter((cm) =>
    cm.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const { sortedData, sortField, sortOrder, handleSort} = useSortableTable<ConfigMap>(
    filteredConfigMaps,
    'name',
    'asc'
  )

  // Custom sort for Keys (object size)
  const sortByKeys: SortFunction<ConfigMap> = (a, b, order) => {
    const aVal = Object.keys(a.data).length
    const bVal = Object.keys(b.data).length
    return order === 'asc' ? aVal - bVal : bVal - aVal
  }

  if (isLoading) {
    return (
      <Box>
        <PageHeader
          title="ConfigMaps"
          onRefresh={refetch}
          isRefreshing={isLoading}
        />
        <TableSkeleton rows={8} columns={4} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader
          title="ConfigMaps"
          onRefresh={refetch}
          isRefreshing={isLoading}
        />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load ConfigMaps" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="ConfigMaps"
        subtitle={`${configMaps?.length || 0} ConfigMap${configMaps?.length === 1 ? '' : 's'} in this namespace`}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search ConfigMaps..."
      />

      {!configMaps || configMaps.length === 0 ? (
        <EmptyState
          icon={SettingsIcon}
          title="No ConfigMaps found"
          description="There are no ConfigMaps in this namespace yet."
        />
      ) : filteredConfigMaps.length === 0 ? (
        <EmptyState
          icon={SettingsIcon}
          title="No matching ConfigMaps"
          description={`No ConfigMaps match your search "${searchQuery}".`}
          action={{
            label: 'Clear search',
            onClick: () => setSearchQuery(''),
          }}
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <SortableTableCell
                  field="name"
                  label="Name"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="namespace"
                  label="Namespace"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="keys"
                  label="Keys"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                  customSortFn={sortByKeys}
                />
                <SortableTableCell
                  field="age"
                  label="Age"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((cm) => (
                <TableRow
                  key={cm.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/configmaps/${encodeURIComponent(cm.name)}`)}
                >
                  <TableCell>{cm.name}</TableCell>
                  <TableCell>{cm.namespace}</TableCell>
                  <TableCell>{Object.keys(cm.data).length}</TableCell>
                  <TableCell>{cm.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
