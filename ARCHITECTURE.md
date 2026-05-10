# Clean Architecture Guide

This boilerplate uses **Clean Architecture with CQRS-style commands and queries**.
This document explains why, and gives a step-by-step recipe for adding any new feature.

---

## The core problem this solves

When NestJS services inject other services, modules end up depending on each other in circles:

```
BookingsService → CampsitesService → MembershipsService → BookingsService  ← loop
```

NestJS can't create any of them first. You patch it with `forwardRef()` but the problem stays hidden.
All five booking operations also live in one 200-line file — changing "cancel" can break "create."

**Clean Architecture solves this with two rules:**

1. Traffic only flows **downward** through four layers. A lower layer never calls a higher one.
2. Two modules at the same level **never call each other's services or use-cases** — only their repository ports.

---

## The four layers

```
┌─────────────────────┐
│    PRESENTATION     │  HTTP — controllers, DTOs, guards
├─────────────────────┤
│    APPLICATION      │  Business logic — commands (writes) + queries (reads) + repository ports
├─────────────────────┤
│      DOMAIN         │  Pure data — plain TypeScript classes, no dependencies
├─────────────────────┤
│  INFRASTRUCTURE     │  Storage — Mongoose schemas, mappers, repository adapters
└─────────────────────┘
```

---

## What each layer does

### 1. Domain — `domain/<resource>.ts`

A plain TypeScript class. No Mongoose, no NestJS, no business logic.
Just the shape of the data the rest of the app talks about.

```ts
export class Post {
  id!: string;
  title!: string;
  body!: string;
  authorId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
```

If you swapped MongoDB for Postgres tomorrow, this file would not change.

---

### 2. Infrastructure — `infrastructure/persistence/`

Three files per domain:

| File | Role |
|---|---|
| `<resource>.schema.ts` | Mongoose schema (`@Prop` decorators, indexes, collection name) |
| `<resource>.mapper.ts` | Translates schema document ↔ domain class (static methods only) |
| `<resource>.document-repository.ts` | **Adapter** — implements the port using real Mongoose queries |

Plus one module:

**`<resource>s-persistence.module.ts`** — registers the Mongoose model, binds the port token to the adapter, and exports the token so other modules can use the repository without knowing it's Mongoose.

```ts
@Module({
  imports: [MongooseModule.forFeature([{ name: PostSchemaClass.name, schema: PostSchema }])],
  providers: [{ provide: PostRepository, useClass: PostDocumentRepository }],
  exports: [PostRepository],
})
export class PostsPersistenceModule {}
```

---

### 3. Application — `application/`

Three sub-folders:

#### `application/ports/<resource>.repository.ts` — the repository port

An abstract class listing what storage must provide. Lives in the **application** layer because it is the contract the application defines for storage — infrastructure fulfills it.

```ts
export abstract class PostRepository {
  abstract create(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>, options?: RepositoryOptions): Promise<Post>;
  abstract findById(id: string): Promise<Post | null>;
  abstract remove(id: string, options?: RepositoryOptions): Promise<void>;
}
```

`RepositoryOptions` (`utils/types/repository-options.type.ts`) is `{ session?: ClientSession }`. Passing it through enables MongoDB transactions without the application layer depending on Mongoose.

#### `application/commands/*.command.ts` — write operations

One `@Injectable()` class per **mutating** operation (create, update, delete). Each has one method: `execute()`.

```ts
@Injectable()
export class CreatePostCommand {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(dto: CreatePostDto, authorId: string): Promise<Post> {
    return this.postRepository.create({ ...dto, authorId });
  }
}
```

#### `application/queries/*.query.ts` — read operations

One `@Injectable()` class per **read** operation (find by id, list, search).

```ts
@Injectable()
export class GetPostByIdQuery {
  constructor(private readonly postRepository: PostRepository) {}

  execute(id: string): Promise<Post | null> {
    return this.postRepository.findById(id);
  }
}
```

**Rules for both:**
- Inject **repository ports** (abstract classes), never another module's command/query or service.
- If it needs data from another domain, inject *that domain's repository port* — never the full feature module.
- No HTTP knowledge — no `Request`, `Response`, or route decorators.

Why one-file-per-operation? When a bug is in "create post," you open exactly one file.
When requirements change for "delete post," you edit exactly one file. Nothing else can break.

---

### 4. Presentation — `presentation/`

Handles HTTP only. Two things:

**`dto/create-<resource>.dto.ts`** — validates the incoming request body using `class-validator`.

**`<resource>s.controller.ts`** — receives requests, calls one use-case, returns the result. No business logic.

```ts
@Controller({ path: 'posts', version: '1' })
export class PostsController {
  constructor(
    private readonly createPost: CreatePostCommand,
    private readonly getPostById: GetPostByIdQuery,
  ) {}

  @Post()
  create(@Body() dto: CreatePostDto, @Req() req) {
    return this.createPost.execute(dto, req.user.id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getPostById.execute(id);
  }
}
```

---

## How the module connects everything

```ts
@Module({
  imports: [
    PostsPersistenceModule,   // provides PostRepository token
    UsersPersistenceModule,   // only if a command/query needs UserRepository
    // never import UsersModule (the full feature module)
  ],
  controllers: [PostsController],
  providers: [CreatePostCommand, GetPostByIdQuery, RemovePostCommand],
})
export class PostsModule {}
```

The module imports **persistence modules** from other domains — never full feature modules.
A persistence module is just a repository token. No controllers, no business logic, no loop possible.

---

## The golden rule

> **Commands and queries inject repository ports. They never call another module's commands, queries, or services.**

If `CreatePostCommand` needs to verify the author exists, it injects `UserRepository` directly.
It does **not** import `UsersModule` or call `GetUserByIdQuery`.

This one rule is what makes the architecture work.

---

## File structure for any new domain

```
src/<resource>/
  domain/
    <resource>.ts                          # Pure data class

  application/
    ports/
      <resource>.repository.ts             # Port: abstract class, method signatures only
    commands/
      create-<resource>.command.ts         # One file per write operation
      update-<resource>.command.ts
      remove-<resource>.command.ts
    queries/
      get-<resource>-by-id.query.ts        # One file per read operation
      get-<resource>s.query.ts

  infrastructure/
    persistence/
      <resource>.schema.ts                 # Mongoose schema
      <resource>.mapper.ts                 # toDomain / toPersistence (static only)
      <resource>.document-repository.ts   # Adapter: implements port with Mongoose
    <resource>s-persistence.module.ts     # Wires port → adapter, exports token

  presentation/
    dto/
      create-<resource>.dto.ts             # Input validation
    <resource>s.controller.ts             # Routing only

  <resource>s.module.ts                   # Wires everything together
```

---

## Step-by-step: adding a new feature

### Case A — New domain (new MongoDB collection)

The example below adds a **Coupons** feature.

---

#### Step 1 — Domain class

`src/coupons/domain/coupon.ts`

```ts
export class Coupon {
  id!: string;
  code!: string;
  discountPercent!: number;
  expiresAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
```

---

#### Step 2 — Repository port

`src/coupons/application/ports/coupon.repository.ts`

The port lives in the **application** layer — it is the contract the application defines for storage.

```ts
import { RepositoryOptions } from '../../../utils/types/repository-options.type';

export abstract class CouponRepository {
  abstract create(data: Omit<Coupon, 'id' | 'createdAt' | 'updatedAt'>, options?: RepositoryOptions): Promise<Coupon>;
  abstract findById(id: string): Promise<Coupon | null>;
  abstract findByCode(code: string): Promise<Coupon | null>;
  abstract remove(id: string, options?: RepositoryOptions): Promise<void>;
}
```

Pass `RepositoryOptions` (`{ session?: ClientSession }`) to every mutating method so callers can wrap multiple operations in a MongoDB transaction using `withTransaction()` from `utils/transaction.helper.ts`.

---

#### Step 3 — Mongoose schema

`src/coupons/infrastructure/persistence/coupon.schema.ts`

`@Schema` + `@Prop()` decorators. All properties use `!`. Copy the pattern from any existing schema.

---

#### Step 4 — Mapper

`src/coupons/infrastructure/persistence/coupon.mapper.ts`

```ts
export class CouponMapper {
  static toDomain(raw: CouponSchemaClass): Coupon { ... }
  static toPersistence(domain: Coupon): CouponSchemaClass { ... }
}
```

---

#### Step 5 — Document repository (adapter)

`src/coupons/infrastructure/persistence/coupon.document-repository.ts`

Implements `CouponRepository` using `@InjectModel` + Mongoose. Uses `CouponMapper` for conversion.

---

#### Step 6 — Persistence module

`src/coupons/infrastructure/coupons-persistence.module.ts`

```ts
@Module({
  imports: [MongooseModule.forFeature([{ name: CouponSchemaClass.name, schema: CouponSchema }])],
  providers: [{ provide: CouponRepository, useClass: CouponDocumentRepository }],
  exports: [CouponRepository],
})
export class CouponsPersistenceModule {}
```

---

#### Step 7 — Commands and queries

One file per operation. Inject only repository ports.

**Write operations** go in `application/commands/`:

```ts
// src/coupons/application/commands/create-coupon.command.ts
@Injectable()
export class CreateCouponCommand {
  constructor(private readonly couponRepository: CouponRepository) {}

  async execute(dto: CreateCouponDto): Promise<Coupon> {
    return this.couponRepository.create(dto);
  }
}
```

**Read operations** go in `application/queries/`:

```ts
// src/coupons/application/queries/get-coupon-by-id.query.ts
@Injectable()
export class GetCouponByIdQuery {
  constructor(private readonly couponRepository: CouponRepository) {}

  execute(id: string): Promise<Coupon | null> {
    return this.couponRepository.findById(id);
  }
}
```

---

#### Step 8 — DTO, controller, module, register

**DTO** (`presentation/dto/create-coupon.dto.ts`) — `class-validator` decorators, all fields `!`.

**Controller** (`presentation/coupons.controller.ts`) — guards and decorators here, one command/query call per route, no logic.

```ts
@Controller({ path: 'coupons', version: '1' })
export class CouponsController {
  constructor(
    private readonly createCoupon: CreateCouponCommand,
    private readonly getCouponById: GetCouponByIdQuery,
  ) {}

  @Post()
  create(@Body() dto: CreateCouponDto) {
    return this.createCoupon.execute(dto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getCouponById.execute(id);
  }
}
```

**Module** (`coupons.module.ts`):

```ts
@Module({
  imports: [CouponsPersistenceModule],
  controllers: [CouponsController],
  providers: [CreateCouponCommand, GetCouponByIdQuery, RemoveCouponCommand],
})
export class CouponsModule {}
```

**`app.module.ts`** — add `CouponsModule` to the `imports` array. Done.

---

### Case B — New route on an existing domain

You already have the domain, schema, repository port, and persistence module. Only do steps 7–8.

1. If you need a new repository method, add the signature to the **port** (`application/ports/`) and implement it in the **document repository**.
2. Create the new **command** or **query** file.
3. Add it to **providers** in the module.
4. Add the route to the **controller**.

Do not touch the domain class, schema, mapper, or persistence module.

---

## Decision guide

```
Need a new API route?
│
├─ New MongoDB collection?
│   YES → Case A (all 8 steps)
│   NO  → Case B (steps 7–8 only)
│
└─ Use-case needs data from another domain?
    YES → Import that domain's PersistenceModule
          Inject that domain's repository port
          Do NOT import the full feature module
    NO  → Import only your own PersistenceModule
```

---

## Pre-merge checklist

- [ ] Domain class has zero Mongoose / NestJS imports
- [ ] Repository port is in `application/ports/` and is abstract — no implementation
- [ ] Mutating port methods accept `options?: RepositoryOptions` for transaction support
- [ ] Commands and queries inject only repository ports, not services or other commands/queries
- [ ] Controller has no business logic — one command/query call per route
- [ ] Module imports only PersistenceModules, not full feature modules
- [ ] New module is added to `app.module.ts`
- [ ] `npm run build` passes with zero errors
