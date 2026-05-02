# Testing and Verification

## Frontend

Run from repo root when configured:

```powershell
pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
pnpm --filter @pld/web build
```

During UI development:

```powershell
pnpm --filter @pld/web dev
```

If Next/Turbopack cache warnings occur, stop duplicate dev servers and clear cache:

```powershell
Remove-Item -Recurse -Force apps\web\.next -ErrorAction SilentlyContinue
```

## Backend

After Phase 2 adds real backend implementation:

```powershell
mvn -f services\api\pom.xml test
mvn -f services\api\pom.xml verify
```

## Python RAG

After the service is implemented:

```powershell
uv run ruff check .
uv run ruff format --check .
uv run mypy .
uv run pytest
```

## Rule

Do not claim checks passed unless they were actually run.
