# 🔐 GitHub App - Instrukcja Konfiguracji (Granularne Uprawnienia)

## ✨ Dlaczego GitHub App zamiast OAuth?

### GitHub App (ZALECANE) ✅
```
✅ User wybiera KONKRETNE repozytoria
✅ Bezpieczniejsze - granularne uprawnienia
✅ Możliwość odwołania dostępu per-repo
✅ Lepsze do organizacji/team
✅ Zgodne z best practices
```

### OAuth (LEGACY) ⚠️
```
⚠️ Dostęp do WSZYSTKICH repozytoriów użytkownika
⚠️ Wszystko albo nic
⚠️ Mniej bezpieczne
⚠️ Przestarzałe podejście
```

## 🚀 Szybki Start - GitHub App

### Krok 1: Utwórz GitHub App (10 minut)

1. **Przejdź do GitHub Settings**
   ```
   https://github.com/settings/apps
   ```

2. **Kliknij "New GitHub App"**

3. **Wypełnij formularz:**

   **Basic Information:**
   ```
   GitHub App name: KubeVista Local
   Homepage URL: http://localhost:3000
   ```

   **Callback URLs:**
   ```
   http://localhost:3000/api/github-app/callback
   ```

   **Setup URL (Optional):**
   ```
   Zostaw puste
   ```

   **Webhook:**
   ```
   ☐ Active (odznacz - nie potrzebujemy)
   ```

   **Repository permissions:**
   ```
   Contents: Read and write
   Pull requests: Read and write
   Metadata: Read-only (automatycznie zaznaczone)
   ```

   **User permissions:**
   ```
   Email addresses: Read-only
   ```

   **Where can this GitHub App be installed?:**
   ```
   ○ Only on this account (dla testów lokalnych)
   ```

4. **Kliknij "Create GitHub App"**

### Krok 2: Pobierz Dane Konfiguracyjne

Po utworzeniu aplikacji zobaczysz stronę z danymi:

1. **Skopiuj App ID** (na górze strony)
   ```
   App ID: 123456
   ```

2. **Skopiuj Client ID** (w sekcji "OAuth credentials")
   ```
   Client ID: Iv1.abc123xyz...
   ```

3. **Wygeneruj i skopiuj Client Secret**
   - Kliknij "Generate a new client secret"
   - Skopiuj natychmiast (pokazuje się tylko raz!)
   ```
   Client secret: ghs_abc123xyz...
   ```

4. **Skopiuj App Slug** (w URL aplikacji)
   ```
   URL: https://github.com/apps/kubevista-local
   Slug: kubevista-local
   ```

5. **Wygeneruj Private Key**
   - Przewiń na dół strony
   - Kliknij "Generate a private key"
   - Pobierze się plik .pem
   ```
   Downloaded: kubevista-local.2025-01-13.private-key.pem
   ```

### Krok 3: Przygotuj Private Key

Private key musi być w jednej linii dla .env:

```bash
# Metoda 1: Z zachowaniem \n
cat kubevista-local.*.private-key.pem | sed 's/$/\\n/' | tr -d '\n'

# Metoda 2: Wyświetl i skopiuj ręcznie
cat kubevista-local.*.private-key.pem
```

### Krok 4: Skonfiguruj .env.local

Utwórz lub edytuj `.env.local`:

```bash
nano .env.local
```

Wklej (zastąp wartościami z Kroku 2):

```bash
# GitHub App Configuration
GITHUB_APP_ID=123456
GITHUB_APP_SLUG=kubevista-local
GITHUB_APP_CLIENT_ID=Iv1.abc123xyz
GITHUB_APP_CLIENT_SECRET=ghs_abc123xyz
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIB...\n-----END RSA PRIVATE KEY-----"

# Public env vars (dostępne w przeglądarce)
NEXT_PUBLIC_GITHUB_APP_CLIENT_ID=Iv1.abc123xyz
NEXT_PUBLIC_GITHUB_APP_SLUG=kubevista-local
```

**Ważne**: Private key MUSI być w cudzysłowach i mieć zachowane `\n`!

### Krok 5: Zrestartuj Serwer

```bash
# Zatrzymaj wszystkie serwery
lsof -ti:3000 | xargs kill -9

# Uruchom ponownie
npm run dev
```

Poczekaj aż zobaczysz:
```
✓ Ready in ...
Local: http://localhost:3000
```

## 🎯 Testowanie GitHub App

### 1. Instalacja Aplikacji

1. **Otwórz Settings**
   ```
   http://localhost:3000/settings
   ```

2. **Przewiń do "GitHub Integration"**

3. **Upewnij się że zakładka "GitHub App (Recommended)" jest aktywna**

4. **Kliknij "Install GitHub App"**

5. **Wybierz repozytoria na GitHub:**

   ```
   ┌─────────────────────────────────────┐
   │ Install KubeVista Local              │
   │                                      │
   │ Select repositories:                 │
   │ ○ All repositories                   │
   │ ● Only select repositories           │
   │                                      │
   │ Select repositories:                 │
   │ ☑ my-org/k8s-manifests              │
   │ ☑ my-org/production-k8s             │
   │ ☐ my-org/other-repo                 │
   │                                      │
   │        [Install]   [Cancel]          │
   └─────────────────────────────────────┘
   ```

6. **Kliknij "Install"**

7. **Przekieruje Cię z powrotem do KubeVista**

### 2. Weryfikacja Połączenia

Po powrocie do KubeVista powinieneś zobaczyć:

```
✅ Connected to GitHub App
   2 repositories accessible across 1 installation

   ℹ You have granular control over which repositories KubeVista can access.
   [Add More Repositories]

   my-org (2 repos)
```

### 3. Wybór Repozytorium

W dropdownie **"Select Repository"** zobaczysz:

```
┌──────────────────────────────────┐
│ Select Repository             ▼  │
├──────────────────────────────────┤
│ my-org                           │  <- Header
│   k8s-manifests [Private]        │  <- Repos z tej instalacji
│   production-k8s                 │
└──────────────────────────────────┘
```

Wybierz repozytorium z manifestami Kubernetes.

### 4. Test Edycji YAML

1. **Przejdź do Deployments**
   ```
   http://localhost:3000/deployments
   ```

2. **Wybierz dowolny deployment**

3. **Kliknij "Edit YAML"**

4. **W modalnym oknie:**
   - Dropdown pokaże pliki z wybranego repo
   - Jeśli Kustomize: zobaczysz zakładki Base/Overlays
   - Edytuj YAML
   - Kliknij "Create Pull Request"

5. **Sprawdź PR na GitHub:**
   ```
   https://github.com/my-org/k8s-manifests/pulls
   ```

## 🔧 Zarządzanie Dostępem

### Dodanie Więcej Repozytoriów

**W KubeVista:**
```
Settings → GitHub Integration → [Add More Repositories]
```

Lub bezpośrednio na GitHub:
```
https://github.com/settings/installations
→ Kliknij "Configure" przy KubeVista Local
→ Dodaj/usuń repozytoria
```

### Odwołanie Dostępu do Repozytorium

**Na GitHub:**
```
https://github.com/settings/installations
→ KubeVista Local → Configure
→ Odznacz repozytorium
→ Save
```

**Efekt:** KubeVista straci dostęp do tego repo, ale inne nadal będą działać!

### Całkowite Odinstalowanie

**W KubeVista:**
```
Settings → GitHub Integration → [Disconnect]
```

**Lub na GitHub:**
```
https://github.com/settings/installations
→ KubeVista Local → Uninstall
```

## 📊 Porównanie: GitHub App vs OAuth

| Feature | GitHub App | OAuth |
|---------|------------|-------|
| **Wybór repozytoriów** | ✅ User wybiera konkretne | ❌ Wszystkie lub żadne |
| **Bezpieczeństwo** | ✅ Granularne permissions | ⚠️ Szerokie uprawnienia |
| **Token lifetime** | ✅ 8 godzin (auto-refresh) | ❌ Nie wygasa (ryzyko) |
| **Organizacje** | ✅ Organizacja może kontrolować | ⚠️ User ma pełną kontrolę |
| **Revoke access** | ✅ Per-repo | ❌ Wszystko naraz |
| **GitHub Enterprise** | ✅ Full support | ⚠️ Limited |
| **Rate limits** | ✅ Wyższe (5000/h) | ❌ Niższe (1000/h) |
| **Setup complexity** | ⚠️ Bardziej skomplikowany | ✅ Prosty |

## 🐛 Debugowanie

### Problem: "GitHub App not configured"

**Sprawdź:**
```bash
cat .env.local | grep GITHUB_APP
```

**Powinno pokazać:**
```
GITHUB_APP_ID=123456
GITHUB_APP_SLUG=kubevista-local
GITHUB_APP_CLIENT_ID=Iv1...
GITHUB_APP_CLIENT_SECRET=ghs_...
GITHUB_APP_PRIVATE_KEY="-----BEGIN..."
```

**Jeśli brakuje:** Uzupełnij i zrestartuj serwer.

### Problem: "Failed to exchange code"

**Możliwe przyczyny:**
1. **Callback URL niepoprawny**
   - Sprawdź w GitHub App settings
   - Musi być: `http://localhost:3000/api/github-app/callback`
   - Bez spacji, bez dodatkowych slashów

2. **Client ID/Secret niepoprawne**
   - Sprawdź w .env.local
   - Porównaj z GitHub App settings

**Rozwiązanie:**
```bash
# Wyloguj się w KubeVista
Settings → Disconnect

# Sprawdź dane w GitHub
https://github.com/settings/apps → KubeVista Local

# Porównaj z .env.local
cat .env.local
```

### Problem: "Private key invalid"

**Przyczyna:** Źle sformatowany private key w .env.local

**Rozwiązanie:**
```bash
# Sprawdź czy private key ma cudzysłowy i \n
cat .env.local | grep PRIVATE_KEY

# Powinno wyglądać tak:
# GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----"

# Jeśli nie, przeformatuj:
cat ~/Downloads/kubevista-local.*.pem | awk 'NR==1{print "GITHUB_APP_PRIVATE_KEY=\""$0"\\n"} NR>1 && NR<$(wc -l < ~/Downloads/kubevista-local.*.pem){print $0"\\n"} END{print $0"\""}'
```

### Problem: Nie widać repozytoriów w dropdownie

**Sprawdź:**
1. Czy aplikacja jest zainstalowana?
   ```
   https://github.com/settings/installations
   ```

2. Czy wybrano repozytoria podczas instalacji?
   - Configure → Repository access → Should show selected repos

3. Czy token nie wygasł?
   - Wyloguj i zaloguj ponownie w KubeVista

### Problem: "404" podczas tworzenia PR

**Możliwe przyczyny:**
1. **Brak uprawnień do repo**
   - GitHub App settings → Permissions → Contents: Read & write

2. **Repo zostało usunięte z instalacji**
   - GitHub settings/installations → Add repo back

3. **Branch protection**
   - PR może być zablokowany przez reguły repo

**Debug:**
```bash
# Sprawdź logi w terminalu gdzie działa npm run dev
# Szukaj błędów API GitHub
```

### Problem: Instalacja zapętla się

**Rozwiązanie:**
```bash
# Wyczyść cookies
# W przeglądarce: DevTools (F12) → Application → Cookies → Clear all

# Wyczyść cache Next.js
rm -rf .next

# Zrestartuj serwer
npm run dev

# Spróbuj ponownie
```

## 💡 Najlepsze Praktyki

### 1. Testowanie Lokalne
```bash
# Użyj osobnej GitHub App dla dev
GitHub App name: KubeVista DEV
Callback: http://localhost:3000/api/github-app/callback
```

### 2. Produkcja
```bash
# Osobna GitHub App dla prod
GitHub App name: KubeVista
Callback: https://kubevista.example.com/api/github-app/callback
```

### 3. Rotacja Kluczy
```bash
# Co 90 dni wygeneruj nowy private key
GitHub App settings → Generate new private key
# Zaktualizuj .env
# Stary key przestaje działać od razu!
```

### 4. Monitoring
```bash
# Sprawdzaj installation events
https://github.com/settings/apps/kubevista-local/advanced

# Zobacz kiedy users instalują/odinstalowują
```

## 📚 Dalsze Kroki

Po skonfigurowaniu GitHub App możesz:

1. **Dodać więcej repozytoriów** w dowolnym momencie
2. **Zaprosić członków zespołu** - każdy instaluje app osobiście
3. **Monitorować użycie** w GitHub App Advanced tab
4. **Skonfigurować webhooks** (opcjonalnie) dla real-time updates
5. **Wydać app publicznie** (jeśli chcesz aby inni mogli używać)

## 🆘 Potrzebujesz Pomocy?

**GitHub Documentation:**
- https://docs.github.com/en/apps/creating-github-apps
- https://docs.github.com/en/apps/installing-github-apps

**Checklist przed zgłoszeniem problemu:**
- [ ] .env.local ma wszystkie wymagane zmienne
- [ ] Private key jest poprawnie sformatowany (z \n)
- [ ] Callback URL w GitHub App settings jest poprawny
- [ ] Permissions są ustawione (Contents: R/W, Pull requests: R/W)
- [ ] Aplikacja jest zainstalowana (https://github.com/settings/installations)
- [ ] Wybrano przynajmniej 1 repozytorium
- [ ] Serwer został zrestartowany po zmianach w .env.local
- [ ] Browser cache został wyczyszczony

---

**Wersja**: 1.2.0
**Data**: 2025-11-13
**Status**: ✅ Production Ready
