import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppMode, KubernetesContext } from '@/types/app'
import type { ColorSkinName, BackgroundPreset } from '@/lib/ui/color-skins'

interface ModeStore {
  mode: AppMode
  selectedContext: KubernetesContext | null
  selectedNamespace: string
  clusterConnected: boolean
  connectionError: string | null
  realtimeEnabled: boolean
  autoRefreshEnabled: boolean
  autoRefreshInterval: number // seconds
  setMode: (mode: AppMode) => void
  setContext: (context: KubernetesContext | null) => void
  setNamespace: (namespace: string) => void
  setClusterConnected: (connected: boolean) => void
  setConnectionError: (error: string | null) => void
  setRealtimeEnabled: (enabled: boolean) => void
  setAutoRefreshEnabled: (enabled: boolean) => void
  setAutoRefreshInterval: (interval: number) => void
  reset: () => void
}

interface GitHubRepo {
  owner: string
  repo: string
  branch: string
}

interface GitHubStore {
  selectedRepo: GitHubRepo | null
  pendingPRs: Map<string, number> // deploymentKey -> PR number
  setSelectedRepo: (repo: GitHubRepo | null) => void
  setPendingPR: (deploymentName: string, namespace: string, prNumber: number) => void
  removePendingPR: (deploymentName: string, namespace: string) => void
  getPendingPR: (deploymentName: string, namespace: string) => number | null
}

/**
 * Global store for application mode (mock vs real)
 * Persisted to localStorage
 */
export const useModeStore = create<ModeStore>()(
  persist(
    (set) => ({
      mode: 'real', // Default to real mode
      selectedContext: null,
      selectedNamespace: '',
      clusterConnected: false,
      connectionError: null,
      realtimeEnabled: false,
      autoRefreshEnabled: false,
      autoRefreshInterval: 30, // 30 seconds default
      setMode: (mode) => set({ mode }),
      setContext: (context) => set({ selectedContext: context }),
      setNamespace: (namespace) => set({ selectedNamespace: namespace }),
      setClusterConnected: (connected) => set({ clusterConnected: connected }),
      setConnectionError: (error) => set({ connectionError: error }),
      setRealtimeEnabled: (enabled) => set({ realtimeEnabled: enabled }),
      setAutoRefreshEnabled: (enabled) => set({ autoRefreshEnabled: enabled }),
      setAutoRefreshInterval: (interval) => set({ autoRefreshInterval: interval }),
      reset: () => set({
        mode: 'real',
        selectedContext: null,
        selectedNamespace: '',
        clusterConnected: false,
        connectionError: null,
        realtimeEnabled: false,
        autoRefreshEnabled: false,
        autoRefreshInterval: 30,
      }),
    }),
    {
      name: 'orphelix-mode',
    }
  )
)

/**
 * Global store for GitHub integration
 * Persisted to localStorage
 */
export const useGitHubStore = create<GitHubStore>()(
  persist(
    (set, get) => ({
      selectedRepo: null,
      pendingPRs: new Map(),
      setSelectedRepo: (repo) => set({ selectedRepo: repo }),
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
 * UI Preferences Store
 * Manages UI customization (background preset, compact mode)
 */
interface UIPreferencesStore {
  colorSkin: ColorSkinName // Keep for backward compatibility
  backgroundPreset: BackgroundPreset // Selected background color preset
  compactMode: boolean
  setColorSkin: (skin: ColorSkinName) => void // Keep for backward compatibility
  setBackgroundPreset: (preset: BackgroundPreset) => void
  setCompactMode: (compact: boolean) => void
}

export const useUIPreferences = create<UIPreferencesStore>()(
  persist(
    (set) => ({
      colorSkin: 'glass',
      backgroundPreset: 'default',
      compactMode: false,
      setColorSkin: (skin) => set({ colorSkin: skin }),
      setBackgroundPreset: (preset) => set({ backgroundPreset: preset }),
      setCompactMode: (compact) => set({ compactMode: compact }),
    }),
    {
      name: 'orphelix-ui-preferences',
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
        '/dashboard',
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
