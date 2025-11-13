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
import { useSecrets } from '@/lib/hooks/use-secrets'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { useSortableTable, SortFunction } from '@/lib/hooks/use-table-sort'
import type { Secret } from '@/types/kubernetes'

export default function SecretsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: secrets, isLoading, error, refetch } = useSecrets()

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
        <Typography variant="h4" gutterBottom>
          Secrets
        </Typography>
        <TableSkeleton rows={8} columns={5} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Secrets
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Secrets" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Secrets</Typography>
        <TextField
          size="small"
          placeholder="Search Secrets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {filteredSecrets && filteredSecrets.length === 0 ? (
        <Alert severity="info">
          {searchQuery
            ? `No Secrets match your search "${searchQuery}"`
            : 'No Secrets found'}
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
