# RUNBOOK

## Goal

Run and verify the project locally on Windows 11.

## Prerequisites

- Windows 11
- Docker Desktop
- Node.js managed through Corepack/pnpm
- Java 25 and Maven for later backend phases
- Python tooling later for RAG (`uv`)

## Frontend commands

From repository root:

```powershell
corepack enable
pnpm install
pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
pnpm --filter @pld/web dev
```

Clear Next.js cache if dev cache warnings appear:

```powershell
Remove-Item -Recurse -Force apps\web\.next -ErrorAction SilentlyContinue
```

Then restart:

```powershell
pnpm --filter @pld/web dev
```

## Docker commands

```powershell
docker compose up -d postgres
docker compose ps
```

## Backend status

Phase 1 `services/api` is a package-map skeleton. It is not expected to contain real API classes yet.

Phase 2 will add real Java code for Auth.

## RAG status

Phase 1 `services/rag` is a placeholder. Real Python RAG/OCR implementation is deferred.

## Applying docs/services sync patches

If a patch refreshes full `docs/`, `services/`, or `skills/`, apply it as a replacement:

```powershell
Remove-Item -Recurse -Force docs -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force services -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force skills -ErrorAction SilentlyContinue

# Extract the patch into repository root.
```

If your repo stores skills under `.agents/skills` instead of root `skills/`, copy the generated `skills/` folder into `.agents/skills/` manually.

## Phase 1 acceptance checklist

- UI matches accepted Phase 1 screens.
- No `liquid-surface` effect remains.
- Journal button uses journal/history naming, not notification naming.
- Profile, Media Account, Media Album, and F&B Snack are represented in docs/services.
- Ideaverse remains read-only on web.
- RAG Workspace matches the accepted left-rail/chat/inspector layout.
- Root `README.md` and `AGENTS.md` match the final module map.
