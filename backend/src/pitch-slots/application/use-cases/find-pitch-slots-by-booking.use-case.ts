import { Injectable } from '@nestjs/common';
import { PitchSlotRepository } from '../../infrastructure/persistence/pitch-slot.repository';
import { PitchSlot } from '../../domain/pitch-slot';

@Injectable()
export class FindPitchSlotsByBookingUseCase {
  constructor(private readonly pitchSlotRepository: PitchSlotRepository) {}

  execute(bookingId: string): Promise<PitchSlot[]> {
    return this.pitchSlotRepository.findByBookingId(bookingId);
  }
}
