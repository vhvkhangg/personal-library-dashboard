# Ideaverse and Obsidian

## Current decision

Ideaverse is read-only on the web app.

The external Obsidian vault is the source of truth and editing surface.

## Web role

The web app may later:

- read Markdown files,
- render Markdown preview,
- index file paths,
- cache title/type/tags/frontmatter,
- support search/filter,
- support RAG ingestion state,
- track preview reading progress,
- show journal entries when index refreshes.

The web app must not:

- edit Markdown,
- silently overwrite files,
- mass-rewrite vault content,
- treat database cache as the source of truth.

## Database role

Database may cache:

- vault-relative path,
- title,
- section/type,
- tags/frontmatter,
- last indexed timestamp,
- RAG ingestion status.

## Ignored paths

Ignore:

```txt
.obsidian/**
plugin folders
theme folders
snippet folders
temporary files
```
