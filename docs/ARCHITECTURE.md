# Offline-First Architecture

## High-level
- **Mobile app (Expo + React Native)** keeps a local SQLite DB with jobs, queue entries, and logs.
- **Local database is source of truth on device**. UI always reads local state for instant response.
- **SyncQueue** records every mutation as durable queue entries.
- **Sync engine** pushes queued changes to API with retry + exponential backoff.
- **Conflict handling**: on 409, queue item is marked conflict and surfaced in the UI banner.

## Data flow
1. User action (status update, note, photo, invoice, payment).
2. Write mutation to SQLite and add queue event in same interaction.
3. UI updates immediately (<200ms interaction target).
4. Background sync job drains queue and calls API endpoints.
5. On success, queue item is removed and sync badge becomes `Synced`.
6. On failure, retries increment with exponential backoff (`500 * 2^retries`, capped at 30s).

## Adapter layer
- `FieldServiceAdapter` is shared contract across API integrations.
- `MockAdapter` is default runnable path for demos and offline seed usage.
- `ServiceTitanAdapter` is scaffolded with TODO methods per endpoint.

## Reliability guardrails
- Queue is persisted locally, so app restarts do not lose writes.
- Manual "Sync now" control for technicians.
- Error logs table captures local failures for support review.

## Render deployment
- `render.yaml` provisions API, web, Redis, and PostgreSQL resources.
- API deploy step runs Prisma generate/build and migration on startup.
