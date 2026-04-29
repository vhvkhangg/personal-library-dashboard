# Repository Layout

## Target Layout

The repository uses a monorepo-style layout:

```txt
personal-library-dashboard/
+-- AGENTS.md
+-- README.md
+-- .gitignore
+-- .env.example
+-- compose.yaml
+-- compose.override.yaml
+-- pnpm-workspace.yaml
+-- package.json
+-- turbo.json
+-- apps/
|   \-- web/                    # Next.js 16 frontend
+-- services/
|   +-- api/                     # Java 25 + Spring Boot 4 API
|   \-- rag/                     # Python local RAG/OCR service
+-- packages/
|   \-- shared-contracts/        # Optional generated/shared API types later
+-- infrastructure/
|   +-- docker/
|   \-- scripts/
+-- docs/
|   +-- architecture/
|   +-- decisions/
|   \-- development/
+-- .codex/
|   +-- config.toml
|   +-- AGENTS.md
|   \-- agents/
\-- .agents/
    \-- skills/
```

## Frontend Layout

```txt
apps/web/
+-- package.json
+-- next.config.ts
+-- tsconfig.json
+-- components.json
+-- src/
    +-- app/
    |   +-- (auth)/
    |   +-- (dashboard)/
    |   \-- api/
    +-- components/
    |   +-- ui/
    |   +-- layout/
    |   +-- data-table/
    |   +-- dashboard/
    |   +-- media/
    |   +-- markdown/
    |   \-- command/
    +-- features/
    |   +-- auth/
    |   +-- tags/
    |   +-- dashboard/
    |   +-- fiction/
    |   +-- film/
    |   +-- media/
    |   +-- fnb/
    |   +-- information/
    |   +-- nsfw/
    |   +-- ideaverse/
    |   +-- documents/
    |   +-- rag/
    |   \-- export/
    +-- lib/
    +-- hooks/
    +-- styles/
    \-- test/
```

## Backend Layout

```txt
services/api/
+-- pom.xml
+-- Dockerfile
\-- src/
    +-- main/
    |   +-- java/com/vhvkhangg/personallibrarydashboard/
    |   |   +-- PersonalLibraryDashboardApplication.java
    |   |   +-- common/
    |   |   +-- auth/
    |   |   +-- dashboard/
    |   |   +-- tags/
    |   |   +-- catalog/
    |   |   +-- storage/
    |   |   +-- fiction/
    |   |   +-- film/
    |   |   +-- media/
    |   |   +-- fnb/
    |   |   +-- information/
    |   |   +-- nsfw/
    |   |   +-- ideaverse/
    |   |   +-- documents/
    |   |   +-- rag/
    |   |   \-- export/
    |   \-- resources/
    |       +-- application.yml
    |       +-- application-local.yml
    |       \-- db/migration/
    \-- test/
        \-- java/com/vhvkhangg/personallibrarydashboard/
```

Each backend business module should normally contain:

```txt
module/
+-- domain/
+-- application/
+-- infrastructure/
\-- web/
```

## Python RAG Layout

```txt
services/rag/
+-- pyproject.toml
+-- uv.lock
+-- Dockerfile
+-- src/pld_rag/
|   +-- api/
|   +-- config/
|   +-- schemas/
|   +-- ingestion/
|   +-- parsers/
|   +-- ocr/
|   +-- chunking/
|   +-- embeddings/
|   +-- retrieval/
|   +-- reranking/
|   +-- generation/
|   +-- evaluation/
|   \-- observability/
\-- tests/
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
- rerank candidates
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
