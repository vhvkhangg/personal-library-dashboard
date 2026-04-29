# 0006 — Hybrid Relational + JSONB Data Model

## Status

Accepted

## Context

The app has many categories with shared fields and category-specific fields. The user wants clean, extensible code and expects requirements to evolve.

## Decision

Use relational columns for stable shared fields and JSONB metadata for sparse/evolving fields. Support both global tags and scoped/category tags.

## Alternatives Considered

1. Separate table for every category from day one.
2. Fully generic JSONB entity model.
3. Only global tags.
4. Only category-specific tags.

Separate tables for everything increases early migration cost. Fully generic JSONB weakens constraints and query clarity. Only one tag strategy is too restrictive.

## Consequences

The schema is flexible but still queryable. Some JSONB fields may later be promoted to columns. Tag scope must be designed carefully.

## Follow-ups

Finalize the first migration after choosing the exact MVP entities.
