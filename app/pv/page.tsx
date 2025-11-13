'use client'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import StorageIcon from '@mui/icons-material/Storage'
import { useState } from 'react'
import { usePVs, usePVCs } from '@/lib/hooks/use-pv'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { PageHeader } from '@/app/components/common/page-header'
import { EmptyState } from '@/app/components/common/empty-state'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import type { PersistentVolume, PersistentVolumeClaim } from '@/types/kubernetes'

export default function PersistentVolumesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tab, setTab] = useState(0)

  const { data: pvs, isLoading: pvsLoading, error: pvsError, refetch: refetchPVs } = usePVs()
  const { data: pvcs, isLoading: pvcsLoading, error: pvcsError, refetch: refetchPVCs } = usePVCs()

  // Auto-refresh
  useAutoRefresh(() => {
    refetchPVs()
    refetchPVCs()
  })

  const filteredPVs = pvs?.filter((pv) =>
    pv.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const filteredPVCs = pvcs?.filter((pvc) =>
    pvc.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const { sortedData: sortedPVs, sortField: pvSortField, sortOrder: pvSortOrder, handleSort: handlePVSort } = useSortableTable<PersistentVolume>(
    filteredPVs,
    'name',
    'asc'
  )

  const { sortedData: sortedPVCs, sortField: pvcSortField, sortOrder: pvcSortOrder, handleSort: handlePVCSort } = useSortableTable<PersistentVolumeClaim>(
    filteredPVCs,
    'name',
    'asc'
  )

  const isLoading = tab === 0 ? pvsLoading : pvcsLoading
  const error = tab === 0 ? pvsError : pvcsError
  const refetch = tab === 0 ? refetchPVs : refetchPVCs

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Persistent Volumes" onRefresh={refetch} />
        <TableSkeleton rows={5} columns={5} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Persistent Volumes" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Persistent Volumes" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Persistent Volumes"
        subtitle={tab === 0
          ? `${pvs?.length || 0} PersistentVolume${pvs?.length === 1 ? '' : 's'}`
          : `${pvcs?.length || 0} PersistentVolumeClaim${pvcs?.length === 1 ? '' : 's'} in this namespace`
        }
        onRefresh={refetch}
        isRefreshing={isLoading}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search..."
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label={`PersistentVolumes (${pvs?.length || 0})`} />
          <Tab label={`PersistentVolumeClaims (${pvcs?.length || 0})`} />
        </Tabs>
      </Box>

      {tab === 0 ? (
        // PersistentVolumes tab
        !pvs || pvs.length === 0 ? (
          <EmptyState
            icon={StorageIcon}
            title="No PersistentVolumes found"
            description="There are no PersistentVolumes in the cluster."
          />
        ) : filteredPVs.length === 0 ? (
          <EmptyState
            icon={StorageIcon}
            title="No matching PersistentVolumes"
            description={`No PersistentVolumes match "${searchQuery}". Try adjusting your search.`}
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
                    sortField={pvSortField}
                    sortOrder={pvSortOrder}
                    onSort={handlePVSort}
                  />
                  <SortableTableCell
                    field="status"
                    label="Status"
                    sortField={pvSortField}
                    sortOrder={pvSortOrder}
                    onSort={handlePVSort}
                  />
                  <SortableTableCell
                    field="capacity"
                    label="Capacity"
                    sortField={pvSortField}
                    sortOrder={pvSortOrder}
                    onSort={handlePVSort}
                  />
                  <TableCell>Access Modes</TableCell>
                  <SortableTableCell
                    field="reclaimPolicy"
                    label="Reclaim Policy"
                    sortField={pvSortField}
                    sortOrder={pvSortOrder}
                    onSort={handlePVSort}
                  />
                  <SortableTableCell
                    field="storageClass"
                    label="Storage Class"
                    sortField={pvSortField}
                    sortOrder={pvSortOrder}
                    onSort={handlePVSort}
                  />
                  <TableCell>Claim</TableCell>
                  <SortableTableCell
                    field="age"
                    label="Age"
                    sortField={pvSortField}
                    sortOrder={pvSortOrder}
                    onSort={handlePVSort}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedPVs.map((pv) => (
                  <TableRow key={pv.name} hover>
                    <TableCell>{pv.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={pv.status}
                        size="small"
                        color={pv.status === 'Bound' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{pv.capacity}</TableCell>
                    <TableCell>{pv.accessModes.join(', ')}</TableCell>
                    <TableCell>{pv.reclaimPolicy}</TableCell>
                    <TableCell>{pv.storageClass}</TableCell>
                    <TableCell>{pv.claim || '-'}</TableCell>
                    <TableCell>{pv.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      ) : (
        // PersistentVolumeClaims tab
        !pvcs || pvcs.length === 0 ? (
          <EmptyState
            icon={StorageIcon}
            title="No PersistentVolumeClaims found"
            description="There are no PersistentVolumeClaims in this namespace."
          />
        ) : filteredPVCs.length === 0 ? (
          <EmptyState
            icon={StorageIcon}
            title="No matching PersistentVolumeClaims"
            description={`No PersistentVolumeClaims match "${searchQuery}". Try adjusting your search.`}
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
                    sortField={pvcSortField}
                    sortOrder={pvcSortOrder}
                    onSort={handlePVCSort}
                  />
                  <SortableTableCell
                    field="namespace"
                    label="Namespace"
                    sortField={pvcSortField}
                    sortOrder={pvcSortOrder}
                    onSort={handlePVCSort}
                  />
                  <SortableTableCell
                    field="status"
                    label="Status"
                    sortField={pvcSortField}
                    sortOrder={pvcSortOrder}
                    onSort={handlePVCSort}
                  />
                  <SortableTableCell
                    field="volume"
                    label="Volume"
                    sortField={pvcSortField}
                    sortOrder={pvcSortOrder}
                    onSort={handlePVCSort}
                  />
                  <SortableTableCell
                    field="capacity"
                    label="Capacity"
                    sortField={pvcSortField}
                    sortOrder={pvcSortOrder}
                    onSort={handlePVCSort}
                  />
                  <TableCell>Access Modes</TableCell>
                  <SortableTableCell
                    field="storageClass"
                    label="Storage Class"
                    sortField={pvcSortField}
                    sortOrder={pvcSortOrder}
                    onSort={handlePVCSort}
                  />
                  <SortableTableCell
                    field="age"
                    label="Age"
                    sortField={pvcSortField}
                    sortOrder={pvcSortOrder}
                    onSort={handlePVCSort}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedPVCs.map((pvc) => (
                  <TableRow key={pvc.name} hover>
                    <TableCell>{pvc.name}</TableCell>
                    <TableCell>{pvc.namespace}</TableCell>
                    <TableCell>
                      <Chip
                        label={pvc.status}
                        size="small"
                        color={pvc.status === 'Bound' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{pvc.volume}</TableCell>
                    <TableCell>{pvc.capacity}</TableCell>
                    <TableCell>{pvc.accessModes.join(', ')}</TableCell>
                    <TableCell>{pvc.storageClass}</TableCell>
                    <TableCell>{pvc.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </Box>
  )
}
