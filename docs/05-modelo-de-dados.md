# 5. Modelo de dados

Banco: **PostgreSQL** (via Supabase).

Convenções:

- Todas as tabelas usam `uuid` em `id` (gerado pelo banco).
- Toda tabela tem `created_at`, `updated_at`, `deleted_at` (ver [RN003](./03-regras-de-negocio.md#rn003--soft-delete-global)).
- Toda query padrão filtra `deleted_at IS NULL`.

---

## PROFILES

Perfis dos usuários autenticados (admin e parceiro). Cliente é anônimo
e **não** existe nesta tabela.

A autenticação é feita pelo **Supabase Auth** — `auth.users` cuida de
email, senha (hash), recuperação e sessão. A tabela `profiles` é uma
**extensão** que carrega papel, vínculo com parceiro e nome de
exibição.

| Campo        | Tipo         | Descrição                                                       |
| ------------ | ------------ | --------------------------------------------------------------- |
| `id`         | uuid (PK)    | FK → `auth.users.id` (1:1)                                      |
| `name`       | text         | Nome de exibição                                                |
| `role`       | text         | `admin` \| `partner`                                            |
| `partner_id` | uuid (FK)    | Quando `role='partner'`, referencia `partners.id`. NULL p/ admin|
| `created_at` | timestamptz  |                                                                 |
| `updated_at` | timestamptz  |                                                                 |
| `deleted_at` | timestamptz  | Soft delete (RN003) — desativa o perfil                         |

### Email e senha

- **Email**: `auth.users.email` (não duplicado aqui).
- **Senha**: nunca tocada pelo nosso código. Gerenciada inteiramente
  pelo Supabase Auth.

### Criando perfis

1. Admin cria o usuário no Supabase Auth (via dashboard ou Admin API).
2. Trigger no banco (ou insert manual) cria a linha em `profiles`
   com `id = auth.users.id` e o `role` correto.

### Desativando perfis

Soft delete: `UPDATE profiles SET deleted_at = NOW() WHERE id = ?`.
O middleware de autenticação recusa tokens cujo perfil tem
`deleted_at IS NOT NULL`.

---

## CARS

Veículos do estoque.

| Campo             | Tipo         | Descrição                                       |
| ----------------- | ------------ | ----------------------------------------------- |
| `id`              | uuid (PK)    |                                                 |
| `brand`           | text         | Marca                                           |
| `model`           | text         | Modelo                                          |
| `plate`           | text         | Placa (obrigatória — RN004)                     |
| `year`            | int          | Ano                                             |
| `price`           | numeric      | Preço de venda (definido pelo admin — RN005)    |
| `km`              | int          | Quilometragem                                   |
| `fuel`            | text         | Combustível                                     |
| `description`     | text         | Descrição livre                                 |
| `status`          | text         | `DISPONIVEL` \| `VENDIDO`                       |
| `partner_id`      | uuid (FK)    | NULL ou referência a `partners.id` (consignação)|
| `maintenance_pdf` | text         | URL no Storage (PDF de manutenção)              |
| `created_at`      | timestamptz  |                                                 |
| `updated_at`      | timestamptz  |                                                 |
| `deleted_at`      | timestamptz  | Soft delete (RN003)                             |

### Regras

- `plate` é obrigatória no cadastro (RN004).
- `plate` **nunca** sai em endpoint público (clientes não veem).
- `status = VENDIDO` faz o carro sair do estoque (RN002).
- `partner_id` preenchido indica veículo consignado.

---

## PARTNERS

Parceiros conveniados.

| Campo        | Tipo         | Descrição              |
| ------------ | ------------ | ---------------------- |
| `id`         | uuid (PK)    |                        |
| `name`       | text         | Nome / razão social    |
| `email`      | text         | Contato                |
| `phone`      | text         | Telefone               |
| `created_at` | timestamptz  |                        |
| `updated_at` | timestamptz  |                        |
| `deleted_at` | timestamptz  | Soft delete (RN003)    |

> O login do parceiro vive em `auth.users` (Supabase Auth), com perfil
> em `profiles` (`role = 'partner'`, `partner_id` apontando pra cá).
> A tabela `partners` guarda os **dados comerciais** e é referenciada
> por `cars.partner_id` e `consignments.partner_id`.

---

## LEADS

Interesses demonstrados por clientes.

| Campo        | Tipo         | Descrição                              |
| ------------ | ------------ | -------------------------------------- |
| `id`         | uuid (PK)    |                                        |
| `car_id`     | uuid (FK)    | Veículo de interesse → `cars.id`       |
| `name`       | text         | Nome do interessado                    |
| `phone`      | text         | Telefone / WhatsApp                    |
| `message`    | text         | Mensagem livre                         |
| `status`     | text         | `NOVO` \| `EM_CONTATO` \| `FECHADO` \| `PERDIDO` |
| `created_at` | timestamptz  |                                        |
| `updated_at` | timestamptz  |                                        |
| `deleted_at` | timestamptz  | Soft delete (RN003)                    |

### Regras

- Lead criado começa sempre com `status = NOVO` (RN001).
- Nenhum disparo automático acontece (RN001).

---

## CAR_IMAGES

Galeria de fotos de cada veículo.

| Campo     | Tipo       | Descrição                          |
| --------- | ---------- | ---------------------------------- |
| `id`      | uuid (PK)  |                                    |
| `car_id`  | uuid (FK)  | Referência a `cars.id`             |
| `url`     | text       | URL pública no Supabase Storage    |

> Ordem das fotos pode ser controlada por um campo `position` ou pelo
> `created_at`. Para o MVP, basta `created_at` ASC.

---

## CONSIGNMENTS

Histórico de consignações entre veículos e parceiros.

| Campo         | Tipo       | Descrição                                  |
| ------------- | ---------- | ------------------------------------------ |
| `id`          | uuid (PK)  |                                            |
| `car_id`      | uuid (FK)  | Veículo consignado                         |
| `partner_id`  | uuid (FK)  | Parceiro responsável                       |
| `status`      | text       | `ATIVA` \| `ENCERRADA`                     |

> A relação rápida "esse carro está consignado com fulano agora?" usa
> `cars.partner_id`. A tabela `consignments` guarda o **histórico
> completo** (incluindo encerradas).

---

## Diagrama resumido

```
auth.users (Supabase Auth)
       │ 1:1
       ▼
   profiles ────────── (N) partners (via partner_id, quando role='partner')
                            │
                            │ 1:N
                            ▼
                          cars (via partner_id quando consignado)
                            │
                            ├── (N) car_images
                            ├── (N) leads
                            └── (N) consignments ─── (N) partners
```
