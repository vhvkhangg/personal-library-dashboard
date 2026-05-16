# Auth and Security

## Phase 2 priority

Authentication is the next implementation phase.

## Target auth

Single-user JWT learning implementation:

- login,
- access token,
- refresh token,
- refresh token rotation if practical,
- httpOnly cookie storage,
- logout invalidates refresh token,
- `/auth/me`.

Endpoints:

```txt
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

## Login UI

Route:

```txt
/login
```

Accepted fields:

- Username / Email / Phone
- Password

## Protected-zone PIN

The header `H` button opens a PIN modal preview. Real enforcement is deferred.

## NSFW security

NSFW content must eventually be filtered by backend API level.

Frontend hiding is not sufficient.
