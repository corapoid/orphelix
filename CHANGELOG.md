# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **AI-Powered File Matching (OpenAI Integration)**: Intelligent YAML file matching
  - OpenAI GPT-4o-mini integration for smart deployment-to-file matching
  - User-configurable OpenAI API key in Settings (stored in localStorage)
  - Automatic exclusion of base/ directory files when environment files exist
  - Confidence scoring and reasoning display for AI matches
  - Fallback to pattern matching when OpenAI key not configured
  - `/api/ai/match-file` endpoint with structured AI prompts
  - AI settings panel in Settings page
  - Match info alerts showing method (AI/pattern) and confidence
  - Support for complex repository structures (Kustomize, multi-environment)
  - Intelligent handling of naming patterns (hyphens, underscores, suffixes)

- **GitHub App Integration (Granular Permissions)**: Major security improvement
  - GitHub App authentication with fine-grained repository permissions
  - Users can select specific repositories to grant access (not all or nothing)
  - Installation-based token system with automatic 8-hour refresh
  - Support for both GitHub App (recommended) and OAuth (legacy) methods
  - Tabbed interface in Settings to choose between GitHub App and OAuth
  - Installation management UI with repository counts and access control
  - 3 new API routes: `/api/github-app/*` (callback, installations, logout)
  - GitHubAppInstallButton and GitHubAppRepoSelector components
  - HTTP-only cookie storage for GitHub App tokens (more secure)
  - Support for multiple installations (personal + organization accounts)
  - Grouped repository dropdown by installation
  - Private/public repository badges in UI
  - "Add More Repositories" workflow integration
  - Comprehensive GitHub App setup guide (GITHUB_APP_SETUP_PL.md)
  - @octokit/app and @octokit/auth-app dependencies

- **GitHub Integration & YAML Editor**: Complete GitOps workflow integration
  - NextAuth GitHub OAuth authentication with session management (legacy method)
  - Repository selection with localStorage persistence
  - YAML file browser with recursive directory scanning
  - Monaco Editor integration for YAML editing
  - Kustomization structure detection and parsing
  - Base + Overlays tab navigation for Kustomize projects
  - Automatic Pull Request creation with formatted messages
  - PR tracking in Zustand store (pending PRs per deployment)
  - GitHub API client with full Octokit integration
  - 5 new API routes: `/api/auth`, `/api/github/*`
  - GitHubLoginButton, RepoSelector, and YamlEditorModal components
  - "Edit YAML" button on deployment details page
  - GitHub Integration section in Settings page with method selection
  - Comprehensive setup guides (GITHUB_SETUP.md, GITHUB_SETUP_PL.md)
  - Map serialization support in Zustand for localStorage
  - Session provider integration with NextAuth
  - Type definitions for NextAuth session extensions

### Changed

- **Nodes UI Improvements**:
  - Removed 'Roles' column from nodes table and details page
  - Removed 'Conditions' section from node details
  - Added CPU and memory usage percentages (allocatable/capacity)
  - Simplified node details with single Resources section
  - Namespace-scoped nodes filtering (show only nodes with pods in selected namespace)
- **Secrets Details Page**: Standardized styling to match app design (removed gradient header)
- **YAML Editor**: Removed unnecessary Kustomize tabs (Base/Overlay)
- **Dependencies**: Added `next-auth@beta`, `@octokit/rest`, `@octokit/app`, `@octokit/auth-app`, `@monaco-editor/react`, `ai`, `@ai-sdk/openai`
- **Store**: Extended with GitHub repository and PR tracking state
- **Environment**: Added GitHub App and OAuth configuration variables (.env.example updated)
- **Settings Page**: Now includes tabbed interface for GitHub App vs OAuth selection
- **Security**: GitHub App tokens stored in HTTP-only cookies (not localStorage)

### Fixed

- **AI Matcher**: Fixed OpenAI API key parameter passing (use `createOpenAI` client)
- **YAML Editor UI**: Fixed empty blue alert bar (added AI method support)
- **YAML Editor UI**: Removed confusing Base/Overlay tabs for non-Kustomize repos
- **Nodes Filtering**: Use namespace-scoped pod API for better permission handling
- **Permission Errors**: Graceful 403 handling for node events and pods
- **ESLint**: Fixed unused Chip import and let→const warnings
- All TypeScript compilation errors in GitHub integration code
- Import cleanup in repo-selector, yaml-editor-modal, and GitHub App components
- NextAuth handler exports for route compatibility
- GitHub App token extraction from Octokit response
- LogLine type inference in logs-viewer component
- Unused import warnings across components

## [1.2.0] - 2025-11-13

### Added

- **Resource Metrics Visualization**: Added real-time resource usage monitoring
  - New `ResourceUsageChart` component with CPU/Memory metrics
  - Card-based progress bars showing Current/Requested/Limit resources
  - Color-coded usage indicators (green/yellow/red)
  - Tooltips explaining percentage calculations
  - `/api/metrics/pods` endpoint for fetching pod metrics via kubectl top
  - Support for both real cluster metrics and demo mode with mock data
  - Auto-refresh every 30 seconds in real mode
  - Metrics displayed on deployment detail pages
- **Collapsible Sections**: Improved UX with collapsible components
  - Topology section on dashboard (collapsed by default)
  - Recent Events with "Show N More" expansion (displays 3 by default)
  - Container Logs section on pod details (collapsed by default)
  - Smooth transitions and hover effects
- **Enhanced Detail Pages**:
  - Vertical layout for metadata (namespace, age, node) - one item per line
  - Unified resource display (ConfigMaps & Secrets in single section)
  - Consistent styling between deployment and pod details
  - Improved logs viewer with inline controls (Formatted/Raw chips)
- **Settings Page Improvements**:
  - Dedicated `/settings` route with centralized configuration
  - Inline mode selection (Demo/Real Cluster) without modal
  - Connection testing before switching to real cluster
  - Minimized Appearance section with icon-based theme selection
- **Connection Validation**: `/api/test-connection` endpoint to validate cluster connectivity
- **Footer Component**: Global footer with version info and GitHub link

### Changed

- **Sidebar Bottom Section**: Redesigned Settings and Collapse buttons layout
  - Combined into single section with horizontal layout
  - Settings button on left, Collapse chevron on right (when expanded)
  - Single chevron button when collapsed
  - Consistent font weights and styling across menu items
- **Topology Graph**: Disabled scroll-based zoom/pan for better UX
  - `zoomOnScroll={false}` and `panOnScroll={false}`
  - Manual dragging still enabled with `panOnDrag={true}`
  - Fixed hover artifacts with proper overflow handling
- **Loading Skeleton**: Removed colorful gradient, replaced with neutral MUI Skeleton
- **Pod Details**: Fixed Age display (was showing N/A, now correctly formatted)
- **Logs Viewer**: Removed duplicate "Container Logs" header
  - Moved Formatted/Raw chips to toolbar
  - Cleaner single-header layout in collapsible section

### Fixed

- **Demo Mode Metrics**: Fixed metrics API to support both 'mock' and 'demo' mode values
  - Prevents kubectl errors in console during demo mode
  - Properly returns mock data when mode parameter is set
- **Topology Section**: Removed hover artifacts on edges with `overflow: 'hidden'`
- **Expand Button**: Fixed unwanted square highlight with `disableRipple` and transparent hover
- **Age Formatting**: Removed duplicate `formatAge()` call in pod details
- **Resource Display**: Unified ConfigMaps/Secrets sections between deployment and pod pages
- **ESLint**: Fixed unused import warnings (removed unused `Collapse` import)

## [1.1.0] - 2025-11-12

### Added

- **Namespace Support**: Full namespace selection functionality
  - Added namespace dropdown in header (visible in real mode)
  - GET `/api/namespaces` endpoint to fetch available namespaces
  - NamespaceSelector component with loading states
  - Namespace persisted in Zustand store
  - All API routes now accept `namespace` query parameter
- **Real Kubectl Context Detection**: `/api/contexts` endpoint fetches actual kubectl contexts
- **ModeSelector Component**: Dialog for switching between mock and real mode with context selection
- **API Helper Functions**: `getNamespaceFromRequest()` and `buildApiUrl()` utilities

### Changed

- **Store**: Added `selectedNamespace` field (default: 'default')
- **API Routes**: All routes now accept and use namespace from query parameters
- **Hooks**: Updated to pass namespace to API calls (use-deployments, use-pods, etc.)
- **ModeSelector**: Now fetches real kubectl contexts instead of mock data
- **KubernetesContext Type**: Made `namespace` field optional
- **.gitignore**: Added Turbopack cache, Playwright cache, OS files, temporary files
- **Project Name**: Rebranded to **KubeVista**
- **Documentation**: Translated all `.md` files to English
- **README**: Added attractive badges and improved visual appeal
- **License**: Changed from MIT to **MPL-2.0** (Mozilla Public License 2.0)

### Fixed

- **Hydration Errors**: Fixed React hydration errors in recent-events component
- **TypeScript Errors**: Fixed all type errors in tests (Event structure, age types)
- **Header Badge**: Made "DEMO MODE" badge clickable to open ModeSelector dialog
- **Test Files**: Fixed corrupt test files and updated to use flat Event structure

---

## [1.0.0] - 2025-11-12

### Added

#### Stage 8: Kubernetes API Integration
- Real Kubernetes cluster integration using @kubernetes/client-node
- Server-side API routes architecture (19 endpoints)
- Automatic kubeconfig discovery (in-cluster + local)
- K8s client initialization with fallback mechanisms
- API Routes for all resource types:
  - Deployments (list, detail, pods, events)
  - Pods (list, detail, logs, events, restart)
  - Nodes (list, detail, pods, events)
  - ConfigMaps (list, detail, events)
  - Secrets (list, detail, events)
  - HPA (list, detail, events)
  - PersistentVolumes (list, detail)
  - Events (list, filtered by resource)
  - Topology (graph data)
- Type-safe K8s resource mapping with proper error handling
- Fixed Event structure (flattened involvedObject)
- Fixed age type (Date → string throughout)

#### Stage 9: Real-time Updates with SSE
- Server-Sent Events (SSE) implementation for real-time updates
- Kubernetes Watch API integration for deployments, pods, and events
- Auto-reconnection mechanism with exponential backoff (max 5 attempts, 3s delay)
- RealtimeStatus component with visual connection indicator
- Heartbeat monitoring (30s intervals)
- Automatic TanStack Query cache invalidation on resource changes
- useRealtimeUpdates hook for connection state management
- Real-time mode toggle in store (realtimeEnabled flag)

#### Stage 10: Restart Pods Functionality
- POST /api/pods/:name/restart endpoint (delete + controller recreates)
- useRestartPod hook with TanStack Query mutation
- RestartPodDialog component with confirmation and warnings
- Loading states and progress indicators during restart
- Success/error toast notifications with Snackbar
- Automatic cache invalidation after pod restart
- Standalone pod detection warnings in dialog

#### Stage 11: Flux GitOps Integration
- Flux resource type definitions (GitRepository, Kustomization, HelmRelease)
- FluxCondition and FluxResourceStatus types
- Flux information page (/flux) with documentation
- GitOps workflow guidance and setup instructions
- Navigation link in sidebar with GitHub icon
- Ready for Flux CD deployment monitoring

#### Stage 12: Finalization & Documentation
- Updated README.md with comprehensive user documentation
- Bumped version to 1.0.0 in package.json
- Final build verification (successful)
- All 216 unit tests passing (100%)
- All 93 E2E tests passing (100%)
- Production-ready deployment configuration

### Changed

- **Event Structure**: Flattened involvedObject to direct fields (kind, name, namespace)
- **Age Type**: Changed from Date to string throughout all types
- **Deployment Status**: Changed 'Healthy' to 'Available' for consistency
- **API Signatures**: Updated to @kubernetes/client-node object parameters
- **Response Structure**: Updated to use direct response (no .body wrapper)
- **Next.js 15 Params**: Updated all dynamic routes to use Promise-based params
- Updated all TanStack Query hooks to use API routes instead of direct K8s client imports

### Fixed

- **Module Resolution**: Fixed "Can't resolve 'net'" error by moving K8s client to server-side API routes
- **Next.js 15 Compatibility**: Fixed dynamic route params type errors (Promise-based)
- **@kubernetes/client-node API**: Fixed method signatures to use object parameters
- **Response Structure**: Fixed to use direct response objects instead of .body
- **Event Type Mismatch**: Fixed involvedObject → flat structure throughout codebase
- **Type Errors**: Fixed age type (Date → string) across all resource types
- **Missing Type Fields**: Added selector, labels, data, targetRef, reclaimPolicy to types
- **DeploymentStatus**: Fixed 'Healthy' → 'Available' mapping
- **Test Failures**: Fixed 10 test failures related to Event structure and age types
- **SSE Watch API**: Fixed Promise-based abort controller handling
- **ESLint Warnings**: Fixed unused variables and console.log statements

### Developer Experience

- Created comprehensive TECHNICAL.md with architecture documentation
- Added troubleshooting guide for common issues
- Documented all API routes with examples
- Added development workflow and best practices
- Created performance optimization guidelines
- Added contribution guidelines

### Security

- All K8s operations server-side only (credentials never exposed to browser)
- Secret values masked in UI (only keys displayed)
- Read-only operations by default (except pod restart with confirmation)
- Kubernetes RBAC respected (ServiceAccount permissions)

---

## [0.1.0] - 2025-11-11

### Added

#### Stage 1-2: Project Setup & Dashboard Overview
- Initial project setup with Next.js 15, React 19, and TypeScript
- Material-UI (MUI) v6 for UI components
- Zustand store for application mode management (mock vs real)
- TanStack Query v5 for data fetching and caching
- Mock data generator for all Kubernetes resources
  - Deployments, Pods, Nodes
  - ConfigMaps, Secrets
  - HPA, PersistentVolumes, PersistentVolumeClaims
  - Events
- Basic application layout
  - Responsive Header with theme toggle and mode badge
  - Sidebar navigation with all resource sections
  - Dark/Light theme support
- Dashboard overview page with 7 summary cards
  - Deployments, Pods, Nodes, ConfigMaps, Secrets, HPA, PersistentVolumes
- Recent Events component displaying last 10 cluster events with severity indicators
- TanStack Query hooks for data fetching
  - `useDashboardSummary` hook for fetching resource summary statistics
  - `useRecentEvents` hook for fetching recent cluster events
- Placeholder pages for all navigation routes
- Loading states and error handling across all components
- 39 unit tests for components and hooks
- 26 E2E tests for Dashboard Overview and navigation

#### Stage 3: Deployments Management
- Deployments list page with comprehensive table view
  - Sortable columns for name, namespace, replicas, and age
  - Search and filter functionality for deployments
  - Clickable rows linking to deployment details
- StatusBadge component for displaying resource status
  - Color-coded status indicators (success, warning, error, info)
  - Configurable size variants (small, medium)
  - Tooltip support for additional context
- Deployment detail page with dynamic routing
  - Full deployment metadata and specifications
  - Container information with images and resources
  - Deployment conditions and status
- Pods list component in deployment detail view
  - Table view of all pods belonging to the deployment
  - Pod status, IP addresses, and node assignments
  - Container readiness indicators
- Events list component in deployment detail view
  - Chronological event timeline
  - Event type and reason indicators
  - Human-readable timestamps
- TanStack Query hooks for deployments
  - `useDeployments` hook for fetching deployment list
  - `useDeployment` hook for fetching single deployment details
  - `useDeploymentPods` hook for fetching pods by deployment
  - `useDeploymentEvents` hook for fetching deployment-related events
- 55 new unit tests for deployments feature
  - 21 unit tests for TanStack Query hooks
  - 34 unit tests for StatusBadge component
- 30 new E2E tests for deployments feature
  - Deployment list page navigation and interactions
  - Search and filter functionality
  - Deployment detail page routing and content
  - Pods and events display in detail view

#### Stage 4: Pods Management
- Pods list page with comprehensive table view
  - Sortable columns for name, status, node, IP, restarts, containers, and age
  - Search and filter functionality with status dropdown
  - Clickable rows linking to pod details
  - Restart count indicators with color-coded chips
- Pod detail page with dynamic routing
  - Full pod metadata, status, and specifications
  - Details section showing IP, restart count, and container count
  - Labels section with chip display
  - Containers section with table view (name, image, ready status, restarts)
  - Container status indicators (ready/not ready icons)
- LogsViewer component for container logs
  - Real-time log display with search functionality
  - Download logs as text file
  - Refresh logs on demand
  - Auto-scroll to bottom with manual scroll detection
  - Container selector for multi-container pods
  - Syntax highlighting for log entries
- Events section in pod detail page
  - Chronological event timeline
  - Event type and reason indicators with color-coded chips
  - Event count and age display
- TanStack Query hooks for pods
  - `usePods` hook for fetching pod list with optional status filter
  - `usePod` hook for fetching single pod details
  - `usePodEvents` hook for fetching pod-related events
  - `usePodLogs` hook for fetching container logs with tail parameter
- 41 new unit tests for pods feature
  - 22 unit tests for TanStack Query hooks (pods, pod details, events, logs)
  - 19 unit tests for LogsViewer component (search, download, refresh, auto-scroll)
- 32 new E2E tests for pods feature
  - Pods list page navigation and interactions
  - Status filter and search functionality
  - Pod detail page routing and content
  - Logs viewer functionality and container selection
  - Events display in detail view

#### Stage 5: Nodes, ConfigMaps & Secrets
- Nodes view with resource metrics and capacity information
- ConfigMaps detailed views with data inspection
- Secrets detailed views with security considerations (values masked)
- Resource relationship tracking

#### Stage 6: HPA, PersistentVolumes & Events
- HorizontalPodAutoscaler (HPA) detailed views with scaling metrics
- PersistentVolumes (PV) management with capacity and status
- Events timeline with filtering and search capabilities
- Resource status monitoring across all resource types

#### Stage 7: Topology Visualization
- Interactive topology graphs using React Flow
- Resource dependency visualization (Deployment → Pod → Node)
- Node and edge customization with color-coded status
- Pan, zoom, and fit-to-view controls
- Custom node rendering for different resource types

### Security

- Secrets values are never exposed in the UI (only keys shown)
- Uses local kubeconfig for cluster authentication
- Read-only access by default

---

## [Unreleased]

### Planned Features

- Multi-cluster management
- RBAC integration and user permissions
- Custom metrics with Prometheus/Grafana
- Helm chart for easy deployment
- GitOps PR creation from UI
- Admission webhook visualization
- Resource quota management

---

**Version History:**
- **1.2.0** (2025-11-13) - Resource metrics, collapsible sections, enhanced UX, settings page improvements
- **1.1.0** (2025-11-12) - Namespace support, real context detection, rebranding to KubeVista
- **1.0.0** (2025-11-12) - Production release with full K8s integration, real-time updates, and GitOps support
- **0.1.0** (2025-11-11) - Initial release with mock data and core UI features
