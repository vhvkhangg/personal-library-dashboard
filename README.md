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

Planning/documentation first. Implementation starts after architecture docs and ADRs are accepted.

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

## Major Modules

- Dashboard
- Fiction
- Film
- Media
- F&B
- Information
- NSFW
- Ideaverse
- Documents/RAG
- Export
- Storage

## Documentation

Start here:

- [Architecture Overview](docs/architecture/overview.md)
- [Module Map](docs/architecture/modules.md)
- [Repository Layout](docs/architecture/repository-layout.md)
- [UI Guidelines](docs/architecture/ui-guidelines.md)
- [Data Model](docs/architecture/data-model.md)
- [Storage Architecture](docs/architecture/storage.md)
- [Obsidian Sync](docs/architecture/obsidian-sync.md)
- [Local RAG/OCR](docs/architecture/rag-local.md)
- [Security/Auth](docs/architecture/security-auth.md)
- [Testing and Verification](docs/architecture/testing-and-verification.md)
- [Architecture Decision Records](docs/decisions/)

## Early MVP Order

1. Layout shell
2. Auth
3. Tag system
4. Image viewer
5. Fiction module
6. Media storage
7. Export CSV/Excel
8. Obsidian sync
9. Video/music player
10. RAG

## Development Defaults

- Frontend package manager: `pnpm`
- Backend build tool: `Maven`
- Python tooling: `uv`
- Database migration tool: to be finalized during backend setup
- Runtime: Docker Desktop + Docker Compose
