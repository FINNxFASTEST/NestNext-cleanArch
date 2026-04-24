import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from '../../infrastructure/persistence/review.repository';
import { CampsiteRepository } from '../../../campsites/infrastructure/persistence/campsite.repository';
import { Review } from '../../domain/review';
import { CreateReviewDto } from '../../presentation/dto/create-review.dto';

@Injectable()
export class CreateReviewUseCase {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly campsiteRepository: CampsiteRepository,
  ) {}

  async execute(dto: CreateReviewDto, userId: string): Promise<Review> {
    const campsite = await this.campsiteRepository.findById(dto.campsiteId);
    if (!campsite) {
      throw new NotFoundException('Campsite not found');
    }

    return this.reviewRepository.create({
      campsiteId: dto.campsiteId,
      userId,
      rating: dto.rating,
      comment: dto.comment ?? null,
    });
  }
}
