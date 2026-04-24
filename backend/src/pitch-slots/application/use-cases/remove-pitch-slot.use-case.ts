import { Injectable } from '@nestjs/common';
import { PitchSlotRepository } from '../../infrastructure/persistence/pitch-slot.repository';
import { PitchSlot } from '../../domain/pitch-slot';

@Injectable()
export class RemovePitchSlotUseCase {
  constructor(private readonly pitchSlotRepository: PitchSlotRepository) {}

  execute(id: PitchSlot['id']): Promise<void> {
    return this.pitchSlotRepository.remove(id);
  }
}
