# Local Commands

## Frontend

```powershell
corepack enable
pnpm install
pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
pnpm --filter @pld/web dev
```

## Docker

```powershell
docker compose up -d postgres
docker compose ps
```

## Backend

Phase 1 backend is a package-map skeleton. It is not expected to run as a full Spring application yet.

## Apply this sync patch

```powershell
Remove-Item -Recurse -Force docs -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force services -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force skills -ErrorAction SilentlyContinue

# extract the patch into repo root
```
