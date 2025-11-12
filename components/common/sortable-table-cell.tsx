import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import { SortOrder } from '@/lib/hooks/use-table-sort'

interface SortableTableCellProps<T> {
  field: keyof T
  label: string
  sortField: keyof T | null
  sortOrder: SortOrder
  onSort: (field: keyof T) => void
  align?: 'left' | 'right' | 'center'
  width?: string | number
}

export function SortableTableCell<T>({
  field,
  label,
  sortField,
  sortOrder,
  onSort,
  align = 'left',
  width,
}: SortableTableCellProps<T>) {
  const isActive = sortField === field

  return (
    <TableCell align={align} width={width}>
      <TableSortLabel
        active={isActive}
        direction={isActive ? sortOrder : 'asc'}
        onClick={() => onSort(field)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  )
}
