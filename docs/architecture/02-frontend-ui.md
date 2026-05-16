# Frontend UI Architecture

## Stack

- Next.js 16 App Router.
- TypeScript.
- Tailwind-style utility classes.
- shadcn/ui-inspired primitives.
- Dark-first accepted visual style.
- Light mode supported.

## Accepted visual policy

- Keep the current dark dashboard style.
- Do not reintroduce the removed `liquid-surface` / liquid-glass effect.
- Use clear cards, borders, hover states, badges, dropdowns, and modal overlays.
- Modal overlays must cover the full viewport.

## Layout shell

```txt
Icon Sidebar | Module Sidebar | Header | Main Content
```

### Icon sidebar

Top-level modules:

1. Dashboard
2. Fiction
3. Film
4. Media
5. F&B
6. Information
7. NSFW
8. Ideaverse
9. RAG/Documents
10. Profile
11. Settings

Profile sits above Settings.

### Header

Header contains:

- global `Search everything...`,
- theme toggle,
- protected `H` button,
- `Nhật ký` journal button.

### Journal

The header activity dialog is called `Nhật ký`, not Notification.

Code naming should use:

- `JournalDialog`
- `journalOpen`
- `journalEntries`

Journal entries can be read or unread. Unread entries use a distinct background/border and unread dot.

Sample journal entry types:

- new item added,
- Ideaverse index refreshed,
- RAG question answered.

## Command palette

The command palette is UI-only in Phase 1.

It includes:

- Navigate actions,
- Create actions,
- sample result previews when text is typed.

## Module table pattern

Content modules use:

- status tabs,
- Tags panel,
- New Tag button,
- search/type/tag/date filters,
- reset/filter buttons,
- Columns preview,
- Export preview,
- Favorites table,
- Items table.

Row columns:

- Fav
- #
- Avatar where applicable
- Item title + short description
- Type/progress/module-specific field
- Tags
- Context/category/module-specific field
- Updated
- Status dropdown
- Rating
- Actions

Actions:

- View details
- Edit item
- Delete with confirmation

## New/Edit Item

New/Edit Item modals:

- do not include Visibility,
- do not include Mark as favorite,
- support multi-attachment preview,
- align attachment title and metadata left,
- let Favorite be controlled by row star,
- let Status be controlled by row status dropdown.

## Detail modal

Detail modal contains:

- header with View details label, item title, favorite star, and Tags box,
- Summary,
- Description,
- Note,
- Facts.

Summary includes status. Facts should not duplicate status/favorite.

## Viewer/Player/Reader tabs

Modules with consumption surfaces use tabs inside the module:

- `Overview`
- `Player` for music/video/movie/series style content
- `Reader` for fiction/book/comic/manga style content
- `Viewer` for image/picture/illustration/album/account preview surfaces

The media/player/viewer area appears in the second tab. Details for the selected item are below the viewer/player/reader, not in a right-side box.

## RAG Workspace

RAG Workspace contains:

- left rail with `Settings`, `Chats`, and `Documents` controls,
- `Settings` opens a dialog,
- Documents shows upload progress, document status badges, and selectable sources,
- chat header with Model, Mode, and search,
- answer citations as clickable numbers,
- citation click opens a source-highlight preview dialog,
- right inspector panel with Citation/Benchmark tabs,
- inspector can be collapsed through an icon-only control,
- Benchmark uses 4 threshold blocks where reached thresholds are green/yellow/red and unreached thresholds are muted.

## Ideaverse

Ideaverse is read-only on the web app. Editing remains in Obsidian.
