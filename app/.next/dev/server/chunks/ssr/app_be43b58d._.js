module.exports = [
"[project]/app/lib/mocks/data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
// Helper getters and setters for cache
const getCache = ()=>("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
const getCachedPods = ()=>getCache()?.pods || null;
const setCachedPods = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedDeployments = ()=>getCache()?.deployments || null;
const setCachedDeployments = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedStatefulSets = ()=>getCache()?.statefulSets || null;
const setCachedStatefulSets = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedDaemonSets = ()=>getCache()?.daemonSets || null;
const setCachedDaemonSets = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedNodes = ()=>getCache()?.nodes || null;
const setCachedNodes = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedConfigMaps = ()=>getCache()?.configMaps || null;
const setCachedConfigMaps = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedSecrets = ()=>getCache()?.secrets || null;
const setCachedSecrets = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedHPAs = ()=>getCache()?.hpas || null;
const setCachedHPAs = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedPVs = ()=>getCache()?.pvs || null;
const setCachedPVs = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedPVCs = ()=>getCache()?.pvcs || null;
const setCachedPVCs = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedEvents = ()=>getCache()?.events || null;
const setCachedEvents = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedServices = ()=>getCache()?.services || null;
const setCachedServices = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedIngresses = ()=>getCache()?.ingresses || null;
const setCachedIngresses = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedJobs = ()=>getCache()?.jobs || null;
const setCachedJobs = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedCronJobs = ()=>getCache()?.cronJobs || null;
const setCachedCronJobs = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedNamespaces = ()=>getCache()?.namespaces || null;
const setCachedNamespaces = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedResourceQuotas = ()=>getCache()?.resourceQuotas || null;
const setCachedResourceQuotas = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
};
const getCachedLimitRanges = ()=>getCache()?.limitRanges || null;
const setCachedLimitRanges = (data)=>{
    if (getCache()) //TURBOPACK unreachable
    ;
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
}),
"[project]/app/lib/hooks/use-deployments.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-ssr] (ecmascript)");
;
;
;
function useDeployments() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'deployments',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 300));
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockDeployments"])();
            }
            // Real mode: fetch from API route (server-side)
            const response = await fetch(`/api/deployments?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch deployments');
            return response.json();
        }
    });
}
function useDeployment(name) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'deployment',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 200));
                const deployments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockDeployments"])();
                const deployment = deployments.find((d)=>d.name === name);
                if (!deployment) throw new Error('Deployment not found');
                return deployment;
            }
            // Real mode: fetch from API route (server-side)
            const response = await fetch(`/api/deployments/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch deployment');
            return response.json();
        },
        enabled: !!name && (mode === 'demo' || !!namespace)
    });
}
function useDeploymentPods(deploymentName) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'deployment-pods',
            deploymentName,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 200));
                const allPods = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockPods"])();
                // Filter pods that belong to this deployment (by owner references or labels)
                return allPods.filter((pod)=>{
                    // Check if pod has owner reference to this deployment's ReplicaSet
                    const hasOwnerRef = pod.ownerReferences?.some((ref)=>ref.kind === 'ReplicaSet' && ref.name.startsWith(deploymentName));
                    // Or check if pod has matching app label
                    const hasMatchingLabel = pod.labels.app === deploymentName;
                    return hasOwnerRef || hasMatchingLabel;
                });
            }
            // Real mode: fetch from API route
            const response = await fetch(`/api/deployments/${deploymentName}/pods?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch deployment pods');
            return response.json();
        },
        enabled: !!deploymentName && (mode === 'demo' || !!namespace)
    });
}
function useDeploymentEvents(deploymentName) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'deployment-events',
            deploymentName,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 150));
                const allEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockEvents"])();
                // Filter events related to this deployment
                return allEvents.filter((event)=>event.kind === 'Deployment' && event.name === deploymentName);
            }
            // Real mode: fetch from API route
            const response = await fetch(`/api/deployments/${deploymentName}/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch deployment events');
            return response.json();
        },
        enabled: !!deploymentName && (mode === 'demo' || !!namespace)
    });
}
}),
"[project]/app/lib/hooks/use-configmaps.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConfigMap",
    ()=>useConfigMap,
    "useConfigMapEvents",
    ()=>useConfigMapEvents,
    "useConfigMaps",
    ()=>useConfigMaps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-ssr] (ecmascript)");
;
;
;
function useConfigMaps() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'configmaps',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 300));
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockConfigMaps"])();
            }
            if (!namespace) {
                throw new Error('Namespace is required');
            }
            const response = await fetch(`/api/configmaps?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch ConfigMaps');
            return response.json();
        },
        enabled: mode === 'demo' || !!namespace
    });
}
function useConfigMap(name) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'configmap',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 200));
                const configMaps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockConfigMaps"])();
                const configMap = configMaps.find((cm)=>cm.name === name);
                if (!configMap) throw new Error('ConfigMap not found');
                return configMap;
            }
            if (!namespace) {
                throw new Error('Namespace is required');
            }
            const response = await fetch(`/api/configmaps/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch ConfigMap');
            return response.json();
        },
        enabled: !!name && (mode === 'demo' || !!namespace)
    });
}
function useConfigMapEvents(configMapName) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'configmap-events',
            configMapName,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 150));
                const allEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockEvents"])();
                // Filter events related to this ConfigMap
                return allEvents.filter((event)=>event.kind === 'ConfigMap' && event.name === configMapName);
            }
            if (!namespace) {
                throw new Error('Namespace is required');
            }
            const response = await fetch(`/api/configmaps/${configMapName}/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch ConfigMap events');
            return response.json();
        },
        enabled: !!configMapName && (mode === 'demo' || !!namespace)
    });
}
}),
"[project]/app/lib/hooks/use-secrets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSecret",
    ()=>useSecret,
    "useSecretEvents",
    ()=>useSecretEvents,
    "useSecrets",
    ()=>useSecrets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-ssr] (ecmascript)");
;
;
;
function useSecrets() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'secrets',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 300));
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockSecrets"])();
            }
            if (!namespace) {
                throw new Error('Namespace is required');
            }
            const response = await fetch(`/api/secrets?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch Secrets');
            return response.json();
        },
        enabled: mode === 'demo' || !!namespace
    });
}
function useSecret(name) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'secret',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 200));
                const secrets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockSecrets"])();
                const secret = secrets.find((s)=>s.name === name);
                if (!secret) throw new Error('Secret not found');
                return secret;
            }
            if (!namespace) {
                throw new Error('Namespace is required');
            }
            const response = await fetch(`/api/secrets/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch Secret');
            return response.json();
        },
        enabled: !!name && (mode === 'demo' || !!namespace)
    });
}
function useSecretEvents(secretName) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'secret-events',
            secretName,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 150));
                const allEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockEvents"])();
                // Filter events related to this Secret
                return allEvents.filter((event)=>event.kind === 'Secret' && event.name === secretName);
            }
            if (!namespace) {
                throw new Error('Namespace is required');
            }
            const response = await fetch(`/api/secrets/${secretName}/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch Secret events');
            return response.json();
        },
        enabled: !!secretName && (mode === 'demo' || !!namespace)
    });
}
}),
"[project]/app/lib/hooks/use-hpa.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHPA",
    ()=>useHPA,
    "useHPAs",
    ()=>useHPAs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-ssr] (ecmascript)");
;
;
;
function useHPAs() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'hpas',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 300));
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockHPAs"])();
            }
            if (!namespace) {
                throw new Error('Namespace is required');
            }
            const response = await fetch(`/api/hpa?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch HPAs');
            return response.json();
        },
        enabled: mode === 'demo' || !!namespace
    });
}
function useHPA(name) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'hpa',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                await new Promise((resolve)=>setTimeout(resolve, 200));
                const hpas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateMockHPAs"])();
                const hpa = hpas.find((h)=>h.name === name);
                if (!hpa) throw new Error('HPA not found');
                return hpa;
            }
            if (!namespace) {
                throw new Error('Namespace is required');
            }
            const response = await fetch(`/api/hpa/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
            if (!response.ok) throw new Error('Failed to fetch HPA');
            return response.json();
        },
        enabled: !!name && (mode === 'demo' || !!namespace)
    });
}
}),
"[project]/app/app/components/common/status-badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusBadge",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CheckCircle.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HourglassEmpty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/HourglassEmpty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HelpOutline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/HelpOutline.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/providers/ThemeProvider.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
// Config for Kubernetes status colors
const statusConfig = {
    // Success states
    Available: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 25,
            columnNumber: 40
        }, ("TURBOPACK compile-time value", void 0))
    },
    Running: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 26,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    },
    Ready: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 27,
            columnNumber: 36
        }, ("TURBOPACK compile-time value", void 0))
    },
    Succeeded: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 28,
            columnNumber: 40
        }, ("TURBOPACK compile-time value", void 0))
    },
    Active: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 29,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    Bound: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 30,
            columnNumber: 36
        }, ("TURBOPACK compile-time value", void 0))
    },
    Normal: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 31,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Error states
    Failed: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 34,
            columnNumber: 35
        }, ("TURBOPACK compile-time value", void 0))
    },
    Degraded: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 35,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    NotReady: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 36,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    CrashLoopBackOff: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 37,
            columnNumber: 45
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Warning states
    Pending: {
        color: 'warning',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HourglassEmpty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 40,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    },
    Warning: {
        color: 'warning',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 41,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Info states
    Progressing: {
        color: 'info',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HourglassEmpty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 44,
            columnNumber: 39
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Unknown
    Unknown: {
        color: 'default',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HelpOutline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 47,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    }
};
const getColors = (colorType)=>{
    const colorMap = {
        success: {
            bg: 'rgba(52, 199, 89, 0.15)',
            bgDark: 'rgba(52, 199, 89, 0.2)',
            text: '#34C759',
            textDark: '#30D158'
        },
        error: {
            bg: 'rgba(255, 59, 48, 0.15)',
            bgDark: 'rgba(255, 69, 58, 0.2)',
            text: '#FF3B30',
            textDark: '#FF453A'
        },
        warning: {
            bg: 'rgba(255, 149, 0, 0.15)',
            bgDark: 'rgba(255, 159, 10, 0.2)',
            text: '#FF9500',
            textDark: '#FF9F0A'
        },
        info: {
            bg: 'rgba(0, 122, 255, 0.15)',
            bgDark: 'rgba(10, 132, 255, 0.2)',
            text: '#007AFF',
            textDark: '#0A84FF'
        },
        default: {
            bg: 'rgba(142, 142, 147, 0.15)',
            bgDark: 'rgba(142, 142, 147, 0.2)',
            text: '#8E8E93',
            textDark: '#98989D'
        }
    };
    return colorMap[colorType] || colorMap.default;
};
function StatusBadge({ status, label, color, size = 'small', sx, ...props }) {
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    // Determine color and label
    let finalColor = color || 'default';
    let finalLabel = label || status || '';
    // If status is provided, use status config
    if (status && !color) {
        const config = statusConfig[status] || statusConfig.Unknown;
        finalColor = config.color;
        finalLabel = status;
    }
    const colors = getColors(finalColor);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        label: finalLabel,
        size: size,
        ...props,
        sx: {
            fontWeight: 500,
            fontSize: '0.6875rem',
            height: 20,
            minWidth: 70,
            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
            backgroundColor: (theme)=>theme.palette.mode === 'dark' ? colors.bgDark : colors.bg,
            color: (theme)=>theme.palette.mode === 'dark' ? colors.textDark : colors.text,
            ...isGlass && {
                backdropFilter: 'blur(12px) saturate(180%)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)'
            },
            border: '1px solid',
            borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            boxShadow: 'none',
            '& .MuiChip-label': {
                padding: '0 8px'
            },
            '& .MuiChip-icon': {
                marginLeft: '4px',
                marginRight: '-4px',
                fontSize: '0.875rem',
                color: (theme)=>theme.palette.mode === 'dark' ? colors.textDark : colors.text
            },
            ...sx
        }
    }, void 0, false, {
        fileName: "[project]/app/app/components/common/status-badge.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/app/components/topology/topology-node.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopologyNode",
    ()=>TopologyNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@xyflow/react/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@xyflow/system/dist/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Layers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewInAr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ViewInAr.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cloud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Cloud.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Description$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Description.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Lock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Storage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$TrendingUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/TrendingUp.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CheckCircle.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Warning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Warning.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Help.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/providers/ThemeProvider.js [app-ssr] (ecmascript)");
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
const resourceIcons = {
    Deployment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    Pod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewInAr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    Service: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cloud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    ConfigMap: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Description$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    Secret: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    PersistentVolumeClaim: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    HPA: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$TrendingUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
};
const resourceColors = {
    Deployment: '#3F51B5',
    Pod: '#9C27B0',
    Service: '#00BCD4',
    ConfigMap: '#0288d1',
    Secret: '#ed6c02',
    PersistentVolumeClaim: '#FF9800',
    HPA: '#FFEB3B'
};
const statusColors = {
    healthy: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    unknown: '#9e9e9e'
};
const statusIcons = {
    healthy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    warning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Warning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    unknown: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
};
function TopologyNodeComponent({ data, selected }) {
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const Icon = resourceIcons[data.resourceType];
    const StatusIcon = statusIcons[data.status];
    const statusColor = statusColors[data.status];
    const resourceColor = resourceColors[data.resourceType] || '#9e9e9e';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Left,
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Top,
                id: "top",
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Bottom,
                id: "bottom",
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    minWidth: 180,
                    maxWidth: 220,
                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    // Classic mode - solid background with border
                    ...!isGlass && {
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: (theme)=>theme.customShadows?.elevation1?.boxShadow || '0 1px 3px rgba(0, 0, 0, 0.1)'
                    },
                    // Glass mode - glassmorphism effects
                    ...isGlass && {
                        backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '1px solid',
                        borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)',
                        boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)' : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
                        // Glass shine gradient overlay
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
                    ...selected && {
                        borderColor: (theme)=>theme.palette.mode === 'dark' ? `${resourceColor}60` : `${resourceColor}40`,
                        boxShadow: (theme)=>theme.palette.mode === 'dark' ? `0 0 0 2px ${resourceColor}40, 0 8px 32px 0 rgba(0, 0, 0, 0.4)` : `0 0 0 2px ${resourceColor}30, 0 8px 32px 0 rgba(31, 38, 135, 0.12)`
                    },
                    '&:hover': {
                        transform: 'translateY(-2px) scale(1.02)',
                        ...isGlass && {
                            borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(209, 213, 219, 0.6)',
                            backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(50, 50, 70, 0.7)' : 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(28px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                            boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 2px 2px 0 rgba(255, 255, 255, 0.12), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 2px 2px 0 rgba(255, 255, 255, 1), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.08)'
                        }
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        p: 1.5,
                        pb: 1.5,
                        position: 'relative',
                        zIndex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1,
                                mb: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        width: 32,
                                        height: 32,
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
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        sx: {
                                            fontSize: 18,
                                            color: resourceColor,
                                            opacity: 0.95
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/topology/topology-node.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/topology/topology-node.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        flex: 1,
                                        minWidth: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            fontWeight: 700,
                                            sx: {
                                                fontSize: '0.875rem',
                                                wordBreak: 'break-word',
                                                lineHeight: 1.3,
                                                mb: 0.25
                                            },
                                            children: data.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/topology/topology-node.tsx",
                                            lineNumber: 177,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "caption",
                                            color: "text.secondary",
                                            sx: {
                                                opacity: 0.8,
                                                fontSize: '0.65rem'
                                            },
                                            children: data.resourceType
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/topology/topology-node.tsx",
                                            lineNumber: 189,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/topology/topology-node.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusIcon, {
                                    sx: {
                                        fontSize: 16,
                                        color: statusColor,
                                        flexShrink: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/topology/topology-node.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/topology/topology-node.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        data.details && Object.keys(data.details).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                mt: 1,
                                pt: 1,
                                borderTop: '1px solid',
                                borderColor: 'divider'
                            },
                            children: Object.entries(data.details).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "caption",
                                    display: "block",
                                    color: "text.secondary",
                                    sx: {
                                        fontSize: '0.7rem',
                                        lineHeight: 1.4,
                                        wordBreak: 'break-word'
                                    },
                                    children: [
                                        key,
                                        ": ",
                                        String(value)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/app/app/components/topology/topology-node.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/topology/topology-node.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/topology/topology-node.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Right,
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Top,
                id: "top",
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Bottom,
                id: "bottom",
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
const TopologyNode = TopologyNodeComponent;
}),
"[project]/app/app/components/topology/topology-graph.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopologyGraph",
    ()=>TopologyGraph
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@xyflow/react/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Dialog/Dialog.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Fullscreen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Fullscreen.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$FullscreenExit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/FullscreenExit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$topology$2f$topology$2d$node$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/topology/topology-node.tsx [app-ssr] (ecmascript)");
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
const nodeTypes = {
    default: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$topology$2f$topology$2d$node$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TopologyNode"]
};
function TopologyGraphInner({ data, height = 600 }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const reactFlowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { fitView } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactFlow"])();
    const [fullscreen, setFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredNodeId, setHoveredNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNodesState"])(data.nodes);
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEdgesState"])(data.edges);
    // Update nodes and edges when data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        setNodes(data.nodes);
        setEdges(data.edges);
    }, [
        data,
        setNodes,
        setEdges
    ]);
    // Fit view whenever nodes change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (nodes.length > 0) {
            setTimeout(()=>{
                fitView({
                    padding: 0.2,
                    duration: 200
                });
            }, 0);
        }
    }, [
        nodes,
        fitView
    ]);
    // Get connected node IDs for a given node
    const getConnectedNodeIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nodeId)=>{
        const connected = new Set();
        edges.forEach((edge)=>{
            if (edge.source === nodeId) {
                connected.add(edge.target);
            } else if (edge.target === nodeId) {
                connected.add(edge.source);
            }
        });
        return connected;
    }, [
        edges
    ]);
    // Apply highlighting styles based on hover state
    const styledNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!hoveredNodeId) return nodes;
        const connectedIds = getConnectedNodeIds(hoveredNodeId);
        return nodes.map((node)=>{
            const isHovered = node.id === hoveredNodeId;
            const isConnected = connectedIds.has(node.id);
            const isDimmed = !isHovered && !isConnected;
            return {
                ...node,
                style: {
                    ...node.style,
                    opacity: isDimmed ? 0.3 : 1,
                    transition: 'opacity 0.2s ease-in-out'
                }
            };
        });
    }, [
        nodes,
        hoveredNodeId,
        getConnectedNodeIds
    ]);
    // Apply highlighting styles to edges based on hover state
    const styledEdges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!hoveredNodeId) return edges;
        return edges.map((edge)=>{
            const isConnected = edge.source === hoveredNodeId || edge.target === hoveredNodeId;
            const isDimmed = !isConnected;
            return {
                ...edge,
                style: {
                    ...edge.style,
                    opacity: isDimmed ? 0.2 : 1,
                    strokeWidth: isConnected ? 3 : 2
                },
                animated: isConnected
            };
        });
    }, [
        edges,
        hoveredNodeId
    ]);
    // Toggle fullscreen mode
    const toggleFullscreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setFullscreen((prev)=>!prev);
    }, []);
    // Handle node hover - highlight connected nodes
    const onNodeMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((_, node)=>{
        setHoveredNodeId(node.id);
    }, []);
    const onNodeMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setHoveredNodeId(null);
    }, []);
    // Handle node click - navigate to resource detail page
    const onNodeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((_, node)=>{
        const { resourceType, label } = node.data;
        // Navigate based on resource type
        switch(resourceType){
            case 'Deployment':
                router.push(`/deployments/${encodeURIComponent(label)}`);
                break;
            case 'Pod':
                router.push(`/pods/${encodeURIComponent(label)}`);
                break;
            case 'ConfigMap':
                router.push(`/configmaps/${encodeURIComponent(label)}`);
                break;
            case 'Secret':
                router.push(`/secrets/${encodeURIComponent(label)}`);
                break;
            default:
                break;
        }
    }, [
        router
    ]);
    const graphContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ref: reactFlowRef,
        sx: {
            height: fullscreen ? '100vh' : height,
            position: 'relative',
            '& .react-flow__node': {
                background: 'transparent !important',
                border: 'none !important',
                padding: 0
            },
            '& .react-flow__node-default': {
                background: 'transparent !important',
                border: 'none !important',
                boxShadow: 'none !important',
                padding: 0
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactFlow"], {
            nodes: styledNodes,
            edges: styledEdges,
            onNodesChange: onNodesChange,
            onEdgesChange: onEdgesChange,
            onNodeClick: onNodeClick,
            onNodeMouseEnter: onNodeMouseEnter,
            onNodeMouseLeave: onNodeMouseLeave,
            nodeTypes: nodeTypes,
            fitView: true,
            attributionPosition: "bottom-left",
            minZoom: 0.2,
            maxZoom: 2,
            zoomOnScroll: false,
            panOnScroll: false,
            panOnDrag: true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Controls"], {}, void 0, false, {
                    fileName: "[project]/app/app/components/topology/topology-graph.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Panel"], {
                    position: "top-right",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            gap: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            title: fullscreen ? 'Exit Fullscreen' : 'Fullscreen',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                onClick: toggleFullscreen,
                                size: "small",
                                sx: {
                                    bgcolor: 'background.paper',
                                    boxShadow: 1,
                                    '&:hover': {
                                        bgcolor: 'background.paper',
                                        boxShadow: 2
                                    }
                                },
                                children: fullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$FullscreenExit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/app/components/topology/topology-graph.tsx",
                                    lineNumber: 218,
                                    columnNumber: 31
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Fullscreen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/app/components/topology/topology-graph.tsx",
                                    lineNumber: 218,
                                    columnNumber: 56
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/topology/topology-graph.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/topology/topology-graph.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/topology/topology-graph.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/topology/topology-graph.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/topology/topology-graph.tsx",
            lineNumber: 174,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/topology/topology-graph.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
    if (fullscreen) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            open: fullscreen,
            onClose: toggleFullscreen,
            maxWidth: false,
            fullScreen: true,
            children: graphContent
        }, void 0, false, {
            fileName: "[project]/app/app/components/topology/topology-graph.tsx",
            lineNumber: 229,
            columnNumber: 7
        }, this);
    }
    return graphContent;
}
function TopologyGraph(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactFlowProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TopologyGraphInner, {
            ...props
        }, void 0, false, {
            fileName: "[project]/app/app/components/topology/topology-graph.tsx",
            lineNumber: 241,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/topology/topology-graph.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/lib/ui/topology.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildConfigSecretsTopology",
    ()=>buildConfigSecretsTopology,
    "buildDeploymentTopology",
    ()=>buildDeploymentTopology,
    "buildNamespaceTopology",
    ()=>buildNamespaceTopology,
    "buildPodTopology",
    ()=>buildPodTopology
]);
/**
 * Map Kubernetes resource status to topology status
 */ function getResourceStatus(resourceType, resource) {
    if (resourceType === 'Deployment') {
        const deployment = resource;
        if (deployment.status === 'Available') return 'healthy';
        if (deployment.status === 'Progressing') return 'warning';
        if (deployment.status === 'Degraded') return 'error';
        return 'unknown';
    }
    if (resourceType === 'Pod') {
        const pod = resource;
        if (pod.status === 'Running') return 'healthy';
        if (pod.status === 'Pending') return 'warning';
        if (pod.status === 'Failed' || pod.status === 'CrashLoopBackOff') return 'error';
        return 'unknown';
    }
    return 'healthy' // ConfigMaps and Secrets are always healthy
    ;
}
function buildDeploymentTopology(deployment, pods, configMaps, secrets, hpas = []) {
    const nodes = [];
    const edges = [];
    // Filter HPAs that target this deployment
    const relatedHPAs = hpas.filter((hpa)=>hpa.targetRef.kind === 'Deployment' && hpa.targetRef.name === deployment.name);
    // Calculate vertical centering based on number of resources on left
    const leftResourcesCount = configMaps.length + secrets.length;
    const deploymentY = Math.max(300, leftResourcesCount * 125);
    // Add HPA nodes (above deployment)
    relatedHPAs.forEach((hpa, index)=>{
        const nodeId = `hpa-${hpa.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 500,
                y: deploymentY - 300 - index * 250
            },
            data: {
                label: hpa.name,
                resourceType: 'HPA',
                status: 'healthy',
                namespace: hpa.namespace,
                details: {
                    min: `${hpa.minReplicas}`,
                    max: `${hpa.maxReplicas}`,
                    current: `${hpa.currentReplicas}`
                }
            }
        });
        // Connect HPA to Deployment (from HPA bottom to deployment top)
        edges.push({
            id: `${nodeId}-deployment`,
            source: nodeId,
            target: `deployment-${deployment.name}`,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            type: 'default',
            animated: true
        });
    });
    // Add deployment node (center)
    nodes.push({
        id: `deployment-${deployment.name}`,
        type: 'default',
        position: {
            x: 500,
            y: deploymentY
        },
        data: {
            label: deployment.name,
            resourceType: 'Deployment',
            status: getResourceStatus('Deployment', deployment),
            namespace: deployment.namespace,
            details: {
                replicas: `${deployment.replicas.ready}/${deployment.replicas.desired}`,
                strategy: deployment.strategy
            }
        }
    });
    // Add ConfigMap nodes (left side) - increased spacing to 250px
    configMaps.forEach((cm, index)=>{
        const nodeId = `configmap-${cm.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 50,
                y: 50 + index * 250
            },
            data: {
                label: cm.name,
                resourceType: 'ConfigMap',
                status: 'healthy',
                namespace: cm.namespace,
                details: {
                    keys: `${Object.keys(cm.data).length} keys`
                }
            }
        });
        // Connect ConfigMap to Deployment
        edges.push({
            id: `${nodeId}-deployment`,
            source: nodeId,
            target: `deployment-${deployment.name}`,
            type: 'default',
            animated: false
        });
    });
    // Add Secret nodes (left side, below ConfigMaps) - increased spacing to 250px
    secrets.forEach((secret, index)=>{
        const nodeId = `secret-${secret.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 50,
                y: 50 + (configMaps.length + index) * 250
            },
            data: {
                label: secret.name,
                resourceType: 'Secret',
                status: 'healthy',
                namespace: secret.namespace,
                details: {
                    type: secret.type,
                    keys: `${secret.keys.length} keys`
                }
            }
        });
        // Connect Secret to Deployment
        edges.push({
            id: `${nodeId}-deployment`,
            source: nodeId,
            target: `deployment-${deployment.name}`,
            type: 'default',
            animated: false
        });
    });
    // Add Pod nodes (right side) - increased spacing to 250px
    pods.forEach((pod, index)=>{
        const nodeId = `pod-${pod.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 950,
                y: 50 + index * 250
            },
            data: {
                label: pod.name,
                resourceType: 'Pod',
                status: getResourceStatus('Pod', pod),
                namespace: pod.namespace,
                details: {
                    node: pod.nodeName,
                    restarts: `${pod.restartCount}`
                }
            }
        });
        // Connect Deployment to Pod
        edges.push({
            id: `deployment-${nodeId}`,
            source: `deployment-${deployment.name}`,
            target: nodeId,
            type: 'default',
            animated: pod.status === 'Running'
        });
    });
    return {
        nodes,
        edges
    };
}
function buildPodTopology(pod, configMaps, secrets) {
    const nodes = [];
    const edges = [];
    // Add pod node (center)
    nodes.push({
        id: `pod-${pod.name}`,
        type: 'default',
        position: {
            x: 400,
            y: 200
        },
        data: {
            label: pod.name,
            resourceType: 'Pod',
            status: getResourceStatus('Pod', pod),
            namespace: pod.namespace,
            details: {
                node: pod.nodeName,
                ip: pod.ip,
                restarts: `${pod.restartCount}`
            }
        }
    });
    // Add ConfigMap nodes (left side)
    configMaps.forEach((cm, index)=>{
        const nodeId = `configmap-${cm.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 50,
                y: 100 + index * 120
            },
            data: {
                label: cm.name,
                resourceType: 'ConfigMap',
                status: 'healthy',
                namespace: cm.namespace
            }
        });
        edges.push({
            id: `${nodeId}-pod`,
            source: nodeId,
            target: `pod-${pod.name}`,
            type: 'default',
            animated: false
        });
    });
    // Add Secret nodes (left side, below ConfigMaps)
    secrets.forEach((secret, index)=>{
        const nodeId = `secret-${secret.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 50,
                y: 100 + (configMaps.length + index) * 120
            },
            data: {
                label: secret.name,
                resourceType: 'Secret',
                status: 'healthy',
                namespace: secret.namespace
            }
        });
        edges.push({
            id: `${nodeId}-pod`,
            source: nodeId,
            target: `pod-${pod.name}`,
            type: 'default',
            animated: false
        });
    });
    // Add container nodes (right side)
    pod.containers.forEach((container, index)=>{
        const nodeId = `container-${pod.name}-${container.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 750,
                y: 100 + index * 120
            },
            data: {
                label: container.name,
                resourceType: 'Pod',
                status: container.ready ? 'healthy' : 'error',
                namespace: pod.namespace,
                details: {
                    image: container.image,
                    restarts: `${container.restartCount}`
                }
            }
        });
        edges.push({
            id: `pod-${nodeId}`,
            source: `pod-${pod.name}`,
            target: nodeId,
            type: 'default',
            animated: container.ready
        });
    });
    return {
        nodes,
        edges
    };
}
function buildNamespaceTopology(deployments, pods, configMaps, secrets) {
    const nodes = [];
    const edges = [];
    // Add Deployment nodes (top row)
    deployments.forEach((deployment, index)=>{
        const nodeId = `deployment-${deployment.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 200 + index * 250,
                y: 50
            },
            data: {
                label: deployment.name,
                resourceType: 'Deployment',
                status: getResourceStatus('Deployment', deployment),
                namespace: deployment.namespace,
                details: {
                    replicas: `${deployment.replicas.ready}/${deployment.replicas.desired}`
                }
            }
        });
        // Find and add pods for this deployment
        const deploymentPods = pods.filter((pod)=>pod.labels.app === deployment.name);
        deploymentPods.forEach((pod, podIndex)=>{
            const podNodeId = `pod-${pod.name}`;
            nodes.push({
                id: podNodeId,
                type: 'default',
                position: {
                    x: 200 + index * 250,
                    y: 200 + podIndex * 100
                },
                data: {
                    label: pod.name,
                    resourceType: 'Pod',
                    status: getResourceStatus('Pod', pod),
                    namespace: pod.namespace
                }
            });
            edges.push({
                id: `${nodeId}-${podNodeId}`,
                source: nodeId,
                target: podNodeId,
                type: 'default',
                animated: pod.status === 'Running'
            });
        });
    });
    // Add ConfigMap nodes (left column)
    configMaps.forEach((cm, index)=>{
        const nodeId = `configmap-${cm.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 50,
                y: 50 + index * 100
            },
            data: {
                label: cm.name,
                resourceType: 'ConfigMap',
                status: 'healthy',
                namespace: cm.namespace
            }
        });
    });
    // Add Secret nodes (left column, below ConfigMaps)
    secrets.forEach((secret, index)=>{
        const nodeId = `secret-${secret.name}`;
        nodes.push({
            id: nodeId,
            type: 'default',
            position: {
                x: 50,
                y: 50 + (configMaps.length + index) * 100
            },
            data: {
                label: secret.name,
                resourceType: 'Secret',
                status: 'healthy',
                namespace: secret.namespace
            }
        });
    });
    return {
        nodes,
        edges
    };
}
function buildConfigSecretsTopology(deployments, configMaps, secrets, namespace) {
    const nodes = [];
    const edges = [];
    // Filter ConfigMaps and Secrets by Flux kustomize namespace label
    const filteredConfigMaps = configMaps.filter((cm)=>cm.labels['kustomize.toolkit.fluxcd.io/namespace'] === namespace);
    const filteredSecrets = secrets.filter((s)=>s.labels['kustomize.toolkit.fluxcd.io/namespace'] === namespace);
    if (filteredConfigMaps.length === 0 && filteredSecrets.length === 0) {
        return {
            nodes: [],
            edges: []
        };
    }
    // Calculate layout positions
    const leftColumnX = 100;
    const rightColumnX = 800;
    // Add ConfigMaps on the left
    filteredConfigMaps.forEach((cm, index)=>{
        nodes.push({
            id: `configmap-${cm.name}`,
            position: {
                x: leftColumnX,
                y: index * 120 + 50
            },
            data: {
                label: cm.name,
                resourceType: 'ConfigMap',
                status: 'healthy',
                namespace: cm.namespace
            }
        });
        // Find deployments that use this ConfigMap
        deployments.forEach((deployment)=>{
            if (deployment.configMaps.includes(cm.name)) {
                edges.push({
                    id: `configmap-${cm.name}-${deployment.name}`,
                    source: `configmap-${cm.name}`,
                    target: `deployment-${deployment.name}`,
                    type: 'default',
                    animated: false
                });
            }
        });
    });
    // Add Secrets below ConfigMaps on the left
    filteredSecrets.forEach((secret, index)=>{
        const yPosition = (filteredConfigMaps.length + index) * 120 + 50;
        nodes.push({
            id: `secret-${secret.name}`,
            position: {
                x: leftColumnX,
                y: yPosition
            },
            data: {
                label: secret.name,
                resourceType: 'Secret',
                status: 'healthy',
                namespace: secret.namespace
            }
        });
        // Find deployments that use this Secret
        deployments.forEach((deployment)=>{
            if (deployment.secrets.includes(secret.name)) {
                edges.push({
                    id: `secret-${secret.name}-${deployment.name}`,
                    source: `secret-${secret.name}`,
                    target: `deployment-${deployment.name}`,
                    type: 'default',
                    animated: false
                });
            }
        });
    });
    // Add Deployments on the right (only those connected to filtered ConfigMaps/Secrets)
    const connectedDeployments = new Set();
    edges.forEach((edge)=>{
        const deploymentId = edge.target;
        if (deploymentId.startsWith('deployment-')) {
            connectedDeployments.add(deploymentId.replace('deployment-', ''));
        }
    });
    Array.from(connectedDeployments).forEach((deploymentName, index)=>{
        const deployment = deployments.find((d)=>d.name === deploymentName);
        if (!deployment) return;
        nodes.push({
            id: `deployment-${deployment.name}`,
            position: {
                x: rightColumnX,
                y: index * 120 + 50
            },
            data: {
                label: deployment.name,
                resourceType: 'Deployment',
                status: getResourceStatus('Deployment', deployment),
                namespace: deployment.namespace
            }
        });
    });
    return {
        nodes,
        edges
    };
}
}),
"[project]/app/app/components/common/detail-skeleton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DetailSkeleton",
    ()=>DetailSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Skeleton/Skeleton.js [app-ssr] (ecmascript) <export default as Skeleton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript)");
;
;
;
function DetailSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                        variant: "text",
                        width: 200,
                        height: 48
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        display: "flex",
                        gap: 1,
                        mt: 2,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                variant: "rectangular",
                                width: 80,
                                height: 24,
                                sx: {
                                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                lineNumber: 15,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                variant: "rectangular",
                                width: 100,
                                height: 24,
                                sx: {
                                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                variant: "rectangular",
                                width: 60,
                                height: 24,
                                sx: {
                                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                p: 3,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    container: true,
                    spacing: 3,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            size: {
                                xs: 12,
                                md: 6
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                sx: {
                                    p: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                        variant: "text",
                                        width: 120,
                                        height: 32,
                                        sx: {
                                            mb: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                        lineNumber: 26,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                        children: Array.from({
                                            length: 4
                                        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                                        variant: "text",
                                                        width: 80,
                                                        height: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                                        lineNumber: 30,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                                        variant: "text",
                                                        width: "60%",
                                                        height: 24
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                                        lineNumber: 31,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                                lineNumber: 29,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                        lineNumber: 27,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            size: {
                                xs: 12,
                                md: 6
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                sx: {
                                    p: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                        variant: "text",
                                        width: 100,
                                        height: 32,
                                        sx: {
                                            mb: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        children: Array.from({
                                            length: 3
                                        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                                variant: "rectangular",
                                                width: 120,
                                                height: 32,
                                                sx: {
                                                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                                                }
                                            }, index, false, {
                                                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                                lineNumber: 44,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            size: 12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                sx: {
                                    p: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                        variant: "text",
                                        width: 150,
                                        height: 32,
                                        sx: {
                                            mb: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                        variant: "rectangular",
                                        width: "100%",
                                        height: 200,
                                        sx: {
                                            borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/app/components/common/error-state.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorState",
    ()=>ErrorState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$AlertTitle$2f$AlertTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/AlertTitle/AlertTitle.js [app-ssr] (ecmascript) <export default as AlertTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Refresh.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ErrorOutline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ErrorOutline.js [app-ssr] (ecmascript)");
;
;
;
;
function ErrorState({ error, onRetry, title = 'Error Loading Data' }) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    // Parse common error types for better messages
    const getFriendlyMessage = (msg)=>{
        if (msg.includes('Failed to fetch')) {
            return 'Network error. Please check your connection and try again.';
        }
        if (msg.includes('401') || msg.includes('Unauthorized')) {
            return 'You do not have permission to access this resource. Please check your Kubernetes RBAC permissions.';
        }
        if (msg.includes('403') || msg.includes('Forbidden')) {
            return 'You do not have permission to access this resource.';
        }
        if (msg.includes('404') || msg.includes('Not Found')) {
            return 'The requested resource was not found.';
        }
        if (msg.includes('500') || msg.includes('Internal Server Error')) {
            return 'Server error. Please try again later.';
        }
        if (msg.includes('Namespace is required')) {
            return 'Please select a namespace to view this resource.';
        }
        return msg;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            maxWidth: 600,
            mx: 'auto',
            mt: 4
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
            severity: "error",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ErrorOutline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                fontSize: "large"
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/error-state.tsx",
                lineNumber: 45,
                columnNumber: 15
            }, void 0),
            sx: {
                '& .MuiAlert-message': {
                    width: '100%'
                }
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$AlertTitle$2f$AlertTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTitle$3e$__["AlertTitle"], {
                    sx: {
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                    },
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/error-state.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        mb: 2
                    },
                    children: getFriendlyMessage(errorMessage)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/error-state.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                    variant: "outlined",
                    size: "small",
                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/app/components/common/error-state.tsx",
                        lineNumber: 59,
                        columnNumber: 24
                    }, void 0),
                    onClick: onRetry,
                    sx: {
                        borderColor: 'error.main',
                        color: 'error.main',
                        '&:hover': {
                            borderColor: 'error.dark',
                            backgroundColor: 'error.light'
                        }
                    },
                    children: "Try Again"
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/error-state.tsx",
                    lineNumber: 56,
                    columnNumber: 11
                }, this),
                ("TURBOPACK compile-time value", "development") === 'development' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        mt: 2,
                        p: 1,
                        bgcolor: 'grey.100',
                        borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        color: 'text.secondary'
                    },
                    children: errorMessage
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/error-state.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/common/error-state.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/common/error-state.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/app/components/metrics/resource-usage-chart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResourceUsageChart",
    ()=>ResourceUsageChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/LinearProgress/LinearProgress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/components/GlassPanel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/InfoOutlined.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/status-badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-ssr] (ecmascript)");
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
function formatMemory(bytes) {
    if (bytes === 0) return '0 B';
    const units = [
        'B',
        'KB',
        'MB',
        'GB',
        'TB'
    ];
    const BYTES_PER_KB = 1024;
    let size = bytes;
    let unitIndex = 0;
    while(size >= BYTES_PER_KB && unitIndex < units.length - 1){
        size /= BYTES_PER_KB;
        unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
}
function formatCPU(millicores) {
    if (millicores === 0) return '0m';
    if (millicores >= 1000) {
        return `${(millicores / 1000).toFixed(2)} cores`;
    }
    return `${millicores.toFixed(0)}m`;
}
function getUsageColor(percentage) {
    if (percentage < 70) return 'success';
    if (percentage < 90) return 'warning';
    return 'error';
}
function ResourceUsageChart({ deploymentName, namespace }) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const selectedNamespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.selectedNamespace);
    const ns = namespace || selectedNamespace || 'default';
    const { data, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'pod-metrics',
            deploymentName,
            ns,
            mode
        ],
        queryFn: async ()=>{
            if (mode === 'demo') {
                // Generate random metrics for demo mode
                const podCount = 3;
                const metrics = [];
                const requirements = [];
                for(let i = 0; i < podCount; i++){
                    const podName = `${deploymentName}-${Math.random().toString(36).substring(7)}`;
                    // Random CPU: 50-400m
                    const cpuValue = 50 + Math.random() * 350;
                    // Random Memory: 100-400MB
                    const memoryValue = (100 + Math.random() * 300) * 1024 * 1024;
                    metrics.push({
                        podName,
                        containerName: deploymentName,
                        cpu: `${cpuValue.toFixed(0)}m`,
                        memory: `${(memoryValue / 1024 / 1024).toFixed(0)}Mi`,
                        cpuValue,
                        memoryValue
                    });
                    requirements.push({
                        podName,
                        containerName: deploymentName,
                        requests: {
                            cpu: '100m',
                            memory: '128Mi',
                            cpuValue: 100,
                            memoryValue: 128 * 1024 * 1024
                        },
                        limits: {
                            cpu: '500m',
                            memory: '512Mi',
                            cpuValue: 500,
                            memoryValue: 512 * 1024 * 1024
                        }
                    });
                }
                return {
                    deployment: deploymentName,
                    namespace: ns,
                    metrics,
                    requirements,
                    timestamp: new Date().toISOString()
                };
            }
            const response = await fetch(`/api/metrics/pods?deployment=${deploymentName}&namespace=${ns}&mode=${mode}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || errorData.error || 'Failed to fetch metrics');
            }
            return response.json();
        },
        enabled: true,
        refetchInterval: mode === 'demo' ? 5000 : 30000
    });
    const aggregatedMetrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!data) return null;
        let totalCpuCurrent = 0;
        let totalCpuRequested = 0;
        let totalCpuLimit = 0;
        let totalMemCurrent = 0;
        let totalMemRequested = 0;
        let totalMemLimit = 0;
        data.metrics.forEach((metric)=>{
            totalCpuCurrent += metric.cpuValue;
            totalMemCurrent += metric.memoryValue;
        });
        data.requirements.forEach((req)=>{
            totalCpuRequested += req.requests.cpuValue;
            totalCpuLimit += req.limits.cpuValue;
            totalMemRequested += req.requests.memoryValue;
            totalMemLimit += req.limits.memoryValue;
        });
        const cpuUsagePercent = totalCpuLimit > 0 ? totalCpuCurrent / totalCpuLimit * 100 : 0;
        const memUsagePercent = totalMemLimit > 0 ? totalMemCurrent / totalMemLimit * 100 : 0;
        return {
            cpu: {
                current: totalCpuCurrent,
                requested: totalCpuRequested,
                limit: totalCpuLimit,
                usagePercent: cpuUsagePercent
            },
            memory: {
                current: totalMemCurrent,
                requested: totalMemRequested,
                limit: totalMemLimit,
                usagePercent: memUsagePercent
            },
            podCount: data.metrics.length
        };
    }, [
        data
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 4
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                lineNumber: 201,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
            lineNumber: 200,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            severity: "error",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    variant: "body2",
                    sx: {
                        fontWeight: 600,
                        mb: 0.5
                    },
                    children: "Failed to load metrics"
                }, void 0, false, {
                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    variant: "caption",
                    children: error instanceof Error ? error.message : 'Unknown error'
                }, void 0, false, {
                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
            lineNumber: 208,
            columnNumber: 7
        }, this);
    }
    if (!data || !aggregatedMetrics) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            severity: "warning",
            children: "No metrics available. Make sure metrics-server is installed in your cluster."
        }, void 0, false, {
            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
            lineNumber: 221,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                container: true,
                spacing: 3,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        size: {
                            xs: 12,
                            md: 6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GlassPanel"], {
                            sx: {
                                p: 3
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "h6",
                                                    sx: {
                                                        fontWeight: 600
                                                    },
                                                    children: "CPU Usage"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    title: "Percentage of current usage vs. resource limit (Current / Limit × 100%)",
                                                    arrow: true,
                                                    placement: "top",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        fontSize: "small",
                                                        sx: {
                                                            color: 'text.secondary',
                                                            cursor: 'help'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                        lineNumber: 247,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            title: `${formatCPU(aggregatedMetrics.cpu.current)} / ${formatCPU(aggregatedMetrics.cpu.limit)}`,
                                            arrow: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                label: `${aggregatedMetrics.cpu.usagePercent.toFixed(1)}%`,
                                                color: getUsageColor(aggregatedMetrics.cpu.usagePercent),
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        mb: 3
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "body2",
                                                    color: "text.secondary",
                                                    children: "Current Usage"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "body2",
                                                    fontWeight: "medium",
                                                    children: formatCPU(aggregatedMetrics.cpu.current)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "determinate",
                                            value: Math.min(aggregatedMetrics.cpu.usagePercent, 100),
                                            color: getUsageColor(aggregatedMetrics.cpu.usagePercent),
                                            sx: {
                                                height: 8,
                                                borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 271,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "caption",
                                                    color: "text.secondary",
                                                    children: "Requested:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 281,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "caption",
                                                    fontWeight: "medium",
                                                    children: formatCPU(aggregatedMetrics.cpu.requested)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 280,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "caption",
                                                    color: "text.secondary",
                                                    children: "Limit:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "caption",
                                                    fontWeight: "medium",
                                                    children: formatCPU(aggregatedMetrics.cpu.limit)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                    lineNumber: 279,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        size: {
                            xs: 12,
                            md: 6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GlassPanel"], {
                            sx: {
                                p: 3
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "h6",
                                                    sx: {
                                                        fontWeight: 600
                                                    },
                                                    children: "Memory Usage"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    title: "Percentage of current usage vs. resource limit (Current / Limit × 100%)",
                                                    arrow: true,
                                                    placement: "top",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        fontSize: "small",
                                                        sx: {
                                                            color: 'text.secondary',
                                                            cursor: 'help'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 308,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            title: `${formatMemory(aggregatedMetrics.memory.current)} / ${formatMemory(aggregatedMetrics.memory.limit)}`,
                                            arrow: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                label: `${aggregatedMetrics.memory.usagePercent.toFixed(1)}%`,
                                                color: getUsageColor(aggregatedMetrics.memory.usagePercent),
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                lineNumber: 324,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 320,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        mb: 3
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "body2",
                                                    color: "text.secondary",
                                                    children: "Current Usage"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "body2",
                                                    fontWeight: "medium",
                                                    children: formatMemory(aggregatedMetrics.memory.current)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 333,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "determinate",
                                            value: Math.min(aggregatedMetrics.memory.usagePercent, 100),
                                            color: getUsageColor(aggregatedMetrics.memory.usagePercent),
                                            sx: {
                                                height: 8,
                                                borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 341,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                    lineNumber: 332,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "caption",
                                                    color: "text.secondary",
                                                    children: "Requested:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "caption",
                                                    fontWeight: "medium",
                                                    children: formatMemory(aggregatedMetrics.memory.requested)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 354,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "caption",
                                                    color: "text.secondary",
                                                    children: "Limit:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "caption",
                                                    fontWeight: "medium",
                                                    children: formatMemory(aggregatedMetrics.memory.limit)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                            lineNumber: 358,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                            lineNumber: 302,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "caption",
                        color: "text.secondary",
                        children: [
                            "Aggregated from ",
                            aggregatedMetrics.podCount,
                            " pod",
                            aggregatedMetrics.podCount !== 1 ? 's' : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "caption",
                        color: "text.secondary",
                        children: [
                            "Last updated: ",
                            new Date(data.timestamp).toLocaleTimeString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/metrics/resource-usage-chart.tsx",
        lineNumber: 228,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "YamlEditorModal",
    ()=>YamlEditorModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Dialog/Dialog.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogTitle/DialogTitle.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogContent/DialogContent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogActions/DialogActions.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Select/Select.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControl/FormControl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputLabel/InputLabel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$GitHub$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/GitHub.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
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
;
;
;
;
function YamlEditorModal({ open, onClose, resourceName, namespace, resourceType = 'deployment' }) {
    const { selectedRepo, setPendingPR } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGitHubStore"])();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])((state)=>state.mode);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [yamlContent, setYamlContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [originalContent, setOriginalContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [_fileSha, setFileSha] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isCreatingPR, setIsCreatingPR] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [prCreated, setPrCreated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isMergingPR, setIsMergingPR] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [matchingFile, setMatchingFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [matchInfo, setMatchInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [matchedFiles, setMatchedFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showFileSelector, setShowFileSelector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Check authentication status (both OAuth and GitHub App)
    const { data: authStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'github-auth-status'
        ],
        queryFn: async ()=>{
            const response = await fetch('/api/github/auth-status');
            if (!response.ok) return {
                authenticated: false
            };
            return response.json();
        },
        enabled: open
    });
    // Fetch YAML files
    const { data: files, isLoading: filesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'github-files',
            selectedRepo?.owner,
            selectedRepo?.repo
        ],
        queryFn: async ()=>{
            if (!selectedRepo) return [];
            const response = await fetch(`/api/github/files?owner=${selectedRepo.owner}&repo=${selectedRepo.repo}&ref=${selectedRepo.branch}`);
            if (!response.ok) throw new Error('Failed to fetch files');
            return response.json();
        },
        enabled: !!selectedRepo && open
    });
    // Update authentication state when authStatus changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (authStatus) {
            setIsAuthenticated(authStatus.authenticated);
        }
    }, [
        authStatus
    ]);
    // Auto-match file when files are loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const autoMatchFile = async ()=>{
            if (!files || files.length === 0 || selectedFile || !open || !selectedRepo) return;
            setMatchingFile(true);
            setMatchInfo(null);
            try {
                // Check if AI is available (OpenAI key configured)
                const openaiKey = localStorage.getItem('kubevista_openai_key');
                let response;
                if (openaiKey) {
                    // Smart filtering before AI matching for better performance
                    const baseResourceName = resourceName.replace(/-(main|dev|prod|staging|test)$/, '');
                    const resourceWords = baseResourceName.toLowerCase().split(/[-_]/);
                    // Filter to only relevant files (max 50 most likely matches)
                    let relevantFiles = files.filter((f)=>{
                        const path = f.path.toLowerCase();
                        const name = baseResourceName.toLowerCase();
                        // Match if path contains resource name or any word from resource name
                        return path.includes(name) || path.includes(resourceName.toLowerCase()) || resourceWords.some((word)=>word.length > 2 && path.includes(word)) || path.includes('helm-release') || path.includes('application') || path.includes('deployment') || path.includes('kustomization') || path.includes(resourceType);
                    });
                    // If still too many, take first 50
                    if (relevantFiles.length > 50) {
                        relevantFiles = relevantFiles.slice(0, 50);
                    }
                    // If no relevant files found, use all files (but limit to 100 for safety)
                    const filesToMatch = relevantFiles.length > 0 ? relevantFiles : files.slice(0, 100);
                    // AI-powered matching with filtered files
                    response = await fetch('/api/ai/match-file', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            resourceName,
                            namespace,
                            resourceType,
                            files: filesToMatch.map((f)=>({
                                    path: f.path,
                                    name: f.name
                                })),
                            apiKey: openaiKey
                        })
                    });
                } else {
                    // Fallback: simple pattern matching (no content fetching for speed)
                    const baseResourceName = resourceName.replace(/-(main|dev|prod|staging|test)$/, '');
                    // Quick pattern matching without fetching file contents
                    const matchedFile = files.find((f)=>{
                        const path = f.path.toLowerCase();
                        const name = baseResourceName.toLowerCase();
                        const fullName = resourceName.toLowerCase();
                        // Exact match patterns
                        return path.includes(`${name}/helm-release.yaml`) || path.includes(`${name}/application.yaml`) || path.includes(`${fullName}/helm-release.yaml`) || path.includes(`${fullName}/application.yaml`) || path.includes(name) && (path.includes('helm-release') || path.includes('application'));
                    });
                    if (matchedFile) {
                        // Simulate response format
                        await loadFile(matchedFile.path);
                        setMatchInfo({
                            method: 'pattern',
                            confidence: 75,
                            reasoning: 'Matched by file path pattern'
                        });
                        setMatchingFile(false);
                        return;
                    }
                    // No match found - skip pattern matching API call
                    console.warn('[YamlEditor] No match found with simple pattern matching');
                    setMatchingFile(false);
                    return;
                }
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('[YamlEditor] Failed to match file:', response.status, errorText);
                    return;
                }
                const data = await response.json();
                // Handle different response formats (AI vs pattern matching)
                if (openaiKey && data.matches) {
                    // New AI format with multiple matches
                    setMatchedFiles(data.matches);
                    if (data.matches.length > 1) {
                        // Multiple matches - show selector
                        setShowFileSelector(true);
                        setMatchInfo({
                            method: 'ai',
                            confidence: data.matches[0]?.confidence,
                            reasoning: `Found ${data.matches.length} possible matches`
                        });
                    } else if (data.matches.length === 1) {
                        // Single match - load directly
                        setMatchInfo({
                            method: 'ai',
                            confidence: data.matches[0].confidence,
                            reasoning: data.matches[0].reasoning
                        });
                        await loadFile(data.matches[0].file);
                    } else {
                        console.warn('[YamlEditor] No matches found');
                    }
                } else {
                    // Old format or pattern matching
                    const matchedFilePath = openaiKey ? data.matchedFile // Old AI format
                     : data.matchedFile?.path // Pattern matcher returns object
                    ;
                    if (matchedFilePath) {
                        setMatchInfo({
                            method: openaiKey ? 'ai' : data.method || 'pattern',
                            confidence: data.confidence,
                            reasoning: data.reasoning
                        });
                        await loadFile(matchedFilePath);
                    } else {
                        console.warn('[YamlEditor] No match found');
                    }
                }
            } catch (error) {
                console.error('Error matching file:', error);
            } finally{
                setMatchingFile(false);
            }
        };
        autoMatchFile();
    }, [
        files,
        open
    ]);
    // Load file content
    const loadFile = async (path)=>{
        if (!selectedRepo) return;
        try {
            const response = await fetch(`/api/github/file?owner=${selectedRepo.owner}&repo=${selectedRepo.repo}&path=${path}&ref=${selectedRepo.branch}`);
            if (!response.ok) throw new Error('Failed to load file');
            const data = await response.json();
            setYamlContent(data.content);
            setOriginalContent(data.content);
            setFileSha(data.sha);
            setSelectedFile(path);
        } catch (error) {
            console.error('Failed to load file:', error);
        }
    };
    // Handle PR creation
    const handleCreatePR = async ()=>{
        if (!selectedRepo || !selectedFile) return;
        setIsCreatingPR(true);
        try {
            const response = await fetch('/api/github/create-pr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    owner: selectedRepo.owner,
                    repo: selectedRepo.repo,
                    filePath: selectedFile,
                    content: yamlContent,
                    deploymentName: resourceName,
                    namespace,
                    baseBranch: selectedRepo.branch
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create PR');
            }
            const data = await response.json();
            setPrCreated(data.pr);
            setPendingPR(resourceName, namespace, data.pr.number);
        } catch (error) {
            console.error('Failed to create PR:', error);
            alert(error instanceof Error ? error.message : 'Failed to create PR');
        } finally{
            setIsCreatingPR(false);
        }
    };
    // Check if user is authenticated (OAuth or GitHub App)
    if (isAuthenticated === false) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            open: open,
            onClose: onClose,
            maxWidth: "sm",
            fullWidth: true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        severity: "info",
                        children: "Please connect your GitHub account in Settings first."
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                        lineNumber: 302,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onClick: onClose,
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                    lineNumber: 304,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
            lineNumber: 300,
            columnNumber: 7
        }, this);
    }
    // Still loading authentication status
    if (isAuthenticated === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            open: open,
            onClose: onClose,
            maxWidth: "sm",
            fullWidth: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        display: 'flex',
                        justifyContent: 'center',
                        p: 4
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                        lineNumber: 317,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                    lineNumber: 316,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                lineNumber: 315,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
            lineNumber: 314,
            columnNumber: 7
        }, this);
    }
    if (!selectedRepo) {
        const handleInstallApp = ()=>{
            // Check if running in browser
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            const redirectUri = undefined;
            const state = undefined;
            // Use environment variable - this is replaced at build time
            // TEMPORARY: Hardcoded fallback for testing
            const clientId = undefined;
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            open: open,
            onClose: onClose,
            maxWidth: "sm",
            fullWidth: true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        severity: "info",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body2",
                                fontWeight: 500,
                                gutterBottom: true,
                                children: "No GitHub repository configured"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "caption",
                                color: "text.secondary",
                                display: "block",
                                sx: {
                                    mb: 2
                                },
                                children: "Install the GitHub App and select a repository to edit YAML files via GitOps."
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                lineNumber: 354,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    display: 'flex',
                                    gap: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "contained",
                                        size: "small",
                                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$GitHub$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                            lineNumber: 361,
                                            columnNumber: 28
                                        }, void 0),
                                        onClick: handleInstallApp,
                                        children: "Install GitHub App"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "outlined",
                                        size: "small",
                                        onClick: ()=>{
                                            onClose();
                                            router.push(mode === 'demo' ? '/demo/settings?tab=1' : '/settings?tab=1');
                                        },
                                        children: "Go to Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                        lineNumber: 366,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                    lineNumber: 349,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onClick: onClose,
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                        lineNumber: 380,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                    lineNumber: 379,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
            lineNumber: 348,
            columnNumber: 7
        }, this);
    }
    // Handle PR merge
    const handleMergePR = async ()=>{
        if (!selectedRepo || !prCreated) return;
        setIsMergingPR(true);
        try {
            const response = await fetch('/api/github/merge-pr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    owner: selectedRepo.owner,
                    repo: selectedRepo.repo,
                    pullNumber: prCreated.number,
                    mergeMethod: 'merge'
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to merge PR');
            }
            alert(`PR #${prCreated.number} merged successfully!`);
            onClose();
            // Optionally refresh the page or deployment data
            window.location.reload();
        } catch (error) {
            console.error('Failed to merge PR:', error);
            alert(error instanceof Error ? error.message : 'Failed to merge PR');
        } finally{
            setIsMergingPR(false);
        }
    };
    if (prCreated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            open: open,
            onClose: onClose,
            maxWidth: "md",
            fullWidth: true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: "Pull Request Created Successfully! 🎉"
                }, void 0, false, {
                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                    lineNumber: 423,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            severity: "success",
                            sx: {
                                mb: 2
                            },
                            children: [
                                "PR #",
                                prCreated.number,
                                " has been created and is ready for review."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 425,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            variant: "body2",
                            color: "text.secondary",
                            sx: {
                                mb: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "PR URL:"
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 430,
                                    columnNumber: 13
                                }, this),
                                " ",
                                prCreated.url
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 429,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            severity: "info",
                            sx: {
                                mb: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "body2",
                                    fontWeight: "bold",
                                    gutterBottom: true,
                                    children: "What would you like to do?"
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 434,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "caption",
                                    display: "block",
                                    children: [
                                        "• ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "View PR"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                            lineNumber: 438,
                                            columnNumber: 17
                                        }, this),
                                        ": Open the PR on GitHub to see details and review"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 437,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "caption",
                                    display: "block",
                                    children: [
                                        "• ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Merge Now"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                            lineNumber: 441,
                                            columnNumber: 17
                                        }, this),
                                        ": Merge the PR immediately (use with caution!)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "caption",
                                    display: "block",
                                    children: [
                                        "• ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                            lineNumber: 444,
                                            columnNumber: 17
                                        }, this),
                                        ": Close this dialog and merge the PR later"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 443,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 433,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                    lineNumber: 424,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        px: 3,
                        pb: 2,
                        gap: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: onClose,
                            variant: "outlined",
                            size: "large",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>window.open(prCreated.url, '_blank'),
                            variant: "outlined",
                            size: "large",
                            children: "View PR on GitHub"
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 456,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleMergePR,
                            variant: "contained",
                            color: "success",
                            size: "large",
                            disabled: isMergingPR,
                            startIcon: isMergingPR ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                lineNumber: 469,
                                columnNumber: 38
                            }, void 0) : null,
                            children: isMergingPR ? 'Merging...' : 'Merge Now'
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 463,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                    lineNumber: 448,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
            lineNumber: 422,
            columnNumber: 7
        }, this);
    }
    const resourceTypeLabel = resourceType === 'configmap' ? 'ConfigMap' : resourceType === 'secret' ? 'Secret' : 'Deployment';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        open: open,
        onClose: onClose,
        maxWidth: "lg",
        fullWidth: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    "Edit YAML - ",
                    resourceName,
                    " (",
                    resourceTypeLabel,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                lineNumber: 482,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: filesLoading || matchingFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        p: 4
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 486,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            variant: "body2",
                            color: "text.secondary",
                            children: matchingFile ? 'Finding best matching file...' : 'Loading files...'
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 487,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                    lineNumber: 485,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        matchInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            severity: matchInfo.method === 'content' || matchInfo.method === 'exact' || matchInfo.method === 'directory' || matchInfo.method === 'ai' ? 'success' : 'info',
                            sx: {
                                mb: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "body2",
                                    children: [
                                        matchInfo.method === 'ai' && `✓ File matched by AI (confidence: ${matchInfo.confidence}%)`,
                                        matchInfo.method === 'content' && '✓ File matched by cluster YAML comparison (exact match!)',
                                        matchInfo.method === 'exact' && '✓ File automatically matched by exact name',
                                        matchInfo.method === 'directory' && '✓ File automatically matched by directory structure',
                                        matchInfo.method === 'namespace' && '✓ File automatically matched by namespace pattern',
                                        matchInfo.method === 'fuzzy' && '✓ File automatically matched by similarity',
                                        matchInfo.method === 'pattern' && '✓ File automatically matched by pattern matching'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 499,
                                    columnNumber: 17
                                }, this),
                                matchInfo.reasoning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "caption",
                                    display: "block",
                                    sx: {
                                        mt: 0.5,
                                        opacity: 0.8
                                    },
                                    children: matchInfo.reasoning
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 509,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 495,
                            columnNumber: 15
                        }, this),
                        showFileSelector && matchedFiles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                mb: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "subtitle2",
                                    gutterBottom: true,
                                    children: "AI found multiple possible matches. Select the environment you want to edit:"
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 519,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1
                                    },
                                    children: matchedFiles.map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: selectedFile === match.file ? 'contained' : 'outlined',
                                            onClick: async ()=>{
                                                setShowFileSelector(false);
                                                setMatchInfo({
                                                    method: 'ai',
                                                    confidence: match.confidence,
                                                    reasoning: match.reasoning
                                                });
                                                await loadFile(match.file);
                                            },
                                            sx: {
                                                justifyContent: 'flex-start',
                                                textAlign: 'left',
                                                py: 1.5,
                                                px: 2
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "body2",
                                                        fontWeight: 600,
                                                        children: [
                                                            match.environment.toUpperCase(),
                                                            " - ",
                                                            match.file.split('/').pop()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        display: "block",
                                                        children: match.file
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                                        lineNumber: 547,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        display: "block",
                                                        sx: {
                                                            mt: 0.5
                                                        },
                                                        children: [
                                                            "Confidence: ",
                                                            match.confidence,
                                                            "% • ",
                                                            match.reasoning
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                                lineNumber: 543,
                                                columnNumber: 23
                                            }, this)
                                        }, match.file, false, {
                                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                            lineNumber: 524,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 522,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 518,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            fullWidth: true,
                            sx: {
                                mb: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    children: "Select YAML File"
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 562,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    value: selectedFile || '',
                                    onChange: (e)=>loadFile(e.target.value),
                                    label: "Select YAML File",
                                    children: files?.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            value: file.path,
                                            children: file.path
                                        }, file.path, false, {
                                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                            lineNumber: 569,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                    lineNumber: 563,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 561,
                            columnNumber: 13
                        }, this),
                        selectedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: (theme)=>`${theme.shape.borderRadius}px`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
                                height: "500px",
                                defaultLanguage: "yaml",
                                value: yamlContent,
                                onChange: (value)=>setYamlContent(value || ''),
                                theme: "vs-dark",
                                options: {
                                    minimap: {
                                        enabled: false
                                    },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    wordWrap: 'on',
                                    scrollBeyondLastLine: false
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                                lineNumber: 580,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                            lineNumber: 579,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                lineNumber: 483,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onClick: onClose,
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                        lineNumber: 600,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onClick: handleCreatePR,
                        variant: "contained",
                        disabled: !selectedFile || yamlContent === originalContent || isCreatingPR,
                        children: isCreatingPR ? 'Creating PR...' : 'Create Pull Request'
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                        lineNumber: 601,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
                lineNumber: 599,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx",
        lineNumber: 481,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/app/components/deployments/restart-deployment-dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RestartDeploymentDialog",
    ()=>RestartDeploymentDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContentText$2f$DialogContentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContentText$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogContentText/DialogContentText.js [app-ssr] (ecmascript) <export default as DialogContentText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogActions/DialogActions.js [app-ssr] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$AlertTitle$2f$AlertTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/AlertTitle/AlertTitle.js [app-ssr] (ecmascript) <export default as AlertTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-ssr] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Warning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Warning.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$RestartAlt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/RestartAlt.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function RestartDeploymentDialog({ open, deploymentName, isLoading, onConfirm, onCancel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
        open: open,
        onClose: isLoading ? undefined : onCancel,
        maxWidth: "sm",
        fullWidth: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Warning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        color: "warning"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    "Restart Deployment"
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContentText$2f$DialogContentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContentText$3e$__["DialogContentText"], {
                        sx: {
                            mb: 2
                        },
                        children: [
                            "Are you sure you want to restart deployment ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: deploymentName
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                                lineNumber: 47,
                                columnNumber: 55
                            }, this),
                            "?"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                        severity: "info",
                        sx: {
                            mb: 2
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$AlertTitle$2f$AlertTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTitle$3e$__["AlertTitle"], {
                                children: "What happens during restart"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                component: "ul",
                                sx: {
                                    mt: 1,
                                    mb: 0,
                                    pl: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "All pods will be recreated with a rolling update strategy"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "New pods will be created before old ones are terminated"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Service continuity is maintained (no downtime)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "The restart is triggered by updating the pod template annotation"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContentText$2f$DialogContentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContentText$3e$__["DialogContentText"], {
                        variant: "body2",
                        color: "text.secondary",
                        children: "This is a safe operation that maintains service availability through rolling updates."
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        onClick: onCancel,
                        disabled: isLoading,
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        onClick: onConfirm,
                        variant: "contained",
                        color: "warning",
                        disabled: isLoading,
                        startIcon: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                            lineNumber: 74,
                            columnNumber: 34
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$RestartAlt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                            lineNumber: 74,
                            columnNumber: 67
                        }, void 0),
                        children: isLoading ? 'Restarting...' : 'Restart Deployment'
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/deployments/restart-deployment-dialog.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/app/components/common/refresh-button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RefreshButton",
    ()=>RefreshButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Refresh.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-ssr] (ecmascript)");
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
function RefreshButton({ onRefresh, isLoading = false, size = 'medium', showCountdown = true }) {
    const { autoRefreshEnabled, autoRefreshInterval } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])();
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(autoRefreshInterval);
    const [refreshing, setRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Reset countdown when interval changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCountdown(autoRefreshInterval);
    }, [
        autoRefreshInterval
    ]);
    // Countdown timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!autoRefreshEnabled) {
            setCountdown(autoRefreshInterval);
            return;
        }
        const timer = setInterval(()=>{
            setCountdown((prev)=>{
                if (prev <= 1) {
                    return autoRefreshInterval;
                }
                return prev - 1;
            });
        }, 1000);
        return ()=>clearInterval(timer);
    }, [
        autoRefreshEnabled,
        autoRefreshInterval
    ]);
    const handleRefresh = async ()=>{
        setRefreshing(true);
        setCountdown(autoRefreshInterval); // Reset countdown on manual refresh
        try {
            await onRefresh();
        } finally{
            setRefreshing(false);
        }
    };
    const loading = isLoading || refreshing;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            display: 'flex',
            alignItems: 'center',
            gap: 1
        },
        children: [
            showCountdown && autoRefreshEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "caption",
                color: "text.secondary",
                sx: {
                    minWidth: 40
                },
                children: [
                    countdown,
                    "s"
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/refresh-button.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                title: "Refresh data",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onClick: handleRefresh,
                    disabled: loading,
                    size: size,
                    sx: {
                        '&:hover': {
                            bgcolor: 'action.hover'
                        }
                    },
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        size: size === 'small' ? 16 : 24
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/refresh-button.tsx",
                        lineNumber: 89,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        fontSize: size
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/refresh-button.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/refresh-button.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/refresh-button.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/common/refresh-button.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/app/components/common/page-header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Breadcrumbs$2f$Breadcrumbs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Breadcrumbs/Breadcrumbs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Link/Link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$refresh$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/refresh-button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$NavigateNext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/NavigateNext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function PageHeader({ title, subtitle, metadata, breadcrumbs, onRefresh, isRefreshing = false, actions, headerActions, filters }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleBreadcrumbClick = (href)=>{
        router.push(href);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            mb: 4
        },
        children: [
            breadcrumbs && breadcrumbs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Breadcrumbs$2f$Breadcrumbs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        separator: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$NavigateNext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            fontSize: "small"
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/common/page-header.tsx",
                            lineNumber: 64,
                            columnNumber: 24
                        }, void 0),
                        children: breadcrumbs.map((crumb, index)=>{
                            const isLast = index === breadcrumbs.length - 1;
                            if (isLast || !crumb.href) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    color: "text.primary",
                                    sx: {
                                        fontSize: '0.875rem',
                                        fontWeight: 500
                                    },
                                    children: crumb.label
                                }, crumb.label, false, {
                                    fileName: "[project]/app/app/components/common/page-header.tsx",
                                    lineNumber: 71,
                                    columnNumber: 19
                                }, this);
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                component: "button",
                                onClick: ()=>handleBreadcrumbClick(crumb.href),
                                sx: {
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: 'text.secondary',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'primary.main',
                                        textDecoration: 'underline'
                                    }
                                },
                                children: crumb.label
                            }, crumb.label, false, {
                                fileName: "[project]/app/app/components/common/page-header.tsx",
                                lineNumber: 82,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/page-header.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        },
                        children: [
                            headerActions,
                            onRefresh && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$refresh$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RefreshButton"], {
                                onRefresh: onRefresh,
                                isLoading: isRefreshing
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/page-header.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/page-header.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/page-header.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            typeof title === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "h4",
                                sx: {
                                    fontWeight: 700,
                                    mb: subtitle || metadata ? 0.5 : 0
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/page-header.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    mb: subtitle || metadata ? 0.5 : 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "h4",
                                    component: "div",
                                    sx: {
                                        fontWeight: 700
                                    },
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/common/page-header.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/page-header.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body2",
                                color: "text.secondary",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/page-header.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            metadata && metadata.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    mt: 1
                                },
                                children: metadata.map((item, index)=>typeof item === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: item
                                    }, index, false, {
                                        fileName: "[project]/app/app/components/common/page-header.tsx",
                                        lineNumber: 135,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        children: item
                                    }, index, false, {
                                        fileName: "[project]/app/app/components/common/page-header.tsx",
                                        lineNumber: 139,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/page-header.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/page-header.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                            pt: 0.5
                        },
                        children: [
                            filters,
                            actions
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/page-header.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/page-header.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/common/page-header.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/lib/hooks/use-auto-refresh.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAutoRefresh",
    ()=>useAutoRefresh
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-ssr] (ecmascript)");
;
;
function useAutoRefresh(refetch) {
    const { autoRefreshEnabled, autoRefreshInterval } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModeStore"])();
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Clear existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        // Set up new interval if enabled
        if (autoRefreshEnabled) {
            intervalRef.current = setInterval(()=>{
                refetch();
            }, autoRefreshInterval * 1000);
        }
        // Cleanup on unmount or when settings change
        return ()=>{
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [
        autoRefreshEnabled,
        autoRefreshInterval,
        refetch
    ]);
}
}),
"[project]/app/app/deployments/[name]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeploymentDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Table/Table.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableBody/TableBody.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableCell/TableCell.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableContainer/TableContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableHead/TableHead.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableRow/TableRow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/components/GlassButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$RestartAlt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/RestartAlt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Edit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$OpenInNew$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/OpenInNew.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandMore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ExpandMore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandLess$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ExpandLess.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$deployments$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-deployments.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$configmaps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-configmaps.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$secrets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-secrets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$hpa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-hpa.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/status-badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$topology$2f$topology$2d$graph$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/topology/topology-graph.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$ui$2f$topology$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/ui/topology.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$detail$2d$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/detail-skeleton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/error-state.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$metrics$2f$resource$2d$usage$2d$chart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/metrics/resource-usage-chart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$yaml$2d$editor$2f$yaml$2d$editor$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/yaml-editor/yaml-editor-modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$deployments$2f$restart$2d$deployment$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/deployments/restart-deployment-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-auto-refresh.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/components/GlassPanel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/providers/ThemeProvider.js [app-ssr] (ecmascript)");
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
function DeploymentDetailPage() {
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const name = params.name;
    const [restarting, setRestarting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [restartError, setRestartError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [restartSuccess, setRestartSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editorOpen, setEditorOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [restartDialogOpen, setRestartDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [podsExpanded, setPodsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const { data: deployment, isLoading, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$deployments$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDeployment"])(name);
    // Auto-refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAutoRefresh"])(refetch);
    const { data: pods, isLoading: podsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$deployments$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDeploymentPods"])(name);
    const { data: allConfigMaps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$configmaps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigMaps"])();
    const { data: allSecrets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$secrets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSecrets"])();
    const { data: allHPAs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$hpa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHPAs"])();
    // Build topology graph data
    const handleRestartClick = ()=>{
        setRestartDialogOpen(true);
    };
    const handleRestartConfirm = async ()=>{
        setRestarting(true);
        setRestartError(null);
        setRestartSuccess(false);
        try {
            const response = await fetch(`/api/deployments/${encodeURIComponent(name)}/restart?namespace=${deployment?.namespace}`, {
                method: 'POST'
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to restart deployment');
            }
            setRestartSuccess(true);
            setRestartDialogOpen(false);
            // Refetch deployment data after restart
            setTimeout(()=>{
                refetch();
                setRestartSuccess(false);
            }, 2000);
        } catch (err) {
            setRestartError(err instanceof Error ? err.message : 'Failed to restart deployment');
        } finally{
            setRestarting(false);
        }
    };
    const handleRestartCancel = ()=>{
        setRestartDialogOpen(false);
    };
    const topologyData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!deployment || !pods) return null;
        // Filter ConfigMaps and Secrets related to this deployment
        const relatedConfigMaps = allConfigMaps?.filter((cm)=>deployment.configMaps.includes(cm.name)) || [];
        const relatedSecrets = allSecrets?.filter((s)=>deployment.secrets.includes(s.name)) || [];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$ui$2f$topology$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDeploymentTopology"])(deployment, pods, relatedConfigMaps, relatedSecrets, allHPAs || []);
    }, [
        deployment,
        pods,
        allConfigMaps,
        allSecrets,
        allHPAs
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$detail$2d$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DetailSkeleton"], {}, void 0, false, {
            fileName: "[project]/app/app/deployments/[name]/page.tsx",
            lineNumber: 118,
            columnNumber: 12
        }, this);
    }
    if (error || !deployment) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Deployment Details",
                    breadcrumbs: [
                        {
                            label: 'Deployments',
                            href: '/deployments'
                        },
                        {
                            label: name
                        }
                    ]
                }, void 0, false, {
                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorState"], {
                    error: error || new Error('Deployment not found'),
                    onRetry: ()=>refetch(),
                    title: "Failed to Load Deployment"
                }, void 0, false, {
                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/deployments/[name]/page.tsx",
            lineNumber: 123,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    },
                    children: [
                        deployment.name,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                            status: deployment.status,
                            size: "medium"
                        }, void 0, false, {
                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, void 0),
                metadata: [
                    `Age: ${deployment.age}`
                ],
                breadcrumbs: [
                    {
                        label: 'Deployments',
                        href: '/deployments'
                    },
                    {
                        label: deployment.name
                    }
                ],
                onRefresh: refetch,
                isRefreshing: isLoading,
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        display: 'flex',
                        gap: 2
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GlassButton"], {
                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                lineNumber: 161,
                                columnNumber: 26
                            }, void 0),
                            onClick: ()=>setEditorOpen(true),
                            children: "Edit YAML"
                        }, void 0, false, {
                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GlassButton"], {
                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$RestartAlt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                lineNumber: 167,
                                columnNumber: 26
                            }, void 0),
                            onClick: handleRestartClick,
                            disabled: restarting,
                            sx: {
                                color: (theme)=>theme.palette.warning.main,
                                borderColor: (theme)=>theme.palette.warning.main
                            },
                            children: "Restart"
                        }, void 0, false, {
                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                            lineNumber: 166,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                    lineNumber: 159,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$yaml$2d$editor$2f$yaml$2d$editor$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YamlEditorModal"], {
                open: editorOpen,
                onClose: ()=>setEditorOpen(false),
                resourceName: deployment.name,
                namespace: deployment.namespace,
                resourceType: "deployment"
            }, void 0, false, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$deployments$2f$restart$2d$deployment$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RestartDeploymentDialog"], {
                open: restartDialogOpen,
                deploymentName: deployment.name,
                isLoading: restarting,
                onConfirm: handleRestartConfirm,
                onCancel: handleRestartCancel
            }, void 0, false, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            restartSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                severity: "success",
                sx: {
                    mb: 2
                },
                children: "Deployment restart initiated successfully!"
            }, void 0, false, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this),
            restartError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                severity: "error",
                sx: {
                    mb: 2
                },
                onClose: ()=>setRestartError(null),
                children: restartError
            }, void 0, false, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 204,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "h6",
                        sx: {
                            mb: 2,
                            fontWeight: 600
                        },
                        children: "Details"
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GlassPanel"], {
                        sx: {
                            p: 2
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            color: isGlass ? "text.secondary" : "text.primary",
                                            children: "Strategy:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            fontWeight: "medium",
                                            children: deployment.strategy
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 219,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            color: isGlass ? "text.secondary" : "text.primary",
                                            children: "Desired Replicas:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            fontWeight: "medium",
                                            children: deployment.replicas.desired
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            color: isGlass ? "text.secondary" : "text.primary",
                                            children: "Ready Replicas:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 232,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            fontWeight: "medium",
                                            children: deployment.replicas.ready
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            color: isGlass ? "text.secondary" : "text.primary",
                                            children: "Available Replicas:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            fontWeight: "medium",
                                            children: deployment.replicas.available
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            color: isGlass ? "text.secondary" : "text.primary",
                                            children: "Unavailable Replicas:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "body2",
                                            fontWeight: "medium",
                                            children: deployment.replicas.unavailable
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "h6",
                        sx: {
                            mb: 2,
                            fontWeight: 600
                        },
                        children: "Labels"
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1.5
                        },
                        children: Object.entries(deployment.labels).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                elevation: isGlass ? 0 : 1,
                                sx: {
                                    px: 2,
                                    py: 1,
                                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    ...isGlass && {
                                        backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                                        backdropFilter: 'blur(24px) saturate(180%)',
                                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                                        border: '1px solid',
                                        borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)'
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        fontWeight: 600,
                                        children: [
                                            key,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        fontWeight: 500,
                                        children: value
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "h6",
                        sx: {
                            mb: 2,
                            fontWeight: 600
                        },
                        children: "Resources"
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2
                        },
                        children: [
                            deployment.configMaps.map((cm)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/configmaps/${encodeURIComponent(cm)}`,
                                    style: {
                                        textDecoration: 'none'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        elevation: isGlass ? 0 : 1,
                                        sx: {
                                            p: 2.5,
                                            minWidth: 200,
                                            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                            ...isGlass && {
                                                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                                                backdropFilter: 'blur(24px) saturate(180%)',
                                                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                                                border: '1px solid',
                                                borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)'
                                            },
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                ...isGlass && {
                                                    borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.4)'
                                                }
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    mb: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "info.main",
                                                        fontWeight: 600,
                                                        children: "ConfigMap"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$OpenInNew$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        fontSize: "small",
                                                        sx: {
                                                            color: 'info.main',
                                                            opacity: 0.6
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                lineNumber: 346,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body1",
                                                fontWeight: 500,
                                                children: cm
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                lineNumber: 352,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this)
                                }, cm, false, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 309,
                                    columnNumber: 13
                                }, this)),
                            deployment.secrets.map((secret)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/secrets/${encodeURIComponent(secret)}`,
                                    style: {
                                        textDecoration: 'none'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        elevation: isGlass ? 0 : 1,
                                        sx: {
                                            p: 2.5,
                                            minWidth: 200,
                                            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                            ...isGlass && {
                                                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                                                backdropFilter: 'blur(24px) saturate(180%)',
                                                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                                                border: '1px solid',
                                                borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)'
                                            },
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                ...isGlass && {
                                                    borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(234, 179, 8, 0.5)' : 'rgba(234, 179, 8, 0.4)'
                                                }
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    mb: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "warning.main",
                                                        fontWeight: 600,
                                                        children: "Secret"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$OpenInNew$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        fontSize: "small",
                                                        sx: {
                                                            color: 'warning.main',
                                                            opacity: 0.6
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body1",
                                                fontWeight: 500,
                                                children: secret
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this)
                                }, secret, false, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 359,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 303,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "h6",
                                fontWeight: 600,
                                children: "Pods"
                            }, void 0, false, {
                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                lineNumber: 414,
                                columnNumber: 11
                            }, this),
                            pods && pods.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                size: "small",
                                onClick: ()=>setPodsExpanded(!podsExpanded),
                                sx: {
                                    color: 'text.secondary'
                                },
                                children: podsExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandLess$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 31
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandMore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 52
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                lineNumber: 418,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 413,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GlassPanel"], {
                        sx: {
                            p: 2
                        },
                        children: podsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                display: 'flex',
                                justifyContent: 'center',
                                p: 4
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                lineNumber: 430,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                            lineNumber: 429,
                            columnNumber: 13
                        }, this) : pods?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            children: "Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                            lineNumber: 438,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            children: "Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            children: "Node"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            children: "IP"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            align: "center",
                                                            children: "Restarts"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            children: "Age"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                lineNumber: 436,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                children: (podsExpanded ? pods : pods.slice(0, 3)).map((pod)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        hover: true,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    variant: "body2",
                                                                    fontWeight: "medium",
                                                                    children: pod.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                    lineNumber: 450,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                                    status: pod.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                    lineNumber: 455,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                lineNumber: 454,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: `/nodes/${encodeURIComponent(pod.nodeName)}`,
                                                                    style: {
                                                                        textDecoration: 'none'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        variant: "body2",
                                                                        sx: {
                                                                            color: 'primary.main',
                                                                            '&:hover': {
                                                                                textDecoration: 'underline'
                                                                            },
                                                                            cursor: 'pointer'
                                                                        },
                                                                        children: pod.nodeName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                        lineNumber: 462,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                    lineNumber: 458,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                children: pod.ip
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                lineNumber: 476,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                align: "center",
                                                                children: pod.restartCount
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                lineNumber: 477,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                children: pod.age
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                                lineNumber: 478,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, pod.name, true, {
                                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                        lineNumber: 448,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                        lineNumber: 435,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 434,
                                    columnNumber: 15
                                }, this),
                                !podsExpanded && pods.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        textAlign: 'center',
                                        mt: 1
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        children: [
                                            "Showing 3 of ",
                                            pods.length,
                                            " pods"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                        lineNumber: 486,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                    lineNumber: 485,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                p: 2
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                severity: "info",
                                children: "No pods found for this deployment"
                            }, void 0, false, {
                                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                                lineNumber: 494,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/deployments/[name]/page.tsx",
                            lineNumber: 493,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 412,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "h6",
                        sx: {
                            mb: 2
                        },
                        children: "Resource Metrics"
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 502,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$metrics$2f$resource$2d$usage$2d$chart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResourceUsageChart"], {
                        deploymentName: name,
                        namespace: deployment.namespace
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            topologyData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "h6",
                        sx: {
                            mb: 2,
                            fontWeight: 600
                        },
                        children: "Topology"
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 511,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$topology$2f$topology$2d$graph$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TopologyGraph"], {
                        data: topologyData,
                        height: 500
                    }, void 0, false, {
                        fileName: "[project]/app/app/deployments/[name]/page.tsx",
                        lineNumber: 514,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/deployments/[name]/page.tsx",
                lineNumber: 510,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/deployments/[name]/page.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_be43b58d._.js.map