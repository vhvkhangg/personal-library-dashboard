# Module Map

## Top-level modules

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

## Fiction

Routes:

- `/fiction`
- `/fiction/convert`
- `/fiction/manga`
- `/fiction/manhua`
- `/fiction/manhwa`
- `/fiction/novel`
- `/fiction/book`
- `/fiction/character`
- `/fiction/author`

Reader tab applies to reader-style submodules.

## Film

Routes:

- `/film`
- `/film/movie`
- `/film/series`
- `/film/actor`
- `/film/character`

Movie/Series use Player tab.

## Media

Routes:

- `/media`
- `/media/album`
- `/media/account`
- `/media/image`
- `/media/picture`
- `/media/illustration`
- `/media/illustrator`
- `/media/video`
- `/media/music`
- `/media/musician`

Notes:

- Album is first-class.
- Album can contain Image, Picture, and Illustration.
- Account stores social/media accounts of creators the user follows.
- Account has Viewer-style preview.
- Song is not a visible module; song-like content belongs under Music.

## F&B

Routes:

- `/fnb`
- `/fnb/food`
- `/fnb/beverage`
- `/fnb/snack`

F&B has its own tag scope and should not reuse Fiction tags unless intentionally global.

## Information

Routes:

- `/information`
- `/information/health`
- `/information/technology`
- `/information/miscellaneous`

Information tables do not need Avatar by default.

## NSFW

Routes:

- `/nsfw`
- `/nsfw/comic`
- `/nsfw/image`
- `/nsfw/video`
- `/nsfw/character`
- `/nsfw/author`

NSFW must eventually be filtered by backend API, not frontend-only hiding.

## Ideaverse

Routes:

- `/ideaverse`
- `/ideaverse/core`
- `/ideaverse/plot`
- `/ideaverse/worldview`
- `/ideaverse/main-characters`
- `/ideaverse/territory`
- `/ideaverse/pets`
- `/ideaverse/equipment`
- `/ideaverse/cultivation-arts`
- `/ideaverse/realms`
- `/ideaverse/skills`
- `/ideaverse/constitution`
- `/ideaverse/items`
- `/ideaverse/villains`
- `/ideaverse/templates`

Ideaverse is read-only in the web app.

## RAG/Documents

Route:

- `/documents`

RAG Workspace is UI-only in Phase 1.

## Profile

Route:

- `/profile`

Profile stores personal workspace/profile information about the owner.

## Settings

Route:

- `/settings`

Settings are general app settings. RAG-specific controls live in RAG Workspace.
