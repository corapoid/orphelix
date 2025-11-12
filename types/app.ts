// Application-specific types

export type AppMode = 'mock' | 'real'

export interface KubernetesContext {
  name: string
  cluster: string
  user: string
  namespace?: string
}

export interface AppConfig {
  kubernetes: {
    contexts: Array<{
      name: string
      context: string
      namespace: string
    }>
  }
  flux?: {
    enabled: boolean
    github: {
      token: string
      repos: Array<{
        url: string
        branch: string
        path: string
        autoMerge: boolean
      }>
    }
  }
  ui: {
    refreshInterval: number
    eventsHistory: number
    theme: 'light' | 'dark' | 'system'
  }
}
