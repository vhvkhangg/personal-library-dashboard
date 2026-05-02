# ADR 0003 — Phase 2 Entry Plan

## Status

Accepted

## Decision

Phase 2 starts with authentication.

## Rationale

The accepted MVP order places authentication immediately after layout shell. Auth is also required before NSFW backend filtering, private storage metadata, and future RAG document access.

## Scope

Phase 2 includes:

- login endpoint,
- refresh endpoint,
- logout endpoint,
- `/auth/me`,
- httpOnly cookie flow,
- frontend login wiring,
- route protection.

## Deferred

- NSFW PIN backend enforcement,
- tag CRUD,
- media storage,
- Obsidian sync,
- RAG ingestion,
- export implementation.
