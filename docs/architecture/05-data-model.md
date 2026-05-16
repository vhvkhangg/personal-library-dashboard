# Data Model Direction

## Strategy

Use hybrid relational + JSONB modeling.

Stable fields become real columns. Sparse or experimental fields may live in JSONB metadata.

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
- `created_at`
- `updated_at`
- `metadata`

## Status

Phase 1 UI statuses:

- Active
- Draft
- Archived

Status is edited from the table row dropdown.

## Favorite

Favorite is controlled by the row star, not by New/Edit Item modals.

## Tags

Tags support:

- global tags,
- module-scoped tags,
- item assignments.

Item create/edit selects existing tags only. Tag creation is a separate flow.

## Journal

Journal entries may eventually store:

- entry type,
- module,
- title,
- body,
- timestamp,
- read/unread status,
- metadata.

Phase 1 journal is UI-only.

## Media Account

Media Account can later store:

- platform,
- handle,
- display name,
- profile URL,
- avatar reference,
- followed status,
- tags,
- notes.

## Album

Album can reference Image, Picture, and Illustration items without duplicating binary files.
