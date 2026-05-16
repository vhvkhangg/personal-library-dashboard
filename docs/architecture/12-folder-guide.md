# Folder Guide

## Root

```txt
AGENTS.md       Project instructions for GPT/Codex-style agents.
README.md       Human project overview.
docs/           Durable documentation.
apps/           Frontend and future app workspaces.
services/       Backend/runtime services.
packages/       Shared packages later.
infrastructure/ Docker/scripts/local infra.
```

## `apps/web`

Next.js 16 frontend.

Why not put files directly under `apps/`?

Because `apps/` is a workspace bucket. `web/` is the current browser app. This keeps room for future apps without moving files.

## `services/api`

Java Spring business API. This is the source of business/auth/storage/tag/export APIs later.

## `services/rag`

Python local RAG/OCR runtime. It may expose endpoints later, but it is not the main business API.

## `docs`

Durable docs. Avoid dumping patch notes here after Phase 1.

## `skills`

Agent/Codex skills. Current skill set is enough for Phase 2 Auth. Add more skills only when a new specialized domain starts, such as:

- Google Drive OAuth/integration,
- ffmpeg/media processing,
- Vietnamese OCR evaluation,
- Obsidian indexing/sync,
- pgvector retrieval evaluation.

## `services` Phase 1 rule

The generated service tree is a skeleton only. Java packages contain `package-info.java` but no implementation classes.
