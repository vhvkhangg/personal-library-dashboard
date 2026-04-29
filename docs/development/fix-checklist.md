# Docs Fix Checklist

After applying the docs fixes, run these checks from the repository root in PowerShell.

## Check line breaks

```powershell
Get-Content .gitignore | Select-Object -First 20
Get-Content AGENTS.md | Select-Object -First 20
Get-Content docs\architecture\obsidian-sync.md | Select-Object -First 40
```

Files should show multiple readable lines, not one giant line.

## Check RAG keywords

```powershell
Select-String -Path "AGENTS.md" -Pattern "PaddleOCR|bge-reranker-v2-m3|CrossEncoder|hybrid retrieval|Docling"
Select-String -Path "docs\architecture\rag-local.md" -Pattern "PaddleOCR|Hybrid Retrieval|CrossEncoder|bge-reranker-v2-m3|BGE-M3"
Select-String -Path "docs\decisions\0005-local-rag-ocr-llm.md" -Pattern "PaddleOCR|CrossEncoder|bge-reranker-v2-m3|Qwen3|Vistral"
```

## Check no mojibake remains in Obsidian sync docs

```powershell
Select-String -Path "docs\architecture\obsidian-sync.md" -Pattern "C⌠ng|NhΓn|YΩu|╨|Ω|φ|π|â"
```

This command should return no matches.
