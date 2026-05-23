# 6. Páginas do sistema

Rotas previstas no MVP, agrupadas por papel.

---

## Público (sem login)

| Rota          | Descrição                                                         |
| ------------- | ----------------------------------------------------------------- |
| `/`           | Home / landing — destaques e CTA para o estoque                   |
| `/estoque`    | Listagem completa de veículos disponíveis, com filtros            |
| `/carro/:id`  | Página do anúncio: fotos, preço, descrição, botão de interesse    |
| `/vendidos`   | Veículos já vendidos (referência social/portfólio)                |

### Comportamentos chave

- **Sem login** em todas as rotas públicas.
- `/carro/:id` exibe botão **"Tenho interesse"** que abre um formulário
  simples (nome, telefone, mensagem) → cria lead com `status = NOVO`.
- `/carro/:id` exibe botão **"WhatsApp"** que abre `wa.me/<numero>` com
  mensagem pré-preenchida (modelo + ano).
- **Placa nunca aparece** em nenhuma rota pública (RN004).

### `/carro/:id` é compartilhada entre papéis

A rota é a mesma para os três papéis. A UI é progressiva conforme quem
está autenticado:

| Quem acessa | O que vê adicionalmente                                          |
| ----------- | ---------------------------------------------------------------- |
| Cliente     | Fotos, preço, descrição, botão "Tenho interesse", botão WhatsApp |
| Parceiro    | Tudo do cliente + **placa** + botão **"Baixar PDF de manutenção"**|
| Admin       | Tudo do parceiro + botões de edição, marcar vendido, restaurar   |

Isso evita duplicar páginas e atende à descrição: *"parceiros baixam o
histórico diretamente do link do anúncio do carro"*.

---

## Administrador (`/admin`)

Acesso restrito a `role = 'admin'`. Layout próprio com menu lateral.

| Rota               | Descrição                                                  |
| ------------------ | ---------------------------------------------------------- |
| `/admin`           | Dashboard — resumo do estoque, leads novos, atividades     |
| `/admin/carros`    | CRUD de veículos (criar, editar, marcar vendido, restaurar)|
| `/admin/leads`     | Listagem e atualização de status dos leads                 |
| `/admin/parceiros` | CRUD de parceiros                                          |
| `/admin/config`    | Configurações gerais (WhatsApp, dados da empresa, etc.)    |

### Comportamentos chave

- Cadastro de carro tem ação **"Consultar FIPE"** (RN005).
- Cadastro exige `plate` (RN004).
- Botão "Marcar como vendido" muda `status` para `VENDIDO` (RN002).
- Listagens mostram registros **não apagados**; uma aba/filtro
  "Lixeira" permite restaurar (RN003).

---

## Parceiro (`/partner`)

Acesso restrito a `role = 'partner'`. Layout próprio.

| Rota                       | Descrição                                                  |
| -------------------------- | ---------------------------------------------------------- |
| `/partner`                 | Dashboard do parceiro                                      |
| `/partner/frota`           | Frota completa da AmazonRepasse (com placa visível)        |
| `/partner/meus-consignados`| Subconjunto: apenas carros consignados com este parceiro   |

### Comportamentos chave

- Parceiro **vê placa** e **baixa PDF de manutenção** (RN004).
- Parceiro **não edita nada** — todas as telas são read-only.
- Botão "Solicitar carro fora da plataforma" abre formulário simples
  que gera notificação para o admin.

---

## Rotas auxiliares de autenticação

| Rota             | Descrição                                  |
| ---------------- | ------------------------------------------ |
| `/login`         | Tela única de login (decide para onde vai) |
| `/logout`        | Encerra sessão e volta para `/`            |

Após login:

- `role = 'admin'`   → redireciona para `/admin`
- `role = 'partner'` → redireciona para `/partner`

---

## Resumo de layouts

| Layout    | Usado em                  | Características                       |
| --------- | ------------------------- | ------------------------------------- |
| Público   | `/`, `/estoque`, `/carro/:id`, `/vendidos` | Header marketing, footer institucional |
| Admin     | `/admin/*`                | Menu lateral, header com usuário       |
| Parceiro  | `/partner/*`              | Menu lateral simplificado              |
| Auth      | `/login`                  | Layout centralizado, sem chrome        |
