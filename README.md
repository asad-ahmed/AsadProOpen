# Field Tech Companion (MVP)

A standalone, mobile-first field service app designed for one-hand operation in the field. It includes:
- **Expo React Native mobile app** (offline-first)
- **Next.js web app** (responsive + admin/office parity)
- **Node/Express API** with adapter abstraction
- **PostgreSQL + Prisma schema**
- **Render blueprint** for one-click deployment

## Monorepo structure
- `apps/mobile`: Expo app for technicians.
- `apps/web`: Next.js App Router web app for tech + admin views.
- `apps/api`: Express API + adapters + Prisma schema.
- `packages/shared`: shared types + adapter interface.
- `packages/sync`: sync engine with retries/backoff.
- `docs/ARCHITECTURE.md`: offline-first sync design.
- `render.yaml`: free-plan static Render blueprint.
- `render.full.yaml`: optional full-stack Render blueprint (API + DB + Redis).

## MVP feature coverage
### Mobile + Web technician workflows
1. Login + Demo mode
2. Today job list
3. Job detail context
4. Status updates
5. Notes
6. Photos
7. Invoice builder
8. Signature capture scaffold
9. Payment capture scaffold
10. Closeout action
11. Settings/sync view

### Web-only office/admin extras
- Dispatch board scaffold
- Job assignment scaffold
- Customer management endpoint
- Basic reporting section scaffold

## Offline-first behavior
- Local DB is source of truth on device (`expo-sqlite`).
- Mutations are written locally first.
- `sync_queue` persists all outbound actions.
- Retry with exponential backoff in `@ftc/sync`.
- Conflict-ready hooks via `onConflict` callback.
- Manual “Sync now” button in mobile UI.

## ServiceTitan integration strategy
Adapter interface in `@ftc/shared`:
- `listJobs()`
- `getJob()`
- `updateJobStatus()`
- `createNote()`
- `uploadPhoto()`
- `createInvoice()`
- `collectPayment()`
- `completeJob()`

Implemented adapters:
1. `MockAdapter` (fully runnable)
2. `ServiceTitanAdapter` scaffold with TODO endpoints

## Local development
```bash
npm install
npm run dev:api
npm run dev:web
# mobile
cd apps/mobile && npm install && npm run start
```

## Render deployment

### Free-plan blueprint (recommended)
This repo now uses a **free-friendly `render.yaml`** that deploys only the public web app as a static site (no Redis, no paid web service for Next server runtime).

1. Push this repo to GitHub.
2. In Render, choose **Blueprint** and select repo.
3. Render reads `render.yaml` and provisions one service:
   - Static web site: `field-tech-web`
4. Deploy and open your Render static site URL.

### Full-stack blueprint (optional, higher cost)
If you want API + DB + Redis, use `render.full.yaml` instead:
- API web service
- Web frontend Node service
- PostgreSQL database
- Redis instance

To use it, either rename `render.full.yaml` to `render.yaml` before creating a new Blueprint, or copy its contents into `render.yaml`.

## API endpoints (MVP)
- `GET /health`
- `GET /api/customers`
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs/:id/status`
- `POST /api/jobs/:id/notes`
- `POST /api/jobs/:id/photos`
- `POST /api/jobs/:id/invoice`
- `POST /api/jobs/:id/payment`
- `POST /api/jobs/:id/complete`

## Notes
- Auth is currently a stub/demo flow.
- Local analytics/logging table exists in mobile SQLite (`logs`).
- Payment and signature are scaffold-level for MVP UX flow and can be extended with provider SDKs.
