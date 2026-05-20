# Phase 2 Plan — Authentication

## Current step: Phase 2.3

Phase 2.3 connects the frontend login/session flow to the real backend Auth API.

Implemented:

1. Spring Boot application entry point.
2. Maven Spring Boot dependencies.
3. Flyway migration for auth schema.
4. JPA entities and repositories.
5. Seeded single-user bootstrap.
6. BCrypt password hashing.
7. JWT access-token service.
8. Opaque refresh-token generation.
9. Refresh-token hash storage.
10. Refresh-token rotation on refresh.
11. Logout revocation.
12. Auth controller.
13. Cookie writer/clearer.
14. Basic JSON error handling.
15. Security filter chain and access-token cookie filter.

## Phase 2.2 verification target

Run:

```powershell
mvn -f services\api\pom.xml test
mvn -f services\api\pom.xml spring-boot:run
```

Manual endpoint check:

```powershell
curl.exe -i -c cookies.txt -H "Content-Type: application/json" -d "{\"identifier\":\"owner\",\"password\":\"change-me-local-dev\"}" http://localhost:8080/auth/login

curl.exe -i -b cookies.txt http://localhost:8080/auth/me

curl.exe -i -b cookies.txt -c cookies.txt -X POST http://localhost:8080/auth/refresh

curl.exe -i -b cookies.txt -c cookies.txt -X POST http://localhost:8080/auth/logout
```

## Phase 2.3 — Frontend Auth wiring

Next phase should implement:

1. `/login` form submission to `POST /auth/login`.
2. Auth session provider.
3. `GET /auth/me` session restore.
4. Protected dashboard route behavior.
5. Logout action.
6. Loading/error states.
7. Frontend handling for expired access token + refresh flow.

## Still deferred

- NSFW PIN backend enforcement,
- tag CRUD,
- media storage,
- Obsidian indexer,
- real RAG ingestion,
- audit/journal persistence,
- brute-force login throttling.


## Phase 2.3 implemented target

Frontend changes:

1. `/login` submits to the real backend.
2. `AuthProvider` owns current user/session state.
3. `AuthGate` protects dashboard routes.
4. Header logout calls the real backend.
5. Loading and error states are visible.
6. Expired access-token cookies attempt refresh before redirecting.

Backend support added for Phase 2.3:

- CORS allows local Next.js dev origins with credentials.


## Phase 2.4 — Verification and docs cleanup

Scope:

- run frontend typecheck/lint locally,
- run backend Maven tests locally,
- verify login/refresh/logout/me manually,
- document verification status,
- update RUNBOOK/local commands,
- prepare commit note.

Acceptance checklist:

- `pnpm --filter @pld/web typecheck` passes.
- `pnpm --filter @pld/web lint` passes.
- `mvn -f services\api\pom.xml test` passes.
- Manual browser auth flow passes.
- API smoke test passes.
- No JWT/access/refresh tokens are read or stored in frontend JavaScript.
- No private `.env` values are committed.
