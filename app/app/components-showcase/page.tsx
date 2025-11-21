'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import StorageIcon from '@mui/icons-material/Storage'
import { GlassPanel, GlassButton } from '@orphelix/ui'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ErrorState } from '@/app/components/common/error-state'
import { EmptyState } from '@/app/components/common/empty-state'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { PageHeader } from '@/app/components/common/page-header'

export default function ComponentShowcasePage() {
  return (
    <Box>
      <PageHeader
        title="Component Showcase"
        breadcrumbs={[
          { label: 'Components', href: '/components-showcase' },
        ]}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive showcase of all custom components built for Orphelix.
          These components follow a consistent glass morphism design language.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          For detailed documentation, see <code>docs/COMPONENTS.md</code>
        </Typography>
      </Box>

      {/* Common Components */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Common Components
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Glass Panel</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              A reusable glass morphism panel with consistent styling.
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <GlassPanel>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Default Panel
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    This is a glass panel with default padding and styling.
                  </Typography>
                </GlassPanel>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <GlassPanel sx={{ p: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Custom Padding
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    This panel has custom padding (p: 4).
                  </Typography>
                </GlassPanel>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <GlassPanel sx={{ p: 2, backgroundColor: 'primary.main', opacity: 0.2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Custom Styles
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    You can override styles via sx prop.
                  </Typography>
                </GlassPanel>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Status Badge</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Universal chip component with glass morphism styling. Use <code>status</code> prop for Kubernetes statuses
              (automatic color mapping) or <code>label + color</code> for custom chips.
            </Typography>

            <GlassPanel>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>Sizes:</Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <StatusBadge status="Running" size="small" />
                <StatusBadge status="Running" size="medium" />
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>Kubernetes Statuses:</Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <StatusBadge status="Running" />
                <StatusBadge status="Pending" />
                <StatusBadge status="Succeeded" />
                <StatusBadge status="Failed" />
                <StatusBadge status="Unknown" />
                <StatusBadge status="CrashLoopBackOff" />
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>Custom Colors:</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                <StatusBadge label="Default" />
                <StatusBadge label="Success" color="success" />
                <StatusBadge label="Warning" color="warning" />
                <StatusBadge label="Error" color="error" />
                <StatusBadge label="Info" color="info" />
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>Examples:</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <StatusBadge label="LoadBalancer" color="success" size="small" />
                <StatusBadge label="ClusterIP" color="default" size="small" />
                <StatusBadge label="Active" color="success" size="small" />
                <StatusBadge label="Suspended" color="warning" size="small" />
              </Box>
            </GlassPanel>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Liquid Glass Button</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Glassmorphic buttons with smooth hover effects.
            </Typography>
            <GlassPanel>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <GlassButton>Default Button</GlassButton>
                <GlassButton startIcon={<CheckCircleIcon />}>
                  With Icon
                </GlassButton>
                <GlassButton
                  sx={{
                    color: 'success.main',
                    borderColor: 'success.main'
                  }}
                >
                  Success Color
                </GlassButton>
                <GlassButton
                  sx={{
                    color: 'error.main',
                    borderColor: 'error.main'
                  }}
                  startIcon={<ErrorIcon />}
                >
                  Danger
                </GlassButton>
              </Box>
            </GlassPanel>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Page Header</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Standardized page header component.
            </Typography>
            <Box sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: (theme) => `${theme.shape.borderRadius}px`, p: 2 }}>
              <PageHeader
                title="Example Page"
                breadcrumbs={[
                  { label: 'Home', href: '/' },
                  { label: 'Resources', href: '/resources' },
                  { label: 'Example' },
                ]}
                metadata={['Age: 2d', 'Namespace: default']}
                actions={
                  <GlassButton size="small">
                    Action Button
                  </GlassButton>
                }
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Error State</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Error state component with retry functionality.
            </Typography>
            <ErrorState
              error={new Error('Failed to load resource')}
              title="Example Error"
              onRetry={() => alert('Retry clicked')}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Empty State</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Empty state when no data is available.
            </Typography>
            <EmptyState
              title="No resources found"
              description="There are no resources to display at this time"
              icon={StorageIcon}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Skeletons</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Loading skeletons for different views.
            </Typography>

            <Typography variant="subtitle2" sx={{ mb: 2 }}>Detail Skeleton:</Typography>
            <Box sx={{ mb: 4, border: '1px dashed', borderColor: 'divider', borderRadius: (theme) => `${theme.shape.borderRadius}px`, p: 2 }}>
              <DetailSkeleton />
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2 }}>Table Skeleton:</Typography>
            <Box sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: (theme) => `${theme.shape.borderRadius}px`, p: 2 }}>
              <TableSkeleton rows={3} columns={4} />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Design System */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Design System
        </Typography>

        <GlassPanel sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Glass Morphism</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Most components use a consistent glass morphism design language featuring:
          </Typography>
          <Box component="ul" sx={{ pl: 3, '& li': { mb: 1 } }}>
            <li>
              <Typography variant="body2">Semi-transparent backgrounds</Typography>
            </li>
            <li>
              <Typography variant="body2">Backdrop blur effect (24px)</Typography>
            </li>
            <li>
              <Typography variant="body2">Subtle borders with transparency</Typography>
            </li>
            <li>
              <Typography variant="body2">Layered shadows for depth</Typography>
            </li>
            <li>
              <Typography variant="body2">Smooth animations and transitions</Typography>
            </li>
          </Box>
        </GlassPanel>

        <GlassPanel sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Color Palette</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 4 }}>
              <Box sx={{ p: 2, bgcolor: 'primary.main', borderRadius: (theme) => `${theme.shape.borderRadius}px`, color: 'white' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>PRIMARY</Typography>
                <Typography variant="body2">Actions & Links</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Box sx={{ p: 2, bgcolor: 'success.main', borderRadius: (theme) => `${theme.shape.borderRadius}px`, color: 'white' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>SUCCESS</Typography>
                <Typography variant="body2">Healthy States</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Box sx={{ p: 2, bgcolor: 'warning.main', borderRadius: (theme) => `${theme.shape.borderRadius}px`, color: 'white' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>WARNING</Typography>
                <Typography variant="body2">Warnings</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Box sx={{ p: 2, bgcolor: 'error.main', borderRadius: (theme) => `${theme.shape.borderRadius}px`, color: 'white' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>ERROR</Typography>
                <Typography variant="body2">Failures</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Box sx={{ p: 2, bgcolor: 'info.main', borderRadius: (theme) => `${theme.shape.borderRadius}px`, color: 'white' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>INFO</Typography>
                <Typography variant="body2">Information</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Box sx={{ p: 2, bgcolor: 'text.secondary', borderRadius: (theme) => `${theme.shape.borderRadius}px`, color: 'white' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>SECONDARY</Typography>
                <Typography variant="body2">Metadata</Typography>
              </Box>
            </Grid>
          </Grid>
        </GlassPanel>

        <GlassPanel>
          <Typography variant="h6" sx={{ mb: 2 }}>Typography</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="h1" sx={{ mb: 1 }}>Heading 1</Typography>
              <Typography variant="caption" color="text.secondary">
                Used for main page titles
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="h3" sx={{ mb: 1 }}>Heading 3</Typography>
              <Typography variant="caption" color="text.secondary">
                Used for section headers
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>Heading 6</Typography>
              <Typography variant="caption" color="text.secondary">
                Used for card titles and subsections
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>Body 1</Typography>
              <Typography variant="caption" color="text.secondary">
                Default body text for content
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Body 2</Typography>
              <Typography variant="caption" color="text.secondary">
                Smaller body text for descriptions
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>Caption</Typography>
              <Typography variant="caption" color="text.secondary">
                Used for metadata and labels
              </Typography>
            </Box>
          </Box>
        </GlassPanel>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Additional Info */}
      <GlassPanel sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Component Categories
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Common Components
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reusable UI components used throughout the application (buttons, badges, panels, etc.)
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Layout Components
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Header, sidebar, footer, and navigation components
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Dashboard Components
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Overview cards, charts, and dashboard-specific widgets
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Resource Components
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cards and viewers for specific Kubernetes resources (Pods, Deployments, etc.)
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Topology & Visualization
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Interactive graphs and network diagrams
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Utilities
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Providers, editors, and configuration components
            </Typography>
          </Grid>
        </Grid>
      </GlassPanel>

      <GlassPanel>
        <Typography variant="body2" color="text.secondary">
          For complete documentation including props, features, and usage examples,
          see <code>docs/COMPONENTS.md</code>
        </Typography>
      </GlassPanel>
    </Box>
  )
}
