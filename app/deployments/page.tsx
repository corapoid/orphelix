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
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useDeployments } from '@/lib/hooks/use-deployments'
import { StatusBadge } from '@/components/common/status-badge'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { ErrorState } from '@/components/common/error-state'
import { ClusterConnectionAlert } from '@/components/common/cluster-connection-alert'
import { formatAge } from '@/lib/utils'

export default function DeploymentsPage() {
  const router = useRouter()
  const { data: deployments, isLoading, error, refetch } = useDeployments()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDeployments = useMemo(() => {
    if (!deployments) return []
    if (!searchQuery) return deployments

    return deployments.filter((deployment) =>
      deployment.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [deployments, searchQuery])

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Deployments
        </Typography>
        <TableSkeleton rows={8} columns={8} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Deployments
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Deployments" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Deployments</Typography>
        <TextField
          size="small"
          placeholder="Search deployments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
      </Box>

      <ClusterConnectionAlert minimal />

      {filteredDeployments.length === 0 ? (
        <Alert severity="info">
          {searchQuery ? 'No deployments match your search' : 'No deployments found'}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Replicas</TableCell>
                <TableCell align="center">Available</TableCell>
                <TableCell align="center">Unavailable</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Strategy</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDeployments.map((deployment) => (
                <TableRow
                  key={deployment.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/deployments/${deployment.name}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {deployment.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={deployment.status} />
                  </TableCell>
                  <TableCell align="center">
                    {deployment.replicas.ready}/{deployment.replicas.desired}
                  </TableCell>
                  <TableCell align="center">{deployment.replicas.available}</TableCell>
                  <TableCell align="center">{deployment.replicas.unavailable}</TableCell>
                  <TableCell>{formatAge(deployment.age)}</TableCell>
                  <TableCell>{deployment.strategy}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/deployments/${deployment.name}`)
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
