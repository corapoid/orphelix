# Refactor Code

Identify and perform refactoring opportunities to improve code quality.

## Usage

```
/refactor <file-path>
```

or analyze entire codebase:

```
/refactor --analyze
```

## What This Command Does

Uses the **refactoring-specialist agent** to:
1. Identify code smells (long functions, duplication, deep nesting)
2. Create refactoring plan
3. Implement refactoring step-by-step
4. Verify all tests still pass
5. Update documentation

## Example

```
/refactor lib/k8s/api.ts
```

Splits large file into focused modules while maintaining all functionality.

---

**Command Version:** 1.0.0
**Last Updated:** 2025-11-28
