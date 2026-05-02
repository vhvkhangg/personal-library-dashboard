# Backend Modular Monolith

## Status

Phase 1 contains only a backend package map. No business logic should be implemented yet.

## Stack target

- Java 25.
- Spring Boot 4.0.6.
- Maven.
- PostgreSQL + pgvector.
- REST-first API.
- Modular monolith.

## Base package

```txt
com.vhvkhangg.personallibrarydashboard
```

## Module package map

```txt
common/
auth/
dashboard/
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

Most business modules should eventually use:

```txt
module/
  domain/
  application/
  infrastructure/
  web/
```

## Rules

- Controllers stay thin.
- Do not expose JPA entities as API responses.
- Use DTOs for requests/responses.
- Cross-module access goes through application services, ports, or events.
- Do not directly access another module's repository.
- Prefer constructor injection.
- Do not use field injection.
- Add database migrations for schema changes.
- Do not add real implementation classes during Phase 1 final cleanup.

## API response shape

Success:

```json
{
  "data": {},
  "meta": {}
}
```

Error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request.",
    "details": []
  }
}
```
