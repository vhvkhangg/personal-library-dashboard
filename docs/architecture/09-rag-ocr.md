# Local RAG and OCR

## Status

Phase 1 has a UI-only RAG Workspace. Real RAG starts later.

## Service boundary

The Python RAG service owns:

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

The Spring API owns:

- auth/session state,
- metadata,
- tags,
- item relations,
- storage metadata,
- export orchestration,
- calling the Python service.

## Offline-first policy

Private documents must not be sent to external AI APIs by default.

## OCR plan

Primary:

- PaddleOCR

Fallback/light baseline:

- Tesseract with Vietnamese language data

Document parsing:

- Docling or equivalent

## Retrieval plan

Retrieval must not stop at vector search.

Use hybrid retrieval:

- sparse search from PostgreSQL full-text/BM25-style candidates,
- dense search from pgvector,
- fusion by reciprocal rank fusion or weighted merge,
- CrossEncoder reranking.

Default reranker candidate:

```txt
BAAI/bge-reranker-v2-m3
```

## Local model plan

Candidate answer models:

- Qwen3 8B quantized as the baseline.
- Qwen3 14B quantized on desktop if performance allows.
- Vietnamese-focused models such as Vistral variants only after evaluation.

## UI requirements

RAG answers should:

- show inline citation numbers,
- allow clicking inline citations to open a document-highlight preview,
- show cited sources in the right inspector,
- allow chunk/source expansion in the inspector,
- show compact source score metadata in the inspector,
- avoid page/line clutter in the compact citation cards unless a later detail view needs it,
- show benchmark metrics with a four-step green/green/yellow/red progress strip,
- prefer "không đủ dữ liệu" over hallucination.
