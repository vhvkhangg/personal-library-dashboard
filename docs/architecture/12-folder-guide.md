# Folder and File Guide

## Why `apps/web` instead of putting web files directly under `apps/`?

`apps/` is an application workspace, not a single app folder. Keeping the Next.js app in `apps/web` leaves room for future apps without moving code later.

Possible future siblings:

```txt
apps/
  web/          Next.js browser UI
  desktop/      optional future desktop shell
  mobile/       optional future mobile app
  admin/        optional future admin-only UI
```

For now, only `apps/web` exists. The extra folder is still useful because it keeps the monorepo shape clear.

## Why `services/api` and `services/rag`?

`services/` contains long-running backend processes or backend-adjacent runtimes.

```txt
services/
  api/          Java Spring modular monolith; owns auth, metadata, tags, storage orchestration, exports
  rag/          Python RAG/OCR runtime; owns parsing, OCR, embeddings, retrieval, reranking, generation
```

Although the RAG service may expose HTTP endpoints, it is not the main business API. Calling it `rag` makes the responsibility clearer than `api2` or `python-api`.

## Why not name the folder `backend/`?

`backend/` is understandable, but it gets vague when there are multiple runtimes. `services/api` and `services/rag` make the boundaries explicit:

- Java API service: business backend.
- Python RAG service: AI/document-processing backend.

This is a common monorepo style and remains readable after the project grows.

## Current tree target

```txt
personal-library-dashboard/
  apps/
    web/
      src/app/
      src/components/
      src/lib/

  services/
    api/
      src/main/java/com/vhvkhangg/personallibrarydashboard/
      src/main/resources/
    rag/

  packages/
    shared-contracts/

  infrastructure/
    docker/
    scripts/

  docs/
    RUNBOOK.md
    README.md
    architecture/
    decisions/
    development/

  .agents/
    skills/

  .codex/
```

## Skill set status

The current skills are enough for Phase 1 and Phase 2. They cover frontend design, frontend patterns, architecture decisions, coding standards, Spring Boot, security, database, Docker, testing, and RAG patterns.

Do not collect more skills yet. Add skills only when a real gap appears, for example:

- a specialized Google Drive integration skill,
- a media transcoding/ffmpeg skill,
- a Vietnamese OCR evaluation skill,
- an Obsidian/frontmatter sync skill.

Too many skills too early will make agent behavior noisier.
