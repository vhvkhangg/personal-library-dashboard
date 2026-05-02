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

System icon:

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

RAG Workspace uses three columns:

```txt
Left: Chats + Uploaded documents
Center: RAG settings + chat messages + composer
Right: Citation / Benchmark inspector
```

Current behavior is UI-only.

## Ideaverse UI

Ideaverse is now read-only in the web app. The web app previews Markdown-like content from an external vault but does not edit the vault.
