// Mock data for GitHub repository browser

interface TreeItem {
  name: string
  path: string
  type: 'file' | 'dir'
  size?: number
}

interface FileContent {
  content: string
  sha: string
}

// Mock repository tree structure
const mockTree: Record<string, TreeItem[]> = {
  '/': [
    { name: 'k8s', path: 'k8s', type: 'dir' },
    { name: 'README.md', path: 'README.md', type: 'file', size: 1234 },
    { name: '.gitignore', path: '.gitignore', type: 'file', size: 456 },
  ],
  'k8s': [
    { name: 'base', path: 'k8s/base', type: 'dir' },
    { name: 'overlays', path: 'k8s/overlays', type: 'dir' },
    { name: 'deployments', path: 'k8s/deployments', type: 'dir' },
    { name: 'services', path: 'k8s/services', type: 'dir' },
    { name: 'configmaps', path: 'k8s/configmaps', type: 'dir' },
    { name: 'namespace.yaml', path: 'k8s/namespace.yaml', type: 'file', size: 234 },
  ],
  'k8s/base': [
    { name: 'kustomization.yaml', path: 'k8s/base/kustomization.yaml', type: 'file', size: 345 },
    { name: 'frontend-deployment.yaml', path: 'k8s/base/frontend-deployment.yaml', type: 'file', size: 1200 },
    { name: 'frontend-service.yaml', path: 'k8s/base/frontend-service.yaml', type: 'file', size: 400 },
  ],
  'k8s/overlays': [
    { name: 'dev', path: 'k8s/overlays/dev', type: 'dir' },
    { name: 'prod', path: 'k8s/overlays/prod', type: 'dir' },
  ],
  'k8s/overlays/dev': [
    { name: 'kustomization.yaml', path: 'k8s/overlays/dev/kustomization.yaml', type: 'file', size: 250 },
  ],
  'k8s/overlays/prod': [
    { name: 'kustomization.yaml', path: 'k8s/overlays/prod/kustomization.yaml', type: 'file', size: 280 },
  ],
  'k8s/deployments': [
    { name: 'frontend.yaml', path: 'k8s/deployments/frontend.yaml', type: 'file', size: 1567 },
    { name: 'backend.yaml', path: 'k8s/deployments/backend.yaml', type: 'file', size: 1823 },
    { name: 'database.yaml', path: 'k8s/deployments/database.yaml', type: 'file', size: 2134 },
  ],
  'k8s/services': [
    { name: 'frontend-svc.yaml', path: 'k8s/services/frontend-svc.yaml', type: 'file', size: 456 },
    { name: 'backend-svc.yaml', path: 'k8s/services/backend-svc.yaml', type: 'file', size: 512 },
    { name: 'database-svc.yaml', path: 'k8s/services/database-svc.yaml', type: 'file', size: 478 },
  ],
  'k8s/configmaps': [
    { name: 'app-config.yaml', path: 'k8s/configmaps/app-config.yaml', type: 'file', size: 789 },
    { name: 'nginx-config.yaml', path: 'k8s/configmaps/nginx-config.yaml', type: 'file', size: 1024 },
  ],
}

// Mock file contents
const mockFiles: Record<string, string> = {
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
`,
}

export function getMockRepositoryTree(path: string = ''): TreeItem[] {
  const normalizedPath = path === '' ? '/' : path
  return mockTree[normalizedPath] || []
}

export function getMockFileContent(path: string): FileContent {
  const content = mockFiles[path]
  if (!content) {
    throw new Error(`File not found: ${path}`)
  }

  // Generate a fake SHA based on the path
  const sha = Buffer.from(path).toString('base64').slice(0, 40)

  return {
    content,
    sha,
  }
}

export const mockGitHubRepo = {
  owner: 'demo',
  repo: 'kubernetes-manifests',
  branch: 'main',
}
