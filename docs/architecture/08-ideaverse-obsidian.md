# Ideaverse and Obsidian

## Current decision

Ideaverse is read-only on the web app.

The external Obsidian vault is the source of truth and the editing surface. The web app previews/indexes content but does not edit Markdown files.

## Vault location

Current external vault path:

```txt
C:/Users/VU KHANG/OneDrive/IDEAVERSE
```

Do not put the vault inside the repository.

## Web role

The web app may eventually:

- read Markdown files,
- render Markdown preview,
- index file paths,
- cache title/type/tags/frontmatter,
- support search/filter,
- support RAG ingestion state,
- track preview reading progress.

The web app should not:

- edit Markdown,
- silently overwrite files,
- mass-rewrite vault content,
- treat database cache as the source of truth.

## Database role

Database should index/cache:

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

`*.canvas` can be handled later as metadata.
