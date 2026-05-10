# AI Handoff

## Current state (2026-05-10)

The backend architecture was refactored to fix two pain points:

1. **Repository ports were in the wrong layer** — they lived under `infrastructure/persistence/` but are actually application-layer contracts. Moved to `application/ports/`.
2. **No transaction support** — repository methods had no way to receive a `ClientSession`. Fixed by adding `RepositoryOptions = { session?: ClientSession }` as an optional last argument on all mutating methods, plus a `withTransaction()` helper.

### What changed

| Before | After |
|---|---|
| `application/use-cases/*.use-case.ts` | `application/commands/*.command.ts` (writes) |
| | `application/queries/*.query.ts` (reads) |
| `infrastructure/persistence/<resource>.repository.ts` | `application/ports/<resource>.repository.ts` |
| No transaction support | `RepositoryOptions` + `withTransaction()` |

Affected modules: `auth`, `users`, `session`.

### Pending work

- Generator (`npm run generate:resource:document`) still scaffolds `application/use-cases/` — it should be updated to scaffold `commands/` + `queries/` + `ports/` instead.
- Docs updated: `ARCHITECTURE.md`, `README.md`, `CLAUDE.md`.
- Changes are unstaged — commit when ready.

## How to pick this up

```bash
git status   # verify the unstaged changes
npm run build  # should compile cleanly
```
