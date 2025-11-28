# Git Hooks for Orphelix

Git hooks to ensure code quality and consistency with AI integration.

## Installation

```bash
# Configure Git to use .githooks directory
git config core.hooksPath .githooks

# Make hooks executable
chmod +x .githooks/*
```

## Available Hooks

### pre-commit

Runs before each commit to ensure code quality.

**Checks:**
- ✅ ESLint (code style and errors)
- ✅ TypeScript type checking
- ✅ Unit tests (all must pass)
- ⚠️ console.log statements (warning)
- ⚠️ TODO/FIXME comments (warning)
- ⚠️ Large files >1MB (warning)
- 🤖 AI code review (optional, disabled by default)

**To enable AI code review:**
1. Edit `.githooks/pre-commit`
2. Uncomment the "AI Code Review" section
3. Configure your AI service (Claude Code, GitHub Copilot, etc.)

**Bypass hook (NOT RECOMMENDED):**
```bash
git commit --no-verify
```

### commit-msg

Validates commit message format.

**Format:**
```
type(scope): description

Extended description (optional)

Closes #issue-number (optional)
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style
- `refactor` - Refactoring
- `perf` - Performance
- `test` - Tests
- `chore` - Maintenance
- `security` - Security fix

**Examples:**
```bash
git commit -m "feat(services): add Kubernetes services support"
git commit -m "fix(logs): resolve race condition in pod logs"
git commit -m "docs(readme): update installation guide"
```

### post-commit

Runs after successful commit.

**Actions:**
- ✅ Shows commit info
- 💡 Reminds to update CHANGELOG.md (if needed)
- 📊 Shows repository statistics
- 🤖 Auto-update CHANGELOG (optional, disabled by default)

**To enable auto-update CHANGELOG:**
1. Edit `.githooks/post-commit`
2. Uncomment the `/update-changelog` line

## Configuration

### Disable specific check

Edit `.githooks/pre-commit` and comment out the check:

```bash
# # 1. Lint check
# echo ""
# echo "📝 Running ESLint..."
# if npm run lint --silent; then
#     echo -e "${GREEN}✅ Lint passed${NC}"
# else
#     echo -e "${RED}❌ Lint failed${NC}"
#     FAILED=1
# fi
```

### Adjust timeouts

If tests take too long, consider:
1. Running only changed files
2. Using watch mode in development
3. Skipping E2E tests in pre-commit (run in CI instead)

### AI Integration

**Option 1: Claude Code**
```bash
# In pre-commit hook
claude-code review --files "$CHANGED_FILES"
```

**Option 2: GitHub Copilot CLI**
```bash
# In pre-commit hook
gh copilot review --files "$CHANGED_FILES"
```

**Option 3: Custom AI service**
```bash
# In pre-commit hook
curl -X POST https://your-ai-service.com/review \
  -H "Content-Type: application/json" \
  -d "{\"files\": \"$CHANGED_FILES\"}"
```

## Workflow Integration

### Developer Workflow

```bash
# 1. Make changes
git add .

# 2. Commit (hooks run automatically)
git commit -m "feat(services): add services support"

# Pre-commit runs:
#   - Lint ✅
#   - Type check ✅
#   - Tests ✅

# Commit-msg validates:
#   - Message format ✅

# Post-commit shows:
#   - Commit info
#   - Reminder to update CHANGELOG

# 3. Update CHANGELOG (if needed)
/update-changelog

# 4. Amend commit to include CHANGELOG
git add CHANGELOG.md
git commit --amend --no-edit

# 5. Push
git push
```

### CI/CD Integration

Git hooks complement CI/CD but don't replace it:

**Git Hooks (Local):**
- Fast feedback (seconds)
- Catches obvious issues before push
- Reduces CI/CD failures

**CI/CD (Remote):**
- Full test suite (unit + E2E)
- Multiple environments
- Deployment automation
- Security scanning

## Troubleshooting

### Hooks not running

```bash
# Check hooks path
git config core.hooksPath

# Should output: .githooks

# If not set:
git config core.hooksPath .githooks
```

### Permission denied

```bash
# Make hooks executable
chmod +x .githooks/*
```

### Tests failing in hook but passing manually

```bash
# Check working directory
cd /path/to/orphelix
npm run test

# If tests pass manually but fail in hook,
# check that hooks run from correct directory
```

### Hook is slow

```bash
# Profile hook execution
time ./.githooks/pre-commit

# If too slow, consider:
# 1. Run only changed files
# 2. Skip E2E tests (run in CI)
# 3. Use incremental type checking
```

### Bypass hook temporarily

```bash
# For testing only (NOT for production commits)
git commit --no-verify
```

## Best Practices

1. **Keep hooks fast** (<30 seconds)
   - Run only essential checks
   - Use incremental checks when possible
   - Save slow checks for CI

2. **Make hooks helpful**
   - Clear error messages
   - Suggest fixes
   - Show relevant context

3. **Don't block unnecessarily**
   - Warnings for minor issues
   - Errors for critical issues
   - Allow bypass for emergencies

4. **Test hooks locally**
   ```bash
   # Test pre-commit
   ./.githooks/pre-commit

   # Test commit-msg
   echo "test: my commit message" | ./.githooks/commit-msg /dev/stdin
   ```

5. **Keep hooks in sync**
   - Update when adding new checks
   - Document changes in this README
   - Share with team

## Related

- [CONTRIBUTING_AI.md](../CONTRIBUTING_AI.md) - AI contribution guidelines
- [.github/workflows/](../.github/workflows/) - GitHub Actions CI/CD
- [Git Hooks Documentation](https://git-scm.com/docs/githooks)

---

**Last Updated:** 2025-11-28
**Version:** 1.0.0
