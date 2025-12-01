# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-12-01

### Added
- **Automated GitHub Releases** - Workflow for automatic release creation on version changes
- **Release Documentation** - Complete guide for creating releases in docs/development/releases.mdx
- **Liquid Glass Modal Styling** - Applied glass morphism design to all modal dialogs
- **CLI Rebuild Command** - `orphelix rebuild` with auto-update of dev dependencies
- **CI Workflow Enhancements** - Detailed step summaries and test coverage reporting

### Fixed
- **AWS EKS Support** - Allow colons and slashes in context names for AWS ARN format (arn:aws:eks:region:account:cluster/name)
- **Welcome Modal UX** - Hide demo option while loading clusters, improved dropdown styling with backdrop blur
- **Cluster Selector UI** - Updated to match main app styling with custom ButtonBase + Menu dropdowns
- **Version Display** - Dynamic version reading from package.json in sidebar and footer
- **PM2 Standalone Paths** - Corrected build paths and suppressed verbose output
- **Console.log Cleanup** - Removed debug statements from application code
- **Documentation** - Fixed TypeScript warnings and updated dependency badges

### Changed
- **README Structure** - Moved Quick Start section to top for better onboarding
- **CI/CD Pipeline** - Runs on all branches, releases only on main after version changes
- **Next.js Config** - Silenced workspace root warning

## [0.1.0] - 2025-11-28

First official release of Orphelix - Modern Kubernetes Dashboard

### Added

#### Core Features
- **Kubernetes Resource Monitoring** - Full support for Deployments, Pods, Nodes, ConfigMaps, Secrets, HPA, PersistentVolumes, Events
- **Real-time Updates** - Server-Sent Events (SSE) with automatic reconnection, heartbeat monitoring, and live cluster state updates
- **Demo Mode** - Realistic test data for presentations without cluster requirements (default mode)
- **Namespace Support** - Full namespace selection functionality with persisted state
- **Context Switching** - Support for multiple kubectl contexts with real context detection
- **Resource Metrics** - CPU/Memory monitoring with color-coded indicators and progress bars
- **Topology Visualization** - Interactive dependency graphs using React Flow with pan, zoom, and fit-to-view controls
- **Pod Management** - Container logs viewer with search/download, pod restart functionality
- **Dark/Light Theme** - Toggle between themes with preference persistence

#### Production Deployment
- **PM2 Integration** - Background process management for production deployment
- **Orphelix CLI** - Command-line interface with auto-install, start/stop/restart/logs/status commands
- **SQLite Storage** - Local database for session and state persistence (better-sqlite3)
- **Desktop Notifications** - macOS native notifications using node-notifier for deployment events
- **Standalone Build** - Next.js standalone output for optimized production deployment
- **Custom Hostname** - Automatic orphelix.local hostname configuration

#### GitHub Integration & GitOps
- **NextAuth v5** - Server-side route protection with GitHub OAuth that cannot be bypassed from client
- **GitHub App Integration** - Granular repository permissions with installation-based authentication
- **Dual Authentication** - Support for both GitHub App (recommended) and OAuth (legacy) methods
- **YAML Editor** - Monaco editor with syntax highlighting and Kubernetes schema validation
- **AI-Powered File Matching** - OpenAI GPT-4o-mini integration for smart deployment-to-file matching
- **Kustomization Support** - Detect and edit Kustomize base & overlays with tab navigation
- **Pull Request Workflow** - Create and merge PRs directly from the dashboard
- **Repository Browser** - Inline branch creation with animated UI

#### UI/UX Improvements
- **Material-UI v6** - Modern component library with glass morphism design
- **Responsive Design** - Mobile and desktop optimized layouts
- **Search & Filters** - Global search moved to header with context-aware filtering
- **Status Badges** - Pill-shaped badges with icons (CheckCircle, Error, HourglassEmpty)
- **Collapsible Sections** - Topology, events, and logs sections with smooth transitions
- **PageHeader Component** - Unified header with breadcrumbs, refresh button, and metadata
- **Footer Component** - Version display with automatic inheritance from package.json
- **Settings Page** - Centralized configuration with inline mode selection and GitHub integration tabs

#### Architecture & Security
- **Server-Side API Routes** - 19+ endpoints with type-safe K8s resource mapping
- **Kubernetes API Integration** - @kubernetes/client-node with automatic kubeconfig discovery
- **HTTP-only Cookies** - Secure token storage for GitHub App authentication
- **Route Protection** - NextAuth v5 proxy.ts middleware preventing client-side bypassing
- **Cookie-based Mode Tracking** - Server-side validation of demo/real mode
- **Secret Masking** - Secret values never exposed in UI (only keys displayed)

#### Testing & Quality
- **217 Unit Tests** - 100% passing with Vitest
- **93 E2E Tests** - Playwright integration tests for critical user flows
- **TypeScript 5.7** - Full type safety across codebase
- **ESLint Configuration** - Strict linting rules with auto-fix support
- **Turbopack Support** - Fast refresh in development mode

### Changed

- **License** - Switched from Business Source License 1.1 to Apache License 2.0 (fully open source)
- **Default Mode** - Changed from 'real' to 'demo' for better first-run experience
- **Mode Terminology** - Renamed 'mock' to 'demo' throughout codebase (56 files updated)
- **Security Architecture** - Complete shift from client-side localStorage to server-side cookies
- **Search Bar** - Moved from PageHeader to global Header component with centered positioning
- **Version Display** - Automated version inheritance from package.json via NEXT_PUBLIC_APP_VERSION
- **Monorepo Structure** - Simplified to single workspace (landing-page removed)
- **Node Requirements** - Updated to Node.js >= 24.0.0
- **Next.js 15/16** - Updated to latest conventions (proxy.ts, standalone output, typedRoutes)

### Fixed

- **Security Vulnerability** - Client-side validation could be bypassed via JavaScript/localStorage manipulation
- **Hydration Errors** - Fixed React hydration errors in recent-events component
- **Test Infrastructure** - Improved Zustand mocking pattern with proper selector support
- **GitHub Login** - Fixed NextAuth v5 signIn() with proper redirect parameters
- **Module Resolution** - Fixed "Can't resolve 'net'" by moving K8s client to server-side
- **Age Formatting** - Removed duplicate formatAge() causing N/A displays
- **Permission Errors** - Graceful 403 handling for node events and pods
- **Static Files 404** - Fixed standalone build path for public and .next/static directories

---

**Version:** 0.1.0 (2025-11-28) - First official release
