# Repository Layout

## Target Layout

```txt
personal-library-dashboard/
├─ AGENTS.md
├─ README.md
├─ .gitignore
├─ .env.example
├─ compose.yaml
├─ compose.override.yaml
├─ pnpm-workspace.yaml
├─ package.json
├─ turbo.json
│
├─ apps/
│  └─ web/
│     ├─ package.json
│     ├─ next.config.ts
│     ├─ tsconfig.json
│     ├─ components.json
│     ├─ postcss.config.mjs
│     ├─ eslint.config.mjs
│     ├─ public/
│     │  └─ favicon.ico
│     └─ src/
│        ├─ app/
│        │  ├─ globals.css
│        │  ├─ layout.tsx
│        │  ├─ page.tsx
│        │  │
│        │  ├─ (auth)/
│        │  │  └─ login/
│        │  │     └─ page.tsx
│        │  │
│        │  ├─ (dashboard)/
│        │  │  ├─ layout.tsx
│        │  │  ├─ dashboard/
│        │  │  │  └─ page.tsx
│        │  │  ├─ fiction/
│        │  │  │  ├─ page.tsx
│        │  │  │  ├─ manga/
│        │  │  │  ├─ manhua/
│        │  │  │  ├─ manhwa/
│        │  │  │  ├─ novel/
│        │  │  │  ├─ book/
│        │  │  │  ├─ character/
│        │  │  │  └─ author/
│        │  │  ├─ film/
│        │  │  ├─ media/
│        │  │  │  ├─ image/
│        │  │  │  ├─ video/
│        │  │  │  └─ music/
│        │  │  ├─ fnb/
│        │  │  ├─ information/
│        │  │  ├─ nsfw/
│        │  │  ├─ ideaverse/
│        │  │  ├─ documents/
│        │  │  └─ settings/
│        │  │
│        │  └─ api/
│        │     └─ health/
│        │        └─ route.ts
│        │
│        ├─ components/
│        │  ├─ ui/                         # shadcn/ui generated components
│        │  ├─ layout/
│        │  │  ├─ app-shell.tsx
│        │  │  ├─ app-header.tsx
│        │  │  ├─ icon-sidebar.tsx
│        │  │  ├─ menu-sidebar.tsx
│        │  │  └─ nsfw-toggle.tsx
│        │  ├─ data-table/
│        │  │  ├─ data-table.tsx
│        │  │  ├─ data-table-toolbar.tsx
│        │  │  ├─ data-table-pagination.tsx
│        │  │  ├─ column-visibility-menu.tsx
│        │  │  └─ table-list-row.tsx
│        │  ├─ dashboard/
│        │  │  ├─ summary-card.tsx
│        │  │  └─ module-dashboard-grid.tsx
│        │  ├─ media/
│        │  │  ├─ image-viewer.tsx
│        │  │  ├─ image-gallery.tsx
│        │  │  ├─ media-player.tsx
│        │  │  └─ progress-controls.tsx
│        │  ├─ markdown/
│        │  │  ├─ markdown-editor.tsx
│        │  │  ├─ markdown-preview.tsx
│        │  │  └─ markdown-split-view.tsx
│        │  └─ command/
│        │     └─ global-command-palette.tsx
│        │
│        ├─ features/
│        │  ├─ auth/
│        │  │  ├─ api.ts
│        │  │  ├─ auth-provider.tsx
│        │  │  └─ types.ts
│        │  ├─ tags/
│        │  ├─ dashboard/
│        │  ├─ fiction/
│        │  ├─ film/
│        │  ├─ media/
│        │  ├─ fnb/
│        │  ├─ information/
│        │  ├─ nsfw/
│        │  ├─ ideaverse/
│        │  ├─ documents/
│        │  ├─ rag/
│        │  └─ export/
│        │
│        ├─ lib/
│        │  ├─ api-client.ts
│        │  ├─ env.ts
│        │  ├─ routes.ts
│        │  ├─ utils.ts
│        │  ├─ constants.ts
│        │  └─ validators/
│        │
│        ├─ hooks/
│        ├─ styles/
│        └─ test/
│
├─ services/
│  ├─ api/
│  │  ├─ pom.xml
│  │  ├─ Dockerfile
│  │  └─ src/
│  │     ├─ main/
│  │     │  ├─ java/
│  │     │  │  └─ com/
│  │     │  │     └─ vhvkhangg/
│  │     │  │        └─ personallibrarydashboard/
│  │     │  │           ├─ PersonalLibraryDashboardApplication.java
│  │     │  │           │
│  │     │  │           ├─ common/
│  │     │  │           │  ├─ error/
│  │     │  │           │  ├─ validation/
│  │     │  │           │  ├─ pagination/
│  │     │  │           │  ├─ security/
│  │     │  │           │  ├─ time/
│  │     │  │           │  └─ web/
│  │     │  │           │
│  │     │  │           ├─ auth/
│  │     │  │           │  ├─ domain/
│  │     │  │           │  ├─ application/
│  │     │  │           │  ├─ infrastructure/
│  │     │  │           │  └─ web/
│  │     │  │           │
│  │     │  │           ├─ dashboard/
│  │     │  │           ├─ tags/
│  │     │  │           ├─ catalog/
│  │     │  │           ├─ storage/
│  │     │  │           ├─ fiction/
│  │     │  │           ├─ film/
│  │     │  │           ├─ media/
│  │     │  │           ├─ fnb/
│  │     │  │           ├─ information/
│  │     │  │           ├─ nsfw/
│  │     │  │           ├─ ideaverse/
│  │     │  │           ├─ documents/
│  │     │  │           ├─ rag/
│  │     │  │           └─ export/
│  │     │  │
│  │     │  └─ resources/
│  │     │     ├─ application.yml
│  │     │     ├─ application-local.yml
│  │     │     └─ db/
│  │     │        └─ migration/
│  │     │           └─ V001__init_extensions.sql
│  │     │
│  │     └─ test/
│  │        └─ java/
│  │           └─ com/
│  │              └─ vhvkhangg/
│  │                 └─ personallibrarydashboard/
│  │
│  └─ rag/
│     ├─ pyproject.toml
│     ├─ uv.lock
│     ├─ Dockerfile
│     ├─ README.md
│     ├─ src/
│     │  └─ pld_rag/
│     │     ├─ __init__.py
│     │     ├─ main.py
│     │     ├─ api/
│     │     │  ├─ app.py
│     │     │  ├─ routes_health.py
│     │     │  ├─ routes_ingestion.py
│     │     │  └─ routes_query.py
│     │     ├─ config/
│     │     │  └─ settings.py
│     │     ├─ schemas/
│     │     │  ├─ documents.py
│     │     │  ├─ ingestion.py
│     │     │  ├─ retrieval.py
│     │     │  └─ generation.py
│     │     ├─ ingestion/
│     │     │  ├─ pipeline.py
│     │     │  ├─ file_discovery.py
│     │     │  ├─ normalization.py
│     │     │  └─ metadata.py
│     │     ├─ parsers/
│     │     │  ├─ pdf_docling.py
│     │     │  ├─ docx_parser.py
│     │     │  ├─ markdown_parser.py
│     │     │  ├─ text_parser.py
│     │     │  ├─ csv_parser.py
│     │     │  └─ excel_parser.py
│     │     ├─ ocr/
│     │     │  ├─ base.py
│     │     │  ├─ paddleocr_engine.py
│     │     │  ├─ tesseract_engine.py
│     │     │  └─ ocr_router.py
│     │     ├─ chunking/
│     │     │  ├─ chunker.py
│     │     │  ├─ markdown_chunker.py
│     │     │  └─ table_chunker.py
│     │     ├─ embeddings/
│     │     │  ├─ embedder.py
│     │     │  └─ bge_m3_embedder.py
│     │     ├─ retrieval/
│     │     │  ├─ dense_retriever.py
│     │     │  ├─ sparse_retriever.py
│     │     │  ├─ hybrid_retriever.py
│     │     │  └─ fusion.py
│     │     ├─ reranking/
│     │     │  ├─ cross_encoder_reranker.py
│     │     │  └─ bge_reranker.py
│     │     ├─ generation/
│     │     │  ├─ local_llm.py
│     │     │  ├─ ollama_client.py
│     │     │  └─ answer_builder.py
│     │     ├─ evaluation/
│     │     │  ├─ rag_eval_dataset.py
│     │     │  └─ evaluate_retrieval.py
│     │     └─ observability/
│     │        └─ logging.py
│     │
│     └─ tests/
│        ├─ test_chunking.py
│        ├─ test_parsers.py
│        ├─ test_retrieval.py
│        └─ test_reranking.py
│
├─ packages/
│  └─ shared-contracts/
│     ├─ package.json
│     └─ src/
│        └─ index.ts
│
├─ infrastructure/
│  ├─ docker/
│  │  ├─ postgres/
│  │  │  └─ init/
│  │  │     └─ 00_extensions.sql
│  │  ├─ nginx/
│  │  │  └─ nginx.conf
│  │  └─ ollama/
│  │     └─ README.md
│  └─ scripts/
│     ├─ dev.ps1
│     ├─ backup-db.ps1
│     ├─ restore-db.ps1
│     └─ print-vault-tree.ps1
│
├─ docs/
│  ├─ README.md
│  ├─ architecture/
│  │  ├─ overview.md
│  │  ├─ repository-layout.md
│  │  ├─ modules.md
│  │  ├─ ui-guidelines.md
│  │  ├─ data-model.md
│  │  ├─ storage.md
│  │  ├─ obsidian-sync.md
│  │  ├─ rag-local.md
│  │  ├─ security-auth.md
│  │  └─ testing-and-verification.md
│  ├─ decisions/
│  └─ development/
│     └─ tooling.md
│
├─ .codex/
│  ├─ config.toml
│  ├─ AGENTS.md
│  └─ agents/
│     ├─ explorer.toml
│     ├─ reviewer.toml
│     ├─ docs-researcher.toml
│     ├─ java-reviewer.toml
│     └─ frontend-reviewer.toml
│
└─ .agents/
   └─ skills/
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
