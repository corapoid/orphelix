# Sortable Tables Guide

## Status: ✅ Partially Implemented

### Completed:
- [x] **app/deployments/page.tsx** - Sortable by Name, Status, Age, Strategy

### Pending:
- [ ] app/pods/page.tsx
- [ ] app/nodes/page.tsx
- [ ] app/configmaps/page.tsx
- [ ] app/secrets/page.tsx
- [ ] app/events/page.tsx
- [ ] app/hpa/page.tsx
- [ ] app/pv/page.tsx

## How to Add Sorting to a Table

### Step 1: Add Imports

```typescript
import { SortableTableCell } from '@/components/common/sortable-table-cell'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import type { YourType } from '@/types/kubernetes'
```

### Step 2: Add Sorting Hook

```typescript
// After your filtered data
const filteredData = useMemo(() => {
  // ... your filtering logic
}, [data, searchQuery])

// Add sorting
const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<YourType>(
  filteredData,
  'name', // default sort field
  'asc'   // default sort order
)
```

### Step 3: Replace TableCell Headers

Replace regular `<TableCell>` in `<TableHead>` with `<SortableTableCell>`:

**Before:**
```typescript
<TableHead>
  <TableRow>
    <TableCell>Name</TableCell>
    <TableCell>Status</TableCell>
    <TableCell>Age</TableCell>
  </TableRow>
</TableHead>
```

**After:**
```typescript
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
      field="status"
      label="Status"
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSort}
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
```

### Step 4: Use sortedData in TableBody

**Before:**
```typescript
{filteredData.map((item) => (
  <TableRow key={item.name}>
    ...
  </TableRow>
))}
```

**After:**
```typescript
{sortedData.map((item) => (
  <TableRow key={item.name}>
    ...
  </TableRow>
))}
```

### Step 5: Optional - Columns with Alignment

For right-aligned or center-aligned columns:

```typescript
<SortableTableCell
  field="count"
  label="Count"
  sortField={sortField}
  sortOrder={sortOrder}
  onSort={handleSort}
  align="center"  // or "right"
/>
```

## Example: Complete Pods Page Update

```typescript
export default function PodsPage() {
  const { data: pods, isLoading, error, refetch } = usePods()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPods = useMemo(() => {
    if (!pods) return []
    if (!searchQuery) return pods
    return pods.filter((pod) =>
      pod.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [pods, searchQuery])

  // Add sorting
  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Pod>(
    filteredPods,
    'name',
    'asc'
  )

  return (
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
              field="status"
              label="Status"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <SortableTableCell
              field="nodeName"
              label="Node"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <SortableTableCell
              field="restartCount"
              label="Restarts"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              align="center"
            />
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
          {sortedData.map((pod) => (
            <TableRow key={pod.name}>
              {/* ... table cells ... */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
```

## Notes

- **Field names** must match the property names in your TypeScript type
- **Leave non-sortable columns** as regular `<TableCell>` (e.g., Actions column)
- **Age sorting** works because formatAge() is only for display - actual sorting uses the raw date string
- **Status sorting** works alphabetically (Available, Degraded, Failed, etc.)
- **Numeric fields** (restartCount, replicas, etc.) sort numerically

## Testing

After adding sorting:
1. Click a column header - should sort ascending
2. Click again - should toggle to descending
3. Click a different header - should switch to that field (ascending)
4. Verify the arrow indicators show correctly
