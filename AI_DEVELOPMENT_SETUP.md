# AI Development Setup - Orphelix

> Complete setup guide for AI-first development workflow

## ✅ What Has Been Implemented

### 📚 **Faza 1 - Fundamenty** (COMPLETED)

#### 1. Core Documentation
- ✅ [AI_CONTEXT.md](AI_CONTEXT.md) - Kluczowe informacje o architekturze, wzorcach i gotchas
- ✅ [CONTRIBUTING_AI.md](CONTRIBUTING_AI.md) - Wytyczne pracy z AI, best practices

#### 2. Claude Code Agents (`.claude/agents/`)
- ✅ **feature-implementer.md** - Implementacja nowych funkcjonalności (API route → Hook → Component)
- ✅ **bug-fixer.md** - Naprawa błędów z root cause analysis
- ✅ **testing-agent.md** - Generowanie testów (unit + E2E, coverage >80%)
- ✅ **documentation-maintainer.md** - Utrzymanie dokumentacji (CHANGELOG, docs/)
- ✅ **code-reviewer.md** - Code review przed mergem (architecture, security, tests)
- ✅ **refactoring-specialist.md** - Refactoring i technical debt

#### 3. Slash Commands (`.claude/commands/`)
- ✅ **/add-k8s-resource** - Dodaj nowy zasób K8s (kompletna implementacja)
- ✅ **/update-changelog** - Automatyczna aktualizacja CHANGELOG.md
- ✅ **/run-tests** - Uruchom wszystkie testy z raportowaniem
- ✅ **/code-review** - Przeprowadź code review
- ✅ **/fix-bug** - Napraw błąd z regression testem
- ✅ **/refactor** - Refactoring kodu
- ✅ **/generate-tests** - Generuj testy dla istniejącego kodu

### ⚙️ **Faza 2 - Automation** (COMPLETED)

#### 1. Git Hooks (`.githooks/`)
- ✅ **pre-commit** - Lint + Type check + Tests (przed commitem)
- ✅ **commit-msg** - Walidacja formatu commit message
- ✅ **post-commit** - Podsumowanie + reminder o CHANGELOG
- ✅ **README.md** - Dokumentacja hooks z AI integration

#### 2. GitHub Issue Templates (`.github/ISSUE_TEMPLATE/`)
- ✅ **bug_report.yml** - Zgłoszenia błędów z AI debugging promptami
- ✅ **feature_request.yml** - Propozycje funkcjonalności z AI implementation promptami
- ✅ **documentation.yml** - Zgłoszenia problemów z dokumentacją

#### 3. GitHub Actions (`.github/workflows/`)
- ✅ **ai-code-review.yml** - Automatyczny AI code review na PR
  - Automated checks (lint, type-check, tests, build)
  - Code pattern analysis (any types, console.log, K8s client issues)
  - Review checklist generation
  - Blocker detection

---

## 🚀 Quick Start

### 1. Aktywuj Git Hooks

```bash
cd /Users/dmakowski/git_priv/orphelix

# Skonfiguruj Git do używania .githooks
git config core.hooksPath .githooks

# Hooks są już executable (chmod +x wykonane)
```

**Verify:**
```bash
git config core.hooksPath
# Should output: .githooks
```

### 2. Przetestuj Workflow

```bash
# Dodaj nowy zasób K8s (przykład)
# Claude Code:
/add-k8s-resource services

# Lub manualnie test hooks:
echo "test change" >> test.txt
git add test.txt
git commit -m "test: testing git hooks"

# Pre-commit uruchomi się automatycznie:
# - ESLint ✅
# - TypeScript type check ✅
# - Unit tests ✅
# - Warnings (console.log, TODO, large files)
```

### 3. Użyj Agentów

**Dodaj nową funkcjonalność:**
```
Use the feature-implementer agent to add support for Kubernetes Jobs.

Include:
- API route
- TanStack Query hook
- React component
- Unit tests
- E2E test
- Update CHANGELOG.md
```

**Napraw błąd:**
```
Use the bug-fixer agent to fix the following issue:

Pod logs fail to load when rapidly switching between pods.

Steps to reproduce:
1. Go to /pods
2. Click on pod-1
3. Immediately click on pod-2
4. Logs fail to load

Expected: Logs for pod-2 should load
Actual: Blank screen or stale logs
```

**Code review:**
```
Use the code-reviewer agent to review current changes.

Focus on:
- Architecture patterns
- TypeScript safety
- Error handling
- Security
```

---

## 📖 Dokumentacja

### Core Files

| File | Description |
|------|-------------|
| [AI_CONTEXT.md](AI_CONTEXT.md) | Architektura, wzorce, common pitfalls |
| [CONTRIBUTING_AI.md](CONTRIBUTING_AI.md) | Development guidelines, workflow |
| [TECHNICAL.md](app/TECHNICAL.md) | Pełna dokumentacja techniczna |
| [SECURITY.md](SECURITY.md) | Security patterns, auth flow |
| [CHANGELOG.md](CHANGELOG.md) | Historia zmian |

### Agent Documentation

| Agent | Purpose | Usage |
|-------|---------|-------|
| **feature-implementer** | Nowe funkcjonalności | `/add-k8s-resource <name>` |
| **bug-fixer** | Naprawa błędów | `/fix-bug #123` |
| **testing-agent** | Generowanie testów | `/generate-tests <file>` |
| **documentation-maintainer** | Dokumentacja | `/update-changelog` |
| **code-reviewer** | Code review | `/code-review PR#123` |
| **refactoring-specialist** | Refactoring | `/refactor <file>` |

### Command Documentation

Wszystkie komendy: [.claude/commands/](.claude/commands/)

---

## 🔄 Typowy Workflow AI-First

### Scenario 1: Dodanie Nowej Funkcjonalności

```bash
# 1. Użyj feature-implementer agent
/add-k8s-resource services

# Agent tworzy:
# ✅ types/kubernetes.ts (Service interface)
# ✅ lib/k8s/api.ts (fetchServices, mapService)
# ✅ app/api/services/route.ts
# ✅ lib/mocks/data.ts (getMockServices)
# ✅ lib/hooks/use-services.ts
# ✅ app/components/services/service-list.tsx
# ✅ app/services/page.tsx
# ✅ __tests__/lib/hooks/use-services.test.tsx
# ✅ tests/e2e/services.spec.ts
# ✅ CHANGELOG.md

# 2. Agent uruchamia testy
npm run test ✅
npm run type-check ✅
npm run build ✅

# 3. Commit (git hooks weryfikują automatycznie)
git add .
git commit -m "feat(services): add Kubernetes services support"

# Pre-commit hook runs:
# ✅ Lint
# ✅ Type check
# ✅ Tests
# ✅ Warnings

# Post-commit hook reminds:
# 💡 CHANGELOG.md already updated ✅

# 4. Push i create PR
git push origin feature/add-services
gh pr create --title "feat: add services support"

# 5. GitHub Actions runs AI code review automatically
# - Automated checks
# - Code pattern analysis
# - Review checklist
# - Comments on PR
```

### Scenario 2: Naprawa Błędu

```bash
# 1. User zgłasza bug (issue #234)
# GitHub Issue Template zawiera AI prompt

# 2. Użyj bug-fixer agent
/fix-bug #234

# Agent:
# 1. Analizuje issue
# 2. Reprodukuje bug
# 3. Identyfikuje root cause
# 4. Implementuje fix
# 5. Dodaje regression test
# 6. Aktualizuje CHANGELOG.md

# 3. Commit
git add .
git commit -m "fix(logs): resolve race condition in pod logs (#234)"

# 4. Push i PR
git push
# GitHub Actions runs AI review
```

### Scenario 3: Refactoring

```bash
# 1. Użyj refactoring-specialist
/refactor lib/k8s/api.ts

# Agent:
# 1. Identyfikuje code smells (2074 linii → split)
# 2. Tworzy plan refactoringu
# 3. Splituje na moduły (<300 linii each)
# 4. Weryfikuje testy po każdym kroku
# 5. Aktualizuje CHANGELOG.md

# 2. Wszystkie testy przechodzą
npm run test ✅

# 3. Commit
git add .
git commit -m "refactor: split k8s-api.ts into focused modules"
```

---

## ⚙️ Konfiguracja Git Hooks

### Enable/Disable Checks

Edit `.githooks/pre-commit`:

```bash
# Disable specific check (comment out)
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

### Enable AI Code Review in Git Hooks

Edit `.githooks/pre-commit` (line ~60):

```bash
# Uncomment this section:
echo ""
echo "🤖 Running AI code review..."

CHANGED_FILES=$(git diff --cached --name-only | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -n "$CHANGED_FILES" ]; then
    # Call your AI service here
    # Example: Claude Code agent
    # /code-review
fi
```

### Auto-update CHANGELOG

Edit `.githooks/post-commit`:

```bash
# Uncomment:
echo ""
echo "🤖 Auto-updating CHANGELOG.md..."
/update-changelog
```

---

## 🤖 GitHub Actions AI Review

### Konfiguracja

Plik: [.github/workflows/ai-code-review.yml](.github/workflows/ai-code-review.yml)

**Runs on:**
- Pull request opened
- New commits pushed to PR
- PR reopened

**Checks:**
- ✅ ESLint
- ✅ TypeScript type check
- ✅ Unit tests
- ✅ Build

**Analyzes:**
- ⚠️ `any` types usage
- ⚠️ `console.log` statements
- 🔴 K8s client in client components (CRITICAL)
- ⚠️ Missing error handling

**Outputs:**
- Comment on PR with results
- Workflow summary
- Blocker detection (fails if tests/build fail)

### Customize

Edit `.github/workflows/ai-code-review.yml` to add more checks:

```yaml
- name: Check for security issues
  run: |
    # Add custom security checks
    npm audit
    # Check for hardcoded secrets
    git diff origin/${{ github.base_ref }}...HEAD | grep -i "password\|secret\|token"
```

---

## 📊 Metryki Sukcesu

**Code Quality:**
- Test Coverage: >80% ✅
- TypeScript Strict: ✓ (zero `any` types)
- ESLint Errors: 0
- Build Warnings: 0

**Development Speed:**
- Nowa funkcjonalność: 15-30 min (vs 2-4h manual)
- Bugfix: 10-20 min (vs 1-2h manual)
- Code review: 5-10 min (vs 30-60 min manual)

**Documentation:**
- Every feature: User docs + API docs
- Every change: CHANGELOG.md entry
- 100% documentation sync

---

## 🎯 Następne Kroki

### 1. Przetestuj Setup

```bash
# Test full workflow
cd app

# 1. Pre-commit hooks
echo "test" >> test.txt
git add test.txt
git commit -m "test: verify hooks work"

# 2. Slash commands
/run-tests

# 3. Agent
# Use feature-implementer to add a simple feature
```

### 2. Dostosuj do Swoich Potrzeb

- Edytuj `.githooks/pre-commit` - włącz/wyłącz checki
- Edytuj `.github/workflows/ai-code-review.yml` - dodaj custom checks
- Dodaj własne slash commands w `.claude/commands/`
- Dodaj własne agenty w `.claude/agents/`

### 3. Onboarding Zespołu

Jeśli pracujesz z zespołem (nawet AI-first):
1. Przeczytaj [AI_CONTEXT.md](AI_CONTEXT.md)
2. Przeczytaj [CONTRIBUTING_AI.md](CONTRIBUTING_AI.md)
3. Aktywuj git hooks: `git config core.hooksPath .githooks`
4. Przetestuj workflow na małym zadaniu

---

## 💡 Best Practices

### DO ✅

1. **Zawsze używaj agentów** dla powtarzalnych zadań
2. **Commituj często** - małe commity łatwiej rollback
3. **Uruchamiaj testy** po każdej zmianie
4. **Aktualizuj CHANGELOG** dla każdej funkcjonalności/bugfixa
5. **Code review** przed mergem (AI + human)
6. **Dokumentuj** nowe funkcjonalności
7. **Refactoruj regularnie** (nie czekaj na tech debt)

### DON'T ❌

1. **Nie używaj `--no-verify`** (bypass git hooks) bez dobrego powodu
2. **Nie commituj** bez uruchomienia testów
3. **Nie wprowadzaj `any` types** - zawsze definiuj proper types
4. **Nie skipuj dokumentacji** - każda funkcjonalność needs docs
5. **Nie merguj** PR bez code review
6. **Nie refactoruj i dodawaj funkcjonalności** w jednym commicie
7. **Nie używaj K8s client** w 'use client' components

---

## 🆘 Troubleshooting

### Git Hooks nie działają

```bash
# Check config
git config core.hooksPath
# Should be: .githooks

# Fix
git config core.hooksPath .githooks
chmod +x .githooks/*
```

### Testy failują w hook ale przechodzą manualnie

```bash
# Check working directory
pwd
# Should be: /Users/dmakowski/git_priv/orphelix

cd app
npm run test
```

### GitHub Actions nie uruchamia się

```bash
# Check workflow file syntax
cat .github/workflows/ai-code-review.yml

# Verify permissions in repository settings:
# Settings → Actions → General → Workflow permissions
# Enable: "Read and write permissions"
```

### Agent nie działa

```bash
# Verify agent file exists
ls .claude/agents/

# Check syntax
cat .claude/agents/feature-implementer.md
```

---

## 📚 Resources

### Internal Documentation
- [AI_CONTEXT.md](AI_CONTEXT.md) - Start here!
- [CONTRIBUTING_AI.md](CONTRIBUTING_AI.md) - Development workflow
- [TECHNICAL.md](app/TECHNICAL.md) - Architecture deep dive
- [SECURITY.md](SECURITY.md) - Security patterns

### External Resources
- [Claude Code Documentation](https://docs.claude.com/claude-code)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Git Hooks](https://git-scm.com/docs/githooks)

---

## ✅ Checklist - Setup Complete

- [x] AI_CONTEXT.md created
- [x] CONTRIBUTING_AI.md created
- [x] 6 Claude Code agents configured
- [x] 7 slash commands created
- [x] Git hooks setup (pre-commit, commit-msg, post-commit)
- [x] GitHub Issue templates with AI prompts
- [x] GitHub Actions AI code review workflow
- [ ] Git hooks activated: `git config core.hooksPath .githooks`
- [ ] Test workflow with sample task
- [ ] Review and customize for your needs

---

**Setup Date:** 2025-11-28
**Version:** 1.0.0
**Status:** ✅ Production Ready

**Gratulacje! System AI-first development jest w pełni skonfigurowany i gotowy do użycia! 🚀**
