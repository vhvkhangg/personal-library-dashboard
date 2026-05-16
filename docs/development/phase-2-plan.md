# Phase 2 Plan — Authentication

## Recommendation

Phase 2 starts with Authentication.

## Scope

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

## Out of scope

Do not implement yet:

- multi-user roles,
- public sharing,
- Google Drive integration,
- real RAG ingestion,
- Obsidian sync,
- media playback persistence,
- export engine,
- advanced NSFW backend policy.

## Backend packages

Primary packages:

```txt
auth/
common/security/
common/error/
common/web/
```
