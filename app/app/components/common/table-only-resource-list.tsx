'use client'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { ReactNode, useMemo } from 'react'
import { PageHeader } from './page-header'
import { EmptyState } from './empty-state'
import { TableSkeleton } from './table-skeleton'
import { ErrorState } from './error-state'
import { ClusterConnectionAlert } from './cluster-connection-alert'
import { useSortableTable, SortFunction } from '@/lib/hooks/use-table-sort'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { usePageSearch } from '@/lib/contexts/search-context'
import type { SvgIconComponent } from '@mui/icons-material'

export interface FilterOption {
  label: string
  value: string
}

export interface ResourceFilter {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}

export interface TableColumn<T> {
  field: keyof T | string
  label: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  customSortFn?: SortFunction<T>
  render?: (item: T) => ReactNode
}

export interface TableOnlyResourceListProps<T> {
  // Resource info
  title: string
  resourceName: string
  resourceNamePlural: string
  icon: SvgIconComponent

  // Data
  data: T[] | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => void

  // Search
  searchPlaceholder: string
  searchFilter: (item: T, query: string) => boolean

  // Filters
  filters?: ResourceFilter[]
  customFilter?: (item: T) => boolean

  // Table configuration
  columns: TableColumn<T>[]
  defaultSortField: keyof T | string
  defaultSortOrder?: 'asc' | 'desc'
  getRowKey: (item: T) => string
  onRowClick?: (item: T) => void

  // Optional
  showClusterAlert?: boolean
  emptyStateDescription?: string
}

/**
 * Simplified template for resources with table-only view (no grid)
 * Used for: Services, Ingress, ConfigMaps, Secrets, Namespaces, Nodes, HPA, PV
 */
export function TableOnlyResourceList<T>({
  title,
  resourceName,
  resourceNamePlural,
  icon: Icon,
  data,
  isLoading,
  error,
  refetch,
  searchPlaceholder,
  searchFilter,
  filters = [],
  customFilter,
  columns,
  defaultSortField,
  defaultSortOrder = 'asc',
  getRowKey,
  onRowClick,
  showClusterAlert = true,
  emptyStateDescription,
}: TableOnlyResourceListProps<T>) {
  const searchQuery = usePageSearch(searchPlaceholder)

  // Auto-refresh
  useAutoRefresh(refetch)

  // Apply filters
  const filteredData = useMemo(() => {
    if (!data) return []

    let filtered = data

    // Apply custom filter (e.g., status/type filter)
    if (customFilter) {
      filtered = filtered.filter(customFilter)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((item) => searchFilter(item, searchQuery))
    }

    return filtered
  }, [data, searchQuery, searchFilter, customFilter])

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<T>(
    filteredData,
    defaultSortField,
    defaultSortOrder
  )

  if (isLoading) {
    return (
      <Box>
        <PageHeader title={title} onRefresh={refetch} />
        <TableSkeleton rows={8} columns={columns.length} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title={title} onRefresh={refetch} />
        <ErrorState error={error} onRetry={refetch} title={`Failed to Load ${title}`} />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={title}
        subtitle={`${data?.length || 0} ${data?.length === 1 ? resourceName : resourceNamePlural} in this namespace`}
        onRefresh={refetch}
        isRefreshing={isLoading}
        filters={
          filters.length > 0 ? (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {filters.map((filter) => (
                <FormControl key={filter.label} size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>{filter.label}</InputLabel>
                  <Select
                    value={filter.value}
                    label={filter.label}
                    onChange={(e) => filter.onChange(e.target.value)}
                  >
                    {filter.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}
            </Box>
          ) : undefined
        }
      />

      {showClusterAlert && <ClusterConnectionAlert minimal />}

      {!data || data.length === 0 ? (
        <EmptyState
          icon={Icon}
          title={`No ${resourceNamePlural} found`}
          description={
            emptyStateDescription ||
            `There are no ${resourceNamePlural} in this namespace yet.`
          }
        />
      ) : filteredData.length === 0 ? (
        <EmptyState
          icon={Icon}
          title={`No matching ${resourceNamePlural}`}
          description={`No ${resourceNamePlural} match your search or filters.`}
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.field)}
                    align={column.align || 'left'}
                    sx={{ cursor: column.sortable !== false ? 'pointer' : 'default' }}
                    onClick={
                      column.sortable !== false
                        ? () => handleSort(column.field as keyof T, column.customSortFn)
                        : undefined
                    }
                  >
                    {column.label}
                    {column.sortable !== false &&
                      sortField === column.field &&
                      (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((item) => (
                <TableRow
                  key={getRowKey(item)}
                  hover
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.field)} align={column.align || 'left'}>
                      {column.render
                        ? column.render(item)
                        : String((item as any)[column.field] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
