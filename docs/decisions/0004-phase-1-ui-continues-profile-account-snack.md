# ADR 0004 — Continue Phase 1 for Profile, Account, Snack, Viewer Tabs, and RAG Layout

## Status
Accepted

## Context

The UI looked close to complete, but further review identified missing product areas and layout changes: Profile, Media Account, F&B Snack, separate viewer/player/reader tabs, a revised RAG Workspace, and a denser dashboard chart layout.

## Decision

Keep Phase 1 open and implement these UI changes before moving to Phase 2 Authentication.

## Changes

- Add Profile as a system module above Settings.
- Add Account as a Media submodule for followed social accounts.
- Add Snack as an F&B submodule.
- Move Player/Reader/Viewer surfaces into a second tab beside Overview on modules that need media/reader surfaces.
- Put RAG Settings in the left RAG rail with Chats and Uploaded Documents.
- Move Citation/Benchmark into the main chat workspace as a collapsible inspector panel.
- Limit dashboard chart rows to two charts per row and make area charts larger with date-aware samples.
- Tested then removed the liquid-glass surface treatment because it introduced layout/readability issues.

## Consequences

Phase 1 remains a UI-polish phase. Root `AGENTS.md` and `README.md` should not be finalized again until the user confirms Phase 1 is truly complete.
