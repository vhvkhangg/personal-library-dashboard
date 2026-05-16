# Repository Layout

Target layout:

```txt
personal-library-dashboard/
  AGENTS.md
  README.md
  .env.example
  compose.yaml
  pnpm-workspace.yaml
  package.json
  turbo.json

  apps/
    web/

  services/
    api/
    rag/

  packages/
    shared-contracts/

  infrastructure/
    docker/
    scripts/

  docs/
    README.md
    RUNBOOK.md
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

## Why `apps/web/`

Keep `apps/web/` instead of moving web files directly under `apps/`.

Reason:

- `apps/` is a workspace bucket.
- `web/` is one application inside that bucket.
- Future apps can be added without moving the current frontend: `desktop`, `mobile`, `admin`, or `storybook`.
- This is a common monorepo layout and keeps root-level ownership clear.

## Why `services/api/` and `services/rag/`

Keep `services/` because there are multiple backend runtimes.

- `services/api/` is the Java Spring business API.
- `services/rag/` is the Python RAG/OCR runtime.

Although the RAG service may expose HTTP endpoints later, it is not the main business API. Naming it `rag` makes its runtime responsibility obvious.

## Rules

- Do not put the Obsidian vault in this repository.
- Do not put media library files in this repository.
- Do not commit `.env`, secrets, tokens, database dumps, model weights, or private vault content.
- Documentation must live under `docs/`.
- ADRs must live under `docs/decisions/`.
- Phase 1 services contain only package skeletons and `package-info.java` files.
