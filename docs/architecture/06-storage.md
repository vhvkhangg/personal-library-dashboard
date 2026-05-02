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
- Still route through a storage abstraction so providers can change later.

## Storage metadata

Store:

- provider,
- storage key/path,
- original filename,
- MIME type,
- size bytes,
- checksum/hash when practical,
- width/height for image/video,
- duration for audio/video,
- created/updated timestamps.

## Path policy

Never hardcode private absolute paths in committed source. Use environment variables:

```txt
MEDIA_LOCAL_ROOT=D:/PersonalLibrary/media
OBSIDIAN_VAULT_PATH=C:/Users/VU KHANG/OneDrive/IDEAVERSE
```

## Album

Album is a Media module entity that can group Image, Picture, and Illustration items. Album does not duplicate binary files; it references existing media items.
