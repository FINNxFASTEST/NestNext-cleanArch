# NestJS + Next.js Boilerplate

A production-ready full-stack starter with:

- **Backend** — NestJS 11, MongoDB + Mongoose, JWT auth (access + refresh tokens), clean architecture with use-case classes
- **Frontend** — Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Infra** — Docker Compose (MongoDB + Redis + backend + frontend in one command)

---

## Start with Docker (recommended)

> **Requires:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
# 1. Clone
git clone <repo-url>
cd <repo>

# 2. Start everything
docker compose up --build
```

That's it. All four services start automatically.

| Service  | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001/api/v1 |
| Swagger docs | http://localhost:3001/docs |

**Seed demo accounts** (first time only — wait until backend is healthy):

```bash
docker compose exec backend node \
  -e "require('child_process').execSync('npm run seed:run:document', {stdio:'inherit'})"
```

**Stop:** `docker compose down`  
**Wipe data volumes too:** `docker compose down -v`

> Change the placeholder JWT secrets in `docker-compose.yml` before any production use.

---

## Start without Docker

### Prerequisites

- Node.js ≥ 20
- MongoDB running on `localhost:27017`
- Redis is optional — set `REDIS_ENABLED=false` to skip it

### 1. Configure environment

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` — at minimum set real values for `AUTH_JWT_SECRET` and `AUTH_REFRESH_SECRET`.

Create `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Start the backend

```bash
cd backend
npm run start:dev   # watch mode, port 3001
```

### 4. Seed demo accounts (optional)

```bash
cd backend
npm run seed:run:document
```

### 5. Start the frontend

```bash
cd frontend
npm run dev         # port 3000
```

Open http://localhost:3000 and sign in with a seeded account.

---

## Demo accounts

| Email | Password | Role |
|---|---|---|
| `admin@example.com` | `secret` | admin |
| `host@example.com` | `secret` | host |
| `customer@example.com` | `secret` | customer |

---

## Project layout

```
.
├── backend/          # NestJS 11 API
│   └── src/
│       ├── auth/     # Login, register, JWT, session rotation
│       ├── users/    # User accounts + roles
│       ├── session/  # Refresh-token sessions (MongoDB or Redis)
│       └── ...
├── frontend/         # Next.js 15 App Router
│   └── src/
│       ├── app/      # Pages: home, login, register
│       └── components/
├── docker-compose.yml
├── CLAUDE.md         # AI assistant guidance + full architecture reference
└── ARCHITECTURE.md   # Clean architecture guide + step-by-step for adding features
```

---

## Add your first feature

### Scaffold a new module

```bash
cd backend
npm run generate:resource:document -- --name Post
```

This generates the full clean-architecture structure under `src/posts/`:

```
domain/post.ts
infrastructure/persistence/   (schema, mapper, repository port, document adapter)
application/use-cases/        (create, findAll, findById, update, remove)
presentation/                 (controller, DTOs)
posts.module.ts
```

After scaffolding:

1. Define your fields in `domain/post.ts`
2. Add `@Prop()` fields to `infrastructure/persistence/post.schema.ts`
3. Map them in `infrastructure/persistence/post.mapper.ts`
4. Fill in DTOs in `presentation/dto/`
5. Implement use-case bodies in `application/use-cases/`
6. Register `PostsModule` in `src/app.module.ts`

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full guide and a worked example.

### Add a field to an existing resource

```bash
cd backend
npm run add:property:to-document
```

---

## Key commands

### Backend

```bash
npm run start:dev          # Watch mode
npm run build              # Compile TS → dist/
npm run start:prod         # Run compiled output
npm run lint
npm run test               # Jest unit tests
npm run test:cov           # Coverage report
npm run seed:run:document  # Seed demo accounts
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Frontend shows network error | Confirm backend is on port 3001. Check `frontend/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3001` |
| MongoDB connection refused | Start MongoDB locally or use `docker compose up mongo` |
| Port already in use | Kill the process on 3000/3001, or change `APP_PORT` in `backend/.env` |
| JWT errors after restart | Secrets in `.env` must stay consistent between restarts; changing them invalidates all tokens |
