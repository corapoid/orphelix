# Security & Data Privacy

This document explains how Orphelix handles authentication, data storage, and cluster access to ensure your Kubernetes infrastructure remains secure.

## 🔐 Core Security Principles

Orphelix is built with security and privacy as top priorities:

1. **Local-First Architecture** - All cluster access uses your local kubectl configuration
2. **No Cloud Dependencies** - Application runs entirely on your machine
3. **Minimal Data Storage** - Only UI preferences are stored locally
4. **No Credential Storage** - Kubernetes credentials never leave your kubeconfig
5. **Read-Only by Default** - Most operations are read-only (except explicit actions like pod restart)

## 🔑 Authentication & Access Control

### GitHub Authentication

Orphelix uses **two separate GitHub authentication mechanisms** for different purposes:

#### 1. GitHub OAuth - **Required for Login** (Production Mode)

**Purpose**: Authenticate users to access the application in "real" (non-demo) mode.

- **What it does**: Logs you into Orphelix using your GitHub account
- **When it's used**: Every time you access Orphelix in production mode (to view real cluster data)
- **Permissions requested**:
  - `read:user` - Read basic user profile information (username, avatar)
- **Data stored**: OAuth session token (encrypted in NextAuth session cookie)
- **Token lifetime**: 30 days (managed by NextAuth)
- **Required**: ✅ **YES** - to use production mode and view real cluster data

**Setup requirements:**
```bash
# .env.local
GITHUB_ID=Ov23limD8PcdQGpLjpyT
GITHUB_SECRET=8078d86a252370bf498469f5b2a4043136656682
```

**Without OAuth:**
- ❌ Cannot access production mode
- ✅ Can still use demo mode (no login required)
- ❌ Cannot view real cluster resources

---

#### 2. GitHub App - **Optional for GitOps Workflow**

**Purpose**: Edit Kubernetes manifests and create pull requests (GitOps features).

- **What it does**: Provides granular, repository-level access to your manifest repositories
- **When it's used**: Only when you click "Edit YAML" or create pull requests
- **Permissions requested**:
  - Contents: Read & Write (to read manifests and create commits)
  - Pull Requests: Read & Write (to create and merge PRs)
  - Metadata: Read (basic repository information)
- **Data stored**: Installation token (HTTP-only cookie, 8-hour expiry)
- **Token lifetime**: 8 hours with automatic refresh
- **Required**: ❌ **NO** - only needed for GitOps features

**Setup requirements:**
```bash
# .env.local (in addition to OAuth above)
GITHUB_APP_ID=2374024
GITHUB_APP_CLIENT_ID=Iv23liQcua8GpiX6UdCa
GITHUB_APP_CLIENT_SECRET=ghs_xxxxx
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"
```

**Advantages of GitHub App:**
- ✅ Select specific repositories to grant access (not all-or-nothing)
- ✅ Granular permissions (only what's needed for GitOps)
- ✅ Better audit trail (GitHub shows which app accessed what)
- ✅ Support for organization repositories with fine-grained control
- ✅ Works independently of user OAuth token (team members don't need OAuth access to manifest repos)

**Without GitHub App:**
- ✅ Can still login and view cluster resources
- ✅ Can still use all monitoring features
- ❌ Cannot edit YAML manifests
- ❌ Cannot create pull requests

---

#### Summary: What Do You Need?

| Use Case | GitHub OAuth | GitHub App | Demo Mode |
|----------|--------------|------------|-----------|
| **Try Orphelix (demo mode)** | ❌ Not needed | ❌ Not needed | ✅ Default |
| **View real cluster** | ✅ **Required** | ❌ Not needed | ❌ Disabled |
| **Edit manifests + GitOps** | ✅ **Required** | ✅ **Required** | ❌ Disabled |

**Recommended setup path:**
1. **Start with demo mode** - No GitHub needed, explore the UI
2. **Add OAuth** - Login to view your real cluster
3. **Add GitHub App (optional)** - Enable GitOps workflow when needed

**Why two separate authentications?**
- **NextAuth requires OAuth** for user login (doesn't support GitHub App login)
- **GitHub App provides better permissions** for repository access (granular, per-repo)
- This separation allows you to use Orphelix for monitoring without giving it access to your code repositories

### Route Protection

- **Server-Side Middleware** - NextAuth v5 with proxy.ts middleware validates all routes
- **Cannot be bypassed** - Protection runs server-side before page rendering
- **Cookie-Based Sessions** - HTTP-only cookies prevent XSS attacks
- **Demo Mode Validation** - Even demo mode is validated server-side via cookies

## 🎯 Kubernetes Cluster Access

### How Cluster Connection Works

Orphelix uses **your local kubectl configuration** to access Kubernetes clusters. This means:

1. **Local Kubeconfig** - Reads from `~/.kube/config` (standard kubectl location)
2. **Your Credentials** - Uses the same authentication method kubectl uses:
   - Client certificates
   - Bearer tokens
   - OIDC tokens
   - Cloud provider authentication (AWS, GCP, Azure)
3. **Direct API Calls** - Communicates directly with Kubernetes API server
4. **No Proxy/Gateway** - No intermediate servers between you and your cluster

### Prerequisites for Real Mode

For Orphelix to connect to your cluster, you need:

```bash
# kubectl must be configured and working
kubectl get pods --all-namespaces

# Test cluster connectivity
kubectl cluster-info

# Verify current context
kubectl config current-context
```

If `kubectl` commands work, Orphelix will work too - it uses the **exact same credentials**.

### Multi-Cluster Support

Orphelix reads all contexts from your kubeconfig:

```yaml
# Example ~/.kube/config
contexts:
- name: production-cluster
  context:
    cluster: prod-k8s
    user: admin
- name: staging-cluster
  context:
    cluster: staging-k8s
    user: developer
```

You can switch between clusters in the UI - Orphelix will use the appropriate credentials from kubeconfig.

### Namespace-Scoped Access

If your kubeconfig is configured with namespace-scoped RBAC (common in multi-tenant environments):

- Orphelix will only show resources you have permission to access
- API calls respect your RBAC roles and role bindings
- No elevation of privileges - you see exactly what `kubectl` would show

Example RBAC scenario:
```yaml
# You have view access to "team-a" namespace
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-binding
  namespace: team-a
roleRef:
  name: view
subjects:
- kind: User
  name: your-user
```

Orphelix will respect this and only show resources in `team-a` namespace.

## 💾 Data Storage

### What is Stored Locally?

Orphelix uses a local SQLite database (`orphelix.db`) to store **only UI preferences**:

| Data Type | Purpose | Example |
|-----------|---------|---------|
| Theme Settings | Dark/light mode preference | `"dark"` |
| Resource Aliases | Custom names for deployments | `"api" → "Main API Server"` |
| GitHub Settings | Selected repository, branch | `"myorg/k8s-configs", "main"` |
| Sidebar Pins | Pinned items in navigation | `["deployments", "pods"]` |
| Notification Settings | Desktop notification preferences | `enabled: true` |
| OpenAI API Key | For AI-powered troubleshooting | Encrypted in localStorage |

**Database Location:**
- Standalone mode: `app/.next/standalone/orphelix/app/orphelix.db`
- Development mode: `app/orphelix.db`

### What is NOT Stored?

❌ **Kubernetes Cluster Data:**
- Pods, Deployments, Services, ConfigMaps, Secrets
- Resource metrics (CPU, memory)
- Logs, Events, YAML manifests
- **Everything is fetched on-demand from the cluster**

❌ **Credentials:**
- Kubeconfig contents
- Kubernetes API tokens
- GitHub personal access tokens (only session cookies)
- Secret values (always masked in UI)

❌ **User Data:**
- No email addresses
- No personal information beyond GitHub OAuth profile (username, avatar)
- No tracking or analytics

### Session Storage (Cookies)

| Cookie Name | Purpose | Lifetime | Security |
|-------------|---------|----------|----------|
| `authjs.session-token` | NextAuth session | 30 days | HTTP-only, Secure, SameSite=Lax |
| `authjs.csrf-token` | CSRF protection | Session | HTTP-only, Secure, SameSite=Lax |
| `app-mode` | Demo/Real mode flag | 1 year | Not HTTP-only (read by server middleware) |
| `github-app-token` | GitHub App installation token | 8 hours | HTTP-only, Secure, SameSite=Lax |

### Browser LocalStorage

| Key | Purpose | Sensitivity |
|-----|---------|-------------|
| `orphelix-theme-mode` | UI theme preference | Low (public) |
| `openai-api-key` | User's OpenAI key for AI features | High (encrypted at rest) |
| `github-repo` | Selected GitHub repository | Low (public) |

## 🛡️ Security Best Practices

### For Users

1. **Protect Your Kubeconfig**
   ```bash
   # Ensure kubeconfig has correct permissions
   chmod 600 ~/.kube/config
   ```

2. **Use GitHub App (Not OAuth)** - Better security with granular permissions

3. **Review Permissions** - Check what repositories Orphelix can access:
   - GitHub → Settings → Applications → Orphelix

4. **Revoke Access Anytime**:
   ```bash
   # GitHub tokens can be revoked from GitHub settings
   # Orphelix will stop working until re-authenticated
   ```

5. **Use Demo Mode for Public Demos** - Never expose real cluster data in screenshots/demos

### For Administrators

1. **RBAC Configuration**
   - Grant minimum required permissions using Kubernetes RBAC
   - Use namespace-scoped roles, not cluster-wide
   - Example role for read-only access:
   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: Role
   metadata:
     name: orphelix-viewer
   rules:
   - apiGroups: ["", "apps", "batch"]
     resources: ["pods", "deployments", "jobs", "services"]
     verbs: ["get", "list", "watch"]
   ```

2. **Network Security**
   - Orphelix runs locally - no external network exposure required
   - Uses HTTPS when connecting to Kubernetes API (respects kubeconfig)
   - No inbound connections needed

3. **Audit Logging**
   - All Kubernetes API calls are logged by K8s audit logs (not by Orphelix)
   - Check cluster audit logs for Orphelix activity:
   ```bash
   # Filter by user agent
   kubectl logs -n kube-system <apiserver-pod> | grep "Orphelix"
   ```

## 🔒 Secret Handling

### ConfigMaps & Secrets

- **Secrets are always masked** in the UI (displayed as `********`)
- **No secret values logged** - Not in application logs or browser console
- **Base64 decoded** for display purposes only (never sent to external services)
- **Read-only by default** - Secrets cannot be modified from UI

### GitHub Tokens

- **OAuth Tokens**: Stored in encrypted NextAuth session cookies
- **GitHub App Tokens**: HTTP-only cookies, automatically rotated every 8 hours
- **Never logged** - Token values never appear in application logs
- **Revokable**: Users can revoke access from GitHub settings at any time

## 📝 Compliance & Privacy

### GDPR Compliance

- **No personal data collection** - Only GitHub profile (username, avatar) if OAuth is used
- **Local data storage** - Database never leaves your machine
- **Right to deletion** - Delete `orphelix.db` to remove all stored preferences
- **No tracking** - No analytics, no telemetry, no external API calls (except GitHub/OpenAI if configured)

### Data Retention

- **SQLite Database**: Persists until manually deleted
- **Session Cookies**: Expire after 30 days (NextAuth) or 8 hours (GitHub App)
- **Logs**: Application logs rotate automatically (managed by PM2)

## 🚨 Security Vulnerabilities

If you discover a security vulnerability in Orphelix:

1. **Do NOT open a public issue**
2. **Email**: [security contact - to be added]
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact

We take security seriously and will respond within 48 hours.

## 🔍 Security Scanning with Nuclei

Orphelix includes custom [Nuclei](https://github.com/projectdiscovery/nuclei) templates for automated security testing.

### Installation

```bash
# Install Nuclei
brew install nuclei  # macOS
# or
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
```

### Running Security Scans

```bash
# Scan local development instance
nuclei -t .nuclei-templates/ -u http://localhost:3000

# Specific security checks
nuclei -t .nuclei-templates/orphelix-api-security.yaml -u http://localhost:3000
nuclei -t .nuclei-templates/orphelix-rate-limiting.yaml -u http://localhost:3000
nuclei -t .nuclei-templates/orphelix-xss-protection.yaml -u http://localhost:3000
nuclei -t .nuclei-templates/orphelix-sql-injection.yaml -u http://localhost:3000

# Generate report
nuclei -t .nuclei-templates/ -u http://localhost:3000 -json -o security-scan.json
```

### Available Templates

| Template | Purpose | Severity |
|----------|---------|----------|
| `orphelix-api-security.yaml` | API endpoint security headers | Info |
| `orphelix-rate-limiting.yaml` | Rate limit enforcement | Medium |
| `orphelix-xss-protection.yaml` | XSS prevention mechanisms | High |
| `orphelix-sql-injection.yaml` | SQL injection protection | Critical |

### CI/CD Integration

Add to `.github/workflows/security-scan.yml`:

```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  nuclei:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Nuclei
        run: go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
      - name: Run Security Scan
        run: |
          npm run build && npm run start &
          sleep 10
          nuclei -t .nuclei-templates/ -u http://localhost:3000 -json -o scan-results.json
```

See [`.nuclei-templates/README.md`](.nuclei-templates/README.md) for detailed documentation.

## 📚 Related Documentation

- [GitHub OAuth Setup Guide](docs/user/github/oauth-setup.mdx)
- [GitHub App Setup Guide](docs/user/github/github-app-setup.mdx)
- [Cluster Connection Guide](docs/user/cluster-connection.mdx)
- [Technical Architecture](TECHNICAL.md)
- [Nuclei Templates](.nuclei-templates/README.md)
- [Security Report](SECURITY_REPORT.md)

## ✅ Security Checklist

Before deploying Orphelix in your organization, verify:

- [ ] Kubeconfig has appropriate RBAC permissions (namespace-scoped recommended)
- [ ] GitHub App is configured with minimal required permissions
- [ ] Application runs on trusted machine (not shared/public computer)
- [ ] SQLite database permissions are restrictive (`chmod 600 orphelix.db`)
- [ ] Demo mode is used for public demonstrations (never real cluster data)
- [ ] Team members understand what data is stored and where
- [ ] Cluster audit logging is enabled for compliance
- [ ] Nuclei security scans pass without critical findings
- [ ] Rate limiting is properly configured for production load
- [ ] All security headers are enabled in production

---

**Last Updated**: 2025-11-29
**Version**: 0.1.1
