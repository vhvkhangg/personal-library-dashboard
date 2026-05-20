# Auth and Security

## Phase 2.3 status

Phase 2.3 keeps the Phase 2.2 backend authentication flow and adds frontend session wiring.

Implemented in `services/api`:

- Spring Boot application entry point.
- Spring Security stateless filter chain.
- BCrypt password hashing.
- Seeded single-user bootstrap from environment/config.
- JWT access token signing and validation.
- Opaque refresh token generation.
- Refresh token hash persistence.
- Refresh token rotation on refresh.
- Logout token revocation.
- httpOnly auth cookies.
- Flyway migration for auth tables.
- Auth endpoints:
  - `POST /auth/login`
  - `POST /auth/refresh`
  - `POST /auth/logout`
  - `GET /auth/me`

Confirmed contract decisions remain unchanged:

| Area | Decision |
|---|---|
| Account model | Single-user local account |
| Bootstrap | Seed from environment variables |
| Login input | One `identifier` field accepting username, email, or phone |
| Password | BCrypt hash in database; raw password only in login request |
| Token style | JWT access token + opaque refresh token |
| Browser storage | httpOnly cookies |
| Cookie names | `pld_access_token`, `pld_refresh_token` |
| Refresh token persistence | Store SHA-256 hash only, never raw token |
| Access token TTL | 15 minutes |
| Refresh token TTL | 14 days |
| Migration tool | Flyway |

## Environment variables

Recommended local values:

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

The committed defaults are local-development placeholders. Change them before using the app outside a private local dev setup.

## Auth endpoints

### `POST /auth/login`

Request:

```json
{
  "identifier": "owner",
  "password": "change-me-local-dev"
}
```

Response body:

```json
{
  "data": {
    "user": {
      "id": "uuid",
      "username": "owner",
      "email": "owner@example.local",
      "phone": null,
      "displayName": "Vinh Khang",
      "createdAt": "2026-05-16T00:00:00Z",
      "lastLoginAt": "2026-05-16T00:00:00Z"
    },
    "accessTokenExpiresAt": "2026-05-16T00:15:00Z",
    "refreshTokenExpiresAt": "2026-05-30T00:00:00Z",
    "authenticated": true
  },
  "meta": {}
}
```

Tokens are not returned in JSON. They are written to httpOnly cookies.

### `POST /auth/refresh`

Behavior:

- reads `pld_refresh_token`,
- hashes it,
- finds a matching active token hash,
- revokes the old refresh token,
- issues new access/refresh cookies.

### `POST /auth/logout`

Behavior:

- reads `pld_refresh_token`,
- revokes matching refresh-token hash if present,
- clears access and refresh cookies.

### `GET /auth/me`

Behavior:

- validates `pld_access_token`,
- returns current user profile.

## Cookie policy

Development defaults:

```txt
httpOnly = true
secure = false
sameSite = Strict
path = /
```

Private HTTPS defaults later:

```txt
httpOnly = true
secure = true
sameSite = Strict
path = /
```

## Security notes

- Do not store JWTs in localStorage.
- Do not store raw refresh tokens in the database.
- Do not expose the raw access/refresh token in JSON responses.
- Spring Security protects every endpoint except `/auth/login`, `/auth/refresh`, `/auth/logout`, and `/error`.
- CSRF is disabled for Phase 2.2 API work. Re-evaluate CSRF when frontend/backend cookie wiring is finalized.

## Deferred

- frontend auth wiring,
- NSFW PIN backend enforcement,
- brute-force login throttling,
- refresh-token family reuse detection,
- production secret management,
- audit/journal persistence.


## Frontend session wiring

Implemented in Phase 2.3:

- `/login` is a client form that calls `POST /auth/login`.
- `AuthProvider` calls `GET /auth/me` to restore sessions.
- If `/auth/me` fails, `AuthProvider` attempts `POST /auth/refresh` once before marking the session unauthenticated.
- Dashboard routes are wrapped by `AuthGate`.
- `AuthGate` shows a loading state while restoring auth.
- Unauthenticated users are redirected to `/login?next=...`.
- The header shows the current user and includes a logout button.
- Logout calls `POST /auth/logout`, clears frontend auth state, and redirects to `/login`.

The frontend never reads access or refresh tokens directly. Auth cookies stay httpOnly.


## Phase 2.4 verification notes

Frontend auth rules:

- `/login` submits credentials to the backend Auth API.
- `AuthProvider` restores the session with `/auth/me`.
- If the access cookie is expired, the provider attempts `/auth/refresh`.
- Dashboard routes use `AuthGate`.
- Frontend code does not read token cookie values and does not store tokens in `localStorage`.

Security cleanup:

- The login form should not prefill or display the password in source code.
- Seed credentials remain backend configuration/environment concerns.
- The default local seed password is only for local development and must be changed through environment variables before non-local use.
