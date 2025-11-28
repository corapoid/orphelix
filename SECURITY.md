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

Orphelix offers two methods for GitHub authentication, both used **exclusively for GitOps workflows** (editing YAML manifests and creating pull requests):

#### Why GitHub Access is Required?

GitHub authentication is **optional** and only needed if you want to use GitOps features:
- Edit Kubernetes manifest files stored in GitHub repositories
- Create pull requests with configuration changes
- Integrate with your existing GitOps workflow

**You can use Orphelix without GitHub** - the demo mode and cluster monitoring features work independently.

#### Method 1: GitHub OAuth (Simple)

- **What it does**: Authenticates you with your GitHub account
- **Permissions requested**:
  - `repo` - Read and write access to code repositories
  - `read:user` - Read basic user profile information
- **Data stored**: OAuth access token (encrypted in session cookie)
- **Token lifetime**: 8 hours (automatically refreshed)
- **Use case**: Quick setup for personal repositories

**Setup requirements:**
- GitHub OAuth App credentials (GITHUB_ID, GITHUB_SECRET)
- Configured in `.env.local`

#### Method 2: GitHub App (Recommended)

- **What it does**: Provides granular, repository-level permissions
- **Permissions requested**:
  - Contents: Read & Write (to read manifests and create commits)
  - Pull Requests: Read & Write (to create and merge PRs)
  - Metadata: Read (basic repository information)
- **Data stored**: Installation token (HTTP-only cookie, 8-hour expiry)
- **Token lifetime**: 8 hours with automatic refresh
- **Use case**: Teams with multiple repositories, organization accounts

**Advantages over OAuth:**
- Select specific repositories to grant access (not all-or-nothing)
- Granular permissions (only what's needed)
- Better audit trail (GitHub shows which app accessed what)
- Support for organization repositories with fine-grained control

**Setup requirements:**
- GitHub App created in your GitHub account/organization
- App credentials configured (GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, GITHUB_APP_CLIENT_ID, GITHUB_APP_CLIENT_SECRET)

**Security benefits:**
- Tokens are stored in HTTP-only cookies (not accessible via JavaScript)
- Automatic token rotation every 8 hours
- Revokable at any time from GitHub settings
- Works with organization security policies (SAML SSO, IP allowlists)

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

## 📚 Related Documentation

- [GitHub OAuth Setup Guide](docs/user/github/oauth-setup.mdx)
- [GitHub App Setup Guide](docs/user/github/github-app-setup.mdx)
- [Cluster Connection Guide](docs/user/cluster-connection.mdx)
- [Technical Architecture](TECHNICAL.md)

## ✅ Security Checklist

Before deploying Orphelix in your organization, verify:

- [ ] Kubeconfig has appropriate RBAC permissions (namespace-scoped recommended)
- [ ] GitHub App is configured with minimal required permissions
- [ ] Application runs on trusted machine (not shared/public computer)
- [ ] SQLite database permissions are restrictive (`chmod 600 orphelix.db`)
- [ ] Demo mode is used for public demonstrations (never real cluster data)
- [ ] Team members understand what data is stored and where
- [ ] Cluster audit logging is enabled for compliance

---

**Last Updated**: 2025-11-28
**Version**: 0.1.0
