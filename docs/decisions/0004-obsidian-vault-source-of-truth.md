# 0004 — Obsidian Vault as Ideaverse Source of Truth

## Status

Accepted

## Context

The user already writes Ideaverse content in Obsidian. The vault currently lives outside the repo. The user wants to edit in both web and Obsidian and keep both synchronized.

## Decision

Keep the Obsidian vault outside the app repository. Treat Markdown files as source of truth. The app reads/writes Markdown and indexes metadata into PostgreSQL.

## Alternatives Considered

1. Move vault into app repo.
2. Import notes into database and export back.
3. Web only manages metadata and cannot edit content.

Moving vault into app repo risks accidental commits and bloats code repo. Database-as-source-of-truth makes sync conflicts harder.

## Consequences

Markdown formatting and Obsidian compatibility remain strong. The app must implement safe file writing and conflict detection. Database index may be rebuilt from vault.

## Follow-ups

Define frontmatter schema. Implement manual sync before automatic file watching.
