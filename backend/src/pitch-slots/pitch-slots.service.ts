import { Injectable } from '@nestjs/common';
import { PitchSlotRepository } from './infrastructure/persistence/pitch-slot.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PitchSlot } from './domain/pitch-slot';

@Injectable()
export class PitchSlotsService {
  constructor(private readonly pitchSlotRepository: PitchSlotRepository) {}

  async reserve(
    slots: Omit<PitchSlot, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<PitchSlot[]> {
    return this.pitchSlotRepository.reserve(slots);
  }

  async releaseByBookingId(bookingId: string): Promise<void> {
    await this.pitchSlotRepository.removeByBookingId(bookingId);
  }

  findByBookingId(bookingId: string) {
    return this.pitchSlotRepository.findByBookingId(bookingId);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.pitchSlotRepository.findAllWithPagination({
      paginationOptions,
    });
  }

  findById(id: PitchSlot['id']) {
    return this.pitchSlotRepository.findById(id);
  }

  remove(id: PitchSlot['id']) {
    return this.pitchSlotRepository.remove(id);
  }
}
