# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Heads up:** the old single-tenant design is archived in [CLAUDE.legacy.md](CLAUDE.legacy.md).
> The project was rebuilt on [brocoders/nestjs-boilerplate](https://github.com/brocoders/nestjs-boilerplate)
> (MongoDB + Mongoose only) and now follows a hexagonal, multi-tenant model.

## Project overview

Kangtent is a campsite booking platform for the Thai market, organized like Agoda:
- Many independent **hosts** (businesses) manage their own campsites.
- **Customers** browse and book — logged in or anonymously.
- **Platform admins** oversee every tenant.

Workspaces:
- `backend/` — NestJS 11 + Mongoose (port 3001), JWT sessions, hexagonal layout.
- `frontend/` — Next.js 15 App Router (port 3000).

---

## Commands

### Backend
```bash
cd backend
npm run start:dev                     # Watch mode (alias: npm run dev)
npm run build                         # Compile TS → dist/
npm run start:prod                    # Run dist/
npm run lint
npm run test                          # Jest unit tests
npm run test:watch                    # Jest in watch mode
npm run test:cov                      # Coverage report
npm run test:e2e
npm run seed:run:document             # Seed admin/host/customer + demo org + campsite
npm run generate:resource:document -- --name Foo    # CLI scaffold
npm run add:property:to-document                    # Add fields to an existing resource
```

Run a single test file:
```bash
cd backend && npx jest src/bookings/bookings.service.spec.ts
```

### Frontend
```bash
cd frontend
npm run dev
npm run build
npm run lint
```

### Environment

`backend/.env` (see [backend/.env.example](backend/.env.example)):
```
APP_PORT=3001
DATABASE_URL=mongodb://localhost:27017/kangtent
AUTH_JWT_SECRET=change-me
AUTH_REFRESH_SECRET=change-me-too
AUTH_JWT_TOKEN_EXPIRES_IN=15m
AUTH_REFRESH_TOKEN_EXPIRES_IN=3650d
FRONTEND_DOMAIN=http://localhost:3000
```

`frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Backend architecture

### Hexagonal folders

Every domain module follows this layout (scaffolded by `npm run generate:resource:document`):

```
src/<resource>/
  domain/<resource>.ts              # Pure domain class, what services speak
  dto/                              # HTTP payloads + validators
  infrastructure/persistence/
    <resource>.repository.ts        # Port (abstract class)
    document/
      document-persistence.module.ts
      entities/<resource>.schema.ts # Mongoose schema
      mappers/<resource>.mapper.ts  # schema ↔ domain
      repositories/<resource>.repository.ts # Adapter
  <resource>.controller.ts
  <resource>.module.ts
  <resource>.service.ts
```

Services depend on the **port** (`CampsiteRepository`), never the document adapter.

### Modules

| Module | Purpose |
|---|---|
| `auth` | Email login/register, JWT access + refresh, sessions |
| `users` | Account owner (email, password hash, role reference) |
| `roles` | Numeric `RoleEnum` + `RolesGuard` + `@Roles()` |
| `statuses` | Account status (`active`, `inactive`) |
| `session` | Refresh-token rotation |
| `organizations` | Tenant root — a host's business (`status: pending|approved|suspended`) |
| `memberships` | `User ↔ Organization` with `owner | manager | staff` |
| `campsites` | Host-owned listings with embedded pitches |
| `bookings` | Customer-facing reservations (auth optional) |
| `pitch-slots` | Double-booking prevention store |
| `common` | `OrganizationScopeGuard`, `@ScopedOrg()` decorator |

### Roles & tenancy

```
User.role   →  admin (1) | host (2) | customer (3)       # numeric RoleEnum
User.memberships[] → Organization with owner|manager|staff  # via Membership
Campsite.organizationId → Organization                    # tenant key
Booking.organizationId  → denormalised from Campsite at create time
```

- **admin** — platform staff; `RolesGuard` + `OrganizationScopeGuard` both let them through.
- **host** — can manage only the organizations they belong to. Must pass `organizationId` to scoped routes.
- **customer** — books, can only read their own bookings, never reaches admin routes.
- Anonymous callers — allowed on `POST /bookings` (via `OptionalJwtGuard`) and the public `GET /campsites[/:id]`.

### `OrganizationScopeGuard` + `@ScopedOrg`

Declared in [src/common/guards/organization-scope.guard.ts](backend/src/common/guards/organization-scope.guard.ts) and [src/common/decorators/scoped-org.decorator.ts](backend/src/common/decorators/scoped-org.decorator.ts).

Pattern:
```ts
@UseGuards(AuthGuard('jwt'), RolesGuard, OrganizationScopeGuard)
@Roles(RoleEnum.admin, RoleEnum.host)
@ScopedOrg({ body: 'organizationId' })          // or { param: 'id' }, { query: 'organizationId' }
```

The guard:
1. Reads `organizationId` from the configured request location.
2. If user is `admin`, sets `req.scopedOrganizationId` and lets it through.
3. Otherwise loads `Membership({ userId, organizationId })` — 403 if absent.
4. Optionally enforces `requireMemberRole: ['owner', 'manager']`.
5. Attaches `req.scopedOrganizationId` and `req.scopedMemberRole` for downstream services.

### Auth flow

- `POST /api/v1/auth/email/register` — creates a user with `role = customer` + `status = active`, returns `{ token, refreshToken, tokenExpires, user }`.
- `POST /api/v1/auth/email/login` — same shape.
- `GET /api/v1/auth/me` — returns the current user domain object (role is `{ id }`).
- `POST /api/v1/auth/refresh` — rotate refresh token + session hash.
- `POST /api/v1/auth/logout` — deletes session.

JWT payload: `{ id, role: { id }, sessionId, iat, exp }`. The frontend decodes this to gate `/admin/*` in middleware.

### Bookings & atomic slot reservation

Implemented in [src/bookings/bookings.service.ts](backend/src/bookings/bookings.service.ts):

1. Validate campsite + pitch + guest count.
2. Compute `nights` (UTC-day iterator) and `totalPrice = nights × pricePerNight + Σ addOns.price`.
3. Create booking `status = 'pending'`.
4. `PitchSlotsService.reserve([...one per night])` → Mongo `insertMany({ ordered: true })`.
   The schema has `{ pitchId: 1, date: 1 }` **unique** index.
5. On duplicate key (`11000`): delete booking + slots, throw `ConflictException('pitch_already_booked')`.
6. Otherwise update booking to `status = 'confirmed'` and return it.

Cancellation (`PATCH /bookings/:id/cancel`) is allowed for the booking's owner, an admin, or any member of the booking's organization. It releases all `PitchSlot` rows for that booking.

### Global app setup (main.ts)

- URI versioning enabled — all routes are `/api/v1/...`
- **Global `ValidationPipe`** — whitelist + transform; on error returns HTTP 422 with nested error object (not array). Config lives in [src/utils/validation-options.ts](backend/src/utils/validation-options.ts).
- **Global interceptors** (in order):
  1. `ResolvePromisesInterceptor` — recursively awaits nested promises in responses.
  2. `ClassSerializerInterceptor` — applies `@Expose` / `@Exclude` from `class-transformer`.
- No custom global exception filters — NestJS defaults only.
- Swagger served at `GET /docs`.
- CORS enabled globally.

### Config system (src/config/)

Three config schemas, each validated by `class-validator` at startup:

| File | Key | What it provides |
|---|---|---|
| `app.config.ts` | `app` | `port`, `apiPrefix`, `frontendDomain`, `fallbackLanguage` |
| `auth.config.ts` | `auth` | `secret`, `expires`, `refreshSecret`, `refreshExpires` |
| `database.config.ts` | `database` | `DATABASE_URL` **or** individual host/port/user/pass |

Access via `configService.get('auth.secret', { infer: true })`. All three are unified into `AllConfigType` for typed injection.

### Domain model shapes

**Campsite** — key embedded types:
- `location: { province, district, lat, lng }` (embedded)
- `pitches: Pitch[]` — each pitch: `{ id (UUID), type ('tent'|'glamping'|'rv'|'cabin'), name, maxGuests, pricePerNight, size? }`
- `images: string[]`, `amenities: string[]`
- `status: 'active' | 'inactive'`

**Booking** — key fields:
- `userId?: string | null` (null for anonymous)
- `guestName`, `guestEmail`, `guestPhone?`
- `checkIn`, `checkOut: Date`, `guests: number`
- `addOns: { name: string, price: number }[]`
- `totalPrice: number`
- `status: 'pending' | 'confirmed' | 'cancelled'`

### Mapper pattern

All mappers are **static-method only**, no DI:
```ts
class CampsiteMapper {
  static toDomain(raw: CampsiteSchemaClass): Campsite { ... }
  static toPersistence(domain: Campsite): CampsiteSchemaClass { ... }
}
```
- `_id.toString()` → `id` (string) in every `toDomain`.
- Nullish coalescing: `?? null`, `?? []` — never leave undefined where nullable is expected.
- Nested arrays (pitches, addOns) are mapped element-by-element manually.

### DTO conventions

- `@Transform(lowerCaseTransformer)` on every email field.
- Pagination query DTOs coerce `page` / `limit` from string via `@Transform(() => Number(...))`, default `page=1 limit=10`, capped at `limit=50`.
- Nested objects use `@ValidateNested({ each: true })` + `@Type(() => NestedDto)`.
- `@IsMongoId()` for any `*Id` field.
- Geo fields use `@IsLatitude` / `@IsLongitude`.

### Pagination

`infinityPagination(results, { page, limit })` in [src/utils/infinity-pagination.ts](backend/src/utils/infinity-pagination.ts):
- Returns `{ data: T[], hasNextPage: boolean }`.
- `hasNextPage = results.length === limit` (fetch one extra is NOT used — caller checks exact count).
- Swagger: `@ApiOkResponse({ type: InfinityPaginationResponse(Campsite) })`.
- Frontend polls by incrementing page while `hasNextPage === true`.

### src/utils/ reference

| File | Purpose |
|---|---|
| `validation-options.ts` | Global ValidationPipe config (422, whitelist, transform) |
| `serializer.interceptor.ts` | `ResolvePromisesInterceptor` |
| `deep-resolver.ts` | Recursive promise-resolver used by above |
| `document-entity-helper.ts` | `EntityDocumentHelper` base — `@Transform` for `_id → string` |
| `infinity-pagination.ts` | Pagination helper |
| `types/deep-partial.type.ts` | `DeepPartial<T>` |
| `types/maybe.type.ts` | `MaybeType<T> = T \| undefined` |
| `types/nullable.type.ts` | `NullableType<T> = T \| null` |
| `transformers/lower-case.transformer.ts` | Lowercases + trims strings (email fields) |

### Code generation

New resources:
```bash
npm run generate:resource:document -- --name Foo
npm run add:property:to-document          # interactive, run once per field
```
This scaffolds the hexagonal folders exactly as described above. Hand-edit the generated `*.schema.ts` for compound/unique indexes (e.g. `PitchSlotSchema.index({ pitchId: 1, date: 1 }, { unique: true })`).

---

## Frontend architecture

### Key directories

```
frontend/src/
  app/                            # App Router pages
    page.tsx                      # Public home
    campsites/[id]/page.tsx       # Detail + BookingSidebar
    booking/page.tsx              # Guest info + add-ons
    booking/confirmation/page.tsx
    admin/page.tsx                # Host + admin dashboard (views/*View)
    login/page.tsx  register/page.tsx
  components/
    common/        # Nav, Footer, Scene, Icons, Stars, Badge, Button, StatusPill, KangtentMark
    home/          # FeatureCard, SearchBar, TestimonialCard, DestinationCard
    detail/        # Gallery, BookingSidebar, CampPitchList
    booking/       # FormCard, Field, StepHeader
    admin/         # AdminSidebar, Panel, StatCard + views/{Dashboard,Camps,Bookings,Users,Coupons,Settings}View
    ui/            # shadcn/ui primitives (pre-generated; edit sparingly)
  contexts/AuthContext.tsx        # token + memberships + currentOrganizationId
  services/                       # HTTP client + per-domain API modules
  middleware.ts                   # Gates /booking/* and /admin/*
  types/index.ts                  # User, Campsite, Booking, Organization, Membership
```

### API client

`src/services/` is the API layer (re-exported via `src/lib/api.ts`). `http-client.ts` is the base fetch wrapper (prefixed `NEXT_PUBLIC_API_URL/api/v1`, auto-attaches Bearer token from `localStorage`). Per-domain modules:
- `authApi` — `login`, `register`, `me`, `logout`, plus `persistAuth`/`clearAuth`/`mapMeResponseToUser`.
- `campsitesApi` — `list({ organizationId?, status? })`, `get`, `create`, `update`, `remove`. List returns `{ data, hasNextPage }`.
- `bookingsApi` — `create`, `list`, `get`, `cancel`.
- `organizationsApi` — `mine`, `create`, `get`, `update`, `remove`.
- `membershipsApi` — `listForOrg`, `myMemberships`, `invite`, `remove`.

Tokens live in `localStorage('kangtent_token')` + cookie of the same name (`SameSite=Lax`). The refresh token is stored under `kangtent_refresh`.

### AuthContext

`useAuth()` returns:
```ts
{ user, token, loading,
  memberships,                 // Membership[] the signed-in user belongs to
  currentOrganizationId,       // active tenant in the admin UI
  setCurrentOrganizationId,
  login, register, logout }
```

On hydrate it calls `GET /auth/me`, maps `role.id → 'admin'|'host'|'customer'`, and — for admins/hosts — fetches `GET /memberships/me` so the sidebar can show the active org.

### Middleware

[frontend/src/middleware.ts](frontend/src/middleware.ts) decodes the JWT from the cookie and:
- Redirects `/admin/*` to `/login` unless `role.id ∈ {1, 2}` (admin or host). Preserves `?next=` for post-login redirect.
- Keeps existing `/booking/*` auth gate (allowing `/booking/confirmation`).

### Design system

CSS variables are defined in `src/app/globals.css` and mirrored in `tailwind.config.ts`. Always use variables or tokens — never raw hex.

Key tokens: `--ink` (near-black), `--paper` (warm white bg), `--ember` (primary CTA orange), `--forest-*` (dark greens), `--sage-*` (mid greens), `--cream-*` (light warm fills), `--line` / `--line-strong` (borders).

**Typography**: Bai Jamjuree only, loaded via `@font-face`. Use `font-thai` for Thai text, `font-serif` for headings, `font-sans` for eyebrow labels.

**Scene component** (`src/components/common/Scene.tsx`) — SVG illustrated landscape, used as `position:absolute;inset:0` backgrounds. Accepts `variant: "hero"|"dusk"|"forest"|"lake"|"meadow"|"cabin"|"night"`.

**Icons** — all inline SVG in `src/components/common/Icons.tsx`. Add new ones there using the `base` spread.

**UX references** — `frontend/ux/components/` contains JSX exports of the original design for each page. Cross-reference these when implementing or changing UI.

---

## Seeds

`npm run seed:run:document` (from `backend/`) creates idempotently:

| Email | Password | Role | Tenant |
|---|---|---|---|
| `admin@example.com` | `secret` | admin | — |
| `host@example.com`  | `secret` | host  | Kangtent Demo Host Co. (slug `kangtent-demo`), member = `owner` |
| `customer@example.com` | `secret` | customer | — |

Plus one sample campsite (`เขาใหญ่ แคมป์วิว`) under the demo org with two pitches (`Forest A` tent, `Sky Dome` glamping).

Seeds live in [backend/src/database/seeds/document/](backend/src/database/seeds/document) — add new `*-seed.service.ts` modules and wire them into `seed.module.ts` + `run-seed.ts`.

---

## Conventions & gotchas

- **IDs are strings** — mappers convert `_id` → `id` everywhere in the domain layer. Frontend types use `id`.
- **Roles are numeric in the DB and in the JWT** (`RoleEnum.admin = 1`, `.host = 2`, `.customer = 3`) but surfaced as `'admin' | 'host' | 'customer'` strings on the frontend.
- **Anonymous booking** — the `POST /bookings` route uses the `OptionalJwtGuard` (`AuthGuard(['jwt','anonymous'])`). `req.user` is `undefined` for guests; when present, the booking is tagged with `userId`.
- **Tenant scoping is explicit.** Any host-facing route must declare both `@Roles(RoleEnum.admin, RoleEnum.host)` and `@UseGuards(..., OrganizationScopeGuard)` + `@ScopedOrg(...)`. Services should never pull `organizationId` from the session — only from `req.scopedOrganizationId`.
- **Do not re-enable relational persistence.** The TypeORM / Postgres paths from the upstream boilerplate were removed on purpose; the codebase is MongoDB-only.
- **Swagger** is at `GET /docs` (see [main.ts](backend/src/main.ts)).
