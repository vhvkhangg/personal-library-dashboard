# 0010 — Phase 2 Auth Contract

## Status

Accepted

## Context

Phase 1 UI is accepted as final. Phase 2 starts with authentication because the app is private and single-user, and later NSFW filtering, private storage metadata, and RAG document access depend on reliable auth boundaries.

The login UI already accepts a single first field that can represent username, email, or phone. The backend must match this UI rather than forcing the frontend to split the field.

## Decision

Use a single-user JWT authentication flow with:

- seed account from environment variables,
- `identifier` login field for username/email/phone,
- access token and refresh token as httpOnly cookies,
- cookie names `pld_access_token` and `pld_refresh_token`,
- refresh token hash persisted in PostgreSQL,
- 15-minute access token TTL,
- 14-day refresh token TTL,
- Flyway as the migration tool.

Phase 2.1 adds docs and Java contract skeletons only. Implementation starts in Phase 2.2.

## Alternatives Considered

### Email-only login

- Pros: simpler backend lookup.
- Cons: does not match the accepted UI.
- Rejected because the UI explicitly supports username/email/phone in one field.

### localStorage token storage

- Pros: simple frontend implementation.
- Cons: higher XSS exposure and explicitly rejected by project rules.
- Rejected in favor of httpOnly cookies.

### Store raw refresh token

- Pros: easier debugging.
- Cons: dangerous if database is leaked.
- Rejected in favor of storing a token hash only.

### Skip migrations in Auth

- Pros: fewer files initially.
- Cons: weak backend discipline and harder schema tracking.
- Rejected because database migrations are required for every schema change.

## Consequences

Positive:

- Frontend and backend share a precise contract before implementation.
- Auth implementation can proceed in small, testable steps.
- Refresh-token compromise risk is reduced by hash-only storage.

Trade-offs:

- Cookie-based auth requires careful CSRF/CORS policy in Phase 2.2.
- Refresh token rotation adds extra implementation complexity.
- Seeding from environment variables requires a clear local RUNBOOK.
