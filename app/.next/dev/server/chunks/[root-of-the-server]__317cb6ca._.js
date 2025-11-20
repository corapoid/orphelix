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
"[project]/app/lib/github/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GitHubClient",
    ()=>GitHubClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@octokit/rest/dist-src/index.js [app-route] (ecmascript)");
;
class GitHubClient {
    octokit;
    constructor(accessToken){
        this.octokit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Octokit"]({
            auth: accessToken
        });
    }
    /**
   * List user's repositories
   */ async listRepositories() {
        const { data } = await this.octokit.repos.listForAuthenticatedUser({
            sort: 'updated',
            per_page: 100
        });
        return data.map((repo)=>({
                owner: repo.owner.login,
                repo: repo.name,
                fullName: repo.full_name,
                defaultBranch: repo.default_branch || 'main'
            }));
    }
    /**
   * List YAML files in repository (recursive)
   */ async listYamlFiles(owner, repo, path = '', ref = 'main') {
        const files = [];
        try {
            const { data } = await this.octokit.repos.getContent({
                owner,
                repo,
                path,
                ref
            });
            if (Array.isArray(data)) {
                for (const item of data){
                    if (item.type === 'file' && (item.name.endsWith('.yaml') || item.name.endsWith('.yml'))) {
                        files.push({
                            name: item.name,
                            path: item.path,
                            sha: item.sha,
                            type: 'file'
                        });
                    } else if (item.type === 'dir') {
                        // Recursively search subdirectories
                        const subFiles = await this.listYamlFiles(owner, repo, item.path, ref);
                        files.push(...subFiles);
                    }
                }
            }
        } catch (error) {
            console.error(`Error listing files in ${path}:`, error);
        }
        return files;
    }
    /**
   * Get file content
   */ async getFileContent(owner, repo, path, ref = 'main') {
        const { data } = await this.octokit.repos.getContent({
            owner,
            repo,
            path,
            ref
        });
        if ('content' in data && data.type === 'file') {
            const content = Buffer.from(data.content, 'base64').toString('utf-8');
            return {
                content,
                sha: data.sha
            };
        }
        throw new Error('Path is not a file');
    }
    /**
   * Detect if directory contains kustomization.yaml
   */ async detectKustomization(owner, repo, dirPath, ref = 'main') {
        try {
            const { data } = await this.octokit.repos.getContent({
                owner,
                repo,
                path: dirPath,
                ref
            });
            if (Array.isArray(data)) {
                return data.some((item)=>item.type === 'file' && (item.name === 'kustomization.yaml' || item.name === 'kustomization.yml'));
            }
            return false;
        } catch  {
            return false;
        }
    }
    /**
   * Get Kustomize structure (base + overlays)
   */ async getKustomizeStructure(owner, repo, filePath, ref = 'main') {
        const dirPath = filePath.substring(0, filePath.lastIndexOf('/'));
        const hasKustomization = await this.detectKustomization(owner, repo, dirPath, ref);
        if (!hasKustomization) {
            return {
                hasKustomization: false,
                basePath: null,
                overlays: [],
                baseFiles: [],
                overlayFiles: {}
            };
        }
        // Check if this is a base or overlay directory
        const isBase = dirPath.endsWith('/base') || !dirPath.includes('overlay');
        let basePath;
        let overlayParentPath;
        if (isBase) {
            basePath = dirPath;
            overlayParentPath = dirPath.replace('/base', '/overlays');
        } else {
            // We're in an overlay
            const overlayMatch = dirPath.match(/(.*)\/overlays\/([^/]+)/);
            if (overlayMatch) {
                basePath = `${overlayMatch[1]}/base`;
                overlayParentPath = `${overlayMatch[1]}/overlays`;
            } else {
                basePath = dirPath;
                overlayParentPath = `${dirPath}/overlays`;
            }
        }
        // Get base files
        const baseFiles = await this.listYamlFiles(owner, repo, basePath, ref);
        // Get overlay directories
        const overlays = [];
        const overlayFiles = {};
        try {
            const { data: overlayData } = await this.octokit.repos.getContent({
                owner,
                repo,
                path: overlayParentPath,
                ref
            });
            if (Array.isArray(overlayData)) {
                const overlayDirs = overlayData.filter((item)=>item.type === 'dir').map((item)=>item.name);
                overlays.push(...overlayDirs);
                // Get files for each overlay
                for (const overlay of overlayDirs){
                    const overlayPath = `${overlayParentPath}/${overlay}`;
                    overlayFiles[overlay] = await this.listYamlFiles(owner, repo, overlayPath, ref);
                }
            }
        } catch  {
        // No overlays directory - this is fine
        }
        return {
            hasKustomization: true,
            basePath,
            overlays,
            baseFiles,
            overlayFiles
        };
    }
    /**
   * Merge a pull request
   */ async mergePullRequest(owner, repo, pullNumber, mergeMethod = 'merge') {
        try {
            const { data } = await this.octokit.pulls.merge({
                owner,
                repo,
                pull_number: pullNumber,
                merge_method: mergeMethod
            });
            return {
                merged: true,
                message: data.message
            };
        } catch (error) {
            return {
                merged: false,
                message: error.message || 'Failed to merge PR'
            };
        }
    }
    /**
   * List all branches in a repository
   */ async listBranches(owner, repo) {
        const { data } = await this.octokit.repos.listBranches({
            owner,
            repo,
            per_page: 100
        });
        return data.map((branch)=>({
                name: branch.name,
                protected: branch.protected
            }));
    }
    /**
   * Get full repository tree (all files and directories)
   */ async getRepositoryTree(owner, repo, ref = 'main', path = '') {
        try {
            const { data } = await this.octokit.repos.getContent({
                owner,
                repo,
                path,
                ref
            });
            if (!Array.isArray(data)) {
                // Single file
                return [
                    {
                        name: data.name,
                        path: data.path,
                        type: 'file',
                        size: data.size
                    }
                ];
            }
            // Directory - return all items
            return data.map((item)=>({
                    name: item.name,
                    path: item.path,
                    type: item.type === 'dir' ? 'dir' : 'file',
                    size: item.type === 'file' ? item.size : undefined
                }));
        } catch (error) {
            console.error(`Error getting tree for ${path}:`, error);
            return [];
        }
    }
    /**
   * Create a new branch
   */ async createBranch(owner, repo, baseBranch, newBranch) {
        const { data: ref } = await this.octokit.git.getRef({
            owner,
            repo,
            ref: `heads/${baseBranch}`
        });
        await this.octokit.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${newBranch}`,
            sha: ref.object.sha
        });
    }
    /**
   * Commit file changes
   */ async commitFile(owner, repo, branch, path, content, sha, message) {
        await this.octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message,
            content: Buffer.from(content).toString('base64'),
            branch,
            sha
        });
    }
    /**
   * Create Pull Request
   */ async createPullRequest(owner, repo, title, head, base, body) {
        const { data } = await this.octokit.pulls.create({
            owner,
            repo,
            title,
            head,
            base,
            body
        });
        return {
            number: data.number,
            url: data.html_url
        };
    }
    /**
   * Check if PR is merged
   */ async isPullRequestMerged(owner, repo, prNumber) {
        try {
            await this.octokit.pulls.checkIfMerged({
                owner,
                repo,
                pull_number: prNumber
            });
            return true;
        } catch  {
            return false;
        }
    }
    /**
   * List open PRs for a specific file
   */ async getOpenPRsForFile(owner, repo, filePath) {
        const { data: pulls } = await this.octokit.pulls.list({
            owner,
            repo,
            state: 'open',
            per_page: 100
        });
        const prsForFile = [];
        for (const pull of pulls){
            const { data: files } = await this.octokit.pulls.listFiles({
                owner,
                repo,
                pull_number: pull.number
            });
            if (files.some((file)=>file.filename === filePath)) {
                prsForFile.push({
                    number: pull.number,
                    title: pull.title,
                    url: pull.html_url
                });
            }
        }
        return prsForFile;
    }
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/lib/github/get-token.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGitHubToken",
    ()=>getGitHubToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
async function getGitHubToken() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const githubAppToken = cookieStore.get('github_app_token')?.value;
    return githubAppToken || null;
}
}),
"[project]/app/app/api/github/branches/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/github/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$get$2d$token$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/github/get-token.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$get$2d$token$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGitHubToken"])();
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized - Please connect GitHub'
            }, {
                status: 401
            });
        }
        const { searchParams } = new URL(request.url);
        const owner = searchParams.get('owner');
        const repo = searchParams.get('repo');
        if (!owner || !repo) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'owner and repo are required'
            }, {
                status: 400
            });
        }
        const github = new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GitHubClient"](token);
        const branches = await github.listBranches(owner, repo);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(branches);
    } catch (error) {
        console.error('Failed to fetch branches:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch branches'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$get$2d$token$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGitHubToken"])();
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized - Please connect GitHub'
            }, {
                status: 401
            });
        }
        const body = await request.json();
        const { owner, repo, baseBranch, newBranch } = body;
        if (!owner || !repo || !baseBranch || !newBranch) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'owner, repo, baseBranch, and newBranch are required'
            }, {
                status: 400
            });
        }
        const github = new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$github$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GitHubClient"](token);
        await github.createBranch(owner, repo, baseBranch, newBranch);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            branch: newBranch
        });
    } catch (error) {
        console.error('Failed to create branch:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Failed to create branch'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__317cb6ca._.js.map