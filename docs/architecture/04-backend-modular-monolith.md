# Backend Modular Monolith

## Status

Phase 1 backend is a package-map skeleton only.

No business classes, controllers, entities, repositories, services, or runtime application class should be added in Phase 1 cleanup.

## Stack target

- Java 25.
- Spring Boot 4.
- Maven.
- PostgreSQL + pgvector.
- REST-first API.
- Modular monolith.

## Base package

```txt
com.vhvkhangg.personallibrarydashboard
```

## Package map

```txt
common/
auth/
dashboard/
journal/
profile/
tags/
storage/
catalog/
fiction/
film/
media/
fnb/
information/
nsfw/
ideaverse/
documents/
rag/
export/
settings/
```

Every business module may later contain:

```txt
module/
  domain/
  application/
  infrastructure/
  web/
```

## UI-to-backend module sync

Current UI additions reflected in backend skeleton:

- `profile/`
- `journal/`
- `media/account/`
- `media/album/`
- `fnb/snack/`

## Rules

- Controllers stay thin.
- Do not expose JPA entities as API responses.
- Use DTOs.
- Cross-module access goes through application services, ports, or events.
- Do not directly access another module repository.
- Prefer constructor injection.
- Add migrations for schema changes in implementation phases.
