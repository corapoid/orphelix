# Testing Instructions with Kubernetes Cluster

> Step-by-step guide: how to test KubeVista with your cluster

## Table of Contents

- [Prerequisites](#prerequisites)
- [Step 1: Cluster Preparation](#step-1-cluster-preparation)
- [Step 2: kubectl Configuration](#step-2-kubectl-configuration)
- [Step 3: Running the Application](#step-3-running-the-application)
- [Step 4: Switching to Real Mode](#step-4-switching-to-real-mode)
- [Step 5: Testing Functionality](#step-5-testing-functionality)
- [Step 6: Testing Real-time Updates](#step-6-testing-real-time-updates)
- [Step 7: Testing Pod Restart](#step-7-testing-pod-restart)
- [Troubleshooting](#troubleshooting)
- [Testing with Different Clusters](#testing-with-different-clusters)

---

## Prerequisites

Before starting testing, make sure you have:

- ✅ **Node.js 20+** installed
- ✅ **kubectl** installed and configured
- ✅ **Access to a Kubernetes cluster** (local or remote)
- ✅ **Read permissions** for resources in the `default` namespace
- ✅ (Optional) **Pod deletion permissions** (for restart functionality)

### Check Versions

```bash
# Node.js
node -v
# Expected: v20.x.x or higher

# kubectl
kubectl version --client
# Expected: Client Version: v1.28+ or newer

# Cluster access
kubectl cluster-info
# Should display cluster information
```

---

## Step 1: Cluster Preparation

### Option A: Local Cluster (Minikube)

If you don't have a cluster, you can use Minikube:

```bash
# Install Minikube (if you don't have it)
# macOS:
brew install minikube

# Linux:
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Start cluster
minikube start --driver=docker

# Check status
minikube status
```

### Option B: Kind (Kubernetes in Docker)

```bash
# Install Kind
# macOS:
brew install kind

# Linux:
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Create cluster
kind create cluster --name kubevista-test

# Check cluster
kubectl cluster-info --context kind-kubevista-test
```

### Option C: Existing Cluster

If you already have access to a cluster (e.g., EKS, GKE, AKS, on-premise), proceed to step 2.

### Create Sample Resources (Optional)

To give the dashboard something to display, create sample resources:

```bash
# Create sample deployment
kubectl create deployment nginx --image=nginx:latest --replicas=3

# Create sample ConfigMap
kubectl create configmap app-config --from-literal=APP_ENV=production

# Create sample Secret
kubectl create secret generic app-secret --from-literal=API_KEY=supersecret123

# Check created resources
kubectl get deployments,pods,configmaps,secrets
```

**Expected output:**
```
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx   3/3     3            3           10s

NAME                         READY   STATUS    RESTARTS   AGE
pod/nginx-7854ff8877-abc12   1/1     Running   0          10s
pod/nginx-7854ff8877-def34   1/1     Running   0          10s
pod/nginx-7854ff8877-ghi56   1/1     Running   0          10s

NAME                         DATA   AGE
configmap/app-config         1      5s

NAME                         TYPE     DATA   AGE
secret/app-secret            Opaque   1      3s
```

---

## Step 2: kubectl Configuration

### Check Current Context

```bash
# Show current context
kubectl config current-context

# Show all contexts
kubectl config get-contexts

# Example output:
# CURRENT   NAME                    CLUSTER              AUTHINFO
# *         minikube                minikube             minikube
#           kind-kubevista          kind-kubevista       kind-kubevista
#           prod-cluster            prod-cluster         admin
```

### Switch Context (if needed)

```bash
# Switch to appropriate context
kubectl config use-context minikube

# Check if it works
kubectl get nodes
```

### Check Permissions

```bash
# Check if you can read resources
kubectl auth can-i get pods
# Expected: yes

kubectl auth can-i list deployments
# Expected: yes

# Check if you can delete pods (for restart functionality)
kubectl auth can-i delete pods
# Expected: yes (if you have permissions)
```

### Test Resource Access

```bash
# Try to fetch resources
kubectl get pods -n default
kubectl get deployments -n default
kubectl get nodes

# If everything works, you're ready to test!
```

---

## Step 3: Running the Application

### Installation and Start

```bash
# Clone repository (if you don't have it yet)
git clone <repository-url>
cd kubevista

# Install dependencies
npm install

# Run in development mode
npm run dev
```

**Expected output:**
```
   ▲ Next.js 15.0.3
   - Local:        http://localhost:3000
   - Turbopack (experimental): enabled

 ✓ Starting...
 ✓ Ready in 2.3s
```

### Open in Browser

```bash
# Open automatically (macOS)
open http://localhost:3000

# Or just go to:
# http://localhost:3000
```

You should see the dashboard in **demo mode** with sample data.

---

## Step 4: Switching to Real Mode

### 1. Click the "DEMO MODE" Badge

In the top right corner of the header, you'll see a **"DEMO MODE"** badge. Click it.

### 2. Select Kubernetes Context

A dialog will appear with a list of available kubectl contexts:

- **minikube** (if using Minikube)
- **kind-kubevista-test** (if using Kind)
- Your own context (if using an existing cluster)

**Select the appropriate context and click "Connect".**

### 3. Check Connection

After switching:
- The badge will change from **"DEMO MODE"** to **"REAL CLUSTER"**
- The dashboard should automatically load data from your cluster
- If you have resources in the cluster, you'll see them in the interface

### 4. Verification

Check if the data matches kubectl:

```bash
# In terminal
kubectl get deployments

# In dashboard
# Go to: Deployments (sidebar) → you should see the same deployments
```

---

## Step 5: Testing Functionality

### Test 1: Main Dashboard

**Goal:** Check resource summary

1. Go to the home page (`/`)
2. Check summary cards:
   - **Deployments**: Number of deployments
   - **Pods**: Number of pods
   - **Nodes**: Number of nodes
   - **ConfigMaps, Secrets, HPA, PV**: Respective counts

**Verification in terminal:**
```bash
kubectl get deployments --no-headers | wc -l   # Number of deployments
kubectl get pods --no-headers | wc -l          # Number of pods
kubectl get nodes --no-headers | wc -l         # Number of nodes
```

### Test 2: Deployments List

**Goal:** Check deployments display

1. Click **"Deployments"** in the sidebar
2. Check the table:
   - Columns: Name, Namespace, Replicas, Age
   - Status badge (green = Available, yellow = Progressing)
   - Replicas: format "3/3/3" (ready/available/desired)

**Verification:**
```bash
kubectl get deployments -o wide
```

3. **Test search:**
   - Type a deployment name in the search field
   - Table should filter

4. **Test sorting:**
   - Click column headers
   - Table should sort

5. **Test details:**
   - Click on a deployment row
   - Details view should open

### Test 3: Deployment Details

**Goal:** Check deployment details

1. Open deployment details (click on a row in the list)
2. Check sections:
   - **Overview**: Name, namespace, labels
   - **Replicas**: Desired, Ready, Available
   - **Containers**: List of containers with images
   - **Pods**: List of pods belonging to the deployment
   - **Events**: Events related to the deployment

**Verification:**
```bash
kubectl describe deployment <deployment-name>
```

### Test 4: Pods List

**Goal:** Check pods display

1. Click **"Pods"** in the sidebar
2. Check the table:
   - Columns: Name, Status, Node, IP, Restarts, Containers, Age
   - Status badge (green = Running, yellow = Pending, red = Failed)

**Verification:**
```bash
kubectl get pods -o wide
```

3. **Test status filtering:**
   - Select "Running" from dropdown
   - Only Running pods should appear
   - Select "All" → all pods return

4. **Test search:**
   - Type a pod name
   - List filters

### Test 5: Pod Details and Logs

**Goal:** Check pod details and log display

1. Open pod details (click on a row)
2. Check sections:
   - **Details**: IP, Restarts, Containers count
   - **Labels**: Chip display
   - **Containers**: Table with image, ready status

3. **Test LogsViewer:**
   - "Container Logs" section should show logs
   - **Search**: Type "error" → logs filter
   - **Download**: Click "Download" → .log file should download
   - **Refresh**: Click "Refresh" → logs refresh
   - **Auto-scroll**: New logs should automatically scroll to bottom

**Verification:**
```bash
kubectl logs <pod-name>
```

4. **Multi-container pods** (if you have them):
   - "Container" dropdown should show list of containers
   - Select another container → logs change

### Test 6: Nodes

**Goal:** Check nodes display

1. Click **"Nodes"** in the sidebar
2. Check the nodes table:
   - Columns: Name, Status, Roles, Age
   - CPU and Memory usage (if metrics-server is installed)

**Verification:**
```bash
kubectl get nodes
kubectl top nodes  # Requires metrics-server
```

### Test 7: ConfigMaps and Secrets

**Goal:** Check ConfigMap and Secret display

1. **ConfigMaps:**
   - Click **"ConfigMaps"** in the sidebar
   - Check the list
   - Open details → check keys and values

**Verification:**
```bash
kubectl get configmaps
kubectl describe configmap <name>
```

2. **Secrets:**
   - Click **"Secrets"** in the sidebar
   - Check the list
   - Open details → values should be **masked** (••••••)

**Verification:**
```bash
kubectl get secrets
kubectl describe secret <name>
```

### Test 8: Events

**Goal:** Check events display

1. Click **"Events"** in the sidebar
2. Check chronological list of events:
   - Type: Normal (blue) / Warning (orange)
   - Reason, Message
   - Resource (Kind, Name)
   - Count, Age

**Verification:**
```bash
kubectl get events --sort-by='.lastTimestamp'
```

3. **Test filtering:**
   - "Type" dropdown → select "Warning"
   - Only Warning events should appear

### Test 9: Topology

**Goal:** Check dependency graph

1. Click **"Topology"** in the sidebar
2. Check the interactive graph:
   - Nodes: Deployment → Pod → Node
   - Edges: Connections between resources
   - Node color: Status (green = OK, red = problem)

3. **Test controls:**
   - **Zoom**: Scroll mousewheel → zoom in/out
   - **Pan**: Drag with mouse → move graph
   - **Fit to View**: Click button → graph fits to view

---

## Step 6: Testing Real-time Updates

**Goal:** Check real-time updates via SSE

### 1. Enable Real-time Updates

In the header, find the **"Real-time Updates"** toggle and turn it on.

**Expected result:**
- Toggle changes to ON
- SSE connection indicator appears:
  - **Connected** (green) = connection active
  - **Connecting** (blue) = connecting...
  - **Error** (red) = connection error

### 2. Test: Change in Deployment

**In terminal:**
```bash
# Change the number of deployment replicas
kubectl scale deployment nginx --replicas=5

# Check the change
kubectl get deployment nginx
```

**In dashboard:**
- Deployments list should **automatically** update
- Replicas should show "5/5/5"
- **You don't need to refresh the page!**

### 3. Test: Creating a New Pod

**In terminal:**
```bash
# Create new deployment
kubectl create deployment test-app --image=nginx:alpine --replicas=2
```

**In dashboard:**
- Go to Deployments list → new deployment should appear
- Go to Pods list → new pods should be visible

### 4. Test: Deleting a Resource

**In terminal:**
```bash
# Delete deployment
kubectl delete deployment test-app
```

**In dashboard:**
- Deployment should disappear from the list
- Pods should also disappear (after a few seconds)

### 5. Test: Heartbeat Monitoring

**Check DevTools:**
```bash
# In browser: F12 → Network → EventStream
# You should see:
# - event: connected
# - event: heartbeat (every 30s)
# - event: deployment (on changes)
# - event: pod (on changes)
```

### 6. Test: Auto-reconnection

**Simulate connection loss:**
```bash
# Stop dev server (Ctrl+C in terminal with npm run dev)
```

**In dashboard:**
- Indicator should show "Error" (red)
- After 3 seconds, reconnection attempt
- Max 5 reconnection attempts

**Resume server:**
```bash
npm run dev
```

**In dashboard:**
- Should automatically reconnect
- Indicator changes to "Connected" (green)

---

## Step 7: Testing Pod Restart

**Goal:** Check pod restart functionality

### ⚠️ Warning

Restarting a pod involves **deleting the pod**. The Kubernetes controller (Deployment, StatefulSet) will automatically create a new pod. **Standalone pods (not managed by a controller) will be permanently deleted!**

### 1. Prepare Pod for Restart

```bash
# Make sure you have a deployment with pods
kubectl get deployments
kubectl get pods

# Remember the name of one of the pods
kubectl get pods | grep nginx
# Example: nginx-7854ff8877-abc12
```

### 2. Test: Restart Pod via Dashboard

1. **Open pod details:**
   - Go to Pods → click on a pod (e.g., `nginx-7854ff8877-abc12`)

2. **Click "Restart Pod":**
   - Button in the top right corner (orange, with ↻ icon)

3. **Check Confirmation Dialog:**
   - Title: "Restart Pod"
   - Warnings:
     - Pod will be deleted and recreated by controller
     - Active connections will be interrupted
     - Brief downtime may occur
     - Standalone pods will be permanently deleted
   - Buttons: "Cancel" and "Restart Pod"

4. **Click "Restart Pod":**
   - Loading indicator appears
   - After a moment, toast notification:
     - ✅ **Success**: "Pod nginx-xxx deletion initiated. If managed by a controller, it will be recreated automatically."
     - ❌ **Error**: "Failed to restart pod" (if something went wrong)

5. **Check in Dashboard:**
   - Pods list should refresh
   - Old pod should disappear
   - New pod should appear with **new name** (e.g., `nginx-7854ff8877-xyz89`)
   - New pod status: **Pending** → **Running**

### 3. Verification in kubectl

```bash
# Check pods before restart
kubectl get pods
# nginx-7854ff8877-abc12   1/1     Running   0          5m

# After restart (in dashboard)
kubectl get pods
# nginx-7854ff8877-abc12   0/1     Terminating   0      5m  (old pod)
# nginx-7854ff8877-xyz89   0/1     ContainerCreating   0   2s  (new pod)

# After a moment
kubectl get pods
# nginx-7854ff8877-xyz89   1/1     Running   0   10s  (new pod ready)
```

### 4. Test: Restart Standalone Pod (Warning)

**Create standalone pod:**
```bash
kubectl run standalone-test --image=nginx:alpine
```

**Try to restart via dashboard:**
- Go to `standalone-test` pod details
- Click "Restart Pod"
- **Dialog should warn**: "Standalone pods (not managed by controllers) will be permanently deleted"
- After clicking "Restart Pod" → pod will be **permanently deleted** (will not be recreated)

**Verification:**
```bash
kubectl get pods | grep standalone-test
# No results (pod was deleted and not recreated)
```

### 5. Test: Lack of Permissions

If you don't have permissions to delete pods:

```bash
# Check permissions
kubectl auth can-i delete pods
# no
```

**In dashboard:**
- Clicking "Restart Pod" should return **error notification**:
  - "Failed to restart pod: Forbidden"
  - Toast should be red (error severity)

---

## Troubleshooting

### Problem: "Failed to connect to Kubernetes cluster"

**Causes:**
1. kubectl not configured
2. Invalid context
3. Cluster unavailable
4. Lack of permissions

**Solution:**

```bash
# 1. Check kubectl
kubectl cluster-info

# 2. Check context
kubectl config current-context

# 3. Check permissions
kubectl auth can-i get pods
kubectl auth can-i list deployments

# 4. Check if cluster is running
kubectl get nodes

# 5. Check application logs
# In terminal with npm run dev, check output
# Look for:
# [K8s] Using in-cluster configuration
# [K8s] Using kubeconfig file
# [K8s] Failed to load Kubernetes configuration: ...
```

### Problem: "Module not found: Can't resolve 'net'"

**Cause:** Trying to use K8s client in a client component.

**Solution:** This shouldn't happen if you're using the application normally. If you see this error, check if you modified the code.

### Problem: SSE not connecting

**Symptoms:**
- Real-time indicator shows "Error"
- No auto-refresh

**Solution:**

```bash
# 1. Check if SSE endpoint works
curl -N http://localhost:3000/api/stream

# Expected output:
# event: connected
# data: {"timestamp":"2025-11-12T..."}

# event: heartbeat
# data: {"timestamp":"2025-11-12T..."}

# If not working:

# 2. Check dev server logs
# In terminal with npm run dev, look for errors:
# [SSE] Failed to initialize Kubernetes watches: ...

# 3. Check Watch API permissions
kubectl auth can-i watch deployments
kubectl auth can-i watch pods

# 4. Check browser DevTools
# F12 → Console → look for errors
# F12 → Network → EventStream → check connection
```

### Problem: Dashboard shows old data

**Cause:** TanStack Query cache.

**Solution:**

```bash
# In browser:
# F12 → Application → Storage → Local Storage → Clear All
# Refresh page (Ctrl+R)

# Or:
# Switch between demo and real mode
# Click "DEMO MODE" / "REAL CLUSTER" badge
```

### Problem: Pod logs are empty

**Causes:**
1. Container doesn't output logs
2. Container is restarting
3. Pod hasn't started yet

**Solution:**

```bash
# Check logs in kubectl
kubectl logs <pod-name>

# If there are logs:
# - Refresh in dashboard ("Refresh" button)
# - Check if correct container is selected (dropdown)

# If no logs in kubectl:
# - Pod may be in Pending/ContainerCreating state
# - Container may be crashing → check status
kubectl describe pod <pod-name>
```

### Problem: Pod restart fails

**Symptoms:**
- Error toast: "Failed to restart pod"

**Solution:**

```bash
# 1. Check permissions
kubectl auth can-i delete pods
# If "no" → you need permissions

# 2. Check if pod exists
kubectl get pod <pod-name>

# 3. Try manually
kubectl delete pod <pod-name>

# If it works manually but not in dashboard:
# - Check DevTools → Network → check request to /api/pods/:name/restart
# - Check dev server logs
```

---

## Testing with Different Clusters

### Test with Minikube

```bash
# Start Minikube
minikube start

# Deploy sample resources
kubectl apply -f https://k8s.io/examples/application/deployment.yaml

# Check
kubectl get deployments

# In dashboard: Switch to "minikube" context
```

### Test with Kind

```bash
# Create cluster
kind create cluster --name test

# Deploy sample resources
kubectl apply -f https://k8s.io/examples/pods/simple-pod.yaml

# In dashboard: Switch to "kind-test" context
```

### Test with Production Cluster

⚠️ **Warning:** When testing with a production cluster:

1. **Use read-only context** if possible
2. **Don't restart critical pods** unnecessarily
3. **Check permissions** before testing
4. **Monitor impact** on the cluster

```bash
# Create read-only ServiceAccount (optional)
kubectl create serviceaccount kubevista-readonly
kubectl create clusterrolebinding kubevista-readonly \
  --clusterrole=view \
  --serviceaccount=default:kubevista-readonly

# Use this context in dashboard
```

---

## Test Checklist

Use this checklist for systematic testing:

### ✅ Basic Functionality
- [ ] Main dashboard displays summary
- [ ] Deployments list works
- [ ] Deployment details open
- [ ] Pods list displays pods
- [ ] Pod details open
- [ ] LogsViewer shows logs
- [ ] Nodes list displays nodes
- [ ] ConfigMaps and Secrets work
- [ ] Events display events
- [ ] Topology renders graph

### ✅ Search and Filtering
- [ ] Search in Deployments works
- [ ] Search in Pods works
- [ ] Pod filtering by status works
- [ ] Events filtering by type works
- [ ] Logs search works

### ✅ Real-time Updates (SSE)
- [ ] Real-time Updates toggle works
- [ ] Connection indicator shows status
- [ ] Auto-refresh on cluster changes works
- [ ] Heartbeat monitoring works (every 30s)
- [ ] Auto-reconnection after connection loss works

### ✅ Pod Restart
- [ ] "Restart Pod" button is visible
- [ ] Confirmation dialog displays warnings
- [ ] Restart managed pod (with Deployment) works
- [ ] Toast notification after restart works
- [ ] Cache invalidation after restart works
- [ ] Warning for standalone pods works

### ✅ Mode Switching
- [ ] Demo → Real switch works
- [ ] Real → Demo switch works
- [ ] K8s context selection works
- [ ] Data loads after switching

### ✅ Error Handling
- [ ] Cluster connection error shows message
- [ ] Lack of permissions shows message
- [ ] 404 for non-existent resources works
- [ ] Network errors are handled

---

## Summary

After going through all the steps, you should be confident that:

1. ✅ Dashboard **connects** to your Kubernetes cluster
2. ✅ **Displays** all resources (Deployments, Pods, Nodes, etc.)
3. ✅ **Real-time updates** work correctly
4. ✅ **Pod restart** works as expected
5. ✅ **Search and filtering** function properly
6. ✅ **Error handling** is appropriate

---

## Additional Resources

- **Kubernetes Documentation:** https://kubernetes.io/docs/
- **kubectl Cheat Sheet:** https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- **Minikube Docs:** https://minikube.sigs.k8s.io/docs/
- **Kind Docs:** https://kind.sigs.k8s.io/

---

**If you encounter problems not described in this document, report them in [GitHub Issues](https://github.com/your-username/kubevista/issues).**

**Good luck with testing!**
