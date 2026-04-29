# Obsidian Sync Architecture

## Decision

The external Obsidian vault is the source of truth for Ideaverse content.

The app reads and writes Markdown files in the vault.

The database stores index/cache/search metadata.

## Why Not Put Vault in App Repo

The vault should stay outside the code repo because it is personal content, may become large, may contain private/NSFW content, and should not be accidentally committed.

## Config

Use environment variable:

```txt
OBSIDIAN_VAULT_PATH=D:/Obsidian/Ideaverse
```

Docker Compose should mount it into the relevant container as read/write:

```txt
/data/obsidian-vault
```

## File Model

Each indexed note should have:

```txt
id
vault_relative_path
title
type
tags
frontmatter jsonb
content_hash
last_indexed_at
last_modified_at
sync_status
```

## Frontmatter

Introduce frontmatter gradually.

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
```

## Editor UX

Use Markdown editor + preview split view.

Meaning:

- left or top pane: raw Markdown text
- right or bottom pane: rendered preview
- user can keep writing normal Markdown
- app shows the final rendered look

This is safer and simpler than a Notion-like WYSIWYG editor.

## Sync Modes

### MVP: Manual Sync

User clicks:

```txt
Sync Obsidian
```

App then:

1. scans vault files
2. parses frontmatter
3. extracts title/type/tags
4. computes content hash
5. updates database index

### Later: File Watcher

Automatically detect changed files.

Do not implement before manual sync is reliable.

## Conflict Policy

Never silently overwrite.

If the app opens a file and the file changes externally before save:

- detect changed hash
- show conflict warning
- let user choose:
  - reload from disk
  - overwrite
  - save copy

## RAG Integration

Ideaverse notes can be indexed for RAG.

RAG should store:

- vault path
- chunk source
- heading context
- modified time
- embedding version
