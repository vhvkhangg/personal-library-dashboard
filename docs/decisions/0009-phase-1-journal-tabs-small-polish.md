# 0009 — Phase 1 journal and RAG rail small polish

## Status
Accepted

## Context

The UI review requested final small corrections for the activity dialog, RAG Workspace rail tabs, and the Edit Item attachment preview modal.

## Changes

- Renamed notification-oriented frontend internals to journal-oriented naming.
- Changed the header activity button icon to the same journal/history icon used by the dialog.
- Kept the user-facing title as `Nhật ký`.
- Made journal filter chips and count badges smaller.
- Adjusted the RAG Workspace rail tabs so `Chats` is narrower and `Documents` has more horizontal room.
- Strengthened left alignment in the Edit Item attachment preview modal:
  - `Attachment preview` aligns with the modal title.
  - attachment metadata aligns with the attachment filename.

## Notes

This remains Phase 1 UI-only work. No backend journal/event persistence is implemented yet.
