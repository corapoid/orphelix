'use client'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FolderIcon from '@mui/icons-material/Folder'
import { useRouter } from 'next/navigation'
import { useNamespaces } from '@/lib/hooks/use-namespaces'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { EmptyState } from '@/app/components/common/empty-state'
import { ClusterConnectionAlert } from '@/app/components/common/cluster-connection-alert'

export default function NamespacesPage() {
  const router = useRouter()
  const { data: namespaces, isLoading, error, refetch } = useNamespaces()

  useAutoRefresh(refetch)

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Namespaces" onRefresh={refetch} />
        <TableSkeleton rows={5} columns={4} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Namespaces" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Namespaces" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Namespaces"
        subtitle={`${namespaces?.length || 0} namespace${namespaces?.length === 1 ? '' : 's'} in this cluster`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Namespaces' },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <ClusterConnectionAlert minimal />

      {!namespaces || namespaces.length === 0 ? (
        <EmptyState
          icon={FolderIcon}
          title="No namespaces found"
          description="There are no namespaces in this cluster."
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Labels</TableCell>
                <TableCell>Age</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {namespaces.map((namespace) => (
                <TableRow
                  key={namespace.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/namespaces/${namespace.name}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {namespace.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={namespace.status}
                      size="small"
                      color={namespace.status === 'Active' ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {Object.entries(namespace.labels).slice(0, 2).map(([key, value]) => (
                        <Chip
                          key={key}
                          label={`${key}=${value}`}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {Object.keys(namespace.labels).length > 2 && (
                        <Chip
                          label={`+${Object.keys(namespace.labels).length - 2} more`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{namespace.age}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/namespaces/${namespace.name}`)
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
