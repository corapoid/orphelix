import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export interface GitHubInstallation {
  id: number
  account: {
    login: string
    type: string
  }
  repositories: Array<{
    id: number
    name: string
    full_name: string
  }>
}

export function useGitHubApp() {
  const { status } = useSession()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [installations, setInstallations] = useState<GitHubInstallation[]>([])

  const checkInstallations = async () => {
    if (status !== 'authenticated') {
      setIsAuthenticated(false)
      setInstallations([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/github-app/installations')
      if (response.ok) {
        const data = await response.json()
        setInstallations(data)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        setInstallations([])
      }
    } catch (error) {
      console.error('Failed to check GitHub App installations:', error)
      setIsAuthenticated(false)
      setInstallations([])
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-check installations when user logs in
  useEffect(() => {
    checkInstallations()
  }, [status])

  return {
    isAuthenticated,
    isLoading,
    installations,
    refetch: checkInstallations,
  }
}
