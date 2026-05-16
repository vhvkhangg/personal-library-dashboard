# RUNBOOK — Local Development

## Prerequisites

- Windows 11.
- Docker Desktop.
- Java 25 for later backend phases.
- Maven for later backend phases.
- Node.js managed through Corepack/pnpm.
- `pnpm` from repository root.

## First-time setup

```powershell
corepack enable
pnpm install
```

## Frontend checks

Run from repository root:

```powershell
pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
pnpm --filter @pld/web dev
```

If the Next/Turbopack cache gets noisy or stale:

```powershell
Remove-Item -Recurse -Force apps\web\.next -ErrorAction SilentlyContinue
pnpm --filter @pld/web dev
```

## Docker database

```powershell
docker compose up -d postgres
docker compose ps
```

## Backend status

Phase 1 backend is still a package-map skeleton. `services/api` intentionally contains `package-info.java` placeholders and no real Spring runtime code yet.

Phase 2 should start adding real backend code for Authentication.

## RAG status

`services/rag` is still a placeholder. RAG/OCR implementation starts after the earlier MVP foundations.

## Current Phase 1 warning

Phase 1 UI is still open while Profile, Media Account, Snack, RAG Workspace, chart layout, and viewer tabs are being adjusted. Do not tag Phase 1 as complete until the UI owner confirms it again.
