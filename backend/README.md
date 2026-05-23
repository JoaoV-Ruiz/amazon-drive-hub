# Backend — AmazonRepasse

API HTTP da AmazonRepasse construída com **Node.js + Fastify + TypeScript**,
integrada ao **Supabase** (Postgres, Storage e Auth).

---

## Pré-requisitos

- Node.js 20.19+ (recomendado 22 LTS)
- npm 10+
- Projeto Supabase configurado

## Setup

```bash
cp .env.example .env
# preencha SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, etc.

npm install
npm run dev
```

API sobe em `http://localhost:3333`.

## Scripts

| Comando             | O que faz                                  |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Sobe em watch mode com `tsx`               |
| `npm run build`     | Compila TypeScript para `dist/`            |
| `npm start`         | Roda o build (`dist/server.js`)            |
| `npm run typecheck` | Apenas verifica os tipos                   |
| `npm run lint`      | Roda o ESLint                              |

---

## Estrutura

```
src/
├── modules/
│   ├── auth/
│   ├── cars/
│   ├── leads/
│   ├── partners/
│   ├── maintenance/
│   └── consignments/
│
├── database/        → cliente Supabase
├── middlewares/     → autenticação e autorização
├── utils/
├── env.ts           → carrega e valida variáveis de ambiente
├── app.ts           → instância Fastify + plugins + rotas
└── server.ts        → bootstrap (listen)
```

Cada módulo segue:

```
modules/<nome>/
├── <nome>.routes.ts
├── <nome>.controller.ts
├── <nome>.service.ts
├── <nome>.repository.ts
└── <nome>.schema.ts
```

---

## Convenções importantes

- **Soft delete sempre** (RN003). Nunca use `DELETE`. Use
  `UPDATE ... SET deleted_at = NOW()`.
- **Queries de leitura** filtram `deleted_at IS NULL` por padrão.
- **Placa** (`cars.plate`) **nunca** vai em resposta para usuário não
  autenticado (RN004). Sanitize no controller.
- **Validação** com Zod nos schemas do módulo, antes do controller usar
  os dados.
- **FIPE** só é consultada no fluxo de cadastro do admin (RN005).

---

## Observações sobre Supabase

- Use a **service role key** apenas no backend (nunca exponha).
- Para uploads de PDF/imagens, use o cliente Storage do Supabase
  diretamente do backend, retornando URL assinada quando necessário
  (PDFs de manutenção são restritos a admin/parceiro).
