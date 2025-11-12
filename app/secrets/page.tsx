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
import { useSecrets } from '@/lib/hooks/use-secrets'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { ErrorState } from '@/components/common/error-state'
import { formatAge } from '@/lib/utils'

export default function SecretsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: secrets, isLoading, error, refetch } = useSecrets()

  const filteredSecrets = secrets?.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Secrets
        </Typography>
        <TableSkeleton rows={8} columns={5} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Secrets
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Secrets" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Secrets</Typography>
        <TextField
          size="small"
          placeholder="Search Secrets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {filteredSecrets && filteredSecrets.length === 0 ? (
        <Alert severity="info">
          {searchQuery
            ? `No Secrets match your search "${searchQuery}"`
            : 'No Secrets found'}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Namespace</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Keys</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSecrets?.map((secret) => (
                <TableRow key={secret.name} hover>
                  <TableCell>{secret.name}</TableCell>
                  <TableCell>{secret.namespace}</TableCell>
                  <TableCell>{secret.type}</TableCell>
                  <TableCell>{secret.keys.length}</TableCell>
                  <TableCell>{formatAge(secret.age)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
