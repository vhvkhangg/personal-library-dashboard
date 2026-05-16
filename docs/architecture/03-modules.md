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

## Film

Routes:

- `/film`
- `/film/movie`
- `/film/series`
- `/film/actor`
- `/film/character`

Actor fields should use gender and nation/country-style context rather than generic role/type when needed.

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

`Album` is a first-class Media module. Albums can group Image, Picture, and Illustration items into one collection viewer.

`Account` stores followed social accounts/creators and has a viewer-style tab for profile details, links, and platform notes.

`Song` is not a visible module in the accepted navigation. Song-like content belongs under Music.

## F&B

Routes:

- `/fnb`
- `/fnb/food`
- `/fnb/snack`
- `/fnb/beverage`

F&B uses its own tag scope. F&B tags should not be conflated with Fiction tags. Snack is separate from Food so quick/light items can be tracked independently.

## Information

Routes:

- `/information`
- `/information/health`
- `/information/technology`
- `/information/miscellaneous`

Information tables do not need Avatar columns by default.

## NSFW

Routes:

- `/nsfw`
- `/nsfw/comic`
- `/nsfw/image`
- `/nsfw/video`
- `/nsfw/character`
- `/nsfw/author`

NSFW visibility must eventually be enforced by backend filters, not frontend hiding only.

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

Ideaverse content is read-only in the web app. The external Obsidian vault remains the writing and editing source of truth.

## RAG/Documents

Route:

- `/documents`

The UI presents chats, uploaded documents, retrieval settings, citations, and benchmark information. Backend/RAG behavior starts in a later phase.

## Profile

Route:

- `/profile`

Profile stores personal workspace information about the single owner. It is a system module shown above Settings.

## Settings

Route:

- `/settings`

Settings are UI-only in Phase 1. RAG-specific settings belong in the RAG Workspace, not global Settings.
