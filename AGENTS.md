# AGENTS.md — AmazonRepasse

Este arquivo é lido automaticamente por agentes de IA (Cursor, Claude Code,
Codex, etc.). Use-o como ponto de partida ao trabalhar neste repositório.

---

## O que é o projeto

Site de **estoque e revenda de veículos** da AmazonRepasse, com três
públicos: cliente (anônimo), administrador e parceiro (consignatários).

Stack:

- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Backend**: Node.js + Fastify + TypeScript
- **Banco / Auth / Storage**: Supabase (PostgreSQL)
- **CDN**: Cloudflare

---

## ANTES de codar qualquer feature, leia

1. [`docs/01-visao-geral.md`](docs/01-visao-geral.md) — princípios e escopo
2. [`docs/02-papeis-e-permissoes.md`](docs/02-papeis-e-permissoes.md) — quem pode o quê
3. [`docs/03-regras-de-negocio.md`](docs/03-regras-de-negocio.md) — **RN001 a RN005 (congeladas)**
4. [`docs/04-arquitetura.md`](docs/04-arquitetura.md) — stack e fluxo
5. [`docs/05-modelo-de-dados.md`](docs/05-modelo-de-dados.md) — tabelas
6. [`docs/06-paginas-do-sistema.md`](docs/06-paginas-do-sistema.md) — rotas
7. [`docs/07-identidade-visual.md`](docs/07-identidade-visual.md) — cores e tipografia

Os documentos são **a fonte de verdade**. Se um pedido conflitar com eles,
pergunte antes de codar.

---

## Regras absolutas (nunca quebrar)

1. **RN003 — Soft delete sempre.** Nunca use `DELETE FROM`. Use
   `UPDATE ... SET deleted_at = NOW()`. Toda query padrão filtra
   `deleted_at IS NULL`.
2. **RN004 — Placa nunca em rota pública.** `car.plate` não pode aparecer
   em nenhuma resposta de API ou tela acessada por cliente anônimo.
3. **Service role do Supabase é só backend.** Nunca importar
   `SUPABASE_SERVICE_ROLE_KEY` no frontend. Frontend usa só a `anon key`.
4. **Validação de input com Zod** em todo endpoint do backend antes do
   service rodar.
5. **Sem WhatsApp/email/CRM automático** (RN001). Lead novo só aparece no
   painel; contato é manual.

---

## Estrutura do repositório

```
AmazonRepasse/
├── docs/                  → SDD (LER PRIMEIRO)
├── frontend/              → React + Vite + TS + Tailwind
├── backend/               → Fastify + TypeScript + Supabase
├── .cursor/rules/         → Regras detalhadas por arquivo
└── AGENTS.md              → Este arquivo
```

Detalhes por área:

- Frontend: [`frontend/README.md`](frontend/README.md)
- Backend: [`backend/README.md`](backend/README.md)

---

## Comandos

```bash
# Frontend
cd frontend && npm install && npm run dev    # http://localhost:5173

# Backend
cd backend && npm install && npm run dev     # http://localhost:3333
```

---

## Convenções de PR / commit

- Mensagens em português, no imperativo: "adiciona filtro por marca".
- Commits pequenos e focados.
- Nunca commitar `.env` (já protegido por `.gitignore`).
- Nunca commitar a `service_role` key em log/comentário/teste.

---

## Quando estiver em dúvida

- Funcionalidade não documentada nos `docs/`? → **Pergunte ao usuário antes de implementar.**
- Algo nos `docs/` parece errado? → **Aponte o conflito; não "corrija" silenciosamente.**
- Stack/biblioteca nova? → Confirme com o usuário antes de adicionar dependência.
