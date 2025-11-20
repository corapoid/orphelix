module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/lib/github/repo-analyzer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Repository Structure Analyzer
 *
 * Analyzes GitHub repository structure to detect:
 * - Kustomize usage (base/overlays pattern)
 * - Directory structure (flat, kustomize, helm)
 * - Naming patterns
 * - Namespaces
 */ __turbopack_context__.s([
    "analyzeRepository",
    ()=>analyzeRepository
]);
async function analyzeRepository(owner, repo, branch, mode, baseUrl) {
    const modeParam = mode === 'demo' ? '&mode=demo' : '';
    const base = baseUrl || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'http://localhost:3000');
    // Get root directory structure
    const rootResponse = await fetch(`${base}/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${modeParam}`);
    if (!rootResponse.ok) {
        const error = await rootResponse.json().catch(()=>({
                error: 'Unknown error'
            }));
        throw new Error(error.error || `Failed to fetch repository structure: ${rootResponse.statusText}`);
    }
    const rootItems = await rootResponse.json();
    // Initialize structure
    const structure = {
        hasKustomize: false,
        structure: 'unknown',
        baseDir: null,
        overlayDirs: [],
        namespaces: [],
        deploymentDirs: [],
        serviceDirs: [],
        commonPatterns: {
            hasEnvironments: false
        }
    };
    // Look for k8s-related directories
    const k8sDirs = rootItems.filter((item)=>item.type === 'dir' && (item.name.toLowerCase().includes('k8s') || item.name.toLowerCase().includes('kubernetes') || item.name.toLowerCase().includes('manifests') || item.name.toLowerCase().includes('deploy')));
    // If no k8s dirs found, check root for YAML files
    if (k8sDirs.length === 0) {
        const hasYamlInRoot = rootItems.some((item)=>item.type === 'file' && (item.name.endsWith('.yaml') || item.name.endsWith('.yml')));
        if (hasYamlInRoot) {
            structure.structure = 'flat';
            await analyzeDirectory('', rootItems, structure, owner, repo, branch, modeParam, base);
            return structure;
        }
        return structure // Unknown structure
        ;
    }
    // Analyze k8s directories
    for (const k8sDir of k8sDirs){
        const dirResponse = await fetch(`${base}/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${encodeURIComponent(k8sDir.path)}${modeParam}`);
        if (!dirResponse.ok) continue;
        const dirItems = await dirResponse.json();
        // Check for Kustomize structure
        const hasKustomization = dirItems.some((item)=>item.type === 'file' && (item.name === 'kustomization.yaml' || item.name === 'kustomization.yml'));
        if (hasKustomization) {
            structure.hasKustomize = true;
            structure.structure = 'kustomize';
        }
        // Look for base directory
        const baseDir = dirItems.find((item)=>item.type === 'dir' && item.name === 'base');
        if (baseDir) {
            structure.baseDir = baseDir.path;
            structure.structure = 'kustomize';
            structure.hasKustomize = true;
        }
        // Look for overlays directory
        const overlaysDir = dirItems.find((item)=>item.type === 'dir' && (item.name === 'overlays' || item.name === 'environments'));
        if (overlaysDir) {
            const overlaysResponse = await fetch(`${base}/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${encodeURIComponent(overlaysDir.path)}${modeParam}`);
            if (overlaysResponse.ok) {
                const overlayItems = await overlaysResponse.json();
                structure.overlayDirs = overlayItems.filter((item)=>item.type === 'dir').map((item)=>item.path);
                if (structure.overlayDirs.length > 0) {
                    structure.commonPatterns.hasEnvironments = true;
                }
            }
        }
        // Analyze subdirectories
        await analyzeDirectory(k8sDir.path, dirItems, structure, owner, repo, branch, modeParam, base);
    }
    // If we found Kustomize indicators but structure is still unknown, set it
    if (structure.hasKustomize && structure.structure === 'unknown') {
        structure.structure = 'kustomize';
    }
    // If no Kustomize but we have deployments/services dirs, it's flat structure
    if (!structure.hasKustomize && (structure.deploymentDirs.length > 0 || structure.serviceDirs.length > 0)) {
        structure.structure = 'flat';
    }
    return structure;
}
/**
 * Analyze a directory and extract patterns
 */ async function analyzeDirectory(_basePath, items, structure, owner, repo, branch, modeParam, base) {
    for (const item of items){
        if (item.type !== 'dir') continue;
        const dirName = item.name.toLowerCase();
        // Check for deployment directories
        if (dirName.includes('deployment') || dirName.includes('deploy')) {
            structure.deploymentDirs.push(item.path);
        }
        // Check for service directories
        if (dirName.includes('service') || dirName.includes('svc')) {
            structure.serviceDirs.push(item.path);
        }
        // Check for namespace patterns (common namespace names)
        const namespaceKeywords = [
            'namespace',
            'ns',
            'default',
            'kube-system',
            'kube-public'
        ];
        if (namespaceKeywords.some((kw)=>dirName.includes(kw))) {
            // Fetch YAML files in this directory
            const nsResponse = await fetch(`${base}/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${encodeURIComponent(item.path)}${modeParam}`);
            if (nsResponse.ok) {
                const nsItems = await nsResponse.json();
                const yamlFiles = nsItems.filter((f)=>f.type === 'file' && (f.name.endsWith('.yaml') || f.name.endsWith('.yml')));
                // Extract namespace names from YAML filenames
                for (const file of yamlFiles){
                    const match = file.name.match(/^([a-z0-9-]+)\.ya?ml$/i);
                    if (match && !structure.namespaces.includes(match[1])) {
                        structure.namespaces.push(match[1]);
                    }
                }
            }
        }
    }
    // Detect common naming patterns
    const allFileNames = items.filter((item)=>item.type === 'file' && (item.name.endsWith('.yaml') || item.name.endsWith('.yml'))).map((item)=>item.name.replace(/\.ya?ml$/i, ''));
    if (allFileNames.length > 2) {
        // Look for common prefix
        const commonPrefix = findCommonPrefix(allFileNames);
        if (commonPrefix && commonPrefix.length > 2) {
            structure.commonPatterns.namePrefix = commonPrefix;
        }
        // Look for common suffix
        const commonSuffix = findCommonSuffix(allFileNames);
        if (commonSuffix && commonSuffix.length > 2) {
            structure.commonPatterns.nameSuffix = commonSuffix;
        }
    }
}
/**
 * Find common prefix in array of strings
 */ function findCommonPrefix(strings) {
    if (strings.length === 0) return null;
    let prefix = strings[0];
    for(let i = 1; i < strings.length; i++){
        while(strings[i].indexOf(prefix) !== 0){
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === '') return null;
        }
    }
    // Remove trailing dashes/underscores
    return prefix.replace(/[-_]+$/, '');
}
/**
 * Find common suffix in array of strings
 */ function findCommonSuffix(strings) {
    if (strings.length === 0) return null;
    const reversed = strings.map((s)=>s.split('').reverse().join(''));
    const prefix = findCommonPrefix(reversed);
    if (!prefix) return null;
    return prefix.split('').reverse().join('').replace(/^[-_]+/, '');
}
}),
"[project]/app/app/api/github/analyze-structure/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$repo$2d$analyzer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/github/repo-analyzer.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const owner = searchParams.get('owner');
        const repo = searchParams.get('repo');
        const ref = searchParams.get('ref') || 'main';
        const mode = searchParams.get('mode');
        if (!owner || !repo) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'owner and repo are required'
            }, {
                status: 400
            });
        }
        // Get base URL for server-side fetch
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const host = request.headers.get('host') || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;
        const structure = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$repo$2d$analyzer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeRepository"])(owner, repo, ref, mode === 'demo' ? 'demo' : undefined, baseUrl);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(structure);
    } catch (error) {
        console.error('Failed to analyze repository structure:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Failed to analyze repository structure'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__04b76bd8._.js.map