# Auth Contract

## Phase 2.2 implementation status

The Phase 2.1 contract is now backed by a minimum Spring Boot implementation in Phase 2.2.

Implemented Java packages:

```txt
auth/
  application/
  infrastructure/
  web/

common/
  error/
  security/
  web/
```

## API contract

### Endpoints

```txt
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

### Login request

```json
{
  "identifier": "username | email | phone",
  "password": "raw password"
}
```

Validation:

- `identifier` is required.
- `identifier` max length is 320.
- `password` is required.
- `password` length is 8 to 256.

### Auth session response

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

Tokens are set as httpOnly cookies and are not returned in the body.

## Persistence contract

Flyway migration:

```txt
services/api/src/main/resources/db/migration/V1__create_auth_tables.sql
```

Tables:

```txt
auth_users
auth_refresh_tokens
```

`auth_users` stores:

- normalized username/email/phone for identifier login,
- BCrypt password hash,
- display name,
- enabled state,
- created/updated/last-login timestamps.

`auth_refresh_tokens` stores:

- token hash,
- issue/expiry/revocation timestamps,
- rotation family id.

Raw refresh token values are never persisted.

## Token contract

Access token:

- JWT signed with HMAC-SHA256,
- token type claim is `access`,
- issuer is `personal-library-dashboard`,
- TTL is 15 minutes.

Refresh token:

- opaque random token,
- TTL is 14 days,
- SHA-256 hash stored in database,
- rotated on refresh.

## Error codes

Implemented initial errors:

```txt
AUTH_INVALID_CREDENTIALS
AUTH_REFRESH_TOKEN_MISSING
AUTH_REFRESH_TOKEN_INVALID
AUTH_ACCESS_TOKEN_INVALID
AUTH_UNAUTHORIZED
VALIDATION_ERROR
INTERNAL_ERROR
```

Use the shared error envelope from `common/web/ApiErrorResponse`.


## Frontend contract

Phase 2.3 frontend contract:

```txt
NEXT_PUBLIC_PLD_API_BASE_URL=http://localhost:8080
```

Client requests must use:

```ts
credentials: "include"
```

The frontend expects the backend success envelope:

```json
{
  "data": {}
}
```

Session behavior:

- login success returns `AuthSessionResponse` and writes httpOnly cookies,
- `/auth/me` returns `CurrentUserResponse`,
- `/auth/refresh` rotates cookies and returns `AuthSessionResponse`,
- `/auth/logout` clears cookies and returns `{ "loggedOut": true }`.

The frontend AuthProvider treats tokens as opaque browser cookies.


## Phase 2.4 frontend verification contract

Frontend client calls:

```txt
POST /auth/login
GET  /auth/me
POST /auth/refresh
POST /auth/logout
```

All calls must use browser credentials:

```ts
fetch(url, { credentials: "include" })
```

The frontend AuthProvider state machine:

```txt
loading -> authenticated
loading -> unauthenticated
authenticated -> unauthenticated on logout
unauthenticated -> authenticated on login
```

Expected route behavior:

- unauthenticated `/dashboard` redirects to `/login?next=/dashboard`,
- authenticated `/login` redirects to `next` or `/dashboard`,
- logout returns the user to `/login`.
