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
import { useConfigMaps } from '@/lib/hooks/use-configmaps'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { ErrorState } from '@/components/common/error-state'
import { formatAge } from '@/lib/utils'

export default function ConfigMapsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: configMaps, isLoading, error, refetch } = useConfigMaps()

  const filteredConfigMaps = configMaps?.filter((cm) =>
    cm.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          ConfigMaps
        </Typography>
        <TableSkeleton rows={8} columns={4} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          ConfigMaps
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load ConfigMaps" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">ConfigMaps</Typography>
        <TextField
          size="small"
          placeholder="Search ConfigMaps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {filteredConfigMaps && filteredConfigMaps.length === 0 ? (
        <Alert severity="info">
          {searchQuery
            ? `No ConfigMaps match your search "${searchQuery}"`
            : 'No ConfigMaps found'}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Namespace</TableCell>
                <TableCell>Keys</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredConfigMaps?.map((cm) => (
                <TableRow key={cm.name} hover>
                  <TableCell>{cm.name}</TableCell>
                  <TableCell>{cm.namespace}</TableCell>
                  <TableCell>{Object.keys(cm.data).length}</TableCell>
                  <TableCell>{formatAge(cm.age)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
