# Development Tooling

## Defaults

- Frontend package manager: `pnpm`
- Backend build tool: `Maven`
- Python tooling: `uv`
- Runtime: Docker Desktop + Docker Compose
- Database: PostgreSQL + pgvector

## Why pnpm

`pnpm` is a good default for modern TypeScript monorepos because it is fast, disk-efficient, and strict about dependency resolution.

## Why Maven

Maven is a good default while learning Spring Boot because examples, documentation, and tutorials commonly support it.

## Why uv

`uv` is a good default for Python service tooling because it gives fast dependency resolution, virtualenv management, and modern project workflows.

## Codex Usage

GPT web remains the primary planner/coder.

Codex should be used for:

- local patching
- running checks
- reading repo context
- reviewing diffs
- applying small scoped changes

Avoid asking Codex to perform huge multi-module rewrites in one prompt.
