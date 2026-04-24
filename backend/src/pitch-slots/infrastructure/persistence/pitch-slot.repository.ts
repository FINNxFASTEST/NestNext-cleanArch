import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PitchSlot } from '../../domain/pitch-slot';

export abstract class PitchSlotRepository {
  abstract create(
    data: Omit<PitchSlot, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PitchSlot>;

  /**
   * Inserts many slots atomically. If ANY slot already exists for a
   * (pitchId, date) the whole operation throws and no slots are created.
   */
  abstract reserve(
    data: Omit<PitchSlot, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<PitchSlot[]>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PitchSlot[]>;

  abstract findById(id: PitchSlot['id']): Promise<NullableType<PitchSlot>>;

  abstract findByIds(ids: PitchSlot['id'][]): Promise<PitchSlot[]>;

  abstract findByBookingId(bookingId: string): Promise<PitchSlot[]>;

  abstract removeByBookingId(bookingId: string): Promise<void>;

  abstract remove(id: PitchSlot['id']): Promise<void>;
}
