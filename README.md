# personal-library-dashboard

A private single-user dashboard for storing, organizing, viewing, searching, and exporting a personal library of favorite content.

This project is also a learning project for:

- Next.js 16 + shadcn/ui
- Java 25 + Spring Boot 4.0.6
- Python local RAG/OCR
- PostgreSQL + pgvector
- Modular monolith architecture
- Docker Desktop on Windows 11
- GPT web + Codex assisted development

## Status

Phase 1 UI is accepted as final.

Current sync:

- docs refreshed,
- services skeleton refreshed,
- root README/AGENTS refreshed,
- skills refreshed,
- Phase 2 starts with Authentication next.

## Target Runtime

The intended deployment is local self-hosting:

```txt
Windows 11 desktop host
  ├─ Docker Desktop
  ├─ Next.js web
  ├─ Spring Boot API
  ├─ Python RAG/OCR service
  ├─ PostgreSQL + pgvector
  ├─ local media folder
  └─ mounted external Obsidian vault
```

Laptop accesses the desktop host through browser over LAN or private VPN.

## Current Product Decisions

- Ideaverse is read-only in the web app.
- The external Obsidian vault remains the source of truth and editing surface for Ideaverse Markdown.
- Media includes first-class Album and Account modules.
- Albums can group Image, Picture, and Illustration items.
- Account stores followed creator/social accounts and has a Viewer surface.
- F&B includes Snack.
- Header activity is called Journal / `Nhật ký`, not Notification.
- Song is not a visible Media submodule; song-like content belongs under Music.
- The removed liquid-glass effect should not be reintroduced.

## Major Modules

- Dashboard
- Fiction
- Film
- Media
  - Album
  - Account
  - Image
  - Picture
  - Illustration
  - Illustrator
  - Video
  - Music
  - Musician
- F&B
  - Food
  - Beverage
  - Snack
- Information
- NSFW
- Ideaverse
- Documents/RAG
- Profile
- Settings
- Export
- Storage

## Documentation

Start here:

- [Docs Index](docs/README.md)
- [Architecture Overview](docs/architecture/00-overview.md)
- [Repository Layout](docs/architecture/01-repository-layout.md)
- [Frontend UI](docs/architecture/02-frontend-ui.md)
- [Module Map](docs/architecture/03-modules.md)
- [Backend Modular Monolith](docs/architecture/04-backend-modular-monolith.md)
- [Data Model](docs/architecture/05-data-model.md)
- [Storage Architecture](docs/architecture/06-storage.md)
- [Security/Auth](docs/architecture/07-auth-security.md)
- [Ideaverse and Obsidian](docs/architecture/08-ideaverse-obsidian.md)
- [Local RAG/OCR](docs/architecture/09-rag-ocr.md)
- [Export](docs/architecture/10-export.md)
- [Testing and Verification](docs/architecture/11-testing-verification.md)
- [Phase 1 Final State](docs/development/phase-1-final.md)
- [Phase 2 Plan](docs/development/phase-2-plan.md)
- [Architecture Decision Records](docs/decisions/)

## Phase Roadmap

1. Layout shell and final UI — accepted in Phase 1
2. Auth — next Phase 2 target
3. Tag system
4. Image and album viewer
5. Fiction module
6. Media storage
7. Export CSV/Excel
8. Obsidian read/index/preview sync
9. Video/music player
10. RAG

## Development Defaults

- Frontend package manager: `pnpm`
- Backend build tool: `Maven`
- Python tooling: `uv`
- Database migration tool: to be finalized during backend setup
- Runtime: Docker Desktop + Docker Compose
