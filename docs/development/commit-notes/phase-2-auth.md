# Commit Note — Phase 2 Auth

## Suggested commit title

```txt
feat(auth): complete phase 2 auth wiring and verification docs
```

## Suggested commit body

```txt
Complete the Phase 2 Auth slice.

Backend:
- add runnable Spring Boot Auth minimum
- add Flyway auth schema for users and refresh tokens
- seed the single user from environment/config
- hash passwords with BCrypt
- issue JWT access cookie and opaque refresh cookie
- persist refresh token hashes only
- add login/refresh/logout/me endpoints
- configure stateless Spring Security and CORS for frontend credentials

Frontend:
- wire /login to the real Auth API
- add AuthProvider session restore
- guard dashboard routes with AuthGate
- support refresh fallback before unauthenticated state
- expose logout in the header
- keep tokens in httpOnly cookies only
- remove password prefill from the login UI

Docs:
- update RUNBOOK with auth verification commands
- add Phase 2.4 verification report
- add Auth commit note
- update Auth contract/security docs
```

## Local verification before pushing

```powershell
docker compose up -d postgres
mvn -f services\api\pom.xml test

$env:NEXT_PUBLIC_PLD_API_BASE_URL="http://localhost:8080"
pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
```

## Manual verification

- login works,
- session restores after refresh,
- guarded dashboard redirects when logged out,
- logout clears session,
- API smoke test passes.
```
