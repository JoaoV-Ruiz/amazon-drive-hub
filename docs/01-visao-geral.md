# 1. Visão geral

## O que é a AmazonRepasse

Plataforma web de **estoque e revenda de veículos** com três públicos:

- **Cliente** — visitante anônimo que navega pelo estoque e demonstra interesse.
- **Administrador** — equipe interna que opera o sistema.
- **Parceiro** — empresa/pessoa conveniada com acesso a frota completa,
  incluindo placa e histórico de manutenção.

---

## Princípios do projeto

1. **Ser utilizável desde a primeira versão.**
   Nada vai para produção sem que o fluxo do usuário esteja completo de ponta
   a ponta.

2. **Operação simples para a equipe interna.**
   Painéis e formulários precisam ser óbvios. Sem treinamento longo.

3. **Evitar complexidade desnecessária.**
   Não construir o que não é necessário agora. Sem microsserviços, sem
   filas, sem CRM externo, sem automações que não estejam no MVP.

4. **Toda modelagem preparada para crescer depois.**
   O schema do banco e a estrutura do código devem permitir adicionar
   funcionalidades futuras sem refatoração grande.

---

## Escopo final do MVP

### Cliente (público, sem login)

**Pode:**

- Entrar sem login
- Ver estoque disponível
- Filtrar veículos
- Abrir anúncio
- Ver fotos
- Ver preço
- Ver descrição
- Demonstrar interesse
- Abrir WhatsApp

**Não pode:**

- Ver placa
- Ver histórico
- Ver dados internos

### Administrador

**Pode:**

- Login
- CRUD completo de veículos
- Upload de histórico de manutenção (PDF)
- Visualizar leads
- Gerenciar parceiros
- Marcar consignação
- Mover veículo para vendidos
- Consultar FIPE no cadastro
- Restaurar registros apagados (soft delete)

### Parceiro

**Pode:**

- Login
- Ver toda a frota
- Filtrar carros consignados com ele
- Ver placa
- Baixar histórico de manutenção
- Solicitar carro fora da plataforma

**Não pode:**

- Editar veículos
- Alterar preços
- Alterar estoque

---

## Fora do escopo do MVP

Os itens abaixo **não serão construídos** no MVP. Se aparecerem em
discussão, devem ser anotados em backlog futuro:

- WhatsApp automático
- Email automático (notificações)
- Integração com CRM externo
- App mobile nativo
- Pagamento online
- Financiamento integrado
- Múltiplas filiais / multiempresa
- Relatórios avançados / BI
