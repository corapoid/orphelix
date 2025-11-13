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
import LinearProgress from '@mui/material/LinearProgress'
import { useState } from 'react'
import { useHPAs } from '@/lib/hooks/use-hpa'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import type { HPA } from '@/types/kubernetes'

export default function HPAPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: hpas, isLoading, error, refetch } = useHPAs()

  const filteredHPAs = hpas?.filter((hpa) =>
    hpa.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<HPA>(
    filteredHPAs,
    'name',
    'asc'
  )

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          HPA (Horizontal Pod Autoscaler)
        </Typography>
        <TableSkeleton rows={6} columns={7} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          HPA (Horizontal Pod Autoscaler)
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load HPAs" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">HPA (Horizontal Pod Autoscaler)</Typography>
        <TextField
          size="small"
          placeholder="Search HPAs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {filteredHPAs && filteredHPAs.length === 0 ? (
        <Alert severity="info">
          {searchQuery
            ? `No HPAs match your search "${searchQuery}"`
            : 'No HPAs found'}
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
                <TableCell>Target</TableCell>
                <SortableTableCell
                  field="minReplicas"
                  label="Min Replicas"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="maxReplicas"
                  label="Max Replicas"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="currentReplicas"
                  label="Current / Desired"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableCell>CPU Utilization</TableCell>
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
              {sortedData.map((hpa) => {
                const cpuMetric = hpa.metrics.find(
                  (m) => m.type === 'Resource' && m.resource?.name === 'cpu'
                )
                const cpuCurrent = cpuMetric?.resource?.current?.averageUtilization || 0
                const cpuTarget = cpuMetric?.resource?.target?.averageUtilization || 100

                return (
                  <TableRow key={hpa.name} hover>
                    <TableCell>{hpa.name}</TableCell>
                    <TableCell>{hpa.namespace}</TableCell>
                    <TableCell>
                      {hpa.targetRef.kind}/{hpa.targetRef.name}
                    </TableCell>
                    <TableCell>{hpa.minReplicas}</TableCell>
                    <TableCell>{hpa.maxReplicas}</TableCell>
                    <TableCell>
                      {hpa.currentReplicas} / {hpa.desiredReplicas}
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>{hpa.age}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
