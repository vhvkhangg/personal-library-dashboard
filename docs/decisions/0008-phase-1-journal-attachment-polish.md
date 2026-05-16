# ADR 0008 — Phase 1 journal and attachment preview polish

## Status

Accepted

## Context

A final UI review found two small alignment/language issues after the notification and attachment preview updates:

- The Edit Item attachment modal still visually differed from the Create Item attachment modal.
- The header notification dialog should represent an activity journal rather than read/unread notifications.

## Decision

- Keep the Edit Item attachment modal header and attachment metadata left-aligned.
- Keep the attachment modal title as `Replace preview or attachment` in Edit Item.
- Rename the header notification dialog to `Nhật ký`.
- Remove the `Đã đọc` action because the dialog is an activity log, not an inbox.
- Make journal filter chips smaller and put counts inside compact badges.
- Use absolute date/time values for journal entries instead of relative timestamps.

## Consequences

The attachment flows stay visually consistent while the header dialog better matches the personal dashboard model: it records recent project activity instead of behaving like a notification inbox.
