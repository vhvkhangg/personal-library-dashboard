# Data Model Direction

## Strategy

Use hybrid relational + JSONB modeling.

Stable fields become real columns. Sparse or experimental fields can live in JSONB metadata.

## Common item fields

- `id`
- `module`
- `item_type`
- `title`
- `original_title`
- `description`
- `summary`
- `note`
- `status`
- `rating`
- `progress`
- `is_favorite`
- `is_nsfw`
- `visibility`
- `created_at`
- `updated_at`
- `metadata`

## Rating

- Range: `0.0` to `10.0`.
- One decimal place.
- Store as `numeric(3,1)` or equivalent.
- Validate frontend and backend.

## Status

Phase 1 UI statuses:

- Active
- Draft
- Archived

Future backend should store status as a constrained enum or reference table.

## Tags

Tags support:

- global tags,
- module-scoped tags,
- item assignments.

Suggested scopes:

```txt
global
fiction
film
media
fnb
information
nsfw
ideaverse
documents
```

New/Edit Item should select from existing tags. Creating new tags is separate from editing items.

## JSONB

Allowed for sparse fields such as:

- `worldSetting`
- `genreNotes`
- `watchedUntil`
- `listenedUntil`
- `eatenBefore`
- `shotAt`
- `illustratedCharacter`
- `platforms`
- module-specific experimental fields

Promote JSONB fields to real columns when they become frequent filters or joins.
