# 0012 — Phase 2.3 Frontend Auth Wiring

## Status

Accepted

## Context

Phase 2.2 implemented the backend Auth minimum. The frontend login page was still UI-only and dashboard routes were not protected by session state.

## Decision

Implement Phase 2.3 frontend auth wiring:

- `/login` submits `identifier` and `password` to `POST /auth/login`.
- `AuthProvider` stores current user/session state in React state.
- `AuthProvider` restores session through `GET /auth/me`.
- If `/auth/me` fails, the provider attempts one `POST /auth/refresh` before marking the user unauthenticated.
- Dashboard routes are wrapped by `AuthGate`.
- `AuthGate` redirects unauthenticated users to `/login?next=...`.
- Header logout calls `POST /auth/logout`, clears session state, and redirects to `/login`.
- Frontend requests use `credentials: "include"`.
- Tokens remain httpOnly cookies and are not stored in localStorage.

## Consequences

- The UI now uses the real backend Auth API.
- Route protection is client-side in Phase 2.3.
- The backend must allow local frontend origins with credentialed CORS.
- Server-side route enforcement or Next middleware can be evaluated later if needed.
