# Module Map

## Backend Modules

Suggested Spring package modules:

```txt
common
auth
dashboard
tags
storage
catalog
fiction
film
media
fnb
information
nsfw
ideaverse
documents
rag
export
```

## Common

Shared infrastructure:

- errors
- validation
- pagination
- time
- security helpers
- IDs
- common DTOs

Common must not contain business logic that belongs to a specific module.

## Auth

Responsibilities:

- login
- JWT creation/validation
- refresh token rotation
- logout
- current user endpoint
- NSFW unlock session or PIN verification

## Tags

Responsibilities:

- global tags
- scoped/category tags
- tag assignment
- tag filtering
- tag search

Tag scopes:

```txt
global
fiction
film
media
fnb
information
nsfw
ideaverse
```

## Storage

Responsibilities:

- local file storage
- Google Drive-capable storage provider
- storage metadata
- file checksums
- public/private access decisions
- storage provider abstraction

## Catalog

Common item model and reusable item-list behavior.

Responsibilities:

- shared fields
- search/filter/sort/pagination primitives
- rating validation
- item relation primitives

## Fiction

Submodules:

- dashboard
- convert
- manga
- manhua
- manhwa
- novel
- book
- character
- author

Stable fields may become columns. Experimental fields go into JSONB metadata.

## Film

Submodules:

- dashboard
- movie
- series
- actor
- character

Film needs progress tracking such as watched position, episode, or season.

## Media

Submodules:

- dashboard
- image
- picture
- illustration
- illustrator
- video
- music
- song
- musician

Media integrates heavily with Storage.

## F&B

Submodules:

- dashboard
- food
- beverage

F&B should support whether the user has eaten/drunk the item before.

## Information

Submodules:

- dashboard
- health
- technology
- other domains
- miscellaneous

Information items may attach documents and participate in RAG.

## NSFW

Submodules:

- dashboard
- comic
- image
- video
- character
- author

Rules:

- backend filtering required
- search filtering required
- sidebar hiding required
- optional PIN/password unlock required
- do not leak NSFW data when NSFW mode is off

## Ideaverse

Responsibilities:

- browse vault-indexed notes
- edit Markdown
- preview Markdown
- parse frontmatter
- manual sync
- expose Ideaverse entities through dashboard/list views

## Documents

Responsibilities:

- uploaded/imported documents
- parsed document metadata
- attach documents to any item
- track RAG ingestion status

## RAG

Spring-side module for RAG orchestration.

Responsibilities:

- call Python RAG service
- track ingestion jobs
- expose query endpoint
- store retrieval/debug metadata

## Export

Responsibilities:

- CSV export
- Excel export
- filtered list export
- category/module export
- multi-sheet Excel export
