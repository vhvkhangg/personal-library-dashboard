# 0003 — Storage: Local Large Media + Google Drive-Capable Abstraction

## Status

Accepted

## Context

The user wants large movies/videos stored locally and images/music stored on Google Drive because the user has large student Drive storage. PostgreSQL should only store metadata/path.

## Decision

Implement storage through a provider abstraction. Use local filesystem for large video/movie files. Design for Google Drive provider for image/music storage. Store metadata in PostgreSQL.

## Alternatives Considered

1. Store binary files in PostgreSQL.
2. Store everything local.
3. Store everything in Google Drive.
4. Use S3/MinIO from day one.

PostgreSQL binary storage is rejected for large media. Everything-cloud is less practical for 1GB+ videos. S3/MinIO is useful later but not necessary for MVP.

## Consequences

Business modules do not care where files live. Future migration to S3-compatible storage remains possible. Google Drive integration needs OAuth and credential handling.

## Follow-ups

Implement local provider first. Add Google Drive provider after basic storage metadata and file viewer work.
