# 0002 — Auth: Single-User JWT

## Status

Accepted

## Context

Only the owner should access the web app. The user wants to learn JWT and prefers a real login flow, not a completely open LAN app.

## Decision

Implement single-user login with JWT access token and refresh token. Store tokens in httpOnly cookies. Do not store tokens in localStorage. Add a separate NSFW PIN/password unlock.

## Alternatives Considered

1. No login.
2. Session-only auth.
3. Full multi-user RBAC.
4. OAuth login.

No login is too risky even for LAN. Full RBAC and OAuth are overkill for MVP.

## Consequences

The project teaches JWT while staying safer than localStorage token patterns. Backend must handle refresh/logout correctly. Testing auth becomes part of MVP.

## Follow-ups

Finalize token expiration values. Decide whether refresh token rotation is implemented immediately or after basic auth works.
