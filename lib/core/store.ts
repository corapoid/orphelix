import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppMode, KubernetesContext } from '@/types/app'

interface ModeStore {
  mode: AppMode
  selectedContext: KubernetesContext | null
  selectedNamespace: string
  realtimeEnabled: boolean
  autoRefreshEnabled: boolean
  autoRefreshInterval: number // seconds
  setMode: (mode: AppMode) => void
  setContext: (context: KubernetesContext | null) => void
  setNamespace: (namespace: string) => void
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
      mode: 'mock',
      selectedContext: null,
      selectedNamespace: '',
      realtimeEnabled: false,
      autoRefreshEnabled: false,
      autoRefreshInterval: 30, // 30 seconds default
      setMode: (mode) => set({ mode }),
      setContext: (context) => set({ selectedContext: context }),
      setNamespace: (namespace) => set({ selectedNamespace: namespace }),
      setRealtimeEnabled: (enabled) => set({ realtimeEnabled: enabled }),
      setAutoRefreshEnabled: (enabled) => set({ autoRefreshEnabled: enabled }),
      setAutoRefreshInterval: (interval) => set({ autoRefreshInterval: interval }),
      reset: () => set({
        mode: 'mock',
        selectedContext: null,
        selectedNamespace: '',
        realtimeEnabled: false,
        autoRefreshEnabled: false,
        autoRefreshInterval: 30,
      }),
    }),
    {
      name: 'k8s-dashboard-mode',
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
      name: 'kubevista-github',
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
