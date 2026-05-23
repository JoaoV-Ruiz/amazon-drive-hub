# Módulo: cars

CRUD de veículos.

Endpoints típicos:

- `GET /cars`            → listagem pública (sem placa, só `DISPONIVEL`)
- `GET /cars/:id`        → detalhe público (sem placa)
- `GET /admin/cars`      → listagem admin (com placa, inclui vendidos)
- `POST /admin/cars`     → cadastro (admin) — placa obrigatória (RN004)
- `PATCH /admin/cars/:id`→ edição (admin)
- `DELETE /admin/cars/:id` → soft delete (RN003)
- `POST /admin/cars/:id/sell` → marca como vendido (RN002)
- `GET /admin/fipe?plate=...` → consulta FIPE (RN005)
- `GET /partner/cars`    → listagem parceiro (com placa, toda a frota)

**Atenção:** placa nunca em respostas para usuário não autenticado (RN004).
