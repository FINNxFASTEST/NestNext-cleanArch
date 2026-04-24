import { Injectable } from '@nestjs/common';
import { PitchSlotRepository } from '../../infrastructure/persistence/pitch-slot.repository';
import { PitchSlot } from '../../domain/pitch-slot';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class FindPitchSlotsUseCase {
  constructor(private readonly pitchSlotRepository: PitchSlotRepository) {}

  execute(paginationOptions: IPaginationOptions): Promise<PitchSlot[]> {
    return this.pitchSlotRepository.findAllWithPagination({ paginationOptions });
  }
}
