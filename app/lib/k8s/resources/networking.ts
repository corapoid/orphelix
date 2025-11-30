/**
 * Kubernetes Services and Ingresses API
 */

import { getCoreApi, getNetworkingApi } from '../client'
import { calculateAge } from '../utils/helpers'
import { createLogger } from '@/lib/logging/logger'
import type { Service, ServicePort, Ingress, IngressRule, IngressPath, IngressTLS } from '@/types/kubernetes'

const logger = createLogger({ module: 'k8s-networking' })

/**
 * Fetch all services in a namespace
 */
export async function fetchServices(namespace: string, contextName?: string): Promise<Service[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listNamespacedService({ namespace })

  return response.items.map((svc) => {
    const ports: ServicePort[] = (svc.spec?.ports || []).map((port) => ({
      name: port.name,
      protocol: port.protocol || 'TCP',
      port: port.port || 0,
      targetPort: port.targetPort || 0,
      nodePort: port.nodePort,
    }))

    return {
      name: svc.metadata?.name || '',
      namespace: svc.metadata?.namespace || namespace,
      type: (svc.spec?.type as Service['type']) || 'ClusterIP',
      clusterIP: svc.spec?.clusterIP || '',
      externalIPs: svc.spec?.externalIPs,
      ports,
      selector: svc.spec?.selector || {},
      age: calculateAge(svc.metadata?.creationTimestamp),
      labels: svc.metadata?.labels || {},
    }
  })
}

/**
 * Fetch a single service by name
 */
export async function fetchService(
  name: string,
  namespace: string,
  contextName?: string
): Promise<Service | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedService({ name, namespace })
    const svc = response

    const ports: ServicePort[] = (svc.spec?.ports || []).map((port) => ({
      name: port.name,
      protocol: port.protocol || 'TCP',
      port: port.port || 0,
      targetPort: port.targetPort || 0,
      nodePort: port.nodePort,
    }))

    return {
      name: svc.metadata?.name || '',
      namespace: svc.metadata?.namespace || namespace,
      type: (svc.spec?.type as Service['type']) || 'ClusterIP',
      clusterIP: svc.spec?.clusterIP || '',
      externalIPs: svc.spec?.externalIPs,
      ports,
      selector: svc.spec?.selector || {},
      age: calculateAge(svc.metadata?.creationTimestamp),
      labels: svc.metadata?.labels || {},
    }
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch service'
    )
    return null
  }
}

/**
 * Fetch all ingresses in a namespace
 */
export async function fetchIngresses(namespace: string, contextName?: string): Promise<Ingress[]> {
  const networkingApi = getNetworkingApi(contextName)
  const response = await networkingApi.listNamespacedIngress({ namespace })

  return response.items.map((ing) => {
    // Extract hosts from rules
    const hosts: string[] = []
    const rules: IngressRule[] = (ing.spec?.rules || []).map((rule) => {
      if (rule.host) {
        hosts.push(rule.host)
      }

      const paths: IngressPath[] = (rule.http?.paths || []).map((path) => ({
        path: path.path || '/',
        pathType: path.pathType || 'Prefix',
        backend: {
          service: {
            name: path.backend?.service?.name || '',
            port: {
              number: path.backend?.service?.port?.number,
              name: path.backend?.service?.port?.name,
            },
          },
        },
      }))

      return {
        host: rule.host,
        paths,
      }
    })

    // Extract TLS configuration
    const tls: IngressTLS[] | undefined = ing.spec?.tls?.map((tlsConfig) => ({
      hosts: tlsConfig.hosts || [],
      secretName: tlsConfig.secretName,
    }))

    return {
      name: ing.metadata?.name || '',
      namespace: ing.metadata?.namespace || namespace,
      className: ing.spec?.ingressClassName,
      hosts,
      rules,
      tls,
      age: calculateAge(ing.metadata?.creationTimestamp),
      labels: ing.metadata?.labels || {},
    }
  })
}

/**
 * Fetch a single ingress by name
 */
export async function fetchIngress(
  name: string,
  namespace: string,
  contextName?: string
): Promise<Ingress | null> {
  try {
    const networkingApi = getNetworkingApi(contextName)
    const response = await networkingApi.readNamespacedIngress({ name, namespace })
    const ing = response

    // Extract hosts from rules
    const hosts: string[] = []
    const rules: IngressRule[] = (ing.spec?.rules || []).map((rule) => {
      if (rule.host) {
        hosts.push(rule.host)
      }

      const paths: IngressPath[] = (rule.http?.paths || []).map((path) => ({
        path: path.path || '/',
        pathType: path.pathType || 'Prefix',
        backend: {
          service: {
            name: path.backend?.service?.name || '',
            port: {
              number: path.backend?.service?.port?.number,
              name: path.backend?.service?.port?.name,
            },
          },
        },
      }))

      return {
        host: rule.host,
        paths,
      }
    })

    // Extract TLS configuration
    const tls: IngressTLS[] | undefined = ing.spec?.tls?.map((tlsConfig) => ({
      hosts: tlsConfig.hosts || [],
      secretName: tlsConfig.secretName,
    }))

    return {
      name: ing.metadata?.name || '',
      namespace: ing.metadata?.namespace || namespace,
      className: ing.spec?.ingressClassName,
      hosts,
      rules,
      tls,
      age: calculateAge(ing.metadata?.creationTimestamp),
      labels: ing.metadata?.labels || {},
    }
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch ingress'
    )
    return null
  }
}
