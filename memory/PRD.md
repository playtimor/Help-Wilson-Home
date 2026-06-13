# Para o Wilson — Fundraiser

## Problem statement
Website fundraiser para Wilson da Conceição Fernandes (moçambicano, foi para Timor em maio 2023, veio para Lisboa em junho 2025, sem ver a família). Aniversário 25 de junho. Meta: €1.000. Donativos offline (MBWay 913419879 e Revolut revolut.me/luslo31l, ambos em nome de Luís Morais Leitão). Equipa organizadora: Sancha, Gonçalo, Jess, Ana, Lu, Joana.

## Architecture
- Backend: FastAPI + MongoDB (motor). Routes prefixed `/api`.
- Frontend: React + Tailwind + lucide-react + sonner.
- Auth: simple admin token (header `X-Admin-Token`), stored on frontend via localStorage key `wilson_admin_token`.
- Admin token (env var ADMIN_TOKEN): `wilson-2026-admin`.

## Implemented (Dec 2025)
- Public landing page (`/`): Hero with Wilson photo + Mozambique flag, Journey (Timor → Lisboa → Moçambique), Goal & live progress bar with countdowns to 20/25 jun, Donation methods (MBWay copyable, Revolut clickable link), public Messages form + wall, thanks footer "Obrigado a todos que contribuíram."
- Admin page (`/adicionar-contribuicao`): token login, add contributions (name + amount + note), list/delete contributions, moderate messages.
- Backend endpoints:
  - Public: GET /api/fundraiser/stats, GET /api/contributors, GET /api/messages, POST /api/messages, POST /api/admin/verify
  - Admin-only: POST/DELETE /api/contributors, DELETE /api/messages
- Tested end-to-end: 24/24 backend + all frontend flows.

## Backlog (P1/P2)
- P1: replace placeholder progress-bar percentage label with raised/goal formatted text directly on the bar.
- P2: export contributor list as CSV from admin.
- P2: email notification when goal is reached.
- P2: share-to-social buttons (WhatsApp, Instagram story).
