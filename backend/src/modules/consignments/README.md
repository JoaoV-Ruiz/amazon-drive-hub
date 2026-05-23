# Módulo: consignments

Gestão de consignações (carros confiados por parceiros à AmazonRepasse).

Endpoints típicos:

- `POST /admin/consignments`            → cria consignação (admin)
- `GET /admin/consignments`             → histórico (admin)
- `PATCH /admin/consignments/:id/end`   → encerra consignação
- `GET /partner/consignments`           → consignações do parceiro logado

Status: `ATIVA` | `ENCERRADA`.

A relação "este carro está consignado com quem agora" é replicada em
`cars.partner_id` para facilitar consulta rápida.
