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
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/app/lib/auth/github-app.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GitHubAppAuth",
    ()=>GitHubAppAuth,
    "githubApp",
    ()=>githubApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$app$2f$dist$2d$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@octokit/app/dist-node/index.js [app-route] (ecmascript)");
;
class GitHubAppAuth {
    app = null;
    constructor(){
        const appId = process.env.GITHUB_APP_ID;
        const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;
        const clientId = process.env.GITHUB_APP_CLIENT_ID;
        const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
        if (!appId || !privateKey || !clientId || !clientSecret) {
            console.warn('GitHub App credentials not configured');
            return;
        }
        this.app = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$app$2f$dist$2d$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["App"]({
            appId,
            privateKey: privateKey.replace(/\\n/g, '\n'),
            oauth: {
                clientId,
                clientSecret
            }
        });
    }
    isConfigured() {
        return this.app !== null;
    }
    getApp() {
        if (!this.app) {
            throw new Error('GitHub App not configured');
        }
        return this.app;
    }
    // Get OAuth URL for user to install the app
    getInstallationUrl() {
        const clientId = process.env.GITHUB_APP_CLIENT_ID;
        if (!clientId) {
            throw new Error('GITHUB_APP_CLIENT_ID not configured');
        }
        return `https://github.com/apps/${process.env.GITHUB_APP_SLUG}/installations/new`;
    }
    // Exchange code for user access token (after OAuth callback)
    async exchangeCode(code) {
        if (!this.app) {
            throw new Error('GitHub App not configured');
        }
        const result = await this.app.oauth.createToken({
            code
        });
        return {
            token: result.authentication.token,
            expiresAt: result.authentication.expiresAt || '',
            refreshToken: result.authentication.refreshToken || '',
            refreshTokenExpiresAt: result.authentication.refreshTokenExpiresAt || ''
        };
    }
    // Refresh an expired user access token
    async refreshToken(refreshToken) {
        if (!this.app) {
            throw new Error('GitHub App not configured');
        }
        const result = await this.app.oauth.refreshToken({
            refreshToken
        });
        return {
            token: result.authentication.token,
            expiresAt: result.authentication.expiresAt || '',
            refreshToken: result.authentication.refreshToken || '',
            refreshTokenExpiresAt: result.authentication.refreshTokenExpiresAt || ''
        };
    }
    // Get installation token for accessing repositories
    async getInstallationToken(installationId) {
        if (!this.app) {
            throw new Error('GitHub App not configured');
        }
        const octokit = await this.app.getInstallationOctokit(installationId);
        // @ts-expect-error - Octokit types are complex
        const { data } = await octokit.rest.apps.createInstallationAccessToken({
            installation_id: installationId
        });
        return data.token;
    }
    // Get user's installations (which orgs/accounts have the app installed)
    async getUserInstallations(userToken) {
        if (!this.app) {
            throw new Error('GitHub App not configured');
        }
        const { Octokit } = await __turbopack_context__.A("[project]/node_modules/@octokit/rest/dist-src/index.js [app-route] (ecmascript, async loader)");
        const octokit = new Octokit({
            auth: userToken
        });
        const { data } = await octokit.rest.apps.listInstallationsForAuthenticatedUser();
        return data.installations;
    }
}
const githubApp = new GitHubAppAuth();
}),
"[project]/app/app/api/github-app/installations/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$auth$2f$github$2d$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/auth/github-app.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const token = cookieStore.get('github_app_token')?.value;
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Not authenticated'
            }, {
                status: 401
            });
        }
        // Get user's installations
        const installations = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$auth$2f$github$2d$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["githubApp"].getUserInstallations(token);
        // Get repositories for each installation
        const { Octokit } = await __turbopack_context__.A("[project]/node_modules/@octokit/rest/dist-src/index.js [app-route] (ecmascript, async loader)");
        const octokit = new Octokit({
            auth: token
        });
        const installationsWithRepos = await Promise.all(installations.map(async (installation)=>{
            try {
                const { data } = await octokit.rest.apps.listInstallationReposForAuthenticatedUser({
                    installation_id: installation.id
                });
                return {
                    id: installation.id,
                    account: {
                        login: installation.account?.login,
                        avatar_url: installation.account?.avatar_url,
                        type: installation.account?.type
                    },
                    repositories: data.repositories.map((repo)=>({
                            id: repo.id,
                            name: repo.name,
                            full_name: repo.full_name,
                            owner: repo.owner.login,
                            private: repo.private,
                            default_branch: repo.default_branch
                        }))
                };
            } catch (error) {
                console.error(`Error fetching repos for installation ${installation.id}:`, error);
                return {
                    id: installation.id,
                    account: installation.account,
                    repositories: []
                };
            }
        }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(installationsWithRepos);
    } catch (error) {
        console.error('Error fetching installations:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch installations'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__778dfcd2._.js.map