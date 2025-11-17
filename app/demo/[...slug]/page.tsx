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

// Import detail pages (dynamic routes)
const detailPages: Record<string, any> = {
  'pods': () => import('../../pods/[name]/page'),
  'deployments': () => import('../../deployments/[name]/page'),
  'services': () => import('../../services/[name]/page'),
  'nodes': () => import('../../nodes/[name]/page'),
  'cronjobs': () => import('../../cronjobs/[name]/page'),
  'jobs': () => import('../../jobs/[name]/page'),
  'namespaces': () => import('../../namespaces/[name]/page'),
}

export default async function DemoSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const pageSlug = slug[0]

  // Check if this is a detail page (e.g., /demo/jobs/my-job)
  if (slug.length === 2 && detailPages[pageSlug]) {
    const DetailPageComponent = (await detailPages[pageSlug]()).default
    // Pass the resource name as params to the detail page
    const detailParams = Promise.resolve({ name: slug[1] })
    return <DetailPageComponent params={detailParams} />
  }

  // Otherwise, it's a list page (e.g., /demo/jobs)
  if (!pageSlug || !pages[pageSlug]) {
    notFound()
  }

  const PageComponent = (await pages[pageSlug]()).default
  return <PageComponent />
}
