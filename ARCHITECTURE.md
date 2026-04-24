# Clean Architecture Guide
## Based on the Kangtent Codebase

---

## The Big Idea

Old code had one problem: **Services talking to Services**.

When Service A needs Service B, and Service B needs Service A,
NestJS gets confused about who to create first. This is a circular dependency.
You patch it with `forwardRef()` but the problem is still there, just hidden.

Clean Architecture solves this by giving every piece of code exactly ONE job
and ONE direction it is allowed to talk to.

---

## The 4 Layers (top to bottom)

```
[ PRESENTATION ]  ← talks to the internet (HTTP)
      ↓
[ APPLICATION ]   ← talks to storage
      ↓
[ DOMAIN ]        ← just data, no logic, no DB
      ↓
[ INFRASTRUCTURE ]← talks to MongoDB
```

Traffic only flows DOWNWARD. A lower layer never calls a higher layer.
Two modules at the same layer never call each other directly.

---

## What Each Layer Does

### 1. DOMAIN  →  `domain/review.ts`

This is just a plain TypeScript class that describes what a Review IS.

```
Review {
  id
  campsiteId
  userId
  rating
  comment
  createdAt
  updatedAt
}
```

No Mongoose. No HTTP. No business logic.
Just the shape of the data that the rest of the app talks about.

If you changed from MongoDB to PostgreSQL tomorrow,
this file would not change at all.


### 2. INFRASTRUCTURE  →  `infrastructure/persistence/`

This layer knows about MongoDB. It has 4 files:

**review.repository.ts** — the PORT (abstract contract)
  - Describes WHAT the app needs from storage
  - Example: "I need to be able to create a review, find by campsite, delete by id"
  - Has NO implementation, just method signatures
  - This is like a job description: "must be able to do these things"

**review.schema.ts** — the Mongoose schema
  - Describes how a Review looks in MongoDB
  - Has @Prop decorators, collection name, indexes

**review.mapper.ts** — the translator
  - Converts a MongoDB document → domain Review object
  - Converts a domain Review object → MongoDB document
  - Exists because the DB document and the domain class are intentionally separate

**review.document-repository.ts** — the ADAPTER
  - This is the actual implementation of the PORT
  - Uses `@InjectModel` and Mongoose to talk to MongoDB
  - The only file in the whole codebase that runs real DB queries for reviews

**reviews-persistence.module.ts** — the wiring
  - Registers the Mongoose model
  - Tells NestJS: "when someone asks for ReviewRepository, give them ReviewDocumentRepository"
  - Exports ReviewRepository so other modules can use it without knowing it is Mongoose


### 3. APPLICATION  →  `application/use-cases/`

This is the business logic layer. One file = one action. Each file has one method: execute().

**create-review.use-case.ts**
  - Job: check the campsite exists, then save the review
  - Injects: ReviewRepository, CampsiteRepository (both are ports, not modules)
  - Knows nothing about HTTP, nothing about Mongoose

**find-reviews-by-campsite.use-case.ts**
  - Job: return all reviews for a campsite
  - Injects: ReviewRepository only

**remove-review.use-case.ts**
  - Job: check the caller is the owner or admin, then delete
  - Injects: ReviewRepository only

Why is this better than one ReviewsService with all methods?
Because when a bug is in "create review", you open exactly ONE file.
When requirements change for "delete review", you edit exactly ONE file.
Nothing else can be accidentally broken.


### 4. PRESENTATION  →  `presentation/`

This layer handles HTTP. It knows about requests, responses, validation, and guards.

**dto/create-review.dto.ts**
  - Validates the incoming JSON body
  - Defines which fields are required, their types, min/max values
  - Uses class-validator decorators

**reviews.controller.ts**
  - Receives HTTP requests
  - Calls the correct use case
  - Returns the result
  - Nothing else. No business logic here.

The controller does not know HOW a review is created.
It only knows WHICH use case to call.

---

## The Module — How It All Connects

```typescript
// reviews.module.ts

imports: [
  ReviewsPersistenceModule,    // "give me the ReviewRepository token"
  CampsitesPersistenceModule,  // "give me the CampsiteRepository token"
],
providers: [
  CreateReviewUseCase,
  FindReviewsByCampsiteUseCase,
  RemoveReviewUseCase,
],
controllers: [ReviewsController],
```

Notice what is NOT imported:
- NOT CampsitesModule  (the full feature module)
- NOT MembershipsModule
- NOT any other domain's module

The Reviews module only imports PERSISTENCE modules from other domains.
A persistence module is just a token. It has no controllers, no use cases, no business logic.
It just says "here is a repository you can use".

This is why circular dependencies cannot happen.
ReviewsModule → CampsitesPersistenceModule (one-way, no loop possible)


---

## The Golden Rule

```
USE CASES talk to REPOSITORY PORTS.
USE CASES never talk to other modules' use cases or services.
```

If CreateReviewUseCase needs to check a campsite exists,
it injects CampsiteRepository directly.
It does NOT import CampsitesModule, it does NOT call FindCampsiteByIdUseCase.

This one rule is what makes the architecture work.

---

## Comparison: Before and After

### BEFORE (hexagonal with services)

```
BookingsService
  constructor(
    bookingRepository,
    CampsitesService,    ← full service from another module
    PitchSlotsService,   ← full service from another module
    MembershipsService,  ← full service from another module
  )
```

BookingsModule imports CampsitesModule imports MembershipsModule
which eventually imports back to BookingsModule → circular dependency.

All 5 booking actions (create, findAll, findById, cancel, remove)
live in one 200-line file. Changing "cancel" can accidentally break "create".


### AFTER (clean architecture with use cases)

```
CreateBookingUseCase
  constructor(
    bookingRepository,      ← port token
    campsiteRepository,     ← port token, NOT CampsitesService
    pitchSlotRepository,    ← port token, NOT PitchSlotsService
    membershipRepository,   ← port token, NOT MembershipsService
  )
```

BookingsModule imports [BookingsPersistenceModule, CampsitesPersistenceModule,
PitchSlotsPersistenceModule, MembershipsPersistenceModule].

No full modules. No circular dependencies. No forwardRef.

Each booking action is its own file. 5 files, each under 50 lines.

---

## File Structure Reference

When you create a new domain, you always create these files:

```
src/<domain>/
  domain/
    <domain>.ts                         ← what the thing IS (pure data class)

  infrastructure/
    persistence/
      <domain>.repository.ts            ← PORT: abstract class, method signatures only
      <domain>.schema.ts                ← Mongoose schema
      <domain>.mapper.ts                ← schema ↔ domain conversion
      <domain>.document-repository.ts  ← ADAPTER: implements the port with Mongoose
    <domain>s-persistence.module.ts    ← wires port to adapter, exports the token

  application/
    use-cases/
      create-<domain>.use-case.ts       ← one file per action
      find-<domain>-by-id.use-case.ts
      remove-<domain>.use-case.ts
      ... (one file per action)

  presentation/
    dto/
      create-<domain>.dto.ts            ← HTTP input validation
    <domain>s.controller.ts            ← HTTP routing only

  <domain>s.module.ts                  ← wires everything together
```

---

## Summary in One Sentence Per Layer

- **Domain**: what the data looks like (no dependencies)
- **Infrastructure**: how to store and retrieve data (MongoDB detail stays here)
- **Application**: what the app is allowed to do (one use case per action)
- **Presentation**: how the outside world communicates with the app (HTTP detail stays here)

Each layer has one concern. Each file has one job.
Nothing calls upward. Nothing calls sideways to another module's service.
That is the whole architecture.

---

---

# Step-by-Step: Adding a New Route (New Business Logic)

Use this checklist every time you need a new API endpoint.
The example used throughout is: adding a "Coupons" feature (POST /coupons, GET /coupons/:id).

---

## CASE A — Brand new domain (new MongoDB collection)

Follow all 8 steps in order.

---

### STEP 1 — Create the domain class

File to create:
```
src/coupons/domain/coupon.ts
```

Write a plain TypeScript class with all the fields this thing has.
No Mongoose. No imports from NestJS. No business logic.
Just the shape of the data.

```typescript
export class Coupon {
  id: string;
  code: string;
  discountPercent: number;
  organizationId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

Ask yourself: if someone asked "what is a Coupon?", this file is the answer.


---

### STEP 2 — Create the repository PORT

File to create:
```
src/coupons/infrastructure/persistence/coupon.repository.ts
```

Write an abstract class that lists WHAT you need to do with storage.
No implementation. Just method signatures.

```typescript
export abstract class CouponRepository {
  abstract create(data: Omit<Coupon, 'id' | 'createdAt' | 'updatedAt'>): Promise<Coupon>;
  abstract findById(id: string): Promise<Coupon | null>;
  abstract findByCode(code: string): Promise<Coupon | null>;
  abstract remove(id: string): Promise<void>;
}
```

Think of this as a contract. The use cases depend on this contract,
not on the real database code. This is what breaks circular dependencies.


---

### STEP 3 — Create the Mongoose schema

File to create:
```
src/coupons/infrastructure/persistence/coupon.schema.ts
```

Write the Mongoose schema using @Schema and @Prop decorators.
Copy the pattern from any existing schema like review.schema.ts.

This file is the only place that knows what the MongoDB document looks like.


---

### STEP 4 — Create the mapper

File to create:
```
src/coupons/infrastructure/persistence/coupon.mapper.ts
```

Write two static methods:
- toDomain(raw: CouponSchemaClass): Coupon
- toPersistence(domain: Coupon): CouponSchemaClass

This file translates between the MongoDB world and the domain world.
It exists so the domain class never has Mongoose decorators on it.


---

### STEP 5 — Create the document repository (the ADAPTER)

File to create:
```
src/coupons/infrastructure/persistence/coupon.document-repository.ts
```

This class implements CouponRepository using real Mongoose code.
Use @InjectModel to get the Mongoose model.
Use CouponMapper to convert between schema and domain.

Copy the pattern from review.document-repository.ts.


---

### STEP 6 — Create the persistence module

File to create:
```
src/coupons/infrastructure/coupons-persistence.module.ts
```

This module does two things:
1. Registers the Mongoose model with MongooseModule.forFeature
2. Provides CouponRepository → CouponDocumentRepository and exports the token

```typescript
@Module({
  imports: [MongooseModule.forFeature([{ name: CouponSchemaClass.name, schema: CouponSchema }])],
  providers: [{ provide: CouponRepository, useClass: CouponDocumentRepository }],
  exports: [CouponRepository],
})
export class CouponsPersistenceModule {}
```

After this step, any module that imports CouponsPersistenceModule
can inject CouponRepository in its use cases.


---

### STEP 7 — Create the use cases

One file per action. For each new route you are adding, create one use case.

Files to create (example):
```
src/coupons/application/use-cases/create-coupon.use-case.ts
src/coupons/application/use-cases/find-coupon-by-id.use-case.ts
src/coupons/application/use-cases/remove-coupon.use-case.ts
```

Each file follows this pattern:
```typescript
@Injectable()
export class CreateCouponUseCase {
  constructor(
    private readonly couponRepository: CouponRepository,
    // if you need data from another domain, inject its REPOSITORY PORT here
    // example: private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(dto: CreateCouponDto, actorId: string): Promise<Coupon> {
    // all business logic for "create coupon" goes here
    return this.couponRepository.create({ ...dto, organizationId: actorId });
  }
}
```

Rules:
- Only inject repository ports (abstract classes), never another module's use case
- If you need to check something from another domain (e.g. does this org exist?),
  import that domain's PersistenceModule and inject its repository port directly
- No HTTP knowledge here (no Request, no Response, no decorators)


---

### STEP 8 — Create the DTO, controller, and module

**DTO file:**
```
src/coupons/presentation/dto/create-coupon.dto.ts
```
Use class-validator decorators (@IsString, @IsInt, etc.) to validate incoming JSON.


**Controller file:**
```
src/coupons/presentation/coupons.controller.ts
```
Inject the use cases. Each route method calls one use case and returns the result.
Put all guards, @Roles, @UseGuards here. No business logic in the controller.

```typescript
@Controller({ path: 'coupons', version: '1' })
export class CouponsController {
  constructor(
    private readonly createCoupon: CreateCouponUseCase,
    private readonly findCouponById: FindCouponByIdUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCouponDto, @Req() req) {
    return this.createCoupon.execute(dto, req.user.id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findCouponById.execute(id);
  }
}
```


**Module file:**
```
src/coupons/coupons.module.ts
```

```typescript
@Module({
  imports: [
    CouponsPersistenceModule,         // always import your own persistence module
    OrganizationsPersistenceModule,   // only if a use case needs OrganizationRepository
    // never import CampsitesModule, OrganizationsModule (full modules)
  ],
  controllers: [CouponsController],
  providers: [CreateCouponUseCase, FindCouponByIdUseCase, RemoveCouponUseCase],
})
export class CouponsModule {}
```


**Register in AppModule:**
```
src/app.module.ts
```
Add CouponsModule to the imports array. That's the only change needed.

---

## CASE B — New route on an existing domain

You already have the domain, schema, repository, and persistence module.
You only need to do STEP 7 and part of STEP 8.

Example: adding GET /reviews/user/:userId to the existing Reviews domain.

**STEP 7 only — Create the new use case:**
```
src/reviews/application/use-cases/find-reviews-by-user.use-case.ts
```

**STEP 8 partial — Update 3 existing files:**

1. Add the new method to the repository PORT if it needs a new query:
   ```
   src/reviews/infrastructure/persistence/review.repository.ts
   ```
   Add: `abstract findByUserId(userId: string): Promise<Review[]>;`

2. Implement the new method in the document repository:
   ```
   src/reviews/infrastructure/persistence/review.document-repository.ts
   ```

3. Add the new use case to providers in the module:
   ```
   src/reviews/reviews.module.ts
   ```

4. Add the new route to the controller:
   ```
   src/reviews/presentation/reviews.controller.ts
   ```

You do NOT touch the domain class, the schema, the mapper, or the persistence module.

---

## Quick Decision Guide

```
I need a new API route
        │
        ├─ Does it need a new MongoDB collection?
        │         │
        │         YES → Follow CASE A (all 8 steps)
        │         │     Create the full domain folder from scratch
        │         │
        │         NO  → Follow CASE B (steps 7-8 only)
        │               Add use case + route to existing domain
        │
        └─ Does the use case need data from another domain?
                  │
                  YES → Import that domain's PersistenceModule in your module
                  │     Inject that domain's Repository port in your use case
                  │     Do NOT import the full feature module
                  │
                  NO  → Only import your own PersistenceModule
```

---

## Checklist Before You Finish

Before marking a new route as done, verify these:

- [ ] Domain class has no Mongoose imports
- [ ] Repository port is abstract with no implementation
- [ ] Use case injects only repository ports (abstract classes), not services or modules
- [ ] Controller has no business logic, only calls one use case per route
- [ ] Module imports only PersistenceModules, not full feature modules
- [ ] New module is added to AppModule imports
- [ ] `npm run build` passes with zero errors
