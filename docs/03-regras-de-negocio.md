# 3. Regras de negócio (congeladas)

Estas regras são **definições congeladas** do MVP. Toda implementação deve
respeitá-las. Alteração exige nova revisão do SDD.

---

## RN001 — Lead

Quando o cliente envia interesse num veículo:

```
cliente clica em "tenho interesse"
        │
        ▼
  lead criado no banco
        │
        ▼
   status = NOVO
        │
        ▼
visível no painel /admin/leads
```

### O que NÃO acontece (proibido no MVP)

- ❌ Disparo automático de WhatsApp
- ❌ Disparo automático de email
- ❌ Integração com CRM externo

O admin é quem entra em contato manualmente após ver o lead no painel.

---

## RN002 — Veículos vendidos

Quando um veículo é vendido, o admin altera o status:

```
status = DISPONIVEL
        │
        ▼
status = VENDIDO
```

### Consequências

- Sai do estoque principal (não aparece mais em `/estoque`).
- Aparece em `/vendidos` (página pública de carros vendidos).
- **Continua no banco** — nunca é apagado.

---

## RN003 — Soft delete global

Regra **absoluta** para todas as tabelas do sistema.

### O que sempre acontece

Toda tabela possui:

- `deleted_at` (timestamp)
- `deleted_by` (id do usuário que apagou — quando aplicável)

### O que nunca acontece

```
❌ DELETE FROM tabela WHERE id = ?
```

### O que sempre acontece

```sql
UPDATE tabela
SET deleted_at = NOW(),
    deleted_by = :user_id
WHERE id = :id;
```

### Restauração

O admin pode **restaurar** qualquer registro apagado limpando os campos
`deleted_at` e `deleted_by`.

### Consultas

Toda query padrão do sistema deve filtrar `deleted_at IS NULL`.

---

## RN004 — Placa

A placa do veículo é **obrigatória no cadastro**, mas a visibilidade
depende do papel.

### Cadastro

```
admin cadastra veículo
        │
        ▼
   placa OBRIGATÓRIA
```

### Visibilidade

| Papel    | Vê a placa? |
| -------- | :---------: |
| Cliente  |     ❌      |
| Parceiro |     ✅      |
| Admin    |     ✅      |

A placa **nunca** é exposta em endpoint público nem em response de API
acessado sem autenticação.

---

## RN005 — FIPE

A consulta à API da FIPE acontece **apenas no cadastro** do veículo,
como apoio ao admin.

### Fluxo

```
admin digita a placa
        │
        ▼
   consulta API FIPE
        │
        ▼
   retorna: ano, modelo, marca, valor FIPE
        │
        ▼
   admin DEFINE o preço final manualmente
```

### Regras

- O valor FIPE **não aparece** no anúncio público.
- O valor FIPE **não é** usado como preço automático.
- O preço final é sempre **definido pelo admin**.
- A consulta FIPE é **opcional** — o admin pode cadastrar manualmente.
