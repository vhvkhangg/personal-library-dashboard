# ADR 0006 — Phase 1 UI polish: RAG, notifications, and surface rollback

## Status
Accepted

## Context

Further Phase 1 review found issues in the liquid-glass surface treatment, RAG Workspace layout, New Item attachments, dashboard chart tooltips, and missing header notifications.

## Decision

Continue Phase 1 UI polish and apply focused changes only.

## Changes

- Remove the `liquid-surface` styling experiment from sidebars, header, cards, tables, charts, and modals.
- Fix the command palette lint issue by resetting query state through explicit close handlers instead of a synchronous `setState` in an effect.
- Add a header notification bell with a notification dialog preview.
- Remove static `Hover points` pills from chart cards and use hover tooltips on actual chart points/bars.
- Update New Item modal to remove Visibility and Mark as favorite controls.
- Add a New Item attachment preview/upload dialog sample with multiple attachments.
- Keep RAG settings in a left-rail Settings dialog.
- Keep RAG rail tabs as Chats/Documents.
- Keep document upload in the Documents tab and remove upload from the chat composer.
- Label the RAG model and mode selectors and reduce the chat-search input width.
- Change benchmark strips to threshold blocks where unreached thresholds remain muted.

## Consequences

The UI returns to a more stable dark-first surface system while retaining the accepted Phase 1 layout direction.
