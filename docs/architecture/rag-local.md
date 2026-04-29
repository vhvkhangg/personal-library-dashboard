# Local RAG/OCR Architecture

## Goal

Answer questions over the user's local documents and notes with strong Vietnamese support while keeping private data offline.

## Service Boundary

The Python RAG service handles:

- parsing
- OCR
- table extraction
- normalization
- chunking
- embedding
- vector indexing
- retrieval
- reranking
- local LLM answer generation

The Spring API handles:

- auth
- document metadata
- user-facing APIs
- ingestion job orchestration
- result persistence
- access filtering
- NSFW filtering

## Supported Inputs

Required:

- PDF
- DOCX
- TXT
- Markdown
- CSV
- Excel

Expected later:

- image OCR
- scanned PDF OCR
- comic/image set OCR if useful

## Local LLM Recommendation

Default model for desktop:

```txt
Qwen3 8B quantized
```

Reason:

- good multilingual baseline
- should be more realistic on 8GB VRAM + 16GB RAM than larger models
- enough for local RAG answering and Vietnamese Q&A trials

Quality mode on desktop:

```txt
Qwen3 14B quantized
```

Use only if latency and memory are acceptable.

Vietnamese-focused comparison model:

```txt
Vistral-7B-Chat
```

Use as a comparison/evaluation candidate, not automatically as the only model.

Laptop mode:

- do not expect fast local LLM on CPU-only laptop
- laptop should call the desktop-hosted local RAG service through browser/API

## Embedding Recommendation

Start with:

```txt
BAAI/bge-m3
```

or a Vietnamese BGE-M3 fine-tune after evaluation.

Track in database:

- embedding model
- embedding dimension
- distance metric
- model version
- chunking strategy version

Do not mix embeddings from different models without versioning.

## OCR Recommendation

Start with local OCR.

Candidate stack:

- Tesseract with Vietnamese language data for simple OCR
- Docling for document parsing, tables, reading order, and PDF-to-structured-content flows

Evaluate on a small Vietnamese document set before calling it accurate.

## Pipeline

```txt
Document discovered/uploaded
  ↓
Metadata record created
  ↓
Parse text and structure
  ↓
OCR if required
  ↓
Normalize text
  ↓
Extract tables
  ↓
Chunk with heading/page metadata
  ↓
Embed chunks
  ↓
Store vectors in pgvector
  ↓
Retrieve by query
  ↓
Optional rerank
  ↓
Generate answer with local LLM
  ↓
Return answer + source chunks
```

## Answer Rules

RAG must prefer correctness over confidence.

Answer behavior:

- cite source chunks in UI
- say when there is not enough evidence
- show retrieved snippets when debugging
- avoid inventing facts
- support Vietnamese queries
- answer in Vietnamese by default when user asks in Vietnamese

## Evaluation

Create a small local evaluation set:

```txt
question
expected source document
expected answer summary
required cited chunk
```

Use it when changing:

- OCR backend
- embedding model
- chunk size
- reranker
- answer model
