$ErrorActionPreference = "Stop"

Write-Host "Starting PostgreSQL..."
docker compose up -d postgres

Write-Host ""
Write-Host "Run these in separate terminals:"
Write-Host "  pnpm --filter @pld/web dev"
Write-Host "  mvn -f services/api/pom.xml spring-boot:run"
Write-Host "  uv --directory services/rag run uvicorn pld_rag.api.app:create_app --factory --reload --host 0.0.0.0 --port 8000"
