# Testing and Verification

## Philosophy

This is a learning project, but correctness still matters.

Prefer small, verifiable increments.

## Frontend

Expected checks once configured:

```txt
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Test areas:

- dashboard rendering
- table filters
- search state
- NSFW hiding behavior
- image viewer navigation
- form validation
- API error states

## Backend

Expected checks once configured:

```txt
mvn test
mvn verify
```

Test areas:

- auth login/refresh/logout
- JWT validation
- NSFW filtering
- tag assignment
- item CRUD
- export endpoints
- storage metadata
- Obsidian sync indexing
- RAG orchestration calls

## Python RAG

Expected checks once configured:

```txt
uv run ruff check .
uv run ruff format --check .
uv run mypy .
uv run pytest
```

Test areas:

- parsers
- OCR wrapper
- chunking
- embedding metadata
- retrieval ranking
- answer generation contract
- Vietnamese sample queries

## Database

Verify:

- migrations apply from clean database
- indexes exist for common filters
- foreign keys are indexed where needed
- JSONB indexes are justified
- pgvector index strategy is documented

## Definition of Done

A task is not complete unless:

- code compiles
- relevant tests pass
- relevant docs are updated
- migration is included if schema changed
- no secrets are introduced
- assumptions are stated
- known limitations are documented
