(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
// Config for Kubernetes status colors
const statusConfig = {
    // Success states
    Available: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 25,
            columnNumber: 40
        }, ("TURBOPACK compile-time value", void 0))
    },
    Running: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 26,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    },
    Ready: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 27,
            columnNumber: 36
        }, ("TURBOPACK compile-time value", void 0))
    },
    Succeeded: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 28,
            columnNumber: 40
        }, ("TURBOPACK compile-time value", void 0))
    },
    Active: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 29,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    Bound: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 30,
            columnNumber: 36
        }, ("TURBOPACK compile-time value", void 0))
    },
    Normal: {
        color: 'success',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 31,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Error states
    Failed: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 34,
            columnNumber: 35
        }, ("TURBOPACK compile-time value", void 0))
    },
    Degraded: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 35,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    NotReady: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 36,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    },
    CrashLoopBackOff: {
        color: 'error',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 37,
            columnNumber: 45
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Warning states
    Pending: {
        color: 'warning',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HourglassEmpty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 40,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    },
    Warning: {
        color: 'warning',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 41,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Info states
    Progressing: {
        color: 'info',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HourglassEmpty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/app/components/common/status-badge.tsx",
            lineNumber: 44,
            columnNumber: 39
        }, ("TURBOPACK compile-time value", void 0))
    },
    // Unknown
    Unknown: {
        color: 'default',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$HelpOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
    _s();
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(StatusBadge, "c0MZhghFmuZD3dgcE5n4BKV0J3M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = StatusBadge;
var _c;
__turbopack_context__.k.register(_c, "StatusBadge");
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
"[project]/app/lib/hooks/use-ingress.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIngress",
    ()=>useIngress,
    "useIngresses",
    ()=>useIngresses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function useIngresses() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useIngresses.useModeStore[mode]": (state)=>state.mode
    }["useIngresses.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useIngresses.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useIngresses.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useIngresses.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useIngresses.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'ingress',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useIngresses.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useIngresses.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useIngresses.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockIngresses"])();
                }
                const response = await fetch(`/api/ingress?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to fetch ingresses');
                }
                return response.json();
            }
        }["useIngresses.useQuery"],
        enabled: mode === 'demo' || !!namespace
    });
}
_s(useIngresses, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useIngress(name) {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useIngress.useModeStore[mode]": (state)=>state.mode
    }["useIngress.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useIngress.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useIngress.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useIngress.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useIngress.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'ingress',
            mode,
            namespace,
            name
        ],
        queryFn: {
            "useIngress.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useIngress.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useIngress.useQuery"]);
                    const ingresses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockIngresses"])();
                    const ingress = ingresses.find({
                        "useIngress.useQuery.ingress": (i)=>i.name === name
                    }["useIngress.useQuery.ingress"]);
                    if (!ingress) throw new Error('Ingress not found');
                    return ingress;
                }
                const response = await fetch(`/api/ingress/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to fetch ingress');
                }
                return response.json();
            }
        }["useIngress.useQuery"],
        enabled: (mode === 'demo' || !!namespace) && !!name
    });
}
_s1(useIngress, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
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
"[project]/app/app/components/common/sortable-table-cell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SortableTableCell",
    ()=>SortableTableCell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableCell/TableCell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableSortLabel$2f$TableSortLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableSortLabel/TableSortLabel.js [app-client] (ecmascript)");
;
;
;
function SortableTableCell({ field, label, sortField, sortOrder, onSort, customSortFn, align = 'left', width }) {
    const isActive = sortField === field;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        align: align,
        width: width,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableSortLabel$2f$TableSortLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            active: isActive,
            direction: isActive ? sortOrder : 'asc',
            onClick: ()=>onSort(field, customSortFn),
            children: label
        }, void 0, false, {
            fileName: "[project]/app/app/components/common/sortable-table-cell.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/common/sortable-table-cell.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = SortableTableCell;
var _c;
__turbopack_context__.k.register(_c, "SortableTableCell");
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
"[project]/app/app/ingress/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IngressPage
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Visibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Lock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-navigate-to.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$ingress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-ingress.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-auto-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/table-skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/error-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$cluster$2d$connection$2d$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/cluster-connection-alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/sortable-table-cell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/empty-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-table-sort.ts [app-client] (ecmascript)");
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
function IngressPage() {
    _s();
    const navigateTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"])();
    const { data: ingresses, isLoading, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$ingress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIngresses"])();
    const searchQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"])('Search ingress...');
    // Auto-refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"])(refetch);
    const filteredIngresses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "IngressPage.useMemo[filteredIngresses]": ()=>{
            if (!ingresses) return [];
            let filtered = ingresses;
            // Filter by search query
            if (searchQuery) {
                filtered = filtered.filter({
                    "IngressPage.useMemo[filteredIngresses]": (ingress)=>ingress.name.toLowerCase().includes(searchQuery.toLowerCase()) || ingress.hosts.some({
                            "IngressPage.useMemo[filteredIngresses]": (host)=>host.toLowerCase().includes(searchQuery.toLowerCase())
                        }["IngressPage.useMemo[filteredIngresses]"])
                }["IngressPage.useMemo[filteredIngresses]"]);
            }
            return filtered;
        }
    }["IngressPage.useMemo[filteredIngresses]"], [
        ingresses,
        searchQuery
    ]);
    const { sortedData, sortField, sortOrder, handleSort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"])(filteredIngresses, 'name', 'asc');
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Ingress",
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/ingress/page.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableSkeleton"], {
                    rows: 8,
                    columns: 6
                }, void 0, false, {
                    fileName: "[project]/app/app/ingress/page.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/ingress/page.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Ingress",
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/ingress/page.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorState"], {
                    error: error,
                    onRetry: ()=>refetch(),
                    title: "Failed to Load Ingress"
                }, void 0, false, {
                    fileName: "[project]/app/app/ingress/page.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/ingress/page.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Ingress",
                subtitle: `${ingresses?.length || 0} ingress resource${ingresses?.length === 1 ? '' : 's'} in this namespace`,
                onRefresh: refetch,
                isRefreshing: isLoading
            }, void 0, false, {
                fileName: "[project]/app/app/ingress/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$cluster$2d$connection$2d$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClusterConnectionAlert"], {
                minimal: true
            }, void 0, false, {
                fileName: "[project]/app/app/ingress/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            !ingresses || ingresses.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No ingress resources found",
                description: "There are no ingress resources in this namespace. Create an ingress to expose HTTP(S) routes."
            }, void 0, false, {
                fileName: "[project]/app/app/ingress/page.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this) : filteredIngresses.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No matching ingress resources",
                description: `No ingress resources match "${searchQuery}". Try adjusting your search.`
            }, void 0, false, {
                fileName: "[project]/app/app/ingress/page.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "name",
                                        label: "Name",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/ingress/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "Class"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/ingress/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "Hosts"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/ingress/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "Paths"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/ingress/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "TLS"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/ingress/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "age",
                                        label: "Age",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/ingress/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        align: "right",
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/ingress/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/ingress/page.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/ingress/page.tsx",
                            lineNumber: 105,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: sortedData.map((ingress)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    hover: true,
                                    sx: {
                                        cursor: 'pointer'
                                    },
                                    onClick: ()=>navigateTo(`/ingress/${ingress.name}`),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body2",
                                                fontWeight: "medium",
                                                children: ingress.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/ingress/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/ingress/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: ingress.className ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                label: ingress.className,
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/ingress/page.tsx",
                                                lineNumber: 143,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body2",
                                                color: "text.secondary",
                                                children: "default"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/ingress/page.tsx",
                                                lineNumber: 145,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/ingress/page.tsx",
                                            lineNumber: 141,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    display: 'flex',
                                                    gap: 0.5,
                                                    flexWrap: 'wrap'
                                                },
                                                children: [
                                                    ingress.hosts.slice(0, 2).map((host, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                            label: host,
                                                            size: "small"
                                                        }, idx, false, {
                                                            fileName: "[project]/app/app/ingress/page.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 25
                                                        }, this)),
                                                    ingress.hosts.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        children: [
                                                            "+",
                                                            ingress.hosts.length - 2
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/app/ingress/page.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 25
                                                    }, this),
                                                    ingress.hosts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "body2",
                                                        color: "text.secondary",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/ingress/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/ingress/page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/ingress/page.tsx",
                                            lineNumber: 150,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body2",
                                                color: "text.secondary",
                                                children: [
                                                    ingress.rules.reduce((sum, rule)=>sum + rule.paths.length, 0),
                                                    " path(s)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/ingress/page.tsx",
                                                lineNumber: 172,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/ingress/page.tsx",
                                            lineNumber: 171,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: ingress.tls && ingress.tls.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    sx: {
                                                        fontSize: 14
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/ingress/page.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 31
                                                }, void 0),
                                                label: "Secured",
                                                size: "small",
                                                color: "success"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/ingress/page.tsx",
                                                lineNumber: 178,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body2",
                                                color: "text.secondary",
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/ingress/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/ingress/page.tsx",
                                            lineNumber: 176,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: ingress.age
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/ingress/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            align: "right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                size: "small",
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    navigateTo(`/ingress/${ingress.name}`);
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    fontSize: "small"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/ingress/page.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/ingress/page.tsx",
                                                lineNumber: 192,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/ingress/page.tsx",
                                            lineNumber: 191,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, ingress.name, true, {
                                    fileName: "[project]/app/app/ingress/page.tsx",
                                    lineNumber: 130,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/app/ingress/page.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/ingress/page.tsx",
                    lineNumber: 104,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/ingress/page.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/ingress/page.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(IngressPage, "RpEvH91baO26RDQn0+2JmmogbRw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$ingress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIngresses"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"]
    ];
});
_c = IngressPage;
var _c;
__turbopack_context__.k.register(_c, "IngressPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-configmaps.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConfigMap",
    ()=>useConfigMap,
    "useConfigMapEvents",
    ()=>useConfigMapEvents,
    "useConfigMaps",
    ()=>useConfigMaps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
function useConfigMaps() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useConfigMaps.useModeStore[mode]": (state)=>state.mode
    }["useConfigMaps.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useConfigMaps.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useConfigMaps.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useConfigMaps.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useConfigMaps.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'configmaps',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useConfigMaps.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useConfigMaps.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useConfigMaps.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockConfigMaps"])();
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/configmaps?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch ConfigMaps');
                return response.json();
            }
        }["useConfigMaps.useQuery"],
        enabled: mode === 'demo' || !!namespace
    });
}
_s(useConfigMaps, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useConfigMap(name) {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useConfigMap.useModeStore[mode]": (state)=>state.mode
    }["useConfigMap.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useConfigMap.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useConfigMap.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useConfigMap.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useConfigMap.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'configmap',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useConfigMap.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useConfigMap.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useConfigMap.useQuery"]);
                    const configMaps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockConfigMaps"])();
                    const configMap = configMaps.find({
                        "useConfigMap.useQuery.configMap": (cm)=>cm.name === name
                    }["useConfigMap.useQuery.configMap"]);
                    if (!configMap) throw new Error('ConfigMap not found');
                    return configMap;
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/configmaps/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch ConfigMap');
                return response.json();
            }
        }["useConfigMap.useQuery"],
        enabled: !!name && (mode === 'demo' || !!namespace)
    });
}
_s1(useConfigMap, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useConfigMapEvents(configMapName) {
    _s2();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useConfigMapEvents.useModeStore[mode]": (state)=>state.mode
    }["useConfigMapEvents.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useConfigMapEvents.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useConfigMapEvents.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useConfigMapEvents.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useConfigMapEvents.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'configmap-events',
            configMapName,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useConfigMapEvents.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useConfigMapEvents.useQuery": (resolve)=>setTimeout(resolve, 150)
                    }["useConfigMapEvents.useQuery"]);
                    const allEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockEvents"])();
                    // Filter events related to this ConfigMap
                    return allEvents.filter({
                        "useConfigMapEvents.useQuery": (event)=>event.kind === 'ConfigMap' && event.name === configMapName
                    }["useConfigMapEvents.useQuery"]);
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/configmaps/${configMapName}/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch ConfigMap events');
                return response.json();
            }
        }["useConfigMapEvents.useQuery"],
        enabled: !!configMapName && (mode === 'demo' || !!namespace)
    });
}
_s2(useConfigMapEvents, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
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
"[project]/app/app/components/common/view-mode-toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ViewModeToggle",
    ()=>ViewModeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ViewList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewModule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ViewModule.js [app-client] (ecmascript)");
;
;
;
;
;
;
function ViewModeToggle({ viewMode, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            display: 'flex',
            gap: 0.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
            p: 0.5
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "List view",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    size: "small",
                    onClick: ()=>onChange('list'),
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
                        fileName: "[project]/app/app/components/common/view-mode-toggle.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/view-mode-toggle.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/view-mode-toggle.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Grid view",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    size: "small",
                    onClick: ()=>onChange('grid'),
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
                        fileName: "[project]/app/app/components/common/view-mode-toggle.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/common/view-mode-toggle.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/components/common/view-mode-toggle.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/common/view-mode-toggle.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = ViewModeToggle;
var _c;
__turbopack_context__.k.register(_c, "ViewModeToggle");
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
"[project]/app/app/components/configmaps/configmap-grid-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfigMapGridView",
    ()=>ConfigMapGridView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Description$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Description.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/resource-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-navigate-to.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function ConfigMapGridView({ configMaps }) {
    _s();
    const navigateTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 2
        },
        children: configMaps.map((cm)=>{
            const keyCount = Object.keys(cm.data).length;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceCard"], {
                name: cm.name,
                resourceType: cm.namespace,
                resourceColor: "#10B981",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Description$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                onClick: ()=>navigateTo(`/configmaps/${encodeURIComponent(cm.name)}`),
                statusBadge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        display: 'flex',
                        gap: 0.5,
                        flexWrap: 'wrap'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        label: `${keyCount} key${keyCount !== 1 ? 's' : ''}`,
                        size: "small",
                        sx: {
                            height: 22,
                            fontSize: '0.75rem',
                            backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                            color: '#10B981',
                            border: '1px solid',
                            borderColor: 'rgba(16, 185, 129, 0.3)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/configmaps/configmap-grid-view.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/configmaps/configmap-grid-view.tsx",
                    lineNumber: 36,
                    columnNumber: 15
                }, void 0),
                metrics: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "caption",
                        color: "text.secondary",
                        children: cm.age
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/configmaps/configmap-grid-view.tsx",
                        lineNumber: 56,
                        columnNumber: 17
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/configmaps/configmap-grid-view.tsx",
                    lineNumber: 55,
                    columnNumber: 15
                }, void 0)
            }, cm.name, false, {
                fileName: "[project]/app/app/components/configmaps/configmap-grid-view.tsx",
                lineNumber: 28,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/app/components/configmaps/configmap-grid-view.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(ConfigMapGridView, "Wwzm0/FjDlo6f37yT/9NE+laVTk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"]
    ];
});
_c = ConfigMapGridView;
var _c;
__turbopack_context__.k.register(_c, "ConfigMapGridView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/common/grid-skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GridSkeleton",
    ()=>GridSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Skeleton/Skeleton.js [app-client] (ecmascript)");
;
;
;
function GridSkeleton({ cards = 8 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 2
        },
        children: Array.from({
            length: cards
        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    p: 2,
                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            gap: 1.5,
                            mb: 1.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "rounded",
                                width: 44,
                                height: 44
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    flexGrow: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "text",
                                        width: "70%",
                                        height: 24
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "text",
                                        width: "50%",
                                        height: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            gap: 0.5,
                            mb: 1.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "rounded",
                                width: 80,
                                height: 22
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "rounded",
                                width: 60,
                                height: 22
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "text",
                                width: "40%",
                                height: 16,
                                sx: {
                                    mb: 0.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "text",
                                width: "90%",
                                height: 14
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "text",
                                width: "85%",
                                height: 14
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "text",
                                width: "80%",
                                height: 14
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "text",
                                width: "30%",
                                height: 16,
                                sx: {
                                    mt: 1
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/app/components/common/grid-skeleton.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = GridSkeleton;
var _c;
__turbopack_context__.k.register(_c, "GridSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/configmaps/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConfigMapsPage
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Settings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-navigate-to.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$configmaps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-configmaps.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/table-skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/error-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/sortable-table-cell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-table-sort.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/empty-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-auto-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/contexts/search-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$view$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-view-mode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$view$2d$mode$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/view-mode-toggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$configmaps$2f$configmap$2d$grid$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/configmaps/configmap-grid-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$grid$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/grid-skeleton.tsx [app-client] (ecmascript)");
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
function ConfigMapsPage() {
    _s();
    const navigateTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"])();
    const searchQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"])('Search ConfigMaps...');
    const { data: configMaps, isLoading, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$configmaps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigMaps"])();
    const { viewMode, setViewMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$view$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useViewMode"])();
    // Auto-refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"])(refetch);
    const filteredConfigMaps = configMaps?.filter((cm)=>cm.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];
    const { sortedData, sortField, sortOrder, handleSort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"])(filteredConfigMaps, 'name', 'asc');
    // Custom sort for Keys (object size)
    const sortByKeys = (a, b, order)=>{
        const aVal = Object.keys(a.data).length;
        const bVal = Object.keys(b.data).length;
        return order === 'asc' ? aVal - bVal : bVal - aVal;
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "ConfigMaps",
                    onRefresh: refetch,
                    isRefreshing: isLoading,
                    actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$view$2d$mode$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewModeToggle"], {
                        viewMode: viewMode,
                        onChange: setViewMode
                    }, void 0, false, {
                        fileName: "[project]/app/app/configmaps/page.tsx",
                        lineNumber: 61,
                        columnNumber: 20
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/app/configmaps/page.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                viewMode === 'list' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableSkeleton"], {
                    rows: 8,
                    columns: 4
                }, void 0, false, {
                    fileName: "[project]/app/app/configmaps/page.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$grid$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GridSkeleton"], {
                    cards: 8
                }, void 0, false, {
                    fileName: "[project]/app/app/configmaps/page.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/configmaps/page.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "ConfigMaps",
                    onRefresh: refetch,
                    isRefreshing: isLoading,
                    actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$view$2d$mode$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewModeToggle"], {
                        viewMode: viewMode,
                        onChange: setViewMode
                    }, void 0, false, {
                        fileName: "[project]/app/app/configmaps/page.tsx",
                        lineNumber: 79,
                        columnNumber: 20
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/app/configmaps/page.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorState"], {
                    error: error,
                    onRetry: ()=>refetch(),
                    title: "Failed to Load ConfigMaps"
                }, void 0, false, {
                    fileName: "[project]/app/app/configmaps/page.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/configmaps/page.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "ConfigMaps",
                subtitle: `${configMaps?.length || 0} ConfigMap${configMaps?.length === 1 ? '' : 's'} in this namespace`,
                onRefresh: refetch,
                isRefreshing: isLoading,
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$view$2d$mode$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewModeToggle"], {
                    viewMode: viewMode,
                    onChange: setViewMode
                }, void 0, false, {
                    fileName: "[project]/app/app/configmaps/page.tsx",
                    lineNumber: 93,
                    columnNumber: 18
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/app/configmaps/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            !configMaps || configMaps.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No ConfigMaps found",
                description: "There are no ConfigMaps in this namespace yet."
            }, void 0, false, {
                fileName: "[project]/app/app/configmaps/page.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this) : filteredConfigMaps.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No matching ConfigMaps",
                description: `No ConfigMaps match your search "${searchQuery}".`
            }, void 0, false, {
                fileName: "[project]/app/app/configmaps/page.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this) : viewMode === 'grid' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$configmaps$2f$configmap$2d$grid$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigMapGridView"], {
                configMaps: sortedData
            }, void 0, false, {
                fileName: "[project]/app/app/configmaps/page.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "name",
                                        label: "Name",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/configmaps/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "namespace",
                                        label: "Namespace",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/configmaps/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "keys",
                                        label: "Keys",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort,
                                        customSortFn: sortByKeys
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/configmaps/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "age",
                                        label: "Age",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/configmaps/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/configmaps/page.tsx",
                                lineNumber: 114,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/configmaps/page.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: sortedData.map((cm)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    hover: true,
                                    sx: {
                                        cursor: 'pointer'
                                    },
                                    onClick: ()=>navigateTo(`/configmaps/${encodeURIComponent(cm.name)}`),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: cm.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/configmaps/page.tsx",
                                            lineNumber: 154,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: cm.namespace
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/configmaps/page.tsx",
                                            lineNumber: 155,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: Object.keys(cm.data).length
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/configmaps/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: cm.age
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/configmaps/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, cm.name, true, {
                                    fileName: "[project]/app/app/configmaps/page.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/app/configmaps/page.tsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/configmaps/page.tsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/configmaps/page.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/configmaps/page.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(ConfigMapsPage, "T3Emx0fW3CWYhNOl1ol55huP7DA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$configmaps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigMaps"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$view$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useViewMode"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"]
    ];
});
_c = ConfigMapsPage;
var _c;
__turbopack_context__.k.register(_c, "ConfigMapsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-secrets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSecret",
    ()=>useSecret,
    "useSecretEvents",
    ()=>useSecretEvents,
    "useSecrets",
    ()=>useSecrets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
function useSecrets() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useSecrets.useModeStore[mode]": (state)=>state.mode
    }["useSecrets.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useSecrets.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useSecrets.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useSecrets.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useSecrets.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'secrets',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useSecrets.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useSecrets.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useSecrets.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockSecrets"])();
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/secrets?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch Secrets');
                return response.json();
            }
        }["useSecrets.useQuery"],
        enabled: mode === 'demo' || !!namespace
    });
}
_s(useSecrets, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useSecret(name) {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useSecret.useModeStore[mode]": (state)=>state.mode
    }["useSecret.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useSecret.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useSecret.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useSecret.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useSecret.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'secret',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useSecret.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useSecret.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useSecret.useQuery"]);
                    const secrets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockSecrets"])();
                    const secret = secrets.find({
                        "useSecret.useQuery.secret": (s)=>s.name === name
                    }["useSecret.useQuery.secret"]);
                    if (!secret) throw new Error('Secret not found');
                    return secret;
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/secrets/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch Secret');
                return response.json();
            }
        }["useSecret.useQuery"],
        enabled: !!name && (mode === 'demo' || !!namespace)
    });
}
_s1(useSecret, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useSecretEvents(secretName) {
    _s2();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useSecretEvents.useModeStore[mode]": (state)=>state.mode
    }["useSecretEvents.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useSecretEvents.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useSecretEvents.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useSecretEvents.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useSecretEvents.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'secret-events',
            secretName,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useSecretEvents.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useSecretEvents.useQuery": (resolve)=>setTimeout(resolve, 150)
                    }["useSecretEvents.useQuery"]);
                    const allEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockEvents"])();
                    // Filter events related to this Secret
                    return allEvents.filter({
                        "useSecretEvents.useQuery": (event)=>event.kind === 'Secret' && event.name === secretName
                    }["useSecretEvents.useQuery"]);
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/secrets/${secretName}/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch Secret events');
                return response.json();
            }
        }["useSecretEvents.useQuery"],
        enabled: !!secretName && (mode === 'demo' || !!namespace)
    });
}
_s2(useSecretEvents, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
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
"[project]/app/app/components/secrets/secret-grid-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SecretGridView",
    ()=>SecretGridView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Lock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/resource-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-navigate-to.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function SecretGridView({ secrets }) {
    _s();
    const navigateTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 2
        },
        children: secrets.map((secret)=>{
            const keyCount = secret.keys.length;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$resource$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceCard"], {
                name: secret.name,
                resourceType: secret.namespace,
                resourceColor: "#F43F5E",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                onClick: ()=>navigateTo(`/secrets/${encodeURIComponent(secret.name)}`),
                statusBadge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        display: 'flex',
                        gap: 0.5,
                        flexWrap: 'wrap'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: secret.type,
                            size: "small",
                            sx: {
                                height: 22,
                                fontSize: '0.7rem',
                                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(244, 63, 94, 0.1)',
                                color: '#F43F5E',
                                border: '1px solid',
                                borderColor: 'rgba(244, 63, 94, 0.3)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/secrets/secret-grid-view.tsx",
                            lineNumber: 37,
                            columnNumber: 17
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: `${keyCount} key${keyCount !== 1 ? 's' : ''}`,
                            size: "small",
                            sx: {
                                height: 22,
                                fontSize: '0.75rem',
                                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                                color: 'text.secondary',
                                border: '1px solid',
                                borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/secrets/secret-grid-view.tsx",
                            lineNumber: 52,
                            columnNumber: 17
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/secrets/secret-grid-view.tsx",
                    lineNumber: 36,
                    columnNumber: 15
                }, void 0),
                metrics: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "caption",
                        color: "text.secondary",
                        children: secret.age
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/secrets/secret-grid-view.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/app/components/secrets/secret-grid-view.tsx",
                    lineNumber: 73,
                    columnNumber: 15
                }, void 0)
            }, secret.name, false, {
                fileName: "[project]/app/app/components/secrets/secret-grid-view.tsx",
                lineNumber: 28,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/app/components/secrets/secret-grid-view.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(SecretGridView, "Wwzm0/FjDlo6f37yT/9NE+laVTk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"]
    ];
});
_c = SecretGridView;
var _c;
__turbopack_context__.k.register(_c, "SecretGridView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/secrets/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SecretsPage
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VpnKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/VpnKey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-navigate-to.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$secrets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-secrets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-auto-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/table-skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/error-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/sortable-table-cell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/empty-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-table-sort.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/contexts/search-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$view$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-view-mode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$view$2d$mode$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/view-mode-toggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$secrets$2f$secret$2d$grid$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/secrets/secret-grid-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$grid$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/grid-skeleton.tsx [app-client] (ecmascript)");
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
function SecretsPage() {
    _s();
    const navigateTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"])();
    const searchQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"])('Search secrets...');
    const { data: secrets, isLoading, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$secrets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSecrets"])();
    const { viewMode, setViewMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$view$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useViewMode"])();
    // Auto-refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"])(refetch);
    const filteredSecrets = secrets?.filter((s)=>s.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];
    const { sortedData, sortField, sortOrder, handleSort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"])(filteredSecrets, 'name', 'asc');
    // Custom sort for Keys (array length)
    const sortByKeys = (a, b, order)=>{
        const aVal = a.keys.length;
        const bVal = b.keys.length;
        return order === 'asc' ? aVal - bVal : bVal - aVal;
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Secrets",
                    onRefresh: refetch,
                    actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$view$2d$mode$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewModeToggle"], {
                        viewMode: viewMode,
                        onChange: setViewMode
                    }, void 0, false, {
                        fileName: "[project]/app/app/secrets/page.tsx",
                        lineNumber: 60,
                        columnNumber: 20
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/app/secrets/page.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                viewMode === 'list' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableSkeleton"], {
                    rows: 8,
                    columns: 5
                }, void 0, false, {
                    fileName: "[project]/app/app/secrets/page.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$grid$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GridSkeleton"], {
                    cards: 8
                }, void 0, false, {
                    fileName: "[project]/app/app/secrets/page.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/secrets/page.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Secrets",
                    onRefresh: refetch,
                    actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$view$2d$mode$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewModeToggle"], {
                        viewMode: viewMode,
                        onChange: setViewMode
                    }, void 0, false, {
                        fileName: "[project]/app/app/secrets/page.tsx",
                        lineNumber: 77,
                        columnNumber: 20
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/app/secrets/page.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorState"], {
                    error: error,
                    onRetry: ()=>refetch(),
                    title: "Failed to Load Secrets"
                }, void 0, false, {
                    fileName: "[project]/app/app/secrets/page.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/secrets/page.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Secrets",
                subtitle: `${secrets?.length || 0} secret${secrets?.length === 1 ? '' : 's'} in this namespace`,
                onRefresh: refetch,
                isRefreshing: isLoading,
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$view$2d$mode$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewModeToggle"], {
                    viewMode: viewMode,
                    onChange: setViewMode
                }, void 0, false, {
                    fileName: "[project]/app/app/secrets/page.tsx",
                    lineNumber: 91,
                    columnNumber: 18
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/app/secrets/page.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            !secrets || secrets.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VpnKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No secrets found",
                description: "There are no secrets in this namespace."
            }, void 0, false, {
                fileName: "[project]/app/app/secrets/page.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this) : filteredSecrets.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VpnKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No matching secrets",
                description: `No secrets match "${searchQuery}". Try adjusting your search.`
            }, void 0, false, {
                fileName: "[project]/app/app/secrets/page.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this) : viewMode === 'grid' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$secrets$2f$secret$2d$grid$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SecretGridView"], {
                secrets: sortedData
            }, void 0, false, {
                fileName: "[project]/app/app/secrets/page.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "name",
                                        label: "Name",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/secrets/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "namespace",
                                        label: "Namespace",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/secrets/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "type",
                                        label: "Type",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/secrets/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "keys",
                                        label: "Keys",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort,
                                        customSortFn: sortByKeys
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/secrets/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "age",
                                        label: "Age",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/secrets/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/secrets/page.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/secrets/page.tsx",
                            lineNumber: 111,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: sortedData.map((secret)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    hover: true,
                                    sx: {
                                        cursor: 'pointer'
                                    },
                                    onClick: ()=>navigateTo(`/secrets/${encodeURIComponent(secret.name)}`),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: secret.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/secrets/page.tsx",
                                            lineNumber: 159,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: secret.namespace
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/secrets/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: secret.type
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/secrets/page.tsx",
                                            lineNumber: 161,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: secret.keys.length
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/secrets/page.tsx",
                                            lineNumber: 162,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: secret.age
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/secrets/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, secret.name, true, {
                                    fileName: "[project]/app/app/secrets/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/app/secrets/page.tsx",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/secrets/page.tsx",
                    lineNumber: 110,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/secrets/page.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/secrets/page.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(SecretsPage, "PyukK2AMKSChvgQ4AyazVAHM2Xs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$navigate$2d$to$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigateTo"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$secrets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSecrets"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$view$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useViewMode"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"]
    ];
});
_c = SecretsPage;
var _c;
__turbopack_context__.k.register(_c, "SecretsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/topology/topology-node.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopologyNode",
    ()=>TopologyNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@xyflow/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@xyflow/system/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Layers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewInAr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ViewInAr.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Cloud.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Description$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Description.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Lock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$TrendingUp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/TrendingUp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CheckCircle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Warning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Warning.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Help.js [app-client] (ecmascript)");
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
const resourceIcons = {
    Deployment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    Pod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ViewInAr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    Service: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    ConfigMap: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Description$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    Secret: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    PersistentVolumeClaim: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    HPA: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$TrendingUp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
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
    healthy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    warning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Warning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    unknown: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
};
function TopologyNodeComponent({ data, selected }) {
    _s();
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const Icon = resourceIcons[data.resourceType];
    const StatusIcon = statusIcons[data.status];
    const statusColor = statusColors[data.status];
    const resourceColor = resourceColors[data.resourceType] || '#9e9e9e';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Left,
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Top,
                id: "top",
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Bottom,
                id: "bottom",
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        p: 1.5,
                        pb: 1.5,
                        position: 'relative',
                        zIndex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1,
                                mb: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        flex: 1,
                                        minWidth: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusIcon, {
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
                        data.details && Object.keys(data.details).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                mt: 1,
                                pt: 1,
                                borderTop: '1px solid',
                                borderColor: 'divider'
                            },
                            children: Object.entries(data.details).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Right,
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Top,
                id: "top",
                style: {
                    opacity: 0
                }
            }, void 0, false, {
                fileName: "[project]/app/app/components/topology/topology-node.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Bottom,
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
_s(TopologyNodeComponent, "c0MZhghFmuZD3dgcE5n4BKV0J3M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = TopologyNodeComponent;
const TopologyNode = TopologyNodeComponent;
var _c;
__turbopack_context__.k.register(_c, "TopologyNodeComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/topology/topology-graph.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopologyGraph",
    ()=>TopologyGraph
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@xyflow/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Dialog/Dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Fullscreen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Fullscreen.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$FullscreenExit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/FullscreenExit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$topology$2f$topology$2d$node$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/topology/topology-node.tsx [app-client] (ecmascript)");
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
const nodeTypes = {
    default: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$topology$2f$topology$2d$node$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopologyNode"]
};
function TopologyGraphInner({ data, height = 600 }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const reactFlowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { fitView } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactFlow"])();
    const [fullscreen, setFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredNodeId, setHoveredNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNodesState"])(data.nodes);
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEdgesState"])(data.edges);
    // Update nodes and edges when data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TopologyGraphInner.useMemo": ()=>{
            setNodes(data.nodes);
            setEdges(data.edges);
        }
    }["TopologyGraphInner.useMemo"], [
        data,
        setNodes,
        setEdges
    ]);
    // Fit view whenever nodes change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopologyGraphInner.useEffect": ()=>{
            if (nodes.length > 0) {
                setTimeout({
                    "TopologyGraphInner.useEffect": ()=>{
                        fitView({
                            padding: 0.2,
                            duration: 200
                        });
                    }
                }["TopologyGraphInner.useEffect"], 0);
            }
        }
    }["TopologyGraphInner.useEffect"], [
        nodes,
        fitView
    ]);
    // Get connected node IDs for a given node
    const getConnectedNodeIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TopologyGraphInner.useCallback[getConnectedNodeIds]": (nodeId)=>{
            const connected = new Set();
            edges.forEach({
                "TopologyGraphInner.useCallback[getConnectedNodeIds]": (edge)=>{
                    if (edge.source === nodeId) {
                        connected.add(edge.target);
                    } else if (edge.target === nodeId) {
                        connected.add(edge.source);
                    }
                }
            }["TopologyGraphInner.useCallback[getConnectedNodeIds]"]);
            return connected;
        }
    }["TopologyGraphInner.useCallback[getConnectedNodeIds]"], [
        edges
    ]);
    // Apply highlighting styles based on hover state
    const styledNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TopologyGraphInner.useMemo[styledNodes]": ()=>{
            if (!hoveredNodeId) return nodes;
            const connectedIds = getConnectedNodeIds(hoveredNodeId);
            return nodes.map({
                "TopologyGraphInner.useMemo[styledNodes]": (node)=>{
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
                }
            }["TopologyGraphInner.useMemo[styledNodes]"]);
        }
    }["TopologyGraphInner.useMemo[styledNodes]"], [
        nodes,
        hoveredNodeId,
        getConnectedNodeIds
    ]);
    // Apply highlighting styles to edges based on hover state
    const styledEdges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TopologyGraphInner.useMemo[styledEdges]": ()=>{
            if (!hoveredNodeId) return edges;
            return edges.map({
                "TopologyGraphInner.useMemo[styledEdges]": (edge)=>{
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
                }
            }["TopologyGraphInner.useMemo[styledEdges]"]);
        }
    }["TopologyGraphInner.useMemo[styledEdges]"], [
        edges,
        hoveredNodeId
    ]);
    // Toggle fullscreen mode
    const toggleFullscreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TopologyGraphInner.useCallback[toggleFullscreen]": ()=>{
            setFullscreen({
                "TopologyGraphInner.useCallback[toggleFullscreen]": (prev)=>!prev
            }["TopologyGraphInner.useCallback[toggleFullscreen]"]);
        }
    }["TopologyGraphInner.useCallback[toggleFullscreen]"], []);
    // Handle node hover - highlight connected nodes
    const onNodeMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TopologyGraphInner.useCallback[onNodeMouseEnter]": (_, node)=>{
            setHoveredNodeId(node.id);
        }
    }["TopologyGraphInner.useCallback[onNodeMouseEnter]"], []);
    const onNodeMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TopologyGraphInner.useCallback[onNodeMouseLeave]": ()=>{
            setHoveredNodeId(null);
        }
    }["TopologyGraphInner.useCallback[onNodeMouseLeave]"], []);
    // Handle node click - navigate to resource detail page
    const onNodeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TopologyGraphInner.useCallback[onNodeClick]": (_, node)=>{
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
        }
    }["TopologyGraphInner.useCallback[onNodeClick]"], [
        router
    ]);
    const graphContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactFlow"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Controls"], {}, void 0, false, {
                    fileName: "[project]/app/app/components/topology/topology-graph.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Panel"], {
                    position: "top-right",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            gap: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            title: fullscreen ? 'Exit Fullscreen' : 'Fullscreen',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                                children: fullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$FullscreenExit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/app/components/topology/topology-graph.tsx",
                                    lineNumber: 218,
                                    columnNumber: 31
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Fullscreen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(TopologyGraphInner, "6PMUP2ZJNqLyw+qOTYnKQhJMoEI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactFlow"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNodesState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEdgesState"]
    ];
});
_c = TopologyGraphInner;
function TopologyGraph(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactFlowProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopologyGraphInner, {
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
_c1 = TopologyGraph;
var _c, _c1;
__turbopack_context__.k.register(_c, "TopologyGraphInner");
__turbopack_context__.k.register(_c1, "TopologyGraph");
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
"[project]/app/lib/ui/topology.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/topology/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopologyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$topology$2f$topology$2d$graph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/topology/topology-graph.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$deployments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-deployments.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$configmaps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-configmaps.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$secrets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-secrets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$ui$2f$topology$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/ui/topology.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)");
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
function TopologyPage() {
    _s();
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "TopologyPage.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["TopologyPage.useModeStore[namespace]"]);
    const { data: deployments, isLoading: deploymentsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$deployments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeployments"])();
    const { data: configMaps, isLoading: configMapsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$configmaps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigMaps"])();
    const { data: secrets, isLoading: secretsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$secrets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSecrets"])();
    const topologyData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TopologyPage.useMemo[topologyData]": ()=>{
            if (!deployments || !configMaps || !secrets || !namespace) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$ui$2f$topology$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildConfigSecretsTopology"])(deployments, configMaps, secrets, namespace);
        }
    }["TopologyPage.useMemo[topologyData]"], [
        deployments,
        configMaps,
        secrets,
        namespace
    ]);
    const isLoading = deploymentsLoading || configMapsLoading || secretsLoading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Cluster Topology",
                metadata: [
                    `Namespace: ${namespace || 'All'}`
                ]
            }, void 0, false, {
                fileName: "[project]/app/app/topology/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 400
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/app/topology/page.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/topology/page.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this) : !topologyData || topologyData.nodes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                severity: "info",
                children: "No topology data available for the current namespace. Deploy some resources with ConfigMaps or Secrets to see the topology graph."
            }, void 0, false, {
                fileName: "[project]/app/app/topology/page.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    p: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "h6",
                        gutterBottom: true,
                        children: "ConfigMaps/Secrets → Deployments"
                    }, void 0, false, {
                        fileName: "[project]/app/app/topology/page.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body2",
                        color: "text.secondary",
                        sx: {
                            mb: 2
                        },
                        children: "Visualizes how ConfigMaps and Secrets are mounted in Deployments"
                    }, void 0, false, {
                        fileName: "[project]/app/app/topology/page.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$topology$2f$topology$2d$graph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopologyGraph"], {
                        data: topologyData,
                        height: 700
                    }, void 0, false, {
                        fileName: "[project]/app/app/topology/page.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/topology/page.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/topology/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(TopologyPage, "MTn7zp/q1jCmsTXF8+wRK4r7epc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$deployments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeployments"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$configmaps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigMaps"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$secrets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSecrets"]
    ];
});
_c = TopologyPage;
var _c;
__turbopack_context__.k.register(_c, "TopologyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/github-app/install-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GitHubAppInstallButton",
    ()=>GitHubAppInstallButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$GitHub$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/GitHub.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
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
;
;
;
;
function GitHubAppInstallButtonContent() {
    _s();
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [installations, setInstallations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GitHubAppInstallButtonContent.useEffect": ()=>{
            checkAuthStatus();
        }
    }["GitHubAppInstallButtonContent.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GitHubAppInstallButtonContent.useEffect": ()=>{
            // Handle callback messages
            const status = searchParams.get('github_app');
            const error = searchParams.get('error');
            if (status === 'installed') {
                // Refresh installations
                checkAuthStatus();
                // Clear query params
                router.replace('/settings');
            }
            if (status === 'connected') {
                checkAuthStatus();
                router.replace('/settings');
            }
            if (error) {
                console.error('GitHub App error:', error);
            }
        }
    }["GitHubAppInstallButtonContent.useEffect"], [
        searchParams
    ]);
    const checkAuthStatus = async ()=>{
        setIsLoading(true);
        try {
            const response = await fetch('/api/github-app/installations');
            if (response.ok) {
                const data = await response.json();
                setInstallations(data);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setInstallations([]);
            }
        } catch (error) {
            console.error('Failed to check auth status:', error);
            setIsAuthenticated(false);
            setInstallations([]);
        } finally{
            setIsLoading(false);
        }
    };
    const handleInstall = ()=>{
        const clientId = ("TURBOPACK compile-time value", "Iv23lipSNqtEiL3HtNnk");
        const redirectUri = `${window.location.origin}/api/github-app/callback`;
        const state = Math.random().toString(36).substring(7);
        // Redirect to GitHub App installation
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    };
    const handleLogout = async ()=>{
        try {
            await fetch('/api/github-app/logout', {
                method: 'POST'
            });
            setIsAuthenticated(false);
            setInstallations([]);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    const handleAddRepositories = ()=>{
        // Open GitHub App settings to add more repositories
        const appSlug = ("TURBOPACK compile-time value", "kubevistabeta1");
        window.open(`https://github.com/apps/${appSlug}/installations/new`, '_blank');
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                display: 'flex',
                alignItems: 'center',
                gap: 2
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    size: 24
                }, void 0, false, {
                    fileName: "[project]/app/app/components/github-app/install-button.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "body2",
                    color: "text.secondary",
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/app/app/components/github-app/install-button.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/github-app/install-button.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, this);
    }
    if (isAuthenticated && installations.length > 0) {
        const totalRepos = installations.reduce((acc, inst)=>acc + inst.repositories.length, 0);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "body2",
                                    fontWeight: "medium",
                                    children: "Connected to GitHub App"
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/github-app/install-button.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "caption",
                                    color: "text.secondary",
                                    children: [
                                        totalRepos,
                                        " ",
                                        totalRepos === 1 ? 'repository' : 'repositories',
                                        " accessible across",
                                        ' ',
                                        installations.length,
                                        " ",
                                        installations.length === 1 ? 'installation' : 'installations'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/github-app/install-button.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/github-app/install-button.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "outlined",
                            onClick: handleLogout,
                            size: "small",
                            children: "Disconnect"
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/github-app/install-button.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/github-app/install-button.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    severity: "info",
                    sx: {
                        mb: 2
                    },
                    children: [
                        "You have granular control over which repositories Orphelix can access.",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            size: "small",
                            onClick: handleAddRepositories,
                            sx: {
                                ml: 1
                            },
                            children: "Add More Repositories"
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/github-app/install-button.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/components/github-app/install-button.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                installations.map((installation)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            mb: 2
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "caption",
                            color: "text.secondary",
                            display: "block",
                            children: [
                                installation.account.login,
                                " (",
                                installation.repositories.length,
                                " repos)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/github-app/install-button.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this)
                    }, installation.id, false, {
                        fileName: "[project]/app/app/components/github-app/install-button.tsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/github-app/install-button.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "contained",
            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$GitHub$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/app/components/github-app/install-button.tsx",
                lineNumber: 154,
                columnNumber: 20
            }, void 0),
            onClick: handleInstall,
            size: "large",
            sx: {
                maxWidth: 300,
                py: 2,
                px: 3,
                borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                color: (theme)=>theme.palette.text.primary,
                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                ...isGlass && {
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)'
                },
                border: '1px solid',
                borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)',
                ...isGlass && {
                    boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)' : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)'
                },
                '&:hover': {
                    backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.7)' : 'rgba(255, 255, 255, 0.35)'
                }
            },
            children: "Install GitHub App"
        }, void 0, false, {
            fileName: "[project]/app/app/components/github-app/install-button.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/github-app/install-button.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_s(GitHubAppInstallButtonContent, "vsOy1B5/AIIX4Mg7rZ/xVeFbEdo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = GitHubAppInstallButtonContent;
function GitHubAppInstallButton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                display: 'flex',
                alignItems: 'center',
                gap: 2
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    size: 24
                }, void 0, false, {
                    fileName: "[project]/app/app/components/github-app/install-button.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "body2",
                    color: "text.secondary",
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/app/app/components/github-app/install-button.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/github-app/install-button.tsx",
            lineNumber: 199,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GitHubAppInstallButtonContent, {}, void 0, false, {
            fileName: "[project]/app/app/components/github-app/install-button.tsx",
            lineNumber: 206,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/app/components/github-app/install-button.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_c1 = GitHubAppInstallButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "GitHubAppInstallButtonContent");
__turbopack_context__.k.register(_c1, "GitHubAppInstallButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/github-app/repo-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GitHubAppRepoSelector",
    ()=>GitHubAppRepoSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Select/Select.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControl/FormControl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputLabel/InputLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript)");
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
function GitHubAppRepoSelector() {
    _s();
    const { selectedRepo, setSelectedRepo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGitHubStore"])();
    const [selectedInstallation, setSelectedInstallation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { data: installations, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'github-app-installations'
        ],
        queryFn: {
            "GitHubAppRepoSelector.useQuery": async ()=>{
                const response = await fetch('/api/github-app/installations');
                if (!response.ok) throw new Error('Failed to fetch installations');
                return response.json();
            }
        }["GitHubAppRepoSelector.useQuery"]
    });
    // Flatten all repositories from all installations
    const allRepositories = installations?.flatMap((inst)=>inst.repositories.map((repo)=>({
                ...repo,
                installationId: inst.id,
                accountLogin: inst.account.login
            }))) || [];
    const handleChange = (fullName)=>{
        const repo = allRepositories.find((r)=>r.full_name === fullName);
        if (repo) {
            setSelectedRepo({
                owner: repo.owner,
                repo: repo.name,
                branch: repo.default_branch
            });
            setSelectedInstallation(repo.installationId);
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                display: 'flex',
                alignItems: 'center',
                gap: 2
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "body2",
                    children: "Loading repositories..."
                }, void 0, false, {
                    fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this);
    }
    if (!installations || installations.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "body2",
            color: "text.secondary",
            children: "No installations found. Please install the GitHub App first."
        }, void 0, false, {
            fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this);
    }
    if (allRepositories.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "body2",
            color: "text.secondary",
            children: "No repositories accessible. Grant access to repositories in GitHub App settings."
        }, void 0, false, {
            fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                fullWidth: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: "Select Repository"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: selectedRepo ? `${selectedRepo.owner}/${selectedRepo.repo}` : '',
                        onChange: (e)=>handleChange(e.target.value),
                        label: "Select Repository",
                        children: installations.map((installation)=>[
                                // Group header
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    disabled: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        fontWeight: "bold",
                                        children: installation.account.login
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                }, `header-${installation.id}`, false, {
                                    fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                // Repositories under this installation
                                ...installation.repositories.map((repo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: repo.full_name,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                pl: 2
                                            },
                                            children: [
                                                repo.name,
                                                repo.private && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    label: "Private",
                                                    size: "small",
                                                    color: "warning",
                                                    sx: {
                                                        height: 16
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                                            lineNumber: 93,
                                            columnNumber: 17
                                        }, this)
                                    }, repo.full_name, false, {
                                        fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this))
                            ])
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            selectedInstallation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "caption",
                color: "text.secondary",
                sx: {
                    mt: 1,
                    display: 'block'
                },
                children: [
                    "Repository from installation #",
                    selectedInstallation
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/github-app/repo-selector.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(GitHubAppRepoSelector, "TI+IBGx2NbenTWlZUxSt2qMxnn0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGitHubStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = GitHubAppRepoSelector;
var _c;
__turbopack_context__.k.register(_c, "GitHubAppRepoSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/config/ai-features.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * AI Features Configuration
 *
 * Defines which features require AI/LLM capabilities and are only available
 * when user provides necessary API keys.
 */ __turbopack_context__.s([
    "AI_FEATURES",
    ()=>AI_FEATURES,
    "getAvailableAIFeatures",
    ()=>getAvailableAIFeatures,
    "isAIFeatureAvailable",
    ()=>isAIFeatureAvailable
]);
const AI_FEATURES = {
    CRITICAL_ALERTS_EXPLAIN: {
        id: 'critical-alerts-explain',
        name: 'Critical Alerts AI Explanation',
        description: 'Get AI-powered explanations for critical issues with pod logs and root cause analysis',
        requiredProvider: 'openai',
        enabled: true
    },
    YAML_EDITOR: {
        id: 'yaml-editor',
        name: 'AI-Powered YAML Editor',
        description: 'Intelligent file matching for Kubernetes manifests using AI',
        requiredProvider: 'openai',
        enabled: true
    }
};
function isAIFeatureAvailable(featureId, apiKeys) {
    const feature = Object.values(AI_FEATURES).find((f)=>f.id === featureId);
    if (!feature || !feature.enabled) {
        return false;
    }
    switch(feature.requiredProvider){
        case 'openai':
            return !!apiKeys.openai;
        case 'anthropic':
            return !!apiKeys.anthropic;
        default:
            return false;
    }
}
function getAvailableAIFeatures(apiKeys) {
    return Object.values(AI_FEATURES).filter((feature)=>feature.enabled && isAIFeatureAvailable(feature.id, apiKeys));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/settings/ai-settings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AISettings",
    ()=>AISettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Visibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/VisibilityOff.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Code.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$config$2f$ai$2d$features$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/config/ai-features.ts [app-client] (ecmascript)");
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
const LOCAL_STORAGE_KEY = 'kubevista_openai_key';
function AISettings() {
    _s();
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const [apiKey, setApiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showKey, setShowKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasKey, setHasKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [testing, setTesting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [testError, setTestError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AISettings.useEffect": ()=>{
            // Load existing key from localStorage
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                setApiKey(stored);
                setHasKey(true);
            }
        }
    }["AISettings.useEffect"], []);
    const testApiKey = async ()=>{
        const trimmedKey = apiKey.trim();
        if (!trimmedKey) return;
        setTesting(true);
        setTestError(null);
        try {
            // Test the API key with a minimal request
            const response = await fetch('https://api.openai.com/v1/models', {
                headers: {
                    'Authorization': `Bearer ${trimmedKey}`
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid API key');
                }
                throw new Error(`API test failed: ${response.statusText}`);
            }
            // Key is valid, save it
            localStorage.setItem(LOCAL_STORAGE_KEY, trimmedKey);
            setHasKey(true);
            setSaved(true);
            setTimeout(()=>setSaved(false), 3000);
            // Dispatch event so other components know the key was updated
            window.dispatchEvent(new Event('openai-key-updated'));
        } catch (error) {
            setTestError(error instanceof Error ? error.message : 'Failed to validate API key');
        } finally{
            setTesting(false);
        }
    };
    const handleSave = ()=>{
        testApiKey();
    };
    const handleClear = ()=>{
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setApiKey('');
        setHasKey(false);
        setTestError(null);
        setSaved(false);
        window.dispatchEvent(new Event('openai-key-updated'));
    };
    const availableFeatures = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$config$2f$ai$2d$features$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_FEATURES"]).filter((f)=>f.enabled);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                container: true,
                spacing: 2,
                sx: {
                    mb: 4
                },
                children: availableFeatures.map((feature)=>{
                    const isAvailable = hasKey && feature.requiredProvider === 'openai';
                    const iconColor = isAvailable ? '#10B981' : '#94A3B8';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        size: {
                            xs: 12,
                            sm: 6,
                            md: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            elevation: isGlass ? 0 : 1,
                            sx: {
                                p: 2,
                                cursor: 'default',
                                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                                overflow: 'hidden',
                                ...isGlass && {
                                    // Liquid glass effect
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
                                        borderRadius: (theme)=>`${theme.shape.borderRadius}px`
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
                                                background: (theme)=>theme.palette.mode === 'dark' ? `linear-gradient(135deg, ${iconColor}25 0%, ${iconColor}15 100%)` : `linear-gradient(135deg, ${iconColor}30 0%, ${iconColor}15 100%)`,
                                                ...isGlass && {
                                                    backdropFilter: 'blur(10px)'
                                                },
                                                border: '1px solid',
                                                borderColor: (theme)=>theme.palette.mode === 'dark' ? `${iconColor}40` : `${iconColor}30`,
                                                flexShrink: 0,
                                                boxShadow: (theme)=>theme.palette.mode === 'dark' ? `0 2px 8px 0 ${iconColor}20` : `0 2px 8px 0 ${iconColor}15`
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    fontSize: 22,
                                                    color: iconColor,
                                                    opacity: 0.95
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                                lineNumber: 178,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                            lineNumber: 151,
                                            columnNumber: 19
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
                                                        whiteSpace: 'nowrap',
                                                        mb: 0.5
                                                    },
                                                    children: feature.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "caption",
                                                    color: "text.secondary",
                                                    sx: {
                                                        opacity: 0.8
                                                    },
                                                    children: "AI-Powered"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                            lineNumber: 180,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                    lineNumber: 150,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        mb: 1.5,
                                        position: 'relative',
                                        zIndex: 1
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: isAvailable ? 'Enabled' : 'Disabled',
                                        size: "small",
                                        color: isAvailable ? 'success' : 'default'
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                        lineNumber: 201,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                    lineNumber: 200,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        position: 'relative',
                                        zIndex: 1
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: feature.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                        lineNumber: 210,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                    lineNumber: 209,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                            lineNumber: 102,
                            columnNumber: 15
                        }, this)
                    }, feature.id, false, {
                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                        lineNumber: 101,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "h6",
                        sx: {
                            mb: 2,
                            fontWeight: 600
                        },
                        children: "OpenAI API Key"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body2",
                        color: "text.secondary",
                        sx: {
                            mb: 3
                        },
                        children: "Enable AI-powered features by providing your OpenAI API key. The key is stored locally in your browser and never sent to our servers."
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            mb: 3
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            fullWidth: true,
                            label: "OpenAI API Key",
                            type: showKey ? 'text' : 'password',
                            value: apiKey,
                            onChange: (e)=>setApiKey(e.target.value),
                            placeholder: "sk-...",
                            InputProps: {
                                endAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    position: "end",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        onClick: ()=>setShowKey(!showKey),
                                        edge: "end",
                                        size: "small",
                                        children: showKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                            lineNumber: 245,
                                            columnNumber: 32
                                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                            lineNumber: 245,
                                            columnNumber: 56
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                        lineNumber: 240,
                                        columnNumber: 19
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                    lineNumber: 239,
                                    columnNumber: 17
                                }, void 0)
                            },
                            helperText: "Get your API key from https://platform.openai.com/api-keys"
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            display: 'flex',
                            gap: 2,
                            mb: 3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "contained",
                                onClick: handleSave,
                                disabled: !apiKey.trim() || apiKey.trim() === localStorage.getItem(LOCAL_STORAGE_KEY) || testing,
                                children: testing ? 'Testing...' : 'Save & Test API Key'
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            hasKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "outlined",
                                color: "error",
                                onClick: handleClear,
                                disabled: testing,
                                children: "Clear Key"
                            }, void 0, false, {
                                fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        severity: "success",
                        sx: {
                            mb: 2
                        },
                        children: "API key validated and saved successfully!"
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                        lineNumber: 275,
                        columnNumber: 11
                    }, this),
                    testError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        severity: "error",
                        sx: {
                            mb: 2
                        },
                        children: testError
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                        lineNumber: 281,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/components/settings/ai-settings.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/settings/ai-settings.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(AISettings, "LTCloX0wwHTKQ4+CWGQmjFK9aZw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = AISettings;
var _c;
__turbopack_context__.k.register(_c, "AISettings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/settings/cluster-aliases.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClusterAliases",
    ()=>ClusterAliases
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Edit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Delete.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Save.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cancel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Cancel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
function ClusterAliases() {
    _s();
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const { aliases, setAlias, removeAlias } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClusterAliases"])();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "ClusterAliases.useModeStore[mode]": (state)=>state.mode
    }["ClusterAliases.useModeStore[mode]"]);
    const [contexts, setContexts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingContext, setEditingContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editValue, setEditValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClusterAliases.useEffect": ()=>{
            if (mode === 'demo') {
                // In demo mode, show a mock demo cluster
                setContexts([
                    {
                        name: 'demo-cluster',
                        cluster: 'demo-cluster',
                        user: 'demo-user',
                        current: true
                    }
                ]);
                setLoading(false);
            } else {
                fetchContexts();
            }
        }
    }["ClusterAliases.useEffect"], [
        mode
    ]);
    const fetchContexts = async ()=>{
        setLoading(true);
        try {
            const response = await fetch('/api/contexts');
            const data = await response.json();
            if (response.ok && data.contexts) {
                setContexts(data.contexts);
            }
        } catch (err) {
            console.error('Failed to fetch contexts:', err);
        } finally{
            setLoading(false);
        }
    };
    const handleEdit = (contextName)=>{
        setEditingContext(contextName);
        setEditValue(aliases[contextName] || contextName);
    };
    const handleSave = (contextName)=>{
        if (editValue.trim() && editValue !== contextName) {
            setAlias(contextName, editValue.trim());
        } else if (editValue === contextName) {
            removeAlias(contextName);
        }
        setEditingContext(null);
        setEditValue('');
    };
    const handleCancel = ()=>{
        setEditingContext(null);
        setEditValue('');
    };
    const handleRemove = (contextName)=>{
        removeAlias(contextName);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: "Loading contexts..."
        }, void 0, false, {
            fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
            lineNumber: 81,
            columnNumber: 12
        }, this);
    }
    if (contexts.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            severity: "info",
            children: mode === 'demo' ? 'Demo cluster alias not available.' : 'No Kubernetes contexts found. Please configure kubectl first.'
        }, void 0, false, {
            fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "body2",
                color: "text.secondary",
                paragraph: true,
                children: mode === 'demo' ? 'Set a friendly name (alias) for the demo cluster. This will be displayed instead of "demo-cluster" throughout the application.' : 'Set friendly names (aliases) for your Kubernetes clusters. These will be displayed instead of the full context names throughout the application.'
            }, void 0, false, {
                fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                },
                children: contexts.map((context)=>{
                    const currentAlias = aliases[context.name];
                    const isEditing = editingContext === context.name;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        elevation: isGlass ? 0 : 1,
                        sx: {
                            p: 3,
                            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                            ...isGlass && {
                                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(24px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                                border: '1px solid',
                                borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)',
                                boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)' : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)'
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            },
                            children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: "small",
                                        fullWidth: true,
                                        value: editValue,
                                        onChange: (e)=>setEditValue(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') {
                                                handleSave(context.name);
                                            } else if (e.key === 'Escape') {
                                                handleCancel();
                                            }
                                        },
                                        placeholder: "Enter friendly name",
                                        autoFocus: true,
                                        sx: {
                                            flex: 1
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                        lineNumber: 132,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: "small",
                                        onClick: ()=>handleSave(context.name),
                                        color: "primary",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            fontSize: "small"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                            lineNumber: 153,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                        lineNumber: 148,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: "small",
                                        onClick: handleCancel,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cancel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            fontSize: "small"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                            lineNumber: 156,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                        lineNumber: 155,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body2",
                                                fontWeight: 600,
                                                children: currentAlias || context.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                                lineNumber: 162,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "caption",
                                                color: "text.secondary",
                                                children: [
                                                    "Cluster: ",
                                                    context.cluster
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                                lineNumber: 165,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                        lineNumber: 161,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            display: 'flex',
                                            gap: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                size: "small",
                                                onClick: ()=>handleEdit(context.name),
                                                color: "primary",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    fontSize: "small"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                                lineNumber: 170,
                                                columnNumber: 23
                                            }, this),
                                            currentAlias && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                size: "small",
                                                onClick: ()=>handleRemove(context.name),
                                                color: "error",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    fontSize: "small"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                                lineNumber: 178,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                                        lineNumber: 169,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                            lineNumber: 129,
                            columnNumber: 15
                        }, this)
                    }, context.name, false, {
                        fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                        lineNumber: 104,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/settings/cluster-aliases.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s(ClusterAliases, "KLIUjxvin00vmVlL3MBE1xyLRUs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClusterAliases"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"]
    ];
});
_c = ClusterAliases;
var _c;
__turbopack_context__.k.register(_c, "ClusterAliases");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/components/settings/critical-issues-settings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CriticalIssuesSettings",
    ()=>CriticalIssuesSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormGroup$2f$FormGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormGroup/FormGroup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Switch/Switch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
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
;
;
;
const RESOURCE_OPTIONS = [
    {
        key: 'pods',
        label: 'Failed Pods',
        description: 'Monitor pods in Failed or CrashLoopBackOff state'
    },
    {
        key: 'nodes',
        label: 'Node Health',
        description: 'Monitor nodes that are not ready'
    },
    {
        key: 'deployments',
        label: 'Degraded Deployments',
        description: 'Monitor deployments with unavailable replicas'
    },
    {
        key: 'pv',
        label: 'Unbound Volumes',
        description: 'Monitor persistent volumes that are not bound'
    }
];
function CriticalIssuesSettings() {
    _s();
    const { visualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const { isResourceEnabled, toggleResource } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCriticalIssuesSettings"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        elevation: isGlass ? 0 : 1,
        sx: {
            p: 3,
            borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
            ...isGlass && {
                backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid',
                borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)',
                boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)' : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)'
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "body2",
                color: "text.secondary",
                paragraph: true,
                children: "Select which resource types should be monitored for critical issues on the dashboard."
            }, void 0, false, {
                fileName: "[project]/app/app/components/settings/critical-issues-settings.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormGroup$2f$FormGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: RESOURCE_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            checked: isResourceEnabled(option.key),
                            onChange: ()=>toggleResource(option.key),
                            color: "primary"
                        }, void 0, false, {
                            fileName: "[project]/app/app/components/settings/critical-issues-settings.tsx",
                            lineNumber: 78,
                            columnNumber: 15
                        }, void 0),
                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "body1",
                                    fontWeight: 600,
                                    children: option.label
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/settings/critical-issues-settings.tsx",
                                    lineNumber: 86,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "caption",
                                    color: "text.secondary",
                                    children: option.description
                                }, void 0, false, {
                                    fileName: "[project]/app/app/components/settings/critical-issues-settings.tsx",
                                    lineNumber: 89,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/components/settings/critical-issues-settings.tsx",
                            lineNumber: 85,
                            columnNumber: 15
                        }, void 0),
                        sx: {
                            mb: 1.5
                        }
                    }, option.key, false, {
                        fileName: "[project]/app/app/components/settings/critical-issues-settings.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/app/components/settings/critical-issues-settings.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/components/settings/critical-issues-settings.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(CriticalIssuesSettings, "i1zekfLjVl6/PDzkS35HeTkzc0w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCriticalIssuesSettings"]
    ];
});
_c = CriticalIssuesSettings;
var _c;
__turbopack_context__.k.register(_c, "CriticalIssuesSettings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/settings/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tabs$2f$Tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tabs/Tabs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tab/Tab.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Switch/Switch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ButtonGroup$2f$ButtonGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ButtonGroup/ButtonGroup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LightModeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/LightModeOutlined.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$DarkModeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/DarkModeOutlined.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LaptopOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/LaptopOutlined.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/app/components/theme-provider.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/providers/ThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$github$2d$app$2f$install$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/github-app/install-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$github$2d$app$2f$repo$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/github-app/repo-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$settings$2f$ai$2d$settings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/settings/ai-settings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$settings$2f$cluster$2d$aliases$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/settings/cluster-aliases.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$settings$2f$critical$2d$issues$2d$settings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/settings/critical-issues-settings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/components/GlassButton.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
function GitHubIntegrationTab() {
    _s();
    const { data: installations } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'github-app-installations'
        ],
        queryFn: {
            "GitHubIntegrationTab.useQuery": async ()=>{
                const response = await fetch('/api/github-app/installations');
                if (!response.ok) return [];
                return response.json();
            }
        }["GitHubIntegrationTab.useQuery"]
    });
    const hasInstallations = installations && installations.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "h6",
                sx: {
                    mb: 2,
                    fontWeight: 600
                },
                children: "GitHub App Integration"
            }, void 0, false, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "body2",
                color: "text.secondary",
                paragraph: true,
                children: "Connect your GitHub App to edit Kubernetes manifests and create Pull Requests directly from Orphelix."
            }, void 0, false, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 3
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$github$2d$app$2f$install$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GitHubAppInstallButton"], {}, void 0, false, {
                    fileName: "[project]/app/app/settings/page.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            hasInstallations && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "subtitle1",
                        sx: {
                            mb: 2,
                            fontWeight: 600
                        },
                        children: "Select Repository"
                    }, void 0, false, {
                        fileName: "[project]/app/app/settings/page.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$github$2d$app$2f$repo$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GitHubAppRepoSelector"], {}, void 0, false, {
                        fileName: "[project]/app/app/settings/page.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/settings/page.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(GitHubIntegrationTab, "8PlHszB0SYeKH6Ud+Dyk4mRXRBQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = GitHubIntegrationTab;
function SettingsPage() {
    _s1();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const tabParam = searchParams.get('tab');
    const { mode: themeMode, setThemeMode, actualTheme, visualPreset, setVisualPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isGlass = visualPreset !== 'classic';
    const { autoRefreshEnabled, setAutoRefreshEnabled, autoRefreshInterval, setAutoRefreshInterval } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Set active tab from URL parameter
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsPage.useEffect": ()=>{
            if (tabParam) {
                const tabIndex = parseInt(tabParam, 10);
                if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex <= 3) {
                    setActiveTab(tabIndex);
                }
            }
        }
    }["SettingsPage.useEffect"], [
        tabParam
    ]);
    const handleTabChange = (_event, newValue)=>{
        setActiveTab(newValue);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    mb: 4
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "h4",
                        sx: {
                            fontWeight: 700,
                            mb: 0.5
                        },
                        children: "Settings"
                    }, void 0, false, {
                        fileName: "[project]/app/app/settings/page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body2",
                        color: "text.secondary",
                        children: "Configure your Orphelix dashboard preferences"
                    }, void 0, false, {
                        fileName: "[project]/app/app/settings/page.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    borderBottom: 1,
                    borderColor: 'divider',
                    mb: 3
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tabs$2f$Tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    value: activeTab,
                    onChange: handleTabChange,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Cluster Configuration"
                        }, void 0, false, {
                            fileName: "[project]/app/app/settings/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "GitHub Integration"
                        }, void 0, false, {
                            fileName: "[project]/app/app/settings/page.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "AI Features"
                        }, void 0, false, {
                            fileName: "[project]/app/app/settings/page.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Design"
                        }, void 0, false, {
                            fileName: "[project]/app/app/settings/page.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/settings/page.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            activeTab === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            mb: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "h6",
                                sx: {
                                    mb: 2,
                                    fontWeight: 600
                                },
                                children: "Cluster Aliases"
                            }, void 0, false, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$settings$2f$cluster$2d$aliases$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClusterAliases"], {}, void 0, false, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/settings/page.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            mb: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "h6",
                                sx: {
                                    mb: 2,
                                    fontWeight: 600
                                },
                                children: "Critical Issues Monitoring"
                            }, void 0, false, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$settings$2f$critical$2d$issues$2d$settings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CriticalIssuesSettings"], {}, void 0, false, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/settings/page.tsx",
                        lineNumber: 121,
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
                                children: "Auto Refresh"
                            }, void 0, false, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                elevation: isGlass ? 0 : 1,
                                sx: {
                                    p: 3,
                                    borderRadius: (theme)=>`${theme.shape.borderRadius}px`,
                                    ...isGlass && {
                                        backgroundColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(30, 30, 46, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                                        backdropFilter: 'blur(24px) saturate(180%)',
                                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                                        border: '1px solid',
                                        borderColor: (theme)=>theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(209, 213, 219, 0.4)',
                                        boxShadow: (theme)=>theme.palette.mode === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)' : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)'
                                    }
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 3,
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                checked: autoRefreshEnabled,
                                                onChange: (e)=>setAutoRefreshEnabled(e.target.checked),
                                                color: "primary"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/settings/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 21
                                            }, void 0),
                                            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "body1",
                                                        fontWeight: 600,
                                                        children: "Enable auto-refresh"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        children: [
                                                            "Automatically refresh data every ",
                                                            autoRefreshInterval,
                                                            " seconds"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 23
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/settings/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/settings/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "body2",
                                                    color: "text.secondary",
                                                    sx: {
                                                        opacity: autoRefreshEnabled ? 1 : 0.5,
                                                        transition: 'opacity 0.2s'
                                                    },
                                                    children: "Refresh interval"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/settings/page.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ButtonGroup$2f$ButtonGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    size: "small",
                                                    disabled: !autoRefreshEnabled,
                                                    sx: {
                                                        opacity: autoRefreshEnabled ? 1 : 0.5,
                                                        transition: 'opacity 0.2s'
                                                    },
                                                    children: [
                                                        10,
                                                        30,
                                                        60
                                                    ].map((interval)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            variant: autoRefreshInterval === interval ? 'contained' : 'outlined',
                                                            onClick: ()=>setAutoRefreshInterval(interval),
                                                            disabled: !autoRefreshEnabled,
                                                            children: [
                                                                interval,
                                                                "s"
                                                            ]
                                                        }, interval, true, {
                                                            fileName: "[project]/app/app/settings/page.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/app/settings/page.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/settings/page.tsx",
                                            lineNumber: 176,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/settings/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/settings/page.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this),
            activeTab === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GitHubIntegrationTab, {}, void 0, false, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 213,
                columnNumber: 27
            }, this),
            activeTab === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$settings$2f$ai$2d$settings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AISettings"], {}, void 0, false, {
                    fileName: "[project]/app/app/settings/page.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 216,
                columnNumber: 9
            }, this),
            activeTab === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            mb: 3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "h6",
                                sx: {
                                    mb: 3,
                                    fontWeight: 600
                                },
                                children: "Theme Mode"
                            }, void 0, false, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                container: true,
                                spacing: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: {
                                            xs: 12,
                                            sm: 4
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassButton"], {
                                            onClick: ()=>setThemeMode('light'),
                                            fullWidth: true,
                                            selected: themeMode === 'light',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    textAlign: 'left',
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        sx: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1.5,
                                                            mb: 0.5
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LightModeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                sx: {
                                                                    fontSize: 20,
                                                                    color: themeMode === 'light' ? 'primary.main' : 'text.secondary'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/settings/page.tsx",
                                                                lineNumber: 236,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                variant: "body1",
                                                                fontWeight: 600,
                                                                sx: {
                                                                    color: themeMode === 'light' ? 'primary.main' : 'inherit'
                                                                },
                                                                children: "Light Mode"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/settings/page.tsx",
                                                                lineNumber: 237,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 235,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        sx: {
                                                            ml: 4.5
                                                        },
                                                        children: "Always use light theme"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/settings/page.tsx",
                                                lineNumber: 234,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/settings/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/settings/page.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: {
                                            xs: 12,
                                            sm: 4
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassButton"], {
                                            onClick: ()=>setThemeMode('dark'),
                                            fullWidth: true,
                                            selected: themeMode === 'dark',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    textAlign: 'left',
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        sx: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1.5,
                                                            mb: 0.5
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$DarkModeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                sx: {
                                                                    fontSize: 20,
                                                                    color: themeMode === 'dark' ? 'primary.main' : 'text.secondary'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/settings/page.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                variant: "body1",
                                                                fontWeight: 600,
                                                                sx: {
                                                                    color: themeMode === 'dark' ? 'primary.main' : 'inherit'
                                                                },
                                                                children: "Dark Mode"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/settings/page.tsx",
                                                                lineNumber: 256,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        sx: {
                                                            ml: 4.5
                                                        },
                                                        children: "Always use dark theme"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/settings/page.tsx",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/settings/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/settings/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: {
                                            xs: 12,
                                            sm: 4
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassButton"], {
                                            onClick: ()=>setThemeMode('system'),
                                            fullWidth: true,
                                            selected: themeMode === 'system',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    textAlign: 'left',
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        sx: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1.5,
                                                            mb: 0.5
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LaptopOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                sx: {
                                                                    fontSize: 20,
                                                                    color: themeMode === 'system' ? 'primary.main' : 'text.secondary'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/settings/page.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                variant: "body1",
                                                                fontWeight: 600,
                                                                sx: {
                                                                    color: themeMode === 'system' ? 'primary.main' : 'inherit'
                                                                },
                                                                children: "System"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/app/settings/page.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        sx: {
                                                            ml: 4.5
                                                        },
                                                        children: [
                                                            "Currently: ",
                                                            actualTheme
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/settings/page.tsx",
                                                lineNumber: 272,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/settings/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/settings/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/settings/page.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            mb: 3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "h6",
                                sx: {
                                    mb: 2,
                                    fontWeight: 600
                                },
                                children: "Visual Style"
                            }, void 0, false, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 289,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "body2",
                                color: "text.secondary",
                                sx: {
                                    mb: 3
                                },
                                children: "Choose your preferred interface style. Each preset changes the overall look and feel."
                            }, void 0, false, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                container: true,
                                spacing: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: {
                                            xs: 12,
                                            md: 4
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassButton"], {
                                            onClick: ()=>setVisualPreset('classic'),
                                            fullWidth: true,
                                            selected: visualPreset === 'classic',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    textAlign: 'left',
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "body1",
                                                        fontWeight: 600,
                                                        sx: {
                                                            mb: 0.5,
                                                            color: visualPreset === 'classic' ? 'primary.main' : 'inherit'
                                                        },
                                                        children: "Classic"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        children: "Solid backgrounds, standard MUI look. Best for accessibility."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/settings/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/settings/page.tsx",
                                            lineNumber: 297,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/settings/page.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: {
                                            xs: 12,
                                            md: 4
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassButton"], {
                                            onClick: ()=>setVisualPreset('glass'),
                                            fullWidth: true,
                                            selected: visualPreset === 'glass',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    textAlign: 'left',
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "body1",
                                                        fontWeight: 600,
                                                        sx: {
                                                            mb: 0.5,
                                                            color: visualPreset === 'glass' ? 'primary.main' : 'inherit'
                                                        },
                                                        children: "Glassmorphism"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        children: "Transparent with blur effect. Modern and clean."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/settings/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/settings/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/settings/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: {
                                            xs: 12,
                                            md: 4
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassButton"], {
                                            onClick: ()=>setVisualPreset('liquidGlass'),
                                            fullWidth: true,
                                            selected: visualPreset === 'liquidGlass',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    textAlign: 'left',
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "body1",
                                                        fontWeight: 600,
                                                        sx: {
                                                            mb: 0.5,
                                                            color: visualPreset === 'liquidGlass' ? 'primary.main' : 'inherit'
                                                        },
                                                        children: "Liquid Glass ✨"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        children: "Premium feel with gradient shine and animations."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/settings/page.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/settings/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/settings/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/settings/page.tsx",
                                        lineNumber: 328,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/settings/page.tsx",
                                lineNumber: 295,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/app/settings/page.tsx",
                        lineNumber: 288,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/settings/page.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/settings/page.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s1(SettingsPage, "dPHZKwDAPtpIQ+mLFS3YavRugwk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$providers$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"]
    ];
});
_c1 = SettingsPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "GitHubIntegrationTab");
__turbopack_context__.k.register(_c1, "SettingsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-pv.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePVCs",
    ()=>usePVCs,
    "usePVs",
    ()=>usePVs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function usePVs() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePVs.useModeStore[mode]": (state)=>state.mode
    }["usePVs.useModeStore[mode]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'pvs',
            mode
        ],
        queryFn: {
            "usePVs.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "usePVs.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["usePVs.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockPVs"])();
                }
                const response = await fetch('/api/pvs');
                if (!response.ok) throw new Error('Failed to fetch PersistentVolumes');
                return response.json();
            }
        }["usePVs.useQuery"]
    });
}
_s(usePVs, "HlFC3hcyvIiWAmnytDgkHu9SaHg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function usePVCs() {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "usePVCs.useModeStore[mode]": (state)=>state.mode
    }["usePVCs.useModeStore[mode]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'pvcs',
            mode
        ],
        queryFn: {
            "usePVCs.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "usePVCs.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["usePVCs.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockPVCs"])();
                }
                const response = await fetch('/api/pvcs');
                if (!response.ok) throw new Error('Failed to fetch PersistentVolumeClaims');
                return response.json();
            }
        }["usePVCs.useQuery"]
    });
}
_s1(usePVCs, "HlFC3hcyvIiWAmnytDgkHu9SaHg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/pv/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PersistentVolumesPage
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tabs$2f$Tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tabs/Tabs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tab/Tab.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$pv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-pv.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-auto-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/table-skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/error-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/sortable-table-cell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/empty-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-table-sort.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/contexts/search-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/status-badge.tsx [app-client] (ecmascript)");
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
function PersistentVolumesPage() {
    _s();
    const searchQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"])('Search...');
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const { data: pvs, isLoading: pvsLoading, error: pvsError, refetch: refetchPVs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$pv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePVs"])();
    const { data: pvcs, isLoading: pvcsLoading, error: pvcsError, refetch: refetchPVCs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$pv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePVCs"])();
    // Auto-refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"])({
        "PersistentVolumesPage.useAutoRefresh": ()=>{
            refetchPVs();
            refetchPVCs();
        }
    }["PersistentVolumesPage.useAutoRefresh"]);
    const filteredPVs = pvs?.filter((pv)=>pv.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];
    const filteredPVCs = pvcs?.filter((pvc)=>pvc.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];
    const { sortedData: sortedPVs, sortField: pvSortField, sortOrder: pvSortOrder, handleSort: handlePVSort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"])(filteredPVs, 'name', 'asc');
    const { sortedData: sortedPVCs, sortField: pvcSortField, sortOrder: pvcSortOrder, handleSort: handlePVCSort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"])(filteredPVCs, 'name', 'asc');
    const isLoading = tab === 0 ? pvsLoading : pvcsLoading;
    const error = tab === 0 ? pvsError : pvcsError;
    const refetch = tab === 0 ? refetchPVs : refetchPVCs;
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Persistent Volumes",
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/pv/page.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableSkeleton"], {
                    rows: 5,
                    columns: 5
                }, void 0, false, {
                    fileName: "[project]/app/app/pv/page.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/pv/page.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Persistent Volumes",
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/pv/page.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorState"], {
                    error: error,
                    onRetry: ()=>refetch(),
                    title: "Failed to Load Persistent Volumes"
                }, void 0, false, {
                    fileName: "[project]/app/app/pv/page.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/pv/page.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Persistent Volumes",
                subtitle: tab === 0 ? `${pvs?.length || 0} PersistentVolume${pvs?.length === 1 ? '' : 's'}` : `${pvcs?.length || 0} PersistentVolumeClaim${pvcs?.length === 1 ? '' : 's'} in this namespace`,
                onRefresh: refetch,
                isRefreshing: isLoading
            }, void 0, false, {
                fileName: "[project]/app/app/pv/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    borderBottom: 1,
                    borderColor: 'divider',
                    mb: 3
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tabs$2f$Tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    value: tab,
                    onChange: (_, v)=>setTab(v),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: `PersistentVolumes (${pvs?.length || 0})`
                        }, void 0, false, {
                            fileName: "[project]/app/app/pv/page.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: `PersistentVolumeClaims (${pvcs?.length || 0})`
                        }, void 0, false, {
                            fileName: "[project]/app/app/pv/page.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/pv/page.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/pv/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            tab === 0 ? // PersistentVolumes tab
            !pvs || pvs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No PersistentVolumes found",
                description: "There are no PersistentVolumes in the cluster."
            }, void 0, false, {
                fileName: "[project]/app/app/pv/page.tsx",
                lineNumber: 104,
                columnNumber: 11
            }, this) : filteredPVs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No matching PersistentVolumes",
                description: `No PersistentVolumes match "${searchQuery}". Try adjusting your search.`
            }, void 0, false, {
                fileName: "[project]/app/app/pv/page.tsx",
                lineNumber: 110,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "name",
                                        label: "Name",
                                        sortField: pvSortField,
                                        sortOrder: pvSortOrder,
                                        onSort: handlePVSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "status",
                                        label: "Status",
                                        sortField: pvSortField,
                                        sortOrder: pvSortOrder,
                                        onSort: handlePVSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "capacity",
                                        label: "Capacity",
                                        sortField: pvSortField,
                                        sortOrder: pvSortOrder,
                                        onSort: handlePVSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "Access Modes"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "reclaimPolicy",
                                        label: "Reclaim Policy",
                                        sortField: pvSortField,
                                        sortOrder: pvSortOrder,
                                        onSort: handlePVSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "storageClass",
                                        label: "Storage Class",
                                        sortField: pvSortField,
                                        sortOrder: pvSortOrder,
                                        onSort: handlePVSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "Claim"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "age",
                                        label: "Age",
                                        sortField: pvSortField,
                                        sortOrder: pvSortOrder,
                                        onSort: handlePVSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/pv/page.tsx",
                                lineNumber: 119,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/pv/page.tsx",
                            lineNumber: 118,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: sortedPVs.map((pv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    hover: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pv.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                status: pv.status
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/pv/page.tsx",
                                                lineNumber: 171,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 170,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pv.capacity
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pv.accessModes.join(', ')
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pv.reclaimPolicy
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pv.storageClass
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 176,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pv.claim || '-'
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 177,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pv.age
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, pv.name, true, {
                                    fileName: "[project]/app/app/pv/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/app/pv/page.tsx",
                            lineNumber: 166,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/pv/page.tsx",
                    lineNumber: 117,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/pv/page.tsx",
                lineNumber: 116,
                columnNumber: 11
            }, this) : // PersistentVolumeClaims tab
            !pvcs || pvcs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No PersistentVolumeClaims found",
                description: "There are no PersistentVolumeClaims in this namespace."
            }, void 0, false, {
                fileName: "[project]/app/app/pv/page.tsx",
                lineNumber: 188,
                columnNumber: 11
            }, this) : filteredPVCs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No matching PersistentVolumeClaims",
                description: `No PersistentVolumeClaims match "${searchQuery}". Try adjusting your search.`
            }, void 0, false, {
                fileName: "[project]/app/app/pv/page.tsx",
                lineNumber: 194,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "name",
                                        label: "Name",
                                        sortField: pvcSortField,
                                        sortOrder: pvcSortOrder,
                                        onSort: handlePVCSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "namespace",
                                        label: "Namespace",
                                        sortField: pvcSortField,
                                        sortOrder: pvcSortOrder,
                                        onSort: handlePVCSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "status",
                                        label: "Status",
                                        sortField: pvcSortField,
                                        sortOrder: pvcSortOrder,
                                        onSort: handlePVCSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "volume",
                                        label: "Volume",
                                        sortField: pvcSortField,
                                        sortOrder: pvcSortOrder,
                                        onSort: handlePVCSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "capacity",
                                        label: "Capacity",
                                        sortField: pvcSortField,
                                        sortOrder: pvcSortOrder,
                                        onSort: handlePVCSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "Access Modes"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "storageClass",
                                        label: "Storage Class",
                                        sortField: pvcSortField,
                                        sortOrder: pvcSortOrder,
                                        onSort: handlePVCSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "age",
                                        label: "Age",
                                        sortField: pvcSortField,
                                        sortOrder: pvcSortOrder,
                                        onSort: handlePVCSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/pv/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/pv/page.tsx",
                                lineNumber: 203,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/pv/page.tsx",
                            lineNumber: 202,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: sortedPVCs.map((pvc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    hover: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pvc.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 259,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pvc.namespace
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 260,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                status: pvc.status
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/pv/page.tsx",
                                                lineNumber: 262,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pvc.volume
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 264,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pvc.capacity
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 265,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pvc.accessModes.join(', ')
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 266,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pvc.storageClass
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: pvc.age
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/pv/page.tsx",
                                            lineNumber: 268,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, pvc.name, true, {
                                    fileName: "[project]/app/app/pv/page.tsx",
                                    lineNumber: 258,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/app/pv/page.tsx",
                            lineNumber: 256,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/pv/page.tsx",
                    lineNumber: 201,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/pv/page.tsx",
                lineNumber: 200,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/pv/page.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(PersistentVolumesPage, "tDDzYh6/IN3BZ+FIS4EiRcQ8ndc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$pv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePVs"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$pv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePVCs"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"]
    ];
});
_c = PersistentVolumesPage;
var _c;
__turbopack_context__.k.register(_c, "PersistentVolumesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-hpa.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHPA",
    ()=>useHPA,
    "useHPAs",
    ()=>useHPAs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/mocks/data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function useHPAs() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useHPAs.useModeStore[mode]": (state)=>state.mode
    }["useHPAs.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useHPAs.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useHPAs.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useHPAs.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useHPAs.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'hpas',
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useHPAs.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useHPAs.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useHPAs.useQuery"]);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockHPAs"])();
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/hpa?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch HPAs');
                return response.json();
            }
        }["useHPAs.useQuery"],
        enabled: mode === 'demo' || !!namespace
    });
}
_s(useHPAs, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useHPA(name) {
    _s1();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useHPA.useModeStore[mode]": (state)=>state.mode
    }["useHPA.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useHPA.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useHPA.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useHPA.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useHPA.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'hpa',
            name,
            mode,
            namespace,
            selectedContext?.name || ''
        ],
        queryFn: {
            "useHPA.useQuery": async ()=>{
                if (mode === 'demo') {
                    await new Promise({
                        "useHPA.useQuery": (resolve)=>setTimeout(resolve, 200)
                    }["useHPA.useQuery"]);
                    const hpas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$mocks$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockHPAs"])();
                    const hpa = hpas.find({
                        "useHPA.useQuery.hpa": (h)=>h.name === name
                    }["useHPA.useQuery.hpa"]);
                    if (!hpa) throw new Error('HPA not found');
                    return hpa;
                }
                if (!namespace) {
                    throw new Error('Namespace is required');
                }
                const response = await fetch(`/api/hpa/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`);
                if (!response.ok) throw new Error('Failed to fetch HPA');
                return response.json();
            }
        }["useHPA.useQuery"],
        enabled: !!name && (mode === 'demo' || !!namespace)
    });
}
_s1(useHPA, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
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
"[project]/app/app/hpa/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HPAPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Table/Table.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableBody/TableBody.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableCell/TableCell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableContainer/TableContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableHead/TableHead.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableRow/TableRow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/LinearProgress/LinearProgress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$TrendingUp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/TrendingUp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$hpa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-hpa.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-auto-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/table-skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/error-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/sortable-table-cell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/empty-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-table-sort.ts [app-client] (ecmascript)");
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
function HPAPage() {
    _s();
    const searchQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"])('Search HPAs...');
    const { data: hpas, isLoading, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$hpa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHPAs"])();
    // Auto-refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"])(refetch);
    const filteredHPAs = hpas?.filter((hpa)=>hpa.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];
    const { sortedData, sortField, sortOrder, handleSort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"])(filteredHPAs, 'name', 'asc');
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "HPA (Horizontal Pod Autoscaler)",
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/hpa/page.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableSkeleton"], {
                    rows: 6,
                    columns: 7
                }, void 0, false, {
                    fileName: "[project]/app/app/hpa/page.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/hpa/page.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "HPA (Horizontal Pod Autoscaler)",
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/hpa/page.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorState"], {
                    error: error,
                    onRetry: ()=>refetch(),
                    title: "Failed to Load HPAs"
                }, void 0, false, {
                    fileName: "[project]/app/app/hpa/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/hpa/page.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "HPA (Horizontal Pod Autoscaler)",
                subtitle: `${hpas?.length || 0} HPA${hpas?.length === 1 ? '' : 's'} in this namespace`,
                onRefresh: refetch,
                isRefreshing: isLoading
            }, void 0, false, {
                fileName: "[project]/app/app/hpa/page.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            !hpas || hpas.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$TrendingUp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No HPAs found",
                description: "There are no Horizontal Pod Autoscalers in this namespace."
            }, void 0, false, {
                fileName: "[project]/app/app/hpa/page.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this) : filteredHPAs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$TrendingUp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No matching HPAs",
                description: `No HPAs match "${searchQuery}". Try adjusting your search.`
            }, void 0, false, {
                fileName: "[project]/app/app/hpa/page.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "name",
                                        label: "Name",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/hpa/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "namespace",
                                        label: "Namespace",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/hpa/page.tsx",
                                        lineNumber: 93,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "Target"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/hpa/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "minReplicas",
                                        label: "Min Replicas",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/hpa/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "maxReplicas",
                                        label: "Max Replicas",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/hpa/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "currentReplicas",
                                        label: "Current / Desired",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/hpa/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "CPU Utilization"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/hpa/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "age",
                                        label: "Age",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/hpa/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/hpa/page.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/hpa/page.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: sortedData.map((hpa)=>{
                                const cpuMetric = hpa.metrics.find((m)=>m.type === 'Resource' && m.resource?.name === 'cpu');
                                const cpuCurrent = cpuMetric?.resource?.current?.averageUtilization || 0;
                                const cpuTarget = cpuMetric?.resource?.target?.averageUtilization || 100;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    hover: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: hpa.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/hpa/page.tsx",
                                            lineNumber: 142,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: hpa.namespace
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/hpa/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: [
                                                hpa.targetRef.kind,
                                                "/",
                                                hpa.targetRef.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/hpa/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: hpa.minReplicas
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/hpa/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: hpa.maxReplicas
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/hpa/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: [
                                                hpa.currentReplicas,
                                                " / ",
                                                hpa.desiredReplicas
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/app/hpa/page.tsx",
                                            lineNumber: 149,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        sx: {
                                                            width: 100
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            variant: "determinate",
                                                            value: Math.min(cpuCurrent / cpuTarget * 100, 100),
                                                            color: cpuCurrent > cpuTarget ? 'warning' : 'primary'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/app/hpa/page.tsx",
                                                            lineNumber: 155,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/hpa/page.tsx",
                                                        lineNumber: 154,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "body2",
                                                        children: [
                                                            cpuCurrent,
                                                            "% / ",
                                                            cpuTarget,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/app/hpa/page.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/app/hpa/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/hpa/page.tsx",
                                            lineNumber: 152,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: hpa.age
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/hpa/page.tsx",
                                            lineNumber: 166,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, hpa.name, true, {
                                    fileName: "[project]/app/app/hpa/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/app/hpa/page.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/hpa/page.tsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/hpa/page.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/hpa/page.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(HPAPage, "wQV3tygiYZgfXusBchwz/fMVmYs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$hpa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHPAs"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"]
    ];
});
_c = HPAPage;
var _c;
__turbopack_context__.k.register(_c, "HPAPage");
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
"[project]/app/app/events/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventsPage
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$EventNote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/EventNote.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$dashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-dashboard.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-auto-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/table-skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/error-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/sortable-table-cell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/empty-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-table-sort.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/contexts/search-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/status-badge.tsx [app-client] (ecmascript)");
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
function EventsPage() {
    _s();
    const searchQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"])('Search events...');
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [timeRange, setTimeRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(24) // Time range in hours
    ;
    const { data: events, isLoading, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$dashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecentEvents"])(timeRange);
    // Auto-refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"])(refetch);
    const filteredEvents = events?.filter((event)=>{
        if (typeFilter && event.type !== typeFilter) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return event.name.toLowerCase().includes(query) || event.reason.toLowerCase().includes(query) || event.message.toLowerCase().includes(query) || event.kind.toLowerCase().includes(query);
        }
        return true;
    }) || [];
    const { sortedData, sortField, sortOrder, handleSort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"])(filteredEvents, 'lastTimestamp', 'desc');
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Events",
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/events/page.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$table$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableSkeleton"], {
                    rows: 10,
                    columns: 6
                }, void 0, false, {
                    fileName: "[project]/app/app/events/page.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/events/page.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Events",
                    onRefresh: refetch
                }, void 0, false, {
                    fileName: "[project]/app/app/events/page.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorState"], {
                    error: error,
                    onRetry: ()=>refetch(),
                    title: "Failed to Load Events"
                }, void 0, false, {
                    fileName: "[project]/app/app/events/page.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/events/page.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Events",
                subtitle: `${events?.length || 0} event${events?.length === 1 ? '' : 's'} in the last ${timeRange} hour${timeRange === 1 ? '' : 's'}`,
                onRefresh: refetch,
                isRefreshing: isLoading,
                filters: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            size: "small",
                            sx: {
                                minWidth: 150
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    children: "Type"
                                }, void 0, false, {
                                    fileName: "[project]/app/app/events/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: typeFilter,
                                    label: "Type",
                                    onChange: (e)=>setTypeFilter(e.target.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: "",
                                            children: "All Types"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 94,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: "Normal",
                                            children: "Normal"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: "Warning",
                                            children: "Warning"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 96,
                                            columnNumber: 17
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/events/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/events/page.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            size: "small",
                            sx: {
                                minWidth: 150
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    children: "Time Range"
                                }, void 0, false, {
                                    fileName: "[project]/app/app/events/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: timeRange,
                                    label: "Time Range",
                                    onChange: (e)=>setTimeRange(e.target.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: 1,
                                            children: "Last 1 Hour"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: 6,
                                            children: "Last 6 Hours"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: 12,
                                            children: "Last 12 Hours"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: 24,
                                            children: "Last 24 Hours"
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 17
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/app/events/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/app/events/page.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/app/events/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            !events || events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$EventNote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No events found",
                description: `No events found in the last ${timeRange} hour${timeRange === 1 ? '' : 's'}.`
            }, void 0, false, {
                fileName: "[project]/app/app/events/page.tsx",
                lineNumber: 117,
                columnNumber: 9
            }, this) : filteredEvents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$EventNote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                title: "No matching events",
                description: searchQuery ? `No events match "${searchQuery}". Try adjusting your search or filters.` : 'No events match your filters. Try adjusting them.',
                action: {
                    label: 'Clear filters',
                    onClick: ()=>{
                        setTypeFilter('');
                    }
                }
            }, void 0, false, {
                fileName: "[project]/app/app/events/page.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "type",
                                        label: "Type",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/events/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "reason",
                                        label: "Reason",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/events/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "kind",
                                        label: "Kind",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/events/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "name",
                                        label: "Name",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/events/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: "Message"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/events/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "count",
                                        label: "Count",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/events/page.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$sortable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableTableCell"], {
                                        field: "lastTimestamp",
                                        label: "Age",
                                        sortField: sortField,
                                        sortOrder: sortOrder,
                                        onSort: handleSort
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/events/page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/events/page.tsx",
                                lineNumber: 141,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/app/events/page.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: sortedData.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    hover: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                status: event.type
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/events/page.tsx",
                                                lineNumber: 191,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: event.reason
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: event.kind
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: event.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                maxWidth: 400
                                            },
                                            children: event.message
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 196,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: event.count
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 199,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAge"])(event.lastTimestamp)
                                        }, void 0, false, {
                                            fileName: "[project]/app/app/events/page.tsx",
                                            lineNumber: 200,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/app/app/events/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/app/events/page.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/events/page.tsx",
                    lineNumber: 139,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/events/page.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/events/page.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(EventsPage, "J5YW8+UmqBPelkwgjf5gt+FAO3s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$dashboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecentEvents"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$auto$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoRefresh"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$table$2d$sort$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortableTable"]
    ];
});
_c = EventsPage;
var _c;
__turbopack_context__.k.register(_c, "EventsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/hooks/use-labels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLabels",
    ()=>useLabels
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/core/store.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useLabels(selector) {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useLabels.useModeStore[mode]": (state)=>state.mode
    }["useLabels.useModeStore[mode]"]);
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useLabels.useModeStore[namespace]": (state)=>state.selectedNamespace
    }["useLabels.useModeStore[namespace]"]);
    const selectedContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$core$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModeStore"])({
        "useLabels.useModeStore[selectedContext]": (state)=>state.selectedContext
    }["useLabels.useModeStore[selectedContext]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'labels',
            mode,
            namespace,
            selectedContext?.name || '',
            selector || ''
        ],
        queryFn: {
            "useLabels.useQuery": async ()=>{
                if (mode === 'demo') {
                    // Return mock label data
                    await new Promise({
                        "useLabels.useQuery": (resolve)=>setTimeout(resolve, 300)
                    }["useLabels.useQuery"]);
                    return {
                        labels: [
                            {
                                key: 'app',
                                values: [
                                    {
                                        value: 'nginx',
                                        count: 15
                                    },
                                    {
                                        value: 'redis',
                                        count: 8
                                    },
                                    {
                                        value: 'postgres',
                                        count: 5
                                    }
                                ],
                                totalCount: 28,
                                resourceTypes: [
                                    'Deployment',
                                    'Pod',
                                    'Service'
                                ]
                            },
                            {
                                key: 'environment',
                                values: [
                                    {
                                        value: 'production',
                                        count: 12
                                    },
                                    {
                                        value: 'staging',
                                        count: 8
                                    },
                                    {
                                        value: 'development',
                                        count: 6
                                    }
                                ],
                                totalCount: 26,
                                resourceTypes: [
                                    'Deployment',
                                    'Pod',
                                    'Service',
                                    'ConfigMap'
                                ]
                            },
                            {
                                key: 'version',
                                values: [
                                    {
                                        value: 'v1.0.0',
                                        count: 10
                                    },
                                    {
                                        value: 'v2.0.0',
                                        count: 8
                                    },
                                    {
                                        value: 'v1.5.0',
                                        count: 4
                                    }
                                ],
                                totalCount: 22,
                                resourceTypes: [
                                    'Deployment',
                                    'Pod'
                                ]
                            },
                            {
                                key: 'tier',
                                values: [
                                    {
                                        value: 'frontend',
                                        count: 9
                                    },
                                    {
                                        value: 'backend',
                                        count: 7
                                    },
                                    {
                                        value: 'database',
                                        count: 3
                                    }
                                ],
                                totalCount: 19,
                                resourceTypes: [
                                    'Deployment',
                                    'Service',
                                    'Pod'
                                ]
                            },
                            {
                                key: 'component',
                                values: [
                                    {
                                        value: 'api',
                                        count: 6
                                    },
                                    {
                                        value: 'worker',
                                        count: 5
                                    },
                                    {
                                        value: 'cache',
                                        count: 4
                                    }
                                ],
                                totalCount: 15,
                                resourceTypes: [
                                    'Deployment',
                                    'Pod',
                                    'ConfigMap'
                                ]
                            }
                        ],
                        resources: [],
                        totalResources: 89
                    };
                }
                const params = new URLSearchParams({
                    namespace,
                    context: selectedContext?.name || ''
                });
                if (selector) {
                    params.append('selector', selector);
                }
                const response = await fetch(`/api/labels?${params}`);
                if (!response.ok) throw new Error('Failed to fetch labels');
                return response.json();
            }
        }["useLabels.useQuery"]
    });
}
_s(useLabels, "Nv2xfn4ud2QWvFtZ9G+BeGnTayo=", false, function() {
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
"[project]/app/app/components/common/detail-skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DetailSkeleton",
    ()=>DetailSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Skeleton/Skeleton.js [app-client] (ecmascript) <export default as Skeleton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript)");
;
;
;
function DetailSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                        variant: "text",
                        width: 200,
                        height: 48
                    }, void 0, false, {
                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        display: "flex",
                        gap: 1,
                        mt: 2,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                p: 3,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    container: true,
                    spacing: 3,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            size: {
                                xs: 12,
                                md: 6
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                sx: {
                                    p: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                        children: Array.from({
                                            length: 4
                                        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                                                        variant: "text",
                                                        width: 80,
                                                        height: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/app/components/common/detail-skeleton.tsx",
                                                        lineNumber: 30,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            size: {
                                xs: 12,
                                md: 6
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                sx: {
                                    p: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        children: Array.from({
                                            length: 3
                                        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            size: 12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                sx: {
                                    p: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Skeleton$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
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
_c = DetailSkeleton;
var _c;
__turbopack_context__.k.register(_c, "DetailSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/app/labels/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LabelsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Label.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/page-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/dist/components/GlassPanel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/hooks/use-labels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$detail$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/detail-skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/app/components/common/error-state.tsx [app-client] (ecmascript)");
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
function LabelsPage() {
    _s();
    const [selector, setSelector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const searchQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"])('Search labels...');
    const { data, isLoading, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabels"])(selector);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$detail$2d$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DetailSkeleton"], {}, void 0, false, {
            fileName: "[project]/app/app/labels/page.tsx",
            lineNumber: 22,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Labels"
                }, void 0, false, {
                    fileName: "[project]/app/app/labels/page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$error$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorState"], {
                    error: error,
                    onRetry: refetch,
                    title: "Failed to Load Labels"
                }, void 0, false, {
                    fileName: "[project]/app/app/labels/page.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/app/labels/page.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this);
    }
    // Filter labels based on search query
    const filteredLabels = data?.labels.filter((label)=>label.key.toLowerCase().includes(searchQuery.toLowerCase()) || label.values.some((v)=>v.value.toLowerCase().includes(searchQuery.toLowerCase()))) || [];
    const handleSelectorSubmit = (e)=>{
        e.preventDefault();
        const form = e.target;
        const input = form.elements.namedItem('selector');
        setSelector(input.value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$app$2f$components$2f$common$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Labels",
                subtitle: `${data?.totalResources || 0} resources • ${data?.labels.length || 0} unique labels`,
                onRefresh: refetch
            }, void 0, false, {
                fileName: "[project]/app/app/labels/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassPanel"], {
                sx: {
                    mb: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "body2",
                        color: "text.secondary",
                        sx: {
                            mb: 2
                        },
                        children: "Filter resources using Kubernetes label selector syntax"
                    }, void 0, false, {
                        fileName: "[project]/app/app/labels/page.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSelectorSubmit,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            name: "selector",
                            fullWidth: true,
                            placeholder: "app=nginx,environment=production",
                            defaultValue: selector,
                            size: "small"
                        }, void 0, false, {
                            fileName: "[project]/app/app/labels/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/labels/page.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    selector && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            mt: 2
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: selector,
                            onDelete: ()=>setSelector(''),
                            color: "primary",
                            size: "small"
                        }, void 0, false, {
                            fileName: "[project]/app/app/labels/page.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/app/labels/page.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/app/labels/page.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            filteredLabels.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                },
                children: filteredLabels.map((labelGroup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassPanel"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                fontSize: "small",
                                                color: "primary"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/labels/page.tsx",
                                                lineNumber: 92,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "body1",
                                                fontWeight: 600,
                                                children: labelGroup.key
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/labels/page.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/labels/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            display: 'flex',
                                            gap: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: `${labelGroup.totalCount} resources`,
                                                size: "small",
                                                variant: "outlined"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/labels/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: `${labelGroup.values.length} values`,
                                                size: "small",
                                                variant: "outlined"
                                            }, void 0, false, {
                                                fileName: "[project]/app/app/labels/page.tsx",
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/app/labels/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/labels/page.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    mb: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        sx: {
                                            mb: 0.5
                                        },
                                        children: "Resource Types"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/labels/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                            mt: 0.5
                                        },
                                        children: labelGroup.resourceTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: type,
                                                size: "small"
                                            }, type, false, {
                                                fileName: "[project]/app/app/labels/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/labels/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/labels/page.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        sx: {
                                            mb: 0.5
                                        },
                                        children: "Values"
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/labels/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                            mt: 0.5
                                        },
                                        children: labelGroup.values.map(({ value, count })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: `${value} (${count})`,
                                                size: "small",
                                                color: "primary",
                                                variant: "outlined",
                                                onClick: ()=>setSelector(`${labelGroup.key}=${value}`),
                                                sx: {
                                                    cursor: 'pointer'
                                                }
                                            }, value, false, {
                                                fileName: "[project]/app/app/labels/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/app/labels/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/app/labels/page.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this)
                        ]
                    }, labelGroup.key, true, {
                        fileName: "[project]/app/app/labels/page.tsx",
                        lineNumber: 89,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/app/labels/page.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$dist$2f$components$2f$GlassPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassPanel"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        textAlign: 'center',
                        py: 8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                fontSize: 64,
                                opacity: 0.3,
                                mb: 2
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/app/labels/page.tsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "h6",
                            gutterBottom: true,
                            children: "No labels found"
                        }, void 0, false, {
                            fileName: "[project]/app/app/labels/page.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "body2",
                            color: "text.secondary",
                            children: searchQuery ? 'Try a different search query' : 'No labels are available in this namespace'
                        }, void 0, false, {
                            fileName: "[project]/app/app/labels/page.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/app/labels/page.tsx",
                    lineNumber: 151,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/app/labels/page.tsx",
                lineNumber: 150,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/app/labels/page.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(LabelsPage, "+slK6uCobWuOOTUlqCFci1afdCY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$contexts$2f$search$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$hooks$2f$use$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabels"]
    ];
});
_c = LabelsPage;
var _c;
__turbopack_context__.k.register(_c, "LabelsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_2986d66c._.js.map