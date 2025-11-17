import { notFound } from 'next/navigation'

// Import all possible list pages
// Detail pages are now handled by their own [name] folders
const pages: Record<string, any> = {
  'ingress': () => import('../../ingress/page'),
  'configmaps': () => import('../../configmaps/page'),
  'secrets': () => import('../../secrets/page'),
  'topology': () => import('../../topology/page'),
  'settings': () => import('../../settings/page'),
  'pv': () => import('../../pv/page'),
  'hpa': () => import('../../hpa/page'),
  'events': () => import('../../events/page'),
}

export default async function DemoSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const pageSlug = slug[0]

  // This catch-all only handles pages without their own folder structure
  // Resources with detail pages (pods, deployments, etc.) have their own demo folders
  if (!pageSlug || !pages[pageSlug]) {
    notFound()
  }

  const PageComponent = (await pages[pageSlug]()).default
  return <PageComponent />
}
