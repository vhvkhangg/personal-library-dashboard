# Local Commands

## Frontend

```powershell
corepack enable
pnpm install
pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
pnpm --filter @pld/web dev
```

Clear Next cache:

```powershell
Remove-Item -Recurse -Force apps\web\.next -ErrorAction SilentlyContinue
```

## Docker

```powershell
docker compose up -d postgres
docker compose ps
```

## Backend

Phase 1 backend is a package-map skeleton. It is not expected to run as a Spring application until Phase 2 adds the application class and auth implementation.

## Apply this patch cleanly

Because this patch removes many obsolete docs and old service implementation placeholders, apply it as a replacement:

```powershell
# from repository root
Remove-Item -Recurse -Force docs -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force services -ErrorAction SilentlyContinue

# then extract this patch zip into the repository root
```

Do not apply the old `scrollbar-restore` patch if the current UI already looks correct.
