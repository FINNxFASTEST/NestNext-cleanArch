import { Injectable } from '@nestjs/common';
import { PitchSlotRepository } from '../../infrastructure/persistence/pitch-slot.repository';

@Injectable()
export class ReleasePitchSlotsByBookingUseCase {
  constructor(private readonly pitchSlotRepository: PitchSlotRepository) {}

  execute(bookingId: string): Promise<void> {
    return this.pitchSlotRepository.removeByBookingId(bookingId);
  }
}
