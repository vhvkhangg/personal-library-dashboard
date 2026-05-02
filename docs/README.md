# personal-library-dashboard Docs

This documentation set is the Phase 1 final version. It replaces the older incremental Phase 1 patch notes and keeps only durable project information.

## Read order

1. `architecture/00-overview.md`
2. `architecture/01-repository-layout.md`
3. `architecture/02-frontend-ui.md`
4. `architecture/03-modules.md`
5. `architecture/04-backend-modular-monolith.md`
6. `architecture/05-data-model.md`
7. `architecture/06-storage.md`
8. `architecture/07-auth-security.md`
9. `architecture/08-ideaverse-obsidian.md`
10. `architecture/09-rag-ocr.md`
11. `architecture/10-export.md`
12. `architecture/11-testing-verification.md`
13. `development/phase-1-final.md`
14. `development/phase-2-plan.md`
15. `development/local-commands.md`

## Folder policy

```txt
docs/
  README.md
  architecture/     Durable architecture docs.
  decisions/        Consolidated ADRs only.
  development/      Current phase summaries, local commands, and phase plans.
```

Older files such as `UI_PHASE1_*`, patch-specific notes, and one-off hotfix docs are intentionally consolidated into the current architecture docs and three ADRs.

## Current phase status

Phase 1 UI is accepted. The next implementation phase should be Phase 2 authentication, after this docs/services cleanup is applied and committed.
