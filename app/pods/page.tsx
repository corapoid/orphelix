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
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { usePods } from '@/lib/hooks/use-pods'
import { StatusBadge } from '@/components/common/status-badge'
import { formatAge } from '@/lib/utils'
import type { PodStatus } from '@/types/kubernetes'

export default function PodsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<PodStatus | ''>('')

  const { data: pods, isLoading, error } = usePods(statusFilter || undefined)

  const filteredPods = useMemo(() => {
    if (!pods) return []
    if (!searchQuery) return pods

    return pods.filter((pod) =>
      pod.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [pods, searchQuery])

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Pods
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
          Pods
        </Typography>
        <Alert severity="error">
          Failed to load pods: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Pods</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-filter-label">Status Filter</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter-select"
              value={statusFilter}
              label="Status Filter"
              onChange={(e) => setStatusFilter(e.target.value as PodStatus | '')}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Running">Running</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Succeeded">Succeeded</MenuItem>
              <MenuItem value="CrashLoopBackOff">CrashLoopBackOff</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="Search pods..."
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
      </Box>

      {filteredPods.length === 0 ? (
        <Alert severity="info">
          {searchQuery || statusFilter ? 'No pods match your filters' : 'No pods found'}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Node</TableCell>
                <TableCell>IP</TableCell>
                <TableCell align="center">Restarts</TableCell>
                <TableCell align="center">Containers</TableCell>
                <TableCell>Age</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPods.map((pod) => (
                <TableRow
                  key={pod.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/pods/${pod.name}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {pod.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={pod.status} />
                  </TableCell>
                  <TableCell>{pod.nodeName}</TableCell>
                  <TableCell>{pod.ip}</TableCell>
                  <TableCell align="center">
                    {pod.restartCount > 0 ? (
                      <Chip
                        label={pod.restartCount}
                        size="small"
                        color={pod.restartCount > 5 ? 'error' : 'warning'}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        0
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {pod.containers.length}
                  </TableCell>
                  <TableCell>{formatAge(pod.age)}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/pods/${pod.name}`)
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
