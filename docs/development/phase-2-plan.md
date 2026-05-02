# Phase 2 Plan — Authentication

## Recommendation

Do not start random backend features first. Phase 2 should implement authentication because the accepted MVP order is Layout Shell → Auth.

## Phase 2 scope

Implement:

1. single-user account bootstrap,
2. login endpoint,
3. access token,
4. refresh token,
5. httpOnly cookie strategy,
6. refresh endpoint,
7. logout endpoint,
8. `/auth/me`,
9. frontend login wiring,
10. protected dashboard route behavior.

## Out of scope for Phase 2

Do not implement yet:

- multi-user roles,
- public sharing,
- Google Drive integration,
- real RAG ingestion,
- Obsidian sync,
- media playback persistence,
- export engine,
- advanced NSFW backend policy.

## Backend packages to use

Primary packages:

```txt
auth/
common/security/
common/error/
common/web/
```

## Frontend areas to connect

- `/login`
- app shell protected route behavior
- auth session provider
- logout action later
- `H` PIN stays UI-only unless explicitly included in a later security phase

## Database

Phase 2 should introduce the first real migrations only for auth tables.
