# NestJS + Next.js Boilerplate

A full-stack developer boilerplate with clean architecture — clone it, extend it, ship it.

- **Backend** — NestJS 11, MongoDB + Mongoose, JWT auth (access + refresh tokens), clean architecture
- **Frontend** — Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Infra** — Docker Compose for MongoDB + Redis (dev) and full-stack (prod)

---

## Using this as a starting point for your own project

### Option A — GitHub Template (recommended)

Click **"Use this template"** on GitHub. This creates a fresh repo under your account with no connection to this one.

### Option B — Clone then detach

```bash
git clone https://github.com/FINNxFASTEST/boilerplate my-project
cd my-project

# Remove the connection to this repo
git remote remove origin

# Point to your own repo
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Option C — degit (no git history at all)

```bash
npx degit FINNxFASTEST/boilerplate my-project
cd my-project
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 20 |
| Docker | any recent version |

---

## Local development

### 1. Start infrastructure

```bash
docker compose up -d
```

Starts MongoDB on `localhost:27017` and Redis on `localhost:6379`.

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev    # watch mode — port 3001
```

Key `.env` values:

```env
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/your_app_db
AUTH_JWT_SECRET=dev-secret-change-me
AUTH_REFRESH_SECRET=dev-refresh-secret-change-me
REDIS_ENABLED=false   # set true if you want Redis sessions
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

## Production (Docker)

```bash
docker compose -f docker-compose.prod.yml up --build
```

> Change `AUTH_JWT_SECRET` and `AUTH_REFRESH_SECRET` in `docker-compose.prod.yml` before deploying.

**Seed accounts** (first run only):

```bash
docker compose -f docker-compose.prod.yml exec backend node \
  -e "require('child_process').execSync('npm run seed:run:document', {stdio:'inherit'})"
```

**Stop:** `docker compose -f docker-compose.prod.yml down`
**Wipe data:** `docker compose -f docker-compose.prod.yml down -v`

---

## Adding a feature module

### Scaffold

```bash
cd backend
npm run generate:resource:document -- --name YourResource
```

Generates the full structure under `src/your-resource/`:

```
domain/your-resource.ts
application/use-cases/
presentation/your-resource.controller.ts
presentation/dto/
infrastructure/persistence/
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
├── frontend/
├── docker-compose.yml        # Dev — infra only (MongoDB + Redis)
├── docker-compose.prod.yml   # Prod — full stack
└── ARCHITECTURE.md           # Clean architecture deep-dive
```

### Backend — `backend/src/`

```
backend/src/
├── main.ts                        # Bootstrap (versioning, pipes, swagger, cors)
├── app.module.ts                  # Root module
│
├── auth/                          # JWT register / login / refresh / logout
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth-providers.enum.ts
│   ├── application/
│   │   ├── helpers/
│   │   │   └── generate-tokens.helper.ts
│   │   └── use-cases/
│   │       ├── get-me.use-case.ts
│   │       ├── login.use-case.ts
│   │       ├── logout.use-case.ts
│   │       ├── refresh-token.use-case.ts
│   │       ├── register.use-case.ts
│   │       ├── soft-delete-user.use-case.ts
│   │       └── update-me.use-case.ts
│   ├── config/
│   │   ├── auth.config.ts
│   │   └── auth-config.type.ts
│   ├── dto/
│   │   ├── auth-email-login.dto.ts
│   │   ├── auth-register-login.dto.ts
│   │   ├── auth-update.dto.ts
│   │   ├── login-response.dto.ts
│   │   └── refresh-response.dto.ts
│   ├── guards/
│   │   └── optional-jwt.guard.ts
│   └── strategies/
│       ├── anonymous.strategy.ts
│       ├── jwt.strategy.ts
│       ├── jwt-refresh.strategy.ts
│       └── types/
│           ├── jwt-payload.type.ts
│           └── jwt-refresh-payload.type.ts
│
├── users/                         # User domain module
│   ├── users.module.ts
│   ├── domain/
│   │   └── user.ts                # Pure domain class
│   ├── application/
│   │   └── use-cases/
│   │       ├── create-user.use-case.ts
│   │       ├── find-user-by-email.use-case.ts
│   │       ├── find-user-by-id.use-case.ts
│   │       ├── find-users-by-ids.use-case.ts
│   │       ├── find-users.use-case.ts
│   │       ├── update-user.use-case.ts
│   │       └── remove-user.use-case.ts
│   ├── presentation/
│   │   ├── users.controller.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       ├── update-user.dto.ts
│   │       ├── query-user.dto.ts
│   │       └── user.dto.ts
│   └── infrastructure/
│       ├── users-persistence.module.ts
│       └── persistence/
│           ├── user.repository.ts      # Abstract port
│           ├── user.mapper.ts
│           ├── user.schema.ts
│           ├── user.document-repository.ts
│           └── document/
│               ├── document-persistence.module.ts
│               ├── entities/user.schema.ts
│               ├── mappers/user.mapper.ts
│               └── repositories/user.repository.ts
│
├── session/                       # Refresh-token sessions (MongoDB or Redis)
│   ├── session.module.ts
│   ├── domain/
│   │   └── session.ts
│   ├── application/
│   │   └── use-cases/
│   │       ├── create-session.use-case.ts
│   │       ├── find-session-by-id.use-case.ts
│   │       ├── update-session.use-case.ts
│   │       ├── update-session-by-hash.use-case.ts
│   │       ├── delete-session-by-id.use-case.ts
│   │       ├── delete-sessions-by-user-id.use-case.ts
│   │       └── delete-sessions-by-user-id-excluding.use-case.ts
│   └── infrastructure/
│       ├── session-persistence.module.ts
│       ├── cache/
│       │   └── session-cache.service.ts   # Redis path
│       └── persistence/
│           ├── session.repository.ts      # Abstract port
│           ├── session.mapper.ts
│           ├── session.schema.ts
│           ├── session.document-repository.ts
│           └── document/
│               ├── document-persistence.module.ts
│               ├── entities/session.schema.ts
│               ├── mappers/session.mapper.ts
│               └── repositories/session.repository.ts
│
├── roles/                         # RoleEnum (admin=1, host=2, customer=3)
│   ├── roles.enum.ts
│   ├── roles.guard.ts
│   ├── roles.decorator.ts
│   ├── domain/role.ts
│   ├── dto/role.dto.ts
│   └── infrastructure/persistence/
│       ├── role.schema.ts
│       └── document/entities/role.schema.ts
│
├── statuses/                      # Account status enum (active / inactive)
│   ├── statuses.enum.ts
│   ├── domain/status.ts
│   ├── dto/status.dto.ts
│   └── infrastructure/persistence/
│       ├── status.schema.ts
│       └── document/entities/status.schema.ts
│
├── database/                      # Mongoose config + seeds
│   ├── mongoose-config.service.ts
│   ├── config/
│   │   ├── database.config.ts
│   │   └── database-config.type.ts
│   └── seeds/document/
│       ├── run-seed.ts
│       ├── seed.module.ts
│       └── user/
│           ├── user-seed.module.ts
│           └── user-seed.service.ts
│
├── redis/                         # Optional Redis client
│   └── config/
│       ├── redis.config.ts
│       └── redis-config.type.ts
│
├── config/                        # App-level config schemas
│   ├── app.config.ts
│   ├── app-config.type.ts
│   └── config.type.ts
│
└── utils/                         # Shared helpers
    ├── validation-options.ts       # Global ValidationPipe (HTTP 422)
    ├── serializer.interceptor.ts   # ResolvePromisesInterceptor
    ├── infinity-pagination.ts      # { data, hasNextPage }
    ├── document-entity-helper.ts   # _id → id transform
    ├── deep-resolver.ts
    ├── validate-config.ts
    ├── dto/
    │   └── infinity-pagination-response.dto.ts
    ├── transformers/
    │   └── lower-case.transformer.ts
    └── types/
        ├── deep-partial.type.ts
        ├── maybe.type.ts
        ├── nullable.type.ts
        ├── or-never.type.ts
        └── pagination-options.ts
```

### Frontend — `frontend/src/`

```
frontend/src/
├── middleware.ts                  # Next.js edge middleware (auth guards)
│
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                 # Root layout (fonts, providers)
│   ├── globals.css                # CSS variables + Tailwind base
│   ├── page.tsx                   # Landing page  /
│   ├── login/
│   │   └── page.tsx               # Login page  /login
│   └── register/
│       └── page.tsx               # Register page  /register
│
├── components/
│   ├── common/                    # App-level reusable components
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── StatusPill.tsx
│   │   └── Icons.tsx
│   └── ui/                        # shadcn/ui primitives (edit sparingly)
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
│
├── contexts/
│   └── AuthContext.tsx             # Auth state (user, token, login/logout)
│
├── services/                      # API layer — add new service files here
│   ├── index.ts
│   ├── auth.service.ts            # register / login / me / logout
│   └── http-client.ts             # Axios wrapper (attaches Bearer token)
│
├── lib/
│   ├── api.ts                     # Base URL config (NEXT_PUBLIC_API_URL)
│   ├── utils.ts                   # cn() and other helpers
│   └── icon-registry.ts
│
└── types/
    └── index.ts                   # Shared TypeScript types
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
| MongoDB connection refused | Run `docker compose up` |
| JWT errors after restart | `AUTH_JWT_SECRET` must stay the same between restarts |
| Port already in use | Change `APP_PORT` in `backend/.env` |
| Redis errors | Set `REDIS_ENABLED=false` to fall back to MongoDB sessions |
