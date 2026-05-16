# Local RAG and OCR

## Status

Phase 1 has a UI-only RAG Workspace.

## Accepted RAG Workspace UI

- Header with title and description.
- Left rail contains Settings, Chats, Documents.
- Settings opens a dialog.
- Documents includes upload progress, status badges, and source selection.
- Chat header includes Model, Mode, and Search this chat.
- Composer has send button only; upload is handled in Documents.
- Answer citation numbers are clickable.
- Citation click opens source-highlight preview.
- Right inspector panel contains Citation and Benchmark tabs.
- Inspector can collapse/expand with icon-only control.
- Citation cards omit Page/Lines in compact view.
- Benchmark rows use 4 threshold blocks:
  - reached safe thresholds are green,
  - warning threshold is yellow,
  - bad threshold is red,
  - unreached thresholds are muted.

## Service boundary

Python RAG service owns:

- file discovery,
- parsing,
- OCR,
- normalization,
- chunking,
- embeddings,
- indexing,
- sparse retrieval,
- dense retrieval,
- hybrid fusion,
- CrossEncoder reranking,
- answer generation,
- citation metadata.

Spring API owns:

- auth/session state,
- metadata,
- tags,
- item relations,
- storage metadata,
- export orchestration,
- calls to the Python service.

## Offline-first policy

Private documents must not be sent to external AI APIs by default.
