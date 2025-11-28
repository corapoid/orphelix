# Generate Tests

Generate comprehensive tests for existing code.

## Usage

```
/generate-tests <file-path>
```

## What This Command Does

Uses the **testing-agent** to generate:
1. Unit tests (Vitest)
2. Component tests (React Testing Library)
3. E2E tests (Playwright) if needed

Coverage target: >80%

## Example

```
/generate-tests lib/hooks/use-services.ts
```

Generates `__tests__/lib/hooks/use-services.test.tsx` with:
- Demo mode test
- Real mode test
- Error handling test
- Edge case tests

---

**Command Version:** 1.0.0
**Last Updated:** 2025-11-28
