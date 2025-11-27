# Orphelix

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/yourusername/kubevista)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
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

- **Node.js** >= 24.0.0
- **kubectl** configured with cluster access (for real mode)
- (Optional) **GitHub App** for YAML editor and PR workflow

## 🚀 Quick Start

### Running the Application

**Option 1: Production Mode (Recommended for daily use)**

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

**Option 2: Development Mode**

```bash
cd app
npm run dev
# Open http://localhost:3000
```

### Global CLI Installation (Optional)

To use `orphelix` command from anywhere:

```bash
cd app
npm link
```

Now you can use commands globally (auto-install on first run):
```bash
orphelix start                  # Auto-installs & starts!
orphelix start --port 8080      # Custom port
orphelix stop
orphelix logs
orphelix open --port 8080       # Open with custom port
```

### Features of Production Mode

✅ **Zero configuration** - Auto-installs dependencies and builds on first run
✅ **Custom hostname** - Automatically configures `orphelix.local` (requires sudo once)
✅ **Runs in background** - Close terminal, application keeps running
✅ **Fast startup** - Optimized standalone build
✅ **Auto-restart** - Automatically restarts on crashes
✅ **Log management** - Logs stored in `app/logs/`
✅ **Low resource usage** - Production-optimized build
✅ **Custom port** - Use `--port` flag or `ORPHELIX_PORT` env variable
✅ **Persistent storage** - SQLite database for settings (auto-created on first run)

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

## 💾 Data Storage

Orphelix uses a local SQLite database (`app/orphelix.db`) to persist:
- User preferences (theme, visual preset, compact mode)
- Application settings (auto-refresh, realtime updates)
- Cluster aliases (friendly names for contexts)
- GitHub integration settings (selected repo, pending PRs)
- Sidebar customization (pinned items)
- Critical issues monitoring preferences

**Database location:** `app/orphelix.db`
**Automatic migration:** On first run, existing localStorage settings are automatically migrated to SQLite
**Backup:** Simply copy `app/orphelix.db` to backup your settings

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

This project is distributed under the **Apache License 2.0**.

**Key Points:**
- ✅ Permissive, OSI-approved license for personal, commercial, and production use
- 🔁 Requires preservation of copyright and license notices
- ⚖️ Provides explicit patent grant and contribution terms
- 📘 See the [LICENSE](LICENSE) file for the full legal text
