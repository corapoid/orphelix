module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/lib/github/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GitHubClient",
    ()=>GitHubClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@octokit/rest/dist-src/index.js [app-route] (ecmascript)");
;
class GitHubClient {
    octokit;
    constructor(accessToken){
        this.octokit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Octokit"]({
            auth: accessToken
        });
    }
    /**
   * List user's repositories
   */ async listRepositories() {
        const { data } = await this.octokit.repos.listForAuthenticatedUser({
            sort: 'updated',
            per_page: 100
        });
        return data.map((repo)=>({
                owner: repo.owner.login,
                repo: repo.name,
                fullName: repo.full_name,
                defaultBranch: repo.default_branch || 'main'
            }));
    }
    /**
   * List YAML files in repository (recursive)
   */ async listYamlFiles(owner, repo, path = '', ref = 'main') {
        const files = [];
        try {
            const { data } = await this.octokit.repos.getContent({
                owner,
                repo,
                path,
                ref
            });
            if (Array.isArray(data)) {
                for (const item of data){
                    if (item.type === 'file' && (item.name.endsWith('.yaml') || item.name.endsWith('.yml'))) {
                        files.push({
                            name: item.name,
                            path: item.path,
                            sha: item.sha,
                            type: 'file'
                        });
                    } else if (item.type === 'dir') {
                        // Recursively search subdirectories
                        const subFiles = await this.listYamlFiles(owner, repo, item.path, ref);
                        files.push(...subFiles);
                    }
                }
            }
        } catch (error) {
            console.error(`Error listing files in ${path}:`, error);
        }
        return files;
    }
    /**
   * Get file content
   */ async getFileContent(owner, repo, path, ref = 'main') {
        const { data } = await this.octokit.repos.getContent({
            owner,
            repo,
            path,
            ref
        });
        if ('content' in data && data.type === 'file') {
            const content = Buffer.from(data.content, 'base64').toString('utf-8');
            return {
                content,
                sha: data.sha
            };
        }
        throw new Error('Path is not a file');
    }
    /**
   * Detect if directory contains kustomization.yaml
   */ async detectKustomization(owner, repo, dirPath, ref = 'main') {
        try {
            const { data } = await this.octokit.repos.getContent({
                owner,
                repo,
                path: dirPath,
                ref
            });
            if (Array.isArray(data)) {
                return data.some((item)=>item.type === 'file' && (item.name === 'kustomization.yaml' || item.name === 'kustomization.yml'));
            }
            return false;
        } catch  {
            return false;
        }
    }
    /**
   * Get Kustomize structure (base + overlays)
   */ async getKustomizeStructure(owner, repo, filePath, ref = 'main') {
        const dirPath = filePath.substring(0, filePath.lastIndexOf('/'));
        const hasKustomization = await this.detectKustomization(owner, repo, dirPath, ref);
        if (!hasKustomization) {
            return {
                hasKustomization: false,
                basePath: null,
                overlays: [],
                baseFiles: [],
                overlayFiles: {}
            };
        }
        // Check if this is a base or overlay directory
        const isBase = dirPath.endsWith('/base') || !dirPath.includes('overlay');
        let basePath;
        let overlayParentPath;
        if (isBase) {
            basePath = dirPath;
            overlayParentPath = dirPath.replace('/base', '/overlays');
        } else {
            // We're in an overlay
            const overlayMatch = dirPath.match(/(.*)\/overlays\/([^/]+)/);
            if (overlayMatch) {
                basePath = `${overlayMatch[1]}/base`;
                overlayParentPath = `${overlayMatch[1]}/overlays`;
            } else {
                basePath = dirPath;
                overlayParentPath = `${dirPath}/overlays`;
            }
        }
        // Get base files
        const baseFiles = await this.listYamlFiles(owner, repo, basePath, ref);
        // Get overlay directories
        const overlays = [];
        const overlayFiles = {};
        try {
            const { data: overlayData } = await this.octokit.repos.getContent({
                owner,
                repo,
                path: overlayParentPath,
                ref
            });
            if (Array.isArray(overlayData)) {
                const overlayDirs = overlayData.filter((item)=>item.type === 'dir').map((item)=>item.name);
                overlays.push(...overlayDirs);
                // Get files for each overlay
                for (const overlay of overlayDirs){
                    const overlayPath = `${overlayParentPath}/${overlay}`;
                    overlayFiles[overlay] = await this.listYamlFiles(owner, repo, overlayPath, ref);
                }
            }
        } catch  {
        // No overlays directory - this is fine
        }
        return {
            hasKustomization: true,
            basePath,
            overlays,
            baseFiles,
            overlayFiles
        };
    }
    /**
   * Merge a pull request
   */ async mergePullRequest(owner, repo, pullNumber, mergeMethod = 'merge') {
        try {
            const { data } = await this.octokit.pulls.merge({
                owner,
                repo,
                pull_number: pullNumber,
                merge_method: mergeMethod
            });
            return {
                merged: true,
                message: data.message
            };
        } catch (error) {
            return {
                merged: false,
                message: error.message || 'Failed to merge PR'
            };
        }
    }
    /**
   * List all branches in a repository
   */ async listBranches(owner, repo) {
        const { data } = await this.octokit.repos.listBranches({
            owner,
            repo,
            per_page: 100
        });
        return data.map((branch)=>({
                name: branch.name,
                protected: branch.protected
            }));
    }
    /**
   * Get full repository tree (all files and directories)
   */ async getRepositoryTree(owner, repo, ref = 'main', path = '') {
        try {
            const { data } = await this.octokit.repos.getContent({
                owner,
                repo,
                path,
                ref
            });
            if (!Array.isArray(data)) {
                // Single file
                return [
                    {
                        name: data.name,
                        path: data.path,
                        type: 'file',
                        size: data.size
                    }
                ];
            }
            // Directory - return all items
            return data.map((item)=>({
                    name: item.name,
                    path: item.path,
                    type: item.type === 'dir' ? 'dir' : 'file',
                    size: item.type === 'file' ? item.size : undefined
                }));
        } catch (error) {
            console.error(`Error getting tree for ${path}:`, error);
            return [];
        }
    }
    /**
   * Create a new branch
   */ async createBranch(owner, repo, baseBranch, newBranch) {
        const { data: ref } = await this.octokit.git.getRef({
            owner,
            repo,
            ref: `heads/${baseBranch}`
        });
        await this.octokit.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${newBranch}`,
            sha: ref.object.sha
        });
    }
    /**
   * Commit file changes
   */ async commitFile(owner, repo, branch, path, content, sha, message) {
        await this.octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message,
            content: Buffer.from(content).toString('base64'),
            branch,
            sha
        });
    }
    /**
   * Create Pull Request
   */ async createPullRequest(owner, repo, title, head, base, body) {
        const { data } = await this.octokit.pulls.create({
            owner,
            repo,
            title,
            head,
            base,
            body
        });
        return {
            number: data.number,
            url: data.html_url
        };
    }
    /**
   * Check if PR is merged
   */ async isPullRequestMerged(owner, repo, prNumber) {
        try {
            await this.octokit.pulls.checkIfMerged({
                owner,
                repo,
                pull_number: prNumber
            });
            return true;
        } catch  {
            return false;
        }
    }
    /**
   * List open PRs for a specific file
   */ async getOpenPRsForFile(owner, repo, filePath) {
        const { data: pulls } = await this.octokit.pulls.list({
            owner,
            repo,
            state: 'open',
            per_page: 100
        });
        const prsForFile = [];
        for (const pull of pulls){
            const { data: files } = await this.octokit.pulls.listFiles({
                owner,
                repo,
                pull_number: pull.number
            });
            if (files.some((file)=>file.filename === filePath)) {
                prsForFile.push({
                    number: pull.number,
                    title: pull.title,
                    url: pull.html_url
                });
            }
        }
        return prsForFile;
    }
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/lib/github/get-token.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGitHubToken",
    ()=>getGitHubToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
async function getGitHubToken() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const githubAppToken = cookieStore.get('github_app_token')?.value;
    return githubAppToken || null;
}
}),
"[project]/app/lib/mocks/github-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock data for GitHub repository browser
__turbopack_context__.s([
    "getMockFileContent",
    ()=>getMockFileContent,
    "getMockRepositoryTree",
    ()=>getMockRepositoryTree,
    "mockGitHubRepo",
    ()=>mockGitHubRepo
]);
// Mock repository tree structure
const mockTree = {
    '/': [
        {
            name: 'k8s',
            path: 'k8s',
            type: 'dir'
        },
        {
            name: 'README.md',
            path: 'README.md',
            type: 'file',
            size: 1234
        },
        {
            name: '.gitignore',
            path: '.gitignore',
            type: 'file',
            size: 456
        }
    ],
    'k8s': [
        {
            name: 'base',
            path: 'k8s/base',
            type: 'dir'
        },
        {
            name: 'overlays',
            path: 'k8s/overlays',
            type: 'dir'
        },
        {
            name: 'deployments',
            path: 'k8s/deployments',
            type: 'dir'
        },
        {
            name: 'services',
            path: 'k8s/services',
            type: 'dir'
        },
        {
            name: 'configmaps',
            path: 'k8s/configmaps',
            type: 'dir'
        },
        {
            name: 'namespace.yaml',
            path: 'k8s/namespace.yaml',
            type: 'file',
            size: 234
        }
    ],
    'k8s/base': [
        {
            name: 'kustomization.yaml',
            path: 'k8s/base/kustomization.yaml',
            type: 'file',
            size: 345
        },
        {
            name: 'frontend-deployment.yaml',
            path: 'k8s/base/frontend-deployment.yaml',
            type: 'file',
            size: 1200
        },
        {
            name: 'frontend-service.yaml',
            path: 'k8s/base/frontend-service.yaml',
            type: 'file',
            size: 400
        }
    ],
    'k8s/overlays': [
        {
            name: 'dev',
            path: 'k8s/overlays/dev',
            type: 'dir'
        },
        {
            name: 'prod',
            path: 'k8s/overlays/prod',
            type: 'dir'
        }
    ],
    'k8s/overlays/dev': [
        {
            name: 'kustomization.yaml',
            path: 'k8s/overlays/dev/kustomization.yaml',
            type: 'file',
            size: 250
        }
    ],
    'k8s/overlays/prod': [
        {
            name: 'kustomization.yaml',
            path: 'k8s/overlays/prod/kustomization.yaml',
            type: 'file',
            size: 280
        }
    ],
    'k8s/deployments': [
        {
            name: 'frontend.yaml',
            path: 'k8s/deployments/frontend.yaml',
            type: 'file',
            size: 1567
        },
        {
            name: 'backend.yaml',
            path: 'k8s/deployments/backend.yaml',
            type: 'file',
            size: 1823
        },
        {
            name: 'database.yaml',
            path: 'k8s/deployments/database.yaml',
            type: 'file',
            size: 2134
        }
    ],
    'k8s/services': [
        {
            name: 'frontend-svc.yaml',
            path: 'k8s/services/frontend-svc.yaml',
            type: 'file',
            size: 456
        },
        {
            name: 'backend-svc.yaml',
            path: 'k8s/services/backend-svc.yaml',
            type: 'file',
            size: 512
        },
        {
            name: 'database-svc.yaml',
            path: 'k8s/services/database-svc.yaml',
            type: 'file',
            size: 478
        }
    ],
    'k8s/configmaps': [
        {
            name: 'app-config.yaml',
            path: 'k8s/configmaps/app-config.yaml',
            type: 'file',
            size: 789
        },
        {
            name: 'nginx-config.yaml',
            path: 'k8s/configmaps/nginx-config.yaml',
            type: 'file',
            size: 1024
        }
    ]
};
// Mock file contents
const mockFiles = {
    'README.md': `# Demo Application

This is a demo Kubernetes application for Orphelix.

## Structure

- \`k8s/deployments\` - Application deployments
- \`k8s/services\` - Kubernetes services
- \`k8s/configmaps\` - Configuration files

## Usage

Apply the manifests:

\`\`\`bash
kubectl apply -f k8s/
\`\`\`
`,
    '.gitignore': `node_modules/
.next/
dist/
build/
*.log
.DS_Store
.env.local
`,
    'k8s/namespace.yaml': `apiVersion: v1
kind: Namespace
metadata:
  name: demo-app
  labels:
    environment: production
`,
    'k8s/deployments/frontend.yaml': `apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: demo-app
  labels:
    app: frontend
    tier: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
        tier: web
    spec:
      containers:
      - name: frontend
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "256Mi"
            cpu: "500m"
`,
    'k8s/deployments/backend.yaml': `apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: demo-app
  labels:
    app: backend
    tier: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
        tier: api
    spec:
      containers:
      - name: backend
        image: node:18-alpine
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_HOST
          value: database-svc
        - name: NODE_ENV
          value: production
        resources:
          requests:
            memory: "256Mi"
            cpu: "500m"
          limits:
            memory: "512Mi"
            cpu: "1000m"
`,
    'k8s/deployments/database.yaml': `apiVersion: apps/v1
kind: Deployment
metadata:
  name: database
  namespace: demo-app
  labels:
    app: database
    tier: data
spec:
  replicas: 1
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      labels:
        app: database
        tier: data
    spec:
      containers:
      - name: postgres
        image: postgres:14
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: appdb
        - name: POSTGRES_USER
          value: admin
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
`,
    'k8s/services/frontend-svc.yaml': `apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
  namespace: demo-app
spec:
  type: LoadBalancer
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
`,
    'k8s/services/backend-svc.yaml': `apiVersion: v1
kind: Service
metadata:
  name: backend-svc
  namespace: demo-app
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
  - port: 3000
    targetPort: 3000
    protocol: TCP
`,
    'k8s/services/database-svc.yaml': `apiVersion: v1
kind: Service
metadata:
  name: database-svc
  namespace: demo-app
spec:
  type: ClusterIP
  selector:
    app: database
  ports:
  - port: 5432
    targetPort: 5432
    protocol: TCP
`,
    'k8s/configmaps/app-config.yaml': `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: demo-app
data:
  APP_NAME: "Demo Application"
  LOG_LEVEL: "info"
  API_TIMEOUT: "30000"
  MAX_CONNECTIONS: "100"
`,
    'k8s/base/kustomization.yaml': `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- frontend-deployment.yaml
- frontend-service.yaml

commonLabels:
  environment: base
  managed-by: kustomize
`,
    'k8s/overlays/dev/kustomization.yaml': `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

bases:
- ../../base

namePrefix: dev-

commonLabels:
  environment: dev
`,
    'k8s/overlays/prod/kustomization.yaml': `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

bases:
- ../../base

namePrefix: prod-

commonLabels:
  environment: production

replicas:
- name: frontend
  count: 5
`,
    'k8s/configmaps/nginx-config.yaml': `apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
  namespace: demo-app
data:
  nginx.conf: |
    user nginx;
    worker_processes auto;
    error_log /var/log/nginx/error.log;
    pid /run/nginx.pid;

    events {
        worker_connections 1024;
    }

    http {
        log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                          '$status $body_bytes_sent "$http_referer" '
                          '"$http_user_agent" "$http_x_forwarded_for"';

        access_log  /var/log/nginx/access.log  main;

        sendfile            on;
        tcp_nopush          on;
        keepalive_timeout   65;
        types_hash_max_size 4096;

        include             /etc/nginx/mime.types;
        default_type        application/octet-stream;

        server {
            listen       80;
            server_name  _;
            root         /usr/share/nginx/html;

            location / {
                try_files $uri $uri/ /index.html;
            }
        }
    }
`
};
function getMockRepositoryTree(path = '') {
    const normalizedPath = path === '' ? '/' : path;
    return mockTree[normalizedPath] || [];
}
function getMockFileContent(path) {
    const content = mockFiles[path];
    if (!content) {
        throw new Error(`File not found: ${path}`);
    }
    // Generate a fake SHA based on the path
    const sha = Buffer.from(path).toString('base64').slice(0, 40);
    return {
        content,
        sha
    };
}
const mockGitHubRepo = {
    owner: 'demo',
    repo: 'kubernetes-manifests',
    branch: 'main'
};
}),
"[project]/app/app/api/github/file/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/github/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$get$2d$token$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/github/get-token.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$github$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/github-data.ts [app-route] (ecmascript)");
;
;
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const owner = searchParams.get('owner');
        const repo = searchParams.get('repo');
        const path = searchParams.get('path');
        const ref = searchParams.get('ref') || 'main';
        const mode = searchParams.get('mode');
        if (!owner || !repo || !path) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'owner, repo and path are required'
            }, {
                status: 400
            });
        }
        // Mock mode for demo
        if (mode === 'demo') {
            try {
                const { content, sha } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$github$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMockFileContent"])(path);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    content,
                    sha
                });
            } catch  {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'File not found'
                }, {
                    status: 404
                });
            }
        }
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$get$2d$token$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGitHubToken"])();
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized - Please connect GitHub'
            }, {
                status: 401
            });
        }
        const github = new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GitHubClient"](token);
        const { content, sha } = await github.getFileContent(owner, repo, path, ref);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            content,
            sha
        });
    } catch (error) {
        console.error('Failed to fetch file content:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch file content'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0686d07d._.js.map