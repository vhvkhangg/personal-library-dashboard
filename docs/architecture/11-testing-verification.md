# Testing and Verification

## Frontend

```powershell
pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
pnpm --filter @pld/web dev
```

Clear Next cache:

```powershell
Remove-Item -Recurse -Force apps\web\.next -ErrorAction SilentlyContinue
```

## Backend

After Phase 2 adds real implementation:

```powershell
mvn -f services\api\pom.xml test
mvn -f services\api\pom.xml verify
```

## Python RAG

After implementation:

```powershell
uv run ruff check .
uv run ruff format --check .
uv run mypy .
uv run pytest
```

## Rule

Do not claim checks passed unless they were actually run.
