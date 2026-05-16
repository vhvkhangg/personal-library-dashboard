# ADR 0005 — RAG Workspace Refinement

## Status
Accepted

## Context

The Phase 1 RAG Workspace needed one more UI refinement pass after the Profile/Account/Snack update. The previous layout was close, but the chat area still felt too small, the left rail mixed settings/documents without clear tabs, and the inspector toggle used too much text.

## Decision

Refine the RAG Workspace while keeping it UI-only.

## Changes

- Add a description under the `RAG Workspace` page title.
- Move RAG left-rail content into `Settings` and `Documents` tabs.
- Keep document upload and source selection in the `Documents` tab.
- Rename `Uploaded documents` to `Documents`.
- Add upload progress and status badges for documents.
- Move Mode selection to the chat card header.
- Add model selection and chat search to the chat card header.
- Remove the old `Local chat` title and subtitle.
- Remove the upload button from the chat composer.
- Add timestamps to user/assistant message bubbles.
- Make inline citation numbers clickable and open a document-highlight preview dialog.
- Keep the Citation/Benchmark inspector as a right rail within the chat card.
- Use icon-only inspector open/close controls.
- Remove page/line text from compact Citation cards.
- Add a four-segment green/green/yellow/red benchmark quality strip to every benchmark row.

## Consequences

The chat card is larger, document selection is clearer, and citation inspection has a more direct path from inline citation number to highlighted source text.
