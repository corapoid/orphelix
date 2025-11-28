# Update Changelog

Automatically update CHANGELOG.md based on recent git commits or manual input.

## Usage

```
/update-changelog
```

or

```
/update-changelog "feat: add services support"
```

## What This Command Does

1. **Analyzes Recent Commits** (if no input provided)
   - Parses git log since last release
   - Groups commits by type (feat, fix, refactor, docs, etc.)
   - Extracts commit messages

2. **Categorizes Changes**
   - `feat:` → ### Added
   - `fix:` → ### Fixed
   - `docs:` → ### Changed (documentation)
   - `refactor:` → ### Changed
   - `perf:` → ### Changed (performance)
   - `BREAKING:` → ### Changed (with warning)
   - `security:` → ### Security

3. **Updates CHANGELOG.md**
   - Adds entries under `## [Unreleased]`
   - Maintains format and structure
   - Preserves existing entries

4. **Validates Format**
   - Ensures proper Markdown format
   - Checks for duplicates
   - Verifies categories exist

## Examples

### Automatic (from git commits)

```bash
/update-changelog

# Analyzes commits and updates CHANGELOG.md
```

### Manual (specific change)

```bash
/update-changelog "fix: resolve memory leak in SSE connection"
```

---

**Command Version:** 1.0.0
**Last Updated:** 2025-11-28
