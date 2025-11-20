module.exports=[918622,(e,t,a)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},556704,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},832319,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},324725,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},193695,(e,t,a)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},514580,e=>{"use strict";var t=e.i(493458);async function a(){let e=await (0,t.cookies)();return e.get("github_app_token")?.value||null}e.s(["getGitHubToken",()=>a])},802076,e=>{"use strict";var t=e.i(860823);class a{octokit;constructor(e){this.octokit=new t.Octokit({auth:e})}async listRepositories(){let{data:e}=await this.octokit.repos.listForAuthenticatedUser({sort:"updated",per_page:100});return e.map(e=>({owner:e.owner.login,repo:e.name,fullName:e.full_name,defaultBranch:e.default_branch||"main"}))}async listYamlFiles(e,t,a="",r="main"){let s=[];try{let{data:n}=await this.octokit.repos.getContent({owner:e,repo:t,path:a,ref:r});if(Array.isArray(n)){for(let a of n)if("file"===a.type&&(a.name.endsWith(".yaml")||a.name.endsWith(".yml")))s.push({name:a.name,path:a.path,sha:a.sha,type:"file"});else if("dir"===a.type){let n=await this.listYamlFiles(e,t,a.path,r);s.push(...n)}}}catch(e){console.error(`Error listing files in ${a}:`,e)}return s}async getFileContent(e,t,a,r="main"){let{data:s}=await this.octokit.repos.getContent({owner:e,repo:t,path:a,ref:r});if("content"in s&&"file"===s.type)return{content:Buffer.from(s.content,"base64").toString("utf-8"),sha:s.sha};throw Error("Path is not a file")}async detectKustomization(e,t,a,r="main"){try{let{data:s}=await this.octokit.repos.getContent({owner:e,repo:t,path:a,ref:r});if(Array.isArray(s))return s.some(e=>"file"===e.type&&("kustomization.yaml"===e.name||"kustomization.yml"===e.name));return!1}catch{return!1}}async getKustomizeStructure(e,t,a,r="main"){let s,n,i=a.substring(0,a.lastIndexOf("/"));if(!await this.detectKustomization(e,t,i,r))return{hasKustomization:!1,basePath:null,overlays:[],baseFiles:[],overlayFiles:{}};if(i.endsWith("/base")||!i.includes("overlay"))s=i,n=i.replace("/base","/overlays");else{let e=i.match(/(.*)\/overlays\/([^/]+)/);e?(s=`${e[1]}/base`,n=`${e[1]}/overlays`):(s=i,n=`${i}/overlays`)}let o=await this.listYamlFiles(e,t,s,r),l=[],p={};try{let{data:a}=await this.octokit.repos.getContent({owner:e,repo:t,path:n,ref:r});if(Array.isArray(a)){let s=a.filter(e=>"dir"===e.type).map(e=>e.name);for(let a of(l.push(...s),s)){let s=`${n}/${a}`;p[a]=await this.listYamlFiles(e,t,s,r)}}}catch{}return{hasKustomization:!0,basePath:s,overlays:l,baseFiles:o,overlayFiles:p}}async mergePullRequest(e,t,a,r="merge"){try{let{data:s}=await this.octokit.pulls.merge({owner:e,repo:t,pull_number:a,merge_method:r});return{merged:!0,message:s.message}}catch(e){return{merged:!1,message:e.message||"Failed to merge PR"}}}async listBranches(e,t){let{data:a}=await this.octokit.repos.listBranches({owner:e,repo:t,per_page:100});return a.map(e=>({name:e.name,protected:e.protected}))}async getRepositoryTree(e,t,a="main",r=""){try{let{data:s}=await this.octokit.repos.getContent({owner:e,repo:t,path:r,ref:a});if(!Array.isArray(s))return[{name:s.name,path:s.path,type:"file",size:s.size}];return s.map(e=>({name:e.name,path:e.path,type:"dir"===e.type?"dir":"file",size:"file"===e.type?e.size:void 0}))}catch(e){return console.error(`Error getting tree for ${r}:`,e),[]}}async createBranch(e,t,a,r){let{data:s}=await this.octokit.git.getRef({owner:e,repo:t,ref:`heads/${a}`});await this.octokit.git.createRef({owner:e,repo:t,ref:`refs/heads/${r}`,sha:s.object.sha})}async commitFile(e,t,a,r,s,n,i){await this.octokit.repos.createOrUpdateFileContents({owner:e,repo:t,path:r,message:i,content:Buffer.from(s).toString("base64"),branch:a,sha:n})}async createPullRequest(e,t,a,r,s,n){let{data:i}=await this.octokit.pulls.create({owner:e,repo:t,title:a,head:r,base:s,body:n});return{number:i.number,url:i.html_url}}async isPullRequestMerged(e,t,a){try{return await this.octokit.pulls.checkIfMerged({owner:e,repo:t,pull_number:a}),!0}catch{return!1}}async getOpenPRsForFile(e,t,a){let{data:r}=await this.octokit.pulls.list({owner:e,repo:t,state:"open",per_page:100}),s=[];for(let n of r){let{data:r}=await this.octokit.pulls.listFiles({owner:e,repo:t,pull_number:n.number});r.some(e=>e.filename===a)&&s.push({number:n.number,title:n.title,url:n.html_url})}return s}}e.s(["GitHubClient",()=>a])},490872,e=>{"use strict";let t={"/":[{name:"k8s",path:"k8s",type:"dir"},{name:"README.md",path:"README.md",type:"file",size:1234},{name:".gitignore",path:".gitignore",type:"file",size:456}],k8s:[{name:"base",path:"k8s/base",type:"dir"},{name:"overlays",path:"k8s/overlays",type:"dir"},{name:"deployments",path:"k8s/deployments",type:"dir"},{name:"services",path:"k8s/services",type:"dir"},{name:"configmaps",path:"k8s/configmaps",type:"dir"},{name:"namespace.yaml",path:"k8s/namespace.yaml",type:"file",size:234}],"k8s/base":[{name:"kustomization.yaml",path:"k8s/base/kustomization.yaml",type:"file",size:345},{name:"frontend-deployment.yaml",path:"k8s/base/frontend-deployment.yaml",type:"file",size:1200},{name:"frontend-service.yaml",path:"k8s/base/frontend-service.yaml",type:"file",size:400}],"k8s/overlays":[{name:"dev",path:"k8s/overlays/dev",type:"dir"},{name:"prod",path:"k8s/overlays/prod",type:"dir"}],"k8s/overlays/dev":[{name:"kustomization.yaml",path:"k8s/overlays/dev/kustomization.yaml",type:"file",size:250}],"k8s/overlays/prod":[{name:"kustomization.yaml",path:"k8s/overlays/prod/kustomization.yaml",type:"file",size:280}],"k8s/deployments":[{name:"frontend.yaml",path:"k8s/deployments/frontend.yaml",type:"file",size:1567},{name:"backend.yaml",path:"k8s/deployments/backend.yaml",type:"file",size:1823},{name:"database.yaml",path:"k8s/deployments/database.yaml",type:"file",size:2134}],"k8s/services":[{name:"frontend-svc.yaml",path:"k8s/services/frontend-svc.yaml",type:"file",size:456},{name:"backend-svc.yaml",path:"k8s/services/backend-svc.yaml",type:"file",size:512},{name:"database-svc.yaml",path:"k8s/services/database-svc.yaml",type:"file",size:478}],"k8s/configmaps":[{name:"app-config.yaml",path:"k8s/configmaps/app-config.yaml",type:"file",size:789},{name:"nginx-config.yaml",path:"k8s/configmaps/nginx-config.yaml",type:"file",size:1024}]},a={"README.md":`# Demo Application

This is a demo Kubernetes application for Orphelix.

## Structure

- \`k8s/deployments\` - Application deployments
- \`k8s/services\` - Kubernetes services
- \`k8s/configmaps\` - Configuration files

## Usage

Apply the manifests:

\`\`\`bash
kubectl apply -f k8s/
\`\`\`
`,".gitignore":`node_modules/
.next/
dist/
build/
*.log
.DS_Store
.env.local
`,"k8s/namespace.yaml":`apiVersion: v1
kind: Namespace
metadata:
  name: demo-app
  labels:
    environment: production
`,"k8s/deployments/frontend.yaml":`apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: demo-app
  labels:
    app: frontend
    tier: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
        tier: web
    spec:
      containers:
      - name: frontend
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "256Mi"
            cpu: "500m"
`,"k8s/deployments/backend.yaml":`apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: demo-app
  labels:
    app: backend
    tier: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
        tier: api
    spec:
      containers:
      - name: backend
        image: node:18-alpine
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_HOST
          value: database-svc
        - name: NODE_ENV
          value: production
        resources:
          requests:
            memory: "256Mi"
            cpu: "500m"
          limits:
            memory: "512Mi"
            cpu: "1000m"
`,"k8s/deployments/database.yaml":`apiVersion: apps/v1
kind: Deployment
metadata:
  name: database
  namespace: demo-app
  labels:
    app: database
    tier: data
spec:
  replicas: 1
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      labels:
        app: database
        tier: data
    spec:
      containers:
      - name: postgres
        image: postgres:14
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: appdb
        - name: POSTGRES_USER
          value: admin
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
`,"k8s/services/frontend-svc.yaml":`apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
  namespace: demo-app
spec:
  type: LoadBalancer
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
`,"k8s/services/backend-svc.yaml":`apiVersion: v1
kind: Service
metadata:
  name: backend-svc
  namespace: demo-app
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
  - port: 3000
    targetPort: 3000
    protocol: TCP
`,"k8s/services/database-svc.yaml":`apiVersion: v1
kind: Service
metadata:
  name: database-svc
  namespace: demo-app
spec:
  type: ClusterIP
  selector:
    app: database
  ports:
  - port: 5432
    targetPort: 5432
    protocol: TCP
`,"k8s/configmaps/app-config.yaml":`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: demo-app
data:
  APP_NAME: "Demo Application"
  LOG_LEVEL: "info"
  API_TIMEOUT: "30000"
  MAX_CONNECTIONS: "100"
`,"k8s/base/kustomization.yaml":`apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- frontend-deployment.yaml
- frontend-service.yaml

commonLabels:
  environment: base
  managed-by: kustomize
`,"k8s/overlays/dev/kustomization.yaml":`apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

bases:
- ../../base

namePrefix: dev-

commonLabels:
  environment: dev
`,"k8s/overlays/prod/kustomization.yaml":`apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

bases:
- ../../base

namePrefix: prod-

commonLabels:
  environment: production

replicas:
- name: frontend
  count: 5
`,"k8s/configmaps/nginx-config.yaml":`apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
  namespace: demo-app
data:
  nginx.conf: |
    user nginx;
    worker_processes auto;
    error_log /var/log/nginx/error.log;
    pid /run/nginx.pid;

    events {
        worker_connections 1024;
    }

    http {
        log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                          '$status $body_bytes_sent "$http_referer" '
                          '"$http_user_agent" "$http_x_forwarded_for"';

        access_log  /var/log/nginx/access.log  main;

        sendfile            on;
        tcp_nopush          on;
        keepalive_timeout   65;
        types_hash_max_size 4096;

        include             /etc/nginx/mime.types;
        default_type        application/octet-stream;

        server {
            listen       80;
            server_name  _;
            root         /usr/share/nginx/html;

            location / {
                try_files $uri $uri/ /index.html;
            }
        }
    }
`};function r(e=""){return t[""===e?"/":e]||[]}function s(e){let t=a[e];if(!t)throw Error(`File not found: ${e}`);return{content:t,sha:Buffer.from(e).toString("base64").slice(0,40)}}e.s(["getMockFileContent",()=>s,"getMockRepositoryTree",()=>r])},206185,e=>{"use strict";var t=e.i(747909),a=e.i(174017),r=e.i(996250),s=e.i(759756),n=e.i(561916),i=e.i(114444),o=e.i(837092),l=e.i(869741),p=e.i(316795),c=e.i(487718),m=e.i(995169),d=e.i(47587),u=e.i(666012),y=e.i(570101),h=e.i(626937),f=e.i(10372),g=e.i(193695);e.i(52474);var v=e.i(600220),k=e.i(802076),b=e.i(89171),x=e.i(514580),R=e.i(490872);async function w(e){try{let{searchParams:t}=new URL(e.url),a=t.get("owner"),r=t.get("repo"),s=t.get("path"),n=t.get("ref")||"main",i=t.get("mode");if(!a||!r||!s)return b.NextResponse.json({error:"owner, repo and path are required"},{status:400});if("demo"===i)try{let{content:e,sha:t}=(0,R.getMockFileContent)(s);return b.NextResponse.json({content:e,sha:t})}catch{return b.NextResponse.json({error:"File not found"},{status:404})}let o=await (0,x.getGitHubToken)();if(!o)return b.NextResponse.json({error:"Unauthorized - Please connect GitHub"},{status:401});let l=new k.GitHubClient(o),{content:p,sha:c}=await l.getFileContent(a,r,s,n);return b.NextResponse.json({content:p,sha:c})}catch(e){return console.error("Failed to fetch file content:",e),b.NextResponse.json({error:"Failed to fetch file content"},{status:500})}}e.s(["GET",()=>w],914277);var _=e.i(914277);let E=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/github/file/route",pathname:"/api/github/file",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/app/api/github/file/route.ts",nextConfigOutput:"",userland:_}),{workAsyncStorage:C,workUnitAsyncStorage:A,serverHooks:P}=E;function z(){return(0,r.patchFetch)({workAsyncStorage:C,workUnitAsyncStorage:A})}async function S(e,t,r){E.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let k="/api/github/file/route";k=k.replace(/\/index$/,"")||"/";let b=await E.prepare(e,t,{srcPage:k,multiZoneDraftMode:!1});if(!b)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:x,params:R,nextConfig:w,parsedUrl:_,isDraftMode:C,prerenderManifest:A,routerServerContext:P,isOnDemandRevalidate:z,revalidateOnlyGenerated:S,resolvedPathname:T,clientReferenceManifest:N,serverActionsManifest:O}=b,M=(0,l.normalizeAppPath)(k),F=!!(A.dynamicRoutes[M]||A.routes[T]),$=async()=>((null==P?void 0:P.render404)?await P.render404(e,t,_,!1):t.end("This page could not be found"),null);if(F&&!C){let e=!!A.routes[T],t=A.dynamicRoutes[M];if(t&&!1===t.fallback&&!e){if(w.experimental.adapterPath)return await $();throw new g.NoFallbackError}}let q=null;!F||E.isDev||C||(q="/index"===(q=T)?"/":q);let D=!0===E.isDev||!F,j=F&&!D;O&&N&&(0,i.setReferenceManifestsSingleton)({page:k,clientReferenceManifest:N,serverActionsManifest:O,serverModuleMap:(0,o.createServerModuleMap)({serverActionsManifest:O})});let H=e.method||"GET",U=(0,n.getTracer)(),I=U.getActiveScopeSpan(),K={params:R,prerenderManifest:A,renderOpts:{experimental:{authInterrupts:!!w.experimental.authInterrupts},cacheComponents:!!w.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:w.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r)=>E.onRequestError(e,t,r,P)},sharedContext:{buildId:x}},V=new p.NodeNextRequest(e),L=new p.NodeNextResponse(t),B=c.NextRequestAdapter.fromNodeNextRequest(V,(0,c.signalFromNodeResponse)(t));try{let i=async e=>E.handle(B,K).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=U.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route");if(r){let t=`${H} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t)}else e.updateName(`${H} ${k}`)}),o=!!(0,s.getRequestMeta)(e,"minimalMode"),l=async s=>{var n,l;let p=async({previousCacheEntry:a})=>{try{if(!o&&z&&S&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await i(s);e.fetchMetrics=K.renderOpts.fetchMetrics;let l=K.renderOpts.pendingWaitUntil;l&&r.waitUntil&&(r.waitUntil(l),l=void 0);let p=K.renderOpts.collectedTags;if(!F)return await (0,u.sendResponse)(V,L,n,K.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,y.toNodeOutgoingHttpHeaders)(n.headers);p&&(t[f.NEXT_CACHE_TAGS_HEADER]=p),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=f.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,r=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=f.INFINITE_CACHE?void 0:K.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await E.onRequestError(e,t,{routerKind:"App Router",routePath:k,routeType:"route",revalidateReason:(0,d.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:z})},P),t}},c=await E.handleResponse({req:e,nextConfig:w,cacheKey:q,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:A,isRoutePPREnabled:!1,isOnDemandRevalidate:z,revalidateOnlyGenerated:S,responseGenerator:p,waitUntil:r.waitUntil,isMinimalMode:o});if(!F)return null;if((null==c||null==(n=c.value)?void 0:n.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==c||null==(l=c.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",z?"REVALIDATED":c.isMiss?"MISS":c.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,y.fromNodeOutgoingHttpHeaders)(c.value.headers);return o&&F||m.delete(f.NEXT_CACHE_TAGS_HEADER),!c.cacheControl||t.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,h.getCacheControlHeader)(c.cacheControl)),await (0,u.sendResponse)(V,L,new Response(c.value.body,{headers:m,status:c.value.status||200})),null};I?await l(I):await U.withPropagatedContext(e.headers,()=>U.trace(m.BaseServerSpan.handleRequest,{spanName:`${H} ${k}`,kind:n.SpanKind.SERVER,attributes:{"http.method":H,"http.target":e.url}},l))}catch(t){if(t instanceof g.NoFallbackError||await E.onRequestError(e,t,{routerKind:"App Router",routePath:M,routeType:"route",revalidateReason:(0,d.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:z})}),F)throw t;return await (0,u.sendResponse)(V,L,new Response(null,{status:500})),null}}e.s(["handler",()=>S,"patchFetch",()=>z,"routeModule",()=>E,"serverHooks",()=>P,"workAsyncStorage",()=>C,"workUnitAsyncStorage",()=>A],206185)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__ca42808d._.js.map