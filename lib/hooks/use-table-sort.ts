import { useState, useMemo } from 'react'

export type SortOrder = 'asc' | 'desc'

interface UseSortableTableReturn<T> {
  sortedData: T[]
  sortField: keyof T | null
  sortOrder: SortOrder
  handleSort: (field: keyof T) => void
}

/**
 * Hook for sortable table functionality
 * @param data - Array of data to sort
 * @param defaultSortField - Default field to sort by
 * @param defaultSortOrder - Default sort order
 */
export function useSortableTable<T>(
  data: T[],
  defaultSortField: keyof T | null = null,
  defaultSortOrder: SortOrder = 'asc'
): UseSortableTableReturn<T> {
  const [sortField, setSortField] = useState<keyof T | null>(defaultSortField)
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder)

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      // Toggle sort order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new field with ascending order
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const sortedData = useMemo(() => {
    if (!sortField) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]

      // Handle null/undefined
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return sortOrder === 'asc' ? 1 : -1
      if (bVal == null) return sortOrder === 'asc' ? -1 : 1

      // Handle different types
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const comparison = aVal.localeCompare(bVal)
        return sortOrder === 'asc' ? comparison : -comparison
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
      }

      // Fallback to string comparison
      const aStr = String(aVal)
      const bStr = String(bVal)
      const comparison = aStr.localeCompare(bStr)
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [data, sortField, sortOrder])

  return {
    sortedData,
    sortField,
    sortOrder,
    handleSort,
  }
}
