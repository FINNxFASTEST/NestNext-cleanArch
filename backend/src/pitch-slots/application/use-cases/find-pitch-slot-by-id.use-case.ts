import { Injectable } from '@nestjs/common';
import { PitchSlotRepository } from '../../infrastructure/persistence/pitch-slot.repository';
import { PitchSlot } from '../../domain/pitch-slot';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class FindPitchSlotByIdUseCase {
  constructor(private readonly pitchSlotRepository: PitchSlotRepository) {}

  execute(id: PitchSlot['id']): Promise<NullableType<PitchSlot>> {
    return this.pitchSlotRepository.findById(id);
  }
}
