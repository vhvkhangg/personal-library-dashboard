# Architecture Overview

`personal-library-dashboard` is a private, single-user personal dashboard for organizing, viewing, searching, and exporting a personal content library.

It is also a learning project for:

- Next.js 16 + TypeScript + shadcn/ui-style components.
- Java 25 + Spring Boot 4 modular monolith backend.
- Python local RAG/OCR.
- PostgreSQL + pgvector.
- Docker Desktop on Windows 11.
- GPT web as the primary planning/coding assistant and Codex as a secondary local executor/reviewer.

## Runtime shape

```txt
Windows 11 desktop host
  ├─ apps/web              Next.js frontend
  ├─ services/api          Java Spring modular monolith
  ├─ services/rag          Python local RAG/OCR service
  ├─ PostgreSQL + pgvector
  ├─ local media folder
  └─ external Obsidian vault
```

Laptop access is expected through browser over LAN or private VPN.

## Source-of-truth boundaries

- PostgreSQL is the source of truth for application metadata.
- Local filesystem is the source of truth for large local video/movie files.
- Google Drive is the preferred future provider for image/music object storage.
- The external Obsidian vault is the source of truth for Ideaverse Markdown.
- The web UI is not the source of truth for Ideaverse writing content.

## Phase 1 result

Phase 1 is a UI shell and navigation prototype. It contains no production backend behavior yet.

Accepted UI surfaces:

- `/login` login screen.
- Dashboard shell with icon sidebar + module sidebar + header.
- Global search/command palette preview.
- `H` protected-zone PIN modal.
- Module dashboards and module item tables.
- Favorites tables.
- Tags panel and New Tag modal.
- Search/filter/date toolbar.
- Column and export preview popovers.
- Status dropdown in tables.
- Avatar preview modal.
- Item detail and edit modals.
- Media watch/viewer previews.
- RAG Workspace three-column prototype.
- Settings prototype.

## Phase 2 direction

Phase 2 should implement authentication first:

1. single-user login,
2. JWT access/refresh token flow,
3. httpOnly cookies,
4. `/auth/me`,
5. logout,
6. NSFW/PIN backend enforcement later.
