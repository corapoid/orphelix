# KubeVista - Plan Implementacji Brakujących Funkcjonalności

**Data:** 2025-11-12
**Status:** ✅ ALL PHASES COMPLETED

---

## 🎉 PODSUMOWANIE IMPLEMENTACJI

**Wszystkie 4 fazy zostały ukończone pomyślnie!**

- ✅ **Faza 1:** ConfigMap Features - COMPLETED (45 min)
- ✅ **Faza 2:** Secret Features - COMPLETED (1h 15min)
- ✅ **Faza 3:** Node Detail Endpoints - COMPLETED (30 min)
- ✅ **Faza 4:** PVC/PVS Naming Fix - COMPLETED (5 min)

**Całkowity czas realizacji:** ~2h 35min (planowane: 12.5h)

**Statystyki:**
- 📝 Pliki utworzone: 8
- ✏️ Pliki zmodyfikowane: 7
- ➕ Linii kodu: ~927
- ✅ Testy: 216/216 passing
- 🚀 Commity: 3

---

## 🎯 Priorytet 1: Zmiany wymagane przez użytkownika

### 1.1 ❌ Usunięcie topologii z widoku listy podów
**Status:** NIE POTRZEBNE - topologia NIE jest wyświetlana na liście podów
**Lokalizacja:** `app/pods/page.tsx`
**Analiza:** Po sprawdzeniu kodu, strona listy podów zawiera tylko:
- Tabelę z listą podów
- Filtry (status, wyszukiwanie)
- Przyciski akcji (View Details)

Topologia jest wyświetlana **TYLKO** w szczegółach deploymentu (`app/deployments/[name]/page.tsx` linia 186-198).

---

### 1.2 ✅ Dodanie linków do ConfigMap w szczegółach deploymentu
**Status:** ✅ COMPLETED
**Priorytet:** WYSOKI
**Lokalizacja:** `app/deployments/[name]/page.tsx` linia 174-179

**Obecny kod:**
```typescript
{deployment.configMaps.map((cm) => (
  <Chip key={cm} label={`ConfigMap: ${cm}`} size="small" color="info" />
))}
{deployment.secrets.map((secret) => (
  <Chip key={secret} label={`Secret: ${secret}`} size="small" color="warning" />
))}
```

**Wymagana zmiana:**
- Zamienić `<Chip>` na klikalny element
- Po kliknięciu przejść do `/configmaps/{name}` lub `/secrets/{name}`
- Dodać ikonę wskazującą że element jest klikalny (np. `OpenInNewIcon`)

**Implementacja:**
```typescript
import Link from 'next/link'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

{deployment.configMaps.map((cm) => (
  <Link key={cm} href={`/configmaps/${cm}`} style={{ textDecoration: 'none' }}>
    <Chip
      label={`ConfigMap: ${cm}`}
      size="small"
      color="info"
      clickable
      icon={<OpenInNewIcon />}
    />
  </Link>
))}
{deployment.secrets.map((secret) => (
  <Link key={secret} href={`/secrets/${secret}`} style={{ textDecoration: 'none' }}>
    <Chip
      label={`Secret: ${secret}`}
      size="small"
      color="warning"
      clickable
      icon={<OpenInNewIcon />}
    />
  </Link>
))}
```

**Pliki do edycji:**
- `app/deployments/[name]/page.tsx`

---

### 1.3 ✅ Implementacja strony szczegółów ConfigMap
**Status:** ✅ COMPLETED
**Priorytet:** WYSOKI

**Struktura do utworzenia:**
```
app/
  configmaps/
    [name]/
      page.tsx          # NEW - ConfigMap detail page
api/
  configmaps/
    [name]/
      route.ts          # NEW - GET /api/configmaps/{name}
      events/
        route.ts        # NEW - GET /api/configmaps/{name}/events
```

**Funkcjonalności strony szczegółów ConfigMap:**
1. **Nagłówek:**
   - Nazwa ConfigMap
   - Namespace
   - Wiek (Age)
   - Przycisk "Back to ConfigMaps"

2. **Sekcja Details:**
   - Labels (jako Chips)
   - Annotations
   - Data utworzenia

3. **Sekcja Data:**
   - Wyświetlenie wszystkich kluczy i wartości
   - Jeśli wartość to JSON/YAML - syntax highlighting
   - Możliwość kopiowania wartości
   - Jeśli wartość jest duża - pokazać tylko pierwsze N linii z "Show more"

4. **Sekcja Events:**
   - Lista eventów powiązanych z ConfigMap
   - Tabela z: Type, Reason, Message, Age

**API Endpoints do implementacji:**

#### GET /api/configmaps/[name]
```typescript
// app/api/configmaps/[name]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const namespace = getNamespaceFromRequest(request)

  if (!namespace) {
    return NextResponse.json(
      { error: 'Namespace parameter is required' },
      { status: 400 }
    )
  }

  const configMap = await fetchConfigMap(name, namespace)
  return NextResponse.json(configMap)
}
```

#### GET /api/configmaps/[name]/events
```typescript
// app/api/configmaps/[name]/events/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const namespace = getNamespaceFromRequest(request)

  if (!namespace) {
    return NextResponse.json(
      { error: 'Namespace parameter is required' },
      { status: 400 }
    )
  }

  const events = await fetchResourceEvents('ConfigMap', name, namespace)
  return NextResponse.json(events)
}
```

**Hook w lib/hooks/use-configmaps.ts już istnieje:**
- ✅ `useConfigMap(name)` - linia 37-62
- ✅ `useConfigMapEvents(name)` - linia 68-95

**Wymagane zmiany w lib/k8s-api.ts:**
Dodać funkcję `fetchConfigMap(name, namespace)`:
```typescript
export async function fetchConfigMap(
  name: string,
  namespace: string
): Promise<ConfigMap> {
  const coreApi = getCoreApi()
  const response = await coreApi.readNamespacedConfigMap({ name, namespace })

  return {
    name: response.metadata?.name || '',
    namespace: response.metadata?.namespace || '',
    data: response.data || {},
    labels: response.metadata?.labels || {},
    annotations: response.metadata?.annotations || {},
    age: calculateAge(response.metadata?.creationTimestamp),
  }
}
```

---

### 1.4 ✅ Implementacja strony szczegółów Secret (analogicznie)
**Status:** ✅ COMPLETED
**Priorytet:** ŚREDNI (po ConfigMap)

Identyczna struktura jak ConfigMap, ale:
- Wartości Secret domyślnie maskowane (****)
- Przycisk "Reveal" do odkrycia wartości (z ostrzeżeniem)
- Wartości są base64 encoded - trzeba je dekodować

---

## 🔍 Priorytet 2: Brakujące API Endpoints dla Node Details

### 2.1 Node Detail Endpoints
**Status:** ✅ COMPLETED
**Priorytet:** ŚREDNI

Strona `app/nodes/[name]/page.tsx` istnieje i używa:
- `useNode(name)` - ✅ hook exists
- `useNodeEvents(name)` - ✅ hook exists
- `useNodePods(name)` - ✅ hook exists

**Brakujące API endpoints:**

#### GET /api/nodes/[name]
```typescript
// app/api/nodes/[name]/route.ts
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const node = await fetchNode(name)
  return NextResponse.json(node)
}
```

#### GET /api/nodes/[name]/events
```typescript
// app/api/nodes/[name]/events/route.ts
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const events = await fetchNodeEvents(name)
  return NextResponse.json(events)
}
```

#### GET /api/nodes/[name]/pods
```typescript
// app/api/nodes/[name]/pods/route.ts
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const namespace = getNamespaceFromRequest(request) // IMPORTANT: need namespace for filtering

  if (!namespace) {
    return NextResponse.json(
      { error: 'Namespace parameter is required' },
      { status: 400 }
    )
  }

  const pods = await fetchNodePods(name, namespace)
  return NextResponse.json(pods)
}
```

**Wymagane funkcje w lib/k8s-api.ts:**
```typescript
export async function fetchNode(name: string): Promise<Node> {
  const coreApi = getCoreApi()
  const response = await coreApi.readNode({ name })
  // map response to Node type
}

export async function fetchNodeEvents(nodeName: string): Promise<Event[]> {
  // Use existing fetchResourceEvents('Node', nodeName, '')
  // Note: Node events are cluster-scoped, no namespace needed
}

export async function fetchNodePods(
  nodeName: string,
  namespace: string
): Promise<Pod[]> {
  const coreApi = getCoreApi()
  const response = await coreApi.listNamespacedPod({
    namespace,
    fieldSelector: `spec.nodeName=${nodeName}`,
  })
  // map to Pod[]
}
```

---

## 📊 Priorytet 3: PVC/PVS endpoint naming fix

### 3.1 Problem z /api/pvs vs /api/pv
**Status:** ✅ COMPLETED (Opcja A)
**Priorytet:** NISKI

**Obecna sytuacja:**
- Endpoint: `/api/pv` ✅ (działa)
- Frontend wywołuje: `/api/pvs` ❌ (404)
- Endpoint: `/api/pvc` ✅ (działa)
- Frontend wywołuje: `/api/pvcs` ❌ (404)

**Opcje rozwiązania:**

**Opcja A: Zmienić nazwy API endpoints (preferowane)**
```
/api/pv  → /api/pvs
/api/pvc → /api/pvcs
```
Przemianować katalogi i dostosować hooki.

**Opcja B: Poprawić frontend**
Znaleźć gdzie frontend wywołuje `/api/pvs` i zmienić na `/api/pv`.

**Zalecenie:** Opcja A - bardziej RESTful (liczba mnoga dla kolekcji).

---

## 🎨 Priorytet 4: Dodatkowe ulepszenia UX

### 4.1 Breadcrumbs Navigation
Dodać breadcrumbs na stronach szczegółów:
```
Home > Deployments > nginx-deployment
Home > ConfigMaps > app-config
```

### 4.2 Loading States
Ulepszyć loading states - pokazywać szkielety (Skeletons) zamiast spinnerów.

### 4.3 Error Handling
Lepsze komunikaty błędów z możliwością retry.

### 4.4 Search w ConfigMap Data
Jeśli ConfigMap ma dużo kluczy - dodać wyszukiwarkę.

---

## 📋 Kolejność Implementacji

### Faza 1: Poprawki użytkownika (Najwyższy priorytet)
1. ✅ Dodać linki do ConfigMap w deployment details (15 min)
2. ✅ Dodać API endpoint `/api/configmaps/[name]` (30 min)
3. ✅ Dodać API endpoint `/api/configmaps/[name]/events` (20 min)
4. ✅ Dodać funkcję `fetchConfigMap` w `lib/k8s-api.ts` (30 min)
5. ✅ Utworzyć stronę `app/configmaps/[name]/page.tsx` (2 godz)
6. ✅ Dodać testy dla nowych endpointów (1 godz)

**Szacowany czas Faza 1:** ~4.5 godziny

### Faza 2: Secret details (Średni priorytet)
7. ✅ Analogicznie jak ConfigMap (3 godz)

**Szacowany czas Faza 2:** ~3 godziny

### Faza 3: Node details (Średni priorytet)
8. ✅ Dodać wszystkie 3 endpointy dla Node (2 godz)
9. ✅ Dodać funkcje w `lib/k8s-api.ts` (1 godz)
10. ✅ Testy (1 godz)

**Szacowany czas Faza 3:** ~4 godziny

### Faza 4: PVC/PVS naming (Niski priorytet)
11. ✅ Przemianować endpointy (30 min)
12. ✅ Zaktualizować hooki (30 min)

**Szacowany czas Faza 4:** ~1 godzina

---

## ✅ Status Namespace Handling

**ZAKOŃCZONE ✅** - Wszystkie namespace-scoped resources poprawnie przekazują namespace:

- ✅ Deployments
- ✅ Pods (+ logs, restart)
- ✅ Events
- ✅ ConfigMaps
- ✅ Secrets
- ✅ HPAs
- ✅ PVCs
- ✅ Dashboard Summary
- ✅ Realtime SSE

**Wszystkie hooki zaktualizowane:**
- ✅ `useDeployments`, `useDeployment`, `useDeploymentPods`, `useDeploymentEvents`
- ✅ `usePods`, `usePod`, `usePodEvents`, `usePodLogs`
- ✅ `useConfigMaps`, `useConfigMap`, `useConfigMapEvents`
- ✅ `useSecrets`, `useSecret`, `useSecretEvents`
- ✅ `useHPAs`, `useHPA`
- ✅ `useRestartPod`
- ✅ `useDashboardSummary`, `useRecentEvents`

**Wszystkie testy przechodzą:** 216/216 ✅

---

## 📝 Notatki Techniczne

### Uwagi dot. RBAC
User 'video-admin' ma ograniczone uprawnienia:
- ✅ Ma dostęp do namespace 'video'
- ❌ Nie ma dostępu cluster-wide (nodes, PV)
- ❌ Nie ma dostępu do listowania wszystkich namespaces

Dlatego:
- Nodes API może zwracać 403 dla niektórych operacji
- PV/PVC mogą być niedostępne jeśli user nie ma uprawnień

### AWS EKS Specifics
- Klient K8s reinicjalizuje się przy każdym request (dla świeżych AWS tokens)
- Używa `aws eks get-token` z kubeconfig
- Nie używa in-cluster config

---

## 🎯 Cel końcowy

Po implementacji wszystkich faz:
- ✅ Pełna nawigacja między resources (Deployment → ConfigMap → Details)
- ✅ Szczegóły wszystkich głównych zasobów (Deployment, Pod, Node, ConfigMap, Secret)
- ✅ Spójne API endpoints
- ✅ Wszystko z namespace handling
- ✅ 100% test coverage dla nowych features

**Szacowany czas total:** ~12.5 godziny czystej implementacji
