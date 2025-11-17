'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LockIcon from '@mui/icons-material/Lock'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useIngress } from '@/lib/hooks/use-ingress'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import Link from 'next/link'

export default function IngressDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: ingress, isLoading, error, refetch } = useIngress(name)
  const [docsOpen, setDocsOpen] = useState(true)

  // Auto-refresh
  useAutoRefresh(refetch)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !ingress) {
    return (
      <Box>
        <PageHeader
          title="Ingress Details"
          breadcrumbs={[
            { label: 'Ingress', href: '/ingress' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('Ingress not found')}
          onRetry={() => refetch()}
          title="Failed to Load Ingress"
        />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {ingress.name}
            {ingress.tls && ingress.tls.length > 0 && (
              <Chip
                icon={<LockIcon sx={{ fontSize: 14 }} />}
                label="TLS Secured"
                size="medium"
                color="success"
              />
            )}
          </Box>
        }
        metadata={[
          `Namespace: ${ingress.namespace}`,
          `Age: ${ingress.age}`,
        ]}
        breadcrumbs={[
          { label: 'Ingress', href: '/ingress' },
          { label: ingress.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
        headerActions={
          <IconButton
            onClick={() => setDocsOpen(!docsOpen)}
            size="medium"
            title={docsOpen ? "Hide documentation" : "Show documentation"}
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <InfoOutlinedIcon />
          </IconButton>
        }
      />

      <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Grid container spacing={3}>
            {/* Ingress Details */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Ingress Information
              </Typography>
              <GlassPanel>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Ingress Class:
                    </Typography>
                    {ingress.className ? (
                      <Chip label={ingress.className} size="small" variant="outlined" />
                    ) : (
                      <Typography variant="body2" fontWeight="medium">
                        default
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Hosts:
                    </Typography>
                    {ingress.hosts.length > 0 ? (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {ingress.hosts.map((host, idx) => (
                          <Chip
                            key={idx}
                            label={host}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" fontWeight="medium">
                        All hosts (*)
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Age:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {ingress.age}
                    </Typography>
                  </Box>
                </Box>
              </GlassPanel>
            </Grid>

            {/* TLS Configuration */}
            {ingress.tls && ingress.tls.length > 0 && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LockIcon fontSize="small" />
                    TLS Configuration
                  </Box>
                </Typography>
                <GlassPanel>
                  {ingress.tls.map((tlsConfig, idx) => (
                    <Box key={idx} sx={{ mb: idx < ingress.tls.length - 1 ? 2 : 0 }}>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Hosts:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {tlsConfig.hosts.map((host, hostIdx) => (
                            <Chip
                              key={hostIdx}
                              label={host}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                      {tlsConfig.secretName && (
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Secret:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
                            {tlsConfig.secretName}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
                </GlassPanel>
              </Grid>
            )}
          </Grid>

          {/* Rules and Paths */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Rules and Paths
            </Typography>

            {ingress.rules.map((rule, ruleIdx) => (
              <Paper
                key={ruleIdx}
                elevation={0}
                sx={{
                  mb: ruleIdx < ingress.rules.length - 1 ? 2 : 0,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(30, 30, 46, 0.6)'
                      : 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(209, 213, 219, 0.4)',
                  borderRadius: 3,
                }}
              >
                <Box sx={{ px: 3, py: 1.5, bgcolor: 'action.hover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {rule.host || 'All hosts (*)'}
                  </Typography>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Path</TableCell>
                        <TableCell>Path Type</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Port</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rule.paths.map((path, pathIdx) => (
                        <TableRow key={pathIdx}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {path.path}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={path.pathType} size="small" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {path.backend.service.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {path.backend.service.port.number || path.backend.service.port.name || '-'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            ))}

            {ingress.rules.length === 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(30, 30, 46, 0.6)'
                      : 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(209, 213, 219, 0.4)',
                  borderRadius: 3,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No rules defined
                </Typography>
              </Paper>
            )}
          </Box>

          {/* Labels */}
          {Object.keys(ingress.labels).length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Labels
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {Object.entries(ingress.labels).map(([key, value]) => (
                  <Paper
                    key={key}
                    elevation={0}
                    sx={{
                      px: 2,
                      py: 1,
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(30, 30, 46, 0.6)'
                          : 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(24px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                      border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.12)'
                          : 'rgba(209, 213, 219, 0.4)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      {key}:
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {value}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Right Sidebar - Documentation */}
        <Box
          sx={{
            width: 520,
            flexShrink: 0,
            mt: -12,
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-start',
            maxHeight: '100vh',
          }}
        >
          <GlassPanel
            open={docsOpen}
            closeable
            onClose={() => setDocsOpen(false)}
            animationType="fade"
            sx={{ p: 3, overflow: 'auto', maxHeight: '100vh' }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                About Ingress
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              Ingress exposes HTTP and HTTPS routes from outside the cluster to services within the cluster. Traffic routing is controlled by rules defined on the Ingress resource. An Ingress may be configured to give Services externally-reachable URLs, load balance traffic, terminate SSL/TLS, and offer name-based virtual hosting.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2.5, lineHeight: 1.7 }}>
              An Ingress controller is responsible for fulfilling the Ingress, usually with a load balancer, though it may also configure your edge router or additional frontends to help handle the traffic.
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Example Ingress
            </Typography>

            <Box
              component="pre"
              sx={{
                p: 1.5,
                mb: 2.5,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.3)'
                    : 'rgba(0, 0, 0, 0.05)',
                borderRadius: 2,
                overflow: 'auto',
                fontSize: '0.75rem',
                lineHeight: 1.5,
                fontFamily: 'monospace',
              }}
            >
{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: minimal-ingress
spec:
  ingressClassName: nginx
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: test
            port:
              number: 80`}
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Path Types
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  <strong>Prefix:</strong> Matches based on a URL path prefix split by /. Matching is case sensitive.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>Exact:</strong> Matches the URL path exactly and with case sensitivity.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>ImplementationSpecific:</strong> Interpretation depends on the IngressClass.
                </Typography>
              </li>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              TLS Configuration
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              You can secure an Ingress by specifying a Secret that contains a TLS private key and certificate. The Ingress resource only supports a single TLS port (443) and assumes TLS termination at the ingress point.
            </Typography>

            <Box sx={{
              mt: 3,
              pt: 2,
              borderTop: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
            }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                }}
              >
                Learn more in the{' '}
                <Link
                  href="https://kubernetes.io/docs/concepts/services-networking/ingress/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    official Kubernetes docs
                  </Typography>
                  <Box component="span" sx={{ fontSize: '0.65rem' }}>↗</Box>
                </Link>
              </Typography>
            </Box>
          </GlassPanel>
        </Box>
      </Box>
    </Box>
  )
}
