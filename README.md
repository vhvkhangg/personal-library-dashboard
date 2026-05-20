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

- Phase 2.1 Auth contract is complete,
- Phase 2.2 backend Auth minimum is complete,
- Phase 2.3 frontend Auth wiring is complete,
- Phase 2.4 verification/docs cleanup records checks, runbook commands, and commit notes.


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
- [Auth Contract](docs/architecture/13-auth-contract.md)
- [Ideaverse and Obsidian](docs/architecture/08-ideaverse-obsidian.md)
- [Local RAG/OCR](docs/architecture/09-rag-ocr.md)
- [Export](docs/architecture/10-export.md)
- [Testing and Verification](docs/architecture/11-testing-verification.md)
- [Phase 1 Final State](docs/development/phase-1-final.md)
- [Phase 2 Plan](docs/development/phase-2-plan.md)
- [Architecture Decision Records](docs/decisions/)

## Phase Roadmap

1. Layout shell and final UI — accepted in Phase 1
2. Auth — Phase 2.4 verification/docs cleanup now
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
- Database migration tool: Flyway
- Runtime: Docker Desktop + Docker Compose


## Phase 2 Auth

Current accepted auth decisions:

- seed the single user from environment variables,
- login uses one `identifier` field for username/email/phone,
- cookies are `pld_access_token` and `pld_refresh_token`,
- refresh tokens are stored as hashes only,
- access token TTL is 15 minutes,
- refresh token TTL is 14 days,
- Flyway is the migration tool for auth schema in Phase 2.2.


## Phase 2.2 Backend Auth Minimum

Phase 2.2 adds the runnable Spring Boot Auth backend:

- Flyway migration for `auth_users` and `auth_refresh_tokens`,
- seed user bootstrap from environment/config,
- BCrypt password hashing,
- JWT access token cookie,
- opaque refresh token cookie,
- refresh-token hash persistence,
- login/refresh/logout/me endpoints.

Run:

```powershell
mvn -f services\api\pom.xml test
mvn -f services\api\pom.xml spring-boot:run
```
## Phase 2.3 Frontend Auth Wiring

Phase 2.3 connects the accepted login UI to the Spring Boot Auth API:

- `/login` submits to `POST /auth/login`,
- `AuthProvider` restores sessions with `GET /auth/me`,
- expired access cookies fall back to `POST /auth/refresh`,
- dashboard routes are guarded client-side,
- the header shows the current user and exposes logout,
- tokens remain httpOnly cookies and are never stored in localStorage.

Frontend API base URL defaults to `http://localhost:8080` and can be overridden with:

```txt
NEXT_PUBLIC_PLD_API_BASE_URL=http://localhost:8080
```


## Phase 2.4 Verification

Phase 2.4 records verification status and local commands for the Auth slice.

Run locally from repository root:

```powershell
pnpm --filter @pld/web typecheck
pnpm --filter @pld/web lint
mvn -f services\api\pom.xml test
```

See:

- `docs/development/phase-2-4-verification-report.md`
- `docs/development/commit-notes/phase-2-auth.md`
