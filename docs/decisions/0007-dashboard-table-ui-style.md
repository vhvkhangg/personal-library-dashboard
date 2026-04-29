# 0007 — Dashboard/List UI Style

## Status

Accepted

## Context

The user provided screenshots showing a clean dashboard list/table UI with filters, search, column controls, export, badges, row icons, and pagination.

## Decision

Use a clean light dashboard style with table/list hybrid rows. Every main module list page follows a consistent pattern: title, subtitle, filter tabs, toolbar, table/list, pagination.

## Alternatives Considered

1. Pure card grid everywhere.
2. Dense admin data table everywhere.
3. Obsidian-like text-first UI everywhere.

Pure card grids are weaker for management/export. Dense tables are less pleasant for media/library content. Obsidian-like UI is only ideal for Ideaverse.

## Consequences

The app gets consistent navigation and management UX. Image/media detail pages can still use gallery/player-specific layouts.

## Follow-ups

Implement layout shell first, then create reusable list page primitives.
