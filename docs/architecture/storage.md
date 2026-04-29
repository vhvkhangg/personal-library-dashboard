# Storage Architecture

## Goal

Support local large media files and Google Drive-backed image/music storage without coupling business code to one storage implementation.

## Rule

PostgreSQL stores metadata only.

Binary files are stored outside PostgreSQL.

## Providers

Initial provider enum:

```txt
LOCAL
GOOGLE_DRIVE
EXTERNAL_URL
S3_COMPATIBLE
```

`S3_COMPATIBLE` is reserved for future MinIO, Cloudflare R2, Backblaze B2, or S3-style systems.

## Local Storage

Used for:

- movies
- large videos
- large comic archives if needed
- files larger than practical cloud sync limits

Config:

```txt
MEDIA_LOCAL_ROOT=D:/PersonalLibrary/media
```

Do not hardcode this path in code.

## Google Drive Storage

Preferred for:

- images
- music
- smaller documents if desired

Implementation should be behind the same `StorageProvider` port.

Required metadata:

```txt
provider
storage_key
display_name
mime_type
size_bytes
checksum
created_at
updated_at
```

Google Drive-specific metadata may live in JSONB:

```json
{
  "driveFileId": "...",
  "driveFolderId": "...",
  "webViewLink": "...",
  "thumbnailLink": "..."
}
```

## Storage Service Port

Conceptual interface:

```txt
put(file, metadata) -> StoredObject
get(storageRef) -> stream
delete(storageRef)
exists(storageRef) -> boolean
createSignedOrTemporaryAccess(storageRef) -> access info
```

Do not let application modules know whether a file is local or cloud-backed.

## Security

- Do not expose local filesystem paths directly unless explicitly needed.
- Do not commit Google credentials.
- Store OAuth secrets in environment variables or local secret files outside git.
- NSFW files must respect NSFW access rules regardless of storage provider.

## Backup

Minimum backup set:

- PostgreSQL dump
- local media folder
- Obsidian vault
- Google Drive content is already cloud-hosted but metadata must still be backed up
