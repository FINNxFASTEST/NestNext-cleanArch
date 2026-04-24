# Kangtent

Kangtent is a campsite booking platform with:

- `backend/`: NestJS + MongoDB API
- `frontend/`: Next.js web app

## Quick first run (Windows PowerShell)

You can run one setup script that prepares env files, installs dependencies, and seeds demo data:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\first-run.ps1
```

Options:

- Skip seed data:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\first-run.ps1 -SkipSeed
```

- Setup + start backend immediately:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\first-run.ps1; cd .\backend; npm run start:dev
```

- Setup + start frontend immediately (run in another terminal):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\first-run.ps1 -SkipSeed; cd .\frontend; npm run dev
```

## Prerequisites

Install these first:

- Node.js `>= 20`
- npm `>= 10`
- MongoDB (local instance on `mongodb://localhost:27017`)

## 1) Clone and open project

```bash
git clone <your-repo-url>
cd Kangtent-new
```

## 2) Configure environment variables

### Backend env

Create `backend/.env` from `backend/.env.example`.

Example:

```env
NODE_ENV=development
APP_PORT=3001
API_PREFIX=api
FRONTEND_DOMAIN=http://localhost:3000
BACKEND_DOMAIN=http://localhost:3001

DATABASE_URL=mongodb://localhost:27017/kangtent
DATABASE_NAME=kangtent

AUTH_JWT_SECRET=change_me_jwt_secret
AUTH_JWT_TOKEN_EXPIRES_IN=15m
AUTH_REFRESH_SECRET=change_me_refresh_secret
AUTH_REFRESH_TOKEN_EXPIRES_IN=3650d
```

### Frontend env

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 3) Install dependencies

Run in two terminals (or one-by-one):

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

## 4) Start MongoDB

Make sure MongoDB is running locally before starting the backend.

Quick check:

```bash
mongosh "mongodb://localhost:27017"
```

## 5) Run backend

```bash
cd backend
npm run start:dev
```

Backend URLs:

- API base: `http://localhost:3001/api/v1`
- Swagger docs: `http://localhost:3001/docs`

## 6) Seed demo data (optional but recommended)

In another terminal:

```bash
cd backend
npm run seed:run:document
```

Seeded demo accounts:

- `admin@example.com` / `secret`
- `host@example.com` / `secret`
- `customer@example.com` / `secret`

## 7) Run frontend

```bash
cd frontend
npm run dev
```

Open: `http://localhost:3000`

## 8) Verify app is working

1. Open `http://localhost:3000`
2. Try login with one seeded account
3. Check API docs at `http://localhost:3001/docs`
4. Confirm frontend can load campsites data from backend

## Code generation

Scaffold a new clean-architecture domain module from the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\new-resource.ps1 -Name Coupon
```

Or from inside `backend/`:

```bash
npm run generate:resource:document -- --name Coupon
```

This generates the full structure under `src/coupons/`:

```
application/use-cases/   ← 5 use cases (create, findAll, findById, update, remove)
domain/                  ← domain class
infrastructure/
  persistence/           ← schema, mapper, document-repository, repository port
  *-persistence.module.ts
presentation/
  dto/                   ← create, update, find-all, domain DTOs
  *.controller.ts
*.module.ts
```

After scaffolding:
1. Add fields to `domain/<name>.ts`
2. Add `@Prop()` fields to `infrastructure/persistence/<name>.schema.ts`
3. Map them in `infrastructure/persistence/<name>.mapper.ts`
4. Fill in the DTO classes in `presentation/dto/`
5. Implement use-case bodies in `application/use-cases/`

To add a field to an existing resource interactively:

```bash
cd backend
npm run add:property:to-document
```

## Useful commands

### Backend (`backend/`)

```bash
npm run start:dev
npm run build
npm run start:prod
npm run lint
npm run test
npm run seed:run:document
```

### Frontend (`frontend/`)

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Troubleshooting

- `ECONNREFUSED` from frontend:
  - Ensure backend is running on port `3001`
  - Confirm `frontend/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3001`
- MongoDB connection errors:
  - Ensure MongoDB is running
  - Check `DATABASE_URL` in `backend/.env`
- Port already in use:
  - Stop the process using `3000` or `3001`, or change the port in env files
