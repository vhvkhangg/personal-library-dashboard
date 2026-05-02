# ADR 0002 — Phase 1 UI Final

## Status

Accepted

## Context

Phase 1 focused on finalizing the UI before backend implementation.

## Decisions

- Keep the accepted dark-first dashboard visual language.
- Use double sidebar navigation.
- Keep command palette as UI-only preview.
- Keep protected `H` PIN modal as UI-only preview.
- Keep RAG Workspace as a three-column UI prototype.
- Keep Settings as general app settings; RAG-specific controls stay inside RAG Workspace.
- Ideaverse is read-only on web.
- Media includes Album.
- Song is not a visible module; Music owns song-like content.
- Item detail uses Summary, Description, Note, and Facts.
- Edit Item does not edit status or favorite.

## Consequences

Phase 2 can focus on auth/backend foundations without continuing large UI churn.
