# 0011 — Phase 2.2 Backend Auth Minimum

## Status

Accepted

## Context

Phase 2.1 defined the auth contract. Phase 2.2 needs a runnable Spring Boot backend with minimum authentication behavior so the frontend can be wired in Phase 2.3.

## Decision

Implement a small but real backend authentication flow:

- Spring Boot 4.0.6 application entry point.
- Maven dependencies for Web, Security, Validation, JPA, Flyway, PostgreSQL.
- Flyway auth schema migration.
- Single-user bootstrap from environment/config.
- BCrypt password hashing.
- JWT access tokens in httpOnly cookie `pld_access_token`.
- Opaque refresh tokens in httpOnly cookie `pld_refresh_token`.
- Refresh token SHA-256 hashes stored in PostgreSQL.
- Refresh token rotation on refresh.
- Refresh token revocation on logout.
- Stateless Spring Security filter chain.
- JSON error envelope.

## Consequences

- The API now requires PostgreSQL to start.
- The frontend is not wired yet.
- CSRF is disabled for the Phase 2.2 API surface and must be re-evaluated when browser/frontend integration is finalized.
- Development defaults exist to make local testing easier, but real secrets must come from environment variables before non-local use.

## Deferred

- frontend login wiring,
- logout button wiring,
- route guard,
- refresh retry handling in frontend,
- NSFW PIN backend enforcement,
- brute-force protection,
- audit/journal persistence.
