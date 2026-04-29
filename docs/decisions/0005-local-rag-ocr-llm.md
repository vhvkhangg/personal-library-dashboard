# 0005 — Offline Local RAG/OCR/LLM

## Status

Accepted

## Context

The user wants local/offline RAG with Vietnamese support, OCR, and parsing for PDF/DOCX/TXT/Markdown/CSV/Excel. The user does not want private documents sent to external AI APIs by default.

## Decision

Use a Python local RAG/OCR service. Start with Qwen3 8B quantized as the default local LLM candidate, Qwen3 14B quantized as desktop quality mode if acceptable, and Vistral-7B-Chat as a Vietnamese-focused comparison model. Start embeddings with BGE-M3 or a Vietnamese BGE-M3 fine-tune after evaluation.

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
