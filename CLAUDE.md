# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kangtent is an Agoda-style campsite booking platform targeting the Thai market. It has two workspaces:
- `backend/` — NestJS 11 + MongoDB REST API (port 3001)
- `frontend/` — Next.js 15 App Router (port 3000)

---

## Commands

### Backend

```bash
cd backend
npm run start:dev      # Watch mode (uses nodemon)
npm run build          # Compile TypeScript
npm run start:prod     # Run compiled output
npm run lint           # ESLint
npm run test           # Jest unit tests
npm run test:e2e       # E2E tests
npm run test -- --testPathPattern=auth  # Single test file
```

### Frontend

```bash
cd frontend
npm run dev            # Dev server
npm run build          # Production build
npm run lint           # ESLint
```

### Environment Setup

**Backend** — create `backend/.env`:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/kangtent
JWT_SECRET=your_secret_here
```

**Frontend** — create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Architecture

### Backend Module Structure

```
src/
  auth/           # JWT strategy, guards, local strategy
  users/          # User CRUD, password hashing
  campsites/      # Campsite + pitch management
  bookings/       # Booking creation, availability, cancellation
```

Each module follows NestJS conventions: `module.ts`, `controller.ts`, `service.ts`, `dto/`, `schemas/`.

**Global config:**
- `ValidationPipe` with `whitelist: true, transform: true`
- CORS enabled for `http://localhost:3000` only
- Swagger docs at `GET /api`

### Auth System

JWT tokens (7-day expiry) carry `{ sub: userId, email, role }`. Three roles: `guest`, `merchant`, `admin`.

**Guards:**
- `JwtAuthGuard` — requires valid token, throws 401 otherwise
- `OptionalJwtGuard` — validates token if present but never throws (used for anonymous-friendly endpoints)
- `RolesGuard` — checks role metadata set by `@Roles()` decorator

**Pattern for protected routes:**
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('merchant', 'admin')
```

**Extracting the current user:**
```typescript
@CurrentUser() user: { userId: string; email: string; role: string }
```

### Campsite Domain

A `Campsite` document represents a merchant's property and embeds their business profile (bankAccount, taxId, phone). Each campsite contains an array of `pitches` — variants by type (`tent | glamping | rv | cabin`) with individual pricing.

Authorization: merchants can only modify their own campsites (checked by `ownerId` match); admins bypass this.

### Booking & Double-Booking Prevention

The `PitchSlot` collection holds one document per `(pitchId, date)` with a unique compound index. When a booking is created:
1. Booking doc created with `status: 'pending'`
2. `insertMany()` attempted on PitchSlots for each night
3. If MongoDB throws duplicate key error (code 11000), booking is deleted → `ConflictException`
4. On success, booking updated to `status: 'confirmed'`

Anonymous bookings are allowed (`userId: null`); `OptionalJwtGuard` is used on `POST /bookings`.

**Total price calculation:**
```
nights = Math.round((checkOut - checkIn) / 86400000)
total = (nights × pitch.pricePerNight) + sum(addOns[].price)
```

### Frontend Structure

```
src/
  app/                       # App Router pages
    campsites/[id]/page.tsx  # Detail + booking sidebar
    booking/page.tsx         # Multi-step checkout form
    admin/page.tsx           # Admin dashboard
  components/
    common/                  # Nav, Footer, Scene (SVG backgrounds), Icons
    detail/                  # Gallery, SeasonalCalendar, BookingSidebar
    booking/                 # StepHeader, FormCard, Field
    admin/                   # AdminSidebar, views/*View
    ui/                      # shadcn/ui primitives (Radix-based)
  lib/api.ts                 # Fetch wrapper + domain API objects
  contexts/AuthContext.tsx   # Token storage, useAuth() hook
  types/index.ts             # Shared TypeScript types
```

### API Client (`lib/api.ts`)

Base URL: `process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'`

Reads token from `localStorage('kangtent_token')` and adds `Authorization: Bearer` header automatically. Throws `ApiError(status, message, body)` on non-2xx responses.

Three domain objects: `authApi`, `campsitesApi`, `bookingsApi`.

### Auth Context

`AuthContext` stores the JWT in both `localStorage` and `document.cookie` (SameSite=Lax). After login/register it calls `GET /users/me` to hydrate `firstName`/`lastName`. Access via `useAuth()`:

```typescript
const { user, token, loading, login, register, logout } = useAuth()
```

### Booking Flow (Frontend → Backend)

1. User selects pitch and dates on `/campsites/[id]` → BookingSidebar
2. Query params (`campsiteId`, `pitchId`, `checkIn`, `checkOut`, `guests`, `pricePerNight`, etc.) pushed to `/booking`
3. Multi-step form on `/booking/page.tsx` collects guest details + add-ons
4. `bookingsApi.create(dto)` posts to `POST /bookings`
5. Backend validates, checks availability via PitchSlot, returns booking

### Design System

CSS custom properties (HSL channels) defined in `globals.css`, referenced in `tailwind.config.ts`:

| Token | Purpose |
|---|---|
| `--ink` | Primary text (near-black) |
| `--paper` | Main background (warm white) |
| `--ember` / `--clay` | CTA orange accents |
| `--forest-*` | Dark greens (nav, headings) |
| `--sage-*` | Mid greens |
| `--cream-*` | Light warm fills |

**Typography:** Bai Jamjuree (loaded via `@font-face`, weights 200–700). Use `font-thai` for Thai content, `font-serif` for headings.

**`Scene` component** — reusable SVG landscape backgrounds, variants: `hero`, `dusk`, `forest`, `lake`, `meadow`, `cabin`, `night`.

**`cn()` utility** — `clsx` + `tailwind-merge` helper for conditional classes.

---

## Key Constraints

- No test suite exists in the frontend
- TypeORM is installed in the backend but unused — MongoDB/Mongoose is the only database layer
- The `example/` module in the backend is unused scaffolding and can be ignored
- Payment integration is absent; bookings go directly to `confirmed` after slot reservation succeeds
- Email notifications are not implemented
