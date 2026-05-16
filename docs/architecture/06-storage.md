# Storage Architecture

## Rule

Do not store large binary media in PostgreSQL.

PostgreSQL stores metadata and storage references only.

## Providers

Planned providers:

- `LOCAL`
- `GOOGLE_DRIVE`
- `EXTERNAL_URL`
- `S3_COMPATIBLE` later if needed

## Media policy

Large movie/video files:

- Store on local filesystem.
- Store metadata/path/storage key in database.

Images/music:

- Google Drive is the preferred future cloud target.
- Route through a storage abstraction.

## Attachment UI

Phase 1 item modals show multi-attachment previews. Future storage model should support multiple attachments per item:

- preview/cover,
- source file,
- reference scan,
- supplemental metadata file.

## Album

Album references existing media items. It does not duplicate underlying binary files.
