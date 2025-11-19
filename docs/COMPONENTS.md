# Orphelix Components Documentation

This document provides an overview of all custom components built for the Orphelix application.

## Table of Contents

- [Common Components](#common-components)
- [Layout Components](#layout-components)
- [Dashboard Components](#dashboard-components)
- [Resource-Specific Components](#resource-specific-components)
- [Utility Components](#utility-components)

---

## Common Components

### Glass Panel
**File:** `app/components/common/glass-panel.tsx`

A reusable glass morphism panel component with consistent styling across the application.

**Props:**
- `children: ReactNode` - Content to display inside the panel
- `sx?: SxProps<Theme>` - Optional Material-UI style overrides

**Features:**
- Consistent glass morphism effect (blur, transparency, border)
- Light/dark mode support
- Subtle box shadow for depth
- Customizable via sx prop

**Usage:**
```tsx
<GlassPanel>
  <Typography>Your content here</Typography>
</GlassPanel>
```

---

### Status Badge
**File:** `app/components/common/status-badge.tsx`

Displays the status of Kubernetes resources with color-coded badges.

**Props:**
- `status: string` - Resource status (Running, Pending, Failed, etc.)
- `size?: 'small' | 'medium' | 'large'` - Badge size

**Features:**
- Color-coded status indicators
- Support for all Kubernetes resource statuses
- Multiple size variants
- Animated pulse effect for transitional states

---

### Liquid Glass Button
**File:** `app/components/common/liquid-glass-button.tsx`

A glassmorphic button component with liquid-like hover effects.

**Features:**
- Glass morphism design
- Smooth hover animations
- Icon support
- Variant styles (outlined, filled)

---

### Liquid Glass Chip
**File:** `app/components/common/liquid-glass-chip.tsx`

A chip component with glass morphism styling.

**Features:**
- Glass effect design
- Multiple color variants
- Size options (small, medium)
- Label and icon support

---

### Page Header
**File:** `app/components/common/page-header.tsx`

Standardized page header with breadcrumbs, title, and actions.

**Props:**
- `title: string | ReactNode` - Page title
- `breadcrumbs?: Array<{label: string, href?: string}>` - Breadcrumb navigation
- `metadata?: string[]` - Additional metadata to display
- `actions?: ReactNode` - Action buttons
- `headerActions?: ReactNode` - Actions in header row
- `onRefresh?: () => void` - Refresh callback
- `isRefreshing?: boolean` - Loading state

**Features:**
- Breadcrumb navigation
- Metadata display (age, namespace, etc.)
- Action buttons area
- Refresh functionality
- Responsive design

---

### Error State
**File:** `app/components/common/error-state.tsx`

Displays error messages with retry functionality.

**Props:**
- `error: Error` - Error object to display
- `onRetry?: () => void` - Retry callback
- `title?: string` - Custom error title

---

### Empty State
**File:** `app/components/common/empty-state.tsx`

Shows empty state when no data is available.

**Props:**
- `message: string` - Message to display
- `icon?: ReactNode` - Optional icon
- `action?: ReactNode` - Optional action button

---

### Detail Skeleton
**File:** `app/components/common/detail-skeleton.tsx`

Loading skeleton for detail pages.

**Features:**
- Animated skeleton loaders
- Matches detail page layout
- Smooth loading experience

---

### Table Skeleton
**File:** `app/components/common/table-skeleton.tsx`

Loading skeleton for table views.

**Props:**
- `rows?: number` - Number of skeleton rows (default: 5)
- `columns?: number` - Number of columns (default: 5)

---

### Search Bar
**File:** `app/components/common/search-bar.tsx`

Search input with debouncing and clear functionality.

**Props:**
- `value: string` - Search value
- `onChange: (value: string) => void` - Change handler
- `placeholder?: string` - Input placeholder

---

### Resource Card
**File:** `app/components/common/resource-card.tsx`

Universal iOS-style glass card for Kubernetes resources.

**Props:**
- `name: string` - Resource name
- `resourceType: string` - Type of resource
- `resourceColor: string` - Color theme
- `icon: SvgIconComponent` - Resource icon
- `onClick?: () => void` - Click handler
- `statusBadge?: ReactNode` - Status badge
- `metrics?: ReactNode` - Metrics display
- `footer?: ReactNode` - Card footer

**Features:**
- Advanced glass morphism with shine effect
- Hover animations
- Flexible content areas
- Icon and color theming

---

### Resource List View
**File:** `app/components/common/resource-list-view.tsx`

Generic list view component for Kubernetes resources.

**Features:**
- Search and filter functionality
- Card and table view modes
- Sorting capabilities
- Empty and error states

---

### Sortable Table Cell
**File:** `app/components/common/sortable-table-cell.tsx`

Table header cell with sort functionality.

**Props:**
- `label: string` - Column label
- `field: string` - Sort field name
- `currentSort: {field: string, direction: 'asc' | 'desc'}` - Current sort state
- `onSort: (field: string) => void` - Sort handler

---

### Cluster Connection Alert
**File:** `app/components/common/cluster-connection-alert.tsx`

Alert displayed when cluster connection is lost.

**Features:**
- Informative message
- Reconnection instructions
- Glass morphism styling

---

## Layout Components

### Header
**File:** `app/components/layout/header.tsx`

Main application header with navigation and controls.

**Features:**
- Logo and branding
- Context selector (cluster/namespace)
- Mode selector (demo/real)
- User menu
- Responsive design

---

### Sidebar
**File:** `app/components/layout/sidebar.tsx`

Navigation sidebar with resource categories.

**Features:**
- Collapsible navigation
- Active route highlighting
- Resource grouping
- Icon-based navigation
- Mobile responsive

---

### Top Bar
**File:** `app/components/layout/top-bar.tsx`

Top navigation bar with quick actions.

**Features:**
- Quick navigation
- Search integration
- Status indicators
- Action buttons

---

### Footer
**File:** `app/components/layout/footer.tsx`

Application footer with links and information.

---

### Logo
**File:** `app/components/layout/logo.tsx`

Orphelix logo component.

**Features:**
- Animated SVG logo
- Multiple size variants
- Theme-aware colors

---

### Context Selector
**File:** `app/components/layout/context-selector.tsx`

Dropdown for selecting Kubernetes context (cluster).

**Features:**
- Context switching
- Connection status
- Cluster aliases

---

### Namespace Selector
**File:** `app/components/layout/namespace-selector.tsx`

Dropdown for selecting Kubernetes namespace.

**Features:**
- Namespace filtering
- Search functionality
- "All namespaces" option
- Recent namespaces

---

### Mode Selector
**File:** `app/components/layout/mode-selector.tsx`

Toggle between demo and real cluster modes.

**Features:**
- Demo/Real mode toggle
- Visual mode indicator
- Seamless switching

---

### Realtime Status
**File:** `app/components/layout/realtime-status.tsx`

Shows real-time connection and sync status.

**Features:**
- Connection status indicator
- Auto-refresh status
- WebSocket connection state

---

## Dashboard Components

### Resource Overview V2
**File:** `app/components/dashboard/resource-overview-v2.tsx`

Grid of resource cards showing cluster overview.

**Features:**
- Visual resource counts
- Status indicators
- Quick navigation to resources
- Responsive grid layout

---

### Resource Utilization
**File:** `app/components/dashboard/resource-utilization.tsx`

Displays cluster resource quota utilization.

**Props:**
- `quotas?: ResourceQuota[]` - Resource quota data

**Features:**
- CPU, memory, storage metrics
- Progress bars with color coding
- Aggregated cross-namespace view
- Glass morphism design

---

### Critical Alerts
**File:** `app/components/dashboard/critical-alerts.tsx`

Shows critical cluster issues and warnings.

**Props:**
- `summary: DashboardSummary` - Dashboard summary data

**Features:**
- Failed pods highlighting
- Warning events
- Quick action buttons
- Dismissible alerts

---

### Recent Events
**File:** `app/components/dashboard/recent-events.tsx`

Timeline of recent cluster events.

**Props:**
- `events: Event[]` - Event data
- `loading?: boolean` - Loading state
- `error?: Error | null` - Error state

**Features:**
- Event timeline
- Type filtering (Warning/Normal)
- Event details
- Expandable list
- Glass morphism styling

---

### Cluster Health Score
**File:** `app/components/dashboard/cluster-health-score.tsx`

Visual health score indicator for the cluster.

**Features:**
- Percentage-based health score
- Color-coded indicators
- Contributing factors breakdown

---

### Summary Card
**File:** `app/components/dashboard/summary-card.tsx`

Card component for dashboard statistics.

**Props:**
- `title: string` - Card title
- `value: string | number` - Main value
- `icon?: ReactNode` - Icon
- `trend?: 'up' | 'down'` - Trend indicator

---

## Resource-Specific Components

### Pod Card
**File:** `app/components/pods/pod-card.tsx`

Display card for Pod resources.

**Features:**
- Container count
- Status indicators
- Restart count
- Resource metrics
- Quick actions

---

### Deployment Card
**File:** `app/components/deployments/deployment-card.tsx`

Display card for Deployment resources.

**Features:**
- Replica status
- Ready replicas indicator
- Strategy display
- Quick navigation

---

### Service Card
**File:** `app/components/services/service-card.tsx`

Display card for Service resources.

**Features:**
- Service type
- Cluster IP
- Port mappings
- Endpoint count

---

### Job Card
**File:** `app/components/jobs/job-card.tsx`

Display card for Job resources.

**Features:**
- Completion status
- Success/failure counts
- Duration tracking
- Active pods

---

### CronJob Card
**File:** `app/components/cronjobs/cronjob-card.tsx`

Display card for CronJob resources.

**Features:**
- Schedule display
- Last run time
- Next run time
- Active job count

---

### Logs Viewer
**File:** `app/components/pods/logs-viewer.tsx`

Advanced log viewer for Pod containers.

**Features:**
- Syntax highlighting
- Auto-scroll
- Log search
- Container selection
- Download logs
- Glass morphism design

---

### Restart Pod Dialog
**File:** `app/components/pods/restart-pod-dialog.tsx`

Confirmation dialog for pod restart.

**Features:**
- Warning message
- Confirmation flow
- Loading state

---

### Restart Deployment Dialog
**File:** `app/components/deployments/restart-deployment-dialog.tsx`

Confirmation dialog for deployment restart.

**Features:**
- Warning message
- Confirmation flow
- Loading state

---

### Deployment Manifest Viewer
**File:** `app/components/deployments/deployment-manifest-viewer.tsx`

View and edit deployment YAML manifests.

**Features:**
- Syntax-highlighted YAML
- Edit mode
- Validation
- Apply changes

---

## Topology & Visualization

### Topology Graph
**File:** `app/components/topology/topology-graph.tsx`

Interactive graph visualization of resource relationships.

**Features:**
- Force-directed graph layout
- Node drag and drop
- Zoom and pan
- Relationship lines
- Interactive nodes

---

### Topology Node
**File:** `app/components/topology/topology-node.tsx`

Individual node in topology graph.

**Props:**
- `node: TopologyNode` - Node data
- `onClick?: () => void` - Click handler

**Features:**
- Resource icon
- Status indicator
- Hover effects
- Glass morphism design

---

## Metrics & Charts

### Resource Usage Chart
**File:** `app/components/metrics/resource-usage-chart.tsx`

Charts for CPU and memory usage over time.

**Props:**
- `data: MetricData[]` - Time series data
- `type: 'cpu' | 'memory'` - Chart type

**Features:**
- Line charts
- Time-based x-axis
- Tooltips
- Responsive sizing
- Glass panel container

---

### Quota Usage Card
**File:** `app/components/namespace/quota-usage-card.tsx`

Displays namespace quota usage.

**Props:**
- `quota: ResourceQuota` - Quota data

**Features:**
- Progress indicators
- Used vs. limit display
- Color-coded warnings

---

## Settings & Configuration

### AI Settings
**File:** `app/components/settings/ai-settings.tsx`

Configuration for AI features.

**Features:**
- Provider selection
- API key management
- Model selection
- Glass morphism design

---

### Cluster Aliases
**File:** `app/components/settings/cluster-aliases.tsx`

Manage cluster name aliases.

**Features:**
- Add/edit/delete aliases
- Validation
- Persistence
- Glass morphism design

---

## YAML & Editors

### YAML Editor Modal
**File:** `app/components/yaml-editor/yaml-editor-modal.tsx`

Modal dialog with YAML editor.

**Props:**
- `open: boolean` - Modal open state
- `onClose: () => void` - Close handler
- `yaml: string` - YAML content
- `onSave?: (yaml: string) => void` - Save handler

**Features:**
- Syntax highlighting
- Validation
- Read-only mode
- Apply changes
- Error handling

---

## Utility Components

### Providers
**File:** `app/components/providers.tsx`

Wraps app with necessary providers (React Query, Theme, etc.).

---

### Theme Provider
**File:** `app/components/theme-provider.tsx`

Material-UI theme configuration and provider.

**Features:**
- Light/dark mode
- Custom color palette
- Typography settings
- Glass morphism tokens

---

## Design System

### Glass Morphism
Most components use a consistent glass morphism design language:
- Semi-transparent backgrounds
- Backdrop blur effect
- Subtle borders
- Layered shadows
- Smooth animations

### Color Palette
- **Primary:** Blue tones for primary actions
- **Secondary:** Purple/pink accents
- **Success:** Green for successful states
- **Warning:** Orange for warnings
- **Error:** Red for errors and failures
- **Info:** Light blue for informational states

### Typography
- **Headings:** Weighted 600-700
- **Body:** Regular 400
- **Captions:** Lighter weight for secondary text
- **Monospace:** For code, logs, and technical data

---

## Best Practices

1. **Use GlassPanel** for consistent glass morphism effects
2. **Leverage Status Badge** for all resource statuses
3. **Implement Error/Empty States** in all data views
4. **Use Skeletons** during loading
5. **Follow Page Header** pattern for consistency
6. **Resource Cards** for list views
7. **Maintain responsive design** across all components

---

## Contributing

When adding new components:
1. Place in appropriate category folder
2. Export from category index if needed
3. Add TypeScript types for props
4. Include JSDoc comments
5. Update this documentation
6. Add to component showcase page
