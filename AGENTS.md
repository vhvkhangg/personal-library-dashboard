# personal-library-dashboard — Agent Instructions

## 1. Project Identity

`personal-library-dashboard` is a private, single-user personal dashboard for storing, browsing, searching, viewing, and organizing the owner's favorite content.

The project is also a learning project for:

- Vibe coding with GPT web as the primary coding/planning assistant.
- Codex as a secondary local coding/review/testing assistant.
- Java 25 and Spring Boot 4.
- Python local RAG/OCR pipelines.
- PostgreSQL + pgvector.
- Next.js 16 + shadcn/ui.
- Modular monolith architecture.

Primary user: the repository owner only.

Expected access pattern:

- Desktop Windows 11 machine acts as the primary host/server.
- Laptop Windows 11 machine accesses the app through browser over LAN or private VPN.
- Docker Desktop is the default local runtime.
- PostgreSQL is single-source-of-truth for application metadata.
- Large media files stay on local filesystem.
- Image/music cloud storage targets Google Drive through a storage abstraction.
- Obsidian vault stays outside the repository and remains the source of truth for Ideaverse Markdown notes.

## 2. Current Technology Decisions

Use these defaults unless the user explicitly changes them.

### Frontend

- Framework: Next.js 16.
- Router: App Router.
- UI: shadcn/ui + Tailwind CSS.
- Package manager: pnpm.
- Language: TypeScript.
- UI style: clean SaaS/admin dashboard with rounded cards, table/list hybrid rows, badges, filters, search, pagination, and strong empty/loading/error states.

### Backend

- Language: Java 25.
- Framework: Spring Boot 4.0.6.
- Build tool: Maven.
- Architecture: Modular Monolith.
- API style: REST-first.
- Auth: single-user JWT learning implementation.
- Validation: Bean Validation on request DTOs.
- Database migrations: required for every schema change.

### RAG/OCR Service

- Language: Python.
- Package/tooling: uv.
- Runtime role: local ingestion, OCR, parsing, chunking, embeddings, retrieval, reranking, and local LLM answer generation.
- Privacy: offline-first; do not send private documents to external APIs by default.
- Vietnamese support is a first-class requirement.

### Database

- PostgreSQL.
- pgvector for embeddings.
- Use normal relational schema for stable fields.
- Use JSONB only for fields that are unstable, sparse, or category-specific.
- Prefer explicit indexes for frequent filters, joins, search fields, and foreign keys.

### Deployment

- Docker Compose local development and self-hosting.
- Desktop runs services.
- Laptop accesses desktop host over LAN or private VPN.
- Do not introduce cloud deployment until the user asks.

## 3. Repository Layout

Target layout:

```txt
personal-library-dashboard/
  AGENTS.md
  README.md

  apps/
    web/                    # Next.js 16 frontend

  services/
    api/                    # Java 25 + Spring Boot 4 API
    rag/                    # Python local RAG/OCR service

  packages/
    shared-contracts/       # Optional generated/shared API types later

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

Rules:

- Do not put Obsidian vault content inside this repository.
- Do not put media library files inside this repository.
- Do not commit secrets, tokens, `.env` files, database dumps, model weights, or private vault content.
- Documentation must live under `docs/`.
- Architecture decisions must live under `docs/decisions/` as ADRs.

## 4. Product Scope

The app contains these high-level modules:

1. Dashboard
2. Fiction
3. Film
4. Media
5. F&B
6. Information
7. NSFW
8. Ideaverse
9. Documents/RAG
10. Export
11. Storage

### Fiction

Submodules:

- Dashboard
- Convert
- Manga
- Manhua
- Manhwa
- Novel
- Book
- Character
- Author

### Film

Submodules:

- Dashboard
- Movie
- Series
- Actor
- Character

### Media

Submodules:

- Dashboard
- Image
  - Picture
  - Illustration
  - Illustrator
- Video
- Music
  - Song
  - Musician

### F&B

Submodules:

- Dashboard
- Food
- Beverage

### Information

Submodules:

- Dashboard
- Health
- Technology
- Other information domains
- Miscellaneous

### NSFW

Submodules:

- Dashboard
- Comic
- Image
- Video
- Character
- Author

### Ideaverse

Ideaverse is the owner's writing/worldbuilding area.

Submodules:

- Dashboard
- Core
  - Cốt Truyện
  - Thế Giới Quan & Thế Lực
  - Nhân Vật Chính
  - Thiết Lập Lãnh Địa
  - Sủng Thú
  - Vũ Khí Trang Bị
  - Công Pháp
  - Cảnh Giới
  - Kỹ Năng
  - Thể Chất
  - Vật Phẩm
  - Phản Diện
  - Templates

Ideaverse content is primarily Markdown in an external Obsidian vault. The web app may read/write Markdown files, but the vault remains the source of truth.

## 5. MVP Order

Implement in this order unless the user changes priorities:

1. Layout shell:
   - Header.
   - Global command/search.
   - NSFW toggle button with `H` icon.
   - Double sidebar: icon sidebar + menu sidebar.
   - Main dashboard/table/list shell.
2. Authentication:
   - Single-user login.
   - JWT access token + refresh token.
   - httpOnly cookie strategy.
   - Logout.
   - `/auth/me`.
3. Tag system:
   - Global tags.
   - Scoped/category tags.
   - Item-tag assignment.
4. Image viewer:
   - Gallery.
   - Image detail viewer.
   - Next/previous image.
   - Zoom in/out.
   - Comic/image set navigation.
5. Fiction module.
6. Media storage:
   - Local filesystem provider.
   - Google Drive provider abstraction, but real integration may come after local storage works.
7. Export:
   - CSV.
   - Excel.
   - WPS Office compatible.
   - Category export and filtered-list export.
8. Obsidian sync:
   - External vault path configuration.
   - Markdown read/write.
   - Frontmatter convention.
   - Manual sync first.
9. Video/music player:
   - Browser-supported playback first.
   - Speed control.
   - Seek forward/back.
   - Progress tracking.
   - Defer ffmpeg/transcoding until needed.
10. RAG:
   - Local document ingestion.
   - OCR.
   - PDF/DOCX/TXT/MD/CSV/XLSX parsing.
   - Table extraction.
   - Embeddings.
   - Retrieval.
   - Local LLM answering.

## 6. Architecture Rules

### Modular Monolith

The Spring Boot API is a modular monolith, not a microservice system.

Rules:

- Each business module owns its domain model, application services, repositories, and DTOs.
- Cross-module access must go through explicit application services, ports, or published events.
- Do not directly reach into another module's repository from outside the module.
- Keep controllers thin.
- Keep business logic out of controllers.
- Keep persistence concerns out of public DTOs.
- Do not expose JPA entities as API responses.
- Prefer constructor injection.
- Do not use field injection.

Suggested Java package structure:

```txt
com.vhvkhangg.personallibrarydashboard
  common/
    error/
    validation/
    security/
    pagination/
    time/
  auth/
  dashboard/
  tags/
  storage/
  catalog/
  fiction/
  film/
  media/
  fnb/
  information/
  nsfw/
  ideaverse/
  documents/
  rag/
  export/
```

Each module should normally contain:

```txt
module/
  domain/
  application/
  infrastructure/
  web/
```

### Python RAG Service Boundary

The Python service is not the main business backend.

It owns:

- document parsing
- OCR
- chunking
- embedding
- retrieval
- reranking
- answer generation with local LLM

The Spring API owns:

- auth
- user/session state
- metadata
- categories
- item relations
- storage metadata
- export orchestration
- calling the Python service

Communication can start with HTTP. Do not introduce message queues until a real need appears.

## 7. Data Modeling Rules

Use hybrid relational + JSONB modeling.

Stable common fields should be columns:

- `id`
- `item_type`
- `module`
- `title`
- `original_title`
- `url`
- `rating`
- `note`
- `description`
- `status`
- `progress`
- `is_nsfw`
- `created_at`
- `updated_at`
- `metadata`

Rating rules:

- Rating range: 0.0 to 10.0.
- Allow one decimal place.
- Validate both frontend and backend.
- Store as `numeric(3,1)` or equivalent.

Tags:

- Support global tags.
- Support scoped/category tags.
- Use slugs for stable references.
- Do not duplicate semantically identical tags without reason.

Suggested tag concepts:

```txt
scope = global | fiction | film | media | fnb | information | nsfw | ideaverse
```

Metadata JSONB is allowed for sparse fields such as:

- `worldSetting`
- `genreNotes`
- `watchedUntil`
- `listenedUntil`
- `eatenBefore`
- `shotAt`
- `shotWho`
- `shotWhen`
- `illustratedCharacter`
- `platforms`
- experimental fields

When a JSONB field becomes common and frequently filtered, promote it to a real column through a migration.

## 8. Storage Rules

Do not store large binary media in PostgreSQL.

Use storage metadata records with a provider abstraction.

Supported target providers:

- `LOCAL`
- `GOOGLE_DRIVE`
- `EXTERNAL_URL`
- `S3_COMPATIBLE` later if needed

Large video/movie files:

- Store on local filesystem.
- Database stores metadata/path/storage key only.

Images/music:

- Google Drive is the preferred cloud target because the user has large student storage quota.
- Still design through `StorageProvider` so the project can move to another provider later.

Store at least:

- provider
- storage key/path
- original filename
- mime type
- size bytes
- checksum/hash when practical
- width/height for images/video when known
- duration for audio/video when known
- createdAt/updatedAt

Never hardcode absolute local paths. Use environment variables, for example:

```txt
MEDIA_LOCAL_ROOT=D:/PersonalLibrary/media
OBSIDIAN_VAULT_PATH=D:/Obsidian/Ideaverse
```

## 9. Obsidian / Ideaverse Rules

The Obsidian vault is outside the app repo.

The vault is the source of truth for Ideaverse content.

Database role:

- index file path
- cache title/type/tags/frontmatter
- support search/filter
- support RAG ingestion state

Web role:

- read Markdown
- edit Markdown
- write Markdown back to vault
- parse/update frontmatter
- provide preview

Preferred editor UX:

- Markdown editor + preview split view.
- The user writes normal Markdown.
- Preview shows rendered Markdown.
- WYSIWYG can be considered later.

Frontmatter should be introduced gradually.

Example:

```md
---
id: ideaverse-character-001
type: ideaverse.character
title: "Tên nhân vật"
status: draft
tags:
  - ideaverse
  - main-character
rating: 9.2
createdAt: 2026-04-29
updatedAt: 2026-04-29
---

# Tên nhân vật

Nội dung...
```

Sync policy:

- MVP: manual sync button.
- Later: file watcher.
- On conflict, do not silently overwrite.
- Prefer preserving Markdown formatting.
- Never mass-rewrite the vault without explicit user approval.

## 10. RAG/OCR Rules

The user wants offline local RAG.

Default local LLM strategy:

- Default answer model: Qwen3 8B quantized through Ollama or equivalent local runtime.
- Quality mode on desktop: Qwen3 14B quantized if performance is acceptable.
- Vietnamese-special comparison model: Vistral-7B-Chat or a newer Vietnamese-focused model if evaluation proves better.
- Do not assume one model is permanently best; create evaluation prompts and compare.

Default embedding strategy:

- Start with BGE-M3 or a Vietnamese BGE-M3 fine-tune.
- Store embedding model name, dimension, distance metric, and version in the database.
- Do not mix embeddings from different models without tracking version.

OCR strategy:

- Primary OCR engine: PaddleOCR.
- Fallback/light baseline OCR engine: Tesseract with Vietnamese language data.
- Document layout/table parsing: Docling or equivalent document parsing tooling.
- Optional Vietnamese OCR experiment: VietOCR or PaddleOCR + VietOCR hybrid if evaluation proves better.
- Evaluate OCR quality on Vietnamese documents before relying on it.

Retrieval and reranking strategy:

- Retrieval must not stop at vector search.
- Use hybrid retrieval:
  - sparse retrieval from PostgreSQL full-text search or BM25-style candidate retrieval
  - dense retrieval from pgvector embeddings
  - candidate fusion using Reciprocal Rank Fusion or weighted merge
- Add a CrossEncoder reranking stage.
- Default reranker model candidate: BAAI/bge-reranker-v2-m3.
- Rerank top candidates before sending context to the local LLM.
- Store retrieval and reranking metadata for debugging and evaluation.

RAG ingestion must separate:

- file discovery
- parsing
- OCR
- normalization
- chunking
- embedding
- indexing
- sparse retrieval
- dense retrieval
- hybrid fusion
- cross-encoder reranking
- answer generation
- citation/source display

RAG answers must:

- cite source documents/chunks internally in the UI
- prefer saying "không đủ dữ liệu" over hallucinating
- expose the retrieved chunks and reranking scores for debugging when possible
- support Vietnamese queries and Vietnamese answers

## 11. Authentication and Security Rules

The app is single-user, but auth is still required.

Use JWT for learning:

- access token
- refresh token
- refresh token rotation if practical
- httpOnly cookie storage
- no localStorage token storage
- logout invalidates refresh token

Endpoints:

```txt
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

NSFW access:

- NSFW toggle controls visibility.
- NSFW content must be filtered at backend API level.
- Search must not return NSFW content when NSFW mode is off.
- NSFW module should require a separate PIN/password unlock.
- Do not rely only on frontend hiding.

Secrets:

- Do not commit `.env`.
- Do not commit JWT secrets.
- Do not commit Google OAuth credentials.
- Do not commit local file paths if they reveal private directories.

## 12. Frontend UI Rules

Visual style:

- Light dashboard by default.
- Clean SaaS/admin dashboard.
- Rounded containers.
- Soft borders.
- Spacious table/list rows.
- Pill badges.
- Clear filter tabs.
- Search-first UX.
- Pagination.
- Column visibility control.
- Export button.
- Action menu with `...`.

Main list pattern:

```txt
Breadcrumb
Title
Subtitle
Primary action button

Filter tabs

Toolbar:
- Search input
- Category/filter buttons
- Column button
- Export button

Content:
- Table/list hybrid
- Row icon/thumbnail
- Title + description/note
- Category/type
- Tags
- Rating
- Progress/status
- Created/updated date
- Actions

Footer:
- result count
- rows per page
- pagination
```

Dashboard card counts:

- Global dashboard: 4 summary cards.
- Category dashboard: 8 cards arranged as 2 rows × 4 cards.

Accessibility:

- Keyboard navigable.
- Command palette accessible by keyboard.
- Meaningful labels for icon buttons.
- Avoid color-only status indicators.
- Loading, empty, and error states required.

## 13. Backend API Rules

Use consistent response formats.

Suggested success response:

```json
{
  "data": {},
  "meta": {}
}
```

Suggested error response:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request.",
    "details": []
  }
}
```

Rules:

- Validate all request DTOs.
- Use centralized exception handling.
- Use pagination for lists.
- Use sorting and filtering explicitly.
- Avoid returning internal stack traces.
- Use DTOs, not entities.
- Do not leak filesystem paths to frontend unless intentionally needed.
- Use stable IDs in APIs.

## 14. Export Rules

Support:

- CSV export.
- Excel export.
- WPS Office compatible output.

Export modes:

- current filtered list
- specific category
- full module
- full backup later

Excel should support multiple sheets when exporting a module.

Example:

```txt
Fiction.xlsx
  - Manga
  - Manhua
  - Manhwa
  - Novel
  - Book
  - Character
  - Author
```

Do not put large binary files in export by default. Export metadata and links/paths unless the user requests a full archive.

## 15. Development Workflow Rules

The user primarily uses GPT web for planning/code generation and Codex as a secondary local executor/reviewer.

When using Codex:

- Keep prompts scoped.
- Prefer small changes.
- Ask Codex to run relevant tests/builds.
- Ask Codex to report failures exactly.
- Use `.agents/skills` when relevant.
- Use `docs-researcher` when framework behavior may have changed.

Do not overuse custom subagents. Current recommended agents:

- explorer
- reviewer
- docs-researcher
- java-reviewer optional
- frontend-reviewer optional

Prioritize:

1. `AGENTS.md`
2. `docs/`
3. selected skills
4. minimal agents

## 16. Documentation Rules

Every major architectural decision must have an ADR under:

```txt
docs/decisions/
```

Every major module should be documented under:

```txt
docs/architecture/
```

Docs should explain:

- what was decided
- why it was decided
- alternatives considered
- consequences/tradeoffs
- what is deferred

Do not write vague docs. Prefer concrete decisions and constraints.

## 17. Verification Rules

Before a task is considered complete, run the relevant checks if the corresponding app/service exists.

Frontend:

```txt
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Backend:

```txt
mvn test
mvn verify
```

Python:

```txt
uv run ruff check .
uv run ruff format --check .
uv run mypy .
uv run pytest
```

Database:

```txt
migration validation
schema diff review
index review
```

If commands do not exist yet, do not invent success. State that the command is not configured yet.

## 18. Non-Goals for Early MVP

Do not implement these until requested:

- multi-user roles
- public sharing
- cloud deployment
- Kubernetes
- distributed microservices
- real-time collaboration
- automatic video transcoding
- advanced vector evaluation UI
- mobile app
- full Google Drive bidirectional sync
- automatic Obsidian vault watcher

## 19. When Requirements Are Missing

When uncertain:

1. State the assumption.
2. Choose the simplest reversible design.
3. Avoid hardcoding irreversible decisions.
4. Record the decision in docs if it affects architecture.
5. Ask the user if the decision is high-impact.

## 20. Strong Prohibitions

Never:

- commit secrets
- store JWT in localStorage
- expose JPA entities in API responses
- put private Obsidian vault into the app repo
- store large media binaries in PostgreSQL
- implement NSFW hiding only in frontend
- silently overwrite Markdown files
- use external AI APIs for private RAG unless the user explicitly allows it
- claim tests passed without running them
