# 4. Arquitetura

## Visão geral

```
┌───────────────────┐
│  Frontend (React) │
│  React + Vite +   │
│  TypeScript +     │
│  TailwindCSS      │
└─────────┬─────────┘
          │ HTTPS
          ▼
┌───────────────────┐
│    Cloudflare     │
│  (CDN + WAF)      │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Backend (API)    │
│  Node.js +        │
│  Fastify +        │
│  TypeScript       │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     Supabase      │
│  ┌─────────────┐  │
│  │ PostgreSQL  │  │
│  ├─────────────┤  │
│  │   Storage   │  │
│  ├─────────────┤  │
│  │    Auth     │  │
│  └─────────────┘  │
└───────────────────┘
```

---

## Stack

### Frontend

- **React 18** — biblioteca UI
- **Vite** — bundler/dev server
- **TypeScript** — tipagem estática
- **TailwindCSS** — utilitários CSS
- **React Router** — roteamento

### Backend

- **Node.js 20.19+** — runtime (recomendado 22 LTS)
- **Fastify** — framework HTTP
- **TypeScript** — tipagem estática
- **@supabase/supabase-js** — cliente Supabase (service_role)
- **Zod** — validação de schemas

> A autenticação é **delegada ao Supabase Auth**. O backend não emite
> JWT próprio — apenas valida o token recebido. Detalhes abaixo.

### Infra

- **Supabase** — banco PostgreSQL gerenciado, storage de PDFs/imagens e Auth
- **Cloudflare** — CDN, WAF, DNS

---

## Estrutura de pastas (raiz)

```
AmazonRepasse/
├── docs/                  → SDD e documentação
├── frontend/              → Aplicação React
├── backend/               → API Fastify
├── .editorconfig
├── .gitignore
└── README.md
```

---

## Estrutura — `frontend/src`

```
frontend/src/
├── pages/        → telas (uma pasta por rota)
├── components/   → componentes reutilizáveis
├── hooks/        → hooks customizados
├── services/     → chamadas à API e integrações
├── layouts/      → layouts (público, admin, parceiro)
├── types/        → tipos compartilhados
├── App.tsx
└── main.tsx
```

---

## Estrutura — `backend/src`

```
backend/src/
├── modules/
│   ├── auth/           → login, sessão
│   ├── cars/           → CRUD de veículos
│   ├── leads/          → captura e listagem de leads
│   ├── partners/       → gestão de parceiros
│   ├── maintenance/    → upload e download de PDFs
│   └── consignments/   → consignações de veículos
│
├── database/           → cliente Supabase e migrations
├── middlewares/        → autenticação, autorização, etc.
├── utils/              → helpers
├── app.ts              → instância Fastify
└── server.ts           → bootstrap (listen)
```

### Padrão de módulo

Cada módulo segue o mesmo formato:

```
modules/<nome>/
├── <nome>.routes.ts       → registra rotas no Fastify
├── <nome>.controller.ts   → handlers HTTP
├── <nome>.service.ts      → regras de negócio
├── <nome>.repository.ts   → acesso ao Supabase
└── <nome>.schema.ts       → schemas Zod (validação)
```

---

## Fluxo de uma requisição

```
1. Cliente → Cloudflare (TLS, cache, WAF)
2. Cloudflare → Backend Fastify
3. Middleware: autentica (se necessário) e autoriza pelo `role`
4. Controller valida payload com Zod
5. Service aplica regra de negócio (ex.: RN003 soft delete)
6. Repository conversa com Supabase (PostgreSQL/Storage)
7. Response JSON volta pelo mesmo caminho
```

## Fluxo de autenticação

```
┌──────────┐                            ┌──────────────┐
│ Frontend │ ──── signInWithPassword ──▶│ Supabase Auth│
└────┬─────┘ ◀───── access_token ───────└──────────────┘
     │
     │  Authorization: Bearer <token>
     ▼
┌──────────┐                            ┌──────────────┐
│  Backend │ ──── auth.getUser(t) ─────▶│ Supabase Auth│
│ Fastify  │ ◀──── user válido ─────────└──────────────┘
└────┬─────┘
     │  busca role em profiles
     ▼
┌────────────────────────────────────────────────┐
│  req.user = { id, email, role, partnerId }    │
└────────────────────────────────────────────────┘
```

Implementação em `backend/src/middlewares/auth.ts`
(`authenticate` + `requireRole(...)`).

---

## Variáveis de ambiente

Cada serviço possui um `.env.example` com as variáveis necessárias.
Nenhuma variável real é commitada.

### Backend

```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
FIPE_API_URL=
```

### Frontend

```
VITE_API_URL=http://localhost:3333
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_WHATSAPP_NUMBER=
```
