import { Injectable } from '@nestjs/common';
import { PitchSlotRepository } from '../../infrastructure/persistence/pitch-slot.repository';
import { PitchSlot } from '../../domain/pitch-slot';

@Injectable()
export class ReservePitchSlotsUseCase {
  constructor(private readonly pitchSlotRepository: PitchSlotRepository) {}

  execute(
    slots: Omit<PitchSlot, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<PitchSlot[]> {
    return this.pitchSlotRepository.reserve(slots as PitchSlot[]);
  }
}
