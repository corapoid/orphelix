'use client'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSecrets } from '@/lib/hooks/use-secrets'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { PageHeader } from '@/app/components/common/page-header'
import { EmptyState } from '@/app/components/common/empty-state'
import { useSortableTable, SortFunction } from '@/lib/hooks/use-table-sort'
import type { Secret } from '@/types/kubernetes'

export default function SecretsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: secrets, isLoading, error, refetch } = useSecrets()

  // Auto-refresh
  useAutoRefresh(refetch)

  const filteredSecrets = secrets?.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Secret>(
    filteredSecrets,
    'name',
    'asc'
  )

  // Custom sort for Keys (array length)
  const sortByKeys: SortFunction<Secret> = (a, b, order) => {
    const aVal = a.keys.length
    const bVal = b.keys.length
    return order === 'asc' ? aVal - bVal : bVal - aVal
  }

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Secrets" onRefresh={refetch} />
        <TableSkeleton rows={8} columns={5} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Secrets" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Secrets" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Secrets"
        subtitle={`${secrets?.length || 0} secret${secrets?.length === 1 ? '' : 's'} in this namespace`}
        onRefresh={refetch}
        isRefreshing={isLoading}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search secrets..."
      />

      {!secrets || secrets.length === 0 ? (
        <EmptyState
          icon={VpnKeyIcon}
          title="No secrets found"
          description="There are no secrets in this namespace."
        />
      ) : filteredSecrets.length === 0 ? (
        <EmptyState
          icon={VpnKeyIcon}
          title="No matching secrets"
          description={`No secrets match "${searchQuery}". Try adjusting your search.`}
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
                  field="type"
                  label="Type"
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
              {sortedData.map((secret) => (
                <TableRow
                  key={secret.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/secrets/${encodeURIComponent(secret.name)}`)}
                >
                  <TableCell>{secret.name}</TableCell>
                  <TableCell>{secret.namespace}</TableCell>
                  <TableCell>{secret.type}</TableCell>
                  <TableCell>{secret.keys.length}</TableCell>
                  <TableCell>{secret.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
