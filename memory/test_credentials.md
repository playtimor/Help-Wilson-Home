# Para o Wilson — Credenciais de teste

## Admin token (URL: /adicionar-contribuicao)
- URL: `/adicionar-contribuicao`
- Token: `wilson-2026-admin`
- Header HTTP: `X-Admin-Token: wilson-2026-admin`

Endpoints protegidos (requerem header `X-Admin-Token`):
- POST `/api/contributors`
- DELETE `/api/contributors/{id}`
- DELETE `/api/messages/{id}`

Endpoints públicos:
- GET `/api/fundraiser/stats`
- GET `/api/contributors`
- GET `/api/messages`
- POST `/api/messages`
- POST `/api/admin/verify` (validates token)
