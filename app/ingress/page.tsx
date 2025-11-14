'use client'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import HttpIcon from '@mui/icons-material/Http'
import LockIcon from '@mui/icons-material/Lock'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useIngresses } from '@/lib/hooks/use-ingress'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { ClusterConnectionAlert } from '@/app/components/common/cluster-connection-alert'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { PageHeader } from '@/app/components/common/page-header'
import { EmptyState } from '@/app/components/common/empty-state'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import { usePageSearch } from '@/lib/contexts/search-context'
import type { Ingress } from '@/types/kubernetes'

export default function IngressPage() {
  const router = useRouter()
  const { data: ingresses, isLoading, error, refetch } = useIngresses()
  const searchQuery = usePageSearch('Search ingress...')

  // Auto-refresh
  useAutoRefresh(refetch)

  const filteredIngresses = useMemo(() => {
    if (!ingresses) return []

    let filtered = ingresses

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((ingress) =>
        ingress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ingress.hosts.some(host => host.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    return filtered
  }, [ingresses, searchQuery])

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Ingress>(
    filteredIngresses,
    'name',
    'asc'
  )

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Ingress" onRefresh={refetch} />
        <TableSkeleton rows={8} columns={6} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Ingress" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Ingress" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Ingress"
        subtitle={`${ingresses?.length || 0} ingress resource${ingresses?.length === 1 ? '' : 's'} in this namespace`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Ingress' },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <ClusterConnectionAlert minimal />

      {!ingresses || ingresses.length === 0 ? (
        <EmptyState
          icon={HttpIcon}
          title="No ingress resources found"
          description="There are no ingress resources in this namespace. Create an ingress to expose HTTP(S) routes."
        />
      ) : filteredIngresses.length === 0 ? (
        <EmptyState
          icon={HttpIcon}
          title="No matching ingress resources"
          description={`No ingress resources match "${searchQuery}". Try adjusting your search.`}
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
                <TableCell>Class</TableCell>
                <TableCell>Hosts</TableCell>
                <TableCell>Paths</TableCell>
                <TableCell>TLS</TableCell>
                <SortableTableCell
                  field="age"
                  label="Age"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((ingress) => (
                <TableRow
                  key={ingress.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/ingress/${ingress.name}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {ingress.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {ingress.className ? (
                      <Chip label={ingress.className} size="small" variant="outlined" />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        default
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {ingress.hosts.slice(0, 2).map((host, idx) => (
                        <Chip
                          key={idx}
                          label={host}
                          size="small"
                          variant="outlined"
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
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {ingress.rules.reduce((sum, rule) => sum + rule.paths.length, 0)} path(s)
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {ingress.tls && ingress.tls.length > 0 ? (
                      <Chip
                        icon={<LockIcon sx={{ fontSize: 14 }} />}
                        label="Secured"
                        size="small"
                        color="success"
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        None
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{ingress.age}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/ingress/${ingress.name}`)
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
