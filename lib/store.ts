import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppMode, KubernetesContext } from '@/types/app'

interface ModeStore {
  mode: AppMode
  selectedContext: KubernetesContext | null
  selectedNamespace: string
  realtimeEnabled: boolean
  setMode: (mode: AppMode) => void
  setContext: (context: KubernetesContext | null) => void
  setNamespace: (namespace: string) => void
  setRealtimeEnabled: (enabled: boolean) => void
  reset: () => void
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
      setMode: (mode) => set({ mode }),
      setContext: (context) => set({ selectedContext: context }),
      setNamespace: (namespace) => set({ selectedNamespace: namespace }),
      setRealtimeEnabled: (enabled) => set({ realtimeEnabled: enabled }),
      reset: () => set({ mode: 'mock', selectedContext: null, selectedNamespace: '', realtimeEnabled: false }),
    }),
    {
      name: 'k8s-dashboard-mode',
    }
  )
)
