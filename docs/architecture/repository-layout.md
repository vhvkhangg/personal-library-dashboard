# Repository Layout

## Target Layout

```txt
personal-library-dashboard/
  AGENTS.md
  README.md

  apps/
    web/

  services/
    api/
    rag/

  packages/
    shared-contracts/

  infrastructure/
    docker/
    scripts/

  docs/
    architecture/
    decisions/
    development/

  .codex/
    config.toml
    AGENTS.md
    agents/

  .agents/
    skills/
```

## Directory Purpose

### `apps/web`

Next.js 16 frontend.

Responsibilities:

- dashboard shell
- routing
- shadcn/ui components
- table/list views
- command palette
- image viewer
- media player UI
- Markdown editor/preview UI
- API calls to Spring backend

### `services/api`

Spring Boot 4 backend.

Responsibilities:

- authentication
- authorization
- module APIs
- PostgreSQL access
- storage metadata
- export orchestration
- Obsidian vault metadata/index APIs
- calls to Python RAG service

### `services/rag`

Python RAG/OCR service.

Responsibilities:

- parse documents
- OCR
- extract tables
- chunk text
- create embeddings
- retrieve documents/chunks
- local LLM answer generation

### `docs`

Architecture, decisions, and development documentation.

### `.agents/skills`

Codex/agent skills copied or custom-created for this project.

### `.codex`

Codex configuration and optional custom subagents.

## What Must Not Be Stored in Repo

Do not store:

- Obsidian vault content
- media library files
- large movie/video/music/image files
- database dumps
- `.env`
- JWT secrets
- Google OAuth credentials
- model weights
- generated RAG indexes
