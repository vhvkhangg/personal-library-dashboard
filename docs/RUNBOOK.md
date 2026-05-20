# RUNBOOK

## Goal

Run and verify the project locally on Windows 11.

## Prerequisites

- Windows 11
- Docker Desktop
- Node.js managed through Corepack/pnpm
- Java 25
- Maven
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

## Docker commands

```powershell
docker compose up -d postgres
docker compose ps
```

The API defaults expect:

```txt
jdbc:postgresql://localhost:5432/personal_library_dashboard
username: pld
password: pld
```

If your compose file uses different values, set the `PLD_DATABASE_*` variables below.

## Phase 2.2 Auth backend

Recommended environment variables:

```powershell
$env:PLD_DATABASE_URL="jdbc:postgresql://localhost:5432/personal_library_dashboard"
$env:PLD_DATABASE_USERNAME="pld"
$env:PLD_DATABASE_PASSWORD="pld"

$env:PLD_AUTH_SEED_USERNAME="owner"
$env:PLD_AUTH_SEED_EMAIL="owner@example.local"
$env:PLD_AUTH_SEED_PHONE=""
$env:PLD_AUTH_SEED_DISPLAY_NAME="Vinh Khang"
$env:PLD_AUTH_SEED_PASSWORD="change-me-local-dev"
$env:PLD_AUTH_JWT_SECRET="replace-with-at-least-32-random-bytes"
```

Run backend:

```powershell
mvn -f services\api\pom.xml test
mvn -f services\api\pom.xml spring-boot:run
```

Manual auth check:

```powershell
curl.exe -i -c cookies.txt -H "Content-Type: application/json" -d "{\"identifier\":\"owner\",\"password\":\"change-me-local-dev\"}" http://localhost:8080/auth/login

curl.exe -i -b cookies.txt http://localhost:8080/auth/me

curl.exe -i -b cookies.txt -c cookies.txt -X POST http://localhost:8080/auth/refresh

curl.exe -i -b cookies.txt -c cookies.txt -X POST http://localhost:8080/auth/logout
```

Delete local cookie file after manual testing:

```powershell
Remove-Item cookies.txt -ErrorAction SilentlyContinue
```



## Phase 2.3 Frontend auth wiring

Run backend and frontend together:

```powershell
docker compose up -d postgres
mvn -f services\api\pom.xml spring-boot:run
pnpm --filter @pld/web dev
```

Optional frontend API base URL:

```powershell
$env:NEXT_PUBLIC_PLD_API_BASE_URL="http://localhost:8080"
```

Browser flow:

1. Open `http://localhost:3000/login`.
2. Login with the seed account.
3. Confirm redirect to `/dashboard`.
4. Refresh the page and confirm session restore.
5. Click the logout icon in the header and confirm redirect to `/login`.

Default local seed values:

```txt
identifier: owner
password: change-me-local-dev
```

## RAG status

`services/rag` remains a placeholder. Real Python RAG/OCR implementation is deferred.

## Applying large sync patches

If a patch refreshes full `docs/`, `services/`, or `skills/`, apply it as a replacement:

```powershell
Remove-Item -Recurse -Force docs -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force services -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force skills -ErrorAction SilentlyContinue

# Extract the patch into repository root.
```

If your repo stores skills under `.agents/skills` instead of root `skills/`, copy the generated `skills/` folder into `.agents/skills/` manually.



## Phase 2 Auth verification

### Full local verification from repo root

```powershell
# 1. Start database
docker compose up -d postgres

# 2. Backend verification
mvn -f services\api\pom.xml test
mvn -f services\api\pom.xml spring-boot:run

# 3. Frontend verification, in another terminal
$env:NEXT_PUBLIC_PLD_API_BASE_URL="http://localhost:8080"
pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
pnpm --filter @pld/web dev
```

### Auth smoke test

Use the seeded local credentials configured by environment variables. The default local development values are:

```txt
identifier: owner
password: change-me-local-dev
```

Manual browser flow:

1. Open `http://localhost:3000/login`.
2. Enter the seeded identifier and password.
3. Confirm redirect to `/dashboard`.
4. Refresh the browser and confirm the dashboard session is restored.
5. Click Logout in the header.
6. Confirm redirect back to `/login`.
7. Open `/dashboard` while logged out and confirm redirect to `/login?next=/dashboard`.

### API smoke test

```powershell
curl.exe -i -c cookies.txt -H "Content-Type: application/json" -d "{\"identifier\":\"owner\",\"password\":\"change-me-local-dev\"}" http://localhost:8080/auth/login

curl.exe -i -b cookies.txt http://localhost:8080/auth/me

curl.exe -i -b cookies.txt -c cookies.txt -X POST http://localhost:8080/auth/refresh

curl.exe -i -b cookies.txt -c cookies.txt -X POST http://localhost:8080/auth/logout
```

### Expected behavior

- Frontend never reads JWT cookie values.
- `pld_access_token` and `pld_refresh_token` are httpOnly cookies.
- Refresh token is rotated on refresh.
- Logout revokes the current refresh token and clears both cookies.
- Dashboard routes are guarded by `AuthGate`.
