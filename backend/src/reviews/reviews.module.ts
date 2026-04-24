import { Module } from '@nestjs/common';
import { ReviewsPersistenceModule } from './infrastructure/reviews-persistence.module';
import { CampsitesPersistenceModule } from '../campsites/infrastructure/campsites-persistence.module';
import { ReviewsController } from './presentation/reviews.controller';
import { CreateReviewUseCase } from './application/use-cases/create-review.use-case';
import { FindReviewsByCampsiteUseCase } from './application/use-cases/find-reviews-by-campsite.use-case';
import { RemoveReviewUseCase } from './application/use-cases/remove-review.use-case';

@Module({
  imports: [
    ReviewsPersistenceModule, // gives us: ReviewRepository
    CampsitesPersistenceModule, // gives us: CampsiteRepository (to verify campsite exists)
  ],
  controllers: [ReviewsController],
  providers: [
    CreateReviewUseCase,
    FindReviewsByCampsiteUseCase,
    RemoveReviewUseCase,
  ],
})
export class ReviewsModule {}
