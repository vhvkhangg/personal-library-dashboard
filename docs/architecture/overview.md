# Architecture Overview

## Purpose

`personal-library-dashboard` is a private dashboard for a single user to manage a personal library of fiction, film, media, food/beverage, information, NSFW content, Ideaverse writing notes, and documents for RAG.

It is not a public SaaS system.

## Core Goals

- Single-user private access.
- Clean dashboard UI.
- Fast browsing and filtering.
- Strong local ownership of data.
- Good Vietnamese support.
- Extensible category system.
- Media viewing/playback.
- Obsidian Markdown integration.
- Local RAG/OCR.
- Export to CSV/Excel.

## High-Level Runtime

```txt
Browser
  ↓
Next.js 16 frontend
  ↓
Spring Boot 4 API
  ├─ PostgreSQL + pgvector
  ├─ local filesystem storage
  ├─ Google Drive-capable storage provider
  ├─ external Obsidian vault mount
  └─ Python RAG/OCR service
```

## Deployment Model

Desktop Windows 11 machine runs Docker Desktop and hosts the app stack.

Laptop accesses the app through browser.

Recommended access options:

1. LAN IP while both devices are on the same network.
2. Private VPN such as Tailscale if remote access is needed later.

## Architectural Style

The backend is a modular monolith.

This means:

- One deployable Spring Boot application.
- Multiple internal business modules.
- Clear module boundaries.
- No microservices for core business logic.
- Python RAG service exists because local ML/OCR tooling is much easier in Python.

## Key Architectural Decisions

- PostgreSQL stores metadata and index data.
- Large binary files are not stored in PostgreSQL.
- Obsidian vault is outside the app repo.
- Ideaverse Markdown files are source of truth.
- RAG is local/offline by default.
- NSFW filtering is enforced in backend and frontend.
- JWT is used for learning, but stored safely via httpOnly cookies.
