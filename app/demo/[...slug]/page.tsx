import { notFound } from 'next/navigation'

// Import all possible pages
const pages: Record<string, any> = {
  'pods': () => import('../../pods/page'),
  'deployments': () => import('../../deployments/page'),
  'services': () => import('../../services/page'),
  'ingress': () => import('../../ingress/page'),
  'configmaps': () => import('../../configmaps/page'),
  'secrets': () => import('../../secrets/page'),
  'namespaces': () => import('../../namespaces/page'),
  'nodes': () => import('../../nodes/page'),
  'cronjobs': () => import('../../cronjobs/page'),
  'jobs': () => import('../../jobs/page'),
  'topology': () => import('../../topology/page'),
  'settings': () => import('../../settings/page'),
  'pv': () => import('../../pv/page'),
  'hpa': () => import('../../hpa/page'),
  'events': () => import('../../events/page'),
}

export default async function DemoSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const pageSlug = slug[0]

  if (!pageSlug || !pages[pageSlug]) {
    notFound()
  }

  const PageComponent = (await pages[pageSlug]()).default
  return <PageComponent />
}
