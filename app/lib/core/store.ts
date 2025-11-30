import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppMode, KubernetesContext } from '@/types/app'
import { createLogger } from '@/lib/logging/logger'

const logger = createLogger({ module: 'store' })

interface ModeStore {
  mode: AppMode
  selectedContext: KubernetesContext | null
  selectedNamespace: string
  clusterConnected: boolean
  connectionError: string | null
  realtimeEnabled: boolean
  autoRefreshEnabled: boolean
  autoRefreshInterval: number // seconds
  hasCompletedWelcome: boolean // Flag to track if user has completed initial setup
  initialized: boolean
  setMode: (mode: AppMode) => void
  setContext: (context: KubernetesContext | null) => void
  setNamespace: (namespace: string) => void
  setClusterConnected: (connected: boolean) => void
  setConnectionError: (error: string | null) => void
  setRealtimeEnabled: (enabled: boolean) => void
  setAutoRefreshEnabled: (enabled: boolean) => void
  setAutoRefreshInterval: (interval: number) => void
  setHasCompletedWelcome: (completed: boolean) => void
  initialize: (data: Partial<ModeStore>) => void
  reset: () => void
  syncToServer: () => Promise<void>
}

// Helper to sync state to server
async function syncStateToServer(state: Partial<ModeStore>) {
  try {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: state.mode,
        selectedContext: state.selectedContext,
        selectedNamespace: state.selectedNamespace,
        clusterConnected: state.clusterConnected,
        connectionError: state.connectionError,
        realtimeEnabled: state.realtimeEnabled,
        autoRefreshEnabled: state.autoRefreshEnabled,
        autoRefreshInterval: state.autoRefreshInterval,
        hasCompletedWelcome: state.hasCompletedWelcome,
      }),
    })
  } catch (error) {
    logger.error({ error }, 'Failed to sync settings to server')
  }
}

interface GitHubRepo {
  owner: string
  repo: string
  branch: string
}

export interface FileEdit {
  filePath: string
  content: string
  originalContent: string
  sha: string
}

interface GitHubStore {
  selectedRepo: GitHubRepo | null
  selectedBranch: string
  pendingPRs: Map<string, number> // deploymentKey -> PR number
  editBasket: Map<string, FileEdit> // filePath -> FileEdit
  setSelectedRepo: (repo: GitHubRepo | null) => void
  setSelectedBranch: (branch: string) => void
  setPendingPR: (deploymentName: string, namespace: string, prNumber: number) => void
  removePendingPR: (deploymentName: string, namespace: string) => void
  getPendingPR: (deploymentName: string, namespace: string) => number | null
  addToBasket: (edit: FileEdit) => void
  removeFromBasket: (filePath: string) => void
  clearBasket: () => void
  getBasketSize: () => number
}

/**
 * Global store for application mode (demo vs real)
 * Synced with SQLite database via API
 */
export const useModeStore = create<ModeStore>()((set, get) => ({
  mode: 'demo',
  selectedContext: null,
  selectedNamespace: '',
  clusterConnected: false,
  connectionError: null,
  realtimeEnabled: false,
  autoRefreshEnabled: false,
  autoRefreshInterval: 30,
  hasCompletedWelcome: false,
  initialized: false,
  setMode: (mode) => {
    set({ mode })
    syncStateToServer(get())
  },
  setContext: (context) => {
    set({ selectedContext: context })
    syncStateToServer(get())
  },
  setNamespace: (namespace) => {
    set({ selectedNamespace: namespace })
    syncStateToServer(get())
  },
  setClusterConnected: (connected) => {
    set({ clusterConnected: connected })
    syncStateToServer(get())
  },
  setConnectionError: (error) => {
    set({ connectionError: error })
    syncStateToServer(get())
  },
  setRealtimeEnabled: (enabled) => {
    set({ realtimeEnabled: enabled })
    syncStateToServer(get())
  },
  setAutoRefreshEnabled: (enabled) => {
    set({ autoRefreshEnabled: enabled })
    syncStateToServer(get())
  },
  setAutoRefreshInterval: (interval) => {
    set({ autoRefreshInterval: interval })
    syncStateToServer(get())
  },
  setHasCompletedWelcome: (completed) => {
    set({ hasCompletedWelcome: completed })
    syncStateToServer(get())
  },
  initialize: (data) => {
    set({ ...data, initialized: true })
  },
  reset: async () => {
    try {
      await fetch('/api/settings', { method: 'DELETE' })
      set({
        mode: 'demo',
        selectedContext: null,
        selectedNamespace: '',
        clusterConnected: false,
        connectionError: null,
        realtimeEnabled: false,
        autoRefreshEnabled: false,
        autoRefreshInterval: 30,
        hasCompletedWelcome: false,
      })
    } catch (error) {
      logger.error({ error }, 'Failed to reset settings')
    }
  },
  syncToServer: () => syncStateToServer(get()),
}))

/**
 * Global store for GitHub integration
 * Persisted to localStorage
 */
export const useGitHubStore = create<GitHubStore>()(
  persist(
    (set, get) => ({
      selectedRepo: null,
      selectedBranch: 'main',
      pendingPRs: new Map(),
      editBasket: new Map(),
      setSelectedRepo: (repo) => set({ selectedRepo: repo }),
      setSelectedBranch: (branch) => set({ selectedBranch: branch }),
      setPendingPR: (deploymentName, namespace, prNumber) => {
        const key = `${namespace}/${deploymentName}`
        const newMap = new Map(get().pendingPRs)
        newMap.set(key, prNumber)
        set({ pendingPRs: newMap })
      },
      removePendingPR: (deploymentName, namespace) => {
        const key = `${namespace}/${deploymentName}`
        const newMap = new Map(get().pendingPRs)
        newMap.delete(key)
        set({ pendingPRs: newMap })
      },
      getPendingPR: (deploymentName, namespace) => {
        const key = `${namespace}/${deploymentName}`
        return get().pendingPRs.get(key) || null
      },
      addToBasket: (edit) => {
        const newMap = new Map(get().editBasket)
        newMap.set(edit.filePath, edit)
        set({ editBasket: newMap })
      },
      removeFromBasket: (filePath) => {
        const newMap = new Map(get().editBasket)
        newMap.delete(filePath)
        set({ editBasket: newMap })
      },
      clearBasket: () => {
        set({ editBasket: new Map() })
      },
      getBasketSize: () => get().editBasket.size,
    }),
    {
      name: 'orphelix-github',
      // Convert Map to Array for JSON serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const { state } = JSON.parse(str)
          return {
            state: {
              ...state,
              pendingPRs: new Map(state.pendingPRs || []),
              editBasket: new Map(state.editBasket || []),
            },
          }
        },
        setItem: (name, value) => {
          const { state } = value
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                ...state,
                pendingPRs: Array.from(state.pendingPRs.entries()),
                editBasket: Array.from(state.editBasket.entries()),
              },
            })
          )
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)

/**
 * Cluster Aliases Store
 * Manages friendly names/aliases for Kubernetes clusters
 */
interface ClusterAliasesStore {
  aliases: Record<string, string> // contextName -> alias
  setAlias: (contextName: string, alias: string) => void
  removeAlias: (contextName: string) => void
  getAlias: (contextName: string) => string | null
}

export const useClusterAliases = create<ClusterAliasesStore>()(
  persist(
    (set, get) => ({
      aliases: {},
      setAlias: (contextName, alias) =>
        set((state) => ({
          aliases: { ...state.aliases, [contextName]: alias },
        })),
      removeAlias: (contextName) =>
        set((state) => {
          const { [contextName]: _, ...rest } = state.aliases
          return { aliases: rest }
        }),
      getAlias: (contextName) => get().aliases[contextName] || null,
    }),
    {
      name: 'orphelix-cluster-aliases',
    }
  )
)

/**
 * Critical Issues Settings Store
 * Manages which resource types should be monitored for critical issues
 */
export type CriticalIssueResourceType = 'pods' | 'nodes' | 'deployments' | 'pv'

interface CriticalIssuesSettingsStore {
  enabledResources: Set<CriticalIssueResourceType>
  isResourceEnabled: (resource: CriticalIssueResourceType) => boolean
  toggleResource: (resource: CriticalIssueResourceType) => void
  enableResource: (resource: CriticalIssueResourceType) => void
  disableResource: (resource: CriticalIssueResourceType) => void
}

export const useCriticalIssuesSettings = create<CriticalIssuesSettingsStore>()(
  persist(
    (set, get) => ({
      enabledResources: new Set<CriticalIssueResourceType>([
        'pods',
        'nodes',
        'deployments',
        'pv',
      ]),
      isResourceEnabled: (resource) => get().enabledResources.has(resource),
      toggleResource: (resource) =>
        set((state) => {
          const newEnabled = new Set(state.enabledResources)
          if (newEnabled.has(resource)) {
            newEnabled.delete(resource)
          } else {
            newEnabled.add(resource)
          }
          return { enabledResources: newEnabled }
        }),
      enableResource: (resource) =>
        set((state) => ({
          enabledResources: new Set([...state.enabledResources, resource]),
        })),
      disableResource: (resource) =>
        set((state) => {
          const newEnabled = new Set(state.enabledResources)
          newEnabled.delete(resource)
          return { enabledResources: newEnabled }
        }),
    }),
    {
      name: 'orphelix-critical-issues-settings',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const { state } = JSON.parse(str)
          return {
            state: {
              ...state,
              enabledResources: new Set(state.enabledResources || []),
            },
          }
        },
        setItem: (name, value) => {
          const { state } = value
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                ...state,
                enabledResources: Array.from(state.enabledResources),
              },
            })
          )
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)

/**
 * Sidebar Pins Store
 * Manages which navigation items are pinned/visible in the sidebar
 */
interface SidebarPinsStore {
  pinnedItems: Set<string> // Set of navigation item paths that are pinned
  isPinned: (path: string) => boolean
  togglePin: (path: string) => void
  pinItem: (path: string) => void
  unpinItem: (path: string) => void
}

export const useSidebarPins = create<SidebarPinsStore>()(
  persist(
    (set, get) => ({
      pinnedItems: new Set([
        // Default pinned items - all items pinned by default
        '/',
        '/repo-browser',
        '/deployments',
        '/statefulsets',
        '/daemonsets',
        '/pods',
        '/jobs',
        '/cronjobs',
        '/services',
        '/ingress',
        '/configmaps',
        '/secrets',
        '/namespaces',
        '/nodes',
        '/hpa',
        '/events',
        '/labels',
        '/topology',
        '/pv',
        '/settings',
      ]),
      isPinned: (path) => get().pinnedItems.has(path),
      togglePin: (path) =>
        set((state) => {
          const newPinned = new Set(state.pinnedItems)
          if (newPinned.has(path)) {
            newPinned.delete(path)
          } else {
            newPinned.add(path)
          }
          return { pinnedItems: newPinned }
        }),
      pinItem: (path) =>
        set((state) => ({
          pinnedItems: new Set([...state.pinnedItems, path]),
        })),
      unpinItem: (path) =>
        set((state) => {
          const newPinned = new Set(state.pinnedItems)
          newPinned.delete(path)
          return { pinnedItems: newPinned }
        }),
    }),
    {
      name: 'orphelix-sidebar-pins',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const { state } = JSON.parse(str)
          return {
            state: {
              ...state,
              pinnedItems: new Set(state.pinnedItems || []),
            },
          }
        },
        setItem: (name, value) => {
          const { state } = value
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                ...state,
                pinnedItems: Array.from(state.pinnedItems),
              },
            })
          )
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)
