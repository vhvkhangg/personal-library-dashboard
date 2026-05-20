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

## Backend Auth

```powershell
mvn -f services\api\pom.xml test
mvn -f services\api\pom.xml spring-boot:run
```

Manual smoke test:

```powershell
curl.exe -i -c cookies.txt -H "Content-Type: application/json" -d "{\"identifier\":\"owner\",\"password\":\"change-me-local-dev\"}" http://localhost:8080/auth/login
curl.exe -i -b cookies.txt http://localhost:8080/auth/me
curl.exe -i -b cookies.txt -c cookies.txt -X POST http://localhost:8080/auth/refresh
curl.exe -i -b cookies.txt -c cookies.txt -X POST http://localhost:8080/auth/logout
```

## Apply this sync patch

```powershell
Remove-Item -Recurse -Force docs -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force services -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force skills -ErrorAction SilentlyContinue

# extract the patch into repo root
```


## Frontend Auth flow

```powershell
$env:NEXT_PUBLIC_PLD_API_BASE_URL="http://localhost:8080"

docker compose up -d postgres
mvn -f services\api\pom.xml spring-boot:run
pnpm --filter @pld/web dev
```

Open:

```txt
http://localhost:3000/login
```

Default local credentials:

```txt
owner / change-me-local-dev
```



## Phase 2.4 Auth verification commands

Run from repository root:

```powershell
docker compose up -d postgres

mvn -f services\api\pom.xml test
mvn -f services\api\pom.xml spring-boot:run
```

Frontend terminal:

```powershell
$env:NEXT_PUBLIC_PLD_API_BASE_URL="http://localhost:8080"

pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
pnpm --filter @pld/web dev
```

If Next/Turbopack cache warnings appear:

```powershell
Remove-Item -Recurse -Force apps\web\.next -ErrorAction SilentlyContinue
```
