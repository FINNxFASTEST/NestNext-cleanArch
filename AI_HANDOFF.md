# AI Handoff

## Current state (2026-05-10)

Architecture refactor complete. Generator updated to match.

### Architecture

| Before | After |
|---|---|
| `application/use-cases/*.use-case.ts` | `application/commands/*.command.ts` (writes) |
| | `application/queries/*.query.ts` (reads) |
| `infrastructure/persistence/<resource>.repository.ts` | `application/ports/<resource>.repository.ts` |
| No transaction support | `RepositoryOptions` + `withTransaction()` |

Affected modules: `auth`, `users`, `session`.

### Generator (`npm run generate:resource:document`)

Now scaffolds the correct structure:
- `application/commands/` — create, update, remove
- `application/queries/` — get-by-id, get-all
- `application/ports/<name>.repository.ts` — abstract port
- `infrastructure/persistence/<name>.document-repository.ts` — Mongoose impl with `RepositoryOptions`
- `infrastructure/<names>-persistence.module.ts` — provides port, imports from correct layer

### Pending work

None. Everything committed and generator updated.

## How to pick this up

```bash
git status
npm run build  # should compile cleanly
```
