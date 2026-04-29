# 0005 — Offline Local RAG/OCR/LLM

## Status

Accepted

## Context

The user wants local/offline RAG with Vietnamese support, OCR, and parsing for PDF/DOCX/TXT/Markdown/CSV/Excel. The user does not want private documents sent to external AI APIs by default.

## Decision

Use a Python local RAG/OCR service.

Default OCR/parsing stack:

- Docling or equivalent tooling for document layout, tables, and structured parsing.
- PaddleOCR as the primary OCR engine for scanned PDFs/images.
- Tesseract Vietnamese as fallback/light baseline OCR.
- VietOCR or PaddleOCR + VietOCR hybrid as an optional Vietnamese OCR experiment.

Default retrieval stack:

- BGE-M3 for dense embeddings.
- PostgreSQL full-text search for sparse retrieval.
- pgvector for dense retrieval.
- Candidate fusion before reranking.
- CrossEncoder reranking before answer generation.
- BAAI/bge-reranker-v2-m3 as the default reranker candidate.

Default local LLM strategy:

- Qwen3 8B quantized as the default local answer model candidate.
- Qwen3 14B quantized as desktop quality mode if performance is acceptable.
- Vistral-7B-Chat as a Vietnamese-focused comparison model.

Do not assume any model is permanently best. Build a small Vietnamese evaluation set and compare OCR quality, retrieval quality, reranking quality, and final answer quality.

## Alternatives Considered

1. Use OpenAI/Claude/Gemini APIs.
2. Use only keyword search.
3. Use a separate vector database.
4. Use laptop-local LLM.

External APIs conflict with offline privacy. Keyword-only search is not enough for RAG. pgvector is sufficient before introducing another database. Laptop-only LLM is likely too slow.

## Consequences

The desktop hosts local inference. Quality will be lower than top cloud models, so evaluation is required. RAG must show sources and avoid hallucinating.

## Follow-ups

Create a small Vietnamese RAG evaluation set. Benchmark Qwen3 8B vs Qwen3 14B vs Vistral on user-like documents.
