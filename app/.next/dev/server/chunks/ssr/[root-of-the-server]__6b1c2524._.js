module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/app/demo/[...slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DemoSlugPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
// Import all possible list pages
// Detail pages are now handled by their own [name] folders
const pages = {
    'ingress': ()=>__turbopack_context__.A("[project]/app/app/ingress/page.tsx [app-rsc] (ecmascript, async loader)"),
    'configmaps': ()=>__turbopack_context__.A("[project]/app/app/configmaps/page.tsx [app-rsc] (ecmascript, async loader)"),
    'secrets': ()=>__turbopack_context__.A("[project]/app/app/secrets/page.tsx [app-rsc] (ecmascript, async loader)"),
    'topology': ()=>__turbopack_context__.A("[project]/app/app/topology/page.tsx [app-rsc] (ecmascript, async loader)"),
    'settings': ()=>__turbopack_context__.A("[project]/app/app/settings/page.tsx [app-rsc] (ecmascript, async loader)"),
    'pv': ()=>__turbopack_context__.A("[project]/app/app/pv/page.tsx [app-rsc] (ecmascript, async loader)"),
    'hpa': ()=>__turbopack_context__.A("[project]/app/app/hpa/page.tsx [app-rsc] (ecmascript, async loader)"),
    'events': ()=>__turbopack_context__.A("[project]/app/app/events/page.tsx [app-rsc] (ecmascript, async loader)"),
    'labels': ()=>__turbopack_context__.A("[project]/app/app/labels/page.tsx [app-rsc] (ecmascript, async loader)")
};
async function DemoSlugPage({ params }) {
    const { slug } = await params;
    const pageSlug = slug[0];
    // This catch-all only handles pages without their own folder structure
    // Resources with detail pages (pods, deployments, etc.) have their own demo folders
    if (!pageSlug || !pages[pageSlug]) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const PageComponent = (await pages[pageSlug]()).default;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PageComponent, {}, void 0, false, {
        fileName: "[project]/app/app/demo/[...slug]/page.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/app/demo/[...slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/app/demo/[...slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6b1c2524._.js.map