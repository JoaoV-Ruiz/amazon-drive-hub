# Módulo: leads

Captura e gestão de leads (interesses de clientes em veículos).

Endpoints típicos:

- `POST /leads`              → cria lead (rota pública) — status inicial `NOVO` (RN001)
- `GET /admin/leads`         → listagem (admin)
- `PATCH /admin/leads/:id`   → atualiza `status` (NOVO → EM_CONTATO → FECHADO/PERDIDO)
- `DELETE /admin/leads/:id`  → soft delete (RN003)

**Nada de disparo automático** de WhatsApp/email/CRM (RN001).
