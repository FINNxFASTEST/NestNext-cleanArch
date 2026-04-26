# NestJS + Next.js Boilerplate

A full-stack developer boilerplate with clean architecture — clone it, extend it, ship it.

- **Backend** — NestJS 11, MongoDB + Mongoose, JWT auth (access + refresh tokens), clean architecture
- **Frontend** — Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Infra** — Docker Compose for MongoDB + Redis (dev infrastructure only)

> **Docker note:** `docker compose up --build` runs the app in **production mode** (compiled, no hot-reload). For development, use the local setup below.

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 20 |
| MongoDB | 7 (via Docker or local) |
| Redis | 7 (optional — can be disabled) |

---

## Setup

### 1. Start infrastructure

Spin up only MongoDB and Redis via Docker:

```bash
docker compose up mongo redis
```

Or run MongoDB/Redis locally if you prefer.

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev    # watch mode — port 3001
```

Minimum `.env` values to set:

```env
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/kangtent
AUTH_JWT_SECRET=dev-secret-change-me
AUTH_REFRESH_SECRET=dev-refresh-secret-change-me
REDIS_ENABLED=false
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev          # port 3000
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Seed demo accounts

```bash
cd backend
npm run seed:run:document
```

| Email | Password | Role |
|---|---|---|
| `admin@example.com` | `secret` | admin |
| `host@example.com` | `secret` | host |
| `customer@example.com` | `secret` | customer |

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001/api/v1 |
| Swagger docs | http://localhost:3001/docs |

---

## Adding a feature module

### Scaffold

```bash
cd backend
npm run generate:resource:document -- --name YourResource
```

Generates the full structure under `src/your-resource/`:

```
domain/your-resource.ts              # Pure TS domain class
application/use-cases/               # One class per operation
presentation/your-resource.controller.ts
presentation/dto/
infrastructure/persistence/          # Schema, mapper, repository
your-resource.module.ts
```

After scaffolding:

1. Define fields in `domain/your-resource.ts`
2. Add `@Prop()` fields to the schema class
3. Map fields in `mapper.ts` (`toDomain` / `toPersistence`)
4. Fill in DTOs (`create-*.dto.ts`, `update-*.dto.ts`)
5. Implement use-case bodies
6. Register `YourResourceModule` in `src/app.module.ts`

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full walkthrough.

### Add a field to an existing module

```bash
cd backend
npm run add:property:to-document
```

---

## Project structure

```
.
├── backend/
│   ├── src/
│   │   ├── auth/          # JWT login/register/refresh/logout
│   │   ├── users/         # User accounts + roles
│   │   ├── session/       # Refresh-token sessions (MongoDB or Redis)
│   │   ├── roles/         # RoleEnum + RolesGuard + @Roles()
│   │   ├── redis/         # Optional Redis client
│   │   ├── database/      # Mongoose config + seeds
│   │   ├── config/        # App/auth/DB config schemas
│   │   └── utils/         # Shared helpers
│   └── .env.example
├── frontend/
│   └── src/
│       ├── app/           # Pages: home, login, register
│       └── components/    # common/ + ui/ (shadcn)
├── docker-compose.yml
├── ARCHITECTURE.md        # Clean architecture deep-dive + worked example
└── CLAUDE.md              # AI assistant guidance
```

---

## Commands

### Backend

```bash
npm run start:dev                              # Watch mode
npm run start:debug                            # Watch + debugger (port 9229)
npm run build                                  # Compile TS → dist/
npm run start:prod                             # Run compiled output
npm run lint
npm run test                                   # Jest unit tests
npm run test:cov                               # Coverage report
npm run seed:run:document                      # Seed demo accounts
npm run generate:resource:document -- --name Foo
npm run add:property:to-document
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

---

## Auth API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/email/register` | Create account |
| `POST` | `/api/v1/auth/email/login` | Login |
| `GET` | `/api/v1/auth/me` | Current user (Bearer token) |
| `POST` | `/api/v1/auth/refresh` | Rotate refresh token |
| `POST` | `/api/v1/auth/logout` | Delete session |

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Backend won't start — `Cannot find module` | Run `npm install` in `backend/` |
| Frontend shows network error | Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local` |
| MongoDB connection refused | Run `docker compose up mongo` |
| JWT errors after restart | `AUTH_JWT_SECRET` must stay the same between restarts |
| Port already in use | Change `APP_PORT` in `backend/.env` |
| Redis errors | Set `REDIS_ENABLED=false` to fall back to MongoDB sessions |
