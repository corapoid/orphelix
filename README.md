# KubeVista

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/yourusername/kubevista)
[![License](https://img.shields.io/badge/license-MPL--2.0-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://reactjs.org/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/yourusername/kubevista)

> A modern, full-featured Kubernetes dashboard with real-time updates and GitOps integration

**KubeVista** is a comprehensive web dashboard for monitoring and managing Kubernetes resources. The application offers a demo mode with realistic test data, live updates via Server-Sent Events, pod management, topology visualization, and Flux GitOps support.

## ✨ Features

### 🎯 Resource Monitoring
- **Deployments** - Complete deployment overview with replicas and status
- **Pods** - Pod list with logs, status, and container management
- **Nodes** - Cluster node monitoring with resource metrics
- **ConfigMaps & Secrets** - Application configuration management
- **HPA** - Horizontal Pod Autoscaler with scaling metrics
- **Persistent Volumes** - Persistent storage management
- **Events** - Chronological cluster event timeline

### 📊 Real-time Updates
- Automatic cluster synchronization via Server-Sent Events (SSE)
- Visual connection status indicator
- Automatic reconnection on connection loss
- Heartbeat monitoring (every 30s)

### 🎨 Demo Mode
- Demonstration mode with realistic test data
- No Kubernetes cluster requirements
- Perfect for presentations and UI testing
- Toggle between demo and real cluster modes

### 🌐 Topology Visualization
- Interactive resource dependency graphs
- Visualization of relationships between deployments, pods, and services
- Pan, zoom, and fit-to-view controls

### 🔄 Pod Management
- Container log viewer with search and download
- Restart pods directly from the interface
- Confirmation dialog with consequence warnings
- Multi-container pod support

### 📝 Flux GitOps Integration
- Support for Flux resources (GitRepository, Kustomization, HelmRelease)
- GitOps synchronization status information

### 🌓 Customization
- Toggle between light and dark themes
- Responsive design for mobile and desktop devices
- User preference persistence

## 📋 Requirements

- **Node.js** 20 or higher
- **kubectl** configured with cluster access (for real mode)
- (Optional) **GitHub Personal Access Token** (for Flux integration)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kubevista
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

#### Development Mode
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

#### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm start
```

### 4. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

The application starts in **demo mode** by default with sample data.

## 📖 Usage

### Demo Mode (Default)

The application starts in **demo mode**, displaying realistic test data. This is ideal for:

- **Presentations** - Showcase functionality without cluster access
- **UI Testing** - Test the interface without risk of cluster changes
- **Demonstrations** - Present the dashboard without technical requirements

You'll see a **"DEMO MODE"** badge at the top - click it to switch to a real cluster.

### Real Mode

To connect to a real Kubernetes cluster:

1. **Ensure kubectl is configured:**
   ```bash
   kubectl config current-context
   kubectl get pods
   ```

2. **Switch to real mode:**
   - Click the **"DEMO MODE"** badge in the header
   - Select a Kubernetes context from the list (e.g., EKS, GKE, AKS)
   - The dashboard will automatically connect to the cluster

3. **Select namespace:**
   - After connecting, a **"Namespace"** dropdown will appear
   - Select a namespace from the list (e.g., `production`, `staging`, `default`)
   - All resources will be displayed from the selected namespace

4. **Enable real-time updates (optional):**
   - Toggle the **"Real-time Updates"** switch in the header
   - The connection status indicator will show SSE state
   - Resources will automatically refresh

### Core Features

#### 📊 Main Dashboard
- Summary of all cluster resources
- Quick statistics (deployment count, pods, nodes)
- Recent cluster events

#### 🚀 Deployment Management
- List of all deployments with status
- Deployment details with pod overview
- Replica information (desired/ready/available)
- Deployment-related event history

#### 🐳 Pod Management
- List of all pods with status filtering
- Pod details with metadata and status
- **Container log viewer:**
  - Log search functionality
  - Download logs to file
  - Auto-scroll to latest entries
  - Container selection (for multi-container pods)
- **Pod restart:**
  - "Restart Pod" button in pod details
  - Confirmation dialog with warnings
  - Automatic refresh after restart

#### 🖥️ Cluster Nodes
- List of all nodes with metrics
- CPU and memory utilization
- Resource capacity and availability
- Node status (Ready/NotReady)

#### ⚙️ ConfigMaps and Secrets
- List of all ConfigMaps and Secrets
- View keys and values (Secrets are masked)
- Information about pod usage

#### 📈 Horizontal Pod Autoscaler (HPA)
- List of all HPAs
- Scaling metrics (CPU/Memory)
- Target and current replica count
- HPA status and conditions

#### 💾 Persistent Volumes
- List of all PVs and PVCs
- Status (Available/Bound/Released)
- Capacity and storage class
- Reclaim policy

#### 📝 Events
- Chronological list of all cluster events
- Filter by type (Normal/Warning)
- Search through events
- Resource information related to events

#### 🌐 Topology
- Interactive dependency graph between resources
- Visualization of Deployment → Pod → Node relationships
- Navigation controls (zoom, pan, fit-to-view)

#### 📦 Flux GitOps
- Flux CD integration information
- Support for GitRepository, Kustomization, HelmRelease
- GitOps configuration instructions

## ⚙️ Configuration

### Cluster Connection

The application automatically detects kubectl configuration:

1. **In-cluster** - If the application runs inside a Kubernetes cluster
2. **Kubeconfig** - Uses `~/.kube/config` from the local system

By default, the application connects to the **default** namespace. You can change this via the namespace selector in the UI.

### GitHub Token (for Flux)

If you want to use Flux GitOps features:

```bash
export GITHUB_TOKEN=your_github_personal_access_token
```

The token should have permissions to Git repositories used by Flux.

## 🐳 Docker

### Run with Docker

```bash
# Build image
docker build -t kubevista .

# Run container (mounting kubeconfig)
docker run -p 3000:3000 \
  -v ~/.kube/config:/root/.kube/config:ro \
  kubevista
```

### Docker Compose

```yaml
version: '3.8'
services:
  dashboard:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ~/.kube/config:/root/.kube/config:ro
    environment:
      - NODE_ENV=production
```

Run with:
```bash
docker-compose up
```

## 🔒 Security

- ✅ **Local credentials** - Uses kubeconfig from local system
- ✅ **No data storage** - All data fetched on demand
- ✅ **Secrets are masked** - Secret values are not displayed in UI
- ✅ **Read-only by default** - Most operations are read-only (except pod restart)

## 💬 Support and Help

### Reporting Issues

If you encounter problems or have suggestions for new features, use [GitHub Issues](https://github.com/your-username/kubevista/issues).

### Frequently Asked Questions

**Q: Can I use the application without a Kubernetes cluster?**
A: Yes! Use demo mode (default on startup).

**Q: How do I connect to my cluster?**
A: Ensure `kubectl` is working, then click the "DEMO MODE" badge and select a context.

**Q: Can I restart pods?**
A: Yes, go to pod details and click "Restart Pod".

**Q: Can I monitor multiple namespaces?**
A: The application currently focuses on one namespace at a time. You can switch namespaces using the dropdown selector.

**Q: Are real-time updates safe?**
A: Yes, we use Server-Sent Events (SSE) with Kubernetes Watch API - the connection is read-only.

## 📄 License

This project is licensed under the **Mozilla Public License 2.0** (MPL-2.0).

**Key Points:**
- ✅ **Attribution Required** - Modified versions must credit the original project
- ✅ **File-level Copyleft** - Modified files must remain open source under MPL-2.0
- ✅ **Commercial Use Allowed** - Can be used in commercial projects
- ✅ **Patent Protection** - Grants patent rights and protects against patent claims
- ✅ **Compatible with Proprietary Code** - Can be combined with closed-source software

See the [LICENSE](LICENSE) file for full details.

## 📚 Documentation

- **[CHANGELOG.md](CHANGELOG.md)** - Complete version history
- **[TECHNICAL.md](TECHNICAL.md)** - Technical documentation for developers
- **[TESTING.md](TESTING.md)** - Testing instructions with cluster

---

<div align="center">
  <p>Made with ❤️ for the Kubernetes community</p>
  <p>
    <a href="#kubevista">Back to top ↑</a>
  </p>
</div>
