# Security and Auth

## Scope

This is a single-user private app, but authentication is still required.

## Auth Goals

- only the owner can access the app
- learn JWT properly
- avoid unsafe token storage patterns
- protect NSFW content
- avoid accidental LAN exposure

## JWT Strategy

Use:

- access token
- refresh token
- httpOnly cookies

Do not store JWTs in localStorage.

Recommended endpoints:

```txt
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

## Token Lifetimes

Initial proposal:

```txt
Access token: 10–15 minutes
Refresh token: 7–30 days
```

Refresh token should be stored server-side hashed if practical.

## Single User

The app may seed one owner account.

Avoid building multi-user roles in MVP.

Possible role enum:

```txt
OWNER
```

Do not implement complex role systems until needed.

## NSFW Security

NSFW has two layers:

1. global NSFW mode/toggle
2. separate PIN/password unlock

When NSFW mode is off:

- NSFW sidebar item hidden
- NSFW dashboard hidden
- NSFW search results filtered
- NSFW items excluded from normal lists
- backend filters NSFW, not just frontend

When NSFW unlock expires:

- require PIN/password again
- clear client NSFW state

## LAN Exposure

Bind services carefully in Docker Compose.

For development, local-only access is acceptable.

For laptop access, expose through a controlled host/port.

Future remote access should prefer private VPN over public port forwarding.

## Secrets

Never commit:

- JWT secret
- refresh token secret
- Google OAuth credentials
- database password
- `.env`
- private file paths if sensitive
