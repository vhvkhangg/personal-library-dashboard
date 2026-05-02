# ADR 0001 — Foundation Decisions

## Status

Accepted

## Decisions

- The project is a private single-user dashboard.
- Runtime target is local self-hosting on Windows 11 with Docker Desktop.
- Architecture is modular monolith, not microservices.
- Frontend is Next.js 16.
- Backend target is Java 25 + Spring Boot 4.
- RAG/OCR target is Python + local offline-first models.
- Database target is PostgreSQL + pgvector.
- Large binary files are not stored in PostgreSQL.
- Obsidian vault stays outside the repository.
- Documentation lives under `docs/`.

## Consequences

The project should favor simple local development, explicit module boundaries, and reversible decisions over early production complexity.
