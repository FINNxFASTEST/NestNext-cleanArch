# Handoff for another AI

Copy everything below the line into a new chat (or attach this file). **Update** the lists before sending so the next session has accurate context.

---

## Project

Kangtent — NestJS 11 + MongoDB backend (`backend/`), Next.js 15 frontend (`frontend/`). See `CLAUDE.md` for architecture, commands, and conventions.

## Done in the last session

- [ ] *(nothing recorded for the session that created this file — fill in bullet points here.)*

## In progress / partial

- [ ] *(work started but not merged or not verified — describe file areas, branch name, PR link.)*

## Not done yet (backlog for next AI)

- [ ] *(concrete next steps: tests to add, env vars to document, bugs to fix, etc.)*

## Notes / constraints

- *(Optional: decisions, blockers, “do not change X”, API quirks.)*

## Quick pointers (from recent context — verify before relying on)

- Backend loads `redisConfig` in `app.module.ts`; session layer includes `SessionCacheService` (Redis optional, falls back to MongoDB if Redis is disabled or connection fails).
- If continuing Redis/session work: check `backend/.env.example` for `REDIS_*` / session TTL variables and wire any missing docs or tests.

---

*How to use: after each working session, replace the checkboxes with real items, delete empty sections, and commit or paste into the next conversation.*
