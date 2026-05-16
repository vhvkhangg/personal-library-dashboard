# ADR 0007 — Phase 1 RAG and notification polish

## Status

Accepted

## Context

The continued Phase 1 UI review found small mismatches in the RAG Workspace, attachment preview modal, and notification dialog. These changes keep the UI in prototype scope and do not add backend behavior.

## Decision

- Keep the attachment preview modal title consistent between create and edit flows: `Upload preview or attachment`.
- Add a `New chat` action to the RAG left rail.
- Keep the Documents tab icon visible and sized consistently with the Settings/Chats controls.
- Restore a longer `Search this chat...` input inside the RAG chat toolbar.
- Use project-specific notification examples instead of commerce/order examples.
- Use stronger active/hover states for notification filter chips.
- Put each notification `View detail` action inside a bordered button-style frame.

## Consequences

The RAG Workspace and notification dialog better match the accepted personal-library dashboard domain language while keeping the current UI-only implementation.
