# Architecture Overview

`personal-library-dashboard` is a private, single-user dashboard for organizing, viewing, searching, and exporting a personal content library.

It is also a learning project for:

- Next.js 16 + shadcn/ui-style frontend.
- Java 25 + Spring Boot 4 modular monolith backend.
- Python local RAG/OCR.
- PostgreSQL + pgvector.
- Docker Desktop on Windows 11.
- GPT web as primary planning/coding assistant and Codex as secondary local executor/reviewer.

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

## Accepted Phase 1 result

Phase 1 UI is complete and accepted.

Accepted surfaces:

- `/login` login screen.
- Header with global search, theme toggle, protected `H` PIN modal, and `Nhật ký` journal dialog.
- Double sidebar layout.
- Profile top-level module.
- Module dashboards.
- Module Overview + Player/Reader/Viewer tabs where applicable.
- Favorites and Items tables.
- Tags panel and New Tag modal.
- Search/filter/date toolbar.
- Column and export previews.
- Status dropdowns in table rows.
- Avatar preview.
- New/Edit item modals with multi-attachment preview.
- Delete confirmation.
- RAG Workspace.
- Settings.

## Deliberately not implemented in Phase 1

- Real authentication.
- Real database persistence.
- Real storage providers.
- Real Obsidian indexing.
- Real RAG/OCR.
- Real export engine.
- Backend business logic.

## Phase 2 direction

Phase 2 starts with Authentication.
