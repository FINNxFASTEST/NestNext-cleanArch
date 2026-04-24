import { NullableType } from '../../../utils/types/nullable.type';
import { Review } from '../../domain/review';

export abstract class ReviewRepository {
  abstract create(
    data: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Review>;
  abstract findById(id: Review['id']): Promise<NullableType<Review>>;
  abstract findByCampsiteId(campsiteId: string): Promise<Review[]>;
  abstract remove(id: Review['id']): Promise<void>;
}
