# AmazonRepasse

Plataforma de estoque e revenda de veículos da **AmazonRepasse**.

Permite que clientes naveguem pelo estoque sem login, administradores gerenciem
veículos, leads, parceiros e consignações, e parceiros consultem a frota completa
com acesso a placa e histórico de manutenção.

---

## Stack

| Camada    | Tecnologia                                       |
| --------- | ------------------------------------------------ |
| Frontend  | React + Vite + TypeScript + TailwindCSS          |
| Backend   | Node.js + Fastify + TypeScript                   |
| Banco     | Supabase (PostgreSQL + Storage + Auth)           |
| Edge / CDN| Cloudflare                                       |

---

## Estrutura do repositório

```
AmazonRepasse/
├── docs/        → Documentação do produto (SDD, regras, arquitetura)
├── frontend/    → Aplicação React (cliente, admin, parceiro)
├── backend/     → API Fastify + integração Supabase
└── README.md
```

Cada pasta possui seu próprio `README.md` com instruções específicas.

---

## Como começar

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd AmazonRepasse
```

### 2. Subir o frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3. Subir o backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

---

## Documentação

Toda a documentação do projeto (princípios, escopo, papéis, regras de negócio,
modelo de dados e arquitetura) está em [`docs/`](./docs/README.md).

Recomendado começar por:

1. [Visão geral](./docs/01-visao-geral.md)
2. [Papéis e permissões](./docs/02-papeis-e-permissoes.md)
3. [Regras de negócio](./docs/03-regras-de-negocio.md)
4. [Arquitetura](./docs/04-arquitetura.md)
5. [Modelo de dados](./docs/05-modelo-de-dados.md)
6. [Páginas do sistema](./docs/06-paginas-do-sistema.md)
7. [Identidade visual](./docs/07-identidade-visual.md)

---

## Princípios do projeto

- Ser **utilizável** desde a primeira versão.
- **Operação simples** para a equipe interna.
- **Evitar complexidade** desnecessária.
- Toda **modelagem preparada para crescer** depois.
