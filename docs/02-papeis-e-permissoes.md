# 2. Papéis e permissões

O sistema possui **três papéis** (`role` na tabela `profiles`, exceto
cliente que é anônimo):

| Papel         | Identificador  | Login?              |
| ------------- | -------------- | ------------------- |
| Cliente       | (anônimo)      | Não                 |
| Administrador | `admin`        | Sim (Supabase Auth) |
| Parceiro      | `partner`      | Sim (Supabase Auth) |

> Quem cuida do login (email + senha + sessão) é o **Supabase Auth**.
> A coluna `role` em `profiles` decide o que o usuário pode fazer
> depois de autenticado. Detalhes em
> [`05-modelo-de-dados.md`](./05-modelo-de-dados.md).

---

## Cliente (público)

Usuário anônimo. Acessa o site sem autenticação.

### Permissões

| Ação                              | Permitido |
| --------------------------------- | --------- |
| Ver estoque disponível            | ✅        |
| Filtrar veículos                  | ✅        |
| Abrir anúncio                     | ✅        |
| Ver fotos                         | ✅        |
| Ver preço                         | ✅        |
| Ver descrição                     | ✅        |
| Demonstrar interesse (lead)       | ✅        |
| Abrir WhatsApp                    | ✅        |
| Ver placa                         | ❌        |
| Ver histórico de manutenção       | ❌        |
| Ver dados internos                | ❌        |

### Observações

- O cliente **nunca** vê a placa em nenhuma tela.
- Demonstrar interesse cria um registro em `leads` com `status = NOVO`
  (ver [RN001](./03-regras-de-negocio.md#rn001--lead)).

---

## Administrador

Equipe interna da AmazonRepasse. Tem acesso total ao painel `/admin`.

### Permissões

| Ação                                            | Permitido |
| ----------------------------------------------- | --------- |
| Login                                           | ✅        |
| CRUD completo de veículos                       | ✅        |
| Upload de histórico de manutenção (PDF)         | ✅        |
| Visualizar leads                                | ✅        |
| Gerenciar parceiros (CRUD)                      | ✅        |
| Marcar consignação                              | ✅        |
| Mover veículo para vendidos                     | ✅        |
| Consultar FIPE no cadastro                      | ✅        |
| Restaurar registros apagados (soft delete)      | ✅        |

### Observações

- Apenas o admin altera `status` de veículos.
- Apenas o admin define `price`.
- Apenas o admin pode usar a consulta FIPE
  (ver [RN005](./03-regras-de-negocio.md#rn005--fipe)).

---

## Parceiro

Empresa ou pessoa conveniada. Possui login e acessa `/partner`.

### Permissões

| Ação                                            | Permitido |
| ----------------------------------------------- | --------- |
| Login                                           | ✅        |
| Ver toda a frota                                | ✅        |
| Filtrar carros consignados com ele              | ✅        |
| Ver placa                                       | ✅        |
| Baixar histórico de manutenção                  | ✅        |
| Solicitar carro fora da plataforma              | ✅        |
| Editar veículos                                 | ❌        |
| Alterar preços                                  | ❌        |
| Alterar estoque                                 | ❌        |

### Observações

- O parceiro **lê** dados de veículos, **nunca escreve**.
- A única ação de escrita é "solicitar carro fora da plataforma" — gera
  um registro/notificação para o admin.

---

## Matriz resumida

| Recurso                       | Cliente | Admin | Parceiro |
| ----------------------------- | :-----: | :---: | :------: |
| Ver estoque                   |   ✅    |  ✅   |   ✅     |
| Ver placa                     |   ❌    |  ✅   |   ✅     |
| Ver histórico manutenção      |   ❌    |  ✅   |   ✅     |
| Ver preço                     |   ✅    |  ✅   |   ✅     |
| Editar veículo                |   ❌    |  ✅   |   ❌     |
| Criar lead                    |   ✅    |  ❌   |   ❌     |
| Ver leads                     |   ❌    |  ✅   |   ❌     |
| Gerenciar parceiros           |   ❌    |  ✅   |   ❌     |
| Marcar consignação            |   ❌    |  ✅   |   ❌     |
| Marcar vendido                |   ❌    |  ✅   |   ❌     |
| Consultar FIPE                |   ❌    |  ✅   |   ❌     |
| Restaurar soft delete         |   ❌    |  ✅   |   ❌     |
