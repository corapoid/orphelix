(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/app/lib/hooks/use-jobs.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useJob",
    ()=>useJob,
    "useJobs",
    ()=>useJobs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function useJobs() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useJobs.useModeStore[mode]": (state)=>state.mode
    }["useJobs.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useJobs.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useJobs.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useJobs.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useJobs.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'jobs',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useJobs.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useJobs.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useJobs.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockJobs"])();
                }
                const response = await fetch(`/api/jobs?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to fetch jobs');
                }
                return response.json();
            }
        }["useJobs.useQuery"],
        enabled: mode === 'demo' || !!namespace
    });
}
_s(useJobs, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useJob(name) {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useJob.useModeStore[mode]": (state)=>state.mode
    }["useJob.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useJob.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useJob.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useJob.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useJob.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'jobs',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useJob.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useJob.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useJob.useQuery"]);
                    const jobs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockJobs"])();
                    const job = jobs.find({
                        "useJob.useQuery.job": (j)=>j.name === name
                    }["useJob.useQuery.job"]);
                    if (!job) throw new Error('Job not found');
                    return job;
                }
                const response = await fetch(`/api/jobs/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to fetch job');
                }
                return response.json();
            }
        }["useJob.useQuery"],
        enabled: (mode === 'demo' || !!namespace) && !!name
    });
}
_s1(useJob, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
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
"[project]/app/app/components/common/status-badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusBadge",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CheckCircle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HourglassEmpty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/HourglassEmpty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HelpOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/HelpOutline.js [app-client] (ecmascript)");
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 24,
            columnNumber: 40
        }, ("TURBOPACK compile-time value", void 0))
    },
    Running: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 25,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    },
    Ready: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 26,
            columnNumber: 36
        }, ("TURBOPACK compile-time value", void 0))
    },
    Succeeded: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 27,
            columnNumber: 40
        }, ("TURBOPACK compile-time value", void 0))
    },
    Active: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 28,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    Bound: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 29,
            columnNumber: 36
        }, ("TURBOPACK compile-time value", void 0))
    },
    Normal: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 30,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Error states
    Failed: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 33,
            columnNumber: 35
        }, ("TURBOPACK compile-time value", void 0))
    },
    Degraded: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 34,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    NotReady: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 35,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    CrashLoopBackOff: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 36,
            columnNumber: 45
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Warning states
    Pending: {
        color: 'warning',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HourglassEmpty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 39,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    },
    Warning: {
        color: 'warning',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 40,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Info states
    Progressing: {
        color: 'info',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HourglassEmpty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 43,
            columnNumber: 39
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Unknown
    Unknown: {
        color: 'default',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HelpOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 46,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        label: finalLabel,
        size: size,
        ...props,
        sx: {
            fontWeight: 500,
            fontSize: '0.6875rem',
            height: 20,
            minWidth: 70,
            borderRadius: '10px',
            backgroundColor: (theme)=>theme.palette.mode === 'dark' ? colors.bgDark : colors.bg,
            color: (theme)=>theme.palette.mode === 'dark' ? colors.textDark : colors.text,
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
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
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
var _c;
__turbopack_context__.k.register(_c, "StatusBadge");
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
;
;
;
;
function ResourceCard({ name, resourceType, resourceColor, icon: Icon, onClick, statusBadge, metrics, footer }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        onClick: onClick,
        elevation: 0,
        sx: {
            p: 2,
            cursor: onClick ? 'pointer' : 'default',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            // Liquid glass effect - MORE transparency!
            backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid',
            borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)',
            boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)' : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
            // Glass shine - diagonal gradient
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                background: (theme)=>theme.palette.mode === 'dark' ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%, rgba(0, 0, 0, 0.1) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 60%, rgba(0, 0, 0, 0.02) 100%)',
                pointerEvents: 'none',
                borderRadius: 3
            },
            '&:hover': {
                transform: 'translateY(-2px) scale(1.01)',
                borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(209, 213, 219, 0.6)',
                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(50, 50, 70, 0.7)' : 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(28px) saturate(200%)',
                WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 2px 2px 0 rgba(255, 255, 255, 0.12), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 2px 2px 0 rgba(255, 255, 255, 1), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.08)'
            },
            '&:active': {
                transform: 'translateY(0px) scale(0.98)'
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
                            borderRadius: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: (theme)=>theme.palette.mode === 'dark' ? `linear-gradient(135deg, ${resourceColor}25 0%, ${resourceColor}15 100%)` : `linear-gradient(135deg, ${resourceColor}30 0%, ${resourceColor}15 100%)`,
                            backdropFilter: 'blur(10px)',
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
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/resource-card.tsx",
                        lineNumber: 100,
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
                                lineNumber: 128,
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
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/resource-card.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/resource-card.tsx",
                lineNumber: 99,
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
                lineNumber: 151,
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
                lineNumber: 158,
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
                lineNumber: 165,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/common/resource-card.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = ResourceCard;
var _c;
__turbopack_context__.k.register(_c, "ResourceCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/jobs/job-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JobCard",
    ()=>JobCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Work$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Work.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/resource-card.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
function JobCard({ job, onClick }) {
    const resourceColor = '#FF9800' // Orange for jobs
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceCard"], {
        name: job.name,
        resourceType: "Job",
        resourceColor: resourceColor,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Work$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        onClick: onClick,
        statusBadge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
            status: job.status
        }, void 0, false, {
            fileName: "[project]/app/app/components/jobs/job-card.tsx",
            lineNumber: 23,
            columnNumber: 20
        }, void 0),
        metrics: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                            children: "Succeeded"
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/jobs/job-card.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "h6",
                            fontWeight: 700,
                            children: [
                                job.succeeded,
                                "/",
                                job.completions
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/jobs/job-card.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/jobs/job-card.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, void 0),
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
                            fileName: "[project]/app/app/components/jobs/job-card.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "h6",
                            fontWeight: 700,
                            children: job.failed
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/jobs/job-card.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/jobs/job-card.tsx",
                    lineNumber: 34,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/jobs/job-card.tsx",
            lineNumber: 25,
            columnNumber: 9
        }, void 0),
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "caption",
            color: "text.secondary",
            children: [
                "Age: ",
                job.age
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/jobs/job-card.tsx",
            lineNumber: 45,
            columnNumber: 9
        }, void 0)
    }, void 0, false, {
        fileName: "[project]/app/app/components/jobs/job-card.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = JobCard;
var _c;
__turbopack_context__.k.register(_c, "JobCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/common/refresh-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RefreshButton",
    ()=>RefreshButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Refresh.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
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
function RefreshButton({ onRefresh, isLoading = false, size = 'medium', showCountdown = true }) {
    _s();
    const { autoRefreshEnabled, autoRefreshInterval } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])();
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(autoRefreshInterval);
    const [refreshing, setRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Reset countdown when interval changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RefreshButton.useEffect": ()=>{
            setCountdown(autoRefreshInterval);
        }
    }["RefreshButton.useEffect"], [
        autoRefreshInterval
    ]);
    // Countdown timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RefreshButton.useEffect": ()=>{
            if (!autoRefreshEnabled) {
                setCountdown(autoRefreshInterval);
                return;
            }
            const timer = setInterval({
                "RefreshButton.useEffect.timer": ()=>{
                    setCountdown({
                        "RefreshButton.useEffect.timer": (prev)=>{
                            if (prev <= 1) {
                                return autoRefreshInterval;
                            }
                            return prev - 1;
                        }
                    }["RefreshButton.useEffect.timer"]);
                }
            }["RefreshButton.useEffect.timer"], 1000);
            return ({
                "RefreshButton.useEffect": ()=>clearInterval(timer)
            })["RefreshButton.useEffect"];
        }
    }["RefreshButton.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            display: 'flex',
            alignItems: 'center',
            gap: 1
        },
        children: [
            showCountdown && autoRefreshEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Refresh data",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onClick: handleRefresh,
                    disabled: loading,
                    size: size,
                    sx: {
                        '&:hover': {
                            bgcolor: 'action.hover'
                        }
                    },
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        size: size === 'small' ? 16 : 24
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/refresh-button.tsx",
                        lineNumber: 89,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(RefreshButton, "iLNGFlkecGQWjL3AYNuqZmzY51A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"]
    ];
});
_c = RefreshButton;
var _c;
__turbopack_context__.k.register(_c, "RefreshButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Breadcrumbs$2f$Breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Breadcrumbs/Breadcrumbs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Link/Link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$refresh$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/refresh-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$NavigateNext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/NavigateNext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
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
function PageHeader({ title, subtitle, metadata, breadcrumbs, onRefresh, isRefreshing = false, actions, headerActions, filters }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleBreadcrumbClick = (href)=>{
        router.push(href);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            mb: 4
        },
        children: [
            breadcrumbs && breadcrumbs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Breadcrumbs$2f$Breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        separator: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$NavigateNext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            fontSize: "small"
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/common/page-header.tsx",
                            lineNumber: 64,
                            columnNumber: 24
                        }, void 0),
                        children: breadcrumbs.map((crumb, index)=>{
                            const isLast = index === breadcrumbs.length - 1;
                            if (isLast || !crumb.href) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        },
                        children: [
                            headerActions,
                            onRefresh && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$refresh$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RefreshButton"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            typeof title === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    mb: subtitle || metadata ? 0.5 : 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body2",
                                color: "text.secondary",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/page-header.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            metadata && metadata.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    mt: 1
                                },
                                children: metadata.map((item, index)=>typeof item === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: item
                                    }, index, false, {
                                        fileName: "[project]/app/app/components/common/page-header.tsx",
                                        lineNumber: 135,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(PageHeader, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PageHeader;
var _c;
__turbopack_context__.k.register(_c, "PageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/common/empty-state.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Inbox.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function EmptyState({ icon: Icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], title, description, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            p: 6,
            textAlign: 'center',
            bgcolor: 'background.default',
            border: '2px dashed',
            borderColor: 'divider'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'action.hover',
                    mb: 3
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    sx: {
                        fontSize: 40,
                        color: 'text.secondary'
                    }
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/empty-state.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/empty-state.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "h6",
                sx: {
                    fontWeight: 600,
                    mb: 1
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/empty-state.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "body2",
                color: "text.secondary",
                sx: {
                    mb: 3,
                    maxWidth: 400,
                    mx: 'auto'
                },
                children: description
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/empty-state.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "contained",
                onClick: action.onClick,
                children: action.label
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/empty-state.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/common/empty-state.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/common/table-skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TableSkeleton",
    ()=>TableSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Skeleton/Skeleton.js [app-client] (ecmascript) <export default as Skeleton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Table/Table.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableBody/TableBody.js [app-client] (ecmascript) <export default as TableBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableCell/TableCell.js [app-client] (ecmascript) <export default as TableCell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableContainer/TableContainer.js [app-client] (ecmascript) <export default as TableContainer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableHead/TableHead.js [app-client] (ecmascript) <export default as TableHead>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableRow/TableRow.js [app-client] (ecmascript) <export default as TableRow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript) <export default as Paper>");
;
;
function TableSkeleton({ rows = 5, columns = 6, showHeader = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__["TableContainer"], {
        component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
            children: [
                showHeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__["TableHead"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                        children: Array.from({
                            length: columns
                        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                    variant: "text",
                                    width: "80%",
                                    height: 24
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/common/table-skeleton.tsx",
                                    lineNumber: 22,
                                    columnNumber: 19
                                }, this)
                            }, `header-${index}`, false, {
                                fileName: "[project]/app/app/components/common/table-skeleton.tsx",
                                lineNumber: 21,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/table-skeleton.tsx",
                        lineNumber: 19,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/table-skeleton.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__["TableBody"], {
                    children: Array.from({
                        length: rows
                    }).map((_, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                            children: Array.from({
                                length: columns
                            }).map((_, colIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                        variant: "text",
                                        width: colIndex === 0 ? '60%' : '80%',
                                        height: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/table-skeleton.tsx",
                                        lineNumber: 33,
                                        columnNumber: 19
                                    }, this)
                                }, `cell-${rowIndex}-${colIndex}`, false, {
                                    fileName: "[project]/app/app/components/common/table-skeleton.tsx",
                                    lineNumber: 32,
                                    columnNumber: 17
                                }, this))
                        }, `row-${rowIndex}`, false, {
                            fileName: "[project]/app/app/components/common/table-skeleton.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/table-skeleton.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/common/table-skeleton.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/common/table-skeleton.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = TableSkeleton;
var _c;
__turbopack_context__.k.register(_c, "TableSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/common/error-state.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorState",
    ()=>ErrorState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$AlertTitle$2f$AlertTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/AlertTitle/AlertTitle.js [app-client] (ecmascript) <export default as AlertTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Refresh.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ErrorOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ErrorOutline.js [app-client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            maxWidth: 600,
            mx: 'auto',
            mt: 4
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
            severity: "error",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ErrorOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$AlertTitle$2f$AlertTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTitle$3e$__["AlertTitle"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        mb: 2
                    },
                    children: getFriendlyMessage(errorMessage)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/error-state.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                    variant: "outlined",
                    size: "small",
                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
                ("TURBOPACK compile-time value", "development") === 'development' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        mt: 2,
                        p: 1,
                        bgcolor: 'grey.100',
                        borderRadius: 1,
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
_c = ErrorState;
var _c;
__turbopack_context__.k.register(_c, "ErrorState");
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
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ClusterConnectionAlert({ minimal = false }) {
    _s();
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
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        size: "small",
                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                            lineNumber: 33,
                            columnNumber: 43
                        }, void 0),
                        onClick: ()=>refetch(),
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
            lineNumber: 28,
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
                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid',
                borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 100, 100, 0.3)' : 'rgba(211, 47, 47, 0.3)',
                borderRadius: '12px',
                boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)' : '0 4px 16px 0 rgba(211, 47, 47, 0.1), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
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
                        lineNumber: 76,
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
                                lineNumber: 78,
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
                                lineNumber: 81,
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
                                lineNumber: 85,
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
                                                    style: {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px'
                                                    },
                                                    children: "kubeconfig"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 28
                                                }, this),
                                                " file is properly configured"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            children: "Verify your cluster credentials are valid and not expired"
                                        }, void 0, false, {
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
                                            children: "Ensure you have network access to your cluster"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            children: [
                                                "Run ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    style: {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px'
                                                    },
                                                    children: "kubectl version"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 21
                                                }, this),
                                                " to verify connectivity"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                        lineNumber: 100,
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
                                                    lineNumber: 108,
                                                    columnNumber: 17
                                                }, this),
                                                ' ',
                                                "for help"
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
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                                lineNumber: 88,
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
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        variant: "contained",
                        size: "small",
                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Refresh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                            lineNumber: 130,
                            columnNumber: 22
                        }, void 0),
                        onClick: ()=>refetch(),
                        sx: {
                            px: 2,
                            py: 0.75,
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 600,
                            flexShrink: 0
                        },
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/common/cluster-connection-alert.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(ClusterConnectionAlert, "3pyd7CEe/z1Oxt/gr5kCEbJJzvs=", false, function() {
    return [
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
"[project]/app/lib/hooks/use-view-mode.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useViewMode",
    ()=>useViewMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const STORAGE_KEY = 'kubevista-view-mode';
function useViewMode() {
    _s();
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useViewMode.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const saved = localStorage.getItem(STORAGE_KEY);
                return saved || 'list';
            }
            //TURBOPACK unreachable
            ;
        }
    }["useViewMode.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useViewMode.useEffect": ()=>{
            const handleStorageChange = {
                "useViewMode.useEffect.handleStorageChange": (e)=>{
                    if (e.key === STORAGE_KEY && e.newValue) {
                        setViewMode(e.newValue);
                    }
                }
            }["useViewMode.useEffect.handleStorageChange"];
            window.addEventListener('storage', handleStorageChange);
            return ({
                "useViewMode.useEffect": ()=>window.removeEventListener('storage', handleStorageChange)
            })["useViewMode.useEffect"];
        }
    }["useViewMode.useEffect"], []);
    const updateViewMode = (mode)=>{
        setViewMode(mode);
        localStorage.setItem(STORAGE_KEY, mode);
        // Dispatch custom event for same-window updates
        window.dispatchEvent(new CustomEvent('viewModeChange', {
            detail: mode
        }));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useViewMode.useEffect": ()=>{
            const handleViewModeChange = {
                "useViewMode.useEffect.handleViewModeChange": (e)=>{
                    setViewMode(e.detail);
                }
            }["useViewMode.useEffect.handleViewModeChange"];
            window.addEventListener('viewModeChange', handleViewModeChange);
            return ({
                "useViewMode.useEffect": ()=>window.removeEventListener('viewModeChange', handleViewModeChange)
            })["useViewMode.useEffect"];
        }
    }["useViewMode.useEffect"], []);
    return {
        viewMode,
        setViewMode: updateViewMode
    };
}
_s(useViewMode, "WWKuw/Hs8Smn4FNCPJIU99hI0po=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-table-sort.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSortableTable",
    ()=>useSortableTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useSortableTable(data, defaultSortField = null, defaultSortOrder = 'asc') {
    _s();
    const [sortField, setSortField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSortField);
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSortOrder);
    const [customSorts, setCustomSorts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const handleSort = (field, customSortFn)=>{
        if (sortField === field) {
            // Toggle sort order if same field
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new field with ascending order
            setSortField(field);
            setSortOrder('asc');
            // Register custom sort function if provided
            if (customSortFn) {
                setCustomSorts((prev)=>{
                    const next = new Map(prev);
                    next.set(String(field), customSortFn);
                    return next;
                });
            }
        }
    };
    const sortedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useSortableTable.useMemo[sortedData]": ()=>{
            if (!sortField) return data;
            return [
                ...data
            ].sort({
                "useSortableTable.useMemo[sortedData]": (a, b)=>{
                    // Check if there's a custom sort function for this field
                    const customSortFn = customSorts.get(String(sortField));
                    if (customSortFn) {
                        return customSortFn(a, b, sortOrder);
                    }
                    // Standard sorting for direct properties
                    const aVal = a[sortField];
                    const bVal = b[sortField];
                    // Handle null/undefined
                    if (aVal == null && bVal == null) return 0;
                    if (aVal == null) return sortOrder === 'asc' ? 1 : -1;
                    if (bVal == null) return sortOrder === 'asc' ? -1 : 1;
                    // Handle different types
                    if (typeof aVal === 'string' && typeof bVal === 'string') {
                        const comparison = aVal.localeCompare(bVal);
                        return sortOrder === 'asc' ? comparison : -comparison;
                    }
                    if (typeof aVal === 'number' && typeof bVal === 'number') {
                        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
                    }
                    // Fallback to string comparison
                    const aStr = String(aVal);
                    const bStr = String(bVal);
                    const comparison = aStr.localeCompare(bStr);
                    return sortOrder === 'asc' ? comparison : -comparison;
                }
            }["useSortableTable.useMemo[sortedData]"]);
        }
    }["useSortableTable.useMemo[sortedData]"], [
        data,
        sortField,
        sortOrder,
        customSorts
    ]);
    return {
        sortedData,
        sortField,
        sortOrder,
        handleSort
    };
}
_s(useSortableTable, "DXuiO8mwvW1pSgLP6AkVQi2dLPA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-auto-refresh.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAutoRefresh",
    ()=>useAutoRefresh
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useAutoRefresh(refetch) {
    _s();
    const { autoRefreshEnabled, autoRefreshInterval } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])();
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAutoRefresh.useEffect": ()=>{
            // Clear existing interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            // Set up new interval if enabled
            if (autoRefreshEnabled) {
                intervalRef.current = setInterval({
                    "useAutoRefresh.useEffect": ()=>{
                        refetch();
                    }
                }["useAutoRefresh.useEffect"], autoRefreshInterval * 1000);
            }
            // Cleanup on unmount or when settings change
            return ({
                "useAutoRefresh.useEffect": ()=>{
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                }
            })["useAutoRefresh.useEffect"];
        }
    }["useAutoRefresh.useEffect"], [
        autoRefreshEnabled,
        autoRefreshInterval,
        refetch
    ]);
}
_s(useAutoRefresh, "kfJF2ptsXAklKZYRZSs4Uenya9c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/common/resource-list-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResourceListView",
    ()=>ResourceListView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Table/Table.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableBody/TableBody.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableCell/TableCell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableContainer/TableContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableHead/TableHead.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableRow/TableRow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControl/FormControl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputLabel/InputLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Select/Select.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ViewList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewModule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ViewModule.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/empty-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/table-skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/error-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$cluster$2d$connection$2d$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/cluster-connection-alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$view$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-view-mode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-table-sort.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-auto-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/contexts/search-context.tsx [app-client] (ecmascript)");
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
function ResourceListView({ title, resourceName, resourceNamePlural, icon: Icon, data, isLoading, error, refetch, searchPlaceholder, searchFilter, filters = [], customFilter, columns, defaultSortField, defaultSortOrder = 'asc', getRowKey, onRowClick, renderCard, showClusterAlert = true, emptyStateDescription }) {
    _s();
    const { viewMode, setViewMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$view$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useViewMode"])();
    const searchQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"])(searchPlaceholder);
    // Auto-refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"])(refetch);
    // Apply filters
    const filteredData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ResourceListView.useMemo[filteredData]": ()=>{
            if (!data) return [];
            let filtered = data;
            // Apply custom filter (e.g., status filter)
            if (customFilter) {
                filtered = filtered.filter(customFilter);
            }
            // Apply search filter
            if (searchQuery) {
                filtered = filtered.filter({
                    "ResourceListView.useMemo[filteredData]": (item)=>searchFilter(item, searchQuery)
                }["ResourceListView.useMemo[filteredData]"]);
            }
            return filtered;
        }
    }["ResourceListView.useMemo[filteredData]"], [
        data,
        searchQuery,
        searchFilter,
        customFilter
    ]);
    const { sortedData, sortField, sortOrder, handleSort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"])(filteredData, defaultSortField, defaultSortOrder);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: title,
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableSkeleton"], {
                    rows: 8,
                    columns: columns.length
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/common/resource-list-view.tsx",
            lineNumber: 143,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: title,
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorState"], {
                    error: error,
                    onRetry: refetch,
                    title: `Failed to Load ${title}`
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/common/resource-list-view.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: title,
                subtitle: `${data?.length || 0} ${data?.length === 1 ? resourceName : resourceNamePlural} in this namespace`,
                onRefresh: refetch,
                isRefreshing: isLoading,
                filters: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center'
                    },
                    children: [
                        filters.map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                size: "small",
                                sx: {
                                    minWidth: 150
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: filter.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: filter.value,
                                        label: filter.label,
                                        onChange: (e)=>filter.onChange(e.target.value),
                                        children: filter.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                value: option.value,
                                                children: option.label
                                            }, option.value, false, {
                                                fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                                lineNumber: 178,
                                                columnNumber: 21
                                            }, void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                        lineNumber: 172,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, filter.label, true, {
                                fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                lineNumber: 170,
                                columnNumber: 15
                            }, void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                display: 'flex',
                                gap: 0.5,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                p: 0.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    title: "List view",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: "small",
                                        onClick: ()=>setViewMode('list'),
                                        sx: {
                                            bgcolor: viewMode === 'list' ? 'primary.main' : 'transparent',
                                            color: viewMode === 'list' ? 'white' : 'text.secondary',
                                            '&:hover': {
                                                bgcolor: viewMode === 'list' ? 'primary.dark' : 'action.hover'
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            fontSize: "small"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                            lineNumber: 209,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                        lineNumber: 198,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    title: "Grid view",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: "small",
                                        onClick: ()=>setViewMode('grid'),
                                        sx: {
                                            bgcolor: viewMode === 'grid' ? 'primary.main' : 'transparent',
                                            color: viewMode === 'grid' ? 'white' : 'text.secondary',
                                            '&:hover': {
                                                bgcolor: viewMode === 'grid' ? 'primary.dark' : 'action.hover'
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewModule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            fontSize: "small"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                            lineNumber: 224,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                        lineNumber: 213,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            showClusterAlert && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$cluster$2d$connection$2d$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClusterConnectionAlert"], {
                minimal: true
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                lineNumber: 232,
                columnNumber: 28
            }, this),
            !data || data.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: Icon,
                title: `No ${resourceNamePlural} found`,
                description: emptyStateDescription || `There are no ${resourceNamePlural} in this namespace yet.`
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                lineNumber: 235,
                columnNumber: 9
            }, this) : filteredData.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: Icon,
                title: `No matching ${resourceNamePlural}`,
                description: `No ${resourceNamePlural} match your search or filters.`
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this) : viewMode === 'grid' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 2
                },
                children: sortedData.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: renderCard(item, onRowClick ? ()=>onRowClick(item) : undefined)
                    }, getRowKey(item), false, {
                        fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                        lineNumber: 258,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                lineNumber: 250,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        align: column.align || 'left',
                                        sx: {
                                            cursor: column.sortable !== false ? 'pointer' : 'default'
                                        },
                                        onClick: column.sortable !== false ? ()=>handleSort(column.field, column.customSortFn) : undefined,
                                        children: [
                                            column.label,
                                            column.sortable !== false && sortField === column.field && (sortOrder === 'asc' ? ' ↑' : ' ↓')
                                        ]
                                    }, String(column.field), true, {
                                        fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                        lineNumber: 269,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                lineNumber: 267,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: sortedData.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    hover: true,
                                    sx: {
                                        cursor: onRowClick ? 'pointer' : 'default'
                                    },
                                    onClick: onRowClick ? ()=>onRowClick(item) : undefined,
                                    children: columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            align: column.align || 'left',
                                            children: column.render ? column.render(item) : String(item[column.field] ?? '')
                                        }, String(column.field), false, {
                                            fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                            lineNumber: 296,
                                            columnNumber: 21
                                        }, this))
                                }, getRowKey(item), false, {
                                    fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                                    lineNumber: 289,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                    lineNumber: 265,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/resource-list-view.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/common/resource-list-view.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_s(ResourceListView, "YhGPn6i+XDVEbVACTgfdF4TOwqM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$view$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useViewMode"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"]
    ];
});
_c = ResourceListView;
var _c;
__turbopack_context__.k.register(_c, "ResourceListView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/jobs/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JobsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Work$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Work.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Visibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-navigate-to.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$jobs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-jobs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$jobs$2f$job$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/jobs/job-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$list$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/resource-list-view.tsx [app-client] (ecmascript)");
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
function JobsPage() {
    _s();
    const navigateTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"])();
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { data: jobs, isLoading, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$jobs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJobs"])();
    const columns = [
        {
            field: 'name',
            label: 'Name',
            render: (job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "body2",
                    fontWeight: "medium",
                    children: job.name
                }, void 0, false, {
                    fileName: "[project]/app/app/jobs/page.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
        },
        {
            field: 'status',
            label: 'Status',
            render: (job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                    status: job.status
                }, void 0, false, {
                    fileName: "[project]/app/app/jobs/page.tsx",
                    lineNumber: 33,
                    columnNumber: 24
                }, this)
        },
        {
            field: 'completions',
            label: 'Completions',
            align: 'center',
            render: (job)=>`${job.succeeded}/${job.completions}`
        },
        {
            field: 'duration',
            label: 'Duration',
            render: (job)=>job.duration || 'N/A'
        },
        {
            field: 'active',
            label: 'Active',
            align: 'center'
        },
        {
            field: 'failed',
            label: 'Failed',
            align: 'center'
        },
        {
            field: 'age',
            label: 'Age'
        },
        {
            field: 'actions',
            label: 'Actions',
            align: 'right',
            sortable: false,
            render: (job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    size: "small",
                    onClick: (e)=>{
                        e.stopPropagation();
                        navigateTo(`/jobs/${job.name}`);
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        fontSize: "small"
                    }, void 0, false, {
                        fileName: "[project]/app/app/jobs/page.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/jobs/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$list$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceListView"], {
        title: "Jobs",
        resourceName: "job",
        resourceNamePlural: "jobs",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Work$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        data: jobs,
        isLoading: isLoading,
        error: error,
        refetch: refetch,
        searchPlaceholder: "Search jobs...",
        searchFilter: (job, query)=>job.name.toLowerCase().includes(query.toLowerCase()),
        customFilter: statusFilter ? (job)=>job.status === statusFilter : undefined,
        filters: [
            {
                label: 'Status',
                value: statusFilter,
                options: [
                    {
                        label: 'All Statuses',
                        value: ''
                    },
                    {
                        label: 'Running',
                        value: 'Running'
                    },
                    {
                        label: 'Succeeded',
                        value: 'Succeeded'
                    },
                    {
                        label: 'Failed',
                        value: 'Failed'
                    }
                ],
                onChange: (value)=>setStatusFilter(value)
            }
        ],
        columns: columns,
        defaultSortField: "name",
        defaultSortOrder: "asc",
        getRowKey: (job)=>job.name,
        onRowClick: (job)=>navigateTo(`/jobs/${job.name}`),
        renderCard: (job, onClick)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$jobs$2f$job$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JobCard"], {
                job: job,
                onClick: onClick
            }, void 0, false, {
                fileName: "[project]/app/app/jobs/page.tsx",
                lineNumber: 110,
                columnNumber: 37
            }, void 0),
        emptyStateDescription: "There are no jobs in this namespace. Create a job to run batch tasks."
    }, void 0, false, {
        fileName: "[project]/app/app/jobs/page.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(JobsPage, "YXyTwPMBtUaBYpg1R88fAg1v1qg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$jobs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJobs"]
    ];
});
_c = JobsPage;
var _c;
__turbopack_context__.k.register(_c, "JobsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_90b43911._.js.map