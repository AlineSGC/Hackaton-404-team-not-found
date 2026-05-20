# 🔌 Integração Backend - Documentação

**Projeto:** SICAS Hub - Hackaton Caixa Equipe 404  
**Data:** Maio 2026  
**Status:** Pronto para Integração  
**Versão:** 1.0

---

## 📦 Resumo do que foi Criado

### Estrutura do Projeto

```
src/app/
├── core/
│   ├── auth/
│   │   ├── auth.service.ts          → Serviço de autenticação
│   │   └── auth.guard.ts            → Guard de proteção de rotas
│   └── services/
│       ├── atalho.service.ts        → Gerenciamento de atalhos
│       └── rotina.service.ts        → Gerenciamento de rotinas
│
├── features/
│   ├── login/
│   │   └── login.component.ts       → Tela de login
│   ├── dashboard/
│   │   ├── dashboard.component.ts   → Tela principal
│   │   └── components/
│   │       └── adicionar-rotina-modal/
│   ├── atalhos/
│   │   └── atalhos.component.ts     → Gerenciador de atalhos
│   └── rotinas/
│       └── rotinas.component.ts     → Gerenciador de rotinas
│
└── shared/
    └── components/
        ├── header/
        ├── footer/
        ├── side-menu/
        ├── rotina-card/
        ├── acessos-recentes/
        └── favoritos-anotacoes/
```

### Stack Tecnológico

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| Angular | 18.2 | Framework principal |
| TypeScript | 5.5 | Linguagem de programação |
| RxJS | 7.8 | Programação reativa |
| Angular Router | 18.2 | Roteamento |
| Reactive Forms | 18.2 | Formulários |
| Angular Signals | 18.2 | State management |
| HttpClient | 18.2 | Comunicação HTTP |

---

## 🛣️ Rotas que Precisam de Integração Backend

### Mapa de Rotas

```
/login                  ← Autenticação (sem guard)
  ↓
/dashboard              ← Página principal (com guard)
  ├─ /atalhos          ← Gerenciador de atalhos (com guard)
  └─ /rotinas          ← Gerenciador de rotinas (com guard)
```

### Detalhamento das Rotas

| Rota | Componente | Autenticação | Descrição | Dados Necessários |
|------|-----------|--------------|-----------|------------------|
| `/login` | LoginComponent | ❌ Não | Tela de autenticação | - |
| `/dashboard` | DashboardComponent | ✅ Sim | Página principal | Rotinas, Atalhos, Acessos |
| `/atalhos` | AtalhosComponent | ✅ Sim | Gerenciador de atalhos | Lista de Atalhos |
| `/rotinas` | RotinasComponent | ✅ Sim | Gerenciador de rotinas | Lista de Rotinas |

📍 **Arquivo:** `src/app/app.routes.ts`

```typescript
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'atalhos', component: AtalhosComponent, canActivate: [authGuard] },
  { path: 'rotinas', component: RotinasComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
```

---

## 🧩 Componentes que Precisam de Ação Backend

### 1. LoginComponent
📍 **Arquivo:** `src/app/features/login/login.component.ts`

**Responsabilidade:** Autenticação do usuário

**Formulário Reactivo:**
```typescript
{
  usuario: string  (obrigatório)
  senha: string    (obrigatório)
}
```

**Fluxo:**
1. Usuário preenche formulário
2. Submete form → Chama `authService.login(usuario, senha)`
3. Backend valida credenciais
4. Retorna token JWT
5. Token salvo em localStorage
6. Redireciona para `/dashboard`

**Endpoint Esperado:**
```
POST /api/auth/login

Request Body:
{
  "usuario": "string",
  "senha": "string"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": "123",
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}

Error (401 Unauthorized):
{
  "message": "Usuário ou senha inválidos"
}
```

---

### 2. DashboardComponent
📍 **Arquivo:** `src/app/features/dashboard/dashboard.component.ts`

**Responsabilidade:** Exibir página principal com dados do usuário

**Componentes Filhos:**
- `RotinaCardComponent` - Cards de rotinas
- `AcessosRecentesComponent` - Histórico de acessos
- `FavoritosAnotacoesComponent` - Favoritos e anotações
- `AdicionarRotinaModalComponent` - Modal para criar rotina

**Endpoints Esperados:**

```
GET /api/rotinas
Response: 
[
  {
    "id": "1",
    "titulo": "Abertura de Conta",
    "descricao": "Inicie o processo de abertura de conta completo.",
    "icone": "account-circle0.svg",
    "link": "https://siac.caixa.gov.br"
  },
  ...
]

GET /api/acessos-recentes
Response:
[
  {
    "id": "1",
    "rotina": "Abertura de Conta",
    "dataAcesso": "2026-05-20T10:30:00Z",
    "hora": "10:30"
  },
  ...
]

GET /api/favoritos
Response:
[
  {
    "id": "1",
    "rotina": "Habitação",
    "adicionadoEm": "2026-05-15T14:20:00Z"
  },
  ...
]

GET /api/anotacoes
Response:
[
  {
    "id": "1",
    "titulo": "Lembrança Importante",
    "conteudo": "Verificar prazos de FGTS",
    "criadaEm": "2026-05-18T09:00:00Z"
  },
  ...
]
```

---

### 3. AtalhosComponent
📍 **Arquivo:** `src/app/features/atalhos/atalhos.component.ts`

**Responsabilidade:** Gerenciamento completo de atalhos/favoritos

**Estrutura de Dados:**
```typescript
interface Atalho {
  id: string;
  nome: string;
  url: string;
  fixado: boolean;
  observacoes: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
}
```

**Operações CRUD:**

```
GET /api/atalhos
Response: Array<Atalho>

POST /api/atalhos
Request: { nome, url, fixado, observacoes }
Response: Atalho criado

PUT /api/atalhos/:id
Request: { nome, url, fixado, observacoes }
Response: Atalho atualizado

DELETE /api/atalhos/:id
Response: { message: "Deletado com sucesso" }

PATCH /api/atalhos/:id/fixar
Response: { fixado: boolean }
```

---

### 4. RotinasComponent
📍 **Arquivo:** `src/app/features/rotinas/rotinas.component.ts`

**Responsabilidade:** Gerenciamento completo de rotinas/processos

**Estrutura de Dados:**
```typescript
interface Rotina {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  link?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
  usuarioId?: string;
}
```

**Operações CRUD:**

```
GET /api/rotinas
Response: Array<Rotina>

POST /api/rotinas
Request: { titulo, descricao, icone, link }
Response: Rotina criada

PUT /api/rotinas/:id
Request: { titulo, descricao, icone, link }
Response: Rotina atualizada

DELETE /api/rotinas/:id
Response: { message: "Deletado com sucesso" }
```

---

### 5. Componentes Compartilhados

| Componente | Localização | Dados Necessários | Endpoint |
|-----------|-----------|------------------|----------|
| `RotinaCardComponent` | `shared/components/rotina-card/` | Dados de rotina individual | - (recebe via `@Input`) |
| `AcessosRecentesComponent` | `shared/components/acessos-recentes/` | Últimos 5 acessos do usuário | `GET /api/acessos-recentes` |
| `FavoritosAnotacoesComponent` | `shared/components/favoritos-anotacoes/` | Favoritos e anotações | `GET /api/favoritos`, `GET /api/anotacoes` |

---

## 🔌 Serviços e Integrações Preparadas

### 1. AuthService
📍 **Arquivo:** `src/app/core/auth/auth.service.ts`

**Status:** ✅ 80% implementado

**Métodos Públicos:**

```typescript
// Login do usuário
login(usuario: string, senha: string): Observable<any>

// Logout
logout(): void

// Verificar autenticação
get isLoggedIn(): boolean
```

**Funcionamento Atual:**
- ✅ Suporta mock (`environment.useMock = true`)
- ✅ Suporta API real (`environment.useMock = false`)
- ✅ Armazena token em localStorage
- ✅ Integrado com Router
- ⚠️ Sem refresh token
- ⚠️ Sem timeout automático

**Código:**
```typescript
login(usuario: string, senha: string): Observable<any> {
  if (environment.useMock) {
    return of({ token: 'mock-jwt-token-12345' }).pipe(
      delay(1000),
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.loggedIn.set(true);
        this.router.navigate(['/dashboard']);
      })
    );
  } else {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/login`, 
      { usuario, senha }
    ).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.loggedIn.set(true);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }
}
```

**TODO:**
- [ ] Implementar refresh token
- [ ] Adicionar timeout automático
- [ ] Melhorar tratamento de erros

---

### 2. RotinaService
📍 **Arquivo:** `src/app/core/services/rotina.service.ts`

**Status:** ⚠️ 60% implementado

**Métodos Disponíveis:**

```typescript
// Obter rotinas reativo
getRotinasSignal(): Signal<Rotina[]>

// Adicionar nova rotina
adicionarRotina(novaRotina: Rotina): Observable<Rotina>
```

**Status:**
- ✅ Usa Angular Signals (reatividade moderna)
- ✅ Suporta mock e API real
- ✅ Delay simulado para UX (500ms)
- ✅ Atualiza estado após sucesso
- ⚠️ Faltam métodos updateRotina() e deleteRotina()
- ⚠️ Sem carregamento inicial do backend

**Endpoints Integrados:**

```typescript
// Listar rotinas
POST /api/rotinas

// Criar rotina
POST /api/rotinas
```

**TODO - Métodos a Implementar:**

```typescript
// Buscar todas as rotinas
getRotinas(): Observable<Rotina[]> {
  return this.http.get<Rotina[]>(`${environment.apiUrl}/rotinas`).pipe(
    tap(rotinas => {
      this.rotinas.set(rotinas);
    })
  );
}

// Atualizar rotina
updateRotina(id: string, rotina: Rotina): Observable<Rotina> {
  return this.http.put<Rotina>(
    `${environment.apiUrl}/rotinas/${id}`, 
    rotina
  ).pipe(
    tap(rotina => {
      this.rotinas.update(rotinas => 
        rotinas.map(r => r.id === id ? rotina : r)
      );
    })
  );
}

// Deletar rotina
deleteRotina(id: string): Observable<void> {
  return this.http.delete<void>(
    `${environment.apiUrl}/rotinas/${id}`
  ).pipe(
    tap(() => {
      this.rotinas.update(rotinas => 
        rotinas.filter(r => r.id !== id)
      );
    })
  );
}
```

---

### 3. AtalhoService
📍 **Arquivo:** `src/app/core/services/atalho.service.ts`

**Status:** ⚠️ 40% implementado

**Métodos Disponíveis:**

```typescript
// Obter atalhos reativo
getAtalhosSignal(): Signal<Atalho[]>

// Toggle fixação
toggleFixado(id: string): void

// Excluir atalho
excluirAtalho(id: string): void
```

**Status:**
- ✅ Usa Angular Signals
- ⚠️ Métodos locais sem chamadas HTTP
- ⚠️ Ainda com mock data hardcoded
- ❌ Sem sincronização com backend

**TODO - Integração Completa:**

```typescript
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

export interface Atalho {
  id: string;
  nome: string;
  url: string;
  fixado: boolean;
  observacoes: string;
}

@Injectable({
  providedIn: 'root'
})
export class AtalhoService {
  private atalhos = signal<Atalho[]>([]);

  constructor(private http: HttpClient) {
    this.carregarAtalhos();
  }

  getAtalhosSignal() {
    return this.atalhos;
  }

  // IMPLEMENTAR
  carregarAtalhos(): Observable<Atalho[]> {
    return this.http.get<Atalho[]>(`${environment.apiUrl}/atalhos`).pipe(
      tap(atalhos => this.atalhos.set(atalhos))
    );
  }

  // IMPLEMENTAR
  criarAtalho(atalho: Atalho): Observable<Atalho> {
    return this.http.post<Atalho>(`${environment.apiUrl}/atalhos`, atalho).pipe(
      tap(novoAtalho => {
        this.atalhos.update(atalhos => [...atalhos, novoAtalho]);
      })
    );
  }

  // IMPLEMENTAR
  updateAtalho(id: string, atalho: Atalho): Observable<Atalho> {
    return this.http.put<Atalho>(
      `${environment.apiUrl}/atalhos/${id}`, 
      atalho
    ).pipe(
      tap(atualizado => {
        this.atalhos.update(atalhos =>
          atalhos.map(a => a.id === id ? atualizado : a)
        );
      })
    );
  }

  // IMPLEMENTAR
  toggleFixado(id: string): Observable<Atalho> {
    return this.http.patch<Atalho>(
      `${environment.apiUrl}/atalhos/${id}/fixar`, 
      {}
    ).pipe(
      tap(atualizado => {
        this.atalhos.update(atalhos =>
          atalhos.map(a => a.id === id ? atualizado : a)
        );
      })
    );
  }

  // IMPLEMENTAR
  excluirAtalho(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/atalhos/${id}`).pipe(
      tap(() => {
        this.atalhos.update(atalhos =>
          atalhos.filter(a => a.id !== id)
        );
      })
    );
  }
}
```

---

### 4. Auth Guard
📍 **Arquivo:** `src/app/core/auth/auth.guard.ts`

**Função:** Proteger rotas que requerem autenticação

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
```

**Uso:**
```typescript
{ 
  path: 'dashboard', 
  component: DashboardComponent, 
  canActivate: [authGuard] 
}
```

---

### 5. HttpClient + Interceptor
📍 **Arquivo:** `src/app/app.config.ts`

**Status:** ⚠️ HttpClient configurado, interceptor faltando

**TODO - Implementar HttpAuthInterceptor:**

```typescript
// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('sicas_auth_token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
```

**Registrar no app.config.ts:**

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... outros providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
```

---

### 6. Environment Configuration
📍 **Arquivo:** `src/environments/environment.ts`

**Status:** ⚠️ Configuração básica pronta, faltam ajustes

**Arquivo Atual:**
```typescript
export const environment = {
  production: false,
  useMock: true,  // ← Mude para false após conectar API
  apiUrl: 'http://localhost:3000/api'  // ← Configure URL real
};
```

**Production Environment:**
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  useMock: false,
  apiUrl: 'https://api.producao.com.br/api',
  apiTimeout: 10000
};
```

---

## 📊 Checklist de Integração

### Fase 1: Autenticação (Crítica)
- [ ] Endpoint POST `/api/auth/login` implementado
- [ ] Token JWT retornado
- [ ] AuthService conectado ao backend
- [ ] Login testado end-to-end
- [ ] Auth guard funcionando

### Fase 2: Dados Básicos (Alta Prioridade)
- [ ] GET `/api/rotinas` implementado
- [ ] GET `/api/atalhos` implementado
- [ ] RotinaService.getRotinas() funcionando
- [ ] AtalhoService.carregarAtalhos() funcionando
- [ ] Dashboard carregando dados

### Fase 3: CRUD Rotinas (Média Prioridade)
- [ ] POST `/api/rotinas` implementado
- [ ] PUT `/api/rotinas/:id` implementado
- [ ] DELETE `/api/rotinas/:id` implementado
- [ ] RotinaComponent CRUD completo
- [ ] Testes de integração

### Fase 4: CRUD Atalhos (Média Prioridade)
- [ ] POST `/api/atalhos` implementado
- [ ] PUT `/api/atalhos/:id` implementado
- [ ] DELETE `/api/atalhos/:id` implementado
- [ ] PATCH `/api/atalhos/:id/fixar` implementado
- [ ] AtalhoComponent CRUD completo

### Fase 5: Dados Secundários (Baixa Prioridade)
- [ ] GET `/api/acessos-recentes` implementado
- [ ] GET `/api/favoritos` implementado
- [ ] GET `/api/anotacoes` implementado
- [ ] Componentes secundários funcionando

### Fase 6: Polish (Final)
- [ ] Tratamento de erros 404, 401, 500
- [ ] Loading states e spinners
- [ ] Mensagens de erro para usuário
- [ ] Retry automático em falhas
- [ ] Cache de dados

---

## 🔐 Segurança

### Recomendações Gerais

```
✅ HTTPS em produção (obrigatório)
✅ CORS configurado corretamente
✅ Validação de entrada no backend
✅ Rate limiting
✅ Token expiration
✅ Refresh token com rotation
✅ Logout automático por timeout
✅ Proteção CSRF
```

### CORS - Configuração Necessária

**Backend deve aceitar:**
```
Origin: http://localhost:4200      (desenvolvimento)
Origin: https://app.caixa.com      (produção)

Headers: Authorization, Content-Type
Methods: GET, POST, PUT, DELETE, PATCH
```

---

## 📞 Dúvidas Frequentes

### P: Como testar com mock?
**R:** Mude `environment.useMock = true` em `src/environments/environment.ts`

### P: Como usar API real?
**R:** 
1. Mude `environment.useMock = false`
2. Configure `environment.apiUrl` com URL correta
3. Certifique-se que CORS está configurado

### P: Onde é armazenado o token?
**R:** Em `localStorage` com chave `sicas_auth_token`

### P: Como adicionar novo serviço?
**R:** Crie em `src/app/core/services/novo.service.ts` e injete nos componentes

### P: Como adicionar nova rota?
**R:** Edite `src/app/app.routes.ts` e adicione configuração de rota

---

## 📚 Links Úteis

- [Documentação Angular](https://angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [Angular Signals](https://angular.io/guide/signals)
- [HTTP Client Guide](https://angular.io/guide/http)
- [Repositório](https://github.com/AlineSGC/Hackaton-404-team-not-found)

---

## 📝 Histórico de Versões

| Versão | Data | Alterações |
|--------|------|-----------|
| 1.0 | Maio 2026 | Documentação inicial de integração |

---

**Última atualização:** Maio 2026  
**Responsável:** Frontend Team  
**Status:** Em desenvolvimento  
**Feedback:** Entre em contato via GitHub Issues
