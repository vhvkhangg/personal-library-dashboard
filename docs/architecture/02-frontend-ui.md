# Frontend UI Architecture

## Stack

- Next.js 16 App Router.
- TypeScript.
- Tailwind-style utility classes.
- shadcn/ui-inspired primitives.
- Dark mode is the currently polished primary theme.
- Light mode is supported and should remain usable.

## Layout shell

The accepted shell contains:

```txt
Icon Sidebar | Module Sidebar | Header + Main Content
```

### Icon sidebar

Primary icons:

1. Dashboard
2. Fiction
3. Film
4. Media
5. F&B
6. Information
7. NSFW
8. Ideaverse
9. RAG/Documents

System icons:

- Profile
- Settings

A separator exists between NSFW and Ideaverse, and another before Settings.

### Module sidebar

Each module owns its secondary menu. Ideaverse uses a `Core` dropdown for its detailed sections.

### Header

Header contains:

- module label/title,
- global `Search everything...` command entry,
- theme toggle,
- protected-zone `H` button,
- user/logo controls when applicable.

## Command palette

The command palette is currently UI-only.

Navigate group:

- Open Dashboard
- Open RAG Workspace
- Open Ideaverse
- Open Settings

Create group:

- New Item
- New Tag

## Module table pattern

Every editable content module uses this table shell unless documented otherwise:

```txt
Module title
Subtitle/description
Status tabs
Tags panel + New Tag
Search / type filter / tag filter / from date / to date / reset / filter
Columns button
Export button
Favorites table
Items table
Pagination
```

Row columns:

- Fav
- #
- Avatar, except Information modules
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

## Detail modal

Detail modal contains:

- header with `View details`, item title, favorite star, and Tags box,
- Summary block,
- Description,
- Note,
- Facts panel.

Summary includes status. Facts no longer contains status/favorite.

## Edit modal

Edit modal contains:

- title,
- type,
- category/context,
- rating,
- visibility,
- description,
- summary,
- notes,
- existing-tag selector,
- attachment preview/replace placeholder.

Status is edited from the table column, not from Edit Item. Favorite is controlled by the star, not Edit Item.

## Media previews

Media modules include UI-only viewer/player previews:

- Movie/Series watch preview.
- Video preview.
- Music player preview.
- Image/Picture/Illustration viewer.
- Album viewer for mixed Image/Picture/Illustration collections.
- Book/Novel/Manga/Manhua/Manhwa/Convert/NSFW viewer previews where relevant.

## RAG Workspace UI

RAG Workspace uses a left rail and a main chat card:

```txt
Header: RAG Workspace title + description
Left rail: Settings/Documents segmented controls, chat list, retrieval settings, document selection
Main card: model selector, mode selector, chat search, messages, composer
Right inspector: collapsible Citation/Benchmark rail inside the chat card
```

Current behavior is UI-only.

Accepted RAG Workspace details:

- The left rail sits close to the icon sidebar and stays narrower than the chat area.
- The left rail has `Settings` and `Documents` tabs.
- Documents no longer uses the `Uploaded documents` label.
- Documents show upload progress, per-document status badges, and selected-source checkboxes.
- The chat header contains model selection, mode selection, and chat search.
- The chat composer has no upload button; document upload belongs in the Documents tab.
- Question and answer bubbles show timestamps.
- Inline citation numbers are clickable and open a document-highlight preview dialog.
- The inspector has icon-only open/close control and no `Show/Hide inspector` text.
- Citation cards omit page/line text in the compact inspector view.
- Benchmark cards include a four-segment quality strip: two green segments, one yellow segment, and one red segment.

## Ideaverse UI

Ideaverse is now read-only in the web app. The web app previews Markdown-like content from an external vault but does not edit the vault.

## Dashboard chart layout

Dashboard chart rows should contain at most two charts. Top Tags should share a row with status breakdown. Column and line charts share one row. Area and donut charts share one row, with the area chart given a larger internal SVG height and date-aware hover labels.

## Liquid-glass surface treatment

Phase 1 uses a dark-first liquid-glass treatment for sidebars, header, cards, tables, charts, and modal surfaces. Use this as a surface treatment only; do not reduce readability or keyboard accessibility.
