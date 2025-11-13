# GitHub Integration Setup Guide

This guide explains how to set up GitHub App authentication for KubeVista's YAML editor and Pull Request workflow.

## Table of Contents

- [Why GitHub Integration?](#why-github-integration)
- [GitHub App Setup](#github-app-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

---

## Why GitHub Integration?

GitHub integration enables:
- **YAML Editing** - Edit Kubernetes manifests (Deployments, ConfigMaps, Secrets) directly from KubeVista
- **Pull Request Creation** - Automatically create PRs for your changes
- **PR Merge** - Merge approved PRs directly from the dashboard
- **Kustomization Support** - Detect and edit Kustomize base & overlays
- **GitOps Workflow** - Follow GitOps best practices with version control

---

## GitHub App Setup

### Why GitHub App?

- ✅ **Secure** - Fine-grained repository access
- ✅ **No personal tokens** - App has its own identity
- ✅ **Organization-friendly** - Centralized permission management
- ✅ **Higher rate limits** - Better API rate limits than OAuth

### Step 1: Create a GitHub App

#### For Personal Account

1. Go to [GitHub Settings → Developer settings → GitHub Apps](https://github.com/settings/apps)
2. Click **"New GitHub App"**

#### For Organization

1. Go to your organization → Settings → Developer settings → GitHub Apps
2. Click **"New GitHub App"**

### Step 2: Configure the GitHub App

Fill in the following fields:

| Field | Value |
|-------|-------|
| **GitHub App name** | `KubeVista` (or any unique name) |
| **Homepage URL** | `http://localhost:3000` (or your domain) |
| **Callback URL** | `http://localhost:3000/api/github-app/callback` |
| **Setup URL** | Leave empty |
| **Webhook** | ❌ Disable "Active" checkbox |

### Step 3: Set Permissions

Under **Repository permissions**, set:

| Permission | Access |
|------------|--------|
| **Contents** | Read and write |
| **Pull requests** | Read and write |
| **Metadata** | Read-only (automatically set) |

### Step 4: Install the App

1. After creating the app, click **"Install App"** (left sidebar)
2. Select **"All repositories"** or **"Only select repositories"**
3. Choose which repositories KubeVista can access
4. Click **"Install"**

### Step 5: Get Credentials

#### App ID
- On your GitHub App page, note the **"App ID"** (e.g., `123456`)

#### Installation ID
- After installing, you'll be redirected to a URL like:
  ```
  https://github.com/settings/installations/12345678
  ```
- The number at the end (`12345678`) is your **Installation ID**

#### Private Key
1. Scroll down on your GitHub App page
2. Click **"Generate a private key"**
3. A `.pem` file will download - keep this secure!

### Step 6: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# GitHub App Configuration
GITHUB_APP_ID=123456
GITHUB_APP_INSTALLATION_ID=12345678

# Option 1: Path to private key file
GITHUB_APP_PRIVATE_KEY_PATH=/path/to/your-app-name.2024-01-01.private-key.pem

# Option 2: Or inline private key (replace newlines with \n)
# GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIB...your-key-here...\n-----END RSA PRIVATE KEY-----"
```

**Important**: Add `.env.local` to `.gitignore` to avoid committing secrets!

---


## Environment Variables

### Complete .env.local Template

```bash
# === GitHub App Configuration (Option 1 - Recommended) ===
GITHUB_APP_ID=123456
GITHUB_APP_INSTALLATION_ID=12345678
GITHUB_APP_PRIVATE_KEY_PATH=/path/to/private-key.pem
# Or use inline key:
# GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"

# Note: OAuth support has been removed. GitHub App is the only supported method.

# === Other GitHub Settings (Optional) ===
# GITHUB_TOKEN=ghp_your_token_here  # For Flux GitOps
```

### Production Deployment

For production (e.g., Vercel, Docker):

```bash
# Use environment variables instead of .env.local
# Set these in your deployment platform:

GITHUB_APP_ID=123456
GITHUB_APP_INSTALLATION_ID=12345678
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIE...full-key-here...\n-----END RSA PRIVATE KEY-----"

# Or for OAuth:
GITHUB_CLIENT_ID=Iv1.a1b2c3d4e5f6g7h8
GITHUB_CLIENT_SECRET=your_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=https://your-domain.com
```

**Note**: For multi-line private keys in environment variables, replace actual newlines with `\n`.

---

## Usage

### Connect GitHub Account

#### Using GitHub App

1. Start KubeVista: `npm run dev`
2. Open http://localhost:3000
3. Go to **Settings** (top-right menu)
4. Under **GitHub Integration**, click **"Install GitHub App"**
5. You'll be redirected to GitHub to authorize the app
6. Select repositories and click **"Install"**
7. You'll be redirected back to KubeVista - you're connected!

### Select Repository

1. In Settings, under **GitHub Integration**
2. Select your repository from the dropdown
3. The selected repository will be used for YAML editing

### Edit YAML Files

1. Navigate to a **Deployment**, **ConfigMap**, or **Secret** detail page
2. Click the **"Edit YAML"** button (top-right)
3. A modal will open with:
   - File selector (lists all YAML files in the repository)
   - Monaco editor with syntax highlighting
   - Kustomization detection (if applicable)
4. Make your changes
5. Click **"Create Pull Request"**
6. A PR will be created automatically
7. You can:
   - **Close** - Close the modal
   - **View PR** - Open the PR on GitHub
   - **Merge Now** - Merge the PR immediately (be careful!)

---

## Troubleshooting

### "Please connect your GitHub account in Settings first"

**Problem**: You haven't connected KubeVista to GitHub yet.

**Solution**:
1. Go to Settings
2. Follow the GitHub App connection steps above

### "401 Unauthorized" when clicking Edit YAML

**Problem**: GitHub authentication token is invalid or expired.

**Solutions**:
- **For GitHub App**: Re-install the app from Settings

- Check environment variables are correctly set
- Restart the development server

### "Failed to fetch files" or "Failed to load file"

**Problem**: Repository permissions or app installation issue.

**Solutions**:
1. Verify the repository is accessible:
   - For GitHub App: Check installation covers the repository

2. Check the repository exists and you have access
3. Try selecting a different repository

### GitHub App - "Installation not found"

**Problem**: Installation ID is incorrect or app was uninstalled.

**Solutions**:
1. Go to https://github.com/settings/installations
2. Find your KubeVista app installation
3. Note the installation ID from the URL
4. Update `GITHUB_APP_INSTALLATION_ID` in `.env.local`
5. Restart the server

### OAuth - "invalid_client"

**Problem**: Client ID or Client Secret is incorrect.

**Solutions**:
1. Double-check `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
2. Ensure no extra spaces or quotes
3. Regenerate the client secret if needed
4. Update `.env.local` and restart

### Private Key Error (GitHub App)

**Problem**: "Invalid private key" or "PEM_read_bio_PrivateKey failed"

**Solutions**:
1. Ensure the `.pem` file path is correct
2. Check file permissions: `chmod 600 your-key.pem`
3. If using inline key, ensure newlines are `\n` not actual newlines
4. Verify the key hasn't been regenerated (you'd need to download a new one)

### Callback URL Mismatch

**Problem**: "Redirect URI mismatch" error

**Solutions**:
1. Ensure callback URLs match exactly:
   - GitHub App: `http://localhost:3000/api/github-app/callback`
   - OAuth: `http://localhost:3000/api/auth/callback/github`
2. For production, update URLs to your domain
3. No trailing slashes!

### PR Creation Fails

**Problem**: "Failed to create PR" error

**Solutions**:
1. Check GitHub app/OAuth has "Contents" and "Pull requests" permissions
2. Ensure you're not trying to create a PR with no changes
3. Check the base branch exists (usually `main` or `master`)
4. Verify you have write access to the repository

---

## Security Best Practices

### Protecting Secrets

1. **Never commit `.env.local`** to version control
   ```bash
   echo ".env.local" >> .gitignore
   ```

2. **Use secure storage** for private keys
   - Store `.pem` files outside the project directory
   - Use environment variables in production
   - Rotate keys regularly

3. **Limit permissions**
   - GitHub App: Only grant repository access as needed
   - OAuth: Use principle of least privilege

### Rate Limiting

- GitHub App: 5,000 requests/hour per installation
- OAuth: 5,000 requests/hour per user
- KubeVista caches repository data to minimize API calls

### Revoking Access

#### GitHub App
1. Go to https://github.com/settings/installations
2. Find KubeVista installation
3. Click "Configure" → "Uninstall"

#### OAuth
1. Go to https://github.com/settings/applications
2. Find KubeVista under "Authorized OAuth Apps"
3. Click "Revoke"

---

## Additional Resources

- [GitHub Apps Documentation](https://docs.github.com/en/apps)
- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [KubeVista Main README](../README.md)

---

## Need Help?

If you encounter issues not covered here:

1. Check the [KubeVista Issues](https://github.com/your-username/kubevista/issues)
2. Search for existing similar problems
3. Create a new issue with:
   - Authentication method (GitHub App or OAuth)
   - Error messages
   - Steps to reproduce
   - Environment (OS, Node version, etc.)

---

**Last Updated**: 2024-01-13
**Version**: KubeVista 1.2.0
