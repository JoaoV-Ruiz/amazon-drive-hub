# Frontend — AmazonRepasse

Aplicação web da AmazonRepasse construída com **React + Vite + TypeScript + TailwindCSS**.

Atende três públicos:

- Cliente (público, sem login)
- Administrador (`/admin/*`)
- Parceiro (`/partner/*`)

Detalhes em [`../docs/06-paginas-do-sistema.md`](../docs/06-paginas-do-sistema.md).

---

## Pré-requisitos

- Node.js 20.19+ (recomendado 22 LTS)
- npm 10+

## Setup

```bash
cp .env.example .env
# preencha VITE_API_URL e variáveis do Supabase

npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

## Scripts

| Comando            | O que faz                                |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Sobe o dev server do Vite                |
| `npm run build`    | Faz typecheck + bundle de produção       |
| `npm run preview`  | Preview do bundle de produção localmente |
| `npm run lint`     | Roda o ESLint                            |

---

## Estrutura de pastas

```
src/
├── pages/        → telas (uma pasta por rota principal)
├── components/   → componentes reutilizáveis
├── hooks/        → hooks customizados
├── services/     → chamadas à API e Supabase
├── layouts/      → layouts: público, admin, parceiro, auth
├── types/        → tipos compartilhados
├── App.tsx       → router
├── main.tsx      → bootstrap
└── index.css     → entrypoint Tailwind
```

Alias `@/...` aponta para `src/`.

---

## Convenções

- **Componentes** em PascalCase. Um por arquivo: `Button.tsx`, `CarCard.tsx`.
- **Hooks** sempre começam com `use`: `useAuth.ts`, `useCars.ts`.
- **Services** retornam dados já no formato dos `types/`.
- **Pages** ficam em `pages/<Area>/<NomeDaPagina>/index.tsx`.
- **Tailwind** primeiro, CSS custom só quando necessário.
- A **placa** nunca é renderizada em layouts/páginas do público (RN004).
