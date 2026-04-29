# 0008 — MVP Implementation Order

## Status

Accepted

## Context

The full project scope is large. The user prioritized layout, auth, tags, image viewer, Fiction, storage, export, Obsidian sync, video/music, and RAG in that order.

## Decision

Follow the MVP order documented in AGENTS.md and README. Do not start RAG before the core app shell, auth, tags, storage, and export are usable.

## Alternatives Considered

1. Start with RAG.
2. Start with all categories.
3. Start with database schema for everything.
4. Start with media player.

These increase complexity before core navigation and data management are stable.

## Consequences

The project will have visible progress quickly while reducing architectural churn. RAG is deferred until enough data/storage/document infrastructure exists.

## Follow-ups

After each MVP phase, update docs and create a small checklist before moving to the next phase.
