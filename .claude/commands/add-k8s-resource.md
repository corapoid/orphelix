# Add Kubernetes Resource

Add complete support for a new Kubernetes resource type following established patterns.

## Usage

```
/add-k8s-resource <resource-name>
```

## Example

```
/add-k8s-resource services
```

## What This Command Does

1. **Creates TypeScript Types** (`types/kubernetes.ts`)
   - Interface for the resource
   - All required and optional fields

2. **Implements K8s API Functions** (`lib/k8s/api.ts`)
   - `fetch<Resource>s()` - List all resources
   - `fetch<Resource>()` - Get single resource
   - `map<Resource>()` - Transform K8s API response to app format

3. **Creates API Route** (`app/api/<resources>/route.ts`)
   - GET endpoint with namespace filtering
   - Proper error handling
   - NextResponse format

4. **Creates Mock Data** (`lib/mocks/data.ts`)
   - Realistic demo data
   - Multiple examples with varied states

5. **Creates TanStack Query Hook** (`lib/hooks/use-<resources>.ts`)
   - Demo mode support
   - Real mode with API fetching
   - Proper caching and refetch intervals

6. **Creates React Component** (`app/components/<resources>/<resource>-list.tsx`)
   - Loading state
   - Error state
   - Empty state
   - Table with resource data

7. **Creates Page** (`app/<resources>/page.tsx`)
   - PageHeader component
   - List component

8. **Writes Unit Tests** (`__tests__/lib/hooks/use-<resources>.test.tsx`)
   - Demo mode test
   - Real mode test
   - Error handling test

9. **Writes E2E Test** (`tests/e2e/<resources>.spec.ts`)
   - View list test
   - Navigation test

10. **Updates CHANGELOG.md**
    - Adds entry under [Unreleased] → Added section

## Parameters

- `resource-name` (required) - Name of the Kubernetes resource (singular, lowercase)
  - Examples: service, job, cronjob, ingress, daemonset

## Prerequisites

Before running this command:
- [ ] Read [AI_CONTEXT.md](../../AI_CONTEXT.md)
- [ ] Understand the established pattern (check deployments/pods as examples)
- [ ] Verify resource name is correct

## Output

The command will:
1. Generate all necessary files
2. Run tests to verify everything works
3. Report success or any errors

## Verification

After the command completes:

```bash
# Check types compile
npm run type-check

# Check tests pass
npm run test

# Check E2E tests pass
npm run test:e2e

# Check build succeeds
npm run build
```

## Example Workflow

```bash
# User runs command
/add-k8s-resource services

# AI creates all files following the pattern:
# ✅ types/kubernetes.ts (Service interface)
# ✅ lib/k8s/api.ts (fetchServices, mapService)
# ✅ app/api/services/route.ts
# ✅ lib/mocks/data.ts (getMockServices)
# ✅ lib/hooks/use-services.ts
# ✅ app/components/services/service-list.tsx
# ✅ app/services/page.tsx
# ✅ __tests__/lib/hooks/use-services.test.tsx
# ✅ tests/e2e/services.spec.ts
# ✅ CHANGELOG.md updated

# AI runs verification
npm run type-check ✅
npm run test ✅
npm run build ✅

# Report success
✅ Services support added successfully!

Files created:
- types/kubernetes.ts (Service interface)
- lib/k8s/api.ts (fetchServices, fetchService, mapService)
- app/api/services/route.ts
- lib/mocks/data.ts (getMockServices)
- lib/hooks/use-services.ts
- app/components/services/service-list.tsx
- app/services/page.tsx
- __tests__/lib/hooks/use-services.test.tsx
- tests/e2e/services.spec.ts

Next steps:
1. Test manually: npm run dev → http://localhost:3000/services
2. Review generated code
3. Commit changes: git add . && git commit -m "feat: add services support"
```

## Related Commands

- `/update-changelog` - Update CHANGELOG.md manually
- `/generate-types` - Generate TypeScript types from K8s API
- `/run-tests` - Run all tests

## Notes

- This command uses the **feature-implementer agent**
- All code follows established patterns
- Tests are included and must pass
- Documentation is auto-generated

## Troubleshooting

**Command fails:**
1. Check resource name is valid Kubernetes resource
2. Verify similar resource exists (use as template)
3. Check network connection (for real mode testing)

**Tests fail:**
1. Review error messages
2. Check generated code
3. Verify mocks are realistic

**Build fails:**
1. Check TypeScript errors: `npm run type-check`
2. Fix any type issues
3. Re-run build

---

**Command Version:** 1.0.0
**Last Updated:** 2025-11-28
