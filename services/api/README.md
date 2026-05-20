# API Service

Java 25 + Spring Boot 4 modular monolith.

## Current status

Phase 2.2 implements backend Auth minimum.

Implemented:

- Spring Boot application entry point.
- PostgreSQL datasource configuration.
- Flyway migration for auth tables.
- Seeded single-user bootstrap from environment/config.
- BCrypt password hashing.
- JWT access token service.
- Opaque refresh token service.
- Refresh-token SHA-256 hash persistence.
- Login / refresh / logout / me endpoints.
- Stateless Spring Security filter chain.
- JSON API response and error envelopes.

## Run

```powershell
mvn -f services\api\pom.xml test
mvn -f services\api\pom.xml spring-boot:run
```

## Auth endpoints

```txt
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

## Local default login

The committed defaults are local development placeholders only:

```txt
identifier: owner
password: change-me-local-dev
```

Set `PLD_AUTH_SEED_*` and `PLD_AUTH_JWT_SECRET` before non-local use.
