# Fix Bug

Analyze and fix a reported bug with root cause analysis.

## Usage

```
/fix-bug "description of the bug"
```

or with issue number:

```
/fix-bug #234
```

## What This Command Does

Uses the **bug-fixer agent** to:
1. Analyze the bug and reproduce it
2. Identify root cause
3. Implement fix
4. Add regression test
5. Update CHANGELOG.md

## Example

```
/fix-bug "Pod logs fail to load when rapidly switching between pods"
```

---

**Command Version:** 1.0.0
**Last Updated:** 2025-11-28
