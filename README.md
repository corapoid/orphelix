# Orphelix

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/yourusername/kubevista)
[![License](https://img.shields.io/badge/license-MPL--2.0-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://reactjs.org/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/yourusername/kubevista)

**Orphelix** is a comprehensive web dashboard for monitoring and managing Kubernetes resources. The application offers a demo mode with realistic test data, live updates via Server-Sent Events, pod management, topology visualization, and GitHub integration for GitOps workflows.

![Orphelix Dashboard](docs/screenshots/dashboard.png)

## ✨ Features

### Core Functionality
- **Resource Monitoring** - Deployments, Pods, Nodes, ConfigMaps, Secrets, HPA, Persistent Volumes, Events
- **Real-time Updates** - Server-Sent Events (SSE) with automatic reconnection and heartbeat monitoring
- **Resource Metrics** - CPU/Memory monitoring with color-coded indicators
- **Topology Visualization** - Interactive dependency graphs with pan, zoom, and fit-to-view controls
- **Pod Management** - Container logs viewer with search/download, pod restart functionality
- **Demo Mode** - Realistic test data for presentations without cluster requirements (default mode)
- **Server-Side Security** - NextAuth v5 with route protection that cannot be bypassed from client

### GitHub Integration & GitOps
- **Dual Authentication** - GitHub OAuth and GitHub App support with granular permissions
- **YAML Editor** - Monaco editor with syntax highlighting and Kubernetes schema validation
- **Smart File Matching** - AI-powered automatic file matching using cluster YAML comparison
- **Kustomization Support** - Detect and edit Kustomize base & overlays with tab navigation
- **Pull Request Workflow** - Create and merge PRs directly from the dashboard

### User Experience
- **Dark/Light Theme** - Toggle between themes with preference persistence
- **Responsive Design** - Mobile and desktop optimized
- **Namespace Selection** - Easy switching between Kubernetes namespaces
- **Context Switching** - Support for multiple kubectl contexts

## 📋 Requirements

- **kubectl** configured with cluster access (for real mode)
- (Optional) **GitHub App** for YAML editor and PR workflow

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
- **[License](LICENSE)** - Mozilla Public License 2.0 details

## 🔒 Security

- ✅ **Local credentials** - Uses kubeconfig from local system
- ✅ **No data storage** - All data fetched on demand from cluster
- ✅ **Secrets masked** - Secret values never displayed in UI
- ✅ **Read-only by default** - Most operations are read-only (except pod restart)

## 💬 Support

### Reporting Issues

If you encounter problems or have suggestions, use [GitHub Issues](https://github.com/your-username/kubevista/issues).

### Quick Answers

**Q: Can I use without a Kubernetes cluster?**
A: Yes! Demo mode works without any cluster.

**Q: How do I connect to my cluster?**
A: Ensure `kubectl` works, then click "DEMO MODE" badge and select a context.

**Q: Can I edit Kubernetes manifests?**
A: Yes! Set up GitHub integration (see [docs/github-setup.md](docs/github-setup.md)) and use the YAML editor.

## 📄 License

This project is licensed under the **Mozilla Public License 2.0** (MPL-2.0).

**Key Points:**
- ✅ **Attribution Required** - Modified versions must credit the original project
- ✅ **File-level Copyleft** - Modified files must remain open source under MPL-2.0
- ✅ **Commercial Use Allowed** - Can be used in commercial projects
- ✅ **Patent Protection** - Grants patent rights and protects against patent claims
- ✅ **Compatible with Proprietary Code** - Can be combined with closed-source software

See the [LICENSE](LICENSE) file for full details.
