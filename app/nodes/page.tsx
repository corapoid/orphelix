'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNodes } from '@/lib/hooks/use-nodes'
import { StatusBadge } from '@/components/common/status-badge'
import { formatAge } from '@/lib/utils'

export default function NodesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: nodes, isLoading, error } = useNodes()

  // Filter nodes by search query
  const filteredNodes = nodes?.filter((node) =>
    node.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Nodes
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Nodes
        </Typography>
        <Alert severity="error">
          Failed to load nodes: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Nodes</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 250 }}
          />
        </Box>
      </Box>

      {filteredNodes && filteredNodes.length === 0 ? (
        <Alert severity="info">
          {searchQuery
            ? `No nodes match your search "${searchQuery}"`
            : 'No nodes found'}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>CPU</TableCell>
                <TableCell>Memory</TableCell>
                <TableCell>Pods</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredNodes?.map((node) => (
                <TableRow
                  key={node.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/nodes/${node.name}`)}
                >
                  <TableCell>{node.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={node.status} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {node.roles.map((role) => (
                        <Chip
                          key={role}
                          label={role}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>{node.version}</TableCell>
                  <TableCell>
                    {node.allocatable.cpu} / {node.capacity.cpu}
                  </TableCell>
                  <TableCell>
                    {node.allocatable.memory} / {node.capacity.memory}
                  </TableCell>
                  <TableCell>
                    {node.allocatable.pods} / {node.capacity.pods}
                  </TableCell>
                  <TableCell>{formatAge(node.age)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
