# Módulo: maintenance

Upload e download de **PDFs de histórico de manutenção** dos veículos.

Endpoints típicos:

- `POST /admin/cars/:id/maintenance` → upload do PDF (admin)
- `GET /partner/cars/:id/maintenance` → download para parceiro (RN004)
- `GET /admin/cars/:id/maintenance`   → download para admin

Storage: bucket privado no Supabase. Para parceiros e admin, gerar
URL assinada de curta duração.

Cliente público NÃO tem acesso a este recurso.
