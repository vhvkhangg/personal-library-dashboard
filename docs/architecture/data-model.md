# Data Model

## Strategy

Use a hybrid model:

- relational columns for stable and frequently queried fields
- JSONB for sparse, unstable, or category-specific fields

This keeps the schema understandable while allowing categories to evolve.

## Common Item Fields

Most category items share:

```txt
id
module
item_type
title
original_title
url
rating
note
description
status
progress
is_nsfw
metadata jsonb
created_at
updated_at
```

Rating:

- range: 0.0 to 10.0
- one decimal place
- validate at API and UI level

## Candidate Base Tables

### `catalog_items`

Stores shared item fields.

Possible columns:

```txt
id uuid primary key
module text not null
item_type text not null
title text not null
original_title text
url text
rating numeric(3,1)
note text
description text
status text
progress text
is_nsfw boolean not null default false
metadata jsonb not null default '{}'
created_at timestamptz not null
updated_at timestamptz not null
```

Indexes to consider:

```txt
(module, item_type)
(is_nsfw)
(rating)
(updated_at)
GIN(metadata)
```

### `tags`

```txt
id uuid primary key
name text not null
slug text not null
scope text not null
created_at timestamptz not null
updated_at timestamptz not null
unique(scope, slug)
```

### `catalog_item_tags`

```txt
item_id uuid not null
tag_id uuid not null
primary key(item_id, tag_id)
```

### `creators`

For authors, actors, illustrators, musicians, and similar people/entities.

```txt
id uuid primary key
creator_type text not null
name text not null
note text
metadata jsonb not null default '{}'
created_at timestamptz not null
updated_at timestamptz not null
```

### `creator_platforms`

Author/creator platforms are displayed grouped in one column.

```txt
id uuid primary key
creator_id uuid not null
platform_name text not null
profile_url text
handle text
metadata jsonb not null default '{}'
```

### `item_relations`

Generic relationship table for early MVP.

```txt
id uuid primary key
source_item_id uuid not null
relation_type text not null
target_type text not null
target_id uuid not null
metadata jsonb not null default '{}'
```

Example relation types:

- author
- actor
- character
- illustrator
- musician
- source
- related

## Documents

### `documents`

```txt
id uuid primary key
title text
original_filename text
mime_type text
storage_provider text
storage_key text
size_bytes bigint
checksum text
parse_status text
rag_status text
metadata jsonb not null default '{}'
created_at timestamptz not null
updated_at timestamptz not null
```

### `document_attachments`

Allows a document to attach to any item.

```txt
id uuid primary key
document_id uuid not null
target_type text not null
target_id uuid not null
created_at timestamptz not null
```

## RAG

### `document_chunks`

```txt
id uuid primary key
document_id uuid not null
chunk_index int not null
content text not null
content_hash text
metadata jsonb not null default '{}'
created_at timestamptz not null
```

### `document_embeddings`

```txt
id uuid primary key
chunk_id uuid not null
embedding vector(...)
embedding_model text not null
embedding_dimension int not null
distance_metric text not null
created_at timestamptz not null
```

Dimension is intentionally not fixed in docs. It must match the chosen embedding model.

## JSONB Promotion Rule

Start in JSONB only when:

- the field is optional
- the field applies to a small number of item types
- the field may change frequently
- the field is not frequently filtered/sorted

Promote to a real column when:

- it becomes stable
- it is used in filtering/sorting often
- it needs constraints
- it needs relational integrity
