# Developer Guide

This guide covers local development workflow for the NestJS + Next.js boilerplate.

> **Note:** `docker compose up` runs everything in **production mode** (`NODE_ENV=production`, compiled output, no hot-reload). For active development, run the services locally instead.

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 20 |
| MongoDB | 7 (local or via Docker) |
| Redis | 7 (optional — can be disabled) |

---

## Option A — Local dev (recommended for coding)

This gives you hot-reload on both backend and frontend.

### 1. Start infrastructure only via Docker

Run only MongoDB and Redis via Docker, then run the app locally:

```bash
docker compose up mongo redis
```

Or install MongoDB/Redis natively if you prefer.

### 2. Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
NODE_ENV=development
APP_PORT=3001
DATABASE_URL=mongodb://localhost:27017/kangtent
AUTH_JWT_SECRET=dev-secret-change-me
AUTH_REFRESH_SECRET=dev-refresh-secret-change-me
AUTH_JWT_TOKEN_EXPIRES_IN=15m
AUTH_REFRESH_TOKEN_EXPIRES_IN=3650d
FRONTEND_DOMAIN=http://localhost:3000
REDIS_ENABLED=false          # set true if redis is running
REDIS_URL=redis://localhost:6379
```

```bash
npm install
npm run start:dev    # watch mode — auto-reloads on file changes
```

Backend runs at **http://localhost:3001**
Swagger UI at **http://localhost:3001/docs**

### 3. Frontend

```bash
cd frontend
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
npm install
npm run dev          # watch mode — port 3000
```

Frontend runs at **http://localhost:3000**

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

---

## Option B — Docker with dev overrides

If you need everything containerized but still want hot-reload, create a `docker-compose.dev.yml` override:

```yaml
# docker-compose.dev.yml
services:
  backend:
    build:
      target: development          # requires a multi-stage Dockerfile
    environment:
      NODE_ENV: development
    volumes:
      - ./backend/src:/app/src     # mount source for hot-reload
    command: npm run start:dev

  frontend:
    environment:
      NODE_ENV: development
    volumes:
      - ./frontend/src:/app/src
    command: npm run dev
```

Run with:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

> The Dockerfiles in this boilerplate build a production image by default. The dev override above requires adding a `development` stage to each Dockerfile if you go this route.

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
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/           # Pages: home, login, register
│   │   └── components/    # common/ + ui/ (shadcn)
│   └── Dockerfile
├── docker-compose.yml     # Production-mode compose
├── README.md              # Quick-start for end users
├── README.dev.md          # This file
└── ARCHITECTURE.md        # Clean architecture deep-dive
```

---

## Adding a new feature module

### Scaffold

```bash
cd backend
npm run generate:resource:document -- --name YourResource
```

This generates the full clean-architecture structure:

```
src/your-resource/
  domain/your-resource.ts                         # Pure TS domain class
  application/use-cases/                          # One class per operation
  presentation/your-resource.controller.ts        # Thin controller
  presentation/dto/                               # Request/response DTOs
  infrastructure/persistence/                     # Schema, mapper, repository
  your-resource.module.ts
```

### Steps after scaffolding

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

## Backend commands

```bash
npm run start:dev               # Watch mode (dev)
npm run start:debug             # Watch + Node debugger (port 9229)
npm run build                   # Compile TS → dist/
npm run start:prod              # Run compiled output
npm run lint                    # ESLint
npm run test                    # Jest unit tests
npm run test:watch              # Watch mode tests
npm run test:cov                # Coverage report
npm run seed:run:document       # Seed demo accounts
npm run generate:resource:document -- --name Foo   # Scaffold module
npm run add:property:to-document                   # Add field interactively
```

## Frontend commands

```bash
npm run dev          # Dev server (port 3000)
npm run build        # Production build
npm run start        # Serve production build
npm run lint
npm run typecheck
```

---

## Auth API reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/email/register` | Create account |
| `POST` | `/api/v1/auth/email/login` | Login |
| `GET` | `/api/v1/auth/me` | Current user (Bearer token required) |
| `POST` | `/api/v1/auth/refresh` | Rotate refresh token |
| `POST` | `/api/v1/auth/logout` | Delete session |

Full interactive docs: **http://localhost:3001/docs**

---

## Environment variables reference

### `backend/.env`

| Variable | Default | Notes |
|---|---|---|
| `NODE_ENV` | `development` | Use `production` for prod builds |
| `APP_PORT` | `3001` | |
| `DATABASE_URL` | `mongodb://localhost:27017/kangtent` | |
| `AUTH_JWT_SECRET` | — | Change before any deployment |
| `AUTH_REFRESH_SECRET` | — | Change before any deployment |
| `AUTH_JWT_TOKEN_EXPIRES_IN` | `15m` | |
| `AUTH_REFRESH_TOKEN_EXPIRES_IN` | `3650d` | |
| `FRONTEND_DOMAIN` | `http://localhost:3000` | Used for CORS |
| `REDIS_ENABLED` | `false` | Set `true` to use Redis for sessions |
| `REDIS_URL` | `redis://localhost:6379` | |

### `frontend/.env.local`

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` |

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Backend won't start — `Cannot find module` | Run `npm install` in `backend/` |
| Frontend shows network error | Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local` matches the backend port |
| MongoDB connection refused | Start MongoDB: `docker compose up mongo` or install locally |
| JWT errors after restart | `AUTH_JWT_SECRET` must stay the same between restarts; changing it invalidates all tokens |
| Port already in use | Kill the process on 3000/3001, or change `APP_PORT` in `backend/.env` |
| Seeder fails | Wait for backend to be fully started before running seed |
| Redis errors | Set `REDIS_ENABLED=false` in `.env` to fall back to MongoDB sessions |
