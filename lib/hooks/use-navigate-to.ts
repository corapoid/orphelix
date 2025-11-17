import { useRouter, usePathname } from 'next/navigation'
import { useModeStore } from '@/lib/core/store'

/**
 * Hook for navigation that preserves demo mode prefix
 *
 * Usage:
 * const navigateTo = useNavigateTo()
 * navigateTo('/jobs/my-job') // -> /demo/jobs/my-job if in demo mode
 */
export function useNavigateTo() {
  const router = useRouter()
  const pathname = usePathname()
  const mode = useModeStore((state) => state.mode)

  const navigateTo = (path: string) => {
    // Check if we're currently on a /demo path or if mode is mock
    const isDemoMode = pathname.startsWith('/demo') || mode === 'mock'

    // If in demo mode and path doesn't already start with /demo, add it
    const finalPath = isDemoMode && !path.startsWith('/demo')
      ? `/demo${path}`
      : path

    router.push(finalPath)
  }

  return navigateTo
}

/**
 * Helper to build a path with demo prefix if needed
 *
 * Usage:
 * const buildPath = useBuildPath()
 * const path = buildPath('/jobs/my-job') // -> /demo/jobs/my-job if in demo mode
 */
export function useBuildPath() {
  const pathname = usePathname()
  const mode = useModeStore((state) => state.mode)

  const buildPath = (path: string) => {
    // Check if we're currently on a /demo path or if mode is mock
    const isDemoMode = pathname.startsWith('/demo') || mode === 'mock'

    // If in demo mode and path doesn't already start with /demo, add it
    return isDemoMode && !path.startsWith('/demo')
      ? `/demo${path}`
      : path
  }

  return buildPath
}
