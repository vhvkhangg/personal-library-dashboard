# Repository Layout

Target repository layout:

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
    README.md
    api/
    rag/

  packages/
    shared-contracts/

  infrastructure/
    docker/
    scripts/

  docs/
    README.md
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

## Rules

- Do not put the Obsidian vault in this repository.
- Do not put media library files in this repository.
- Do not commit `.env`, secrets, tokens, database dumps, model weights, or private vault content.
- Documentation must live under `docs/`.
- Architecture decisions must live under `docs/decisions/`.
- Early backend service packages may exist as `package-info.java` placeholders until the phase needs real code.

## Phase 1 service rule

For Phase 1, `services/api/src/main/java` is a package-map skeleton only. It should contain folders and `package-info.java` files, not controllers, entities, repositories, service implementations, or API logic.

Phase 2 may add real classes under the existing package map.
