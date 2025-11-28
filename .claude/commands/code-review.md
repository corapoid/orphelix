# Code Review

Perform comprehensive code review on current changes or specific PR.

## Usage

```
/code-review
```

or for specific PR:

```
/code-review PR#123
```

## What This Command Does

Uses the **code-reviewer agent** to review:
1. Architecture & design
2. TypeScript type safety
3. Error handling
4. Security issues
5. Performance
6. Testing coverage
7. Code quality
8. Documentation

Provides prioritized feedback:
- 🔴 **REQUIRED** - Must fix before merge
- 🟡 **RECOMMENDED** - Should fix
- 🟢 **OPTIONAL** - Nice to have

---

**Command Version:** 1.0.0
**Last Updated:** 2025-11-28
