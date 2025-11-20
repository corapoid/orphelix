import { useState, useMemo } from 'react'

export type SortOrder = 'asc' | 'desc'

// Custom sort function type - allows sorting by nested properties
export type SortFunction<T> = (a: T, b: T, order: SortOrder) => number

interface UseSortableTableReturn<T> {
  sortedData: T[]
  sortField: keyof T | string | null
  sortOrder: SortOrder
  handleSort: (field: keyof T | string, customSortFn?: SortFunction<T>) => void
}

/**
 * Hook for sortable table functionality
 * @param data - Array of data to sort
 * @param defaultSortField - Default field to sort by
 * @param defaultSortOrder - Default sort order
 */
export function useSortableTable<T>(
  data: T[],
  defaultSortField: keyof T | string | null = null,
  defaultSortOrder: SortOrder = 'asc'
): UseSortableTableReturn<T> {
  const [sortField, setSortField] = useState<keyof T | string | null>(defaultSortField)
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder)
  const [customSorts, setCustomSorts] = useState<Map<string, SortFunction<T>>>(new Map())

  const handleSort = (field: keyof T | string, customSortFn?: SortFunction<T>) => {
    if (sortField === field) {
      // Toggle sort order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new field with ascending order
      setSortField(field)
      setSortOrder('asc')

      // Register custom sort function if provided
      if (customSortFn) {
        setCustomSorts(prev => {
          const next = new Map(prev)
          next.set(String(field), customSortFn)
          return next
        })
      }
    }
  }

  const sortedData = useMemo(() => {
    if (!sortField) return data

    return [...data].sort((a, b) => {
      // Check if there's a custom sort function for this field
      const customSortFn = customSorts.get(String(sortField))
      if (customSortFn) {
        return customSortFn(a, b, sortOrder)
      }

      // Standard sorting for direct properties
      const aVal = a[sortField as keyof T]
      const bVal = b[sortField as keyof T]

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
  }, [data, sortField, sortOrder, customSorts])

  return {
    sortedData,
    sortField,
    sortOrder,
    handleSort,
  }
}
