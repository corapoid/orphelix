# Orphelix

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/dmakowski/orphelix)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://reactjs.org/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/dmakowski/orphelix)
[![Built with Claude Code](https://img.shields.io/badge/Built_with-Claude_Code-5A67D8.svg)](https://claude.ai/claude-code)

> **🚧 Active Development**: This project is under active development. Features and APIs may change.
>
> **🤖 Built with AI**: Developed with [Claude Code](https://claude.ai/claude-code) - Anthropic's AI-powered coding assistant.

**Orphelix** is a comprehensive web dashboard for monitoring and managing Kubernetes resources. The application offers a demo mode with realistic test data, live updates via Server-Sent Events, pod management, topology visualization, and GitHub integration for GitOps workflows.

![Orphelix Dashboard](docs/screenshots/dashboard.png)

## ✨ Features

### 🎯 Core Capabilities
- **Multi-Cluster & Namespace Support** - Switch between clusters and namespaces seamlessly (essential for namespace-scoped access control)
- **Comprehensive Resource Management** - View and manage all Kubernetes resources: Deployments, Pods, Nodes, ConfigMaps, Secrets, Services, Ingress, Jobs, CronJobs, StatefulSets, DaemonSets, HPA, PersistentVolumes, and Events
- **Quick Actions** - Restart deployments or individual pods with a single click
- **Real-time Updates** - Server-Sent Events (SSE) with automatic reconnection and heartbeat monitoring
- **Resource Metrics** - CPU/Memory monitoring with color-coded indicators
- **Demo Mode** - Explore the full application without cluster access - no login required (perfect for demos and evaluation)

### 🔧 Advanced Operations
- **YAML Manifest Editor** - Built-in Monaco editor with syntax highlighting and Kubernetes schema validation
- **GitOps Workflow** - Edit manifests and create pull requests directly from the dashboard (code-based changes only)
- **ConfigMap Editor** - Modify ConfigMaps in-place with automatic PR creation
- **Kustomization Support** - Automatically detect and edit Kustomize base & overlay structures
- **Smart File Matching** - AI-powered automatic deployment-to-file matching using YAML comparison

### 🤖 AI-Powered Features
- **Intelligent Troubleshooting** - AI analyzes logs and identifies root causes when deployments fail
- **System Notifications** - Real-time desktop notifications for cluster issues and critical events
- **Topology Visualization** - Interactive dependency graphs showing resource relationships for deployments

### 🔐 Security & Authentication
- **Dual GitHub Authentication** - OAuth and GitHub App support with granular repository permissions
- **Server-Side Protection** - NextAuth v5 with route protection that cannot be bypassed from client
- **Local Credentials** - Uses kubeconfig from local system - no credentials stored

### 🎨 User Experience
- **Modern Glass UI** - Beautiful liquid glass design with dark/light mode support
- **Advanced Search & Filters** - Find resources quickly with powerful filtering
- **Namespace-Scoped Views** - Perfect for teams with namespace-based access control

...and this is just the beginning!

## 🗺️ What's Coming Next?

- **Resource Optimization** - Analyze CPU/memory usage against limits and suggest cost-saving adjustments
- **Advanced Log Analysis** - AI-powered troubleshooting for non-deployment issues (services, networking, configuration)
- **Cluster Cost Insights** - Track and optimize infrastructure spending
- **Multi-Cluster Dashboard** - Unified view across multiple Kubernetes clusters
- **Custom Alerts & Rules** - Define your own notification rules and thresholds

...and much more!

## 📋 Requirements

- **kubectl** configured with cluster access (for real mode)
- (Optional) **GitHub App** for YAML editor and PR workflow

## 🚀 Quick Start

### Running the Application

```bash
# 🚀 ONE COMMAND SETUP - Auto-installs, builds, and configures everything!
cd app
npm run orphelix start

# That's it! First run will:
# 1. Install dependencies (if needed)
# 2. Build standalone app (if needed)
# 3. Configure orphelix.local hostname (requires sudo password)
# 4. Initialize SQLite database
# 5. Start application in background

# Open in browser
npm run orphelix open
# Or manually navigate to: http://orphelix.local:3000
# Or: http://localhost:3000

# Other commands:
npm run orphelix stop       # Stop the application
npm run orphelix restart    # Restart the application
npm run orphelix logs       # View real-time logs
npm run orphelix status     # Check status
npm run orphelix help       # Show all commands

# Custom port:
npm run orphelix start -- --port 8080
npm run orphelix open -- --port 8080
```

## 📖 Documentation

### 📘 User Documentation

Complete user guide available in the `/docs` directory:

- **[Introduction](docs/introduction.mdx)** - What is Orphelix and key features
- **[Quickstart](docs/quickstart.mdx)** - Get started in 5 minutes
- **[Installation](docs/installation.mdx)** - Detailed installation guide
- **[Dashboard Guide](docs/user/dashboard.mdx)** - Using the main dashboard
- **[Search & Filters](docs/user/search-filters.mdx)** - Finding resources quickly
- **[GitHub Integration](docs/user/github/overview.mdx)** - GitOps workflow setup
- **[GitHub App Setup](docs/user/github/github-app-setup.mdx)** - Step-by-step configuration

<details>
<summary>📖 View documentation with Mintlify (optional)</summary>

```bash
cd docs
npx mint@latest dev
```

Note: Mintlify may have dependency issues. Documentation is fully readable as markdown files.
</details>

<details>
<summary>📚 All Documentation Sections</summary>

**User Guide:**
- Dashboard Overview
- Deployments Management
- Pods Monitoring & Logs
- Nodes Monitoring
- ConfigMaps & Secrets
- HPA (HorizontalPodAutoscaler)
- Events Timeline
- Topology Visualization
- Search & Filters

**GitHub Integration:**
- Overview & Benefits
- OAuth Setup
- GitHub App Setup
- YAML Editor Usage
- Pull Request Workflow

**Configuration:**
- Cluster Connection
- Namespace Selection
- Settings & Preferences
- Demo Mode

</details>

### 🔧 Developer Documentation
- **[Technical Documentation](TECHNICAL.md)** - Architecture, technology stack, key patterns, API routes
- **[Testing Guide](TESTING.md)** - Unit tests, E2E tests, coverage reports
- **[API Reference](docs/api-reference/introduction.mdx)** - REST API documentation
- **[Roadmap](ROADMAP.md)** - Future features and development plans

### 📋 Project Information
- **[Changelog](CHANGELOG.md)** - Complete version history and updates
- **[License](LICENSE)** - Apache License 2.0

## 🔒 Security

- ✅ **Local credentials** - Uses kubeconfig from local system
- ✅ **Local storage** - SQLite database stores only user preferences (theme, settings, aliases)
- ✅ **No cluster data stored** - All Kubernetes data fetched on demand from cluster
- ✅ **Secrets masked** - Secret values never displayed in UI
- ✅ **Read-only by default** - Most operations are read-only (except pod restart)

