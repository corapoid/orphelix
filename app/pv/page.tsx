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
import Chip from '@mui/material/Chip'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import { usePVs, usePVCs } from '@/lib/hooks/use-pv'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { ErrorState } from '@/components/common/error-state'
import { formatAge } from '@/lib/utils'

export default function PersistentVolumesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tab, setTab] = useState(0)

  const { data: pvs, isLoading: pvsLoading, error: pvsError, refetch: refetchPVs } = usePVs()
  const { data: pvcs, isLoading: pvcsLoading, error: pvcsError, refetch: refetchPVCs } = usePVCs()

  const filteredPVs = pvs?.filter((pv) =>
    pv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPVCs = pvcs?.filter((pvc) =>
    pvc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isLoading = tab === 0 ? pvsLoading : pvcsLoading
  const error = tab === 0 ? pvsError : pvcsError
  const refetch = tab === 0 ? refetchPVs : refetchPVCs

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Persistent Volumes
        </Typography>
        <TableSkeleton rows={5} columns={5} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Persistent Volumes
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Persistent Volumes" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Persistent Volumes</Typography>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label={`PersistentVolumes (${pvs?.length || 0})`} />
          <Tab label={`PersistentVolumeClaims (${pvcs?.length || 0})`} />
        </Tabs>
      </Box>

      {tab === 0 ? (
        // PersistentVolumes tab
        filteredPVs && filteredPVs.length === 0 ? (
          <Alert severity="info">
            {searchQuery
              ? `No PersistentVolumes match your search "${searchQuery}"`
              : 'No PersistentVolumes found'}
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell>Access Modes</TableCell>
                  <TableCell>Reclaim Policy</TableCell>
                  <TableCell>Storage Class</TableCell>
                  <TableCell>Claim</TableCell>
                  <TableCell>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPVs?.map((pv) => (
                  <TableRow key={pv.name} hover>
                    <TableCell>{pv.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={pv.status}
                        size="small"
                        color={pv.status === 'Bound' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{pv.capacity}</TableCell>
                    <TableCell>{pv.accessModes.join(', ')}</TableCell>
                    <TableCell>{pv.reclaimPolicy}</TableCell>
                    <TableCell>{pv.storageClass}</TableCell>
                    <TableCell>{pv.claim || '-'}</TableCell>
                    <TableCell>{formatAge(pv.age)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      ) : (
        // PersistentVolumeClaims tab
        filteredPVCs && filteredPVCs.length === 0 ? (
          <Alert severity="info">
            {searchQuery
              ? `No PersistentVolumeClaims match your search "${searchQuery}"`
              : 'No PersistentVolumeClaims found'}
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Namespace</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Volume</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell>Access Modes</TableCell>
                  <TableCell>Storage Class</TableCell>
                  <TableCell>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPVCs?.map((pvc) => (
                  <TableRow key={pvc.name} hover>
                    <TableCell>{pvc.name}</TableCell>
                    <TableCell>{pvc.namespace}</TableCell>
                    <TableCell>
                      <Chip
                        label={pvc.status}
                        size="small"
                        color={pvc.status === 'Bound' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{pvc.volume}</TableCell>
                    <TableCell>{pvc.capacity}</TableCell>
                    <TableCell>{pvc.accessModes.join(', ')}</TableCell>
                    <TableCell>{pvc.storageClass}</TableCell>
                    <TableCell>{formatAge(pvc.age)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </Box>
  )
}
