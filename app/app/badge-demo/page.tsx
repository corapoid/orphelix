'use client'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {
  StatusBadgeV1,
  StatusBadgeV2,
  StatusBadgeV3,
  StatusBadgeV4,
  StatusBadgeV5,
} from '@/app/components/common/status-badge-variants'

const statuses = [
  'Available',
  'Running',
  'Pending',
  'Failed',
  'Progressing',
  'CrashLoopBackOff',
  'Unknown',
]

export default function BadgeDemoPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        StatusBadge Variants Comparison
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Compare different badge designs using MUI Chip components
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                V1: Filled with Icons
                <Typography variant="caption" display="block" color="text.secondary">
                  Classic, colorful
                </Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                V2: Outlined with Icons
                <Typography variant="caption" display="block" color="text.secondary">
                  Subtle, modern
                </Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                V3: Filled, No Icons
                <Typography variant="caption" display="block" color="text.secondary">
                  Clean, text-focused
                </Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                V4: Filled, Extra Rounded
                <Typography variant="caption" display="block" color="text.secondary">
                  Pill-shaped
                </Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                V5: Outlined, No Icons
                <Typography variant="caption" display="block" color="text.secondary">
                  Most minimal
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statuses.map((status) => (
              <TableRow key={status} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusBadgeV1 status={status} />
                </TableCell>
                <TableCell>
                  <StatusBadgeV2 status={status} />
                </TableCell>
                <TableCell>
                  <StatusBadgeV3 status={status} />
                </TableCell>
                <TableCell>
                  <StatusBadgeV4 status={status} />
                </TableCell>
                <TableCell>
                  <StatusBadgeV5 status={status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Medium Size Comparison
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption" display="block" gutterBottom>
              V1: Filled with Icons
            </Typography>
            <StatusBadgeV1 status="Running" size="medium" />
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption" display="block" gutterBottom>
              V2: Outlined with Icons
            </Typography>
            <StatusBadgeV2 status="Running" size="medium" />
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption" display="block" gutterBottom>
              V3: Filled, No Icons
            </Typography>
            <StatusBadgeV3 status="Running" size="medium" />
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption" display="block" gutterBottom>
              V4: Filled, Extra Rounded
            </Typography>
            <StatusBadgeV4 status="Running" size="medium" />
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption" display="block" gutterBottom>
              V5: Outlined, No Icons
            </Typography>
            <StatusBadgeV5 status="Running" size="medium" />
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'info.light', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          📋 My Recommendation
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>V2 (Outlined with Icons)</strong> - Best balance of:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2">
              Clear visual hierarchy with icons for quick recognition
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Modern, subtle look that doesn't overwhelm the interface
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Consistent with MUI design patterns
            </Typography>
          </li>
          <li>
            <Typography variant="body2">Good contrast and accessibility</Typography>
          </li>
        </ul>
      </Box>
    </Box>
  )
}
