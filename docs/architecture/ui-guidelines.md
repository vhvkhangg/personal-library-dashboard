# UI Guidelines

## Visual Direction

The UI should look like a modern light SaaS/admin dashboard with a media-library and knowledge-base feel.

Reference traits:

- light background
- subtle borders
- rounded cards
- table/list hybrid
- large readable rows
- pill badges
- strong toolbar
- search and filters near the top
- pagination
- column visibility control
- export button
- action menu with `...`

## App Shell

### Header

Header contains:

- global search / command palette
- NSFW toggle button using the letter `H`
- optional future actions

Global search should search across allowed modules based on current NSFW state.

### Sidebar

Use double sidebar:

1. Icon sidebar:
   - Dashboard
   - Fiction
   - Film
   - Media
   - F&B
   - Information
   - NSFW when unlocked/visible
   - Ideaverse
   - Documents/RAG
   - Settings
2. Menu sidebar:
   - module-specific navigation

### Main Content Pattern

Use this pattern for list pages:

```txt
Breadcrumb
Title
Subtitle
Primary action button

Filter tabs

Toolbar:
- Search input
- Category/type filters
- Columns button
- Export button

Table/List:
- selection checkbox
- icon/thumbnail/cover
- title + secondary text
- category/type
- tags
- rating
- status/progress
- created/updated
- actions

Footer:
- result count
- rows per page
- pagination
```

## Dashboard Cards

Global dashboard:

- 4 cards.

Category/module dashboard:

- 8 cards.
- 2 rows.
- 4 cards per row.

## List Row by Module

### Fiction Row

```txt
Cover/Icon | Title + author/description | Type | Tags/Genres | Rating | Status/Progress | Updated | Actions
```

### Film Row

```txt
Poster/Icon | Title + actor/description | Movie/Series | Tags | Rating | Watched progress | Updated | Actions
```

### Media Row

```txt
Thumbnail | Title + metadata | Type | Tags | Duration/Progress | Storage | Updated | Actions
```

### F&B Row

```txt
Icon/Image | Name + note | Food/Beverage | Tags | Rating | Tried? | Updated | Actions
```

### Ideaverse Row

```txt
Doc icon | Title + file path | Type | Tags | Status | Last synced | Updated | Actions
```

### Documents Row

```txt
File icon | Filename + parsed summary | Type | RAG status | Attached to | Updated | Actions
```

## States

Every page must support:

- loading state
- empty state
- error state
- no search results state
- permission/NSFW locked state if relevant

## Accessibility

Rules:

- all icon buttons must have accessible names
- keyboard navigation required for command palette
- do not use color alone for status
- maintain readable contrast
- table rows must be navigable/clickable without ambiguity
