import { Injectable } from '@nestjs/common';
import { ReviewRepository } from '../../infrastructure/persistence/review.repository';
import { Review } from '../../domain/review';

@Injectable()
export class FindReviewsByCampsiteUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  execute(campsiteId: string): Promise<Review[]> {
    return this.reviewRepository.findByCampsiteId(campsiteId);
  }
}
