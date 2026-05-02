# Auth and Security

## Phase 2 priority

Authentication is the next major implementation phase after Phase 1 closeout.

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

The header `H` button opens a PIN modal preview. Real enforcement should be backend-backed later.

## NSFW security

NSFW content must eventually be filtered at backend API level.

Rules:

- Search must not return NSFW content when NSFW mode is off.
- NSFW module should require a separate PIN/password unlock.
- Frontend hiding is not sufficient.

## Secrets

Never commit:

- `.env`,
- JWT secrets,
- Google OAuth credentials,
- database dumps,
- private file paths,
- model weights,
- Obsidian vault content.
