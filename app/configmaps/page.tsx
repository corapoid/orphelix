'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useConfigMaps } from '@/lib/hooks/use-configmaps'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { useSortableTable, SortFunction } from '@/lib/hooks/use-table-sort'
import type { ConfigMap } from '@/types/kubernetes'

export default function ConfigMapsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: configMaps, isLoading, error, refetch } = useConfigMaps()

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
        <Typography variant="h4" gutterBottom>
          ConfigMaps
        </Typography>
        <TableSkeleton rows={8} columns={4} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          ConfigMaps
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load ConfigMaps" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">ConfigMaps</Typography>
        <TextField
          size="small"
          placeholder="Search ConfigMaps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {filteredConfigMaps && filteredConfigMaps.length === 0 ? (
        <Alert severity="info">
          {searchQuery
            ? `No ConfigMaps match your search "${searchQuery}"`
            : 'No ConfigMaps found'}
        </Alert>
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
