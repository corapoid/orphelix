(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/lib/mocks/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateMockConfigMaps",
    ()=>generateMockConfigMaps,
    "generateMockCronJobs",
    ()=>generateMockCronJobs,
    "generateMockDaemonSets",
    ()=>generateMockDaemonSets,
    "generateMockDashboardSummary",
    ()=>generateMockDashboardSummary,
    "generateMockDeployments",
    ()=>generateMockDeployments,
    "generateMockEvents",
    ()=>generateMockEvents,
    "generateMockHPAs",
    ()=>generateMockHPAs,
    "generateMockIngresses",
    ()=>generateMockIngresses,
    "generateMockJobs",
    ()=>generateMockJobs,
    "generateMockLimitRanges",
    ()=>generateMockLimitRanges,
    "generateMockNamespaces",
    ()=>generateMockNamespaces,
    "generateMockNodes",
    ()=>generateMockNodes,
    "generateMockPVCs",
    ()=>generateMockPVCs,
    "generateMockPVs",
    ()=>generateMockPVs,
    "generateMockPodMetrics",
    ()=>generateMockPodMetrics,
    "generateMockPods",
    ()=>generateMockPods,
    "generateMockResourceQuotas",
    ()=>generateMockResourceQuotas,
    "generateMockSecrets",
    ()=>generateMockSecrets,
    "generateMockServices",
    ()=>generateMockServices,
    "generateMockStatefulSets",
    ()=>generateMockStatefulSets,
    "getMockPodLogs",
    ()=>getMockPodLogs
]);
// Initialize cache if it doesn't exist
if (("TURBOPACK compile-time value", "object") !== 'undefined' && !window.__mockDataCache) {
    window.__mockDataCache = {
        pods: null,
        deployments: null,
        statefulSets: null,
        daemonSets: null,
        nodes: null,
        configMaps: null,
        secrets: null,
        hpas: null,
        pvs: null,
        pvcs: null,
        events: null,
        services: null,
        ingresses: null,
        jobs: null,
        cronJobs: null,
        namespaces: null,
        resourceQuotas: null,
        limitRanges: null
    };
}
// Helper getters and setters for cache
const getCache = ()=>("TURBOPACK compile-time truthy", 1) ? window.__mockDataCache : "TURBOPACK unreachable";
const getCachedPods = ()=>getCache()?.pods || null;
const setCachedPods = (data)=>{
    if (getCache()) getCache().pods = data;
};
const getCachedDeployments = ()=>getCache()?.deployments || null;
const setCachedDeployments = (data)=>{
    if (getCache()) getCache().deployments = data;
};
const getCachedStatefulSets = ()=>getCache()?.statefulSets || null;
const setCachedStatefulSets = (data)=>{
    if (getCache()) getCache().statefulSets = data;
};
const getCachedDaemonSets = ()=>getCache()?.daemonSets || null;
const setCachedDaemonSets = (data)=>{
    if (getCache()) getCache().daemonSets = data;
};
const getCachedNodes = ()=>getCache()?.nodes || null;
const setCachedNodes = (data)=>{
    if (getCache()) getCache().nodes = data;
};
const getCachedConfigMaps = ()=>getCache()?.configMaps || null;
const setCachedConfigMaps = (data)=>{
    if (getCache()) getCache().configMaps = data;
};
const getCachedSecrets = ()=>getCache()?.secrets || null;
const setCachedSecrets = (data)=>{
    if (getCache()) getCache().secrets = data;
};
const getCachedHPAs = ()=>getCache()?.hpas || null;
const setCachedHPAs = (data)=>{
    if (getCache()) getCache().hpas = data;
};
const getCachedPVs = ()=>getCache()?.pvs || null;
const setCachedPVs = (data)=>{
    if (getCache()) getCache().pvs = data;
};
const getCachedPVCs = ()=>getCache()?.pvcs || null;
const setCachedPVCs = (data)=>{
    if (getCache()) getCache().pvcs = data;
};
const getCachedEvents = ()=>getCache()?.events || null;
const setCachedEvents = (data)=>{
    if (getCache()) getCache().events = data;
};
const getCachedServices = ()=>getCache()?.services || null;
const setCachedServices = (data)=>{
    if (getCache()) getCache().services = data;
};
const getCachedIngresses = ()=>getCache()?.ingresses || null;
const setCachedIngresses = (data)=>{
    if (getCache()) getCache().ingresses = data;
};
const getCachedJobs = ()=>getCache()?.jobs || null;
const setCachedJobs = (data)=>{
    if (getCache()) getCache().jobs = data;
};
const getCachedCronJobs = ()=>getCache()?.cronJobs || null;
const setCachedCronJobs = (data)=>{
    if (getCache()) getCache().cronJobs = data;
};
const getCachedNamespaces = ()=>getCache()?.namespaces || null;
const setCachedNamespaces = (data)=>{
    if (getCache()) getCache().namespaces = data;
};
const getCachedResourceQuotas = ()=>getCache()?.resourceQuotas || null;
const setCachedResourceQuotas = (data)=>{
    if (getCache()) getCache().resourceQuotas = data;
};
const getCachedLimitRanges = ()=>getCache()?.limitRanges || null;
const setCachedLimitRanges = (data)=>{
    if (getCache()) getCache().limitRanges = data;
};
// Helper to generate random date in the past
function randomDate(daysAgo) {
    const now = new Date();
    const ms = Math.random() * daysAgo * 24 * 60 * 60 * 1000;
    return new Date(now.getTime() - ms);
}
// Helper to generate random item from array
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
// Helper to calculate age from date
function calculateAge(date) {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMins = Math.floor(diffMs / (1000 * 60));
            return `${diffMins}m`;
        }
        return `${diffHours}h`;
    }
    return `${diffDays}d`;
}
function generateMockPods() {
    const cached = getCachedPods();
    if (cached) {
        return cached;
    }
    const statuses = [
        'Running',
        'Pending',
        'Failed',
        'CrashLoopBackOff'
    ];
    const apps = [
        'web-app',
        'api-server',
        'worker',
        'cache',
        'database'
    ];
    const nodes = [
        'node-1',
        'node-2',
        'node-3',
        'node-4'
    ];
    const pods = [];
    apps.forEach((app)=>{
        const replicas = Math.floor(Math.random() * 3) + 1;
        for(let i = 0; i < replicas; i++){
            const status = i === 0 && Math.random() > 0.8 ? randomItem(statuses) : 'Running';
            const hash = Math.random().toString(36).substring(2, 12);
            const restartCount = status === 'CrashLoopBackOff' ? Math.floor(Math.random() * 10) : 0;
            const hasProbes = Math.random() > 0.3 // 70% of pods have probes
            ;
            pods.push({
                name: `${app}-${hash}`,
                namespace: 'default',
                status,
                restartCount,
                age: calculateAge(randomDate(30)),
                nodeName: randomItem(nodes),
                ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                containers: [
                    {
                        name: app,
                        image: `${app}:latest`,
                        ready: status === 'Running',
                        restartCount,
                        livenessProbe: hasProbes ? {
                            type: 'httpGet',
                            httpGet: {
                                path: '/healthz',
                                port: 8080,
                                scheme: 'HTTP'
                            },
                            initialDelaySeconds: 15,
                            periodSeconds: 10,
                            timeoutSeconds: 1,
                            successThreshold: 1,
                            failureThreshold: 3
                        } : undefined,
                        readinessProbe: hasProbes ? {
                            type: 'httpGet',
                            httpGet: {
                                path: '/ready',
                                port: 8080,
                                scheme: 'HTTP'
                            },
                            initialDelaySeconds: 5,
                            periodSeconds: 5,
                            timeoutSeconds: 1,
                            successThreshold: 1,
                            failureThreshold: 3
                        } : undefined
                    }
                ],
                containerStatuses: [
                    {
                        name: app,
                        ready: status === 'Running',
                        restartCount,
                        state: status === 'Running' ? {
                            running: {
                                startedAt: randomDate(7).toISOString()
                            }
                        } : status === 'CrashLoopBackOff' ? {
                            waiting: {
                                reason: 'CrashLoopBackOff',
                                message: 'Back-off 5m0s restarting failed container'
                            }
                        } : {
                            waiting: {
                                reason: 'ContainerCreating'
                            }
                        },
                        lastState: restartCount > 0 ? {
                            terminated: {
                                exitCode: 1,
                                reason: 'Error',
                                message: 'Application crashed due to uncaught exception',
                                startedAt: randomDate(7).toISOString(),
                                finishedAt: randomDate(6).toISOString()
                            }
                        } : undefined
                    }
                ],
                labels: {
                    app,
                    version: 'v1'
                },
                ownerReferences: [
                    {
                        kind: 'ReplicaSet',
                        name: `${app}-${hash.substring(0, 5)}`,
                        uid: Math.random().toString(36).substring(2)
                    }
                ],
                configMaps: Math.random() > 0.7 ? [
                    `${app}-config`
                ] : [],
                secrets: Math.random() > 0.5 ? [
                    `${app}-secret`
                ] : []
            });
        }
    });
    setCachedPods(pods);
    return pods;
}
function generateMockDeployments() {
    const cached = getCachedDeployments();
    if (cached) {
        return cached;
    }
    const apps = [
        'web-app',
        'api-server',
        'worker',
        'cache',
        'database'
    ];
    const statuses = [
        'Available',
        'Progressing',
        'Degraded'
    ];
    const deployments = apps.map((app)=>{
        const desired = Math.floor(Math.random() * 3) + 1;
        const status = randomItem(statuses);
        const ready = status === 'Available' ? desired : Math.floor(Math.random() * desired);
        return {
            name: app,
            namespace: 'default',
            replicas: {
                desired,
                ready,
                available: ready,
                unavailable: desired - ready
            },
            status,
            age: calculateAge(randomDate(90)),
            labels: {
                app,
                tier: randomItem([
                    'frontend',
                    'backend',
                    'database'
                ])
            },
            selector: {
                app
            },
            strategy: 'RollingUpdate',
            configMaps: [
                `${app}-config`
            ],
            secrets: [
                `${app}-secret`
            ]
        };
    });
    setCachedDeployments(deployments);
    return deployments;
}
function generateMockNodes() {
    const cached = getCachedNodes();
    if (cached) {
        return cached;
    }
    const nodes = [];
    const statuses = [
        'Ready',
        'Ready',
        'Ready',
        'NotReady'
    ] // 75% ready
    ;
    for(let i = 1; i <= 4; i++){
        nodes.push({
            name: `node-${i}`,
            status: randomItem(statuses),
            roles: i === 1 ? [
                'control-plane',
                'master'
            ] : [
                'worker'
            ],
            age: calculateAge(randomDate(180)),
            version: 'v1.28.0',
            capacity: {
                cpu: `${Math.floor(Math.random() * 8) + 4}`,
                memory: `${Math.floor(Math.random() * 16) + 8}Gi`,
                pods: '110'
            },
            allocatable: {
                cpu: `${Math.floor(Math.random() * 7) + 3}`,
                memory: `${Math.floor(Math.random() * 14) + 6}Gi`,
                pods: '110'
            },
            labels: {
                'kubernetes.io/hostname': `node-${i}`,
                'node-role.kubernetes.io/worker': ''
            },
            conditions: [
                {
                    type: 'Ready',
                    status: randomItem(statuses) === 'Ready' ? 'True' : 'False',
                    reason: 'KubeletReady',
                    message: 'kubelet is posting ready status'
                }
            ]
        });
    }
    setCachedNodes(nodes);
    return nodes;
}
function generateMockConfigMaps() {
    const cached = getCachedConfigMaps();
    if (cached) {
        return cached;
    }
    const apps = [
        'web-app',
        'api-server',
        'worker',
        'cache',
        'database'
    ];
    const configMaps = apps.map((app)=>({
            name: `${app}-config`,
            namespace: 'default',
            age: calculateAge(randomDate(60)),
            data: {
                'app.conf': `key=value\napp=${app}`,
                'config.yaml': 'setting: true'
            },
            labels: {
                app
            }
        }));
    setCachedConfigMaps(configMaps);
    return configMaps;
}
function generateMockSecrets() {
    const cached = getCachedSecrets();
    if (cached) {
        return cached;
    }
    const apps = [
        'web-app',
        'api-server',
        'worker',
        'cache',
        'database'
    ];
    const types = [
        'Opaque',
        'kubernetes.io/tls',
        'kubernetes.io/dockerconfigjson'
    ];
    const secrets = apps.map((app)=>({
            name: `${app}-secret`,
            namespace: 'default',
            type: randomItem(types),
            age: calculateAge(randomDate(60)),
            keys: [
                'password',
                'api-key',
                'token'
            ],
            data: {
                password: btoa('super-secret-password-123'),
                'api-key': btoa('ak-1234567890abcdef'),
                token: btoa('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U')
            },
            labels: {
                app
            }
        }));
    setCachedSecrets(secrets);
    return secrets;
}
function generateMockHPAs() {
    const cached = getCachedHPAs();
    if (cached) {
        return cached;
    }
    const apps = [
        'web-app',
        'api-server',
        'worker'
    ];
    const hpas = apps.map((app)=>{
        const min = 2;
        const max = 10;
        const current = Math.floor(Math.random() * (max - min)) + min;
        return {
            name: `${app}-hpa`,
            namespace: 'default',
            targetRef: {
                kind: 'Deployment',
                name: app
            },
            minReplicas: min,
            maxReplicas: max,
            currentReplicas: current,
            desiredReplicas: current,
            metrics: [
                {
                    type: 'Resource',
                    resource: {
                        name: 'cpu',
                        target: {
                            type: 'Utilization',
                            averageUtilization: 80
                        },
                        current: {
                            averageUtilization: Math.floor(Math.random() * 100)
                        }
                    }
                }
            ],
            age: calculateAge(randomDate(30))
        };
    });
    setCachedHPAs(hpas);
    return hpas;
}
function generateMockPVs() {
    const cached = getCachedPVs();
    if (cached) {
        return cached;
    }
    const pvs = [];
    for(let i = 1; i <= 5; i++){
        pvs.push({
            name: `pv-${i}`,
            capacity: `${Math.floor(Math.random() * 50) + 10}Gi`,
            accessModes: [
                'ReadWriteOnce'
            ],
            reclaimPolicy: 'Delete',
            status: Math.random() > 0.2 ? 'Bound' : 'Available',
            claim: Math.random() > 0.2 ? `default/pvc-${i}` : undefined,
            storageClass: 'gp2',
            age: calculateAge(randomDate(90))
        });
    }
    setCachedPVs(pvs);
    return pvs;
}
function generateMockPVCs() {
    const cached = getCachedPVCs();
    if (cached) {
        return cached;
    }
    const apps = [
        'database',
        'cache'
    ];
    const pvcs = apps.map((app, i)=>({
            name: `${app}-pvc`,
            namespace: 'default',
            status: 'Bound',
            volume: `pv-${i + 1}`,
            capacity: `${Math.floor(Math.random() * 50) + 10}Gi`,
            accessModes: [
                'ReadWriteOnce'
            ],
            storageClass: 'gp2',
            age: calculateAge(randomDate(60))
        }));
    setCachedPVCs(pvcs);
    return pvcs;
}
function generateMockEvents() {
    const cached = getCachedEvents();
    if (cached) {
        return cached;
    }
    const events = [];
    const types = [
        'Normal',
        'Warning'
    ];
    const reasons = [
        'Created',
        'Started',
        'Pulled',
        'Killing',
        'FailedScheduling',
        'BackOff',
        'Unhealthy'
    ];
    const apps = [
        'web-app',
        'api-server',
        'worker',
        'cache',
        'database'
    ];
    for(let i = 0; i < 50; i++){
        const type = randomItem(types);
        const reason = randomItem(reasons);
        const app = randomItem(apps);
        const lastTimestamp = randomDate(1) // Last 24h
        ;
        events.push({
            type,
            reason,
            message: type === 'Warning' ? `Failed to pull image "${app}:latest": connection timeout` : `Successfully pulled image "${app}:latest"`,
            kind: randomItem([
                'Pod',
                'Deployment',
                'ReplicaSet'
            ]),
            name: `${app}-${Math.random().toString(36).substring(2, 12)}`,
            namespace: 'default',
            count: Math.floor(Math.random() * 10) + 1,
            firstTimestamp: randomDate(7).toISOString(),
            lastTimestamp: lastTimestamp.toISOString()
        });
    }
    // Sort by lastTimestamp descending
    const sortedEvents = events.sort((a, b)=>new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime());
    setCachedEvents(sortedEvents);
    return sortedEvents;
}
function generateMockServices() {
    const cached = getCachedServices();
    if (cached) return cached;
    const services = [
        {
            name: 'frontend-service',
            namespace: 'demo',
            type: 'LoadBalancer',
            clusterIP: '10.100.15.42',
            externalIPs: [
                '52.29.145.78'
            ],
            ports: [
                {
                    protocol: 'TCP',
                    port: 80,
                    targetPort: 8080
                },
                {
                    protocol: 'TCP',
                    port: 443,
                    targetPort: 8443
                }
            ],
            selector: {
                app: 'frontend',
                tier: 'web'
            },
            age: '15d',
            labels: {
                app: 'frontend',
                environment: 'production',
                version: 'v2.1.0'
            }
        },
        {
            name: 'backend-api-service',
            namespace: 'demo',
            type: 'ClusterIP',
            clusterIP: '10.100.23.15',
            ports: [
                {
                    name: 'http',
                    protocol: 'TCP',
                    port: 8080,
                    targetPort: 8080
                },
                {
                    name: 'metrics',
                    protocol: 'TCP',
                    port: 9090,
                    targetPort: 9090
                }
            ],
            selector: {
                app: 'backend-api',
                tier: 'backend'
            },
            age: '12d',
            labels: {
                app: 'backend-api',
                environment: 'production',
                version: 'v1.8.3'
            }
        },
        {
            name: 'database-service',
            namespace: 'demo',
            type: 'ClusterIP',
            clusterIP: '10.100.45.200',
            ports: [
                {
                    name: 'postgres',
                    protocol: 'TCP',
                    port: 5432,
                    targetPort: 5432
                }
            ],
            selector: {
                app: 'database',
                tier: 'data'
            },
            age: '30d',
            labels: {
                app: 'database',
                environment: 'production',
                version: 'v14.5'
            }
        },
        {
            name: 'redis-cache',
            namespace: 'demo',
            type: 'ClusterIP',
            clusterIP: '10.100.67.89',
            ports: [
                {
                    name: 'redis',
                    protocol: 'TCP',
                    port: 6379,
                    targetPort: 6379
                }
            ],
            selector: {
                app: 'redis',
                tier: 'cache'
            },
            age: '22d',
            labels: {
                app: 'redis',
                environment: 'production'
            }
        },
        {
            name: 'admin-panel',
            namespace: 'demo',
            type: 'NodePort',
            clusterIP: '10.100.89.123',
            ports: [
                {
                    name: 'http',
                    protocol: 'TCP',
                    port: 80,
                    targetPort: 3000,
                    nodePort: 30080
                }
            ],
            selector: {
                app: 'admin',
                tier: 'web'
            },
            age: '8d',
            labels: {
                app: 'admin',
                environment: 'production'
            }
        },
        {
            name: 'monitoring-service',
            namespace: 'demo',
            type: 'ClusterIP',
            clusterIP: '10.100.112.45',
            ports: [
                {
                    name: 'prometheus',
                    protocol: 'TCP',
                    port: 9090,
                    targetPort: 9090
                },
                {
                    name: 'grafana',
                    protocol: 'TCP',
                    port: 3000,
                    targetPort: 3000
                }
            ],
            selector: {
                app: 'monitoring'
            },
            age: '45d',
            labels: {
                app: 'monitoring',
                component: 'observability'
            }
        },
        {
            name: 'message-queue',
            namespace: 'demo',
            type: 'ClusterIP',
            clusterIP: '10.100.134.67',
            ports: [
                {
                    name: 'amqp',
                    protocol: 'TCP',
                    port: 5672,
                    targetPort: 5672
                },
                {
                    name: 'management',
                    protocol: 'TCP',
                    port: 15672,
                    targetPort: 15672
                }
            ],
            selector: {
                app: 'rabbitmq',
                tier: 'messaging'
            },
            age: '18d',
            labels: {
                app: 'rabbitmq',
                environment: 'production'
            }
        },
        {
            name: 'external-api',
            namespace: 'demo',
            type: 'ExternalName',
            clusterIP: '',
            externalIPs: [
                'api.external-service.com'
            ],
            ports: [],
            selector: {},
            age: '60d',
            labels: {
                type: 'external'
            }
        }
    ];
    setCachedServices(services);
    return services;
}
function generateMockIngresses() {
    const cached = getCachedIngresses();
    if (cached) return cached;
    const ingresses = [
        {
            name: 'frontend-ingress',
            namespace: 'demo',
            className: 'nginx',
            hosts: [
                'app.example.com',
                'www.example.com'
            ],
            rules: [
                {
                    host: 'app.example.com',
                    paths: [
                        {
                            path: '/',
                            pathType: 'Prefix',
                            backend: {
                                service: {
                                    name: 'frontend-service',
                                    port: {
                                        number: 80
                                    }
                                }
                            }
                        },
                        {
                            path: '/api',
                            pathType: 'Prefix',
                            backend: {
                                service: {
                                    name: 'backend-api-service',
                                    port: {
                                        number: 8080
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    host: 'www.example.com',
                    paths: [
                        {
                            path: '/',
                            pathType: 'Prefix',
                            backend: {
                                service: {
                                    name: 'frontend-service',
                                    port: {
                                        number: 80
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
            tls: [
                {
                    hosts: [
                        'app.example.com',
                        'www.example.com'
                    ],
                    secretName: 'example-com-tls'
                }
            ],
            age: '15d',
            labels: {
                app: 'frontend',
                environment: 'production'
            }
        },
        {
            name: 'admin-ingress',
            namespace: 'demo',
            className: 'nginx',
            hosts: [
                'admin.example.com'
            ],
            rules: [
                {
                    host: 'admin.example.com',
                    paths: [
                        {
                            path: '/',
                            pathType: 'Prefix',
                            backend: {
                                service: {
                                    name: 'admin-panel',
                                    port: {
                                        number: 80
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
            tls: [
                {
                    hosts: [
                        'admin.example.com'
                    ],
                    secretName: 'admin-tls'
                }
            ],
            age: '8d',
            labels: {
                app: 'admin',
                environment: 'production'
            }
        },
        {
            name: 'monitoring-ingress',
            namespace: 'demo',
            className: 'nginx',
            hosts: [
                'monitoring.example.com'
            ],
            rules: [
                {
                    host: 'monitoring.example.com',
                    paths: [
                        {
                            path: '/prometheus',
                            pathType: 'Prefix',
                            backend: {
                                service: {
                                    name: 'monitoring-service',
                                    port: {
                                        number: 9090
                                    }
                                }
                            }
                        },
                        {
                            path: '/grafana',
                            pathType: 'Prefix',
                            backend: {
                                service: {
                                    name: 'monitoring-service',
                                    port: {
                                        number: 3000
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
            age: '45d',
            labels: {
                app: 'monitoring',
                component: 'observability'
            }
        }
    ];
    setCachedIngresses(ingresses);
    return ingresses;
}
function generateMockJobs() {
    const cached = getCachedJobs();
    if (cached) return cached;
    const jobs = [
        {
            name: 'data-migration-20241114',
            namespace: 'demo',
            status: 'Complete',
            completions: 1,
            succeeded: 1,
            failed: 0,
            active: 0,
            startTime: '2024-11-14T08:00:00Z',
            completionTime: '2024-11-14T08:15:23Z',
            duration: '15m 23s',
            age: '6h',
            labels: {
                app: 'migration',
                type: 'batch'
            },
            conditions: [
                {
                    type: 'Complete',
                    status: 'True',
                    lastTransitionTime: '2024-11-14T08:15:23Z'
                }
            ]
        },
        {
            name: 'backup-database',
            namespace: 'demo',
            status: 'Running',
            completions: 1,
            succeeded: 0,
            failed: 0,
            active: 1,
            startTime: '2024-11-14T14:30:00Z',
            duration: '5m 12s',
            age: '5m',
            labels: {
                app: 'backup',
                type: 'batch'
            },
            conditions: []
        },
        {
            name: 'report-generation-failed',
            namespace: 'demo',
            status: 'Failed',
            completions: 1,
            succeeded: 0,
            failed: 1,
            active: 0,
            startTime: '2024-11-14T12:00:00Z',
            completionTime: '2024-11-14T12:02:15Z',
            duration: '2m 15s',
            age: '2h',
            labels: {
                app: 'reporting',
                type: 'batch'
            },
            conditions: [
                {
                    type: 'Failed',
                    status: 'True',
                    lastTransitionTime: '2024-11-14T12:02:15Z',
                    reason: 'BackoffLimitExceeded',
                    message: 'Job has reached the specified backoff limit'
                }
            ]
        },
        {
            name: 'cleanup-temp-files',
            namespace: 'demo',
            status: 'Complete',
            completions: 1,
            succeeded: 1,
            failed: 0,
            active: 0,
            startTime: '2024-11-14T06:00:00Z',
            completionTime: '2024-11-14T06:03:45Z',
            duration: '3m 45s',
            age: '8h',
            labels: {
                app: 'cleanup',
                type: 'maintenance'
            },
            conditions: [
                {
                    type: 'Complete',
                    status: 'True',
                    lastTransitionTime: '2024-11-14T06:03:45Z'
                }
            ]
        },
        {
            name: 'image-processing-batch',
            namespace: 'demo',
            status: 'Complete',
            completions: 5,
            succeeded: 5,
            failed: 0,
            active: 0,
            startTime: '2024-11-14T10:00:00Z',
            completionTime: '2024-11-14T10:45:30Z',
            duration: '45m 30s',
            age: '4h',
            labels: {
                app: 'image-processor',
                type: 'batch'
            },
            conditions: [
                {
                    type: 'Complete',
                    status: 'True',
                    lastTransitionTime: '2024-11-14T10:45:30Z'
                }
            ]
        }
    ];
    setCachedJobs(jobs);
    return jobs;
}
function generateMockCronJobs() {
    const cached = getCachedCronJobs();
    if (cached) return cached;
    const cronJobs = [
        {
            name: 'nightly-backup',
            namespace: 'demo',
            schedule: '0 2 * * *',
            suspend: false,
            active: 0,
            lastSchedule: '2024-11-14T02:00:00Z',
            lastSuccessfulTime: '2024-11-14T02:15:00Z',
            age: '60d',
            labels: {
                app: 'backup',
                frequency: 'daily'
            }
        },
        {
            name: 'hourly-reports',
            namespace: 'demo',
            schedule: '0 * * * *',
            suspend: false,
            active: 1,
            lastSchedule: '2024-11-14T14:00:00Z',
            lastSuccessfulTime: '2024-11-14T13:05:00Z',
            age: '30d',
            labels: {
                app: 'reporting',
                frequency: 'hourly'
            }
        },
        {
            name: 'weekly-cleanup',
            namespace: 'demo',
            schedule: '0 3 * * 0',
            suspend: false,
            active: 0,
            lastSchedule: '2024-11-10T03:00:00Z',
            lastSuccessfulTime: '2024-11-10T03:12:00Z',
            age: '45d',
            labels: {
                app: 'cleanup',
                frequency: 'weekly'
            }
        },
        {
            name: 'monthly-archive',
            namespace: 'demo',
            schedule: '0 4 1 * *',
            suspend: false,
            active: 0,
            lastSchedule: '2024-11-01T04:00:00Z',
            lastSuccessfulTime: '2024-11-01T04:30:00Z',
            age: '90d',
            labels: {
                app: 'archiver',
                frequency: 'monthly'
            }
        },
        {
            name: 'test-job-suspended',
            namespace: 'demo',
            schedule: '*/5 * * * *',
            suspend: true,
            active: 0,
            lastSchedule: '2024-11-13T15:00:00Z',
            lastSuccessfulTime: '2024-11-13T15:01:00Z',
            age: '10d',
            labels: {
                app: 'test',
                frequency: 'every-5-minutes'
            }
        }
    ];
    setCachedCronJobs(cronJobs);
    return cronJobs;
}
function generateMockDashboardSummary() {
    const deployments = generateMockDeployments();
    const pods = generateMockPods();
    const nodes = generateMockNodes();
    const pvs = generateMockPVs();
    const services = generateMockServices();
    const ingresses = generateMockIngresses();
    const jobs = generateMockJobs();
    const cronjobs = generateMockCronJobs();
    const statefulsets = generateMockStatefulSets();
    const daemonsets = generateMockDaemonSets();
    return {
        deployments: {
            total: deployments.length,
            healthy: deployments.filter((d)=>d.status === 'Available').length,
            degraded: deployments.filter((d)=>d.status === 'Degraded').length
        },
        pods: {
            total: pods.length,
            running: pods.filter((p)=>p.status === 'Running').length,
            pending: pods.filter((p)=>p.status === 'Pending').length,
            failed: pods.filter((p)=>p.status === 'Failed' || p.status === 'CrashLoopBackOff').length
        },
        nodes: {
            total: nodes.length,
            ready: nodes.filter((n)=>n.status === 'Ready').length,
            notReady: nodes.filter((n)=>n.status === 'NotReady').length
        },
        configMaps: generateMockConfigMaps().length,
        secrets: generateMockSecrets().length,
        hpa: generateMockHPAs().length,
        pv: {
            total: pvs.length,
            bound: pvs.filter((pv)=>pv.status === 'Bound').length
        },
        services: services.length,
        ingress: ingresses.length,
        jobs: {
            total: jobs.length,
            active: jobs.filter((j)=>j.active > 0).length,
            succeeded: jobs.filter((j)=>j.succeeded > 0).length,
            failed: jobs.filter((j)=>j.failed > 0).length
        },
        cronjobs: {
            total: cronjobs.length,
            active: jobs.filter((j)=>j.active > 0).length,
            suspended: cronjobs.filter((cj)=>cj.suspend).length
        },
        statefulsets: {
            total: statefulsets.length,
            ready: statefulsets.filter((s)=>s.replicas.ready === s.replicas.desired).length,
            notReady: statefulsets.filter((s)=>s.replicas.ready !== s.replicas.desired).length
        },
        daemonsets: {
            total: daemonsets.length,
            ready: daemonsets.filter((d)=>d.ready === d.desired).length,
            notReady: daemonsets.filter((d)=>d.ready !== d.desired).length
        }
    };
}
function generateMockPodMetrics(deploymentName, namespace = 'default') {
    const pods = generateMockPods().filter((p)=>p.namespace === namespace && p.labels['app'] && deploymentName.includes(p.labels['app']));
    if (pods.length === 0) {
        // If no matching pods, generate some generic ones
        const genericPod = {
            name: `${deploymentName}-abc123-xyz`,
            namespace,
            labels: {
                app: deploymentName
            }
        };
        pods.push(genericPod);
    }
    const metrics = pods.flatMap((pod)=>{
        const containerCount = Math.floor(Math.random() * 2) + 1;
        return Array.from({
            length: containerCount
        }, (_, i)=>{
            const cpuMillicores = Math.floor(Math.random() * 500) + 50 // 50-550m
            ;
            const memoryBytes = Math.floor(Math.random() * 500 * 1024 * 1024) + 100 * 1024 * 1024 // 100-600MB
            ;
            return {
                podName: pod.name,
                containerName: i === 0 ? pod.name.split('-')[0] : `sidecar-${i}`,
                cpu: `${cpuMillicores}m`,
                memory: `${Math.floor(memoryBytes / (1024 * 1024))}Mi`,
                cpuValue: cpuMillicores,
                memoryValue: memoryBytes
            };
        });
    });
    const requirements = pods.flatMap((pod)=>{
        const containerCount = Math.floor(Math.random() * 2) + 1;
        return Array.from({
            length: containerCount
        }, (_, i)=>{
            const cpuRequest = Math.floor(Math.random() * 300) + 100 // 100-400m
            ;
            const cpuLimit = cpuRequest + Math.floor(Math.random() * 500) + 200 // higher than request
            ;
            const memRequest = Math.floor(Math.random() * 300) + 200 // 200-500MB
            ;
            const memLimit = memRequest + Math.floor(Math.random() * 500) + 200 // higher than request
            ;
            return {
                podName: pod.name,
                containerName: i === 0 ? pod.name.split('-')[0] : `sidecar-${i}`,
                requests: {
                    cpu: `${cpuRequest}m`,
                    memory: `${memRequest}Mi`,
                    cpuValue: cpuRequest,
                    memoryValue: memRequest * 1024 * 1024
                },
                limits: {
                    cpu: `${cpuLimit}m`,
                    memory: `${memLimit}Mi`,
                    cpuValue: cpuLimit,
                    memoryValue: memLimit * 1024 * 1024
                }
            };
        });
    });
    return {
        deployment: deploymentName,
        namespace,
        metrics,
        requirements,
        timestamp: new Date().toISOString()
    };
}
function generateMockNamespaces() {
    const cached = getCachedNamespaces();
    if (cached) return cached;
    const namespaces = [
        {
            name: 'default',
            status: 'Active',
            age: '120d',
            labels: {},
            annotations: {}
        },
        {
            name: 'kube-system',
            status: 'Active',
            age: '120d',
            labels: {
                'kubernetes.io/metadata.name': 'kube-system'
            },
            annotations: {}
        },
        {
            name: 'production',
            status: 'Active',
            age: '90d',
            labels: {
                environment: 'production',
                team: 'platform'
            },
            annotations: {
                'description': 'Production workloads'
            }
        },
        {
            name: 'staging',
            status: 'Active',
            age: '90d',
            labels: {
                environment: 'staging',
                team: 'platform'
            },
            annotations: {
                'description': 'Staging environment for testing'
            }
        },
        {
            name: 'development',
            status: 'Active',
            age: '60d',
            labels: {
                environment: 'development',
                team: 'engineering'
            },
            annotations: {
                'description': 'Development workloads'
            }
        }
    ];
    setCachedNamespaces(namespaces);
    return namespaces;
}
function generateMockResourceQuotas() {
    const cached = getCachedResourceQuotas();
    if (cached) return cached;
    const quotas = [
        {
            name: 'production-quota',
            namespace: 'production',
            age: '90d',
            hard: {
                'requests.cpu': '100',
                'requests.memory': '200Gi',
                'limits.cpu': '200',
                'limits.memory': '400Gi',
                'persistentvolumeclaims': '50',
                'pods': '100'
            },
            used: {
                'requests.cpu': '75',
                'requests.memory': '150Gi',
                'limits.cpu': '150',
                'limits.memory': '300Gi',
                'persistentvolumeclaims': '32',
                'pods': '67'
            },
            labels: {
                environment: 'production'
            }
        },
        {
            name: 'staging-quota',
            namespace: 'staging',
            age: '90d',
            hard: {
                'requests.cpu': '50',
                'requests.memory': '100Gi',
                'limits.cpu': '100',
                'limits.memory': '200Gi',
                'pods': '50'
            },
            used: {
                'requests.cpu': '25',
                'requests.memory': '45Gi',
                'limits.cpu': '50',
                'limits.memory': '90Gi',
                'pods': '28'
            },
            labels: {
                environment: 'staging'
            }
        },
        {
            name: 'dev-quota',
            namespace: 'development',
            age: '60d',
            hard: {
                'requests.cpu': '30',
                'requests.memory': '60Gi',
                'limits.cpu': '60',
                'limits.memory': '120Gi',
                'pods': '30'
            },
            used: {
                'requests.cpu': '12',
                'requests.memory': '24Gi',
                'limits.cpu': '24',
                'limits.memory': '48Gi',
                'pods': '15'
            },
            labels: {
                environment: 'development'
            }
        }
    ];
    setCachedResourceQuotas(quotas);
    return quotas;
}
function generateMockLimitRanges() {
    const cached = getCachedLimitRanges();
    if (cached) return cached;
    const limitRanges = [
        {
            name: 'production-limits',
            namespace: 'production',
            age: '90d',
            limits: [
                {
                    type: 'Pod',
                    max: {
                        cpu: '4',
                        memory: '16Gi'
                    },
                    min: {
                        cpu: '100m',
                        memory: '128Mi'
                    }
                },
                {
                    type: 'Container',
                    max: {
                        cpu: '2',
                        memory: '8Gi'
                    },
                    min: {
                        cpu: '50m',
                        memory: '64Mi'
                    },
                    default: {
                        cpu: '500m',
                        memory: '512Mi'
                    },
                    defaultRequest: {
                        cpu: '100m',
                        memory: '128Mi'
                    }
                },
                {
                    type: 'PersistentVolumeClaim',
                    max: {
                        storage: '100Gi'
                    },
                    min: {
                        storage: '1Gi'
                    }
                }
            ],
            labels: {
                environment: 'production'
            }
        },
        {
            name: 'dev-limits',
            namespace: 'development',
            age: '60d',
            limits: [
                {
                    type: 'Container',
                    max: {
                        cpu: '1',
                        memory: '2Gi'
                    },
                    default: {
                        cpu: '200m',
                        memory: '256Mi'
                    },
                    defaultRequest: {
                        cpu: '100m',
                        memory: '128Mi'
                    }
                }
            ],
            labels: {
                environment: 'development'
            }
        }
    ];
    setCachedLimitRanges(limitRanges);
    return limitRanges;
}
function generateMockStatefulSets() {
    const cached = getCachedStatefulSets();
    if (cached) return cached;
    const statefulSets = [
        {
            name: 'redis-cluster',
            namespace: 'demo',
            replicas: {
                desired: 3,
                ready: 3,
                current: 3,
                updated: 3
            },
            status: 'Healthy',
            age: '45d',
            labels: {
                app: 'redis',
                component: 'cache'
            },
            selector: {
                app: 'redis'
            },
            serviceName: 'redis-service',
            updateStrategy: 'RollingUpdate',
            podManagementPolicy: 'OrderedReady',
            persistentVolumeClaims: [
                'redis-data'
            ],
            configMaps: [
                'redis-config'
            ],
            secrets: [
                'redis-credentials'
            ]
        },
        {
            name: 'elasticsearch',
            namespace: 'demo',
            replicas: {
                desired: 3,
                ready: 2,
                current: 3,
                updated: 2
            },
            status: 'Degraded',
            age: '60d',
            labels: {
                app: 'elasticsearch',
                tier: 'data'
            },
            selector: {
                app: 'elasticsearch'
            },
            serviceName: 'elasticsearch-service',
            updateStrategy: 'RollingUpdate',
            podManagementPolicy: 'Parallel',
            persistentVolumeClaims: [
                'elasticsearch-data',
                'elasticsearch-logs'
            ],
            configMaps: [
                'elasticsearch-config'
            ],
            secrets: []
        },
        {
            name: 'cassandra',
            namespace: 'demo',
            replicas: {
                desired: 5,
                ready: 5,
                current: 5,
                updated: 5
            },
            status: 'Healthy',
            age: '90d',
            labels: {
                app: 'cassandra',
                type: 'database'
            },
            selector: {
                app: 'cassandra'
            },
            serviceName: 'cassandra-service',
            updateStrategy: 'OnDelete',
            podManagementPolicy: 'OrderedReady',
            persistentVolumeClaims: [
                'cassandra-data'
            ],
            configMaps: [
                'cassandra-config'
            ],
            secrets: [
                'cassandra-keystore'
            ]
        },
        {
            name: 'zookeeper',
            namespace: 'demo',
            replicas: {
                desired: 3,
                ready: 3,
                current: 3,
                updated: 3
            },
            status: 'Healthy',
            age: '120d',
            labels: {
                app: 'zookeeper',
                component: 'coordination'
            },
            selector: {
                app: 'zookeeper'
            },
            serviceName: 'zookeeper-service',
            updateStrategy: 'RollingUpdate',
            podManagementPolicy: 'OrderedReady',
            persistentVolumeClaims: [
                'zookeeper-data',
                'zookeeper-logs'
            ],
            configMaps: [
                'zookeeper-config'
            ],
            secrets: []
        }
    ];
    setCachedStatefulSets(statefulSets);
    return statefulSets;
}
function generateMockDaemonSets() {
    const cached = getCachedDaemonSets();
    if (cached) return cached;
    const daemonSets = [
        {
            name: 'node-exporter',
            namespace: 'demo',
            desired: 3,
            current: 3,
            ready: 3,
            upToDate: 3,
            available: 3,
            status: 'Healthy',
            age: '60d',
            labels: {
                app: 'node-exporter',
                component: 'monitoring'
            },
            selector: {
                app: 'node-exporter'
            },
            updateStrategy: 'RollingUpdate',
            configMaps: [
                'node-exporter-config'
            ],
            secrets: []
        },
        {
            name: 'fluentd',
            namespace: 'demo',
            desired: 3,
            current: 3,
            ready: 2,
            upToDate: 3,
            available: 2,
            status: 'Degraded',
            age: '45d',
            labels: {
                app: 'fluentd',
                tier: 'logging'
            },
            selector: {
                app: 'fluentd'
            },
            updateStrategy: 'RollingUpdate',
            configMaps: [
                'fluentd-config'
            ],
            secrets: [
                'fluentd-credentials'
            ]
        },
        {
            name: 'kube-proxy',
            namespace: 'demo',
            desired: 3,
            current: 3,
            ready: 3,
            upToDate: 3,
            available: 3,
            status: 'Healthy',
            age: '180d',
            labels: {
                app: 'kube-proxy',
                component: 'networking'
            },
            selector: {
                app: 'kube-proxy'
            },
            updateStrategy: 'RollingUpdate',
            configMaps: [],
            secrets: []
        },
        {
            name: 'nvidia-device-plugin',
            namespace: 'demo',
            desired: 2,
            current: 2,
            ready: 2,
            upToDate: 2,
            available: 2,
            status: 'Healthy',
            age: '30d',
            labels: {
                app: 'nvidia-device-plugin',
                type: 'gpu'
            },
            selector: {
                app: 'nvidia-device-plugin'
            },
            updateStrategy: 'OnDelete',
            configMaps: [
                'nvidia-config'
            ],
            secrets: []
        },
        {
            name: 'calico-node',
            namespace: 'demo',
            desired: 3,
            current: 3,
            ready: 3,
            upToDate: 3,
            available: 3,
            status: 'Healthy',
            age: '200d',
            labels: {
                app: 'calico-node',
                component: 'cni'
            },
            selector: {
                app: 'calico-node'
            },
            updateStrategy: 'RollingUpdate',
            configMaps: [
                'calico-config'
            ],
            secrets: [
                'calico-etcd-secrets'
            ]
        }
    ];
    setCachedDaemonSets(daemonSets);
    return daemonSets;
}
function getMockPodLogs(podName, podStatus) {
    // Get pod status from cached pods if not provided
    if (!podStatus) {
        const pods = getCachedPods();
        const pod = pods?.find((p)=>p.name === podName);
        podStatus = pod?.status;
    }
    // Return failure logs for crashed/failing pods
    if (podStatus === 'Failed' || podStatus === 'CrashLoopBackOff' || podStatus === 'Error') {
        // Generate crash logs based on pod name
        const appName = podName.split('-')[0] || 'app';
        return `2025-01-17T10:30:45.123Z [INFO] Starting ${appName} service v2.1.0
2025-01-17T10:30:45.234Z [INFO] Loading configuration from /etc/config/app.yaml
2025-01-17T10:30:45.345Z [ERROR] Failed to load configuration: ENOENT: no such file or directory, open '/etc/config/app.yaml'
2025-01-17T10:30:45.456Z [ERROR] Required configuration file not found
2025-01-17T10:30:45.567Z [ERROR] Cannot start service without configuration
2025-01-17T10:30:45.678Z [FATAL] Fatal error during startup
2025-01-17T10:30:45.789Z [FATAL] Exiting with code 1
Error: ENOENT: no such file or directory, open '/etc/config/app.yaml'
    at Object.openSync (node:fs:590:3)
    at Object.readFileSync (node:fs:458:35)
    at loadConfig (/app/src/config.js:42:18)
    at startup (/app/src/index.js:12:5)
Process exited with code 1`;
    }
    // Return healthy logs for running pods
    const appName = podName.split('-')[0] || 'app';
    return `2025-01-17T10:20:00.000Z [INFO] ${appName} service v2.1.0 started successfully
2025-01-17T10:20:05.123Z [INFO] Health check passed
2025-01-17T10:20:10.234Z [INFO] Listening on port 8080
2025-01-17T10:20:15.345Z [INFO] Ready to accept connections
2025-01-17T10:20:20.456Z [INFO] GET /health 200 - 3ms
2025-01-17T10:20:25.567Z [INFO] GET /metrics 200 - 5ms
2025-01-17T10:20:30.678Z [INFO] All systems operational`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-pods.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePod",
    ()=>usePod,
    "usePodEvents",
    ()=>usePodEvents,
    "usePodLogs",
    ()=>usePodLogs,
    "usePods",
    ()=>usePods
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
;
function usePods(statusFilter) {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePods.useModeStore[mode]": (state)=>state.mode
    }["usePods.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePods.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["usePods.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePods.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["usePods.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'pods',
            mode,
            namespace,
            statusFilter
        ],
        queryFn: {
            "usePods.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "usePods.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["usePods.useQuery"]);
                    const pods = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockPods"])();
                    if (statusFilter) {
                        return pods.filter({
                            "usePods.useQuery": (pod)=>pod.status === statusFilter
                        }["usePods.useQuery"]);
                    }
                    return pods;
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const url = statusFilter ? `/api/pods?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}&status=${statusFilter}` : `/api/pods?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch pods');
                return response.json();
            }
        }["usePods.useQuery"],
        enabled: mode === 'demo' || !!namespace
    });
}
_s(usePods, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function usePod(name) {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePod.useModeStore[mode]": (state)=>state.mode
    }["usePod.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePod.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["usePod.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePod.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["usePod.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'pod',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "usePod.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "usePod.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["usePod.useQuery"]);
                    const pods = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockPods"])();
                    const pod = pods.find({
                        "usePod.useQuery.pod": (p)=>p.name === name
                    }["usePod.useQuery.pod"]);
                    if (!pod) throw new Error('Pod not found');
                    return pod;
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/pods/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch pod');
                return response.json();
            }
        }["usePod.useQuery"],
        enabled: !!name && (mode === 'demo' || !!namespace)
    });
}
_s1(usePod, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function usePodEvents(podName) {
    _s2();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePodEvents.useModeStore[mode]": (state)=>state.mode
    }["usePodEvents.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePodEvents.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["usePodEvents.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePodEvents.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["usePodEvents.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'pod-events',
            podName,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "usePodEvents.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "usePodEvents.useQuery": (resolve)=>setTimeout(resolve, 150)
                    }["usePodEvents.useQuery"]);
                    const allEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockEvents"])();
                    // Filter events related to this pod
                    return allEvents.filter({
                        "usePodEvents.useQuery": (event)=>event.kind === 'Pod' && event.name === podName
                    }["usePodEvents.useQuery"]);
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/pods/${podName}/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch pod events');
                return response.json();
            }
        }["usePodEvents.useQuery"],
        enabled: !!podName && (mode === 'demo' || !!namespace)
    });
}
_s2(usePodEvents, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function usePodLogs(podName, containerName, tail = 100) {
    _s3();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePodLogs.useModeStore[mode]": (state)=>state.mode
    }["usePodLogs.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePodLogs.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["usePodLogs.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePodLogs.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["usePodLogs.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'pod-logs',
            podName,
            containerName,
            tail,
            mode,
            namespace
        ],
        queryFn: {
            "usePodLogs.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "usePodLogs.useQuery": (resolve)=>setTimeout(resolve, 400)
                    }["usePodLogs.useQuery"]);
                    // Generate demo logs
                    const logLines = [];
                    const timestamps = [
                        '2024-01-15',
                        '2024-01-16',
                        '2024-01-17'
                    ];
                    const levels = [
                        'INFO',
                        'WARN',
                        'ERROR',
                        'DEBUG'
                    ];
                    const messages = [
                        'Application started successfully',
                        'Connected to database',
                        'Processing request from user',
                        'Cache miss for key',
                        'Request completed in 45ms',
                        'Memory usage: 512MB',
                        'Health check passed',
                        'Scheduled task executed'
                    ];
                    for(let i = 0; i < tail; i++){
                        const timestamp = timestamps[Math.floor(Math.random() * timestamps.length)];
                        const time = `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
                        const level = levels[Math.floor(Math.random() * levels.length)];
                        const message = messages[Math.floor(Math.random() * messages.length)];
                        logLines.push(`${timestamp} ${time} [${level}] ${containerName} - ${message}`);
                    }
                    return {
                        logs: logLines.join('\n'),
                        parsed: undefined
                    };
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/pods/${podName}/logs?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}&container=${containerName}&tail=${tail}`);
                if (!response.ok) throw new Error('Failed to fetch pod logs');
                const data = await response.json();
                return {
                    logs: data.logs,
                    parsed: data.parsed
                };
            }
        }["usePodLogs.useQuery"],
        enabled: !!podName && !!containerName && (mode === 'demo' || !!namespace),
        refetchInterval: false,
        staleTime: Infinity
    });
}
_s3(usePodLogs, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-nodes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNode",
    ()=>useNode,
    "useNodeEvents",
    ()=>useNodeEvents,
    "useNodePods",
    ()=>useNodePods,
    "useNodes",
    ()=>useNodes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
;
function useNodes(statusFilter) {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useNodes.useModeStore[mode]": (state)=>state.mode
    }["useNodes.useModeStore[mode]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'nodes',
            mode,
            statusFilter
        ],
        queryFn: {
            "useNodes.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useNodes.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useNodes.useQuery"]);
                    const nodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockNodes"])();
                    if (statusFilter) {
                        return nodes.filter({
                            "useNodes.useQuery": (node)=>node.status === statusFilter
                        }["useNodes.useQuery"]);
                    }
                    return nodes;
                }
                const url = statusFilter ? `/api/nodes?status=${statusFilter}` : '/api/nodes';
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch nodes');
                return response.json();
            }
        }["useNodes.useQuery"]
    });
}
_s(useNodes, "HlFC3hcyvIiWAmnytDgkHu9SaHg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useNode(name) {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useNode.useModeStore[mode]": (state)=>state.mode
    }["useNode.useModeStore[mode]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'node',
            name,
            mode
        ],
        queryFn: {
            "useNode.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useNode.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useNode.useQuery"]);
                    const nodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockNodes"])();
                    const node = nodes.find({
                        "useNode.useQuery.node": (n)=>n.name === name
                    }["useNode.useQuery.node"]);
                    if (!node) throw new Error('Node not found');
                    return node;
                }
                const response = await fetch(`/api/nodes/${name}`);
                if (!response.ok) throw new Error('Failed to fetch node');
                return response.json();
            }
        }["useNode.useQuery"],
        enabled: !!name
    });
}
_s1(useNode, "HlFC3hcyvIiWAmnytDgkHu9SaHg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useNodeEvents(nodeName) {
    _s2();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useNodeEvents.useModeStore[mode]": (state)=>state.mode
    }["useNodeEvents.useModeStore[mode]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'node-events',
            nodeName,
            mode
        ],
        queryFn: {
            "useNodeEvents.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useNodeEvents.useQuery": (resolve)=>setTimeout(resolve, 150)
                    }["useNodeEvents.useQuery"]);
                    const allEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockEvents"])();
                    // Filter events related to this node
                    return allEvents.filter({
                        "useNodeEvents.useQuery": (event)=>event.kind === 'Node' && event.name === nodeName
                    }["useNodeEvents.useQuery"]);
                }
                const response = await fetch(`/api/nodes/${nodeName}/events`);
                // If 403 (forbidden), return empty array instead of throwing
                if (!response.ok) {
                    if (response.status === 403) {
                        console.warn('Node events: insufficient permissions (403)');
                        return [];
                    }
                    throw new Error('Failed to fetch node events');
                }
                return response.json();
            }
        }["useNodeEvents.useQuery"],
        enabled: !!nodeName,
        retry: false
    });
}
_s2(useNodeEvents, "HlFC3hcyvIiWAmnytDgkHu9SaHg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useNodePods(nodeName) {
    _s3();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useNodePods.useModeStore[mode]": (state)=>state.mode
    }["useNodePods.useModeStore[mode]"]);
    const selectedNamespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useNodePods.useModeStore[selectedNamespace]": (state)=>state.selectedNamespace
    }["useNodePods.useModeStore[selectedNamespace]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'node-pods',
            nodeName,
            mode,
            selectedNamespace
        ],
        queryFn: {
            "useNodePods.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useNodePods.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useNodePods.useQuery"]);
                    const { generateMockPods } = await __turbopack_context__.A("[project]/app/lib/mocks/data.ts [app-client] (ecmascript, async loader)");
                    const allPods = generateMockPods();
                    // Filter pods running on this node
                    return allPods.filter({
                        "useNodePods.useQuery": (pod)=>pod.nodeName === nodeName
                    }["useNodePods.useQuery"]);
                }
                // Pass namespace to API to scope pod list to user's selected namespace
                const url = selectedNamespace ? `/api/nodes/${nodeName}/pods?namespace=${selectedNamespace}` : `/api/nodes/${nodeName}/pods`;
                const response = await fetch(url);
                // If 403 (forbidden), return empty array instead of throwing
                if (!response.ok) {
                    if (response.status === 403) {
                        console.warn('Node pods: insufficient permissions (403)');
                        return [];
                    }
                    throw new Error('Failed to fetch node pods');
                }
                return response.json();
            }
        }["useNodePods.useQuery"],
        enabled: !!nodeName,
        retry: false
    });
}
_s3(useNodePods, "cvR7QLSphBlHBMuf7HiwugbQebI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-deployments.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDeployment",
    ()=>useDeployment,
    "useDeploymentEvents",
    ()=>useDeploymentEvents,
    "useDeploymentPods",
    ()=>useDeploymentPods,
    "useDeployments",
    ()=>useDeployments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
;
function useDeployments() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeployments.useModeStore[mode]": (state)=>state.mode
    }["useDeployments.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeployments.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useDeployments.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeployments.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useDeployments.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'deployments',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useDeployments.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useDeployments.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useDeployments.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockDeployments"])();
                }
                // Real mode: fetch from API route (server-side)
                const response = await fetch(`/api/deployments?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch deployments');
                return response.json();
            }
        }["useDeployments.useQuery"]
    });
}
_s(useDeployments, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useDeployment(name) {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeployment.useModeStore[mode]": (state)=>state.mode
    }["useDeployment.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeployment.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useDeployment.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeployment.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useDeployment.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'deployment',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useDeployment.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useDeployment.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useDeployment.useQuery"]);
                    const deployments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockDeployments"])();
                    const deployment = deployments.find({
                        "useDeployment.useQuery.deployment": (d)=>d.name === name
                    }["useDeployment.useQuery.deployment"]);
                    if (!deployment) throw new Error('Deployment not found');
                    return deployment;
                }
                // Real mode: fetch from API route (server-side)
                const response = await fetch(`/api/deployments/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch deployment');
                return response.json();
            }
        }["useDeployment.useQuery"],
        enabled: !!name && (mode === 'demo' || !!namespace)
    });
}
_s1(useDeployment, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useDeploymentPods(deploymentName) {
    _s2();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeploymentPods.useModeStore[mode]": (state)=>state.mode
    }["useDeploymentPods.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeploymentPods.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useDeploymentPods.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeploymentPods.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useDeploymentPods.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'deployment-pods',
            deploymentName,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useDeploymentPods.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useDeploymentPods.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useDeploymentPods.useQuery"]);
                    const allPods = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockPods"])();
                    // Filter pods that belong to this deployment (by owner references or labels)
                    return allPods.filter({
                        "useDeploymentPods.useQuery": (pod)=>{
                            // Check if pod has owner reference to this deployment's ReplicaSet
                            const hasOwnerRef = pod.ownerReferences?.some({
                                "useDeploymentPods.useQuery": (ref)=>ref.kind === 'ReplicaSet' && ref.name.startsWith(deploymentName)
                            }["useDeploymentPods.useQuery"]);
                            // Or check if pod has matching app label
                            const hasMatchingLabel = pod.labels.app === deploymentName;
                            return hasOwnerRef || hasMatchingLabel;
                        }
                    }["useDeploymentPods.useQuery"]);
                }
                // Real mode: fetch from API route
                const response = await fetch(`/api/deployments/${deploymentName}/pods?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch deployment pods');
                return response.json();
            }
        }["useDeploymentPods.useQuery"],
        enabled: !!deploymentName && (mode === 'demo' || !!namespace)
    });
}
_s2(useDeploymentPods, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useDeploymentEvents(deploymentName) {
    _s3();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeploymentEvents.useModeStore[mode]": (state)=>state.mode
    }["useDeploymentEvents.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeploymentEvents.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useDeploymentEvents.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDeploymentEvents.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useDeploymentEvents.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'deployment-events',
            deploymentName,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useDeploymentEvents.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useDeploymentEvents.useQuery": (resolve)=>setTimeout(resolve, 150)
                    }["useDeploymentEvents.useQuery"]);
                    const allEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockEvents"])();
                    // Filter events related to this deployment
                    return allEvents.filter({
                        "useDeploymentEvents.useQuery": (event)=>event.kind === 'Deployment' && event.name === deploymentName
                    }["useDeploymentEvents.useQuery"]);
                }
                // Real mode: fetch from API route
                const response = await fetch(`/api/deployments/${deploymentName}/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch deployment events');
                return response.json();
            }
        }["useDeploymentEvents.useQuery"],
        enabled: !!deploymentName && (mode === 'demo' || !!namespace)
    });
}
_s3(useDeploymentEvents, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-navigate-to.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBuildPath",
    ()=>useBuildPath,
    "useNavigateTo",
    ()=>useNavigateTo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
function useNavigateTo() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useNavigateTo.useModeStore[mode]": (state)=>state.mode
    }["useNavigateTo.useModeStore[mode]"]);
    const navigateTo = (path)=>{
        // Check if we're currently on a /demo path or if mode is demo
        const isDemoMode = pathname.startsWith('/demo') || mode === 'demo';
        // If in demo mode and path doesn't already start with /demo, add it
        const finalPath = isDemoMode && !path.startsWith('/demo') ? `/demo${path}` : path;
        router.push(finalPath);
    };
    return navigateTo;
}
_s(useNavigateTo, "zEeFRY6UhOjqwmH1HB3xMwT9pfE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"]
    ];
});
function useBuildPath() {
    _s1();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useBuildPath.useModeStore[mode]": (state)=>state.mode
    }["useBuildPath.useModeStore[mode]"]);
    const buildPath = (path)=>{
        // Check if we're currently on a /demo path or if mode is demo
        const isDemoMode = pathname.startsWith('/demo') || mode === 'demo';
        // If in demo mode and path doesn't already start with /demo, add it
        return isDemoMode && !path.startsWith('/demo') ? `/demo${path}` : path;
    };
    return buildPath;
}
_s1(useBuildPath, "HD2pKc0GcnpqdB77+TEfaXyM0x4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/ai/context-collector.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * AI Context Collector
 *
 * Collects relevant Kubernetes context for AI troubleshooting analysis
 */ __turbopack_context__.s([
    "analyzeResourceMetrics",
    ()=>analyzeResourceMetrics,
    "collectDeploymentContext",
    ()=>collectDeploymentContext,
    "collectFailingPodsContext",
    ()=>collectFailingPodsContext,
    "collectPodContext",
    ()=>collectPodContext,
    "detectIssuesFromEvents",
    ()=>detectIssuesFromEvents
]);
async function collectDeploymentContext(deployment, namespace) {
    const context = {
        resource: {
            type: 'Deployment',
            name: deployment.name,
            namespace,
            status: deployment.status,
            data: {
                replicas: deployment.replicas,
                strategy: deployment.strategy,
                labels: deployment.labels,
                age: deployment.age
            }
        }
    };
    // Fetch related events
    try {
        const eventsRes = await fetch(`/api/deployments/${encodeURIComponent(deployment.name)}/events?namespace=${namespace}`);
        if (eventsRes.ok) {
            const events = await eventsRes.json();
            context.events = events.slice(0, 10).map((e)=>({
                    type: e.type,
                    reason: e.reason,
                    message: e.message,
                    count: e.count
                }));
        }
    } catch (error) {
        console.warn('Failed to fetch deployment events:', error);
    }
    return context;
}
async function collectPodContext(pod, namespace, containerName, mode = 'real') {
    const context = {
        resource: {
            type: 'Pod',
            name: pod.name,
            namespace,
            status: pod.status,
            data: {
                phase: pod.status,
                nodeName: pod.nodeName,
                ip: pod.ip,
                restartCount: pod.restartCount,
                containers: pod.containers,
                age: pod.age
            }
        }
    };
    // Fetch related events
    if (mode === 'demo') {
        // In demo mode, generate demo events for failing pods
        if (pod.status === 'Failed' || pod.status === 'CrashLoopBackOff') {
            context.events = [
                {
                    type: 'Warning',
                    reason: 'BackOff',
                    message: 'Back-off restarting failed container',
                    count: pod.restartCount || 5
                },
                {
                    type: 'Warning',
                    reason: 'Failed',
                    message: 'Error: ENOENT: no such file or directory, open \'/etc/config/app.yaml\'',
                    count: 1
                }
            ];
        }
    } else {
        try {
            const eventsRes = await fetch(`/api/pods/${encodeURIComponent(pod.name)}/events?namespace=${namespace}`);
            if (eventsRes.ok) {
                const events = await eventsRes.json();
                context.events = events.slice(0, 10).map((e)=>({
                        type: e.type,
                        reason: e.reason,
                        message: e.message,
                        count: e.count
                    }));
            }
        } catch (error) {
            console.warn('Failed to fetch pod events:', error);
        }
    }
    // Fetch logs
    if (containerName || pod.containers.length > 0) {
        const container = containerName || pod.containers[0];
        // In demo mode, use demo logs directly
        if (mode === 'demo') {
            const { getMockPodLogs } = await __turbopack_context__.A("[project]/app/lib/mocks/data.ts [app-client] (ecmascript, async loader)");
            const logsText = getMockPodLogs(pod.name, pod.status);
            context.logs = logsText.split('\n').filter(Boolean).slice(-20);
            return context;
        }
        // For crashed/failing pods, fetch previous logs (from crashed container)
        const isPodCrashed = pod.status === 'Failed' || pod.status === 'CrashLoopBackOff' || pod.restartCount && pod.restartCount > 0;
        try {
            // Try to get previous logs first if pod has crashed
            if (isPodCrashed) {
                const previousLogsUrl = `/api/pods/${encodeURIComponent(pod.name)}/logs?namespace=${namespace}&container=${container}&tail=50&previous=true`;
                const previousLogsRes = await fetch(previousLogsUrl);
                if (previousLogsRes.ok) {
                    const response = await previousLogsRes.json();
                    const logsText = typeof response === 'string' ? response : response.logs || '';
                    const previousLogs = logsText.split('\n').filter(Boolean).slice(-20);
                    if (previousLogs.length > 0) {
                        context.logs = previousLogs;
                        return context // Return early with previous logs
                        ;
                    }
                }
            }
            // Fall back to current logs
            const logsUrl = `/api/pods/${encodeURIComponent(pod.name)}/logs?namespace=${namespace}&container=${container}&tail=50`;
            const logsRes = await fetch(logsUrl);
            if (logsRes.ok) {
                const response = await logsRes.json();
                const logsText = typeof response === 'string' ? response : response.logs || '';
                context.logs = logsText.split('\n').filter(Boolean).slice(-20);
            }
        } catch (error) {
            console.warn('Failed to fetch pod logs:', error);
        }
    }
    return context;
}
function detectIssuesFromEvents(events) {
    const issues = [];
    const issuePatterns = [
        {
            pattern: /crashloopbackoff|backoff/i,
            issue: 'Pod is in CrashLoopBackOff - container is repeatedly crashing'
        },
        {
            pattern: /imagepullbackoff|errimagepull/i,
            issue: 'Cannot pull container image - check image name and registry access'
        },
        {
            pattern: /oomkilled|out of memory/i,
            issue: 'Container killed due to Out Of Memory - increase memory limits'
        },
        {
            pattern: /insufficient (cpu|memory)/i,
            issue: 'Insufficient resources - cluster may be overcommitted'
        },
        {
            pattern: /failed scheduling/i,
            issue: 'Pod cannot be scheduled - check node resources and constraints'
        },
        {
            pattern: /liveness probe failed|readiness probe failed/i,
            issue: 'Health probe failing - application may not be responding correctly'
        }
    ];
    events.forEach((event)=>{
        const text = `${event.reason} ${event.message}`.toLowerCase();
        issuePatterns.forEach(({ pattern, issue })=>{
            if (pattern.test(text) && !issues.includes(issue)) {
                issues.push(issue);
            }
        });
    });
    return issues;
}
function analyzeResourceMetrics(metrics) {
    const issues = [];
    if (metrics.cpu) {
        const cpuMatch = metrics.cpu.match(/(\d+)%/);
        if (cpuMatch) {
            const cpuPercent = parseInt(cpuMatch[1]);
            if (cpuPercent > 90) {
                issues.push('CPU usage is critically high (>90%)');
            } else if (cpuPercent > 75) {
                issues.push('CPU usage is elevated (>75%)');
            }
        }
    }
    if (metrics.memory) {
        const memMatch = metrics.memory.match(/(\d+)%/);
        if (memMatch) {
            const memPercent = parseInt(memMatch[1]);
            if (memPercent > 90) {
                issues.push('Memory usage is critically high (>90%) - risk of OOM');
            } else if (memPercent > 75) {
                issues.push('Memory usage is elevated (>75%)');
            }
        }
    }
    return issues;
}
async function collectFailingPodsContext(namespace = 'default', mode = 'real') {
    try {
        let pods = [];
        if (mode === 'demo') {
            // In demo mode, use demo data directly instead of calling API
            const { generateMockPods } = await __turbopack_context__.A("[project]/app/lib/mocks/data.ts [app-client] (ecmascript, async loader)");
            pods = generateMockPods();
        } else {
            // In real mode, fetch from API
            const response = await fetch(`/api/pods?namespace=${namespace}`);
            if (!response.ok) {
                return '';
            }
            pods = await response.json();
        }
        // Filter failing pods
        const failingPods = pods.filter((pod)=>pod.status === 'Failed' || pod.status === 'CrashLoopBackOff' || pod.restartCount && pod.restartCount > 3);
        if (failingPods.length === 0) return '';
        const contexts = await Promise.all(failingPods.slice(0, 3).map(async (pod)=>{
            const podContext = await collectPodContext(pod, pod.namespace || 'default', undefined, mode);
            let contextText = `\n## Pod: ${pod.name} (${pod.namespace || 'default'})\n`;
            contextText += `Status: ${pod.status}\n`;
            contextText += `Restarts: ${pod.restartCount || 0}\n`;
            if (podContext.events && podContext.events.length > 0) {
                contextText += `\nRecent Events:\n`;
                podContext.events.forEach((e)=>{
                    contextText += `- [${e.type}] ${e.reason}: ${e.message}\n`;
                });
            }
            if (podContext.logs && podContext.logs.length > 0) {
                contextText += `\nRecent Logs (last 20 lines):\n`;
                contextText += '```\n';
                contextText += podContext.logs.join('\n');
                contextText += '\n```\n';
            }
            return contextText;
        }));
        return contexts.join('\n');
    } catch (error) {
        console.warn('Failed to collect failing pods context:', error);
        return '';
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/dashboard/critical-alerts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CriticalAlerts",
    ()=>CriticalAlerts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$List$2f$List$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/List/List.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItem$2f$ListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ListItem/ListItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItemIcon$2f$ListItemIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ListItemIcon/ListItemIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItemText$2f$ListItemText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ListItemText/ListItemText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Collapse$2f$Collapse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Collapse/Collapse.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ErrorOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ErrorOutline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$WarningAmber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/WarningAmber.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandMore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ExpandMore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandLess$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ExpandLess.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$AutoFixHigh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/AutoFixHigh.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$pods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-pods.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$nodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-nodes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$deployments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-deployments.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-navigate-to.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$ai$2f$context$2d$collector$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/ai/context-collector.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/providers/ThemeProvider.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const STORAGE_KEY = 'criticalAlertsExpanded';
function CriticalAlerts({ summary }) {
    _s();
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "CriticalAlerts.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const saved = localStorage.getItem(STORAGE_KEY);
                return saved === null ? true : saved === 'true';
            }
            //TURBOPACK unreachable
            ;
        }
    }["CriticalAlerts.useState"]);
    const [aiExplanations, setAiExplanations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [aiLoading, setAiLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [hasApiKey, setHasApiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { data: pods, refetch: refetchPods } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$pods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePods"])();
    const { data: nodes, refetch: refetchNodes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$nodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodes"])();
    const { data: deployments, refetch: refetchDeployments } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$deployments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeployments"])();
    const navigateTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"])();
    const { isPinned } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebarPins"])();
    const { isResourceEnabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCriticalIssuesSettings"])();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "CriticalAlerts.useModeStore[mode]": (state)=>state.mode
    }["CriticalAlerts.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "CriticalAlerts.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["CriticalAlerts.useModeStore[namespace]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CriticalAlerts.useEffect": ()=>{
            const apiKey = localStorage.getItem('kubevista_openai_key');
            setHasApiKey(!!apiKey);
            const handleKeyUpdate = {
                "CriticalAlerts.useEffect.handleKeyUpdate": ()=>{
                    const key = localStorage.getItem('kubevista_openai_key');
                    setHasApiKey(!!key);
                }
            }["CriticalAlerts.useEffect.handleKeyUpdate"];
            window.addEventListener('openai-key-updated', handleKeyUpdate);
            return ({
                "CriticalAlerts.useEffect": ()=>window.removeEventListener('openai-key-updated', handleKeyUpdate)
            })["CriticalAlerts.useEffect"];
        }
    }["CriticalAlerts.useEffect"], []);
    // Save to localStorage when expanded changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CriticalAlerts.useEffect": ()=>{
            localStorage.setItem(STORAGE_KEY, expanded.toString());
        }
    }["CriticalAlerts.useEffect"], [
        expanded
    ]);
    // Auto-refresh critical alerts every 5 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CriticalAlerts.useEffect": ()=>{
            const interval = setInterval({
                "CriticalAlerts.useEffect.interval": ()=>{
                    refetchPods();
                    refetchNodes();
                    refetchDeployments();
                }
            }["CriticalAlerts.useEffect.interval"], 5000) // 5 seconds
            ;
            return ({
                "CriticalAlerts.useEffect": ()=>clearInterval(interval)
            })["CriticalAlerts.useEffect"];
        }
    }["CriticalAlerts.useEffect"], [
        refetchPods,
        refetchNodes,
        refetchDeployments
    ]);
    const getAIExplanation = async (alert, index)=>{
        if (!hasApiKey) return;
        setAiLoading((prev)=>({
                ...prev,
                [index]: true
            }));
        setAiExplanations((prev)=>({
                ...prev,
                [index]: ''
            }));
        try {
            const apiKey = localStorage.getItem('kubevista_openai_key');
            if (!apiKey) return;
            // Collect detailed context from failing pods
            const failingPodsContext = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$ai$2f$context$2d$collector$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collectFailingPodsContext"])(namespace || 'default', mode);
            const query = `Explain this Kubernetes issue:

**Issue:** ${alert.message}

${failingPodsContext ? `**Detailed Pod Information:**${failingPodsContext}\n` : ''}

Provide only:
1. **What's happening** - Brief explanation based on the actual logs and events
2. **Root cause** - Why this is occurring (reference specific errors from logs if available)

Keep it concise and practical.`;
            const response = await fetch('/api/ai/troubleshoot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query,
                    apiKey
                })
            });
            if (!response.ok) throw new Error('Failed to get AI explanation');
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let explanation = '';
            if (reader) {
                while(true){
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    explanation += chunk;
                    setAiExplanations((prev)=>({
                            ...prev,
                            [index]: explanation
                        }));
                }
            }
            setAiLoading((prev)=>({
                    ...prev,
                    [index]: false
                }));
        } catch (error) {
            console.error('Failed to get AI explanation:', error);
            setAiLoading((prev)=>({
                    ...prev,
                    [index]: false
                }));
        }
    };
    const getCriticalAlerts = ()=>{
        const alerts = [];
        // Critical: Failed pods (only if pods are visible and enabled)
        if (isPinned('/pods') && isResourceEnabled('pods') && summary.pods.failed > 0) {
            const failedPods = pods?.filter((p)=>p.status === 'Failed' || p.status === 'CrashLoopBackOff') || [];
            if (failedPods.length === 1) {
                // Single pod - go directly to pod details
                alerts.push({
                    severity: 'error',
                    message: `1 pod is failing: ${failedPods[0].name}`,
                    path: `/pods/${failedPods[0].name}`,
                    type: 'pod',
                    name: failedPods[0].name
                });
            } else {
                // Multiple pods - go to pods page with Failed filter
                alerts.push({
                    severity: 'error',
                    message: `${summary.pods.failed} pods are failing`,
                    path: '/pods?status=Failed',
                    type: 'pod'
                });
            }
        }
        // Critical: Not ready nodes (only if nodes are visible and enabled)
        if (isPinned('/nodes') && isResourceEnabled('nodes') && summary.nodes.notReady > 0) {
            const notReadyNodes = nodes?.filter((n)=>n.status === 'NotReady') || [];
            if (notReadyNodes.length === 1) {
                // Single node - go directly to node details
                alerts.push({
                    severity: 'error',
                    message: `1 node is not ready: ${notReadyNodes[0].name}`,
                    path: `/nodes/${notReadyNodes[0].name}`
                });
            } else {
                // Multiple nodes - go to nodes page with NotReady filter
                alerts.push({
                    severity: 'error',
                    message: `${summary.nodes.notReady} nodes are not ready`,
                    path: '/nodes?status=NotReady'
                });
            }
        }
        // Critical: Degraded deployments (only if deployments are visible and enabled)
        if (isPinned('/deployments') && isResourceEnabled('deployments') && summary.deployments.degraded > 0) {
            const degradedDeployments = deployments?.filter((d)=>d.status === 'Degraded') || [];
            const percent = summary.deployments.degraded / summary.deployments.total * 100;
            if (degradedDeployments.length === 1) {
                // Single deployment - go directly to deployment details
                alerts.push({
                    severity: percent > 30 ? 'error' : 'warning',
                    message: `1 deployment is degraded: ${degradedDeployments[0].name}`,
                    path: `/deployments/${degradedDeployments[0].name}`
                });
            } else {
                // Multiple deployments - go to deployments page with Degraded filter
                if (percent > 30) {
                    alerts.push({
                        severity: 'error',
                        message: `${summary.deployments.degraded} deployments are degraded (${Math.round(percent)}%)`,
                        path: '/deployments?status=Degraded'
                    });
                } else {
                    alerts.push({
                        severity: 'warning',
                        message: `${summary.deployments.degraded} deployments are degraded`,
                        path: '/deployments?status=Degraded'
                    });
                }
            }
        }
        // Warning: Many pending pods (only if pods are visible and enabled)
        if (isPinned('/pods') && isResourceEnabled('pods') && summary.pods.pending > 0) {
            const percent = summary.pods.pending / summary.pods.total * 100;
            if (percent > 20) {
                alerts.push({
                    severity: 'warning',
                    message: `${summary.pods.pending} pod${summary.pods.pending > 1 ? 's are' : ' is'} pending (${Math.round(percent)}%)`,
                    path: '/pods'
                });
            }
        }
        // Warning: Unbound volumes (only if PVs are visible and enabled)
        if (isPinned('/pv') && isResourceEnabled('pv')) {
            const unboundVolumes = summary.pv.total - summary.pv.bound;
            if (unboundVolumes > 5) {
                alerts.push({
                    severity: 'warning',
                    message: `${unboundVolumes} persistent volumes are unbound`,
                    path: '/pv'
                });
            }
        }
        return alerts;
    };
    const alerts = getCriticalAlerts();
    if (alerts.length === 0) {
        return null;
    }
    const errorAlerts = alerts.filter((a)=>a.severity === 'error');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        elevation: 0,
        sx: {
            py: expanded ? 2.5 : 1,
            px: 3,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
            overflow: 'hidden',
            // Liquid glass effect with gradient
            backgroundColor: (theme)=>theme.palette.mode === 'dark' ? errorAlerts.length > 0 ? 'rgba(40, 30, 35, 0.5)' : 'rgba(40, 35, 30, 0.5)' : errorAlerts.length > 0 ? 'rgba(255, 245, 245, 0.25)' : 'rgba(255, 250, 245, 0.25)',
            ...isGlass && {
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)'
            },
            border: '1px solid',
            borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)',
            ...isGlass && {
                boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)' : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)'
            },
            // Gradient overlay for depth
            '&::before': isGlass ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                background: (theme)=>theme.palette.mode === 'dark' ? errorAlerts.length > 0 ? 'linear-gradient(135deg, rgba(211, 47, 47, 0.12) 0%, rgba(211, 47, 47, 0.04) 30%, transparent 50%, rgba(0, 0, 0, 0.15) 100%)' : 'linear-gradient(135deg, rgba(237, 108, 2, 0.12) 0%, rgba(237, 108, 2, 0.04) 30%, transparent 50%, rgba(0, 0, 0, 0.15) 100%)' : errorAlerts.length > 0 ? 'linear-gradient(135deg, rgba(211, 47, 47, 0.08) 0%, rgba(211, 47, 47, 0.02) 30%, transparent 50%, rgba(0, 0, 0, 0.03) 100%)' : 'linear-gradient(135deg, rgba(237, 108, 2, 0.08) 0%, rgba(237, 108, 2, 0.02) 30%, transparent 50%, rgba(0, 0, 0, 0.03) 100%)',
                pointerEvents: 'none',
                borderRadius: (theme)=>`${theme.shape.borderRadius}px`
            } : {}
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                position: 'relative',
                zIndex: 1
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        userSelect: 'none'
                    },
                    onClick: ()=>setExpanded(!expanded),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "body1",
                            sx: {
                                fontWeight: 700,
                                color: errorAlerts.length > 0 ? 'error.main' : 'warning.main'
                            },
                            children: errorAlerts.length > 0 ? 'Critical Issues Detected' : 'Warnings'
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            size: "small",
                            sx: {
                                ml: 1
                            },
                            children: expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandLess$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                lineNumber: 334,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandMore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                lineNumber: 334,
                                columnNumber: 46
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                            lineNumber: 330,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                    lineNumber: 317,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Collapse$2f$Collapse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    in: expanded,
                    timeout: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$List$2f$List$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        dense: true,
                        sx: {
                            pt: 1
                        },
                        children: alerts.map((alert, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItem$2f$ListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            px: 0,
                                            py: 0.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                onClick: ()=>navigateTo(alert.path),
                                                sx: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flex: 1,
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.2s',
                                                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                                                    '&:hover': {
                                                        bgcolor: 'action.hover'
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItemIcon$2f$ListItemIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        sx: {
                                                            minWidth: 32
                                                        },
                                                        children: alert.severity === 'error' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ErrorOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            sx: {
                                                                fontSize: 20,
                                                                color: 'error.main'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$WarningAmber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            sx: {
                                                                fontSize: 20,
                                                                color: 'warning.main'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItemText$2f$ListItemText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        primary: alert.message,
                                                        primaryTypographyProps: {
                                                            variant: 'body2',
                                                            fontWeight: 500
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                                lineNumber: 350,
                                                columnNumber: 19
                                            }, this),
                                            hasApiKey && alert.severity === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                size: "small",
                                                startIcon: aiLoading[index] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 53
                                                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$AutoFixHigh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                    fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 86
                                                }, void 0),
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    getAIExplanation(alert, index);
                                                },
                                                disabled: aiLoading[index],
                                                sx: {
                                                    ml: 1,
                                                    minWidth: 'auto',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    fontSize: '0.75rem',
                                                    textTransform: 'none',
                                                    // Liquid glass effect
                                                    backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)',
                                                    ...isGlass && {
                                                        backdropFilter: 'blur(12px) saturate(180%)',
                                                        WebkitBackdropFilter: 'blur(12px) saturate(180%)'
                                                    },
                                                    border: '1px solid',
                                                    borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)',
                                                    ...isGlass && {
                                                        boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 2px 8px 0 rgba(139, 92, 246, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)' : '0 2px 8px 0 rgba(139, 92, 246, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)'
                                                    },
                                                    color: 'primary.main',
                                                    '&:hover': {
                                                        backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.15)',
                                                        borderColor: 'primary.main'
                                                    },
                                                    '&:disabled': {
                                                        backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'
                                                    }
                                                },
                                                children: "AI Explain"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                                lineNumber: 380,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                        lineNumber: 341,
                                        columnNumber: 17
                                    }, this),
                                    aiExplanations[index] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            ml: 4,
                                            mb: 1,
                                            p: 2,
                                            '& p': {
                                                mb: 1
                                            },
                                            '& h1, & h2, & h3, & h4, & h5, & h6': {
                                                mt: 2,
                                                mb: 1
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                            children: aiExplanations[index]
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                            lineNumber: 444,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                        lineNumber: 437,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                                lineNumber: 340,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
                    lineNumber: 337,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
            lineNumber: 316,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/dashboard/critical-alerts.tsx",
        lineNumber: 262,
        columnNumber: 5
    }, this);
}
_s(CriticalAlerts, "YSzuQ2LkDK7DJnL8U4506XYI1go=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$pods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePods"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$nodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$deployments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeployments"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebarPins"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCriticalIssuesSettings"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"]
    ];
});
_c = CriticalAlerts;
var _c;
__turbopack_context__.k.register(_c, "CriticalAlerts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/common/resource-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResourceCard",
    ()=>ResourceCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/providers/ThemeProvider.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function ResourceCard({ name, resourceType, resourceColor, icon: Icon, onClick, statusBadge, metrics, footer }) {
    _s();
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const isLiquidGlass = visualPreset === 'liquidGlass';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        onClick: onClick,
        elevation: isGlass ? 0 : 1,
        sx: {
            p: 2,
            cursor: onClick ? 'pointer' : 'default',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
            overflow: 'hidden',
            // Conditional glass effects
            ...isGlass && {
                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid',
                borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)',
                boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)' : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)'
            },
            // Gradient shine only for liquid glass
            ...isLiquidGlass && {
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: (theme)=>theme.palette.mode === 'dark' ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%, rgba(0, 0, 0, 0.1) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 60%, rgba(0, 0, 0, 0.02) 100%)',
                    pointerEvents: 'none',
                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                }
            },
            '&:hover': {
                ...isGlass && {
                    transform: 'translateY(-2px) scale(1.01)',
                    borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(209, 213, 219, 0.6)',
                    backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(50, 50, 70, 0.7)' : 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(28px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                    boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 2px 2px 0 rgba(255, 255, 255, 0.12), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 2px 2px 0 rgba(255, 255, 255, 1), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.08)'
                }
            },
            '&:active': {
                ...isGlass && {
                    transform: 'translateY(0px) scale(0.98)'
                }
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    mb: 1.5,
                    position: 'relative',
                    zIndex: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            width: 44,
                            height: 44,
                            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: (theme)=>theme.palette.mode === 'dark' ? `linear-gradient(135deg, ${resourceColor}25 0%, ${resourceColor}15 100%)` : `linear-gradient(135deg, ${resourceColor}30 0%, ${resourceColor}15 100%)`,
                            ...isGlass && {
                                backdropFilter: 'blur(10px)'
                            },
                            border: '1px solid',
                            borderColor: (theme)=>theme.palette.mode === 'dark' ? `${resourceColor}40` : `${resourceColor}30`,
                            flexShrink: 0,
                            boxShadow: (theme)=>theme.palette.mode === 'dark' ? `0 2px 8px 0 ${resourceColor}20` : `0 2px 8px 0 ${resourceColor}15`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            sx: {
                                fontSize: 22,
                                color: resourceColor,
                                opacity: 0.95
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/common/resource-card.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/resource-card.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            flexGrow: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                sx: {
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    lineHeight: 1.3,
                                    mb: 0.5
                                },
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/resource-card.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    opacity: 0.8
                                },
                                children: resourceType
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/resource-card.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/resource-card.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/resource-card.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            statusBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 1.5,
                    position: 'relative',
                    zIndex: 1
                },
                children: statusBadge
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/resource-card.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, this),
            metrics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    flexGrow: 1,
                    position: 'relative',
                    zIndex: 1
                },
                children: metrics
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/resource-card.tsx",
                lineNumber: 173,
                columnNumber: 9
            }, this),
            footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mt: 'auto',
                    pt: 1.5,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    zIndex: 1
                },
                children: footer
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/resource-card.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/common/resource-card.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(ResourceCard, "c0MZhghFmuZD3dgcE5n4BKV0J3M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ResourceCard;
var _c;
__turbopack_context__.k.register(_c, "ResourceCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/dashboard/resource-overview-v2.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResourceOverviewV2",
    ()=>ResourceOverviewV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$AccountTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/AccountTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Widgets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Widgets.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Work$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Work.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Schedule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Schedule.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Cloud.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$FolderOpen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/FolderOpen.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$SettingsSystemDaydream$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/SettingsSystemDaydream.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Description$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Description.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Lock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/resource-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-navigate-to.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const resourceConfigs = [
    // Workloads - in sidebar order
    {
        path: '/deployments',
        name: 'Deployments',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$AccountTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#6366F1',
        getResourceType: (s)=>`${s.deployments.total} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Healthy"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "success.main",
                                children: s.deployments.healthy
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Degraded"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "error.main",
                                children: s.deployments.degraded
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        path: '/statefulsets',
        name: 'StatefulSets',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#7C3AED',
        getResourceType: (s)=>`${s.statefulsets?.total || 0} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Ready"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "success.main",
                                children: s.statefulsets?.ready || 0
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Not Ready"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "error.main",
                                children: s.statefulsets?.notReady || 0
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        path: '/daemonsets',
        name: 'DaemonSets',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$SettingsSystemDaydream$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#9333EA',
        getResourceType: (s)=>`${s.daemonsets?.total || 0} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Ready"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "success.main",
                                children: s.daemonsets?.ready || 0
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Not Ready"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "error.main",
                                children: s.daemonsets?.notReady || 0
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        path: '/pods',
        name: 'Pods',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Widgets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#8B5CF6',
        getResourceType: (s)=>`${s.pods.total} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Running"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "success.main",
                                children: s.pods.running
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Failed"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "error.main",
                                children: s.pods.failed
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        path: '/jobs',
        name: 'Jobs',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Work$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#EC4899',
        getResourceType: (s)=>`${s.jobs?.total || 0} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "info.main",
                                children: s.jobs?.active || 0
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Succeeded"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "success.main",
                                children: s.jobs?.succeeded || 0
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        path: '/cronjobs',
        name: 'CronJobs',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Schedule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#A855F7',
        getResourceType: (s)=>`${s.cronjobs?.total || 0} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "info.main",
                                children: s.cronjobs?.active || 0
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Suspended"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "warning.main",
                                children: s.cronjobs?.suspended || 0
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    // Network
    {
        path: '/services',
        name: 'Services',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#3B82F6',
        getResourceType: (s)=>`${s.services || 0} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body1",
                        fontWeight: 700,
                        children: s.services || 0
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "caption",
                        color: "text.secondary",
                        children: "Click to view details"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        path: '/ingress',
        name: 'Ingress',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#0EA5E9',
        getResourceType: (s)=>`${s.ingress || 0} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body1",
                        fontWeight: 700,
                        children: s.ingress || 0
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "caption",
                        color: "text.secondary",
                        children: "Click to view details"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    // Config & Storage
    {
        path: '/configmaps',
        name: 'ConfigMaps',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Description$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#10B981',
        getResourceType: (s)=>`${s.configMaps || 0} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body1",
                        fontWeight: 700,
                        children: s.configMaps || 0
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "caption",
                        color: "text.secondary",
                        children: "Click to view details"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        path: '/secrets',
        name: 'Secrets',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#F43F5E',
        getResourceType: (s)=>`${s.secrets || 0} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body1",
                        fontWeight: 700,
                        children: s.secrets || 0
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "caption",
                        color: "text.secondary",
                        children: "Click to view details"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        path: '/pv',
        name: 'Persistent Volumes',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$FolderOpen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: '#F59E0B',
        getResourceType: (s)=>`${s.pv.total} total`,
        renderMetrics: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Bound"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "success.main",
                                children: s.pv.bound
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 281,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mb: 0.5
                                },
                                children: "Unbound"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body1",
                                fontWeight: 700,
                                color: "warning.main",
                                children: s.pv.total - s.pv.bound
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    }
];
const sections = [
    {
        title: 'Workloads',
        resourcePaths: [
            '/deployments',
            '/statefulsets',
            '/daemonsets',
            '/pods',
            '/jobs',
            '/cronjobs'
        ]
    },
    {
        title: 'Network',
        resourcePaths: [
            '/services',
            '/ingress'
        ]
    },
    {
        title: 'Config & Storage',
        resourcePaths: [
            '/configmaps',
            '/secrets',
            '/pv'
        ]
    }
];
function ResourceOverviewV2({ summary }) {
    _s();
    const navigateTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"])();
    const { isPinned } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebarPins"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: sections.map((section, sectionIndex)=>{
            const visibleResources = section.resourcePaths.map((path)=>resourceConfigs.find((rc)=>rc.path === path)).filter((rc)=>rc !== undefined && isPinned(rc.path));
            if (visibleResources.length === 0) {
                return null;
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: sectionIndex < sections.length - 1 ? 3 : 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "h6",
                        sx: {
                            mb: 2,
                            fontWeight: 600
                        },
                        children: section.title
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 326,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                            gridAutoRows: '1fr',
                            gap: 2
                        },
                        children: visibleResources.map((resource)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceCard"], {
                                name: resource.name,
                                resourceType: resource.getResourceType(summary),
                                resourceColor: resource.color,
                                icon: resource.icon,
                                onClick: ()=>navigateTo(resource.path),
                                metrics: resource.renderMetrics(summary)
                            }, resource.path, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                                lineNumber: 338,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                        lineNumber: 329,
                        columnNumber: 13
                    }, this)
                ]
            }, section.title, true, {
                fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
                lineNumber: 325,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/app/components/dashboard/resource-overview-v2.tsx",
        lineNumber: 314,
        columnNumber: 5
    }, this);
}
_s(ResourceOverviewV2, "G+908PSctvtNhz3KPynmvgBYq3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebarPins"]
    ];
});
_c = ResourceOverviewV2;
var _c;
__turbopack_context__.k.register(_c, "ResourceOverviewV2");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/dashboard/resource-utilization.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResourceUtilization",
    ()=>ResourceUtilization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/LinearProgress/LinearProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/components/GlassPanel.js [app-client] (ecmascript)");
;
;
;
;
;
function parseResourceValue(value) {
    if (!value) return {
        value: 0,
        unit: ''
    };
    const match = value.match(/^([0-9.]+)([a-zA-Z]*)$/);
    if (!match) return {
        value: parseFloat(value) || 0,
        unit: ''
    };
    const num = parseFloat(match[1]);
    const unit = match[2];
    // Convert to base units
    if (unit === 'm') {
        // millicores to cores
        return {
            value: num / 1000,
            unit: 'cores'
        };
    }
    if (unit === 'Gi') {
        return {
            value: num,
            unit: 'Gi'
        };
    }
    if (unit === 'Mi') {
        return {
            value: num / 1024,
            unit: 'Gi'
        };
    }
    if (unit === 'Ti') {
        return {
            value: num * 1024,
            unit: 'Gi'
        };
    }
    return {
        value: num,
        unit: unit || ''
    };
}
function aggregateQuotas(quotas) {
    const aggregated = {};
    quotas.forEach((quota)=>{
        Object.entries(quota.hard).forEach(([key, hardValue])=>{
            const usedValue = quota.used[key] || '0';
            const hard = parseResourceValue(hardValue);
            const used = parseResourceValue(usedValue);
            if (!aggregated[key]) {
                aggregated[key] = {
                    used: 0,
                    total: 0,
                    unit: hard.unit
                };
            }
            aggregated[key].used += used.value;
            aggregated[key].total += hard.value;
        });
    });
    return Object.entries(aggregated).map(([name, data])=>({
            name,
            used: data.used,
            total: data.total,
            unit: data.unit
        }));
}
function getProgressColor(percentage) {
    if (percentage < 70) return 'success';
    if (percentage < 90) return 'warning';
    return 'error';
}
function ResourceUtilization({ quotas }) {
    if (!quotas || quotas.length === 0) {
        return null;
    }
    const resources = aggregateQuotas(quotas);
    // Filter to show only CPU, Memory, and Storage
    const displayResources = resources.filter((r)=>r.name === 'requests.cpu' || r.name === 'limits.cpu' || r.name === 'requests.memory' || r.name === 'limits.memory' || r.name === 'requests.storage');
    if (displayResources.length === 0) {
        return null;
    }
    const getLabelForResource = (name)=>{
        const labels = {
            'requests.cpu': 'CPU Requests',
            'limits.cpu': 'CPU Limits',
            'requests.memory': 'Memory Requests',
            'limits.memory': 'Memory Limits',
            'requests.storage': 'Storage Requests'
        };
        return labels[name] || name;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassPanel"], {
        sx: {
            p: 3
        },
        children: displayResources.map((resource)=>{
            const percentage = resource.total > 0 ? resource.used / resource.total * 100 : 0;
            const color = getProgressColor(percentage);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 2.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body2",
                                fontWeight: "medium",
                                children: getLabelForResource(resource.name)
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/resource-utilization.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body2",
                                color: "text.secondary",
                                children: [
                                    resource.used.toFixed(1),
                                    " / ",
                                    resource.total.toFixed(1),
                                    " ",
                                    resource.unit,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        component: "span",
                                        variant: "caption",
                                        color: `${color}.main`,
                                        sx: {
                                            ml: 1
                                        },
                                        children: [
                                            "(",
                                            percentage.toFixed(0),
                                            "%)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/components/dashboard/resource-utilization.tsx",
                                        lineNumber: 123,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/dashboard/resource-utilization.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/dashboard/resource-utilization.tsx",
                        lineNumber: 117,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "determinate",
                        value: Math.min(percentage, 100),
                        color: color,
                        sx: {
                            height: 8,
                            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                            bgcolor: 'action.hover',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/resource-utilization.tsx",
                        lineNumber: 128,
                        columnNumber: 13
                    }, this)
                ]
            }, resource.name, true, {
                fileName: "[project]/app/app/components/dashboard/resource-utilization.tsx",
                lineNumber: 116,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/app/components/dashboard/resource-utilization.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_c = ResourceUtilization;
var _c;
__turbopack_context__.k.register(_c, "ResourceUtilization");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/core/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Formats age from date to human-readable string
 * @param date - The date to format
 * @returns Human-readable age string (e.g., "5m", "2h", "3d")
 */ __turbopack_context__.s([
    "formatAge",
    ()=>formatAge,
    "formatBytes",
    ()=>formatBytes
]);
function formatAge(date) {
    if (!date) return 'N/A';
    const now = new Date();
    const then = typeof date === 'string' ? new Date(date) : date;
    // Check if date is valid
    if (isNaN(then.getTime())) {
        return 'N/A';
    }
    const diffMs = now.getTime() - then.getTime();
    // Handle negative or zero time difference
    if (diffMs <= 0) {
        return '0s';
    }
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 0) return `${diffDays}d`;
    if (diffHours > 0) return `${diffHours}h`;
    if (diffMinutes > 0) return `${diffMinutes}m`;
    return `${diffSeconds}s`;
}
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const BYTES_PER_KB = 1024;
    const sizes = [
        'B',
        'KB',
        'MB',
        'GB',
        'TB'
    ];
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(BYTES_PER_KB));
    return `${parseFloat((bytes / Math.pow(BYTES_PER_KB, unitIndex)).toFixed(2))} ${sizes[unitIndex]}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/dashboard/recent-events.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecentEvents",
    ()=>RecentEvents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$List$2f$List$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/List/List.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItem$2f$ListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ListItem/ListItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItemText$2f$ListItemText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ListItemText/ListItemText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandMore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ExpandMore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandLess$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ExpandLess.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/components/GlassPanel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function RecentEvents({ events, loading, error }) {
    _s();
    const [showAll, setShowAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const PREVIEW_COUNT = 5;
    const displayedEvents = showAll ? events : events.slice(0, PREVIEW_COUNT);
    const hasMore = events.length > PREVIEW_COUNT;
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassPanel"], {
            sx: {
                p: 2
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    py: 4
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassPanel"], {
            sx: {
                p: 2
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                severity: "error",
                children: [
                    "Failed to load events: ",
                    error.message
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassPanel"], {
        sx: {
            p: 2
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    p: 3
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "body2",
                    color: "text.secondary",
                    align: "center",
                    children: "No events found"
                }, void 0, false, {
                    fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                    lineNumber: 52,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                lineNumber: 51,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$List$2f$List$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            p: 0
                        },
                        children: displayedEvents.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItem$2f$ListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                alignItems: "flex-start",
                                sx: {
                                    py: 2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItemText$2f$ListItemText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    primary: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: event.type,
                                                size: "small",
                                                color: event.type === 'Warning' ? 'warning' : 'success',
                                                sx: {
                                                    minWidth: 80
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                                lineNumber: 70,
                                                columnNumber: 25
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body2",
                                                fontWeight: "medium",
                                                children: event.reason
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                                lineNumber: 76,
                                                columnNumber: 25
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "caption",
                                                color: "text.secondary",
                                                sx: {
                                                    ml: 'auto'
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAge"])(event.lastTimestamp)
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                                lineNumber: 79,
                                                columnNumber: 25
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                        lineNumber: 69,
                                        columnNumber: 23
                                    }, void 0),
                                    secondary: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body2",
                                                color: "text.secondary",
                                                sx: {
                                                    mb: 0.5
                                                },
                                                children: event.message
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                                lineNumber: 86,
                                                columnNumber: 25
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "caption",
                                                color: "text.secondary",
                                                children: [
                                                    event.kind,
                                                    ": ",
                                                    event.name,
                                                    event.count > 1 && ` (×${event.count})`
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                                lineNumber: 89,
                                                columnNumber: 25
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                        lineNumber: 85,
                                        columnNumber: 23
                                    }, void 0),
                                    primaryTypographyProps: {
                                        component: 'div'
                                    },
                                    secondaryTypographyProps: {
                                        component: 'div'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                    lineNumber: 67,
                                    columnNumber: 19
                                }, this)
                            }, `${event.name}-${event.reason}-${index}`, false, {
                                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                lineNumber: 60,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                        lineNumber: 58,
                        columnNumber: 13
                    }, this),
                    hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            p: 2,
                            textAlign: 'center'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "text",
                            size: "small",
                            onClick: ()=>setShowAll(!showAll),
                            endIcon: showAll ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandLess$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                lineNumber: 107,
                                columnNumber: 38
                            }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandMore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                                lineNumber: 107,
                                columnNumber: 59
                            }, void 0),
                            children: showAll ? 'Show Less' : `Show ${events.length - PREVIEW_COUNT} More`
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                            lineNumber: 103,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
                        lineNumber: 102,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/dashboard/recent-events.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(RecentEvents, "XC0nqMp5RnZIWkiCcJL//MdTvak=");
_c = RecentEvents;
var _c;
__turbopack_context__.k.register(_c, "RecentEvents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-dashboard.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDashboardSummary",
    ()=>useDashboardSummary,
    "useRecentEvents",
    ()=>useRecentEvents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function useDashboardSummary() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDashboardSummary.useModeStore[mode]": (state)=>state.mode
    }["useDashboardSummary.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDashboardSummary.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useDashboardSummary.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDashboardSummary.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useDashboardSummary.useModeStore[selectedContext]"]);
    const hasCompletedWelcome = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useDashboardSummary.useModeStore[hasCompletedWelcome]": (state)=>state.hasCompletedWelcome
    }["useDashboardSummary.useModeStore[hasCompletedWelcome]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'dashboard-summary',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useDashboardSummary.useQuery": async ()=>{
                if (mode === 'demo') {
                    // Simulate network delay
                    await new Promise({
                        "useDashboardSummary.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useDashboardSummary.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockDashboardSummary"])();
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/dashboard/summary?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch dashboard summary');
                return response.json();
            }
        }["useDashboardSummary.useQuery"],
        enabled: hasCompletedWelcome && (mode === 'demo' || !!namespace)
    });
}
_s(useDashboardSummary, "rmOUZBVijzhHzE0/WpIYE/uCbt0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useRecentEvents(timeRangeHours = 24) {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useRecentEvents.useModeStore[mode]": (state)=>state.mode
    }["useRecentEvents.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useRecentEvents.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useRecentEvents.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useRecentEvents.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useRecentEvents.useModeStore[selectedContext]"]);
    const hasCompletedWelcome = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useRecentEvents.useModeStore[hasCompletedWelcome]": (state)=>state.hasCompletedWelcome
    }["useRecentEvents.useModeStore[hasCompletedWelcome]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'recent-events',
            mode,
            namespace,
            timeRangeHours
        ],
        queryFn: {
            "useRecentEvents.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useRecentEvents.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useRecentEvents.useQuery"]);
                    const events = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockEvents"])();
                    // Filter mock events by time range
                    const cutoffTime = new Date();
                    cutoffTime.setHours(cutoffTime.getHours() - timeRangeHours);
                    return events.filter({
                        "useRecentEvents.useQuery": (event)=>{
                            const eventTime = new Date(event.lastTimestamp);
                            return eventTime >= cutoffTime;
                        }
                    }["useRecentEvents.useQuery"]).sort({
                        "useRecentEvents.useQuery": (a, b)=>{
                            const aTime = new Date(a.lastTimestamp).getTime();
                            const bTime = new Date(b.lastTimestamp).getTime();
                            return bTime - aTime;
                        }
                    }["useRecentEvents.useQuery"]);
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}&timeRange=${timeRangeHours}`);
                if (!response.ok) throw new Error('Failed to fetch events');
                return response.json();
            }
        }["useRecentEvents.useQuery"],
        enabled: hasCompletedWelcome && (mode === 'demo' || !!namespace)
    });
}
_s1(useRecentEvents, "rmOUZBVijzhHzE0/WpIYE/uCbt0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-resourcequotas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResourceQuotas",
    ()=>useResourceQuotas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useResourceQuotas() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useResourceQuotas.useModeStore[mode]": (state)=>state.mode
    }["useResourceQuotas.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useResourceQuotas.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useResourceQuotas.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useResourceQuotas.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useResourceQuotas.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'resourcequotas',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useResourceQuotas.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useResourceQuotas.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useResourceQuotas.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockResourceQuotas"])();
                }
                const response = await fetch(`/api/resourcequotas?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to fetch resource quotas');
                }
                return response.json();
            }
        }["useResourceQuotas.useQuery"],
        enabled: mode === 'demo' || !!namespace,
        retry: false
    });
}
_s(useResourceQuotas, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-cluster-health.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClusterHealth",
    ()=>useClusterHealth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
async function fetchClusterHealth(mode) {
    // In demo mode, always return connected
    if (mode === 'demo') {
        return {
            status: 'connected',
            message: 'Demo mode - simulated cluster connection'
        };
    }
    const response = await fetch('/api/cluster/health');
    if (!response.ok) {
        throw new Error('Failed to check cluster health');
    }
    return response.json();
}
function useClusterHealth() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useClusterHealth.useModeStore[mode]": (state)=>state.mode
    }["useClusterHealth.useModeStore[mode]"]);
    const hasCompletedWelcome = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useClusterHealth.useModeStore[hasCompletedWelcome]": (state)=>state.hasCompletedWelcome
    }["useClusterHealth.useModeStore[hasCompletedWelcome]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'cluster-health',
            mode
        ],
        queryFn: {
            "useClusterHealth.useQuery": ()=>fetchClusterHealth(mode)
        }["useClusterHealth.useQuery"],
        staleTime: 30000,
        refetchInterval: 60000,
        retry: 1,
        enabled: hasCompletedWelcome
    });
}
_s(useClusterHealth, "E9t2O6CBaFw7MQ+D+jBkYBBjxY8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/common/cluster-connection-alert.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClusterConnectionAlert",
    ()=>ClusterConnectionAlert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Link/Link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CloudOff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CloudOff.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Refresh.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$cluster$2d$health$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-cluster-health.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/providers/ThemeProvider.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ClusterConnectionAlert({ minimal = false }) {
    _s();
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const { data: health, isLoading, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$cluster$2d$health$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClusterHealth"])();
    // Don't show anything while loading
    if (isLoading) {
        return null;
    }
    // Don't show anything if connected
    if (health?.status === 'connected') {
        return null;
    }
    // Minimal version - just a small banner
    if (minimal) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
            severity: "warning",
            sx: {
                mb: 2
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        variant: "body2",
                        children: [
                            "No cluster connection. ",
                            health?.message || 'Unable to reach Kubernetes cluster.'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        size: "small",
                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                            lineNumber: 36,
                            columnNumber: 43
                        }, void 0),
                        onClick: ()=>refetch(),
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this);
    }
    // Full version - centered with liquid glass styling
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 120px)',
            p: 3
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                maxWidth: 700,
                width: '100%',
                ...isGlass && {
                    backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid',
                    borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 100, 100, 0.3)' : 'rgba(211, 47, 47, 0.3)',
                    boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)' : '0 4px 16px 0 rgba(211, 47, 47, 0.1), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)'
                },
                borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                p: 3
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CloudOff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: 32,
                            color: 'error.main',
                            mt: 0.5
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                fontWeight: 600,
                                gutterBottom: true,
                                children: "Cluster Connection Failed"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "body2",
                                color: "text.secondary",
                                sx: {
                                    mb: 2
                                },
                                children: health?.message || 'Unable to connect to Kubernetes cluster.'
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "subtitle2",
                                fontWeight: 600,
                                gutterBottom: true,
                                sx: {
                                    mt: 2
                                },
                                children: "Troubleshooting Steps:"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                component: "ul",
                                sx: {
                                    mt: 1,
                                    pl: 2.5,
                                    mb: 0,
                                    '& li': {
                                        mb: 0.5
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            children: [
                                                "Check your ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    children: "kubeconfig"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 28
                                                }, this),
                                                " file is properly configured"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            children: "Verify your cluster credentials are valid and not expired"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            children: "Ensure you have network access to your cluster"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            children: [
                                                "Run ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    children: "kubectl version"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 21
                                                }, this),
                                                " to verify connectivity"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            children: [
                                                "Check the",
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                                    href: "https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/",
                                                    target: "_blank",
                                                    rel: "noopener",
                                                    sx: {
                                                        fontWeight: 500
                                                    },
                                                    children: "Kubernetes documentation"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 17
                                                }, this),
                                                ' ',
                                                "for help"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            health?.code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                    display: 'block',
                                    mt: 2
                                },
                                children: [
                                    "Error Code: ",
                                    health.code
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        variant: "contained",
                        size: "small",
                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                            lineNumber: 135,
                            columnNumber: 22
                        }, void 0),
                        onClick: ()=>refetch(),
                        sx: {
                            px: 2,
                            py: 0.75,
                            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                            textTransform: 'none',
                            fontWeight: 600,
                            flexShrink: 0
                        },
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(ClusterConnectionAlert, "EuYXqMnJvzJCMOvqXR7I8DeZjak=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$cluster$2d$health$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClusterHealth"]
    ];
});
_c = ClusterConnectionAlert;
var _c;
__turbopack_context__.k.register(_c, "ClusterConnectionAlert");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$dashboard$2f$critical$2d$alerts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/dashboard/critical-alerts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$dashboard$2f$resource$2d$overview$2d$v2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/dashboard/resource-overview-v2.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$dashboard$2f$resource$2d$utilization$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/dashboard/resource-utilization.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$dashboard$2f$recent$2d$events$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/dashboard/recent-events.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$dashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-dashboard.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$resourcequotas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-resourcequotas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$cluster$2d$connection$2d$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/cluster-connection-alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$cluster$2d$health$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-cluster-health.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function DashboardPage() {
    _s();
    const { data: health } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$cluster$2d$health$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClusterHealth"])();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "DashboardPage.useModeStore[mode]": (state)=>state.mode
    }["DashboardPage.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "DashboardPage.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["DashboardPage.useModeStore[namespace]"]);
    const { data: summary, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$dashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardSummary"])();
    const { data: events, isLoading: eventsLoading, error: eventsError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$dashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecentEvents"])(1) // Last 1 hour
    ;
    const { data: quotas } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$resourcequotas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResourceQuotas"])();
    // If cluster is not connected, show connection alert instead of loading/error states
    if (health?.status === 'disconnected') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$cluster$2d$connection$2d$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClusterConnectionAlert"], {}, void 0, false, {
            fileName: "[project]/app/app/page.tsx",
            lineNumber: 28,
            columnNumber: 12
        }, this);
    }
    // If in real mode but no namespace selected, show alert
    // Don't show this in demo mode - demo always has a default namespace
    if (mode === 'real' && !namespace) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            severity: "warning",
            sx: {
                mb: 2
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "subtitle1",
                    gutterBottom: true,
                    children: "Namespace Required"
                }, void 0, false, {
                    fileName: "[project]/app/app/page.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "body2",
                    children: "Please select a namespace above to view cluster resources. You can also set a default namespace in Settings."
                }, void 0, false, {
                    fileName: "[project]/app/app/page.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "outlined",
                    size: "small",
                    onClick: ()=>window.location.href = '/settings',
                    sx: {
                        mt: 2
                    },
                    children: "Go to Settings"
                }, void 0, false, {
                    fileName: "[project]/app/app/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/page.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this);
    }
    // In demo mode, ensure namespace is set
    if (mode === 'demo' && !namespace) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 400
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/app/page.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/page.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this);
    }
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 400
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/app/page.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/page.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            severity: "error",
            children: [
                "Failed to load dashboard: ",
                error instanceof Error ? error.message : 'Unknown error'
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/page.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    if (!summary) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            severity: "warning",
            children: "No data available"
        }, void 0, false, {
            fileName: "[project]/app/app/page.tsx",
            lineNumber: 81,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 3
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$dashboard$2f$critical$2d$alerts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CriticalAlerts"], {
                    summary: summary
                }, void 0, false, {
                    fileName: "[project]/app/app/page.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 3
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$dashboard$2f$resource$2d$overview$2d$v2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceOverviewV2"], {
                    summary: summary
                }, void 0, false, {
                    fileName: "[project]/app/app/page.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'grid',
                    gridTemplateColumns: quotas && quotas.length > 0 ? '1fr 1fr' : '1fr',
                    gap: 3,
                    mb: 3
                },
                children: [
                    quotas && quotas.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "h6",
                                sx: {
                                    mb: 2,
                                    fontWeight: 600
                                },
                                children: "Cluster Resource Utilization"
                            }, void 0, false, {
                                fileName: "[project]/app/app/page.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$dashboard$2f$resource$2d$utilization$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceUtilization"], {
                                quotas: quotas
                            }, void 0, false, {
                                fileName: "[project]/app/app/page.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/page.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "h6",
                                sx: {
                                    mb: 2,
                                    fontWeight: 600
                                },
                                children: "Recent Activity"
                            }, void 0, false, {
                                fileName: "[project]/app/app/page.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$dashboard$2f$recent$2d$events$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecentEvents"], {
                                events: events || [],
                                loading: eventsLoading,
                                error: eventsError || null
                            }, void 0, false, {
                                fileName: "[project]/app/app/page.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/page.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/page.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "REfg28qDXR1MB3lX8F9/6HpkhcI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$cluster$2d$health$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClusterHealth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$dashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardSummary"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$dashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecentEvents"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$resourcequotas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResourceQuotas"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_a0d5ed83._.js.map