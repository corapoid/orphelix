'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useState } from 'react'
import { useHPAs } from '@/lib/hooks/use-hpa'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { PageHeader } from '@/app/components/common/page-header'
import { SearchBar } from '@/app/components/common/search-bar'
import { EmptyState } from '@/app/components/common/empty-state'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import type { HPA } from '@/types/kubernetes'

export default function HPAPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: hpas, isLoading, error, refetch } = useHPAs()

  // Auto-refresh
  useAutoRefresh(refetch)

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
        <PageHeader title="HPA (Horizontal Pod Autoscaler)" onRefresh={refetch} />
        <TableSkeleton rows={6} columns={7} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="HPA (Horizontal Pod Autoscaler)" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load HPAs" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="HPA (Horizontal Pod Autoscaler)"
        subtitle={`${hpas?.length || 0} HPA${hpas?.length === 1 ? '' : 's'} in this namespace`}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search HPAs..."
        />
      </Box>

      {!hpas || hpas.length === 0 ? (
        <EmptyState
          icon={TrendingUpIcon}
          title="No HPAs found"
          description="There are no Horizontal Pod Autoscalers in this namespace."
        />
      ) : filteredHPAs.length === 0 ? (
        <EmptyState
          icon={TrendingUpIcon}
          title="No matching HPAs"
          description={`No HPAs match "${searchQuery}". Try adjusting your search.`}
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
