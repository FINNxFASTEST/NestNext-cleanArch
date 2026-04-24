import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewRepository } from '../../infrastructure/persistence/review.repository';
import { RoleEnum } from '../../../roles/roles.enum';

@Injectable()
export class RemoveReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(
    id: string,
    actor: { id: string; role?: { id: string | number } },
  ): Promise<void> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    const isAdmin = String(actor.role?.id) === String(RoleEnum.admin);
    const isOwner = review.userId === actor.id;
    if (!isAdmin && !isOwner) {
      throw new ForbiddenException('Cannot delete this review');
    }

    await this.reviewRepository.remove(id);
  }
}
