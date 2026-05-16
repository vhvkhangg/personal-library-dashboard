# ADR 0003 — Ideaverse Read-Only Web UI

## Status

Accepted

## Decision

Ideaverse is read-only in the web app. Obsidian remains the editing source of truth.

## Consequences

The web app may preview, index, search, and use Ideaverse documents for RAG. It should not edit or write Markdown unless this decision is explicitly changed.
